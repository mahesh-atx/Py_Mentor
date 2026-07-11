export { oopIntroductionLesson } from "./oop-introduction";
export { classesAndObjectsLesson } from "./classes-and-objects";
export { initAndSelfLesson } from "./init-and-self";
export { instanceVsClassVariablesLesson } from "./instance-vs-class-variables";
export { methodsLesson } from "./methods";
export { strAndReprLesson } from "./str-and-repr";
export { encapsulationLesson } from "./encapsulation";
export { exercises } from "./exercises";

import { oopIntroductionLesson } from "./oop-introduction";
import { classesAndObjectsLesson } from "./classes-and-objects";
import { initAndSelfLesson } from "./init-and-self";
import { instanceVsClassVariablesLesson } from "./instance-vs-class-variables";
import { methodsLesson } from "./methods";
import { strAndReprLesson } from "./str-and-repr";
import { encapsulationLesson } from "./encapsulation";
import { exercises } from "./exercises";

export const oopFundamentalsModule = {
  title: "3.1 OOP Fundamentals",
  slug: "3-1-oop-fundamentals",
  description: "Learn the fundamentals of Object Oriented Programming in Python.",
  order: 1,
  lessons: [
    { ...oopIntroductionLesson, exercises: exercises[oopIntroductionLesson.slug] },
    { ...classesAndObjectsLesson, exercises: exercises[classesAndObjectsLesson.slug] },
    { ...initAndSelfLesson, exercises: exercises[initAndSelfLesson.slug] },
    { ...instanceVsClassVariablesLesson, exercises: exercises[instanceVsClassVariablesLesson.slug] },
    { ...methodsLesson, exercises: exercises[methodsLesson.slug] },
    { ...strAndReprLesson, exercises: exercises[strAndReprLesson.slug] },
    { ...encapsulationLesson, exercises: exercises[encapsulationLesson.slug] }
  ]
};
