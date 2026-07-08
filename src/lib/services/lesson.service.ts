import { db } from "../db/prisma";
import { unstable_cache } from "next/cache";

export const LessonService = {
  /** Get a lesson by topic and slug */
  getLessonBySlug: unstable_cache(
    async (topicId: string, slug: string) => {
      return db.lesson.findFirst({
        where: { topicId, slug, isPublished: true },
        include: {
          topic: {
            include: { module: { include: { roadmap: true } } }
          }
        }
      });
    },
    ["curriculum-lesson"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get a lesson by ID */
  getLessonById: unstable_cache(
    async (id: string) => {
      return db.lesson.findUnique({
        where: { id },
        include: {
          topic: {
            include: { module: { include: { roadmap: true } } }
          }
        }
      });
    },
    ["curriculum-lesson-by-id"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get the next lesson in sequence */
  async getNextLesson(currentLessonId: string) {
    const allLessons = await db.lesson.findMany({
      where: { isPublished: true },
      orderBy: [
        { topic: { module: { roadmap: { order: "asc" } } } },
        { topic: { module: { order: "asc" } } },
        { topic: { order: "asc" } },
        { order: "asc" }
      ]
    });
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
      return null;
    }
    return allLessons[currentIndex + 1];
  },

  /** Mark a lesson as completed for a user */
  async markComplete(userId: string, lessonId: string, timeSpent: number = 0) {
    return db.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        status: "completed",
        completedAt: new Date(),
        timeSpent,
      },
      update: {
        status: "completed",
        completedAt: new Date(),
        timeSpent: { increment: timeSpent },
      },
    });
  },

  /** Get user's progress for a lesson */
  async getProgress(userId: string, lessonId: string) {
    return db.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
  },
};
