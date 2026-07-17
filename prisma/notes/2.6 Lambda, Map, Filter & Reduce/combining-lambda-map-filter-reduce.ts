export const combiningLambdaMapFilterReduceLesson = {
  title: "Combining Lambda with map/filter/reduce",
  slug: "combining-lambda-map-filter-reduce",
  content: `# Combining Lambda with map/filter/reduce

The real power of lambda functions emerges when combined with \`map()\`, \`filter()\`, \`reduce()\`, and \`sorted()\`. Together, they form a toolkit for writing concise, functional-style data transformations.

## The Functional Pipeline Pattern

\`\`\`python
from functools import reduce

# The pattern: filter → map → reduce
# 1. filter: select relevant items
# 2. map: transform each item
# 3. reduce: aggregate into a single result

# Example: Sum of squares of even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Step by step:
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, evens))
result = reduce(lambda acc, x: acc + x, squares)

print(result)   # 220 (4 + 16 + 36 + 64 + 100)

# As a pipeline (lazy — no intermediate lists until consumed)
result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x ** 2,
        filter(lambda x: x % 2 == 0, numbers))
)
print(result)   # 220
\`\`\`

## Common Pipeline Patterns

### Filter then Map

\`\`\`python
words = ["apple", "pie", "banana", "kiwi", "strawberry", "fig"]

# Get lengths of long words only
long_lengths = list(map(len, filter(lambda w: len(w) > 4, words)))
print(long_lengths)   # [5, 6, 10]

# Get uppercase versions of words starting with vowels
vowel_words = list(
    map(str.upper,
        filter(lambda w: w[0] in "aeiou", words))
)
print(vowel_words)   # ['APPLE']
\`\`\`

### Filter then Reduce

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Product of odd numbers
product = reduce(
    lambda acc, x: acc * x,
    filter(lambda x: x % 2 != 0, numbers),
    1  # initializer
)
print(product)   # 945 (1 * 3 * 5 * 7 * 9)

# Sum of numbers greater than 5
total = reduce(
    lambda acc, x: acc + x,
    filter(lambda x: x > 5, numbers),
    0
)
print(total)   # 40 (6 + 7 + 8 + 9 + 10)
\`\`\`

### Map then Reduce

\`\`\`python
from functools import reduce

prices = [19.99, 4.99, 12.50, 8.75, 24.99]

# Calculate total with 8% tax
total_with_tax = reduce(
    lambda acc, x: acc + x,
    map(lambda p: p * 1.08, prices)
)
print(f"Total: \${total_with_tax:.2f}")   # Total: $78.37

# Find the most expensive item after discount
max_price = reduce(
    lambda a, b: a if a > b else b,
    map(lambda p: p * 0.9, prices)  # 10% discount
)
print(f"Max after discount: \${max_price:.2f}")   # Max after discount: $22.49
\`\`\`

### Full Pipeline: Filter → Map → Reduce

\`\`\`python
from functools import reduce

# Calculate the average score of passing grades (>= 60)
scores = [45, 78, 92, 55, 88, 60, 72, 95, 30, 84]

passing = filter(lambda s: s >= 60, scores)
adjusted = map(lambda s: s + 5, passing)  # Curve: add 5 points

# Calculate average using reduce
count = 0
def accumulator(acc, x):
    total, count = acc
    return (total + x, count + 1)

total, count = reduce(accumulator, adjusted, (0, 0))
average = total / count if count > 0 else 0
print(f"Adjusted average: {average:.1f}")
\`\`\`

## Real-World Examples

### Data Processing Pipeline

\`\`\`python
from functools import reduce

# Process sales data
sales = [
    {"product": "Laptop", "price": 999.99, "quantity": 3, "region": "US"},
    {"product": "Mouse", "price": 29.99, "quantity": 10, "region": "EU"},
    {"product": "Keyboard", "price": 79.99, "quantity": 5, "region": "US"},
    {"product": "Monitor", "price": 349.99, "quantity": 2, "region": "US"},
    {"product": "Cable", "price": 9.99, "quantity": 50, "region": "EU"},
]

# Total revenue from US region
us_sales = filter(lambda s: s["region"] == "US", sales)
revenues = map(lambda s: s["price"] * s["quantity"], us_sales)
total_revenue = reduce(lambda acc, x: acc + x, revenues, 0)
print(f"US Revenue: \${total_revenue:.2f}")   # US Revenue: $3849.92

# Average price of products with quantity > 5
high_qty = filter(lambda s: s["quantity"] > 5, sales)
prices = list(map(lambda s: s["price"], high_qty))
avg_price = reduce(lambda acc, x: acc + x, prices, 0) / len(prices) if prices else 0
print(f"Avg price (qty > 5): \${avg_price:.2f}")   # Avg price (qty > 5): $19.99
\`\`\`

### Text Processing Pipeline

\`\`\`python
from functools import reduce

text = "Python is a powerful programming language. Python is versatile and popular."

# Word frequency analysis
words = text.lower().split()
cleaned = map(lambda w: w.strip(".,!?"), words)

# Build frequency dictionary with reduce
freq = reduce(
    lambda d, w: {**d, w: d.get(w, 0) + 1},
    cleaned,
    {}
)
print(freq)
# {'python': 2, 'is': 2, 'a': 1, 'powerful': 1, 'programming': 1, ...}

# Find the most common word
most_common = max(freq.items(), key=lambda x: x[1])
print(f"Most common: '{most_common[0]}' ({most_common[1]} times)")
\`\`\`

### Chained sorted() with key

\`\`\`python
from functools import reduce

students = [
    {"name": "Alice", "scores": [88, 92, 85]},
    {"name": "Bob", "scores": [72, 68, 79]},
    {"name": "Charlie", "scores": [95, 91, 98]},
    {"name": "Diana", "scores": [60, 75, 68]},
]

# Sort by average score descending
by_avg = sorted(students, key=lambda s: sum(s["scores"]) / len(s["scores"]), reverse=True)
print("By average:", [s["name"] for s in by_avg])
# ['Charlie', 'Alice', 'Bob', 'Diana']

# Sort by highest single score, then by name
by_max_then_name = sorted(
    students,
    key=lambda s: (-max(s["scores"]), s["name"])
)
print("By max score:", [s["name"] for s in by_max_then_name])
# ['Charlie', 'Alice', 'Bob', 'Diana']
\`\`\`

## When to Use Pipelines vs Comprehensions

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Pipeline approach (functional)
result = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x ** 2,
        filter(lambda x: x % 2 == 0, numbers))
)

# Comprehension approach (often preferred)
result = sum(x ** 2 for x in numbers if x % 2 == 0)

# Both produce the same result
print(result)   # 220
\`\`\`

> [!TIP]
> For simple transformations, comprehensions and generator expressions are usually more readable. Use \`map()\`/\`filter()\`/\`reduce()\` pipelines when: (1) you already have named functions to apply, (2) you're chaining many operations, or (3) you're working in a functional programming style. For aggregation with built-ins like \`sum()\`, \`max()\`, \`min()\`, prefer those over \`reduce()\`.

## Performance Considerations

\`\`\`python
from functools import reduce

numbers = list(range(1, 1000001))

# Using reduce for sum (slower)
result_reduce = reduce(lambda acc, x: acc + x, numbers, 0)

# Using built-in sum (faster)
result_sum = sum(numbers)

# Both give the same result, but sum() is optimized in C
print(result_reduce == result_sum)   # True
\`\`\`

> [!NOTE]
> Built-in functions like \`sum()\`, \`max()\`, \`min()\`, \`any()\`, and \`all()\` are implemented in C and are faster than equivalent \`reduce()\` calls. Use them when available.

## Debugging Pipelines

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# To debug a pipeline, break it into steps with intermediate variables
step1 = list(filter(lambda x: x % 2 == 0, numbers))
print(f"After filter: {step1}")

step2 = list(map(lambda x: x ** 2, step1))
print(f"After map: {step2}")

step3 = reduce(lambda acc, x: acc + x, step2, 0)
print(f"After reduce: {step3}")

# Or use a helper to peek at intermediate values
def debug_print(label, iterable):
    items = list(iterable)
    print(f"{label}: {items}")
    return items

result = reduce(
    lambda acc, x: acc + x,
    debug_print("After map",
        map(lambda x: x ** 2,
            debug_print("After filter",
                filter(lambda x: x % 2 == 0, numbers))),
    ),
    0
)
\`\`\`

> [!WARNING]
> Deeply nested pipelines can become hard to read. If you find yourself nesting more than 2-3 operations, consider breaking the pipeline into named steps or using comprehensions instead. Readability counts!`,
  objectives: [
    "Combine lambda with map(), filter(), and reduce() in data pipelines.",
    "Build filter → map → reduce pipelines for data processing.",
    "Compare pipeline approaches with comprehensions.",
    "Apply functional patterns to real-world data processing tasks."
  ],
  difficulty: "advanced",
  xpReward: 70,
};
