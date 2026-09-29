## Before you push

Run `pnpm check` before pushing. It runs, in order:

1. lint (`eslint .`)
2. build (Next.js typecheck plus build, then the OpenNext bundle for Cloudflare)

It assumes dependencies are already installed, takes about 20-30 seconds, and
never deploys or touches Cloudflare. If you change what CI runs, update check
to match.
