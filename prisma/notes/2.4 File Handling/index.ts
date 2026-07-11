import { exercises } from "./exercises";
import { readingFilesLesson } from "./reading-files";
import { writingAppendingFilesLesson } from "./writing-appending-files";
import { contextManagerWithLesson } from "./context-manager-with";
import { workingWithCsvLesson } from "./working-with-csv";
import { workingWithJsonLesson } from "./working-with-json";
import { fileDirectoryOperationsLesson } from "./file-directory-operations";

export {
  readingFilesLesson,
  writingAppendingFilesLesson,
  contextManagerWithLesson,
  workingWithCsvLesson,
  workingWithJsonLesson,
  fileDirectoryOperationsLesson
};

export const fileHandlingModule = {
  title: "2.4 File Handling",
  slug: "2-4-file-handling",
  description: "Learn how to read and write files.",
  order: 4,
  lessons: [
    { ...readingFilesLesson, exercises: exercises[readingFilesLesson.slug] || [] },
    { ...writingAppendingFilesLesson, exercises: exercises[writingAppendingFilesLesson.slug] || [] },
    { ...contextManagerWithLesson, exercises: exercises[contextManagerWithLesson.slug] || [] },
    { ...workingWithCsvLesson, exercises: exercises[workingWithCsvLesson.slug] || [] },
    { ...workingWithJsonLesson, exercises: exercises[workingWithJsonLesson.slug] || [] },
    { ...fileDirectoryOperationsLesson, exercises: exercises[fileDirectoryOperationsLesson.slug] || [] }
  ]
};
