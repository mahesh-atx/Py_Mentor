import { db } from "../db/prisma";
import { unstable_cache } from "next/cache";

export const CurriculumService = {
  /** Get all published roadmaps */
  getRoadmaps: unstable_cache(
    async () => {
      return db.roadmap.findMany({
        where: { isPublished: true },
        include: {
          modules: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              topics: {
                where: { isPublished: true },
                orderBy: { order: "asc" },
                include: {
                  lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  projects: { where: { isPublished: true }, orderBy: { order: "asc" } },
                }
              }
            }
          }
        },
        orderBy: { order: "asc" }
      });
    },
    ["curriculum-roadmaps"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get all published roadmaps including their exercises for the practice dashboard */
  getRoadmapsWithExercises: unstable_cache(
    async () => {
      return db.roadmap.findMany({
        where: { isPublished: true },
        include: {
          modules: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              topics: {
                where: { isPublished: true },
                orderBy: { order: "asc" },
                include: {
                  lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  projects: { where: { isPublished: true }, orderBy: { order: "asc" } },
                }
              }
            }
          }
        },
        orderBy: { order: "asc" }
      });
    },
    ["curriculum-roadmaps-with-exercises"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get a single roadmap by slug */
  getRoadmapBySlug: unstable_cache(
    async (slug: string) => {
      return db.roadmap.findUnique({
        where: { slug, isPublished: true },
        include: {
          modules: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: {
              topics: {
                where: { isPublished: true },
                orderBy: { order: "asc" },
                include: {
                  lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  quizzes: { where: { isPublished: true }, orderBy: { order: "asc" } },
                  projects: { where: { isPublished: true }, orderBy: { order: "asc" } },
                }
              }
            }
          }
        }
      });
    },
    ["curriculum-roadmap"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get all modules for a roadmap */
  async getModules(roadmapId: string) {
    return db.module.findMany({
      where: { roadmapId, isPublished: true },
      orderBy: { order: "asc" },
      include: { topics: { orderBy: { order: "asc" } } }
    });
  },

  /** Get all topics for a module */
  async getTopics(moduleId: string) {
    return db.topic.findMany({
      where: { moduleId, isPublished: true },
      orderBy: { order: "asc" },
      include: {
        lessons: { orderBy: { order: "asc" } },
        exercises: { orderBy: { order: "asc" } }
      }
    });
  },

  /** Get a single topic by module and slug */
  async getTopicBySlug(moduleId: string, slug: string) {
    return db.topic.findFirst({
      where: { moduleId, slug, isPublished: true },
      include: {
        lessons: { orderBy: { order: "asc" } },
        exercises: { orderBy: { order: "asc" } }
      }
    });
  },

  /** Get a topic globally just by its slug */
  getTopicBySlugGlobal: unstable_cache(
    async (slug: string) => {
      return db.topic.findFirst({
        where: { slug, isPublished: true },
        include: {
          lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
          exercises: { where: { isPublished: true }, orderBy: { order: "asc" } },
          quizzes: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            include: { questions: { orderBy: { order: "asc" } } }
          },
          projects: { where: { isPublished: true }, orderBy: { order: "asc" } },
          module: {
            include: { roadmap: true }
          }
        }
      });
    },
    ["curriculum-topic-global"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get Next and Previous topic for navigation */
  async getNavigation(currentTopicId: string) {
    const allTopics = await db.topic.findMany({
      where: { isPublished: true },
      orderBy: [
        { module: { roadmap: { order: "asc" } } },
        { module: { order: "asc" } },
        { order: "asc" }
      ],
      include: {
        module: { include: { roadmap: true } }
      }
    });

    const currentIndex = allTopics.findIndex((t: { id: string }) => t.id === currentTopicId);
    
    let prevTopic = null;
    let nextTopic = null;

    if (currentIndex > 0) {
      prevTopic = allTopics[currentIndex - 1];
    }
    if (currentIndex !== -1 && currentIndex < allTopics.length - 1) {
      nextTopic = allTopics[currentIndex + 1];
    }

    return { prevTopic, nextTopic };
  },

  /** Get a single exercise by its slug */
  getExerciseBySlug: unstable_cache(
    async (slug: string) => {
      return db.exercise.findFirst({
        where: { slug, isPublished: true },
        include: {
          topic: {
            include: {
              module: { include: { roadmap: true } },
              exercises: { where: { isPublished: true }, orderBy: { order: "asc" } }
            }
          }
        }
      });
    },
    ["curriculum-exercise"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get the very first exercise in the curriculum for redirects */
  async getFirstExercise() {
    return db.exercise.findFirst({
      where: { isPublished: true },
      orderBy: [
        { topic: { module: { roadmap: { order: "asc" } } } },
        { topic: { module: { order: "asc" } } },
        { topic: { order: "asc" } },
        { order: "asc" }
      ],
      include: {
        topic: {
          include: {
            module: { include: { roadmap: true } }
          }
        }
      }
    });
  },

  /** Get a single project by its slug */
  getProjectBySlug: unstable_cache(
    async (slug: string) => {
      return db.project.findFirst({
        where: { slug, isPublished: true },
        include: {
          topic: {
            include: {
              module: { include: { roadmap: true } }
            }
          }
        }
      });
    },
    ["curriculum-project"],
    { revalidate: 3600, tags: ["curriculum"] }
  ),

  /** Get all published projects */
  getAllProjects: unstable_cache(
    async () => {
      return db.project.findMany({
        where: { isPublished: true },
        include: {
          topic: {
            include: {
              module: { include: { roadmap: true } }
            }
          }
        },
        orderBy: [
          { topic: { module: { roadmap: { order: "asc" } } } },
          { topic: { module: { order: "asc" } } },
          { topic: { order: "asc" } },
          { order: "asc" }
        ],
      });
    },
    ["curriculum-projects-all"],
    { revalidate: 3600, tags: ["curriculum"] }
  )
};
