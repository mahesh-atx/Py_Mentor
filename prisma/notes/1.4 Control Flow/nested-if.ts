export const nestedIfLesson = {
  title: "Nested Conditional Statements",
  slug: "nested-if",
  content: `# Nested Conditional Statements

You can place \`if\` statements **inside** other \`if\` statements. This is called **nesting**, and it is used when one decision depends on the outcome of another. Think of it as a funnel: the inner block is only considered because the outer condition already passed, so effectively "both conditions must be true." The main pitfall is nesting too deeply (three or more levels), which makes code hard to read and easy to get wrong — at that point you should usually combine conditions with \`and\`/\`or\` or restructure your logic.

## Syntax

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

## Basic example: age AND ID

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

## Authenticated login

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

## Number classification with nesting

\`\`\`python
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

## Nesting vs combined conditions

You can often avoid a level of nesting by combining conditions with \`and\`:

\`\`\`python
# Nested version
if age >= 18:
    if has_id:
        print("Access granted.")

# Equivalent, flatter version
if age >= 18 and has_id:
    print("Access granted.")
\`\`\`

Both are correct — prefer the flatter version when the inner block is short, and use nesting when each level needs its own distinct logic or messages.

> [!TIP]
> Avoid nesting more than 3 levels deep. If you find yourself going deeper, see whether you can merge conditions with \`and\`/\`or\` or extract the logic into a function.`,
  objectives: [
    "Put an if statement inside another if statement (nesting).",
    "Understand that nested blocks run only when all enclosing conditions are True.",
    "Indent nested blocks one level deeper than their parent.",
    "Know when to flatten nesting by combining conditions with and/or."
  ],
  difficulty: "beginner",
  xpReward: 60,
};
