import { IGNORE_OUTPUT_LINE } from "./output-match";

export interface ExerciseTestCase {
  input?: string;
  expectedOutput?: string;
}

export interface ExerciseGuide {
  task: string;
  todos: string[];
  sampleInput: string | null;
  expectedOutput: string | null;
  outputIsVariable: boolean;
}

/** Safely reads the first public test case from Prisma JSON or seed data. */
export function getFirstExerciseTestCase(value: unknown): ExerciseTestCase | null {
  if (!value) return null;

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(parsed) || !parsed[0] || typeof parsed[0] !== "object") {
      return null;
    }
    return parsed[0] as ExerciseTestCase;
  } catch {
    return null;
  }
}

function cleanPrompt(prompt: string): string {
  return String(prompt || "")
    .replace(/\r\n/g, "\n")
    // Sample input/output is rendered from the real test case below. Remove
    // common inline duplicates so displayed examples can never drift.
    .replace(/\s*\((?:Input|Example)\s*:[\s\S]*?(?:→|->)[\s\S]*?\)\s*$/i, "")
    .trim();
}

const ACTION_VERBS =
  "read|print|calculate|convert|return|store|create|use|display|check|handle|sort|find|define|call|raise|catch|open|write|remove|add|update|set|loop|iterate|count|validate|implement|compute";
const ACTION_SPLIT = new RegExp(
  `(?:,\\s*(?:then\\s+)?|\\s+and\\s+)(?=(?:${ACTION_VERBS})(?:s|es)?\\b)`,
  "i"
);
const THIRD_PERSON_ACTION = new RegExp(`^(${ACTION_VERBS})(?:s|es)\\b`, "i");
const IMPERATIVE_FORMS: Record<string, string> = {
  reads: "read", prints: "print", calculates: "calculate", converts: "convert",
  returns: "return", stores: "store", creates: "create", uses: "use",
  displays: "display", checks: "check", handles: "handle", sorts: "sort",
  finds: "find", defines: "define", calls: "call", raises: "raise",
  catches: "catch", opens: "open", writes: "write", removes: "remove",
  adds: "add", updates: "update", sets: "set", loops: "loop",
  iterates: "iterate", counts: "count", validates: "validate",
  implements: "implement", computes: "compute",
};

function toImperative(step: string): string {
  let result = step.replace(/^Write a program that\s+/i, "").trim();
  result = result.replace(THIRD_PERSON_ACTION, (verb) =>
    IMPERATIVE_FORMS[verb.toLowerCase()] || verb
  );
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function deriveTodos(prompt: string): string[] {
  const withoutCode = prompt.replace(/```[\s\S]*?```/g, "");
  const pieces = withoutCode
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z`])/)
    .flatMap((part) => part.split(ACTION_SPLIT))
    .map((part) => part.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter((part) => part && !/^(?:task|todo|sample input|expected output|format):?$/i.test(part))
    .map(toImperative)
    .filter((part, index, all) => all.indexOf(part) === index);

  const steps = pieces.slice(0, 8);
  if (steps.length === 0) steps.push("Complete the starter code to solve the task.");

  // A short prompt still gets a useful workflow rather than a one-item TODO.
  if (!steps.some((step) => /run|test|verify|output/i.test(step))) {
    steps.push("Run the program and verify that its output matches the expected output exactly.");
  }
  return steps;
}

/** Converts every legacy free-text exercise prompt into one consistent guide. */
export function buildExerciseGuide(
  prompt: string,
  testCase: ExerciseTestCase | null = null
): ExerciseGuide {
  const cleaned = cleanPrompt(prompt);
  const expected = testCase?.expectedOutput?.replace(/\r\n/g, "\n").trimEnd() ?? null;

  return {
    // Keep the complete legacy prompt here so no constraints, hints, code
    // blocks, or edge cases are lost during automatic standardization.
    task: cleaned || "Complete the exercise.",
    todos: deriveTodos(cleaned),
    sampleInput: testCase?.input ? testCase.input.replace(/\r\n/g, "\n").trimEnd() : null,
    expectedOutput: expected && expected !== IGNORE_OUTPUT_LINE ? expected : null,
    outputIsVariable: expected === IGNORE_OUTPUT_LINE || expected?.includes(IGNORE_OUTPUT_LINE) === true,
  };
}
