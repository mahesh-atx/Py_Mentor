export const workingWithCsvLesson = {
  title: "Working with CSV Files",
  slug: "working-with-csv",
  content: `# Working with CSV Files

CSV represents a table as plain text where each line is a row and columns are separated by a delimiter such as a comma, but real-world values can contain that very separator, so Python's csv module treats the file as a parser that understands quoting rules instead of naively splitting on commas. The pitfall is hand-rolling your own CSV parser with string splitting, which breaks the moment a value contains a comma, a quote, or a line break — and remember to open CSV files with newline="".

## What is CSV?

**CSV** (Comma-Separated Values) is one of the most common formats for storing tabular data. It is plain text where each row is a line and columns are separated by commas (or other delimiters).

\`\`\`
name,age,city,score
Alice,25,London,88
Bob,30,Paris,72
Charlie,22,Tokyo,95
\`\`\`

Python's built-in \`csv\` module handles CSV files properly, dealing with edge cases like:
- Values containing commas: \`"Smith, John"\`
- Values containing quotes: \`"He said ""hello"""\`
- Multiline values inside quotes

\`\`\`python
import csv
\`\`\`

## Reading CSV Files

### csv.reader - Basic Reading

\`csv.reader\` returns each row as a **list of strings**.

\`\`\`python
import csv

with open("students.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
        # ['Alice', '25', 'London', '88']
        # ['Bob', '30', 'Paris', '72']
\`\`\`

> [!NOTE]
> Always use \`newline=""\` when opening CSV files. Without it, Python might add extra blank lines on Windows.

\`\`\`python
import csv

# Skip the header row
with open("students.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.reader(file)

    header = next(reader)   # Read and skip the first row (header)
    print(f"Columns: {header}")

    for row in reader:
        name, age, city, score = row
        print(f"{name} from {city}: score {score}")
\`\`\`

Output:
\`\`\`
Columns: ['name', 'age', 'city', 'score']
Alice from London: score 88
Bob from Paris: score 72
Charlie from Tokyo: score 95
\`\`\`

### csv.DictReader - Read Rows as Dictionaries

\`DictReader\` uses the first row as keys and returns each row as a **dictionary**. Much more readable!

\`\`\`python
import csv

with open("students.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)   # Automatically uses first row as header

    for row in reader:
        print(row)
        # {'name': 'Alice', 'age': '25', 'city': 'London', 'score': '88'}
        # Access by column name - much cleaner!
        print(f"Name: {row['name']}, Score: {row['score']}")
\`\`\`

\`\`\`python
import csv

# Build a list of dicts from CSV
with open("students.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    students = list(reader)   # Convert to list

print(f"Total students: {len(students)}")

# Now work with it
for student in students:
    score = int(student["score"])
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"{student['name']}: {score} ({grade})")
\`\`\`

## Writing CSV Files

### csv.writer - Write Rows

\`\`\`python
import csv

# Data to write
students = [
    ["name", "age", "city", "score"],   # Header
    ["Alice", 25, "London", 88],
    ["Bob", 30, "Paris", 72],
    ["Charlie", 22, "Tokyo", 95],
]

with open("output.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(students)   # Write all rows at once

# OR write one row at a time
with open("output.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["name", "age", "score"])   # Write single row
    writer.writerow(["Alice", 25, 88])
    writer.writerow(["Bob", 30, 72])
\`\`\`

### csv.DictWriter - Write from Dictionaries

\`\`\`python
import csv

students = [
    {"name": "Alice", "age": 25, "city": "London", "score": 88},
    {"name": "Bob",   "age": 30, "city": "Paris",  "score": 72},
    {"name": "Charlie","age": 22,"city": "Tokyo",  "score": 95},
]

fieldnames = ["name", "age", "city", "score"]

with open("students.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()     # Write the header row automatically
    writer.writerows(students)   # Write all dict rows
\`\`\`

## Custom Delimiters and Dialects

\`\`\`python
import csv

# TSV - Tab Separated Values
with open("data.tsv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file, delimiter="\\t")   # Tab separator
    writer.writerow(["name", "age", "score"])
    writer.writerow(["Alice", 25, 88])

# Read TSV
with open("data.tsv", "r", newline="", encoding="utf-8") as file:
    reader = csv.reader(file, delimiter="\\t")
    for row in reader:
        print(row)

# Semicolon delimiter (common in European locales)
with open("data.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file, delimiter=";")
    writer.writerow(["name", "score"])
    writer.writerow(["Alice", 88])

# Quote characters
with open("data.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file, quotechar="'", quoting=csv.QUOTE_ALL)
    writer.writerow(["name", "score"])
    writer.writerow(["Alice Smith", 88])
    # 'name','score'
    # 'Alice Smith','88'
\`\`\`

## Handling Edge Cases

\`\`\`python
import csv

# Data with special cases
data = [
    ["name", "bio", "score"],
    ["Alice", "Loves Python, AI", 88],        # Comma in value
    ['Bob', 'Said "Hello"', 72],              # Quote in value
    ["Charlie", "Line 1\\nLine 2", 95],         # Newline in value
]

with open("special.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# csv.writer automatically handles quoting:
# name,bio,score
# Alice,"Loves Python, AI",88
# Bob,"Said ""Hello""",72
# Charlie,"Line 1\\nLine 2",95

# DictReader handles them correctly when reading
with open("special.csv", "r", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"Name: {row['name']}, Bio: {row['bio']!r}")
\`\`\`

## Practical Example: Student Grade Manager

\`\`\`python
import csv
import os
from datetime import datetime

GRADES_FILE = "student_grades.csv"
FIELDS = ["student_id", "name", "subject", "score", "date"]

def initialize_grades_file():
    """Create the grades CSV file with headers if it doesn't exist."""
    if not os.path.exists(GRADES_FILE):
        with open(GRADES_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDS)
            writer.writeheader()
        print(f"Created {GRADES_FILE}")

def add_grade(student_id, name, subject, score):
    """Append a new grade record."""
    record = {
        "student_id": student_id,
        "name": name,
        "subject": subject,
        "score": score,
        "date": datetime.now().strftime("%Y-%m-%d")
    }
    with open(GRADES_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writerow(record)

def get_all_grades():
    """Read all grade records."""
    with open(GRADES_FILE, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return list(reader)

def get_student_report(student_name):
    """Get report for a specific student."""
    grades = get_all_grades()
    student_grades = [g for g in grades if g["name"] == student_name]

    if not student_grades:
        return None

    scores = [int(g["score"]) for g in student_grades]
    return {
        "name": student_name,
        "grades": student_grades,
        "average": sum(scores) / len(scores),
        "highest": max(scores),
        "lowest": min(scores),
    }

def export_summary(output_file):
    """Export a summary CSV grouped by student."""
    grades = get_all_grades()

    # Group by student
    students = {}
    for grade in grades:
        name = grade["name"]
        if name not in students:
            students[name] = []
        students[name].append(int(grade["score"]))

    # Write summary
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Name", "Count", "Average", "Highest", "Lowest"])
        for name, scores in sorted(students.items()):
            writer.writerow([
                name,
                len(scores),
                round(sum(scores) / len(scores), 1),
                max(scores),
                min(scores)
            ])
    print(f"Summary exported to {output_file}")

# Demo
initialize_grades_file()

add_grade("S001", "Alice", "Math", 92)
add_grade("S002", "Bob", "Math", 78)
add_grade("S001", "Alice", "Science", 88)
add_grade("S003", "Charlie", "Math", 95)
add_grade("S002", "Bob", "Science", 65)
add_grade("S001", "Alice", "English", 90)

print("\\nAll Grades:")
for grade in get_all_grades():
    print(f"  {grade['name']}: {grade['subject']} = {grade['score']}")

report = get_student_report("Alice")
if report:
    print(f"\\nAlice's Report:")
    print(f"  Subjects: {len(report['grades'])}")
    print(f"  Average:  {report['average']:.1f}")
    print(f"  Highest:  {report['highest']}")
    print(f"  Lowest:   {report['lowest']}")

export_summary("grade_summary.csv")
\`\`\`

Output:
\`\`\`
Created student_grades.csv

All Grades:
  Alice: Math = 92
  Bob: Math = 78
  Alice: Science = 88
  Charlie: Math = 95
  Bob: Science = 65
  Alice: English = 90

Alice's Report:
  Subjects: 3
  Average:  90.0
  Highest:  92
  Lowest:   88

Summary exported to grade_summary.csv
\`\`\`

> [!TIP]
> Always use \`newline=""\` when opening CSV files to prevent double newlines on Windows. Use \`DictReader\` for reading (access columns by name) and \`DictWriter\` for writing (provide fieldnames). The csv module handles all quoting, escaping, and special character issues automatically - never try to parse CSV manually with \`split(",")\`.`,
  objectives: [
    "Use csv.reader to read CSV files row by row as lists.",
    "Use csv.DictReader to read CSV rows as dictionaries.",
    "Use csv.writer and csv.DictWriter to write CSV files.",
    "Handle custom delimiters like tabs and semicolons.",
    "Understand why csv.reader handles edge cases better than split(',')."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};