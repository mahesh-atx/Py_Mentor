export const tryExceptElseFinallyLesson = {
  title: "try / except / else / finally",
  slug: "try-except-else-finally",
  content: `# try / except / else / finally

## Why Error Handling?

Programs encounter unexpected situations: a file does not exist, a user types letters instead of a number, a network request fails, division by zero. Without error handling, these cause the program to crash with an ugly traceback. With error handling, you can respond gracefully.

\`\`\`python
# Without error handling - crashes!
number = int(input("Enter a number: "))   # User types "hello"
# ValueError: invalid literal for int() with base 10: 'hello'
# Program terminates immediately

# With error handling - graceful
try:
    number = int(input("Enter a number: "))
    print(f"You entered: {number}")
except ValueError:
    print("That is not a valid number. Please try again.")
\`\`\`

## The try / except Block

The \`try\` block contains code that might fail. The \`except\` block runs only if an exception occurs.

\`\`\`python
# Basic structure
try:
    # Code that might raise an exception
    risky_code()
except ExceptionType:
    # Code that runs if ExceptionType occurs
    handle_the_error()
\`\`\`

\`\`\`python
# Simple examples
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

try:
    number = int("hello")
except ValueError:
    print("That is not a valid integer!")

try:
    my_list = [1, 2, 3]
    item = my_list[10]
except IndexError:
    print("Index out of range!")
\`\`\`

## Accessing the Exception Object

Use \`as variable\` to capture the exception and access its message:

\`\`\`python
try:
    result = int("hello")
except ValueError as e:
    print(f"Error: {e}")
    # Error: invalid literal for int() with base 10: 'hello'

try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Math error: {e}")
    # Math error: division by zero

try:
    d = {"name": "Alice"}
    value = d["age"]
except KeyError as e:
    print(f"Missing key: {e}")
    # Missing key: 'age'
\`\`\`

## Catching Multiple Exception Types

### Separate except Blocks

\`\`\`python
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
        return None
    except TypeError:
        print(f"Error: Cannot divide {type(a).__name__} by {type(b).__name__}.")
        return None

print(safe_divide(10, 2))      # 5.0
print(safe_divide(10, 0))      # Error: Cannot divide by zero. / None
print(safe_divide(10, "two"))  # Error: Cannot divide int by str. / None
\`\`\`

### Single except with Tuple

\`\`\`python
def convert_to_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        print(f"Cannot convert {value!r} to integer")
        return None

print(convert_to_int("42"))    # 42
print(convert_to_int("hello")) # Cannot convert 'hello' to integer / None
print(convert_to_int(None))    # Cannot convert None to integer / None
print(convert_to_int([1,2]))   # Cannot convert [1, 2] to integer / None
\`\`\`

### Catch All Exceptions (Use Carefully)

\`\`\`python
# Catch ALL exceptions - use sparingly!
try:
    risky_code()
except Exception as e:
    print(f"An error occurred: {type(e).__name__}: {e}")

# Even more general (catches everything including SystemExit, KeyboardInterrupt)
try:
    risky_code()
except BaseException as e:
    print(f"Critical error: {e}")

# BEST PRACTICE: catch specific exceptions, not Exception or BaseException
# Only use 'except Exception' as a last resort with proper logging
\`\`\`

## The else Block

The \`else\` block runs only if the \`try\` block completed **without any exception**. It is perfect for code that should only run on success.

\`\`\`python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("That is not a valid number.")
else:
    # Only runs if no exception occurred in try
    print(f"Great! You entered {number}")
    square = number ** 2
    print(f"Its square is {square}")
\`\`\`

\`\`\`python
# More examples
def read_config(filename):
    try:
        file = open(filename, "r")
        data = file.read()
        file.close()
    except FileNotFoundError:
        print(f"Config file '{filename}' not found. Using defaults.")
        return {}
    else:
        # File was read successfully - parse it
        import json
        try:
            return json.loads(data)
        except json.JSONDecodeError:
            print("Config file contains invalid JSON.")
            return {}

def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Division by zero!")
        return None
    else:
        # No exception - calculation succeeded
        print(f"{a} / {b} = {result}")
        return result

divide(10, 2)    # 10 / 2 = 5.0
divide(10, 0)    # Error: Division by zero!
\`\`\`

## The finally Block

The \`finally\` block **always runs** - whether an exception occurred or not. Use it for cleanup that must happen regardless of outcome.

\`\`\`python
try:
    risky_code()
except SomeError:
    handle_error()
finally:
    # ALWAYS runs - cleanup code goes here
    cleanup()
\`\`\`

\`\`\`python
# Classic use: ensure file is always closed
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    # Process content...
    result = int(content.strip())
except FileNotFoundError:
    print("File not found!")
except ValueError:
    print("File content is not a number!")
finally:
    if file:
        file.close()   # Always closes, even if exception occurred
        print("File closed.")

# Better: use 'with' statement instead
# with open("data.txt", "r") as file:
#     content = file.read()
\`\`\`

\`\`\`python
# finally runs even when returning from try or except
def risky_operation():
    try:
        print("Trying...")
        return "success"      # finally still runs before function returns!
    except Exception:
        return "failure"      # finally still runs here too
    finally:
        print("Cleanup always runs!")

result = risky_operation()
# Output:
# Trying...
# Cleanup always runs!
print(result)   # success

# finally runs even with an uncaught exception
def another_example():
    try:
        raise RuntimeError("Something bad")
    finally:
        print("Cleanup before crash!")
        # The exception is still re-raised after finally

try:
    another_example()
except RuntimeError as e:
    print(f"Caught: {e}")
# Output:
# Cleanup before crash!
# Caught: Something bad
\`\`\`

## Complete Structure: try / except / else / finally

\`\`\`python
try:
    # Code that might raise an exception
    result = int(input("Number: "))
    value = 100 / result

except ValueError:
    # Runs if ValueError occurs in try
    print("Please enter a valid integer.")

except ZeroDivisionError:
    # Runs if ZeroDivisionError occurs in try
    print("Cannot divide by 100 by zero!")

else:
    # Runs ONLY if no exception occurred in try
    print(f"100 / {result} = {value:.2f}")

finally:
    # ALWAYS runs no matter what
    print("Operation complete.")
\`\`\`

Example runs:
\`\`\`
# Input: 4
Number: 4
100 / 4 = 25.00
Operation complete.

# Input: 0
Number: 0
Cannot divide by 100 by zero!
Operation complete.

# Input: hello
Number: hello
Please enter a valid integer.
Operation complete.
\`\`\`

## Nested try Blocks

\`\`\`python
def process_file(filename):
    try:
        # Outer try: file operations
        with open(filename, "r") as file:
            content = file.read()

        try:
            # Inner try: data processing
            import json
            data = json.loads(content)
            result = data["value"] * 2
            return result
        except json.JSONDecodeError:
            print(f"Invalid JSON in {filename}")
            return None
        except KeyError:
            print(f"Missing 'value' key in {filename}")
            return None

    except FileNotFoundError:
        print(f"File not found: {filename}")
        return None
    except PermissionError:
        print(f"No permission to read: {filename}")
        return None
\`\`\`

## Practical Example: Robust Input System

\`\`\`python
def get_validated_input(prompt, convert_func, validator=None, max_attempts=3):
    """
    Get and validate user input with retry logic.

    Args:
        prompt: Message to show the user
        convert_func: Function to convert string (e.g., int, float)
        validator: Optional function to validate the value
        max_attempts: Maximum number of tries before giving up
    """
    for attempt in range(1, max_attempts + 1):
        try:
            raw = input(prompt)
            value = convert_func(raw)

            if validator is not None and not validator(value):
                print(f"Invalid value: {value}. Please try again.")
                continue

        except ValueError as e:
            print(f"Invalid input: {e}. Please try again. ({attempt}/{max_attempts})")
            if attempt == max_attempts:
                return None
        else:
            return value   # Return only if no exception occurred

    return None   # Max attempts reached

# Usage
age = get_validated_input(
    "Enter your age (1-120): ",
    int,
    validator=lambda x: 1 <= x <= 120
)

if age is not None:
    print(f"Your age is: {age}")
else:
    print("Failed to get valid age after 3 attempts.")

score = get_validated_input(
    "Enter a score (0-100): ",
    float,
    validator=lambda x: 0.0 <= x <= 100.0
)
\`\`\`

## Practical Example: Database Connection Simulator

\`\`\`python
class DatabaseError(Exception):
    pass

class ConnectionError(DatabaseError):
    pass

def simulate_db_operation(query):
    """Simulates a database operation with various failure modes."""
    import random
    roll = random.random()

    if roll < 0.2:
        raise ConnectionError("Database server unreachable")
    elif roll < 0.3:
        raise ValueError(f"Invalid query syntax: {query[:20]}")
    elif roll < 0.4:
        raise TimeoutError("Query timed out after 30 seconds")

    return [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]

def run_query(query, max_retries=3):
    last_error = None

    for attempt in range(1, max_retries + 1):
        connection = None
        try:
            print(f"Attempt {attempt}: Running query...")
            connection = "DB Connection"   # Simulated
            results = simulate_db_operation(query)

        except ConnectionError as e:
            last_error = e
            print(f"  Connection error: {e}. Retrying...")
            continue   # Try again

        except ValueError as e:
            # Don't retry - the query itself is invalid
            print(f"  Query error: {e}")
            return None

        except TimeoutError as e:
            last_error = e
            print(f"  Timeout: {e}. Retrying...")
            continue

        except Exception as e:
            print(f"  Unexpected error: {type(e).__name__}: {e}")
            return None

        else:
            print(f"  Success! Got {len(results)} results.")
            return results

        finally:
            if connection:
                print(f"  Closing connection.")

    print(f"Failed after {max_retries} attempts. Last error: {last_error}")
    return None

import random
random.seed(42)
results = run_query("SELECT * FROM users")
if results:
    for row in results:
        print(f"  User: {row}")
\`\`\`

> [!TIP]
> Only catch exceptions you can actually handle. Catching \`Exception\` broadly and ignoring it hides bugs. Use \`else\` for code that should run only on success - it is cleaner than putting it at the end of the \`try\` block. Use \`finally\` for cleanup that must always happen, like closing connections or releasing locks.`,
  objectives: [
    "Use try/except to catch and handle specific exceptions.",
    "Catch the exception object using 'as' to access the error message.",
    "Catch multiple exception types in separate or combined except blocks.",
    "Use the else block for code that runs only when no exception occurred.",
    "Use the finally block for cleanup code that always must run."
  ],
  difficulty: "beginner",
  xpReward: 65,
};