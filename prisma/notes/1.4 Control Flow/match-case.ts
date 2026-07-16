export const matchCaseLesson = {
  title: "Match Statements (Structural Pattern Matching)",
  slug: "match-case",
  content: `# Match Statements (Structural Pattern Matching)

Introduced in Python 3.10, the \`match\` statement is a powerful way to branch on the **shape and content** of a value. It is like an upgraded \`if-elif-else\` that can also destructure data. The mental model is "pattern matching": you describe the form of the data you expect and Python runs the first \`case\` whose *structure* fits, rather than re-evaluating boolean conditions like \`if\`. A common pitfall is forgetting the final wildcard \`case _:\`, which leaves no branch to run when nothing else matches.

## Basic syntax

\`\`\`python
match value:
    case pattern1:
        # runs if value matches pattern1
    case pattern2:
        # runs if value matches pattern2
    case _:
        # wildcard: runs if nothing else matched
\`\`\`

## Matching literals

\`\`\`python
command = input("Enter a command: ").lower()

match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case "pause":
        print("Paused.")
    case _:
        print(f"Unknown command: {command}")
\`\`\`

## Matching multiple values with OR

\`\`\`python
day = "Saturday"

match day:
    case "Saturday" | "Sunday":
        print("It's the weekend!")
    case "Friday":
        print("Almost weekend!")
    case _:
        print("Just another weekday.")
# Output: It's the weekend!
\`\`\`

## Matching ranges with guards

You can add an \`if\` guard to a case for extra conditions:

\`\`\`python
score = 78

match score:
    case s if s >= 90:
        grade = "A"
    case s if s >= 80:
        grade = "B"
    case s if s >= 70:
        grade = "C"
    case s if s >= 60:
        grade = "D"
    case _:
        grade = "F"

print(grade)  # Output: C
\`\`\`

## Destructuring data structures

This is where \`match\` really shines — it can pull values out of lists, tuples, and dictionaries:

\`\`\`python
point = (3, 4)

match point:
    case (0, 0):
        print("Origin")
    case (x, 0):
        print(f"On x-axis at {x}")
    case (0, y):
        print(f"On y-axis at {y}")
    case (x, y):
        print(f"Point at ({x}, {y})")
# Output: Point at (3, 4)
\`\`\`

\`\`\`python
record = {"type": "user", "name": "Alice", "age": 25}

match record:
    case {"type": "user", "name": n}:
        print(f"User named {n}")
    case {"type": "admin"}:
        print("Administrator")
    case _:
        print("Unknown record type")
# Output: User named Alice
\`\`\`

## Matching classes

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)

match p:
    case Point(x=0, y=0):
        print("Origin")
    case Point(x=x, y=y):
        print(f"Point at ({x}, {y})")
# Output: Point at (1, 2)
\`\`\`

> [!NOTE]
> \`match\` requires Python 3.10+. If you are on an older version, use \`if-elif-else\` instead. Most online sandboxes and modern installations support it.

> [!TIP]
> Use \`match\` when you are branching on the *shape or value* of a single input — commands, status codes, or structured data. For general boolean logic, \`if-elif-else\` is still the right tool. Always include a \`case _:\` wildcard so something always matches.`,
  objectives: [
    "Use a match statement to branch on a value's patterns.",
    "Match literals and multiple values with the | (OR) pattern.",
    "Add if guards to case patterns for extra conditions.",
    "Destructure tuples, lists, and dicts inside case patterns.",
    "Use a case _ wildcard as the default catch-all."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};
