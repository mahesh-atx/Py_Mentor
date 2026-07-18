/**
 * Tests for the tolerant project-field parsers.
 *
 * Regression guard: /projects/[slug] crashed because the client called
 * JSON.parse on seed data stored as PLAIN strings ("Variables, Loops")
 * instead of JSON arrays. The phase accordion also split milestones on a
 * literal backslash-n instead of real newlines.
 */

import { describe, it, expect } from "vitest";
import {
  parseStringList,
  parseMilestones,
} from "../src/lib/parse-project-fields";

describe("parseStringList", () => {
  it("parses JSON arrays", () => {
    expect(parseStringList('["Loops", "Functions"]')).toEqual(["Loops", "Functions"]);
  });

  it("parses comma-separated plain strings (seed format)", () => {
    expect(parseStringList("Variables, Operators, F-strings, Rounding")).toEqual([
      "Variables",
      "Operators",
      "F-strings",
      "Rounding",
    ]);
  });

  it("parses newline-separated plain strings", () => {
    expect(parseStringList("Alpha\nBeta\nGamma")).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("returns [] for null/undefined/empty", () => {
    expect(parseStringList(null)).toEqual([]);
    expect(parseStringList(undefined)).toEqual([]);
    expect(parseStringList("")).toEqual([]);
  });

  it("never throws on malformed JSON-looking input", () => {
    expect(parseStringList("[unclosed")).toEqual(["[unclosed"]);
    expect(parseStringList("{not: 'json'}")).toEqual(["{not: 'json'}"]);
  });

  it("keeps a single plain string as one item", () => {
    expect(parseStringList("All Phase 1-3 concepts")).toEqual(["All Phase 1-3 concepts"]);
  });
});

describe("parseMilestones", () => {
  it("parses JSON object arrays", () => {
    expect(
      parseMilestones('[{"title":"Design","description":"Plan it"},{"title":"Build","description":"Ship it"}]')
    ).toEqual([
      { title: "Design", description: "Plan it" },
      { title: "Build", description: "Ship it" },
    ]);
  });

  it("parses JSON string arrays", () => {
    expect(parseMilestones('["Design", "Build"]')).toEqual([
      { title: "Design", description: "" },
      { title: "Build", description: "" },
    ]);
  });

  it("parses numbered plain-text milestones on REAL newlines (seed format)", () => {
    expect(parseMilestones("1. Get Input\n2. Calculate total\n3. Display output")).toEqual([
      { title: "Get Input", description: "" },
      { title: "Calculate total", description: "" },
      { title: "Display output", description: "" },
    ]);
  });

  it("strips '1)' style numbering too and ignores blank lines", () => {
    expect(parseMilestones("1) Design\n\n2) Build")).toEqual([
      { title: "Design", description: "" },
      { title: "Build", description: "" },
    ]);
  });

  it("returns [] for null/undefined/empty", () => {
    expect(parseMilestones(null)).toEqual([]);
    expect(parseMilestones(undefined)).toEqual([]);
    expect(parseMilestones("")).toEqual([]);
  });
});
