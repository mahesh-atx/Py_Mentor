export const returnStatementLesson = {
  title: "Return Statement & Multiple Return Values",
  slug: "return-statement",
  content: `# Return Statement & Multiple Return Values

## The return Statement

The \`return\` statement sends a value back to the caller and **immediately exits** the function.

\`\`\`python
def add(a, b):
    result = a + b
    return result    # Send the result back to the caller

total = add(5, 3)
print(total)         # Output: 8
print(add(10, 20))   # Output: 30
\`\`\`

### Without return - Functions Return None

If a function has no \`return\` statement (or just \`return\` with no value), it returns \`None\`:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")    # Just prints, no return

result = greet("Alice")    # greet() prints but returns None
print(result)              # Output: None

def empty_return():
    return                 # Returns None explicitly

print(empty_return())      # Output: None
\`\`\`

### return Exits the Function Immediately

\`\`\`python
def check_positive(n):
    if n < 0:
        return "Negative"    # Exits here if n is negative
    if n == 0:
        return "Zero"        # Exits here if n is zero
    return "Positive"        # Only reached if n > 0

print(check_positive(-5))    # Output: Negative
print(check_positive(0))     # Output: Zero
print(check_positive(7))     # Output: Positive
\`\`\`

\`\`\`python
# Early return - cleaner than nested if-else
def validate_age(age):
    if not isinstance(age, int):
        return "Error: age must be an integer"
    if age < 0:
        return "Error: age cannot be negative"
    if age > 150:
        return "Error: age is unrealistically large"
    return f"Valid age: {age}"

print(validate_age("twenty"))   # Error: age must be an integer
print(validate_age(-5))         # Error: age cannot be negative
print(validate_age(25))         # Valid age: 25
\`\`\`

## Returning Different Types

A function can return any Python type:

\`\`\`python
def get_name():
    return "Alice"           # returns str

def get_age():
    return 25                # returns int

def get_scores():
    return [85, 92, 78]      # returns list

def get_config():
    return {"debug": True, "port": 8080}   # returns dict

def is_admin():
    return True              # returns bool

def find_user(user_id):
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # returns str or None
\`\`\`

## Multiple Return Values

Python functions can return multiple values by separating them with commas. Python packs them into a **tuple**.

\`\`\`python
def get_min_max(numbers):
    return min(numbers), max(numbers)   # Returns a tuple

result = get_min_max([5, 3, 8, 1, 9, 2])
print(result)          # Output: (1, 9)  - it's a tuple!
print(type(result))    # Output: <class 'tuple'>

# Unpack directly
minimum, maximum = get_min_max([5, 3, 8, 1, 9, 2])
print(minimum)    # Output: 1
print(maximum)    # Output: 9
\`\`\`

\`\`\`python
def get_circle_stats(radius):
    import math
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    diameter = 2 * radius
    return area, circumference, diameter

area, circ, diam = get_circle_stats(5)
print(f"Area: {area:.2f}")
print(f"Circumference: {circ:.2f}")
print(f"Diameter: {diam:.2f}")
\`\`\`

\`\`\`python
def divide_with_remainder(a, b):
    if b == 0:
        return None, None   # Return None for both on error
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide_with_remainder(17, 5)
if q is not None:
    print(f"17 ÷ 5 = {q} remainder {r}")
# Output: 17 ÷ 5 = 3 remainder 2
\`\`\`

### Returning a Named Tuple for Clarity

\`\`\`python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
Stats = namedtuple('Stats', ['mean', 'median', 'std'])

def get_center(x1, y1, x2, y2):
    return Point((x1 + x2) / 2, (y1 + y2) / 2)

center = get_center(0, 0, 10, 8)
print(center)        # Output: Point(x=5.0, y=4.0)
print(center.x)      # Output: 5.0  (named access)
print(center.y)      # Output: 4.0
\`\`\`

### Returning a Dictionary for Many Values

\`\`\`python
def analyze_text(text):
    words = text.split()
    return {
        "word_count": len(words),
        "char_count": len(text),
        "unique_words": len(set(words)),
        "avg_word_length": sum(len(w) for w in words) / len(words) if words else 0
    }

result = analyze_text("the quick brown fox jumps over the lazy dog")
print(f"Words: {result['word_count']}")
print(f"Unique: {result['unique_words']}")
print(f"Avg length: {result['avg_word_length']:.2f}")
\`\`\`

## Practical Example: Statistics Calculator

\`\`\`python
def calculate_stats(data):
    """Calculate comprehensive statistics for a list of numbers."""
    if not data:
        return None
    
    n = len(data)
    total = sum(data)
    mean = total / n
    
    sorted_data = sorted(data)
    mid = n // 2
    median = sorted_data[mid] if n % 2 else (sorted_data[mid-1] + sorted_data[mid]) / 2
    
    variance = sum((x - mean) ** 2 for x in data) / n
    std_dev = variance ** 0.5
    
    return mean, median, std_dev, min(data), max(data)

scores = [85, 92, 78, 95, 88, 76, 91, 84, 89, 90]
mean, median, std, low, high = calculate_stats(scores)

print(f"Mean   : {mean:.2f}")
print(f"Median : {median:.2f}")
print(f"Std Dev: {std:.2f}")
print(f"Range  : {low} - {high}")
\`\`\`

Output:
\`\`\`
Mean   : 86.80
Median : 88.50
Std Dev: 5.74
Range  : 76 - 95
\`\`\`

## Returning Functions (Preview)

Functions can return other functions - we will explore this more in the First-Class Functions lesson:

\`\`\`python
def make_multiplier(factor):
    def multiply(number):
        return number * factor
    return multiply    # Return the inner function!

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))    # Output: 10
print(triple(5))    # Output: 15
print(double(triple(4)))  # Output: 24
\`\`\`

> [!TIP]
> Use \`return\` to make functions reusable - a function that only prints is harder to use in different contexts than one that returns a value. Use multiple return values when data naturally belongs together. For many related values, return a dictionary for clarity.`,
  objectives: [
    "Use return to send values back from a function.",
    "Understand that functions return None without an explicit return.",
    "Use return for early exit from a function.",
    "Return multiple values using tuple packing and unpacking.",
    "Choose the right return type (tuple, dict, namedtuple) for multiple values."
  ],
  difficulty: "beginner",
  xpReward: 60,
};