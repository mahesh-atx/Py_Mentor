
/**
 * Module 1 – Topic 1.3: Input & Output
 *
 * Lessons:
 *   1. Input & Output (Overview)
 *   2. print()
 *   3. input()
 */

export const inputOutputLessons = [
  // ── Lesson 1: Input & Output Overview ──────────────────────────
  {
    title: "Input & Output",
    slug: "input-output-intro",
    content: `# Input & Output

Every useful program needs to **communicate** with the user. In Python, this is done through **input** (receiving data) and **output** (displaying data).

---

## What is Output?

Output is anything your program **displays** to the user. The primary way to produce output in Python is the \`print()\` function:

\`\`\`python
print("Welcome to Python!")
print("Current temperature: 22 degrees")
print("Processing complete.")
\`\`\`

Output:
\`\`\`
Welcome to Python!
Current temperature: 22 degrees
Processing complete.
\`\`\`

---

## What is Input?

Input is data that the **user provides** to the program at runtime. The primary way to receive input in Python is the \`input()\` function:

\`\`\`python
name = input("Enter your name: ")
print(f"Welcome, {name}!")
\`\`\`

When this runs:
\`\`\`
Enter your name: Alice
Welcome, Alice!
\`\`\`

---

## The Input → Process → Output Model

Almost every practical program follows this three-step pattern:

\`\`\`
Step 1 — INPUT   : Collect data from the user
Step 2 — PROCESS : Perform calculations or logic on the data
Step 3 — OUTPUT  : Display the results to the user
\`\`\`

### Example — Temperature Converter

\`\`\`python
# Step 1: INPUT
celsius = float(input("Enter temperature in Celsius: "))

# Step 2: PROCESS
fahrenheit = (celsius * 9 / 5) + 32

# Step 3: OUTPUT
print(f"{celsius}°C is equal to {fahrenheit}°F")
\`\`\`

When this runs:
\`\`\`
Enter temperature in Celsius: 100
100.0°C is equal to 212.0°F
\`\`\`

---

### Example — Age Calculator

\`\`\`python
# Step 1: INPUT
name = input("Enter your name: ")
birth_year = int(input("Enter your birth year: "))

# Step 2: PROCESS
current_year = 2025
age = current_year - birth_year

# Step 3: OUTPUT
print(f"Hello, {name}. You are approximately {age} years old.")
\`\`\`

When this runs:
\`\`\`
Enter your name: Alice
Enter your birth year: 1995
Hello, Alice. You are approximately 30 years old.
\`\`\`

---

## Why Input and Output Matter

| Concept | Purpose | Python Function |
|---|---|---|
| **Output** | Display results, messages, and feedback | \`print()\` |
| **Input** | Collect data from the user | \`input()\` |

Without input and output, a program runs silently with no way for users to provide data or see results. Every interactive application — from a simple calculator to a web service — is built on this foundation.`,

    objectives: [
      "Understand the roles of input and output in a Python program",
      "Identify print() as the primary output mechanism and input() as the primary input mechanism",
      "Apply the Input, Process, Output model to structure a simple program",
    ],
    examples: [
      {
        title: "Output Only",
        code: 'print("Program started")\nprint("Calculating...")\nprint("Done!")',
        output: "Program started\nCalculating...\nDone!",
      },
      {
        title: "Input, Process, Output — Rectangle Area",
        code: "# Simulating user input for demonstration\nlength = 12.0\nwidth = 5.0\n\n# Process\narea = length * width\nperimeter = 2 * (length + width)\n\n# Output\nprint(f'Length   : {length}')\nprint(f'Width    : {width}')\nprint(f'Area     : {area}')\nprint(f'Perimeter: {perimeter}')",
        output: "Length   : 12.0\nWidth    : 5.0\nArea     : 60.0\nPerimeter: 34.0",
      },
      {
        title: "Input, Process, Output — BMI Calculator",
        code: "# Simulating user input\nweight_kg = 70.0\nheight_m = 1.75\n\n# Process\nbmi = weight_kg / (height_m ** 2)\n\n# Output\nprint(f'Weight : {weight_kg} kg')\nprint(f'Height : {height_m} m')\nprint(f'BMI    : {bmi:.2f}')",
        output: "Weight : 70.0 kg\nHeight : 1.75 m\nBMI    : 22.86",
      },
    ],
  },

  // ── Lesson 2: print() ─────────────────────────────────────────
  {
    title: "print()",
    slug: "print-function",
    content: `# The print() Function

\`print()\` is Python's built-in function for displaying output to the terminal. It is the most frequently used function when learning Python and remains essential in production code for logging and debugging.

---

## Basic Usage

\`print()\` accepts any value and displays it as text:

\`\`\`python
print("Hello, World!")
print(42)
print(3.14)
print(True)
print(None)
\`\`\`

Output:
\`\`\`
Hello, World!
42
3.14
True
None
\`\`\`

---

## Printing Multiple Values

Pass multiple values separated by commas. Python inserts a **space** between them by default:

\`\`\`python
name = "Alice"
age = 30
city = "London"

print("Name:", name, "| Age:", age, "| City:", city)
\`\`\`

Output:
\`\`\`
Name: Alice | Age: 30 | City: London
\`\`\`

---

## The \`sep\` Parameter

\`sep\` controls what is placed **between** multiple values. The default is a single space:

\`\`\`python
# Default separator (space)
print("apple", "banana", "cherry")

# Custom separators
print("2025", "07", "15", sep="-")
print("alice", "example", "com", sep="@")
print("one", "two", "three", sep=" | ")
print("a", "b", "c", sep="")
\`\`\`

Output:
\`\`\`
apple banana cherry
2025-07-15
alice@example.com
one | two | three
abc
\`\`\`

---

## The \`end\` Parameter

\`end\` controls what is placed **after** the final value. The default is a newline character \`\\n\`:

\`\`\`python
# Default — each print on a new line
print("First")
print("Second")

# Custom end — all on one line
print("Loading", end="")
print(".", end="")
print(".", end="")
print(". Done!")

# Printing numbers on one line
for i in range(1, 6):
    print(i, end=" ")
\`\`\`

Output:
\`\`\`
First
Second
Loading... Done!
1 2 3 4 5 
\`\`\`

---

## f-Strings (Formatted String Literals)

f-strings are the modern, preferred way to embed variables and expressions directly inside a string. Prefix the string with \`f\` and wrap expressions in \`{}\`:

\`\`\`python
name = "Alice"
age = 30
balance = 1523.75

print(f"Name    : {name}")
print(f"Age     : {age}")
print(f"Balance : {balance}")
\`\`\`

Output:
\`\`\`
Name    : Alice
Age     : 30
Balance : 1523.75
\`\`\`

### Expressions Inside f-Strings

Any valid Python expression can be placed inside the \`{}\`:

\`\`\`python
a = 15
b = 4

print(f"Sum        : {a + b}")
print(f"Product    : {a * b}")
print(f"Division   : {a / b}")
print(f"Power      : {a ** 2}")
print(f"Is even?   : {a % 2 == 0}")
\`\`\`

Output:
\`\`\`
Sum        : 19
Product    : 60
Division   : 3.75
Power      : 225
Is even?   : False
\`\`\`

### Number Formatting with f-Strings

\`\`\`python
pi = 3.14159265358979
price = 49999.5
ratio = 0.873

print(f"Pi (2 dp)       : {pi:.2f}")
print(f"Pi (4 dp)       : {pi:.4f}")
print(f"Price (comma)   : {price:,.2f}")
print(f"Ratio (percent) : {ratio:.1%}")
print(f"Padded number   : {42:05d}")
\`\`\`

Output:
\`\`\`
Pi (2 dp)       : 3.14
Pi (4 dp)       : 3.1416
Price (comma)   : 49,999.50
Ratio (percent) : 87.3%
Padded number   : 00042
\`\`\`

---

## String Concatenation with \`+\`

Strings can be joined using the \`+\` operator. Note that both operands must be strings — use \`str()\` to convert non-string values:

\`\`\`python
first_name = "John"
last_name = "Smith"
full_name = first_name + " " + last_name
print(full_name)

score = 98
print("Your score: " + str(score) + " out of 100")
\`\`\`

Output:
\`\`\`
John Smith
Your score: 98 out of 100
\`\`\`

> **Recommendation:** Prefer f-strings over concatenation. f-strings are more readable, handle type conversion automatically, and support formatting options.

---

## Escape Characters

Escape sequences allow you to include special characters inside a string:

| Sequence | Meaning | Output |
|---|---|---|
| \`\\n\` | New line | Moves to the next line |
| \`\\t\` | Tab | Inserts a tab space |
| \`\\\\\` | Literal backslash | \`\\\` |
| \`\\"\` | Literal double quote | \`"\` |
| \`\\'\` | Literal single quote | \`'\` |

\`\`\`python
# Newline
print("Line 1\\nLine 2\\nLine 3")

# Tab — useful for aligning columns
print("Name\\tAge\\tCity")
print("Alice\\t30\\tLondon")
print("Bob\\t25\\tParis")

# Backslash in file paths
print("File path: C:\\\\Users\\\\Alice\\\\Documents")

# Quotes inside strings
print("She said, \\"Hello!\\"")
\`\`\`

Output:
\`\`\`
Line 1
Line 2
Line 3
Name    Age     City
Alice   30      London
Bob     25      Paris
File path: C:\\Users\\Alice\\Documents
She said, "Hello!"
\`\`\`

---

## Printing a Blank Line

Call \`print()\` with no arguments to output an empty line — useful for spacing output:

\`\`\`python
print("Section 1: Results")
print("Score: 95")
print()
print("Section 2: Summary")
print("All tests passed.")
\`\`\`

Output:
\`\`\`
Section 1: Results
Score: 95

Section 2: Summary
All tests passed.
\`\`\`

---

## Combining sep, end, and f-Strings

\`\`\`python
students = [("Alice", 91), ("Bob", 84), ("Carol", 78)]

print("Rank  Name   Score")
print("-" * 22)
for rank, (name, score) in enumerate(students, 1):
    print(f"{rank:<6}{name:<7}{score}")
\`\`\`

Output:
\`\`\`
Rank  Name   Score
----------------------
1     Alice  91
2     Bob    84
3     Carol  78
\`\`\``,

    objectives: [
      "Use print() to display strings, numbers, and boolean values",
      "Print multiple values and control the separator using the sep parameter",
      "Control line endings using the end parameter",
      "Format output using f-strings including numeric formatting options",
      "Use escape characters to produce special output such as newlines and tabs",
      "Combine sep, end, and f-strings to produce well-structured output",
    ],
    examples: [
      {
        title: "Basic Output Types",
        code: 'print("Hello, World!")\nprint(100)\nprint(3.14159)\nprint(True)\nprint(None)',
        output: "Hello, World!\n100\n3.14159\nTrue\nNone",
      },
      {
        title: "sep and end Parameters",
        code: 'print("2025", "07", "15", sep="-")\nprint("alice", "example", "com", sep="@")\nprint("A", "B", "C", sep=" -> ")\n\nfor i in range(1, 6):\n    print(i, end=" ")',
        output: "2025-07-15\nalice@example.com\nA -> B -> C\n1 2 3 4 5 ",
      },
      {
        title: "f-String Formatting",
        code: 'product = "Laptop"\nprice = 1299.99\ndiscount = 0.15\nfinal = price * (1 - discount)\n\nprint(f"Product  : {product}")\nprint(f"Original : £{price:,.2f}")\nprint(f"Discount : {discount:.0%}")\nprint(f"Final    : £{final:,.2f}")',
        output:
          "Product  : Laptop\nOriginal : £1,299.99\nDiscount : 15%\nFinal    : £1,104.99",
      },
      {
        title: "Escape Characters — Table",
        code: 'print("Item\\t\\tPrice\\tQty")\nprint("-" * 35)\nprint("Apple\\t\\t£0.50\\t100")\nprint("Banana\\t\\t£0.30\\t150")\nprint("Cherry\\t\\t£1.20\\t75")',
        output:
          "Item\t\tPrice\tQty\n-----------------------------------\nApple\t\t£0.50\t100\nBanana\t\t£0.30\t150\nCherry\t\t£1.20\t75",
      },
      {
        title: "Leaderboard with f-Strings",
        code: 'players = [("Alice", 9800), ("Bob", 8750), ("Carol", 7600)]\n\nprint(f"{"Rank":<6}{"Player":<10}{"Score":>6}")\nprint("-" * 24)\nfor rank, (name, score) in enumerate(players, 1):\n    print(f"{rank:<6}{name:<10}{score:>6}")',
        output:
          "Rank  Player        Score\n------------------------\n1     Alice          9800\n2     Bob            8750\n3     Carol          7600",
      },
    ],
  },

  // ── Lesson 3: input() ──────────────────────────────────────────
  {
    title: "input()",
    slug: "input-function",
    content: `# The input() Function

\`input()\` is Python's built-in function for **receiving data from the user at runtime**. When the interpreter reaches an \`input()\` call, the program **pauses**, displays an optional prompt, and waits for the user to type a response and press \`Enter\`.

---

## Basic Usage

\`\`\`python
name = input("Enter your name: ")
print(f"Hello, {name}! Welcome to Python.")
\`\`\`

When this runs:
\`\`\`
Enter your name: Alice
Hello, Alice! Welcome to Python.
\`\`\`

The string passed to \`input()\` is the **prompt** — it is displayed but not stored. The user's response is what gets stored in the variable.

---

## input() Always Returns a String

This is the single most important rule to remember:

**\`input()\` always returns a string (\`str\`), regardless of what the user types.**

\`\`\`python
value = input("Enter a number: ")   # User types: 42
print(type(value))                  # <class 'str'>
print(value)                        # "42"  — a string, not an integer
\`\`\`

Output:
\`\`\`
<class 'str'>
42
\`\`\`

---

## Why This Matters — String vs. Numeric Behaviour

\`\`\`python
# Without conversion — string behaviour
a = input("Enter a number: ")   # User types: 5
b = input("Enter another: ")    # User types: 5
print(a + b)                    # "55"  — string concatenation!

# With conversion — numeric behaviour
a = int(input("Enter a number: "))   # User types: 5
b = int(input("Enter another: "))    # User types: 5
print(a + b)                         # 10  — integer addition
\`\`\`

Output (without conversion):
\`\`\`
55
\`\`\`

Output (with conversion):
\`\`\`
10
\`\`\`

---

## Converting Input

Use \`int()\` for whole numbers and \`float()\` for decimals:

\`\`\`python
# Integer input
quantity = int(input("Enter quantity: "))
print(f"Quantity ordered: {quantity}")
print(f"Double order    : {quantity * 2}")

# Float input
price = float(input("Enter price: £"))
tax = price * 0.2
total = price + tax
print(f"Price : £{price:.2f}")
print(f"Tax   : £{tax:.2f}")
print(f"Total : £{total:.2f}")
\`\`\`

When this runs:
\`\`\`
Enter quantity: 3
Quantity ordered: 3
Double order    : 6
Enter price: £49.99
Price : £49.99
Tax   : £10.00
Total : £59.99
\`\`\`

---

## Handling Invalid Input with try/except

If the user types something that cannot be converted (e.g., typing "hello" when an integer is expected), Python raises a \`ValueError\`. Use \`try/except\` to handle this gracefully:

\`\`\`python
try:
    age = int(input("Enter your age: "))
    print(f"In 10 years you will be {age + 10}.")
except ValueError:
    print("Invalid input. Please enter a whole number.")
\`\`\`

When this runs with valid input:
\`\`\`
Enter your age: 25
In 10 years you will be 35.
\`\`\`

When this runs with invalid input:
\`\`\`
Enter your age: twenty
Invalid input. Please enter a whole number.
\`\`\`

---

## Collecting Multiple Inputs

### One at a Time

\`\`\`python
first_name = input("First name: ")
last_name  = input("Last name : ")
age        = int(input("Age       : "))

print()
print("--- Profile ---")
print(f"Name : {first_name} {last_name}")
print(f"Age  : {age}")
\`\`\`

When this runs:
\`\`\`
First name: Alice
Last name : Smith
Age       : 28

--- Profile ---
Name : Alice Smith
Age  : 28
\`\`\`

---

### Multiple Values on One Line Using split()

\`\`\`python
# User types: 10 20 30
numbers = input("Enter three numbers separated by spaces: ").split()
a = int(numbers[0])
b = int(numbers[1])
c = int(numbers[2])

print(f"Sum     : {a + b + c}")
print(f"Average : {(a + b + c) / 3:.2f}")
\`\`\`

When this runs:
\`\`\`
Enter three numbers separated by spaces: 10 20 30
Sum     : 60
Average : 20.00
\`\`\`

---

### Using map() for Concise Multi-Value Input

\`\`\`python
# User types: 5 8
length, width = map(int, input("Enter length and width: ").split())
area = length * width
print(f"Area: {area}")
\`\`\`

When this runs:
\`\`\`
Enter length and width: 5 8
Area: 40
\`\`\`

---

## input() Without a Prompt

You can call \`input()\` with no argument. The program pauses silently until the user presses \`Enter\`:

\`\`\`python
print("Press Enter to begin the quiz...")
input()
print("Quiz started!")
\`\`\`

---

## Practical Patterns

### Pattern 1 — Simple Greeting

\`\`\`python
name = input("What is your name? ")
print(f"Nice to meet you, {name}!")
\`\`\`

### Pattern 2 — Validated Calculation

\`\`\`python
try:
    base   = float(input("Enter base of triangle  : "))
    height = float(input("Enter height of triangle: "))
    area   = 0.5 * base * height
    print(f"Area of triangle: {area:.2f}")
except ValueError:
    print("Please enter valid numeric values.")
\`\`\`

### Pattern 3 — Yes/No Decision

\`\`\`python
answer = input("Would you like to continue? (yes/no): ").strip().lower()

if answer == "yes":
    print("Continuing...")
elif answer == "no":
    print("Exiting. Goodbye!")
else:
    print("Unrecognised response. Please type 'yes' or 'no'.")
\`\`\`

### Pattern 4 — Repeated Input Until Valid

\`\`\`python
while True:
    raw = input("Enter a positive integer: ")
    if raw.isdigit() and int(raw) > 0:
        number = int(raw)
        break
    print("Invalid. Please try again.")

print(f"You entered: {number}")
\`\`\`

---

## Summary — int() vs float() vs str()

| User Input | Conversion Needed | Function |
|---|---|---|
| Whole number (age, quantity) | Yes | \`int(input(...))\` |
| Decimal number (price, height) | Yes | \`float(input(...))\` |
| Text (name, city) | No | \`input(...)\` directly |
| Multiple numbers on one line | Yes, with split() | \`map(int, input(...).split())\` |

> **Key rule:** Always convert \`input()\` to the appropriate type before performing any arithmetic. Failing to do so is one of the most common beginner errors in Python.`,

    objectives: [
      "Use input() to collect data from the user at runtime",
      "Explain why input() always returns a string and demonstrate the consequence of not converting it",
      "Convert input to int and float using type conversion functions",
      "Collect multiple inputs both sequentially and on a single line using split() and map()",
      "Handle invalid input gracefully using try/except with ValueError",
      "Apply common input/output patterns to build simple interactive programs",
    ],
    examples: [
      {
        title: "String vs. Numeric Input",
        code: '# Simulating input() return values\nraw = "5"          # what input() would return\n\nprint("--- Without conversion ---")\nprint(raw + raw)   # string concatenation\nprint(type(raw))\n\nconverted = int(raw)\nprint("\\n--- With int() conversion ---")\nprint(converted + converted)   # integer addition\nprint(type(converted))',
        output:
          "--- Without conversion ---\n55\n<class 'str'>\n\n--- With int() conversion ---\n10\n<class 'int'>",
      },
      {
        title: "Type Conversion Demonstration",
        code: "values = [\n    (\"42\",   int),\n    (\"3.14\", float),\n    (\"True\", str),\n]\n\nfor raw, converter in values:\n    converted = converter(raw)\n    print(f'raw={raw!r:8} -> {converter.__name__}({raw!r}) = {converted!r:8} type={type(converted).__name__}')",
        output:
          "raw='42'     -> int('42')   = 42       type=int\nraw='3.14'   -> float('3.14') = 3.14     type=float\nraw='True'   -> str('True') = 'True'   type=str",
      },
      {
        title: "Simulated Calculator",
        code: "# Simulating user input\na = 24.0\nb = 6.0\n\nprint(f'a = {a}')\nprint(f'b = {b}')\nprint()\nprint(f'a + b = {a + b}')\nprint(f'a - b = {a - b}')\nprint(f'a * b = {a * b}')\nprint(f'a / b = {a / b}')\nprint(f'a % b = {a % b}')\nprint(f'a ** 2 = {a ** 2}')",
        output:
          "a = 24.0\nb = 6.0\n\na + b = 30.0\na - b = 18.0\na * b = 144.0\na / b = 4.0\na % b = 0.0\na ** 2 = 576.0",
      },
      {
        title: "Simulated Multi-Input with map()",
        code: "# Simulating: map(int, input().split()) with '10 20 30'\nraw_input = '10 20 30'\nnumbers = list(map(int, raw_input.split()))\n\nprint(f'Numbers : {numbers}')\nprint(f'Sum     : {sum(numbers)}')\nprint(f'Average : {sum(numbers) / len(numbers):.2f}')\nprint(f'Max     : {max(numbers)}')\nprint(f'Min     : {min(numbers)}')",
        output:
          "Numbers : [10, 20, 30]\nSum     : 60\nAverage : 20.00\nMax     : 30\nMin     : 10",
      },
      {
        title: "try/except for Invalid Input",
        code: "test_inputs = ['25', 'twenty', '0', '-5', '100']\n\nfor raw in test_inputs:\n    try:\n        age = int(raw)\n        if age <= 0:\n            print(f'{raw!r:8} -> Error: age must be a positive number')\n        else:\n            print(f'{raw!r:8} -> Valid age: {age}')\n    except ValueError:\n        print(f'{raw!r:8} -> Error: not a valid integer')",
        output:
          "'25'     -> Valid age: 25\n'twenty' -> Error: not a valid integer\n'0'      -> Error: age must be a positive number\n'-5'     -> Error: age must be a positive number\n'100'    -> Valid age: 100",
      },
    ],
  },
];