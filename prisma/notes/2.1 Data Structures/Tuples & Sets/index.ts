import { exercises } from "./exercises";
import { tuplesLesson } from "./tuples";
import { setsLesson } from "./sets";

export {
  tuplesLesson,
  setsLesson
};

export const tuplesSetsModule = {
  title: "2.1.2 Tuples & Sets",
  slug: "2-1-2-tuples-and-sets",
  description: "Explore Tuples for immutable sequences and Sets for unique items and mathematical operations.",
  order: 2,
  lessons: [
    { ...tuplesLesson, exercises: exercises[tuplesLesson.slug] || [] },
    { ...setsLesson, exercises: exercises[setsLesson.slug] || [] }
  ]
};
