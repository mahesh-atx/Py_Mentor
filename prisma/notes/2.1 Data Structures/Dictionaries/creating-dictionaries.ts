export const creatingDictionariesLesson = {
  title: "Creating Dictionaries",
  slug: "creating-dictionaries",
  content: `# Creating Dictionaries

## The Theory — Building the Logic

A dictionary is Python's implementation of a **hash map** — the mental model is a set of labelled drawers, where each label (key) points directly to one drawer (value). Instead of remembering *positions* like a list, you remember *meaningful names*, which is why dictionaries shine when data has identity rather than order. Under the hood Python runs each key through a **hash function** to compute where its value lives, which is why lookups feel instant no matter how big the dictionary grows — and also why keys must be **immutable**: if a key could change after insertion, its hash would no longer point to the right place. This same hashing is the reason keys must be unique, since two identical keys would compute to the same slot and the later one simply overwrites the earlier. A common logical pitfall is assuming order or position matters when creating a dict; think in terms of "which label finds this value?" rather than "which slot holds this value?".

## What is a Dictionary?

A dictionary is an **unordered collection of key-value pairs**. Instead of accessing items by a numeric index like lists, you access them by a **key** - which can be any immutable value like a string, number, or tuple.

Think of it like a real dictionary: you look up a word (key) to find its definition (value).

\`\`\`python
# List - access by position
student_list = ["Alice", 20, "Computer Science"]

# Dictionary - access by meaningful key
student_dict = {
    "name": "Alice",
    "age": 20,
    "major": "Computer Science"
}
\`\`\`

## Key Properties

- **Key-value pairs** - every item has a key and a value
- **Keys must be unique** - duplicate keys are not allowed (last one wins)
- **Keys must be immutable** - strings, numbers, tuples work; lists do not
- **Values can be anything** - any Python object
- **Ordered** - Python 3.7+ maintains insertion order

## Creating Dictionaries

### Using Curly Braces (Most Common)

\`\`\`python
# String keys
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}

# Integer keys
squares = {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
print(squares)
# Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Mixed key types
mixed_keys = {
    "name": "Alice",
    1: "one",
    (1, 2): "a tuple key"
}
\`\`\`

### Empty Dictionary

\`\`\`python
empty1 = {}
empty2 = dict()

print(type(empty1))   # Output: <class 'dict'>
print(len(empty1))    # Output: 0

# {} is a dict, NOT a set (set() for empty set)
print(type({}))       # Output: <class 'dict'>
print(type(set()))    # Output: <class 'set'>
\`\`\`

### Using dict() Constructor

\`\`\`python
# From keyword arguments
person = dict(name="Alice", age=25, city="New York")
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}

# From a list of tuples
pairs = [("name", "Alice"), ("age", 25), ("city", "New York")]
person = dict(pairs)
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}

# From two lists using zip
keys   = ["name", "age", "city"]
values = ["Alice", 25, "New York"]
person = dict(zip(keys, values))
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

### Duplicate Keys - Last One Wins

\`\`\`python
# Duplicate keys - only the last value is kept
data = {"name": "Alice", "age": 25, "name": "Bob"}
print(data)   # Output: {'name': 'Bob', 'age': 25}
# 'Alice' was overwritten by 'Bob'
\`\`\`

### dict.fromkeys() - Create from a Sequence of Keys

\`\`\`python
# Create a dict with the same default value for all keys
keys = ["name", "age", "city", "email"]
default_value = None

profile = dict.fromkeys(keys, default_value)
print(profile)
# Output: {'name': None, 'age': None, 'city': None, 'email': None}

# Default value is None if not specified
empty_profile = dict.fromkeys(keys)
print(empty_profile)
# Output: {'name': None, 'age': None, 'city': None, 'email': None}

# Initialize with a default
scores = dict.fromkeys(["Alice", "Bob", "Charlie"], 0)
print(scores)
# Output: {'Alice': 0, 'Bob': 0, 'Charlie': 0}
\`\`\`

> [!IMPORTANT]
> When using \`fromkeys()\` with a mutable default like a list, all keys share the SAME list object:
> \`\`\`python
> # PROBLEM - all share the same list
> bad = dict.fromkeys(["a", "b", "c"], [])
> bad["a"].append(1)
> print(bad)   # {'a': [1], 'b': [1], 'c': [1]}  All changed!
>
> # SOLUTION - use dict comprehension instead
> good = {k: [] for k in ["a", "b", "c"]}
> good["a"].append(1)
> print(good)  # {'a': [1], 'b': [], 'c': []}  Only 'a' changed!
> \`\`\`

## Dictionary Properties

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

print(len(person))              # Output: 3  (number of key-value pairs)
print(type(person))             # Output: <class 'dict'>
print("name" in person)         # Output: True  (checks KEYS)
print("Alice" in person)        # Output: False (not a key!)
print("email" not in person)    # Output: True
\`\`\`

## Practical Example: Building Dictionaries Dynamically

\`\`\`python
# Build a word frequency counter
text = "the quick brown fox jumps over the lazy dog the fox"
words = text.split()

word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print(word_count)
# Output: {'the': 3, 'quick': 1, 'brown': 1, 'fox': 2, ...}

# Sort by frequency
sorted_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
for word, count in sorted_words[:3]:
    print(f"'{word}': {count} times")
\`\`\`

Output:
\`\`\`
'the': 3 times
'fox': 2 times
'quick': 1 times
\`\`\`

> [!TIP]
> Use curly braces \`{}\` with key-value pairs for most dictionary creation. Use \`dict()\` with keyword arguments for simple string-keyed dicts. Use \`dict(zip(keys, values))\` to build from two separate lists. Always use \`dict.fromkeys()\` only with immutable default values.`,
  objectives: [
    "Create dictionaries using curly braces and the dict() constructor.",
    "Understand that dictionary keys must be unique and immutable.",
    "Use dict.fromkeys() to initialize a dictionary with default values.",
    "Use dict(zip(keys, values)) to create a dictionary from two lists.",
    "Understand that {} creates a dict, not a set."
  ],
  difficulty: "beginner",
  xpReward: 55,
};