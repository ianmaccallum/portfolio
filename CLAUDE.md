# portfolio

Ian MacCallum's personal site, live at [ian.maccallum.dev](https://ian.maccallum.dev).

A fully static Next.js 16 App Router site (React 19, TypeScript, Tailwind CSS 4),
deployed to Cloudflare Workers via OpenNext by `.github/workflows/deploy.yml`.
There is no database, no auth, and no API routes: every page is prerendered at
build time.

## Layout

- `src/app`: routes. Public indexable pages are `/` (`page.tsx`) and `/apps`
  (`apps/page.tsx`), plus the generated `robots.txt`, `sitemap.xml`, and the
  `opengraph-image` / `twitter-image` routes.
- `src/lib/info.ts`: single source of truth for site identity. `siteUrl`
  (`https://ian.maccallum.dev`) feeds `metadataBase`, the sitemap, and robots.
  Use it instead of hardcoding the domain or reading an env var.
- `src/components`: page sections and UI. `src/images`: imported assets.
- `public`: files served verbatim at the domain root (resume PDF, IndexNow key).

## Commands

Package manager is pnpm.

```bash
pnpm dev          # scripts/dev.sh: frees the port, starts Next on :3004, turbo TUI
pnpm dev:web      # Next.js only on :3004
pnpm lint
pnpm exec tsc --noEmit   # typecheck
pnpm build:cf     # Next + OpenNext build for Cloudflare
pnpm deploy       # build:cf + wrangler deploy
```

## IndexNow

This project uses IndexNow (key in `INDEXNOW_KEY`, key file at `/<key>.txt`,
helper in `src/lib/indexnow.ts`). When making changes that add, update,
delete, or rename any publicly indexable page:

- Call `submitToIndexNow(url)` in the code path that publishes the change
  (fire-and-forget with `void`, never block or throw on it).
- On slug renames, submit both the old and new URLs.
- On deletions, submit the deleted URL so engines drop it.
- Never submit unchanged URLs or the full sitemap; submissions count
  toward crawl quota.
- New page types (routes, models with public pages) must wire their
  publish/update/delete flows into the helper before shipping.

This site is currently fully static, so there is no server-side publish flow to
hook: nothing calls `submitToIndexNow` at runtime. If a route handler, server
action, or CMS is ever added, wire the helper into it per the rules above.

Until then, two things cover the static case:

- **Per deploy, automatically.** `.github/workflows/deploy.yml` snapshots the
  live sitemap before `wrangler deploy`, then diffs the freshly built sitemap
  against that snapshot and submits only the URLs this deploy added or removed.
  Both steps are `continue-on-error`, so indexing can never fail a deploy. The
  diff intentionally ignores `<lastmod>` (it is the build timestamp, so trusting
  it would resubmit every URL on every deploy).
- **By hand, for edits to an existing page**, which the URL diff cannot see:

  ```bash
  pnpm indexnow /apps                 # one or more paths or absolute URLs
  pnpm indexnow --sitemap             # every URL in the live sitemap (setup only)
  pnpm indexnow --dry-run /apps       # print the payload, submit nothing
  ```

Adding or removing a route means editing `src/app/sitemap.ts`; that file is both
what Google crawls and what the deploy diff compares.

The key exists in exactly two places and they must stay byte-identical:
`INDEXNOW_KEY` in `src/lib/indexnow.ts` (the source of truth) and the contents of
`public/21706c68767f0f3850d7b3484bfc3a0a.txt` (no trailing newline). The script
parses the key and the canonical host out of `src/lib/indexnow.ts` and
`src/lib/info.ts` rather than mirroring them, checks the key file on disk, and
also fetches `https://ian.maccallum.dev/<key>.txt` before submitting: if the live
host does not serve the key file, engines cannot verify ownership and every
submission returns 403.

Known gap: `ian.maccallum.dev` is still served by the old Vercel deployment of
`origin/main`, not by the Cloudflare worker this branch deploys, so the key file
404s in production until either the IndexNow files land on `origin/main` or the
custom domain is attached to the worker (`wrangler.jsonc`: add `routes` with
`custom_domain: true`, set `workers_dev` to false). Attaching it is blocked until
the zone moves to Cloudflare: `maccallum.dev` still uses the registrar's
nameservers (`dns1.registrar-servers.com`) and `ian.maccallum.dev` CNAMEs to
Vercel, so `wrangler deploy` would reject a `custom_domain` route today. Verify
with `curl https://ian.maccallum.dev/21706c68767f0f3850d7b3484bfc3a0a.txt`
before expecting any submission to succeed.
