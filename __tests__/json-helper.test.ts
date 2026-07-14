/**
 * Tests for the JSON field helper utility.
 *
 * These tests verify that parseJsonField and stringifyJsonField work
 * correctly for both PostgreSQL (object already parsed) and SQLite
 * (raw JSON string) scenarios.
 */

import { describe, it, expect } from "vitest";
import { parseJsonField, stringifyJsonField, needsParsing } from "../src/lib/db/json-helper";

// ---------------------------------------------------------------------------
// parseJsonField
// ---------------------------------------------------------------------------

describe("parseJsonField", () => {
  // ── SQLite scenario: value is a JSON string ───────────────────────────

  describe("when value is a JSON string (SQLite)", () => {
    it("parses a JSON array string into an array", () => {
      const raw = '["Learn Python", "Write code"]';
      const result = parseJsonField<string[]>(raw);
      expect(result).toEqual(["Learn Python", "Write code"]);
    });

    it("parses a JSON object string into an object", () => {
      const raw = '{"type":"lessons_completed","count":5}';
      const result = parseJsonField(raw);
      expect(result).toEqual({ type: "lessons_completed", count: 5 });
    });

    it("parses a JSON number string", () => {
      const raw = "42";
      const result = parseJsonField(raw);
      expect(result).toBe(42);
    });

    it("parses a JSON boolean string", () => {
      expect(parseJsonField("true")).toBe(true);
      expect(parseJsonField("false")).toBe(false);
    });

    it("parses a JSON null string", () => {
      const result = parseJsonField("null");
      expect(result).toBeNull();
    });

    it("returns the raw string if it's not valid JSON", () => {
      const raw = "not json at all";
      const result = parseJsonField(raw);
      expect(result).toBe("not json at all");
    });

    it("parses nested objects", () => {
      const raw = '{"a":{"b":[1,2,3]}}';
      const result = parseJsonField(raw);
      expect(result).toEqual({ a: { b: [1, 2, 3] } });
    });

    it("parses empty array string", () => {
      const raw = "[]";
      const result = parseJsonField<string[]>(raw);
      expect(result).toEqual([]);
    });

    it("parses empty object string", () => {
      const raw = "{}";
      const result = parseJsonField(raw);
      expect(result).toEqual({});
    });
  });

  // ── PostgreSQL scenario: value is already an object ───────────────────

  describe("when value is already an object (PostgreSQL)", () => {
    it("returns the array as-is", () => {
      const raw = ["Learn Python", "Write code"];
      const result = parseJsonField<string[]>(raw);
      expect(result).toEqual(["Learn Python", "Write code"]);
    });

    it("returns the object as-is", () => {
      const raw = { type: "lessons_completed", count: 5 };
      const result = parseJsonField(raw);
      expect(result).toEqual({ type: "lessons_completed", count: 5 });
    });

    it("returns a number as-is", () => {
      expect(parseJsonField(42)).toBe(42);
    });

    it("returns a boolean as-is", () => {
      expect(parseJsonField(true)).toBe(true);
      expect(parseJsonField(false)).toBe(false);
    });
  });

  // ── Null / undefined ──────────────────────────────────────────────────

  describe("when value is null or undefined", () => {
    it("returns null for null", () => {
      expect(parseJsonField(null)).toBeNull();
    });

    it("returns null for undefined", () => {
      expect(parseJsonField(undefined)).toBeNull();
    });
  });

  // ── Test cases specific to PyMentor fields ────────────────────────────

  describe("PyMentor-specific field parsing", () => {
    it("parses lesson objectives (array of strings)", () => {
      const sqliteValue = '["Understand variables","Declare variables","Use type hints"]';
      const pgValue = ["Understand variables", "Declare variables", "Use type hints"];

      expect(parseJsonField<string[]>(sqliteValue)).toEqual(pgValue);
      expect(parseJsonField<string[]>(pgValue)).toEqual(pgValue);
    });

    it("parses exercise test cases (array of objects)", () => {
      const testCases = [
        { input: "hello", expected: "Hello" },
        { input: "world", expected: "World" },
      ];
      const sqliteValue = JSON.stringify(testCases);

      expect(parseJsonField(sqliteValue)).toEqual(testCases);
      expect(parseJsonField(testCases)).toEqual(testCases);
    });

    it("parses quiz options (array of strings)", () => {
      const options = ["print()", "echo()", "console.log()", "printf()"];
      const sqliteValue = JSON.stringify(options);

      expect(parseJsonField<string[]>(sqliteValue)).toEqual(options);
      expect(parseJsonField<string[]>(options)).toEqual(options);
    });

    it("parses achievement condition (object)", () => {
      const condition = { type: "lessons_completed", count: 5 };
      const sqliteValue = JSON.stringify(condition);

      expect(parseJsonField(sqliteValue)).toEqual(condition);
      expect(parseJsonField(condition)).toEqual(condition);
    });

    it("parses project requirements (array of strings)", () => {
      const requirements = ["Create a calculator", "Handle errors", "Add tests"];
      const sqliteValue = JSON.stringify(requirements);

      expect(parseJsonField<string[]>(sqliteValue)).toEqual(requirements);
      expect(parseJsonField<string[]>(requirements)).toEqual(requirements);
    });

    it("parses project milestones (array of objects)", () => {
      const milestones = [
        { title: "Setup", description: "Initialize project" },
        { title: "Core Logic", description: "Implement main features" },
      ];
      const sqliteValue = JSON.stringify(milestones);

      expect(parseJsonField(sqliteValue)).toEqual(milestones);
      expect(parseJsonField(milestones)).toEqual(milestones);
    });
  });
});

// ---------------------------------------------------------------------------
// stringifyJsonField
// ---------------------------------------------------------------------------

describe("stringifyJsonField", () => {
  it("stringifies an array", () => {
    const result = stringifyJsonField(["a", "b", "c"]);
    expect(result).toBe('["a","b","c"]');
  });

  it("stringifies an object", () => {
    const result = stringifyJsonField({ type: "streak", days: 7 });
    expect(result).toBe('{"type":"streak","days":7}');
  });

  it("stringifies an empty array", () => {
    const result = stringifyJsonField([]);
    expect(result).toBe("[]");
  });

  it("does not double-stringify a JSON string", () => {
    const alreadyStringified = '{"type":"lessons_completed","count":5}';
    const result = stringifyJsonField(alreadyStringified);
    expect(result).toBe(alreadyStringified);
  });

  it("stringifies a plain string (not JSON)", () => {
    const result = stringifyJsonField("hello world");
    expect(result).toBe('"hello world"');
  });

  it("stringifies a number", () => {
    const result = stringifyJsonField(42);
    expect(result).toBe("42");
  });

  it("stringifies a boolean", () => {
    expect(stringifyJsonField(true)).toBe("true");
    expect(stringifyJsonField(false)).toBe("false");
  });

  it("stringifies null", () => {
    const result = stringifyJsonField(null);
    expect(result).toBe("null");
  });

  // ── Round-trip: stringify → parse ─────────────────────────────────────

  describe("round-trip: stringify then parse", () => {
    it("round-trips an array", () => {
      const original = ["Learn Python", "Write code", "Have fun"];
      const stringified = stringifyJsonField(original);
      const parsed = parseJsonField<string[]>(stringified);
      expect(parsed).toEqual(original);
    });

    it("round-trips an object", () => {
      const original = { type: "lessons_completed", count: 5 };
      const stringified = stringifyJsonField(original);
      const parsed = parseJsonField(stringified);
      expect(parsed).toEqual(original);
    });

    it("round-trips test cases", () => {
      const original = [
        { input: "5", expected: "25" },
        { input: "10", expected: "100" },
      ];
      const stringified = stringifyJsonField(original);
      const parsed = parseJsonField(stringified);
      expect(parsed).toEqual(original);
    });

    it("round-trips empty array", () => {
      const original: string[] = [];
      const stringified = stringifyJsonField(original);
      const parsed = parseJsonField<string[]>(stringified);
      expect(parsed).toEqual(original);
    });
  });
});

// ---------------------------------------------------------------------------
// needsParsing
// ---------------------------------------------------------------------------

describe("needsParsing", () => {
  it("returns true for strings", () => {
    expect(needsParsing('["a","b"]')).toBe(true);
    expect(needsParsing("hello")).toBe(true);
    expect(needsParsing("")).toBe(true);
  });

  it("returns false for non-strings", () => {
    expect(needsParsing(["a", "b"])).toBe(false);
    expect(needsParsing({ a: 1 })).toBe(false);
    expect(needsParsing(42)).toBe(false);
    expect(needsParsing(true)).toBe(false);
    expect(needsParsing(null)).toBe(false);
    expect(needsParsing(undefined)).toBe(false);
  });
});
