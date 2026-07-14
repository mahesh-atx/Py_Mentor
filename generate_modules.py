"""Scaffold new curriculum modules with boilerplate lesson files and an index.

Usage:
    python generate_modules.py

The script writes into ``prisma/notes/`` relative to the repository root,
which it detects from this file's own location — so it works on any OS.
"""

from pathlib import Path

# Repository root = parent of the directory containing *this script*
REPO_ROOT = Path(__file__).resolve().parent
NOTES_DIR = REPO_ROOT / "prisma" / "notes"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def camel_case(slug: str) -> str:
    parts = slug.split("-")
    return parts[0] + "".join(word.capitalize() for word in parts[1:]) + "Lesson"


def create_lesson(directory: Path, slug: str, title: str) -> tuple[str, str]:
    """Write a single lesson ``.ts`` file.  Returns (slug, exportName)."""
    camel = camel_case(slug)
    content = (
        f'export const {camel} = {{\n'
        f'  title: "{title}",\n'
        f'  slug: "{slug}",\n'
        f'  content: `# {title}\\n\\nComing soon...`,\n'
        f'  objectives: ["Understand {title}."],\n'
        f'  difficulty: "beginner",\n'
        f'  xpReward: 50,\n'
        f"}};\n"
    )
    (directory / f"{slug}.ts").write_text(content, encoding="utf-8")
    return slug, camel


# ---------------------------------------------------------------------------
# Module definitions — edit these to add new modules
# ---------------------------------------------------------------------------

FILE_HANDLING_SLUG = "2-4-file-handling"
FILE_HANDLING_LESSONS = [
    ("reading-files", "Reading files (read, readline, readlines)"),
    ("writing-appending-files", "Writing & appending to files"),
    ("context-manager-with", "Context manager (with statement)"),
    ("working-with-csv", "Working with CSV files"),
    ("working-with-json", "Working with JSON files"),
    ("file-directory-operations", "File & directory operations (os, shutil)"),
]

ERROR_HANDLING_SLUG = "2-5-error-handling"
ERROR_HANDLING_LESSONS = [
    ("try-except-else-finally", "try / except / else / finally"),
    ("common-exceptions", "Common exceptions (ValueError, TypeError, etc.)"),
    ("raising-exceptions", "Raising exceptions (raise)"),
    ("custom-exceptions", "Custom exception classes"),
    ("assertions", "Assertion (assert)"),
]


def process_module(
    title: str,
    slug: str,
    description: str,
    lessons: list[tuple[str, str]],
) -> None:
    """Create a full module directory with lesson files, exercises stub, and index."""
    directory = NOTES_DIR / title
    directory.mkdir(parents=True, exist_ok=True)

    created = [create_lesson(directory, l_slug, l_title) for l_slug, l_title in lessons]

    # exercises stub
    (directory / "exercises.ts").write_text(
        "export const exercises: Record<string, any[]> = {};\n", encoding="utf-8"
    )

    imports = "\n".join(f'import {{ {c} }} from "./{s}";' for s, c in created)
    exports_list = ",\n  ".join(c for _, c in created)
    array_items = ",\n".join(
        f"    {{ ...{c}, exercises: exercises[{c}.slug] || [] }}" for _, c in created
    )

    # Derive module export name from slug, e.g. "2-4-file-handling" → "fileHandlingModule"
    parts = slug.split("-")[2:]  # drop leading "2-4"
    module_name = parts[0] + "".join(w.capitalize() for w in parts[1:]) + "Module"
    order = slug.split("-")[1]

    index_content = (
        f'import {{ exercises }} from "./exercises";\n'
        f"{imports}\n\n"
        f"export {{\n  {exports_list}\n}};\n\n"
        f"export const {module_name} = {{\n"
        f'  title: "{title}",\n'
        f'  slug: "{slug}",\n'
        f'  description: "{description}",\n'
        f"  order: {order},\n"
        f"  lessons: [\n"
        f"{array_items}\n"
        f"  ]\n"
        f"}};\n"
    )
    (directory / "index.ts").write_text(index_content, encoding="utf-8")


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    process_module(
        "2.4 File Handling",
        FILE_HANDLING_SLUG,
        "Learn how to read and write files.",
        FILE_HANDLING_LESSONS,
    )
    process_module(
        "2.5 Error Handling",
        ERROR_HANDLING_SLUG,
        "Learn how to handle errors and exceptions.",
        ERROR_HANDLING_LESSONS,
    )
    print("Modules generated successfully.")
