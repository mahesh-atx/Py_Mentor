import { exercises } from "./exercises";
import { mathModuleCompleteLesson } from "./math-module-complete";
import { randomModuleLesson } from "./random-module";
import { statisticsModuleLesson } from "./statistics-module";
import { decimalModuleLesson } from "./decimal-module";
import { fractionsModuleLesson } from "./fractions-module";
import { complexNumbersLesson } from "./complex-numbers";
import { numberSystemsLesson } from "./number-systems";
import { bitwiseOperationsLesson } from "./bitwise-operations";

export {
  mathModuleCompleteLesson,
  randomModuleLesson,
  statisticsModuleLesson,
  decimalModuleLesson,
  fractionsModuleLesson,
  complexNumbersLesson,
  numberSystemsLesson,
  bitwiseOperationsLesson
};

export const module10 = {
  title: "Module 10: Math & Numbers",
  slug: "module-10-math-numbers",
  description: "Advanced math operations, random numbers, and specialized number types.",
  order: 10,
  lessons: [
    mathModuleCompleteLesson,
    randomModuleLesson,
    statisticsModuleLesson,
    decimalModuleLesson,
    fractionsModuleLesson,
    complexNumbersLesson,
    numberSystemsLesson,
    bitwiseOperationsLesson
  ],
  exercises: exercises,
};
