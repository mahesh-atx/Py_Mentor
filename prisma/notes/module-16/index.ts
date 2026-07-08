export { typeHintsIntroductionLesson } from "./type-hints-introduction";
export { basicTypeAnnotationsLesson } from "./basic-type-annotations";
export { typingModuleLesson } from "./typing-module";
export { advancedTypeFeaturesLesson } from "./advanced-type-features";
export { typeCheckingRuntimeLesson } from "./type-checking-runtime";
export { exercises } from "./exercises";

import { typeHintsIntroductionLesson } from "./type-hints-introduction";
import { basicTypeAnnotationsLesson } from "./basic-type-annotations";
import { typingModuleLesson } from "./typing-module";
import { advancedTypeFeaturesLesson } from "./advanced-type-features";
import { typeCheckingRuntimeLesson } from "./type-checking-runtime";
import { exercises } from "./exercises";

export const module16 = {
  title: "Module 16: Type Hints and Annotations",
  slug: "module-16-type-hints",
  description: "Learn how to use type hints to write safer and more maintainable Python code.",
  order: 16,
  lessons: [
    { ...typeHintsIntroductionLesson, exercises: exercises[typeHintsIntroductionLesson.slug] || [] },
    { ...basicTypeAnnotationsLesson, exercises: exercises[basicTypeAnnotationsLesson.slug] || [] },
    { ...typingModuleLesson, exercises: exercises[typingModuleLesson.slug] || [] },
    { ...advancedTypeFeaturesLesson, exercises: exercises[advancedTypeFeaturesLesson.slug] || [] },
    { ...typeCheckingRuntimeLesson, exercises: exercises[typeCheckingRuntimeLesson.slug] || [] }
  ]
};
