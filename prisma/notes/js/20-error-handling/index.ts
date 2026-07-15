import { chapter20ErrorHandling } from "./content";
import { exercises } from "./exercises";

export { chapter20ErrorHandling };

export const errorHandlingModule = {
  title: "20. Error Handling",
  slug: "js-20-error-handling-module",
  description: "Ensure your code can gracefully handle unexpected situations without crashing.",
  order: 10,
  lessons: [
    { ...chapter20ErrorHandling, exercises: exercises["js-20-error-handling"] || [] }]
};
