import { exercises } from "./exercises";
import { numpyLesson } from "./numpy";
import { pandasLesson } from "./pandas";
import { dataCleaningLesson } from "./data-cleaning";
import { dataVisualizationLesson } from "./data-visualization";
import { scikitLearnLesson } from "./scikit-learn";
import { deepLearningLesson } from "./deep-learning";
import { jupyterNotebookLesson } from "./jupyter-notebook";

export {
  numpyLesson,
  pandasLesson,
  dataCleaningLesson,
  dataVisualizationLesson,
  scikitLearnLesson,
  deepLearningLesson,
  jupyterNotebookLesson
};

export const dataScienceModule = {
  title: "4.1 Data Science & Machine Learning",
  slug: "4-1-data-science-ml",
  description: "Master data science and machine learning with Python — from NumPy arrays to deep learning neural networks.",
  order: 1,
  lessons: [
    { ...numpyLesson, exercises: exercises[numpyLesson.slug] || [] },
    { ...pandasLesson, exercises: exercises[pandasLesson.slug] || [] },
    { ...dataCleaningLesson, exercises: exercises[dataCleaningLesson.slug] || [] },
    { ...dataVisualizationLesson, exercises: exercises[dataVisualizationLesson.slug] || [] },
    { ...scikitLearnLesson, exercises: exercises[scikitLearnLesson.slug] || [] },
    { ...deepLearningLesson, exercises: exercises[deepLearningLesson.slug] || [] },
    { ...jupyterNotebookLesson, exercises: exercises[jupyterNotebookLesson.slug] || [] }
  ]
};
