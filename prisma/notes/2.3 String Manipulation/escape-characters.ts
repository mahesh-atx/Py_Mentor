export const escapeCharactersLesson = {
  title: "Escape Characters",
  slug: "escape-characters",
  content: `# Escape Characters

Some characters have special meaning in Python strings or are impossible to type directly inside a string. **Escape characters** let you include these special characters by using a backslash \`\\\` followed by another character.

## What is an Escape Character?

When Python sees a backslash \`\\\` inside a string, it treats the next character specially instead of literally.

\`\`\`python
print("Hello\\nWorld")   # \\n means "new line"
# Output:
# Hello
# World
\`\`\`

## Complete List of Escape Characters

\`\`\`
Escape    Meaning               Example Output
-------   -------------------   ----------------------------
\\n        Newline               Moves to next line
\\t        Tab                   Adds horizontal tab space
\\\\        Backslash             Prints a single backslash \\
\\'        Single quote          Prints '
\\"        Double quote          Prints "
\\r        Carriage return       Moves cursor to line start
\\b        Backspace             Deletes previous character
\\0        Null character        Empty/null character
\\a        Bell (alert)          Plays a beep sound
\\f        Form feed             Moves to next page/section
\\v        Vertical tab          Vertical tab space
\`\`\`

## \\n - Newline

The most commonly used escape character. Moves text to the next line.

\`\`\`python
print("Line 1\\nLine 2\\nLine 3")
# Output:
# Line 1
# Line 2
# Line 3
\`\`\`

\`\`\`python
# Storing multi-line text in a single string
address = "123 Main Street\\nNew York, NY 10001\\nUSA"
print(address)
# Output:
# 123 Main Street
# New York, NY 10001
# USA
\`\`\`

\`\`\`python
poem = "Roses are red,\\nViolets are blue,\\nPython is great,\\nAnd so are you!"
print(poem)
\`\`\`

Output:
\`\`\`
Roses are red,
Violets are blue,
Python is great,
And so are you!
\`\`\`

## \\t - Tab

Adds a horizontal tab (typically 4-8 spaces wide, depends on terminal).

\`\`\`python
print("Name\\tAge\\tCity")
print("Alice\\t25\\tNew York")
print("Bob\\t30\\tLondon")
\`\`\`

Output:
\`\`\`
Name    Age     City
Alice   25      New York
Bob     30      London
\`\`\`

\`\`\`python
# Indenting output
print("Shopping List:")
print("\\tApples")
print("\\tBananas")
print("\\tCherry")
\`\`\`

Output:
\`\`\`
Shopping List:
    Apples
    Bananas
    Cherry
\`\`\`

## \\\\ - Backslash

To print a literal backslash, use two backslashes:

\`\`\`python
print("C:\\\\Users\\\\Alice\\\\Documents")
# Output: C:\\Users\\Alice\\Documents

print("This is a backslash: \\\\")
# Output: This is a backslash: \\
\`\`\`

\`\`\`python
# Windows file paths
path = "C:\\\\Program Files\\\\Python\\\\python.exe"
print(path)
# Output: C:\\Program Files\\Python\\python.exe
\`\`\`

## \\' and \\" - Quotes Inside Strings

\`\`\`python
# Using single quote inside a single-quoted string
print('It\\'s a beautiful day!')
# Output: It's a beautiful day!

# Using double quote inside a double-quoted string
print("He said, \\"Hello!\\"")
# Output: He said, "Hello!"

# Or just use the other type of quote (easier)
print("It's a beautiful day!")         # No escape needed
print('He said, "Hello!"')             # No escape needed
\`\`\`

\`\`\`python
# When you need BOTH types of quotes
text = "She said, \\"It\\'s wonderful!\\""
print(text)
# Output: She said, "It's wonderful!"
\`\`\`

## \\r - Carriage Return

Moves the cursor to the beginning of the current line (used for overwriting):

\`\`\`python
import time

# Progress indicator that updates in place
for i in range(0, 101, 10):
    print(f"\\rLoading: {i}%", end="")
    time.sleep(0.1)
print("\\rComplete!    ")   # Overwrite the last progress line
\`\`\`

## \\b - Backspace

Moves the cursor back one position (deletes the previous character):

\`\`\`python
print("Hello\\bWorld")
# On most terminals: HellWorld  (the 'o' is erased by backspace)
\`\`\`

## \\0 - Null Character

The null character represents the end of a string in some contexts:

\`\`\`python
text = "Hello\\0World"
print(text)        # Some terminals may not show anything after \\0
print(len(text))   # Output: 11 (null character still counts as a character)
\`\`\`

## Multiple Escape Characters Together

\`\`\`python
# Menu display
print("=== MAIN MENU ===")
print("1.\\tNew Game")
print("2.\\tLoad Game")
print("3.\\tSettings")
print("4.\\tQuit")
print("\\nEnter your choice: ", end="")
\`\`\`

Output:
\`\`\`
=== MAIN MENU ===
1.  New Game
2.  Load Game
3.  Settings
4.  Quit

Enter your choice: 
\`\`\`

\`\`\`python
# Receipt
receipt = (
    "RECEIPT\\n"
    + "=" * 25 + "\\n"
    + "Coffee\\t\\t$4.50\\n"
    + "Sandwich\\t$8.99\\n"
    + "-" * 25 + "\\n"
    + "Total\\t\\t$13.49\\n"
    + "=" * 25
)
print(receipt)
\`\`\`

Output:
\`\`\`
RECEIPT
=========================
Coffee          $4.50
Sandwich        $8.99
-------------------------
Total           $13.49
=========================
\`\`\`

## Checking for Escape Characters

\`\`\`python
# Use repr() to see the actual escape characters in a string
text = "Hello\\nWorld"
print(text)         # Output: Hello (newline) World
print(repr(text))   # Output: 'Hello\\nWorld'  (shows \\n literally)

text2 = "Tab\\there"
print(repr(text2))  # Output: 'Tab\\there'
\`\`\`

## Practical Example: Formatted Email Template

\`\`\`python
def create_email(recipient, sender, subject, body):
    email = (
        f"To: {recipient}\\n"
        f"From: {sender}\\n"
        f"Subject: {subject}\\n"
        + "=" * 40 + "\\n"
        + body + "\\n"
        + "=" * 40 + "\\n"
        + "\\nBest regards,\\n"
        + f"{sender}\\n"
    )
    return email

email = create_email(
    recipient="bob@example.com",
    sender="alice@example.com",
    subject="Python Lesson",
    body="Hi Bob,\\n\\nI wanted to share this Python tip:\\n\\t- Strings are immutable\\n\\t- Use f-strings for formatting\\n\\nHope this helps!"
)
print(email)
\`\`\`

Output:
\`\`\`
To: bob@example.com
From: alice@example.com
Subject: Python Lesson
========================================
Hi Bob,

I wanted to share this Python tip:
    - Strings are immutable
    - Use f-strings for formatting

Hope this helps!
========================================

Best regards,
alice@example.com
\`\`\`

> [!TIP]
> The most important escape characters to memorize are \`\\n\` (newline), \`\\t\` (tab), \`\\\\\` (backslash), \`\\'\` (single quote), and \`\\"\` (double quote). These cover 95% of real-world use cases. For Windows file paths, consider using raw strings (covered in the next lesson) instead of \`\\\\\`.`,
  objectives: [
    "Use \\n to add newlines in strings.",
    "Use \\t to add tabs for alignment.",
    "Use \\\\ to include a literal backslash.",
    "Use \\' and \\\" to include quotes inside strings.",
    "Recognize and use other escape characters like \\r and \\b."
  ],
  difficulty: "beginner",
  xpReward: 55,
};