export const anyAllCombiningLesson = {
  title: "any(), all() and Combining Lambda with map/filter/reduce",
  slug: "any-all-combining",
  content: `# any(), all() and Combining Functional Tools

## any() - True if ANY Item is True

\`any(iterable)\` returns \`True\` if at least one item in the iterable is truthy. Returns \`False\` for empty iterables.

\`\`\`python
print(any([False, False, True, False]))   # True
print(any([False, False, False]))         # False
print(any([]))                            # False (empty = False)

# With conditions using generator expression
numbers = [1, 5, 3, 8, 2, 9]
print(any(n > 7 for n in numbers))    # True  (8 and 9 qualify)
print(any(n > 100 for n in numbers))  # False

# Short-circuit: stops at first True
def check_and_print(x):
    print(f"  Checking {x}")
    return x > 3

print("any() with short-circuit:")
result = any(check_and_print(x) for x in [1, 2, 5, 6, 7])
print(f"Result: {result}")
# Checking 1
# Checking 2
# Checking 5     <-- stops here (5 > 3 is True)
# Result: True
\`\`\`

### any() in Practice

\`\`\`python
# Check if user input has any uppercase
def has_uppercase(s):
    return any(c.isupper() for c in s)

print(has_uppercase("Hello"))   # True
print(has_uppercase("hello"))   # False

# Check if any student failed
scores = [85, 72, 91, 58, 88]
if any(s < 60 for s in scores):
    print("Some students failed!")

# Check if a list contains a specific type
mixed = [1, "hello", 3.14, True, None]
has_string = any(isinstance(item, str) for item in mixed)
print(has_string)   # True

# Check if any file exists
import os
files = ["data.csv", "config.json", "missing.txt"]
if any(os.path.exists(f) for f in files):
    print("At least one file found")
\`\`\`

## all() - True if ALL Items are True

\`all(iterable)\` returns \`True\` only if ALL items are truthy. Returns \`True\` for empty iterables (vacuously true).

\`\`\`python
print(all([True, True, True]))    # True
print(all([True, False, True]))   # False
print(all([]))                    # True  (vacuously true!)

numbers = [2, 4, 6, 8, 10]
print(all(n % 2 == 0 for n in numbers))   # True  (all even)
print(all(n > 0 for n in numbers))        # True  (all positive)

numbers_with_odd = [2, 4, 5, 8, 10]
print(all(n % 2 == 0 for n in numbers_with_odd))   # False
\`\`\`

### all() in Practice

\`\`\`python
# Validate all fields are filled
form = {"name": "Alice", "email": "alice@example.com", "age": "25"}
if all(value.strip() for value in form.values()):
    print("All fields filled!")

# Check all scores are passing
scores = [85, 72, 91, 68, 88]
if all(s >= 60 for s in scores):
    print("All students passed!")
else:
    print("Some students failed.")

# Validate a list of emails
emails = ["alice@example.com", "bob@test.org", "charlie@domain.net"]
all_valid = all("@" in e and "." in e.split("@")[1] for e in emails)
print(f"All emails valid: {all_valid}")   # True

# Check if a string has all required characters
def is_strong_password(pwd):
    checks = [
        len(pwd) >= 8,
        any(c.isupper() for c in pwd),
        any(c.islower() for c in pwd),
        any(c.isdigit() for c in pwd),
        any(c in "!@#$%^&*" for c in pwd),
    ]
    return all(checks)

print(is_strong_password("Hello@123"))   # True
print(is_strong_password("hello123"))    # False
\`\`\`

### any() vs all() Comparison

\`\`\`python
data = [True, False, True, True]

print(any(data))     # True  (at least one True)
print(all(data))     # False (not ALL are True)

data_all_true = [True, True, True]
print(any(data_all_true))   # True
print(all(data_all_true))   # True

data_all_false = [False, False, False]
print(any(data_all_false))   # False
print(all(data_all_false))   # False
\`\`\`

## Combining Lambda with map/filter/reduce

The real power comes from combining these tools together.

### map + filter

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get squares of even numbers
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
print(result)   # [4, 16, 36, 64, 100]

# Equivalent comprehension
result_comp = [x**2 for x in numbers if x % 2 == 0]
print(result_comp == result)   # True

# Get lengths of words longer than 4 chars
words = ["hello", "hi", "python", "is", "awesome", "cool"]
result = list(map(len, filter(lambda w: len(w) > 4, words)))
print(result)   # [5, 6, 7]  (hello, python, awesome)
\`\`\`

### filter + map + reduce

\`\`\`python
from functools import reduce

employees = [
    {"name": "Alice",   "dept": "Engineering", "salary": 95000, "active": True},
    {"name": "Bob",     "dept": "Marketing",   "salary": 72000, "active": False},
    {"name": "Charlie", "dept": "Engineering", "salary": 88000, "active": True},
    {"name": "Diana",   "dept": "Marketing",   "salary": 78000, "active": True},
    {"name": "Eve",     "dept": "Engineering", "salary": 105000, "active": True},
]

# Total salary of active Engineering employees
total = reduce(
    lambda acc, s: acc + s,
    map(
        lambda e: e["salary"],
        filter(
            lambda e: e["active"] and e["dept"] == "Engineering",
            employees
        )
    ),
    0
)
print(f"Engineering payroll: \${total:,}")   # $288,000

# Average salary of active employees
active = list(filter(lambda e: e["active"], employees))
salaries = list(map(lambda e: e["salary"], active))
avg = reduce(lambda acc, s: acc + s, salaries) / len(salaries)
print(f"Average salary: \${avg:,.0f}")
\`\`\`

### Building a Data Pipeline

\`\`\`python
from functools import reduce

raw_data = [
    "  Alice, 88, London  ",
    "BOB, 45, PARIS",
    "  charlie, 92, tokyo  ",
    "Diana, 67, New York",
    "EVE, 55, BERLIN",
]

# Step 1: Parse records
parse = lambda line: [field.strip() for field in line.split(",")]
records = list(map(parse, raw_data))

# Step 2: Normalize names and cities to title case
normalize = lambda rec: [rec[0].title(), int(rec[1]), rec[2].title()]
records = list(map(normalize, records))

# Step 3: Filter passing scores
passing = list(filter(lambda r: r[1] >= 60, records))

# Step 4: Sort by score descending
ranked = sorted(passing, key=lambda r: r[1], reverse=True)

# Step 5: Format and display
for rank, (name, score, city) in enumerate(ranked, 1):
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"#{rank} {name:<10} {score:>3} ({grade}) from {city}")

# Step 6: Statistics with reduce
scores = list(map(lambda r: r[1], passing))
total = reduce(lambda acc, s: acc + s, scores, 0)
print(f"\\nPassing average: {total/len(scores):.1f}")
\`\`\`

Output:
\`\`\`
#1 Charlie     92 (A) from Tokyo
#2 Alice       88 (B) from London
#3 Diana       67 (C) from New York
Passing average: 82.3
\`\`\`

### Lambda in sorted + map + filter

\`\`\`python
products = [
    {"name": "A", "price": 100, "discount": 10, "rating": 4.5},
    {"name": "B", "price": 50,  "discount": 0,  "rating": 4.8},
    {"name": "C", "price": 200, "discount": 30, "rating": 4.2},
    {"name": "D", "price": 75,  "discount": 5,  "rating": 4.7},
]

# Calculate final price and filter affordable items (< $100 after discount)
final_price = lambda p: p["price"] * (1 - p["discount"] / 100)
affordable = list(filter(lambda p: final_price(p) < 100, products))

# Sort by value score (rating / final_price)
value_score = lambda p: p["rating"] / final_price(p)
best_value = sorted(affordable, key=value_score, reverse=True)

for p in best_value:
    fp = final_price(p)
    vs = value_score(p)
    print(f"{p['name']}: \${fp:.2f} (rating: {p['rating']}, value: {vs:.4f})")
\`\`\`

## Complete Functional Toolkit Reference

\`\`\`python
from functools import reduce

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: transform
squares = list(map(lambda x: x**2, data))

# filter: select
evens = list(filter(lambda x: x % 2 == 0, data))

# reduce: accumulate
total = reduce(lambda acc, x: acc + x, data, 0)

# sorted: order
desc = sorted(data, key=lambda x: -x)

# any/all: logical checks
has_big = any(x > 8 for x in data)
all_positive = all(x > 0 for x in data)

# zip: combine
paired = list(zip(data, squares))

# enumerate: index + value
indexed = list(enumerate(data, start=1))

print(f"Squares  : {squares}")
print(f"Evens    : {evens}")
print(f"Total    : {total}")
print(f"Has > 8  : {has_big}")
print(f"All > 0  : {all_positive}")
\`\`\`

> [!TIP]
> Use \`any()\` and \`all()\` with generator expressions (not list comprehensions) - they short-circuit as soon as the answer is known, making them efficient. Combine \`map()\`, \`filter()\`, and \`reduce()\` for elegant data pipelines. However, for readability, prefer list comprehensions for simple single-step operations.`,
  objectives: [
    "Use any() to check if at least one condition is met.",
    "Use all() to check if every condition is met.",
    "Understand short-circuit evaluation in any() and all().",
    "Chain map(), filter(), and reduce() to build data pipelines.",
    "Apply the full functional toolkit to real-world data processing."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};