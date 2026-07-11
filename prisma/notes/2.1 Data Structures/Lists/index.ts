import { exercises } from "./exercises";
import { listCreatingLesson } from "./list-creating";
import { listIndexingSlicingLesson } from "./list-indexing-slicing";
import { listMethodsAddLesson } from "./list-methods-add";
import { listMethodsRemoveLesson } from "./list-methods-remove";
import { listMethodsOrganizeLesson } from "./list-methods-organize";
import { listMethodsSearchLesson } from "./list-methods-search";
import { listComprehensionLesson } from "./list-comprehension";
import { nestedListsLesson } from "./nested-lists";
import { listUnpackingLesson } from "./list-unpacking";
import { listIteratingLesson } from "./list-iterating";
import { listVsArrayLesson } from "./list-vs-array";

export {
  listCreatingLesson,
  listIndexingSlicingLesson,
  listMethodsAddLesson,
  listMethodsRemoveLesson,
  listMethodsOrganizeLesson,
  listMethodsSearchLesson,
  listComprehensionLesson,
  nestedListsLesson,
  listUnpackingLesson,
  listIteratingLesson,
  listVsArrayLesson
};

export const listsModule = {
  title: "2.1.1 Lists",
  slug: "2-1-1-lists",
  description: "Learn how to store, access, and manipulate collections of items using Python lists.",
  order: 1,
  lessons: [
    { ...listCreatingLesson, exercises: exercises[listCreatingLesson.slug] || [] },
    { ...listIndexingSlicingLesson, exercises: exercises[listIndexingSlicingLesson.slug] || [] },
    { ...listMethodsAddLesson, exercises: exercises[listMethodsAddLesson.slug] || [] },
    { ...listMethodsRemoveLesson, exercises: exercises[listMethodsRemoveLesson.slug] || [] },
    { ...listMethodsOrganizeLesson, exercises: exercises[listMethodsOrganizeLesson.slug] || [] },
    { ...listMethodsSearchLesson, exercises: exercises[listMethodsSearchLesson.slug] || [] },
    { ...listComprehensionLesson, exercises: exercises[listComprehensionLesson.slug] || [] },
    { ...nestedListsLesson, exercises: exercises[nestedListsLesson.slug] || [] },
    { ...listUnpackingLesson, exercises: exercises[listUnpackingLesson.slug] || [] },
    { ...listIteratingLesson, exercises: exercises[listIteratingLesson.slug] || [] },
    { ...listVsArrayLesson, exercises: exercises[listVsArrayLesson.slug] || [] }
  ]
};
