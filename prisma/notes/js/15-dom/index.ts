import { chapter15Dom } from "./content";
import { exercises } from "./exercises";

export { chapter15Dom };

export const domModule = {
  title: "15. DOM Manipulation",
  slug: "js-15-dom-module",
  description: "Learn how to interact with and modify HTML elements dynamically using JavaScript.",
  order: 5,
  lessons: [
    { ...chapter15Dom, exercises: exercises["js-15-dom"] || [] }]
};
