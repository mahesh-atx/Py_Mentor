export const whatAreModulesLesson = {
  title: "What are Modules",
  slug: "what-are-modules",
  content: `# What are Modules

A **module** is a file containing Python code — definitions, functions, classes, and variables — that you can reuse in other programs. Modules help you organize code into logical units, avoid duplication, and leverage code written by others.

## Why Use Modules?

\`\`\`python
# Without modules: everything in one file (hard to maintain)
# With modules: code split into logical files

# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159

# main.py
from math_utils import add, multiply, PI

print(add(5, 3))       # 8
print(multiply(4, 2))  # 8
print(PI)              # 3.14159
\`\`\`

## Benefits of Modules

1. **Organization** — Group related code together
2. **Reusability** — Write once, use in many programs
3. **Maintainability** — Fix bugs in one place
4. **Namespace management** — Avoid name conflicts
5. **Collaboration** — Different team members work on different modules

## Types of Modules

\`\`\`python
# 1. Built-in modules (come with Python)
import os
import sys
import math

# 2. Standard Library modules (included with Python installation)
import random
import datetime
import json
import re

# 3. Third-party modules (installed via pip)
# pip install requests
# import requests

# 4. Custom modules (your own .py files)
# from my_module import my_function
\`\`\`

## Module Structure

A typical module contains:

\`\`\`python
# my_module.py

\"\"\"Docstring describing the module.\"\"\"

# Module-level constants
MAX_SIZE = 100
DEFAULT_NAME = "unknown"

# Function definitions
def greet(name):
    return f"Hello, {name}!"

def farewell(name):
    return f"Goodbye, {name}!"

# Class definitions
class Greeter:
    def __init__(self, name):
        self.name = name

# Module-level code (runs on import)
print(f"Module {__name__} loaded!")
\`\`\`

## How Python Finds Modules

When you import a module, Python searches in this order:

1. **Current directory** — where your script is located
2. **PYTHONPATH** — environment variable with additional directories
3. **Standard Library** — Python's built-in library paths
4. **Site-packages** — where third-party packages are installed

\`\`\`python
import sys
print(sys.path)  # Shows all directories Python searches
\`\`\`

> [!TIP]
> Keep your module filenames short, lowercase, and without special characters. Use underscores for readability (e.g., \`string_utils.py\` not \`string-utils.py\`).`,
  objectives: [
    "Understand what a module is and why modules are useful.",
    "Identify the different types of modules in Python.",
    "Recognize the typical structure of a module.",
    "Understand how Python locates modules when importing."
  ],
  difficulty: "beginner",
  xpReward: 40,
};
