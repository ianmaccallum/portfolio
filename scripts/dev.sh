#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

NGROK=false
for arg in "$@"; do
  case $arg in
    --ngrok) NGROK=true ;;
  esac
done

free_port() {
  local port=$1
  local pids
  pids=$(lsof -ti:"$port" 2>/dev/null) || true
  if [ -n "$pids" ]; then
    echo "Killing processes on port $port..."
    echo "$pids" | xargs kill -9 2>/dev/null || true
  fi
}

PORTS=(3004)
for port in "${PORTS[@]}"; do
  free_port "$port"
done

if $NGROK; then
  PORT=3004
  ENV_FILE="$REPO_ROOT/.env.local"

  echo "Getting ngrok URL for port $PORT..."
  NGROK_URL=$(ngrok-url "$PORT")

  if [ -z "$NGROK_URL" ]; then
    echo "Failed to get ngrok URL. Is ngrok authenticated?"
    echo "Run: ngrok config add-authtoken <your-token>"
    exit 1
  fi

  cat > "$ENV_FILE" <<EOF
NEXTAUTH_URL=$NGROK_URL
NEXT_PUBLIC_URL=$NGROK_URL
EOF

  echo ""
  echo "========================================="
  echo "  ngrok URL: $NGROK_URL"
  echo "========================================="
  echo ""
  echo "Wrote $ENV_FILE"
  echo ""
fi

echo "Starting dev servers..."
exec turbo run dev:web --ui tui
