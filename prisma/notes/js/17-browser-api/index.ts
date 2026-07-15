import { chapter17BrowserAPI } from "./content";
import { exercises } from "./exercises";

export { chapter17BrowserAPI };

export const browserApiModule = {
  title: "17. Browser APIs & Storage",
  slug: "js-17-browser-api-module",
  description: "Learn how to use browser storage, navigate the window, and make network requests.",
  order: 7,
  lessons: [
    { ...chapter17BrowserAPI, exercises: exercises["js-17-browser-api"] || [] }]
};
