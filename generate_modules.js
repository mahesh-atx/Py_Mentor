const fs = require('fs');
const path = require('path');

const fileHandlingDir = path.join(__dirname, 'prisma/notes/2.4 File Handling');
const errorHandlingDir = path.join(__dirname, 'prisma/notes/2.5 Error Handling');

fs.mkdirSync(fileHandlingDir, { recursive: true });
fs.mkdirSync(errorHandlingDir, { recursive: true });

const createLesson = (dir, slug, title) => {
  const camelCase = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + 'Lesson';
  const content = 'export const ' + camelCase + ' = {\\n' +
    '  title: "' + title + '",\\n' +
    '  slug: "' + slug + '",\\n' +
    '  content: "# ' + title + '\\\\n\\\\nComing soon...",\\n' +
    '  objectives: ["Understand ' + title + '."],\\n' +
    '  difficulty: "beginner",\\n' +
    '  xpReward: 50,\\n' +
    '};\\n';
  fs.writeFileSync(path.join(dir, slug + '.ts'), content);
  return { slug, camelCase };
};

const fileHandlingLessons = [
  { slug: 'reading-files', title: 'Reading files (read, readline, readlines)' },
  { slug: 'writing-appending-files', title: 'Writing & appending to files' },
  { slug: 'context-manager', title: 'Context manager (with statement)' },
  { slug: 'csv-files', title: 'Working with CSV files' },
  { slug: 'json-files', title: 'Working with JSON files' },
  { slug: 'file-directory-operations', title: 'File & directory operations (os, shutil)' }
];

const errorHandlingLessons = [
  { slug: 'try-except-else-finally', title: 'try / except / else / finally' },
  { slug: 'common-exceptions', title: 'Common exceptions (ValueError, TypeError, etc.)' },
  { slug: 'raising-exceptions', title: 'Raising exceptions (raise)' },
  { slug: 'custom-exception-classes', title: 'Custom exception classes' },
  { slug: 'assertion', title: 'Assertion (assert)' }
];

const processModule = (dir, title, slug, desc, lessons) => {
  const created = lessons.map(l => createLesson(dir, l.slug, l.title));
  
  fs.writeFileSync(path.join(dir, 'exercises.ts'), 'export const exercises: Record<string, any[]> = {};\\n');
  
  const imports = created.map(c => \`import { \${c.camelCase} } from "./\${c.slug}";\`).join('\\n');
  const exportsList = created.map(c => c.camelCase).join(',\\n  ');
  const arrayItems = created.map(c => \`    { ...\${c.camelCase}, exercises: exercises[\${c.camelCase}.slug] || [] }\`).join(',\\n');
  
  const moduleName = slug.split('-').slice(2).map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('') + 'Module';
  
  const indexContent = \`import { exercises } from "./exercises";
\${imports}

export {
  \${exportsList}
};

export const \${moduleName} = {
  title: "\${title}",
  slug: "\${slug}",
  description: "\${desc}",
  order: parseInt("\${slug.split('-')[1]}", 10),
  lessons: [
\${arrayItems}
  ]
};
\`;
  
  fs.writeFileSync(path.join(dir, 'index.ts'), indexContent);
};

processModule(fileHandlingDir, '2.4 File Handling', '2-4-file-handling', 'Learn how to read and write files.', fileHandlingLessons);
processModule(errorHandlingDir, '2.5 Error Handling', '2-5-error-handling', 'Learn how to handle errors and exceptions.', errorHandlingLessons);

console.log('Modules generated successfully.');
