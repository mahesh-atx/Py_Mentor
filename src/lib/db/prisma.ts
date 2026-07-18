/**
 * Prisma Database Client — SQLite
 *
 * PyMentor is a single-user, offline-capable app. All data lives in one
 * local SQLite database file:
 *   - Development:  ./pymentor.db (repo root)
 *   - npm CLI:      ~/.pymentor/pymentor.db (set by bin/cli.js via DATABASE_URL)
 *
 * Prisma 7 requires a driver adapter, so connections go through
 * @prisma/adapter-better-sqlite3. The database location is controlled by
 * the DATABASE_URL env var (e.g. "file:./pymentor.db").
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  try {
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
    const url = process.env.DATABASE_URL || "file:./pymentor.db";
    const adapter = new PrismaBetterSqlite3({ url });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("[prisma] Failed to initialize the SQLite client.", error);
    throw new Error(
      "PyMentor requires '@prisma/adapter-better-sqlite3' for its local database. " +
        "Install it with: npm install @prisma/adapter-better-sqlite3"
    );
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
