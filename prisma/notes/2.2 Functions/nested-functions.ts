export const nestedFunctionsLesson = {
  title: "Nested Functions",
  slug: "nested-functions",
  content: `# Nested Functions

A **nested function** (also called an inner function) is a function defined **inside another function**. The inner function has access to variables in the outer function's scope.

## Basic Nested Functions

\`\`\`python
def outer():
    print("Outer function running")

    def inner():              # Defined inside outer
        print("Inner function running")

    inner()                   # Call inner from within outer
    print("Back in outer")

outer()
# Output:
# Outer function running
# Inner function running
# Back in outer

# inner() is NOT accessible outside outer
# inner()   # NameError!
\`\`\`

## Why Use Nested Functions?

### 1. Encapsulation - Hiding Helper Functions

\`\`\`python
def process_data(data):
    """Process and validate a list of numbers."""

    def validate(item):
        """Hidden helper - only needed inside process_data."""
        return isinstance(item, (int, float)) and item >= 0

    def normalize(item, max_val):
        """Hidden helper - normalize to 0-1 range."""
        return item / max_val if max_val != 0 else 0

    # Filter valid items
    valid = [x for x in data if validate(x)]

    if not valid:
        return []

    max_val = max(valid)
    return [normalize(x, max_val) for x in valid]

# Only process_data is visible to outside code
result = process_data([10, -5, 20, "bad", 15, 0])
print(result)   # [0.5, 1.0, 0.75, 0.0]
\`\`\`

### 2. Closures - Inner Functions Remember Outer Variables

A **closure** is when an inner function "closes over" (remembers) variables from the enclosing scope, even after the outer function has returned.

\`\`\`python
def make_multiplier(factor):
    """Create a function that multiplies by factor."""

    def multiply(x):
        return x * factor   # 'factor' is captured from outer scope

    return multiply    # Return the inner function itself (not its result)

# Create specialized multiplier functions
double = make_multiplier(2)
triple = make_multiplier(3)
times10 = make_multiplier(10)

print(double(5))     # 10
print(triple(5))     # 15
print(times10(5))    # 50

# The outer function (make_multiplier) has returned
# but 'factor' is still remembered by each inner function
print(double.__closure__[0].cell_contents)   # 2 (the captured factor)
print(triple.__closure__[0].cell_contents)   # 3
\`\`\`

\`\`\`python
def make_greeting(greeting_word):
    """Create a personalized greeting function."""

    def greet(name):
        return f"{greeting_word}, {name}!"

    return greet

hello = make_greeting("Hello")
hi = make_greeting("Hi there")
bonjour = make_greeting("Bonjour")

print(hello("Alice"))    # Hello, Alice!
print(hi("Bob"))         # Hi there, Bob!
print(bonjour("Marie"))  # Bonjour, Marie!
\`\`\`

### 3. Maintaining State with Closures

\`\`\`python
def make_counter(start=0):
    """Create a counter that maintains its own state."""
    count = [start]   # Use a list so nonlocal is not needed (mutable)

    def increment(amount=1):
        count[0] += amount
        return count[0]

    def decrement(amount=1):
        count[0] -= amount
        return count[0]

    def reset():
        count[0] = start
        return count[0]

    def get_value():
        return count[0]

    # Return multiple inner functions as a tuple
    return increment, decrement, reset, get_value

inc, dec, rst, val = make_counter(10)

print(val())    # 10
print(inc())    # 11
print(inc())    # 12
print(inc(5))   # 17
print(dec(3))   # 14
print(rst())    # 10 (reset to start)
\`\`\`

## Closures with nonlocal

\`\`\`python
def make_accumulator():
    total = 0

    def add(amount):
        nonlocal total    # Must declare nonlocal to modify
        total += amount
        return total

    return add

acc1 = make_accumulator()
acc2 = make_accumulator()   # Independent accumulator

print(acc1(10))    # 10
print(acc1(20))    # 30
print(acc1(5))     # 35
print(acc2(100))   # 100  (separate state)
print(acc1(0))     # 35   (acc1 unaffected by acc2)
\`\`\`

## Nested Functions as Decorators (Preview)

The most important use of nested functions is building decorators:

\`\`\`python
def log_calls(func):
    """A decorator that logs when a function is called."""

    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result

    return wrapper

def add(a, b):
    return a + b

# Manually wrap the function
logged_add = log_calls(add)
logged_add(3, 4)
# Output:
# Calling add...
# add returned: 7
\`\`\`

## Inspecting Closures

\`\`\`python
def make_power(exp):
    def power(base):
        return base ** exp
    return power

square = make_power(2)
cube = make_power(3)

# Check captured variables
print(square.__name__)               # power
print(square.__closure__)            # (<cell at 0x...>,)
print(square.__closure__[0].cell_contents)  # 2

# Check if a function is a closure
print(hasattr(square, '__closure__') and square.__closure__ is not None)  # True
\`\`\`

## Practical Example: Input Validator Factory

\`\`\`python
def make_validator(min_val=None, max_val=None, required=True, allowed_types=(int, float)):
    """Create a custom validator function."""

    def validate(value, field_name="value"):
        errors = []

        if required and value is None:
            errors.append(f"{field_name} is required")
            return False, errors

        if value is None:
            return True, []

        if not isinstance(value, allowed_types):
            errors.append(f"{field_name} must be {' or '.join(t.__name__ for t in allowed_types)}")

        if min_val is not None and value < min_val:
            errors.append(f"{field_name} must be >= {min_val}")

        if max_val is not None and value > max_val:
            errors.append(f"{field_name} must be <= {max_val}")

        return len(errors) == 0, errors

    return validate

# Create specialized validators
validate_age     = make_validator(min_val=0, max_val=150)
validate_score   = make_validator(min_val=0, max_val=100)
validate_price   = make_validator(min_val=0.01, allowed_types=(int, float))
validate_rating  = make_validator(min_val=1, max_val=5)
optional_percent = make_validator(min_val=0, max_val=100, required=False)

# Use them
for value, validator, name in [
    (25, validate_age, "age"),
    (200, validate_age, "age"),
    (85.5, validate_score, "score"),
    (-10, validate_price, "price"),
    (None, optional_percent, "discount"),
]:
    is_valid, errors = validator(value, name)
    status = "OK" if is_valid else f"INVALID: {', '.join(errors)}"
    print(f"{name}={value}: {status}")
\`\`\`

Output:
\`\`\`
age=25: OK
age=200: INVALID: age must be <= 150
score=85.5: OK
price=-10: INVALID: price must be >= 0.01
discount=None: OK
\`\`\`

## Practical Example: Memoization with Closures

\`\`\`python
def memoize(func):
    """Cache function results for repeated calls."""
    cache = {}

    def wrapper(*args):
        if args not in cache:
            print(f"  Computing {func.__name__}{args}...")
            cache[args] = func(*args)
        else:
            print(f"  Cache hit for {args}")
        return cache[args]

    return wrapper

@memoize  # This is shorthand for: factorial = memoize(factorial)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))    # Computes 5, 4, 3, 2, 1
print(factorial(5))    # Full cache hit
print(factorial(7))    # Only computes 7, 6 (5! already cached)
\`\`\`

> [!TIP]
> Use nested functions to hide helper logic that is only relevant to one function. Use closures to create function factories that generate specialized functions. The most powerful use of nested functions is in decorators, which we cover in the Intermediate Python module.`,
  objectives: [
    "Define and call functions inside other functions.",
    "Understand that inner functions are local to the outer function.",
    "Understand closures - inner functions that remember outer variables.",
    "Use the nonlocal keyword in nested functions.",
    "Use function factories to create specialized functions."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};