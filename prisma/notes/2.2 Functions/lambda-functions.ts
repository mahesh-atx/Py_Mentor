export const lambdaFunctionsLesson = {
  title: "Lambda (Anonymous) Functions",
  slug: "lambda-functions",
  content: `# Lambda (Anonymous) Functions

## The Theory — Building the Logic

A lambda is just a function written in expression form — syntactically compressed, but under the hood it creates the exact same function object as \`def\`. The real constraint is that a lambda body can only be a single expression, because Python evaluates that expression and returns its value automatically (there is no \`return\` keyword to write). This makes lambdas ideal as throwaway logic passed directly into another function, like a sorting key, where defining a full named function would be heavier than the idea deserves. The mental model is "a function as a value you build inline," not a different kind of thing. The pitfall is overusing lambdas for anything past trivial logic; once you need multiple lines, error handling, or a name for clarity, a normal \`def\` is clearer and is what Python's own style guide recommends.

## What is a Lambda Function?

A **lambda function** is a small, anonymous function defined in a single line using the \`lambda\` keyword. Unlike regular functions defined with \`def\`, lambdas have no name (unless assigned to a variable) and can only contain a single expression.

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda function
square = lambda x: x ** 2

print(square(5))    # Output: 25
print(square(3))    # Output: 9
\`\`\`

## Lambda Syntax

\`\`\`python
lambda parameters: expression
\`\`\`

- \`lambda\` - keyword
- \`parameters\` - comma-separated inputs (can be zero or more)
- \`expression\` - a single expression whose value is returned (no \`return\` keyword needed)

\`\`\`python
# No parameters
greet = lambda: "Hello, World!"
print(greet())    # Output: Hello, World!

# One parameter
double = lambda x: x * 2
print(double(5))  # Output: 10

# Two parameters
add = lambda x, y: x + y
print(add(3, 4))  # Output: 7

# Three parameters
volume = lambda l, w, h: l * w * h
print(volume(3, 4, 5))  # Output: 60

# With default parameter
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))           # Output: Hello, Alice!
print(greet("Bob", "Hi"))      # Output: Hi, Bob!
\`\`\`

## Lambdas vs Regular Functions

\`\`\`python
# These are functionally equivalent:

# Regular function
def multiply(x, y):
    return x * y

# Lambda
multiply = lambda x, y: x * y

# Both work the same way
print(multiply(3, 4))    # Output: 12
\`\`\`

### When to Use Lambda vs def

\`\`\`python
# Use LAMBDA for:
# 1. Short, one-off functions (especially as arguments to other functions)
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers, key=lambda x: -x)   # Sort descending

# 2. Simple transformations inline
result = list(map(lambda x: x**2, [1, 2, 3, 4, 5]))

# 3. When the logic is trivially simple
is_even = lambda n: n % 2 == 0

# Use DEF for:
# 1. Complex logic requiring multiple lines
def process_data(data):
    filtered = [x for x in data if x > 0]
    normalized = [x / max(filtered) for x in filtered]
    return sorted(normalized, reverse=True)

# 2. Functions that will be reused and need documentation
def calculate_bmi(weight, height):
    """Calculate BMI. Weight in kg, height in meters."""
    return weight / (height ** 2)

# 3. Functions with multiple return paths
def classify_number(n):
    if n < 0:
        return "negative"
    elif n == 0:
        return "zero"
    return "positive"
\`\`\`

## Lambda with Conditional Expressions

\`\`\`python
# Ternary-style expressions in lambda
classify = lambda x: "positive" if x > 0 else ("zero" if x == 0 else "negative")

print(classify(5))     # positive
print(classify(0))     # zero
print(classify(-3))    # negative

# Absolute value
absolute = lambda x: x if x >= 0 else -x
print(absolute(-7))    # 7

# Maximum of two values
maximum = lambda a, b: a if a > b else b
print(maximum(10, 7))  # 10
\`\`\`

## Immediately Invoked Lambdas

You can call a lambda immediately after defining it:

\`\`\`python
# Define and call immediately
result = (lambda x, y: x + y)(3, 4)
print(result)   # 7

# Useful in certain functional patterns
print((lambda x: x ** 2)(5))   # 25
print((lambda: "Hello!")())     # Hello!
\`\`\`

## Lambda with *args and **kwargs

\`\`\`python
# Variable arguments
sum_all = lambda *args: sum(args)
print(sum_all(1, 2, 3, 4, 5))   # 15

# Keyword arguments
make_dict = lambda **kwargs: kwargs
print(make_dict(name="Alice", age=25))   # {'name': 'Alice', 'age': 25}

# Both
flexible = lambda *args, **kwargs: (args, kwargs)
print(flexible(1, 2, name="Alice"))
# Output: ((1, 2), {'name': 'Alice'})
\`\`\`

## Common Lambda Patterns

\`\`\`python
# Key extraction
get_age = lambda person: person["age"]
get_name = lambda person: person["name"]
get_last_word = lambda s: s.split()[-1]

people = [
    {"name": "Charlie", "age": 30},
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 35},
]
print(sorted(people, key=get_age))    # sorted by age
print(sorted(people, key=get_name))   # sorted by name

# Mathematical operations
celsius_to_fahrenheit = lambda c: (c * 9/5) + 32
fahrenheit_to_celsius = lambda f: (f - 32) * 5/9

temps_c = [0, 20, 37, 100]
temps_f = list(map(celsius_to_fahrenheit, temps_c))
print(temps_f)   # [32.0, 68.0, 98.6, 212.0]

# String operations
title_case = lambda s: s.title()
remove_spaces = lambda s: s.replace(" ", "")
capitalize_words = lambda s: " ".join(w.capitalize() for w in s.split())
\`\`\`

## Practical Example: Sorting Complex Data

\`\`\`python
products = [
    {"name": "Laptop",   "price": 999.99, "rating": 4.5, "stock": 15},
    {"name": "Mouse",    "price":  29.99, "rating": 4.8, "stock": 0},
    {"name": "Keyboard", "price":  79.99, "rating": 4.2, "stock": 8},
    {"name": "Monitor",  "price": 349.99, "rating": 4.7, "stock": 3},
    {"name": "Headset",  "price":  59.99, "rating": 4.6, "stock": 22},
]

# Sort by price
by_price = sorted(products, key=lambda p: p["price"])
print("By price:", [p["name"] for p in by_price])

# Sort by rating descending
by_rating = sorted(products, key=lambda p: p["rating"], reverse=True)
print("By rating:", [f"{p['name']}({p['rating']})" for p in by_rating])

# Sort by stock (in-stock first, then by name)
by_availability = sorted(products, key=lambda p: (p["stock"] == 0, p["name"]))
print("By availability:", [p["name"] for p in by_availability])

# Sort by value score (rating / price * 100)
value_score = lambda p: p["rating"] / p["price"] * 100
by_value = sorted(products, key=value_score, reverse=True)
print("Best value:", [p["name"] for p in by_value])
\`\`\`

Output:
\`\`\`
By price: ['Mouse', 'Headset', 'Keyboard', 'Monitor', 'Laptop']
By rating: ['Mouse(4.8)', 'Monitor(4.7)', 'Headset(4.6)', 'Laptop(4.5)', 'Keyboard(4.2)']
By availability: ['Headset', 'Keyboard', 'Laptop', 'Monitor', 'Mouse']
Best value: ['Mouse', 'Headset', 'Keyboard', 'Monitor', 'Laptop']
\`\`\`

> [!TIP]
> Use lambda for simple, short functions especially as arguments to \`sorted()\`, \`map()\`, \`filter()\`, and \`max()\`/\`min()\`. For anything requiring multiple lines, error handling, or documentation, use a regular \`def\` function. The PEP 8 style guide recommends against assigning lambdas to variables - use \`def\` instead.`,
  objectives: [
    "Understand what a lambda function is and when to use one.",
    "Write lambdas with zero, one, and multiple parameters.",
    "Use conditional expressions inside lambda functions.",
    "Apply lambdas in sorting and data transformation scenarios.",
    "Know when to prefer def over lambda."
  ],
  difficulty: "beginner",
  xpReward: 55,
};