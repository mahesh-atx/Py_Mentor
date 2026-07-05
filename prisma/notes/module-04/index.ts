import { exercises } from "./exercises";
import { conditionalStatementsLesson } from "./conditional-statements";
import { forLoopLesson } from "./for-loops";
import { whileLoopLesson } from "./while-loops";
import { nestedLoopsLesson } from "./nested-loops";
import { loopControlStatementsLesson } from "./loop-control";
import { rangeFunctionLesson } from "./range-function";
import { patternPrintingLesson } from "./pattern-printing";

export {
  conditionalStatementsLesson,
  forLoopLesson,
  whileLoopLesson,
  nestedLoopsLesson,
  loopControlStatementsLesson,
  rangeFunctionLesson,
  patternPrintingLesson
};

export const module4 = {
  title: "Module 4: Control Flow",
  slug: "module-4-control-flow",
  description: "Control Flow.",
  order: 4,
  lessons: [
    { ...conditionalStatementsLesson, exercises: exercises[conditionalStatementsLesson.slug] },
    { ...forLoopLesson, exercises: exercises[forLoopLesson.slug] },
    { ...whileLoopLesson, exercises: exercises[whileLoopLesson.slug] },
    { ...nestedLoopsLesson, exercises: exercises[nestedLoopsLesson.slug] },
    { ...loopControlStatementsLesson, exercises: exercises[loopControlStatementsLesson.slug] },
    { ...rangeFunctionLesson, exercises: exercises[rangeFunctionLesson.slug] },
    { ...patternPrintingLesson, exercises: exercises[patternPrintingLesson.slug] }
  ]
};
