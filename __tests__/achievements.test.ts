import { describe, it, expect } from "vitest";
import { countFixedErrors } from "../src/lib/achievements";

describe("countFixedErrors (errors_fixed achievement)", () => {
  it("returns 0 when there are no submissions", () => {
    expect(countFixedErrors([])).toBe(0);
  });

  it("counts an exercise that failed once and later passed", () => {
    expect(
      countFixedErrors([
        { exerciseId: "ex-1", status: "failed" },
        { exerciseId: "ex-1", status: "passed" },
      ])
    ).toBe(1);
  });

  it("treats 'error' submissions as failures that can be fixed", () => {
    expect(
      countFixedErrors([
        { exerciseId: "ex-1", status: "error" },
        { exerciseId: "ex-1", status: "passed" },
      ])
    ).toBe(1);
  });

  it("does not count exercises that only passed or only failed", () => {
    expect(
      countFixedErrors([
        { exerciseId: "ex-1", status: "passed" },
        { exerciseId: "ex-2", status: "failed" },
        { exerciseId: "ex-3", status: "error" },
      ])
    ).toBe(0);
  });

  it("counts each fixed exercise only once regardless of attempt count", () => {
    expect(
      countFixedErrors([
        { exerciseId: "ex-1", status: "failed" },
        { exerciseId: "ex-1", status: "failed" },
        { exerciseId: "ex-1", status: "error" },
        { exerciseId: "ex-1", status: "passed" },
        { exerciseId: "ex-1", status: "passed" },
      ])
    ).toBe(1);
  });

  it("counts multiple fixed exercises independently", () => {
    expect(
      countFixedErrors([
        { exerciseId: "ex-1", status: "failed" },
        { exerciseId: "ex-1", status: "passed" },
        { exerciseId: "ex-2", status: "error" },
        { exerciseId: "ex-2", status: "passed" },
        { exerciseId: "ex-3", status: "passed" },
      ])
    ).toBe(2);
  });

  it("ignores project submissions (no exerciseId)", () => {
    expect(
      countFixedErrors([
        { exerciseId: null, status: "failed" },
        { exerciseId: null, status: "passed" },
      ])
    ).toBe(0);
  });
});
