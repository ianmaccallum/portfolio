#!/usr/bin/env node
//
// Submit changed URLs to IndexNow (Bing, Yandex, Naver, Seznam, Yep).
//
// This site is fully static with no server-side publish flow, so there is no
// request path that can fire the ping automatically. Two ways in:
//
// 1. Automatically, per deploy (.github/workflows/deploy.yml): snapshot the
//    currently live sitemap before deploying, then diff the freshly built
//    sitemap against that snapshot and submit only the URLs that were added or
//    removed.
//
//      node scripts/indexnow-submit.mjs --snapshot <file>   # before deploy
//      node scripts/indexnow-submit.mjs --diff <file>       # after deploy
//
// 2. By hand, after deploying a page whose content changed (the diff above only
//    catches URLs appearing or disappearing, not edits to an existing page):
//
//      pnpm indexnow /apps
//      pnpm indexnow https://ian.maccallum.dev/ /apps
//      pnpm indexnow --sitemap              # every URL in the live sitemap
//      pnpm indexnow --dry-run /apps        # print the payload, submit nothing
//
// Only submit URLs that actually changed. Submissions count against crawl
// quota, so --sitemap is for first-time setup or a site-wide change, never for
// every deploy.
//
// The key and the canonical host are parsed out of src/lib/indexnow.ts and
// src/lib/info.ts instead of being mirrored here, so this script cannot drift
// from the app. Before submitting anything the key file is verified both on
// disk and on the live domain, because a key file that isn't actually served
// makes every submission 403.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

function fail(message) {
  console.error(`indexnow: ${message}`)
  process.exit(1)
}

function readRepoFile(relPath, purpose) {
  try {
    return readFileSync(join(repoRoot, relPath), 'utf8')
  } catch {
    return fail(`cannot read ${relPath} (needed to ${purpose})`)
  }
}

// Single source of truth for both values lives in TypeScript, which a .mjs
// cannot import, so parse the literals out instead of copying them.
function readConstant(relPath, pattern, label) {
  const match = readRepoFile(relPath, `resolve ${label}`).match(pattern)
  if (!match) fail(`could not find ${label} in ${relPath}`)
  return match[1]
}

const INDEXNOW_KEY = readConstant(
  'src/lib/indexnow.ts',
  /export const INDEXNOW_KEY = '([^']+)'/,
  'INDEXNOW_KEY',
)

const SITE_URL = readConstant('src/lib/info.ts', /export const siteUrl = '([^']+)'/, 'siteUrl')

const KEY_FILE = `public/${INDEXNOW_KEY}.txt`

// The committed key file must be byte-identical to the constant.
function verifyKeyFileOnDisk() {
  const contents = readRepoFile(KEY_FILE, 'verify the IndexNow key file')
  if (contents !== INDEXNOW_KEY) {
    fail(
      `${KEY_FILE} does not match INDEXNOW_KEY exactly (got ${JSON.stringify(contents)}); ` +
        `engines would reject submissions with 403`,
    )
  }
}

// ...and it must actually be served on the live host, or the engine's ownership
// check fails and every submission 403s. Cache-busted so a CDN can't answer
// with a pre-deploy 404.
async function verifyKeyFileIsLive() {
  const keyUrl = `${SITE_URL}/${INDEXNOW_KEY}.txt?indexnow-check=${Date.now()}`
  let res
  try {
    res = await fetch(keyUrl)
  } catch (error) {
    fail(`could not fetch ${keyUrl}: ${error.message}`)
  }
  if (!res.ok) {
    fail(
      `${SITE_URL}/${INDEXNOW_KEY}.txt returned ${res.status}. The key file is not being served ` +
        `by whatever currently answers for ${new URL(SITE_URL).host}; deploy it there first, ` +
        `otherwise every submission returns 403.`,
    )
  }
  const body = await res.text()
  if (body.trim() !== INDEXNOW_KEY) {
    fail(
      `${SITE_URL}/${INDEXNOW_KEY}.txt served ${JSON.stringify(body.slice(0, 120))}, ` +
        `which is not the key; submissions would return 403`,
    )
  }
}

function normalizeUrl(url) {
  // The generated sitemap emits the site root without a trailing slash; tolerate
  // either form so a formatting change can't look like an add plus a remove.
  return url.trim().replace(/\/+$/, '')
}

// normalized URL -> the exact string from the sitemap
function locsFromSitemap(xml) {
  const locs = new Map()
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const raw = match[1].trim()
    if (raw) locs.set(normalizeUrl(raw), raw)
  }
  return locs
}

async function fetchLiveSitemap() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  let res
  try {
    res = await fetch(sitemapUrl)
  } catch (error) {
    return fail(`could not fetch ${sitemapUrl}: ${error.message}`)
  }
  if (!res.ok) fail(`could not fetch ${sitemapUrl}: ${res.status}`)
  return res.text()
}

// The sitemap is a route, not a static asset, so the built XML is only available
// from the prerender cache OpenNext writes next to the assets.
function builtSitemapXml() {
  const buildId = readRepoFile(
    '.open-next/assets/BUILD_ID',
    'locate the built sitemap (run pnpm build:cf first)',
  ).trim()
  const cachePath = join('.open-next/cache', buildId, 'sitemap.xml.cache')
  const raw = readRepoFile(cachePath, 'read the built sitemap')
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return fail(`${cachePath} is not valid JSON`)
  }
  if (typeof parsed.body !== 'string') fail(`${cachePath} has no prerendered body`)
  return parsed.body
}

async function snapshot(file) {
  const xml = await fetchLiveSitemap()
  const locs = locsFromSitemap(xml)
  if (locs.size === 0) fail('no <loc> entries in the live sitemap; refusing to write a snapshot')
  writeFileSync(file, xml, 'utf8')
  console.log(`indexnow: snapshotted ${locs.size} live sitemap URL(s) to ${file}`)
}

// URLs added to or removed from the sitemap since the snapshot. Deliberately
// ignores <lastmod>: it is the build timestamp here, so every deploy would look
// like every page changed, which is the full-sitemap blast the protocol warns
// against.
function diffUrls(baselineXml, builtXml) {
  const previous = locsFromSitemap(baselineXml)
  const next = locsFromSitemap(builtXml)

  const added = [...next].filter(([key]) => !previous.has(key)).map(([, url]) => url)
  const removed = [...previous].filter(([key]) => !next.has(key)).map(([, url]) => url)

  return { added, removed }
}

async function submit(urlList, { dryRun }) {
  const body = { host: new URL(SITE_URL).host, key: INDEXNOW_KEY, urlList }

  if (dryRun) {
    console.log('indexnow: dry run, nothing submitted')
    console.log(JSON.stringify(body, null, 2))
    return
  }

  await verifyKeyFileIsLive()

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  // 200 = accepted, 202 = received with key validation pending (normal on the
  // first submission). Anything else is a real failure worth a non-zero exit.
  if (res.status !== 200 && res.status !== 202) {
    fail(`submission failed: ${res.status} ${await res.text()}`)
  }

  console.log(`indexnow: submitted ${urlList.length} URL(s) (${res.status})`)
  for (const url of urlList) console.log(`  ${url}`)
}

function parseArgs(argv) {
  const options = { dryRun: false, sitemap: false, snapshot: null, diff: null }
  const paths = []

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith('--')) {
      paths.push(arg)
      continue
    }

    const eq = arg.indexOf('=')
    const flag = eq === -1 ? arg : arg.slice(0, eq)
    const inline = eq === -1 ? null : arg.slice(eq + 1)
    const value = () => {
      const next = inline ?? argv[++i]
      if (!next || next.startsWith('--')) fail(`${flag} needs a file path`)
      return next
    }

    switch (flag) {
      case '--dry-run':
        options.dryRun = true
        break
      case '--sitemap':
        options.sitemap = true
        break
      case '--snapshot':
        options.snapshot = value()
        break
      case '--diff':
        options.diff = value()
        break
      default:
        fail(`unknown flag ${flag}`)
    }
  }

  return { options, paths }
}

async function main() {
  const { options, paths } = parseArgs(process.argv.slice(2))

  verifyKeyFileOnDisk()

  if (options.snapshot) {
    if (options.diff) fail('--snapshot and --diff are separate steps; run one at a time')
    await snapshot(options.snapshot)
    return
  }

  if (options.diff) {
    let baselineXml
    try {
      baselineXml = readFileSync(options.diff, 'utf8')
    } catch {
      // No snapshot means no way to tell what changed. Submitting the whole
      // sitemap instead would be the anti-pattern, so do nothing.
      console.warn(
        `indexnow: no sitemap snapshot at ${options.diff}, cannot tell what changed; submitting nothing`,
      )
      return
    }

    const { added, removed } = diffUrls(baselineXml, builtSitemapXml())
    if (added.length === 0 && removed.length === 0) {
      console.log('indexnow: sitemap URLs unchanged since the last deploy; submitting nothing')
      return
    }
    for (const url of added) console.log(`indexnow: added   ${url}`)
    for (const url of removed) console.log(`indexnow: removed ${url}`)
    await submit([...added, ...removed].slice(0, 10_000), options)
    return
  }

  let sitemapUrls = []
  if (options.sitemap) {
    sitemapUrls = [...locsFromSitemap(await fetchLiveSitemap()).values()]
    if (sitemapUrls.length === 0) fail(`no <loc> entries found in ${SITE_URL}/sitemap.xml`)
  }

  const urlList = [
    ...sitemapUrls,
    ...paths.map((url) =>
      url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`,
    ),
  ].slice(0, 10_000)

  if (urlList.length === 0) {
    fail('no URLs given. Pass paths or absolute URLs, or --sitemap, or --diff <snapshot>')
  }

  await submit(urlList, options)
}

await main()
