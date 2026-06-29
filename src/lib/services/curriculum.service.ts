/**
 * CurriculumService
 * 
 * Responsible for reading the roadmap, module, topic, and lesson hierarchy.
 * Every page that displays curriculum data should call this service.
 */

import { db } from "@/lib/db";

export const CurriculumService = {
  /** Get all published roadmaps */
  async getRoadmaps() {
    return db.roadmap.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      include: {
        modules: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          include: {
            topics: {
              where: { isPublished: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
  },

  /** Get a single roadmap by slug */
  async getRoadmapBySlug(slug: string) {
    return db.roadmap.findUnique({
      where: { slug },
      include: {
        modules: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          include: {
            topics: {
              where: { isPublished: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
  },

  /** Get all modules for a roadmap */
  async getModules(roadmapId: string) {
    return db.module.findMany({
      where: { roadmapId, isPublished: true },
      orderBy: { order: "asc" },
      include: {
        topics: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
      },
    });
  },

  /** Get all topics for a module */
  async getTopics(moduleId: string) {
    return db.topic.findMany({
      where: { moduleId, isPublished: true },
      orderBy: { order: "asc" },
      include: {
        lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
        exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
        quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
      },
    });
  },

  /** Get a single topic by module and slug */
  async getTopicBySlug(moduleId: string, slug: string) {
    return db.topic.findUnique({
      where: { moduleId_slug: { moduleId, slug } },
      include: {
        lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
        exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
        quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
        projects: { where: { isPublished: true }, orderBy: { order: "asc" } },
      },
    });
  },

  /** Get a topic globally just by its slug (useful for /learn/[slug] routing) */
  async getTopicBySlugGlobal(slug: string) {
    return db.topic.findFirst({
      where: { slug },
      include: {
        module: {
          include: {
            roadmap: true,
          }
        },
        lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
        exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
        quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
      }
    });
  },

  /** Get Next and Previous topic for navigation */
  async getNavigation(currentTopicId: string) {
    // A simplified navigation fetch: get all topics in the curriculum ordered
    // Then find the current one, and return prev/next.
    const allRoadmaps = await this.getRoadmaps();
    
    // Flatten all topics into a single ordered array
    const orderedTopics = allRoadmaps.flatMap(roadmap => 
      roadmap.modules.flatMap(module => 
        module.topics
      )
    );

    const currentIndex = orderedTopics.findIndex(t => t.id === currentTopicId);
    
    let prevTopic = null;
    let nextTopic = null;

    if (currentIndex > 0) {
      prevTopic = orderedTopics[currentIndex - 1];
    }
    if (currentIndex < orderedTopics.length - 1 && currentIndex !== -1) {
      nextTopic = orderedTopics[currentIndex + 1];
    }

    return { prevTopic, nextTopic };
  }
};
