import { chapter16Events } from "./content";
import { exercises } from "./exercises";

export { chapter16Events };

export const eventsModule = {
  title: "16. Event Handling",
  slug: "js-16-events-module",
  description: "Learn how to make web pages interactive by handling user and browser events.",
  order: 6,
  lessons: [
    { ...chapter16Events, exercises: exercises["js-16-events"] || [] }]
};
