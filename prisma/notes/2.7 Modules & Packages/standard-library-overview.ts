export const standardLibraryOverviewLesson = {
  title: "Python Standard Library Overview",
  slug: "standard-library-overview",
  content: `# Python Standard Library Overview

Python's **Standard Library** is a collection of modules included with every Python installation. It provides ready-to-use tools for common tasks — no installation required. "Batteries included" is Python's philosophy.

## math — Mathematical Functions

\`\`\`python
import math

# Constants
print(math.pi)      # 3.141592653589793
print(math.e)       # 2.718281828459045
print(math.tau)     # 6.283185307179586 (2*pi)
print(math.inf)     # Infinity
print(math.nan)     # Not a number

# Rounding
print(math.floor(4.7))   # 4
print(math.ceil(4.2))    # 5
print(math.trunc(4.9))   # 4

# Powers and logarithms
print(math.sqrt(16))     # 4.0
print(math.pow(2, 10))   # 1024.0
print(math.log(100))     # Natural log: 4.605...
print(math.log10(100))   # 2.0
print(math.log2(8))      # 3.0

# Trigonometry
print(math.sin(math.pi / 2))  # 1.0
print(math.cos(0))            # 1.0
print(math.degrees(math.pi))  # 180.0
print(math.radians(180))      # 3.14159...

# Other useful functions
print(math.factorial(5))  # 120
print(math.gcd(12, 8))    # 4
print(math.comb(5, 2))    # 10 (combinations)
print(math.perm(5, 2))    # 20 (permutations)
\`\`\`

## random — Random Number Generation

\`\`\`python
import random

# Random floats
print(random.random())        # 0.0 to 1.0
print(random.uniform(1, 10))   # 1.0 to 10.0

# Random integers
print(random.randint(1, 6))   # 1 to 6 (inclusive)
print(random.randrange(0, 100, 5))  # Multiple of 5: 0-95

# Sequences
items = ["apple", "banana", "cherry", "date"]
print(random.choice(items))       # Pick one
print(random.sample(items, 2))    # Pick 2 unique
random.shuffle(items)             # Shuffle in place

# Reproducibility
random.seed(42)  # Same seed = same results
print(random.random())
\`\`\`

## datetime — Date and Time

\`\`\`python
from datetime import datetime, date, timedelta

# Current date and time
now = datetime.now()
print(now)                  # 2024-01-15 14:30:45.123456
print(now.year)             # 2024
print(now.month)            # 1
print(now.day)              # 15
print(now.hour)             # 14
print(now.minute)           # 30
print(now.second)           # 45

# Create specific dates
birthday = date(2000, 5, 15)
meeting = datetime(2024, 3, 15, 10, 30)

# Date arithmetic
today = date.today()
one_week = timedelta(days=7)
next_week = today + one_week
print(next_week)

# Formatting
print(now.strftime("%Y-%m-%d"))          # 2024-01-15
print(now.strftime("%B %d, %Y"))         # January 15, 2024
print(now.strftime("%I:%M %p"))          # 02:30 PM

# Parsing strings to dates
date_str = "2024-03-15"
parsed = datetime.strptime(date_str, "%Y-%m-%d")
print(parsed)  # 2024-03-15 00:00:00
\`\`\`

## os — Operating System Interface

\`\`\`python
import os

# File and directory operations
print(os.getcwd())              # Current working directory
os.listdir(".")                 # List files in directory
os.path.exists("myfile.txt")    # Check if path exists
os.path.isfile("myfile.txt")    # Is it a file?
os.path.isdir("myfolder")       # Is it a directory?

# Path manipulation (cross-platform)
path = os.path.join("folder", "subfolder", "file.txt")
print(path)  # folder/subfolder/file.txt (or folder\\subfolder\\file.txt on Windows)

print(os.path.basename("/path/to/file.txt"))  # file.txt
print(os.path.dirname("/path/to/file.txt"))   # /path/to
print(os.path.splitext("file.txt"))           # ('file', '.txt')

# Environment variables
print(os.environ.get("HOME"))
print(os.environ.get("PATH"))

# Running system commands
os.system("ls -la")  # Use subprocess instead when possible
\`\`\`

## sys — System-Specific Parameters

\`\`\`python
import sys

# Command-line arguments
print(sys.argv)  # ['script.py', 'arg1', 'arg2']

# Python version
print(sys.version)       # 3.12.0 ...
print(sys.version_info)  # sys.version_info(major=3, minor=12, ...)

# Module search path
print(sys.path)  # List of directories Python searches

# Standard streams
sys.stdout.write("Hello\\n")
sys.stderr.write("Error!\\n")

# Exit the program
# sys.exit(0)  # Success
# sys.exit(1)  # Error

# Platform info
print(sys.platform)  # 'linux', 'darwin', 'win32'

# Maximum sizes
print(sys.maxsize)   # Maximum integer size
\`\`\`

## platform — Platform Information

\`\`\`python
import platform

print(platform.system())       # 'Linux', 'Darwin', 'Windows'
print(platform.release())      # Kernel version
print(platform.machine())      # 'x86_64', 'arm64'
print(platform.processor())    # Processor name
print(platform.python_version())  # '3.12.0'
print(platform.python_compiler()) # 'GCC 11.3.0'
print(platform.architecture())    # ('64bit', 'ELF')
\`\`\`

## collections — Specialized Container Types

\`\`\`python
from collections import Counter, defaultdict, namedtuple, deque

# Counter — count occurrences
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print(counts)                    # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(counts.most_common(2))     # [('apple', 3), ('banana', 2)]

# defaultdict — default values for missing keys
ages = defaultdict(list)
ages["students"].append("Alice")
ages["students"].append("Bob")
print(ages["teachers"])  # [] (empty list, not KeyError)

# namedtuple — tuple with named fields
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)  # 3 4

# deque — double-ended queue (fast append/pop from both ends)
dq = deque([1, 2, 3])
dq.appendleft(0)  # Add to front
dq.append(4)      # Add to back
dq.popleft()      # Remove from front
dq.pop()          # Remove from back
\`\`\`

## itertools — Iterator Functions

\`\`\`python
import itertools

# Infinite iterators
counter = itertools.count(start=10, step=2)
print([next(counter) for _ in range(5)])  # [10, 12, 14, 16, 18]

cycler = itertools.cycle("AB")
print([next(cycler) for _ in range(5)])   # ['A', 'B', 'A', 'B', 'A']

repeater = itertools.repeat(5, 3)
print(list(repeater))  # [5, 5, 5]

# Combinatorics
print(list(itertools.permutations([1, 2, 3], 2)))
# [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

print(list(itertools.combinations([1, 2, 3], 2)))
# [(1, 2), (1, 3), (2, 3)]

# Chaining iterables
combined = itertools.chain([1, 2], [3, 4], [5, 6])
print(list(combined))  # [1, 2, 3, 4, 5, 6]
\`\`\`

## string — String Constants and Utilities

\`\`\`python
import string

print(string.ascii_lowercase)   # 'abcdefghijklmnopqrstuvwxyz'
print(string.ascii_uppercase)   # 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
print(string.ascii_letters)     # Both lower and upper
print(string.digits)            # '0123456789'
print(string.hexdigits)         # '0123456789abcdefABCDEF'
print(string.punctuation)       # '!"#$%&\'()*+,-./:;<=>?@[\\]^_\`{|}~'
print(string.whitespace)        # ' \\t\\n\\r\\x0b\\x0c'
print(string.printable)         # All printable characters

# Useful for validation
def is_valid_password(pwd):
    return (len(pwd) >= 8 and
            any(c in string.ascii_uppercase for c in pwd) and
            any(c in string.digits for c in pwd) and
            any(c in string.punctuation for c in pwd))
\`\`\`

## re — Regular Expressions

\`\`\`python
import re

# Search for a pattern
text = "My email is alice@example.com"
match = re.search(r'\\b\\w+@\\w+\\.\\w+\\b', text)
if match:
    print(match.group())  # alice@example.com

# Find all matches
text = "Emails: alice@test.com, bob@demo.org"
emails = re.findall(r'\\b\\w+@\\w+\\.\\w+\\b', text)
print(emails)  # ['alice@test.com', 'bob@demo.org']

# Replace
text = "Hello 123 World 456"
result = re.sub(r'\\d+', 'X', text)
print(result)  # Hello X World X

# Split
text = "apple, banana; cherry|date"
result = re.split(r'[,;|]\\s*', text)
print(result)  # ['apple', 'banana', 'cherry', 'date']

# Validate patterns
def is_valid_email(email):
    pattern = r'^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$'
    return bool(re.match(pattern, email))

print(is_valid_email("alice@example.com"))  # True
print(is_valid_email("invalid@@email"))     # False
\`\`\`

> [!TIP]
> The Standard Library is vast. You don't need to memorize it all — just know what's available so you can look it up when needed. The official docs at docs.python.org are your best reference.`,
  objectives: [
    "Use the math module for mathematical operations.",
    "Generate random numbers with the random module.",
    "Work with dates and times using datetime.",
    "Interact with the operating system via os and sys.",
    "Use specialized containers from collections.",
    "Create iterators with itertools.",
    "Work with string constants and regular expressions."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};
