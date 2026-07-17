// Prisma configuration — SQLite (single-database setup).
//
// PyMentor uses one local SQLite database for everything:
//   - Development:  DATABASE_URL="file:./pymentor.db" (see npm run db:push / db:seed)
//   - npm CLI:      DATABASE_URL is set by bin/cli.js to ~/.pymentor/pymentor.db
//
// Common commands:
//   npx prisma generate   # Generate the Prisma client
//   npx prisma db push    # Push the schema to the database
//   npx prisma db seed    # Seed the curriculum (runs prisma/seed.ts via tsx)
//
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
