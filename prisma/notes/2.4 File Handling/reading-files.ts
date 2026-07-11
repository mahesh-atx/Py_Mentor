export const readingFilesLesson = {
  title: "Reading Files",
  slug: "reading-files",
  content: `# Reading Files

## Why File Handling Matters

Programs often need to work with data stored in files - configuration files, logs, datasets, user data. Python makes reading files simple and safe.

## Opening a File

Before reading a file, you must open it using the \`open()\` function:

\`\`\`python
file = open("filename.txt", "mode")
# ... work with file ...
file.close()   # Must always close!
\`\`\`

### File Modes

\`\`\`
Mode    Description
----    ------------------------------------------
'r'     Read (default) - file must exist
'w'     Write - creates file or OVERWRITES existing
'a'     Append - adds to end of existing file
'x'     Create - fails if file already exists
'b'     Binary mode (combine: 'rb', 'wb')
't'     Text mode (default, combine: 'rt')
'+'     Read AND write (combine: 'r+', 'w+')
\`\`\`

\`\`\`python
file = open("data.txt", "r")    # Open for reading (text mode)
file = open("data.txt", "rb")   # Open for reading (binary mode)
file = open("data.txt", "r+")   # Open for reading AND writing
\`\`\`

## The Three Reading Methods

### read() - Read the Entire File at Once

\`read()\` returns the entire file content as a single string.

\`\`\`python
# Assume data.txt contains:
# Hello, World!
# This is line 2.
# This is line 3.

file = open("data.txt", "r")
content = file.read()
file.close()

print(content)
# Hello, World!
# This is line 2.
# This is line 3.

print(type(content))   # <class 'str'>
print(len(content))    # Total number of characters
\`\`\`

\`\`\`python
# Read a specific number of characters
file = open("data.txt", "r")
first_10 = file.read(10)    # Read first 10 characters
print(first_10)             # Hello, Wor

next_5 = file.read(5)       # Continue reading from where we left off
print(next_5)               # ld!\\nT

rest = file.read()          # Read the rest
file.close()
\`\`\`

### readline() - Read One Line at a Time

\`readline()\` reads one line including the newline character \`\\n\`. Returns an empty string \`""\` when the file ends.

\`\`\`python
file = open("data.txt", "r")

line1 = file.readline()
print(repr(line1))   # 'Hello, World!\\n'
print(line1)         # Hello, World!  (with newline)

line2 = file.readline()
print(repr(line2))   # 'This is line 2.\\n'

line3 = file.readline()
print(repr(line3))   # 'This is line 3.'  (no newline on last line)

end = file.readline()
print(repr(end))     # ''  (empty string = end of file)

file.close()
\`\`\`

\`\`\`python
# Loop through file line by line using readline()
file = open("data.txt", "r")

while True:
    line = file.readline()
    if not line:   # Empty string means end of file
        break
    print(line.strip())   # strip() removes trailing newline

file.close()
\`\`\`

### readlines() - Read All Lines into a List

\`readlines()\` reads all lines and returns them as a **list of strings**. Each string includes the \`\\n\` character.

\`\`\`python
file = open("data.txt", "r")
lines = file.readlines()
file.close()

print(lines)
# ['Hello, World!\\n', 'This is line 2.\\n', 'This is line 3.']

print(type(lines))     # <class 'list'>
print(len(lines))      # 3
print(lines[0])        # Hello, World!\\n
print(lines[0].strip())  # Hello, World!  (without newline)

# Process each line
for i, line in enumerate(lines, 1):
    print(f"Line {i}: {line.strip()}")
\`\`\`

## The Best Way: for Loop on File Object

The most memory-efficient way - reads one line at a time without loading everything:

\`\`\`python
file = open("data.txt", "r")

for line in file:           # Iterate directly over the file
    print(line.strip())     # Each line still has \\n

file.close()
\`\`\`

## Comparison of Reading Methods

\`\`\`
Method           Returns           Best For
-----------      ---------------   ----------------------------------
read()           str (all)         Small files, need entire content
read(n)          str (n chars)     Processing chunks
readline()       str (one line)    Reading line by line manually
readlines()      list of str       Need all lines as a list
for line in f    str (one line)    Most common - memory efficient
\`\`\`

## Handling File Not Found

\`\`\`python
try:
    file = open("nonexistent.txt", "r")
    content = file.read()
    file.close()
except FileNotFoundError:
    print("Error: File not found!")
except PermissionError:
    print("Error: No permission to read this file!")
except OSError as e:
    print(f"OS Error: {e}")
\`\`\`

## Encoding - Reading Non-ASCII Text

\`\`\`python
# Always specify encoding for text files
file = open("data.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# Common encodings:
# "utf-8"      - Universal, handles most languages
# "ascii"      - English only
# "latin-1"    - Western European
# "utf-16"     - Unicode with BOM

# Read file with unknown encoding safely
file = open("data.txt", "r", encoding="utf-8", errors="ignore")
content = file.read()   # Ignores unreadable characters
file.close()
\`\`\`

## Practical Example: Log File Reader

\`\`\`python
def read_log_file(filename):
    """Read and analyze a log file."""
    errors = []
    warnings = []
    info = []

    try:
        file = open(filename, "r", encoding="utf-8")

        for line in file:
            line = line.strip()
            if not line:
                continue   # Skip empty lines

            if "[ERROR]" in line:
                errors.append(line)
            elif "[WARNING]" in line:
                warnings.append(line)
            elif "[INFO]" in line:
                info.append(line)

        file.close()

    except FileNotFoundError:
        print(f"Log file '{filename}' not found.")
        return

    print(f"Log Analysis for: {filename}")
    print(f"  Total lines  : {len(errors) + len(warnings) + len(info)}")
    print(f"  Errors       : {len(errors)}")
    print(f"  Warnings     : {len(warnings)}")
    print(f"  Info         : {len(info)}")

    if errors:
        print("\\nFirst 3 errors:")
        for err in errors[:3]:
            print(f"  {err}")

# Simulating a log file
log_content = """[INFO] Application started
[INFO] Database connected
[WARNING] Memory usage at 80%
[ERROR] Failed to load config.json
[INFO] Retrying connection...
[ERROR] Connection timeout after 30s
[INFO] Fallback mode activated"""

# Write the simulated log and read it
with open("app.log", "w") as f:
    f.write(log_content)

read_log_file("app.log")
\`\`\`

Output:
\`\`\`
Log Analysis for: app.log
  Total lines  : 7
  Errors       : 2
  Warnings     : 1
  Info         : 4

First 3 errors:
  [ERROR] Failed to load config.json
  [ERROR] Connection timeout after 30s
\`\`\`

## File Cursor Position

\`\`\`python
file = open("data.txt", "r")

print(file.tell())      # 0 - at the beginning

content = file.read(5)  # Read 5 characters
print(file.tell())      # 5 - cursor moved

file.seek(0)            # Go back to beginning
print(file.tell())      # 0

file.seek(0, 2)         # Seek to end of file (0 bytes from end)
print(file.tell())      # File size in bytes

file.close()

# seek(offset, whence) - whence values:
# 0 = from beginning (default)
# 1 = from current position
# 2 = from end of file
\`\`\`

> [!TIP]
> Always remember to close files after opening them. However, the best practice is to use the \`with\` statement (context manager) covered in the next lesson, which automatically closes the file even if an error occurs. Use \`for line in file\` for most line-by-line processing - it is the most memory efficient approach.`,
  objectives: [
    "Open files using the open() function with appropriate modes.",
    "Read file content using read(), readline(), and readlines().",
    "Use a for loop to iterate over file lines efficiently.",
    "Handle FileNotFoundError and other file-related exceptions.",
    "Understand file cursor position using tell() and seek()."
  ],
  difficulty: "beginner",
  xpReward: 55,
};