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
    // Examples are rendered from the actual test case, which prevents stale
    // input/output text from being repeated in the task description.
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

function stripListMarker(value: string): string {
  return value.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim();
}

function finishSentence(value: string): string {
  const trimmed = value.trim();
  return /[.!?`]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function toImperative(step: string): string {
  let result = step.replace(/^Write a program that\s+/i, "").trim();
  result = result.replace(THIRD_PERSON_ACTION, (verb) =>
    IMPERATIVE_FORMS[verb.toLowerCase()] || verb
  );
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return finishSentence(result);
}

type ListAction = "print" | "raise" | "implement" | "support" | "return" | "require";

function inferListAction(intro: string): ListAction {
  if (/\b(?:print|output|display|formatted? as)\b/i.test(intro)) return "print";
  if (/\braises?\b/i.test(intro)) return "raise";
  if (/\bimplements?\b/i.test(intro)) return "implement";
  if (/\bsupports?\b/i.test(intro)) return "support";
  if (/\breturns?\b/i.test(intro)) return "return";
  return "require";
}

function asInlineCode(value: string): string {
  const trimmed = value.trim().replace(/[.!]$/, "");
  return trimmed.startsWith("`") && trimmed.endsWith("`")
    ? trimmed
    : `\`${trimmed}\``;
}

function listItemToTodo(item: string, action: ListAction): string {
  const value = stripListMarker(item);
  if (!value) return "";
  if (new RegExp(`^(?:${ACTION_VERBS})\\b`, "i").test(value)) {
    return toImperative(value);
  }

  switch (action) {
    case "print":
      return `Print ${asInlineCode(value)}.`;
    case "raise":
      return finishSentence(`Raise ${value}`);
    case "implement":
      return finishSentence(`Implement ${value}`);
    case "support":
      return finishSentence(`Support ${value}`);
    case "return":
      return finishSentence(`Return ${value}`);
    default:
      return finishSentence(value);
  }
}

function splitStructuredList(prompt: string): { intro: string; items: string[] } | null {
  const lines = prompt.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  const firstListIndex = lines.findIndex((line, index) =>
    index > 0 && (/^[-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line) || lines[0].endsWith(":"))
  );
  if (firstListIndex < 1) return null;

  const intro = lines.slice(0, firstListIndex).join(" ").trim();
  const items = lines.slice(firstListIndex)
    .filter((line) => !/^(?:format|sample input|expected output):?$/i.test(stripListMarker(line)))
    .map(stripListMarker)
    .filter(Boolean);
  return items.length ? { intro, items } : null;
}

function abstractTask(prompt: string, exerciseTitle?: string): string {
  if (/\b(?:print|output|display)\b/i.test(prompt)) return "Produce the required console output.";
  if (/\bfix\b/i.test(prompt)) return "Correct the starter code so it runs successfully.";
  if (/\b(?:calculate|calculator|math|sum|average)\b/i.test(prompt)) return "Calculate the requested result with Python.";
  if (/\b(?:read|input)\b/i.test(prompt)) return "Process the provided input and produce the required result.";
  if (/\b(?:define|create|class|function|implement)\b/i.test(prompt)) return "Implement the requested Python behavior.";
  return exerciseTitle
    ? `Complete the **${exerciseTitle}** exercise.`
    : "Complete the Python exercise.";
}

function deriveTask(prompt: string, exerciseTitle: string | undefined, structured: { intro: string; items: string[] } | null): string {
  if (structured) {
    const action = inferListAction(structured.intro);
    if (
      action === "print" &&
      /facts?/i.test(exerciseTitle || "") &&
      structured.items.every((item) => /^Python\b/i.test(stripListMarker(item)))
    ) {
      const number = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][structured.items.length] || String(structured.items.length);
      return `Use ${number} separate \`print()\` statements to display ${number} facts about Python.`;
    }
    if (action === "print") return "Produce the required console output exactly as specified.";
    if (action === "raise") return "Implement the required validation and error-handling behavior.";
    if (action === "implement" || action === "support") {
      return `Build ${exerciseTitle ? `the **${exerciseTitle}** exercise` : "the solution"} with the required operations.`;
    }
    return `Complete ${exerciseTitle ? `the **${exerciseTitle}** exercise` : "the task"} according to the listed requirements.`;
  }

  const withoutCode = prompt.replace(/```[\s\S]*?```/g, "").trim();
  const sentences = withoutCode.split(/(?<=[.!?])\s+/).filter(Boolean);
  // For a one-line legacy prompt, using it as both Task and TODO creates the
  // exact repetition we want to avoid. Use a high-level goal for Task and keep
  // the concrete requirement in TODO.
  if (sentences.length <= 1) return abstractTask(withoutCode, exerciseTitle);
  return sentences[0] || abstractTask(withoutCode, exerciseTitle);
}

function deriveTodos(prompt: string, task: string, structured: { intro: string; items: string[] } | null): string[] {
  let pieces: string[];
  if (structured) {
    const action = inferListAction(structured.intro);
    pieces = structured.items.map((item) => listItemToTodo(item, action));
  } else {
    const withoutCode = prompt.replace(/```[\s\S]*?```/g, "");
    pieces = withoutCode
      .split(/\n+|(?<=[.!?])\s+(?=[A-Z`])/)
      .flatMap((part) => part.split(ACTION_SPLIT))
      .map(stripListMarker)
      .filter((part) => part && !/^(?:task|todo|sample input|expected output|format):?$/i.test(part))
      .map(toImperative);

    // When multiple detailed steps exist, don't repeat the Task sentence as
    // TODO #1. The Task states the goal; TODO contains only implementation work.
    if (pieces.length > 1) {
      const normalizedTask = task.replace(/[*`]/g, "").trim().toLowerCase();
      pieces = pieces.filter((piece) => piece.replace(/[*`]/g, "").trim().toLowerCase() !== normalizedTask);
    }
  }

  const steps = pieces.filter(Boolean).filter((part, index, all) => all.indexOf(part) === index).slice(0, 8);
  if (steps.length === 0) steps.push("Complete the starter code using the requirements in the task.");
  if (!steps.some((step) => /\b(?:run|test|verify)\b/i.test(step))) {
    steps.push("Run the program and verify that the output matches exactly.");
  }
  return steps;
}

/** Converts every legacy free-text exercise prompt into one consistent guide. */
export function buildExerciseGuide(
  prompt: string,
  testCase: ExerciseTestCase | null = null,
  exerciseTitle?: string
): ExerciseGuide {
  const cleaned = cleanPrompt(prompt);
  const structured = splitStructuredList(cleaned);
  const task = deriveTask(cleaned, exerciseTitle, structured);
  const expected = testCase?.expectedOutput?.replace(/\r\n/g, "\n").trimEnd() ?? null;

  return {
    task,
    todos: deriveTodos(cleaned, task, structured),
    sampleInput: testCase?.input ? testCase.input.replace(/\r\n/g, "\n").trimEnd() : null,
    expectedOutput: expected && expected !== IGNORE_OUTPUT_LINE ? expected : null,
    outputIsVariable: expected === IGNORE_OUTPUT_LINE || expected?.includes(IGNORE_OUTPUT_LINE) === true,
  };
}
