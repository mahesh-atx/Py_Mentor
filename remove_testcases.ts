import { Project, SyntaxKind, ArrayLiteralExpression } from "ts-morph";
import * as fs from 'fs';

function processFiles() {
  const project = new Project();
  project.addSourceFilesAtPaths("prisma/**/*.ts");

  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    let modified = false;

    // Collect all initializers first
    const initializersToUpdate: ArrayLiteralExpression[] = [];

    const propertyAssignments = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
    for (const prop of propertyAssignments) {
      if (prop.getName() === "testCases") {
        const initializer = prop.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
        if (initializer && initializer.getElements().length > 1) {
          initializersToUpdate.push(initializer);
        }
      }
    }

    // Now update them
    for (const initializer of initializersToUpdate) {
      const elements = initializer.getElements();
      if (elements.length > 1) {
        const firstElementText = elements[0].getText();
        // Replacing text can still invalidate parent tree if we do it in order?
        // ts-morph handles it mostly, but let's replace all elements except the first
        // actually, replaceWithText is fine if we don't have nested initializersToUpdate (we don't here)
        initializer.replaceWithText(`[${firstElementText}]`);
        modified = true;
      }
    }

    if (modified) {
      sourceFile.saveSync();
      console.log(`Updated ${sourceFile.getFilePath()}`);
    }
  }
}

processFiles();
