export const stringBuiltinsLesson = {
  title: "String Built-ins",
  slug: "string-builtins",
  content: `# String Built-ins

Python provides many built-in functions and operations specifically for working with strings. This lesson covers the essential ones beyond the string methods you already know.

## len() with Strings

\`\`\`python
print(len("Python"))         # Output: 6
print(len("Hello World"))    # Output: 11
print(len(""))               # Output: 0
print(len("  spaces  "))     # Output: 10  (spaces count!)

# Practical: validate input length
password = input("Enter password: ")
if len(password) < 8:
    print(f"Too short! Need {8 - len(password)} more characters.")
elif len(password) > 20:
    print("Too long! Maximum 20 characters.")
else:
    print("Length is valid.")
\`\`\`

## max() and min() with Strings

\`\`\`python
# Character comparison (based on Unicode/ASCII values)
print(max("python"))   # Output: y  (highest ASCII value)
print(min("python"))   # Output: h  (lowest ASCII value)

# Word comparison (alphabetical)
words = ["banana", "apple", "cherry", "mango"]
print(max(words))      # Output: mango    (last alphabetically)
print(min(words))      # Output: apple    (first alphabetically)

# Find longest/shortest word using key
print(max(words, key=len))   # Output: banana  (6 chars)
print(min(words, key=len))   # Output: mango   (5 chars - but also apple)
\`\`\`

## sorted() and reversed() with Strings

### sorted() on Strings

\`\`\`python
# Sort characters in a string
word = "python"
sorted_chars = sorted(word)
print(sorted_chars)           # Output: ['h', 'n', 'o', 'p', 't', 'y']
print("".join(sorted_chars))  # Output: hnopry

# Sort descending
print("".join(sorted(word, reverse=True)))   # Output: ytpohn

# Sort case-insensitively
words = ["Banana", "apple", "Cherry", "mango"]
print(sorted(words))                         # ['Banana', 'Cherry', 'apple', 'mango']
print(sorted(words, key=str.lower))          # ['apple', 'Banana', 'Cherry', 'mango']
print(sorted(words, key=lambda w: w.lower()))# ['apple', 'Banana', 'Cherry', 'mango']
\`\`\`

### reversed() on Strings

\`\`\`python
word = "Python"

# reversed() returns an iterator - need to join
rev_list = list(reversed(word))
rev_str = "".join(reversed(word))
print(rev_str)   # Output: nohtyP

# Easier: slicing
print(word[::-1])   # Output: nohtyP
\`\`\`

## enumerate() with Strings

\`\`\`python
word = "Python"

for index, char in enumerate(word):
    print(f"{index}: {char}")
\`\`\`

Output:
\`\`\`
0: P
1: y
2: t
3: h
4: o
5: n
\`\`\`

\`\`\`python
# Find all positions of a character
def find_all(string, char):
    return [i for i, c in enumerate(string) if c == char]

text = "programming"
positions = find_all(text, "m")
print(f"'m' found at positions: {positions}")
# Output: 'm' found at positions: [3, 6]
\`\`\`

## map() and filter() with Strings

\`\`\`python
words = ["hello", "world", "python", "programming"]

# Apply a transformation to each word
upper_words = list(map(str.upper, words))
print(upper_words)   # Output: ['HELLO', 'WORLD', 'PYTHON', 'PROGRAMMING']

lengths = list(map(len, words))
print(lengths)       # Output: [5, 5, 6, 11]

# Filter words by condition
long_words = list(filter(lambda w: len(w) > 5, words))
print(long_words)    # Output: ['python', 'programming']

# Filter and transform together
long_upper = list(map(str.upper, filter(lambda w: len(w) > 5, words)))
print(long_upper)    # Output: ['PYTHON', 'PROGRAMMING']
\`\`\`

## zip() with Strings

\`\`\`python
# Compare two strings character by character
word1 = "HELLO"
word2 = "WORLD"

for c1, c2 in zip(word1, word2):
    match = "=" if c1 == c2 else "X"
    print(f"{c1} {match} {c2}")
\`\`\`

Output:
\`\`\`
H X W
E X O
L = R
L X L
O X D
\`\`\`

\`\`\`python
# Create a letter-number mapping
letters = "abcdefghijklmnopqrstuvwxyz"
numbers = range(1, 27)
letter_map = dict(zip(letters, numbers))
print(letter_map['a'])   # Output: 1
print(letter_map['z'])   # Output: 26
\`\`\`

## any() and all() with Strings

\`\`\`python
# any() - True if at least one item is True
password = "Hello123!"
print(any(c.isupper() for c in password))    # Output: True
print(any(c.isdigit() for c in password))    # Output: True
print(any(c in "!@#$%^&*" for c in password)) # Output: True

# all() - True if all items are True
name = "Alice"
print(all(c.isalpha() for c in name))        # Output: True

code = "ABC123"
print(all(c.isalnum() for c in code))        # Output: True
print(all(c.isalpha() for c in code))        # Output: False (has digits)

# Practical: password validator
def validate_password(pwd):
    checks = {
        "At least 8 chars": len(pwd) >= 8,
        "Has uppercase":    any(c.isupper() for c in pwd),
        "Has lowercase":    any(c.islower() for c in pwd),
        "Has digit":        any(c.isdigit() for c in pwd),
        "Has special":      any(c in "!@#$%^&*" for c in pwd),
    }

    for check, passed in checks.items():
        status = "PASS" if passed else "FAIL"
        print(f"  [{status}] {check}")

    return all(checks.values())

pwd = "Hello@123"
print(f"Password: '{pwd}'")
is_valid = validate_password(pwd)
print(f"Valid: {is_valid}")
\`\`\`

Output:
\`\`\`
Password: 'Hello@123'
  [PASS] At least 8 chars
  [PASS] Has uppercase
  [PASS] Has lowercase
  [PASS] Has digit
  [PASS] Has special
Valid: True
\`\`\`

## sum() with Strings (Character Counting)

\`\`\`python
text = "Hello, World!"

# Count specific characters using sum + generator
vowel_count = sum(1 for c in text if c.lower() in "aeiou")
digit_count = sum(1 for c in text if c.isdigit())
upper_count = sum(1 for c in text if c.isupper())
space_count = sum(1 for c in text if c == " ")

print(f"Vowels: {vowel_count}")   # Output: Vowels: 3
print(f"Digits: {digit_count}")   # Output: Digits: 0
print(f"Upper : {upper_count}")   # Output: Upper : 2
print(f"Spaces: {space_count}")   # Output: Spaces: 1

# Sum ASCII values
total_ascii = sum(ord(c) for c in text)
print(f"Total ASCII: {total_ascii}")
\`\`\`

## repr() vs str() for Strings

\`\`\`python
text = "Hello\nWorld\t!"

print(str(text))    # Output: Hello
                    #         World	!   (processes escape chars)
print(repr(text))   # Output: 'Hello\nWorld\t!'  (shows raw string)

# Useful for debugging
value = None
print(str(value))   # Output: None
print(repr(value))  # Output: None

empty = ""
print(str(empty))   # Output:  (empty - hard to see)
print(repr(empty))  # Output: ''  (clearly shows empty string)
\`\`\`

## chr() and ord() in String Context

\`\`\`python
# Build strings using chr()
def number_to_excel_col(n):
    """Convert number to Excel column name (1=A, 26=Z, 27=AA, etc.)"""
    result = ""
    while n > 0:
        n, remainder = divmod(n - 1, 26)
        result = chr(65 + remainder) + result
    return result

for i in [1, 26, 27, 52, 53, 702, 703]:
    print(f"{i:>4} -> {number_to_excel_col(i)}")
\`\`\`

Output:
\`\`\`
   1 -> A
  26 -> Z
  27 -> AA
  52 -> AZ
  53 -> BA
 702 -> ZZ
 703 -> AAA
\`\`\`

\`\`\`python
# ROT13 encoding using ord/chr
def rot13(text):
    result = []
    for char in text:
        if 'a' <= char <= 'z':
            result.append(chr((ord(char) - ord('a') + 13) % 26 + ord('a')))
        elif 'A' <= char <= 'Z':
            result.append(chr((ord(char) - ord('A') + 13) % 26 + ord('A')))
        else:
            result.append(char)
    return ''.join(result)

msg = "Hello, World!"
encoded = rot13(msg)
decoded = rot13(encoded)  # ROT13 is its own inverse
print(f"Original: {msg}")
print(f"Encoded : {encoded}")
print(f"Decoded : {decoded}")
\`\`\`

## Practical Example: Text Statistics Tool

\`\`\`python
def analyze_text(text):
    if not text.strip():
        return "Empty text"

    words = text.split()
    sentences = text.count('.') + text.count('!') + text.count('?')
    chars_no_space = sum(1 for c in text if not c.isspace())

    word_lengths = list(map(len, words))
    unique_words = set(word.lower().strip('.,!?') for word in words)

    analysis = {
        "Characters (total)": len(text),
        "Characters (no spaces)": chars_no_space,
        "Words": len(words),
        "Unique words": len(unique_words),
        "Sentences (approx)": sentences,
        "Avg word length": round(sum(word_lengths) / len(word_lengths), 2),
        "Longest word": max(words, key=len),
        "Shortest word": min(words, key=len),
        "Vowels": sum(1 for c in text.lower() if c in 'aeiou'),
        "Digits": sum(1 for c in text if c.isdigit()),
        "Uppercase letters": sum(1 for c in text if c.isupper()),
    }

    print("=== Text Analysis ===")
    for key, value in analysis.items():
        print(f"  {key:<25}: {value}")

    # Most common characters (non-space)
    char_count = {}
    for c in text.lower():
        if not c.isspace():
            char_count[c] = char_count.get(c, 0) + 1

    top3 = sorted(char_count.items(), key=lambda x: x[1], reverse=True)[:3]
    print(f"  {'Top 3 characters':<25}: {top3}")

text = "Python is amazing! Python makes programming fun and easy. I love Python."
analyze_text(text)
\`\`\`

Output:
\`\`\`
=== Text Analysis ===
  Characters (total)    : 72
  Characters (no spaces): 60
  Words                 : 12
  Unique words          : 10
  Sentences (approx)    : 3
  Avg word length       : 5.0
  Longest word          : programming
  Shortest word         : is
  Vowels                : 22
  Digits                : 0
  Uppercase letters     : 3
  Top 3 characters      : [('n', 7), ('o', 6), ('i', 6)]
\`\`\`

> [!TIP]
> Use generator expressions with \`sum()\`, \`any()\`, and \`all()\` for efficient character-level checks without creating intermediate lists. Combine \`map()\` with string methods like \`str.upper\` for clean transformations. Use \`repr()\` when debugging to see the exact string content including escape characters.`,
  objectives: [
    "Use len(), max(), min(), and sorted() effectively with strings.",
    "Use enumerate() to get character positions in a string.",
    "Use map() and filter() with string methods.",
    "Use any() and all() to check character properties across a string.",
    "Use sum() with generator expressions for character counting."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};