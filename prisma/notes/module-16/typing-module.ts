export const typingModuleLesson = {
  title: "typing Module: Optional, Union, Any, Callable, TypeVar, Generic",
  slug: "typing-module",
  content: `# typing Module

The \`typing\` module provides special types for more complex type annotations. While Python 3.9+ lets you use built-ins for simple collections, \`typing\` is needed for advanced cases.

\`\`\`python
from typing import Optional, Union, Any, Callable, TypeVar, Generic
\`\`\`

## Optional - A Value That Could Be None

\`Optional[X]\` means the value is either \`X\` or \`None\`. It is equivalent to \`Union[X, None]\`.

\`\`\`python
from typing import Optional

# The return value is either a str OR None
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # Returns None if not found

name = find_user(1)   # "Alice"
name = find_user(99)  # None

# Parameter that might not be provided
def create_profile(
    name: str,
    bio: Optional[str] = None,      # bio is optional
    avatar_url: Optional[str] = None  # avatar is optional
) -> dict[str, Optional[str]]:
    return {"name": name, "bio": bio, "avatar": avatar_url}
\`\`\`

### Python 3.10+ Shorthand

\`\`\`python
# Python 3.10+ - use X | None instead of Optional[X]
def find_user(user_id: int) -> str | None:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# The old way still works everywhere
from typing import Optional
def find_user(user_id: int) -> Optional[str]:
    pass
\`\`\`

## Union - One of Several Types

\`Union[X, Y, Z]\` means the value can be X, Y, OR Z.

\`\`\`python
from typing import Union

# Accept either int or float
def square(x: Union[int, float]) -> Union[int, float]:
    return x ** 2

print(square(5))      # 25   (int)
print(square(2.5))    # 6.25 (float)

# A parameter that can be multiple types
def process(data: Union[str, list[str], dict[str, str]]) -> list[str]:
    if isinstance(data, str):
        return [data]
    elif isinstance(data, list):
        return data
    else:
        return list(data.values())

# Python 3.10+ shorthand
def square(x: int | float) -> int | float:
    return x ** 2

def process(data: str | list[str] | dict[str, str]) -> list[str]:
    pass
\`\`\`

\`\`\`python
# Real-world: function that accepts flexible input
from typing import Union

def to_int(value: Union[int, str, float]) -> int:
    """Convert various types to int."""
    if isinstance(value, int):
        return value
    elif isinstance(value, float):
        return int(value)
    elif isinstance(value, str):
        return int(value.strip())
    raise TypeError(f"Cannot convert {type(value).__name__} to int")

print(to_int(42))      # 42
print(to_int(3.7))     # 3
print(to_int("  15  ")) # 15
\`\`\`

## Any - Opt Out of Type Checking

\`Any\` disables type checking for a variable. Use it when you genuinely cannot know the type, but use it sparingly.

\`\`\`python
from typing import Any

# Complete opt-out - any type is accepted
def log(message: Any) -> None:
    print(f"LOG: {message}")

log("hello")    # OK
log(42)         # OK
log([1, 2, 3])  # OK
log(None)       # OK

# Function that works with any type of data
def save_to_cache(key: str, value: Any) -> None:
    cache[key] = value

# Receiving data from JSON (structure unknown)
def process_api_response(data: Any) -> str:
    return str(data)

# Any is compatible with every type
x: Any = 42
x = "hello"     # No error - Any accepts everything
x = [1, 2, 3]   # Still fine

# AVOID overusing Any - it defeats the purpose of type hints
\`\`\`

## Callable - Function Types

\`Callable[[arg_types], return_type]\` describes a function or callable object.

\`\`\`python
from typing import Callable

# A function that takes a str and returns str
transform: Callable[[str], str] = str.upper
print(transform("hello"))   # HELLO

# A function taking int and float, returning bool
predicate: Callable[[int, float], bool]

# Higher-order functions - functions that take/return functions
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))

double = lambda x: x * 2
print(apply(double, 5))        # 10
print(apply_twice(double, 5))  # 20

# Function that returns a function
def make_multiplier(factor: int) -> Callable[[int], int]:
    def multiply(x: int) -> int:
        return x * factor
    return multiply

triple = make_multiplier(3)
print(triple(7))   # 21
\`\`\`

\`\`\`python
from typing import Callable

# Callback pattern
def process_data(
    data: list[int],
    transform: Callable[[int], int],
    filter_func: Callable[[int], bool]
) -> list[int]:
    transformed = [transform(x) for x in data]
    return [x for x in transformed if filter_func(x)]

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = process_data(
    numbers,
    lambda x: x ** 2,           # Square each number
    lambda x: x > 20            # Keep only > 20
)
print(result)   # [25, 36, 49, 64, 81, 100]

# Callable with no arguments
Factory = Callable[[], int]   # A function taking nothing, returning int
counter: Factory = lambda: 42
\`\`\`

## TypeVar - Generic Type Variables

\`TypeVar\` creates a type variable that represents "some consistent type" - used to write generic functions that work with multiple types while maintaining type consistency.

\`\`\`python
from typing import TypeVar

T = TypeVar('T')   # T can be ANY type

# identity() works for ANY type but returns the SAME type it received
def identity(value: T) -> T:
    return value

x: int = identity(42)       # T is int, returns int
s: str = identity("hello")  # T is str, returns str
# y: str = identity(42)     # mypy error: T is int here, can't assign to str
\`\`\`

\`\`\`python
from typing import TypeVar, Sequence

T = TypeVar('T')

# first() works on any sequence and returns an item of the same type
def first(items: Sequence[T]) -> T:
    return items[0]

numbers: list[int] = [1, 2, 3]
first_num: int = first(numbers)      # T = int, returns int

words: list[str] = ["hello", "world"]
first_word: str = first(words)        # T = str, returns str

# Bounded TypeVar - T must be a number type
from typing import TypeVar
Number = TypeVar('Number', int, float, complex)

def double(value: Number) -> Number:
    return value * 2

print(double(5))      # 10    (int)
print(double(2.5))    # 5.0   (float)
# double("hi")        # Type error - str is not Number
\`\`\`

## Generic Classes

\`\`\`python
from typing import TypeVar, Generic, Optional

T = TypeVar('T')

class Stack(Generic[T]):
    """A type-safe stack that holds items of type T."""

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items.pop()

    def peek(self) -> Optional[T]:
        return self._items[-1] if self._items else None

    def __len__(self) -> int:
        return len(self._items)

    def __str__(self) -> str:
        return f"Stack({self._items})"

# int stack - only ints allowed
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
int_stack.push(3)
print(int_stack.pop())   # 3  - type checker knows this is an int

# str stack
str_stack: Stack[str] = Stack()
str_stack.push("hello")
str_stack.push("world")
print(str_stack.pop())   # world - type checker knows this is a str
\`\`\`

\`\`\`python
from typing import TypeVar, Generic

K = TypeVar('K')
V = TypeVar('V')

class Pair(Generic[K, V]):
    """A generic pair of two values."""

    def __init__(self, key: K, value: V) -> None:
        self.key = key
        self.value = value

    def swap(self) -> "Pair[V, K]":
        return Pair(self.value, self.key)

    def __str__(self) -> str:
        return f"Pair({self.key!r}, {self.value!r})"

p: Pair[str, int] = Pair("age", 25)
print(p)          # Pair('age', 25)

swapped: Pair[int, str] = p.swap()
print(swapped)    # Pair(25, 'age')
\`\`\`

## List, Dict, Tuple, Set from typing (Legacy)

For Python 3.7 and 3.8, use these instead of built-in types:

\`\`\`python
from typing import List, Dict, Tuple, Set, FrozenSet, Sequence, Mapping

# Python 3.7-3.8 style
names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 88}
point: Tuple[int, int] = (10, 20)
unique: Set[str] = {"a", "b", "c"}

# Fixed-length tuple
rgb: Tuple[int, int, int] = (255, 128, 0)

# Variable-length tuple of ints
numbers: Tuple[int, ...] = (1, 2, 3, 4, 5)

# Python 3.9+ style (same thing, shorter)
names: list[str] = ["Alice", "Bob"]
scores: dict[str, int] = {"Alice": 88}
point: tuple[int, int] = (10, 20)
unique: set[str] = {"a", "b", "c"}
\`\`\`

## Practical Example: Generic Cache

\`\`\`python
from typing import TypeVar, Generic, Optional, Callable
from datetime import datetime, timedelta

K = TypeVar('K')
V = TypeVar('V')

class Cache(Generic[K, V]):
    """A simple TTL cache with type safety."""

    def __init__(self, ttl_seconds: int = 300) -> None:
        self._data: dict[K, tuple[V, datetime]] = {}
        self._ttl = timedelta(seconds=ttl_seconds)

    def set(self, key: K, value: V) -> None:
        self._data[key] = (value, datetime.now())

    def get(self, key: K) -> Optional[V]:
        if key not in self._data:
            return None
        value, timestamp = self._data[key]
        if datetime.now() - timestamp > self._ttl:
            del self._data[key]
            return None
        return value

    def get_or_compute(self, key: K, compute: Callable[[], V]) -> V:
        cached = self.get(key)
        if cached is not None:
            return cached
        value = compute()
        self.set(key, value)
        return value

    def __len__(self) -> int:
        return len(self._data)

# Type-safe caches
user_cache: Cache[int, str] = Cache(ttl_seconds=60)
score_cache: Cache[str, float] = Cache(ttl_seconds=300)

user_cache.set(1, "Alice")
user_cache.set(2, "Bob")

print(user_cache.get(1))    # Alice
print(user_cache.get(99))   # None

# get_or_compute example
def expensive_lookup() -> str:
    return "ComputedValue"

result: str = score_cache.get_or_compute("key1", expensive_lookup)
print(result)   # ComputedValue
\`\`\`

> [!TIP]
> Use \`Optional[X]\` (or \`X | None\` in 3.10+) when a value can be None. Use \`Union[X, Y]\` (or \`X | Y\` in 3.10+) when a value can be one of several types. Use \`Any\` sparingly - only when you genuinely cannot know the type. Use \`TypeVar\` when writing functions that work generically across types while maintaining type consistency.`,
  objectives: [
    "Use Optional[X] to represent values that can be None.",
    "Use Union[X, Y] for values that can be one of several types.",
    "Use Any for complete type flexibility (sparingly).",
    "Use Callable to annotate function parameters and return types.",
    "Create generic classes and functions using TypeVar and Generic."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};