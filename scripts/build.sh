#!/usr/bin/env bash
#
# build.sh — Full build pipeline for PyMentor npm distribution
#
# Usage:
#   bash scripts/build.sh
#
# What it does:
#   1. Validates prerequisites
#   2. Generates the Prisma client (SQLite)
#   3. Builds Next.js with standalone output
#   4. Runs prepare-dist.js to assemble dist/
#   5. Validates the output
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

echo ""
echo "🔨 PyMentor Build Pipeline"
echo "   Mode: 🖥️  NPM (SQLite)"
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

export DATABASE_URL="file:./pymentor.db"
npx prisma generate

echo "   ✅ Prisma client generated"
echo ""

# ── Step 3: Next.js Build ───────────────────────────────────────────────
echo "📋 Step 3/5: Building Next.js..."

# Set SQLite URL for build time (server components may need it)
export DATABASE_URL="file:./pymentor.db"
npm run build

echo "   ✅ Next.js build complete"
echo ""

# ── Step 4: Prepare dist ────────────────────────────────────────────────
echo "📋 Step 4/5: Preparing dist/ for npm distribution..."
node scripts/prepare-dist.js
echo ""

# ── Step 5: Validate ────────────────────────────────────────────────────
echo "📋 Step 5/5: Validating build output..."

ERRORS=0

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

if [[ ! -f "dist/prisma/schema.prisma" ]]; then
  echo "   ❌ dist/prisma/schema.prisma not found"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ dist/prisma/schema.prisma exists"
fi

if [[ ! -d "dist/prisma/migrations" ]]; then
  echo "   ❌ dist/prisma/migrations/ not found"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ dist/prisma/migrations/ exists"
fi

if [[ ! -f "dist/pymentor.db" ]]; then
  echo "   ❌ dist/pymentor.db not found (run 'npm run db:push' and 'npm run db:seed' first)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ dist/pymentor.db exists"
fi

if [[ ! -f "dist/package.json" ]]; then
  echo "   ❌ dist/package.json not found"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ dist/package.json exists"
fi

echo ""

if [[ $ERRORS -gt 0 ]]; then
  echo "❌ Build completed with $ERRORS error(s)!"
  exit 1
fi

echo "🎉 Build completed successfully!"
echo ""
