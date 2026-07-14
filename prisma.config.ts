// Prisma configuration — supports both PostgreSQL (cloud) and SQLite (npm local).
//
// The active schema is determined by the PRISMA_SCHEMA env var:
//   - unset or "postgresql" → prisma/schema.prisma (PostgreSQL)
//   - "sqlite"              → prisma/schema.sqlite.prisma (SQLite)
//
// Example commands:
//   PostgreSQL: npx prisma migrate dev --name init
//   SQLite:     PRISMA_SCHEMA=sqlite npx prisma migrate dev --name init
//
import "dotenv/config";
import { defineConfig } from "prisma/config";

const schemaName = process.env.PRISMA_SCHEMA || "postgresql";

const schemaPath =
  schemaName === "sqlite"
    ? "prisma/schema.sqlite.prisma"
    : "prisma/schema.prisma";

const migrationsPath =
  schemaName === "sqlite"
    ? "prisma/migrations.sqlite"
    : "prisma/migrations";

export default defineConfig({
  schema: schemaPath,
  migrations: {
    path: migrationsPath,
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
