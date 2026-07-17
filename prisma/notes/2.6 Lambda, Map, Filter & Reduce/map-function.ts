export const mapFunctionLesson = {
  title: "map() Function",
  slug: "map-function",
  content: `# map() Function

The \`map()\` function applies a given function to every item of an iterable and returns an iterator of the results. It's the functional-programming alternative to writing an explicit loop when you want to transform every element.

## Basic Syntax

\`\`\`python
map(function, iterable, ...)
\`\`\`

- \`function\` — applied to each item (can be a regular function, lambda, or built-in)
- \`iterable\` — one or more sequences to process
- Returns a **map object** (iterator) — wrap in \`list()\`, \`tuple()\`, etc. to see results

## map() with a Regular Function

\`\`\`python
def square(n):
    return n ** 2

numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
print(squared)   # [1, 4, 9, 16, 25]
\`\`\`

## map() with a Lambda

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Double each number
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)   # [2, 4, 6, 8, 10]

# Convert to strings
as_strings = list(map(lambda x: f"num-{x}", numbers))
print(as_strings)   # ['num-1', 'num-2', 'num-3', 'num-4', 'num-5']
\`\`\`

## map() with Built-in Functions

\`\`\`python
# str() on each element
nums = [1, 2, 3]
print(list(map(str, nums)))   # ['1', '2', '3']

# len() on each string
words = ["apple", "banana", "cherry"]
print(list(map(len, words)))  # [5, 6, 6]

# abs() on each number
values = [-1, 5, -3, 0, -8]
print(list(map(abs, values))) # [1, 5, 3, 0, 8]
\`\`\`

## map() with Multiple Iterables

When you pass multiple iterables, \`map()\` takes one item from each and passes them as separate arguments to the function. Stops at the shortest iterable.

\`\`\`python
a = [1, 2, 3]
b = [10, 20, 30]

# Add corresponding elements
sums = list(map(lambda x, y: x + y, a, b))
print(sums)   # [11, 22, 33]

# Multiply corresponding elements
products = list(map(lambda x, y: x * y, a, b))
print(products)   # [10, 40, 90]

# Three iterables at once
c = [100, 200, 300]
result = list(map(lambda x, y, z: x + y + z, a, b, c))
print(result)   # [111, 222, 333]

# Different lengths — stops at shortest
a = [1, 2, 3, 4, 5]
b = [10, 20]
print(list(map(lambda x, y: x + y, a, b)))   # [11, 22]
\`\`\`

## map() vs List Comprehension

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Using map
squares_map = list(map(lambda x: x ** 2, numbers))

# Using list comprehension (often preferred for readability)
squares_comp = [x ** 2 for x in numbers]

print(squares_map)    # [1, 4, 9, 16, 25]
print(squares_comp)   # [1, 4, 9, 16, 25]
\`\`\`

> [!NOTE]
> List comprehensions are generally preferred in Python for simple transformations because they're more readable. Use \`map()\` when you already have a function defined, or when working with functional programming patterns.

## Practical Examples

\`\`\`python
# Convert Celsius to Fahrenheit for a list of temperatures
celsius = [0, 10, 20, 30, 40, 100]
fahrenheit = list(map(lambda c: (c * 9/5) + 32, celsius))
print(fahrenheit)   # [32.0, 50.0, 68.0, 86.0, 104.0, 212.0]

# Title-case a list of names
names = ["alice smith", "bob jones", "charlie brown"]
title_names = list(map(lambda s: s.title(), names))
print(title_names)   # ['Alice Smith', 'Bob Jones', 'Charlie Brown']

# Extract specific fields from a list of dicts
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35},
]
names_only = list(map(lambda u: u["name"], users))
print(names_only)   # ['Alice', 'Bob', 'Charlie']

# Parse a list of numeric strings
raw = ["10", "20", "30", "40"]
integers = list(map(int, raw))
print(integers)   # [10, 20, 30, 40]
\`\`\`

## Chaining map() Calls

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# First square, then convert to string
result = list(map(str, map(lambda x: x ** 2, numbers)))
print(result)   # ['1', '4', '9', '16', '25']

# Equivalent with a single map (preferred)
result = list(map(lambda x: str(x ** 2), numbers))
\`\`\`

> [!TIP]
> \`map()\` returns a lazy iterator, so it's memory-efficient for large datasets. The transformation only happens when you iterate over the result (e.g., by converting to a list).`,
  objectives: [
    "Understand the purpose and syntax of map().",
    "Apply map() with regular functions, lambdas, and built-in functions.",
    "Use map() with multiple iterables.",
    "Choose appropriately between map() and list comprehensions."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
