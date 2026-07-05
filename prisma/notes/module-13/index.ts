import { exercisesModule13 } from "./exercises";
import { functionalProgrammingConceptsLesson } from "./functional-programming-concepts";
import { curryingPartialFunctionsLesson } from "./currying-partial-functions";
import { functoolsModuleLesson } from "./functools-module";
import { itertoolsModuleLesson } from "./itertools-module";
import { operatorModuleLesson } from "./operator-module";

export {
  functionalProgrammingConceptsLesson,
  curryingPartialFunctionsLesson,
  functoolsModuleLesson,
  itertoolsModuleLesson,
  operatorModuleLesson
};

export const module13 = {
  title: "Module 13: Advanced Functional Programming",
  slug: "module-13-advanced-functional-programming",
  description: "Dive deeper into functional programming with advanced concepts and standard library modules like functools, itertools, and operator.",
  order: 13,
  lessons: [
    functionalProgrammingConceptsLesson,
    curryingPartialFunctionsLesson,
    functoolsModuleLesson,
    itertoolsModuleLesson,
    operatorModuleLesson
  ],
  exercises: exercisesModule13,
};
