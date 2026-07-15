export const printFormattingLesson = {
  title: "Print Formatting",
  slug: "print-formatting",
  content: `# Print Formatting

When you display information to users, raw \`print()\` statements often are not enough. You want to display values neatly combined with text. Python provides several ways to format output.

## The Theory — Building the Logic

Formatting is really about **building one piece of text out of fixed words and changing values** so the computer composes a readable sentence for the human. Under the hood each method — f-strings, \`.format()\`, or the old \`%\` operator — evaluates the placeholders and stitches the results into a single string before \`print()\` ever sees it. Python does the substitution at the moment the string is created, which means an expression like \`{age + 1}\` is computed and then converted to text, not printed literally. A common pitfall is forgetting that the result is always text: formatted numbers are strings now, so you cannot do math on a value you just formatted without converting it back.

## Basic print() Function

Before diving into formatting, let us review \`print()\` basics:

\`\`\`python
print("Hello, World!")         # Output: Hello, World!
print(42)                       # Output: 42
print(3.14)                     # Output: 3.14
print(True)                     # Output: True

# Print multiple items separated by commas
print("Name:", "Alice", "Age:", 25)  # Output: Name: Alice Age: 25
\`\`\`

### print() Parameters

\`\`\`python
# sep - changes the separator between items (default is a space)
print("Alice", "Bob", "Charlie", sep=", ")
# Output: Alice, Bob, Charlie

print("2024", "01", "15", sep="-")
# Output: 2024-01-15

# end - changes what is printed at the end (default is newline \\n)
print("Hello", end=" ")
print("World")
# Output: Hello World  (on the same line)

print("Loading", end="...")
print("Done")
# Output: Loading...Done
\`\`\`

## Method 1: f-strings (Recommended - Modern Python)

f-strings (formatted string literals) are the most modern and readable way to format strings. You prefix the string with \`f\` and put variable names inside curly braces \`{}\`.

### Basic f-string

\`\`\`python
name = "Alice"
age = 25

print(f"My name is {name} and I am {age} years old.")
# Output: My name is Alice and I am 25 years old.
\`\`\`

### Expressions Inside f-strings

You can put any Python expression inside the curly braces:

\`\`\`python
a = 10
b = 3

print(f"Sum: {a + b}")        # Output: Sum: 13
print(f"Product: {a * b}")    # Output: Product: 30
print(f"Double of a: {a * 2}")# Output: Double of a: 20

name = "alice"
print(f"Hello, {name.upper()}!")  # Output: Hello, ALICE!
\`\`\`

### Number Formatting with f-strings

\`\`\`python
pi = 3.14159265

# Limit decimal places
print(f"Pi is {pi:.2f}")   # Output: Pi is 3.14  (2 decimal places)
print(f"Pi is {pi:.4f}")   # Output: Pi is 3.1416 (4 decimal places)

# Add commas to large numbers
population = 8000000000
print(f"World population: {population:,}")
# Output: World population: 8,000,000,000

# Percentage formatting
score = 0.875
print(f"Score: {score:.1%}")  # Output: Score: 87.5%

# Padding and alignment
name = "Alice"
print(f"{name:>10}")   # Output:      Alice  (right-aligned, 10 chars)
print(f"{name:<10}")   # Output: Alice       (left-aligned, 10 chars)
print(f"{name:^10}")   # Output:   Alice     (centered, 10 chars)
\`\`\`

### Multi-line f-strings

\`\`\`python
name = "Alice"
age = 25
city = "New York"

info = f"""
Name : {name}
Age  : {age}
City : {city}
"""
print(info)
\`\`\`

Output:
\`\`\`
Name : Alice
Age  : 25
City : New York
\`\`\`

## Method 2: .format() Method

The \`.format()\` method is an older but still widely used approach. You put \`{}\` placeholders in the string and pass values to \`.format()\`.

### Basic .format()

\`\`\`python
name = "Alice"
age = 25

print("My name is {} and I am {} years old.".format(name, age))
# Output: My name is Alice and I am 25 years old.
\`\`\`

### Using Index Numbers

\`\`\`python
print("Hello {0}! You are {1} years old.".format("Alice", 25))
# Output: Hello Alice! You are 25 years old.

# You can reuse the same value
print("{0} said hello to {1}. {1} waved at {0}.".format("Alice", "Bob"))
# Output: Alice said hello to Bob. Bob waved at Alice.
\`\`\`

### Using Named Placeholders

\`\`\`python
print("Name: {name}, Age: {age}".format(name="Alice", age=25))
# Output: Name: Alice, Age: 25
\`\`\`

### Number Formatting with .format()

\`\`\`python
pi = 3.14159265

print("Pi is {:.2f}".format(pi))    # Output: Pi is 3.14
print("Pi is {:.4f}".format(pi))    # Output: Pi is 3.1416

price = 19.5
print("Price: \${:.2f}".format(price))  # Output: Price: $19.50
\`\`\`

## Method 3: % Operator (Old Style)

This is the oldest formatting method in Python. You may see it in older code, so it is good to recognize it.

### Basic % Formatting

\`\`\`python
name = "Alice"
age = 25

print("My name is %s and I am %d years old." % (name, age))
# Output: My name is Alice and I am 25 years old.
\`\`\`

### Format Specifiers

\`\`\`
%s  - string
%d  - integer
%f  - float
%r  - raw representation
\`\`\`

\`\`\`python
name = "Alice"
age = 25
gpa = 3.87

print("Name: %s" % name)
# Output: Name: Alice

print("Age: %d" % age)
# Output: Age: 25

print("GPA: %.2f" % gpa)
# Output: GPA: 3.87

print("Name: %s, Age: %d, GPA: %.2f" % (name, age, gpa))
# Output: Name: Alice, Age: 25, GPA: 3.87
\`\`\`

## Comparison: All Three Methods

\`\`\`python
name = "Alice"
age = 25
score = 95.678

# f-string (modern, recommended)
print(f"Name: {name}, Age: {age}, Score: {score:.2f}")

# .format() (older, still good)
print("Name: {}, Age: {}, Score: {:.2f}".format(name, age, score))

# % operator (oldest, avoid in new code)
print("Name: %s, Age: %d, Score: %.2f" % (name, age, score))

# All three produce the same output:
# Name: Alice, Age: 25, Score: 95.68
\`\`\`

## Practical Example: Receipt Printer

\`\`\`python
item1 = "Coffee"
price1 = 4.50
item2 = "Sandwich"
price2 = 8.99
item3 = "Juice"
price3 = 3.25

total = price1 + price2 + price3
tax = total * 0.08

print("=" * 30)
print(f"{'RECEIPT':^30}")
print("=" * 30)
print(f"{item1:<20} \${price1:>6.2f}")
print(f"{item2:<20} \${price2:>6.2f}")
print(f"{item3:<20} \${price3:>6.2f}")
print("-" * 30)
print(f"{'Subtotal':<20} \${total:>6.2f}")
print(f"{'Tax (8%)':<20} \${tax:>6.2f}")
print("=" * 30)
print(f"{'TOTAL':<20} \${total + tax:>6.2f}")
print("=" * 30)
\`\`\`

Output:
\`\`\`
==============================
            RECEIPT           
==============================
Coffee               $  4.50
Sandwich             $  8.99
Juice                $  3.25
------------------------------
Subtotal             $ 16.74
Tax (8%)             $  1.34
==============================
TOTAL                $ 18.08
==============================
\`\`\`

> [!TIP]
> Use f-strings for all new code. They are the most readable and the most powerful. The \`.format()\` and \`%\` methods exist in older Python code and libraries, so you should be able to read them, but prefer f-strings when writing.`,
  objectives: [
    "Use basic print() with sep and end parameters.",
    "Format strings using f-strings (recommended modern approach).",
    "Format strings using the .format() method.",
    "Recognize the % operator formatting style.",
    "Apply number formatting like decimal places, commas, and alignment."
  ],
  difficulty: "beginner",
  xpReward: 70,
};