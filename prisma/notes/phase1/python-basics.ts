
/**
 * Module 1 – Topic 1.2: Python Basics
 *
 * Lessons:
 *   1. Comments
 *   2. Indentation
 *   3. Keywords
 *   4. Identifiers
 */

export const pythonBasicsLessons = [
  // ── Lesson 1: Comments ─────────────────────────────────────────
  {
    title: "Comments",
    slug: "comments",
    content: `# Comments

Comments are lines in your code that **Python ignores** when running the program. They exist purely for human readers — to explain intent, clarify logic, or temporarily disable code.

---

## Single-Line Comments

Use the \`#\` symbol. Everything after \`#\` on that line is ignored by the interpreter:

\`\`\`python
# Calculate the area of a rectangle
length = 10
width = 5
area = length * width  # multiply length by width
print(area)
\`\`\`

Output:
\`\`\`
50
\`\`\`

---

## Inline Comments

Comments can appear on the same line as code:

\`\`\`python
MAX_RETRIES = 3        # maximum number of login attempts
TIMEOUT = 30           # seconds before connection drops
PI = 3.14159           # approximation of pi
\`\`\`

---

## Multi-Line Comments

Python has no dedicated multi-line comment syntax. Use consecutive \`#\` lines:

\`\`\`python
# This function calculates the total price
# after applying a discount percentage.
# It returns a float rounded to 2 decimal places.
def calculate_price(price, discount):
    return round(price * (1 - discount / 100), 2)

print(calculate_price(200, 15))
\`\`\`

Output:
\`\`\`
170.0
\`\`\`

---

## Docstrings — Triple-Quoted Strings

Triple-quoted strings placed at the top of a function, class, or module are called **docstrings**. They serve as structured documentation and can be accessed programmatically:

\`\`\`python
def greet(name):
    """
    Return a personalised greeting string.

    Args:
        name (str): The name of the person to greet.

    Returns:
        str: A greeting message.
    """
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet.__doc__)
\`\`\`

Output:
\`\`\`
Hello, Alice!

    Return a personalised greeting string.

    Args:
        name (str): The name of the person to greet.

    Returns:
        str: A greeting message.
    
\`\`\`

---

## Commenting Out Code During Debugging

Temporarily disabling lines is a common debugging technique:

\`\`\`python
def calculate_total(price, tax):
    # result = price + price * tax  # old formula (incorrect)
    result = price * (1 + tax)      # corrected formula
    return result

print(calculate_total(100, 0.2))
\`\`\`

Output:
\`\`\`
120.0
\`\`\`

---

## Good vs. Poor Comments

A comment should explain **why** something is done, not restate **what** the code obviously does:

\`\`\`python
# --- Poor comments (state the obvious) ---
x = x + 1      # add 1 to x
name = "Alice"  # set name to Alice

# --- Good comments (explain intent) ---
attempts += 1               # retry after a failed network request
TAX_RATE = 0.2              # UK standard VAT rate (2024)
items.sort(reverse=True)    # highest scores first for leaderboard display
\`\`\`

> **VS Code Shortcut:** Select one or more lines and press \`Ctrl + /\` to toggle comments on and off instantly.`,

    objectives: [
      "Write single-line and inline comments using the # symbol",
      "Write multi-line comments using consecutive # lines",
      "Create docstrings for functions using triple-quoted strings",
      "Use comments effectively to explain intent rather than restating obvious code",
      "Temporarily disable code using comments during debugging",
    ],
    examples: [
      {
        title: "Single-Line and Inline Comments",
        code: "# Calculate simple interest\nprincipal = 1000\nrate = 0.05      # annual interest rate\nyears = 3\n\ninterest = principal * rate * years\nprint(interest)",
        output: "150.0",
      },
      {
        title: "Docstring — Accessing Documentation",
        code: 'def square(n):\n    """Return the square of a number."""\n    return n ** 2\n\nprint(square(9))\nprint(square.__doc__)',
        output: "81\nReturn the square of a number.",
      },
      {
        title: "Commenting Out Code",
        code: 'print("Step 1: initialise")\n# print("Step 2: skipped for now")\nprint("Step 3: complete")',
        output: "Step 1: initialise\nStep 3: complete",
      },
      {
        title: "Multi-Line Comment Block",
        code: '# Convert temperature from Celsius to Fahrenheit.\n# Formula: F = (C * 9/5) + 32\n# Example: 0°C = 32°F, 100°C = 212°F\ncelsius = 100\nfahrenheit = (celsius * 9 / 5) + 32\nprint(fahrenheit)',
        output: "212.0",
      },
    ],
  },

  // ── Lesson 2: Indentation ──────────────────────────────────────
  {
    title: "Indentation",
    slug: "indentation",
    content: `# Indentation

In Python, **indentation is syntax** — not style. Python uses whitespace to define the boundaries of code blocks instead of curly braces \`{}\` used in languages like C, Java, or JavaScript.

The standard is **4 spaces** per indentation level (PEP 8). VS Code inserts 4 spaces automatically when you press \`Tab\`.

---

## Basic Indentation

Any statement ending with a colon \`:\` requires an indented block on the next line:

\`\`\`python
score = 85

if score >= 50:
    print("Result: Pass")       # inside the if block
    print("Well done!")         # also inside the if block

print("Evaluation complete.")   # outside the if block — always runs
\`\`\`

Output:
\`\`\`
Result: Pass
Well done!
Evaluation complete.
\`\`\`

---

## Nested Indentation

Each level of nesting adds another 4 spaces:

\`\`\`python
for i in range(1, 4):           # level 1 — 4 spaces
    if i % 2 == 0:              # level 2 — 8 spaces
        print(f"{i} is even")   # level 3 — 12 spaces
    else:
        print(f"{i} is odd")
\`\`\`

Output:
\`\`\`
1 is odd
2 is even
3 is odd
\`\`\`

---

## Functions and Indentation

\`\`\`python
def calculate_discount(price, rate):
    discounted = price * (1 - rate)   # inside function
    return discounted                 # inside function

result = calculate_discount(200, 0.1)
print(result)                         # outside function
\`\`\`

Output:
\`\`\`
180.0
\`\`\`

---

## Where Indentation is Required

Indentation is required after every statement ending with \`:\`:

\`\`\`python
# Conditionals
if condition:
    ...

# Loops
for item in collection:
    ...

while condition:
    ...

# Functions
def function_name():
    ...

# Classes
class ClassName:
    ...

# Exception handling
try:
    ...
except Exception:
    ...
\`\`\`

---

## Common Indentation Errors

### IndentationError: expected an indented block

\`\`\`python
# Incorrect — missing indentation after colon
if True:
print("Hello")      # IndentationError

# Correct
if True:
    print("Hello")
\`\`\`

### IndentationError: unexpected indent

\`\`\`python
# Incorrect — indented where no block is expected
print("Hello")
    print("Oops!")  # IndentationError

# Correct
print("Hello")
print("Oops!")
\`\`\`

### IndentationError: unindent does not match

\`\`\`python
# Incorrect — inconsistent indentation within same block
if True:
    print("Line 1")
      print("Line 2")  # IndentationError — 6 spaces, not 4

# Correct
if True:
    print("Line 1")
    print("Line 2")
\`\`\`

---

## Tabs vs. Spaces

| Option | Recommendation |
|---|---|
| 4 spaces | Preferred — PEP 8 standard |
| Tab character | Avoid — causes \`TabError\` if mixed with spaces |

Configure VS Code to always use spaces:

\`\`\`json
{
  "editor.insertSpaces": true,
  "editor.tabSize": 4
}
\`\`\`

> **Rule of thumb:** If a line ends with \`:\`, the next line must be indented by exactly 4 more spaces.`,

    objectives: [
      "Understand that indentation is mandatory syntax in Python, not optional formatting",
      "Apply 4-space indentation consistently at each nesting level",
      "Write correctly indented conditionals, loops, functions, and classes",
      "Diagnose and fix the three most common indentation errors",
      "Configure VS Code to use spaces instead of tabs",
    ],
    examples: [
      {
        title: "Conditional Block",
        code: "temperature = 38\n\nif temperature > 37.5:\n    print('Fever detected')\n    print('Please rest and stay hydrated')\nelse:\n    print('Temperature is normal')\n\nprint('Check complete')",
        output: "Fever detected\nPlease rest and stay hydrated\nCheck complete",
      },
      {
        title: "Nested Loops",
        code: "for row in range(1, 4):\n    for col in range(1, 4):\n        print(f'({row},{col})', end=' ')\n    print()  # newline after each row",
        output: "(1,1) (1,2) (1,3) \n(2,1) (2,2) (2,3) \n(3,1) (3,2) (3,3) ",
      },
      {
        title: "Function with Nested Logic",
        code: "def classify_score(score):\n    if score >= 90:\n        grade = 'A'\n    elif score >= 70:\n        grade = 'B'\n    elif score >= 50:\n        grade = 'C'\n    else:\n        grade = 'F'\n    return grade\n\nprint(classify_score(95))\nprint(classify_score(72))\nprint(classify_score(40))",
        output: "A\nB\nF",
      },
      {
        title: "Loop with Conditional Inside",
        code: "numbers = [3, 7, 2, 9, 4, 6]\n\nfor num in numbers:\n    if num > 5:\n        print(f'{num} is greater than 5')",
        output: "7 is greater than 5\n9 is greater than 5\n6 is greater than 5",
      },
    ],
  },

  // ── Lesson 3: Keywords ─────────────────────────────────────────
  {
    title: "Keywords",
    slug: "keywords",
    content: `# Keywords

Keywords are **reserved words** built into the Python language. Each keyword has a fixed, specific meaning. You cannot use them as variable names, function names, or identifiers of any kind.

Python 3 has **35 keywords**.

---

## Complete Keyword List

| | | | | |
|---|---|---|---|---|
| \`False\` | \`None\` | \`True\` | \`and\` | \`as\` |
| \`assert\` | \`async\` | \`await\` | \`break\` | \`class\` |
| \`continue\` | \`def\` | \`del\` | \`elif\` | \`else\` |
| \`except\` | \`finally\` | \`for\` | \`from\` | \`global\` |
| \`if\` | \`import\` | \`in\` | \`is\` | \`lambda\` |
| \`nonlocal\` | \`not\` | \`or\` | \`pass\` | \`raise\` |
| \`return\` | \`try\` | \`while\` | \`with\` | \`yield\` |

---

## Listing Keywords Programmatically

\`\`\`python
import keyword

print(keyword.kwlist)
print(f"Total keywords: {len(keyword.kwlist)}")
\`\`\`

Output:
\`\`\`
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
 'while', 'with', 'yield']
Total keywords: 35
\`\`\`

---

## Keywords Cannot Be Used as Names

\`\`\`python
# All of the following raise a SyntaxError
class = "Python 101"   # SyntaxError
for = 10               # SyntaxError
if = True              # SyntaxError
return = 5             # SyntaxError

# Correct alternatives
class_name = "Python 101"
loop_count = 10
is_valid = True
result = 5
\`\`\`

---

## Keywords in Action — Common Examples

### \`if\` / \`elif\` / \`else\`

\`\`\`python
marks = 72

if marks >= 80:
    print("Distinction")
elif marks >= 60:
    print("Merit")
else:
    print("Pass")
\`\`\`

Output:
\`\`\`
Merit
\`\`\`

---

### \`for\` / \`while\` / \`break\` / \`continue\`

\`\`\`python
# break — exit the loop early
for number in range(1, 10):
    if number == 5:
        break
    print(number, end=" ")
\`\`\`

Output:
\`\`\`
1 2 3 4
\`\`\`

\`\`\`python
# continue — skip to the next iteration
for number in range(1, 7):
    if number == 3:
        continue
    print(number, end=" ")
\`\`\`

Output:
\`\`\`
1 2 4 5 6
\`\`\`

---

### \`def\` / \`return\`

\`\`\`python
def add(a, b):
    return a + b

print(add(4, 7))
\`\`\`

Output:
\`\`\`
11
\`\`\`

---

### \`True\` / \`False\` / \`None\`

\`\`\`python
is_logged_in = True
has_permission = False
user_data = None

print(is_logged_in)
print(has_permission)
print(user_data)
print(type(user_data))
\`\`\`

Output:
\`\`\`
True
False
None
<class 'NoneType'>
\`\`\`

---

### \`and\` / \`or\` / \`not\`

\`\`\`python
age = 20
has_id = True

if age >= 18 and has_id:
    print("Entry permitted")

if not has_id:
    print("ID required")

score = 85
if score < 50 or score > 95:
    print("Out of normal range")
else:
    print("Score is within range")
\`\`\`

Output:
\`\`\`
Entry permitted
Score is within range
\`\`\`

---

### \`import\` / \`from\` / \`as\`

\`\`\`python
import math
print(math.sqrt(144))

from math import pi
print(round(pi, 4))

import datetime as dt
print(dt.date.today())
\`\`\`

Output:
\`\`\`
12.0
3.1416
2024-06-06
\`\`\`

---

### \`try\` / \`except\` / \`finally\`

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("This always runs")
\`\`\`

Output:
\`\`\`
Cannot divide by zero
This always runs
\`\`\`

---

### \`pass\` — Placeholder for Empty Blocks

\`\`\`python
def future_feature():
    pass   # not implemented yet

class Blueprint:
    pass   # class definition to be filled in later

print("No error raised")
\`\`\`

Output:
\`\`\`
No error raised
\`\`\`

---

## Keywords are Case-Sensitive

\`\`\`python
x = True    # valid keyword
y = False   # valid keyword

# 'true' and 'false' are NOT keywords — they are undefined names
z = true    # NameError: name 'true' is not defined
\`\`\`

---

## Checking if a Word is a Keyword

\`\`\`python
import keyword

words = ["for", "loop", "while", "count", "return", "result"]

for word in words:
    status = "keyword" if keyword.iskeyword(word) else "not a keyword"
    print(f"'{word}' is {status}")
\`\`\`

Output:
\`\`\`
'for' is keyword
'loop' is not a keyword
'while' is keyword
'count' is not a keyword
'return' is keyword
'result' is not a keyword
\`\`\``,

    objectives: [
      "Define what Python keywords are and why they cannot be used as identifiers",
      "List and categorise the 35 Python keywords",
      "Use the keyword module to inspect and test keywords programmatically",
      "Demonstrate practical usage of the most common keywords in working code examples",
      "Understand that keywords are case-sensitive",
    ],
    examples: [
      {
        title: "List All Keywords",
        code: "import keyword\n\nfor i, kw in enumerate(keyword.kwlist, 1):\n    print(f'{i:2}. {kw}')",
        output:
          " 1. False\n 2. None\n 3. True\n 4. and\n 5. as\n 6. assert\n 7. async\n 8. await\n 9. break\n10. class\n...",
      },
      {
        title: "Keyword Checker",
        code: 'import keyword\n\ntest_words = ["if", "name", "class", "score", "return", "total"]\n\nfor word in test_words:\n    result = keyword.iskeyword(word)\n    print(f"{word!r:12} -> keyword: {result}")',
        output:
          "'if'         -> keyword: True\n'name'       -> keyword: False\n'class'      -> keyword: True\n'score'      -> keyword: False\n'return'     -> keyword: True\n'total'      -> keyword: False",
      },
      {
        title: "for / break / continue",
        code: "print('--- break example ---')\nfor n in range(1, 8):\n    if n == 5:\n        break\n    print(n, end=' ')\n\nprint('\\n--- continue example ---')\nfor n in range(1, 8):\n    if n % 2 == 0:\n        continue\n    print(n, end=' ')",
        output:
          "--- break example ---\n1 2 3 4 \n--- continue example ---\n1 3 5 7 ",
      },
      {
        title: "try / except / finally",
        code: "values = [10, 0, 5]\n\nfor v in values:\n    try:\n        result = 100 / v\n        print(f'100 / {v} = {result}')\n    except ZeroDivisionError:\n        print(f'100 / {v} = undefined (division by zero)')\n    finally:\n        print('  -> attempt complete')",
        output:
          "100 / 10 = 10.0\n  -> attempt complete\n100 / 0 = undefined (division by zero)\n  -> attempt complete\n100 / 5 = 20.0\n  -> attempt complete",
      },
    ],
  },

  // ── Lesson 4: Identifiers ──────────────────────────────────────
  {
    title: "Identifiers",
    slug: "identifiers",
    content: `# Identifiers

An **identifier** is the name you assign to a variable, function, class, module, or any other object you create in Python. Choosing clear, consistent identifiers is one of the most impactful habits you can develop as a programmer.

---

## Basic Examples

\`\`\`python
# Variables
username = "alice"
age = 30
account_balance = 1500.75

# Constants (by convention, UPPER_SNAKE_CASE)
MAX_LOGIN_ATTEMPTS = 5
TAX_RATE = 0.2

# Function
def calculate_area(radius):
    return 3.14159 * radius ** 2

# Class
class BankAccount:
    pass

print(username, age, account_balance)
print(calculate_area(7))
\`\`\`

Output:
\`\`\`
alice 30 1500.75
153.93791
\`\`\`

---

## Rules for Valid Identifiers

| Rule | Valid Examples | Invalid Examples |
|---|---|---|
| Must start with a letter or underscore | \`name\`, \`_count\` | \`1name\`, \`9score\` |
| Can contain letters, digits, underscores | \`score_1\`, \`item2\` | \`my-score\`, \`my score\` |
| Cannot be a Python keyword | \`class_name\`, \`for_loop\` | \`class\`, \`for\` |
| Case-sensitive | \`age\`, \`Age\`, \`AGE\` are three different names | — |
| No special characters | \`total_sum\` | \`total$\`, \`price@sale\` |

---

## Testing Identifiers

\`\`\`python
candidates = ["user_name", "2fast", "class", "_id", "total-sum", "firstName"]

for name in candidates:
    import keyword
    is_valid = name.isidentifier() and not keyword.iskeyword(name)
    print(f"{name!r:15} -> valid: {is_valid}")
\`\`\`

Output:
\`\`\`
'user_name'     -> valid: True
'2fast'         -> valid: False
'class'         -> valid: False
'_id'           -> valid: True
'total-sum'     -> valid: False
'firstName'     -> valid: True
\`\`\`

---

## PEP 8 Naming Conventions

PEP 8 is Python's official style guide. Following these conventions makes your code immediately readable by any Python developer:

| Identifier Type | Convention | Examples |
|---|---|---|
| Variables | \`snake_case\` | \`user_name\`, \`total_price\` |
| Functions | \`snake_case\` | \`get_user()\`, \`calculate_tax()\` |
| Constants | \`UPPER_SNAKE_CASE\` | \`MAX_SIZE\`, \`PI\`, \`DEFAULT_TIMEOUT\` |
| Classes | \`PascalCase\` | \`Student\`, \`HttpRequest\`, \`DataParser\` |
| Private (internal use) | Leading \`_\` | \`_cache\`, \`_validate()\` |
| Dunder (built-in special) | Double \`__\` on each side | \`__init__\`, \`__name__\` |

\`\`\`python
# Correct PEP 8 naming
MAX_SPEED = 120          # constant

class ElectricCar:       # PascalCase class
    def __init__(self, brand, speed):
        self.brand = brand         # snake_case attribute
        self._battery = 100        # private attribute
        self.max_speed = speed     # snake_case attribute

    def display_info(self):        # snake_case method
        print(f"{self.brand} | Max Speed: {self.max_speed} km/h")

car = ElectricCar("Tesla", MAX_SPEED)
car.display_info()
\`\`\`

Output:
\`\`\`
Tesla | Max Speed: 120 km/h
\`\`\`

---

## Case Sensitivity

\`\`\`python
# These are three completely separate variables
value = 10
Value = 20
VALUE = 30

print(value)   # 10
print(Value)   # 20
print(VALUE)   # 30

# Modifying one does not affect the others
value = 99
print(value)   # 99
print(Value)   # 20  — unchanged
\`\`\`

Output:
\`\`\`
10
20
30
99
20
\`\`\`

---

## Descriptive vs. Poor Names

\`\`\`python
# Poor — unclear intent
x = 3600
y = 60
z = x / y

# Descriptive — self-documenting
seconds_per_hour = 3600
minutes_per_hour = 60
hours_equivalent = seconds_per_hour / minutes_per_hour

print(hours_equivalent)
\`\`\`

Output:
\`\`\`
60.0
\`\`\`

---

## The Underscore Identifier \`_\`

The single underscore \`_\` is used as a throwaway variable when the loop variable or return value is not needed:

\`\`\`python
# Repeat an action 4 times without needing the counter
for _ in range(4):
    print("Processing...")

# Unpack a tuple, ignoring the middle value
first, _, last = ("Alice", "Marie", "Smith")
print(first, last)
\`\`\`

Output:
\`\`\`
Processing...
Processing...
Processing...
Processing...
Alice Smith
\`\`\`

---

## Dunder Identifiers (Double Underscore)

Python uses names surrounded by double underscores (\`__name__\`) for built-in special attributes and methods:

\`\`\`python
print(__name__)    # '__main__' when running directly

class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Dog named {self.name}"

rex = Dog("Rex")
print(rex)         # calls __str__ automatically
\`\`\`

Output:
\`\`\`
__main__
Dog named Rex
\`\`\`

> **Naming guideline:** If you can read an identifier out loud and immediately understand what it holds or does, it is a good name. \`student_average_score\` is immediately clear; \`sas\` or \`x2\` is not.`,

    objectives: [
      "Define what an identifier is and provide examples across variables, functions, and classes",
      "Apply all rules for valid identifier construction",
      "Use the isidentifier() method and keyword module to validate identifier names programmatically",
      "Follow PEP 8 naming conventions for variables, functions, constants, and classes",
      "Understand and demonstrate Python's case sensitivity with identifiers",
      "Use the underscore _ as a throwaway variable and explain dunder identifiers",
    ],
    examples: [
      {
        title: "Valid and Invalid Identifiers",
        code: 'import keyword\n\nnames = ["total_score", "3items", "for", "_cache", "user-name", "MAX_SIZE"]\n\nfor name in names:\n    valid = name.isidentifier() and not keyword.iskeyword(name)\n    print(f"{name!r:15} -> {\"valid\" if valid else \"invalid\"}")',
        output:
          "'total_score'   -> valid\n'3items'        -> invalid\n'for'           -> invalid\n'_cache'        -> valid\n'user-name'     -> invalid\n'MAX_SIZE'      -> valid",
      },
      {
        title: "Case Sensitivity Demonstration",
        code: "count = 1\nCount = 2\nCOUNT = 3\n\nprint(f'count = {count}')\nprint(f'Count = {Count}')\nprint(f'COUNT = {COUNT}')\nprint(f'All different: {count != Count != COUNT}')",
        output:
          "count = 1\nCount = 2\nCOUNT = 3\nAll different: True",
      },
      {
        title: "PEP 8 Naming in Practice",
        code: 'MAX_CAPACITY = 50  # constant\n\ndef is_room_available(current_count):\n    """Check whether the room has space."""\n    return current_count < MAX_CAPACITY\n\nclass ConferenceRoom:\n    def __init__(self, name):\n        self.room_name = name\n        self._booking_count = 0\n\n    def book(self):\n        if is_room_available(self._booking_count):\n            self._booking_count += 1\n            return f"Booked: {self.room_name} ({self._booking_count}/{MAX_CAPACITY})"\n        return "Room is full"\n\nroom = ConferenceRoom("Hall A")\nprint(room.book())\nprint(room.book())',
        output: "Booked: Hall A (1/50)\nBooked: Hall A (2/50)",
      },
      {
        title: "Throwaway Variable with _",
        code: "# Ignore the loop index\nfor _ in range(3):\n    print('Ping')\n\n# Ignore middle value when unpacking\nfirst, _, last = ('London', 'UK', '2024')\nprint(f'City: {first}, Year: {last}')",
        output: "Ping\nPing\nPing\nCity: London, Year: 2024",
      },
    ],
  },
];