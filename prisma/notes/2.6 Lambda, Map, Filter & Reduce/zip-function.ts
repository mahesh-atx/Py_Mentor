export const zipFunctionLesson = {
  title: "zip() Function",
  slug: "zip-function",
  content: `# zip() Function

The \`zip()\` function pairs elements from multiple iterables together, creating tuples of corresponding items. It's the go-to tool for iterating over multiple sequences in parallel.

## Basic Syntax

\`\`\`python
zip(*iterables, strict=False)
\`\`\`

- \`*iterables\` — two or more sequences to combine
- \`strict\` (Python 3.10+) — if True, raises ValueError when iterables have different lengths
- Returns a **zip object** (iterator) — wrap in \`list()\`, \`dict()\`, etc. to see results

## Basic zip() Usage

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

paired = list(zip(names, ages))
print(paired)   # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
\`\`\`

## zip() with Multiple Iterables

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["New York", "London", "Paris"]

combined = list(zip(names, ages, cities))
print(combined)
# [('Alice', 25, 'New York'), ('Bob', 30, 'London'), ('Charlie', 35, 'Paris')]
\`\`\`

## zip() Stops at the Shortest Iterable

\`\`\`python
a = [1, 2, 3, 4, 5]
b = ["a", "b", "c"]

result = list(zip(a, b))
print(result)   # [(1, 'a'), (2, 'b'), (3, 'c')]
# Elements 4 and 5 are ignored!
\`\`\`

## zip() with strict=True (Python 3.10+)

\`\`\`python
a = [1, 2, 3, 4]
b = ["a", "b", "c"]

try:
    result = list(zip(a, b, strict=True))
except ValueError as e:
    print(f"Error: {e}")   # zip() argument 2 is shorter than argument 1
\`\`\`

## Unzipping with zip(*)

You can "unzip" a list of tuples back into separate sequences using the \`*\` operator:

\`\`\`python
pairs = [('Alice', 25), ('Bob', 30), ('Charlie', 35)]

names, ages = zip(*pairs)
print(names)   # ('Alice', 'Bob', 'Charlie')
print(ages)    # (25, 30, 35)
\`\`\`

## Converting zip() to a Dictionary

\`\`\`python
keys = ["name", "age", "city"]
values = ["Alice", 25, "New York"]

person = dict(zip(keys, values))
print(person)   # {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

## Practical Examples

\`\`\`python
# Combine and process parallel data
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Create a score lookup
score_dict = dict(zip(names, scores))
print(score_dict)   # {'Alice': 85, 'Bob': 92, 'Charlie': 78}

# Iterate over multiple lists simultaneously
for name, score in zip(names, scores):
    status = "Pass" if score >= 80 else "Fail"
    print(f"{name}: {score} ({status})")

# Transpose a matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
transposed = list(zip(*matrix))
print(transposed)   # [(1, 4, 7), (2, 5, 8), (3, 6, 9)]

# Calculate element-wise sums
a = [1, 2, 3]
b = [10, 20, 30]
c = [100, 200, 300]

sums = [x + y + z for x, y, z in zip(a, b, c)]
print(sums)   # [111, 222, 333]

# Create numbered items (like enumerate)
items = ["apple", "banana", "cherry"]
numbered = list(zip(range(1, len(items) + 1), items))
print(numbered)   # [(1, 'apple'), (2, 'banana'), (3, 'cherry')]

# Pair consecutive elements
data = [1, 2, 3, 4, 5, 6]
pairs = list(zip(data, data[1:]))
print(pairs)   # [(1, 2), (2, 3), (3, 4), (4, 5), (5, 6)]
\`\`\`

## zip() vs enumerate()

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# enumerate() — index + value
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# zip() with range — equivalent but more verbose
for i, fruit in zip(range(len(fruits)), fruits):
    print(f"{i}: {fruit}")

# enumerate() is preferred for index + value iteration
\`\`\`

## zip() with itertools.zip_longest

When you need to handle unequal lengths without truncating:

\`\`\`python
from itertools import zip_longest

a = [1, 2, 3, 4, 5]
b = ["a", "b", "c"]

# zip_longest fills missing values with fillvalue (default: None)
result = list(zip_longest(a, b))
print(result)   # [(1, 'a'), (2, 'b'), (3, 'c'), (4, None), (5, None)]

# With a custom fillvalue
result = list(zip_longest(a, b, fillvalue="N/A"))
print(result)   # [(1, 'a'), (2, 'b'), (3, 'c'), (4, 'N/A'), (5, 'N/A')]
\`\`\`

> [!TIP]
> Use \`zip()\` for parallel iteration over multiple sequences. Use \`itertools.zip_longest()\` when you need to process all elements of unequal-length iterables.`,
  objectives: [
    "Understand the purpose and syntax of zip().",
    "Pair elements from multiple iterables.",
    "Convert zip() output to dictionaries and other structures.",
    "Unzip sequences using zip(*...).",
    "Use zip() for parallel iteration in real-world scenarios."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
