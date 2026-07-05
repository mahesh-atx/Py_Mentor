export const mapFilterReduceLesson = {
  title: "map(), filter() and reduce()",
  slug: "map-filter-reduce",
  content: `# map(), filter() and reduce()

These three functions are the core of functional programming in Python. They allow you to transform, select, and accumulate data without explicit loops.

## map() - Transform Every Item

\`map(function, iterable)\` applies a function to every item and returns a map object (lazy iterator).

\`\`\`python
# Syntax: map(function, iterable)
numbers = [1, 2, 3, 4, 5]

# With lambda
squared = list(map(lambda x: x ** 2, numbers))
print(squared)   # [1, 4, 9, 16, 25]

# With a regular function
def double(x):
    return x * 2

doubled = list(map(double, numbers))
print(doubled)   # [2, 4, 6, 8, 10]

# With built-in functions
strings = ["42", "17", "100", "8"]
integers = list(map(int, strings))
print(integers)  # [42, 17, 100, 8]

words = ["hello", "world", "python"]
upper = list(map(str.upper, words))
print(upper)     # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

### map() with Multiple Iterables

\`\`\`python
# Apply function to corresponding items from multiple iterables
a = [1, 2, 3, 4, 5]
b = [10, 20, 30, 40, 50]

sums = list(map(lambda x, y: x + y, a, b))
print(sums)     # [11, 22, 33, 44, 55]

products = list(map(lambda x, y: x * y, a, b))
print(products) # [10, 40, 90, 160, 250]

# Stops at shortest iterable
c = [100, 200]
result = list(map(lambda x, y: x + y, a, c))
print(result)   # [101, 202]  (only 2 items)
\`\`\`

### map() is Lazy

\`\`\`python
# map() returns a lazy iterator - does NOT compute until consumed
numbers = range(1, 1_000_001)
squared_map = map(lambda x: x**2, numbers)   # Instant - nothing computed yet!

# Only computed when iterated
first_five = [next(squared_map) for _ in range(5)]
print(first_five)   # [1, 4, 9, 16, 25]

# Memory efficient - only ONE item computed at a time
\`\`\`

### Practical map() Examples

\`\`\`python
# Parse CSV line
csv_line = "Alice,25,London,Engineer"
parts = list(map(str.strip, csv_line.split(",")))
print(parts)   # ['Alice', '25', 'London', 'Engineer']

# Celsius to Fahrenheit
celsius = [0, 10, 20, 30, 37, 100]
fahrenheit = list(map(lambda c: round((c * 9/5) + 32, 1), celsius))
print(fahrenheit)   # [32.0, 50.0, 68.0, 86.0, 98.6, 212.0]

# Extract field from list of dicts
students = [
    {"name": "Alice", "score": 88},
    {"name": "Bob",   "score": 72},
    {"name": "Charlie", "score": 95}
]
names = list(map(lambda s: s["name"], students))
scores = list(map(lambda s: s["score"], students))
print(names)    # ['Alice', 'Bob', 'Charlie']
print(scores)   # [88, 72, 95]
\`\`\`

## filter() - Keep Items That Pass a Test

\`filter(function, iterable)\` returns items for which the function returns \`True\`.

\`\`\`python
# Syntax: filter(function, iterable)
numbers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

# Keep only positive numbers
positives = list(filter(lambda x: x > 0, numbers))
print(positives)   # [1, 2, 3, 4, 5]

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)   # [-4, -2, 0, 2, 4]

# With a named function
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

primes = list(filter(is_prime, range(2, 50)))
print(primes)   # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
\`\`\`

### filter(None, iterable) - Remove Falsy Values

\`\`\`python
# filter(None, ...) removes all falsy values
mixed = [0, 1, "", "hello", None, [], [1, 2], False, True, {}, {"a": 1}]
truthy = list(filter(None, mixed))
print(truthy)   # [1, 'hello', [1, 2], True, {'a': 1}]

# Clean a list of strings
raw = ["alice", "", "  ", "bob", "", "charlie"]
clean = list(filter(None, map(str.strip, raw)))
print(clean)    # ['alice', 'bob', 'charlie']
\`\`\`

### Practical filter() Examples

\`\`\`python
# Filter passing students
students = [
    {"name": "Alice",   "score": 88},
    {"name": "Bob",     "score": 45},
    {"name": "Charlie", "score": 92},
    {"name": "Diana",   "score": 58},
    {"name": "Eve",     "score": 76},
]

passing = list(filter(lambda s: s["score"] >= 60, students))
failing = list(filter(lambda s: s["score"] < 60, students))
print([s["name"] for s in passing])   # ['Alice', 'Charlie', 'Eve']
print([s["name"] for s in failing])   # ['Bob', 'Diana']

# Filter files by extension
files = ["report.pdf", "photo.jpg", "data.csv", "script.py", "image.png"]
images = list(filter(lambda f: f.endswith((".jpg", ".png", ".gif")), files))
print(images)   # ['photo.jpg', 'image.png']

# Filter by multiple conditions
inventory = [
    {"name": "Laptop",   "price": 999, "stock": 15},
    {"name": "Mouse",    "price":  30, "stock": 0},
    {"name": "Keyboard", "price":  80, "stock": 8},
]
available_under_200 = list(filter(
    lambda item: item["stock"] > 0 and item["price"] < 200,
    inventory
))
print([item["name"] for item in available_under_200])   # ['Keyboard']
\`\`\`

## reduce() - Accumulate to a Single Value

\`reduce(function, iterable, initial)\` applies a function cumulatively to reduce to a single value.

\`\`\`python
from functools import reduce

# Syntax: reduce(function, iterable[, initializer])
numbers = [1, 2, 3, 4, 5]

# Sum: 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10, 10 + 5 = 15
total = reduce(lambda acc, x: acc + x, numbers)
print(total)    # 15

# Product: 1*2=2, 2*3=6, 6*4=24, 24*5=120
product = reduce(lambda acc, x: acc * x, numbers)
print(product)  # 120

# Maximum
maximum = reduce(lambda acc, x: acc if acc > x else x, numbers)
print(maximum)  # 5
\`\`\`

### How reduce() Works Step by Step

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

def verbose_add(acc, x):
    result = acc + x
    print(f"  acc={acc}, x={x} -> {result}")
    return result

print("reduce with addition:")
result = reduce(verbose_add, numbers)
print(f"Final: {result}")

# Output:
# reduce with addition:
#   acc=1, x=2 -> 3
#   acc=3, x=3 -> 6
#   acc=6, x=4 -> 10
#   acc=10, x=5 -> 15
# Final: 15
\`\`\`

### reduce() with Initial Value

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# With initial value - starts accumulation from this value
result = reduce(lambda acc, x: acc + x, numbers, 100)
print(result)   # 115  (100 + 1 + 2 + 3 + 4 + 5)

# Handle empty list safely
empty = []
result = reduce(lambda acc, x: acc + x, empty, 0)
print(result)   # 0  (returns initial value for empty list)
# Without initial: reduce(lambda acc, x: acc + x, []) -> TypeError!
\`\`\`

### Practical reduce() Examples

\`\`\`python
from functools import reduce

# Flatten a list of lists
nested = [[1, 2], [3, 4], [5, 6], [7, 8]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8]

# Build a dictionary from list of tuples
pairs = [("name", "Alice"), ("age", 25), ("city", "London")]
dictionary = reduce(lambda d, pair: {**d, pair[0]: pair[1]}, pairs, {})
print(dictionary)   # {'name': 'Alice', 'age': 25, 'city': 'London'}

# Count words
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_count = reduce(
    lambda acc, word: {**acc, word: acc.get(word, 0) + 1},
    words,
    {}
)
print(word_count)   # {'apple': 3, 'banana': 2, 'cherry': 1}

# Compose multiple functions
def compose(*functions):
    return reduce(lambda f, g: lambda x: f(g(x)), functions)

double = lambda x: x * 2
add_one = lambda x: x + 1
square = lambda x: x ** 2

# square(add_one(double(x)))
transform = compose(square, add_one, double)
print(transform(3))   # double(3)=6, add_one(6)=7, square(7)=49
\`\`\`

## Comparing map/filter/reduce with Comprehensions

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map() vs list comprehension
squared_map  = list(map(lambda x: x**2, numbers))
squared_comp = [x**2 for x in numbers]
print(squared_map == squared_comp)   # True

# filter() vs list comprehension
even_map  = list(filter(lambda x: x % 2 == 0, numbers))
even_comp = [x for x in numbers if x % 2 == 0]
print(even_map == even_comp)   # True

# filter + map vs list comprehension
result_func = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
result_comp = [x**2 for x in numbers if x % 2 == 0]
print(result_func == result_comp)   # True  ([4, 16, 36, 64, 100])
\`\`\`

> [!TIP]
> Use \`map()\` when applying an existing function (like \`int\`, \`str.upper\`) - it avoids lambda entirely. Use \`filter()\` when you need to clean or select data. Use \`reduce()\` for accumulation that cannot be expressed as a simple comprehension. For most transformations, list comprehensions are more Pythonic and readable.`,
  objectives: [
    "Use map() to transform every item in an iterable.",
    "Use filter() to select items that pass a condition.",
    "Use reduce() to accumulate items into a single value.",
    "Understand that map() and filter() return lazy iterators.",
    "Know when to use these functions vs list comprehensions."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};