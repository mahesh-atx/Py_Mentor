export const listMethodsAddLesson = {
  title: "List Methods - Adding Items",
  slug: "list-methods-add",
  content: `# List Methods - Adding Items

Python lists have built-in methods to add items. The three main methods are \`append()\`, \`extend()\`, and \`insert()\`.

## append() - Add One Item to the End

\`append()\` adds a **single item** to the **end** of the list. It modifies the original list directly (in-place).

\`\`\`python
fruits = ["apple", "banana"]

fruits.append("cherry")
print(fruits)   # Output: ['apple', 'banana', 'cherry']

fruits.append("mango")
print(fruits)   # Output: ['apple', 'banana', 'cherry', 'mango']
\`\`\`

\`\`\`python
# Building a list by appending in a loop
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

print(squares)   # Output: [1, 4, 9, 16, 25]
\`\`\`

\`\`\`python
# Collecting user input into a list
names = []
for i in range(3):
    name = input(f"Enter name {i+1}: ")
    names.append(name)

print("Names:", names)
\`\`\`

### append() Adds the Item as a Single Element

\`\`\`python
numbers = [1, 2, 3]

numbers.append([4, 5])   # Appends the LIST as one item
print(numbers)   # Output: [1, 2, 3, [4, 5]]
print(len(numbers))   # Output: 4  (the list counts as 1 item)
\`\`\`

## extend() - Add Multiple Items from an Iterable

\`extend()\` adds **all items** from another list (or any iterable) to the end of the list.

\`\`\`python
fruits = ["apple", "banana"]
more_fruits = ["cherry", "mango", "grape"]

fruits.extend(more_fruits)
print(fruits)
# Output: ['apple', 'banana', 'cherry', 'mango', 'grape']
\`\`\`

\`\`\`python
# Extend with different iterables
numbers = [1, 2, 3]

numbers.extend(range(4, 7))    # Extend with range
print(numbers)   # Output: [1, 2, 3, 4, 5, 6]

numbers.extend((7, 8, 9))      # Extend with tuple
print(numbers)   # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]

numbers.extend("abc")          # Extend with string (each char)
print(numbers)   # Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c']
\`\`\`

### append() vs extend() - Key Difference

\`\`\`python
list1 = [1, 2, 3]
list2 = [1, 2, 3]

list1.append([4, 5])   # Adds [4,5] as a single nested item
list2.extend([4, 5])   # Adds 4 and 5 as separate items

print(list1)   # Output: [1, 2, 3, [4, 5]]
print(list2)   # Output: [1, 2, 3, 4, 5]

print(len(list1))   # Output: 4
print(len(list2))   # Output: 5
\`\`\`

### Using + to Combine Lists (vs extend)

\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# + creates a NEW list (does not change originals)
combined = list1 + list2
print(combined)   # Output: [1, 2, 3, 4, 5, 6]
print(list1)      # Output: [1, 2, 3]  (unchanged)

# extend() modifies list1 IN PLACE
list1.extend(list2)
print(list1)      # Output: [1, 2, 3, 4, 5, 6]  (changed!)
\`\`\`

## insert() - Add an Item at a Specific Position

\`insert(index, item)\` inserts an item at the given index, pushing existing items to the right.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

fruits.insert(1, "avocado")   # Insert at index 1
print(fruits)
# Output: ['apple', 'avocado', 'banana', 'cherry']
\`\`\`

\`\`\`python
# Insert at beginning (index 0)
numbers = [2, 3, 4, 5]
numbers.insert(0, 1)
print(numbers)   # Output: [1, 2, 3, 4, 5]

# Insert at end (same as append when index >= length)
numbers.insert(len(numbers), 6)
print(numbers)   # Output: [1, 2, 3, 4, 5, 6]
\`\`\`

\`\`\`python
# Insert with large index - goes to end
fruits = ["apple", "banana"]
fruits.insert(100, "cherry")   # Index 100 - doesn't exist, goes to end
print(fruits)   # Output: ['apple', 'banana', 'cherry']

# Insert with negative index
fruits.insert(-1, "mango")   # Before the last item
print(fruits)   # Output: ['apple', 'banana', 'mango', 'cherry']
\`\`\`

## Comparison: append() vs extend() vs insert()

\`\`\`python
base = [1, 2, 3]

# append - ONE item at the end
a = base.copy()
a.append(4)
print(a)   # [1, 2, 3, 4]

# extend - MANY items at the end
b = base.copy()
b.extend([4, 5, 6])
print(b)   # [1, 2, 3, 4, 5, 6]

# insert - ONE item at SPECIFIC position
c = base.copy()
c.insert(1, 10)
print(c)   # [1, 10, 2, 3]
\`\`\`

## Practical Example: Task Manager

\`\`\`python
tasks = []

# Add tasks using append
tasks.append("Buy groceries")
tasks.append("Walk the dog")
tasks.append("Read a book")

print(f"Current tasks ({len(tasks)}):")
for i, task in enumerate(tasks, 1):
    print(f"  {i}. {task}")

# Insert an urgent task at the beginning
tasks.insert(0, "URGENT: Submit report")

print(f"\\nUpdated tasks ({len(tasks)}):")
for i, task in enumerate(tasks, 1):
    print(f"  {i}. {task}")

# Add multiple tasks at once
new_tasks = ["Exercise", "Call mom"]
tasks.extend(new_tasks)
print(f"\\nFinal task count: {len(tasks)}")
\`\`\`

Output:
\`\`\`
Current tasks (3):
  1. Buy groceries
  2. Walk the dog
  3. Read a book

Updated tasks (4):
  1. URGENT: Submit report
  2. Buy groceries
  3. Walk the dog
  4. Read a book

Final task count: 6
\`\`\`

> [!TIP]
> Use \`append()\` to add a single item to the end (most common). Use \`extend()\` to add multiple items from another list. Use \`insert()\` when you need to add an item at a specific position. All three modify the list in-place and return \`None\`.`,
  objectives: [
    "Use append() to add a single item to the end of a list.",
    "Use extend() to add all items from another iterable to a list.",
    "Use insert() to add an item at a specific index.",
    "Understand the key difference between append() and extend().",
    "Know that all three methods modify the list in-place and return None."
  ],
  difficulty: "beginner",
  xpReward: 55,
};