import { exercises } from "./exercises";
import { definingCallingFunctionsLesson } from "./defining-calling-functions";
import { parametersAndArgumentsLesson } from "./parameters-and-arguments";
import { returnStatementLesson } from "./return-statement";
import { scopeLesson } from "./scope";
import { lambdaFunctionsLesson } from "./lambda-functions";
import { docstringsLesson } from "./docstrings";
import { recursiveFunctionsLesson } from "./recursive-functions";
import { nestedFunctionsLesson } from "./nested-functions";
import { firstClassFunctionsLesson } from "./first-class-functions";

export {
  definingCallingFunctionsLesson,
  parametersAndArgumentsLesson,
  returnStatementLesson,
  scopeLesson,
  lambdaFunctionsLesson,
  docstringsLesson,
  recursiveFunctionsLesson,
  nestedFunctionsLesson,
  firstClassFunctionsLesson
};

export const functionsModule = {
  title: "2.2 Functions",
  slug: "2-2-functions",
  description: "Learn to write reusable code using functions, parameters, and return values.",
  order: 2,
  lessons: [
    { ...definingCallingFunctionsLesson, exercises: exercises[definingCallingFunctionsLesson.slug] || [] },
    { ...parametersAndArgumentsLesson, exercises: exercises[parametersAndArgumentsLesson.slug] || [] },
    { ...returnStatementLesson, exercises: exercises[returnStatementLesson.slug] || [] },
    { ...scopeLesson, exercises: exercises[scopeLesson.slug] || [] },
    { ...lambdaFunctionsLesson, exercises: exercises[lambdaFunctionsLesson.slug] || [] },
    { ...docstringsLesson, exercises: exercises[docstringsLesson.slug] || [] },
    { ...recursiveFunctionsLesson, exercises: exercises[recursiveFunctionsLesson.slug] || [] },
    { ...nestedFunctionsLesson, exercises: exercises[nestedFunctionsLesson.slug] || [] },
    { ...firstClassFunctionsLesson, exercises: exercises[firstClassFunctionsLesson.slug] || [] }
  ]
};
