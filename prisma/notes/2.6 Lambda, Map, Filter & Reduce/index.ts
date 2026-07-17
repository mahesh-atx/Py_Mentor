import { exercises } from "./exercises";
import { lambdaFunctionsLesson } from "./lambda-functions";
import { mapFunctionLesson } from "./map-function";
import { filterFunctionLesson } from "./filter-function";
import { reduceFunctionLesson } from "./reduce-function";
import { zipFunctionLesson } from "./zip-function";
import { enumerateFunctionLesson } from "./enumerate-function";
import { sortedWithKeyLesson } from "./sorted-with-key";
import { anyAllFunctionsLesson } from "./any-all-functions";
import { combiningLambdaMapFilterReduceLesson } from "./combining-lambda-map-filter-reduce";

export {
  lambdaFunctionsLesson,
  mapFunctionLesson,
  filterFunctionLesson,
  reduceFunctionLesson,
  zipFunctionLesson,
  enumerateFunctionLesson,
  sortedWithKeyLesson,
  anyAllFunctionsLesson,
  combiningLambdaMapFilterReduceLesson
};

export const functionalToolsModule = {
  title: "2.6 Lambda, Map, Filter & Reduce",
  slug: "2-6-lambda-map-filter-reduce",
  description: "Master Python's functional programming tools — lambda functions, map, filter, reduce, zip, enumerate, sorted with key, and any/all.",
  order: 6,
  lessons: [
    { ...lambdaFunctionsLesson, exercises: exercises[lambdaFunctionsLesson.slug] || [] },
    { ...mapFunctionLesson, exercises: exercises[mapFunctionLesson.slug] || [] },
    { ...filterFunctionLesson, exercises: exercises[filterFunctionLesson.slug] || [] },
    { ...reduceFunctionLesson, exercises: exercises[reduceFunctionLesson.slug] || [] },
    { ...zipFunctionLesson, exercises: exercises[zipFunctionLesson.slug] || [] },
    { ...enumerateFunctionLesson, exercises: exercises[enumerateFunctionLesson.slug] || [] },
    { ...sortedWithKeyLesson, exercises: exercises[sortedWithKeyLesson.slug] || [] },
    { ...anyAllFunctionsLesson, exercises: exercises[anyAllFunctionsLesson.slug] || [] },
    { ...combiningLambdaMapFilterReduceLesson, exercises: exercises[combiningLambdaMapFilterReduceLesson.slug] || [] }
  ]
};
