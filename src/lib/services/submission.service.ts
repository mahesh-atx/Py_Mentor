/**
 * SubmissionService
 * 
 * Handles code submission, test execution, and result storage.
 */

import { db } from "@/lib/db";
import { SandboxService } from "./sandbox.service";
import { allExercises } from "../curriculum-data";

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export const SubmissionService = {
  /** Submit code for an exercise, run tests, and save result */
  async submitExercise(userId: string, exerciseId: string, code: string) {
    const exercise = allExercises.find(e => e.id === exerciseId);
    if (!exercise) throw new Error("Exercise not found");

    const testCases: TestCase[] = typeof exercise.testCases === 'string' ? JSON.parse(exercise.testCases) : exercise.testCases;
    const results: TestResult[] = [];

    for (const tc of testCases) {
      const result = await SandboxService.executeCode("python", code, tc.input);
      const actual = result.stdout.trim();
      const expected = tc.expectedOutput.trim();
      results.push({
        input: tc.input,
        expected,
        actual,
        passed: actual === expected,
      });
    }

    const passed = results.filter((r) => r.passed).length;
    const total = results.length;
    const score = Math.round((passed / total) * 100);
    const status = score === 100 ? "passed" : "failed";

    const submission = await db.submission.create({
      data: {
        userId,
        exerciseId,
        code,
        status,
        score,
        testResults: JSON.stringify(results),
        stdout: results.map((r) => r.actual).join("\n"),
      },
    });

    return { submission, results, passed, total, score };
  },

  /** Get submission history for a user and exercise */
  async getHistory(userId: string, exerciseId: string) {
    return db.submission.findMany({
      where: { userId, exerciseId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },
};
