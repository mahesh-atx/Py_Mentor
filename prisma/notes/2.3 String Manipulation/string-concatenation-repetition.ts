export const stringConcatenationRepetitionLesson = {
  title: "String Concatenation & Repetition",
  slug: "string-concatenation-repetition",
  content: `# String Concatenation & Repetition

Concatenation and repetition are operators that build a brand-new string by copying characters from their inputs; they never grow or shrink an existing string because strings are immutable, so each + must allocate fresh memory while * is shorthand for repeated concatenation. The pitfall is trying to add a string directly to a number (a TypeError), and building a large string with += in a loop is slow since every step makes another full copy — join() is preferred for many pieces.

## String Concatenation

**Concatenation** means joining two or more strings together into one. In Python, you use the \`+\` operator to concatenate strings.

### Basic Concatenation

\`\`\`python
first = "Hello"
second = "World"

result = first + second
print(result)   # Output: HelloWorld
\`\`\`

Notice there is no space - concatenation joins them exactly as they are. Add spaces manually:

\`\`\`python
result = first + " " + second
print(result)   # Output: Hello World
\`\`\`

\`\`\`python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)   # Output: John Doe
\`\`\`

### Concatenating Multiple Strings

\`\`\`python
greeting = "Hello"
name = "Alice"
punctuation = "!"

message = greeting + ", " + name + punctuation
print(message)   # Output: Hello, Alice!
\`\`\`

\`\`\`python
# Building a sentence
subject = "Python"
verb = "is"
adjective = "awesome"

sentence = subject + " " + verb + " " + adjective + "!"
print(sentence)   # Output: Python is awesome!
\`\`\`

### Concatenation with += 

\`\`\`python
message = "Hello"
message += ", "
message += "World"
message += "!"
print(message)   # Output: Hello, World!
\`\`\`

\`\`\`python
# Building a string in a loop
result = ""
words = ["Python", "is", "great"]

for word in words:
    result += word + " "

print(result.strip())   # Output: Python is great
\`\`\`

### You Cannot Concatenate Strings with Numbers Directly

\`\`\`python
age = 25
# This causes a TypeError:
# message = "I am " + age + " years old."

# Fix 1: Convert to string first
message = "I am " + str(age) + " years old."
print(message)   # Output: I am 25 years old.

# Fix 2: Use f-string (better approach)
message = f"I am {age} years old."
print(message)   # Output: I am 25 years old.
\`\`\`

### Performance Note - Prefer join() for Many Strings

\`\`\`python
# Slow approach - creates many intermediate strings
words = ["one", "two", "three", "four", "five"]
result = ""
for word in words:
    result += word + " "    # Creates a new string each time

# Better approach - use join()
result = " ".join(words)    # Much more efficient
print(result)   # Output: one two three four five
\`\`\`

## String Repetition

The \`*\` operator repeats a string a specified number of times.

### Basic Repetition

\`\`\`python
print("ha" * 3)      # Output: hahaha
print("ab" * 4)      # Output: abababab
print("*" * 10)      # Output: **********
print("=-" * 5)      # Output: =-=-=-=-=-

word = "Python"
print(word * 2)      # Output: PythonPython
\`\`\`

### Repetition for Formatting

\`\`\`python
# Creating dividers and borders
print("=" * 40)
print("      Welcome to Python!")
print("=" * 40)
\`\`\`

Output:
\`\`\`
========================================
      Welcome to Python!
========================================
\`\`\`

\`\`\`python
# Creating a table header
print("-" * 50)
print(f"{'Name':<15} {'Age':>5} {'City':<20}")
print("-" * 50)
\`\`\`

\`\`\`python
# Loading bar simulation
import time

print("Loading:", end=" ")
for i in range(1, 11):
    bar = "[" + "#" * i + " " * (10 - i) + "]"
    print(f"\\r{bar} {i * 10}%", end="")
    time.sleep(0.1)
print(" Done!")
\`\`\`

### Repetition with Variables

\`\`\`python
n = 5
print("*" * n)        # Output: *****
print("abc" * n)      # Output: abcabcabcabcabc

# Create a box
width = 20
print("*" * width)
print("*" + " " * (width - 2) + "*")
print("*" + " " * (width - 2) + "*")
print("*" * width)
\`\`\`

Output:
\`\`\`
********************
*                  *
*                  *
********************
\`\`\`

### Repetition with *= 

\`\`\`python
line = "-"
line *= 30
print(line)   # Output: ------------------------------

pattern = "ab"
pattern *= 5
print(pattern)   # Output: ababababab
\`\`\`

## Comparison: Concatenation vs f-strings

Both concatenation and f-strings combine strings with values. f-strings are generally preferred:

\`\`\`python
name = "Alice"
age = 25
city = "New York"

# Concatenation (verbose, error-prone)
info = "Name: " + name + ", Age: " + str(age) + ", City: " + city
print(info)

# f-string (cleaner, recommended)
info = f"Name: {name}, Age: {age}, City: {city}"
print(info)

# Both output:
# Name: Alice, Age: 25, City: New York
\`\`\`

## Practical Example: Building a Report

\`\`\`python
def create_report(title, data):
    width = 50
    separator = "=" * width

    # Header
    report = separator + "\\n"
    report += title.center(width) + "\\n"
    report += separator + "\\n"

    # Data rows
    for label, value in data.items():
        row = f"{label:<25} : {str(value):>20}"
        report += row + "\\n"

    # Footer
    report += separator
    return report

# Student report card
student_data = {
    "Student Name"  : "Alice Johnson",
    "Student ID"    : "STU-2024-001",
    "Mathematics"   : "95/100",
    "Science"       : "88/100",
    "English"       : "92/100",
    "Average Score" : "91.67%",
    "Grade"         : "A",
    "Status"        : "PASS"
}

print(create_report("STUDENT REPORT CARD", student_data))
\`\`\`

Output:
\`\`\`
==================================================
             STUDENT REPORT CARD
==================================================
Student Name              :            Alice Johnson
Student ID                :          STU-2024-001
Mathematics               :               95/100
Science                   :               88/100
English                   :               92/100
Average Score             :               91.67%
Grade                     :                    A
Status                    :                 PASS
==================================================
\`\`\`

## Practical Example: Password Masking

\`\`\`python
def mask_password(password):
    if len(password) <= 2:
        return "*" * len(password)

    # Show first and last character, mask the rest
    return password[0] + "*" * (len(password) - 2) + password[-1]

passwords = ["secret", "hello", "p", "ab", "mypassword123"]
for pwd in passwords:
    print(f"Original: {pwd:<15} Masked: {mask_password(pwd)}")
\`\`\`

Output:
\`\`\`
Original: secret          Masked: s****t
Original: hello           Masked: h***o
Original: p               Masked: *
Original: ab              Masked: **
Original: mypassword123   Masked: m***********3
\`\`\`

> [!TIP]
> Use \`+\` for concatenating a few strings. Use \`join()\` when combining many strings in a loop for better performance. Use \`*\` for repetition to create dividers, borders, and patterns cleanly.`,
  objectives: [
    "Use + to concatenate strings together.",
    "Use += to build up a string incrementally.",
    "Use * to repeat a string a given number of times.",
    "Understand why you cannot concatenate strings with numbers directly.",
    "Know when to use join() instead of + for performance."
  ],
  difficulty: "beginner",
  xpReward: 55,
};