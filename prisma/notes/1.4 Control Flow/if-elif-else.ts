export const ifElifElseLesson = {
  title: "if-elif-else Chains",
  slug: "if-elif-else",
  content: `# if-elif-else Chains

When your program faces **more than two** possible outcomes, a single \`if-else\` is not enough. That is where the \`elif\` (short for "else if") chain comes in. The mental model is "first match wins": Python checks conditions top to bottom, runs the first \`True\` branch, and skips the rest, so ordering matters. A common pitfall is placing a broad condition before a more specific one (e.g., checking \`>= 60\` before \`>= 90\`), which makes the specific branch unreachable.

## Syntax

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

## Grade classifier

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

## Temperature bands

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

## User input with elif

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

## Step-by-step evaluation

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

> [!WARNING]
> Order matters. If you wrote \`if score >= 60\` first, every score of 60+ would be caught there and the \`>= 90\` branch would never run. Put the most specific / highest-priority conditions first.

## Practical Example: Loan Eligibility Checker

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
> Use \`if\` when you have one possible action. Use \`if-else\` when you have two paths. Use \`if-elif-else\` when you have three or more paths that are mutually exclusive.`,
  objectives: [
    "Use if-elif-else to handle three or more mutually exclusive outcomes.",
    "Understand that only the first matching branch runs.",
    "Order conditions correctly so specific cases are not shadowed.",
    "Build a multi-branch decision system with a final else catch-all."
  ],
  difficulty: "beginner",
  xpReward: 65,
};
