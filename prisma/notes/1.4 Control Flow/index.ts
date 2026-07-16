import { exercises } from "./exercises";
import { conditionalStatementsLesson } from "./conditional-statements";
import { ifElifElseLesson } from "./if-elif-else";
import { nestedIfLesson } from "./nested-if";
import { ternaryOperatorLesson } from "./ternary-operator";
import { matchCaseLesson } from "./match-case";

export {
  conditionalStatementsLesson,
  ifElifElseLesson,
  nestedIfLesson,
  ternaryOperatorLesson,
  matchCaseLesson
};

export const controlFlowModule = {
  title: "1.4 Control Flow",
  slug: "1-4-control-flow",
  description: "Control Flow.",
  order: 4,
  lessons: [
    { ...conditionalStatementsLesson, exercises: exercises[conditionalStatementsLesson.slug] },
    { ...ifElifElseLesson, exercises: exercises[ifElifElseLesson.slug] },
    { ...nestedIfLesson, exercises: exercises[nestedIfLesson.slug] },
    { ...ternaryOperatorLesson, exercises: exercises[ternaryOperatorLesson.slug] },
    { ...matchCaseLesson, exercises: exercises[matchCaseLesson.slug] }
  ]
};
