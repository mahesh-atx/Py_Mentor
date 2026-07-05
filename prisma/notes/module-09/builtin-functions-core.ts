export const builtinFunctionsCoreLesson = {
  title: "Most Used Built-in Functions",
  slug: "builtin-functions-core",
  content: `# Most Used Built-in Functions

Python comes with many built-in functions that are always available without importing anything. These are the ones you will use in almost every program you write.

## print() and input()

You already know these well, but here are some advanced uses:

### print() - Advanced Usage

\`\`\`python
# Basic print
print("Hello, World!")   # Output: Hello, World!

# Multiple values - separated by space by default
print("Hello", "World", "Python")   # Output: Hello World Python

# Custom separator
print("2024", "01", "15", sep="-")   # Output: 2024-01-15
print("A", "B", "C", sep=", ")      # Output: A, B, C

# Custom end (default is newline)
print("Loading", end="...")
print("Done")   # Output: Loading...Done

# Print to a file
with open("output.txt", "w") as f:
    print("Hello, file!", file=f)

# Flush output immediately (useful in loops)
import time
for i in range(3):
    print(f"Step {i}", flush=True)
    time.sleep(0.5)
\`\`\`

### input() - Advanced Usage

\`\`\`python
# Basic
name = input("Enter your name: ")

# Chaining with type conversion
age = int(input("Enter your age: "))
price = float(input("Enter price: "))

# Strip whitespace immediately
username = input("Username: ").strip().lower()

# Safe input with validation
while True:
    try:
        number = int(input("Enter a number: "))
        break
    except ValueError:
        print("Invalid! Please enter an integer.")
\`\`\`

## len() - Get Length

Works on any sequence or collection:

\`\`\`python
print(len("Python"))          # Output: 6
print(len([1, 2, 3, 4, 5]))   # Output: 5
print(len((1, 2, 3)))         # Output: 3
print(len({"a", "b", "c"}))   # Output: 3
print(len({"x": 1, "y": 2}))  # Output: 2
print(len(range(100)))         # Output: 100

# Empty collections
print(len(""))    # Output: 0
print(len([]))    # Output: 0
print(len({}))    # Output: 0
\`\`\`

## range() - Generate Number Sequences

\`\`\`python
# range(stop)
print(list(range(5)))          # Output: [0, 1, 2, 3, 4]

# range(start, stop)
print(list(range(1, 6)))       # Output: [1, 2, 3, 4, 5]

# range(start, stop, step)
print(list(range(0, 10, 2)))   # Output: [0, 2, 4, 6, 8]
print(list(range(10, 0, -1)))  # Output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# Membership test (efficient - does not create the list)
print(5 in range(10))          # Output: True
print(50 in range(10))         # Output: False
\`\`\`

## type(), id(), isinstance(), issubclass()

### type() - Get the Type

\`\`\`python
print(type(42))           # Output: <class 'int'>
print(type(3.14))         # Output: <class 'float'>
print(type("hello"))      # Output: <class 'str'>
print(type([1, 2, 3]))    # Output: <class 'list'>
print(type(True))         # Output: <class 'bool'>
print(type(None))         # Output: <class 'NoneType'>

# Type comparison
x = 42
print(type(x) == int)     # Output: True
print(type(x) == str)     # Output: False
\`\`\`

### id() - Get Memory Address

\`\`\`python
x = "hello"
y = "hello"
z = x

print(id(x))          # Some memory address
print(id(y))          # Same or different (string interning)
print(id(z))          # Same as x (same object)

print(x is z)         # Output: True  (same object)

a = [1, 2, 3]
b = [1, 2, 3]
print(a is b)         # Output: False (different objects)
print(id(a) == id(b)) # Output: False
\`\`\`

### isinstance() - Check Type Safely

\`\`\`python
print(isinstance(42, int))         # Output: True
print(isinstance(42, float))       # Output: False
print(isinstance(42, (int, float)))# Output: True  (check multiple types)
print(isinstance(True, int))       # Output: True  (bool is subclass of int)
print(isinstance("hi", str))       # Output: True

# Practical use
def add(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError(f"Expected number, got {type(a).__name__}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"Expected number, got {type(b).__name__}")
    return a + b

print(add(5, 3))       # Output: 8
print(add(5.5, 2.5))   # Output: 8.0
# add("a", 3)          # TypeError: Expected number, got str
\`\`\`

### issubclass() - Check Class Hierarchy

\`\`\`python
print(issubclass(bool, int))      # Output: True  (bool extends int)
print(issubclass(int, float))     # Output: False
print(issubclass(int, object))    # Output: True  (everything extends object)
print(issubclass(list, (list, tuple, set)))  # Output: True

class Animal:
    pass

class Dog(Animal):
    pass

print(issubclass(Dog, Animal))    # Output: True
print(issubclass(Animal, Dog))    # Output: False
\`\`\`

## abs(), round(), pow(), divmod()

### abs() - Absolute Value

\`\`\`python
print(abs(-5))      # Output: 5
print(abs(5))       # Output: 5
print(abs(-3.14))   # Output: 3.14
print(abs(0))       # Output: 0

# Useful for distance calculations
x1, x2 = 10, 3
distance = abs(x1 - x2)
print(distance)   # Output: 7
\`\`\`

### round() - Round a Number

\`\`\`python
print(round(3.14159))      # Output: 3   (round to integer)
print(round(3.14159, 2))   # Output: 3.14
print(round(3.14159, 4))   # Output: 3.1416
print(round(2.5))          # Output: 2   (banker's rounding - rounds to even)
print(round(3.5))          # Output: 4
print(round(-2.5))         # Output: -2

# Financial rounding
price = 19.999
print(round(price, 2))     # Output: 20.0
\`\`\`

### pow() - Power / Exponentiation

\`\`\`python
print(pow(2, 10))       # Output: 1024   (2^10)
print(pow(3, 3))        # Output: 27     (3^3)
print(pow(9, 0.5))      # Output: 3.0    (square root)

# Three-argument form: pow(base, exp, mod) - modular exponentiation
# Much faster than (base**exp) % mod for large numbers
print(pow(2, 10, 1000))    # Output: 24   (2^10 % 1000)
print(pow(3, 4, 7))        # Output: 4    (81 % 7)
\`\`\`

### divmod() - Division and Remainder Together

\`\`\`python
quotient, remainder = divmod(17, 5)
print(quotient)    # Output: 3
print(remainder)   # Output: 2

# Same as:
print(17 // 5)    # 3
print(17 % 5)     # 2

# Practical: convert seconds to hours, minutes, seconds
total_seconds = 9045
hours, remainder = divmod(total_seconds, 3600)
minutes, seconds = divmod(remainder, 60)
print(f"{hours}h {minutes}m {seconds}s")   # Output: 2h 30m 45s
\`\`\`

## max(), min(), sum()

### max() and min()

\`\`\`python
# With direct values
print(max(3, 1, 4, 1, 5, 9, 2, 6))   # Output: 9
print(min(3, 1, 4, 1, 5, 9, 2, 6))   # Output: 1

# With a list
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(max(numbers))   # Output: 9
print(min(numbers))   # Output: 1

# With strings (alphabetical)
print(max("apple", "banana", "cherry"))   # Output: cherry
print(min("apple", "banana", "cherry"))   # Output: apple

# With key function
words = ["apple", "fig", "banana", "kiwi"]
print(max(words, key=len))   # Output: banana  (longest)
print(min(words, key=len))   # Output: fig     (shortest)

# With default (avoids error on empty sequence)
print(max([], default=0))    # Output: 0  (no ValueError!)

# On list of tuples
students = [("Alice", 88), ("Bob", 95), ("Charlie", 72)]
print(max(students, key=lambda s: s[1]))   # Output: ('Bob', 95)
print(min(students, key=lambda s: s[1]))   # Output: ('Charlie', 72)
\`\`\`

### sum()

\`\`\`python
print(sum([1, 2, 3, 4, 5]))     # Output: 15
print(sum((1.5, 2.5, 3.0)))     # Output: 7.0
print(sum(range(1, 101)))        # Output: 5050

# With start value
print(sum([1, 2, 3], 10))        # Output: 16  (10 + 1+2+3)

# Sum specific field from list of dicts
orders = [{"item": "A", "price": 10.99},
          {"item": "B", "price": 5.49},
          {"item": "C", "price": 8.00}]
total = sum(order["price"] for order in orders)
print(f"Total: \${total:.2f}")    # Output: Total: $24.48
\`\`\`

## sorted() and reversed()

### sorted() - Return a New Sorted List

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

ascending = sorted(numbers)
print(ascending)   # Output: [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)     # Output: [3, 1, 4, 1, 5, 9, 2, 6]  (unchanged!)

descending = sorted(numbers, reverse=True)
print(descending)  # Output: [9, 6, 5, 4, 3, 2, 1, 1]

# Works on any iterable
print(sorted("python"))         # Output: ['h', 'n', 'o', 'p', 't', 'y']
print(sorted({3, 1, 4, 1, 5})) # Output: [1, 3, 4, 5]

# With key
words = ["banana", "fig", "apple", "kiwi", "cherry"]
print(sorted(words, key=len))                    # By length
print(sorted(words, key=lambda w: w[-1]))        # By last character

# Sort dict by value
scores = {"Alice": 88, "Bob": 95, "Charlie": 72}
sorted_by_score = sorted(scores.items(), key=lambda x: x[1], reverse=True)
print(sorted_by_score)   # [('Bob', 95), ('Alice', 88), ('Charlie', 72)]
\`\`\`

### reversed() - Return a Reversed Iterator

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# reversed() returns an iterator, not a list
rev = reversed(numbers)
print(list(rev))    # Output: [5, 4, 3, 2, 1]
print(numbers)      # Output: [1, 2, 3, 4, 5]  (unchanged!)

# Use in a for loop
for item in reversed(numbers):
    print(item, end=" ")   # Output: 5 4 3 2 1

# Works on strings and tuples too
print(list(reversed("Python")))   # Output: ['n', 'o', 'h', 't', 'y', 'P']
print(list(reversed((1, 2, 3))))  # Output: [3, 2, 1]

# Alternative: slicing (creates a new list/string)
print(numbers[::-1])              # Output: [5, 4, 3, 2, 1]
\`\`\`

## zip(), enumerate(), map(), filter()

### zip() - Combine Multiple Iterables

\`\`\`python
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]
cities = ["London", "Paris", "Tokyo"]

# Zip two lists
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Zip three lists
for name, score, city in zip(names, scores, cities):
    print(f"{name} from {city}: {score}")

# Create a dict from two lists
student_dict = dict(zip(names, scores))
print(student_dict)   # {'Alice': 88, 'Bob': 72, 'Charlie': 95}

# zip stops at the shortest iterable
short = [1, 2]
long  = [10, 20, 30, 40]
print(list(zip(short, long)))   # Output: [(1, 10), (2, 20)]

# zip_longest - fills missing values with a default
from itertools import zip_longest
print(list(zip_longest(short, long, fillvalue=0)))
# Output: [(1, 10), (2, 20), (0, 30), (0, 40)]

# Unzip with *
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)   # Output: (1, 2, 3)
print(letters)   # Output: ('a', 'b', 'c')
\`\`\`

### enumerate() - Index + Value

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# Convert to list of tuples
print(list(enumerate(fruits)))
# Output: [(0, 'apple'), (1, 'banana'), (2, 'cherry')]

# Create a dict with index as key
indexed = dict(enumerate(fruits))
print(indexed)   # Output: {0: 'apple', 1: 'banana', 2: 'cherry'}
\`\`\`

### map() - Apply Function to Each Item

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Apply a function to each item
squared = list(map(lambda x: x ** 2, numbers))
print(squared)   # Output: [1, 4, 9, 16, 25]

# With a named function
def double(x):
    return x * 2

doubled = list(map(double, numbers))
print(doubled)   # Output: [2, 4, 6, 8, 10]

# Convert types
str_nums = ["1", "2", "3", "4", "5"]
int_nums = list(map(int, str_nums))
print(int_nums)  # Output: [1, 2, 3, 4, 5]

# Map over multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)      # Output: [11, 22, 33]
\`\`\`

### filter() - Keep Items That Pass a Test

\`\`\`python
numbers = [1, -2, 3, -4, 5, -6, 7, -8]

# Keep only positive numbers
positives = list(filter(lambda x: x > 0, numbers))
print(positives)   # Output: [1, 3, 5, 7]

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)       # Output: [-2, -4, -6, -8]

# With a named function
def is_passing(score):
    return score >= 60

scores = [85, 42, 92, 58, 78, 35, 90]
passing = list(filter(is_passing, scores))
print(passing)     # Output: [85, 92, 78, 90]

# filter(None, iterable) removes falsy values
data = [0, 1, "", "hello", None, [], [1, 2], False, True]
truthy = list(filter(None, data))
print(truthy)      # Output: [1, 'hello', [1, 2], True]
\`\`\`

## open(), help(), dir()

### open() - Work with Files

\`\`\`python
# Write to a file
with open("example.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Python is great!\\n")

# Read from a file
with open("example.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())

# File modes
# 'r'  - read (default)
# 'w'  - write (overwrites)
# 'a'  - append
# 'rb' - read binary
# 'wb' - write binary
\`\`\`

### help() - Get Documentation

\`\`\`python
# In the Python interpreter:
help(len)       # Shows documentation for len()
help(str)       # Shows all string methods
help(list)      # Shows all list methods
help(print)     # Shows print documentation

# Also works on instances
my_list = []
help(my_list.append)
\`\`\`

### dir() - List Attributes and Methods

\`\`\`python
# All built-in names
print(dir(__builtins__))

# Methods of a string
print(dir("hello"))
# Output: ['__add__', '__class__', ... 'capitalize', 'center', 'count', ...]

# Filter to non-dunder methods
string_methods = [m for m in dir("") if not m.startswith("_")]
print(string_methods)

# Methods of a list
list_methods = [m for m in dir([]) if not m.startswith("_")]
print(list_methods)

# Check if an object has a specific attribute
print(hasattr("hello", "upper"))    # Output: True
print(hasattr("hello", "nonexistent"))   # Output: False
\`\`\`

## Practical Example: Data Pipeline

\`\`\`python
# Raw student data
raw_data = [
    "  Alice Johnson  , 88, London ",
    "BOB SMITH, 45, PARIS",
    "  Charlie Brown, 92, tokyo  ",
    "diana prince, 67, New York",
    "EVE  , 55, berlin",
]

# Step 1: Parse and clean using map and zip
def parse_record(line):
    parts = line.split(",")
    return {
        "name": parts[0].strip().title(),
        "score": int(parts[1].strip()),
        "city": parts[2].strip().title()
    }

students = list(map(parse_record, raw_data))

# Step 2: Filter passing students
passing = list(filter(lambda s: s["score"] >= 60, students))

# Step 3: Sort by score descending
ranked = sorted(passing, key=lambda s: s["score"], reverse=True)

# Step 4: Display with enumerate
print(f"{'Rank':<5} {'Name':<20} {'Score':>6} {'City':<15}")
print("=" * 50)
for rank, student in enumerate(ranked, 1):
    print(f"{rank:<5} {student['name']:<20} {student['score']:>6} {student['city']:<15}")

# Summary stats
all_scores = [s["score"] for s in students]
print("=" * 50)
print(f"Total students : {len(students)}")
print(f"Passing        : {len(passing)}")
print(f"Highest score  : {max(all_scores)}")
print(f"Average score  : {sum(all_scores)/len(all_scores):.1f}")
\`\`\`

Output:
\`\`\`
Rank  Name                 Score City
==================================================
1     Charlie Brown           92 Tokyo
2     Alice Johnson           88 London
3     Diana Prince            67 New York
==================================================
Total students : 5
Passing        : 3
Highest score  : 92
Average score  : 69.4
\`\`\`

> [!TIP]
> \`isinstance()\` is preferred over \`type()\` for type checking because it handles inheritance (e.g., \`isinstance(True, int)\` returns \`True\` since \`bool\` is a subclass of \`int\`). Use \`map()\` and \`filter()\` for functional-style transformations, but list comprehensions are often more readable for simple cases.`,
  objectives: [
    "Use print() with custom sep and end parameters.",
    "Use type(), isinstance(), and issubclass() for type inspection.",
    "Use abs(), round(), pow(), and divmod() for numeric operations.",
    "Use max(), min(), and sum() with key functions.",
    "Use sorted(), reversed(), zip(), enumerate(), map(), and filter() effectively."
  ],
  difficulty: "intermediate",
  xpReward: 80,
};