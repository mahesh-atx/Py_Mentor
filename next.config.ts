import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Standalone output for npm distribution ──────────────────────────────
  // Produces .next/standalone/ with a self-contained server + minimal deps.
  // The prepare-dist.js script then copies static assets and public files
  // into the standalone directory to create a complete deployable package.
  // For cloud deployments (Render/Vercel), standalone mode is harmless —
  // the platform uses its own build output anyway.
  output: "standalone",

  serverExternalPackages: ["better-sqlite3", "@prisma/adapter-better-sqlite3"],

  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default nextConfig;
