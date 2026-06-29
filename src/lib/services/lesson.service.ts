/**
 * LessonService
 * 
 * Responsible for individual lesson operations: fetching content,
 * marking completion, and navigating between lessons.
 */

import { db } from "@/lib/db";

export const LessonService = {
  /** Get a lesson by topic and slug */
  async getLessonBySlug(topicId: string, slug: string) {
    return db.lesson.findUnique({
      where: { topicId_slug: { topicId, slug } },
      include: {
        topic: {
          include: {
            module: {
              include: { roadmap: true },
            },
          },
        },
      },
    });
  },

  /** Get a lesson by ID */
  async getLessonById(id: string) {
    return db.lesson.findUnique({
      where: { id },
      include: {
        topic: {
          include: {
            module: {
              include: { roadmap: true },
            },
          },
        },
      },
    });
  },

  /** Get the next lesson in sequence */
  async getNextLesson(currentLessonId: string) {
    const current = await db.lesson.findUnique({
      where: { id: currentLessonId },
      include: { topic: { include: { module: true } } },
    });
    if (!current) return null;

    // Try next lesson in same topic
    const nextInTopic = await db.lesson.findFirst({
      where: {
        topicId: current.topicId,
        order: { gt: current.order },
        isPublished: true,
      },
      orderBy: { order: "asc" },
    });
    if (nextInTopic) return nextInTopic;

    // Try first lesson of next topic in same module
    const nextTopic = await db.topic.findFirst({
      where: {
        moduleId: current.topic.moduleId,
        order: { gt: current.topic.order },
        isPublished: true,
      },
      orderBy: { order: "asc" },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          take: 1,
        },
      },
    });
    if (nextTopic?.lessons[0]) return nextTopic.lessons[0];

    // Try first lesson of next module
    const nextModule = await db.module.findFirst({
      where: {
        roadmapId: current.topic.module.roadmapId,
        order: { gt: current.topic.module.order },
        isPublished: true,
      },
      orderBy: { order: "asc" },
      include: {
        topics: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          take: 1,
          include: {
            lessons: {
              where: { isPublished: true },
              orderBy: { order: "asc" },
              take: 1,
            },
          },
        },
      },
    });
    return nextModule?.topics[0]?.lessons[0] ?? null;
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
