import { introductionLesson } from "./introduction";
import { setupLesson } from "./setup";
import { helloWorldLesson } from "./hello-world";
import { interpreterLesson } from "./interpreter";
import { syntaxLesson } from "./syntax";
import { commentsLesson } from "./comments";

export {
  introductionLesson,
  setupLesson,
  helloWorldLesson,
  interpreterLesson,
  syntaxLesson,
  commentsLesson
};

export const module1 = {
  title: "Module 1: Getting Started",
  slug: "module-1-getting-started",
  description: "Getting Started with Python.",
  order: 1,
  lessons: [
    introductionLesson,
    setupLesson,
    helloWorldLesson,
    interpreterLesson,
    syntaxLesson,
    commentsLesson
  ]
};
