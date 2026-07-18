export const stringsCompleteLesson = {
  title: "Strings — The Complete Reference",
  slug: "strings-complete",
  content: `# Strings — The Complete Reference

> A single, consolidated guide to **everything** about strings in Python: what they are, how they behave, every common method, and how to format them. This is the "one-stop" notes file; the individual lessons in \`2.3 String Manipulation\` cover each area with more exercises.

A string is a *read-only sequence of characters* numbered from 0, so anything you can do with a sequence — index, slice, loop, check length or membership — works on it too. Strings are immutable, though: any operation that seems to "change" a string actually builds and returns a brand-new one, leaving the original untouched.

---

## 1. What Is a String?

A string is a **sequence of characters** — letters, digits, symbols, spaces, even emoji. In Python, text is always stored as a \`str\` object.

\`\`\`python
name = "Alice"
message = "Hello, World!"
emoji = "🐍"
\`\`\`

Under the hood each character is a Unicode code point, which is why Python strings handle every human language and symbol consistently.

## 2. Creating Strings

### Single vs Double Quotes
Both work identically. Use whichever avoids escaping the other kind of quote inside the text.

\`\`\`python
a = 'Hello'
b = "Hello"
print(a == b)   # Output: True

quote = "She said 'hi'"      # double outside, single inside
speech = 'He said "bye"'     # single outside, double inside
\`\`\`

### Triple Quotes (multi-line)
Triple quotes preserve line breaks and are also how docstrings are written.

\`\`\`python
paragraph = """Line one
Line two
Line three"""
\`\`\`

### Empty Strings
\`\`\`python
empty = ""
print(len(empty))   # Output: 0
\`\`\`

### Converting Other Types with str()
\`\`\`python
age = 25
text = str(age)        # "25"
print(type(text))      # <class 'str'>
\`\`\`

## 3. Indexing (Reading Characters)

Every character has a position called an **index**, starting at **0**.

\`\`\`
String:   P  y  t  h  o  n
Index:    0  1  2  3  4  5
\`\`\`

\`\`\`python
word = "Python"
print(word[0])   # P
print(word[5])   # n
\`\`\`

### Negative Indexing (from the end)
\`\`\`python
word = "Python"
print(word[-1])   # n  (last)
print(word[-6])   # P  (first)
\`\`\`

> [!TIP]
> Negative indexing is perfect for "the last N characters" — e.g. \`filename[-4:]\` gives a file extension like \`.pdf\`.

### Out of Range
Accessing a non-existent index raises \`IndexError\`:

\`\`\`python
word = "Python"   # valid indices 0..5
print(word[6])    # IndexError: string index out of range
\`\`\`

## 4. Slicing (Reading a Range)

Slicing returns a **new string** made from a window of characters: \`text[start:stop:step]\`.

- \`start\` — index to begin (included).
- \`stop\` — index to end **before** (excluded — this is the #1 off-by-one trap).
- \`step\` — how many to skip (optional).

\`\`\`python
s = "PythonProgramming"
print(s[0:6])     # "Python"   (stops before index 6)
print(s[6:])      # "Programming"
print(s[:6])      # "Python"   (start defaults to 0)
print(s[::2])     # "Pto rgamn" (every 2nd char)
print(s[::-1])    # reverse the string
\`\`\`

Out-of-range slice indices are **silently clipped** (they do not error):

\`\`\`python
s = "Hi"
print(s[0:100])   # "Hi"  (no error, just truncated)
\`\`\`

## 5. Immutability (The Golden Rule)

You cannot change a character in place:

\`\`\`python
s = "hello"
s[0] = "H"        # TypeError: 'str' object does not support item assignment
\`\`\`

To "change" a string, build a new one:

\`\`\`python
s = "hello"
s = "H" + s[1:]   # new string "Hello"
print(s)
\`\`\`

Every string method follows this rule: it **returns a new string** and leaves the original alone.

\`\`\`python
name = "alice"
fixed = name.capitalize()   # "Alice"
print(name)                 # "alice"  (unchanged!)
print(fixed)                # "Alice"
\`\`\`

## 6. Concatenation & Repetition

\`\`\`python
first = "Hello"
last = "World"
greeting = first + ", " + last + "!"   # "Hello, World!"
shout = "Ha" * 3                       # "HaHaHa"
\`\`\`

> [!CAUTION]
> Because strings are immutable, \`result += piece\` inside a loop rebuilds the whole string each time. For many pieces, join a list instead (see §9).

## 7. Length, Iteration & Membership

\`\`\`python
print(len("Python"))          # 6

for ch in "Hi":
    print(ch)                 # H  then  i

print("y" in "Python")        # True
print("z" in "Python")        # False
print("tho" in "Python")      # True  (substring check)
\`\`\`

## 8. Escape Characters & Raw Strings

A backslash \`\\\` tells Python "treat the next character specially".

\`\`\`python
print("Line1\\nLine2")     # \n = newline
print("Tab\\there")        # \t = tab
print("He said \\"hi\\"")   # \" = literal quote
print("Path: C:\\\\Users")  # \\ = literal backslash
\`\`\`

A **raw string** (\`r"..."\`) turns off escape processing — essential for regular expressions and Windows paths:

\`\`\`python
print(r"C:\Users\name")   # backslashes stay literal
\`\`\`

## 9. Methods — Case & Stripping

All return a **new** string.

\`\`\`python
s = "  Hello, World!  "
print(s.upper())        # "  HELLO, WORLD!  "
print(s.lower())        # "  hello, world!  "
print(s.strip())        # "Hello, World!"     (removes both ends)
print(s.lstrip())       # "Hello, World!  "
print(s.rstrip())       # "  Hello, World!"
print("hello world".title())       # "Hello World"
print("hello".capitalize())        # "Hello"
\`\`\`

> [!NOTE]
> \`strip()\` only removes edge whitespace (or specified edge characters). It never touches the middle.

## 10. Methods — Searching

\`\`\`python
s = "banana"
print(s.find("na"))        # 2   (first index, or -1 if not found)
print(s.index("na"))       # 2   (like find but raises ValueError if missing)
print(s.count("na"))       # 2
print(s.startswith("ba"))  # True
print(s.endswith("na"))    # True
\`\`\`

Rule of thumb: use \`find()\` when "not found" is normal (it returns -1); use \`index()\` when absence is an error.

## 11. Methods — Modifying (split / replace / join)

\`\`\`python
# replace returns a new string with substitutions
print("hello".replace("l", "L"))        # "heLLo"

# split breaks one string into a LIST of pieces
print("a,b,c".split(","))               # ['a', 'b', 'c']
print("one two   three".split())        # ['one', 'two', 'three']  (any whitespace)

# join glues a list of strings back together (note: join lives ON the separator)
words = ["Hello", "World"]
print(" ".join(words))                  # "Hello World"
print("-".join(words))                  # "Hello-World"
\`\`\`

> [!CAUTION]
> \`"-".join(items)\` requires **every item to already be a string**. Convert numbers first: \`"-".join(str(x) for x in nums)\`.

## 12. Methods — Validation (Boolean Checks)

These return \`True\`/\`False\` and are great guards before you convert or process text.

\`\`\`python
print("abc".isalpha())     # True   (all letters)
print("abc123".isalnum())  # True   (letters or digits)
print("123".isdigit())     # True   (all digits)
print("  ".isspace())      # True   (all whitespace)
print("ABC".isupper())     # True
print("abc".islower())     # True
print("".isalpha())        # False  (empty string is "nothing")
\`\`\`

> [!TIP]
> Prefer \`isdigit()\` / \`isnumeric()\` over blindly calling \`int()\` when validating user input — you get a clean boolean instead of an exception.

## 13. Formatting Strings

### f-strings (recommended)
Prefix the string with \`f\` and put expressions in \`{ }\`:

\`\`\`python
name = "Alice"
age = 30
print(f"{name} is {age} years old.")
# Alignment & padding inside the braces:
print(f"{name:>10}")        # right-align in 10 width
print(f"{age:03d}")         # "030"  (zero-padded)
print(f"{3.14159:.2f}")     # "3.14" (2 decimals)
\`\`\`

### .format()
\`\`\`python
print("{} is {}".format(name, age))
print("{0} {0}".format("x"))   # "x x"  (reuse by index)
\`\`\`

### %-formatting (legacy)
\`\`\`python
print("%s is %d" % (name, age))
\`\`\`

> [!TIP]
> Use f-strings for almost everything — they are the most readable and the fastest.

## 14. Quick Reference Table

| Need | Method / Syntax | Returns |
|------|-----------------|---------|
| Length | \`len(s)\` | int |
| Character | \`s[i]\` | str |
| Substring | \`s[a:b]\` | str (new) |
| Reverse | \`s[::-1]\` | str (new) |
| Uppercase | \`s.upper()\` | str (new) |
| Lowercase | \`s.lower()\` | str (new) |
| Trim edges | \`s.strip()\` | str (new) |
| Find | \`s.find(sub)\` | int (-1 if none) |
| Count | \`s.count(sub)\` | int |
| Replace | \`s.replace(a, b)\` | str (new) |
| Split | \`s.split(sep)\` | list[str] |
| Join | \`sep.join(list)\` | str |
| Check | \`s.isdigit()\` etc. | bool |
| Format | \`f"{x}"\` | str |

## 15. Common Pitfalls

1. **Forgetting immutability** — methods don't change the original; you must assign the result.
2. **Off-by-one in slices** — \`stop\` is exclusive.
3. **Mutating while looping** — you can't change a string in place; build a new one or collect into a list and \`join()\`.
4. **\`join\` on non-strings** — convert first.
5. **Empty string is falsy** — \`if s:\` is \`False\` for \`""\`.

> [!TIP]
> When assembling a string from many pieces, put the pieces in a list and call \`"".join(pieces)\` at the end — it is far faster and cleaner than repeated \`+=\`.`,
  objectives: [
    "Understand that a string is an immutable sequence of characters.",
    "Create strings with single, double, triple, and raw quotes.",
    "Read characters with indexing and ranges with slicing.",
    "Use the full family of string methods (case, strip, search, modify, validate).",
    "Format strings cleanly with f-strings and .format().",
    "Avoid the classic string pitfalls (immutability, slice bounds, join types)."
  ],
  difficulty: "beginner",
  xpReward: 120,
};
