"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  cancelTerminalInput,
  createTerminalInputBuffer,
  provideTerminalInput,
  type TerminalInputBuffer,
} from "@/lib/terminal-input";

export type PythonTerminalStatus =
  | "idle"
  | "loading"
  | "running"
  | "waiting-input"
  | "finished"
  | "error";

export type PythonRunResult = {
  output: string;
  error: string | null;
};

type PendingRun = {
  resolve: (result: PythonRunResult) => void;
};

/**
 * Runs Pyodide in a worker and supports real, post-Run terminal input.
 * SharedArrayBuffer is required because Python's input() API is synchronous;
 * COOP/COEP response headers are configured in next.config.ts.
 */
export function useInteractivePython(enabled = true) {
  const [status, setStatus] = useState<PythonTerminalStatus>(
    enabled ? "loading" : "idle"
  );
  const [output, setOutput] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const inputRef = useRef<TerminalInputBuffer | null>(null);
  const runSequence = useRef(0);
  const activeRunId = useRef<number | null>(null);
  const pendingRuns = useRef(new Map<number, PendingRun>());
  const enabledRef = useRef(enabled);

  const destroyWorker = useCallback((reason = "Execution stopped by user") => {
    if (inputRef.current) cancelTerminalInput(inputRef.current);
    workerRef.current?.terminate();
    workerRef.current = null;
    inputRef.current = null;
    activeRunId.current = null;
    for (const pending of pendingRuns.current.values()) {
      pending.resolve({ output: "", error: reason });
    }
    pendingRuns.current.clear();
  }, []);

  const createWorker = useCallback(() => {
    if (typeof window === "undefined" || !enabledRef.current) return null;
    if (workerRef.current) return workerRef.current;

    if (typeof SharedArrayBuffer === "undefined") {
      const message =
        "Interactive terminal input is unavailable because this page is not cross-origin isolated.";
      setLoadError(message);
      setStatus("error");
      return null;
    }

    setStatus("loading");
    setLoadError(null);
    const worker = new Worker("/pyodide-terminal-worker.js", { type: "module" });
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === "ready") {
        setStatus("idle");
        return;
      }
      if (message.type === "load-error") {
        setLoadError(message.error);
        setStatus("error");
        return;
      }
      if (message.runId !== activeRunId.current) return;

      if (message.type === "output") {
        setOutput((current) => current + message.text);
      } else if (message.type === "input-request") {
        setStatus("waiting-input");
      } else if (message.type === "finished") {
        setStatus(message.error ? "error" : "finished");
        if (message.error) {
          setOutput((current) =>
            `${current}${current && !current.endsWith("\n") ? "\n" : ""}Error: ${message.error}`
          );
        }
        const pending = pendingRuns.current.get(message.runId);
        pendingRuns.current.delete(message.runId);
        activeRunId.current = null;
        pending?.resolve({ output: message.output, error: message.error });
      }
    };

    worker.onerror = (event) => {
      const error = event.message || "The Python worker stopped unexpectedly.";
      setLoadError(error);
      setStatus("error");
      const runId = activeRunId.current;
      if (runId !== null) {
        pendingRuns.current.get(runId)?.resolve({ output: "", error });
        pendingRuns.current.delete(runId);
      }
      activeRunId.current = null;
    };

    worker.postMessage({ type: "load" });
    return worker;
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
    // Defer worker callbacks so this effect only synchronizes the external
    // worker lifecycle and never causes a synchronous render cascade.
    const timer = window.setTimeout(() => {
      if (enabled) createWorker();
      else {
        destroyWorker("Terminal closed");
        setStatus("idle");
      }
    }, 0);
    return () => {
      window.clearTimeout(timer);
      destroyWorker("Terminal closed");
    };
  }, [enabled, createWorker, destroyWorker]);

  const runInteractive = useCallback(
    (code: string): Promise<PythonRunResult> => {
      const worker = createWorker();
      if (!worker) {
        return Promise.resolve({
          output: "",
          error: loadError || "Python terminal is not available.",
        });
      }
      if (activeRunId.current !== null) {
        return Promise.resolve({ output: "", error: "A program is already running." });
      }

      const input = createTerminalInputBuffer();
      inputRef.current = input;
      const runId = ++runSequence.current;
      activeRunId.current = runId;
      setOutput("");
      setLoadError(null);
      setStatus("running");

      const promise = new Promise<PythonRunResult>((resolve) => {
        pendingRuns.current.set(runId, { resolve });
      });
      worker.postMessage({
        type: "run",
        mode: "interactive",
        runId,
        code,
        inputBuffer: input.buffer,
      });
      return promise;
    },
    [createWorker, loadError]
  );

  const runAutomated = useCallback(
    (code: string, stdin = ""): Promise<PythonRunResult> => {
      const worker = createWorker();
      if (!worker) {
        return Promise.resolve({ output: "", error: loadError || "Python is not available." });
      }
      if (activeRunId.current !== null) {
        return Promise.resolve({ output: "", error: "A program is already running." });
      }

      const runId = ++runSequence.current;
      activeRunId.current = runId;
      setOutput("");
      setStatus("running");
      const promise = new Promise<PythonRunResult>((resolve) => {
        pendingRuns.current.set(runId, { resolve });
      });
      worker.postMessage({ type: "run", mode: "automated", runId, code, stdin });
      return promise;
    },
    [createWorker, loadError]
  );

  const submitInput = useCallback((value: string) => {
    if (!inputRef.current || activeRunId.current === null) return false;
    provideTerminalInput(inputRef.current, value);
    setStatus("running");
    return true;
  }, []);

  const stop = useCallback(() => {
    destroyWorker();
    setStatus("finished");
    setOutput((current) => `${current}${current && !current.endsWith("\n") ? "\n" : ""}^C\n`);
    if (enabledRef.current) createWorker();
  }, [createWorker, destroyWorker]);

  return {
    status,
    output,
    loadError,
    isLoading: status === "loading",
    isRunning: status === "running" || status === "waiting-input",
    isWaitingForInput: status === "waiting-input",
    runInteractive,
    runAutomated,
    submitInput,
    stop,
  };
}
