import { exercises } from "./exercises";
import { tuplesLesson } from "./tuples";
import { setsLesson } from "./sets";

export {
  tuplesLesson,
  setsLesson
};

export const module7 = {
  title: "Module 7: Tuples & Sets",
  slug: "module-7-tuples-sets",
  description: "Explore Tuples for immutable sequences and Sets for unique items and mathematical operations.",
  order: 7,
  lessons: [
    { ...tuplesLesson, exercises: exercises[tuplesLesson.slug] || [] },
    { ...setsLesson, exercises: exercises[setsLesson.slug] || [] }
  ]
};
