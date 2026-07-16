export const definingCallingFunctionsLesson = {
  title: "Defining & Calling Functions",
  slug: "defining-calling-functions",
  content: `# Defining & Calling Functions

A function is a named, reusable container for logic: \`def\` only creates the function object (writing the recipe), while calling it actually runs the body in a fresh local frame. A common pitfall is expecting a function to do anything just by defining it — until you call it, none of its code runs.

## What is a Function?

A function is a **named, reusable block of code** that performs a specific task. Instead of writing the same code multiple times, you define it once and call it whenever you need it.

Think of a function like a recipe: you write the instructions once, and anyone can follow them anytime.

\`\`\`python
# Without functions - repetitive code
name1 = "Alice"
print(f"Hello, {name1}! Welcome to Python.")
print(f"We hope you enjoy learning, {name1}.")

name2 = "Bob"
print(f"Hello, {name2}! Welcome to Python.")
print(f"We hope you enjoy learning, {name2}.")

# With a function - clean and reusable
def greet(name):
    print(f"Hello, {name}! Welcome to Python.")
    print(f"We hope you enjoy learning, {name}.")

greet("Alice")
greet("Bob")
\`\`\`

## Defining a Function

Use the \`def\` keyword followed by the function name, parentheses, and a colon. The function body is indented.

\`\`\`python
def function_name():
    # function body
    # indented code goes here
\`\`\`

### Basic Function (No Parameters)

\`\`\`python
def say_hello():
    print("Hello, World!")

def print_separator():
    print("=" * 40)

def show_menu():
    print("1. Start Game")
    print("2. Load Game")
    print("3. Settings")
    print("4. Quit")
\`\`\`

## Calling a Function

To run a function, write its name followed by parentheses:

\`\`\`python
say_hello()          # Output: Hello, World!
print_separator()    # Output: ========================================
show_menu()          # Output: the menu
\`\`\`

> [!IMPORTANT]
> Defining a function does NOT run it. You must CALL it to execute the code inside.

\`\`\`python
def greet():
    print("Hello!")   # This line does NOT run when defined

# greet is defined but not called yet - nothing happens

greet()   # NOW it runs: Output: Hello!
greet()   # Can call it again: Output: Hello!
greet()   # And again: Output: Hello!
\`\`\`

## Functions with Parameters

Parameters are variables listed in the function definition. Arguments are the actual values passed when calling.

\`\`\`python
def greet(name):          # 'name' is a parameter
    print(f"Hello, {name}!")

greet("Alice")            # "Alice" is the argument
greet("Bob")              # "Bob" is the argument
greet("Charlie")          # "Charlie" is the argument
\`\`\`

\`\`\`python
def add(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add(5, 3)      # Output: 5 + 3 = 8
add(10, 20)    # Output: 10 + 20 = 30
add(0.5, 1.5)  # Output: 0.5 + 1.5 = 2.0
\`\`\`

## The Function Execution Flow

\`\`\`python
def calculate_area(length, width):
    print(f"Calculating area for {length} x {width}")   # Step 2
    area = length * width                                 # Step 3
    print(f"Area = {area}")                              # Step 4

print("Before function call")   # Step 1
calculate_area(5, 3)            # Jump to function
print("After function call")    # Step 5

# Output:
# Before function call
# Calculating area for 5 x 3
# Area = 15
# After function call
\`\`\`

## Naming Conventions

\`\`\`python
# Use snake_case (words separated by underscores)
def calculate_tax():        # Good
def get_user_name():        # Good
def print_report():         # Good

# Avoid
def CalculateTax():         # PascalCase - reserved for classes
def calculatetax():         # Hard to read
def calc_t():               # Too abbreviated

# Function names should be verbs (they DO something)
def get_data():             # Good - describes action
def process_records():      # Good
def validate_email():       # Good

# Boolean functions often start with is_, has_, can_
def is_valid():
def has_permission():
def can_proceed():
\`\`\`

## Why Use Functions?

\`\`\`python
# Problem: Calculate BMI for multiple people WITHOUT functions
weight1, height1 = 70, 1.75
bmi1 = weight1 / (height1 ** 2)
print(f"Person 1 BMI: {bmi1:.1f}")
if bmi1 < 18.5: print("Underweight")
elif bmi1 < 25: print("Normal")
elif bmi1 < 30: print("Overweight")
else: print("Obese")

weight2, height2 = 90, 1.80
bmi2 = weight2 / (height2 ** 2)
print(f"Person 2 BMI: {bmi2:.1f}")
if bmi2 < 18.5: print("Underweight")
elif bmi2 < 25: print("Normal")
elif bmi2 < 30: print("Overweight")
else: print("Obese")
# Repeated 10+ times = nightmare!

# Solution: Use a function
def check_bmi(weight, height):
    bmi = weight / (height ** 2)
    if bmi < 18.5:   category = "Underweight"
    elif bmi < 25:   category = "Normal"
    elif bmi < 30:   category = "Overweight"
    else:            category = "Obese"
    print(f"BMI: {bmi:.1f} ({category})")

check_bmi(70, 1.75)
check_bmi(90, 1.80)
check_bmi(55, 1.65)
# Clean, DRY (Don't Repeat Yourself)
\`\`\`

## Practical Example: Building a Simple Program with Functions

\`\`\`python
def print_header(title):
    width = 40
    print("=" * width)
    print(title.center(width))
    print("=" * width)

def print_item(name, price, quantity):
    total = price * quantity
    print(f"  {name:<20} \${price:>6.2f} x {quantity:>3} = \${total:>8.2f}")

def print_footer(total):
    print("-" * 40)
    print(f"  {'TOTAL':>31} \${total:>8.2f}")
    print("=" * 40)

def calculate_total(items):
    return sum(p * q for _, p, q in items)

# Main program
items = [
    ("Python Book",     39.99, 2),
    ("USB Cable",        9.99, 3),
    ("Mechanical Kbd",  89.99, 1),
    ("Mouse",           29.99, 1),
]

print_header("INVOICE")
for item in items:
    print_item(*item)
total = calculate_total(items)
print_footer(total)
\`\`\`

Output:
\`\`\`
========================================
                INVOICE
========================================
  Python Book          $ 39.99 x   2 = $  79.98
  USB Cable            $  9.99 x   3 = $  29.97
  Mechanical Kbd       $ 89.99 x   1 = $  89.99
  Mouse                $ 29.99 x   1 = $  29.99
----------------------------------------
                                TOTAL = $ 229.93
========================================
\`\`\`

> [!TIP]
> A good function does ONE thing and does it well. If you find yourself writing a function that does many unrelated things, break it into smaller functions. Functions should ideally fit on one screen (about 20-30 lines maximum).`,
  objectives: [
    "Define functions using the def keyword.",
    "Call functions and understand when code executes.",
    "Define functions with parameters.",
    "Follow Python naming conventions for functions.",
    "Understand why functions make code cleaner and more reusable."
  ],
  difficulty: "beginner",
  xpReward: 50,
};