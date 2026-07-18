export const raisingExceptionsLesson = {
  title: "Raising Exceptions (raise)",
  slug: "raising-exceptions",
  content: `# Raising Exceptions (raise)

Raising an exception is your function refusing to continue on invalid terms and transferring control upward to the caller, who then decides how to recover — following the fail-fast principle that an error caught immediately is easier to debug. The pitfall is returning \`None\` or a sentinel to signal errors, because callers often forget to check and then hit a confusing \`TypeError\` far from the true cause.

## Why Raise Exceptions?

You raise exceptions to signal that something has gone wrong - that the inputs are invalid, a precondition is not met, or an operation cannot be completed. This is how you communicate errors from your functions to their callers.

\`\`\`python
# Without raising exceptions - silently wrong
def get_age(age):
    if age < 0:
        return -1   # Caller has no idea this is an error!
    return age

result = get_age(-5)
print(result)   # -1  - looks like a valid age!

# With raising exceptions - explicit error signal
def get_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative, got {age}")
    return age

try:
    get_age(-5)
except ValueError as e:
    print(f"Error: {e}")   # Error: Age cannot be negative, got -5
\`\`\`

## Basic raise Syntax

\`\`\`python
# Raise with a message
raise ValueError("Something is wrong with the value")
raise TypeError("Wrong type provided")
raise RuntimeError("An unexpected error occurred")

# Raise with no message
raise ValueError   # Works but no useful message - avoid!

# Raise without arguments (re-raise current exception)
try:
    1 / 0
except ZeroDivisionError:
    print("Caught it!")
    raise   # Re-raises the same ZeroDivisionError
\`\`\`

## When to Raise Exceptions

### Input Validation

\`\`\`python
def set_speed(speed):
    """Set vehicle speed. Must be 0-200 km/h."""
    if not isinstance(speed, (int, float)):
        raise TypeError(f"Speed must be a number, got {type(speed).__name__}")
    if speed < 0:
        raise ValueError(f"Speed cannot be negative, got {speed}")
    if speed > 200:
        raise ValueError(f"Speed exceeds maximum (200 km/h), got {speed}")
    return speed

try:
    set_speed(300)
except ValueError as e:
    print(f"Error: {e}")   # Error: Speed exceeds maximum (200 km/h), got 300

try:
    set_speed("fast")
except TypeError as e:
    print(f"Error: {e}")   # Error: Speed must be a number, got str
\`\`\`

\`\`\`python
def create_user(name, email, age):
    """Create a new user with validation."""
    errors = []

    if not name or not isinstance(name, str):
        errors.append("Name must be a non-empty string")
    elif len(name.strip()) < 2:
        errors.append("Name must be at least 2 characters")

    if not email or "@" not in email:
        errors.append("Email must contain @")

    if not isinstance(age, int) or age < 18:
        errors.append("User must be at least 18 years old")

    if errors:
        raise ValueError("\\n".join(errors))

    return {
        "name": name.strip().title(),
        "email": email.lower(),
        "age": age
    }

try:
    user = create_user("a", "invalid-email", 15)
except ValueError as e:
    print(f"Validation failed:\\n{e}")
\`\`\`

Output:
\`\`\`
Validation failed:
Name must be at least 2 characters
Email must contain @
User must be at least 18 years old
\`\`\`

### Preconditions and State Checking

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.is_frozen = False

    def deposit(self, amount):
        if self.is_frozen:
            raise RuntimeError(f"Account is frozen. Cannot deposit.")
        if not isinstance(amount, (int, float)):
            raise TypeError(f"Amount must be a number, got {type(amount).__name__}")
        if amount <= 0:
            raise ValueError(f"Deposit amount must be positive, got {amount}")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if self.is_frozen:
            raise RuntimeError("Account is frozen. Cannot withdraw.")
        if not isinstance(amount, (int, float)):
            raise TypeError(f"Amount must be a number")
        if amount <= 0:
            raise ValueError(f"Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError(
                f"Insufficient funds. "
                f"Requested: \${amount:.2f}, Available: \${self.balance:.2f}"
            )
        self.balance -= amount
        return self.balance

acc = BankAccount("Alice", 1000)

try:
    acc.withdraw(1500)
except ValueError as e:
    print(f"Cannot withdraw: {e}")

try:
    acc.deposit(-100)
except ValueError as e:
    print(f"Cannot deposit: {e}")

acc.is_frozen = True
try:
    acc.deposit(500)
except RuntimeError as e:
    print(f"Account error: {e}")
\`\`\`

## Re-raising Exceptions

Sometimes you want to catch an exception, do something (like log it), then re-raise it:

\`\`\`python
def process_data(data):
    try:
        result = complex_calculation(data)
        return result
    except ValueError as e:
        # Log the error, then re-raise
        print(f"[LOG] ValueError in process_data: {e}")
        raise   # Re-raises the same exception with original traceback

# raise from - chaining exceptions
def read_config(filename):
    try:
        with open(filename) as f:
            import json
            return json.load(f)
    except FileNotFoundError as e:
        # Wrap in more meaningful exception
        raise RuntimeError(f"Configuration file '{filename}' is missing.") from e
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Configuration file '{filename}' has invalid JSON.") from e

try:
    config = read_config("config.json")
except RuntimeError as e:
    print(f"Config error: {e}")
    print(f"Original cause: {e.__cause__}")
\`\`\`

## Exception Chaining (raise from)

\`\`\`python
# raise X from Y - explicit exception chaining
# Shows the chain: "During handling of the above exception, another exception occurred"

def convert_to_number(value):
    try:
        return float(value)
    except ValueError as e:
        raise TypeError(
            f"Cannot convert {value!r} to a number"
        ) from e   # Chain original exception

try:
    convert_to_number("hello")
except TypeError as e:
    print(f"Error: {e}")
    print(f"Caused by: {e.__cause__}")

# Suppress chaining with 'from None'
def get_user(user_id):
    try:
        # Internal implementation detail
        internal_result = database_query(user_id)
    except DatabaseError as e:
        raise ValueError(f"User {user_id} not found") from None
        # Hides internal DatabaseError from caller

# Accessing exception chain
try:
    raise ValueError("outer") from TypeError("inner")
except ValueError as e:
    print(f"Outer: {e}")
    print(f"Inner: {e.__cause__}")   # TypeError: inner
\`\`\`

## Raise in Different Contexts

\`\`\`python
# Raise in a conditional
def check_positive(n):
    if n <= 0:
        raise ValueError(f"Expected positive number, got {n}")
    return n

# Raise in a loop
def find_item(lst, target):
    for item in lst:
        if item == target:
            return item
    raise LookupError(f"Item {target!r} not found in list")

# Raise in a class method
class Stack:
    def __init__(self):
        self._items = []

    def pop(self):
        if not self._items:
            raise IndexError("pop from empty Stack")
        return self._items.pop()

    def peek(self):
        if not self._items:
            raise IndexError("peek at empty Stack")
        return self._items[-1]

# Conditional raise (raise if)
def process(value):
    error = validate(value)
    if error:
        raise ValueError(error)
    return value
\`\`\`

## raise vs return for Errors

\`\`\`python
# Using return None for errors (anti-pattern - hard to debug)
def divide_bad(a, b):
    if b == 0:
        return None   # Caller might forget to check!
    return a / b

result = divide_bad(10, 0)
print(result * 2)   # TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'
# Error happened HERE, far from the actual problem

# Using raise (correct)
def divide_good(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

try:
    result = divide_good(10, 0)
except ValueError as e:
    print(f"Math error: {e}")
# Error is caught immediately and clearly

# Acceptable: return Optional[X] and document it
def find_user(user_id):
    """Returns user dict or None if not found."""
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # Documented: returns None if not found
\`\`\`

## Practical Example: Data Pipeline with Error Handling

\`\`\`python
class DataPipelineError(Exception):
    """Base class for pipeline errors."""
    pass

class DataValidationError(DataPipelineError):
    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        super().__init__(f"Field '{field}': {reason} (got {value!r})")

class DataTransformError(DataPipelineError):
    pass

def validate_record(record):
    """Validate a data record, raising DataValidationError for issues."""
    if not isinstance(record, dict):
        raise TypeError(f"Record must be a dict, got {type(record).__name__}")

    required_fields = ["id", "name", "value"]
    for field in required_fields:
        if field not in record:
            raise DataValidationError(field, None, "field is required")

    if not isinstance(record["id"], int) or record["id"] <= 0:
        raise DataValidationError("id", record["id"], "must be a positive integer")

    if not isinstance(record["name"], str) or not record["name"].strip():
        raise DataValidationError("name", record["name"], "must be a non-empty string")

    if not isinstance(record["value"], (int, float)):
        raise DataValidationError("value", record["value"], "must be a number")

    return True

def transform_record(record):
    """Transform a validated record."""
    try:
        return {
            "id": record["id"],
            "name": record["name"].strip().title(),
            "value": round(float(record["value"]) * 1.1, 2),   # 10% markup
            "category": "standard" if record["value"] < 100 else "premium"
        }
    except Exception as e:
        raise DataTransformError(f"Failed to transform record {record.get('id')}: {e}") from e

def process_pipeline(records):
    """Process a list of records through the pipeline."""
    results = []
    errors = []

    for i, record in enumerate(records):
        try:
            validate_record(record)
            transformed = transform_record(record)
            results.append(transformed)
        except (DataValidationError, DataTransformError) as e:
            errors.append({"index": i, "error": str(e), "record": record})
        except TypeError as e:
            errors.append({"index": i, "error": str(e), "record": record})

    return results, errors

# Test data
test_records = [
    {"id": 1, "name": "alice", "value": 50},
    {"id": 2, "name": "BOB", "value": 150},
    {"id": 3, "name": "", "value": 30},       # Invalid: empty name
    {"id": -1, "name": "Diana", "value": 80}, # Invalid: negative ID
    {"name": "Eve", "value": 60},             # Invalid: missing ID
    {"id": 5, "name": "Frank", "value": "not-a-number"},  # Invalid value
]

good, bad = process_pipeline(test_records)

print("=== Successful Records ===")
for record in good:
    print(f"  [{record['id']}] {record['name']}: \${record['value']} ({record['category']})")

print(f"\\n=== Errors ({len(bad)}) ===")
for err in bad:
    print(f"  Record {err['index']}: {err['error']}")
\`\`\`

Output:
\`\`\`
=== Successful Records ===
  [1] Alice: $55.0 (standard)
  [2] Bob: $165.0 (premium)

=== Errors (4) ===
  Record 2: Field 'name': must be a non-empty string (got '')
  Record 3: Field 'id': must be a positive integer (got -1)
  Record 4: Field 'id': field is required (got None)
  Record 5: Field 'value': must be a number (got 'not-a-number')
\`\`\`

> [!TIP]
> Raise exceptions early when you detect a problem - do not let bad data propagate through your code. Use \`raise ExceptionType("clear message")\` with descriptive messages that tell the caller exactly what went wrong and what was expected. Use \`raise X from Y\` to chain exceptions when wrapping low-level errors in higher-level ones.`,
  objectives: [
    "Use raise to signal errors from your own functions.",
    "Choose the appropriate exception type for each error situation.",
    "Re-raise exceptions using bare raise to preserve the original traceback.",
    "Chain exceptions using 'raise X from Y' for better error context.",
    "Validate inputs early and raise descriptive exceptions."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};