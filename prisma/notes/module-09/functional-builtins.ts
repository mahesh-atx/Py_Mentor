export const functionalBuiltinsLesson = {
  title: "Functional Built-ins",
  slug: "functional-builtins",
  content: `# Functional Built-ins

Python's functional built-ins let you write cleaner, more expressive code by treating functions as first-class objects and applying them to sequences.

## map() - Transform Every Item

\`map(function, iterable)\` applies a function to every item in an iterable and returns a map object (lazy iterator).

\`\`\`python
# Always convert with list() to see the result
numbers = [1, 2, 3, 4, 5]

# With lambda
squared = list(map(lambda x: x ** 2, numbers))
print(squared)   # Output: [1, 4, 9, 16, 25]

# With a named function
def fahrenheit_to_celsius(f):
    return round((f - 32) * 5/9, 1)

temps_f = [32, 68, 98.6, 212, 0]
temps_c = list(map(fahrenheit_to_celsius, temps_f))
print(temps_c)   # Output: [0.0, 20.0, 37.0, 100.0, -17.8]

# With built-in functions
strings = ["42", "3.14", "100", "0"]
integers = list(map(int, ["1", "2", "3", "4"]))
floats = list(map(float, strings))
print(integers)  # Output: [1, 2, 3, 4]
print(floats)    # Output: [42.0, 3.14, 100.0, 0.0]

# map() with multiple iterables
a = [1, 2, 3, 4]
b = [10, 20, 30, 40]
sums = list(map(lambda x, y: x + y, a, b))
products = list(map(lambda x, y: x * y, a, b))
print(sums)      # Output: [11, 22, 33, 44]
print(products)  # Output: [10, 40, 90, 160]
\`\`\`

### map() vs List Comprehension

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# map() - functional style
result_map = list(map(lambda x: x ** 2, numbers))

# List comprehension - often more readable
result_comp = [x ** 2 for x in numbers]

# Both produce the same result
print(result_map == result_comp)   # Output: True

# When map() is better: using existing functions
words = ["hello", "world", "python"]
upper = list(map(str.upper, words))   # Cleaner than [w.upper() for w in words]
\`\`\`

## filter() - Keep Items That Pass a Test

\`filter(function, iterable)\` returns items for which the function returns \`True\`.

\`\`\`python
numbers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

# Filter positive numbers
positives = list(filter(lambda x: x > 0, numbers))
print(positives)   # Output: [1, 2, 3, 4, 5]

# Filter even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)       # Output: [-4, -2, 0, 2, 4]

# With a named function
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

numbers_to_check = range(2, 30)
primes = list(filter(is_prime, numbers_to_check))
print(primes)
# Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

# filter(None, iterable) - remove falsy values
mixed = [0, 1, "", "hello", None, [], [1, 2], False, True, {}, {"a": 1}]
truthy = list(filter(None, mixed))
print(truthy)   # Output: [1, 'hello', [1, 2], True, {'a': 1}]
\`\`\`

### filter() vs List Comprehension

\`\`\`python
numbers = range(-10, 11)

# filter()
positives_filter = list(filter(lambda x: x > 0, numbers))

# List comprehension
positives_comp = [x for x in numbers if x > 0]

print(positives_filter == positives_comp)   # Output: True
\`\`\`

## zip() - Combine Iterables in Parallel

\`zip(iter1, iter2, ...)\` pairs up items from multiple iterables.

\`\`\`python
names  = ["Alice", "Bob", "Charlie", "Diana"]
scores = [88, 72, 95, 67]
grades = ["B", "C", "A", "D"]

# Zip two
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Zip three
for name, score, grade in zip(names, scores, grades):
    print(f"{name}: {score} ({grade})")

# Create dict
student_map = dict(zip(names, scores))
print(student_map)
# Output: {'Alice': 88, 'Bob': 72, 'Charlie': 95, 'Diana': 67}

# zip stops at the shortest iterable
short = [1, 2, 3]
long  = [10, 20, 30, 40, 50]
print(list(zip(short, long)))   # Output: [(1, 10), (2, 20), (3, 30)]

# Unzip using *
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
nums, chars = zip(*pairs)
print(nums)    # Output: (1, 2, 3)
print(chars)   # Output: ('a', 'b', 'c')
\`\`\`

## enumerate() - Index + Value

\`enumerate(iterable, start=0)\` adds a counter to each item.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Default (starts at 0)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Start from 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# Build indexed dict
indexed = dict(enumerate(fruits, 1))
print(indexed)   # Output: {1: 'apple', 2: 'banana', 3: 'cherry'}

# Find item and its index simultaneously
target = "banana"
for i, item in enumerate(fruits):
    if item == target:
        print(f"Found '{target}' at index {i}")
        break
\`\`\`

## any() and all() - Logical Tests

### any() - True if ANY item is True

\`\`\`python
print(any([False, False, True, False]))   # Output: True
print(any([False, False, False]))         # Output: False
print(any([]))                            # Output: False  (empty = False)

# With conditions
numbers = [1, 5, 3, 8, 2, 9]
print(any(n > 7 for n in numbers))     # Output: True  (8 and 9 are > 7)
print(any(n > 10 for n in numbers))    # Output: False

# Short-circuit: stops at first True
def check(x):
    print(f"Checking {x}")
    return x > 3

print(any(check(x) for x in [1, 2, 5, 6]))
# Output:
# Checking 1
# Checking 2
# Checking 5
# True   (stopped after finding 5 > 3)
\`\`\`

### all() - True if ALL items are True

\`\`\`python
print(all([True, True, True]))    # Output: True
print(all([True, False, True]))   # Output: False
print(all([]))                    # Output: True  (vacuously true - edge case!)

# With conditions
scores = [85, 92, 78, 95, 88]
print(all(s >= 60 for s in scores))   # Output: True  (all passing)
print(all(s >= 90 for s in scores))   # Output: False  (not all A's)

# Validate form fields
form = {"name": "Alice", "email": "alice@example.com", "age": "25"}
print(all(value.strip() for value in form.values()))   # Output: True
\`\`\`

### Combining any() and all()

\`\`\`python
def validate_password(password):
    conditions = [
        len(password) >= 8,
        any(c.isupper() for c in password),
        any(c.islower() for c in password),
        any(c.isdigit() for c in password),
        any(c in "!@#$%^&*" for c in password),
    ]
    return all(conditions)

passwords = ["Hello@123", "short1!", "NoSpecial123", "AllGood@99"]
for pwd in passwords:
    status = "Strong" if validate_password(pwd) else "Weak"
    print(f"{pwd:<20}: {status}")
\`\`\`

Output:
\`\`\`
Hello@123           : Strong
short1!             : Weak
NoSpecial123        : Weak
AllGood@99          : Strong
\`\`\`

## functools Module - Higher-Order Functions

### functools.reduce() - Accumulate to a Single Value

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum (same as sum())
total = reduce(lambda acc, x: acc + x, numbers)
print(total)   # Output: 15

# Product
product = reduce(lambda acc, x: acc * x, numbers)
print(product)  # Output: 120

# Maximum (same as max())
maximum = reduce(lambda acc, x: acc if acc > x else x, numbers)
print(maximum)  # Output: 5

# With initial value
result = reduce(lambda acc, x: acc + x, numbers, 100)
print(result)   # Output: 115  (starts at 100)

# Flatten a list of lists
lists = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, lst: acc + lst, lists, [])
print(flat)     # Output: [1, 2, 3, 4, 5, 6]
\`\`\`

### functools.partial() - Pre-fill Arguments

\`\`\`python
from functools import partial

def power(base, exponent):
    return base ** exponent

# Create specialized versions
square = partial(power, exponent=2)
cube   = partial(power, exponent=3)

print(square(5))   # Output: 25
print(cube(3))     # Output: 27

# With built-ins
multiply_by_3 = partial(lambda x, y: x * y, y=3)
print(list(map(multiply_by_3, [1, 2, 3, 4, 5])))
# Output: [3, 6, 9, 12, 15]
\`\`\`

### functools.lru_cache() - Cache Function Results

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Without cache: would be very slow for large n
# With cache: computed only once per unique n
print(fibonacci(50))   # Output: 12586269025 (instant)
print(fibonacci(100))  # Output: 354224848179261915075 (still fast)

# See cache info
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)
\`\`\`

## Chaining Functional Operations

\`\`\`python
from functools import reduce

# Process a dataset using functional operations
data = [
    {"name": "Alice",   "score": 88, "dept": "Engineering"},
    {"name": "Bob",     "score": 45, "dept": "Marketing"},
    {"name": "Charlie", "score": 92, "dept": "Engineering"},
    {"name": "Diana",   "score": 67, "dept": "Marketing"},
    {"name": "Eve",     "score": 55, "dept": "Engineering"},
    {"name": "Frank",   "score": 78, "dept": "Marketing"},
]

# Step 1: Filter passing employees
passing = list(filter(lambda e: e["score"] >= 60, data))

# Step 2: Transform to (name, score) tuples
name_scores = list(map(lambda e: (e["name"], e["score"]), passing))

# Step 3: Sort by score descending
ranked = sorted(name_scores, key=lambda x: x[1], reverse=True)

# Step 4: Calculate total score
total = reduce(lambda acc, e: acc + e[1], name_scores, 0)

print("Ranked passing employees:")
for rank, (name, score) in enumerate(ranked, 1):
    print(f"  #{rank} {name}: {score}")

avg = total / len(name_scores) if name_scores else 0
print(f"Average (passing): {avg:.1f}")

# Using all and any for analysis
all_engineers_pass = all(
    e["score"] >= 60
    for e in data
    if e["dept"] == "Engineering"
)
any_perfect = any(e["score"] == 100 for e in data)
print(f"All engineers pass: {all_engineers_pass}")
print(f"Anyone scored 100: {any_perfect}")
\`\`\`

Output:
\`\`\`
Ranked passing employees:
  #1 Charlie: 92
  #2 Alice: 88
  #3 Frank: 78
  #4 Diana: 67
Average (passing): 81.2
All engineers pass: False
Anyone scored 100: False
\`\`\`

## When to Use Functional vs Comprehension Style

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filtering
# Functional
result = list(filter(lambda x: x % 2 == 0, numbers))
# Comprehension (more Pythonic for simple cases)
result = [x for x in numbers if x % 2 == 0]

# Transforming
# Functional
result = list(map(lambda x: x ** 2, numbers))
# Comprehension
result = [x ** 2 for x in numbers]

# Transform + Filter
# Functional (chained)
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
# Comprehension (cleaner)
result = [x ** 2 for x in numbers if x % 2 == 0]

# map() with existing function (cleaner than comprehension)
words = ["hello", "world"]
result_map = list(map(str.upper, words))       # Clean
result_comp = [w.upper() for w in words]       # Also clean

# reduce() has no comprehension equivalent
from functools import reduce
product = reduce(lambda acc, x: acc * x, numbers)   # Only way
\`\`\`

> [!TIP]
> Use list comprehensions for most transform/filter operations - they are more Pythonic and readable. Use \`map()\` when applying an existing function (like \`str.upper\` or \`int\`) - it avoids the need for a lambda. Use \`filter()\` with \`filter(None, iterable)\` to remove falsy values. Use \`reduce()\` for accumulating to a single value that comprehensions cannot express. Use \`lru_cache\` on recursive functions to dramatically improve performance.`,
  objectives: [
    "Use map() to transform every item in an iterable.",
    "Use filter() to select items that pass a test.",
    "Use zip() to process multiple iterables in parallel.",
    "Use any() and all() for logical tests across sequences.",
    "Use functools.reduce(), partial(), and lru_cache()."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};