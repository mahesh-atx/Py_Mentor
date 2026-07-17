/**
 * Tests for the streak calculator.
 *
 * Regression guard: the old logic showed a streak of 0 whenever the user
 * hadn't done anything TODAY yet — even with a long streak ending yesterday.
 */

import { describe, it, expect } from "vitest";
import { computeCurrentStreak } from "../src/lib/streak";

const day = (offset: number, base = new Date("2026-07-17T12:00:00")) => {
  const d = new Date(base);
  d.setDate(d.getDate() - offset);
  return d;
};

describe("computeCurrentStreak", () => {
  it("returns 0 with no activity", () => {
    expect(computeCurrentStreak([])).toBe(0);
  });

  it("counts a streak that includes today", () => {
    const dates = [day(0), day(1), day(2)];
    expect(computeCurrentStreak(dates, day(0))).toBe(3);
  });

  it("keeps the streak alive when the last activity was YESTERDAY", () => {
    // The regression: used to return 0 here
    const dates = [day(1), day(2), day(3), day(4)];
    expect(computeCurrentStreak(dates, day(0))).toBe(4);
  });

  it("returns 0 when the most recent activity is 2+ days ago (streak dead)", () => {
    const dates = [day(2), day(3), day(4)];
    expect(computeCurrentStreak(dates, day(0))).toBe(0);
  });

  it("stops counting at the first gap", () => {
    const dates = [day(0), day(1), day(3), day(4), day(5)]; // gap at day 2
    expect(computeCurrentStreak(dates, day(0))).toBe(2);
  });

  it("handles duplicate days and unordered input", () => {
    const dates = [day(2), day(0), day(1), day(1), day(0)];
    expect(computeCurrentStreak(dates, day(0))).toBe(3);
  });

  it("a single activity today is a 1-day streak", () => {
    expect(computeCurrentStreak([day(0)], day(0))).toBe(1);
  });

  it("a single activity yesterday is still a 1-day streak", () => {
    expect(computeCurrentStreak([day(1)], day(0))).toBe(1);
  });
});
