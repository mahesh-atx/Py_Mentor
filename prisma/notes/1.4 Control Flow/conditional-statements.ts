export const conditionalStatementsLesson = {
  title: "The if Statement",
  slug: "conditional-statements",
  content: `# The if Statement

Every program needs to make decisions. Should the user be allowed to log in? Did the student pass the exam? Is the temperature too high? **Conditional statements** let your program make decisions and execute different code based on whether a condition is \`True\` or \`False\`.

The mental model is that an \`if\` is a gate, not a loop — Python reduces the condition to a single boolean using its truthiness rules (so \`0\`, \`""\`, and \`None\` count as false) and runs the block at most once, only when the gate opens. A common pitfall is using \`=\` (assignment) instead of \`==\` (comparison), which either breaks the condition or silently changes a variable instead of testing it.

> [!NOTE]
> We cover the basics here: the \`if\` statement and the \`if-else\` pair. The \`if-elif-else\` chain, nested conditionals, the ternary operator, and \`match\` are covered in their own lessons.

## The if Statement

The simplest conditional statement. It runs a block of code **only if** the condition is \`True\`. If the condition is \`False\`, the block is completely skipped.

### Syntax

\`\`\`python
if condition:
    # This code runs ONLY if condition is True
    # Notice the indentation (4 spaces or 1 tab)
\`\`\`

> [!IMPORTANT]
> Python uses **indentation** (spaces at the beginning of a line) to define blocks of code. The standard is 4 spaces. This is not optional - wrong indentation causes errors.

### Basic Examples

\`\`\`python
age = 20

if age >= 18:
    print("You are an adult.")
    print("You can vote.")

print("This always prints.")  # Outside the if block
\`\`\`

Output:
\`\`\`
You are an adult.
You can vote.
This always prints.
\`\`\`

Now with a failing condition:

\`\`\`python
age = 15

if age >= 18:
    print("You are an adult.")  # This is SKIPPED
    print("You can vote.")      # This is SKIPPED

print("This always prints.")
\`\`\`

Output:
\`\`\`
This always prints.
\`\`\`

More examples:

\`\`\`python
temperature = 35

if temperature > 30:
    print("It is hot outside!")
    print("Stay hydrated.")

score = 85
if score >= 50:
    print("You passed the exam!")

balance = 1000
withdrawal = 500
if withdrawal <= balance:
    balance -= withdrawal
    print(f"Withdrawal successful. New balance: {balance}")
\`\`\`

## The if-else Statement

The \`else\` block runs when the \`if\` condition is \`False\`. It gives your program two paths: one for \`True\`, one for \`False\`.

### Syntax

\`\`\`python
if condition:
    # Runs when condition is True
else:
    # Runs when condition is False
\`\`\`

### Examples

\`\`\`python
age = 15

if age >= 18:
    print("You can vote.")
else:
    print("You are too young to vote.")
# Output: You are too young to vote.
\`\`\`

\`\`\`python
number = 7

if number % 2 == 0:
    print(f"{number} is even.")
else:
    print(f"{number} is odd.")
# Output: 7 is odd.
\`\`\`

\`\`\`python
username = "alice"
password = "secret123"

entered_user = input("Username: ")
entered_pass = input("Password: ")

if entered_user == username and entered_pass == password:
    print("Login successful! Welcome back.")
else:
    print("Incorrect username or password.")
\`\`\`

\`\`\`python
balance = 500
amount = 800

if amount <= balance:
    balance -= amount
    print(f"Transaction approved. Remaining balance: \${balance}")
else:
    shortfall = amount - balance
    print(f"Insufficient funds. You need \${shortfall} more.")
# Output: Insufficient funds. You need $300 more.
\`\`\`

### How an if-else behaves step by step

\`\`\`python
age = 15

# Python checks the condition:
if age >= 18:        # 15 >= 18? NO -> skip this block
    print("Adult")
else:                # Condition was False -> run this block
    print("Minor")   # Output: Minor
\`\`\`

## Combining multiple independent checks

Remember: each standalone \`if\` is checked independently and can all run. If you want exactly one block to run out of several options, use the \`if-elif-else\` chain (next lesson).

\`\`\`python
x = 10

if x > 5:
    print("Big")      # This runs
if x < 20:
    print("Small")    # This also runs (separate check)
# Output:
# Big
# Small
\`\`\`

> [!TIP]
> Use \`if\` when you have one possible action. Use \`if-else\` when you have exactly two paths (do this OR do that). When you have three or more possible outcomes, reach for the \`if-elif-else\` chain.`,
  objectives: [
    "Use the if statement to execute code conditionally.",
    "Understand that the indented block runs only when the condition is True.",
    "Use if-else to handle exactly two possible outcomes.",
    "Know the difference between one standalone if and an if-else pair."
  ],
  difficulty: "beginner",
  xpReward: 60,
};
