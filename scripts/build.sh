#!/usr/bin/env bash
#
# build.sh — Full build pipeline for PyMentor npm distribution
#
# Usage:
#   bash scripts/build.sh           # Build for npm (SQLite)
#   bash scripts/build.sh --cloud   # Build for cloud (PostgreSQL)
#
# What it does (npm mode):
#   1. Validates prerequisites
#   2. Generates Prisma client for SQLite
#   3. Builds Next.js with standalone output
#   4. Runs prepare-dist.js to assemble dist/
#   5. Validates the output
#
set -euo pipefail

# ── Configuration ────────────────────────────────────────────────────────
CLOUD_MODE=false
if [[ "${1:-}" == "--cloud" ]]; then
  CLOUD_MODE=true
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

echo ""
echo "🔨 PyMentor Build Pipeline"
echo "   Mode: $($CLOUD_MODE && echo '☁️  Cloud (PostgreSQL)' || echo '🖥️  NPM (SQLite)')"
echo "   Root: $ROOT_DIR"
echo ""

# ── Step 1: Prerequisites ────────────────────────────────────────────────
echo "📋 Step 1/5: Checking prerequisites..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js >= 18."
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [[ "$NODE_VERSION" -lt 18 ]]; then
  echo "❌ Node.js >= 18 required. Current: $(node -v)"
  exit 1
fi

echo "   ✅ Node.js $(node -v)"

if [[ ! -d "node_modules" ]]; then
  echo "   📦 Installing dependencies..."
  npm install
fi

echo ""

# ── Step 2: Prisma Generate ─────────────────────────────────────────────
echo "📋 Step 2/5: Generating Prisma client..."

if $CLOUD_MODE; then
  # Cloud mode: use PostgreSQL schema
  npx prisma generate --schema=prisma/schema.prisma
else
  # NPM mode: use SQLite schema
  export DATABASE_URL="file:./pymentor.db"
  npx prisma generate --schema=prisma/schema.sqlite.prisma
fi

echo "   ✅ Prisma client generated"
echo ""

# ── Step 3: Next.js Build ───────────────────────────────────────────────
echo "📋 Step 3/5: Building Next.js..."

if $CLOUD_MODE; then
  npm run build
else
  # Set SQLite URL for build time (server components may need it)
  export DATABASE_URL="file:./pymentor.db"
  npm run build
fi

echo "   ✅ Next.js build complete"
echo ""

# ── Step 4: Prepare dist ────────────────────────────────────────────────
if ! $CLOUD_MODE; then
  echo "📋 Step 4/5: Preparing dist/ for npm distribution..."
  node scripts/prepare-dist.js
  echo ""
else
  echo "📋 Step 4/5: Skipping dist preparation (cloud mode)"
  echo ""
fi

# ── Step 5: Validate ────────────────────────────────────────────────────
echo "📋 Step 5/5: Validating build output..."

ERRORS=0

if $CLOUD_MODE; then
  # Cloud: just check .next exists
  if [[ ! -d ".next" ]]; then
    echo "   ❌ .next/ directory not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ .next/ exists"
  fi
else
  # NPM: validate dist structure
  if [[ ! -f "dist/server/server.js" ]]; then
    echo "   ❌ dist/server/server.js not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/server/server.js exists"
  fi

  if [[ ! -d "dist/server/.next/static" ]]; then
    echo "   ❌ dist/server/.next/static/ not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/server/.next/static/ exists"
  fi

  if [[ ! -d "dist/server/public" ]]; then
    echo "   ❌ dist/server/public/ not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/server/public/ exists"
  fi

  if [[ ! -f "dist/prisma/schema.sqlite.prisma" ]]; then
    echo "   ❌ dist/prisma/schema.sqlite.prisma not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/prisma/schema.sqlite.prisma exists"
  fi

  if [[ ! -d "dist/prisma/migrations.sqlite" ]]; then
    echo "   ❌ dist/prisma/migrations.sqlite/ not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/prisma/migrations.sqlite/ exists"
  fi

  if [[ ! -f "dist/seed/seed.js" ]]; then
    echo "   ❌ dist/seed/seed.js not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/seed/seed.js exists"
  fi

  if [[ ! -f "dist/package.json" ]]; then
    echo "   ❌ dist/package.json not found"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ dist/package.json exists"
  fi
fi

echo ""

if [[ $ERRORS -gt 0 ]]; then
  echo "❌ Build completed with $ERRORS error(s)!"
  exit 1
fi

echo "🎉 Build completed successfully!"
echo ""
