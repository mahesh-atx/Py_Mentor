import { exercisesModule12 } from "./exercises";
import { lambdaFunctionsLesson } from "./lambda-functions";
import { mapFilterReduceLesson } from "./map-filter-reduce";
import { zipEnumerateSortedLesson } from "./zip-enumerate-sorted";
import { anyAllCombiningLesson } from "./any-all-combining";

export {
  lambdaFunctionsLesson,
  mapFilterReduceLesson,
  zipEnumerateSortedLesson,
  anyAllCombiningLesson
};

export const module12 = {
  title: "Module 12: Functional Programming Concepts",
  slug: "module-12-functional-programming",
  description: "Learn functional programming concepts in Python including lambda functions, map, filter, reduce, and other useful built-in functions.",
  order: 12,
  lessons: [
    lambdaFunctionsLesson,
    mapFilterReduceLesson,
    zipEnumerateSortedLesson,
    anyAllCombiningLesson
  ],
  exercises: exercisesModule12,
};
