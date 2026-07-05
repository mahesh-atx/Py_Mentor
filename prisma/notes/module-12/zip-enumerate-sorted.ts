export const zipEnumerateSortedLesson = {
  title: "zip(), enumerate() and sorted() with key",
  slug: "zip-enumerate-sorted",
  content: `# zip(), enumerate() and sorted() with key

## zip() - Combine Iterables in Parallel

\`zip(*iterables)\` pairs items from multiple iterables into tuples. It stops at the shortest iterable.

\`\`\`python
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]

# Create pairs
pairs = list(zip(names, scores))
print(pairs)   # [('Alice', 88), ('Bob', 72), ('Charlie', 95)]

# Unpack in a for loop
for name, score in zip(names, scores):
    grade = "Pass" if score >= 60 else "Fail"
    print(f"{name}: {score} ({grade})")
\`\`\`

### zip() with Multiple Iterables

\`\`\`python
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]
cities = ["London", "Paris", "Tokyo"]
ages   = [25, 30, 22]

for name, score, city, age in zip(names, scores, cities, ages):
    print(f"{name} ({age}) from {city}: {score}")
\`\`\`

### Creating Dictionaries with zip()

\`\`\`python
keys   = ["name", "age", "city"]
values = ["Alice", 25, "London"]

person = dict(zip(keys, values))
print(person)   # {'name': 'Alice', 'age': 25, 'city': 'London'}

# Batch create multiple dicts
headers = ["name", "score", "grade"]
rows = [["Alice", 88, "B"], ["Bob", 72, "C"], ["Charlie", 95, "A"]]

students = [dict(zip(headers, row)) for row in rows]
print(students)
\`\`\`

### zip stops at shortest

\`\`\`python
a = [1, 2, 3, 4, 5]
b = [10, 20, 30]

print(list(zip(a, b)))   # [(1, 10), (2, 20), (3, 30)]  - stops at 3

# Use itertools.zip_longest to fill missing values
from itertools import zip_longest
print(list(zip_longest(a, b, fillvalue=0)))
# [(1, 10), (2, 20), (3, 30), (4, 0), (5, 0)]
\`\`\`

### Unzipping with *

\`\`\`python
pairs = [(1, "a"), (2, "b"), (3, "c")]

numbers, letters = zip(*pairs)
print(numbers)   # (1, 2, 3)
print(letters)   # ('a', 'b', 'c')

# Transpose a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = list(zip(*matrix))
print(transposed)
# [(1, 4, 7), (2, 5, 8), (3, 6, 9)]
\`\`\`

## enumerate() - Index + Value

\`enumerate(iterable, start=0)\` adds a counter to each item.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Default (starts at 0)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple, 1: banana, 2: cherry

# Custom start
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple, 2. banana, 3. cherry
\`\`\`

### enumerate() in Practice

\`\`\`python
# Find index of first matching item
fruits = ["apple", "banana", "cherry", "mango"]
target = "cherry"
found_index = next((i for i, f in enumerate(fruits) if f == target), -1)
print(found_index)   # 2

# Number lines of text
text = """Line one
Line two
Line three"""

for line_num, line in enumerate(text.splitlines(), start=1):
    print(f"{line_num:3}: {line}")

# Create indexed dictionary
indexed = {i: item for i, item in enumerate(fruits)}
print(indexed)   # {0: 'apple', 1: 'banana', 2: 'cherry', 3: 'mango'}

# Modify items by index using enumerate
prices = [10.0, 25.0, 8.5]
for i, price in enumerate(prices):
    prices[i] = round(price * 1.1, 2)   # 10% increase
print(prices)   # [11.0, 27.5, 9.35]
\`\`\`

## sorted() with key Parameter

\`sorted(iterable, key=None, reverse=False)\` returns a new sorted list. The \`key\` function extracts a comparison value from each item.

### Basic sorted()

\`\`\`python
# Simple list
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(numbers))            # [1, 1, 2, 3, 4, 5, 6, 9]
print(sorted(numbers, reverse=True))  # [9, 6, 5, 4, 3, 2, 1, 1]

# Strings (alphabetical)
words = ["banana", "Apple", "cherry", "date"]
print(sorted(words))                          # ['Apple', 'banana', 'cherry', 'date']
print(sorted(words, key=str.lower))           # ['Apple', 'banana', 'cherry', 'date']
print(sorted(words, key=str.casefold))        # case-insensitive

# Original unchanged
original = [3, 1, 4]
sorted_copy = sorted(original)
print(original)      # [3, 1, 4]  (unchanged)
print(sorted_copy)   # [1, 3, 4]
\`\`\`

### sorted() with Lambda Key

\`\`\`python
# Sort by length
words = ["banana", "fig", "apple", "kiwi", "cherry"]
print(sorted(words, key=len))   # ['fig', 'kiwi', 'apple', 'banana', 'cherry']

# Sort by last character
print(sorted(words, key=lambda w: w[-1]))   # by last char

# Sort by length then alphabetically (multi-key)
print(sorted(words, key=lambda w: (len(w), w)))

# Sort by absolute value
numbers = [-5, 3, -2, 8, -1, 4]
print(sorted(numbers, key=abs))   # [-1, -2, 3, 4, -5, 8]
\`\`\`

### Sorting Complex Objects

\`\`\`python
students = [
    {"name": "Charlie", "score": 72, "age": 22},
    {"name": "Alice",   "score": 88, "age": 25},
    {"name": "Bob",     "score": 88, "age": 20},
    {"name": "Diana",   "score": 95, "age": 23},
]

# Sort by single field
by_score = sorted(students, key=lambda s: s["score"])
print([s["name"] for s in by_score])
# ['Charlie', 'Alice', 'Bob', 'Diana']

# Sort by score descending, then by name ascending
by_score_name = sorted(students, key=lambda s: (-s["score"], s["name"]))
print([f"{s['name']}({s['score']})" for s in by_score_name])
# ['Diana(95)', 'Alice(88)', 'Bob(88)', 'Charlie(72)']

# Sort by age
by_age = sorted(students, key=lambda s: s["age"])
print([f"{s['name']}({s['age']})" for s in by_age])
# ['Bob(20)', 'Charlie(22)', 'Diana(23)', 'Alice(25)']
\`\`\`

### Using operator.attrgetter and operator.itemgetter

\`\`\`python
from operator import itemgetter, attrgetter

students = [
    {"name": "Charlie", "score": 72},
    {"name": "Alice",   "score": 88},
    {"name": "Bob",     "score": 88},
]

# itemgetter is faster than lambda for dict access
by_name = sorted(students, key=itemgetter("name"))
by_score = sorted(students, key=itemgetter("score"), reverse=True)

# Multiple keys with itemgetter
by_score_name = sorted(students, key=itemgetter("score", "name"))

# attrgetter works with objects (attributes)
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def __repr__(self):
        return f"Student({self.name}, {self.score})"

student_objects = [Student("Charlie", 72), Student("Alice", 88), Student("Bob", 72)]
print(sorted(student_objects, key=attrgetter("score", "name")))
\`\`\`

## Practical Example: Student Ranking System

\`\`\`python
students = [
    {"name": "Alice",   "math": 88, "science": 92, "english": 85},
    {"name": "Bob",     "math": 72, "science": 68, "english": 79},
    {"name": "Charlie", "math": 95, "science": 91, "english": 98},
    {"name": "Diana",   "math": 61, "science": 74, "english": 66},
    {"name": "Eve",     "math": 88, "science": 82, "english": 90},
]

# Add average score to each student
for student in students:
    scores = [student["math"], student["science"], student["english"]]
    student["average"] = sum(scores) / len(scores)

# Rank by average descending, then name
ranked = sorted(students, key=lambda s: (-s["average"], s["name"]))

# Display with enumerate
print(f"{'Rank':<5} {'Name':<10} {'Math':>6} {'Sci':>5} {'Eng':>5} {'Avg':>7}")
print("=" * 45)
for rank, s in enumerate(ranked, 1):
    print(f"{rank:<5} {s['name']:<10} {s['math']:>6} {s['science']:>5} {s['english']:>5} {s['average']:>7.1f}")
\`\`\`

Output:
\`\`\`
Rank  Name        Math   Sci   Eng     Avg
=============================================
1     Charlie       95    91    98    94.7
2     Alice         88    92    85    88.3
3     Eve           88    82    90    86.7
4     Bob           72    68    79    73.0
5     Diana         61    74    66    67.0
\`\`\`

> [!TIP]
> Use \`zip()\` to iterate multiple sequences in parallel. Use \`enumerate()\` whenever you need both index and value. Use \`sorted()\` with a \`key\` function for complex sorting - return a tuple as the key for multi-level sorting where the first element is primary, second is secondary, etc.`,
  objectives: [
    "Use zip() to pair items from multiple iterables.",
    "Use enumerate() to get index and value simultaneously.",
    "Use sorted() with the key parameter for custom ordering.",
    "Sort by multiple criteria using tuples as sort keys.",
    "Use operator.itemgetter for efficient dictionary sorting."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};