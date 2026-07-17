export const anyAllFunctionsLesson = {
  title: "any() and all() Functions",
  slug: "any-all-functions",
  content: `# any() and all() Functions

\`any()\` and \`all()\` are built-in functions that test whether elements of an iterable satisfy a condition. They're the functional-programming equivalents of the logical OR and AND operators applied across a sequence.

## Basic Syntax

\`\`\`python
any(iterable)   # Returns True if ANY element is truthy
all(iterable)   # Returns True if ALL elements are truthy
\`\`\`

Both return \`True\` or \`False\` and short-circuit (stop evaluating as soon as the result is determined).

## any() — At Least One True

\`\`\`python
# Returns True if at least one element is truthy
print(any([False, False, True, False]))    # True
print(any([False, False, False, False]))   # False
print(any([0, "", [], None, 1]))           # True (1 is truthy)
print(any([0, "", [], None]))              # False (all falsy)
print(any([]))                              # False (empty iterable)
\`\`\`

## all() — Every Element True

\`\`\`python
# Returns True if every element is truthy
print(all([True, True, True]))       # True
print(all([True, False, True]))      # False
print(all([1, 2, 3, 4, 5]))          # True (all truthy)
print(all([1, 2, 0, 4, 5]))          # False (0 is falsy)
print(all([]))                        # True (empty iterable — vacuous truth)
\`\`\`

> [!NOTE]
> \`all([])\` returns \`True\` and \`any([])\` returns \`False\`. This is mathematically consistent: "all elements satisfy X" is vacuously true for an empty set, while "any element satisfies X" is false when there are no elements.

## with Conditions (Generator Expressions)

\`\`\`python
numbers = [2, 4, 6, 8, 10]

# Check if any number is greater than 7
print(any(n > 7 for n in numbers))     # True (8 and 10)

# Check if all numbers are even
print(all(n % 2 == 0 for n in numbers))  # True

# Check if any number is negative
print(any(n < 0 for n in numbers))     # False

# Check if all numbers are positive
print(all(n > 0 for n in numbers))     # True
\`\`\`

## Practical Examples

\`\`\`python
# Validate user data
user = {"name": "Alice", "email": "alice@example.com", "age": 25}

# Check if all required fields are filled
required = ["name", "email", "age"]
is_complete = all(user.get(field) for field in required)
print(f"Profile complete: {is_complete}")   # True

# Check if any field is empty
has_empty = any(not user.get(field) for field in required)
print(f"Has empty fields: {has_empty}")   # False

# Validate a list of test scores
scores = [85, 92, 78, 95, 88]
all_passing = all(score >= 60 for score in scores)
print(f"All students passed: {all_passing}")   # True

has_perfect = any(score == 100 for score in scores)
print(f"Has perfect score: {has_perfect}")   # False

# Check password strength
password = "SecurePass123!"
has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
has_digit = any(c.isdigit() for c in password)
has_special = any(c in "!@#$%^&*" for c in password)

is_strong = all([has_upper, has_lower, has_digit, has_special])
print(f"Password strong: {is_strong}")   # True

# Validate a list of email addresses
emails = ["alice@example.com", "bob@test.org", "charlie@demo.net"]
all_valid = all("@" in email and "." in email for email in emails)
print(f"All emails valid: {all_valid}")   # True

# Check if any word starts with a vowel
words = ["apple", "banana", "cherry"]
starts_with_vowel = any(w[0].lower() in "aeiou" for w in words)
print(f"Any starts with vowel: {starts_with_vowel}")   # True
\`\`\`

## Short-Circuit Behavior

\`\`\`python
# any() stops at the first truthy value
def check(n):
    print(f"Checking {n}")
    return n > 5

print("any() short-circuit:")
result = any(check(n) for n in [1, 3, 7, 9, 2])
# Only prints: Checking 1, Checking 3, Checking 7
# Stops at 7 because it's truthy
print(f"Result: {result}")

# all() stops at the first falsy value
def check_all(n):
    print(f"Checking {n}")
    return n > 0

print("\nall() short-circuit:")
result = all(check_all(n) for n in [1, 3, 0, 9, 2])
# Only prints: Checking 1, Checking 3, Checking 0
# Stops at 0 because it's falsy
print(f"Result: {result}")
\`\`\`

## any() and all() vs Loops

\`\`\`python
numbers = [2, 4, 6, 8, 10]

# Using a loop (verbose)
all_even_loop = True
for n in numbers:
    if n % 2 != 0:
        all_even_loop = False
        break

# Using all() (concise)
all_even_builtin = all(n % 2 == 0 for n in numbers)

print(all_even_loop)       # True
print(all_even_builtin)    # True
\`\`\`

## Nested any() and all()

\`\`\`python
# Check if any row in a matrix contains a zero
matrix = [
    [1, 2, 3],
    [4, 0, 6],
    [7, 8, 9],
]
has_zero = any(any(cell == 0 for cell in row) for row in matrix)
print(f"Matrix has zero: {has_zero}")   # True

# Check if all rows have all positive numbers
all_positive = all(all(cell > 0 for cell in row) for row in matrix)
print(f"All positive: {all_positive}")   # False

# Check if all rows have at least one even number
all_rows_have_even = all(any(cell % 2 == 0 for cell in row) for row in matrix)
print(f"All rows have even: {all_rows_have_even}")   # True
\`\`\`

## Truthy/Falsy Values Refresher

\`\`\`python
# Falsy values: 0, 0.0, "", [], {}, (), None, False
# Truthy values: everything else

print(all([1, 2, 3]))        # True
print(all([1, 0, 3]))        # False (0 is falsy)
print(all(["a", "b", "c"]))  # True
print(all(["a", "", "c"]))   # False ("" is falsy)

print(any([0, 0, 0]))        # False
print(any([0, 1, 0]))        # True
print(any(["", "", ""]))     # False
print(any(["", "a", ""]))   # True
\`\`\`

## Combining with filter() and map()

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Are all squares greater than 10?
squares = list(map(lambda x: x ** 2, numbers))
result = all(s > 10 for s in squares)
print(result)   # False (1, 4, 9 are <= 10)

# Is any filtered result greater than 50?
result = any(x > 50 for x in map(lambda x: x ** 2, numbers))
print(result)   # True (64, 81, 100)

# Are all filtered even numbers divisible by 4?
evens = list(filter(lambda x: x % 2 == 0, numbers))
result = all(e % 4 == 0 for e in evens)
print(result)   # False (2, 6, 10 are not divisible by 4)
\`\`\`

> [!TIP]
> Use \`any()\` and \`all()\` with generator expressions for readable, efficient condition checking across sequences. They're more Pythonic than explicit loops and benefit from short-circuit evaluation.`,
  objectives: [
    "Understand the purpose and behavior of any() and all().",
    "Use any() and all() with generator expressions.",
    "Leverage short-circuit evaluation for efficiency.",
    "Apply any() and all() in validation and data checking scenarios."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
