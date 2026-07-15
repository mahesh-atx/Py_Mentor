export const dataTypesLesson = {
  title: "Data Types",
  slug: "data-types",
  content: `# Data Types

Every value in Python has a **type**. A data type tells Python what kind of value you are working with and what operations can be performed on it.

Think of it like real life: you handle money differently than you handle a name or a yes/no answer.

## The Theory — Building the Logic

Every value in Python is an **object**, and its type is the class that defines what that object can do. Instead of the computer merely storing raw bytes, Python attaches a "blueprint" to each value that knows how to add, compare, or print it — so the type lives *with* the data, not in a separate declaration. Numbers, text, and the \`True\`/\`False\` flags are fundamentally different kinds of objects, which is why you cannot sensibly add a word to a number any more than you can subtract a sentence. A common pitfall is assuming Python will automatically convert between types for you; it will not, and mixing an \`int\` with a \`str\` raises an error rather than silently "doing the right thing".

## int (Integer)

Integers are whole numbers, both positive and negative, with no decimal point.

\`\`\`python
age = 25
temperature = -10
score = 0
population = 8000000000

print(age)         # Output: 25
print(temperature) # Output: -10
print(score)       # Output: 0
\`\`\`

You can perform math with integers:
\`\`\`python
a = 10
b = 3

print(a + b)   # Output: 13  (addition)
print(a - b)   # Output: 7   (subtraction)
print(a * b)   # Output: 30  (multiplication)
print(a // b)  # Output: 3   (floor division - whole number result)
print(a % b)   # Output: 1   (remainder)
\`\`\`

## float (Floating Point Number)

Floats are numbers that have a decimal point.

\`\`\`python
price = 19.99
height = 5.11
pi = 3.14159
negative_temp = -3.5

print(price)   # Output: 19.99
print(height)  # Output: 5.11
\`\`\`

Integer divided by integer gives a float:
\`\`\`python
result = 10 / 3
print(result)  # Output: 3.3333333333333335

result2 = 10 / 2
print(result2)  # Output: 5.0  (still a float, not int)
\`\`\`

## complex (Complex Numbers)

Complex numbers have a real part and an imaginary part. The imaginary part is written with \`j\` in Python.

\`\`\`python
c1 = 3 + 4j
c2 = 1 - 2j

print(c1)         # Output: (3+4j)
print(c1.real)    # Output: 3.0  (real part)
print(c1.imag)    # Output: 4.0  (imaginary part)
print(c1 + c2)    # Output: (4+2j)
\`\`\`

> [!NOTE]
> Complex numbers are mainly used in scientific and engineering calculations. As a beginner, you will rarely use them, but it is good to know they exist.

## str (String)

Strings are sequences of characters - basically any text. Strings must be wrapped in either single quotes \`''\` or double quotes \`""\`.

\`\`\`python
first_name = "Alice"
last_name = 'Smith'
message = "Hello, World!"
empty_string = ""

print(first_name)  # Output: Alice
print(message)     # Output: Hello, World!
\`\`\`

You can join strings together (concatenation):
\`\`\`python
first_name = "Alice"
last_name = "Smith"
full_name = first_name + " " + last_name
print(full_name)  # Output: Alice Smith
\`\`\`

Multi-line strings use triple quotes:
\`\`\`python
paragraph = """
This is line one.
This is line two.
This is line three.
"""
print(paragraph)
\`\`\`

## bool (Boolean)

Booleans represent one of two values: \`True\` or \`False\`. They are used to represent yes/no, on/off, correct/incorrect situations.

\`\`\`python
is_raining = True
is_logged_in = False
has_discount = True

print(is_raining)    # Output: True
print(is_logged_in)  # Output: False
\`\`\`

Comparisons produce boolean values:
\`\`\`python
age = 20
print(age > 18)   # Output: True
print(age == 30)  # Output: False
print(age < 10)   # Output: False
\`\`\`

> [!IMPORTANT]
> In Python, \`True\` and \`False\` must be capitalized. \`true\` or \`false\` (lowercase) will cause an error.

## None (Null Value)

\`None\` represents the **absence of a value**. It means "nothing" or "no value here". It is similar to \`null\` in other programming languages.

\`\`\`python
result = None
user_input = None

print(result)      # Output: None
print(user_input)  # Output: None
\`\`\`

A common use case - a variable before it has been given a real value:
\`\`\`python
user_name = None

# Later in the program, we assign a real value
user_name = "Alice"
print(user_name)  # Output: Alice
\`\`\`

Checking if something is None:
\`\`\`python
result = None

if result is None:
    print("No result yet.")
else:
    print(result)

# Output: No result yet.
\`\`\`

## Summary Table

\`\`\`
Type       Example              Description
-------    -----------------    ---------------------------
int        42, -5, 0            Whole numbers
float      3.14, -0.5, 2.0      Decimal numbers
complex    3+4j, 1-2j           Numbers with imaginary part
str        "hello", 'world'     Text / characters
bool       True, False          Yes/No values
None       None                 Absence of value
\`\`\`

> [!TIP]
> You can always check the type of any variable using the \`type()\` function, which is covered in a later topic in this module.`,
  objectives: [
    "Understand the 6 core data types in Python.",
    "Know when to use int, float, complex, str, bool, and None.",
    "Understand the difference between integers and floats.",
    "Understand what None represents."
  ],
  difficulty: "beginner",
  xpReward: 60,
};