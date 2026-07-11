export const whileLoopLesson = {
  title: "The while Loop",
  slug: "while-loop",
  content: `# The while Loop

A \`while\` loop keeps repeating a block of code **as long as a condition remains \`True\`**. Unlike the \`for\` loop which runs for each item in a sequence, the \`while\` loop runs until something changes.

## How the while Loop Works

\`\`\`python
while condition:
    # This block runs repeatedly
    # as long as condition is True
    # Make sure condition eventually becomes False!
\`\`\`

Python checks the condition before every iteration. If the condition is \`True\`, it runs the block. Then it checks again. This continues until the condition becomes \`False\`.

## Basic Examples

\`\`\`python
count = 1

while count <= 5:
    print(count)
    count += 1   # This is crucial - moves us closer to the condition being False

print("Loop finished!")
\`\`\`

Output:
\`\`\`
1
2
3
4
5
Loop finished!
\`\`\`

Step by step:
\`\`\`
Start: count = 1
Check: 1 <= 5? YES -> print 1, count becomes 2
Check: 2 <= 5? YES -> print 2, count becomes 3
Check: 3 <= 5? YES -> print 3, count becomes 4
Check: 4 <= 5? YES -> print 4, count becomes 5
Check: 5 <= 5? YES -> print 5, count becomes 6
Check: 6 <= 5? NO  -> loop ends
\`\`\`

\`\`\`python
# Countdown
countdown = 10

while countdown > 0:
    print(countdown)
    countdown -= 1

print("Blast off!")
\`\`\`

Output:
\`\`\`
10
9
8
...
1
Blast off!
\`\`\`

## The Infinite Loop Problem

If the condition **never becomes \`False\`**, the loop runs forever. This is called an **infinite loop** and will freeze your program.

\`\`\`python
# WARNING: This is an infinite loop - DO NOT run this!
count = 1
while count <= 5:
    print(count)
    # Forgot count += 1 !!!
    # count never changes, so 1 <= 5 is always True
\`\`\`

Always make sure something inside your loop changes the condition.

\`\`\`python
# Safe version
count = 1
while count <= 5:
    print(count)
    count += 1    # This changes count, moving towards condition being False
\`\`\`

## while Loop for User Input Validation

The \`while\` loop is perfect when you need to keep asking until the user gives valid input:

\`\`\`python
# Keep asking until valid age is entered
while True:
    try:
        age = int(input("Enter your age (1-120): "))
        if 1 <= age <= 120:
            break   # Valid input - exit the loop
        else:
            print("Age must be between 1 and 120. Try again.")
    except ValueError:
        print("Please enter a valid number.")

print(f"Your age is: {age}")
\`\`\`

\`\`\`python
# Password with limited attempts
correct_password = "python123"
max_attempts = 3
attempts = 0

while attempts < max_attempts:
    password = input("Enter password: ")
    attempts += 1

    if password == correct_password:
        print("Access granted!")
        break
    else:
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"Wrong password. {remaining} attempts remaining.")
        else:
            print("Account locked. Too many failed attempts.")
\`\`\`

## while Loop with a Flag Variable

Using a boolean flag is a clean way to control a while loop:

\`\`\`python
running = True

while running:
    print("\\n=== Main Menu ===")
    print("1. Say Hello")
    print("2. Show Date")
    print("3. Quit")

    choice = input("Enter choice: ")

    if choice == "1":
        print("Hello, World!")
    elif choice == "2":
        import datetime
        print(datetime.date.today())
    elif choice == "3":
        running = False
        print("Goodbye!")
    else:
        print("Invalid choice. Please try again.")
\`\`\`

## while Loop for Accumulation

\`\`\`python
# Keep adding numbers until user enters 0
total = 0
count = 0

print("Enter numbers to add (enter 0 to stop):")

while True:
    number = float(input("Enter a number: "))
    if number == 0:
        break
    total += number
    count += 1

if count > 0:
    average = total / count
    print(f"\\nNumbers entered: {count}")
    print(f"Total: {total}")
    print(f"Average: {average:.2f}")
else:
    print("No numbers were entered.")
\`\`\`

## while Loop for Searching

\`\`\`python
# Binary search using while loop
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23

left = 0
right = len(numbers) - 1
found = False

while left <= right:
    mid = (left + right) // 2
    if numbers[mid] == target:
        print(f"Found {target} at index {mid}!")
        found = True
        break
    elif numbers[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

if not found:
    print(f"{target} not found in the list.")
# Output: Found 23 at index 5!
\`\`\`

## while Loop vs for Loop - When to Use Which

\`\`\`python
# Use FOR when you know how many times to loop
# or when iterating over a collection
for i in range(10):
    print(i)

for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# Use WHILE when you do NOT know how many times to loop
# or when looping until something happens
while user_input != "quit":
    user_input = input("Enter command: ")

while not is_connected:
    attempt_connection()
\`\`\`

## while with else

Like the \`for\` loop, \`while\` also has an optional \`else\` block that runs when the condition becomes \`False\` (not when broken out of):

\`\`\`python
number = 1

while number <= 5:
    print(number)
    number += 1
else:
    print("Loop completed normally.")

# Output:
# 1 2 3 4 5
# Loop completed normally.
\`\`\`

\`\`\`python
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    answer = input("What is 5 + 5? ")
    if answer == "10":
        print("Correct!")
        break
    attempts += 1
    print("Wrong! Try again.")
else:
    # This runs only if the loop finished WITHOUT break
    print(f"Out of attempts! The answer was 10.")
\`\`\`

## Practical Example: Number Guessing Game

\`\`\`python
import random

secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7
guessed = False

print("=== Number Guessing Game ===")
print(f"I am thinking of a number between 1 and 100.")
print(f"You have {max_attempts} attempts.")

while attempts < max_attempts:
    attempts += 1
    remaining = max_attempts - attempts

    try:
        guess = int(input(f"\\nAttempt {attempts}/{max_attempts} - Your guess: "))
    except ValueError:
        print("Please enter a valid number.")
        attempts -= 1
        continue

    if guess == secret_number:
        print(f"Correct! You got it in {attempts} attempt(s)!")
        guessed = True
        break
    elif guess < secret_number:
        print("Too low!", end=" ")
    else:
        print("Too high!", end=" ")

    if remaining > 0:
        print(f"{remaining} attempts remaining.")
    else:
        print()

if not guessed:
    print(f"\\nGame over! The number was {secret_number}.")
\`\`\`

> [!TIP]
> Always make sure your \`while\` loop has a way to end. Either the condition must eventually become \`False\`, or you must use a \`break\` statement inside. Infinite loops are one of the most common beginner mistakes.`,
  objectives: [
    "Use a while loop to repeat code while a condition is True.",
    "Understand the risk of infinite loops and how to prevent them.",
    "Use while loops for input validation.",
    "Use flag variables to control loop execution.",
    "Know when to use while vs for loops."
  ],
  difficulty: "beginner",
  xpReward: 70,
};