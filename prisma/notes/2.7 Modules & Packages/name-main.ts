export const nameMainLesson = {
  title: "__name__ == \"__main__\"",
  slug: "name-main",
  content: `# \_\_name\_\_ == "\_\_main\_\_"

Every Python module has a special built-in variable called \`__name__\`. When a module is run directly, \`__name__\` is set to \`"__main__"\`. When it's imported, \`__name__\` is set to the module's filename. This idiom lets you write code that behaves differently when run directly vs. when imported.

## Understanding \_\_name\_\_

\`\`\`python
# File: my_module.py
print(f"__name__ is: {__name__}")

def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    # This code only runs when the file is executed directly
    print("Running as a script!")
    print(greet("World"))
\`\`\`

\`\`\`bash
# Running directly
$ python my_module.py
__name__ is: __main__
Running as a script!
Hello, World!
\`\`\`

\`\`\`python
# Importing as a module
>>> import my_module
__name__ is: my_module
>>> my_module.greet("Alice")
'Hello, Alice!'
\`\`\`

## The if \_\_name\_\_ == "\_\_main\_\_" Idiom

This pattern is so common it has its own name — the "main guard" or "name-main idiom":

\`\`\`python
# File: calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def main():
    """Run when executed as a script."""
    print("Calculator Program")
    print(f"2 + 3 = {add(2, 3)}")
    print(f"10 - 4 = {subtract(10, 4)}")
    print(f"3 * 7 = {multiply(3, 7)}")
    print(f"15 / 3 = {divide(15, 3)}")

if __name__ == "__main__":
    main()
\`\`\`

## Why Use This Pattern?

1. **Dual use** — Module can be imported (reusable code) AND run directly (script)
2. **Testing** — Include test code that only runs when executed directly
3. **Demo code** — Show usage examples without affecting imports
4. **Side effects** — Prevent unwanted execution on import

## Practical Examples

### Module with Test Code

\`\`\`python
# File: string_utils.py
def reverse(s):
    return s[::-1]

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

def count_words(text):
    return len(text.split())

# Test code — only runs when executed directly
if __name__ == "__main__":
    print("Running tests...")
    assert reverse("hello") == "olleh"
    assert is_palindrome("racecar") == True
    assert is_palindrome("hello") == False
    assert count_words("hello world") == 2
    print("All tests passed!")
\`\`\`

### Module with CLI Interface

\`\`\`python
# File: file_analyzer.py
import os

def count_lines(filepath):
    with open(filepath, 'r') as f:
        return len(f.readlines())

def count_words(filepath):
    with open(filepath, 'r') as f:
        return len(f.read().split())

def count_chars(filepath):
    with open(filepath, 'r') as f:
        return len(f.read())

def main():
    import sys
    if len(sys.argv) != 2:
        print("Usage: python file_analyzer.py <filepath>")
        sys.exit(1)

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found")
        sys.exit(1)

    print(f"File: {filepath}")
    print(f"Lines: {count_lines(filepath)}")
    print(f"Words: {count_words(filepath)}")
    print(f"Characters: {count_chars(filepath)}")

if __name__ == "__main__":
    main()
\`\`\`

### Module with Demo

\`\`\`python
# File: shapes.py
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def __str__(self):
        return f"Circle(radius={self.radius})"

class Square:
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

    def __str__(self):
        return f"Square(side={self.side})"

def main():
    """Demonstrate the shapes module."""
    shapes = [Circle(5), Square(4), Circle(3)]
    for shape in shapes:
        print(f"{shape}: area = {shape.area():.2f}")

if __name__ == "__main__":
    main()
    # Output:
    # Circle(radius=5): area = 78.54
    # Square(side=4): area = 16.00
    # Circle(radius=3): area = 28.27
\`\`\`

## Common Mistakes

\`\`\`python
# ❌ WRONG: Forgetting the quotes
if __name__ == __main__:
    pass

# ✅ CORRECT: __main__ is a string
if __name__ == "__main__":
    pass

# ❌ WRONG: Using single equals (assignment)
if __name__ = "__main__":
    pass

# ✅ CORRECT: Using double equals (comparison)
if __name__ == "__main__":
    pass
\`\`\`

> [!TIP]
> Always use the \`if __name__ == "__main__":\` guard when writing code that should only run when a file is executed directly. This is a Python best practice that makes your modules both importable and executable.`,
  objectives: [
    "Understand what __name__ is and how it works.",
    "Use the if __name__ == '__main__' idiom.",
    "Write modules that work as both importable code and scripts.",
    "Include test or demo code that only runs when executed directly."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
