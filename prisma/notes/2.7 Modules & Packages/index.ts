import { exercises } from "./exercises";
import { whatAreModulesLesson } from "./what-are-modules";
import { importStatementsLesson } from "./import-statements";
import { creatingYourOwnModulesLesson } from "./creating-your-own-modules";
import { nameMainLesson } from "./name-main";
import { standardLibraryOverviewLesson } from "./standard-library-overview";
import { packagesInitPyLesson } from "./packages-init-py";
import { installingThirdPartyPackagesLesson } from "./installing-third-party-packages";
import { virtualEnvironmentsLesson } from "./virtual-environments";
import { requirementsTxtLesson } from "./requirements-txt";

export {
  whatAreModulesLesson,
  importStatementsLesson,
  creatingYourOwnModulesLesson,
  nameMainLesson,
  standardLibraryOverviewLesson,
  packagesInitPyLesson,
  installingThirdPartyPackagesLesson,
  virtualEnvironmentsLesson,
  requirementsTxtLesson
};

export const modulesPackagesModule = {
  title: "2.7 Modules & Packages",
  slug: "2-7-modules-packages",
  description: "Learn to organize, import, and distribute Python code using modules, packages, and dependency management tools.",
  order: 7,
  lessons: [
    { ...whatAreModulesLesson, exercises: exercises[whatAreModulesLesson.slug] || [] },
    { ...importStatementsLesson, exercises: exercises[importStatementsLesson.slug] || [] },
    { ...creatingYourOwnModulesLesson, exercises: exercises[creatingYourOwnModulesLesson.slug] || [] },
    { ...nameMainLesson, exercises: exercises[nameMainLesson.slug] || [] },
    { ...standardLibraryOverviewLesson, exercises: exercises[standardLibraryOverviewLesson.slug] || [] },
    { ...packagesInitPyLesson, exercises: exercises[packagesInitPyLesson.slug] || [] },
    { ...installingThirdPartyPackagesLesson, exercises: exercises[installingThirdPartyPackagesLesson.slug] || [] },
    { ...virtualEnvironmentsLesson, exercises: exercises[virtualEnvironmentsLesson.slug] || [] },
    { ...requirementsTxtLesson, exercises: exercises[requirementsTxtLesson.slug] || [] }
  ]
};
