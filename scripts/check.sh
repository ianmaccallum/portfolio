#!/usr/bin/env bash
#
# check.sh: pre-push verification, mirrors what CI runs before it deploys.
#
# Assumes dependencies are already installed. Never deploys, never touches
# Cloudflare, never needs production secrets.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

echo "==> lint"
pnpm lint

echo "==> build (Next.js typecheck + build, then OpenNext for Cloudflare)"
pnpm exec turbo run build:cf

echo "All checks passed."
