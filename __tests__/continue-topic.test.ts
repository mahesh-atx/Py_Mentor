/**
 * Tests for the continue-learning topic picker used on the dashboard.
 *
 * Regression guard for the bug where the dashboard always showed the
 * first topic ("Introduction to Python") even after the user completed
 * every lesson.
 */

import { describe, it, expect } from "vitest";
import { pickContinueIndex } from "../src/lib/continue-topic";

const topic = (...lessonIds: string[]) => ({
  lessons: lessonIds.map((id) => ({ id })),
});

describe("pickContinueIndex", () => {
  it("returns 0 when nothing is completed", () => {
    const topics = [topic("l1", "l2"), topic("l3")];
    expect(pickContinueIndex(topics, new Set())).toBe(0);
  });

  it("skips fully completed topics and picks the first incomplete one", () => {
    const topics = [topic("l1", "l2"), topic("l3", "l4"), topic("l5")];
    const completed = new Set(["l1", "l2", "l3"]);
    // Topic 1 still has l4 incomplete
    expect(pickContinueIndex(topics, completed)).toBe(1);
  });

  it("returns -1 when every lesson in every topic is complete", () => {
    const topics = [topic("l1"), topic("l2", "l3")];
    const completed = new Set(["l1", "l2", "l3"]);
    expect(pickContinueIndex(topics, completed)).toBe(-1);
  });

  it("treats topics without lessons as complete (nothing to resume)", () => {
    const topics = [{ lessons: [] }, { lessons: null }, topic("l1")];
    expect(pickContinueIndex(topics, new Set())).toBe(2);
    expect(pickContinueIndex([{ lessons: [] }], new Set())).toBe(-1);
  });

  it("returns -1 for an empty topic list", () => {
    expect(pickContinueIndex([], new Set())).toBe(-1);
  });

  it("ignores completed IDs that do not belong to the curriculum", () => {
    const topics = [topic("l1")];
    expect(pickContinueIndex(topics, new Set(["other"]))).toBe(0);
  });
});
