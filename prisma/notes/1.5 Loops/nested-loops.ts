export const nestedLoopsLesson = {
  title: "Nested Loops",
  slug: "nested-loops",
  content: `# Nested Loops

A **nested loop** is a loop inside another loop. The inner loop runs **completely** for every single iteration of the outer loop. Think of it like a clock: for every 1 hour (outer), the minute hand goes around 60 times (inner).

## The Theory — Building the Logic

A nested loop is simply one loop living inside another, and the defining idea is that the *inner* loop runs to completion on every single pass of the *outer* loop. Python executes them like clockwork: it enters the outer iteration, spins through all inner repetitions, then returns to the outer for the next step, repeating the whole inner cycle each time. This makes the total number of inner iterations multiply rather than add — an outer of size n and inner of size m produce n times m runs — which is exactly why nested loops fit rows-and-columns problems like grids and tables. The mental trap is forgetting that the inner loop restarts fresh each outer pass, so any inner counter must be reset inside the outer loop to behave correctly. Another common pitfall is nesting too deeply, where the multiplied iterations quietly make a simple-looking program very slow.

## Basic Structure

\`\`\`python
for outer in outer_sequence:
    for inner in inner_sequence:
        # This runs for EVERY combination of outer and inner
\`\`\`

## Simple Example - Understanding the Flow

\`\`\`python
for i in range(1, 4):        # Outer loop: 1, 2, 3
    for j in range(1, 4):    # Inner loop: 1, 2, 3 (runs fresh each time)
        print(f"i={i}, j={j}")
    print("---")             # Runs after each COMPLETE inner loop
\`\`\`

Output:
\`\`\`
i=1, j=1
i=1, j=2
i=1, j=3
---
i=2, j=1
i=2, j=2
i=2, j=3
---
i=3, j=1
i=3, j=2
i=3, j=3
---
\`\`\`

The outer loop ran **3 times**. The inner loop ran **3 times each** = **9 total iterations**.

## Multiplication Table

\`\`\`python
print("Multiplication Table")
print("=" * 50)

for i in range(1, 11):
    for j in range(1, 11):
        print(f"{i * j:4}", end="")
    print()  # New line after each row
\`\`\`

Output:
\`\`\`
Multiplication Table
==================================================
   1   2   3   4   5   6   7   8   9  10
   2   4   6   8  10  12  14  16  18  20
   3   6   9  12  15  18  21  24  27  30
...
  10  20  30  40  50  60  70  80  90 100
\`\`\`

## Nested Loops with Lists (2D Data)

A very common use of nested loops is working with 2D lists (lists inside lists):

\`\`\`python
# A 2D grid (like a spreadsheet)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

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

\`\`\`python
# Find the sum of all elements
total = 0
for row in matrix:
    for item in row:
        total += item

print(f"Sum of all elements: {total}")  # Output: Sum of all elements: 45
\`\`\`

\`\`\`python
# Class grade book
students = {
    "Alice":   [85, 90, 78, 92],
    "Bob":     [70, 65, 88, 75],
    "Charlie": [95, 92, 98, 100]
}

print(f"{'Student':<10} {'Grades':<25} {'Average':>10}")
print("-" * 48)

for student, grades in students.items():
    average = sum(grades) / len(grades)
    grades_str = ", ".join(str(g) for g in grades)
    print(f"{student:<10} {grades_str:<25} {average:>9.1f}%")
\`\`\`

Output:
\`\`\`
Student    Grades                     Average
------------------------------------------------
Alice      85, 90, 78, 92               86.2%
Bob        70, 65, 88, 75               74.5%
Charlie    95, 92, 98, 100              96.2%
\`\`\`

## Nested while Loops

\`\`\`python
# Printing a rectangle of stars
rows = 4
cols = 6

i = 1
while i <= rows:
    j = 1
    while j <= cols:
        print("*", end=" ")
        j += 1
    print()
    i += 1
\`\`\`

Output:
\`\`\`
* * * * * *
* * * * * *
* * * * * *
* * * * * *
\`\`\`

## Combining for and while Loops

You can mix \`for\` and \`while\` loops:

\`\`\`python
questions = [
    {"question": "What is 5 + 5?", "answer": "10"},
    {"question": "What is 3 * 4?", "answer": "12"},
    {"question": "What is 10 / 2?", "answer": "5"},
]

total_score = 0

for q in questions:
    attempts = 0
    while attempts < 2:  # Allow 2 attempts per question
        user_answer = input(q["question"] + " ")
        if user_answer == q["answer"]:
            print("Correct!")
            total_score += 1
            break
        else:
            attempts += 1
            if attempts < 2:
                print("Wrong. Try once more.")
            else:
                print(f"Wrong. The answer was {q['answer']}.")

print(f"\\nFinal score: {total_score}/{len(questions)}")
\`\`\`

## Performance Consideration

Nested loops multiply the number of iterations. Be mindful with large ranges:

\`\`\`python
# Outer runs 100 times
# Inner runs 100 times for EACH outer iteration
# Total iterations: 100 * 100 = 10,000

for i in range(100):
    for j in range(100):
        pass  # 10,000 iterations

# Outer 1000, Inner 1000 = 1,000,000 iterations!
# This can be slow for very large numbers
\`\`\`

> [!TIP]
> Limit nesting to 2-3 levels maximum. Deeply nested loops become very hard to read and can be slow. If you find yourself nesting 4+ levels deep, consider breaking the inner logic into a separate function.`,
  objectives: [
    "Understand how nested loops work and how many total iterations occur.",
    "Use nested for loops to work with 2D data structures.",
    "Use nested loops to generate tables.",
    "Combine for and while loops in nested structures.",
    "Be aware of performance implications of nested loops."
  ],
  difficulty: "beginner",
  xpReward: 65,
};