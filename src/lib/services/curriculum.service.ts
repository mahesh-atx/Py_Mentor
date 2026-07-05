/**
 * CurriculumService
 * 
 * Responsible for reading the roadmap, module, topic, and lesson hierarchy.
 * Every page that displays curriculum data should call this service.
 */

import { staticRoadmap, allModules, allTopics, allExercises, allProjects } from "../curriculum-data";

export const CurriculumService = {
  /** Get all published roadmaps */
  async getRoadmaps() {
    return [staticRoadmap];
  },

  /** Get all published roadmaps including their exercises for the practice dashboard */
  async getRoadmapsWithExercises() {
    return [staticRoadmap];
  },

  /** Get a single roadmap by slug */
  async getRoadmapBySlug(slug: string) {
    if (slug === staticRoadmap.slug) {
      return staticRoadmap;
    }
    return null;
  },

  /** Get all modules for a roadmap */
  async getModules(roadmapId: string) {
    if (roadmapId === staticRoadmap.id) {
      return allModules;
    }
    return [];
  },

  /** Get all topics for a module */
  async getTopics(moduleId: string) {
    const module = allModules.find(m => m.id === moduleId);
    return module ? module.topics : [];
  },

  /** Get a single topic by module and slug */
  async getTopicBySlug(moduleId: string, slug: string) {
    const module = allModules.find(m => m.id === moduleId);
    if (!module) return null;
    return module.topics.find(t => t.slug === slug) || null;
  },

  /** Get a topic globally just by its slug (useful for /learn/[slug] routing) */
  async getTopicBySlugGlobal(slug: string) {
    const topic = allTopics.find(t => t.slug === slug);
    if (!topic) return null;
    
    // Construct the expected relation format
    return {
      ...topic,
      module: {
        ...topic.module,
        roadmap: staticRoadmap
      }
    };
  },

  /** Get Next and Previous topic for navigation */
  async getNavigation(currentTopicId: string) {
    const orderedTopics = allTopics;
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
  },

  /** Get a single exercise by its slug */
  async getExerciseBySlug(slug: string) {
    const exercise = allExercises.find(e => e.slug === slug);
    if (!exercise) return null;
    
    return {
      ...exercise,
      topic: {
        ...exercise.topic,
        module: {
          ...exercise.topic.module,
          roadmap: staticRoadmap
        }
      }
    };
  },

  /** Get the very first exercise in the curriculum for redirects */
  async getFirstExercise() {
    return allExercises[0] || null;
  },

  /** Get a single project by its slug */
  async getProjectBySlug(slug: string) {
    const project = allProjects.find(p => p.slug === slug);
    if (!project) return null;
    
    return {
      ...project,
      topic: {
        ...project.topic,
        module: {
          ...project.topic.module,
          roadmap: staticRoadmap
        }
      }
    };
  },

  /** Get all published projects */
  async getAllProjects() {
    return allProjects.map(project => ({
      ...project,
      topic: {
        ...project.topic,
        module: {
          ...project.topic.module,
          roadmap: staticRoadmap
        }
      }
    }));
  }
};
