export const enumerateFunctionLesson = {
  title: "enumerate() Function",
  slug: "enumerate-function",
  content: `# enumerate() Function

The \`enumerate()\` function adds a counter to an iterable and returns it as an enumerate object. It's the Pythonic way to iterate over a sequence when you need both the index and the value.

## Basic Syntax

\`\`\`python
enumerate(iterable, start=0)
\`\`\`

- \`iterable\` — the sequence to enumerate
- \`start\` — the starting index (default: 0)
- Returns an **enumerate object** (iterator) — wrap in \`list()\` to see results

## Basic Usage

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: cherry
\`\`\`

## Custom Start Value

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# Output:
# 1. apple
# 2. banana
# 3. cherry
\`\`\`

## Why enumerate() Instead of range(len())?

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# ❌ Non-Pythonic approach
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# ✅ Pythonic approach with enumerate()
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
\`\`\`

> [!TIP]
> Always prefer \`enumerate()\` over \`range(len(...))\` when you need both index and value. It's more readable, more Pythonic, and works with any iterable (not just sequences).

## Converting enumerate() to a List

\`\`\`python
fruits = ["apple", "banana", "cherry"]

indexed_fruits = list(enumerate(fruits))
print(indexed_fruits)   # [(0, 'apple'), (1, 'banana'), (2, 'cherry')]

indexed_fruits = list(enumerate(fruits, start=1))
print(indexed_fruits)   # [(1, 'apple'), (2, 'banana'), (3, 'cherry')]
\`\`\`

## Converting enumerate() to a Dictionary

\`\`\`python
fruits = ["apple", "banana", "cherry"]

fruit_dict = dict(enumerate(fruits))
print(fruit_dict)   # {0: 'apple', 1: 'banana', 2: 'cherry'}

fruit_dict = dict(enumerate(fruits, start=1))
print(fruit_dict)   # {1: 'apple', 2: 'banana', 3: 'cherry'}
\`\`\`

## Practical Examples

\`\`\`python
# Find positions of matching items
words = ["hello", "world", "hello", "python", "hello"]
hello_positions = [i for i, w in enumerate(words) if w == "hello"]
print(hello_positions)   # [0, 2, 4]

# Numbered menu display
menu = ["Burger", "Pizza", "Salad", "Pasta"]
print("MENU:")
for num, item in enumerate(menu, start=1):
    print(f"  {num}. {item}")

# Track line numbers while processing
lines = ["First line", "Second line", "Third line"]
for line_num, content in enumerate(lines, start=1):
    print(f"Line {line_num}: {content}")

# Modify a list based on index
numbers = [10, 20, 30, 40, 50]
for i, num in enumerate(numbers):
    numbers[i] = num * i
print(numbers)   # [0, 20, 60, 120, 200]

# Find the index of the maximum value
scores = [85, 92, 78, 95, 88]
max_index, max_value = max(enumerate(scores), key=lambda x: x[1])
print(f"Max score {max_value} at index {max_index}")   # Max score 95 at index 3
\`\`\`

## enumerate() with Strings

\`\`\`python
text = "Python"

for i, char in enumerate(text):
    print(f"Index {i}: '{char}'")

# Output:
# Index 0: 'P'
# Index 1: 'y'
# Index 2: 't'
# Index 3: 'h'
# Index 4: 'o'
# Index 5: 'n'
\`\`\`

## enumerate() with Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

for i, (key, value) in enumerate(person.items()):
    print(f"{i}: {key} = {value}")

# Output:
# 0: name = Alice
# 1: age = 25
# 2: city = New York
\`\`\`

## enumerate() with zip()

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Combine enumerate with zip for indexed parallel iteration
for i, (name, score) in enumerate(zip(names, scores)):
    print(f"{i}: {name} scored {score}")

# Output:
# 0: Alice scored 85
# 1: Bob scored 92
# 2: Charlie scored 78
\`\`\`

## enumerate() with Conditional Start

\`\`\`python
# Different starting indices for different use cases

# 0-based for array access
for i, val in enumerate([10, 20, 30]):
    print(f"Index {i}: {val}")

# 1-based for user-facing numbering
for i, val in enumerate([10, 20, 30], start=1):
    print(f"Item {i}: {val}")

# Custom start for specific requirements
for i, val in enumerate([10, 20, 30], start=100):
    print(f"ID-{i}: {val}")
\`\`\`

> [!TIP]
> \`enumerate()\` is one of Python's most useful built-ins. Use it whenever you find yourself writing \`range(len(...))\` or maintaining a manual counter variable.`,
  objectives: [
    "Understand the purpose and syntax of enumerate().",
    "Use enumerate() with custom start values.",
    "Replace range(len()) patterns with enumerate().",
    "Combine enumerate() with zip(), dict(), and list comprehensions."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
