/**
 * Tests for the centralized XP calculator.
 *
 * Regression guards for phantom XP: quiz XP and achievement XP were shown
 * to the user ("+80 XP" toasts) but never counted in the total.
 */

import { describe, it, expect } from "vitest";
import {
  computeXp,
  computeXpFromRaw,
  XP_PER_LEVEL,
} from "../src/lib/services/xp-calculator";

describe("computeXp", () => {
  it("sums all four XP sources", () => {
    const xp = computeXp(100, 50, 30, 20);
    expect(xp.totalXp).toBe(200);
    expect(xp.lessonXp).toBe(100);
    expect(xp.exerciseXp).toBe(50);
    expect(xp.quizXp).toBe(30);
    expect(xp.achievementXp).toBe(20);
  });

  it("defaults quiz and achievement XP to zero (backwards compatible)", () => {
    expect(computeXp(100, 50).totalXp).toBe(150);
  });

  it("computes level and in-level progress", () => {
    const xp = computeXp(XP_PER_LEVEL + 120, 0);
    expect(xp.level).toBe(2);
    expect(xp.xpInCurrentLevel).toBe(120);
  });
});

describe("computeXpFromRaw", () => {
  const lessonXpMap = new Map([
    ["lesson-a", 50],
    ["lesson-b", 75],
  ]);

  it("counts lesson XP with a 50 XP fallback for unknown lessons", () => {
    const xp = computeXpFromRaw(["lesson-a", "legacy-lesson"], [], lessonXpMap);
    expect(xp.lessonXp).toBe(50 + 50);
  });

  it("de-duplicates exercise submissions (first score counts)", () => {
    const xp = computeXpFromRaw(
      [],
      [
        { exerciseId: "ex-1", score: 20 },
        { exerciseId: "ex-1", score: 99 },
        { exerciseId: "ex-2", score: 30 },
      ],
      lessonXpMap
    );
    expect(xp.exerciseXp).toBe(50);
  });

  it("counts quiz XP proportionally to the stored score", () => {
    const quizXpMap = new Map([["quiz-1", 100]]);
    const xp = computeXpFromRaw(
      [],
      [],
      lessonXpMap,
      [{ quizId: "quiz-1", score: 4, total: 5 }],
      quizXpMap
    );
    expect(xp.quizXp).toBe(80); // floor(100 * 4/5)
  });

  it("uses the 100 XP fallback for unknown quizzes and skips invalid totals", () => {
    const xp = computeXpFromRaw(
      [],
      [],
      lessonXpMap,
      [
        { quizId: "unknown", score: 1, total: 2 }, // floor(100 * 0.5) = 50
        { quizId: "broken", score: 5, total: 0 }, // skipped
      ],
      new Map()
    );
    expect(xp.quizXp).toBe(50);
  });

  it("counts achievement XP", () => {
    const xp = computeXpFromRaw([], [], lessonXpMap, [], new Map(), [50, 100, 300]);
    expect(xp.achievementXp).toBe(450);
  });

  it("total combines lessons, exercises, quizzes and achievements", () => {
    const xp = computeXpFromRaw(
      ["lesson-a"], // 50
      [{ exerciseId: "ex-1", score: 20 }], // 20
      lessonXpMap,
      [{ quizId: "q", score: 1, total: 1 }], // 100 (fallback)
      new Map(),
      [150] // achievement
    );
    expect(xp.totalXp).toBe(50 + 20 + 100 + 150);
  });
});
