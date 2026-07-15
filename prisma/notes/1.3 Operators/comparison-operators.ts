export const comparisonOperatorsLesson = {
  title: "Comparison Operators",
  slug: "comparison-operators",
  content: `# Comparison Operators

Comparison operators compare two values and always return a **boolean result** - either \`True\` or \`False\`. They are the foundation of decision-making in your programs.

## The Theory — Building the Logic

A comparison operator is really a *question* that always resolves to one of two values, \`True\` or \`False\`, which are the building blocks of every decision a program makes. Under the hood Python checks whether a relationship holds between two values and returns the boolean result, so comparisons are just expressions that can be stored in variables or chained. Because \`=\` already means "assign," Python uses \`==\` for "has the same value," and this deliberate distinction protects you from accidentally overwriting a variable inside an \`if\`. The classic pitfall is mixing the two up: writing \`if x = 5\` instead of \`if x == 5\`, which either errors or assigns when you meant to test.

## The Operators

\`\`\`
Operator    Name                      Example
--------    ----------------------    ----------
==          Equal to                  5 == 5
!=          Not equal to              5 != 3
>           Greater than              5 > 3
<           Less than                 3 < 5
>=          Greater than or equal to  5 >= 5
<=          Less than or equal to     3 <= 5
\`\`\`

## Equal To (==)

Checks if two values are **exactly equal**. Returns \`True\` if they are, \`False\` if not.

\`\`\`python
print(5 == 5)       # Output: True
print(5 == 3)       # Output: False
print("hi" == "hi") # Output: True
print("hi" == "HI") # Output: False  (case sensitive)
print(1 == 1.0)     # Output: True   (int and float can be equal)
print(1 == True)    # Output: True   (True equals 1 in Python)
print(0 == False)   # Output: True   (False equals 0 in Python)
\`\`\`

> [!IMPORTANT]
> Do not confuse \`==\` (comparison) with \`=\` (assignment).
> \`x = 5\` means "store 5 in x".
> \`x == 5\` means "is x equal to 5?"

\`\`\`python
x = 10           # Assignment - stores 10 in x
print(x == 10)   # Comparison - checks if x equals 10 -> True
print(x == 5)    # Comparison - checks if x equals 5  -> False
\`\`\`

## Not Equal To (!=)

Checks if two values are **different**. Returns \`True\` if they are different.

\`\`\`python
print(5 != 3)       # Output: True
print(5 != 5)       # Output: False
print("dog" != "cat")  # Output: True
print("dog" != "dog")  # Output: False

# Real world example
user_password = "secret123"
entered_password = "wrongpass"

if user_password != entered_password:
    print("Incorrect password. Please try again.")
# Output: Incorrect password. Please try again.
\`\`\`

## Greater Than (>)

Checks if the left value is **strictly greater than** the right value.

\`\`\`python
print(10 > 5)    # Output: True
print(5 > 10)   # Output: False
print(5 > 5)    # Output: False  (not greater, they are equal)

# Real world example
age = 20
if age > 18:
    print("You are an adult.")
else:
    print("You are a minor.")
# Output: You are an adult.
\`\`\`

## Less Than (<)

Checks if the left value is **strictly less than** the right value.

\`\`\`python
print(3 < 10)    # Output: True
print(10 < 3)    # Output: False
print(5 < 5)     # Output: False  (not less, they are equal)

# Real world example
temperature = 0
if temperature < 0:
    print("It is freezing outside!")
else:
    print("Temperature is above freezing.")
# Output: Temperature is above freezing.
\`\`\`

## Greater Than or Equal To (>=)

Checks if the left value is greater than **or equal to** the right value.

\`\`\`python
print(10 >= 5)   # Output: True
print(5 >= 5)    # Output: True   (equal, so True)
print(3 >= 5)    # Output: False

# Real world example
marks = 50
passing_marks = 50

if marks >= passing_marks:
    print("You passed!")
else:
    print("You failed.")
# Output: You passed!
\`\`\`

## Less Than or Equal To (<=)

Checks if the left value is less than **or equal to** the right value.

\`\`\`python
print(3 <= 5)    # Output: True
print(5 <= 5)    # Output: True   (equal, so True)
print(7 <= 5)    # Output: False

# Real world example
cart_items = 5
max_items = 5

if cart_items <= max_items:
    print("You can add more items.")
else:
    print("Cart is full!")
# Output: You can add more items.
\`\`\`

## Comparing Strings

Strings are compared alphabetically (based on their ASCII values):

\`\`\`python
print("apple" == "apple")  # Output: True
print("apple" < "banana")  # Output: True  (a comes before b)
print("zebra" > "apple")   # Output: True  (z comes after a)
print("Apple" < "apple")   # Output: True  (uppercase letters have lower values)

# Comparing string lengths
print(len("cat") > len("elephant"))   # Output: False  (3 > 8 is False)
print(len("cat") < len("elephant"))   # Output: True
\`\`\`

## Chaining Comparisons

Python allows you to chain comparisons, which is very elegant:

\`\`\`python
age = 25

# Instead of writing: age > 18 and age < 65
# You can write:
print(18 < age < 65)    # Output: True

score = 75
print(0 <= score <= 100)  # Output: True   (valid score range)

x = 5
print(1 < x < 10)        # Output: True
print(1 < x < 4)         # Output: False
\`\`\`

## Storing Comparison Results

Comparison results are just \`True\` or \`False\` values - you can store them in variables:

\`\`\`python
price = 49.99
budget = 50.00

can_afford = price <= budget
print(can_afford)          # Output: True
print(type(can_afford))    # Output: <class 'bool'>

if can_afford:
    print("You can buy it!")
# Output: You can buy it!
\`\`\`

## Practical Example: Grade Checker

\`\`\`python
score = int(input("Enter your score (0-100): "))

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
\`\`\`

Sample run:
\`\`\`
Enter your score (0-100): 85
Your grade is: B
\`\`\`

## Practical Example: Login System

\`\`\`python
correct_username = "admin"
correct_password = "python123"

username = input("Username: ")
password = input("Password: ")

username_correct = username == correct_username
password_correct = password == correct_password

print(f"Username match: {username_correct}")
print(f"Password match: {password_correct}")

if username_correct and password_correct:
    print("Login successful!")
else:
    print("Login failed.")
\`\`\`

> [!TIP]
> Comparison operators always return \`True\` or \`False\`. They are most commonly used inside \`if\` statements and \`while\` loops to make decisions in your program.`,
  objectives: [
    "Use all 6 comparison operators: ==, !=, >, <, >=, <=.",
    "Understand the difference between = (assignment) and == (comparison).",
    "Compare strings alphabetically.",
    "Chain multiple comparisons in a single expression.",
    "Store comparison results in variables."
  ],
  difficulty: "beginner",
  xpReward: 60,
};