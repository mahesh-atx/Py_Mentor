import { chapter13Functions } from "./content";
import { exercises } from "./exercises";

export { chapter13Functions };

export const functionsModule = {
  title: "13. Functions (Deep Dive)",
  slug: "js-13-functions-module",
  description: "Learn how to use functions to organize, reuse, and modularize your code.",
  order: 3,
  lessons: [
    { ...chapter13Functions, exercises: exercises["js-13-functions"] || [] }]
};
