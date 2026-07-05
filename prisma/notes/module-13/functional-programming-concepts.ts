export const functionalProgrammingConceptsLesson = {
  title: "Functional Programming Concepts",
  slug: "functional-programming-concepts",
  content: `# Functional Programming Concepts

## What is Functional Programming?

**Functional Programming (FP)** is a programming paradigm that treats computation as the evaluation of mathematical functions. It emphasizes:

- **Functions as first-class citizens** - functions are values like any other
- **Avoiding shared state** - functions do not modify external variables
- **Avoiding mutable data** - prefer creating new data over modifying existing data
- **Pure functions** - same input always produces same output
- **Declarative style** - describe WHAT to compute, not HOW

\`\`\`python
# Imperative style (HOW to do it - step by step)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = []
for n in numbers:
    if n % 2 == 0:
        result.append(n ** 2)

# Functional style (WHAT to compute - declarative)
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))

# Or with comprehension (Python's preferred functional style)
result = [x**2 for x in numbers if x % 2 == 0]
\`\`\`

## Pure Functions & Side Effects

A **pure function**:
1. Always returns the same output for the same input
2. Has NO side effects (does not modify anything outside itself)

\`\`\`python
# PURE FUNCTION - no side effects, deterministic
def add(a, b):
    return a + b

print(add(2, 3))   # Always 5
print(add(2, 3))   # Always 5
\`\`\`

### What are Side Effects?

A **side effect** is any interaction with the outside world:
- Modifying a global variable
- Modifying a mutable argument
- Writing to a file or database
- Printing to the screen
- Making a network request

\`\`\`python
# IMPURE - modifies global state
total = 0
def add_to_total(n):
    global total
    total += n   # Side effect: modifies global variable
    return total

# IMPURE - modifies the argument
def add_item(lst, item):
    lst.append(item)   # Side effect: modifies the list!
    return lst

# IMPURE - uses random (non-deterministic)
import random
def roll_die():
    return random.randint(1, 6)   # Different result each call!

# PURE VERSION of add_item
def add_item_pure(lst, item):
    return lst + [item]   # Returns NEW list, original unchanged

original = [1, 2, 3]
new_list = add_item_pure(original, 4)
print(original)   # [1, 2, 3]  (unchanged!)
print(new_list)   # [1, 2, 3, 4]
\`\`\`

### Why Pure Functions Matter

\`\`\`python
# Pure functions are:

# 1. TESTABLE - easy to unit test
def calculate_tax(price, rate):
    return price * rate

assert calculate_tax(100, 0.2) == 20.0   # Always passes
assert calculate_tax(50, 0.1) == 5.0     # Always passes

# 2. COMPOSABLE - easy to combine
def add_ten(x): return x + 10
def double(x): return x * 2
def square(x): return x ** 2

# Can compose freely
result = square(add_ten(double(3)))   # square(add_ten(6)) = square(16) = 256
print(result)   # 256

# 3. PARALLELIZABLE - safe to run concurrently (no shared state)
from concurrent.futures import ThreadPoolExecutor
data = [1, 2, 3, 4, 5]
with ThreadPoolExecutor() as ex:
    results = list(ex.map(double, data))   # Safe! double is pure
print(results)   # [2, 4, 6, 8, 10]

# 4. CACHEABLE - same input = same output = can cache
from functools import lru_cache

@lru_cache(maxsize=None)
def expensive_pure_computation(n):
    return sum(i**2 for i in range(n))   # Pure - safe to cache
\`\`\`

## Immutability Concepts

**Immutability** means data cannot be changed after creation. Instead of modifying data, you create new data.

\`\`\`python
# MUTABLE approach (common source of bugs)
def process_mutable(data):
    data.sort()    # MODIFIES the original list!
    return data

original = [3, 1, 4, 1, 5, 9, 2]
processed = process_mutable(original)
print(original)   # [1, 1, 2, 3, 4, 5, 9]  (CHANGED! unexpected!)
print(processed)  # [1, 1, 2, 3, 4, 5, 9]

# IMMUTABLE approach
def process_immutable(data):
    return sorted(data)  # Creates a NEW sorted list, original unchanged

original = [3, 1, 4, 1, 5, 9, 2]
processed = process_immutable(original)
print(original)   # [3, 1, 4, 1, 5, 9, 2]  (unchanged!)
print(processed)  # [1, 1, 2, 3, 4, 5, 9]
\`\`\`

### Immutable Python Types

\`\`\`python
# Already immutable (cannot change after creation)
my_int = 42         # int
my_float = 3.14     # float
my_str = "hello"    # str
my_tuple = (1, 2)   # tuple
my_frozen = frozenset({1, 2, 3})  # frozenset

# These seem to change but create new objects
my_str = my_str + " world"   # Creates NEW string, does not modify original
my_int = my_int + 1          # Creates NEW int

# Using tuples instead of lists for immutability
mutable_point = [3, 4]
mutable_point[0] = 10   # Changes original!

immutable_point = (3, 4)
# immutable_point[0] = 10   # TypeError! Cannot change tuple

# New point without modifying original
new_point = (10, immutable_point[1])
print(immutable_point)   # (3, 4)  unchanged
print(new_point)         # (10, 4)
\`\`\`

### Working Immutably with Dicts

\`\`\`python
# Mutable approach
def update_config_mutable(config, key, value):
    config[key] = value   # Modifies original!
    return config

# Immutable approach - create a new dict
def update_config_immutable(config, key, value):
    return {**config, key: value}   # New dict with the update

config = {"theme": "light", "lang": "en"}

new_config = update_config_immutable(config, "theme", "dark")
print(config)      # {'theme': 'light', 'lang': 'en'}  (unchanged)
print(new_config)  # {'theme': 'dark', 'lang': 'en'}

# Remove a key immutably
def remove_key(d, key):
    return {k: v for k, v in d.items() if k != key}

without_lang = remove_key(config, "lang")
print(config)        # unchanged
print(without_lang)  # {'theme': 'light'}
\`\`\`

## Higher-Order Functions

A **higher-order function** is one that:
- Takes functions as arguments, OR
- Returns a function as its result (or both)

\`\`\`python
# Takes a function as argument
def apply_twice(func, x):
    return func(func(x))

double = lambda x: x * 2
print(apply_twice(double, 3))    # 12 (double(double(3)) = double(6) = 12)

# Returns a function
def make_adder(n):
    return lambda x: x + n

add5 = make_adder(5)
add10 = make_adder(10)
print(add5(3))    # 8
print(add10(3))   # 13
\`\`\`

### Built-in Higher-Order Functions

\`\`\`python
# map, filter, sorted, min, max are all higher-order functions
numbers = [5, -3, 8, -1, 4, -7, 2]

# They all accept functions
print(sorted(numbers, key=abs))          # Sort by absolute value
print(max(numbers, key=abs))             # Largest absolute value
print(min(numbers, key=abs))             # Smallest absolute value
print(list(filter(lambda x: x > 0, numbers)))  # Filter positives
\`\`\`

## Function Composition

**Function composition** means combining functions so the output of one becomes the input of the next: \`f(g(h(x)))\`.

\`\`\`python
# Manual composition
double = lambda x: x * 2
add_one = lambda x: x + 1
square = lambda x: x ** 2

# Compose: square(add_one(double(x)))
result = square(add_one(double(5)))   # double(5)=10, add_one(10)=11, square(11)=121
print(result)   # 121

# Compose function factory
def compose(*functions):
    """Create a function that applies functions right-to-left."""
    from functools import reduce
    return reduce(lambda f, g: lambda x: f(g(x)), functions)

# pipe is left-to-right composition
def pipe(*functions):
    """Create a function that applies functions left-to-right."""
    from functools import reduce
    return reduce(lambda f, g: lambda x: g(f(x)), functions)

transform = compose(square, add_one, double)   # right to left
pipeline  = pipe(double, add_one, square)      # left to right

print(transform(5))   # square(add_one(double(5))) = 121
print(pipeline(5))    # square(add_one(double(5))) = 121  (same!)
\`\`\`

### Real-World Function Composition

\`\`\`python
# Text processing pipeline
strip = str.strip
lower = str.lower
remove_punct = lambda s: ''.join(c for c in s if c.isalnum() or c.isspace())
normalize_spaces = lambda s: ' '.join(s.split())

def compose_pipeline(*funcs):
    def pipeline(x):
        result = x
        for f in funcs:
            result = f(result)
        return result
    return pipeline

clean_text = compose_pipeline(strip, lower, remove_punct, normalize_spaces)

inputs = ["  HELLO, WORLD!  ", "Python is  AMAZING!!!"]
for text in inputs:
    print(f"{text!r:30} -> {clean_text(text)!r}")
\`\`\`

Output:
\`\`\`
'  HELLO, WORLD!  '            -> 'hello world'
'Python is  AMAZING!!!'        -> 'python is amazing'
\`\`\`

> [!TIP]
> Functional programming is not all-or-nothing in Python. Use pure functions where it makes sense (especially for complex business logic), allow side effects where needed (I/O, printing). The goal is to minimize and isolate side effects, not eliminate them entirely.`,
  objectives: [
    "Understand the core principles of functional programming.",
    "Write pure functions that have no side effects.",
    "Work with data immutably using new objects instead of mutations.",
    "Understand higher-order functions and why they are powerful.",
    "Apply function composition to build data processing pipelines."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};