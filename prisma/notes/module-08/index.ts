import { exercises } from "./exercises";
import { creatingDictionariesLesson } from "./creating-dictionaries";
import { dictionaryAccessModifyLesson } from "./dictionary-access-modify";
import { dictionaryMethodsLesson } from "./dictionary-methods";
import { dictionaryComprehensionLesson } from "./dictionary-comprehension";
import { nestedDictionariesLesson } from "./nested-dictionaries";
import { iteratingDictionariesLesson } from "./iterating-dictionaries";
import { dictionaryVsJsonLesson } from "./dictionary-vs-json";

export {
  creatingDictionariesLesson,
  dictionaryAccessModifyLesson,
  dictionaryMethodsLesson,
  dictionaryComprehensionLesson,
  nestedDictionariesLesson,
  iteratingDictionariesLesson,
  dictionaryVsJsonLesson
};

export const module8 = {
  title: "Module 8: Dictionaries",
  slug: "module-8-dictionaries",
  description: "Learn to map keys to values and structure complex data using dictionaries.",
  order: 8,
  lessons: [
    { ...creatingDictionariesLesson, exercises: exercises[creatingDictionariesLesson.slug] || [] },
    { ...dictionaryAccessModifyLesson, exercises: exercises[dictionaryAccessModifyLesson.slug] || [] },
    { ...dictionaryMethodsLesson, exercises: exercises[dictionaryMethodsLesson.slug] || [] },
    { ...dictionaryComprehensionLesson, exercises: exercises[dictionaryComprehensionLesson.slug] || [] },
    { ...nestedDictionariesLesson, exercises: exercises[nestedDictionariesLesson.slug] || [] },
    { ...iteratingDictionariesLesson, exercises: exercises[iteratingDictionariesLesson.slug] || [] },
    { ...dictionaryVsJsonLesson, exercises: exercises[dictionaryVsJsonLesson.slug] || [] }
  ]
};
