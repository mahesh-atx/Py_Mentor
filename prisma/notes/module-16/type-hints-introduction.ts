export const typeHintsIntroductionLesson = {
  title: "What are Type Hints & Why Use Them",
  slug: "type-hints-introduction",
  content: `# What are Type Hints & Why Use Them

## The Problem Without Type Hints

Python is dynamically typed - variables can hold any type. This is flexible but creates problems in larger codebases:

\`\`\`python
# What type is 'data'? What does this function return?
def process(data, config):
    result = transform(data, config["limit"])
    return result

# You have to read ALL the code to understand what types are expected
# Easy to pass wrong types -> bugs discovered only at runtime
process("hello", {"limit": 10})   # Works
process(42, {"limit": 10})        # Might break inside transform()
process([], {"limit": "ten"})     # Might break - "ten" is not an int
\`\`\`

## What are Type Hints?

**Type hints** (also called type annotations) are optional labels you add to your code to say what type a variable, parameter, or return value should be. Python does NOT enforce them at runtime - they are just hints for:

1. **You** - to think clearly about your code
2. **Other developers** - to understand your intent
3. **Type checkers** (like mypy) - to catch bugs before running code
4. **IDEs** - to provide better autocomplete and error detection

\`\`\`python
# Without type hints - unclear
def add(a, b):
    return a + b

# With type hints - crystal clear
def add(a: int, b: int) -> int:
    return a + b

# Now ANYONE reading this knows:
# - a must be an int
# - b must be an int
# - The function returns an int
\`\`\`

## Basic Type Hint Syntax

\`\`\`python
# Variable annotation: variable: type = value
name: str = "Alice"
age: int = 25
height: float = 5.11
is_active: bool = True

# Function parameter: def func(param: type)
# Return type: def func() -> return_type

def greet(name: str) -> str:
    return f"Hello, {name}!"

def calculate_tax(price: float, rate: float) -> float:
    return price * rate

def is_adult(age: int) -> bool:
    return age >= 18

def print_info(name: str, age: int) -> None:  # None = no return value
    print(f"{name} is {age} years old")
\`\`\`

## Why Use Type Hints?

### 1. Better IDE Support

\`\`\`python
def get_user(user_id: int) -> dict:
    return {"id": user_id, "name": "Alice"}

user = get_user(42)
# IDE now knows 'user' is a dict and can autocomplete .keys(), .values(), etc.
\`\`\`

### 2. Catch Bugs Early

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# mypy would catch this BEFORE you run the code:
result = greet(123)      # Error: Argument 1 to "greet" has incompatible type "int"; expected "str"
result = greet(["Alice"]) # Error: Argument 1 is a list, not str
\`\`\`

### 3. Self-Documenting Code

\`\`\`python
# Without type hints - you need comments to explain
def find_user(id, include_deleted=False):
    # id: int - the user's database ID
    # include_deleted: bool - whether to include soft-deleted users
    # returns: dict or None if not found
    pass

# With type hints - the signature IS the documentation
from typing import Optional

def find_user(id: int, include_deleted: bool = False) -> Optional[dict]:
    pass
\`\`\`

### 4. Safer Refactoring

\`\`\`python
# When you change a function signature, type checker finds all callers that break
def calculate(price: float, qty: int) -> float:
    return price * qty

# If you rename qty to quantity, mypy finds all broken call sites
\`\`\`

## Type Hints are Optional and Not Enforced

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

# This WORKS at runtime - Python ignores type hints
result = add("hello", " world")
print(result)   # hello world - Python doesn't enforce the hint!

# Type hints are ONLY enforced by external tools like mypy
# NOT by Python itself
\`\`\`

## Gradual Typing

You can add type hints gradually - you do not need to annotate everything:

\`\`\`python
# Can mix annotated and unannotated code
def process_data(data):          # No annotation - that's fine
    cleaned = clean(data)        # No annotation
    return validate(cleaned)     # No annotation

def clean(text: str) -> str:     # Annotated
    return text.strip().lower()

def validate(value: str) -> bool: # Annotated
    return len(value) > 0
\`\`\`

## A Realistic Before/After

\`\`\`python
# BEFORE - hard to understand
def create_user(name, age, email, role="user"):
    if age < 18:
        raise ValueError("Must be 18+")
    return {
        "name": name,
        "age": age,
        "email": email,
        "role": role,
        "active": True
    }

user = create_user("Alice", 25, "alice@example.com")
# What type does this return? What's 'role' supposed to be?

# AFTER - completely clear
from typing import Literal

def create_user(
    name: str,
    age: int,
    email: str,
    role: Literal["user", "admin", "moderator"] = "user"
) -> dict[str, object]:
    if age < 18:
        raise ValueError("Must be 18+")
    return {
        "name": name,
        "age": age,
        "email": email,
        "role": role,
        "active": True
    }
# Now it's completely self-documenting!
\`\`\`

> [!TIP]
> Start adding type hints to new code right away - it costs almost nothing and pays dividends in code quality and IDE support. You do not need to annotate everything - focus on function signatures first (parameters and return types), as these are where type bugs most commonly occur.`,
  objectives: [
    "Understand what type hints are and what problems they solve.",
    "Know that Python does not enforce type hints at runtime.",
    "Write basic type annotations for variables and function signatures.",
    "Understand the benefits: IDE support, bug catching, documentation, refactoring.",
    "Understand gradual typing - adding hints incrementally."
  ],
  difficulty: "beginner",
  xpReward: 45,
};