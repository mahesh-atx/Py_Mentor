export const stringIndexingSlicingLesson = {
  title: "String Indexing & Slicing",
  slug: "string-indexing-and-slicing",
  content: `# String Indexing & Slicing

You already know how to access a single character using an index. **Slicing** lets you extract a portion (substring) of a string by specifying a start and end position.

## Slicing Syntax

\`\`\`python
string[start : stop : step]
\`\`\`

- \`start\` - index where slice begins (inclusive, default is 0)
- \`stop\`  - index where slice ends (**exclusive** - not included)
- \`step\`  - how many characters to jump (default is 1)

## Basic Slicing

\`\`\`python
text = "Hello, World!"
#       0123456789...
\`\`\`

\`\`\`python
text = "Hello, World!"

print(text[0:5])    # Output: Hello   (index 0,1,2,3,4 - stops before 5)
print(text[7:12])   # Output: World   (index 7,8,9,10,11)
print(text[0:6])    # Output: Hello,  (includes the comma)
\`\`\`

### The stop Index is NOT Included

This is the most important rule of slicing:

\`\`\`python
word = "Python"
#       012345

print(word[0:3])   # Output: Pyt  (indices 0,1,2 - NOT 3)
print(word[2:5])   # Output: tho  (indices 2,3,4 - NOT 5)
print(word[1:4])   # Output: yth  (indices 1,2,3 - NOT 4)
\`\`\`

A helpful way to think about it:
\`\`\`
word = "Python"

[0:3] means "from position 0, take 3 characters"
P(0) y(1) t(2) | h(3) o(4) n(5)
                ^-- stop here (not included)
Result: "Pyt"
\`\`\`

## Omitting start or stop

\`\`\`python
text = "Hello, World!"

# Omit start - defaults to 0 (beginning)
print(text[:5])    # Output: Hello   (same as text[0:5])

# Omit stop - defaults to end of string
print(text[7:])    # Output: World!  (from index 7 to end)

# Omit both - returns entire string (copy)
print(text[:])     # Output: Hello, World!
\`\`\`

\`\`\`python
# Very common patterns
word = "Programming"

first_three = word[:3]      # "Pro"
last_four = word[-4:]       # "ming"
without_first = word[1:]    # "rogramming"
without_last = word[:-1]    # "Programmin"

print(first_three)    # Output: Pro
print(last_four)      # Output: ming
print(without_first)  # Output: rogramming
print(without_last)   # Output: Programmin
\`\`\`

## Slicing with Negative Indices

\`\`\`python
text = "Hello, World!"
#        0123456789012  (positive)
#       -13          -1 (negative)

print(text[-6:])      # Output: orld!   (last 6 characters)
print(text[-6:-1])    # Output: orld    (last 6, excluding last 1)
print(text[:-7])      # Output: Hello,  (everything except last 7)
\`\`\`

\`\`\`python
# Get file extension
filename = "document.pdf"
extension = filename[-3:]
print(extension)   # Output: pdf

# Get everything except extension
name = filename[:-4]
print(name)        # Output: document
\`\`\`

## Slicing with a Step

The third parameter \`step\` controls how many positions to jump:

\`\`\`python
text = "Hello, World!"

# Every 2nd character
print(text[::2])    # Output: Hlo ol!

# Every 3rd character
print(text[::3])    # Output: H, r!

# From index 0 to 10, every 2nd character
print(text[0:10:2]) # Output: Hlo o
\`\`\`

### Reversing a String with Step -1

The most famous slicing trick in Python:

\`\`\`python
text = "Hello"
reversed_text = text[::-1]
print(reversed_text)   # Output: olleH

word = "Python"
print(word[::-1])      # Output: nohtyP

sentence = "Hello, World!"
print(sentence[::-1])  # Output: !dlroW ,olleH
\`\`\`

\`\`\`python
# Check if a word is a palindrome (reads same forwards and backwards)
def is_palindrome(word):
    word = word.lower()
    return word == word[::-1]

print(is_palindrome("racecar"))  # Output: True
print(is_palindrome("hello"))    # Output: False
print(is_palindrome("level"))    # Output: True
print(is_palindrome("madam"))    # Output: True
\`\`\`

## Slicing Examples Table

\`\`\`
text = "Hello, World!"

Slice        Result          Explanation
---------    -------------   --------------------------
text[0:5]    "Hello"         Characters 0,1,2,3,4
text[7:12]   "World"         Characters 7,8,9,10,11
text[:5]     "Hello"         Start to index 5 (exclusive)
text[7:]     "World!"        Index 7 to end
text[:]      "Hello, World!" Entire string (copy)
text[-6:]    "orld!"         Last 6 characters
text[::2]    "Hlo ol!"       Every other character
text[::-1]   "!dlroW ,olleH" Reversed
text[0:10:3] "H, r"          Every 3rd from 0 to 10
\`\`\`

## Slicing Does Not Modify the Original

Slicing always **creates a new string**. The original string remains unchanged:

\`\`\`python
text = "Hello, World!"
portion = text[0:5]

print(portion)  # Output: Hello
print(text)     # Output: Hello, World!  (unchanged)
\`\`\`

## Practical Examples

### Extracting Parts of a Date

\`\`\`python
date = "2024-01-15"

year  = date[0:4]
month = date[5:7]
day   = date[8:10]

print(f"Year:  {year}")   # Output: Year:  2024
print(f"Month: {month}")  # Output: Month: 01
print(f"Day:   {day}")    # Output: Day:   15
\`\`\`

### Extracting Parts of an Email

\`\`\`python
email = "alice@example.com"

at_position = email.index("@")
username = email[:at_position]
domain = email[at_position + 1:]

print(f"Username: {username}")  # Output: Username: alice
print(f"Domain:   {domain}")    # Output: Domain:   example.com
\`\`\`

### Censoring a Credit Card Number

\`\`\`python
card_number = "1234567890123456"

# Show only last 4 digits
masked = "*" * 12 + card_number[-4:]
print(masked)   # Output: ************3456
\`\`\`

### Checking Prefix and Suffix

\`\`\`python
filename = "report_2024.xlsx"

# Check file type using slicing
if filename[-5:] == ".xlsx":
    print("This is an Excel file.")
elif filename[-4:] == ".pdf":
    print("This is a PDF file.")

# Check prefix
if filename[:7] == "report_":
    print("This is a report file.")
\`\`\`

### Reversing Words in a Sentence

\`\`\`python
sentence = "Hello World Python"
words = sentence.split()

reversed_sentence = " ".join(word[::-1] for word in words)
print(reversed_sentence)   # Output: olleH dlroW nohtyP
\`\`\`

## Comprehensive Example

\`\`\`python
text = "The quick brown fox jumps over the lazy dog"

print(f"Full text    : {text}")
print(f"First 3 chars: {text[:3]}")
print(f"Last 3 chars : {text[-3:]}")
print(f"Middle       : {text[10:25]}")
print(f"Every 5th    : {text[::5]}")
print(f"Reversed     : {text[::-1]}")
print(f"Length       : {len(text)}")
\`\`\`

Output:
\`\`\`
Full text    : The quick brown fox jumps over the lazy dog
First 3 chars: The
Last 3 chars : dog
Middle       : brown fox jump
Every 5th    : T ikrxuv h  o
Reversed     : god yzal eht revo spmuj xof nworb kciuq ehT
Length       : 43
\`\`\`

> [!TIP]
> The slicing formula \`[start:stop:step]\` - remember that \`stop\` is always exclusive (not included). The reversing trick \`[::-1]\` is one of the most commonly used Python shortcuts - memorize it!`,
  objectives: [
    "Use slicing to extract substrings from a string.",
    "Understand that the stop index is exclusive (not included).",
    "Use negative indices in slices.",
    "Use a step value to skip characters.",
    "Reverse a string using the [::-1] shortcut."
  ],
  difficulty: "beginner",
  xpReward: 65,
};