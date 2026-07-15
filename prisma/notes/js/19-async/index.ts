import { chapter19Async } from "./content";
import { exercises } from "./exercises";

export { chapter19Async };

export const asyncModule = {
  title: "19. Asynchronous Programming",
  slug: "js-19-async-module",
  description: "Learn how to perform tasks without blocking the main thread using Promises and async/await.",
  order: 9,
  lessons: [
    { ...chapter19Async, exercises: exercises["js-19-async"] || [] }]
};
