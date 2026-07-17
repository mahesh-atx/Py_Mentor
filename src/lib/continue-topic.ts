/**
 * Continue-learning helper — picks the topic a learner should resume.
 *
 * A topic is "incomplete" when at least one of its published lessons has no
 * matching completed Progress row for the user. Topics without any published
 * lessons are treated as complete (there is nothing to resume in them).
 *
 * Pure function (no DB access) so it can be unit-tested directly.
 */

export interface TopicWithLessons {
  lessons?: { id: string }[] | null;
  [key: string]: unknown;
}

/**
 * Returns the index of the first topic with at least one incomplete lesson,
 * or -1 when every topic is complete (or there are no topics).
 */
export function pickContinueIndex(
  topics: readonly TopicWithLessons[],
  completedLessonIds: ReadonlySet<string>
): number {
  return topics.findIndex((topic) =>
    (topic.lessons ?? []).some((lesson) => !completedLessonIds.has(lesson.id))
  );
}
