import { exercises } from "./exercises";
import { arithmeticOperatorsLesson } from "./arithmetic-operators";
import { comparisonOperatorsLesson } from "./comparison-operators";
import { logicalOperatorsLesson } from "./logical-operators";
import { assignmentOperatorsLesson } from "./assignment-operators";
import { bitwiseOperatorsLesson } from "./bitwise-operators";
import { identityOperatorsLesson } from "./identity-operators";
import { membershipOperatorsLesson } from "./membership-operators";
import { operatorPrecedenceLesson } from "./operator-precedence";

export {
  arithmeticOperatorsLesson,
  comparisonOperatorsLesson,
  logicalOperatorsLesson,
  assignmentOperatorsLesson,
  bitwiseOperatorsLesson,
  identityOperatorsLesson,
  membershipOperatorsLesson,
  operatorPrecedenceLesson
};

export const operatorsModule = {
  title: "1.3 Operators",
  slug: "1-3-operators",
  description: "Operators.",
  order: 3,
  lessons: [
    { ...arithmeticOperatorsLesson, exercises: exercises[arithmeticOperatorsLesson.slug] },
    { ...comparisonOperatorsLesson, exercises: exercises[comparisonOperatorsLesson.slug] },
    { ...logicalOperatorsLesson, exercises: exercises[logicalOperatorsLesson.slug] },
    { ...assignmentOperatorsLesson, exercises: exercises[assignmentOperatorsLesson.slug] },
    { ...bitwiseOperatorsLesson, exercises: exercises[bitwiseOperatorsLesson.slug] },
    { ...identityOperatorsLesson, exercises: exercises[identityOperatorsLesson.slug] },
    { ...membershipOperatorsLesson, exercises: exercises[membershipOperatorsLesson.slug] },
    { ...operatorPrecedenceLesson, exercises: exercises[operatorPrecedenceLesson.slug] }
  ]
};
