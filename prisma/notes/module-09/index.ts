import { exercises } from "./exercises";
import { builtinFunctionsCoreLesson } from "./builtin-functions-core";
import { typeConversionFunctionsLesson } from "./type-conversion-functions";
import { numericFunctionsMathLesson } from "./numeric-functions-math";
import { stringBuiltinsLesson } from "./string-builtins";
import { functionalBuiltinsLesson } from "./functional-builtins";

export { 
  builtinFunctionsCoreLesson,
  typeConversionFunctionsLesson,
  numericFunctionsMathLesson,
  stringBuiltinsLesson,
  functionalBuiltinsLesson
};

export const module9 = {
  title: "Module 9: Built-in Functions",
  slug: "module-9-builtin-functions",
  description: "Master Python's built-in functions for everyday tasks.",
  order: 9,
  lessons: [
    builtinFunctionsCoreLesson,
    typeConversionFunctionsLesson,
    numericFunctionsMathLesson,
    stringBuiltinsLesson,
    functionalBuiltinsLesson
  ],
  exercises: exercises,
};
