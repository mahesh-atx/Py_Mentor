export const typeCastingLesson = {
  title: "Type Casting",
  slug: "type-casting",
  content: `# Type Casting

Sometimes you have a value of one type but you need it in a different type. For example, you might have the number \`25\` as a string \`"25"\` but need to do math with it. **Type casting** is the process of converting a value from one data type to another.

## int() - Convert to Integer

Converts a value to a whole number.

\`\`\`python
# Convert float to int (removes the decimal part - does NOT round)
price = 9.99
whole_price = int(price)
print(whole_price)  # Output: 9

# Convert string to int (only works if the string is a whole number)
age_text = "25"
age = int(age_text)
print(age)        # Output: 25
print(age + 5)    # Output: 30

# Convert bool to int
print(int(True))   # Output: 1
print(int(False))  # Output: 0
\`\`\`

What does NOT work:
\`\`\`python
int("3.14")   # ERROR - cannot convert decimal string directly to int
int("hello")  # ERROR - "hello" is not a number
\`\`\`

## float() - Convert to Float

Converts a value to a decimal number.

\`\`\`python
# Convert int to float
age = 25
age_float = float(age)
print(age_float)  # Output: 25.0

# Convert string to float
price_text = "19.99"
price = float(price_text)
print(price)       # Output: 19.99
print(price + 5)   # Output: 24.99

# This also works for whole number strings
value = float("10")
print(value)  # Output: 10.0

# Convert bool to float
print(float(True))   # Output: 1.0
print(float(False))  # Output: 0.0
\`\`\`

## str() - Convert to String

Converts a value to text (string).

\`\`\`python
# Convert int to string
age = 25
age_text = str(age)
print(age_text)          # Output: 25
print(type(age_text))    # Output: <class 'str'>

# Convert float to string
price = 19.99
price_text = str(price)
print(price_text)        # Output: 19.99

# Convert bool to string
print(str(True))   # Output: True
print(str(False))  # Output: False

# Convert None to string
print(str(None))   # Output: None
\`\`\`

A very common use case - joining a number with text:
\`\`\`python
age = 25

# This will cause an ERROR:
# print("I am " + age + " years old.")

# Correct way using str():
print("I am " + str(age) + " years old.")  # Output: I am 25 years old.
\`\`\`

## bool() - Convert to Boolean

Converts a value to \`True\` or \`False\`.

Python has clear rules about what is considered \`True\` and \`False\`:

\`\`\`python
# Numbers: 0 is False, everything else is True
print(bool(0))      # Output: False
print(bool(1))      # Output: True
print(bool(-5))     # Output: True
print(bool(3.14))   # Output: True
print(bool(0.0))    # Output: False

# Strings: empty string is False, any text is True
print(bool(""))        # Output: False
print(bool("hello"))   # Output: True
print(bool("False"))   # Output: True  (it's a non-empty string!)

# None is always False
print(bool(None))   # Output: False

# Empty collections are False
print(bool([]))    # Output: False  (empty list)
print(bool([1]))   # Output: True   (non-empty list)
\`\`\`

## Chaining Conversions

You can chain conversions, but be careful:
\`\`\`python
# Convert "3.14" (string) to a float first, then to int
value = int(float("3.14"))
print(value)  # Output: 3

# If you try int("3.14") directly, it will ERROR
\`\`\`

## Real-World Example

\`\`\`python
# User enters their birth year as text (input() always returns a string)
birth_year_text = "1998"

# We need to do math, so convert to int
birth_year = int(birth_year_text)
current_year = 2024

age = current_year - birth_year
print("Your age is: " + str(age))  # Output: Your age is: 26
\`\`\`

> [!TIP]
> The most common conversion you will use as a beginner is converting the result of \`input()\` to \`int\` or \`float\`, because \`input()\` always returns a string.`,
  objectives: [
    "Understand what type casting is and why it is needed.",
    "Use int(), float(), str(), and bool() to convert between types.",
    "Know which conversions are valid and which will cause errors.",
    "Apply type casting in real-world scenarios."
  ],
  difficulty: "beginner",
  xpReward: 60,
};