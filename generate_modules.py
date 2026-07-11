import os

file_handling_dir = r"c:\Users\Mahesh\Desktop\py\pymentor\prisma\notes\2.4 File Handling"
error_handling_dir = r"c:\Users\Mahesh\Desktop\py\pymentor\prisma\notes\2.5 Error Handling"

os.makedirs(file_handling_dir, exist_ok=True)
os.makedirs(error_handling_dir, exist_ok=True)

def camel_case(slug):
    parts = slug.split('-')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:]) + 'Lesson'

def create_lesson(directory, slug, title):
    camel = camel_case(slug)
    content = f"""export const {camel} = {{
  title: "{title}",
  slug: "{slug}",
  content: `# {title}\\n\\nComing soon...`,
  objectives: ["Understand {title}."],
  difficulty: "beginner",
  xpReward: 50,
}};
"""
    with open(os.path.join(directory, slug + ".ts"), "w", encoding="utf-8") as f:
        f.write(content)
    return slug, camel

file_handling_lessons = [
  ('reading-files', 'Reading files (read, readline, readlines)'),
  ('writing-appending-files', 'Writing & appending to files'),
  ('context-manager', 'Context manager (with statement)'),
  ('csv-files', 'Working with CSV files'),
  ('json-files', 'Working with JSON files'),
  ('file-directory-operations', 'File & directory operations (os, shutil)')
]

error_handling_lessons = [
  ('try-except-else-finally', 'try / except / else / finally'),
  ('common-exceptions', 'Common exceptions (ValueError, TypeError, etc.)'),
  ('raising-exceptions', 'Raising exceptions (raise)'),
  ('custom-exception-classes', 'Custom exception classes'),
  ('assertion', 'Assertion (assert)')
]

def process_module(directory, title, slug, desc, lessons):
    created = [create_lesson(directory, l_slug, l_title) for l_slug, l_title in lessons]
    
    with open(os.path.join(directory, "exercises.ts"), "w", encoding="utf-8") as f:
        f.write("export const exercises: Record<string, any[]> = {};\n")
    
    imports = "\n".join(f'import {{ {c} }} from "./{s}";' for s, c in created)
    exports_list = ",\n  ".join(c for s, c in created)
    array_items = ",\n".join(f'    {{ ...{c}, exercises: exercises[{c}.slug] || [] }}' for s, c in created)
    
    parts = slug.split('-')[2:]
    module_name = parts[0] + ''.join(w.capitalize() for w in parts[1:]) + 'Module'
    order = slug.split('-')[1]
    
    index_content = f"""import {{ exercises }} from "./exercises";
{imports}

export {{
  {exports_list}
}};

export const {module_name} = {{
  title: "{title}",
  slug: "{slug}",
  description: "{desc}",
  order: {order},
  lessons: [
{array_items}
  ]
}};
"""
    with open(os.path.join(directory, "index.ts"), "w", encoding="utf-8") as f:
        f.write(index_content)

process_module(file_handling_dir, '2.4 File Handling', '2-4-file-handling', 'Learn how to read and write files.', file_handling_lessons)
process_module(error_handling_dir, '2.5 Error Handling', '2-5-error-handling', 'Learn how to handle errors and exceptions.', error_handling_lessons)

print("Modules generated successfully.")
