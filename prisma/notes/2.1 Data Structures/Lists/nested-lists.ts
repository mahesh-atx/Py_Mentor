export const nestedListsLesson = {
  title: "Nested Lists (2D Lists)",
  slug: "nested-lists",
  content: `# Nested Lists (2D Lists)

A **nested list** is a list that contains other lists as its items. This creates a 2D (or even 3D) structure, perfect for representing grids, matrices, tables, and game boards.

## The Theory — Building the Logic

A nested list is really just an ordinary list whose elements happen to be other lists — Python stores references to those inner lists, not copies of their contents. This means a two-dimensional structure is built from normal one-dimensional lists stacked inside one another, so double indexing like \`matrix[0][0]\` simply means "take element 0, then take element 0 of that result." The key mental model is that each row is an independent object reached through the outer list. A common pitfall is building rows by repetition such as \`[[0]] * rows\`, which makes every row the same object, so editing one silently changes them all.

## Creating a Nested List

\`\`\`python
# A 3x3 grid
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix)
# Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
\`\`\`

\`\`\`python
# Class seating chart
classroom = [
    ["Alice", "Bob",   "Charlie"],
    ["Diana", "Eve",   "Frank"],
    ["Grace", "Henry", "Ivy"]
]
\`\`\`

\`\`\`python
# Mixed types in nested list
records = [
    ["Alice", 25, "New York", 88.5],
    ["Bob",   30, "London",   92.3],
    ["Charlie", 22, "Paris",  75.0],
]
\`\`\`

## Accessing Elements

Use **double indexing** \`[row][col]\` to access individual elements:

\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])      # Output: [1, 2, 3]   (first row - a list)
print(matrix[0][0])   # Output: 1            (row 0, col 0)
print(matrix[0][2])   # Output: 3            (row 0, col 2)
print(matrix[1][1])   # Output: 5            (row 1, col 1 - center)
print(matrix[2][2])   # Output: 9            (row 2, col 2 - bottom right)
print(matrix[-1][-1]) # Output: 9            (last row, last column)
\`\`\`

Think of it as: \`matrix[row][column]\`

\`\`\`
         col 0   col 1   col 2
row 0  [  1,      2,      3  ]
row 1  [  4,      5,      6  ]
row 2  [  7,      8,      9  ]
\`\`\`

## Modifying Elements

\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

matrix[0][0] = 100    # Change top-left
matrix[2][2] = 999    # Change bottom-right
print(matrix)
# Output: [[100, 2, 3], [4, 5, 6], [7, 8, 999]]
\`\`\`

## Iterating Through a 2D List

### Iterate Rows

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    print(row)
# Output:
# [1, 2, 3]
# [4, 5, 6]
# [7, 8, 9]
\`\`\`

### Iterate Every Element

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for row in matrix:
    for item in row:
        print(item, end=" ")
    print()  # New line after each row
\`\`\`

Output:
\`\`\`
1 2 3
4 5 6
7 8 9
\`\`\`

### Iterate with Index

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for r, row in enumerate(matrix):
    for c, item in enumerate(row):
        print(f"[{r}][{c}] = {item}", end="   ")
    print()
\`\`\`

Output:
\`\`\`
[0][0] = 1   [0][1] = 2   [0][2] = 3
[1][0] = 4   [1][1] = 5   [1][2] = 6
[2][0] = 7   [2][1] = 8   [2][2] = 9
\`\`\`

## Creating 2D Lists Programmatically

\`\`\`python
# Create a 3x4 grid filled with zeros
rows, cols = 3, 4
grid = [[0] * cols for _ in range(rows)]
print(grid)
# Output: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
\`\`\`

> [!IMPORTANT]
> Do NOT use \`[[0] * cols] * rows\` - this creates rows that all reference the SAME list!
>
> \`\`\`python
> # WRONG - all rows are the same object!
> bad_grid = [[0] * 4] * 3
> bad_grid[0][0] = 99
> print(bad_grid)   # [[99, 0, 0, 0], [99, 0, 0, 0], [99, 0, 0, 0]] (all changed!)
>
> # CORRECT - each row is a separate list
> good_grid = [[0] * 4 for _ in range(3)]
> good_grid[0][0] = 99
> print(good_grid)  # [[99, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] (only one changed)
> \`\`\`

## Common Operations on 2D Lists

### Sum of All Elements

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = sum(item for row in matrix for item in row)
print(total)   # Output: 45
\`\`\`

### Row Sums

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
row_sums = [sum(row) for row in matrix]
print(row_sums)   # Output: [6, 15, 24]
\`\`\`

### Transpose (Flip Rows and Columns)

\`\`\`python
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

transposed = [[matrix[r][c] for r in range(len(matrix))]
              for c in range(len(matrix[0]))]
print(transposed)
# Output: [[1, 4], [2, 5], [3, 6]]

# Simpler using zip
transposed2 = [list(row) for row in zip(*matrix)]
print(transposed2)
# Output: [[1, 4], [2, 5], [3, 6]]
\`\`\`

### Find Maximum in 2D List

\`\`\`python
matrix = [[3, 7, 1], [9, 2, 8], [4, 6, 5]]
maximum = max(item for row in matrix for item in row)
print(maximum)   # Output: 9
\`\`\`

## Practical Example: Tic-Tac-Toe Board

\`\`\`python
# Initialize empty board
board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]

def print_board(board):
    print("  0   1   2")
    for r, row in enumerate(board):
        print(f"{r} " + " | ".join(row))
        if r < 2:
            print("  ---------")

def make_move(board, row, col, player):
    if board[row][col] == " ":
        board[row][col] = player
        return True
    return False

print("Initial board:")
print_board(board)

make_move(board, 0, 0, "X")
make_move(board, 1, 1, "O")
make_move(board, 0, 2, "X")

print("\\nAfter some moves:")
print_board(board)
\`\`\`

Output:
\`\`\`
Initial board:
  0   1   2
0   |   |  
  ---------
1   |   |  
  ---------
2   |   |  

After some moves:
  0   1   2
0 X |   | X
  ---------
1   | O |  
  ---------
2   |   |  
\`\`\`

## Practical Example: Grade Book

\`\`\`python
# Each student: [name, math, science, english]
gradebook = [
    ["Alice",   88, 92, 85],
    ["Bob",     72, 68, 79],
    ["Charlie", 95, 91, 98],
    ["Diana",   61, 74, 66],
]

print(f"{'Name':<10} {'Math':>6} {'Sci':>6} {'Eng':>6} {'Avg':>8} {'Grade':>6}")
print("-" * 48)

for student in gradebook:
    name = student[0]
    scores = student[1:]
    avg = sum(scores) / len(scores)
    grade = "A" if avg >= 90 else "B" if avg >= 80 else "C" if avg >= 70 else "D" if avg >= 60 else "F"
    print(f"{name:<10} {scores[0]:>6} {scores[1]:>6} {scores[2]:>6} {avg:>7.1f}% {grade:>6}")
\`\`\`

Output:
\`\`\`
Name        Math    Sci    Eng      Avg  Grade
------------------------------------------------
Alice         88     92     85    88.3%     B
Bob           72     68     79    73.0%     C
Charlie       95     91     98    94.7%     A
Diana         61     74     66    67.0%     D
\`\`\`

> [!TIP]
> Use \`[row][col]\` notation to access 2D list items. Always create 2D lists using a comprehension \`[[val]*cols for _ in range(rows)]\` to ensure each row is independent. Think of the first index as the row and the second as the column.`,
  objectives: [
    "Create nested lists (2D lists) to represent grids and tables.",
    "Access elements using double indexing [row][col].",
    "Iterate through 2D lists using nested for loops.",
    "Create 2D lists programmatically using list comprehension.",
    "Apply 2D lists to real-world problems like matrices and grade books."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};