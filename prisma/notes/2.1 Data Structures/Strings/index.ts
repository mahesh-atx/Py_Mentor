import { exercises } from "./exercises";
import { stringsCompleteLesson } from "./strings-complete";

export {
  stringsCompleteLesson
};

export const stringsCompleteModule = {
  title: "2.1.4 Strings (Complete Reference)",
  slug: "2-1-4-strings-complete",
  description: "A single consolidated reference covering everything about Python strings.",
  order: 2,
  lessons: [
    { ...stringsCompleteLesson, exercises: exercises[stringsCompleteLesson.slug] || [] }
  ]
};
