export const stringMethodsModifyLesson = {
  title: "String Methods - Replace, Split & Join",
  slug: "string-methods-modify",
  content: `# String Methods - Replace, Split & Join

These are some of the most frequently used string methods. They let you transform strings, break them into pieces, and combine them back together.

## replace() - Replace Substrings

\`replace()\` returns a new string with all occurrences of a substring replaced with another.

### Syntax

\`\`\`python
string.replace(old, new)
string.replace(old, new, count)  # Replace only 'count' occurrences
\`\`\`

### Basic Usage

\`\`\`python
text = "Hello, World!"

new_text = text.replace("World", "Python")
print(new_text)   # Output: Hello, Python!
print(text)       # Output: Hello, World!  (original unchanged)
\`\`\`

\`\`\`python
# Replace a character
text = "Hello World"
print(text.replace(" ", "_"))    # Output: Hello_World
print(text.replace(" ", "-"))    # Output: Hello-World
print(text.replace("l", "L"))    # Output: HeLLo WorLd  (all 'l' replaced)
\`\`\`

### Replacing Limited Occurrences

\`\`\`python
text = "aabababa"

print(text.replace("a", "X"))       # Output: XXbXbXbX  (all replaced)
print(text.replace("a", "X", 2))    # Output: XXbababa  (only first 2)
print(text.replace("a", "X", 1))    # Output: Xabababa  (only first 1)
\`\`\`

### Practical replace() Examples

\`\`\`python
# Remove all spaces
sentence = "Hello World Python"
no_spaces = sentence.replace(" ", "")
print(no_spaces)   # Output: HelloWorldPython

# Format phone numbers
phone = "123-456-7890"
digits_only = phone.replace("-", "")
print(digits_only)  # Output: 1234567890

# Clean up a string
messy = "This   has   extra   spaces"
cleaner = messy.replace("   ", " ")
print(cleaner)    # Output: This has extra spaces

# Censor a word
text = "I love cats and cats are awesome"
censored = text.replace("cats", "***")
print(censored)   # Output: I love *** and *** are awesome
\`\`\`

\`\`\`python
# Simple template system
template = "Dear [NAME], your order [ORDER_ID] has been shipped."

name = "Alice"
order_id = "ORD-12345"

message = template.replace("[NAME]", name).replace("[ORDER_ID]", order_id)
print(message)
# Output: Dear Alice, your order ORD-12345 has been shipped.
\`\`\`

## split() - Split a String into a List

\`split()\` breaks a string into a **list of substrings** based on a separator.

### Syntax

\`\`\`python
string.split()                # Split on any whitespace
string.split(separator)       # Split on specific separator
string.split(separator, maxsplit)  # Split at most 'maxsplit' times
\`\`\`

### Basic Usage

\`\`\`python
sentence = "Hello World Python"

words = sentence.split()
print(words)    # Output: ['Hello', 'World', 'Python']
print(type(words))  # Output: <class 'list'>
\`\`\`

\`\`\`python
# Split on specific separator
csv_line = "Alice,25,New York,Engineer"
parts = csv_line.split(",")
print(parts)
# Output: ['Alice', '25', 'New York', 'Engineer']

name, age, city, job = csv_line.split(",")
print(f"Name: {name}")    # Output: Name: Alice
print(f"Age: {age}")      # Output: Age: 25
print(f"City: {city}")    # Output: City: New York
print(f"Job: {job}")      # Output: Job: Engineer
\`\`\`

\`\`\`python
# Split on dash
date = "2024-01-15"
parts = date.split("-")
print(parts)              # Output: ['2024', '01', '15']

year, month, day = date.split("-")
print(f"Year: {year}, Month: {month}, Day: {day}")
\`\`\`

### split() with No Arguments

When called with no argument, it splits on **any whitespace** (spaces, tabs, newlines) and also removes extra spaces:

\`\`\`python
text = "  Hello   World   Python  "
print(text.split())       # Output: ['Hello', 'World', 'Python']
# Handles multiple spaces and leading/trailing spaces

text2 = "Hello\\tWorld\\nPython"
print(text2.split())      # Output: ['Hello', 'World', 'Python']
\`\`\`

### split() with maxsplit

\`\`\`python
text = "one:two:three:four:five"

print(text.split(":"))         # Output: ['one', 'two', 'three', 'four', 'five']
print(text.split(":", 2))      # Output: ['one', 'two', 'three:four:five']
print(text.split(":", 1))      # Output: ['one', 'two:three:four:five']
\`\`\`

### rsplit() - Split from the Right

\`\`\`python
text = "one:two:three:four:five"

print(text.rsplit(":", 2))    # Output: ['one:two:three', 'four', 'five']
# Splits from the right, max 2 splits
\`\`\`

### splitlines() - Split on Line Breaks

\`\`\`python
text = "Line 1\\nLine 2\\nLine 3\\nLine 4"
lines = text.splitlines()
print(lines)
# Output: ['Line 1', 'Line 2', 'Line 3', 'Line 4']

for i, line in enumerate(lines, 1):
    print(f"Line {i}: {line}")
\`\`\`

## join() - Join a List into a String

\`join()\` is the **opposite of split()**. It combines a list of strings into a single string, with a separator between each item.

### Syntax

\`\`\`python
separator.join(iterable)
\`\`\`

> [!NOTE]
> The syntax is slightly unusual - you call \`join()\` on the **separator string**, not the list. This is a common point of confusion for beginners.

### Basic Usage

\`\`\`python
words = ["Hello", "World", "Python"]

# Join with space
result = " ".join(words)
print(result)   # Output: Hello World Python

# Join with comma
result = ", ".join(words)
print(result)   # Output: Hello, World, Python

# Join with dash
result = "-".join(words)
print(result)   # Output: Hello-World-Python

# Join with nothing (no separator)
result = "".join(words)
print(result)   # Output: HelloWorldPython
\`\`\`

### join() with Characters

\`\`\`python
chars = ["P", "y", "t", "h", "o", "n"]
print("".join(chars))     # Output: Python
print("-".join(chars))    # Output: P-y-t-h-o-n
print(" ".join(chars))    # Output: P y t h o n
\`\`\`

### split() and join() Together

These two methods are often used together to process text:

\`\`\`python
# Remove extra spaces from a sentence
messy = "  Hello    World   Python  "
words = messy.split()          # ['Hello', 'World', 'Python']
clean = " ".join(words)        # 'Hello World Python'
print(clean)   # Output: Hello World Python
\`\`\`

\`\`\`python
# Convert a CSV line to a formatted display
csv_data = "Alice,25,New York,Engineer"
parts = csv_data.split(",")
formatted = " | ".join(parts)
print(formatted)   # Output: Alice | 25 | New York | Engineer
\`\`\`

\`\`\`python
# Reverse words in a sentence
sentence = "Hello World Python"
words = sentence.split()          # ['Hello', 'World', 'Python']
words.reverse()                   # ['Python', 'World', 'Hello']
reversed_sentence = " ".join(words)
print(reversed_sentence)   # Output: Python World Hello
\`\`\`

\`\`\`python
# Create a URL slug from a title
title = "How to Learn Python Programming"
slug = title.lower().replace(",", "").replace("!", "").split()
url_slug = "-".join(slug)
print(url_slug)   # Output: how-to-learn-python-programming
\`\`\`

## Practical Example: CSV Processor

\`\`\`python
# Process CSV-like data
data = """name,age,city,score
Alice,25,New York,88
Bob,30,London,92
Charlie,22,Paris,75
Diana,28,Tokyo,95"""

lines = data.splitlines()
header = lines[0].split(",")

print("=" * 45)
print(f"{header[0]:<10} {header[1]:<6} {header[2]:<12} {header[3]}")
print("=" * 45)

students = []
for line in lines[1:]:
    parts = line.split(",")
    students.append(parts)
    name, age, city, score = parts
    print(f"{name:<10} {age:<6} {city:<12} {score}")

print("=" * 45)

# Calculate average score
scores = [int(s[3]) for s in students]
avg = sum(scores) / len(scores)
print(f"Average score: {avg:.1f}")
\`\`\`

Output:
\`\`\`
=============================================
name       age    city         score
=============================================
Alice      25     New York     88
Bob        30     London       92
Charlie    22     Paris        75
Diana      28     Tokyo        95
=============================================
Average score: 87.5
\`\`\`

## Practical Example: Text Word Counter

\`\`\`python
text = """
Python is a high-level programming language.
Python is easy to learn and very powerful.
Python is used in web development, data science, and automation.
"""

# Clean and split
words = text.lower().replace(".", "").replace(",", "").split()

# Count each word
word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

# Sort by count
sorted_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)

print("Top 5 most frequent words:")
for word, count in sorted_words[:5]:
    print(f"  '{word}': {count} times")
\`\`\`

Output:
\`\`\`
Top 5 most frequent words:
  'python': 3 times
  'is': 3 times
  'and': 2 times
  'a': 1 times
  'high-level': 1 times
\`\`\`

> [!TIP]
> The combination of \`split()\` and \`join()\` is extremely powerful for text processing. Remember: \`split()\` turns a string into a list, and \`join()\` turns a list back into a string. Also note that \`join()\` is called on the separator, not the list: \`" ".join(words)\`, not \`words.join(" ")\`.`,
  objectives: [
    "Use replace() to substitute substrings in a string.",
    "Use split() to break a string into a list of parts.",
    "Use join() to combine a list of strings into one string.",
    "Understand that join() is called on the separator string.",
    "Combine split() and join() for powerful text transformations."
  ],
  difficulty: "beginner",
  xpReward: 70,
};