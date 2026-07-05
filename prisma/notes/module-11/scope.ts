export const scopeLesson = {
  title: "Scope: Local, Global & nonlocal",
  slug: "scope",
  content: `# Scope: Local, Global & nonlocal

## What is Scope?

Scope determines **where a variable can be accessed** in your code. Python uses the **LEGB rule** to find variables:

\`\`\`
L - Local    : Inside the current function
E - Enclosing: Inside any enclosing functions (for nested functions)
G - Global   : At the module (file) level
B - Built-in : Python's built-in names (print, len, etc.)
\`\`\`

## Local Variables

Variables created **inside a function** are local - they exist only within that function.

\`\`\`python
def my_function():
    x = 10           # Local variable - only exists inside my_function
    print(x)         # Output: 10

my_function()
# print(x)           # NameError: name 'x' is not defined (x is local!)
\`\`\`

\`\`\`python
def function_a():
    name = "Alice"    # local to function_a
    print(name)

def function_b():
    name = "Bob"      # DIFFERENT local variable, also named 'name'
    print(name)

function_a()   # Output: Alice
function_b()   # Output: Bob
# These two 'name' variables do NOT interfere with each other
\`\`\`

### Local Variables Are Created Fresh Each Call

\`\`\`python
def count():
    x = 0       # Created fresh every time count() is called
    x += 1
    print(x)

count()   # Output: 1
count()   # Output: 1  (NOT 2! x starts at 0 each call)
count()   # Output: 1
\`\`\`

## Global Variables

Variables created **outside any function** are global - accessible from anywhere in the file.

\`\`\`python
name = "Alice"    # Global variable

def greet():
    print(f"Hello, {name}!")   # Can READ the global variable

greet()          # Output: Hello, Alice!
print(name)      # Output: Alice  (still accessible globally)
\`\`\`

### Reading vs Modifying Global Variables

\`\`\`python
counter = 0    # Global

def show_counter():
    print(counter)   # READ global - this works fine

def try_increment():
    counter += 1     # MODIFY global - UnboundLocalError!
    # Python sees 'counter += 1' as 'counter = counter + 1'
    # Creating a local 'counter', but reads it before assignment

show_counter()   # Output: 0
# try_increment()   # UnboundLocalError!
\`\`\`

## The global Keyword

Use \`global\` to tell Python you want to modify the **global** variable, not create a local one.

\`\`\`python
counter = 0    # Global

def increment():
    global counter      # Declare: use the global 'counter'
    counter += 1        # Now modifies the global variable

def reset():
    global counter
    counter = 0

print(counter)    # Output: 0
increment()
increment()
increment()
print(counter)    # Output: 3
reset()
print(counter)    # Output: 0
\`\`\`

\`\`\`python
# Practical: tracking total requests
total_requests = 0
successful_requests = 0

def process_request(success):
    global total_requests, successful_requests
    total_requests += 1
    if success:
        successful_requests += 1

process_request(True)
process_request(True)
process_request(False)
process_request(True)

print(f"Total: {total_requests}")         # Total: 4
print(f"Successful: {successful_requests}") # Successful: 3
print(f"Rate: {successful_requests/total_requests:.0%}")  # Rate: 75%
\`\`\`

> [!NOTE]
> Using \`global\` is generally discouraged in large programs because it makes code harder to understand and test. Prefer returning values from functions instead.

## Variable Shadowing

A local variable can have the same name as a global variable. The local one "shadows" the global inside the function:

\`\`\`python
x = "global"

def my_function():
    x = "local"       # Creates a NEW local x, does NOT modify global x
    print(x)          # Output: local  (uses local x)

my_function()
print(x)              # Output: global  (global x unchanged)
\`\`\`

\`\`\`python
# Be careful - this can cause confusion
MAX = 100    # Global constant

def process(value):
    MAX = 50       # Warning: shadows global MAX inside this function!
    # Is this intentional? Or a bug? Use different names to be clear.
    return min(value, MAX)

print(process(75))    # Output: 50 (uses local MAX=50)
print(MAX)            # Output: 100 (global MAX unchanged)
\`\`\`

## The nonlocal Keyword

\`nonlocal\` is used in **nested functions** to modify a variable in the **enclosing (but not global) scope**.

\`\`\`python
def outer():
    count = 0          # Enclosing variable

    def inner():
        nonlocal count  # Refers to outer's 'count'
        count += 1
        print(f"Inner: count = {count}")

    inner()
    inner()
    inner()
    print(f"Outer: count = {count}")

outer()
# Output:
# Inner: count = 1
# Inner: count = 2
# Inner: count = 3
# Outer: count = 3
\`\`\`

### nonlocal vs global

\`\`\`python
x = "global"

def outer():
    x = "enclosing"

    def middle():
        x = "middle"

        def inner():
            nonlocal x    # Refers to 'middle's x
            x = "inner"
            print(f"inner: {x}")   # inner

        inner()
        print(f"middle: {x}")      # inner (changed by inner!)

    middle()
    print(f"outer: {x}")           # enclosing (unchanged)

outer()
print(f"global: {x}")              # global (unchanged)
\`\`\`

## Practical nonlocal: Counter Factory

\`\`\`python
def make_counter(start=0, step=1):
    """Create a counter function with its own state."""
    count = start

    def counter():
        nonlocal count
        current = count
        count += step
        return current

    return counter

# Create independent counters
by_ones = make_counter(0, 1)
by_twos = make_counter(0, 2)
from_ten = make_counter(10, -1)

print(by_ones())     # 0
print(by_ones())     # 1
print(by_ones())     # 2
print(by_twos())     # 0
print(by_twos())     # 2
print(by_twos())     # 4
print(from_ten())    # 10
print(from_ten())    # 9
print(from_ten())    # 8
\`\`\`

## LEGB Rule in Action

\`\`\`python
x = "global"      # G - Global

def outer():
    x = "enclosing"   # E - Enclosing

    def inner():
        x = "local"   # L - Local
        print(x)      # Uses L: "local"

    def inner2():
        print(x)      # Uses E: "enclosing" (no local x)

    inner()     # Output: local
    inner2()    # Output: enclosing

outer()

def standalone():
    print(x)          # Uses G: "global" (no local or enclosing x)

standalone()    # Output: global

print(len("hi"))  # Uses B: built-in 'len' function
\`\`\`

## Best Practices

\`\`\`python
# Bad: rely on global state
total = 0
def add_to_total(x):
    global total
    total += x

# Better: pass values in, return results out
def calculate_total(numbers):
    return sum(numbers)

result = calculate_total([1, 2, 3, 4, 5])

# Bad: long global variable names that might clash
name = "Alice"   # could clash with local 'name' in functions

# Better: use ALL_CAPS for true constants
MAX_RETRIES = 3
PI = 3.14159
DATABASE_URL = "localhost:5432"
\`\`\`

> [!TIP]
> Prefer keeping variables local to functions. Use return values to communicate between functions rather than shared global state. Use \`global\` only for true program-wide constants or state (like a database connection). Use \`nonlocal\` for closures where nested functions need to maintain state.`,
  objectives: [
    "Understand the LEGB rule for variable lookup.",
    "Understand the difference between local and global variables.",
    "Use the global keyword to modify a global variable inside a function.",
    "Use the nonlocal keyword to modify a variable in an enclosing scope.",
    "Avoid common pitfalls like variable shadowing and mutable globals."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};