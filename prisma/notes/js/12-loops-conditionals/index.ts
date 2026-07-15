import { chapter12Loops } from "./content";
import { exercises } from "./exercises";

export { chapter12Loops };

export const loopsConditionalsModule = {
  title: "12. Loops & Conditionals",
  slug: "js-12-loops-conditionals-module",
  description: "Learn how to control program flow and iterate over data structures.",
  order: 2,
  lessons: [
    { ...chapter12Loops, exercises: exercises["js-12-loops"] || [] }]
};
