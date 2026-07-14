/**
 * JSON Field Helper — Transparently handles the difference between
 * PostgreSQL's `Json` type and SQLite's `String` type for JSON data.
 *
 * When using PostgreSQL with Prisma's `Json` type, Prisma automatically
 * parses the JSON and returns JavaScript objects. When using SQLite with
 * `String` type, Prisma returns raw strings that need manual parsing.
 *
 * This module provides helpers that work correctly with BOTH databases:
 * - On PostgreSQL: the parse/stringify calls are essentially no-ops
 * - On SQLite: they handle the necessary conversion
 */

/**
 * Parse a field that may be stored as String (SQLite) or Json (PostgreSQL).
 *
 * - PostgreSQL/Json: Prisma returns the object directly → returned as-is
 * - SQLite/String: Prisma returns a string → JSON.parse() is applied
 * - null/undefined: returned as-is
 *
 * @param value - The raw value from Prisma
 * @returns The parsed JavaScript value
 *
 * @example
 * // PostgreSQL: lesson.objectives is already ["Learn Python", "Write code"]
 * // SQLite:     lesson.objectives is '["Learn Python", "Write code"]'
 * const objectives = parseJsonField<string[]>(lesson.objectives);
 * // Both return: ["Learn Python", "Write code"]
 */
export function parseJsonField<T = unknown>(value: T | string | null | undefined): T | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      // Not valid JSON — return the raw string
      return value as unknown as T;
    }
  }

  // Already an object/array (PostgreSQL Json type) — return as-is
  return value;
}

/**
 * Stringify a value for writing to a JSON field.
 *
 * - On PostgreSQL: Prisma accepts objects directly for Json fields,
 *   so stringifying is safe (Prisma re-parses it) but unnecessary.
 *   We still stringify to ensure consistent behavior across both DBs.
 * - On SQLite: String fields require JSON.stringify().
 *
 * @param value - The JavaScript value to store
 * @returns A string for SQLite or a value Prisma can store for PostgreSQL
 *
 * @example
 * const objectives = ["Learn Python", "Write code"];
 * await db.lesson.create({
 *   data: { objectives: stringifyJsonField(objectives) }
 * });
 */
export function stringifyJsonField(value: unknown): string {
  if (typeof value === "string") {
    // Already a string — could be pre-stringified JSON or plain text.
    // Try to parse it to avoid double-stringifying.
    try {
      JSON.parse(value);
      return value; // It's already valid JSON string
    } catch {
      // Not JSON — stringify the plain string
      return JSON.stringify(value);
    }
  }

  return JSON.stringify(value);
}

/**
 * Type guard: checks if a value is a string (needs parsing for SQLite).
 */
export function needsParsing(value: unknown): value is string {
  return typeof value === "string";
}
