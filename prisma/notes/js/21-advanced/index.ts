import { chapter21Advanced } from "./content";
import { exercises } from "./exercises";

export { chapter21Advanced };

export const advancedModule = {
  title: "21. Advanced Concepts",
  slug: "js-21-advanced-module",
  description: "Learn advanced performance optimization techniques like throttling and debouncing.",
  order: 11,
  lessons: [
    { ...chapter21Advanced, exercises: exercises["js-21-advanced"] || [] }]
};
