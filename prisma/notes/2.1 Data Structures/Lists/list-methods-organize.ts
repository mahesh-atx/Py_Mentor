export const listMethodsOrganizeLesson = {
  title: "List Methods - Organizing & Copying",
  slug: "list-methods-organize",
  content: `# List Methods - Organizing & Copying

These methods help you sort, reverse, and copy lists.

## The Theory — Building the Logic

\`sort()\` and \`reverse()\` mutate the list in place and return \`None\`, because Python's design favors methods that change state quietly over ones that build new values. \`sorted()\` instead returns a fresh list and preserves the original, a distinction that mirrors "change versus copy" thinking. \`copy()\` builds a new outer list, but its inner elements are still the same objects — a shallow copy — so nested lists remain shared between the two. The biggest pitfall is writing \`my_list = my_list.sort()\`, which throws the list away and leaves you holding \`None\`.

## sort() - Sort a List In-Place

\`sort()\` arranges items in ascending order by default. It modifies the original list.

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)   # Output: [1, 1, 2, 3, 4, 5, 6, 9]
\`\`\`

\`\`\`python
fruits = ["cherry", "apple", "mango", "banana"]
fruits.sort()
print(fruits)   # Output: ['apple', 'banana', 'cherry', 'mango']
\`\`\`

### sort(reverse=True) - Sort Descending

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort(reverse=True)
print(numbers)   # Output: [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

### sort(key=...) - Sort by a Custom Key

\`\`\`python
# Sort strings by their length
words = ["banana", "fig", "apple", "kiwi", "cherry"]
words.sort(key=len)
print(words)   # Output: ['fig', 'kiwi', 'apple', 'banana', 'cherry']

# Sort case-insensitively
names = ["Charlie", "alice", "Bob", "diana"]
names.sort(key=str.lower)
print(names)   # Output: ['alice', 'Bob', 'Charlie', 'diana']
\`\`\`

\`\`\`python
# Sort list of tuples by second element (score)
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78), ("Diana", 95)]
students.sort(key=lambda x: x[1], reverse=True)
print(students)
# Output: [('Diana', 95), ('Bob', 92), ('Alice', 85), ('Charlie', 78)]
\`\`\`

### sort() Returns None

\`\`\`python
numbers = [3, 1, 2]
result = numbers.sort()   # sort() returns None!
print(result)    # Output: None
print(numbers)   # Output: [1, 2, 3]  (the list itself is sorted)

# Common mistake:
numbers = [3, 1, 2]
numbers = numbers.sort()   # WRONG - numbers becomes None!
print(numbers)   # Output: None
\`\`\`

## sorted() - Sort Without Modifying Original

\`sorted()\` returns a **new sorted list** and leaves the original unchanged:

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

sorted_nums = sorted(numbers)
print(sorted_nums)   # Output: [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)       # Output: [3, 1, 4, 1, 5, 9, 2, 6]  (unchanged!)

# sorted() also accepts reverse and key
desc = sorted(numbers, reverse=True)
print(desc)   # Output: [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

### sort() vs sorted()

\`\`\`
sort()         - Modifies the original, returns None
sorted()       - Returns a new list, original unchanged
\`\`\`

\`\`\`python
# Use sort() when you want to change the original
prices = [9.99, 4.50, 14.99, 2.99]
prices.sort()    # Now prices itself is sorted

# Use sorted() when you need both versions
original = [3, 1, 4, 1, 5]
ascending = sorted(original)
descending = sorted(original, reverse=True)
# original is still [3, 1, 4, 1, 5]
\`\`\`

## reverse() - Reverse a List In-Place

\`reverse()\` reverses the order of items in the list directly.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)   # Output: [5, 4, 3, 2, 1]
\`\`\`

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.reverse()
print(fruits)   # Output: ['cherry', 'banana', 'apple']
\`\`\`

### reverse() vs [::-1]

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# reverse() - modifies original in-place, returns None
numbers.reverse()
print(numbers)   # Output: [5, 4, 3, 2, 1]

# [::-1] - creates a new reversed list, original unchanged
numbers = [1, 2, 3, 4, 5]
reversed_copy = numbers[::-1]
print(reversed_copy)   # Output: [5, 4, 3, 2, 1]
print(numbers)         # Output: [1, 2, 3, 4, 5]  (unchanged)
\`\`\`

## copy() - Create a Shallow Copy

\`copy()\` creates a **new list** with the same items. Changes to the copy do NOT affect the original.

### Why You Need copy()

\`\`\`python
# PROBLEM: Direct assignment - both point to the SAME list
original = [1, 2, 3, 4, 5]
alias = original      # alias IS the same list

alias.append(6)
print(original)   # Output: [1, 2, 3, 4, 5, 6]  (CHANGED! Unexpected!)
print(alias)      # Output: [1, 2, 3, 4, 5, 6]
\`\`\`

\`\`\`python
# SOLUTION: Use copy() to get an independent copy
original = [1, 2, 3, 4, 5]
copy_list = original.copy()   # Independent copy

copy_list.append(6)
print(original)    # Output: [1, 2, 3, 4, 5]   (unchanged!)
print(copy_list)   # Output: [1, 2, 3, 4, 5, 6]
\`\`\`

### Other Ways to Copy a List

\`\`\`python
original = [1, 2, 3]

copy1 = original.copy()    # Method 1: .copy()
copy2 = original[:]        # Method 2: slicing
copy3 = list(original)     # Method 3: list() constructor

print(copy1)   # Output: [1, 2, 3]
print(copy2)   # Output: [1, 2, 3]
print(copy3)   # Output: [1, 2, 3]

# All are independent copies
copy1.append(4)
print(original)   # Output: [1, 2, 3]  (still unchanged)
\`\`\`

### Shallow Copy Warning

\`copy()\` is a **shallow copy** - nested lists inside are still shared:

\`\`\`python
original = [[1, 2], [3, 4], [5, 6]]
shallow = original.copy()

shallow[0].append(99)    # Modifying a nested list
print(original)   # Output: [[1, 2, 99], [3, 4], [5, 6]]  (AFFECTED!)

# For nested lists, use deepcopy
import copy
deep = copy.deepcopy(original)
deep[1].append(99)
print(original)   # Output: [[1, 2, 99], [3, 4], [5, 6]]  (NOT affected)
\`\`\`

## Practical Example: Leaderboard

\`\`\`python
scores = [
    ("Alice", 1500),
    ("Bob", 2300),
    ("Charlie", 1800),
    ("Diana", 2800),
    ("Eve", 900),
]

# Keep original order
original_order = scores.copy()

# Sort by score descending
scores.sort(key=lambda x: x[1], reverse=True)

print("=== LEADERBOARD ===")
for rank, (name, score) in enumerate(scores, 1):
    print(f"  #{rank}  {name:<10}  {score:,} pts")

print(f"\\nOriginal order preserved: {[s[0] for s in original_order]}")
\`\`\`

Output:
\`\`\`
=== LEADERBOARD ===
  #1  Diana       2,800 pts
  #2  Bob         2,300 pts
  #3  Charlie     1,800 pts
  #4  Alice       1,500 pts
  #5  Eve         900 pts

Original order preserved: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
\`\`\`

> [!TIP]
> Remember: \`sort()\` and \`reverse()\` modify the list in-place and return \`None\`. Never do \`my_list = my_list.sort()\` - you will lose your list! Use \`sorted()\` when you need to keep the original. Always use \`copy()\` instead of direct assignment when you need an independent copy.`,
  objectives: [
    "Use sort() to sort a list in-place in ascending or descending order.",
    "Use sort(key=...) to sort by a custom criterion.",
    "Use sorted() to get a sorted copy without modifying the original.",
    "Use reverse() to reverse a list in-place.",
    "Use copy() to create an independent copy of a list."
  ],
  difficulty: "beginner",
  xpReward: 60,
};