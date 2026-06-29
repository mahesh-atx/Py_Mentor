/**
 * SandboxService
 * 
 * Responsible for executing user code securely.
 * Currently uses the Piston public API.
 * Can be swapped to a Docker-based sandbox later.
 */

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number; // milliseconds
  error?: string;
}

export const SandboxService = {
  /** Execute code in a secure sandbox */
  async executeCode(
    language: string,
    code: string,
    stdin?: string,
    timeoutMs: number = 10000
  ): Promise<ExecutionResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const startTime = Date.now();

      const response = await fetch(PISTON_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          version: language === "python" ? "3.10.0" : "*",
          files: [{ content: code }],
          stdin: stdin || "",
        }),
        signal: controller.signal,
      });

      const executionTime = Date.now() - startTime;
      const data = await response.json();

      if (!response.ok) {
        return {
          stdout: "",
          stderr: data.message || "Execution failed",
          exitCode: 1,
          executionTime,
          error: data.message,
        };
      }

      return {
        stdout: data.run?.stdout || "",
        stderr: data.run?.stderr || "",
        exitCode: data.run?.code ?? 1,
        executionTime,
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return {
          stdout: "",
          stderr: "Execution timed out.",
          exitCode: 1,
          executionTime: timeoutMs,
          error: "TIMEOUT",
        };
      }
      return {
        stdout: "",
        stderr: `Network error: ${error}`,
        exitCode: 1,
        executionTime: 0,
        error: "NETWORK_ERROR",
      };
    } finally {
      clearTimeout(timeout);
    }
  },
};
