import { exercises } from "./exercises";
import { conditionalStatementsLesson } from "./conditional-statements";

export {
  conditionalStatementsLesson
};

export const controlFlowModule = {
  title: "1.4 Control Flow",
  slug: "1-4-control-flow",
  description: "Control Flow.",
  order: 4,
  lessons: [
    { ...conditionalStatementsLesson, exercises: exercises[conditionalStatementsLesson.slug] }
  ]
};
