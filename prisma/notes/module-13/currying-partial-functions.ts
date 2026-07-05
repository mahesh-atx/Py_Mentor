export const curryingPartialFunctionsLesson = {
  title: "Currying & Partial Functions (functools.partial)",
  slug: "currying-partial-functions",
  content: `# Currying & Partial Functions

## What is Currying?

**Currying** transforms a function that takes multiple arguments into a sequence of functions that each take a single argument.

\`\`\`
f(a, b, c)  →  f(a)(b)(c)
\`\`\`

\`\`\`python
# Normal function
def add(a, b):
    return a + b

print(add(3, 4))   # 7

# Curried version
def curried_add(a):
    def inner(b):
        return a + b
    return inner

add_three = curried_add(3)   # Returns a function!
print(add_three(4))          # 7
print(add_three(10))         # 13
print(curried_add(5)(6))     # 11  (call both at once)
\`\`\`

### Currying with Lambda

\`\`\`python
# Three-argument curried function
def curried_multiply(a):
    return lambda b: lambda c: a * b * c

result = curried_multiply(2)(3)(4)
print(result)   # 24

# Partially apply
double = curried_multiply(2)
double_then = double(3)
print(double_then(5))   # 30   (2 * 3 * 5)
\`\`\`

### Practical Currying

\`\`\`python
# Power function
def power(exp):
    return lambda base: base ** exp

square = power(2)
cube = power(3)

numbers = [1, 2, 3, 4, 5]
print(list(map(square, numbers)))   # [1, 4, 9, 16, 25]
print(list(map(cube, numbers)))     # [1, 8, 27, 64, 125]

# Validation function
def greater_than(threshold):
    return lambda x: x > threshold

is_adult = greater_than(18)
is_expensive = greater_than(100)

ages = [15, 22, 17, 30, 16, 25]
adults = list(filter(is_adult, ages))
print(adults)   # [22, 30, 25]
\`\`\`

## functools.partial - Pre-Fill Arguments

\`partial(func, *args, **kwargs)\` creates a new function with some arguments pre-filled. It is Python's built-in partial application.

\`\`\`python
from functools import partial

def power(base, exp):
    return base ** exp

# Pre-fill exp=2 to create square function
square = partial(power, exp=2)
cube   = partial(power, exp=3)

print(square(5))    # 25
print(cube(3))      # 27
print(square(10))   # 100

# Pre-fill base=2 to create powers of 2
powers_of_2 = partial(power, 2)
print(powers_of_2(10))   # 1024
print(powers_of_2(8))    # 256
\`\`\`

### partial() vs Lambda

\`\`\`python
from functools import partial

def add(a, b, c):
    return a + b + c

# Using lambda
add_5_to = lambda b, c: add(5, b, c)

# Using partial (preferred - cleaner, preserves function metadata)
add_5_to = partial(add, 5)

print(add_5_to(3, 4))    # 12   (5 + 3 + 4)
print(add_5_to(10, 20))  # 35   (5 + 10 + 20)

# partial has better introspection
print(add_5_to.func)    # <function add at 0x...>
print(add_5_to.args)    # (5,)
print(add_5_to.keywords) # {}
\`\`\`

### partial() with Built-in Functions

\`\`\`python
from functools import partial

# print with a custom separator
print_comma = partial(print, sep=", ")
print_comma("Alice", "Bob", "Charlie")   # Alice, Bob, Charlie

print_newline = partial(print, sep="\n")
print_newline("Line 1", "Line 2", "Line 3")

# int() with a base
binary_to_int = partial(int, base=2)
hex_to_int = partial(int, base=16)
oct_to_int = partial(int, base=8)

print(binary_to_int("1010"))   # 10
print(hex_to_int("ff"))        # 255
print(oct_to_int("17"))        # 15

# sorted() with fixed key
sort_by_length = partial(sorted, key=len)
sort_descending = partial(sorted, reverse=True)

words = ["banana", "fig", "apple", "kiwi"]
print(sort_by_length(words))    # ['fig', 'kiwi', 'apple', 'banana']
print(sort_descending([3,1,4,1,5]))  # [5, 4, 3, 1, 1]
\`\`\`

### partial() for Configuration

\`\`\`python
from functools import partial

def send_request(url, method="GET", headers=None, data=None, timeout=30):
    # Simulate HTTP request
    print(f"{method} {url}")
    print(f"  headers: {headers}")
    print(f"  data: {data}")
    print(f"  timeout: {timeout}s")

# Create specialized request functions
api_base = "https://api.example.com"
get_api = partial(send_request, method="GET", headers={"Authorization": "Bearer token123"})
post_api = partial(send_request, method="POST", headers={"Authorization": "Bearer token123", "Content-Type": "application/json"})

get_api(f"{api_base}/users")
print()
post_api(f"{api_base}/users", data={"name": "Alice"})
\`\`\`

### Building a Flexible Logging System

\`\`\`python
from functools import partial
import datetime

def log(level, message, timestamp=True):
    prefix = f"[{datetime.datetime.now().strftime('%H:%M:%S')}] " if timestamp else ""
    print(f"{prefix}[{level.upper()}] {message}")

# Create specialized log functions
debug = partial(log, "debug", timestamp=False)
info = partial(log, "info")
warning = partial(log, "warning")
error = partial(log, "error")
critical = partial(log, "critical")

debug("Variable x = 42")
info("Application started")
warning("Memory usage high: 85%")
error("File not found: config.json")
critical("Database connection failed!")
\`\`\`

## General Curry Function

\`\`\`python
import inspect
from functools import partial, wraps

def curry(func):
    """Transform any function into its curried version."""
    n_args = len(inspect.signature(func).parameters)

    @wraps(func)
    def curried(*args):
        if len(args) >= n_args:
            return func(*args[:n_args])
        return curry(partial(func, *args))

    return curried

@curry
def add3(a, b, c):
    return a + b + c

@curry
def multiply(a, b):
    return a * b

# All these work
print(add3(1, 2, 3))       # 6  (all at once)
print(add3(1)(2)(3))       # 6  (one at a time)
print(add3(1, 2)(3))       # 6  (mixed)
print(add3(1)(2, 3))       # 6  (mixed)

double = multiply(2)
triple = multiply(3)
print(list(map(double, [1, 2, 3, 4, 5])))   # [2, 4, 6, 8, 10]
print(list(map(triple, [1, 2, 3, 4, 5])))   # [3, 6, 9, 12, 15]
\`\`\`

> [!TIP]
> Use \`functools.partial\` (not currying) in most Python code. It is simpler, Pythonic, and has good support for introspection. Currying is more common in languages like Haskell and JavaScript. In Python, \`partial\` gives you most of the benefits of currying without the complexity.`,
  objectives: [
    "Understand what currying is and how to implement it manually.",
    "Use functools.partial to pre-fill function arguments.",
    "Create specialized versions of functions using partial.",
    "Apply partial() with built-in functions like int(), sorted(), and print().",
    "Build reusable function factories using partial and currying."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};