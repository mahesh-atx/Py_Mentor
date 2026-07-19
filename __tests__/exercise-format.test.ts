import { describe, expect, it } from "vitest";
import {
  buildExerciseGuide,
  getFirstExerciseTestCase,
} from "../src/lib/exercise-format";
import { IGNORE_OUTPUT_LINE } from "../src/lib/output-match";

describe("standard exercise format", () => {
  it("builds Task, TODO and Expected Output for a no-input exercise", () => {
    const guide = buildExerciseGuide(
      "Parse an integer safely. If conversion raises ValueError, print the required message.",
      { input: "", expectedOutput: "'abc' is not a whole number\n" }
    );

    expect(guide.task).toBe(
      "Parse an integer safely. If conversion raises ValueError, print the required message."
    );
    expect(guide.todos).toEqual(expect.arrayContaining([
      "Parse an integer safely.",
      "If conversion raises ValueError",
      "Print the required message.",
    ]));
    expect(guide.sampleInput).toBeNull();
    expect(guide.expectedOutput).toBe("'abc' is not a whole number");
  });

  it("uses the real test case for sample input and output", () => {
    const guide = buildExerciseGuide(
      "Read an integer and print whether it is even or odd. (Input: 7 → Output: Odd)",
      { input: "7\n", expectedOutput: "Odd\n" }
    );

    expect(guide.task).toBe("Read an integer and print whether it is even or odd.");
    expect(guide.sampleInput).toBe("7");
    expect(guide.expectedOutput).toBe("Odd");
    expect(guide.todos.at(-1)).toMatch(/verify.*expected output/i);
  });

  it("does not expose output-match sentinel text to learners", () => {
    const guide = buildExerciseGuide("Print the current object id.", {
      input: "",
      expectedOutput: `${IGNORE_OUTPUT_LINE}\n`,
    });

    expect(guide.expectedOutput).toBeNull();
    expect(guide.outputIsVariable).toBe(true);
  });

  it("parses Prisma JSON test cases safely", () => {
    expect(getFirstExerciseTestCase('[{"input":"3\\n","expectedOutput":"9\\n"}]'))
      .toEqual({ input: "3\n", expectedOutput: "9\n" });
    expect(getFirstExerciseTestCase("not-json")).toBeNull();
    expect(getFirstExerciseTestCase([])).toBeNull();
  });

  it("turns coordinated legacy requirements into imperative TODO steps", () => {
    const guide = buildExerciseGuide(
      "Write a program that reads a positive integer and calculates the sum of its digits using a while loop.",
      { input: "1234\n", expectedOutput: "10\n" }
    );

    expect(guide.todos).toEqual(expect.arrayContaining([
      "Read a positive integer",
      "Calculate the sum of its digits using a while loop.",
    ]));
  });

  it("always provides actionable TODO steps for short legacy prompts", () => {
    const guide = buildExerciseGuide("Print hello.", {
      input: "",
      expectedOutput: "hello\n",
    });

    expect(guide.todos.length).toBeGreaterThanOrEqual(2);
    expect(guide.todos.at(-1)).toMatch(/run the program/i);
  });
});
