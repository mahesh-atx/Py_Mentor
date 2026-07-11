import { exercises } from "./exercises";
import { stringCreationLesson } from "./string-creation-and-accessing";
import { stringIndexingSlicingLesson } from "./string-indexing-and-slicing";
import { stringMethodsCaseStripLesson } from "./string-methods-case-strip";
import { stringMethodsSearchLesson } from "./string-methods-search";
import { stringMethodsModifyLesson } from "./string-methods-modify";
import { stringMethodsValidationLesson } from "./string-methods-validation";
import { stringConcatenationRepetitionLesson } from "./string-concatenation-repetition";
import { stringImmutabilityLesson } from "./string-immutability";
import { escapeCharactersLesson } from "./escape-characters";
import { rawStringsLesson } from "./raw-strings";
import { stringFormattingFstringsLesson } from "./string-formatting-fstrings";

export {
  stringCreationLesson,
  stringIndexingSlicingLesson,
  stringMethodsCaseStripLesson,
  stringMethodsSearchLesson,
  stringMethodsModifyLesson,
  stringMethodsValidationLesson,
  stringConcatenationRepetitionLesson,
  stringImmutabilityLesson,
  escapeCharactersLesson,
  rawStringsLesson,
  stringFormattingFstringsLesson
};

export const stringManipulationModule = {
  title: "2.3 String Manipulation",
  slug: "2-3-string-manipulation",
  description: "Deep dive into String manipulation and formatting.",
  order: 3,
  lessons: [
    { ...stringCreationLesson, exercises: exercises[stringCreationLesson.slug] || [] },
    { ...stringIndexingSlicingLesson, exercises: exercises[stringIndexingSlicingLesson.slug] || [] },
    { ...stringMethodsCaseStripLesson, exercises: exercises[stringMethodsCaseStripLesson.slug] || [] },
    { ...stringMethodsSearchLesson, exercises: exercises[stringMethodsSearchLesson.slug] || [] },
    { ...stringMethodsModifyLesson, exercises: exercises[stringMethodsModifyLesson.slug] || [] },
    { ...stringMethodsValidationLesson, exercises: exercises[stringMethodsValidationLesson.slug] || [] },
    { ...stringConcatenationRepetitionLesson, exercises: exercises[stringConcatenationRepetitionLesson.slug] || [] },
    { ...stringImmutabilityLesson, exercises: exercises[stringImmutabilityLesson.slug] || [] },
    { ...escapeCharactersLesson, exercises: exercises[escapeCharactersLesson.slug] || [] },
    { ...rawStringsLesson, exercises: exercises[rawStringsLesson.slug] || [] },
    { ...stringFormattingFstringsLesson, exercises: exercises[stringFormattingFstringsLesson.slug] || [] }
  ]
};
