export const commonExceptionsLesson = {
  title: "Common Exceptions",
  slug: "common-exceptions",
  content: `# Common Exceptions

## Python's Exception Hierarchy

Python organizes exceptions in a hierarchy. Understanding this helps you catch the right level:

\`\`\`
BaseException
├── SystemExit           # sys.exit() called
├── KeyboardInterrupt    # Ctrl+C pressed
├── GeneratorExit        # Generator closed
└── Exception            # All regular exceptions
    ├── ArithmeticError
    │   ├── ZeroDivisionError
    │   ├── OverflowError
    │   └── FloatingPointError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── TypeError
    ├── ValueError
    ├── AttributeError
    ├── NameError
    │   └── UnboundLocalError
    ├── OSError
    │   ├── FileNotFoundError
    │   ├── PermissionError
    │   └── TimeoutError
    ├── RuntimeError
    │   └── RecursionError
    ├── StopIteration
    ├── ImportError
    │   └── ModuleNotFoundError
    └── ... many more
\`\`\`

## ValueError - Wrong Value, Right Type

Raised when an operation receives the right type but an inappropriate value.

\`\`\`python
# int() with non-numeric string
try:
    n = int("hello")
except ValueError as e:
    print(e)   # invalid literal for int() with base 10: 'hello'

# float() with non-numeric string
try:
    f = float("abc")
except ValueError as e:
    print(e)   # could not convert string to float: 'abc'

# Unpacking with wrong number of values
try:
    a, b, c = [1, 2]   # Only 2 values, need 3
except ValueError as e:
    print(e)   # not enough values to unpack (expected 3, got 2)

# Out of range for math
import math
try:
    result = math.sqrt(-1)
except ValueError as e:
    print(e)   # math domain error

# Custom validation
def set_age(age):
    if not isinstance(age, int):
        raise TypeError(f"Age must be an int, not {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"Age must be between 0 and 150, got {age}")
    return age
\`\`\`

## TypeError - Wrong Type

Raised when an operation is applied to an object of inappropriate type.

\`\`\`python
# Arithmetic with incompatible types
try:
    result = "hello" + 42
except TypeError as e:
    print(e)   # can only concatenate str (not "int") to str

# Calling a non-callable
try:
    x = 5
    x()
except TypeError as e:
    print(e)   # 'int' object is not callable

# Wrong number of arguments
def add(a, b):
    return a + b

try:
    add(1, 2, 3)
except TypeError as e:
    print(e)   # add() takes 2 positional arguments but 3 were given

# Comparison of incompatible types
try:
    result = "5" > 3
except TypeError as e:
    print(e)   # '>' not supported between instances of 'str' and 'int'

# Unhashable type (using list as dict key)
try:
    d = {[1, 2]: "value"}
except TypeError as e:
    print(e)   # unhashable type: 'list'
\`\`\`

## IndexError - Index Out of Range

Raised when a sequence index is out of range.

\`\`\`python
my_list = [10, 20, 30]

try:
    item = my_list[5]     # Valid indices: 0, 1, 2
except IndexError as e:
    print(e)   # list index out of range

try:
    item = my_list[-10]   # Valid negative: -1, -2, -3
except IndexError as e:
    print(e)   # list index out of range

# Safe access pattern
def safe_get(lst, index, default=None):
    try:
        return lst[index]
    except IndexError:
        return default

print(safe_get([1, 2, 3], 1))     # 2
print(safe_get([1, 2, 3], 10))    # None
print(safe_get([1, 2, 3], 10, 0)) # 0
\`\`\`

## KeyError - Missing Dictionary Key

Raised when a dictionary key is not found.

\`\`\`python
data = {"name": "Alice", "age": 25}

try:
    email = data["email"]   # 'email' key doesn't exist
except KeyError as e:
    print(e)    # 'email'
    print(f"Key {e} not found in dictionary")

# Safe access alternatives
# 1. Use .get() with default
email = data.get("email", "not provided")
print(email)   # not provided

# 2. Use 'in' check
if "email" in data:
    email = data["email"]
else:
    email = "not provided"

# 3. Use setdefault()
data.setdefault("email", "unknown@example.com")
\`\`\`

## AttributeError - Missing Attribute or Method

Raised when an attribute or method reference fails.

\`\`\`python
# Calling a method that doesn't exist
try:
    x = 42
    x.append(1)   # int has no append() method
except AttributeError as e:
    print(e)   # 'int' object has no attribute 'append'

# Accessing attribute on None
try:
    result = None
    print(result.upper())
except AttributeError as e:
    print(e)   # 'NoneType' object has no attribute 'upper'

# Typo in method name
try:
    text = "hello"
    text.Upper()   # Should be .upper()
except AttributeError as e:
    print(e)   # 'str' object has no attribute 'Upper'

# Safe attribute access
def safe_call(obj, method_name, default=None, *args, **kwargs):
    method = getattr(obj, method_name, None)
    if callable(method):
        return method(*args, **kwargs)
    return default
\`\`\`

## NameError - Undefined Variable

Raised when a variable is used before being defined.

\`\`\`python
try:
    print(undefined_variable)
except NameError as e:
    print(e)   # name 'undefined_variable' is not defined

# Common cause: typo in variable name
score = 95
try:
    print(Score)   # Capital S - different name!
except NameError as e:
    print(e)   # name 'Score' is not defined

# UnboundLocalError - using local variable before assignment
def bad_function():
    try:
        print(x)   # x used before assignment
        x = 10
    except UnboundLocalError as e:
        print(e)   # local variable 'x' referenced before assignment

bad_function()
\`\`\`

## FileNotFoundError / OSError - File Problems

\`\`\`python
# File not found
try:
    with open("nonexistent.txt", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    print(f"File error: {e}")   # [Errno 2] No such file or directory: 'nonexistent.txt'

# Permission denied
try:
    with open("/etc/shadow", "r") as f:   # System file, no access
        content = f.read()
except PermissionError as e:
    print(f"Permission: {e}")

# Directory not found
try:
    with open("nonexistent_dir/file.txt", "w") as f:
        f.write("hello")
except FileNotFoundError as e:
    print(f"Directory error: {e}")

# IsADirectoryError
try:
    with open(".", "r") as f:   # '.' is a directory, not a file
        content = f.read()
except IsADirectoryError as e:
    print(f"Is a directory: {e}")

# Comprehensive file handling
def safe_read_file(filename):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' does not exist.")
    except PermissionError:
        print(f"Error: No permission to read '{filename}'.")
    except IsADirectoryError:
        print(f"Error: '{filename}' is a directory, not a file.")
    except UnicodeDecodeError:
        print(f"Error: '{filename}' contains characters that can't be decoded.")
    except OSError as e:
        print(f"OS Error reading '{filename}': {e}")
    return None
\`\`\`

## ZeroDivisionError and ArithmeticError

\`\`\`python
# Division by zero
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(e)   # division by zero

try:
    result = 10 // 0
except ZeroDivisionError as e:
    print(e)   # integer division or modulo by zero

try:
    result = 10 % 0
except ZeroDivisionError as e:
    print(e)   # integer division or modulo by zero

# OverflowError
try:
    import math
    result = math.exp(1000)   # Too large for float
except OverflowError as e:
    print(e)   # math range error
\`\`\`

## StopIteration - Iterator Exhausted

\`\`\`python
# When next() is called on an exhausted iterator
my_list = [1, 2, 3]
iterator = iter(my_list)

print(next(iterator))   # 1
print(next(iterator))   # 2
print(next(iterator))   # 3

try:
    print(next(iterator))   # Iterator is exhausted!
except StopIteration:
    print("No more items in iterator")

# next() with default avoids StopIteration
value = next(iterator, "no more")
print(value)   # no more
\`\`\`

## ImportError / ModuleNotFoundError

\`\`\`python
try:
    import nonexistent_module
except ModuleNotFoundError as e:
    print(e)   # No module named 'nonexistent_module'

# ImportError when the module exists but the name doesn't
try:
    from os import nonexistent_function
except ImportError as e:
    print(e)   # cannot import name 'nonexistent_function' from 'os'

# Safe conditional import
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False
    print("NumPy not installed. Using pure Python.")

if HAS_NUMPY:
    arr = np.array([1, 2, 3])
else:
    arr = [1, 2, 3]   # Fallback
\`\`\`

## RuntimeError and RecursionError

\`\`\`python
# RecursionError - too many recursive calls
import sys

def infinite_recursion(n):
    return infinite_recursion(n + 1)

try:
    infinite_recursion(0)
except RecursionError as e:
    print(f"Recursion error: {e}")
    # maximum recursion depth exceeded

# Check recursion limit
print(sys.getrecursionlimit())   # 1000 (default)
\`\`\`

## Practical Example: Robust Data Parser

\`\`\`python
def parse_record(record_dict):
    """
    Parse a raw data record with comprehensive error handling.
    Returns a cleaned dict or raises with a helpful message.
    """
    errors = []
    cleaned = {}

    # Parse name
    try:
        name = record_dict["name"]
        if not isinstance(name, str) or not name.strip():
            errors.append("name must be a non-empty string")
        else:
            cleaned["name"] = name.strip().title()
    except KeyError:
        errors.append("missing required field: name")

    # Parse age
    try:
        age_raw = record_dict["age"]
        age = int(age_raw)
        if not (0 <= age <= 150):
            errors.append(f"age must be 0-150, got {age}")
        else:
            cleaned["age"] = age
    except KeyError:
        errors.append("missing required field: age")
    except (ValueError, TypeError):
        errors.append(f"age must be a number, got: {record_dict.get('age')!r}")

    # Parse score (optional)
    try:
        if "score" in record_dict:
            score = float(record_dict["score"])
            if not (0.0 <= score <= 100.0):
                errors.append(f"score must be 0-100, got {score}")
            else:
                cleaned["score"] = round(score, 1)
    except (ValueError, TypeError):
        errors.append(f"score must be a number, got: {record_dict.get('score')!r}")

    if errors:
        raise ValueError(f"Invalid record: {'; '.join(errors)}")

    return cleaned

# Test the parser
records = [
    {"name": "alice johnson", "age": "25", "score": "88.5"},
    {"name": "",              "age": "30"},          # Empty name
    {"name": "Charlie",      "age": "200"},          # Invalid age
    {"name": "Diana",        "age": "hello"},        # Non-numeric age
    {"age": "22"},                                   # Missing name
    {"name": "Eve",          "age": "22", "score": "150"},  # Bad score
]

for i, record in enumerate(records, 1):
    try:
        cleaned = parse_record(record)
        print(f"Record {i}: OK -> {cleaned}")
    except ValueError as e:
        print(f"Record {i}: FAIL -> {e}")
\`\`\`

Output:
\`\`\`
Record 1: OK -> {'name': 'Alice Johnson', 'age': 25, 'score': 88.5}
Record 2: FAIL -> Invalid record: name must be a non-empty string
Record 3: FAIL -> Invalid record: age must be 0-150, got 200
Record 4: FAIL -> Invalid record: age must be a number, got: 'hello'
Record 5: FAIL -> Invalid record: missing required field: name
Record 6: FAIL -> Invalid record: score must be 0-100, got 150.0
\`\`\`

## Quick Reference

\`\`\`
Exception              When it occurs
-------------------    ----------------------------------------
ValueError             Right type, wrong value (int("abc"))
TypeError              Wrong type for operation ("a" + 1)
IndexError             List index out of range (lst[10])
KeyError               Dict key not found (d["missing"])
AttributeError         Attribute/method doesn't exist (x.foo)
NameError              Variable not defined (print(undefined))
FileNotFoundError      File doesn't exist (open("nope.txt"))
PermissionError        No access to file/directory
ZeroDivisionError      Division by zero (10 / 0)
OverflowError          Number too large for float
RecursionError         Too many recursive calls
ImportError            Cannot import module or name
StopIteration          Iterator is exhausted
RuntimeError           General runtime error
\`\`\`

> [!TIP]
> Always catch the most specific exception type that matches your situation. Catching \`ValueError\` is better than catching \`Exception\`. Use \`isinstance(e, (TypeError, ValueError))\` inside a broad catch if you need to differentiate. The \`.get()\` method on dicts prevents \`KeyError\`, and \`getattr(obj, 'attr', default)\` prevents \`AttributeError\`.`,
  objectives: [
    "Recognize and handle the most common Python exceptions.",
    "Understand the exception hierarchy and when to catch parent exceptions.",
    "Use specific exception types instead of catching Exception broadly.",
    "Apply safe access patterns to prevent common exceptions.",
    "Build robust data parsers that handle multiple error conditions."
  ],
  difficulty: "beginner",
  xpReward: 60,
};