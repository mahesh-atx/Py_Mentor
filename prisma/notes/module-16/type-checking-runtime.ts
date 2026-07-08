export const typeCheckingRuntimeLesson = {
  title: "Type Checking with mypy & Runtime Type Checking",
  slug: "type-checking-runtime",
  content: `# Type Checking with mypy & Runtime Type Checking

## Type Checking with mypy

**mypy** is the most popular static type checker for Python. It reads your type annotations and reports errors WITHOUT running your code.

### Installing mypy

\`\`\`bash
pip install mypy
\`\`\`

### Running mypy

\`\`\`bash
# Check a single file
mypy my_file.py

# Check a directory
mypy my_project/

# With strict mode (more thorough)
mypy --strict my_file.py

# Ignore missing imports
mypy my_file.py --ignore-missing-imports
\`\`\`

### What mypy Catches

\`\`\`python
# save as example.py, then run: mypy example.py

def add(a: int, b: int) -> int:
    return a + b

# mypy finds these errors without running the code:
result = add("hello", "world")  # error: Argument 1 has type "str"; expected "int"
result = add(1, 2, 3)           # error: Too many arguments for "add"
result: str = add(1, 2)         # error: Incompatible types: "int" and "str"
\`\`\`

\`\`\`python
# None handling
from typing import Optional

def get_name(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None

name = get_name(1)
# mypy error: Item "None" of "Optional[str]" has no attribute "upper"
print(name.upper())   # Risk! name might be None

# Fix: check for None first
if name is not None:
    print(name.upper())   # OK - mypy knows name is str here

# Or use assertion
assert name is not None
print(name.upper())   # OK - mypy trusts the assertion
\`\`\`

### mypy Configuration File

Create \`mypy.ini\` or \`setup.cfg\`:

\`\`\`ini
# mypy.ini
[mypy]
python_version = 3.11
strict = False
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True  # Require all functions to have type hints
ignore_missing_imports = True

# Per-module settings
[mypy-requests.*]
ignore_missing_imports = True
\`\`\`

### Type: ignore Comments

\`\`\`python
# Suppress a specific mypy error
result = some_untyped_function()  # type: ignore
result = some_untyped_function()  # type: ignore[no-any-return]

# Suppress for the whole file (first line)
# type: ignore
\`\`\`

## Runtime Type Checking

Python does NOT enforce type hints at runtime. But sometimes you NEED runtime validation. Here are the approaches:

### isinstance() - The Built-in Way

\`\`\`python
def safe_add(a: int | float, b: int | float) -> int | float:
    # Runtime type checking using isinstance
    if not isinstance(a, (int, float)):
        raise TypeError(f"Expected int or float for 'a', got {type(a).__name__}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"Expected int or float for 'b', got {type(b).__name__}")
    return a + b

print(safe_add(5, 3))       # 8
print(safe_add(2.5, 1.5))   # 4.0
safe_add("5", 3)             # TypeError: Expected int or float for 'a', got str
\`\`\`

### Building a Type Validator Decorator

\`\`\`python
import functools
import inspect
import typing
from typing import get_type_hints, Any

def enforce_types(func):
    """A decorator that enforces type hints at runtime."""
    hints = get_type_hints(func)
    sig = inspect.signature(func)

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Bind arguments to parameters
        bound = sig.bind(*args, **kwargs)
        bound.apply_defaults()

        # Check each annotated parameter
        for param_name, value in bound.arguments.items():
            if param_name in hints:
                expected_type = hints[param_name]
                # Skip None type, Any, and complex generic types
                if expected_type is type(None) or expected_type is Any:
                    continue
                # Get the origin type for generics (list[str] -> list)
                origin = getattr(expected_type, '__origin__', expected_type)
                if not isinstance(value, origin):
                    raise TypeError(
                        f"Argument '{param_name}' must be {expected_type.__name__ if hasattr(expected_type, '__name__') else expected_type}, "
                        f"got {type(value).__name__}"
                    )

        result = func(*args, **kwargs)

        # Check return type
        if 'return' in hints and hints['return'] is not type(None):
            return_type = hints['return']
            origin = getattr(return_type, '__origin__', return_type)
            if not isinstance(result, origin):
                raise TypeError(f"Return value must be {return_type}, got {type(result).__name__}")

        return result

    return wrapper

@enforce_types
def greet(name: str, times: int) -> str:
    return (f"Hello, {name}! " * times).strip()

print(greet("Alice", 2))    # Hello, Alice! Hello, Alice!
greet(123, 2)               # TypeError: Argument 'name' must be str, got int
greet("Alice", "twice")     # TypeError: Argument 'times' must be int, got str
\`\`\`

### Using dataclasses for Structured Data with Type Hints

\`\`\`python
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Student:
    name: str
    age: int
    score: float
    email: Optional[str] = None
    courses: list[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        # Validate after __init__
        if not self.name:
            raise ValueError("Name cannot be empty")
        if not 0 <= self.age <= 150:
            raise ValueError(f"Invalid age: {self.age}")
        if not 0.0 <= self.score <= 100.0:
            raise ValueError(f"Invalid score: {self.score}")

# Dataclasses automatically use annotations for fields
alice = Student("Alice", 20, 88.5)
print(alice)
# Student(name='Alice', age=20, score=88.5, email=None, courses=[])

alice.courses.append("Python")
alice.courses.append("Math")
print(alice.courses)   # ['Python', 'Math']

# These WILL fail (Python doesn't enforce type hints even in dataclasses)
# but __post_init__ validates values
try:
    bad = Student("", 20, 88.5)   # Caught by __post_init__
except ValueError as e:
    print(f"Error: {e}")
\`\`\`

### Pydantic - The Gold Standard for Runtime Validation

Pydantic is the most popular library for runtime type validation. It enforces types automatically:

\`\`\`python
# pip install pydantic

from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, Literal
from datetime import datetime

class Address(BaseModel):
    street: str
    city: str
    country: str = "US"
    zip_code: str

class User(BaseModel):
    id: int
    name: str = Field(min_length=1, max_length=100)
    email: str                            # Pydantic validates email format
    age: int = Field(ge=0, le=150)        # ge=greater-than-or-equal, le=less-than-or-equal
    role: Literal["user", "admin"] = "user"
    score: float = Field(ge=0.0, le=100.0)
    address: Optional[Address] = None
    created_at: datetime = Field(default_factory=datetime.now)

    @validator('name')
    def name_must_not_be_blank(cls, v):
        if v.strip() == '':
            raise ValueError('Name cannot be blank')
        return v.title()  # Auto-format to title case

# Pydantic validates AT RUNTIME when creating the object
try:
    user = User(
        id=1,
        name="alice johnson",  # Auto-converted to "Alice Johnson"
        email="alice@example.com",
        age=25,
        score=88.5,
        address={
            "street": "123 Main St",
            "city": "New York",
            "zip_code": "10001"
        }
    )
    print(user.name)    # Alice Johnson
    print(user.role)    # user
    print(user.address.city if user.address else None)  # New York

except Exception as e:
    print(f"Validation error: {e}")

# These WILL raise ValidationError at runtime:
try:
    bad_user = User(
        id="not-an-int",  # Error: id must be int
        name="Bob",
        email="invalid-email",  # Error: invalid email
        age=200,          # Error: age must be <= 150
        score=150.0       # Error: score must be <= 100
    )
except Exception as e:
    print(f"Validation errors caught!")
\`\`\`

## get_type_hints() - Access Annotations at Runtime

\`\`\`python
import typing
from typing import get_type_hints, Optional

def greet(name: str, times: int = 1) -> str:
    return f"Hello, {name}! " * times

# Get all type hints including inherited ones
hints = get_type_hints(greet)
print(hints)
# {'name': <class 'str'>, 'times': <class 'int'>, 'return': <class 'str'>}

class MyClass:
    x: int
    y: str = "hello"

    def method(self, value: float) -> bool:
        return value > 0

# Get class annotations
class_hints = get_type_hints(MyClass)
print(class_hints)   # {'x': <class 'int'>, 'y': <class 'str'>}

# Get method annotations
method_hints = get_type_hints(MyClass.method)
print(method_hints)  # {'value': <class 'float'>, 'return': <class 'bool'>}
\`\`\`

## TYPE_CHECKING - Avoid Circular Imports

\`\`\`python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    # This code only runs when mypy is checking, NOT at runtime
    # Great for avoiding circular imports
    from my_module import SomeExpensiveClass

def process(obj: "SomeExpensiveClass") -> None:
    # Use string annotation to avoid runtime import
    pass
\`\`\`

## Quick Reference: All Runtime Checking Tools

\`\`\`python
# 1. isinstance() - simple type check
isinstance(value, int)
isinstance(value, (int, float))

# 2. get_type_hints() - access annotations
import typing
hints = typing.get_type_hints(func_or_class)

# 3. dataclasses with __post_init__ - validated data classes
from dataclasses import dataclass
@dataclass
class Point:
    x: float
    y: float

# 4. Pydantic BaseModel - full runtime validation
from pydantic import BaseModel
class User(BaseModel):
    name: str
    age: int

# 5. @enforce_types decorator (custom) - enforce at function calls

# 6. typing.get_origin() and typing.get_args() - inspect complex types
from typing import get_origin, get_args, Optional, List
print(get_origin(list[int]))        # <class 'list'>
print(get_args(list[int]))          # (<class 'int'>,)
print(get_origin(Optional[str]))    # typing.Union
print(get_args(Optional[str]))      # (<class 'str'>, <class 'NoneType'>)
\`\`\`

## Practical Example: A Typed Configuration System

\`\`\`python
from dataclasses import dataclass, field
from typing import Literal, Optional
import os

@dataclass
class DatabaseConfig:
    host: str
    port: int
    name: str
    user: str
    password: str
    ssl: bool = False

    def __post_init__(self) -> None:
        if not 1 <= self.port <= 65535:
            raise ValueError(f"Invalid port: {self.port}")
        if not self.host:
            raise ValueError("Database host cannot be empty")

@dataclass
class AppConfig:
    environment: Literal["development", "staging", "production"]
    debug: bool
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"]
    database: DatabaseConfig
    secret_key: str
    allowed_hosts: list[str] = field(default_factory=list)
    port: int = 8000
    max_connections: Optional[int] = None

    def is_production(self) -> bool:
        return self.environment == "production"

    def validate(self) -> None:
        if self.is_production() and self.debug:
            raise ValueError("Debug mode cannot be enabled in production!")
        if self.is_production() and not self.allowed_hosts:
            raise ValueError("Allowed hosts must be set in production!")

# Build config from environment variables (simulated)
def load_config() -> AppConfig:
    db = DatabaseConfig(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        name=os.getenv("DB_NAME", "myapp"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASS", "secret"),
    )

    config = AppConfig(
        environment="development",  # type: Literal["development", "staging", "production"]
        debug=True,
        log_level="DEBUG",
        database=db,
        secret_key="dev-secret-key",
        allowed_hosts=["localhost", "127.0.0.1"],
    )
    config.validate()
    return config

config = load_config()
print(f"Running in {config.environment} mode")
print(f"Database: {config.database.host}:{config.database.port}")
print(f"Debug: {config.debug}")
print(f"Production: {config.is_production()}")
\`\`\`

Output:
\`\`\`
Running in development mode
Database: localhost:5432
Debug: True
Production: False
\`\`\`

> [!TIP]
> Use **mypy** for static checking during development - run it in your CI/CD pipeline to catch type errors before they reach production. Use **Pydantic** for runtime validation of external data (API inputs, configuration files, user data). Use **dataclasses** with \`__post_init__\` for validated data structures when you do not need Pydantic's full power. Never rely on type hints alone for data validation - they are NOT enforced at runtime.`,
  objectives: [
    "Install and run mypy for static type checking.",
    "Understand what errors mypy catches that Python misses.",
    "Use isinstance() for basic runtime type checking.",
    "Build decorators that enforce type hints at runtime.",
    "Use dataclasses and Pydantic for structured, validated data."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};