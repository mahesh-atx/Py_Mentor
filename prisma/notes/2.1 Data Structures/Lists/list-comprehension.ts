export const listComprehensionLesson = {
  title: "List Comprehension",
  slug: "list-comprehension",
  content: `# List Comprehension

List comprehension is a concise, readable way to create lists. Instead of writing a \`for\` loop to build a list, you can do it in a single line.

## The Problem List Comprehension Solves

\`\`\`python
# Traditional approach - 4 lines
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)   # Output: [1, 4, 9, 16, 25]

# List comprehension - 1 line
squares = [i ** 2 for i in range(1, 6)]
print(squares)   # Output: [1, 4, 9, 16, 25]
\`\`\`

## Basic Syntax

\`\`\`python
new_list = [expression for item in iterable]
\`\`\`

Reading it: "For each \`item\` in \`iterable\`, compute \`expression\` and put the result in the list."

## Basic Examples

\`\`\`python
# Squares of 1 to 10
squares = [x ** 2 for x in range(1, 11)]
print(squares)
# Output: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Double each number
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(doubled)   # Output: [2, 4, 6, 8, 10]

# Convert strings to uppercase
fruits = ["apple", "banana", "cherry"]
upper_fruits = [f.upper() for f in fruits]
print(upper_fruits)   # Output: ['APPLE', 'BANANA', 'CHERRY']

# Get lengths of words
words = ["hello", "world", "python"]
lengths = [len(w) for w in words]
print(lengths)   # Output: [5, 5, 6]
\`\`\`

## With a Condition (Filtering)

Add an \`if\` clause to filter items:

\`\`\`python
new_list = [expression for item in iterable if condition]
\`\`\`

\`\`\`python
# Only even numbers
evens = [x for x in range(1, 11) if x % 2 == 0]
print(evens)   # Output: [2, 4, 6, 8, 10]

# Only positive numbers
numbers = [-3, -1, 0, 2, 5, -2, 8]
positives = [n for n in numbers if n > 0]
print(positives)   # Output: [2, 5, 8]

# Words longer than 4 characters
words = ["hi", "hello", "python", "is", "great"]
long_words = [w for w in words if len(w) > 4]
print(long_words)   # Output: ['hello', 'python', 'great']

# Filter and transform together
scores = [85, 42, 92, 58, 78, 35, 90]
passing_doubled = [s * 2 for s in scores if s >= 50]
print(passing_doubled)   # Output: [170, 184, 156, 180]
\`\`\`

## With if-else (Transformation, Not Filtering)

\`\`\`python
new_list = [value_if_true if condition else value_if_false for item in iterable]
\`\`\`

\`\`\`python
# Label each number as even or odd
numbers = [1, 2, 3, 4, 5, 6]
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labels)   # Output: ['odd', 'even', 'odd', 'even', 'odd', 'even']

# Pass or Fail
scores = [85, 42, 92, 58, 78]
results = ["Pass" if s >= 60 else "Fail" for s in scores]
print(results)   # Output: ['Pass', 'Fail', 'Pass', 'Fail', 'Pass']

# Replace negatives with 0 (clamp)
values = [-5, 3, -1, 8, -2, 6]
clamped = [v if v >= 0 else 0 for v in values]
print(clamped)   # Output: [0, 3, 0, 8, 0, 6]
\`\`\`

## Nested List Comprehension

You can nest comprehensions for working with 2D data:

\`\`\`python
# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [item for row in matrix for item in row]
print(flat)   # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create a 3x3 multiplication table as a 2D list
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
for row in table:
    print(row)
# Output:
# [1, 2, 3]
# [2, 4, 6]
# [3, 6, 9]
\`\`\`

## List Comprehension vs for Loop - When to Use Which

\`\`\`python
# List comprehension is ideal for:
# 1. Simple transformations
doubled = [x * 2 for x in range(10)]

# 2. Simple filtering
evens = [x for x in range(20) if x % 2 == 0]

# 3. Combining transform and filter
result = [x ** 2 for x in range(10) if x % 2 == 0]

# Use a regular for loop when:
# - The logic is complex (multiple conditions, nested logic)
# - You need to do something other than build a list (print, update, etc.)
# - The comprehension would be hard to read

# Too complex for comprehension - use a for loop
result = []
for x in range(20):
    if x % 2 == 0:
        if x % 3 == 0:
            result.append(x * 10)
        else:
            result.append(x * 2)
\`\`\`

## Practical Examples

### String Processing

\`\`\`python
# Extract first letter of each word
words = ["Python", "is", "Amazing"]
initials = [w[0] for w in words]
print(initials)   # Output: ['P', 'i', 'A']
print(".".join(initials) + ".")   # Output: P.i.A.

# Clean up a list of strings
raw = ["  alice ", "BOB  ", "  charlie"]
clean = [name.strip().title() for name in raw]
print(clean)   # Output: ['Alice', 'Bob', 'Charlie']
\`\`\`

### Number Processing

\`\`\`python
# Celsius to Fahrenheit conversion
celsius_temps = [0, 10, 20, 30, 37, 100]
fahrenheit = [(c * 9/5) + 32 for c in celsius_temps]
print(fahrenheit)   # Output: [32.0, 50.0, 68.0, 86.0, 98.6, 212.0]

# Grade converter
scores = [88, 72, 95, 61, 84, 55, 90]
grades = [
    "A" if s >= 90 else
    "B" if s >= 80 else
    "C" if s >= 70 else
    "D" if s >= 60 else "F"
    for s in scores
]
print(grades)   # Output: ['B', 'C', 'A', 'D', 'B', 'F', 'A']
\`\`\`

### Filtering

\`\`\`python
# Filter emails by domain
emails = [
    "alice@gmail.com",
    "bob@yahoo.com",
    "charlie@gmail.com",
    "diana@outlook.com",
    "eve@gmail.com"
]

gmail_users = [e.split("@")[0] for e in emails if e.endswith("@gmail.com")]
print(gmail_users)   # Output: ['alice', 'charlie', 'eve']
\`\`\`

## Complete Example: Student Report

\`\`\`python
students = [
    {"name": "Alice",   "score": 88},
    {"name": "Bob",     "score": 45},
    {"name": "Charlie", "score": 92},
    {"name": "Diana",   "score": 67},
    {"name": "Eve",     "score": 55},
]

# Extract just names
names = [s["name"] for s in students]

# Get passing students (score >= 60)
passing = [s["name"] for s in students if s["score"] >= 60]

# Get scores and categorize
categories = [
    f"{s['name']}: {'Pass' if s['score'] >= 60 else 'Fail'}"
    for s in students
]

# Normalize scores to percentage strings
percentages = [f"{s['score']}%" for s in students]

print(f"All students  : {names}")
print(f"Passing       : {passing}")
print(f"Results       : {categories}")
print(f"Scores        : {percentages}")
\`\`\`

Output:
\`\`\`
All students  : ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
Passing       : ['Alice', 'Charlie', 'Diana']
Results       : ['Alice: Pass', 'Bob: Fail', 'Charlie: Pass', 'Diana: Pass', 'Eve: Fail']
Scores        : ['88%', '45%', '92%', '67%', '55%']
\`\`\`

> [!TIP]
> List comprehension is one of Python's most powerful and Pythonic features. Use it when the logic is simple and the result is a new list. If the comprehension is getting longer than one line or hard to read, switch to a regular for loop. Readability always wins over cleverness.`,
  objectives: [
    "Write basic list comprehensions to transform a list.",
    "Add a condition to filter items using if in a comprehension.",
    "Use if-else inside a comprehension for transformation (not filtering).",
    "Understand when to use a comprehension vs a for loop.",
    "Apply list comprehension to real-world text and number processing."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};