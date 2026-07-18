/**
 * Tolerant parsers for project text fields (requirements / milestones / hints).
 *
 * These columns have existed in TWO formats:
 *   - JSON arrays:            '["Loops", "Functions"]'
 *   - plain readable strings: "Loops, Functions"  or  "1. Design\n2. Build"
 *
 * Seed data (prisma/seed-projects.ts) uses plain strings, so rendering code
 * must NEVER call JSON.parse directly — a plain string crashes it.
 * These helpers accept both formats (client- and server-safe, no deps).
 */

function tryJsonArray(value: string): unknown[] | null {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Parse a list-typed field (requirements, hints) into string items.
 * JSON array → items; otherwise split on newlines (if present) or commas.
 */
export function parseStringList(value: string | null | undefined): string[] {
  if (!value) return [];

  const asJson = tryJsonArray(value);
  if (asJson) {
    return asJson
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  const separator = value.includes("\n") ? /\r?\n/ : /\s*,\s*/;
  return value
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface MilestoneItem {
  title: string;
  description: string;
}

/**
 * Parse milestones into { title, description } items.
 * Accepts JSON arrays of strings or objects, and plain "1. Step\n2. Step" text
 * (leading "1." / "1)" numbering is stripped).
 */
export function parseMilestones(value: string | null | undefined): MilestoneItem[] {
  if (!value) return [];

  const asJson = tryJsonArray(value);
  if (asJson) {
    return asJson
      .map((m): MilestoneItem => {
        if (typeof m === "string") return { title: m.trim(), description: "" };
        const obj = m as Record<string, unknown>;
        return {
          title: String(obj?.title ?? "").trim(),
          description: String(obj?.description ?? "").trim(),
        };
      })
      .filter((m) => m.title.length > 0);
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\d+[.)]\s+(.*)$/);
      return { title: (match ? match[1] : line).trim(), description: "" };
    });
}
