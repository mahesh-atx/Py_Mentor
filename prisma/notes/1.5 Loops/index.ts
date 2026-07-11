import { exercises } from "./exercises";
import { forLoopLesson } from "./for-loops";
import { whileLoopLesson } from "./while-loops";
import { nestedLoopsLesson } from "./nested-loops";
import { loopControlStatementsLesson } from "./loop-control";
import { rangeFunctionLesson } from "./range-function";
import { patternPrintingLesson } from "./pattern-printing";

export {
  forLoopLesson,
  whileLoopLesson,
  nestedLoopsLesson,
  loopControlStatementsLesson,
  rangeFunctionLesson,
  patternPrintingLesson
};

export const loopsModule = {
  title: "1.5 Loops",
  slug: "1-5-loops",
  description: "Loops.",
  order: 5,
  lessons: [
    { ...forLoopLesson, exercises: exercises[forLoopLesson.slug] },
    { ...whileLoopLesson, exercises: exercises[whileLoopLesson.slug] },
    { ...nestedLoopsLesson, exercises: exercises[nestedLoopsLesson.slug] },
    { ...loopControlStatementsLesson, exercises: exercises[loopControlStatementsLesson.slug] },
    { ...rangeFunctionLesson, exercises: exercises[rangeFunctionLesson.slug] },
    { ...patternPrintingLesson, exercises: exercises[patternPrintingLesson.slug] }
  ]
};
