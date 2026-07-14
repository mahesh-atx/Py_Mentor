#!/usr/bin/env bash
#
# download-pyodide.sh — Downloads Pyodide WASM bundle for offline usage
#
# This script downloads the Pyodide runtime (~15 MB) into public/pyodide/
# so the app works fully offline when distributed via npm.
#
# Usage:
#   bash scripts/download-pyodide.sh          # Download latest tested version
#   bash scripts/download-pyodide.sh --clean   # Remove existing and re-download
#
# After running this, the files are served by Next.js from public/pyodide/
# and the usePyodide hook loads them locally instead of from CDN.
#
set -euo pipefail

PYODIDE_VERSION="0.27.7"
CDN_BASE="https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full"
TARGET_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/pyodide"

# Files needed for Pyodide to work
FILES=(
  "pyodide.mjs"
  "pyodide.js"
  "pyodide.wasm"
  "python_stdlib.zip"
  "package.json"
)

# ── Handle --clean ────────────────────────────────────────────────────────
if [[ "${1:-}" == "--clean" ]]; then
  echo "🧹 Cleaning existing Pyodide bundle..."
  rm -rf "$TARGET_DIR"
fi

# ── Skip if already downloaded ──────────────────────────────────────────
if [[ -f "$TARGET_DIR/pyodide.wasm" ]]; then
  echo "✅ Pyodide v${PYODIDE_VERSION} already exists at public/pyodide/"
  echo "   Run with --clean to force re-download."
  exit 0
fi

echo ""
echo "📥 Downloading Pyodide v${PYODIDE_VERSION} for offline use..."
echo "   Target: $TARGET_DIR"
echo ""

mkdir -p "$TARGET_DIR"

for file in "${FILES[@]}"; do
  echo "  → Downloading $file..."
  curl -L --fail --progress-bar -o "$TARGET_DIR/$file" "${CDN_BASE}/${file}"
done

echo ""
echo "✅ Pyodide v${PYODIDE_VERSION} downloaded successfully!"
echo "   Location: public/pyodide/"
echo ""

# Show total size
TOTAL_SIZE=$(du -sh "$TARGET_DIR" | cut -f1)
echo "   Total size: $TOTAL_SIZE"
echo ""
echo "   The app will now work fully offline for Python code execution."
