import { describe, it, expect } from "vitest";
import { outputsMatch, IGNORE_OUTPUT_LINE } from "../src/lib/output-match";

describe("outputsMatch", () => {
  it("matches identical outputs", () => {
    expect(outputsMatch("Hello\n", "Hello\n")).toBe(true);
  });

  it("ignores surrounding whitespace differences", () => {
    expect(outputsMatch("  Hello\n\n", "Hello")).toBe(true);
  });

  it("rejects different outputs", () => {
    expect(outputsMatch("Hello", "Goodbye")).toBe(false);
  });

  it("full-output sentinel matches anything, including empty output", () => {
    expect(outputsMatch("10864200", IGNORE_OUTPUT_LINE)).toBe(true);
    expect(outputsMatch("", IGNORE_OUTPUT_LINE)).toBe(true);
    expect(outputsMatch("line1\nline2", IGNORE_OUTPUT_LINE)).toBe(true);
  });

  it("sentinel line acts as a per-line wildcard", () => {
    expect(outputsMatch("9.0\nbanana", `9.0\n${IGNORE_OUTPUT_LINE}`)).toBe(true);
    expect(outputsMatch("9.0\napple", `9.0\n${IGNORE_OUTPUT_LINE}`)).toBe(true);
  });

  it("per-line wildcard still rejects wrong fixed lines", () => {
    expect(outputsMatch("8.0\napple", `9.0\n${IGNORE_OUTPUT_LINE}`)).toBe(false);
  });

  it("per-line wildcard rejects mismatched line counts", () => {
    expect(outputsMatch("9.0", `9.0\n${IGNORE_OUTPUT_LINE}`)).toBe(false);
    expect(outputsMatch("9.0\na\nb", `9.0\n${IGNORE_OUTPUT_LINE}`)).toBe(false);
  });

  it("mixed sentinel with surrounding whitespace on the line", () => {
    expect(
      outputsMatch("x\ny", `x\n  ${IGNORE_OUTPUT_LINE}  `)
    ).toBe(true);
  });
});
