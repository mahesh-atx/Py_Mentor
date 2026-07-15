import { chapter11Basics } from "./content";
import { exercises } from "./exercises";

export { chapter11Basics };

export const basicsModule = {
  title: "11. Basics of JavaScript",
  slug: "js-11-basics-module",
  description: "Core JavaScript concepts and ES6+ features, providing a foundation for modern web development.",
  order: 1,
  lessons: [
    { ...chapter11Basics, exercises: exercises[chapter11Basics.slug] || [] }
  ]
};
