export const rawStringsLesson = {
  title: "Raw Strings",
  slug: "raw-strings",
  content: `# Raw Strings

## The Theory — Building the Logic

A raw string is not a new data type — it is the exact same str object, just interpreted differently by Python at parse time. The r prefix tells the lexer to switch off escape processing, so every backslash stays a literal backslash instead of merging with the following character. This matters whenever a string naturally contains many backslashes, such as Windows paths or regular expressions, where doubling each one by hand would be tedious and error-prone. The pitfall is thinking raw strings escape the normal rules of str: after creation they behave exactly like any other string, and a raw literal still cannot end on a single trailing backslash because the lexer would assume the quote is escaped.

## What is a Raw String?

A **raw string** tells Python to treat every character literally - including backslashes. No escape sequences are processed. You create a raw string by putting \`r\` or \`R\` before the opening quote.

\`\`\`python
# Normal string - \\n is a newline
normal = "Hello\\nWorld"
print(normal)
# Output:
# Hello
# World

# Raw string - \\n is two characters: \\ and n
raw = r"Hello\\nWorld"
print(raw)
# Output: Hello\\nWorld   (literally printed)
\`\`\`

## Why Raw Strings Exist

Without raw strings, you would need to double every backslash, which gets tedious and error-prone.

### Windows File Paths

\`\`\`python
# Without raw string - need double backslashes
path1 = "C:\\\\Users\\\\Alice\\\\Documents\\\\file.txt"
print(path1)   # Output: C:\\Users\\Alice\\Documents\\file.txt

# With raw string - much cleaner!
path2 = r"C:\\Users\\Alice\\Documents\\file.txt"
print(path2)   # Output: C:\\Users\\Alice\\Documents\\file.txt

# Both give the same result, but raw string is much more readable
\`\`\`

### Regular Expressions

Raw strings are almost always used with regular expressions because regex patterns use backslashes heavily:

\`\`\`python
import re

text = "Call us at 123-456-7890"

# Without raw string - confusing double backslashes
pattern1 = "\\\\d{3}-\\\\d{3}-\\\\d{4}"

# With raw string - clean and readable
pattern2 = r"\\d{3}-\\d{3}-\\d{4}"

match = re.search(pattern2, text)
if match:
    print(f"Found: {match.group()}")   # Output: Found: 123-456-7890
\`\`\`

## How Raw Strings Work

\`\`\`python
# Regular strings process escape sequences
print("Line1\\nLine2")      # Output: Line1 (newline) Line2
print("Tab\\there")         # Output: Tab (tab) here
print("Path: C:\\\\new")    # Output: Path: C:\\new

# Raw strings treat EVERYTHING literally
print(r"Line1\\nLine2")     # Output: Line1\\nLine2
print(r"Tab\\there")        # Output: Tab\\there
print(r"Path: C:\\new")     # Output: Path: C:\\new
\`\`\`

\`\`\`python
# Checking length
normal = "Hello\\nWorld"   # Contains: H,e,l,l,o,NEWLINE,W,o,r,l,d = 11 chars
raw = r"Hello\\nWorld"     # Contains: H,e,l,l,o,\\,n,W,o,r,l,d = 12 chars

print(len(normal))    # Output: 11
print(len(raw))       # Output: 12
print(repr(normal))   # Output: 'Hello\\nWorld'
print(repr(raw))      # Output: 'Hello\\\\nWorld'
\`\`\`

## Raw Strings with Different Quote Types

Raw strings work with single, double, and triple quotes:

\`\`\`python
# Single quotes
path1 = r'C:\\Users\\Alice'

# Double quotes
path2 = r"C:\\Users\\Alice"

# Triple quotes (multi-line raw string)
pattern = r"""
^[a-zA-Z0-9._%+-]+
@[a-zA-Z0-9.-]+
\\.[a-zA-Z]{2,}$
"""

print(path1)   # Output: C:\\Users\\Alice
print(path2)   # Output: C:\\Users\\Alice
\`\`\`

## Limitations of Raw Strings

A raw string **cannot end with an odd number of backslashes**:

\`\`\`python
# This is fine - backslash not at end
path = r"C:\\Users\\Alice\\"

# This would be a SyntaxError - cannot end raw string with single backslash
# path = r"C:\\Users\\Alice\\"  # OK - even number
# path = r"C:\\"                # This actually works
# path = r"C:\"                 # SyntaxError!
\`\`\`

\`\`\`python
# Workaround for a path ending in backslash
path = r"C:\\Users\\Alice" + "\\"
print(path)   # Output: C:\\Users\\Alice\\
\`\`\`

## Raw Strings are Still Strings

A raw string is just a string - the \`r\` prefix only affects how Python reads it. After creation, it behaves exactly like a normal string:

\`\`\`python
path = r"C:\\Users\\Alice"

print(type(path))          # Output: <class 'str'>
print(path.upper())        # Output: C:\\USERS\\ALICE
print(path.replace("\\\\", "/"))  # Output: C:/Users/Alice
print(len(path))           # Output: 14
print(path[0])             # Output: C
\`\`\`

## Common Use Cases

### 1. File Paths (Windows)

\`\`\`python
# Windows paths
documents = r"C:\\Users\\Alice\\Documents"
downloads = r"C:\\Users\\Alice\\Downloads\\file.zip"
program = r"C:\\Program Files\\Python 3.11\\python.exe"

print(documents)   # Output: C:\\Users\\Alice\\Documents
\`\`\`

### 2. Regular Expressions

\`\`\`python
import re

# Email validation pattern
email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

emails = ["alice@example.com", "invalid-email", "bob@test.org"]

for email in emails:
    if re.match(email_pattern, email):
        print(f"VALID  : {email}")
    else:
        print(f"INVALID: {email}")
\`\`\`

Output:
\`\`\`
VALID  : alice@example.com
INVALID: invalid-email
VALID  : bob@test.org
\`\`\`

### 3. LaTeX and Mathematical Notation

\`\`\`python
# LaTeX formula (uses many backslashes)
formula = r"\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
print(formula)   # Output: \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\`\`\`

### 4. Network Paths

\`\`\`python
network_path = r"\\\\server\\shared\\documents"
print(network_path)   # Output: \\\\server\\shared\\documents
\`\`\`

## Normal String vs Raw String Side by Side

\`\`\`python
print("=== Normal String ===")
print("Tab:\\there")           # Tab followed by "here"
print("New line:\\nSecond")    # New line
print("Backslash: \\\\")       # One backslash

print("\\n=== Raw String ===")
print(r"Tab:\\there")          # Literally \\t, then "here"
print(r"New line:\\nSecond")   # Literally \\n
print(r"Backslash: \\")        # Two characters: \\ and (nothing more)
\`\`\`

Output:
\`\`\`
=== Normal String ===
Tab:    here
New line:
Second
Backslash: \\

=== Raw String ===
Tab:\\there
New line:\\nSecond
Backslash: \\
\`\`\`

## Practical Example: File Path Manager

\`\`\`python
import os

class PathManager:
    def __init__(self):
        self.base = r"C:\\Users\\Alice"
    
    def get_path(self, *folders):
        # Join paths using os.path.join for cross-platform compatibility
        return os.path.join(self.base, *folders)
    
    def list_common_paths(self):
        paths = {
            "Documents": self.get_path("Documents"),
            "Downloads": self.get_path("Downloads"),
            "Desktop"  : self.get_path("Desktop"),
            "Pictures" : self.get_path("Pictures"),
            "Projects" : self.get_path("Documents", "Projects"),
        }
        return paths

pm = PathManager()
for name, path in pm.list_common_paths().items():
    print(f"{name:<12}: {path}")
\`\`\`

> [!TIP]
> Use raw strings whenever you are working with file paths on Windows, regular expression patterns, or any other string that contains many backslashes. It makes your code much more readable and prevents subtle bugs from accidentally interpreting backslashes as escape sequences.`,
  objectives: [
    "Understand what a raw string is and how to create one using r''.",
    "Know why raw strings are useful for file paths and regex patterns.",
    "Understand that raw strings process no escape sequences.",
    "Know the limitation that raw strings cannot end with a single backslash.",
    "Use raw strings in practical scenarios like Windows file paths."
  ],
  difficulty: "beginner",
  xpReward: 55,
};