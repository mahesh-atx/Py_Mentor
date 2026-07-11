export const writingAppendingFilesLesson = {
  title: "Writing & Appending to Files",
  slug: "writing-appending-files",
  content: `# Writing & Appending to Files

## Writing to a File

### write() - Write a String

Open with mode \`'w'\` to write. This **creates the file** if it does not exist, or **overwrites** if it does.

\`\`\`python
# Create or overwrite a file
file = open("output.txt", "w")
file.write("Hello, World!")
file.write("\\nThis is line 2.")
file.write("\\nThis is line 3.")
file.close()

# output.txt now contains:
# Hello, World!
# This is line 2.
# This is line 3.
\`\`\`

> [!IMPORTANT]
> Mode \`'w'\` **OVERWRITES** the file completely. If the file had 100 lines and you write one line, only that one line remains. Always use \`'a'\` (append) if you want to preserve existing content.

\`\`\`python
# Demonstrate overwrite
file = open("test.txt", "w")
file.write("First write: Hello!")
file.close()

# Reading back
file = open("test.txt", "r")
print(file.read())   # First write: Hello!
file.close()

# OVERWRITE - old content is GONE
file = open("test.txt", "w")
file.write("Second write: Goodbye!")
file.close()

file = open("test.txt", "r")
print(file.read())   # Second write: Goodbye!  (Hello is gone!)
file.close()
\`\`\`

### writelines() - Write a List of Strings

\`writelines()\` writes each string in a list. Note: it does NOT add newlines automatically.

\`\`\`python
lines = [
    "Line 1\\n",
    "Line 2\\n",
    "Line 3\\n",
]

file = open("output.txt", "w")
file.writelines(lines)
file.close()

# output.txt:
# Line 1
# Line 2
# Line 3
\`\`\`

\`\`\`python
# Without \\n - all on one line
names = ["Alice", "Bob", "Charlie"]
file = open("names.txt", "w")
file.writelines(names)    # AliceBobCharlie (all joined!)
file.close()

# With \\n added
file = open("names.txt", "w")
file.writelines(name + "\\n" for name in names)
file.close()
# names.txt:
# Alice
# Bob
# Charlie
\`\`\`

## Appending to a File

Mode \`'a'\` **adds to the end** of an existing file. If the file does not exist, it creates it.

\`\`\`python
# Create initial file
file = open("log.txt", "w")
file.write("Log started.\\n")
file.close()

# Append to it later
file = open("log.txt", "a")
file.write("User logged in.\\n")
file.close()

# Append again
file = open("log.txt", "a")
file.write("User performed action.\\n")
file.write("User logged out.\\n")
file.close()

# log.txt:
# Log started.
# User logged in.
# User performed action.
# User logged out.
\`\`\`

\`\`\`python
# Practical: append to a log file
import datetime

def log_event(filename, message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] {message}\\n"

    file = open(filename, "a", encoding="utf-8")
    file.write(entry)
    file.close()

log_event("events.log", "Application started")
log_event("events.log", "User alice logged in")
log_event("events.log", "Order #1234 processed")
log_event("events.log", "User alice logged out")

# Read it back
file = open("events.log", "r")
print(file.read())
file.close()
\`\`\`

## Encoding When Writing

\`\`\`python
# Always specify encoding for text with special characters
text = "Hello! Bonjour! Hola! Привет! 你好!"

file = open("multilingual.txt", "w", encoding="utf-8")
file.write(text)
file.close()

# Read it back with the same encoding
file = open("multilingual.txt", "r", encoding="utf-8")
print(file.read())
file.close()
\`\`\`

## Read-Write Mode

\`\`\`python
# 'r+' - read and write, file must exist, cursor at beginning
file = open("data.txt", "r+")
original = file.read()   # Read existing
file.seek(0)             # Go back to start
file.write("NEW: ")      # Write from beginning (overwrites!)
file.close()

# 'w+' - read and write, creates or overwrites
file = open("data.txt", "w+")
file.write("Line 1\\nLine 2\\nLine 3\\n")
file.seek(0)             # Go back to beginning to read
content = file.read()
print(content)
file.close()

# 'a+' - append and read
file = open("data.txt", "a+")
file.write("New line appended\\n")
file.seek(0)             # Must seek to beginning to read
content = file.read()
print(content)
file.close()
\`\`\`

## Writing Binary Files

\`\`\`python
# Write binary data (images, PDFs, etc.)
data = bytes([72, 101, 108, 108, 111])   # "Hello" in ASCII

file = open("binary.bin", "wb")
file.write(data)
file.close()

# Read binary file
file = open("binary.bin", "rb")
content = file.read()
file.close()

print(content)           # b'Hello'
print(content.decode())  # Hello
\`\`\`

## Practical Example: Student Grade File Manager

\`\`\`python
import os

GRADES_FILE = "grades.txt"

def initialize_file():
    """Create the grades file with a header if it doesn't exist."""
    if not os.path.exists(GRADES_FILE):
        file = open(GRADES_FILE, "w", encoding="utf-8")
        file.write("Student Grades\\n")
        file.write("=" * 40 + "\\n")
        file.close()
        print("Created new grades file.")

def add_grade(name, subject, score):
    """Append a grade entry to the file."""
    entry = f"{name},{subject},{score}\\n"
    file = open(GRADES_FILE, "a", encoding="utf-8")
    file.write(entry)
    file.close()

def read_all_grades():
    """Read and display all grades."""
    try:
        file = open(GRADES_FILE, "r", encoding="utf-8")
        lines = file.readlines()
        file.close()

        print("\\n" + lines[0].strip())
        print(lines[1].strip())

        for line in lines[2:]:
            parts = line.strip().split(",")
            if len(parts) == 3:
                name, subject, score = parts
                grade = "A" if int(score) >= 90 else "B" if int(score) >= 80 else "C"
                print(f"  {name:<12} {subject:<12} {score:>5}  ({grade})")

    except FileNotFoundError:
        print("No grades file found. Please initialize first.")

def get_student_average(name):
    """Calculate average score for a specific student."""
    try:
        file = open(GRADES_FILE, "r", encoding="utf-8")
        lines = file.readlines()[2:]   # Skip header lines
        file.close()

        scores = []
        for line in lines:
            parts = line.strip().split(",")
            if len(parts) == 3 and parts[0] == name:
                scores.append(int(parts[2]))

        if scores:
            avg = sum(scores) / len(scores)
            return avg
        return None

    except FileNotFoundError:
        return None

# Use the system
initialize_file()

add_grade("Alice", "Math", 92)
add_grade("Bob", "Math", 78)
add_grade("Alice", "Science", 88)
add_grade("Charlie", "Math", 95)
add_grade("Bob", "Science", 65)
add_grade("Alice", "English", 90)

read_all_grades()

print(f"\\nAlice's average: {get_student_average('Alice'):.1f}")
print(f"Bob's average: {get_student_average('Bob'):.1f}")
\`\`\`

Output:
\`\`\`
Created new grades file.

Student Grades
========================================
  Alice        Math          92  (A)
  Bob          Math          78  (C)
  Alice        Science       88  (B)
  Charlie      Math          95  (A)
  Bob          Science       65  (C)
  Alice        English       90  (A)

Alice's average: 90.0
Bob's average: 71.5
\`\`\`

## Summary: Write Modes

\`\`\`
Mode    File exists?    File doesn't exist?    Cursor position
----    ------------    -------------------    ---------------
'w'     Overwrites      Creates new            Beginning
'a'     Appends         Creates new            End
'x'     Raises error    Creates new            Beginning
'w+'    Overwrites      Creates new            Beginning (R+W)
'a+'    Appends         Creates new            End (R+W)
\`\`\`

> [!TIP]
> Use \`'w'\` when you want to create or completely replace a file. Use \`'a'\` when you want to add to an existing file (like logging). Always use \`encoding='utf-8'\` when working with text that might contain non-ASCII characters. Use the \`with\` statement (next lesson) to ensure files are always closed properly.`,
  objectives: [
    "Write content to files using write() and writelines().",
    "Understand that mode 'w' overwrites existing file content.",
    "Append to files using mode 'a' to preserve existing content.",
    "Specify encoding when writing files with special characters.",
    "Use 'w+' and 'a+' modes for combined read-write operations."
  ],
  difficulty: "beginner",
  xpReward: 55,
};