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

export const module15 = {
  title: "Module 15: Object Oriented Programming (OOP) Part 2",
  slug: "module-15-oop-part-2",
  description: "Advanced Object Oriented Programming concepts like Inheritance and Polymorphism.",
  order: 15,
  lessons: [
    { ...inheritanceLesson, exercises: exercises[inheritanceLesson.slug] },
    { ...polymorphismLesson, exercises: exercises[polymorphismLesson.slug] },
    { ...abstractionLesson, exercises: exercises[abstractionLesson.slug] },
    { ...compositionVsInheritanceLesson, exercises: exercises[compositionVsInheritanceLesson.slug] },
    { ...magicMethodsLesson, exercises: exercises[magicMethodsLesson.slug] }
  ]
};
