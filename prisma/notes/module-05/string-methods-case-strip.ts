export const stringMethodsCaseStripLesson = {
  title: "String Methods - Case & Strip",
  slug: "string-methods-case-strip",
  content: `# String Methods - Case & Strip

Python strings come with many built-in **methods** - functions that belong to a string and perform operations on it. You call them using dot notation: \`string.method()\`.

In this lesson we cover methods for changing case and removing whitespace.

## Calling String Methods

\`\`\`python
text = "hello world"
result = text.upper()    # Call the upper() method on text
print(result)            # Output: HELLO WORLD
print(text)              # Output: hello world  (original unchanged!)
\`\`\`

> [!IMPORTANT]
> String methods **never modify the original string**. They always return a new string. This is because strings are immutable in Python (covered in a later lesson).

## Case Methods

### upper() - Convert to Uppercase

Converts every letter to uppercase.

\`\`\`python
text = "hello, world!"
print(text.upper())   # Output: HELLO, WORLD!

name = "alice smith"
print(name.upper())   # Output: ALICE SMITH

# Numbers and symbols are unaffected
mixed = "Python 3.11 is great!"
print(mixed.upper())  # Output: PYTHON 3.11 IS GREAT!
\`\`\`

Common use - case-insensitive comparison:
\`\`\`python
user_input = input("Do you want to continue? (yes/no): ")

if user_input.upper() == "YES":
    print("Continuing...")
else:
    print("Stopping.")

# Now "yes", "YES", "Yes", "YeS" all work the same
\`\`\`

### lower() - Convert to Lowercase

Converts every letter to lowercase.

\`\`\`python
text = "HELLO, WORLD!"
print(text.lower())   # Output: hello, world!

email = "Alice@EXAMPLE.COM"
print(email.lower())  # Output: alice@example.com
\`\`\`

Very common use - normalizing user input:
\`\`\`python
username = input("Enter username: ")
username = username.lower()   # Store everything lowercase
print(f"Welcome, {username}")

# Now "Alice", "ALICE", "alice" are all treated as "alice"
\`\`\`

### title() - Title Case

Capitalizes the **first letter of every word**.

\`\`\`python
text = "the quick brown fox"
print(text.title())   # Output: The Quick Brown Fox

name = "john doe"
print(name.title())   # Output: John Doe

movie = "the lord of the rings"
print(movie.title())  # Output: The Lord Of The Rings
\`\`\`

\`\`\`python
# Format a name entered by user
first = input("First name: ").title()
last = input("Last name: ").title()
print(f"Full name: {first} {last}")

# Input: john, DOE -> Output: Full name: John Doe
\`\`\`

### capitalize() - Capitalize First Letter Only

Capitalizes only the **first letter** of the entire string. Lowercases everything else.

\`\`\`python
text = "hello, world!"
print(text.capitalize())   # Output: Hello, world!

text2 = "HELLO WORLD"
print(text2.capitalize())  # Output: Hello world  (rest becomes lowercase)

text3 = "python is great"
print(text3.capitalize())  # Output: Python is great
\`\`\`

\`\`\`python
# Difference between capitalize() and title()
sentence = "the quick brown fox"
print(sentence.capitalize())  # Output: The quick brown fox
print(sentence.title())       # Output: The Quick Brown Fox
\`\`\`

### swapcase() - Swap Upper and Lower

Converts uppercase to lowercase and vice versa.

\`\`\`python
text = "Hello, World!"
print(text.swapcase())   # Output: hELLO, wORLD!

text2 = "Python Programming"
print(text2.swapcase())  # Output: pYTHON pROGRAMMING
\`\`\`

### casefold() - Aggressive Lowercase

Similar to \`lower()\` but more aggressive - handles special international characters. Recommended for case-insensitive comparisons.

\`\`\`python
text = "HELLO"
print(text.casefold())   # Output: hello

# German sharp S - casefold handles it
text2 = "Straße"
print(text2.lower())     # Output: straße
print(text2.casefold())  # Output: strasse (more thorough)
\`\`\`

## Strip Methods

Strip methods remove unwanted characters (usually whitespace) from the beginning and/or end of a string.

### strip() - Remove from Both Ends

Removes whitespace (spaces, tabs, newlines) from **both ends**:

\`\`\`python
text = "   Hello, World!   "
print(text.strip())    # Output: Hello, World!
print(repr(text))      # Output: '   Hello, World!   '  (with spaces)
print(repr(text.strip()))  # Output: 'Hello, World!'    (spaces removed)
\`\`\`

\`\`\`python
# Whitespace includes spaces, tabs, and newlines
text = "\\n\\t  Hello  \\t\\n"
print(text.strip())   # Output: Hello
\`\`\`

Very common use - cleaning user input:
\`\`\`python
username = input("Enter username: ").strip()
# If user types "  alice  ", it becomes "alice"
print(f"Username: '{username}'")
\`\`\`

Stripping specific characters:
\`\`\`python
# Remove specific characters (not just whitespace)
text = "***Hello***"
print(text.strip("*"))    # Output: Hello

text2 = "###Python###"
print(text2.strip("#"))   # Output: Python

text3 = "...Python..."
print(text3.strip("."))   # Output: Python

# Can strip multiple different characters
text4 = "!*!Hello!*!"
print(text4.strip("!*"))  # Output: Hello
\`\`\`

### lstrip() - Remove from Left Side Only

\`\`\`python
text = "   Hello, World!   "
print(text.lstrip())   # Output: Hello, World!    (trailing spaces remain)
print(repr(text.lstrip()))  # Output: 'Hello, World!   '
\`\`\`

\`\`\`python
# Remove leading zeros from a number string
number = "000042"
print(number.lstrip("0"))   # Output: 42
\`\`\`

### rstrip() - Remove from Right Side Only

\`\`\`python
text = "   Hello, World!   "
print(text.rstrip())   # Output:    Hello, World!  (leading spaces remain)
print(repr(text.rstrip()))  # Output: '   Hello, World!'
\`\`\`

\`\`\`python
# Remove trailing newline from file line
line = "Hello, World!\\n"
clean_line = line.rstrip("\\n")
print(repr(clean_line))   # Output: 'Hello, World!'

# Remove trailing slashes from URL
url = "https://example.com///"
clean_url = url.rstrip("/")
print(clean_url)   # Output: https://example.com
\`\`\`

## Comparison: strip(), lstrip(), rstrip()

\`\`\`python
text = "   Hello   "

print(repr(text.strip()))    # Output: 'Hello'
print(repr(text.lstrip()))   # Output: 'Hello   '
print(repr(text.rstrip()))   # Output: '   Hello'
\`\`\`

## Chaining Methods

You can chain multiple methods together:

\`\`\`python
user_input = "   JOHN DOE   "

cleaned = user_input.strip().lower().title()
print(cleaned)   # Output: John Doe
\`\`\`

\`\`\`python
email = "   Alice@EXAMPLE.COM   "
clean_email = email.strip().lower()
print(clean_email)   # Output: alice@example.com
\`\`\`

## Practical Example: User Registration Form

\`\`\`python
print("=== User Registration ===")

first_name = input("First name: ").strip().title()
last_name  = input("Last name: ").strip().title()
email      = input("Email: ").strip().lower()
username   = input("Username: ").strip().lower()

print("\\n=== Preview ===")
print(f"Full Name : {first_name} {last_name}")
print(f"Email     : {email}")
print(f"Username  : {username}")

# Validate
errors = []

if not first_name:
    errors.append("First name cannot be empty.")
if not last_name:
    errors.append("Last name cannot be empty.")
if "@" not in email or "." not in email:
    errors.append("Invalid email format.")
if len(username) < 3:
    errors.append("Username must be at least 3 characters.")

if errors:
    print("\\nErrors found:")
    for error in errors:
        print(f"  - {error}")
else:
    print("\\nRegistration successful!")
\`\`\`

## Quick Reference

\`\`\`python
text = "  Hello, World!  "

text.upper()       # "  HELLO, WORLD!  "
text.lower()       # "  hello, world!  "
text.title()       # "  Hello, World!  "
text.capitalize()  # "  hello, world!  " -> "  Hello, world!  " (strips first)
text.swapcase()    # "  hELLO, wORLD!  "
text.strip()       # "Hello, World!"
text.lstrip()      # "Hello, World!  "
text.rstrip()      # "  Hello, World!"
\`\`\`

> [!TIP]
> Always \`strip()\` user input before processing it. Users often accidentally add spaces before or after their input. Combine \`strip()\` with \`lower()\` or \`title()\` to normalize input consistently.`,
  objectives: [
    "Use upper(), lower(), title(), capitalize(), and swapcase() to change string case.",
    "Use strip(), lstrip(), and rstrip() to remove whitespace and specific characters.",
    "Chain multiple string methods together.",
    "Apply these methods to clean and normalize user input."
  ],
  difficulty: "beginner",
  xpReward: 60,
};