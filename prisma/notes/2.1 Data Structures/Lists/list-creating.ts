export const listCreatingLesson = {
  title: "Creating Lists",
  slug: "list-creating",
  content: `# Creating Lists

Under the hood, a list is a mutable, ordered container of object references, so it can hold mixed types and edits happen in place. The pitfall is treating it like an immutable string and expecting an element change to leave the original untouched.

## What is a List?

A list is one of the most important data structures in Python. It is an **ordered, mutable collection** that can hold multiple items of any type - all in a single variable.

Think of a list like a shopping list: it has items in a specific order, you can add or remove items, and each item has a position number.

\`\`\`python
# Without a list - tedious
student1 = "Alice"
student2 = "Bob"
student3 = "Charlie"

# With a list - clean and manageable
students = ["Alice", "Bob", "Charlie"]
\`\`\`

## Creating a List

Lists are created using **square brackets** \`[]\` with items separated by commas.

### Empty List

\`\`\`python
empty_list = []
also_empty = list()

print(empty_list)       # Output: []
print(type(empty_list)) # Output: <class 'list'>
print(len(empty_list))  # Output: 0
\`\`\`

### List of Strings

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]
print(fruits)   # Output: ['apple', 'banana', 'cherry', 'mango']
\`\`\`

### List of Numbers

\`\`\`python
scores = [85, 92, 78, 95, 88]
print(scores)   # Output: [85, 92, 78, 95, 88]

prices = [9.99, 24.50, 3.75, 14.99]
print(prices)   # Output: [9.99, 24.5, 3.75, 14.99]
\`\`\`

### Mixed Type List

Python lists can hold items of different types at the same time:

\`\`\`python
mixed = ["Alice", 25, 5.11, True, None]
print(mixed)   # Output: ['Alice', 25, 5.11, True, None]
\`\`\`

### List of Lists (Nested)

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix)   # Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
\`\`\`

## Creating Lists from Other Types

### Using list() Constructor

\`\`\`python
# From a string - each character becomes an item
chars = list("Python")
print(chars)   # Output: ['P', 'y', 't', 'h', 'o', 'n']

# From a range
numbers = list(range(1, 6))
print(numbers)   # Output: [1, 2, 3, 4, 5]

# From a tuple
coords = list((10, 20, 30))
print(coords)   # Output: [10, 20, 30]
\`\`\`

### Using range() to Create Number Lists

\`\`\`python
# First 10 natural numbers
naturals = list(range(1, 11))
print(naturals)   # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Even numbers
evens = list(range(2, 21, 2))
print(evens)   # Output: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Countdown
countdown = list(range(10, 0, -1))
print(countdown)   # Output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
\`\`\`

## List Properties

### len() - Number of Items

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(len(fruits))   # Output: 3

empty = []
print(len(empty))    # Output: 0
\`\`\`

### type() - Confirm it is a List

\`\`\`python
fruits = ["apple", "banana"]
print(type(fruits))   # Output: <class 'list'>
\`\`\`

### Lists are Ordered

Items keep the order you put them in:

\`\`\`python
list1 = [1, 2, 3]
list2 = [3, 2, 1]

print(list1 == list2)   # Output: False  (order matters!)
print(list1 == [1, 2, 3])  # Output: True
\`\`\`

### Lists Allow Duplicates

\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4]
print(numbers)       # Output: [1, 2, 2, 3, 3, 3, 4]
print(len(numbers))  # Output: 7
\`\`\`

### Lists are Mutable

Unlike strings, you CAN change items in a list:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits[0] = "avocado"   # Change the first item
print(fruits)   # Output: ['avocado', 'banana', 'cherry']
\`\`\`

## Membership Check with in

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)    # Output: True
print("mango" in fruits)    # Output: False
print("mango" not in fruits) # Output: True
\`\`\`

## Useful Built-in Functions with Lists

\`\`\`python
numbers = [5, 2, 8, 1, 9, 3, 7]

print(len(numbers))    # Output: 7   (count of items)
print(max(numbers))    # Output: 9   (maximum value)
print(min(numbers))    # Output: 1   (minimum value)
print(sum(numbers))    # Output: 35  (sum of all items)
print(sorted(numbers)) # Output: [1, 2, 3, 5, 7, 8, 9] (sorted copy)
\`\`\`

## Practical Example: Student Gradebook

\`\`\`python
students = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
scores   = [88, 72, 95, 61, 84]

print(f"Class size  : {len(students)}")
print(f"Highest     : {max(scores)}")
print(f"Lowest      : {min(scores)}")
print(f"Average     : {sum(scores) / len(scores):.1f}")
print(f"Students    : {students}")
\`\`\`

Output:
\`\`\`
Class size  : 5
Highest     : 95
Lowest      : 61
Average     : 80.0
Students    : ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
\`\`\`

> [!TIP]
> Lists are one of the most used data structures in Python. When you need to store multiple related values together, a list is almost always the right choice. Start with an empty list \`[]\` and add items as needed, or start with all items defined.`,
  objectives: [
    "Create lists using square brackets [] and the list() constructor.",
    "Understand that lists are ordered, mutable, and allow duplicates.",
    "Create lists from strings, ranges, and tuples using list().",
    "Use len(), max(), min(), and sum() with lists.",
    "Check membership using the in operator."
  ],
  difficulty: "beginner",
  xpReward: 50,
};