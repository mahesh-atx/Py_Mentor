export const filterFunctionLesson = {
  title: "filter() Function",
  slug: "filter-function",
  content: `# filter() Function

The \`filter()\` function selects items from an iterable for which the given function returns \`True\`. It's the functional-programming way to extract elements that satisfy a condition without writing an explicit loop.

## Basic Syntax

\`\`\`python
filter(function, iterable)
\`\`\`

- \`function\` — a predicate (returns True/False) applied to each item; can be \`None\`
- \`iterable\` — the sequence to filter
- Returns a **filter object** (iterator) — wrap in \`list()\`, \`tuple()\`, etc. to see results

## filter() with a Regular Function

\`\`\`python
def is_even(n):
    return n % 2 == 0

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(is_even, numbers))
print(evens)   # [2, 4, 6, 8, 10]
\`\`\`

## filter() with a Lambda

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only odd numbers
odds = list(filter(lambda x: x % 2 != 0, numbers))
print(odds)   # [1, 3, 5, 7, 9]

# Keep numbers greater than 5
big = list(filter(lambda x: x > 5, numbers))
print(big)   # [6, 7, 8, 9, 10]
\`\`\`

## filter() with None as the Function

When you pass \`None\` as the function, \`filter()\` keeps all **truthy** values and removes falsy ones (\`0\`, \`""\`, \`[]\`, \`None\`, \`False\`, etc.).

\`\`\`python
mixed = [0, 1, "", "hello", [], [1, 2], None, True, False, "", "world"]
truthy = list(filter(None, mixed))
print(truthy)   # [1, 'hello', [1, 2], True, 'world']
\`\`\`

## Practical Examples

\`\`\`python
# Filter strings by length
words = ["apple", "pie", "banana", "kiwi", "strawberry", "fig"]
long_words = list(filter(lambda w: len(w) > 4, words))
print(long_words)   # ['apple', 'banana', 'strawberry']

# Filter with string methods
names = ["Alice", "bob", "Charlie", "dave", "Eve"]
uppercase_names = list(filter(lambda s: s[0].isupper(), names))
print(uppercase_names)   # ['Alice', 'Charlie', 'Eve']

# Filter dictionaries
products = [
    {"name": "Laptop", "price": 999, "in_stock": True},
    {"name": "Mouse", "price": 25, "in_stock": False},
    {"name": "Keyboard", "price": 75, "in_stock": True},
    {"name": "Monitor", "price": 300, "in_stock": False},
]

in_stock = list(filter(lambda p: p["in_stock"], products))
print([p["name"] for p in in_stock])   # ['Laptop', 'Keyboard']

affordable = list(filter(lambda p: p["price"] < 100, products))
print([p["name"] for p in affordable])   # ['Mouse', 'Keyboard']

# Filter None values from a list
data = [1, None, 3, None, 5, None, 7]
clean = list(filter(None, data))
print(clean)   # [1, 3, 5, 7]
\`\`\`

## filter() vs List Comprehension

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Using filter
evens_filter = list(filter(lambda x: x % 2 == 0, numbers))

# Using list comprehension (often preferred)
evens_comp = [x for x in numbers if x % 2 == 0]

print(evens_filter)   # [2, 4, 6, 8, 10]
print(evens_comp)     # [2, 4, 6, 8, 10]
\`\`\`

> [!NOTE]
> List comprehensions with an \`if\` clause are generally more readable for simple filtering. Use \`filter()\` when you already have a predicate function defined, or when chaining functional operations.

## Combining filter() and map()

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get squares of even numbers only
# First filter evens, then square them
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))
print(result)   # [4, 16, 36, 64, 100]

# Equivalent with list comprehension
result = [x ** 2 for x in numbers if x % 2 == 0]
\`\`\`

## Filtering with Multiple Conditions

\`\`\`python
numbers = list(range(1, 21))

# Numbers divisible by both 2 AND 3 (i.e., divisible by 6)
div_by_6 = list(filter(lambda x: x % 2 == 0 and x % 3 == 0, numbers))
print(div_by_6)   # [6, 12, 18]

# Numbers divisible by 2 OR 5
div_by_2_or_5 = list(filter(lambda x: x % 2 == 0 or x % 5 == 0, numbers))
print(div_by_2_or_5)   # [2, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20]
\`\`\`

> [!TIP]
> \`filter()\` returns a lazy iterator, making it memory-efficient for large datasets. The filtering only happens as you consume the iterator.`,
  objectives: [
    "Understand the purpose and syntax of filter().",
    "Apply filter() with regular functions, lambdas, and None.",
    "Combine filter() with map() for data pipelines.",
    "Choose appropriately between filter() and list comprehensions."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
