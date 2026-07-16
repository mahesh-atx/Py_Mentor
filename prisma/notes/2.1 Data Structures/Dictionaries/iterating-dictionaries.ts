export const iteratingDictionariesLesson = {
  title: "Iterating Through Dictionaries",
  slug: "iterating-dictionaries",
  content: `# Iterating Through Dictionaries

Python provides several ways to iterate over dictionaries. Choosing the right method makes your code cleaner and more efficient. Iterating is about picking the *shape* of each step — keys (the default, since \`for k in d\` matches \`for k in d.keys()\`), values, or both as pairs — and since Python 3.7 loops run in **insertion order**. The key pitfall: never add or remove keys while looping, which raises a \`RuntimeError\`; iterate over a snapshot like \`list(d.keys())\` instead.

## Method 1: Iterate Over Keys (Default)

By default, iterating over a dictionary gives you the keys:

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# These are equivalent
for key in person:
    print(key)

for key in person.keys():
    print(key)
\`\`\`

Output:
\`\`\`
name
age
city
\`\`\`

\`\`\`python
# Access values through keys
for key in person:
    print(f"{key}: {person[key]}")
\`\`\`

## Method 2: Iterate Over Values

Use \`.values()\` when you only need the values:

\`\`\`python
scores = {"Alice": 88, "Bob": 72, "Charlie": 95}

for score in scores.values():
    print(score)
# Output: 88  72  95

# Calculate statistics
total = sum(scores.values())
average = total / len(scores)
maximum = max(scores.values())
print(f"Average: {average:.1f}, Max: {maximum}")
\`\`\`

## Method 3: Iterate Over Key-Value Pairs (Most Common)

Use \`.items()\` to get both key and value at once - this is the most common pattern:

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

Output:
\`\`\`
name: Alice
age: 25
city: New York
\`\`\`

\`\`\`python
scores = {"Alice": 88, "Bob": 45, "Charlie": 92, "Diana": 67}

for name, score in scores.items():
    if score >= 60:
        status = "Pass"
    else:
        status = "Fail"
    print(f"{name:<10}: {score:>5}  [{status}]")
\`\`\`

Output:
\`\`\`
Alice     :    88  [Pass]
Bob       :    45  [Fail]
Charlie   :    92  [Pass]
Diana     :    67  [Pass]
\`\`\`

## Iterating in Sorted Order

Dictionaries maintain insertion order but you can iterate in a different order:

\`\`\`python
scores = {"Charlie": 92, "Alice": 88, "Bob": 45, "Diana": 67}

# Sort by key (alphabetically)
for name in sorted(scores):
    print(f"{name}: {scores[name]}")

# Sort by value (ascending)
for name, score in sorted(scores.items(), key=lambda x: x[1]):
    print(f"{name}: {score}")

# Sort by value (descending)
for name, score in sorted(scores.items(), key=lambda x: x[1], reverse=True):
    print(f"{name}: {score}")
\`\`\`

Output (descending):
\`\`\`
Charlie: 92
Alice: 88
Diana: 67
Bob: 45
\`\`\`

## Iterating with enumerate()

\`\`\`python
menu = {"Burger": 8.99, "Pizza": 12.99, "Salad": 6.99, "Soda": 1.99}

for i, (item, price) in enumerate(menu.items(), 1):
    print(f"{i}. {item:<10} \${price:.2f}")
\`\`\`

Output:
\`\`\`
1. Burger     $8.99
2. Pizza      $12.99
3. Salad      $6.99
4. Soda       $1.99
\`\`\`

## Filtering While Iterating

\`\`\`python
inventory = {
    "laptop":   {"price": 999, "stock": 15},
    "mouse":    {"price": 29,  "stock": 0},
    "keyboard": {"price": 79,  "stock": 8},
    "monitor":  {"price": 349, "stock": 0},
}

# In-stock items only
print("In Stock:")
for name, data in inventory.items():
    if data["stock"] > 0:
        print(f"  {name}: {data['stock']} units @ \${data['price']}")

# Out-of-stock items
out_of_stock = [name for name, data in inventory.items() if data["stock"] == 0]
print(f"\\nOut of stock: {out_of_stock}")
\`\`\`

## Modifying a Dictionary While Iterating

> [!IMPORTANT]
> Never add or remove keys while iterating - it causes a RuntimeError.

\`\`\`python
scores = {"Alice": 88, "Bob": 45, "Charlie": 92, "Diana": 58}

# WRONG - causes RuntimeError
# for name in scores:
#     if scores[name] < 60:
#         del scores[name]   # RuntimeError!

# CORRECT - iterate over a copy
for name in list(scores.keys()):
    if scores[name] < 60:
        del scores[name]
print(scores)   # Output: {'Alice': 88, 'Charlie': 92}

# ALSO CORRECT - build a new dict
scores = {"Alice": 88, "Bob": 45, "Charlie": 92, "Diana": 58}
scores = {name: score for name, score in scores.items() if score >= 60}
print(scores)   # Output: {'Alice': 88, 'Charlie': 92}
\`\`\`

## Iterating Nested Dictionaries

\`\`\`python
students = {
    "alice": {"math": 92, "science": 88, "english": 95},
    "bob":   {"math": 75, "science": 82, "english": 70},
    "charlie":{"math": 98, "science": 94, "english": 91},
}

print(f"{'Name':<10} {'Math':>6} {'Science':>8} {'English':>8} {'Avg':>6}")
print("-" * 42)

for name, grades in students.items():
    avg = sum(grades.values()) / len(grades)
    print(f"{name:<10} {grades['math']:>6} {grades['science']:>8} {grades['english']:>8} {avg:>6.1f}")
\`\`\`

Output:
\`\`\`
Name        Math  Science  English     Avg
------------------------------------------
alice         92       88       95    91.7
bob           75       82       70    75.7
charlie       98       94       91    94.3
\`\`\`

## Using zip() with Dictionaries

\`\`\`python
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]

# Create dict from two lists
student_scores = dict(zip(names, scores))
print(student_scores)
# Output: {'Alice': 88, 'Bob': 72, 'Charlie': 95}

# Iterate two dicts in parallel using zip
scores_2023 = {"Alice": 88, "Bob": 72, "Charlie": 95}
scores_2024 = {"Alice": 92, "Bob": 78, "Charlie": 89}

for (name, score_23), (_, score_24) in zip(scores_2023.items(), scores_2024.items()):
    change = score_24 - score_23
    arrow = "up" if change > 0 else "down" if change < 0 else "same"
    print(f"{name}: {score_23} -> {score_24} ({arrow} by {abs(change)})")
\`\`\`

Output:
\`\`\`
Alice: 88 -> 92 (up by 4)
Bob: 72 -> 78 (up by 6)
Charlie: 95 -> 89 (down by 6)
\`\`\`

## Practical Example: Sales Report

\`\`\`python
sales = {
    "Q1": {"Jan": 12500, "Feb": 11200, "Mar": 15800},
    "Q2": {"Apr": 13400, "May": 16700, "Jun": 14900},
    "Q3": {"Jul": 11800, "Aug": 13200, "Sep": 15100},
    "Q4": {"Oct": 17200, "Nov": 19800, "Dec": 22500},
}

print("=" * 50)
print(f"{'ANNUAL SALES REPORT':^50}")
print("=" * 50)

annual_total = 0

for quarter, months in sales.items():
    q_total = sum(months.values())
    annual_total += q_total
    print(f"\\n{quarter} (Total: \${q_total:,})")
    print("-" * 30)

    for month, amount in months.items():
        bar = "#" * (amount // 1000)
        print(f"  {month}: \${amount:>7,}  {bar}")

print("=" * 50)
print(f"Annual Total: \${annual_total:,}")
print(f"Monthly Avg:  \${annual_total // 12:,}")

# Best month
best_month = max(
    ((month, amount) for months in sales.values() for month, amount in months.items()),
    key=lambda x: x[1]
)
print(f"Best Month:   {best_month[0]} (\${best_month[1]:,})")
\`\`\`

Output (excerpt):
\`\`\`
==================================================
               ANNUAL SALES REPORT
==================================================

Q1 (Total: $39,500)
------------------------------
  Jan: $ 12,500  ############
  Feb: $ 11,200  ###########
  Mar: $ 15,800  ###############
...
==================================================
Annual Total: $183,100
Monthly Avg:  $15,258
Best Month:   Dec ($22,500)
\`\`\`

> [!TIP]
> Use \`for key in dict\` to iterate keys only. Use \`for key, value in dict.items()\` when you need both - this is the most common pattern. Never modify the dictionary structure (add/remove keys) during iteration - iterate over \`list(dict.keys())\` instead, or build a new dict with comprehension.`,
  objectives: [
    "Iterate over dictionary keys using a for loop.",
    "Iterate over values using .values().",
    "Iterate over key-value pairs using .items() - the most common pattern.",
    "Sort dictionary iteration by key or value.",
    "Safely modify a dictionary during iteration."
  ],
  difficulty: "beginner",
  xpReward: 60,
};