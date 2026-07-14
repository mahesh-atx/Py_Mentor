/**
 * Prisma Database Client — Auto-detecting PostgreSQL vs SQLite
 *
 * This module creates the appropriate PrismaClient based on the DATABASE_URL:
 * - `file:` prefix → SQLite (for npm local installs)
 * - `postgresql://` or `postgres://` → PostgreSQL (for cloud deployments)
 *
 * SQLite mode uses a plain PrismaClient (no adapter needed).
 * PostgreSQL mode uses the pg Pool + PrismaPg adapter (original setup).
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Detect which database provider to use based on DATABASE_URL.
 * - Starts with "file:" → SQLite
 * - Starts with "postgresql://" or "postgres://" → PostgreSQL
 * - Fallback → SQLite (safe default for local/offline usage)
 */
function getProvider(): "sqlite" | "postgresql" {
  const url = process.env.DATABASE_URL || "";
  if (
    url.startsWith("postgresql://") ||
    url.startsWith("postgres://")
  ) {
    return "postgresql";
  }
  // Default to SQLite for file: URLs, empty URLs, or any other format
  return "sqlite";
}

function createPrismaClient() {
  const provider = getProvider();

  if (provider === "postgresql") {
    // ── PostgreSQL with pg Pool + PrismaPg adapter (original setup) ──
    // Dynamic imports so pg/adapter are only loaded when needed
    // (npm package users won't have these installed)
    try {
      const { Pool } = require("pg");
      const { PrismaPg } = require("@prisma/adapter-pg");
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const adapter = new PrismaPg(pool);
      return new PrismaClient({ adapter });
    } catch (error) {
      console.error(
        "[prisma] PostgreSQL mode requested but pg/adapter not available.",
        error
      );
      throw new Error(
        "PostgreSQL mode requires 'pg' and '@prisma/adapter-pg' packages. " +
        "Install them or switch to SQLite with DATABASE_URL=file:./db.sqlite"
      );
    }
  }

  // ── SQLite with better-sqlite3 adapter (Prisma 7 requires adapters) ──
  try {
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || "file:./pymentor.db",
    });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error(
      "[prisma] SQLite mode requested but adapter not available.",
      error
    );
    throw new Error(
      "SQLite mode requires '@prisma/adapter-better-sqlite3' package. " +
      "Install it with: npm install @prisma/adapter-better-sqlite3"
    );
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

/**
 * Export the provider detection for use in other modules (e.g., json-helper).
 */
export { getProvider };
