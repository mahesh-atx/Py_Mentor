import { chapter18OOP } from "./content";
import { exercises } from "./exercises";

export { chapter18OOP };

export const oopModule = {
  title: "18. Object-Oriented Concepts",
  slug: "js-18-oop-module",
  description: "Structure your code using classes, objects, and methods for reusability and maintainability.",
  order: 8,
  lessons: [
    { ...chapter18OOP, exercises: exercises["js-18-oop"] || [] }]
};
