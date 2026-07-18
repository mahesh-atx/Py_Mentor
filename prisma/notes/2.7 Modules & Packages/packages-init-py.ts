export const packagesInitPyLesson = {
  title: "Packages & __init__.py",
  slug: "packages-init-py",
  content: `# Packages & \_\_init\_\_.py

A **package** is a way of organizing related modules into a directory hierarchy. Packages allow you to structure large applications into manageable, logical units.

## What is a Package?

A package is simply a directory containing:
1. Python modules (\`.py\` files)
2. An \`__init__.py\` file (can be empty)
3. Optionally, sub-packages (nested directories)

\`\`\`
my_package/                 # This is the package
    __init__.py            # Makes it a package
    module_a.py            # Module inside the package
    module_b.py            # Another module
    sub_package/           # Sub-package
        __init__.py
        module_c.py
\`\`\`

## The \_\_init\_\_.py File

The \`__init__.py\` file serves two purposes:

1. **Marks the directory as a package** — Python recognizes it as importable
2. **Initialization code** — Runs when the package is first imported

\`\`\`python
# File: my_package/__init__.py

# Can be empty (just marks as a package)

# Or can contain initialization code
print("my_package initialized!")

# Define what gets imported with 'from my_package import *'
__all__ = ["module_a", "module_b"]

# Convenience imports (make commonly used items available)
from .module_a import greet, farewell
from .module_b import Calculator

# Package-level metadata
__version__ = "1.0.0"
__author__ = "Your Name"
\`\`\`

## Creating a Package

\`\`\`python
# Directory structure:
# shapes/
#     __init__.py
#     circle.py
#     rectangle.py
#     triangle.py

# File: shapes/__init__.py
\"\"\"Shapes package for geometric calculations.\"\"\"
from .circle import Circle
from .rectangle import Rectangle
from .triangle import Triangle

__all__ = ["Circle", "Rectangle", "Triangle"]

# File: shapes/circle.py
import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def circumference(self):
        return 2 * math.pi * self.radius

# File: shapes/rectangle.py
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# File: shapes/triangle.py
import math

class Triangle:
    def __init__(self, a, b, c):
        self.a, self.b, self.c = a, b, c

    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))

    def perimeter(self):
        return self.a + self.b + self.c
\`\`\`

## Importing from Packages

\`\`\`python
# Import the entire package
import shapes
c = shapes.Circle(5)

# Import specific module from package
from shapes import circle
c = circle.Circle(5)

# Import specific item from module in package
from shapes.circle import Circle
c = Circle(5)

# Import from sub-package
# from shapes.three_d import sphere

# Using aliases
from shapes import rectangle as rect
r = rect.Rectangle(4, 6)
\`\`\`

## Relative Imports

Inside a package, use relative imports to reference sibling modules:

\`\`\`python
# File: shapes/__init__.py

# Relative imports (preferred within packages)
from .circle import Circle
from .rectangle import Rectangle

# File: shapes/triangle.py
# Import from sibling module
from .circle import Circle  # Import Circle from circle.py in same package
\`\`\`

> [!NOTE]
> Relative imports use dots: \`.\` = current package, \`..\` = parent package, \`...\` = grandparent, etc.

## Namespace Packages (Python 3.3+)

You can create packages without \`__init__.py\` files (implicit namespace packages), but explicit \`__init__.py\` is still recommended for most use cases.

## Practical Example: Utility Package

\`\`\`
utils/
    __init__.py
    string_utils.py
    number_utils.py
    file_utils.py
\`\`\`

\`\`\`python
# File: utils/__init__.py
\"\"\"Utility functions for common tasks.\"\"\"

from .string_utils import reverse, is_palindrome, count_words
from .number_utils import is_prime, factorial, fibonacci
from .file_utils import read_lines, write_lines, count_lines

__all__ = [
    "reverse", "is_palindrome", "count_words",
    "is_prime", "factorial", "fibonacci",
    "read_lines", "write_lines", "count_lines"
]

# File: utils/string_utils.py
def reverse(s):
    return s[::-1]

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

def count_words(text):
    return len(text.split())

# File: utils/number_utils.py
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

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# File: utils/file_utils.py
def read_lines(filepath):
    with open(filepath, 'r') as f:
        return f.readlines()

def write_lines(filepath, lines):
    with open(filepath, 'w') as f:
        f.writelines(lines)

def count_lines(filepath):
    with open(filepath, 'r') as f:
        return sum(1 for _ in f)
\`\`\`

\`\`\`python
# Using the package
from utils import reverse, is_prime, count_words

print(reverse("hello"))       # olleh
print(is_prime(17))           # True
print(count_words("hello world python"))  # 3

# Or import the whole package
import utils
print(utils.factorial(5))     # 120
print(utils.fibonacci(10))    # 55
\`\`\`

> [!TIP]
> Use packages when your project grows beyond a few modules. A good rule of thumb: if you have more than 5-10 related modules, organize them into packages.`,
  objectives: [
    "Understand what a package is and when to use one.",
    "Create packages with __init__.py files.",
    "Import modules from packages using various syntaxes.",
    "Use relative imports within packages.",
    "Organize related modules into a package hierarchy."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};
