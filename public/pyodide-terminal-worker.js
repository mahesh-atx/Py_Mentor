/* PyMentor interactive Python worker.
 *
 * Python's input() callback is synchronous. Running Pyodide in this worker lets
 * us block only the worker (with Atomics.wait) while the browser UI remains
 * responsive and acts like a real terminal.
 */
const PYODIDE_VERSION = "0.27.7";
const LOCAL_PYODIDE_BASE = "/pyodide";
const CDN_PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`;

let pyodide;
let loading;
let activeRunId = null;
let inputControl = null;
let inputBytes = null;
let automatedInput = null;
let capturedOutput = "";
let pendingOutput = "";

async function loadRuntime() {
  if (pyodide) return pyodide;
  if (loading) return loading;

  loading = (async () => {
    try {
      const module = await import(`${LOCAL_PYODIDE_BASE}/pyodide.mjs`);
      pyodide = await module.loadPyodide({ indexURL: `${LOCAL_PYODIDE_BASE}/` });
      self.postMessage({ type: "runtime-source", source: "local" });
      return pyodide;
    } catch (localError) {
      console.warn("[pyodide terminal] Local bundle not available, falling back to CDN", localError);
    }

    try {
      const module = await import(`${CDN_PYODIDE_BASE}/pyodide.mjs`);
      pyodide = await module.loadPyodide({ indexURL: `${CDN_PYODIDE_BASE}/` });
      self.postMessage({ type: "runtime-source", source: "cdn" });
      return pyodide;
    } catch (cdnError) {
      console.error("[pyodide terminal] Failed to load from both local and CDN", cdnError);
      throw new Error("Pyodide failed to load from both the local bundle and CDN.");
    }
  })();

  return loading;
}

function flushOutput() {
  if (!pendingOutput) return;
  self.postMessage({ type: "output", runId: activeRunId, text: pendingOutput });
  pendingOutput = "";
}

function emitOutput(text) {
  if (!text) return;
  capturedOutput += text;
  pendingOutput += text;
  // Avoid one React update per character while retaining line-by-line output.
  if (text.includes("\n") || pendingOutput.length >= 1024) flushOutput();
}

function readInteractiveInput() {
  Atomics.store(inputControl, 0, 0);
  Atomics.store(inputControl, 1, 0);
  // input("prompt") usually has no newline, so flush it before pausing.
  flushOutput();
  self.postMessage({ type: "input-request", runId: activeRunId });

  // This blocks this worker only. The React UI remains responsive.
  Atomics.wait(inputControl, 0, 0);
  const state = Atomics.load(inputControl, 0);
  if (state === 2) throw new Error("Execution stopped by user");

  const length = Atomics.load(inputControl, 1);
  const value = new TextDecoder().decode(inputBytes.subarray(0, length));
  // Echo terminal input exactly once, just like a normal terminal.
  emitOutput(`${value}\n`);
  return `${value}\n`;
}

function readAutomatedInput() {
  if (!automatedInput || automatedInput.length === 0) return undefined;
  return `${automatedInput.shift()}\n`;
}

async function execute(message) {
  const runtime = await loadRuntime();
  activeRunId = message.runId;
  capturedOutput = "";
  pendingOutput = "";
  automatedInput = message.mode === "automated"
    ? (message.stdin === "" ? [] : String(message.stdin).replace(/\r\n/g, "\n").split("\n"))
    : null;

  if (message.mode === "interactive") {
    const controlBytes = Int32Array.BYTES_PER_ELEMENT * 2;
    inputControl = new Int32Array(message.inputBuffer, 0, 2);
    inputBytes = new Uint8Array(message.inputBuffer, controlBytes);
  }

  // raw receives Unicode code points and, unlike line-buffered output,
  // immediately exposes prompts such as input("Name: ").
  runtime.setStdout({ raw: (codePoint) => emitOutput(String.fromCodePoint(codePoint)) });
  runtime.setStderr({ raw: (codePoint) => emitOutput(String.fromCodePoint(codePoint)) });
  runtime.setStdin({
    stdin: message.mode === "interactive" ? readInteractiveInput : readAutomatedInput,
    isatty: message.mode === "interactive",
  });

  try {
    if (typeof runtime.loadPackagesFromImports === "function") {
      await runtime.loadPackagesFromImports(message.code);
    }
    await runtime.runPythonAsync(message.code);
    flushOutput();
    self.postMessage({ type: "finished", runId: message.runId, output: capturedOutput, error: null });
  } catch (error) {
    const errorText = error && error.message ? error.message : String(error);
    flushOutput();
    self.postMessage({ type: "finished", runId: message.runId, output: capturedOutput, error: errorText });
  } finally {
    activeRunId = null;
    automatedInput = null;
  }
}

self.onmessage = async (event) => {
  const message = event.data;
  if (message.type === "load") {
    try {
      await loadRuntime();
      self.postMessage({ type: "ready" });
    } catch (error) {
      self.postMessage({ type: "load-error", error: error.message || String(error) });
    }
    return;
  }

  if (message.type === "run") {
    await execute(message);
  }
};
