#!/usr/bin/env bash
#
# dev.sh: Portfolio dev server (TUI).
#
#   Frees the stale web port, optionally clears build caches (--force),
#   optionally tunnels through ngrok (--tunnel) with NEXT_PUBLIC_URL
#   injection, opens or refreshes the Chrome tab, then hands off to the
#   turbo TUI: the Next.js dev server in one pane, a watching TypeScript
#   checker in the other.
#
# Usage:
#   pnpm dev                normal boot
#   pnpm dev:force          clear .next, .turbo, node_modules/.cache first
#   pnpm dev:tunnel         boot with an ngrok tunnel + URL injection
#   bash scripts/dev.sh --help
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

# --- Config (per project) ---------------------------------------------------
WEB_PORT=3004                  # next dev (host-managed)

# --- Colors (only when stdout is a TTY) -------------------------------------
if [ -t 1 ]; then
  C_ACCENT='\033[38;5;33m'; C_DIM='\033[2m'; C_BOLD='\033[1m'; C_RESET='\033[0m'
else
  C_ACCENT=''; C_DIM=''; C_BOLD=''; C_RESET=''
fi

usage() {
  cat <<EOF
Usage: bash scripts/dev.sh [flags]

  --force, -f     Clear build caches (.next, .turbo, node_modules/.cache)
  --tunnel, -t    Start an ngrok tunnel and inject NEXT_PUBLIC_URL
  --port N, -p N  Override the web port (default $WEB_PORT)
  --help, -h      Show this help
EOF
}

# --- Flags -------------------------------------------------------------------
FORCE=false; TUNNEL=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --force|-f)          FORCE=true; shift ;;
    --tunnel|-t|--ngrok) TUNNEL=true; shift ;;   # --ngrok kept for muscle memory
    --port|-p)           WEB_PORT="$2"; shift 2 ;;
    --help|-h)           usage; exit 0 ;;
    *) echo "Unknown flag: $1" >&2; usage; exit 1 ;;
  esac
done

# --- Free the web port ---------------------------------------------------------
kill_port() {
  local port=$1 pids
  pids=$(lsof -ti:"$port" 2>/dev/null) || true
  if [ -n "$pids" ]; then
    echo "Killing processes on port $port..."
    echo "$pids" | xargs kill -9 2>/dev/null || true
  fi
}

kill_port "$WEB_PORT"

# --- Force: clear build caches ---------------------------------------------------
if $FORCE; then
  echo "Clearing build caches..."
  rm -rf "$REPO_ROOT/.next" "$REPO_ROOT/.turbo" "$REPO_ROOT/node_modules/.cache"
fi

# --- Tunnel (opt-in) ----------------------------------------------------------------
STARTED_NGROK=false
NGROK_URL=""
if $TUNNEL; then
  if ! command -v ngrok-url >/dev/null 2>&1; then
    echo "ngrok-url helper not found on PATH." >&2
    exit 1
  fi
  # Remember whether ngrok was already running so cleanup only kills our own.
  if ! curl -s -o /dev/null http://localhost:4040 2>/dev/null; then
    STARTED_NGROK=true
  fi
  NGROK_URL=$(ngrok-url "$WEB_PORT")
  if [ -z "$NGROK_URL" ]; then
    echo "Failed to get ngrok URL. Is ngrok authenticated?" >&2
    echo "Run: ngrok config add-authtoken <your-token>" >&2
    exit 1
  fi

  # Inject the tunnel URL for next dev (no NextAuth in this app).
  {
    echo ""
    echo "# Added by dev.sh --tunnel (removed on exit)"
    echo "NEXT_PUBLIC_URL=$NGROK_URL"
  } >> .env.local

  cleanup() {
    # Strip the injected block so stale tunnel URLs never leak into later runs.
    sed -i '' '/# Added by dev.sh --tunnel/,$d' .env.local 2>/dev/null || true
    if $STARTED_NGROK; then
      echo "Stopping ngrok..."
      killall ngrok 2>/dev/null || true
    fi
  }
  trap cleanup EXIT
fi

# --- Banner ----------------------------------------------------------------------------
LAN_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "")
echo ""
printf "${C_BOLD}  Portfolio${C_RESET}\n"
printf "  ${C_ACCENT}Local${C_RESET}     http://localhost:%s\n" "$WEB_PORT"
[ -n "$LAN_IP" ] && printf "  ${C_ACCENT}Network${C_RESET}   http://%s:%s\n" "$LAN_IP" "$WEB_PORT"
[ -n "$NGROK_URL" ] && printf "  ${C_ACCENT}Tunnel${C_RESET}    %s\n" "$NGROK_URL"
printf "${C_DIM}  TUI: arrows switch tasks / m toggle / q quit${C_RESET}\n"
echo ""

# --- Open or refresh Chrome ---------------------------------------------------------------
# Once the server responds: if Chrome already has a tab on this host:port,
# refresh and focus it; otherwise open a new tab; launch Chrome if needed.
(
  until curl -s -o /dev/null -m 2 "http://localhost:$WEB_PORT"; do sleep 1; done
  "$SCRIPT_DIR/lib/open-chrome-tab.sh" "http://localhost:$WEB_PORT" 2>/dev/null || true
) &

# --- Handoff ---------------------------------------------------------------------------------
echo "Starting dev servers..."
if $TUNNEL; then
  # No exec: the EXIT trap must survive to clean up injected tunnel config.
  pnpm exec turbo run dev:web dev:typecheck --ui tui
else
  exec pnpm exec turbo run dev:web dev:typecheck --ui tui
fi
