export const typeAndIdLesson = {
  title: "type() and id() Functions",
  slug: "type-and-id-functions",
  content: `# type() and id() Functions

Python gives you built-in tools to inspect your variables. Two of the most useful inspection functions are \`type()\` and \`id()\`.

## The Theory — Building the Logic

\`type()\` and \`id()\` are your windows into how Python actually represents values: \`type()\` reveals the class an object belongs to, while \`id()\` reveals its unique identity in memory. Because every value is an object, two variables can hold equal *content* yet point at different *objects*, which is the crucial difference between \`==\` (same value) and \`is\` (same object). Python reuses objects in some cases — such as small integers and short strings — for efficiency, which is why identical-looking values sometimes share an \`id\` and sometimes do not. A common pitfall is using \`is\` to compare values by content; reserve \`is\` for identity (and \`None\`) and use \`==\` or \`isinstance()\` for what you actually mean to check.

## type() Function

The \`type()\` function tells you **what kind of data** a variable is holding. This is very useful when you are not sure what type a value is, especially when debugging.

### Basic Usage

\`\`\`python
name = "Alice"
age = 25
height = 5.11
is_student = True
result = None

print(type(name))        # Output: <class 'str'>
print(type(age))         # Output: <class 'int'>
print(type(height))      # Output: <class 'float'>
print(type(is_student))  # Output: <class 'bool'>
print(type(result))      # Output: <class 'NoneType'>
\`\`\`

The output \`<class 'str'>\` means the value belongs to the \`str\` class (data type).

### Checking Type Directly in Code

You can use \`type()\` inside conditions to make decisions:
\`\`\`python
value = 42

if type(value) == int:
    print("This is an integer.")
else:
    print("This is not an integer.")

# Output: This is an integer.
\`\`\`

### type() After Type Casting

\`type()\` is very helpful to confirm that your type casting worked:
\`\`\`python
number_text = "100"
print(type(number_text))  # Output: <class 'str'>

number = int(number_text)
print(type(number))       # Output: <class 'int'>
\`\`\`

### type() with Expressions

You can also check the type of the result of an expression:
\`\`\`python
print(type(10 + 5))     # Output: <class 'int'>
print(type(10 / 5))     # Output: <class 'float'>  (division always returns float)
print(type(10 // 5))    # Output: <class 'int'>    (floor division returns int)
print(type(True + 1))   # Output: <class 'int'>
\`\`\`

## isinstance() - A Better Way to Check Types

While \`type()\` is useful, Python developers often prefer \`isinstance()\` for checking types because it also handles inheritance (more on that later).

\`\`\`python
age = 25

print(isinstance(age, int))    # Output: True
print(isinstance(age, float))  # Output: False
print(isinstance(age, str))    # Output: False

name = "Alice"
print(isinstance(name, str))   # Output: True
\`\`\`

You can check against multiple types at once:
\`\`\`python
value = 3.14

# Is value either an int or a float?
print(isinstance(value, (int, float)))  # Output: True
\`\`\`

## id() Function

The \`id()\` function returns the **unique identity number** of a variable - essentially its memory address. Every object in Python is stored at a specific location in your computer's memory, and \`id()\` gives you that location as a number.

### Basic Usage

\`\`\`python
x = 10
print(id(x))  # Output: some number like 140715200456528
               # (this will be different on your computer)

name = "Alice"
print(id(name))  # Output: another unique number
\`\`\`

### When Two Variables Point to the Same Object

\`\`\`python
a = 10
b = a  # b is pointing to the same value as a

print(id(a))  # Output: 140715200456528
print(id(b))  # Output: 140715200456528  (same id - same object in memory)

print(a is b)  # Output: True
\`\`\`

### When Variables Have the Same Value but Different Objects

\`\`\`python
list1 = [1, 2, 3]
list2 = [1, 2, 3]

print(id(list1))  # Output: 2145678901
print(id(list2))  # Output: 2145678902  (different id - different objects)

print(list1 == list2)  # Output: True   (same value)
print(list1 is list2)  # Output: False  (different objects in memory)
\`\`\`

### Small Integer Caching (Interesting Python Behavior)

Python caches small integers (usually -5 to 256) for performance. This means variables holding the same small integer will share the same id:

\`\`\`python
x = 5
y = 5
print(id(x) == id(y))  # Output: True  (Python reuses the same object)

a = 1000
b = 1000
print(id(a) == id(b))  # Output: False  (large numbers get new objects)
\`\`\`

> [!NOTE]
> As a beginner, you will use \`id()\` mostly for learning purposes and understanding how Python manages memory. In day-to-day coding, \`type()\` and \`isinstance()\` are far more commonly used.

## Practical Example

\`\`\`python
# A function that checks and describes a variable
def describe(variable):
    print("Value   :", variable)
    print("Type    :", type(variable))
    print("ID      :", id(variable))
    print("---")

describe(42)
describe("hello")
describe(3.14)
describe(True)
describe(None)
\`\`\`

Output:
\`\`\`
Value   : 42
Type    : <class 'int'>
ID      : 140715200456528
---
Value   : hello
Type    : <class 'str'>
ID      : 2456789012
---
Value   : 3.14
Type    : <class 'float'>
ID      : 2456789100
---
Value   : True
Type    : <class 'bool'>
ID      : 140715200000001
---
Value   : None
Type    : <class 'NoneType'>
ID      : 140715199999999
---
\`\`\`

> [!TIP]
> Use \`type()\` when you want to know what type a value is. Use \`id()\` when you want to understand if two variables are pointing to the exact same object in memory.`,
  objectives: [
    "Use type() to find the data type of any variable.",
    "Use isinstance() to check if a variable is a specific type.",
    "Use id() to find the memory address of a variable.",
    "Understand the difference between == (equal value) and is (same object)."
  ],
  difficulty: "beginner",
  xpReward: 50,
};