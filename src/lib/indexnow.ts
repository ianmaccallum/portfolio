import { siteUrl } from '@/lib/info'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

// Public by design: served at /<key>.txt so search engines can verify domain
// ownership. This is the single source of truth for the key: it must stay
// byte-identical to public/21706c68767f0f3850d7b3484bfc3a0a.txt or every
// submission 403s, and scripts/indexnow-submit.mjs parses the literal out of
// this file instead of mirroring it, then verifies the key file against it.
export const INDEXNOW_KEY = '21706c68767f0f3850d7b3484bfc3a0a'

/**
 * Notify IndexNow-participating search engines (Bing, Yandex, Naver, Seznam,
 * Yep) that URLs were added, updated, or deleted. Google does not participate;
 * it still relies on the sitemap.
 *
 * Accepts absolute URLs or site-relative paths ('/apps'). No-ops outside
 * production so dev and preview never ping live engines, and never throws so an
 * indexing ping can't break the flow that triggered it.
 */
export async function submitToIndexNow(urls: string | string[]): Promise<void> {
  if (process.env.NODE_ENV !== 'production') return

  const urlList = (Array.isArray(urls) ? urls : [urls])
    .map((url) => (url.startsWith('http') ? url : `${siteUrl}${url}`))
    .slice(0, 10_000)
  if (urlList.length === 0) return

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(siteUrl).host,
        key: INDEXNOW_KEY,
        urlList,
      }),
    })

    // 202 means "received, key validation pending" and is normal on first use.
    if (!res.ok && res.status !== 202) {
      console.error(`IndexNow submission failed: ${res.status}`)
    }
  } catch (error) {
    console.error('IndexNow submission error:', error)
  }
}
