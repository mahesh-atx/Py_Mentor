import { exercises } from "./exercises";
import { tryExceptElseFinallyLesson } from "./try-except-else-finally";
import { commonExceptionsLesson } from "./common-exceptions";
import { raisingExceptionsLesson } from "./raising-exceptions";
import { customExceptionsLesson } from "./custom-exceptions";
import { assertionsLesson } from "./assertions";

export {
  tryExceptElseFinallyLesson,
  commonExceptionsLesson,
  raisingExceptionsLesson,
  customExceptionsLesson,
  assertionsLesson
};

export const errorHandlingModule = {
  title: "2.5 Error Handling",
  slug: "2-5-error-handling",
  description: "Learn how to handle errors and exceptions.",
  order: 5,
  lessons: [
    { ...tryExceptElseFinallyLesson, exercises: exercises[tryExceptElseFinallyLesson.slug] || [] },
    { ...commonExceptionsLesson, exercises: exercises[commonExceptionsLesson.slug] || [] },
    { ...raisingExceptionsLesson, exercises: exercises[raisingExceptionsLesson.slug] || [] },
    { ...customExceptionsLesson, exercises: exercises[customExceptionsLesson.slug] || [] },
    { ...assertionsLesson, exercises: exercises[assertionsLesson.slug] || [] }
  ]
};
