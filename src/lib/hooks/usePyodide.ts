"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Singleton: shared across all hook instances so the engine loads only once
let globalPyodidePromise: Promise<any> | null = null;
let globalPyodideInstance: any = null;

/**
 * The base URL for Pyodide assets.
 *
 * Priority:
 *  1. Local server (`/pyodide/`) — works offline when bundled via npm
 *  2. CDN fallback (`cdn.jsdelivr.net`) — for cloud deployments or if local
 *     files are missing (e.g., first run before download, or not bundled)
 *
 * When PyMentor is installed via `npm install -g pymentor`, the Pyodide
 * WASM files are included in the package under public/pyodide/, so the
 * local path always works and the app is fully offline-capable.
 */
const PYODIDE_VERSION = "0.27.7";
const LOCAL_PYODIDE_BASE = `/pyodide`;
const CDN_PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`;

async function loadPyodideOnce() {
  if (globalPyodideInstance) return globalPyodideInstance;
  if (globalPyodidePromise) return globalPyodidePromise;

  globalPyodidePromise = (async () => {
    // ── Try loading from local server first (offline-capable) ───────────
    try {
      const pyodideModule = await import(
        /* webpackIgnore: true */
        // @ts-ignore — local path import
        `${LOCAL_PYODIDE_BASE}/pyodide.mjs`
      );
      const pyodide = await pyodideModule.loadPyodide({
        indexURL: `${LOCAL_PYODIDE_BASE}/`,
      });
      globalPyodideInstance = pyodide;
      console.log("[pyodide] Loaded from local bundle (offline ✅)");
      return pyodide;
    } catch (localError) {
      console.warn(
        "[pyodide] Local bundle not available, falling back to CDN:",
        (localError as Error).message
      );
    }

    // ── Fallback: load from CDN (requires internet) ─────────────────────
    try {
      const pyodideModule = await import(
        /* webpackIgnore: true */
        // @ts-ignore — external CDN URL import
        `${CDN_PYODIDE_BASE}/pyodide.mjs`
      );
      const pyodide = await pyodideModule.loadPyodide({
        indexURL: `${CDN_PYODIDE_BASE}/`,
      });
      globalPyodideInstance = pyodide;
      console.log("[pyodide] Loaded from CDN (online mode)");
      return pyodide;
    } catch (cdnError) {
      console.error(
        "[pyodide] Failed to load from both local and CDN:",
        (cdnError as Error).message
      );
      throw new Error(
        "Pyodide failed to load. Please check your internet connection or " +
        "ensure the local Pyodide bundle is included in the package."
      );
    }
  })();

  return globalPyodidePromise;
}

/**
 * Hook to load and interact with Pyodide.
 * @param enabled - When false (default true), Pyodide will NOT be loaded.
 *                  Pass `false` to defer the heavy ~15 MB download until
 *                  the user actually opens the editor.
 */
export function usePyodide(enabled: boolean = true) {
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    // Skip loading entirely when not enabled
    if (!enabled) return;

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
  }, [enabled]);

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
          if (inputQueue.length > 0) {
            const val = inputQueue.shift()!;
            outputLines.push(val);
            return val + "\n";
          }
          const result = window.prompt("Python input:");
          if (result === null) {
            // User clicked cancel
            throw new Error("KeyboardInterrupt");
          }
          outputLines.push(result);
          return result + "\n";
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
