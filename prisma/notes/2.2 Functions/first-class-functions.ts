export const firstClassFunctionsLesson = {
  title: "First-Class Functions (Functions as Objects)",
  slug: "first-class-functions",
  content: `# First-Class Functions (Functions as Objects)

In Python, functions are **first-class objects** - they can be stored in variables, passed as arguments, returned from functions, and stored in data structures, just like any other value (integers, strings, lists).

## The Theory — Building the Logic

"First-class" means a function is a value like any other — it can be assigned to a variable, placed in a list or dict, passed into another function, or returned from one, because at runtime a function is simply an object with a \`__call__\` method. The key insight is the difference between *naming* a function and *calling* it: writing \`greet\` refers to the function object, while \`greet()\` runs it, so you can hand the object around and only call it later. This is what makes higher-order functions possible — a function that takes or returns another function is just one value consuming another value. The mental model is that functions are data you can compute with, not special syntax reserved for the top level. The common pitfall is accidentally calling a function when you meant to pass it (writing \`func()\` instead of \`func\`), which passes the *result* instead of the function and breaks the whole pattern.

## Functions Are Objects

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# A function is an object
print(type(greet))      # <class 'function'>
print(greet)            # <function greet at 0x...>

# Assign to a variable
say_hello = greet       # NOT calling it - just referencing it
print(say_hello)        # Same object as greet
print(say_hello("Alice"))   # Works! Output: Hello, Alice!
print(greet("Bob"))         # Also works: Hello, Bob!
\`\`\`

\`\`\`python
# Functions have attributes
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)    # add
print(add.__doc__)     # Add two numbers.
print(add.__module__)  # __main__

# Functions can be stored in a list
operations = [add, abs, len]
print(operations[0](5, 3))   # 8
print(operations[1](-42))    # 42
print(operations[2]("hello"))# 5
\`\`\`

## Passing Functions as Arguments

This is the foundation of functional programming in Python:

\`\`\`python
def apply(func, value):
    """Apply a function to a value."""
    return func(value)

def double(x):
    return x * 2

def square(x):
    return x ** 2

def negate(x):
    return -x

print(apply(double, 5))    # 10
print(apply(square, 5))    # 25
print(apply(negate, 5))    # -5
print(apply(str, 42))      # "42"
print(apply(len, "hello")) # 5
\`\`\`

\`\`\`python
def apply_to_all(func, items):
    """Apply func to every item in the list."""
    return [func(item) for item in items]

numbers = [1, 2, 3, 4, 5]
words = ["hello", "world", "python"]

print(apply_to_all(double, numbers))   # [2, 4, 6, 8, 10]
print(apply_to_all(square, numbers))   # [1, 4, 9, 16, 25]
print(apply_to_all(str.upper, words))  # ['HELLO', 'WORLD', 'PYTHON']
print(apply_to_all(len, words))        # [5, 5, 6]
\`\`\`

### Sorting with a Key Function

\`\`\`python
students = [
    {"name": "Alice",   "score": 88, "grade": "B"},
    {"name": "Bob",     "score": 95, "grade": "A"},
    {"name": "Charlie", "score": 72, "grade": "C"},
    {"name": "Diana",   "score": 88, "grade": "B"},
]

# Sort by score
by_score = sorted(students, key=lambda s: s["score"])
print([s["name"] for s in by_score])   # ['Charlie', 'Alice', 'Diana', 'Bob']

# Sort by name
by_name = sorted(students, key=lambda s: s["name"])
print([s["name"] for s in by_name])    # ['Alice', 'Bob', 'Charlie', 'Diana']

# Sort by score descending, then name ascending (multi-key)
multi = sorted(students, key=lambda s: (-s["score"], s["name"]))
print([f"{s['name']}({s['score']})" for s in multi])
# ['Bob(95)', 'Alice(88)', 'Diana(88)', 'Charlie(72)']
\`\`\`

## Returning Functions

Functions can return other functions:

\`\`\`python
def make_adder(n):
    """Create a function that adds n to its argument."""
    def add_n(x):
        return x + n
    return add_n

add5  = make_adder(5)
add10 = make_adder(10)
add100 = make_adder(100)

print(add5(3))     # 8
print(add10(3))    # 13
print(add100(3))   # 103

# They are independent functions
print(add5(add10(0)))   # 15
\`\`\`

\`\`\`python
def compose(f, g):
    """Create a function that applies g then f: f(g(x))"""
    def composed(x):
        return f(g(x))
    return composed

double = lambda x: x * 2
increment = lambda x: x + 1
square = lambda x: x ** 2

double_then_increment = compose(increment, double)  # increment(double(x))
increment_then_double = compose(double, increment)  # double(increment(x))

print(double_then_increment(5))   # 11   (5*2=10, 10+1=11)
print(increment_then_double(5))   # 12   (5+1=6,  6*2=12)

square_then_double = compose(double, square)
print(square_then_double(4))      # 32   (4^2=16, 16*2=32)
\`\`\`

## Storing Functions in Data Structures

\`\`\`python
# Dictionary of functions (dispatch table)
def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b
def div(a, b): return a / b if b != 0 else "Error: division by zero"

calculator = {
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
}

def calculate(a, op, b):
    func = calculator.get(op)
    if func is None:
        return f"Unknown operator: {op}"
    return func(a, b)

print(calculate(10, "+", 5))   # 15
print(calculate(10, "-", 5))   # 5
print(calculate(10, "*", 5))   # 50
print(calculate(10, "/", 0))   # Error: division by zero
print(calculate(10, "%", 5))   # Unknown operator: %
\`\`\`

\`\`\`python
# List of transformation functions
pipeline = [
    str.strip,
    str.lower,
    lambda s: s.replace(" ", "_"),
    lambda s: s.replace("-", "_"),
]

def apply_pipeline(text, funcs):
    result = text
    for func in funcs:
        result = func(result)
    return result

inputs = ["  Hello World  ", "Python-is-GREAT", "  Data Science  "]
for text in inputs:
    print(f"Input: {text!r:25} -> Output: {apply_pipeline(text, pipeline)!r}")
\`\`\`

Output:
\`\`\`
Input: '  Hello World  '          -> Output: 'hello_world'
Input: 'Python-is-GREAT'          -> Output: 'python_is_great'
Input: '  Data Science  '         -> Output: 'data_science'
\`\`\`

## map(), filter(), reduce() with Functions

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: apply a function to each element
squares = list(map(lambda x: x**2, numbers))
print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter: keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)     # [2, 4, 6, 8, 10]

# reduce: combine elements into a single value
product = reduce(lambda acc, x: acc * x, numbers)
print(product)   # 3628800 (10!)

# Chain them
result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x**2,
        filter(lambda x: x % 2 == 0, numbers))
)
print(result)    # 220 (4+16+36+64+100)
\`\`\`

## Higher-Order Functions

A **higher-order function** takes functions as arguments or returns a function:

\`\`\`python
def retry(func, times=3, exceptions=(Exception,)):
    """
    Retry a function multiple times if it raises an exception.
    Returns the result if successful, raises the last exception if all fail.
    """
    def wrapper(*args, **kwargs):
        last_error = None
        for attempt in range(1, times + 1):
            try:
                result = func(*args, **kwargs)
                print(f"Succeeded on attempt {attempt}")
                return result
            except exceptions as e:
                last_error = e
                print(f"Attempt {attempt} failed: {e}")
        raise last_error
    return wrapper

import random

def unreliable_function():
    """Fails 70% of the time."""
    if random.random() < 0.7:
        raise ConnectionError("Connection failed")
    return "Success!"

random.seed(42)
reliable = retry(unreliable_function, times=5)
try:
    result = reliable()
    print(result)
except Exception as e:
    print(f"All attempts failed: {e}")
\`\`\`

## functools Module for Functions-as-Objects

\`\`\`python
from functools import partial, wraps

# partial: pre-fill some arguments
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube   = partial(power, exp=3)

print(square(5))    # 25
print(cube(3))      # 27

numbers = [1, 2, 3, 4, 5]
print(list(map(square, numbers)))   # [1, 4, 9, 16, 25]

# wraps: preserve function metadata when wrapping
def my_decorator(func):
    @wraps(func)          # Preserve name, docstring, etc.
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def add(a, b):
    """Add two numbers."""
    return a + b

print(add.__name__)   # add  (not 'wrapper' - thanks to @wraps)
print(add.__doc__)    # Add two numbers.
\`\`\`

## Practical Example: Pipeline Pattern

\`\`\`python
def create_pipeline(*functions):
    """Create a processing pipeline from a series of functions."""
    def pipeline(value):
        result = value
        for func in functions:
            result = func(result)
        return result
    return pipeline

# Text processing pipeline
clean_text = create_pipeline(
    str.strip,
    str.lower,
    lambda s: ' '.join(s.split()),         # normalize whitespace
    lambda s: ''.join(c for c in s if c.isalnum() or c.isspace()),  # remove punctuation
)

# Number processing pipeline
process_number = create_pipeline(
    abs,                             # absolute value
    lambda x: x * 2,                # double
    lambda x: round(x, 2),          # round
    str,                             # convert to string
    lambda s: f"Result: {s}",        # format
)

texts = ["  HELLO, WORLD!  ", "Python   is   GREAT!", "  Spaces & Symbols!!! "]
for t in texts:
    print(clean_text(t))

print()
numbers = [-3.14159, 7.5, -0.001, 42]
for n in numbers:
    print(process_number(n))
\`\`\`

Output:
\`\`\`
hello world
python is great
spaces symbols

Result: 6.28
Result: 15.0
Result: 0.0
Result: 84
\`\`\`

> [!TIP]
> First-class functions are at the heart of Python's power. They enable patterns like decorators, callbacks, strategy pattern, and functional programming. When you see \`sorted(data, key=some_func)\`, \`map(func, data)\`, or \`filter(func, data)\`, you are already using first-class functions.`,
  objectives: [
    "Understand that functions are objects that can be stored in variables.",
    "Pass functions as arguments to other functions.",
    "Return functions from functions to create closures and factories.",
    "Store functions in lists and dictionaries for dispatch tables.",
    "Use functools.partial and functools.wraps effectively."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};