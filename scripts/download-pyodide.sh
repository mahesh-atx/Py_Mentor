#!/usr/bin/env bash
#
# download-pyodide.sh — Sets up Pyodide WASM bundle for offline usage
#
# This script copies the Pyodide runtime (~13 MB) into public/pyodide/
# so the app works fully offline when distributed via npm.
#
# It tries two sources:
#   1. node_modules/pyodide/ (from the npm package — works offline)
#   2. CDN download from cdn.jsdelivr.net (requires internet)
#
# Usage:
#   bash scripts/download-pyodide.sh          # Copy from node_modules or download
#   bash scripts/download-pyodide.sh --clean   # Remove existing and re-copy/download
#
set -euo pipefail

PYODIDE_VERSION="0.27.7"
CDN_BASE="https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="${ROOT_DIR}/public/pyodide"
NODE_MODULES_DIR="${ROOT_DIR}/node_modules/pyodide"

# Files needed for Pyodide to work
FILES=(
  "pyodide.mjs"
  "pyodide.js"
  "pyodide.asm.wasm"
  "pyodide.asm.mjs"
  "python_stdlib.zip"
  "pyodide-lock.json"
  "package.json"
)

# ── Handle --clean ────────────────────────────────────────────────────────
if [[ "${1:-}" == "--clean" ]]; then
  echo "🧹 Cleaning existing Pyodide bundle..."
  rm -rf "$TARGET_DIR"
fi

# ── Skip if already downloaded ──────────────────────────────────────────
if [[ -f "$TARGET_DIR/pyodide.asm.wasm" ]]; then
  echo "✅ Pyodide already exists at public/pyodide/"
  echo "   Run with --clean to force re-download."
  exit 0
fi

# ── Method 1: Copy from node_modules ──────────────────────────────────────
if [[ -f "$NODE_MODULES_DIR/pyodide.mjs" ]]; then
  echo ""
  echo "📦 Copying Pyodide from node_modules/pyodide/..."
  echo "   Target: $TARGET_DIR"
  echo ""

  mkdir -p "$TARGET_DIR"

  for file in "${FILES[@]}"; do
    if [[ -f "$NODE_MODULES_DIR/$file" ]]; then
      echo "  → Copying $file..."
      cp "$NODE_MODULES_DIR/$file" "$TARGET_DIR/$file"
    else
      echo "  ⚠️  $file not found in node_modules/pyodide/"
    fi
  done

  echo ""
  echo "✅ Pyodide copied from node_modules successfully!"
  echo "   Location: public/pyodide/"
  echo ""

  TOTAL_SIZE=$(du -sh "$TARGET_DIR" | cut -f1)
  echo "   Total size: $TOTAL_SIZE"
  echo ""
  echo "   The app will now work fully offline for Python code execution."
  exit 0
fi

# ── Method 2: Download from CDN ──────────────────────────────────────────
echo ""
echo "📥 Downloading Pyodide v${PYODIDE_VERSION} from CDN..."
echo "   Target: $TARGET_DIR"
echo ""

mkdir -p "$TARGET_DIR"

CDN_FILES=(
  "pyodide.mjs"
  "pyodide.js"
  "pyodide.wasm"
  "python_stdlib.zip"
  "package.json"
)

for file in "${CDN_FILES[@]}"; do
  echo "  → Downloading $file..."
  if ! curl -L --fail --progress-bar -o "$TARGET_DIR/$file" "${CDN_BASE}/${file}" 2>/dev/null; then
    echo "  ❌ Failed to download $file"
    echo ""
    echo "  💡 Install the Pyodide npm package instead:"
    echo "     npm install pyodide"
    echo "     bash scripts/download-pyodide.sh"
    exit 1
  fi
done

echo ""
echo "✅ Pyodide v${PYODIDE_VERSION} downloaded successfully!"
echo "   Location: public/pyodide/"
echo ""

TOTAL_SIZE=$(du -sh "$TARGET_DIR" | cut -f1)
echo "   Total size: $TOTAL_SIZE"
echo ""
echo "   The app will now work fully offline for Python code execution."
