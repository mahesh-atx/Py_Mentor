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

export const module14 = {
  title: "Module 14: Object Oriented Programming (OOP) Part 1",
  slug: "module-14-oop-part-1",
  description: "Learn the fundamentals of Object Oriented Programming in Python.",
  order: 14,
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
