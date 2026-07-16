export const contextManagerWithLesson = {
  title: "Context Manager (with statement)",
  slug: "context-manager-with",
  content: `# Context Manager (with statement)

A context manager is a promise about cleanup: it guarantees that a paired setup-and-teardown always happens, even when things go wrong, because behind the with statement Python calls __enter__() on entry and __exit__() on exit. The pitfall is assuming the file closes only on success, when in fact the teardown fires on errors too — which is exactly why with is safer than manual open/close.

## The Problem With Manual File Handling

When you open a file manually, you MUST close it. But what happens if an error occurs?

\`\`\`python
# Dangerous - what if read() raises an exception?
file = open("data.txt", "r")
content = file.read()   # If THIS raises an exception...
file.close()            # ...this line is NEVER reached!
# File stays open! This is a resource leak.

# Safer but ugly
file = open("data.txt", "r")
try:
    content = file.read()
finally:
    file.close()   # Always runs, even if exception occurs
\`\`\`

## The with Statement - The Right Way

The \`with\` statement (context manager) automatically closes the file when the block ends, whether it ends normally OR due to an exception.

\`\`\`python
# Clean, safe, Pythonic
with open("data.txt", "r") as file:
    content = file.read()
    # File is open here

# File is automatically closed here - even if exception occurred inside!
# No need for try/finally or explicit close()
\`\`\`

The \`as file\` part gives the file object a name you use inside the block.

## How the with Statement Works

\`\`\`python
# These two are equivalent:

# With statement (preferred)
with open("data.txt", "r") as f:
    content = f.read()

# Manual try/finally (old way)
f = open("data.txt", "r")
try:
    content = f.read()
finally:
    f.close()
\`\`\`

The \`with\` statement calls \`__enter__()\` when entering and \`__exit__()\` when leaving (which closes the file).

## Reading with Context Manager

\`\`\`python
# Read entire file
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
print(content)   # File is already closed here

# Read line by line (most memory efficient)
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())

# Read all lines into a list
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
print(f"Total lines: {len(lines)}")

# Read first line only
with open("data.txt", "r", encoding="utf-8") as file:
    first_line = file.readline()
print(f"First line: {first_line.strip()}")

# Check if file was properly closed
with open("data.txt", "r") as file:
    pass   # Minimal block

print(file.closed)   # True - automatically closed!
\`\`\`

## Writing with Context Manager

\`\`\`python
# Write to file
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\\n")
    file.write("This is line 2.\\n")
# File automatically closed and flushed here

# Append to file
with open("output.txt", "a", encoding="utf-8") as file:
    file.write("Appended line.\\n")

# Write multiple lines
data = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
with open("output.txt", "w", encoding="utf-8") as file:
    file.writelines(data)

# Write with print() - can redirect to file!
with open("output.txt", "w", encoding="utf-8") as file:
    print("Hello from print!", file=file)
    print("Line 2", file=file)
    print(f"Computed: {2 + 2}", file=file)
\`\`\`

## Multiple Files in One with Statement

\`\`\`python
# Open two files at once
with open("input.txt", "r") as source, open("output.txt", "w") as dest:
    for line in source:
        processed = line.strip().upper()
        dest.write(processed + "\\n")
# Both files closed automatically

# Copy a file
with open("original.txt", "r", encoding="utf-8") as src, \\
     open("backup.txt", "w", encoding="utf-8") as dst:
    dst.write(src.read())
\`\`\`

## Exception Handling with Context Manager

The file is closed even when exceptions occur:

\`\`\`python
# File will be closed even if an exception occurs
try:
    with open("data.txt", "r") as file:
        content = file.read()
        # Simulate an error
        raise ValueError("Something went wrong!")
except ValueError as e:
    print(f"Error: {e}")

# File is still closed properly
print(file.closed)   # True

# Handle file not found
try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")
except PermissionError:
    print("No permission to read this file!")
\`\`\`

## Practical Examples

### Copy File with Progress

\`\`\`python
def copy_file(source_path, dest_path, chunk_size=1024):
    """Copy a file in chunks with progress reporting."""
    try:
        with open(source_path, "rb") as src, open(dest_path, "wb") as dst:
            bytes_copied = 0
            while True:
                chunk = src.read(chunk_size)
                if not chunk:
                    break
                dst.write(chunk)
                bytes_copied += len(chunk)

        print(f"Copied {bytes_copied} bytes from {source_path} to {dest_path}")
        return True

    except FileNotFoundError:
        print(f"Source file not found: {source_path}")
        return False
    except PermissionError:
        print(f"Permission denied: cannot write to {dest_path}")
        return False

# copy_file("data.txt", "data_backup.txt")
\`\`\`

### Safe Read with Default

\`\`\`python
def safe_read(filename, default="", encoding="utf-8"):
    """Read a file, return default value if file doesn't exist."""
    try:
        with open(filename, "r", encoding=encoding) as file:
            return file.read()
    except FileNotFoundError:
        return default
    except PermissionError:
        print(f"Warning: Cannot read {filename}")
        return default

content = safe_read("config.txt", default="{}")
print(content)
\`\`\`

### File-Based Cache

\`\`\`python
import os

def read_cached(filename):
    """Read file only if it exists, returns None otherwise."""
    if not os.path.exists(filename):
        return None
    with open(filename, "r", encoding="utf-8") as f:
        return f.read()

def write_cached(filename, data):
    """Write data to a cache file."""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(data)
    print(f"Cached to {filename}")

def clear_cache(filename):
    """Remove cache file if it exists."""
    if os.path.exists(filename):
        os.remove(filename)
        print(f"Cache cleared: {filename}")
\`\`\`

### Process Large File Efficiently

\`\`\`python
def process_large_file(filename):
    """Process a large file line by line without loading it all."""
    total_lines = 0
    total_words = 0
    total_chars = 0
    error_lines = []

    with open(filename, "r", encoding="utf-8") as file:
        for line_num, line in enumerate(file, 1):
            total_lines += 1
            stripped = line.strip()
            if not stripped:
                continue

            words = stripped.split()
            total_words += len(words)
            total_chars += len(stripped)

            # Check for potential issues
            if len(line) > 1000:
                error_lines.append(f"Line {line_num}: Unusually long ({len(line)} chars)")

    return {
        "lines": total_lines,
        "words": total_words,
        "chars": total_chars,
        "issues": error_lines
    }

# Create a sample large file
sample_text = "Python is amazing. " * 1000 + "\\n"
with open("large_file.txt", "w") as f:
    for i in range(100):
        f.write(f"Line {i+1}: " + sample_text)

# Process it efficiently
stats = process_large_file("large_file.txt")
print(f"Lines : {stats['lines']}")
print(f"Words : {stats['words']:,}")
print(f"Chars : {stats['chars']:,}")
print(f"Issues: {len(stats['issues'])}")
\`\`\`

## Custom Context Managers

You can create your own context managers using the \`contextlib\` module:

\`\`\`python
from contextlib import contextmanager

@contextmanager
def managed_file(filename, mode="r", encoding="utf-8"):
    """Custom context manager that logs file operations."""
    print(f"Opening {filename} in mode '{mode}'")
    file = open(filename, mode, encoding=encoding)
    try:
        yield file
    except Exception as e:
        print(f"Error while working with {filename}: {e}")
        raise
    finally:
        file.close()
        print(f"Closed {filename}")

with managed_file("data.txt", "w") as f:
    f.write("Hello from custom context manager!")

with managed_file("data.txt", "r") as f:
    print(f.read())
\`\`\`

Output:
\`\`\`
Opening data.txt in mode 'w'
Closed data.txt
Opening data.txt in mode 'r'
Hello from custom context manager!
Closed data.txt
\`\`\`

## The Golden Rule

\`\`\`python
# ALWAYS use 'with' for file operations:
with open("file.txt", "r") as f:
    content = f.read()

# NEVER use this pattern (risky):
f = open("file.txt", "r")
content = f.read()
f.close()   # Might not run if exception occurs!
\`\`\`

> [!TIP]
> Always use the \`with\` statement when working with files. It guarantees the file is closed even if an exception occurs. You can open multiple files in a single \`with\` statement by separating them with commas. The \`with\` statement works with any object that implements \`__enter__\` and \`__exit__\` methods, not just files.`,
  objectives: [
    "Use the with statement to automatically manage file resources.",
    "Understand why with is safer than manual open/close.",
    "Open multiple files in a single with statement.",
    "Combine with statement with exception handling.",
    "Create simple custom context managers using contextlib."
  ],
  difficulty: "beginner",
  xpReward: 55,
};