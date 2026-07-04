export const conditionalStatementsLesson = {
  title: "Conditional Statements",
  slug: "conditional-statements",
  content: `# Conditional Statements

Every program needs to make decisions. Should the user be allowed to log in? Did the student pass the exam? Is the temperature too high? **Conditional statements** let your program make decisions and execute different code based on whether a condition is \`True\` or \`False\`.

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

## The if-elif-else Statement

When you have **more than two** possible outcomes, use \`elif\` (short for "else if"). Python checks each condition from top to bottom and runs the **first** one that is \`True\`.

### Syntax

\`\`\`python
if condition1:
    # Runs if condition1 is True
elif condition2:
    # Runs if condition1 is False AND condition2 is True
elif condition3:
    # Runs if condition1 and condition2 are False AND condition3 is True
else:
    # Runs if ALL conditions above are False
\`\`\`

> [!NOTE]
> Only ONE block runs. Once Python finds a \`True\` condition, it runs that block and skips all the remaining \`elif\` and \`else\` blocks.

### Examples

\`\`\`python
score = 78

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your score is {score}. Grade: {grade}")
# Output: Your score is 78. Grade: C
\`\`\`

\`\`\`python
temperature = 22

if temperature < 0:
    print("Freezing! Stay indoors.")
elif temperature < 10:
    print("Very cold. Wear a heavy coat.")
elif temperature < 20:
    print("Cool. Wear a jacket.")
elif temperature < 30:
    print("Comfortable. Light clothing is fine.")
else:
    print("Hot! Stay cool and hydrated.")
# Output: Comfortable. Light clothing is fine.
\`\`\`

\`\`\`python
day = input("Enter day of week: ").lower()

if day == "monday":
    print("Start of the work week. Let's go!")
elif day == "friday":
    print("Almost weekend!")
elif day == "saturday" or day == "sunday":
    print("It's the weekend! Enjoy!")
else:
    print("A regular weekday. Keep going!")
\`\`\`

### How Python Evaluates elif - Step by Step

\`\`\`python
score = 85

# Python checks these in ORDER:
if score >= 90:        # 85 >= 90? NO -> skip
    grade = "A"
elif score >= 80:      # 85 >= 80? YES -> run this block, STOP checking
    grade = "B"
elif score >= 70:      # Never even checked!
    grade = "C"
else:                  # Never even reached!
    grade = "F"

print(grade)  # Output: B
\`\`\`

## Nested if Statements

You can put \`if\` statements inside other \`if\` statements. This is called **nesting**. Use it when a decision depends on another decision.

### Syntax

\`\`\`python
if outer_condition:
    # Outer block
    if inner_condition:
        # Inner block - runs only if BOTH conditions are True
    else:
        # Inner else
else:
    # Outer else
\`\`\`

### Examples

\`\`\`python
age = 20
has_id = True

if age >= 18:
    print("Age requirement met.")
    if has_id:
        print("ID verified. Access granted!")
    else:
        print("Please show your ID.")
else:
    print("You must be 18 or older.")
# Output:
# Age requirement met.
# ID verified. Access granted!
\`\`\`

\`\`\`python
username = "alice"
password = "secret"
is_active = True

entered_user = "alice"
entered_pass = "secret"

if entered_user == username:
    if entered_pass == password:
        if is_active:
            print("Welcome, Alice!")
        else:
            print("Your account is deactivated. Contact support.")
    else:
        print("Incorrect password.")
else:
    print("Username not found.")
# Output: Welcome, Alice!
\`\`\`

\`\`\`python
# Number classification
number = int(input("Enter a number: "))

if number >= 0:
    if number == 0:
        print("The number is zero.")
    elif number % 2 == 0:
        print(f"{number} is a positive even number.")
    else:
        print(f"{number} is a positive odd number.")
else:
    if number % 2 == 0:
        print(f"{number} is a negative even number.")
    else:
        print(f"{number} is a negative odd number.")
\`\`\`

> [!TIP]
> Avoid nesting too deeply. If you have more than 3 levels of nesting, your code becomes hard to read. Consider using \`and\`/\`or\` or restructuring your logic.

## The Ternary Operator (Conditional Expression)

The ternary operator is a **one-line shortcut** for simple \`if-else\` statements. It is great for assigning a value based on a condition.

### Syntax

\`\`\`python
value = value_if_true if condition else value_if_false
\`\`\`

### Examples

\`\`\`python
# Regular if-else
age = 20
if age >= 18:
    status = "adult"
else:
    status = "minor"
print(status)   # Output: adult

# Same thing with ternary operator
age = 20
status = "adult" if age >= 18 else "minor"
print(status)   # Output: adult
\`\`\`

\`\`\`python
number = 7
result = "even" if number % 2 == 0 else "odd"
print(f"{number} is {result}.")
# Output: 7 is odd.
\`\`\`

\`\`\`python
# Using ternary in print directly
score = 75
print("Pass" if score >= 50 else "Fail")
# Output: Pass
\`\`\`

\`\`\`python
# Ternary for choosing a message
temperature = 35
advice = "Stay cool!" if temperature > 30 else "Enjoy the weather!"
print(advice)   # Output: Stay cool!
\`\`\`

Nested ternary (use sparingly - can hurt readability):
\`\`\`python
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(grade)    # Output: B
# Better to use if-elif-else for multiple conditions
\`\`\`

## Practical Example: Complete Decision System

\`\`\`python
print("=== Loan Eligibility Checker ===")

age = int(input("Enter your age: "))
income = float(input("Enter your monthly income ($): "))
credit_score = int(input("Enter your credit score (300-850): "))
employment = input("Are you employed? (yes/no): ").lower()

print("\\nChecking eligibility...")
print("-" * 35)

if employment != "yes":
    print("Result: REJECTED")
    print("Reason: Must be currently employed.")
elif age < 21 or age > 65:
    print("Result: REJECTED")
    print("Reason: Age must be between 21 and 65.")
elif income < 2000:
    print("Result: REJECTED")
    print("Reason: Minimum monthly income is $2000.")
elif credit_score < 600:
    print("Result: REJECTED")
    print("Reason: Minimum credit score is 600.")
elif credit_score >= 750 and income >= 5000:
    print("Result: APPROVED - PREMIUM")
    max_loan = income * 24
    print(f"Maximum loan amount: \${max_loan:,.2f}")
    print("Interest rate: 5.5%")
elif credit_score >= 650:
    print("Result: APPROVED - STANDARD")
    max_loan = income * 12
    print(f"Maximum loan amount: \${max_loan:,.2f}")
    print("Interest rate: 8.5%")
else:
    print("Result: APPROVED - BASIC")
    max_loan = income * 6
    print(f"Maximum loan amount: \${max_loan:,.2f}")
    print("Interest rate: 12%")
\`\`\`

Sample run:
\`\`\`
=== Loan Eligibility Checker ===
Enter your age: 30
Enter your monthly income ($): 6000
Enter your credit score (300-850): 780
Are you employed? (yes/no): yes

Checking eligibility...
-----------------------------------
Result: APPROVED - PREMIUM
Maximum loan amount: $144,000.00
Interest rate: 5.5%
\`\`\`

> [!TIP]
> Use \`if\` when you have one possible action. Use \`if-else\` when you have two paths. Use \`if-elif-else\` when you have three or more paths. Use the ternary operator for simple one-line assignments.`,
  objectives: [
    "Use the if statement to execute code conditionally.",
    "Use if-else to handle two possible outcomes.",
    "Use if-elif-else to handle multiple possible outcomes.",
    "Use nested if statements for decisions within decisions.",
    "Use the ternary operator for concise one-line conditionals."
  ],
  difficulty: "beginner",
  xpReward: 70,
};