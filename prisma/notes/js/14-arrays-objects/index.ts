import { chapter14ArraysObjects } from "./content";
import { exercises } from "./exercises";

export { chapter14ArraysObjects };

export const arraysObjectsModule = {
  title: "14. Arrays & Objects (Deep Dive)",
  slug: "js-14-arrays-objects-module",
  description: "Learn how to store, manipulate, and iterate over collections of data.",
  order: 4,
  lessons: [
    { ...chapter14ArraysObjects, exercises: exercises["js-14-arrays-objects"] || [] }]
};
