export const listMethodsSearchLesson = {
  title: "List Methods - Search & Count",
  slug: "list-methods-search",
  content: `# List Methods - Search & Count

Two simple but very useful methods: \`index()\` finds where an item is, and \`count()\` counts how many times it appears.

## The Theory — Building the Logic

\`index()\` and \`count()\` both work by scanning the list from left to right until they meet a match, which is why they report the first occurrence and why they slow down as the list grows. \`index()\` is an inquiry that raises an error when nothing matches, while \`count()\` returns \`0\`, reflecting their different design intent. Because searching is linear, these methods are simple but not efficient for very large lists. A common pitfall is calling \`index()\` without first checking membership with \`in\`, which crashes the program on a missing value.

## index() - Find the Position of an Item

\`index(value)\` returns the index of the **first occurrence** of the value.

\`\`\`python
fruits = ["apple", "banana", "cherry", "banana", "mango"]

print(fruits.index("cherry"))   # Output: 2
print(fruits.index("banana"))   # Output: 1  (first occurrence only)
print(fruits.index("apple"))    # Output: 0
\`\`\`

### ValueError if Not Found

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print(fruits.index("mango"))   # ValueError: 'mango' is not in list
\`\`\`

Safe usage:
\`\`\`python
fruits = ["apple", "banana", "cherry"]
item = "mango"

if item in fruits:
    pos = fruits.index(item)
    print(f"Found '{item}' at index {pos}")
else:
    print(f"'{item}' not found")
# Output: 'mango' not found
\`\`\`

### index() with Start and End

\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5]

print(numbers.index(2))         # Output: 1  (first 2)
print(numbers.index(2, 2))      # Output: 3  (first 2 at index 2 or later)
print(numbers.index(2, 4))      # Output: 5  (first 2 at index 4 or later)
\`\`\`

### Finding All Occurrences

\`index()\` only finds the first. To find all positions:

\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5]

all_positions = []
start = 0
while True:
    try:
        pos = numbers.index(2, start)
        all_positions.append(pos)
        start = pos + 1
    except ValueError:
        break

print(all_positions)   # Output: [1, 3, 5]
\`\`\`

Or with list comprehension:
\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5]
positions = [i for i, x in enumerate(numbers) if x == 2]
print(positions)   # Output: [1, 3, 5]
\`\`\`

## count() - Count Occurrences of a Value

\`count(value)\` returns how many times the value appears in the list.

\`\`\`python
numbers = [1, 2, 3, 2, 4, 2, 5, 2]

print(numbers.count(2))    # Output: 4
print(numbers.count(1))    # Output: 1
print(numbers.count(99))   # Output: 0  (not found - no error!)
\`\`\`

\`\`\`python
fruits = ["apple", "banana", "cherry", "banana", "apple", "banana"]

print(fruits.count("banana"))   # Output: 3
print(fruits.count("apple"))    # Output: 2
print(fruits.count("mango"))    # Output: 0
\`\`\`

### Counting Unique Values

\`\`\`python
votes = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]

candidates = set(votes)   # Unique candidates
for candidate in sorted(candidates):
    print(f"{candidate}: {votes.count(candidate)} votes")
\`\`\`

Output:
\`\`\`
Alice: 3 votes
Bob: 2 votes
Charlie: 1 votes
\`\`\`

## Practical Example: Grade Analysis

\`\`\`python
grades = ["A", "B", "A", "C", "B", "A", "D", "B", "A", "C", "F", "B"]

print("=== Grade Distribution ===")
for grade in ["A", "B", "C", "D", "F"]:
    count = grades.count(grade)
    bar = "#" * count
    print(f"  {grade}: {bar} ({count})")

print(f"\\nTotal students  : {len(grades)}")
print(f"Students with A : {grades.count('A')}")

# Find where the first D or F appears
for bad_grade in ["D", "F"]:
    if bad_grade in grades:
        pos = grades.index(bad_grade)
        print(f"First '{bad_grade}' at position: {pos}")
\`\`\`

Output:
\`\`\`
=== Grade Distribution ===
  A: #### (4)
  B: #### (4)
  C: ## (2)
  D: # (1)
  F: # (1)

Total students  : 12
Students with A : 4
First 'D' at position: 6
\`\`\`

> [!TIP]
> Always use \`in\` to check membership before calling \`index()\`, since \`index()\` raises a \`ValueError\` when the item is not found. \`count()\` is safe - it returns \`0\` for items not in the list.`,
  objectives: [
    "Use index() to find the position of the first occurrence of a value.",
    "Handle the ValueError when index() cannot find the value.",
    "Use index() with start and end to search a specific range.",
    "Use count() to count how many times a value appears.",
    "Find all positions of a value using a loop or list comprehension."
  ],
  difficulty: "beginner",
  xpReward: 50,
};