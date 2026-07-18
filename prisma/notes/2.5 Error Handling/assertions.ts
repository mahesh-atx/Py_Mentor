export const assertionsLesson = {
  title: "Assertions (assert)",
  slug: "assertions",
  content: `# Assertions (assert)

An \`assert\` is really a self-documenting claim that \`assert condition\` is just shorthand for \`if not condition: raise AssertionError\`, and because \`python -O\` strips assertions at byte-compile time they are a development aid rather than a runtime contract. The pitfall is using \`assert\` to validate untrusted input, since those checks disappear in optimized mode and silently drop your guardrails.

## What is an Assertion?

An **assertion** is a sanity check - a statement that says "this MUST be true at this point in my code." If it is false, Python immediately raises an \`AssertionError\`, signaling a programming bug (not a user error).

\`\`\`python
assert condition          # Raises AssertionError if condition is False
assert condition, message # Raises AssertionError with a message
\`\`\`

## Basic Usage

\`\`\`python
# Simple assertions
assert 2 + 2 == 4          # True - no error
assert 10 > 5              # True - no error
assert "hello" != "world"  # True - no error

# These fail
try:
    assert 1 == 2
except AssertionError:
    print("Caught assertion failure!")

# With a message
try:
    age = -5
    assert age >= 0, f"Age cannot be negative, got {age}"
except AssertionError as e:
    print(f"AssertionError: {e}")
    # AssertionError: Age cannot be negative, got -5
\`\`\`

## Assertions vs Exceptions: When to Use Which

\`\`\`
Use ASSERT for:                     Use RAISE for:
--------------------------          ----------------------------
Internal programming bugs           User or external input errors
"This should never happen"          "This can legitimately fail"
Developer sanity checks             Runtime validation
Testing invariants in your code     Communicating errors to callers

ASSERT can be disabled with         RAISE is always active
python -O (optimization mode)       and cannot be disabled
\`\`\`

\`\`\`python
# ASSERT: Check programming logic (impossible in theory)
def binary_search(arr, target):
    assert len(arr) > 0, "Cannot search an empty array"
    assert arr == sorted(arr), "Array must be sorted for binary search"
    # ... implementation

# RAISE: Validate external input (can legitimately happen)
def get_user_age(user_input):
    try:
        age = int(user_input)
    except ValueError:
        raise ValueError(f"Age must be a number, got: {user_input!r}")
    if age < 0 or age > 150:
        raise ValueError(f"Age out of range: {age}")
    return age
\`\`\`

## Common Uses of assert

### Checking Function Preconditions

\`\`\`python
def factorial(n):
    """Calculate n! - n must be non-negative integer."""
    assert isinstance(n, int), f"n must be int, got {type(n).__name__}"
    assert n >= 0, f"n must be non-negative, got {n}"

    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))    # 120
# factorial(-1)        # AssertionError: n must be non-negative, got -1
# factorial(2.5)       # AssertionError: n must be int, got float
\`\`\`

\`\`\`python
def binary_search(arr, target):
    """Search sorted array. Array MUST be sorted."""
    assert arr == sorted(arr), "Array must be sorted for binary search!"

    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

sorted_nums = [1, 3, 5, 7, 9, 11]
print(binary_search(sorted_nums, 7))   # 3

# If you accidentally pass unsorted:
# binary_search([5, 1, 3], 3)  # AssertionError: Array must be sorted!
\`\`\`

### Checking Postconditions (Results)

\`\`\`python
def normalize_scores(scores):
    """Normalize scores to 0-1 range."""
    assert scores, "Scores list cannot be empty"

    max_score = max(scores)
    min_score = min(scores)

    if max_score == min_score:
        result = [0.5] * len(scores)  # All same -> middle value
    else:
        result = [(s - min_score) / (max_score - min_score) for s in scores]

    # Check postcondition: all results should be in [0, 1]
    assert all(0.0 <= r <= 1.0 for r in result), "Normalization bug: result out of range!"
    assert len(result) == len(scores), "Length mismatch after normalization!"

    return result

scores = [20, 40, 60, 80, 100]
normalized = normalize_scores(scores)
print(normalized)   # [0.0, 0.25, 0.5, 0.75, 1.0]
\`\`\`

### Checking Invariants in Classes

\`\`\`python
class BankAccount:
    def __init__(self, balance=0):
        assert balance >= 0, f"Initial balance cannot be negative: {balance}"
        self.balance = balance

    def _check_invariant(self):
        """Check that the object is in a valid state."""
        assert self.balance >= 0, f"Balance invariant violated: {self.balance}"

    def deposit(self, amount):
        assert amount > 0, f"Deposit amount must be positive: {amount}"
        self.balance += amount
        self._check_invariant()

    def withdraw(self, amount):
        assert amount > 0, f"Withdrawal amount must be positive: {amount}"
        if amount > self.balance:
            raise ValueError(f"Insufficient funds")   # User error -> raise
        self.balance -= amount
        self._check_invariant()

acc = BankAccount(100)
acc.deposit(50)
acc.withdraw(30)
print(acc.balance)   # 120
\`\`\`

## Assertions in Testing

Assertions are the foundation of unit testing:

\`\`\`python
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def power(base, exp):
    return base ** exp

# Manual test functions using assert
def test_add():
    assert add(2, 3) == 5, "2 + 3 should be 5"
    assert add(0, 0) == 0, "0 + 0 should be 0"
    assert add(-1, 1) == 0, "-1 + 1 should be 0"
    assert add(1.5, 2.5) == 4.0, "1.5 + 2.5 should be 4.0"
    print("test_add: PASSED")

def test_multiply():
    assert multiply(3, 4) == 12, "3 * 4 should be 12"
    assert multiply(0, 100) == 0, "0 * anything should be 0"
    assert multiply(-2, 3) == -6, "-2 * 3 should be -6"
    print("test_multiply: PASSED")

def test_power():
    assert power(2, 10) == 1024, "2^10 should be 1024"
    assert power(5, 0) == 1, "anything^0 should be 1"
    assert power(3, 3) == 27, "3^3 should be 27"
    print("test_power: PASSED")

# Run tests
test_add()
test_multiply()
test_power()
\`\`\`

## AssertionError with Detailed Messages

\`\`\`python
# Good assertion messages explain what was expected vs what happened
def process_data(data):
    assert isinstance(data, list), (
        f"Expected list, got {type(data).__name__}: {data!r}"
    )
    assert len(data) > 0, (
        "Data list cannot be empty"
    )
    assert all(isinstance(x, (int, float)) for x in data), (
        f"All items must be numbers. Found non-numeric: "
        f"{[x for x in data if not isinstance(x, (int, float))]}"
    )
    return sum(data) / len(data)

try:
    process_data(["a", 1, 2])
except AssertionError as e:
    print(f"AssertionError: {e}")

# Multi-line assertion for complex conditions
def validate_config(config):
    assert isinstance(config, dict), f"Config must be dict, got {type(config).__name__}"

    assert "host" in config, (
        "Config missing 'host'. "
        f"Available keys: {list(config.keys())}"
    )

    assert isinstance(config.get("port"), int), (
        f"Config 'port' must be int, "
        f"got {type(config.get('port')).__name__}: {config.get('port')!r}"
    )

    port = config["port"]
    assert 1 <= port <= 65535, (
        f"Config 'port' must be 1-65535, got {port}"
    )
\`\`\`

## The -O Flag: Assertions Can Be Disabled

\`\`\`python
# Run with: python -O script.py
# All assert statements are REMOVED by the optimizer!
# This means NEVER use assert for security/input validation in production

# WRONG: Using assert for user validation (can be disabled!)
def login(username, password):
    assert username, "Username required"        # WRONG! Can be bypassed
    assert len(password) >= 8, "Short password" # WRONG! Can be bypassed

# CORRECT: Use raise for anything security-related
def login(username, password):
    if not username:
        raise ValueError("Username is required")    # Always runs
    if len(password) < 8:
        raise ValueError("Password too short")      # Always runs
\`\`\`

## Practical Example: Data Processing with Assertions

\`\`\`python
def process_student_data(raw_data):
    """
    Process a list of student records.
    Uses assert for internal logic checks,
    raise for data validation.
    """
    # Internal precondition check
    assert isinstance(raw_data, list), "Input must be a list"

    results = []
    skipped = 0

    for i, record in enumerate(raw_data):
        try:
            # Validate record (user data - use raise)
            if not isinstance(record, dict):
                raise TypeError(f"Record must be a dict, got {type(record).__name__}")

            name = record.get("name", "").strip()
            if not name:
                raise ValueError("Name is required")

            scores = record.get("scores", [])
            if not isinstance(scores, list):
                raise TypeError(f"Scores must be a list")
            if not scores:
                raise ValueError("At least one score is required")

            numeric_scores = []
            for s in scores:
                if not isinstance(s, (int, float)):
                    raise TypeError(f"Score must be a number, got {s!r}")
                if not 0 <= s <= 100:
                    raise ValueError(f"Score {s} out of range [0, 100]")
                numeric_scores.append(float(s))

            # Calculate result
            average = sum(numeric_scores) / len(numeric_scores)

            # Internal postcondition (programming error if violated)
            assert 0 <= average <= 100, f"Average calculation bug: {average}"

            grade = (
                "A" if average >= 90 else
                "B" if average >= 80 else
                "C" if average >= 70 else
                "D" if average >= 60 else "F"
            )

            results.append({
                "name": name,
                "average": round(average, 1),
                "grade": grade,
                "count": len(numeric_scores)
            })

        except (ValueError, TypeError) as e:
            print(f"  Skipping record {i+1}: {e}")
            skipped += 1

    # Postcondition: results + skipped should equal input
    assert len(results) + skipped == len(raw_data), "Count mismatch bug!"

    return results, skipped

raw = [
    {"name": "Alice", "scores": [88, 92, 85]},
    {"name": "Bob",   "scores": [72, 68, 75]},
    {"name": "",      "scores": [90]},          # Invalid
    {"name": "Diana", "scores": [61, "A", 66]}, # Invalid
    {"name": "Eve",   "scores": [91, 95, 88]},
]

print("Processing student records:")
results, skipped = process_student_data(raw)
print(f"\\nResults: {len(results)} processed, {skipped} skipped")
for r in results:
    print(f"  {r['name']}: {r['average']} ({r['grade']}) - {r['count']} scores")
\`\`\`

Output:
\`\`\`
Processing student records:
  Skipping record 3: Name is required
  Skipping record 4: Score must be a number, got 'A'

Results: 3 processed, 2 skipped
  Alice: 88.3 (B) - 3 scores
  Bob: 71.7 (C) - 3 scores
  Eve: 91.3 (A) - 3 scores
\`\`\`

> [!TIP]
> Use \`assert\` for internal sanity checks - things that should be impossible if your code is correct. Never use \`assert\` for validating user input or external data, because assertions can be disabled with \`python -O\`. Always include a descriptive message: \`assert condition, f"Expected X, got {value}"\`. Think of assertions as executable documentation that helps catch bugs during development.`,
  objectives: [
    "Understand what assertions are and when to use them.",
    "Write assertions with descriptive failure messages.",
    "Distinguish between assert (for bugs) and raise (for runtime errors).",
    "Use assertions to check preconditions, postconditions, and invariants.",
    "Understand that assertions can be disabled with python -O."
  ],
  difficulty: "intermediate",
  xpReward: 50,
};