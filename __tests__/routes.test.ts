/**
 * Route integrity guards.
 *
 * Regression guard for the "/dashboard" bug: the dashboard lives at "/"
 * (route group `(app)` has no `dashboard/` directory), so every
 * redirect / router.push / revalidatePath to "/dashboard" was a 404.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const SRC = path.join(__dirname, "..", "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(p);
  }
  return out;
}

describe("Route integrity", () => {
  it("the dashboard route exists at / (src/app/(app)/page.tsx)", () => {
    expect(fs.existsSync(path.join(SRC, "app", "(app)", "page.tsx"))).toBe(true);
  });

  it("no code references the non-existent /dashboard route", () => {
    const offenders: string[] = [];
    for (const file of walk(SRC)) {
      const content = fs.readFileSync(file, "utf-8");
      // Match "/dashboard" or '/dashboard' string literals (exact route, not prefixes)
      if (/["'`]\/dashboard["'`]/.test(content)) {
        offenders.push(path.relative(SRC, file));
      }
    }
    expect(offenders).toEqual([]);
  });
});
