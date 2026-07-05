/**
 * LessonService
 * 
 * Responsible for individual lesson operations: fetching content,
 * marking completion, and navigating between lessons.
 */

import { db } from "@/lib/db";
import { allLessons, allTopics } from "../curriculum-data";

export const LessonService = {
  /** Get a lesson by topic and slug */
  async getLessonBySlug(topicId: string, slug: string) {
    const topic = allTopics.find(t => t.id === topicId);
    if (!topic) return null;
    const lesson = topic.lessons.find(l => l.slug === slug);
    if (!lesson) return null;
    return lesson;
  },

  /** Get a lesson by ID */
  async getLessonById(id: string) {
    const lesson = allLessons.find(l => l.id === id);
    return lesson || null;
  },

  /** Get the next lesson in sequence */
  async getNextLesson(currentLessonId: string) {
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
