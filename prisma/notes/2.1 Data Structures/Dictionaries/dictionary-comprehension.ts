export const dictionaryComprehensionLesson = {
  title: "Dictionary Comprehension",
  slug: "dictionary-comprehension",
  content: `# Dictionary Comprehension

Dictionary comprehension is a concise way to create dictionaries, similar to list comprehension but using \`{}\` and producing key-value pairs.

## The Theory — Building the Logic

A comprehension is a shift in thinking from *how* to build a dictionary to *what* the dictionary should be — you describe the rule that maps each source item to a key-value pair, and Python performs the loop for you. The mental model is a tiny pipeline: take an iterable, optionally **filter** items with an \`if\`, then **transform** each survivor into a \`key: value\` pair. This declarative style is not just shorter; it signals intent — "this is a transformation" — making the logic easier to verify at a glance than an equivalent multi-line loop. Because keys must stay unique, the key pitfall is a **silent collision**: if your key expression produces the same key for two different items (for example when inverting a dictionary whose values repeat), later pairs quietly overwrite earlier ones and entries seem to "vanish" — always ask whether your key expression is guaranteed to be unique.

## Basic Syntax

\`\`\`python
new_dict = {key_expression: value_expression for item in iterable}
new_dict = {key_expression: value_expression for item in iterable if condition}
\`\`\`

## Basic Examples

\`\`\`python
# Squares: number -> its square
squares = {x: x ** 2 for x in range(1, 6)}
print(squares)
# Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# String lengths
words = ["apple", "banana", "cherry", "kiwi"]
lengths = {word: len(word) for word in words}
print(lengths)
# Output: {'apple': 5, 'banana': 6, 'cherry': 6, 'kiwi': 4}

# Uppercase mapping
names = ["alice", "bob", "charlie"]
upper_map = {name: name.upper() for name in names}
print(upper_map)
# Output: {'alice': 'ALICE', 'bob': 'BOB', 'charlie': 'CHARLIE'}
\`\`\`

## From Two Lists Using zip()

\`\`\`python
keys   = ["name", "age", "city"]
values = ["Alice", 25, "New York"]

person = {k: v for k, v in zip(keys, values)}
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

## With a Condition (Filtering)

\`\`\`python
# Only even numbers and their squares
even_squares = {x: x ** 2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)
# Output: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Filter by value
scores = {"Alice": 88, "Bob": 45, "Charlie": 92, "Diana": 58, "Eve": 76}
passing = {name: score for name, score in scores.items() if score >= 60}
print(passing)
# Output: {'Alice': 88, 'Charlie': 92, 'Eve': 76}

# Filter keys by length
data = {"cat": 1, "elephant": 2, "dog": 3, "hippopotamus": 4, "bee": 5}
long_keys = {k: v for k, v in data.items() if len(k) > 4}
print(long_keys)
# Output: {'elephant': 2, 'hippopotamus': 4}
\`\`\`

## Transforming an Existing Dictionary

\`\`\`python
prices = {"apple": 1.20, "banana": 0.50, "cherry": 3.00}

# Apply a 10% discount
discounted = {item: round(price * 0.9, 2) for item, price in prices.items()}
print(discounted)
# Output: {'apple': 1.08, 'banana': 0.45, 'cherry': 2.7}

# Swap keys and values
inverted = {v: k for k, v in prices.items()}
print(inverted)
# Output: {1.2: 'apple', 0.5: 'banana', 3.0: 'cherry'}

# Normalize keys to lowercase
raw = {"Name": "Alice", "AGE": 25, "City": "New York"}
normalized = {k.lower(): v for k, v in raw.items()}
print(normalized)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

## if-else in Dictionary Comprehension

\`\`\`python
scores = {"Alice": 88, "Bob": 45, "Charlie": 92, "Diana": 58}

# Add pass/fail label to each score
results = {
    name: f"{score} (Pass)" if score >= 60 else f"{score} (Fail)"
    for name, score in scores.items()
}
print(results)
# Output: {'Alice': '88 (Pass)', 'Bob': '45 (Fail)', 'Charlie': '92 (Pass)', 'Diana': '58 (Fail)'}

# Convert scores to letter grades
grades = {
    name: "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
    for name, score in scores.items()
}
print(grades)
# Output: {'Alice': 'B', 'Bob': 'F', 'Charlie': 'A', 'Diana': 'F'}
\`\`\`

## Nested Dictionary Comprehension

\`\`\`python
# Multiplication table as nested dict
table = {i: {j: i * j for j in range(1, 4)} for i in range(1, 4)}
print(table)
# Output: {1: {1: 1, 2: 2, 3: 3}, 2: {1: 2, 2: 4, 3: 6}, 3: {1: 3, 2: 6, 3: 9}}

# Pretty print
for row, cols in table.items():
    for col, val in cols.items():
        print(f"{row} x {col} = {val}", end="   ")
    print()
\`\`\`

## Practical Examples

### Word Frequency Counter

\`\`\`python
text = "the quick brown fox jumps over the lazy dog the fox"
words = text.split()

word_freq = {word: words.count(word) for word in set(words)}
print(word_freq)
# Output: {'dog': 1, 'fox': 2, 'the': 3, ...}

# Sort by frequency
sorted_freq = dict(sorted(word_freq.items(), key=lambda x: x[1], reverse=True))
print(sorted_freq)
\`\`\`

### CSV to Dictionary

\`\`\`python
csv_data = [
    "Alice,25,New York,88",
    "Bob,30,London,92",
    "Charlie,22,Paris,75"
]

students = {
    row.split(",")[0]: {
        "age": int(row.split(",")[1]),
        "city": row.split(",")[2],
        "score": int(row.split(",")[3])
    }
    for row in csv_data
}

print(students["Alice"])
# Output: {'age': 25, 'city': 'New York', 'score': 88}
\`\`\`

### Celsius to Fahrenheit Lookup Table

\`\`\`python
celsius_to_fahrenheit = {
    c: round((c * 9/5) + 32, 1)
    for c in range(-20, 41, 5)
}

for c, f in celsius_to_fahrenheit.items():
    print(f"{c:>4}°C = {f:>6}°F")
\`\`\`

Output (excerpt):
\`\`\`
 -20°C =  -4.0°F
 -15°C =   5.0°F
   0°C =  32.0°F
  20°C =  68.0°F
  40°C = 104.0°F
\`\`\`

### Inventory Analysis

\`\`\`python
inventory = {
    "laptop":  {"price": 999.99, "stock": 15},
    "mouse":   {"price":  29.99, "stock": 0},
    "keyboard":{"price":  79.99, "stock": 8},
    "monitor": {"price": 349.99, "stock": 0},
}

# Items in stock
in_stock = {name: data for name, data in inventory.items() if data["stock"] > 0}
print("In stock:", list(in_stock.keys()))

# Total value per item
values = {name: round(data["price"] * data["stock"], 2) for name, data in inventory.items()}
print("Values:", values)

# Items over a price threshold
expensive = {name: data["price"] for name, data in inventory.items() if data["price"] > 100}
print("Expensive:", expensive)
\`\`\`

Output:
\`\`\`
In stock: ['laptop', 'keyboard']
Values: {'laptop': 14999.85, 'mouse': 0.0, 'keyboard': 639.92, 'monitor': 0.0}
Expensive: {'laptop': 999.99, 'monitor': 349.99}
\`\`\`

> [!TIP]
> Dictionary comprehension is most useful for transforming or filtering an existing dictionary, or building a dictionary from two parallel sequences. Keep comprehensions simple - if the logic is complex, use a regular for loop for readability.`,
  objectives: [
    "Write basic dictionary comprehensions to transform data.",
    "Use conditions to filter key-value pairs in a comprehension.",
    "Use if-else inside a comprehension for value transformation.",
    "Build dictionaries from two lists using zip().",
    "Apply dictionary comprehension to real-world data processing."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};