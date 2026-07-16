export const stringImmutabilityLesson = {
  title: "String Immutability",
  slug: "string-immutability",
  content: `# String Immutability

Immutability means that once a string object is created its characters are locked in place in memory, so any apparent change is really the creation of a brand-new string that your variable is then pointed at — which is why strings can safely be used as dictionary keys and set members. The pitfall is calling a method and expecting the original to change: text.upper() returns a new string that is discarded unless you assign it back, so forgetting text = text.upper() leaves the old value untouched.

## What is Immutability?

In Python, strings are **immutable** - this means once a string is created, it **cannot be changed**. You cannot modify, add, or remove individual characters from an existing string.

This might seem like a limitation at first, but it actually makes strings safer and more predictable.

## Demonstrating Immutability

\`\`\`python
text = "Hello"

# Trying to change a character will cause a TypeError
text[0] = "J"   # TypeError: 'str' object does not support item assignment
\`\`\`

\`\`\`python
# You cannot delete a character either
text = "Hello"
del text[0]     # TypeError: 'str' object doesn't support item deletion
\`\`\`

This is different from lists, which ARE mutable:
\`\`\`python
# Lists are mutable - you CAN change them
my_list = [1, 2, 3]
my_list[0] = 99       # This works fine!
print(my_list)        # Output: [99, 2, 3]

# Strings are immutable - you CANNOT change them
my_string = "hello"
my_string[0] = "H"    # TypeError!
\`\`\`

## String Methods Create New Strings

All string methods return **brand new strings** - they never change the original:

\`\`\`python
text = "hello"

upper_text = text.upper()

print(text)          # Output: hello      (original unchanged)
print(upper_text)    # Output: HELLO      (new string)
\`\`\`

\`\`\`python
name = "alice"

# Every method returns a new string
new1 = name.upper()
new2 = name.capitalize()
new3 = name.replace("a", "A")

print(name)    # Output: alice  (still unchanged!)
print(new1)    # Output: ALICE
print(new2)    # Output: Alice
print(new3)    # Output: Alice
\`\`\`

## The Variable Reassignment Illusion

When you do \`text = text.upper()\`, it looks like you are modifying \`text\`, but you are actually:
1. Creating a new string \`"HELLO"\`
2. Making the variable \`text\` point to the new string
3. The old string \`"hello"\` still exists in memory (until Python garbage collects it)

\`\`\`python
text = "hello"
print(id(text))   # Output: some memory address, e.g. 2145678901

text = text.upper()
print(id(text))   # Output: different memory address - it's a NEW string!

# The variable 'text' now points to a different object
\`\`\`

\`\`\`python
# Multiple variables pointing to the same string
a = "hello"
b = a             # b points to the same object as a

print(id(a))      # Same ID
print(id(b))      # Same ID

a = a.upper()     # a now points to a NEW string "HELLO"

print(a)          # Output: HELLO
print(b)          # Output: hello  (b still points to the original "hello")
print(id(a))      # Different ID now
print(id(b))      # Same original ID
\`\`\`

## How to "Modify" a String

Since you cannot modify a string directly, you create a new one with the desired changes.

### Replace a Character

\`\`\`python
text = "Hello"

# Cannot do: text[0] = "J"
# Instead:
new_text = "J" + text[1:]
print(new_text)   # Output: Jello
\`\`\`

### Insert a Character

\`\`\`python
text = "Hello World"
# Insert "Beautiful " at position 6
new_text = text[:6] + "Beautiful " + text[6:]
print(new_text)   # Output: Hello Beautiful World
\`\`\`

### Delete a Character

\`\`\`python
text = "Hello"
# Remove the character at index 2 ('l')
new_text = text[:2] + text[3:]
print(new_text)   # Output: Helo
\`\`\`

### Replace All Occurrences

\`\`\`python
text = "banana"
# Replace all 'a' with 'o'
new_text = text.replace("a", "o")
print(new_text)   # Output: bonono
print(text)       # Output: banana  (unchanged)
\`\`\`

### Using a List to Build a Modified String

For complex modifications, convert to a list, modify, then join back:

\`\`\`python
text = "hello"

# Convert to list of characters (lists ARE mutable)
chars = list(text)
print(chars)      # Output: ['h', 'e', 'l', 'l', 'o']

# Now we can modify individual characters
chars[0] = "H"
chars[4] = "!"
print(chars)      # Output: ['H', 'e', 'l', 'l', '!']

# Convert back to string
new_text = "".join(chars)
print(new_text)   # Output: Hell!
\`\`\`

\`\`\`python
# More complex example: remove all vowels
text = "Hello, World!"
chars = list(text)
vowels = "aeiouAEIOU"

result_chars = [c for c in chars if c not in vowels]
result = "".join(result_chars)
print(result)   # Output: Hll, Wrld!
\`\`\`

## Why Immutability is Useful

### 1. Safety - Strings Won't Change Unexpectedly

\`\`\`python
def process(text):
    # We can use text freely knowing we won't accidentally change it
    upper = text.upper()
    stripped = text.strip()
    # 'text' is guaranteed to be unchanged after this function
    return upper, stripped

original = "  hello  "
u, s = process(original)
print(original)   # Output:   hello    (unchanged - safe!)
print(u)          # Output:   HELLO  
print(s)          # Output: hello
\`\`\`

### 2. Strings Can Be Used as Dictionary Keys

Because strings are immutable, Python can safely use them as dictionary keys (mutable objects like lists cannot be used as keys):

\`\`\`python
# Strings as dictionary keys - works perfectly
student_scores = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
}
print(student_scores["Alice"])   # Output: 95

# Lists as dictionary keys - ERROR!
# bad_dict = {[1, 2, 3]: "value"}  # TypeError: unhashable type: 'list'
\`\`\`

### 3. Strings Can Be Used in Sets

\`\`\`python
# Sets require hashable (immutable) elements
unique_names = {"Alice", "Bob", "Alice", "Charlie"}
print(unique_names)   # Output: {'Alice', 'Bob', 'Charlie'}  (duplicates removed)
\`\`\`

## Common Mistake: Forgetting to Save the Result

\`\`\`python
text = "  hello world  "

# WRONG: forgetting to save the result
text.strip()       # strip() returns a new string but it's thrown away!
text.upper()       # same problem
print(text)        # Output:   hello world   (unchanged!)

# CORRECT: save the result
text = text.strip()
text = text.upper()
print(text)        # Output: HELLO WORLD

# Or in one step with chaining
text = "  hello world  "
text = text.strip().upper()
print(text)        # Output: HELLO WORLD
\`\`\`

> [!IMPORTANT]
> This is one of the most common beginner mistakes! Remember: string methods return new strings - they do NOT change the original. Always assign the result back to a variable.

## Practical Example: String Builder Pattern

When you need to build a string piece by piece, use a list and join at the end:

\`\`\`python
def build_html_list(items):
    parts = []                    # Use a list (mutable)
    parts.append("<ul>")

    for item in items:
        parts.append(f"  <li>{item}</li>")

    parts.append("</ul>")

    return "\\n".join(parts)       # Join once at the end (efficient)

fruits = ["Apple", "Banana", "Cherry", "Mango"]
html = build_html_list(fruits)
print(html)
\`\`\`

Output:
\`\`\`
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
  <li>Mango</li>
</ul>
\`\`\`

> [!TIP]
> Always remember: strings cannot be changed in place. Every string operation creates a new string. Save the result if you need it. When building strings in a loop, collect parts in a list and use \`join()\` at the end for best performance.`,
  objectives: [
    "Understand what immutability means for strings.",
    "Know that string methods always return new strings, never modify the original.",
    "Understand the difference between reassignment and mutation.",
    "Know how to create modified versions of strings using slicing and replace().",
    "Avoid the common mistake of forgetting to save string method results."
  ],
  difficulty: "beginner",
  xpReward: 55,
};