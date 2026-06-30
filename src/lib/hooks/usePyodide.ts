"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Singleton: shared across all hook instances so the engine loads only once
let globalPyodidePromise: Promise<any> | null = null;
let globalPyodideInstance: any = null;

async function loadPyodideOnce() {
  if (globalPyodideInstance) return globalPyodideInstance;
  if (globalPyodidePromise) return globalPyodidePromise;

  globalPyodidePromise = (async () => {
    // Dynamic ESM import directly from CDN — bypasses both the bundler AND Monaco's AMD loader
    const pyodideModule = await import(
      /* webpackIgnore: true */
      // @ts-ignore — external CDN URL import
      "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs"
    );
    const pyodide = await pyodideModule.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
    });
    globalPyodideInstance = pyodide;
    return pyodide;
  })();

  return globalPyodidePromise;
}

export function usePyodide() {
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    loadPyodideOnce()
      .then((pyodide) => {
        if (!cancelled) {
          pyodideRef.current = pyodide;
          setIsPyodideLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load Pyodide:", err);
        if (!cancelled) setIsPyodideLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const runPython = useCallback(
    async (code: string, inputString: string = "") => {
      const pyodide = pyodideRef.current;
      if (!pyodide) {
        return { output: "", error: "Pyodide is not loaded yet." };
      }

      let outputLines: string[] = [];
      const inputQueue = inputString ? inputString.split("\n") : [];

      // Redirect stdout
      pyodide.setStdout({
        batched: (msg: string) => {
          outputLines.push(msg);
        },
      });

      // Redirect stdin
      pyodide.setStdin({
        stdin: () => {
          return inputQueue.length > 0 ? inputQueue.shift()! : "";
        },
      });

      try {
        await pyodide.runPythonAsync(code);
        const output = outputLines.join("\n") + (outputLines.length > 0 ? "\n" : "");
        return { output, error: null };
      } catch (err: any) {
        const output = outputLines.join("\n") + (outputLines.length > 0 ? "\n" : "");
        return { output, error: err.message };
      }
    },
    []
  );

  return { isPyodideLoading, runPython };
}
