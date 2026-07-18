export const listIndexingSlicingLesson = {
  title: "List Indexing, Slicing & Negative Indexing",
  slug: "list-indexing-slicing",
  content: `# List Indexing, Slicing & Negative Indexing

Accessing items in a list works almost identically to strings - using index numbers and slicing. Since you learned these concepts with strings, they will feel very familiar here. Under the hood, a list index is just an offset from the start (negative indices count from the end), and slicing copies a range of references into a brand-new list with an exclusive \`stop\` index. The pitfall is expecting slice assignment to preserve length — it inserts or deletes items whenever the new sequence differs in size.

## Indexing

Every item in a list has a position called an **index**, starting at **0**.

\`\`\`
List  :  ["apple", "banana", "cherry", "mango", "grape"]
Index :      0        1         2         3        4
\`\`\`

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango", "grape"]

print(fruits[0])   # Output: apple   (first item)
print(fruits[1])   # Output: banana
print(fruits[2])   # Output: cherry
print(fruits[4])   # Output: grape   (last item)
\`\`\`

### IndexError - Out of Bounds

\`\`\`python
fruits = ["apple", "banana", "cherry"]   # Indices: 0, 1, 2

print(fruits[3])   # IndexError: list index out of range
\`\`\`

## Negative Indexing

Negative indices count from the **end** of the list:

\`\`\`
List      :  ["apple", "banana", "cherry", "mango", "grape"]
Neg Index :     -5       -4        -3        -2       -1
\`\`\`

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango", "grape"]

print(fruits[-1])   # Output: grape   (last item)
print(fruits[-2])   # Output: mango
print(fruits[-5])   # Output: apple   (first item)
\`\`\`

\`\`\`python
# Get last item without knowing length
scores = [85, 92, 78, 95, 88]
last_score = scores[-1]
print(last_score)   # Output: 88
\`\`\`

## Modifying Items by Index

Unlike strings, you CAN change list items using their index:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

fruits[0] = "avocado"   # Replace first item
print(fruits)   # Output: ['avocado', 'banana', 'cherry']

fruits[-1] = "grape"    # Replace last item
print(fruits)   # Output: ['avocado', 'banana', 'grape']
\`\`\`

## Slicing

Slicing extracts a portion of a list, returning a **new list**.

### Syntax

\`\`\`python
list[start : stop : step]
\`\`\`

- \`start\` - index to begin (inclusive, default 0)
- \`stop\`  - index to end (exclusive, default end)
- \`step\`  - how many to jump (default 1)

### Basic Slicing

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])    # Output: [2, 3, 4]
print(numbers[0:4])    # Output: [0, 1, 2, 3]
print(numbers[6:])     # Output: [6, 7, 8, 9]  (to end)
print(numbers[:3])     # Output: [0, 1, 2]     (from start)
print(numbers[:])      # Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] (copy)
\`\`\`

### Slicing with Step

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[::2])    # Output: [0, 2, 4, 6, 8]   (every other)
print(numbers[1::2])   # Output: [1, 3, 5, 7, 9]   (odd indices)
print(numbers[::3])    # Output: [0, 3, 6, 9]       (every 3rd)
print(numbers[::-1])   # Output: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reversed)
\`\`\`

### Slicing with Negative Indices

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango", "grape"]

print(fruits[-3:])     # Output: ['cherry', 'mango', 'grape'] (last 3)
print(fruits[:-2])     # Output: ['apple', 'banana', 'cherry'] (all but last 2)
print(fruits[-4:-1])   # Output: ['banana', 'cherry', 'mango']
\`\`\`

## Slicing Returns a New List

Slicing never changes the original list:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
portion = numbers[1:4]

print(portion)   # Output: [2, 3, 4]
print(numbers)   # Output: [1, 2, 3, 4, 5]  (unchanged)
\`\`\`

## Modifying a Slice

You CAN use slicing on the LEFT side of \`=\` to replace multiple items:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers[1:3] = [20, 30]   # Replace items at index 1 and 2
print(numbers)   # Output: [1, 20, 30, 4, 5]

# Replace with different number of items
numbers[1:3] = [100, 200, 300]
print(numbers)   # Output: [1, 100, 200, 300, 4, 5]
\`\`\`

## Practical Examples

### Get First and Last N Items

\`\`\`python
scores = [85, 92, 78, 95, 88, 71, 90, 63, 77, 84]

top_3 = sorted(scores, reverse=True)[:3]
bottom_3 = sorted(scores)[:3]

print(f"Top 3    : {top_3}")
print(f"Bottom 3 : {bottom_3}")
\`\`\`

Output:
\`\`\`
Top 3    : [95, 92, 90]
Bottom 3 : [63, 71, 77]
\`\`\`

### Splitting a List

\`\`\`python
students = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]

# Split into two groups
group_a = students[:len(students)//2]
group_b = students[len(students)//2:]

print(f"Group A: {group_a}")
print(f"Group B: {group_b}")
\`\`\`

Output:
\`\`\`
Group A: ['Alice', 'Bob', 'Charlie']
Group B: ['Diana', 'Eve', 'Frank']
\`\`\`

### Pagination

\`\`\`python
items = list(range(1, 21))   # 20 items total
page_size = 5

page = 2  # Show page 2
start = (page - 1) * page_size
end = start + page_size

page_items = items[start:end]
print(f"Page {page}: {page_items}")
# Output: Page 2: [6, 7, 8, 9, 10]
\`\`\`

> [!TIP]
> The rules for list slicing are identical to string slicing - \`[start:stop:step]\`, the stop is exclusive, and \`[::-1]\` reverses. The key difference is that you can also **modify** list items using indexing and slicing, which you cannot do with strings.`,
  objectives: [
    "Access list items using positive and negative indices.",
    "Extract sublists using slicing with start, stop, and step.",
    "Modify individual list items using index assignment.",
    "Understand that slicing returns a new list and does not modify the original.",
    "Apply slicing in practical scenarios like pagination and splitting."
  ],
  difficulty: "beginner",
  xpReward: 55,
};