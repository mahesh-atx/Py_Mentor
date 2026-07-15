export const parametersAndArgumentsLesson = {
  title: "Parameters & Arguments",
  slug: "parameters-and-arguments",
  content: `# Parameters & Arguments

Parameters are how functions receive input. Python provides several ways to pass arguments, giving you tremendous flexibility.

## The Theory — Building the Logic

A parameter is a placeholder name written in the function's definition; an argument is the actual value you supply at call time — the distinction matters because the definition describes a slot, while the call fills it. Python matches arguments to parameters by position first, then by name, doing this binding work exactly once at the moment the function is called to build a temporary local namespace. Default values are evaluated a single time when the function is *defined*, not on each call, which is why a mutable default (like a list) gets shared and mutated across calls — a subtle but classic trap. The key intuition is that Python never infers your intent; it mechanically binds names to values in a fixed order, so mismatched arguments silently produce wrong results rather than errors. Once that binding model clicks, \`*args\` and \`**kwargs\` stop being magic and become obvious: they simply collect the leftovers into a tuple and into a dict.

## Positional Arguments

The simplest form - arguments are matched to parameters by their **position** (order).

\`\`\`python
def describe_person(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

# Arguments matched by position: name=Alice, age=25, city=London
describe_person("Alice", 25, "London")

# Order matters!
describe_person(25, "Alice", "London")    # Wrong! 25=name, Alice=age
describe_person("London", "Alice", 25)    # Wrong! London=name...
\`\`\`

\`\`\`python
def power(base, exponent):
    return base ** exponent

print(power(2, 10))   # 1024  (2^10)
print(power(10, 2))   # 100   (10^2) - order matters!
\`\`\`

## Keyword Arguments

Pass arguments by **name**, so order does not matter:

\`\`\`python
def describe_person(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

# Using keyword arguments - order does not matter
describe_person(age=25, city="London", name="Alice")
describe_person(city="Paris", name="Bob", age=30)

# Mix positional and keyword (positional must come FIRST)
describe_person("Alice", city="London", age=25)  # OK
# describe_person(name="Alice", 25, "London")    # SyntaxError!
\`\`\`

\`\`\`python
def create_profile(username, email, role="user", active=True):
    return {
        "username": username,
        "email": email,
        "role": role,
        "active": active
    }

# Mix of positional and keyword
profile = create_profile("alice", "alice@example.com", role="admin")
print(profile)
\`\`\`

## Default Parameters

Provide default values for parameters. If the caller does not pass that argument, the default is used.

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Uses default: Hello, Alice!
greet("Bob", "Hi")          # Uses provided: Hi, Bob!
greet("Charlie", "Hey")     # Uses provided: Hey, Charlie!
\`\`\`

\`\`\`python
def connect_db(host="localhost", port=5432, database="mydb", timeout=30):
    print(f"Connecting to {host}:{port}/{database} (timeout={timeout}s)")

connect_db()                          # All defaults
connect_db("192.168.1.1")            # Custom host
connect_db(port=3306, database="app") # Custom port and db
connect_db("prod.server.com", 5432, "production", 60)  # All custom
\`\`\`

### Default Parameter Gotcha - Mutable Defaults

\`\`\`python
# WRONG - the list is created ONCE and shared across all calls!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))    # ['apple']
print(add_item("banana"))   # ['apple', 'banana']  UNEXPECTED!
print(add_item("cherry"))   # ['apple', 'banana', 'cherry']  UNEXPECTED!

# CORRECT - use None as default, create new list inside function
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("apple"))    # ['apple']
print(add_item("banana"))   # ['banana']   correct!
\`\`\`

> [!IMPORTANT]
> Never use mutable objects (lists, dicts, sets) as default parameter values. Use \`None\` instead and create the mutable object inside the function.

## *args - Variable-Length Positional Arguments

\`*args\` allows a function to accept **any number of positional arguments**. They are collected into a **tuple**.

\`\`\`python
def add_all(*args):
    print(f"args = {args}")
    print(f"type = {type(args)}")
    return sum(args)

print(add_all(1, 2))            # args = (1, 2)
print(add_all(1, 2, 3, 4, 5))  # args = (1, 2, 3, 4, 5)
print(add_all())                # args = ()   (empty tuple)
\`\`\`

\`\`\`python
def print_all(*args):
    for i, item in enumerate(args, 1):
        print(f"  {i}. {item}")

print_all("apple", "banana", "cherry")
# Output:
#   1. apple
#   2. banana
#   3. cherry

print_all("one item only")
# Output:
#   1. one item only
\`\`\`

\`\`\`python
# Combining with regular parameters
def report(title, *items):
    print(f"=== {title} ===")
    for item in items:
        print(f"  - {item}")

report("Shopping List", "apples", "milk", "bread", "eggs")
report("Tasks", "Write code", "Review PR")
\`\`\`

### Unpacking with *

\`\`\`python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))   # Unpacks list: add(1, 2, 3) = 6

coords = (4, 5, 6)
print(add(*coords))    # Unpacks tuple: add(4, 5, 6) = 15
\`\`\`

## **kwargs - Variable-Length Keyword Arguments

\`**kwargs\` allows a function to accept **any number of keyword arguments**. They are collected into a **dictionary**.

\`\`\`python
def print_info(**kwargs):
    print(f"kwargs = {kwargs}")
    print(f"type   = {type(kwargs)}")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_info(name="Alice", age=25, city="London")
# kwargs = {'name': 'Alice', 'age': 25, 'city': 'London'}
# name: Alice
# age: 25
# city: London
\`\`\`

\`\`\`python
def create_html_tag(tag, content, **attributes):
    attrs = " ".join(f'{k}="{v}"' for k, v in attributes.items())
    if attrs:
        return f"<{tag} {attrs}>{content}</{tag}>"
    return f"<{tag}>{content}</{tag}>"

print(create_html_tag("p", "Hello"))
# Output: <p>Hello</p>

print(create_html_tag("a", "Click here", href="https://python.org", target="_blank"))
# Output: <a href="https://python.org" target="_blank">Click here</a>

print(create_html_tag("img", "", src="photo.jpg", alt="My Photo", width="200"))
# Output: <img src="photo.jpg" alt="My Photo" width="200"></img>
\`\`\`

### Unpacking with **

\`\`\`python
def connect(host, port, database):
    print(f"Connecting to {host}:{port}/{database}")

config = {"host": "localhost", "port": 5432, "database": "mydb"}
connect(**config)   # Unpacks dict as keyword args
# Same as: connect(host="localhost", port=5432, database="mydb")
\`\`\`

## Combining All Parameter Types

The order must be: \`regular, *args, keyword-only, **kwargs\`

\`\`\`python
def full_function(a, b, *args, key1="default", **kwargs):
    print(f"a     = {a}")
    print(f"b     = {b}")
    print(f"args  = {args}")
    print(f"key1  = {key1}")
    print(f"kwargs= {kwargs}")

full_function(1, 2, 3, 4, 5, key1="hello", x=10, y=20)
# a     = 1
# b     = 2
# args  = (3, 4, 5)
# key1  = hello
# kwargs= {'x': 10, 'y': 20}
\`\`\`

## Keyword-Only Arguments

Parameters after \`*\` are **keyword-only** - they MUST be passed by name:

\`\`\`python
def create_user(name, *, role="user", active=True):
    return {"name": name, "role": role, "active": active}

create_user("Alice")                    # OK
create_user("Alice", role="admin")      # OK
create_user("Alice", "admin")           # TypeError! role is keyword-only
\`\`\`

\`\`\`python
def send_email(to, subject, body, *, cc=None, bcc=None, html=False):
    print(f"To: {to}")
    print(f"Subject: {subject}")
    if cc:  print(f"CC: {cc}")
    if bcc: print(f"BCC: {bcc}")
    format_type = "HTML" if html else "Plain text"
    print(f"Format: {format_type}")
    print(f"Body: {body[:50]}...")

send_email("alice@example.com", "Hello", "Hi Alice!", bcc="boss@example.com", html=True)
\`\`\`

## Practical Example: Flexible Data Formatter

\`\`\`python
def format_data(*values, separator=", ", prefix="", suffix="", uppercase=False):
    """
    Format a series of values into a string.
    
    Args:
        *values: Any number of values to format
        separator: String to put between values (default: ", ")
        prefix: String to add before the result
        suffix: String to add after the result
        uppercase: Whether to convert to uppercase
    """
    if not values:
        return f"{prefix}{suffix}"
    
    str_values = [str(v) for v in values]
    result = separator.join(str_values)
    
    if uppercase:
        result = result.upper()
    
    return f"{prefix}{result}{suffix}"

print(format_data("apple", "banana", "cherry"))
# apple, banana, cherry

print(format_data("apple", "banana", "cherry", separator=" | ", prefix="[", suffix="]"))
# [apple | banana | cherry]

print(format_data(1, 2, 3, 4, 5, separator=" + ", suffix=" = " + str(sum([1,2,3,4,5]))))
# 1 + 2 + 3 + 4 + 5 = 15

print(format_data("hello", "world", uppercase=True))
# HELLO, WORLD
\`\`\`

> [!TIP]
> Use positional arguments for required inputs that have a natural order. Use keyword arguments for optional configurations. Use \`*args\` when the number of inputs is unknown. Use \`**kwargs\` for flexible configuration options. Always put \`*args\` before \`**kwargs\` in the function signature.`,
  objectives: [
    "Pass arguments by position and by keyword.",
    "Use default parameter values for optional arguments.",
    "Use *args to accept any number of positional arguments.",
    "Use **kwargs to accept any number of keyword arguments.",
    "Avoid the mutable default parameter pitfall."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};