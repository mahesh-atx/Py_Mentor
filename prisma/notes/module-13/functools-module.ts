export const functoolsModuleLesson = {
  title: "functools Module",
  slug: "functools-module",
  content: `# functools Module

The \`functools\` module provides higher-order functions and tools for working with functions. It is part of Python's standard library.

\`\`\`python
import functools
# or import specific tools
from functools import lru_cache, reduce, wraps, partial, total_ordering
\`\`\`

## lru_cache - Memoize Function Results

\`@lru_cache\` caches function results so repeated calls with the same arguments return instantly. "LRU" = Least Recently Used (evicts old entries when cache is full).

\`\`\`python
from functools import lru_cache
import time

# Without cache - extremely slow for large n
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)

# With cache - instant even for n=100
@lru_cache(maxsize=None)  # None = unlimited cache size
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n-1) + fib_fast(n-2)

# Time comparison
start = time.time()
print(fib_fast(100))   # 354224848179261915075
print(f"Fast: {time.time() - start:.6f}s")  # ~0.000002s

# start = time.time()
# print(fib_slow(40))    # DON'T run this - takes seconds!
\`\`\`

### lru_cache with maxsize

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=128)   # Keep at most 128 cached results
def expensive_query(user_id, date):
    print(f"  Computing for user {user_id}, date {date}...")
    return f"data_{user_id}_{date}"

# First calls - computed
print(expensive_query(1, "2024-01"))   # Computing...
print(expensive_query(2, "2024-01"))   # Computing...
print(expensive_query(1, "2024-01"))   # CACHED - instant!
print(expensive_query(1, "2024-01"))   # CACHED - instant!

# Inspect cache
print(expensive_query.cache_info())
# CacheInfo(hits=2, misses=2, maxsize=128, currsize=2)

# Clear cache
expensive_query.cache_clear()
print(expensive_query.cache_info())
# CacheInfo(hits=0, misses=0, maxsize=128, currsize=0)
\`\`\`

### cache (Python 3.9+) - Simpler Unlimited Cache

\`\`\`python
from functools import cache   # Equivalent to lru_cache(maxsize=None)

@cache
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(100))
print(factorial.cache_info())
\`\`\`

### lru_cache Requirements

\`\`\`python
from functools import lru_cache

# Arguments MUST be hashable (no lists or dicts!)
@lru_cache(maxsize=None)
def process(data):
    return sum(data)

# Works with tuples (hashable)
print(process((1, 2, 3)))

# Won't work with lists (unhashable):
# process([1, 2, 3])   # TypeError!

# Workaround: convert to tuple before calling
def process_list(data):
    return process(tuple(data))
\`\`\`

## reduce - Cumulative Operations

\`\`\`python
from functools import reduce

# Sum
print(reduce(lambda acc, x: acc + x, [1, 2, 3, 4, 5]))   # 15

# Product
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4, 5]))   # 120

# Max value
print(reduce(lambda acc, x: acc if acc > x else x, [3, 1, 4, 1, 5, 9]))  # 9

# String join
words = ["Hello", "World", "Python"]
print(reduce(lambda acc, w: acc + " " + w, words))   # Hello World Python

# With initial value
print(reduce(lambda acc, x: acc + x, [1, 2, 3], 100))  # 106

# Flatten
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
print(flat)   # [1, 2, 3, 4, 5, 6]
\`\`\`

## wraps - Preserve Function Metadata

When you wrap a function (like in decorators), \`@wraps\` preserves the original function's name, docstring, and other metadata.

\`\`\`python
from functools import wraps

# WITHOUT @wraps - metadata is lost
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        """Wrapper docstring"""
        print(f"Calling function...")
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def my_function():
    """My function docstring"""
    return 42

print(my_function.__name__)   # 'wrapper'  (WRONG!)
print(my_function.__doc__)    # 'Wrapper docstring'  (WRONG!)

# WITH @wraps - metadata preserved
def good_decorator(func):
    @wraps(func)              # Apply wraps here
    def wrapper(*args, **kwargs):
        """Wrapper docstring"""
        print(f"Calling {func.__name__}...")
        return func(*args, **kwargs)
    return wrapper

@good_decorator
def my_function():
    """My function docstring"""
    return 42

print(my_function.__name__)    # 'my_function'  (correct!)
print(my_function.__doc__)     # 'My function docstring'  (correct!)
\`\`\`

### Practical Decorators with wraps

\`\`\`python
from functools import wraps
import time

def timer(func):
    """Measure and print function execution time."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

def retry(times=3, exceptions=(Exception,)):
    """Retry a function if it raises an exception."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == times:
                        raise
                    print(f"Attempt {attempt} failed: {e}")
        return wrapper
    return decorator

def validate_positive(*param_names):
    """Validate that specified parameters are positive."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            import inspect
            sig = inspect.signature(func)
            bound = sig.bind(*args, **kwargs)
            bound.apply_defaults()
            for name in param_names:
                if name in bound.arguments and bound.arguments[name] <= 0:
                    raise ValueError(f"{name} must be positive, got {bound.arguments[name]}")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@timer
@validate_positive("n")
def factorial(n):
    """Calculate n factorial."""
    if n <= 1: return 1
    return n * factorial(n - 1)

print(factorial(10))
\`\`\`

## partial - Pre-Fill Arguments (Review + Advanced)

\`\`\`python
from functools import partial

# Basic usage
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)

# Partial with built-ins
binary = partial(int, base=2)
print(binary("1010"))   # 10

# Chaining partials
add = lambda a, b, c: a + b + c
add_10 = partial(add, 10)
add_10_20 = partial(add_10, 20)
print(add_10_20(30))   # 60  (10 + 20 + 30)
\`\`\`

## total_ordering - Complete Comparison Methods

\`@total_ordering\` fills in missing comparison methods given \`__eq__\` and one of \`__lt__\`, \`__le__\`, \`__gt__\`, or \`__ge__\`.

\`\`\`python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __repr__(self):
        return f"Student({self.name}, {self.score})"

    def __eq__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.score == other.score

    def __lt__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.score < other.score

    # @total_ordering automatically generates:
    # __le__, __gt__, __ge__

alice = Student("Alice", 88)
bob = Student("Bob", 72)
charlie = Student("Charlie", 88)

print(alice > bob)     # True   (88 > 72)
print(alice <= bob)    # False  (88 <= 72 is False)
print(alice == charlie) # True  (88 == 88)
print(alice >= charlie) # True  (88 >= 88)

students = [Student("Dave", 95), bob, alice, charlie]
print(sorted(students))   # Sorted by score
print(max(students))      # Highest score
\`\`\`

## singledispatch - Function Overloading

\`\`\`python
from functools import singledispatch

@singledispatch
def process(arg):
    """Default implementation."""
    raise TypeError(f"Unsupported type: {type(arg)}")

@process.register(int)
def process_int(arg):
    return f"Integer: {arg * 2}"

@process.register(str)
def process_str(arg):
    return f"String: {arg.upper()}"

@process.register(list)
def process_list(arg):
    return f"List of {len(arg)} items: {sum(arg) if all(isinstance(x, (int, float)) for x in arg) else arg}"

print(process(42))           # Integer: 84
print(process("hello"))      # String: HELLO
print(process([1, 2, 3]))    # List of 3 items: 6
# process(3.14)              # TypeError: Unsupported type
\`\`\`

## Complete functools Quick Reference

\`\`\`python
from functools import (
    lru_cache,    # Memoize with LRU eviction
    cache,        # Unlimited memoization (3.9+)
    reduce,       # Fold/accumulate
    wraps,        # Preserve function metadata in decorators
    partial,      # Pre-fill function arguments
    total_ordering, # Auto-generate comparison methods
    singledispatch, # Function overloading by type
)

# Quick examples
from functools import lru_cache, reduce, wraps, partial

# lru_cache
@lru_cache(maxsize=128)
def heavy(n): return sum(range(n))

# reduce
total = reduce(lambda a, b: a + b, range(1, 11))   # 55

# wraps in decorator
def log_it(f):
    @wraps(f)
    def w(*a, **k):
        print(f"Calling {f.__name__}")
        return f(*a, **k)
    return w

# partial
double = partial(lambda x, n: x * n, n=2)
print(double(5))   # 10
\`\`\`

> [!TIP]
> \`@lru_cache\` is one of the most impactful single-line optimizations in Python. Use it on any pure function that is called repeatedly with the same arguments. Always use \`@wraps\` in decorators - it costs nothing and prevents confusing debugging sessions when function names appear wrong. Use \`total_ordering\` to avoid implementing all 6 comparison methods manually.`,
  objectives: [
    "Use @lru_cache to memoize expensive function calls.",
    "Use reduce() to accumulate iterables into a single value.",
    "Use @wraps to preserve function metadata in decorators.",
    "Use partial() to create pre-filled function variants.",
    "Use @total_ordering to auto-generate comparison methods."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};