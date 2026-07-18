export const ternaryOperatorLesson = {
  title: "The Ternary Operator",
  slug: "ternary-operator",
  content: `# The Ternary Operator (Conditional Expression)

The ternary operator is a **one-line shortcut** for a simple \`if-else\` statement. It is ideal for assigning a value based on a condition. Unlike a normal \`if-else\` statement, the ternary is an *expression* that **produces a value** you can assign, return, or print directly — "pick one of two values based on a test, in a single line." The pitfall is overusing it: once a branch needs more than one action or real work, a normal \`if-else\` is clearer, and stacked/nested ternaries quickly become unreadable.

## Syntax

\`\`\`python
value = value_if_true if condition else value_if_false
\`\`\`

## Replacing a simple if-else

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

## Inline in a print

\`\`\`python
number = 7
result = "even" if number % 2 == 0 else "odd"
print(f"{number} is {result}.")
# Output: 7 is odd.
\`\`\`

\`\`\`python
score = 75
print("Pass" if score >= 50 else "Fail")
# Output: Pass
\`\`\`

## Picking a message

\`\`\`python
temperature = 35
advice = "Stay cool!" if temperature > 30 else "Enjoy the weather!"
print(advice)   # Output: Stay cool!
\`\`\`

## As a return value

\`\`\`python
def classify(n):
    return "positive" if n > 0 else ("zero" if n == 0 else "negative")

print(classify(5))    # positive
print(classify(0))    # zero
print(classify(-3))   # negative
\`\`\`

## Nested ternary (use sparingly)

\`\`\`python
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
print(grade)    # Output: B
# Better to use if-elif-else for multiple conditions
\`\`\`

> [!WARNING]
> Stacking ternaries (like the grade example above) hurts readability. For three or more outcomes, use a plain \`if-elif-else\` chain — reserve the ternary for genuinely simple one-line choices.

> [!TIP]
> Use the ternary operator for concise, single-value assignments and returns. If a branch needs to do more than pick a value, write a normal \`if-else\` instead.`,
  objectives: [
    "Write a ternary (conditional expression) to pick one of two values in one line.",
    "Use a ternary inside print, assignment, and return statements.",
    "Recognize when a plain if-else is clearer than a ternary.",
    "Avoid hard-to-read nested ternaries for multiple outcomes."
  ],
  difficulty: "beginner",
  xpReward: 55,
};
