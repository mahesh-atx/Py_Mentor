export const loopControlStatementsLesson = {
  title: "Loop Control Statements",
  slug: "loop-control-statements",
  content: `# Loop Control Statements

Sometimes you need more control over how a loop runs. Maybe you want to stop the loop early when you find what you are looking for, or skip certain iterations. Python gives you three statements to control loop execution: \`break\`, \`continue\`, and \`pass\`.

## The Theory — Building the Logic

Break, continue, and pass are the three levers that let you steer a loop's flow instead of letting it run in a straight, predictable line. \`break\` and \`continue\` are about *control*: \`break\` abandons the loop entirely, while \`continue\` discards only the current pass and jumps straight to the next one, both decided by a condition you place inside the body. \`pass\`, by contrast, does nothing at all — it exists purely to satisfy Python's rule that a block cannot be empty, acting as a placeholder while you design your logic. The mental model to keep is that these statements change *where execution goes next*, not the data itself. A frequent pitfall is expecting \`break\` to escape several nested loops at once; it only exits the single loop it sits in, so outer loops keep going unless you add extra logic.

## break - Exit the Loop Immediately

The \`break\` statement **immediately exits** the loop, regardless of whether the condition is still \`True\` or there are more items to iterate over. The program continues from the line after the loop.

### break in a for Loop

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for num in numbers:
    if num == 5:
        print("Found 5! Stopping the loop.")
        break
    print(num)

print("Loop ended.")
\`\`\`

Output:
\`\`\`
1
2
3
4
Found 5! Stopping the loop.
Loop ended.
\`\`\`

Notice that 6, 7, 8, 9, 10 were never printed - the loop stopped completely at 5.

### break in a while Loop

\`\`\`python
while True:   # This would loop forever without break
    user_input = input("Enter 'quit' to exit: ")
    if user_input.lower() == "quit":
        print("Goodbye!")
        break
    print(f"You entered: {user_input}")
\`\`\`

\`\`\`python
# Search for first negative number
numbers = [10, 25, 3, -7, 15, -2, 8]
found_negative = None

for num in numbers:
    if num < 0:
        found_negative = num
        break

if found_negative is not None:
    print(f"First negative number: {found_negative}")
else:
    print("No negative numbers found.")
# Output: First negative number: -7
\`\`\`

### break in Nested Loops

\`\`\`break\` only exits the **innermost** loop it is in:

\`\`\`python
for i in range(1, 4):
    for j in range(1, 4):
        if j == 2:
            break         # Only breaks the INNER loop
        print(f"i={i}, j={j}")
    print(f"Outer loop i={i} still running")
\`\`\`

Output:
\`\`\`
i=1, j=1
Outer loop i=1 still running
i=2, j=1
Outer loop i=2 still running
i=3, j=1
Outer loop i=3 still running
\`\`\`

## continue - Skip to the Next Iteration

The \`continue\` statement **skips the rest of the current iteration** and jumps to the next one. The loop does NOT exit - it just skips the current cycle.

### continue in a for Loop

\`\`\`python
for num in range(1, 11):
    if num % 2 == 0:  # If even, skip it
        continue
    print(num)         # Only odd numbers are printed
\`\`\`

Output:
\`\`\`
1
3
5
7
9
\`\`\`

\`\`\`python
# Process only positive numbers
numbers = [5, -3, 8, -1, 12, -7, 4]

print("Positive numbers only:")
for num in numbers:
    if num < 0:
        continue    # Skip negative numbers
    print(num)
\`\`\`

Output:
\`\`\`
Positive numbers only:
5
8
12
4
\`\`\`

### continue in a while Loop

\`\`\`python
number = 0

while number < 10:
    number += 1
    if number % 3 == 0:  # Skip multiples of 3
        continue
    print(number)
\`\`\`

Output:
\`\`\`
1
2
4
5
7
8
10
\`\`\`

### Practical continue Example - Input Cleaning

\`\`\`python
data = ["alice", "", "bob", "  ", "charlie", "", "dave"]
clean_names = []

for name in data:
    if not name.strip():   # Skip empty or whitespace-only strings
        continue
    clean_names.append(name.strip())

print(clean_names)
# Output: ['alice', 'bob', 'charlie', 'dave']
\`\`\`

## pass - Do Nothing (Placeholder)

The \`pass\` statement does **absolutely nothing**. It is a placeholder used when Python requires code syntactically but you have nothing to put there yet.

### Why is pass Needed?

Python does not allow empty blocks. This would cause an error:
\`\`\`python
if condition:
    # ERROR! Python requires at least one statement here
\`\`\`

With \`pass\`, it works:
\`\`\`python
if condition:
    pass   # No error - placeholder for future code
\`\`\`

### pass in Loops

\`\`\`python
# Loop that currently does nothing (placeholder for future logic)
for i in range(10):
    pass   # Will add code here later

print("Loop ran but did nothing.")
\`\`\`

\`\`\`python
# Ignore certain values while still iterating
for num in range(1, 11):
    if num % 2 == 0:
        pass   # Even numbers - handle later
    else:
        print(f"Odd: {num}")
\`\`\`

### pass in Conditionals

\`\`\`python
age = 20

if age >= 18:
    print("Adult - can proceed")
else:
    pass   # Minor - no action needed right now

# pass in exception handling (suppress an error silently)
try:
    result = 10 / 0
except ZeroDivisionError:
    pass   # Silently ignore this error
\`\`\`

### pass in Functions and Classes (Skeleton Code)

\`\`\`python
# Building the structure first, filling in logic later
def calculate_tax(income):
    pass   # TODO: implement this

def send_email(to, subject, body):
    pass   # TODO: implement this

class DatabaseConnection:
    pass   # TODO: implement this class
\`\`\`

## break vs continue vs pass - Side by Side

\`\`\`python
print("=== break demo ===")
for i in range(1, 6):
    if i == 3:
        break      # Exits loop at 3
    print(i)
# Output: 1  2

print("\\n=== continue demo ===")
for i in range(1, 6):
    if i == 3:
        continue   # Skips 3, continues with 4
    print(i)
# Output: 1  2  4  5

print("\\n=== pass demo ===")
for i in range(1, 6):
    if i == 3:
        pass       # Does nothing, 3 still prints
    print(i)
# Output: 1  2  3  4  5
\`\`\`

## Practical Example: Student Grade Filter

\`\`\`python
students = [
    {"name": "Alice",   "score": 88},
    {"name": "Bob",     "score": 45},
    {"name": "Charlie", "score": 92},
    {"name": "Diana",   "score": 38},
    {"name": "Eve",     "score": 76},
]

passing_students = []
failing_students = []

for student in students:
    if student["score"] < 50:
        failing_students.append(student["name"])
        continue   # Skip adding to passing list

    if student["score"] >= 90:
        print(f"Distinction: {student['name']} ({student['score']}%)")

    passing_students.append(student["name"])

print(f"\\nPassed: {', '.join(passing_students)}")
print(f"Failed: {', '.join(failing_students)}")
\`\`\`

Output:
\`\`\`
Distinction: Charlie (92%)

Passed: Alice, Charlie, Eve
Failed: Bob, Diana
\`\`\`

## Practical Example: ATM with break

\`\`\`python
balance = 1000.00

while True:
    print(f"\\nBalance: \${balance:.2f}")
    print("1. Withdraw")
    print("2. Deposit")
    print("3. Exit")

    choice = input("Choose: ")

    if choice == "3":
        print("Thank you for banking with us!")
        break
    elif choice == "1":
        amount = float(input("Withdraw amount: $"))
        if amount <= 0:
            print("Invalid amount.")
            continue
        if amount > balance:
            print("Insufficient funds.")
            continue
        balance -= amount
        print(f"Withdrew \${amount:.2f}")
    elif choice == "2":
        amount = float(input("Deposit amount: $"))
        if amount <= 0:
            print("Invalid amount.")
            continue
        balance += amount
        print(f"Deposited \${amount:.2f}")
    else:
        print("Invalid choice.")
        continue
\`\`\`

> [!TIP]
> Use \`break\` when you want to stop the loop entirely (found what you needed, user wants to quit). Use \`continue\` when you want to skip the current item but keep looping. Use \`pass\` as a placeholder when you need to write the structure first and fill in the logic later.`,
  objectives: [
    "Use break to exit a loop immediately when a condition is met.",
    "Use continue to skip the current iteration and move to the next.",
    "Use pass as a placeholder in loops, conditionals, and functions.",
    "Understand the difference between break, continue, and pass.",
    "Apply these statements in real-world scenarios."
  ],
  difficulty: "beginner",
  xpReward: 65,
};