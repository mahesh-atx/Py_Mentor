/**
 * Tests for the continue-learning topic picker used on the dashboard.
 *
 * Regression guard for the bug where the dashboard always showed the
 * first topic ("Introduction to Python") even after the user completed
 * every lesson.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
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

  it("matches Progress rows that store lesson SLUGS (production shape)", () => {
    // Regression: completeLessonAction is called with lesson.slug, so the
    // completed set contains slugs while lessons carry UUID ids. Matching
    // only on id made every topic look incomplete -> the dashboard always
    // resumed at the first topic ("Introduction to Python").
    const topics = [
      { lessons: [{ id: "uuid-1", slug: "introduction-to-python" }] },
      { lessons: [{ id: "uuid-2", slug: "python-setup" }] },
      { lessons: [{ id: "uuid-3", slug: "hello-world" }] },
    ];
    const completed = new Set(["introduction-to-python", "python-setup"]);
    expect(pickContinueIndex(topics, completed)).toBe(2);
    expect(
      pickContinueIndex(
        topics,
        new Set(["introduction-to-python", "python-setup", "hello-world"])
      )
    ).toBe(-1);
  });
});

// ---------------------------------------------------------------------------
// Regression guards: the pages must use progress-aware topic selection
// across ALL roadmaps (not just Phase 1)
// ---------------------------------------------------------------------------

describe("continue-learning page integration (source guards)", () => {
  const readSrc = (p: string) =>
    fs.readFileSync(path.join(__dirname, "..", p), "utf-8");

  it("dashboard flattens topics across ALL roadmaps", () => {
    const content = readSrc("src/app/(app)/page.tsx");
    expect(content).toContain("roadmaps.flatMap");
    expect(content).not.toContain("firstRoadmap.modules.flatMap");
    expect(content).toContain("pickContinueIndex");
  });

  it("/learn redirects to the first incomplete topic (resume)", () => {
    const content = readSrc("src/app/(app)/learn/page.tsx");
    expect(content).toContain("pickContinueIndex");
    expect(content).toContain("roadmaps.flatMap");
    expect(content).not.toContain("roadmaps[0].modules[0]");
  });
});
