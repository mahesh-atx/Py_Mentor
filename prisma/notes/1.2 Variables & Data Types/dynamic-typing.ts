export const dynamicTypingLesson = {
  title: "Dynamic Typing in Python",
  slug: "dynamic-typing",
  content: `# Dynamic Typing in Python

Under the hood, a name in Python is a label that points at a value, and the type belongs to the value itself — not the name — so the same name can refer to different types at different times. The trade-off is that type errors surface only at runtime, because nothing stops a name from later pointing at an unexpected type.

## What is Dynamic Typing?

In some programming languages like Java or C++, when you create a variable, you must declare what type it is and it can never change:

\`\`\`java
// Java - statically typed
int age = 25;       // 'age' can only ever hold integers
age = "hello";      // ERROR in Java - can't change the type
\`\`\`

Python works differently. Python is **dynamically typed**, which means:
- You do not need to declare a variable's type
- A variable can hold any type of value
- The type of a variable can change as your program runs

\`\`\`python
# Python - dynamically typed
age = 25           # age is an int
print(type(age))   # Output: <class 'int'>

age = "twenty-five"  # Now age is a string - totally fine in Python!
print(type(age))     # Output: <class 'str'>

age = 25.5           # Now age is a float
print(type(age))     # Output: <class 'float'>
\`\`\`

## How Python Handles Types

In Python, types are attached to **values**, not to **variable names**. The variable is just a label that points to a value.

\`\`\`python
x = 10
# x -----> [10] (an integer object in memory)

x = "hello"
# x -----> ["hello"] (now x points to a string object)

x = [1, 2, 3]
# x -----> [[1, 2, 3]] (now x points to a list object)
\`\`\`

## Practical Example of Dynamic Typing

\`\`\`python
data = 100
print(data, type(data))  # Output: 100 <class 'int'>

data = data / 3
print(data, type(data))  # Output: 33.333... <class 'float'>

data = str(data)
print(data, type(data))  # Output: 33.333... <class 'str'>

data = None
print(data, type(data))  # Output: None <class 'NoneType'>
\`\`\`

## Advantages of Dynamic Typing

**1. Less code to write**
\`\`\`python
# No need to write 'string name' or 'int age' like other languages
name = "Alice"
age = 25
# Python figures out the types automatically
\`\`\`

**2. More flexible code**
\`\`\`python
def display(value):
    print("Value:", value)

display(42)          # Works with int
display("hello")     # Works with string
display([1, 2, 3])   # Works with list
display(True)        # Works with bool
\`\`\`

## Disadvantages and Cautions

**Type errors can happen at runtime:**
\`\`\`python
age = "25"   # This is a string, not an int

# This will cause a TypeError at runtime
result = age + 5   # ERROR: cannot add str and int
\`\`\`

**Fix:**
\`\`\`python
age = "25"
result = int(age) + 5
print(result)  # Output: 30
\`\`\`

**Variables can accidentally change type:**
\`\`\`python
price = 10.99
# ... many lines of code later ...
price = "free"   # Accidentally changed to string

# Now this will fail:
total = price * 2   # ERROR
\`\`\`

## Type Checking to Stay Safe

Since Python is dynamic, it is good practice to check types when needed:

\`\`\`python
def add_numbers(a, b):
    if not isinstance(a, (int, float)):
        print("Error: a must be a number")
        return
    if not isinstance(b, (int, float)):
        print("Error: b must be a number")
        return
    return a + b

print(add_numbers(5, 3))       # Output: 8
print(add_numbers(5, "hello")) # Output: Error: b must be a number
\`\`\`

## Duck Typing

Python follows a philosophy called **duck typing**:

> "If it walks like a duck and quacks like a duck, it is a duck."

This means Python does not care about the exact type of an object - it only cares whether the object can perform the required operation.

\`\`\`python
def print_length(item):
    # We don't care if item is a string, list, or tuple
    # As long as it has a length, this works
    print(len(item))

print_length("hello")       # Output: 5
print_length([1, 2, 3, 4])  # Output: 4
print_length((10, 20))      # Output: 2
\`\`\`

> [!TIP]
> Dynamic typing makes Python beginner-friendly and flexible. However, as your programs get bigger, using type hints (covered later) helps prevent type-related bugs and makes your code easier to understand.`,
  objectives: [
    "Understand what dynamic typing means in Python.",
    "Know the difference between static and dynamic typing.",
    "Understand how Python attaches types to values, not variables.",
    "Be aware of the potential pitfalls of dynamic typing."
  ],
  difficulty: "beginner",
  xpReward: 50,
};