export const tuplesLesson = {
  title: "Tuples",
  slug: "tuples",
  content: `# Tuples

## The Theory — Building the Logic

At its core, a tuple is Python's way of grouping several values into a single **fixed record** rather than a flexible container. Because a tuple is immutable, Python can guarantee that its contents never change, which is why tuples are \`hashable\` and can serve as dictionary keys or set elements while lists cannot. Behind the scenes this fixedness lets Python lay a tuple out in memory more efficiently than a list, which is why tuples are slightly faster and lighter to use. The key mental shift is to treat a tuple as one "thing made of parts" (a coordinate, a date, a database row) rather than a pile of items you sort and grow. A common pitfall is forgetting the trailing comma: \`(42)\` is just the integer 42 in parentheses, while \`(42,)\` is the actual one-item tuple.

## What is a Tuple?

A tuple is an **ordered, immutable** collection of items. It looks like a list but uses parentheses \`()\` instead of square brackets \`[]\`. Once created, a tuple **cannot be changed** - you cannot add, remove, or modify its items.

\`\`\`python
# List - mutable (can change)
my_list = [1, 2, 3]

# Tuple - immutable (cannot change)
my_tuple = (1, 2, 3)
\`\`\`

---

## Creating & Accessing Tuples

### Creating Tuples

\`\`\`python
# With parentheses
coordinates = (10, 20)
colors = ("red", "green", "blue")
mixed = ("Alice", 25, 5.11, True)

# Without parentheses (tuple packing - parentheses are optional)
point = 3, 4
print(point)        # Output: (3, 4)
print(type(point))  # Output: <class 'tuple'>

# Empty tuple
empty = ()
also_empty = tuple()
print(empty)        # Output: ()
print(len(empty))   # Output: 0

# Single-item tuple (the trailing comma is REQUIRED)
single = (42,)
print(single)       # Output: (42,)
print(type(single)) # Output: <class 'tuple'>

# WITHOUT the comma - this is just an integer in parentheses!
not_a_tuple = (42)
print(type(not_a_tuple))  # Output: <class 'int'>
\`\`\`

### Creating Tuples from Other Types

\`\`\`python
# From a list
from_list = tuple([1, 2, 3, 4, 5])
print(from_list)   # Output: (1, 2, 3, 4, 5)

# From a string
from_string = tuple("Python")
print(from_string) # Output: ('P', 'y', 't', 'h', 'o', 'n')

# From a range
from_range = tuple(range(1, 6))
print(from_range)  # Output: (1, 2, 3, 4, 5)
\`\`\`

### Accessing Tuple Items

Tuples use the same indexing as lists - zero-based, supports negative indexing:

\`\`\`
Tuple :   ("apple", "banana", "cherry", "mango")
Index :       0         1         2         3
Neg   :      -4        -3        -2        -1
\`\`\`

\`\`\`python
fruits = ("apple", "banana", "cherry", "mango")

print(fruits[0])    # Output: apple   (first item)
print(fruits[2])    # Output: cherry
print(fruits[-1])   # Output: mango   (last item)
print(fruits[-2])   # Output: cherry
\`\`\`

### Slicing Tuples

Slicing returns a new tuple:

\`\`\`python
numbers = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

print(numbers[2:5])    # Output: (2, 3, 4)
print(numbers[:3])     # Output: (0, 1, 2)
print(numbers[7:])     # Output: (7, 8, 9)
print(numbers[::2])    # Output: (0, 2, 4, 6, 8)
print(numbers[::-1])   # Output: (9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
\`\`\`

### Tuple Length and Membership

\`\`\`python
colors = ("red", "green", "blue", "yellow")

print(len(colors))          # Output: 4
print("green" in colors)    # Output: True
print("purple" in colors)   # Output: False
print("purple" not in colors) # Output: True
\`\`\`

### Iterating Through a Tuple

\`\`\`python
fruits = ("apple", "banana", "cherry")

for fruit in fruits:
    print(fruit)

# With enumerate
for index, fruit in enumerate(fruits, 1):
    print(f"{index}. {fruit}")
\`\`\`

---

## Tuple Immutability

Once created, a tuple **cannot be changed**. Any attempt to modify it raises a \`TypeError\`.

\`\`\`python
colors = ("red", "green", "blue")

# All of these raise TypeError:
colors[0] = "yellow"    # TypeError: 'tuple' object does not support item assignment
colors.append("purple") # AttributeError: 'tuple' object has no attribute 'append'
del colors[0]           # TypeError: 'tuple' object doesn't support item deletion
\`\`\`

### Tuples Containing Mutable Objects

The tuple itself is immutable - its references cannot change. But if it contains a mutable object (like a list), that object can still be changed:

\`\`\`python
# The tuple holds a reference to a list
data = ("Alice", [85, 90, 78])

# Cannot change the tuple structure:
# data[0] = "Bob"   # TypeError!

# CAN change the list inside the tuple:
data[1].append(95)
print(data)   # Output: ('Alice', [85, 90, 78, 95])
\`\`\`

### Working Around Immutability

When you need to "modify" a tuple, you create a new one:

\`\`\`python
original = (1, 2, 3, 4, 5)

# "Add" an item - create a new tuple
extended = original + (6,)
print(extended)   # Output: (1, 2, 3, 4, 5, 6)

# "Remove" an item - convert, modify, convert back
as_list = list(original)
as_list.remove(3)
new_tuple = tuple(as_list)
print(new_tuple)  # Output: (1, 2, 4, 5)

# "Modify" an item
as_list = list(original)
as_list[0] = 99
new_tuple = tuple(as_list)
print(new_tuple)  # Output: (99, 2, 3, 4, 5)
\`\`\`

### Why Immutability is Valuable

\`\`\`python
# Tuples can be used as dictionary keys (lists cannot!)
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London",
    (35.6762, 139.6503): "Tokyo"
}
print(locations[(40.7128, -74.0060)])   # Output: New York

# Lists as keys would raise: TypeError: unhashable type: 'list'

# Tuples can be used in sets
unique_points = {(1, 2), (3, 4), (1, 2)}
print(unique_points)   # Output: {(1, 2), (3, 4)} - duplicates removed
\`\`\`

---

## Tuple Packing & Unpacking

### Tuple Packing

Assigning multiple values to a single variable automatically creates a tuple:

\`\`\`python
# Explicit packing with parentheses
person = ("Alice", 25, "New York")

# Implicit packing without parentheses
point = 10, 20, 30
print(point)        # Output: (10, 20, 30)
print(type(point))  # Output: <class 'tuple'>

# Packing in return statements
def get_min_max(numbers):
    return min(numbers), max(numbers)  # Returns a tuple

result = get_min_max([5, 3, 8, 1, 9])
print(result)      # Output: (1, 9)
print(type(result)) # Output: <class 'tuple'>
\`\`\`

### Tuple Unpacking

Unpacking assigns tuple items to individual variables:

\`\`\`python
person = ("Alice", 25, "New York")

name, age, city = person
print(name)    # Output: Alice
print(age)     # Output: 25
print(city)    # Output: New York
\`\`\`

\`\`\`python
# Unpack a returned tuple
def get_circle_stats(radius):
    import math
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    return area, circumference  # Returns tuple

area, circumference = get_circle_stats(5)
print(f"Area: {area:.2f}")
print(f"Circumference: {circumference:.2f}")
\`\`\`

### Star Unpacking

Use \`*\` to capture multiple remaining items:

\`\`\`python
numbers = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

first, *middle, last = numbers
print(first)    # Output: 1
print(middle)   # Output: [2, 3, 4, 5, 6, 7, 8, 9]  (a list!)
print(last)     # Output: 10

first, second, *rest = numbers
print(first)    # Output: 1
print(second)   # Output: 2
print(rest)     # Output: [3, 4, 5, 6, 7, 8, 9, 10]
\`\`\`

### Swapping Variables

The most elegant use of tuple packing/unpacking:

\`\`\`python
a = 10
b = 20

a, b = b, a    # Python packs (b, a) into a tuple, then unpacks
print(a, b)    # Output: 20 10
\`\`\`

### Unpacking in Loops

\`\`\`python
students = [
    ("Alice", 88),
    ("Bob", 72),
    ("Charlie", 95)
]

for name, score in students:
    grade = "Pass" if score >= 60 else "Fail"
    print(f"{name}: {score} ({grade})")
\`\`\`

Output:
\`\`\`
Alice: 88 (Pass)
Bob: 72 (Pass)
Charlie: 95 (Pass)
\`\`\`

\`\`\`python
# enumerate() returns (index, value) tuples
fruits = ("apple", "banana", "cherry")

for index, fruit in enumerate(fruits, 1):
    print(f"{index}. {fruit}")
\`\`\`

### Nested Unpacking

\`\`\`python
# Unpack nested tuples
data = ((1, 2), (3, 4), (5, 6))
(a, b), (c, d), (e, f) = data
print(a, b, c, d, e, f)   # Output: 1 2 3 4 5 6

# GPS coordinates
location = ("London", (51.5074, -0.1278))
city, (lat, lon) = location
print(f"{city}: lat={lat}, lon={lon}")
\`\`\`

---

## Tuple Methods

Tuples have only two methods because they cannot be modified.

### count() - Count Occurrences

Returns how many times a value appears in the tuple:

\`\`\`python
numbers = (1, 2, 3, 2, 4, 2, 5, 2)

print(numbers.count(2))    # Output: 4
print(numbers.count(1))    # Output: 1
print(numbers.count(99))   # Output: 0  (not found - returns 0, not an error)

colors = ("red", "blue", "red", "green", "red")
print(colors.count("red"))    # Output: 3
print(colors.count("yellow")) # Output: 0
\`\`\`

\`\`\`python
# Find the most frequent element
dice_rolls = (3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)
most_rolled = max(set(dice_rolls), key=dice_rolls.count)
print(f"Most rolled: {most_rolled} ({dice_rolls.count(most_rolled)} times)")
# Output: Most rolled: 5 (3 times)
\`\`\`

### index() - Find Position of First Occurrence

Returns the index of the first occurrence of a value. Raises \`ValueError\` if not found:

\`\`\`python
fruits = ("apple", "banana", "cherry", "banana", "mango")

print(fruits.index("cherry"))   # Output: 2
print(fruits.index("banana"))   # Output: 1  (first occurrence only)
print(fruits.index("apple"))    # Output: 0
\`\`\`

\`\`\`python
# ValueError if not found
try:
    fruits.index("grape")
except ValueError:
    print("'grape' not in tuple")
# Output: 'grape' not in tuple
\`\`\`

\`\`\`python
# index() with start and end
numbers = (1, 2, 3, 2, 4, 2, 5)

print(numbers.index(2))          # Output: 1  (first 2)
print(numbers.index(2, 2))       # Output: 3  (first 2 at index 2 or later)
print(numbers.index(2, 4))       # Output: 5  (first 2 at index 4 or later)
\`\`\`

### Other Useful Operations on Tuples

\`\`\`python
numbers = (3, 1, 4, 1, 5, 9, 2, 6)

print(min(numbers))    # Output: 1
print(max(numbers))    # Output: 9
print(sum(numbers))    # Output: 31
print(sorted(numbers)) # Output: [1, 1, 2, 3, 4, 5, 6, 9] (returns a LIST)

# Concatenation (creates new tuple)
t1 = (1, 2, 3)
t2 = (4, 5, 6)
t3 = t1 + t2
print(t3)   # Output: (1, 2, 3, 4, 5, 6)

# Repetition
t4 = (0,) * 5
print(t4)   # Output: (0, 0, 0, 0, 0)
\`\`\`

---

## When to Use Tuples vs Lists

Choosing between tuples and lists is an important design decision.

### Use a TUPLE when:

\`\`\`python
# 1. Data should not change (coordinates, RGB colors, dates)
ORIGIN = (0, 0)
RED = (255, 0, 0)
BIRTHDAY = (1995, 6, 15)  # year, month, day

# 2. As dictionary keys
city_populations = {
    ("New York", "USA"): 8_336_817,
    ("London", "UK"): 8_982_000,
    ("Tokyo", "Japan"): 13_960_000
}

# 3. Returning multiple values from a function
def divide_and_remainder(a, b):
    return a // b, a % b   # Returns a tuple

quotient, remainder = divide_and_remainder(17, 5)
print(f"17 ÷ 5 = {quotient} remainder {remainder}")

# 4. Named constants / configuration
DB_CONFIG = ("localhost", 5432, "mydb")
host, port, database = DB_CONFIG

# 5. Heterogeneous data (different types with fixed structure)
student_record = ("Alice", 20, "Computer Science", 3.8)  # name, age, major, gpa
\`\`\`

### Use a LIST when:

\`\`\`python
# 1. Data needs to change
shopping_cart = ["apple", "milk"]
shopping_cart.append("bread")

# 2. Homogeneous data that grows/shrinks
scores = [85, 92, 78]
scores.append(95)

# 3. You need list-specific methods (sort, append, remove, etc.)
tasks = ["buy groceries", "walk dog"]
tasks.sort()
tasks.remove("walk dog")

# 4. Order matters and you need to modify order
playlist = ["song1", "song2", "song3"]
playlist.insert(0, "intro")
\`\`\`

### Performance Comparison

\`\`\`python
import sys
import timeit

# Memory: tuples use less memory than lists
list_data = [1, 2, 3, 4, 5]
tuple_data = (1, 2, 3, 4, 5)

print(f"List size : {sys.getsizeof(list_data)} bytes")
print(f"Tuple size: {sys.getsizeof(tuple_data)} bytes")
# Tuple size: 80 bytes  (typically smaller)
# List size : 120 bytes

# Speed: tuples are slightly faster for iteration
\`\`\`

### Quick Decision Guide

\`\`\`
Question                             Use
---------------------------------    ------
Will the data change?                List
Is it a fixed record (name, age)?    Tuple
Do you need to sort/append/remove?   List
Is it a dictionary key?              Tuple
Returning multiple values?           Tuple
Collecting user input over time?     List
RGB color (255, 0, 0)?               Tuple
Collection of scores?                List
\`\`\`

## Practical Example: Student Records System

\`\`\`python
# Tuples are perfect for fixed records
students = [
    ("Alice Johnson", 20, "Computer Science", 3.85),
    ("Bob Smith",     22, "Mathematics",      3.42),
    ("Charlie Brown", 19, "Physics",          3.91),
    ("Diana Prince",  21, "Engineering",      3.67),
]

# Process using unpacking
print(f"{'Name':<20} {'Age':>4} {'Major':<20} {'GPA':>5}")
print("=" * 55)

for name, age, major, gpa in students:
    honor = " *" if gpa >= 3.9 else ""
    print(f"{name:<20} {age:>4} {major:<20} {gpa:>5.2f}{honor}")

# Find valedictorian using index and count
gpas = tuple(s[3] for s in students)
best_gpa = max(gpas)
best_index = gpas.index(best_gpa)
print(f"\\nValedictorian: {students[best_index][0]} (GPA: {best_gpa})")
print(f"Students with GPA above 3.8: {gpas.count(max(g for g in gpas if g >= 3.8))}")
\`\`\`

Output:
\`\`\`
Name                  Age Major                  GPA
=======================================================
Alice Johnson          20 Computer Science       3.85
Bob Smith              22 Mathematics            3.42
Charlie Brown          19 Physics                3.91 *
Diana Prince           21 Engineering            3.67

Valedictorian: Charlie Brown (GPA: 3.91)
\`\`\`

> [!TIP]
> The single-item tuple gotcha is very common: \`(42)\` is an integer, but \`(42,)\` is a tuple. Always include the trailing comma for single-item tuples. Use tuples for data that is conceptually fixed (a coordinate, a date, a database row) and lists for collections that grow and change.`,
  objectives: [
    "Create tuples using parentheses and understand the single-item comma rule.",
    "Access tuple items using positive and negative indexing.",
    "Understand why tuples are immutable and why that is useful.",
    "Use tuple packing and unpacking to assign multiple variables at once.",
    "Use count() and index() methods effectively.",
    "Make informed decisions about when to use tuples versus lists."
  ],
  difficulty: "beginner",
  xpReward: 75,
};