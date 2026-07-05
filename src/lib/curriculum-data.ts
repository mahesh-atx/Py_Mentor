import { module1 } from "../../prisma/notes/module-01";
import { module2 } from "../../prisma/notes/module-02";
import { module3 } from "../../prisma/notes/module-03";
import { module4 } from "../../prisma/notes/module-04";
import type { Roadmap, Module, Topic, Lesson, Exercise, Quiz, Project } from "@prisma/client";

// Define the static structure
const staticModules = [module1, module2, module3, module4];

export const staticRoadmap = {
  id: "phase-1", 
  title: "PHASE 1: FOUNDATION (Weeks 1-4)",
  slug: "phase-1",
  description: "Master the fundamentals of Python, from setting up your environment to understanding basic syntax, variables, operators, and control flow.",
  language: "python",
  icon: "🐍",
  order: 1,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  modules: staticModules.map((m, mIndex) => {
    const moduleId = m.slug;
    return {
      id: moduleId,
      title: m.title,
      slug: m.slug,
      description: m.description,
      order: m.order,
      isPublished: true,
      roadmapId: "phase-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      topics: m.lessons.map((l: any, lIndex: number) => {
        const topicSlug = `m${m.order}-topic-${lIndex + 1}`;
        const topicId = topicSlug;
        return {
          id: topicId,
          title: l.title,
          slug: topicSlug,
          description: `Learn about ${l.title}`,
          order: lIndex + 1,
          isPublished: true,
          moduleId: moduleId,
          createdAt: new Date(),
          updatedAt: new Date(),
          lessons: [
            {
              id: l.slug,
              title: l.title,
              slug: l.slug,
              content: l.content,
              objectives: JSON.stringify(l.objectives || []),
              examples: JSON.stringify([]),
              diagrams: null,
              order: 1,
              difficulty: l.difficulty || "beginner",
              xpReward: l.xpReward || 50,
              isPublished: true,
              isGenerated: false,
              topicId: topicId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          ] as Lesson[],
          exercises: [] as Exercise[],
          quizzes: [] as (Quiz & { questions: any[] })[],
          projects: [] as Project[],
        };
      }),
    };
  }),
};

// Also export flattened lists for easy querying
export const allModules = staticRoadmap.modules;
export const allTopics = allModules.flatMap(m => m.topics.map(t => ({...t, module: m})));
export const allLessons = allModules.flatMap(m => m.topics.flatMap(t => t.lessons.map(l => ({...l, topic: {...t, module: m}}))));
export const allExercises = allModules.flatMap(m => m.topics.flatMap(t => t.exercises.map(e => ({...e, topic: {...t, module: m}}))));
export const allQuizzes = allModules.flatMap(m => m.topics.flatMap(t => t.quizzes.map(q => ({...q, topic: {...t, module: m}}))));
export const allProjects = allModules.flatMap(m => m.topics.flatMap(t => t.projects.map(p => ({...p, topic: {...t, module: m}}))));
