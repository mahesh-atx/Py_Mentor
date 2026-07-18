export const arithmeticOperatorsLesson = {
  title: "Arithmetic Operators",
  slug: "arithmetic-operators",
  content: `# Arithmetic Operators

Arithmetic operators are used to perform basic mathematical operations. If you have done any math in school, these will feel very familiar.

Under the hood, every arithmetic operation produces a brand-new value rather than modifying the originals - numbers are objects, so \`5 + 3\` really calls \`int.__add__\`, which is why adding two strings joins them. The common pitfall is assuming \`/\` returns an integer, or that \`-7 // 2\` rounds toward zero; floor division always rounds *down*, so it gives -4, not -3.

## The Operators

\`\`\`
Operator    Name                 Example
--------    ----------------     --------
+           Addition             5 + 3
-           Subtraction          5 - 3
*           Multiplication       5 * 3
/           Division             5 / 3
//          Floor Division       5 // 3
%           Modulus (Remainder)  5 % 3
**          Exponentiation       5 ** 3
\`\`\`

## Addition (+)

Adds two values together.

\`\`\`python
a = 10
b = 3

result = a + b
print(result)   # Output: 13

# Works with floats too
x = 5.5
y = 2.3
print(x + y)    # Output: 7.8

# Adding two strings (concatenation)
first = "Hello"
second = " World"
print(first + second)  # Output: Hello World
\`\`\`

## Subtraction (-)

Subtracts the right value from the left value.

\`\`\`python
a = 10
b = 3

print(a - b)    # Output: 7
print(b - a)    # Output: -3  (can be negative)

# Real world example
wallet = 100.00
coffee_price = 4.50
wallet = wallet - coffee_price
print(wallet)   # Output: 95.5
\`\`\`

## Multiplication (*)

Multiplies two values together.

\`\`\`python
a = 10
b = 3

print(a * b)    # Output: 30

# Multiplying a string repeats it
print("ha" * 3)   # Output: hahaha
print("-" * 20)   # Output: --------------------

# Real world example
price_per_item = 5.99
quantity = 4
total = price_per_item * quantity
print(total)    # Output: 23.96
\`\`\`

## Division (/)

Divides the left value by the right value. Always returns a **float**.

\`\`\`python
a = 10
b = 3

print(a / b)    # Output: 3.3333333333333335
print(10 / 2)   # Output: 5.0   (still a float, even if it divides evenly)
print(9 / 3)    # Output: 3.0

# Type is always float
result = 10 / 2
print(type(result))  # Output: <class 'float'>
\`\`\`

Division by zero will cause an error:
\`\`\`python
print(10 / 0)   # ZeroDivisionError: division by zero
\`\`\`

Safe division:
\`\`\`python
numerator = 10
denominator = 0

if denominator != 0:
    print(numerator / denominator)
else:
    print("Cannot divide by zero!")
\`\`\`

## Floor Division (//)

Divides and returns only the **whole number part** of the result (rounds down).

\`\`\`python
a = 10
b = 3

print(a // b)    # Output: 3   (10 / 3 = 3.33, floor = 3)
print(7 // 2)    # Output: 3   (7 / 2 = 3.5, floor = 3)
print(9 // 3)    # Output: 3   (9 / 3 = 3.0, floor = 3)

# Works with negatives too (always rounds DOWN, not towards zero)
print(-7 // 2)   # Output: -4  (-7 / 2 = -3.5, floor = -4)
\`\`\`

Real world example - how many full boxes can you fill?
\`\`\`python
total_apples = 47
apples_per_box = 10

full_boxes = total_apples // apples_per_box
leftover = total_apples % apples_per_box

print(f"Full boxes: {full_boxes}")   # Output: Full boxes: 4
print(f"Leftover: {leftover}")       # Output: Leftover: 7
\`\`\`

## Modulus (%)

Returns the **remainder** after division.

\`\`\`python
a = 10
b = 3

print(a % b)    # Output: 1   (10 = 3*3 + 1, remainder is 1)
print(7 % 2)    # Output: 1   (7 = 2*3 + 1)
print(9 % 3)    # Output: 0   (9 = 3*3 + 0, no remainder)
print(5 % 10)   # Output: 5   (5 = 0*10 + 5)
\`\`\`

Common use cases of modulus:

\`\`\`python
# Check if a number is even or odd
number = 17
if number % 2 == 0:
    print("Even")
else:
    print("Odd")
# Output: Odd

# Check if a number is divisible by another
year = 2024
if year % 4 == 0:
    print("Leap year candidate")
# Output: Leap year candidate

# Get the last digit of a number
number = 12345
last_digit = number % 10
print(last_digit)   # Output: 5
\`\`\`

## Exponentiation (**)

Raises the left value to the power of the right value.

\`\`\`python
print(2 ** 3)    # Output: 8    (2 * 2 * 2)
print(3 ** 2)    # Output: 9    (3 * 3)
print(5 ** 0)    # Output: 1    (anything to the power of 0 is 1)
print(10 ** 6)   # Output: 1000000

# Square root using **
import math
print(16 ** 0.5)      # Output: 4.0   (square root)
print(math.sqrt(16))  # Output: 4.0   (same result)

# Cube root
print(27 ** (1/3))    # Output: 3.0
\`\`\`

Real world example - compound interest:
\`\`\`python
principal = 1000      # Starting amount
rate = 0.05           # 5% annual interest rate
years = 10

final_amount = principal * (1 + rate) ** years
print(f"After {years} years: \${final_amount:.2f}")
# Output: After 10 years: $1628.89
\`\`\`

## Using Arithmetic with Variables

\`\`\`python
# Temperature converter: Celsius to Fahrenheit
celsius = 100
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}C = {fahrenheit}F")   # Output: 100C = 212.0F

# Area and perimeter of a rectangle
length = 8
width = 5

area = length * width
perimeter = 2 * (length + width)

print(f"Area: {area}")           # Output: Area: 40
print(f"Perimeter: {perimeter}") # Output: Perimeter: 26

# Simple interest
principal = 5000
rate = 3.5
time = 2

interest = (principal * rate * time) / 100
print(f"Interest earned: \${interest}")  # Output: Interest earned: $350.0
\`\`\`

## Summary

\`\`\`python
a, b = 10, 3

print(f"a + b  = {a + b}")    # 13
print(f"a - b  = {a - b}")    # 7
print(f"a * b  = {a * b}")    # 30
print(f"a / b  = {a / b}")    # 3.3333...
print(f"a // b = {a // b}")   # 3
print(f"a % b  = {a % b}")    # 1
print(f"a ** b = {a ** b}")   # 1000
\`\`\`

> [!TIP]
> Remember that \`/\` always returns a float, while \`//\` always returns an integer (when both operands are integers). The modulus operator \`%\` is extremely useful for checking divisibility and finding remainders.`,
  objectives: [
    "Use all 7 arithmetic operators: +, -, *, /, //, %, **.",
    "Understand the difference between / and //.",
    "Use the modulus operator to find remainders.",
    "Apply arithmetic operators in real-world scenarios."
  ],
  difficulty: "beginner",
  xpReward: 60,
};