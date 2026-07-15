export const variablesLesson = {
  title: "Variables & Variable Naming Conventions",
  slug: "variables",
  content: `# Variables & Variable Naming Conventions

## The Theory — Building the Logic

A variable in Python is best understood as a **name bound to an object**, not a memory cell that holds a value the way a box might. The \`=\` sign does not mean "equality" here; it means "make this name point at whatever object is on the right", so the same name can later be rebound to a different object entirely. Because the name and the value are separate things, multiple names can point at the same object, and the rules for valid names exist mainly so the interpreter can reliably tell identifiers apart from its own keywords and syntax. A common pitfall is treating \`=\` as a mathematical equation and assuming it asserts a permanent truth, when in reality it only records the current binding and can be overwritten at any time.

## What is a Variable?

Think of a variable as a **labeled box** where you can store information. Just like you might label a box "Books" or "Clothes", in Python you give your variable a name and store a value in it.

\`\`\`python
name = "Alice"
age = 25
height = 5.6
\`\`\`

Here:
- \`name\` is the label (variable name)
- \`"Alice"\` is the value stored inside it
- \`=\` is the assignment operator (it means "store this value in this variable")

## Creating a Variable

In Python, you create a variable simply by writing a name, then \`=\`, then the value. There is no special keyword needed.

\`\`\`python
city = "New York"
temperature = 98
is_raining = False

print(city)         # Output: New York
print(temperature)  # Output: 98
print(is_raining)   # Output: False
\`\`\`

## Changing a Variable's Value

You can change the value stored in a variable at any time by simply assigning a new value to it.

\`\`\`python
score = 10
print(score)  # Output: 10

score = 50
print(score)  # Output: 50

score = score + 5
print(score)  # Output: 55
\`\`\`

## Assigning Multiple Variables

Python lets you assign values to multiple variables in a single line.

\`\`\`python
# Assign different values to multiple variables
x, y, z = 1, 2, 3
print(x)  # Output: 1
print(y)  # Output: 2
print(z)  # Output: 3

# Assign the same value to multiple variables
a = b = c = 100
print(a)  # Output: 100
print(b)  # Output: 100
print(c)  # Output: 100
\`\`\`

## Variable Naming Rules (Must Follow)

These are the strict rules. Breaking them causes an error.

**Rule 1: Must start with a letter or underscore**
\`\`\`python
name = "Alice"    # Valid
_name = "Alice"   # Valid
1name = "Alice"   # ERROR - cannot start with a number
\`\`\`

**Rule 2: Can only contain letters, numbers, and underscores**
\`\`\`python
my_name = "Alice"   # Valid
myName2 = "Alice"   # Valid
my-name = "Alice"   # ERROR - hyphens not allowed
my name = "Alice"   # ERROR - spaces not allowed
\`\`\`

**Rule 3: Case sensitive**
\`\`\`python
age = 25
Age = 30
AGE = 35

print(age)  # Output: 25
print(Age)  # Output: 30
print(AGE)  # Output: 35
# These are three completely different variables
\`\`\`

**Rule 4: Cannot use Python reserved keywords**
\`\`\`python
# These words are reserved by Python - you cannot use them as variable names
# if, else, for, while, True, False, None, and, or, not, in, is, etc.

if = 10      # ERROR - 'if' is a keyword
True = 5     # ERROR - 'True' is a keyword
\`\`\`

## Variable Naming Conventions (Best Practices)

These are not strict rules but are widely followed by Python developers.

**Use snake_case for regular variables (words separated by underscores)**
\`\`\`python
# Good
first_name = "Alice"
total_price = 99.99
is_logged_in = True

# Avoid
firstName = "Alice"    # This is camelCase - used in other languages
FirstName = "Alice"    # This looks like a class name
\`\`\`

**Use UPPER_CASE for constants (values that never change)**
\`\`\`python
MAX_SPEED = 120
PI = 3.14159
DATABASE_URL = "localhost:5432"
\`\`\`

**Use descriptive names**
\`\`\`python
# Bad - what does 'x' or 'd' mean?
x = 25
d = 7

# Good - clear and readable
user_age = 25
days_in_week = 7
\`\`\`

## A Complete Example

\`\`\`python
# Student information
student_name = "John Doe"
student_age = 20
student_grade = "A"
is_enrolled = True

print(student_name)   # Output: John Doe
print(student_age)    # Output: 20
print(student_grade)  # Output: A
print(is_enrolled)    # Output: True
\`\`\`

> [!TIP]
> Always use meaningful variable names. Code is read far more often than it is written. A name like \`user_age\` is always better than \`ua\` or \`x\`.`,
  objectives: [
    "Understand what a variable is and how to create one.",
    "Learn the strict rules for naming variables.",
    "Learn the best practices and conventions for naming variables.",
    "Understand how to assign multiple variables at once."
  ],
  difficulty: "beginner",
  xpReward: 50,
};