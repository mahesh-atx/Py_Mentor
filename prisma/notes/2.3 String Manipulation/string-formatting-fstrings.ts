export const stringFormattingFstringsLesson = {
  title: "String Formatting - f-strings Deep Dive",
  slug: "string-formatting-fstrings",
  content: `# String Formatting - f-strings Deep Dive

f-strings (formatted string literals) were introduced in Python 3.6 and are now the preferred way to format strings. They are fast, readable, and powerful.

## The Theory — Building the Logic

An f-string is parsed by Python before the program runs: every \`{expression}\` is evaluated in the surrounding scope, converted to text, and spliced into the literal parts, keeping logic and presentation together. The colon inside the braces adds a format spec that controls how a value is displayed — decimals, alignment, padding, thousands separators — without changing the value itself. This is why f-strings feel like writing the final output directly inside your code. The pitfall is that a stray brace or a name missing from the current scope breaks the f-string; and if you actually want a literal brace in the text you must double it as \`{{\` and \`}}\`, otherwise Python treats it as the start of an expression.

## What is an f-string?

An f-string is a string prefixed with \`f\` or \`F\`. Inside the string, you can embed Python expressions in curly braces \`{}\` - Python evaluates them and inserts the results.

\`\`\`python
name = "Alice"
age = 25

# Old way - string concatenation
print("My name is " + name + " and I am " + str(age) + " years old.")

# f-string way - clean and readable
print(f"My name is {name} and I am {age} years old.")

# Both output: My name is Alice and I am 25 years old.
\`\`\`

## Basic Variable Insertion

\`\`\`python
name = "Alice"
city = "New York"
score = 95.5
is_active = True

print(f"Name    : {name}")
print(f"City    : {city}")
print(f"Score   : {score}")
print(f"Active  : {is_active}")
\`\`\`

Output:
\`\`\`
Name    : Alice
City    : New York
Score   : 95.5
Active  : True
\`\`\`

## Expressions Inside f-strings

You can put any valid Python expression inside \`{}\`:

\`\`\`python
a = 10
b = 3

print(f"Sum       : {a + b}")       # Output: Sum       : 13
print(f"Product   : {a * b}")       # Output: Product   : 30
print(f"Division  : {a / b:.2f}")   # Output: Division  : 3.33
print(f"Power     : {a ** b}")      # Output: Power     : 1000
print(f"Is even   : {a % 2 == 0}")  # Output: Is even   : True
\`\`\`

\`\`\`python
# String methods inside f-strings
name = "alice smith"
print(f"Title case: {name.title()}")     # Output: Title case: Alice Smith
print(f"Uppercase : {name.upper()}")     # Output: Uppercase : ALICE SMITH
print(f"Length    : {len(name)}")        # Output: Length    : 11

# List operations
numbers = [5, 3, 8, 1, 9, 2]
print(f"Max: {max(numbers)}")      # Output: Max: 9
print(f"Min: {min(numbers)}")      # Output: Min: 1
print(f"Sum: {sum(numbers)}")      # Output: Sum: 28
\`\`\`

\`\`\`python
# Conditionals inside f-strings (ternary)
age = 20
print(f"Status: {'adult' if age >= 18 else 'minor'}")
# Output: Status: adult

score = 85
print(f"Grade: {'A' if score >= 90 else 'B' if score >= 80 else 'C'}")
# Output: Grade: B
\`\`\`

## Number Formatting

This is where f-strings really shine. The format spec goes after a colon \`:\` inside the braces: \`{value:format_spec}\`.

### Decimal Places

\`\`\`python
pi = 3.141592653589793

print(f"Default  : {pi}")         # Output: 3.141592653589793
print(f"2 decimal: {pi:.2f}")     # Output: 3.14
print(f"4 decimal: {pi:.4f}")     # Output: 3.1416
print(f"0 decimal: {pi:.0f}")     # Output: 3
\`\`\`

\`\`\`python
# Practical: price display
price = 9.5
print(f"Price: \${price:.2f}")     # Output: Price: $9.50

discount = 0.15
savings = price * discount
final = price - savings
print(f"Original : \${price:.2f}")
print(f"Discount : \${savings:.2f}")
print(f"Final    : \${final:.2f}")
\`\`\`

### Thousand Separators

\`\`\`python
population = 8000000000
salary = 125000
distance = 384400  # km to Moon

print(f"Population : {population:,}")    # Output: Population : 8,000,000,000
print(f"Salary     : \${salary:,}")       # Output: Salary     : $125,000
print(f"Distance   : {distance:,} km")  # Output: Distance   : 384,400 km

# Combine comma and decimal places
price = 1234567.89
print(f"Price: \${price:,.2f}")           # Output: Price: $1,234,567.89
\`\`\`

### Percentage Formatting

\`\`\`python
success_rate = 0.857
completion = 0.1234567

print(f"Success rate: {success_rate:.1%}")    # Output: Success rate: 85.7%
print(f"Completion  : {completion:.2%}")      # Output: Completion  : 12.35%
print(f"Raw percent : {success_rate * 100:.1f}%")  # Output: Raw percent : 85.7%
\`\`\`

### Scientific Notation

\`\`\`python
speed_of_light = 299792458  # meters per second
electron_mass = 9.10938e-31  # kg

print(f"Speed of light: {speed_of_light:e}")    # Output: 2.997925e+08
print(f"Speed of light: {speed_of_light:.3e}")  # Output: 2.998e+08
print(f"Electron mass : {electron_mass:.3e}")   # Output: 9.109e-31
\`\`\`

### Integer Formatting

\`\`\`python
number = 255

print(f"Decimal : {number:d}")    # Output: Decimal : 255
print(f"Binary  : {number:b}")    # Output: Binary  : 11111111
print(f"Octal   : {number:o}")    # Output: Octal   : 377
print(f"Hex     : {number:x}")    # Output: Hex     : ff
print(f"Hex     : {number:X}")    # Output: Hex     : FF
print(f"With 0b : {number:#b}")   # Output: With 0b : 0b11111111
print(f"With 0x : {number:#x}")   # Output: With 0x : 0xff
\`\`\`

## Text Alignment and Padding

\`\`\`
{value:<width}   Left-align, pad with spaces on the right
{value:>width}   Right-align, pad with spaces on the left
{value:^width}   Center, pad with spaces on both sides
{value:fill<width}  Left-align, pad with custom fill character
\`\`\`

\`\`\`python
name = "Alice"

print(f"|{name:<10}|")    # Output: |Alice     |  (left-aligned)
print(f"|{name:>10}|")    # Output: |     Alice|  (right-aligned)
print(f"|{name:^10}|")    # Output: |  Alice   |  (centered)
\`\`\`

\`\`\`python
# Custom fill characters
print(f"|{name:-<10}|")   # Output: |Alice-----|  (dash fill, left)
print(f"|{name:->10}|")   # Output: |-----Alice|  (dash fill, right)
print(f"|{name:-^10}|")   # Output: |--Alice---|  (dash fill, center)
print(f"|{name:*^10}|")   # Output: |**Alice***|  (star fill, center)
\`\`\`

### Building a Table

\`\`\`python
students = [
    ("Alice",   25, "New York",  88.5),
    ("Bob",     30, "London",    92.3),
    ("Charlie", 22, "Paris",     75.0),
    ("Diana",   28, "Tokyo",     95.8),
]

# Header
print(f"{'Name':<12} {'Age':>5} {'City':<12} {'Score':>8}")
print("-" * 42)

# Data rows
for name, age, city, score in students:
    print(f"{name:<12} {age:>5} {city:<12} {score:>7.1f}%")

print("-" * 42)

# Summary
avg = sum(s[3] for s in students) / len(students)
print(f"{'Average':<12} {'':>5} {'':>12} {avg:>7.1f}%")
\`\`\`

Output:
\`\`\`
Name          Age City          Score
------------------------------------------
Alice          25 New York       88.5%
Bob            30 London         92.3%
Charlie        22 Paris          75.0%
Diana          28 Tokyo          95.8%
------------------------------------------
Average                          87.9%
\`\`\`

## Number Padding with Zeros

\`\`\`python
# Pad with zeros (useful for IDs, codes)
number = 42
print(f"{number:05d}")    # Output: 00042
print(f"{number:08d}")    # Output: 00000042
print(f"{number:010d}")   # Output: 0000000042

# Zero-padded float
price = 9.5
print(f"{price:08.2f}")   # Output: 00009.50
\`\`\`

\`\`\`python
# Generating formatted IDs
for i in range(1, 6):
    print(f"Student ID: STU-{i:04d}")
\`\`\`

Output:
\`\`\`
Student ID: STU-0001
Student ID: STU-0002
Student ID: STU-0003
Student ID: STU-0004
Student ID: STU-0005
\`\`\`

## Multi-line f-strings

\`\`\`python
name = "Alice"
age = 25
score = 88.5

# Using triple quotes
profile = f"""
Student Profile
================
Name  : {name}
Age   : {age}
Score : {score:.1f}%
Grade : {'A' if score >= 90 else 'B' if score >= 80 else 'C'}
================
"""
print(profile)
\`\`\`

## Nested f-strings (Python 3.12+)

\`\`\`python
# f-string inside f-string (Python 3.12+)
width = 10
name = "Alice"

# Dynamic width using nested f-string
print(f"{name:>{width}}")    # Output:      Alice
print(f"{name:^{width}}")    # Output:   Alice    (centered in dynamic width)
\`\`\`

## The = Specifier (Debugging)

Python 3.8 added the \`=\` specifier for debugging - prints both the variable name and its value:

\`\`\`python
x = 42
y = 3.14
name = "Alice"

print(f"{x=}")       # Output: x=42
print(f"{y=}")       # Output: y=3.14
print(f"{name=}")    # Output: name='Alice'

# Works with expressions
a, b = 10, 3
print(f"{a + b=}")   # Output: a + b=13
print(f"{a * b=}")   # Output: a * b=30
\`\`\`

## Complete Format Specification Reference

\`\`\`
{value}              Basic - just insert the value
{value:.2f}          Float with 2 decimal places
{value:,}            Add thousand separators
{value:,.2f}         Both: thousand sep + 2 decimals
{value:.1%}          Percentage with 1 decimal
{value:e}            Scientific notation
{value:b}            Binary
{value:o}            Octal
{value:x}            Hexadecimal (lowercase)
{value:X}            Hexadecimal (uppercase)
{value:10}           Right-aligned in 10 chars (strings)
{value:<10}          Left-aligned in 10 chars
{value:>10}          Right-aligned in 10 chars
{value:^10}          Centered in 10 chars
{value:0>10}         Right-aligned, zero-padded
{value:-^10}         Centered, dash-padded
{value:05d}          Integer zero-padded to 5 digits
{value=}             Debug: shows name=value
\`\`\`

## Practical Example: Invoice Generator

\`\`\`python
def generate_invoice(customer, items, tax_rate=0.08):
    subtotal = sum(item["qty"] * item["price"] for item in items)
    tax = subtotal * tax_rate
    total = subtotal + tax
    invoice_id = "INV-2024-0042"

    width = 52
    print(f"{'INVOICE':^{width}}")
    print("=" * width)
    print(f"Invoice #  : {invoice_id}")
    print(f"Customer   : {customer}")
    print(f"Tax Rate   : {tax_rate:.0%}")
    print("=" * width)
    print(f"{'Item':<20} {'Qty':>5} {'Price':>9} {'Total':>10}")
    print("-" * width)

    for item in items:
        item_total = item["qty"] * item["price"]
        print(
            f"{item['name']:<20} "
            f"{item['qty']:>5} "
            f"\${item['price']:>8.2f} "
            f"\${item_total:>9.2f}"
        )

    print("-" * width)
    print(f"{'Subtotal':>36} \${subtotal:>9.2f}")
    print(f"{'Tax':>36} \${tax:>9.2f}")
    print("=" * width)
    print(f"{'TOTAL':>36} \${total:>9.2f}")
    print("=" * width)

items = [
    {"name": "Python Book",    "qty": 2, "price": 39.99},
    {"name": "Mechanical Keyboard", "qty": 1, "price": 89.99},
    {"name": "USB Cable",      "qty": 3, "price": 9.99},
    {"name": "Mouse Pad",      "qty": 1, "price": 14.99},
]

generate_invoice("Alice Johnson", items)
\`\`\`

Output:
\`\`\`
                    INVOICE
====================================================
Invoice #  : INV-2024-0042
Customer   : Alice Johnson
Tax Rate   : 8%
====================================================
Item                  Qty     Price      Total
----------------------------------------------------
Python Book             2    $39.99    $ 79.98
Mechanical Keyboard     1    $89.99    $ 89.99
USB Cable               3    $ 9.99    $ 29.97
Mouse Pad               1    $14.99    $ 14.99
----------------------------------------------------
                              Subtotal $    214.93
                                   Tax $     17.19
====================================================
                                 TOTAL $    232.12
====================================================
\`\`\`

> [!TIP]
> Master the f-string format spec: \`{value:align width .precision type}\`. The most useful combinations are \`:.2f\` (2 decimal places), \`:,\` (thousands separator), \`:.1%\` (percentage), \`:<10\` (left-align), \`:>10\` (right-align), and \`:^10\` (center). These cover almost every formatting need you will encounter.`,
  objectives: [
    "Use f-strings to embed variables and expressions in strings.",
    "Format numbers with decimal places, thousand separators, and percentages.",
    "Align text left, right, and center using f-string format specs.",
    "Use zero-padding for IDs and codes.",
    "Use the = specifier for debugging.",
    "Build formatted tables and reports using f-strings."
  ],
  difficulty: "beginner",
  xpReward: 80,
};