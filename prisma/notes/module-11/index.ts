import { exercises } from "./exercises";
import { definingCallingFunctionsLesson } from "./defining-calling-functions";
import { parametersAndArgumentsLesson } from "./parameters-and-arguments";
import { returnStatementLesson } from "./return-statement";
import { scopeLesson } from "./scope";
import { docstringsLesson } from "./docstrings";
import { recursiveFunctionsLesson } from "./recursive-functions";
import { nestedFunctionsLesson } from "./nested-functions";
import { firstClassFunctionsLesson } from "./first-class-functions";

export {
  definingCallingFunctionsLesson,
  parametersAndArgumentsLesson,
  returnStatementLesson,
  scopeLesson,
  docstringsLesson,
  recursiveFunctionsLesson,
  nestedFunctionsLesson,
  firstClassFunctionsLesson
};

export const module11 = {
  title: "Module 11: Functions",
  slug: "module-11-functions",
  description: "Learn to write reusable code using functions, parameters, and return values.",
  order: 11,
  lessons: [
    definingCallingFunctionsLesson,
    parametersAndArgumentsLesson,
    returnStatementLesson,
    scopeLesson,
    docstringsLesson,
    recursiveFunctionsLesson,
    nestedFunctionsLesson,
    firstClassFunctionsLesson
  ],
  exercises: exercises,
};
