export const creatingYourOwnModulesLesson = {
  title: "Creating Your Own Modules",
  slug: "creating-your-own-modules",
  content: `# Creating Your Own Modules

Any \`.py\` file can be a module. Creating your own modules helps organize code, promote reuse, and make your projects more maintainable.

## Basic Module Creation

\`\`\`python
# File: greetings.py
\"\"\"Module for greeting functions.\"\"\"

def hello(name):
    return f"Hello, {name}!"

def goodbye(name):
    return f"Goodbye, {name}!"

def formal_greet(title, name):
    return f"Hello, {title} {name}."
\`\`\`

\`\`\`python
# File: main.py
import greetings

print(greetings.hello("Alice"))           # Hello, Alice!
print(greetings.goodbye("Bob"))           # Goodbye, Bob!
print(greetings.formal_greet("Dr", "Smith"))  # Hello, Dr Smith.
\`\`\`

## Module with Classes

\`\`\`python
# File: shapes.py
\"\"\"Module for shape calculations.\"\"\"

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def circumference(self):
        return 2 * 3.14159 * self.radius

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)
\`\`\`

\`\`\`python
# File: main.py
from shapes import Circle, Rectangle

c = Circle(5)
print(f"Circle area: {c.area():.2f}")  # Circle area: 78.54

r = Rectangle(4, 6)
print(f"Rectangle area: {r.area()}")  # Rectangle area: 24
\`\`\`

## Module with Constants and Configuration

\`\`\`python
# File: config.py
\"\"\"Application configuration constants.\"\"\"

# Database settings
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "myapp"

# App settings
DEBUG = True
MAX_RETRIES = 3
TIMEOUT = 30

# API keys (in real apps, use environment variables)
API_VERSION = "v1"
BASE_URL = "https://api.example.com"
\`\`\`

\`\`\`python
# File: app.py
import config

print(f"Connecting to {config.DB_HOST}:{config.DB_PORT}")
print(f"Debug mode: {config.DEBUG}")
\`\`\`

## Organizing Multiple Modules

\`\`\`python
# File: string_utils.py
def capitalize_words(s):
    return " ".join(word.capitalize() for word in s.split())

def reverse_string(s):
    return s[::-1]

def count_vowels(s):
    return sum(1 for c in s.lower() if c in "aeiou")

# File: number_utils.py
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# File: main.py
from string_utils import capitalize_words, reverse_string
from number_utils import is_prime, factorial

print(capitalize_words("hello world"))  # Hello World
print(reverse_string("python"))         # nohtyp
print(is_prime(17))                     # True
print(factorial(5))                     # 120
\`\`\`

## Module Documentation

\`\`\`python
# File: calculator.py
\"\"\"
Calculator Module
=================

This module provides basic arithmetic operations
and advanced mathematical functions.

Functions:
    add(a, Sum of two numbers.
    subtract(a, b): Difference of two numbers.
    multiply(a, b): Product of two numbers.
    divide(a, b): Quotient of two numbers.
    power(base, exponent): Base raised to exponent.
\"\"\"

def add(a, b):
    \"\"\"Return the sum of a and b.\"\"\"
    return a + b

def subtract(a, b):
    \"\"\"Return the difference of a and b.\"\"\"
    return a - b

def multiply(a, b):
    \"\"\"Return the product of a and b.\"\"\"
    return a * b

def divide(a, b):
    \"\"\"Return the quotient of a and b.\"\"\"
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(base, exponent):
    \"\"\"Return base raised to the power of exponent.\"\"\"
    return base ** exponent
\`\`\`

## Best Practices

1. **One module, one purpose** — Keep modules focused on a single responsibility
2. **Descriptive names** — Use clear, lowercase names with underscores
3. **Docstrings** — Document your module and its functions
4. **Avoid circular imports** — Module A imports B, B imports A causes errors
5. **Use \_\_all\_\_** — Control what gets exported with \`from module import *\`

\`\`\`python
# File: my_module.py
__all__ = ["public_function", "PublicClass"]

def public_function():
    """This is part of the public API."""
    pass

def _private_function():
    """This is internal (convention only)."""
    pass
\`\`\`

> [!TIP]
> Start organizing code into modules when a file exceeds ~200 lines, or when you find yourself copying code between projects.`,
  objectives: [
    "Create a Python module from a .py file.",
    "Import and use custom modules.",
    "Organize code into multiple modules.",
    "Document modules with docstrings.",
    "Follow best practices for module design."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
