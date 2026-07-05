import { exercises } from "./exercises";
import { variablesLesson } from "./variables";
import { dataTypesLesson } from "./data-types";
import { typeCastingLesson } from "./type-casting";
import { typeAndIdLesson } from "./type-id";
import { dynamicTypingLesson } from "./dynamic-typing";
import { userInputLesson } from "./user-input";
import { printFormattingLesson } from "./print-formatting";

export {
  variablesLesson,
  dataTypesLesson,
  typeCastingLesson,
  typeAndIdLesson,
  dynamicTypingLesson,
  userInputLesson,
  printFormattingLesson
};

export const module2 = {
  title: "Module 2: Variables & Data Types",
  slug: "module-2-variables",
  description: "Variables & Data Types.",
  order: 2,
  lessons: [
    { ...variablesLesson, exercises: exercises[variablesLesson.slug] },
    { ...dataTypesLesson, exercises: exercises[dataTypesLesson.slug] },
    { ...typeCastingLesson, exercises: exercises[typeCastingLesson.slug] },
    { ...typeAndIdLesson, exercises: exercises[typeAndIdLesson.slug] },
    { ...dynamicTypingLesson, exercises: exercises[dynamicTypingLesson.slug] },
    { ...userInputLesson, exercises: exercises[userInputLesson.slug] },
    { ...printFormattingLesson, exercises: exercises[printFormattingLesson.slug] }
  ]
};
