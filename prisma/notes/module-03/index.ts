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

export const module3 = {
  title: "Module 3: Operators",
  slug: "module-3-operators",
  description: "Operators.",
  order: 3,
  lessons: [
    arithmeticOperatorsLesson,
    comparisonOperatorsLesson,
    logicalOperatorsLesson,
    assignmentOperatorsLesson,
    bitwiseOperatorsLesson,
    identityOperatorsLesson,
    membershipOperatorsLesson,
    operatorPrecedenceLesson
  ]
};
