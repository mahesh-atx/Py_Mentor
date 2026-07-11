export { inheritanceLesson } from "./inheritance";
export { polymorphismLesson } from "./polymorphism";
export { abstractionLesson } from "./abstraction";
export { compositionVsInheritanceLesson } from "./composition-vs-inheritance";
export { magicMethodsLesson } from "./magic-methods";
export { exercises } from "./exercises";

import { inheritanceLesson } from "./inheritance";
import { polymorphismLesson } from "./polymorphism";
import { abstractionLesson } from "./abstraction";
import { compositionVsInheritanceLesson } from "./composition-vs-inheritance";
import { magicMethodsLesson } from "./magic-methods";
import { exercises } from "./exercises";

export const oopPillarsModule = {
  title: "3.2 OOP Pillars",
  slug: "3-2-oop-pillars",
  description: "Advanced Object Oriented Programming concepts like Inheritance and Polymorphism.",
  order: 2,
  lessons: [
    { ...inheritanceLesson, exercises: exercises[inheritanceLesson.slug] },
    { ...polymorphismLesson, exercises: exercises[polymorphismLesson.slug] },
    { ...abstractionLesson, exercises: exercises[abstractionLesson.slug] },
    { ...compositionVsInheritanceLesson, exercises: exercises[compositionVsInheritanceLesson.slug] },
    { ...magicMethodsLesson, exercises: exercises[magicMethodsLesson.slug] }
  ]
};
