export const sortedWithKeyLesson = {
  title: "sorted() with key Parameter",
  slug: "sorted-with-key",
  content: `# sorted() with key Parameter

The \`sorted()\` function returns a new sorted list from any iterable. The \`key\` parameter lets you specify a function that extracts a comparison key from each element, enabling custom sort orders without modifying the original data.

## Basic Syntax

\`\`\`python
sorted(iterable, key=None, reverse=False)
\`\`\`

- \`iterable\` — any iterable to sort
- \`key\` — a function that takes one argument and returns a value to sort by
- \`reverse\` — if True, sort in descending order
- Returns a **new list** (original is unchanged)

## Basic Sorting

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers)
print(sorted_nums)   # [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)       # [3, 1, 4, 1, 5, 9, 2, 6] (unchanged)

# Reverse sort
print(sorted(numbers, reverse=True))   # [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

## Sorting with key= Functions

\`\`\`python
words = ["banana", "Apple", "cherry", "date", "Elderberry"]

# Sort by length
by_length = sorted(words, key=len)
print(by_length)   # ['date', 'Apple', 'banana', 'cherry', 'Elderberry']

# Sort alphabetically (case-insensitive)
by_alpha = sorted(words, key=str.lower)
print(by_alpha)   # ['Apple', 'banana', 'cherry', 'date', 'Elderberry']

# Sort by last character
by_last = sorted(words, key=lambda s: s[-1])
print(by_last)   # ['banana', 'Apple', 'date', 'cherry', 'Elderberry']
\`\`\`

## Sorting Dictionaries

\`\`\`python
people = [
    {"name": "Charlie", "age": 30},
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 35},
]

# Sort by age
by_age = sorted(people, key=lambda p: p["age"])
print(by_age)
# [{'name': 'Alice', 'age': 25}, {'name': 'Charlie', 'age': 30}, {'name': 'Bob', 'age': 35}]

# Sort by name
by_name = sorted(people, key=lambda p: p["name"])
print(by_name)
# [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 35}, {'name': 'Charlie', 'age': 30}]

# Sort by age descending
by_age_desc = sorted(people, key=lambda p: p["age"], reverse=True)
print(by_age_desc)
# [{'name': 'Bob', 'age': 35}, {'name': 'Charlie', 'age': 30}, {'name': 'Alice', 'age': 25}]
\`\`\`

## Multiple Sort Criteria

\`\`\`python
students = [
    {"name": "Alice", "grade": "B", "score": 85},
    {"name": "Bob", "grade": "A", "score": 92},
    {"name": "Charlie", "grade": "A", "score": 95},
    {"name": "Diana", "grade": "B", "score": 88},
]

# Sort by grade first, then by score (both ascending)
by_grade_then_score = sorted(students, key=lambda s: (s["grade"], s["score"]))
print([s["name"] for s in by_grade_then_score])
# ['Bob', 'Charlie', 'Alice', 'Diana']

# Sort by grade ascending, then by score descending
# Trick: negate the score for descending on that field
by_grade_asc_score_desc = sorted(students, key=lambda s: (s["grade"], -s["score"]))
print([s["name"] for s in by_grade_asc_score_desc])
# ['Charlie', 'Bob', 'Diana', 'Alice']
\`\`\`

## Sorting with Operator Module

\`\`\`python
from operator import itemgetter, attrgetter

# itemgetter for dicts/lists
people = [
    {"name": "Charlie", "age": 30},
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 35},
]

by_age = sorted(people, key=itemgetter("age"))
print([p["name"] for p in by_age])   # ['Alice', 'Charlie', 'Bob']

# Multiple keys
by_name_age = sorted(people, key=itemgetter("name", "age"))

# attrgetter for objects (with class attributes)
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def __repr__(self):
        return f"{self.name}({self.age})"

people_objs = [Person("Charlie", 30), Person("Alice", 25), Person("Bob", 35)]
by_age = sorted(people_objs, key=attrgetter("age"))
print(by_age)   # [Alice(25), Charlie(30), Bob(35)]
\`\`\`

## Sorting Strings with Custom Logic

\`\`\`python
# Sort by number of vowels
words = ["hello", "world", "beautiful", "python", "programming"]
by_vowels = sorted(words, key=lambda w: sum(1 for c in w.lower() if c in "aeiou"))
print(by_vowels)   # ['world', 'python', 'hello', 'beautiful', 'programming']

# Sort strings by their numeric value
files = ["file10.txt", "file2.txt", "file1.txt", "file20.txt"]
import re
by_number = sorted(files, key=lambda s: int(re.search(r'\d+', s).group()))
print(by_number)   # ['file1.txt', 'file2.txt', 'file10.txt', 'file20.txt']

# Sort by a specific character position
words = ["cat", "bat", "rat", "dog", "fog"]
by_second_char = sorted(words, key=lambda s: s[1])
print(by_second_char)   # ['bat', 'cat', 'rat', 'dog', 'fog']
\`\`\`

## sorted() vs list.sort()

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sorted() — returns a new list, original unchanged
new_list = sorted(numbers)
print(new_list)   # [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)    # [3, 1, 4, 1, 5, 9, 2, 6] (unchanged)

# list.sort() — sorts in-place, returns None
result = numbers.sort()
print(numbers)    # [1, 1, 2, 3, 4, 5, 6, 9] (modified)
print(result)     # None
\`\`\`

> [!NOTE]
> Use \`sorted()\` when you need a new sorted list and want to preserve the original. Use \`list.sort()\` when you want to sort in-place (more memory efficient). \`sorted()\` works on any iterable; \`list.sort()\` only works on lists.

## Stable Sorting

Python's sort is **stable** — elements with equal keys maintain their original relative order.

\`\`\`python
data = [
    ("apple", 1),
    ("banana", 2),
    ("cherry", 1),
    ("date", 2),
]

# Sort by the number; items with same number keep their original order
result = sorted(data, key=lambda x: x[1])
print(result)
# [('apple', 1), ('cherry', 1), ('banana', 2), ('date', 2)]
# Note: apple still comes before cherry (original order preserved)
\`\`\`

## Practical Examples

\`\`\`python
# Sort files by extension, then by name
files = ["report.pdf", "data.csv", "notes.txt", "summary.pdf", "config.csv"]
sorted_files = sorted(files, key=lambda f: (f.split(".")[-1], f))
print(sorted_files)
# ['config.csv', 'data.csv', 'report.pdf', 'summary.pdf', 'notes.txt']

# Sort by absolute value
numbers = [-5, 2, -8, 1, -3, 7]
by_abs = sorted(numbers, key=abs)
print(by_abs)   # [1, 2, -3, -5, 7, -8]

# Sort dates (as strings in YYYY-MM-DD format)
dates = ["2024-03-15", "2023-12-01", "2024-01-10", "2023-11-20"]
sorted_dates = sorted(dates)   # Works because YYYY-MM-DD sorts lexicographically
print(sorted_dates)   # ['2023-11-20', '2023-12-01', '2024-01-10', '2024-03-15']

# Sort by multiple criteria with mixed directions
products = [
    {"name": "Laptop", "price": 999, "rating": 4.5},
    {"name": "Mouse", "price": 25, "rating": 4.8},
    {"name": "Keyboard", "price": 75, "rating": 4.2},
    {"name": "Monitor", "price": 349, "rating": 4.7},
]
# Sort by rating descending, then by price ascending
sorted_products = sorted(products, key=lambda p: (-p["rating"], p["price"]))
print([p["name"] for p in sorted_products])
# ['Mouse', 'Monitor', 'Laptop', 'Keyboard']
\`\`\`

> [!TIP]
> The \`key\` function is called exactly once per element, so it's efficient even for complex key functions. For simple key extraction, \`operator.itemgetter\` and \`operator.attrgetter\` are slightly faster than lambdas.`,
  objectives: [
    "Understand the key parameter in sorted().",
    "Sort data using built-in functions and custom lambdas.",
    "Implement multi-criteria sorting.",
    "Choose between sorted() and list.sort() appropriately.",
    "Use operator.itemgetter and attrgetter for cleaner key functions."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};
