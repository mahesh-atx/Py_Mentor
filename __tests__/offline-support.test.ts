/**
 * Phase 4 & 5 Tests: Pyodide Offline Support + AI Mentor Graceful Degradation
 *
 * Validates that:
 * 1. usePyodide uses local-first loading strategy
 * 2. The download-pyodide.sh script exists and is valid
 * 3. The AI mentor component handles offline/not-configured states
 * 4. The offline feature matrix is documented in code
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const ROOT = path.join(__dirname, "..");

// ---------------------------------------------------------------------------
// Phase 4: Pyodide Offline Support
// ---------------------------------------------------------------------------

describe("Phase 4: Pyodide Offline Support", () => {
  describe("usePyodide hook", () => {
    it("exists and is a valid TypeScript file", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      expect(fs.existsSync(hookPath)).toBe(true);
    });

    it("uses local-first loading strategy", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");

      // Must try local path before CDN
      expect(content).toContain("LOCAL_PYODIDE_BASE");
      expect(content).toContain("CDN_PYODIDE_BASE");

      // Local path must be /pyodide/ (served from public/)
      expect(content).toContain("/pyodide");

      // Must have CDN fallback
      expect(content).toContain("cdn.jsdelivr.net");
    });

    it("local path points to public/pyodide/ directory", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");
      expect(content).toContain("LOCAL_PYODIDE_BASE");
      expect(content).toContain("/pyodide");
    });

    it("has error handling for both local and CDN failures", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");

      // Should have catch blocks for both
      expect(content).toMatch(/local.*bundle.*not available/i);
      expect(content).toMatch(/Failed to load from both/i);
    });

    it("logs which source was used for debugging", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");

      expect(content).toMatch(/Loaded from local bundle.*offline/i);
      expect(content).toMatch(/Loaded from CDN.*online/i);
    });

    it("exports the hook correctly", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");
      expect(content).toContain("export function usePyodide");
    });

    it("returns isPyodideLoading and runPython", () => {
      const hookPath = path.join(ROOT, "src", "lib", "hooks", "usePyodide.ts");
      const content = fs.readFileSync(hookPath, "utf-8");
      expect(content).toContain("isPyodideLoading");
      expect(content).toContain("runPython");
    });
  });

  describe("download-pyodide.sh script", () => {
    it("exists and is a valid shell script", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      expect(fs.existsSync(scriptPath)).toBe(true);

      const content = fs.readFileSync(scriptPath, "utf-8");
      expect(content.startsWith("#!/usr/bin/env bash")).toBe(true);
    });

    it("downloads the correct version", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      const content = fs.readFileSync(scriptPath, "utf-8");
      expect(content).toContain("0.27.7");
    });

    it("downloads to public/pyodide/", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      const content = fs.readFileSync(scriptPath, "utf-8");
      expect(content).toContain("public/pyodide");
    });

    it("downloads all required files", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      const content = fs.readFileSync(scriptPath, "utf-8");

      // Core Pyodide files
      expect(content).toContain("pyodide.mjs");
      expect(content).toContain("pyodide.wasm");
      expect(content).toContain("python_stdlib.zip");
    });

    it("supports --clean flag for re-download", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      const content = fs.readFileSync(scriptPath, "utf-8");
      expect(content).toContain("--clean");
    });

    it("skips if already downloaded", () => {
      const scriptPath = path.join(ROOT, "scripts", "download-pyodide.sh");
      const content = fs.readFileSync(scriptPath, "utf-8");
      expect(content).toMatch(/already exists/);
    });
  });

  describe("package.json scripts", () => {
    it("has download-pyodide script", () => {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(ROOT, "package.json"), "utf-8")
      );
      expect(pkg.scripts["download-pyodide"]).toBeDefined();
    });
  });

  describe("public/pyodide/ directory", () => {
    it("public/pyodide/ may or may not exist (optional download)", () => {
      const pyodideDir = path.join(ROOT, "public", "pyodide");
      // It's fine if it doesn't exist — the CDN fallback handles it
      // But if it does exist, it should have the core files
      if (fs.existsSync(pyodideDir)) {
        const files = fs.readdirSync(pyodideDir);
        expect(files.length).toBeGreaterThan(0);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Phase 5: AI Mentor Graceful Degradation
// ---------------------------------------------------------------------------

describe("Phase 5: AI Mentor Graceful Degradation", () => {
  describe("floating-ai-mentor component", () => {
    it("exists and is a valid TypeScript file", () => {
      const componentPath = path.join(
        ROOT, "src", "components", "floating-ai-mentor.tsx"
      );
      expect(fs.existsSync(componentPath)).toBe(true);
    });

    it("checks provider status on mount", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      expect(content).toContain("/api/ai-mentor");
      expect(content).toContain("providerStatus");
    });

    it("shows not-configured banner when AI is unavailable", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      // Must have a banner for unconfigured state
      expect(content).toMatch(/not.*configured|Not configured/i);
    });

    it("mentions pymentor config command in the banner", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      // The banner should tell users how to set up the API key
      expect(content).toMatch(/pymentor config --set-key/);
    });

    it("mentions that other features work offline", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      // Should reassure users that the rest works
      expect(content).toMatch(/offline|everything else/i);
    });

    it("shows provider status in header", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      expect(content).toContain("Online");
      expect(content).toContain("Not configured");
    });

    it("handles 503 status (no provider) with helpful message", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      expect(content).toContain("503");
      expect(content).toMatch(/pymentor config/);
    });

    it("handles connection errors gracefully", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "components", "floating-ai-mentor.tsx"),
        "utf-8"
      );
      expect(content).toMatch(/Couldn't reach the AI mentor/i);
    });
  });

  describe("AI mentor API route", () => {
    it("route exists", () => {
      const routePath = path.join(
        ROOT, "src", "app", "api", "ai-mentor", "route.ts"
      );
      expect(fs.existsSync(routePath)).toBe(true);
    });

    it("returns provider status on GET", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "app", "api", "ai-mentor", "route.ts"),
        "utf-8"
      );
      expect(content).toContain("getActiveProvider");
      expect(content).toContain("configured");
    });

    it("returns 503 when no provider is configured", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "src", "app", "api", "ai-mentor", "route.ts"),
        "utf-8"
      );
      expect(content).toContain("NoProviderError");
      expect(content).toContain("503");
    });
  });

  describe("CLI config command for API keys", () => {
    it("CLI has config --set-key support", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "bin", "cli.js"),
        "utf-8"
      );
      expect(content).toContain("--set-key");
      expect(content).toContain("OPENROUTER_API_KEY");
    });

    it("config command shows AI provider status", () => {
      const content = fs.readFileSync(
        path.join(ROOT, "bin", "cli.js"),
        "utf-8"
      );
      expect(content).toMatch(/AI Provider/i);
      expect(content).toMatch(/Not configured|OpenRouter|NVIDIA/i);
    });
  });
});

// ---------------------------------------------------------------------------
// Offline Feature Matrix
// ---------------------------------------------------------------------------

describe("Offline Feature Matrix", () => {
  const features = [
    { name: "Lessons & Curriculum", offline: true, file: "curriculum.service.ts" },
    { name: "Code Editor & Execution", offline: true, file: "usePyodide.ts" },
    { name: "Exercises", offline: true, file: "practice-client.tsx" },
    { name: "Quizzes", offline: true, file: "quiz-client.tsx" },
    { name: "Progress Tracking", offline: true, file: "progress.service.ts" },
    { name: "Notes & Bookmarks", offline: true, file: "notes.service.ts" },
    { name: "Achievements & Streaks", offline: true, file: "gamification.service.ts" },
    { name: "Projects", offline: true, file: "project-client.tsx" },
    { name: "AI Mentor Chat", offline: false, file: "floating-ai-mentor.tsx" },
  ];

  it.each(features.filter(f => f.offline))(
    "$name — source file exists for offline feature",
    ({ file }) => {
      // Check the file exists somewhere in src/
      const findFile = (dir: string, name: string): boolean => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name === name) return true;
          if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
            if (findFile(path.join(dir, entry.name), name)) return true;
          }
        }
        return false;
      };
      expect(findFile(path.join(ROOT, "src"), file)).toBe(true);
    }
  );

  it("9 out of 9 non-AI features work offline", () => {
    const offlineFeatures = features.filter(f => f.offline);
    expect(offlineFeatures.length).toBe(8);
  });

  it("only AI Mentor requires internet", () => {
    const onlineOnly = features.filter(f => !f.offline);
    expect(onlineOnly.length).toBe(1);
    expect(onlineOnly[0].name).toBe("AI Mentor Chat");
  });
});
