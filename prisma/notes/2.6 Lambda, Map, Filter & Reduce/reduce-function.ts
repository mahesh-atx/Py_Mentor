export const reduceFunctionLesson = {
  title: "reduce() Function (from functools)",
  slug: "reduce-function",
  content: `# reduce() Function

The \`reduce()\` function (from the \`functools\` module) applies a function of two arguments cumulatively to the items of an iterable, reducing the iterable to a **single value**. It's the functional-programming tool for aggregation operations.

## Basic Syntax

\`\`\`python
from functools import reduce

reduce(function, iterable, initializer=None)
\`\`\`

- \`function\` — takes two arguments: the accumulated value and the next item
- \`iterable\` — the sequence to reduce
- \`initializer\` (optional) — starting value; if provided, the function starts with initializer and the first item
- Returns a single accumulated value

## How reduce() Works

\`\`\`python
from functools import reduce

# reduce(lambda acc, x: acc + x, [1, 2, 3, 4, 5])
# Step 1: acc=1, x=2 → 1+2 = 3
# Step 2: acc=3, x=3 → 3+3 = 6
# Step 3: acc=6, x=4 → 6+4 = 10
# Step 4: acc=10, x=5 → 10+5 = 15
# Result: 15
\`\`\`

## Basic Examples

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all elements
total = reduce(lambda acc, x: acc + x, numbers)
print(total)   # 15

# Product of all elements
product = reduce(lambda acc, x: acc * x, numbers)
print(product)   # 120

# Find maximum
maximum = reduce(lambda acc, x: acc if acc > x else x, numbers)
print(maximum)   # 5

# Find minimum
minimum = reduce(lambda acc, x: acc if acc < x else x, numbers)
print(minimum)   # 1
\`\`\`

## reduce() with an Initializer

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum starting from 100
total = reduce(lambda acc, x: acc + x, numbers, 100)
print(total)   # 115

# Product starting from 2
product = reduce(lambda acc, x: acc * x, numbers, 2)
print(product)   # 240

# Concatenate with a starting string
words = ["world", "!", " Goodbye"]
greeting = reduce(lambda acc, x: acc + " " + x, words, "Hello")
print(greeting)   # Hello world !  Goodbye
\`\`\`

## reduce() vs Built-in Alternatives

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum — built-in is preferred
total_reduce = reduce(lambda acc, x: acc + x, numbers)
total_builtin = sum(numbers)

# Max — built-in is preferred
max_reduce = reduce(lambda acc, x: acc if acc > x else x, numbers)
max_builtin = max(numbers)

# Any — built-in is preferred
any_reduce = reduce(lambda acc, x: acc or x, [False, False, True, False])
any_builtin = any([False, False, True, False])

# All — built-in is preferred
all_reduce = reduce(lambda acc, x: acc and x, [True, True, False, True])
all_builtin = all([True, True, False, True])
\`\`\`

> [!NOTE]
> For common aggregations (sum, max, min, any, all), Python's built-in functions are preferred because they're more readable, faster, and handle edge cases better. Use \`reduce()\` when the aggregation logic is custom.

## Practical Examples

\`\`\`python
from functools import reduce

# Flatten a list of lists
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, x: acc + x, nested)
print(flat)   # [1, 2, 3, 4, 5, 6]

# Count occurrences (build a frequency dict)
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = reduce(lambda d, w: {**d, w: d.get(w, 0) + 1}, words, {})
print(freq)   # {'apple': 3, 'banana': 2, 'cherry': 1}

# Find the longest word
words = ["apple", "banana", "cherry", "watermelon", "fig"]
longest = reduce(lambda a, b: a if len(a) >= len(b) else b, words)
print(longest)   # watermelon

# Compose a list of functions
from math import sin, cos, sqrt

def compose(f, g):
    return lambda x: f(g(x))

functions = [lambda x: x + 1, lambda x: x * 2, lambda x: x ** 2]
composed = reduce(compose, functions)
# composed(x) = (x^2) * 2 + 1
print(composed(3))   # (3^2)*2 + 1 = 19

# Calculate factorial
n = 5
factorial = reduce(lambda acc, x: acc * x, range(1, n + 1), 1)
print(factorial)   # 120
\`\`\`

## reduce() with Empty Iterables

\`\`\`python
from functools import reduce

# Without initializer on empty iterable — raises TypeError
try:
    result = reduce(lambda acc, x: acc + x, [])
except TypeError as e:
    print(f"Error: {e}")

# With initializer on empty iterable — returns the initializer
result = reduce(lambda acc, x: acc + x, [], 0)
print(result)   # 0

result = reduce(lambda acc, x: acc * x, [], 1)
print(result)   # 1
\`\`\`

> [!WARNING]
> Always provide an \`initializer\` when the iterable might be empty, or when you need a specific starting value. Without it, \`reduce()\` raises \`TypeError\` on an empty iterable.

## When to Use reduce()

\`\`\`python
from functools import reduce

# Good use cases for reduce():
# 1. Custom aggregation not covered by built-ins
# 2. Building up a complex data structure from a sequence
# 3. Function composition
# 4. Flattening nested structures

# Example: Calculate compound interest
rates = [0.05, 0.03, 0.04, 0.02]  # Annual rates over 4 years
principal = 1000
final_amount = reduce(lambda acc, rate: acc * (1 + rate), rates, principal)
print(f"Final amount: \${final_amount:.2f}")   # $1147.21

# Example: Build a nested dictionary from a key path
keys = ["user", "profile", "name"]
value = "Alice"
nested = reduce(lambda v, k: {k: v}, reversed(keys), value)
print(nested)   # {'user': {'profile': {'name': 'Alice'}}}
\`\`\`

> [!TIP]
> \`reduce()\` is powerful but can hurt readability. If a loop or built-in function expresses the same logic more clearly, prefer that. The Zen of Python says "Readability counts."`,
  objectives: [
    "Understand the purpose and mechanics of reduce().",
    "Use reduce() with and without an initializer.",
    "Recognize when built-in functions are preferable to reduce().",
    "Apply reduce() for custom aggregations and data transformations."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};
