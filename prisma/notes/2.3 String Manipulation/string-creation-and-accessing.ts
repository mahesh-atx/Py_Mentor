export const stringCreationLesson = {
  title: "String Creation & Accessing Characters",
  slug: "string-creation-and-accessing",
  content: `# String Creation & Accessing Characters

## What is a String?

A string is a **sequence of characters**. Characters can be letters, numbers, symbols, spaces - anything you can type on a keyboard. Strings are used to represent text in Python.

\`\`\`python
name = "Alice"
message = "Hello, World!"
sentence = "Python is awesome!"
\`\`\`

## Creating Strings

### Single Quotes

\`\`\`python
name = 'Alice'
city = 'New York'
print(name)   # Output: Alice
print(city)   # Output: New York
\`\`\`

### Double Quotes

\`\`\`python
name = "Alice"
city = "New York"
print(name)   # Output: Alice
\`\`\`

Single and double quotes work identically. Use whichever you prefer, but be consistent.

When to use one over the other:
\`\`\`python
# Use double quotes when your string contains a single quote
message = "It's a beautiful day!"
print(message)   # Output: It's a beautiful day!

# Use single quotes when your string contains double quotes
quote = 'He said "Hello!"'
print(quote)   # Output: He said "Hello!"
\`\`\`

### Triple Quotes (Multi-line Strings)

Triple quotes let you create strings that span multiple lines:

\`\`\`python
# Triple double quotes
paragraph = """
This is line one.
This is line two.
This is line three.
"""
print(paragraph)

# Triple single quotes
poem = '''
Roses are red,
Violets are blue,
Python is great,
And so are you!
'''
print(poem)
\`\`\`

Output:
\`\`\`

This is line one.
This is line two.
This is line three.

\`\`\`

### Empty String

\`\`\`python
empty = ""
also_empty = ''
triple_empty = """"""

print(len(empty))   # Output: 0
print(empty == "")  # Output: True
\`\`\`

### String from Other Types

\`\`\`python
age = 25
price = 9.99
is_active = True

age_str = str(age)
price_str = str(price)
active_str = str(is_active)

print(age_str)     # Output: 25
print(price_str)   # Output: 9.99
print(active_str)  # Output: True

print(type(age_str))  # Output: <class 'str'>
\`\`\`

## How Strings are Stored (Indexing)

Python stores strings as a sequence where every character has a **position number** called an **index**. 

The index starts at **0** (not 1) for the first character.

\`\`\`
String:   P  y  t  h  o  n
Index:    0  1  2  3  4  5
\`\`\`

\`\`\`python
word = "Python"
#        0123456 - indices
\`\`\`

## Accessing Individual Characters

Use square brackets \`[]\` with the index to get a single character:

\`\`\`python
word = "Python"

print(word[0])   # Output: P  (first character)
print(word[1])   # Output: y
print(word[2])   # Output: t
print(word[3])   # Output: h
print(word[4])   # Output: o
print(word[5])   # Output: n  (last character)
\`\`\`

### Negative Indexing

Python also supports **negative indices**, which count from the END of the string:

\`\`\`
String:    P   y   t   h   o   n
Index:     0   1   2   3   4   5
Neg Index: -6  -5  -4  -3  -2  -1
\`\`\`

\`\`\`python
word = "Python"

print(word[-1])   # Output: n  (last character)
print(word[-2])   # Output: o
print(word[-3])   # Output: h
print(word[-6])   # Output: P  (first character)
\`\`\`

Negative indexing is very useful when you want the last few characters without knowing the string length.

\`\`\`python
filename = "report_2024.pdf"

# Get the file extension (last 4 characters)
extension = filename[-4:]
print(extension)   # Output: .pdf

# Get the last character
last_char = filename[-1]
print(last_char)   # Output: f
\`\`\`

### Index Out of Range Error

Accessing an index that does not exist causes an \`IndexError\`:

\`\`\`python
word = "Python"   # Indices 0 to 5

print(word[6])    # IndexError: string index out of range
print(word[-7])   # IndexError: string index out of range
\`\`\`

Always make sure your index is within bounds:
\`\`\`python
word = "Python"
index = 2

if 0 <= index < len(word):
    print(word[index])   # Output: t
else:
    print("Index out of range!")
\`\`\`

## The len() Function

\`len()\` returns the total number of characters in a string:

\`\`\`python
print(len("Python"))         # Output: 6
print(len("Hello, World!"))  # Output: 13
print(len(""))               # Output: 0
print(len("a"))              # Output: 1
print(len("  spaces  "))     # Output: 10 (spaces count!)
\`\`\`

\`\`\`python
word = "Programming"
print(f"'{word}' has {len(word)} characters.")
# Output: 'Programming' has 11 characters.

# Access the last character safely using len()
last = word[len(word) - 1]
print(last)   # Output: g
# Simpler way: word[-1]
\`\`\`

## Iterating Through a String

You can use a \`for\` loop to go through each character one by one:

\`\`\`python
word = "Hello"

for character in word:
    print(character)
\`\`\`

Output:
\`\`\`
H
e
l
l
o
\`\`\`

\`\`\`python
# Count how many times 'l' appears
word = "Hello, World!"
count = 0

for char in word:
    if char == 'l':
        count += 1

print(f"'l' appears {count} times.")
# Output: 'l' appears 3 times.
\`\`\`

\`\`\`python
# Print each character with its index
word = "Python"

for index, char in enumerate(word):
    print(f"Index {index}: {char}")
\`\`\`

Output:
\`\`\`
Index 0: P
Index 1: y
Index 2: t
Index 3: h
Index 4: o
Index 5: n
\`\`\`

## Checking if a String Contains a Character

Use the \`in\` operator:

\`\`\`python
word = "Python"

print("P" in word)      # Output: True
print("z" in word)      # Output: False
print("tho" in word)    # Output: True  (can check substrings too)
print("xyz" in word)    # Output: False
\`\`\`

\`\`\`python
email = "alice@example.com"

if "@" in email:
    print("Valid email format.")
else:
    print("Missing @ symbol.")
# Output: Valid email format.
\`\`\`

## Practical Example: Analyzing a String

\`\`\`python
text = input("Enter a sentence: ")

print(f"\\nAnalysis of: '{text}'")
print(f"Length          : {len(text)} characters")
print(f"First character : '{text[0]}'")
print(f"Last character  : '{text[-1]}'")

# Count vowels
vowels = "aeiouAEIOU"
vowel_count = 0
for char in text:
    if char in vowels:
        vowel_count += 1

print(f"Vowel count     : {vowel_count}")

# Count spaces
space_count = text.count(" ")
print(f"Word count      : {space_count + 1}")
\`\`\`

Sample run:
\`\`\`
Enter a sentence: Hello World

Analysis of: 'Hello World'
Length          : 11 characters
First character : 'H'
Last character  : 'd'
Vowel count     : 3
Word count      : 2
\`\`\`

> [!TIP]
> Remember that string indices start at 0, not 1. The last valid index is always \`len(string) - 1\`. Use negative indices like \`[-1]\` to easily access characters from the end without calculating the length.`,
  objectives: [
    "Create strings using single, double, and triple quotes.",
    "Understand how Python indexes each character in a string.",
    "Access individual characters using positive and negative indices.",
    "Use len() to get the length of a string.",
    "Iterate through a string using a for loop."
  ],
  difficulty: "beginner",
  xpReward: 60,
};