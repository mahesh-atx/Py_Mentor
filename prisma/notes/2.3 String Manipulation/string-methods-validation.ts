export const stringMethodsValidationLesson = {
  title: "String Methods - Validation",
  slug: "string-methods-validation",
  content: `# String Methods - Validation

Python provides a set of methods to check what kind of characters a string contains. These all return True or False and are perfect for input validation.

Validation methods are yes-or-no questions — 'does this string consist only of digits?', 'only of letters?' — that scan every character and return True or False, acting as a cheap gate that keeps bad data out of your logic. The pitfall is that they all return False for an empty string instead of raising an error, and that isdigit, isnumeric, and isdecimal disagree on exotic numerals, making isdigit the usual safe choice for user input.

## Overview of Validation Methods

\`\`\`
Method          Returns True When...
-----------     ----------------------------------------
isalpha()       All characters are letters (a-z, A-Z)
isdigit()       All characters are digits (0-9)
isalnum()       All characters are letters OR digits
isspace()       All characters are whitespace
isupper()       All letters are uppercase
islower()       All letters are lowercase
istitle()       String is in Title Case
isnumeric()     All characters are numeric
isdecimal()     All characters are decimal digits
isprintable()   All characters are printable
isidentifier()  String is a valid Python identifier
\`\`\`

> [!IMPORTANT]
> All these methods return \`False\` for an **empty string**. Always check for empty strings separately.

## isalpha() - Letters Only

Returns \`True\` if all characters are alphabetic letters (no digits, spaces, or symbols).

\`\`\`python
print("hello".isalpha())      # Output: True
print("Hello".isalpha())      # Output: True
print("hello world".isalpha())# Output: False  (space not allowed)
print("hello1".isalpha())     # Output: False  (digit not allowed)
print("hello!".isalpha())     # Output: False  (symbol not allowed)
print("".isalpha())           # Output: False  (empty string)
\`\`\`

\`\`\`python
# Real use: validate that a name contains only letters
name = input("Enter your name: ")

if name.isalpha():
    print(f"Hello, {name.title()}!")
else:
    print("Name should contain letters only. No numbers or symbols.")
\`\`\`

\`\`\`python
# Validate first and last name separately
full_name = input("Enter full name: ")
parts = full_name.split()

valid = True
for part in parts:
    if not part.isalpha():
        valid = False
        break

if valid and len(parts) >= 2:
    print("Valid full name!")
else:
    print("Please enter a valid full name (letters only).")
\`\`\`

## isdigit() - Digits Only

Returns \`True\` if all characters are digits \`0-9\`.

\`\`\`python
print("12345".isdigit())      # Output: True
print("0".isdigit())          # Output: True
print("123.45".isdigit())     # Output: False  (dot is not a digit)
print("-123".isdigit())       # Output: False  (minus sign not a digit)
print("12 34".isdigit())      # Output: False  (space not a digit)
print("12abc".isdigit())      # Output: False
print("".isdigit())           # Output: False
\`\`\`

\`\`\`python
# Safe conversion from string to int
user_input = input("Enter your age: ")

if user_input.isdigit():
    age = int(user_input)
    if 0 < age <= 120:
        print(f"Valid age: {age}")
    else:
        print("Age must be between 1 and 120.")
else:
    print("Please enter digits only (no letters or symbols).")
\`\`\`

\`\`\`python
# Filter only numeric strings from a list
data = ["123", "abc", "456", "78x", "90", "0", "hello"]
numbers = [item for item in data if item.isdigit()]
print(numbers)   # Output: ['123', '456', '90', '0']
\`\`\`

## isalnum() - Letters and Digits Only

Returns \`True\` if all characters are either letters or digits (no spaces or symbols).

\`\`\`python
print("hello123".isalnum())    # Output: True
print("Hello".isalnum())       # Output: True
print("12345".isalnum())       # Output: True
print("hello world".isalnum()) # Output: False  (space not allowed)
print("hello!".isalnum())      # Output: False  (! not allowed)
print("user_name".isalnum())   # Output: False  (_ not allowed)
\`\`\`

\`\`\`python
# Validate a username (letters and digits only)
username = input("Enter username: ").strip()

if not username:
    print("Username cannot be empty.")
elif not username.isalnum():
    print("Username can only contain letters and digits. No spaces or symbols.")
elif len(username) < 3:
    print("Username must be at least 3 characters long.")
elif len(username) > 20:
    print("Username cannot exceed 20 characters.")
else:
    print(f"Username '{username}' is valid!")
\`\`\`

\`\`\`python
# Validate a product code like "ABC123"
code = "ABC123"
print(code.isalnum())   # Output: True  (valid product code)

code2 = "ABC-123"
print(code2.isalnum())  # Output: False  (hyphen not allowed)
\`\`\`

## isspace() - Whitespace Only

Returns \`True\` if all characters are whitespace (spaces, tabs, newlines).

\`\`\`python
print(" ".isspace())       # Output: True
print("   ".isspace())     # Output: True
print("\\t".isspace())      # Output: True  (tab)
print("\\n".isspace())      # Output: True  (newline)
print("".isspace())        # Output: False  (empty string)
print(" a ".isspace())     # Output: False  (contains letter)
print("hello".isspace())   # Output: False
\`\`\`

\`\`\`python
# Check if user entered only spaces (blank input)
user_input = input("Enter something: ")

if user_input.isspace() or user_input == "":
    print("Input cannot be empty or spaces only.")
else:
    print(f"You entered: '{user_input}'")
\`\`\`

\`\`\`python
# Filter out blank lines from text
text = """
Line one

Line two

Line three
"""

lines = text.splitlines()
non_empty = [line for line in lines if not line.isspace() and line != ""]
print(non_empty)
# Output: ['Line one', 'Line two', 'Line three']
\`\`\`

## isupper() and islower()

\`\`\`python
print("HELLO".isupper())     # Output: True
print("Hello".isupper())     # Output: False
print("HELLO 123".isupper()) # Output: True  (digits ignored)
print("123".isupper())       # Output: False  (no letters at all)

print("hello".islower())     # Output: True
print("Hello".islower())     # Output: False
print("hello 123".islower()) # Output: True  (digits ignored)
print("123".islower())       # Output: False  (no letters at all)
\`\`\`

\`\`\`python
# Check password strength
password = input("Enter password: ")

has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
has_digit = any(c.isdigit() for c in password)
long_enough = len(password) >= 8

print(f"Has uppercase    : {has_upper}")
print(f"Has lowercase    : {has_lower}")
print(f"Has digit        : {has_digit}")
print(f"8+ characters    : {long_enough}")

if all([has_upper, has_lower, has_digit, long_enough]):
    print("Strong password!")
else:
    print("Weak password.")
\`\`\`

## istitle()

Returns \`True\` if the string is in Title Case (first letter of each word is uppercase, rest are lowercase).

\`\`\`python
print("Hello World".istitle())    # Output: True
print("Hello world".istitle())    # Output: False  (world should be World)
print("hello World".istitle())    # Output: False  (hello should be Hello)
print("The Quick Brown Fox".istitle())  # Output: True
\`\`\`

## isnumeric() vs isdigit() vs isdecimal()

These are similar but have subtle differences:

\`\`\`python
# isdecimal() - only standard decimal digits 0-9
print("123".isdecimal())    # Output: True
print("½".isdecimal())      # Output: False  (fraction)
print("²".isdecimal())      # Output: False  (superscript)

# isdigit() - digits including superscripts
print("123".isdigit())      # Output: True
print("½".isdigit())        # Output: False
print("²".isdigit())        # Output: True   (superscript digit)

# isnumeric() - any numeric character including fractions
print("123".isnumeric())    # Output: True
print("½".isnumeric())      # Output: True   (fraction!)
print("²".isnumeric())      # Output: True   (superscript)
print("三".isnumeric())      # Output: True   (Chinese numeral)
\`\`\`

> [!NOTE]
> For most practical purposes (validating user input), use \`isdigit()\`. It handles standard digits 0-9 which is what you usually need.

## Combining Validation Methods

\`\`\`python
def validate_input(text, input_type):
    text = text.strip()
    
    if not text:
        return False, "Cannot be empty."
    
    if input_type == "name":
        if not all(part.isalpha() for part in text.split()):
            return False, "Name must contain letters only."
        return True, "Valid name."
    
    elif input_type == "age":
        if not text.isdigit():
            return False, "Age must be digits only."
        age = int(text)
        if not (1 <= age <= 120):
            return False, "Age must be between 1 and 120."
        return True, "Valid age."
    
    elif input_type == "username":
        if not text.isalnum():
            return False, "Username must be letters and digits only."
        if not (3 <= len(text) <= 20):
            return False, "Username must be 3-20 characters."
        return True, "Valid username."
    
    return False, "Unknown type."

# Test it
tests = [
    ("Alice", "name"),
    ("Alice123", "name"),
    ("25", "age"),
    ("abc", "age"),
    ("alice2024", "username"),
    ("al", "username"),
]

for value, input_type in tests:
    is_valid, message = validate_input(value, input_type)
    status = "PASS" if is_valid else "FAIL"
    print(f"[{status}] '{value}' ({input_type}): {message}")
\`\`\`

Output:
\`\`\`
[PASS] 'Alice' (name): Valid name.
[FAIL] 'Alice123' (name): Name must contain letters only.
[PASS] '25' (age): Valid age.
[FAIL] 'abc' (age): Age must be digits only.
[PASS] 'alice2024' (username): Valid username.
[FAIL] 'al' (username): Username must be 3-20 characters.
\`\`\`

> [!TIP]
> These validation methods are perfect for checking user input before converting or processing it. Always validate before converting - use \`isdigit()\` before calling \`int()\`, for example. Remember that all these methods return \`False\` for empty strings.`,
  objectives: [
    "Use isalpha() to check if a string contains only letters.",
    "Use isdigit() to check if a string contains only digits.",
    "Use isalnum() to check if a string contains only letters and digits.",
    "Use isspace() to check if a string contains only whitespace.",
    "Use isupper() and islower() to check letter case.",
    "Combine validation methods to build robust input validators."
  ],
  difficulty: "beginner",
  xpReward: 65,
};