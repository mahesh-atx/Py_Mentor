import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";
import {
  cancelTerminalInput,
  createTerminalInputBuffer,
  provideTerminalInput,
  TERMINAL_MAX_INPUT_BYTES,
} from "../src/lib/terminal-input";

const ROOT = path.join(__dirname, "..");

describe("interactive terminal input hand-off", () => {
  it("writes a fresh line and wakes the worker", () => {
    const input = createTerminalInputBuffer();
    provideTerminalInput(input, "Mahesh");

    expect(Atomics.load(input.control, 0)).toBe(1);
    const length = Atomics.load(input.control, 1);
    expect(new TextDecoder().decode(input.bytes.subarray(0, length))).toBe("Mahesh");
  });

  it("preserves Unicode input and replaces input on every request", () => {
    const input = createTerminalInputBuffer();
    provideTerminalInput(input, "नमस्कार");
    let length = Atomics.load(input.control, 1);
    expect(new TextDecoder().decode(input.bytes.subarray(0, length))).toBe("नमस्कार");

    provideTerminalInput(input, "new run");
    length = Atomics.load(input.control, 1);
    expect(new TextDecoder().decode(input.bytes.subarray(0, length))).toBe("new run");
  });

  it("supports an empty Enter key submission", () => {
    const input = createTerminalInputBuffer();
    provideTerminalInput(input, "");
    expect(Atomics.load(input.control, 0)).toBe(1);
    expect(Atomics.load(input.control, 1)).toBe(0);
  });

  it("signals cancellation to a waiting worker", () => {
    const input = createTerminalInputBuffer();
    cancelTerminalInput(input);
    expect(Atomics.load(input.control, 0)).toBe(2);
  });

  it("rejects lines larger than the bounded shared buffer", () => {
    const input = createTerminalInputBuffer();
    expect(() => provideTerminalInput(input, "x".repeat(TERMINAL_MAX_INPUT_BYTES + 1)))
      .toThrow(/Input is too long/);
  });
});

describe("interactive Pyodide worker integration", () => {
  const workerPath = path.join(ROOT, "public", "pyodide-terminal-worker.js");
  const worker = fs.readFileSync(workerPath, "utf8");

  it("ships a worker that blocks off the UI thread until terminal input arrives", () => {
    expect(fs.existsSync(workerPath)).toBe(true);
    expect(worker).toContain("Atomics.wait");
    expect(worker).toContain('type: "input-request"');
    expect(worker).not.toContain("window.prompt");
  });

  it("keeps interactive Run and automated grading as separate modes", () => {
    expect(worker).toContain('message.mode === "interactive"');
    expect(worker).toContain('message.mode === "automated"');
    expect(worker).toContain("readInteractiveInput");
    expect(worker).toContain("readAutomatedInput");
  });

  it("streams prompts immediately instead of waiting for a newline", () => {
    expect(worker).toContain("setStdout({ raw:");
    expect(worker).toContain("String.fromCodePoint");
  });

  it("uses local Pyodide first and retains the CDN fallback", () => {
    expect(worker.indexOf("LOCAL_PYODIDE_BASE")).toBeLessThan(worker.indexOf("CDN_PYODIDE_BASE"));
    expect(worker).toContain("cdn.jsdelivr.net");
  });

  it("enables cross-origin isolation required by SharedArrayBuffer", () => {
    const config = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
    expect(config).toContain("Cross-Origin-Opener-Policy");
    expect(config).toContain("Cross-Origin-Embedder-Policy");
    expect(config).toContain("require-corp");
  });

  it("connects every runnable editor to the interactive terminal", () => {
    const files = [
      "src/components/floating-editor.tsx",
      "src/app/(app)/learn/[slug]/lesson-client.tsx",
      "src/app/(app)/practice/[slug]/practice-client.tsx",
    ];
    for (const file of files) {
      const content = fs.readFileSync(path.join(ROOT, file), "utf8");
      expect(content, file).toContain("runInteractive");
      expect(content, file).toContain("PythonTerminal");
    }
  });
});
