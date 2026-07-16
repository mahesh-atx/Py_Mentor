export const fileDirectoryOperationsLesson = {
  title: "File & Directory Operations (os, shutil)",
  slug: "file-directory-operations",
  content: `# File & Directory Operations (os, shutil)

The filesystem is a tree of nodes addressed by a path string, and Python does not manage the disk itself but asks the operating system to perform each operation through modules like os and shutil, which is why path handling must be OS-aware and pathlib wraps paths as objects with the correct separator. The pitfall is assuming os.remove or shutil.rmtree will politely refuse on a missing or non-empty target, when in fact they raise errors or silently erase whole trees immediately.

## Overview

Python provides two main modules for file and directory operations:
- **\`os\`** - Low-level OS interactions (paths, environment, basic operations)
- **\`shutil\`** - High-level file operations (copy, move, delete trees)
- **\`pathlib\`** - Modern, object-oriented path handling (Python 3.4+)

\`\`\`python
import os
import shutil
from pathlib import Path
\`\`\`

## Checking File/Directory Existence

\`\`\`python
import os

# Check if path exists (file or directory)
print(os.path.exists("file.txt"))        # True or False
print(os.path.exists("my_folder"))       # True or False

# Check specifically
print(os.path.isfile("file.txt"))        # True only for files
print(os.path.isdir("my_folder"))        # True only for directories
print(os.path.islink("symlink"))         # True only for symbolic links

# Modern pathlib way (recommended)
from pathlib import Path

p = Path("file.txt")
print(p.exists())     # True or False
print(p.is_file())    # True only for files
print(p.is_dir())     # True only for directories
\`\`\`

## Getting File Information

\`\`\`python
import os

# File size in bytes
size = os.path.getsize("data.txt")
print(f"Size: {size} bytes")
print(f"Size: {size / 1024:.2f} KB")
print(f"Size: {size / (1024**2):.2f} MB")

# Last modified time
import time
mtime = os.path.getmtime("data.txt")   # Unix timestamp
print(f"Modified: {time.ctime(mtime)}")

# Creation time (Windows) or metadata change time (Unix)
ctime = os.path.getctime("data.txt")

# All info at once using os.stat()
info = os.stat("data.txt")
print(f"Size    : {info.st_size} bytes")
print(f"Modified: {time.ctime(info.st_mtime)}")
print(f"Created : {time.ctime(info.st_ctime)}")

# pathlib way
from pathlib import Path
p = Path("data.txt")
stat = p.stat()
print(f"Size: {stat.st_size}")
print(f"Stem: {p.stem}")         # filename without extension
print(f"Suffix: {p.suffix}")     # extension (.txt)
print(f"Parent: {p.parent}")     # directory containing the file
\`\`\`

## Path Operations

\`\`\`python
import os

# Join path components (works on all OS)
path = os.path.join("folder", "subfolder", "file.txt")
print(path)   # folder/subfolder/file.txt  (or folder\\subfolder\\file.txt on Windows)

# Get directory name and file name
full_path = "/home/alice/documents/report.pdf"
print(os.path.dirname(full_path))    # /home/alice/documents
print(os.path.basename(full_path))   # report.pdf

# Split extension
name, ext = os.path.splitext("report.pdf")
print(name)   # report
print(ext)    # .pdf

# Get absolute path
rel_path = "../data/file.txt"
abs_path = os.path.abspath(rel_path)
print(abs_path)   # Full absolute path

# Expand ~ to home directory
home_file = os.path.expanduser("~/documents/file.txt")
print(home_file)   # /home/alice/documents/file.txt

# Current working directory
print(os.getcwd())   # /home/alice/projects

# pathlib equivalent (cleaner)
from pathlib import Path

p = Path("/home/alice/documents/report.pdf")
print(p.parent)    # /home/alice/documents
print(p.name)      # report.pdf
print(p.stem)      # report
print(p.suffix)    # .pdf

# Join paths with /
new_path = Path("folder") / "subfolder" / "file.txt"
print(new_path)    # folder/subfolder/file.txt
\`\`\`

## Creating Directories

\`\`\`python
import os

# Create a single directory
os.mkdir("new_folder")

# Create nested directories (like mkdir -p)
os.makedirs("parent/child/grandchild")
os.makedirs("existing_parent/new_child", exist_ok=True)  # No error if exists

# pathlib
from pathlib import Path
Path("new_folder").mkdir()
Path("parent/child/grandchild").mkdir(parents=True, exist_ok=True)
\`\`\`

## Listing Directory Contents

\`\`\`python
import os

# List files and folders in a directory
contents = os.listdir(".")   # Current directory
print(contents)   # ['file.txt', 'folder', 'data.csv', ...]

# Filter files only
files = [f for f in os.listdir(".") if os.path.isfile(f)]
dirs  = [d for d in os.listdir(".") if os.path.isdir(d)]

# List with full paths
for item in os.listdir("/home/alice"):
    full_path = os.path.join("/home/alice", item)
    print(full_path)

# os.scandir() - more efficient, gives file info too
with os.scandir(".") as entries:
    for entry in entries:
        if entry.is_file():
            print(f"File: {entry.name} ({entry.stat().st_size} bytes)")
        elif entry.is_dir():
            print(f"Dir:  {entry.name}/")

# pathlib - glob patterns
from pathlib import Path

p = Path(".")
# List all .txt files
for txt_file in p.glob("*.txt"):
    print(txt_file)

# Recursive search for all Python files
for py_file in p.rglob("*.py"):
    print(py_file)

# All files in directory
for item in p.iterdir():
    print(item)
\`\`\`

## Walking a Directory Tree

\`\`\`python
import os

# Walk through ALL subdirectories recursively
for dirpath, dirnames, filenames in os.walk("project"):
    level = dirpath.count(os.sep)
    indent = "  " * level
    print(f"{indent}{os.path.basename(dirpath)}/")

    for filename in filenames:
        print(f"{indent}  {filename}")

# Skip hidden directories (starting with .)
for dirpath, dirnames, filenames in os.walk("."):
    # Modify dirnames IN PLACE to skip hidden dirs
    dirnames[:] = [d for d in dirnames if not d.startswith(".")]
    for filename in filenames:
        if not filename.startswith("."):
            filepath = os.path.join(dirpath, filename)
            print(filepath)

# Count total files and size
def directory_size(path):
    total_size = 0
    file_count = 0
    for dirpath, dirnames, filenames in os.walk(path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            total_size += os.path.getsize(filepath)
            file_count += 1
    return file_count, total_size

count, size = directory_size(".")
print(f"Files: {count}, Total size: {size/1024:.1f} KB")
\`\`\`

## Copying Files and Directories (shutil)

\`\`\`python
import shutil

# Copy a single file (content only)
shutil.copy("source.txt", "dest.txt")         # Copy to file
shutil.copy("source.txt", "dest_folder/")     # Copy to directory

# Copy file AND metadata (permissions, timestamps)
shutil.copy2("source.txt", "dest.txt")        # Preserves metadata

# Copy entire directory tree
shutil.copytree("source_folder", "dest_folder")  # dest must NOT exist

# Copy tree with ignore pattern
shutil.copytree(
    "source",
    "dest",
    ignore=shutil.ignore_patterns("*.pyc", "__pycache__", ".git")
)
\`\`\`

## Moving and Renaming

\`\`\`python
import os
import shutil

# Rename a file
os.rename("old_name.txt", "new_name.txt")

# Move file to different directory
shutil.move("file.txt", "new_folder/file.txt")

# Move and rename at the same time
shutil.move("old_folder/old.txt", "new_folder/new.txt")

# Move entire directory
shutil.move("old_folder", "new_location/old_folder")

# pathlib rename
from pathlib import Path
Path("old_name.txt").rename("new_name.txt")
\`\`\`

## Deleting Files and Directories

\`\`\`python
import os
import shutil

# Delete a file
os.remove("file.txt")          # Raises FileNotFoundError if not found
os.unlink("file.txt")          # Same as os.remove()

# Delete empty directory
os.rmdir("empty_folder")       # Fails if directory is not empty!

# Delete directory and ALL contents (careful!)
shutil.rmtree("folder_with_contents")

# Safe deletion
import os

def safe_delete(path):
    """Delete file or directory safely."""
    if not os.path.exists(path):
        print(f"Path not found: {path}")
        return False

    try:
        if os.path.isfile(path):
            os.remove(path)
            print(f"Deleted file: {path}")
        elif os.path.isdir(path):
            shutil.rmtree(path)
            print(f"Deleted directory: {path}")
        return True
    except PermissionError:
        print(f"Permission denied: {path}")
        return False
    except OSError as e:
        print(f"Error deleting {path}: {e}")
        return False
\`\`\`

## Environment and System

\`\`\`python
import os

# Get environment variables
home = os.environ.get("HOME", "/home/user")
path = os.environ.get("PATH", "")
python_path = os.getenv("PYTHONPATH", "")

# Set environment variable (only for current process)
os.environ["MY_APP_KEY"] = "secret_value"

# System information
print(os.name)            # 'nt' (Windows) or 'posix' (Unix/Mac)
print(os.sep)             # '\' (Windows) or '/' (Unix)
print(os.linesep)         # '\r\n' (Windows) or '\n' (Unix)
print(os.pathsep)         # ';' (Windows) or ':' (Unix)

import sys
print(sys.platform)       # 'win32', 'linux', 'darwin'
\`\`\`

## Practical Example: File Organizer

\`\`\`python
import os
import shutil
from pathlib import Path
from datetime import datetime

def organize_downloads(downloads_path: str, organized_path: str) -> dict:
    """
    Organize files from downloads into categorized folders.
    Returns statistics about what was organized.
    """
    CATEGORIES = {
        "Images":     {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"},
        "Videos":     {".mp4", ".avi", ".mov", ".mkv", ".wmv", ".flv"},
        "Audio":      {".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"},
        "Documents":  {".pdf", ".doc", ".docx", ".txt", ".xlsx", ".pptx", ".odt"},
        "Code":       {".py", ".js", ".html", ".css", ".java", ".cpp", ".json"},
        "Archives":   {".zip", ".tar", ".gz", ".rar", ".7z"},
        "Other":      set()
    }

    source = Path(downloads_path)
    dest = Path(organized_path)
    stats = {"moved": 0, "skipped": 0, "errors": 0, "by_category": {}}

    if not source.exists():
        print(f"Source path not found: {downloads_path}")
        return stats

    # Process each file
    for file_path in source.iterdir():
        if not file_path.is_file():
            continue   # Skip directories

        ext = file_path.suffix.lower()

        # Find the right category
        category = "Other"
        for cat, extensions in CATEGORIES.items():
            if ext in extensions:
                category = cat
                break

        # Create category directory
        category_dir = dest / category
        category_dir.mkdir(parents=True, exist_ok=True)

        # Handle naming conflicts
        target = category_dir / file_path.name
        if target.exists():
            # Add timestamp to avoid overwriting
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            stem = file_path.stem
            suffix = file_path.suffix
            target = category_dir / f"{stem}_{timestamp}{suffix}"

        try:
            shutil.copy2(str(file_path), str(target))
            stats["moved"] += 1
            stats["by_category"][category] = stats["by_category"].get(category, 0) + 1
        except Exception as e:
            print(f"Error moving {file_path.name}: {e}")
            stats["errors"] += 1

    return stats

# Setup demo
import tempfile

# Create test environment
with tempfile.TemporaryDirectory() as tmpdir:
    downloads = Path(tmpdir) / "Downloads"
    organized = Path(tmpdir) / "Organized"
    downloads.mkdir()

    # Create test files
    test_files = [
        "photo.jpg", "document.pdf", "music.mp3",
        "video.mp4", "script.py", "archive.zip",
        "image.png", "notes.txt", "song.mp3"
    ]
    for filename in test_files:
        (downloads / filename).write_text(f"Content of {filename}")

    # Organize
    stats = organize_downloads(str(downloads), str(organized))

    print("=== Organization Complete ===")
    print(f"Files moved  : {stats['moved']}")
    print(f"Errors       : {stats['errors']}")
    print("\\nBy category:")
    for category, count in sorted(stats["by_category"].items()):
        print(f"  {category:<12}: {count} file(s)")

    # Show organized structure
    print("\\nOrganized structure:")
    for item in sorted(organized.iterdir()):
        if item.is_dir():
            files = list(item.iterdir())
            print(f"  {item.name}/ ({len(files)} files)")
            for f in sorted(files):
                print(f"    {f.name}")
\`\`\`

Output:
\`\`\`
=== Organization Complete ===
Files moved  : 9
Errors       : 0

By category:
  Archives    : 1 file(s)
  Audio       : 2 file(s)
  Code        : 1 file(s)
  Documents   : 2 file(s)
  Images      : 2 file(s)
  Videos      : 1 file(s)

Organized structure:
  Archives/ (1 files)
    archive.zip
  Audio/ (2 files)
    music.mp3
    song.mp3
  Code/ (1 files)
    script.py
  Documents/ (2 files)
    document.pdf
    notes.txt
  Images/ (2 files)
    image.png
    photo.jpg
  Videos/ (1 files)
    video.mp4
\`\`\`

## Quick Reference

\`\`\`python
import os, shutil
from pathlib import Path

# Check
os.path.exists(p)           Path(p).exists()
os.path.isfile(p)           Path(p).is_file()
os.path.isdir(p)            Path(p).is_dir()

# Info
os.path.getsize(p)          Path(p).stat().st_size
os.path.basename(p)         Path(p).name
os.path.dirname(p)          Path(p).parent
os.path.splitext(p)         Path(p).stem, Path(p).suffix

# Paths
os.path.join(a, b)          Path(a) / b
os.path.abspath(p)          Path(p).resolve()
os.getcwd()                 Path.cwd()

# Create
os.mkdir(p)                 Path(p).mkdir()
os.makedirs(p, exist_ok=T)  Path(p).mkdir(parents=True, exist_ok=True)

# List
os.listdir(p)               list(Path(p).iterdir())
os.walk(p)                  # No direct equivalent in pathlib
                            Path(p).rglob("*")

# Copy/Move/Delete
shutil.copy(src, dst)       # No pathlib equivalent
shutil.copy2(src, dst)
shutil.copytree(src, dst)
shutil.move(src, dst)
os.remove(p)                Path(p).unlink()
os.rmdir(p)                 Path(p).rmdir()
shutil.rmtree(p)            # No pathlib equivalent
\`\`\`

> [!TIP]
> Use \`pathlib.Path\` for modern, readable path operations - it uses the \`/\` operator for joining paths and works consistently across operating systems. Use \`shutil\` for high-level operations like copying trees and moving directories. Always use \`exist_ok=True\` in \`mkdir()\` to avoid errors when directories already exist.`,
  objectives: [
    "Check file and directory existence using os.path and pathlib.",
    "Get file metadata like size, modification time, and path components.",
    "Create, list, and walk directory trees.",
    "Copy, move, and delete files and directories using shutil.",
    "Use pathlib.Path for modern, cross-platform path handling."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};