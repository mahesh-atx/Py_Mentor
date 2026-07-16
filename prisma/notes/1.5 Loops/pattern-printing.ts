export const patternPrintingLesson = {
  title: "Pattern Printing Programs",
  slug: "pattern-printing",
  content: `# Pattern Printing Programs

Pattern printing is a classic exercise to practice nested loops. Each pattern teaches you how to think about rows and columns and how to control what gets printed on each iteration.

Every pattern is just an arithmetic relationship between a row number and what belongs on that row — the count of stars, spaces, or columns is a formula in \`i\`. The classic pitfall is hard-coding each line instead of finding that formula, which makes patterns brittle and impossible to scale.

## The Key Idea

Every pattern has:
- An **outer loop** that controls the **rows** (how many lines)
- An **inner loop** that controls the **columns** (what is on each line)

\`\`\`python
for row in range(rows):          # Controls number of lines
    for col in range(columns):   # Controls what is on each line
        print("*", end="")       # end="" keeps output on same line
    print()                      # Move to next line after each row
\`\`\`

## Pattern 1: Solid Rectangle

\`\`\`python
rows = 4
cols = 6

for i in range(rows):
    for j in range(cols):
        print("*", end=" ")
    print()
\`\`\`

Output:
\`\`\`
* * * * * *
* * * * * *
* * * * * *
* * * * * *
\`\`\`

## Pattern 2: Right-Angled Triangle (Growing)

\`\`\`python
rows = 5

for i in range(1, rows + 1):
    for j in range(i):
        print("*", end=" ")
    print()
\`\`\`

Output:
\`\`\`
*
* *
* * *
* * * *
* * * * *
\`\`\`

Why it works: On row \`i\`, we print \`i\` stars. Row 1 gets 1 star, row 2 gets 2, etc.

## Pattern 3: Right-Angled Triangle (Shrinking)

\`\`\`python
rows = 5

for i in range(rows, 0, -1):
    for j in range(i):
        print("*", end=" ")
    print()
\`\`\`

Output:
\`\`\`
* * * * *
* * * *
* * *
* *
*
\`\`\`

## Pattern 4: Number Triangle

\`\`\`python
rows = 5

for i in range(1, rows + 1):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()
\`\`\`

Output:
\`\`\`
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
\`\`\`

## Pattern 5: Same Number Triangle

\`\`\`python
rows = 5

for i in range(1, rows + 1):
    for j in range(i):
        print(i, end=" ")
    print()
\`\`\`

Output:
\`\`\`
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5
\`\`\`

## Pattern 6: Pyramid (Centered Triangle)

\`\`\`python
rows = 5

for i in range(1, rows + 1):
    # Print leading spaces
    spaces = rows - i
    for s in range(spaces):
        print(" ", end="")
    # Print stars
    for j in range(2 * i - 1):
        print("*", end="")
    print()
\`\`\`

Output:
\`\`\`
    *
   ***
  *****
 *******
*********
\`\`\`

Understanding the pattern:
\`\`\`
Row 1: 4 spaces + 1 star    (2*1-1 = 1)
Row 2: 3 spaces + 3 stars   (2*2-1 = 3)
Row 3: 2 spaces + 5 stars   (2*3-1 = 5)
Row 4: 1 space  + 7 stars   (2*4-1 = 7)
Row 5: 0 spaces + 9 stars   (2*5-1 = 9)
\`\`\`

## Pattern 7: Inverted Pyramid

\`\`\`python
rows = 5

for i in range(rows, 0, -1):
    spaces = rows - i
    for s in range(spaces):
        print(" ", end="")
    for j in range(2 * i - 1):
        print("*", end="")
    print()
\`\`\`

Output:
\`\`\`
*********
 *******
  *****
   ***
    *
\`\`\`

## Pattern 8: Diamond

\`\`\`python
rows = 5

# Upper half (including middle)
for i in range(1, rows + 1):
    print(" " * (rows - i) + "*" * (2 * i - 1))

# Lower half
for i in range(rows - 1, 0, -1):
    print(" " * (rows - i) + "*" * (2 * i - 1))
\`\`\`

Output:
\`\`\`
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
\`\`\`

## Pattern 9: Hollow Rectangle

\`\`\`python
rows = 5
cols = 8

for i in range(rows):
    for j in range(cols):
        # Print star only on borders
        if i == 0 or i == rows - 1 or j == 0 or j == cols - 1:
            print("*", end="")
        else:
            print(" ", end="")
    print()
\`\`\`

Output:
\`\`\`
********
*      *
*      *
*      *
********
\`\`\`

## Pattern 10: Hollow Triangle

\`\`\`python
rows = 6

for i in range(1, rows + 1):
    for j in range(1, i + 1):
        # Print star on first column, last column of the row, or last row
        if j == 1 or j == i or i == rows:
            print("*", end=" ")
        else:
            print("  ", end="")
    print()
\`\`\`

Output:
\`\`\`
*
* *
*   *
*     *
*       *
* * * * * *
\`\`\`

## Pattern 11: Checkerboard

\`\`\`python
rows = 6
cols = 6

for i in range(rows):
    for j in range(cols):
        if (i + j) % 2 == 0:
            print("*", end=" ")
        else:
            print(" ", end=" ")
    print()
\`\`\`

Output:
\`\`\`
*   *   *
  *   *  
*   *   *
  *   *  
*   *   *
  *   *  
\`\`\`

## Pattern 12: Pascal's Triangle

\`\`\`python
rows = 6

for i in range(rows):
    # Print leading spaces for centering
    print(" " * (rows - i), end="")

    # Calculate and print values
    value = 1
    for j in range(i + 1):
        print(f"{value:4}", end="")
        value = value * (i - j) // (j + 1)
    print()
\`\`\`

Output:
\`\`\`
         1
       1   1
     1   2   1
   1   3   3   1
 1   4   6   4   1
1   5  10  10   5   1
\`\`\`

## Pattern 13: Number Pyramid

\`\`\`python
rows = 5

for i in range(1, rows + 1):
    # Leading spaces
    print(" " * (rows - i), end="")
    # Numbers increasing
    for j in range(1, i + 1):
        print(j, end="")
    # Numbers decreasing (mirror)
    for j in range(i - 1, 0, -1):
        print(j, end="")
    print()
\`\`\`

Output:
\`\`\`
    1
   121
  12321
 1234321
123454321
\`\`\`

## Pattern 14: Alphabet Triangle

\`\`\`python
rows = 5

for i in range(rows):
    for j in range(i + 1):
        # chr(65) = 'A', chr(66) = 'B', etc.
        print(chr(65 + j), end=" ")
    print()
\`\`\`

Output:
\`\`\`
A
A B
A B C
A B C D
A B C D E
\`\`\`

## Using String Multiplication (Shortcut)

For simpler patterns, you can use string multiplication instead of inner loops:

\`\`\`python
rows = 5

# Instead of inner loop
for i in range(1, rows + 1):
    print("* " * i)

# Output:
# *
# * *
# * * *
# * * * *
# * * * * *
\`\`\`

\`\`\`python
# Pyramid using string methods
rows = 5
for i in range(1, rows + 1):
    stars = "*" * (2 * i - 1)
    padding = " " * (rows - i)
    print(padding + stars)
\`\`\`

## Interactive Pattern Generator

\`\`\`python
print("=== Pattern Generator ===")
print("1. Right Triangle")
print("2. Pyramid")
print("3. Diamond")
print("4. Hollow Rectangle")

choice = input("Choose a pattern (1-4): ")
rows = int(input("Enter number of rows: "))

print()

if choice == "1":
    for i in range(1, rows + 1):
        print("* " * i)

elif choice == "2":
    for i in range(1, rows + 1):
        print(" " * (rows - i) + "* " * i)

elif choice == "3":
    for i in range(1, rows + 1):
        print(" " * (rows - i) + "* " * i)
    for i in range(rows - 1, 0, -1):
        print(" " * (rows - i) + "* " * i)

elif choice == "4":
    cols = int(input("Enter number of columns: "))
    for i in range(rows):
        for j in range(cols):
            if i == 0 or i == rows-1 or j == 0 or j == cols-1:
                print("*", end="")
            else:
                print(" ", end="")
        print()
else:
    print("Invalid choice.")
\`\`\`

## How to Approach Any Pattern

When you encounter a new pattern, follow these steps:

\`\`\`
Step 1: Look at each row individually
         Row 1: What is printed?
         Row 2: What is printed?
         Row 3: What is printed?

Step 2: Find the relationship between row number and output
         "In row i, there are i stars"
         "In row i, there are (rows - i) spaces"

Step 3: Write the outer loop for rows

Step 4: Write the inner loop(s) for what is printed on each row

Step 5: Test and adjust
\`\`\`

> [!TIP]
> Pattern printing is not just an exercise - it teaches you to think systematically about nested loops, which is a fundamental skill for working with 2D data, grids, matrices, and tables in real applications.`,
  objectives: [
    "Understand how nested loops create rows and columns in patterns.",
    "Print various triangle, pyramid, and diamond patterns.",
    "Create hollow shapes using conditional logic inside loops.",
    "Use string multiplication as a shortcut for simple patterns.",
    "Develop a systematic approach to analyzing and recreating any pattern."
  ],
  difficulty: "beginner",
  xpReward: 75,
};