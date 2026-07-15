export const stringMethodsSearchLesson = {
  title: "String Methods - Search & Count",
  slug: "string-methods-search",
  content: `# String Methods - Search & Count

These methods help you find characters or substrings within a string and count their occurrences.

## The Theory — Building the Logic

Search methods do not transform the string — they report information about it: where something appears, how often, or whether it starts or ends a certain way. \`find\` and \`index\` return a position, while \`count\`, \`startswith\`, and \`endswith\` return numbers or booleans, letting you decide before editing anything. The real design choice is how 'not found' is handled: \`find\` returns \`-1\` so you can branch gracefully, while \`index\` raises an error because a missing substring is treated as a genuine fault. The pitfall is using \`index\` where absence is normal (crashing your program) or treating \`find\`'s \`-1\` as a truthy found position instead of comparing it with \`!= -1\`.

## find() - Find a Substring

\`find()\` searches for a substring and returns the **index of the first occurrence**. If not found, it returns \`-1\` (not an error).

### Syntax

\`\`\`python
string.find(substring)
string.find(substring, start)
string.find(substring, start, end)
\`\`\`

### Basic Usage

\`\`\`python
text = "Hello, World!"

print(text.find("Hello"))   # Output: 0   (found at index 0)
print(text.find("World"))   # Output: 7   (found at index 7)
print(text.find("o"))       # Output: 4   (first 'o' is at index 4)
print(text.find("Python"))  # Output: -1  (not found)
print(text.find("!"))       # Output: 12
\`\`\`

\`\`\`python
# Check if substring exists using find()
text = "Python is amazing"

position = text.find("amazing")
if position != -1:
    print(f"Found 'amazing' at position {position}")
else:
    print("Not found")
# Output: Found 'amazing' at position 10
\`\`\`

### find() with Start and End

\`\`\`python
text = "banana"

# Find 'a' starting from index 2
print(text.find("a", 2))    # Output: 3  (the second 'a')

# Find 'a' between index 4 and end
print(text.find("a", 4))    # Output: 5  (the last 'a')

# Find 'a' between index 0 and 3 (exclusive)
print(text.find("a", 0, 3)) # Output: 1  (only looks in "ban")
\`\`\`

### rfind() - Find from the Right

Searches from the **end** of the string, returns the **last occurrence**:

\`\`\`python
text = "Hello, World! Hello!"

print(text.find("Hello"))    # Output: 0   (first occurrence)
print(text.rfind("Hello"))   # Output: 14  (last occurrence)

text2 = "banana"
print(text2.rfind("a"))      # Output: 5   (last 'a')
\`\`\`

## index() - Find a Substring (Raises Error if Not Found)

\`index()\` works exactly like \`find()\`, but raises a \`ValueError\` if the substring is not found instead of returning \`-1\`.

\`\`\`python
text = "Hello, World!"

print(text.index("World"))    # Output: 7
print(text.index("H"))        # Output: 0

# This raises an error!
# print(text.index("Python"))   # ValueError: substring not found
\`\`\`

### When to Use find() vs index()

\`\`\`python
text = "Hello, World!"

# Use find() when NOT finding is acceptable (returns -1)
pos = text.find("Python")
if pos != -1:
    print(f"Found at {pos}")
else:
    print("Not found - that's okay")   # Handles gracefully

# Use index() when NOT finding means something went wrong
try:
    pos = text.index("World")
    print(f"Found at {pos}")
except ValueError:
    print("Error: 'World' must be in the text")
\`\`\`

### rindex() - Index from the Right

\`\`\`python
text = "banana"
print(text.rindex("a"))   # Output: 5  (last occurrence of 'a')
\`\`\`

## count() - Count Occurrences

\`count()\` counts how many times a substring appears in the string.

### Syntax

\`\`\`python
string.count(substring)
string.count(substring, start)
string.count(substring, start, end)
\`\`\`

### Basic Usage

\`\`\`python
text = "Hello, World! Hello, Python!"

print(text.count("Hello"))   # Output: 2
print(text.count("o"))       # Output: 3
print(text.count("l"))       # Output: 5
print(text.count("xyz"))     # Output: 0  (not found = 0, not error)
print(text.count(" "))       # Output: 3  (spaces)
\`\`\`

\`\`\`python
# Count vowels
sentence = "The quick brown fox jumps over the lazy dog"
vowels_count = 0

for vowel in "aeiou":
    vowels_count += sentence.lower().count(vowel)

print(f"Total vowels: {vowels_count}")   # Output: Total vowels: 11
\`\`\`

### count() with Start and End

\`\`\`python
text = "banana"

print(text.count("a"))        # Output: 3  (all 'a's)
print(text.count("a", 2))     # Output: 2  (from index 2 onwards)
print(text.count("a", 2, 5))  # Output: 1  (between index 2 and 4)
\`\`\`

## Checking Content - startswith() and endswith()

These return \`True\` or \`False\` and are very useful for validation.

### startswith()

\`\`\`python
text = "Hello, World!"

print(text.startswith("Hello"))    # Output: True
print(text.startswith("World"))    # Output: False
print(text.startswith("H"))        # Output: True
print(text.startswith("hello"))    # Output: False  (case sensitive)
\`\`\`

\`\`\`python
# Check multiple options using a tuple
filename = "report.xlsx"

if filename.startswith(("doc_", "report_", "summary_")):
    print("This is a document file.")

# File type checking
files = ["image.jpg", "document.pdf", "photo.png", "data.csv"]

for file in files:
    if file.startswith(("image", "photo")):
        print(f"{file} is an image")
\`\`\`

### startswith() with start and end

\`\`\`python
text = "Hello, World!"

print(text.startswith("World", 7))    # Output: True  (check from index 7)
print(text.startswith("World", 0, 12)) # Output: False (check in first 12 chars)
\`\`\`

### endswith()

\`\`\`python
filename = "report_2024.pdf"

print(filename.endswith(".pdf"))    # Output: True
print(filename.endswith(".xlsx"))   # Output: False
print(filename.endswith("2024.pdf"))# Output: True
\`\`\`

\`\`\`python
# Check multiple extensions
files = ["photo.jpg", "document.pdf", "video.mp4", "image.png", "data.xlsx"]

image_extensions = (".jpg", ".jpeg", ".png", ".gif", ".bmp")
doc_extensions = (".pdf", ".doc", ".docx", ".xlsx")

for file in files:
    if file.endswith(image_extensions):
        print(f"{file} -> Image file")
    elif file.endswith(doc_extensions):
        print(f"{file} -> Document file")
    else:
        print(f"{file} -> Other file")
\`\`\`

Output:
\`\`\`
photo.jpg -> Image file
document.pdf -> Document file
video.mp4 -> Other file
image.png -> Image file
data.xlsx -> Document file
\`\`\`

## Practical Example: Text Analyzer

\`\`\`python
text = """
Python is a versatile programming language. Python is easy to learn.
Python supports multiple programming paradigms. Many developers love Python.
"""

search_word = "Python"

print(f"Text Analysis for word: '{search_word}'")
print("=" * 45)
print(f"Occurrences          : {text.count(search_word)}")
print(f"First occurrence     : index {text.find(search_word)}")
print(f"Last occurrence      : index {text.rfind(search_word)}")
print(f"Starts with newline  : {text.startswith(chr(10))}")
print(f"Ends with newline    : {text.endswith(chr(10))}")

# Find all positions
positions = []
start = 0
while True:
    pos = text.find(search_word, start)
    if pos == -1:
        break
    positions.append(pos)
    start = pos + 1

print(f"All positions        : {positions}")
\`\`\`

Output:
\`\`\`
Text Analysis for word: 'Python'
=============================================
Occurrences          : 4
First occurrence     : index 1
Last occurrence      : index 99
Starts with newline  : True
Ends with newline    : True
All positions        : [1, 47, 76, 99]
\`\`\`

## Practical Example: URL Validator

\`\`\`python
def validate_url(url):
    url = url.strip().lower()
    errors = []

    if not url.startswith(("http://", "https://")):
        errors.append("URL must start with http:// or https://")

    if not url.endswith((".com", ".org", ".net", ".io", ".gov", ".edu")):
        errors.append("URL must end with a valid domain extension")

    if url.count(".") < 1:
        errors.append("URL must contain at least one dot")

    if " " in url:
        errors.append("URL cannot contain spaces")

    return errors

urls = [
    "https://www.google.com",
    "http://example.org",
    "not a url",
    "https://missing-domain"
]

for url in urls:
    errors = validate_url(url)
    if errors:
        print(f"INVALID: {url}")
        for e in errors:
            print(f"  - {e}")
    else:
        print(f"VALID:   {url}")
\`\`\`

> [!TIP]
> Use \`find()\` when you want to gracefully handle a "not found" case (check for \`-1\`). Use \`index()\` when not finding the substring means something is wrong and you want an error raised. Use \`count()\` to count occurrences, and \`startswith()\`/\`endswith()\` for validation.`,
  objectives: [
    "Use find() to locate a substring and handle the -1 (not found) return value.",
    "Use index() and understand how it differs from find().",
    "Use count() to count how many times a substring appears.",
    "Use startswith() and endswith() to validate strings.",
    "Pass a tuple to startswith() and endswith() to check multiple options."
  ],
  difficulty: "beginner",
  xpReward: 65,
};