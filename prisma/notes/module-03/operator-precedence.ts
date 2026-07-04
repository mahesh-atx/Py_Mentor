export const operatorPrecedenceLesson = {
  title: "Operator Precedence",
  slug: "operator-precedence",
  content: `# Operator Precedence

When you write an expression with multiple operators, Python needs to know which operation to perform first. **Operator precedence** defines the order in which operators are evaluated.

This is exactly like the BODMAS/PEMDAS rule you learned in math class.

## The Precedence Table

Operators higher in the table are evaluated **first**. Operators on the same row have equal precedence (evaluated left to right).

\`\`\`
Priority    Operator(s)              Description
--------    ----------------------   ---------------------------
1 (High)    ()                       Parentheses
2           **                       Exponentiation
3           ~x, +x, -x               Unary NOT, Plus, Minus
4           *, /, //, %              Multiplication, Division
5           +, -                     Addition, Subtraction
6           <<, >>                   Bitwise Shifts
7           &                        Bitwise AND
8           ^                        Bitwise XOR
9           |                        Bitwise OR
10          ==, !=, >, <, >=, <=     Comparisons
            is, is not, in, not in
11          not                      Logical NOT
12          and                      Logical AND
13 (Low)    or                       Logical OR
\`\`\`

## Basic Examples

\`\`\`python
# Without knowing precedence, what is the answer?
result = 2 + 3 * 4
print(result)   # Output: 14  (NOT 20!)
# Multiplication (*) has higher precedence than addition (+)
# So: 3 * 4 = 12 first, then 2 + 12 = 14
\`\`\`

\`\`\`python
result = 10 - 4 / 2
print(result)   # Output: 8.0
# Division first: 4 / 2 = 2.0
# Then: 10 - 2.0 = 8.0
\`\`\`

\`\`\`python
result = 2 ** 3 + 1
print(result)   # Output: 9
# Exponent first: 2 ** 3 = 8
# Then: 8 + 1 = 9
\`\`\`

## Parentheses Override Everything

Use parentheses \`()\` to force a specific evaluation order. They always have the highest priority.

\`\`\`python
# Without parentheses
print(2 + 3 * 4)    # Output: 14  (3*4 first)

# With parentheses
print((2 + 3) * 4)  # Output: 20  (2+3 first)
\`\`\`

\`\`\`python
# Compound interest formula
principal = 1000
rate = 0.05
years = 3

# Wrong (missing parentheses)
wrong = principal * 1 + rate ** years
print(wrong)    # Output: 1000.000125  (wrong!)

# Correct (parentheses enforce proper order)
correct = principal * (1 + rate) ** years
print(correct)  # Output: 1157.625  (correct!)
\`\`\`

## Left-to-Right Evaluation (Same Precedence)

When operators have the same precedence, they are evaluated **left to right**:

\`\`\`python
print(10 - 3 - 2)    # Output: 5
# Left to right: (10 - 3) - 2 = 7 - 2 = 5

print(10 / 2 * 3)    # Output: 15.0
# Left to right: (10 / 2) * 3 = 5.0 * 3 = 15.0

print(100 / 10 / 2)  # Output: 5.0
# Left to right: (100 / 10) / 2 = 10.0 / 2 = 5.0
\`\`\`

**Exception: Exponentiation is right to left!**

\`\`\`python
print(2 ** 3 ** 2)    # Output: 512  (NOT 64!)
# Right to left: 2 ** (3 ** 2) = 2 ** 9 = 512

# Compare with left to right (using parentheses):
print((2 ** 3) ** 2)  # Output: 64
# (2 ** 3) ** 2 = 8 ** 2 = 64
\`\`\`

## Arithmetic Precedence Examples

\`\`\`python
# Example 1
result = 5 + 3 * 2 - 1
# Step 1: 3 * 2 = 6
# Step 2: 5 + 6 - 1 = 10
print(result)    # Output: 10

# Example 2
result = 10 % 3 + 4 // 2
# Step 1: 10 % 3 = 1  (remainder)
# Step 2: 4 // 2 = 2  (floor division)
# Step 3: 1 + 2 = 3
print(result)    # Output: 3

# Example 3
result = 2 ** 2 ** 3
# Right to left: 2 ** (2 ** 3) = 2 ** 8 = 256
print(result)    # Output: 256

# Example 4
result = -2 ** 2
# Unary minus is LOWER than **: -(2**2) = -4
print(result)    # Output: -4
# To get positive 4: use (-2) ** 2
print((-2) ** 2) # Output: 4
\`\`\`

## Comparison and Logical Precedence

\`\`\`python
# Comparisons are evaluated before logical operators
result = 5 > 3 and 10 < 20
# Step 1: 5 > 3 = True
# Step 2: 10 < 20 = True
# Step 3: True and True = True
print(result)    # Output: True

result = 5 > 3 or 10 > 20 and False
# 'and' has higher precedence than 'or'
# Step 1: 10 > 20 = False
# Step 2: False and False = False
# Step 3: 5 > 3 = True
# Step 4: True or False = True
print(result)    # Output: True
\`\`\`

\`\`\`python
# 'not' has higher precedence than 'and' and 'or'
result = not True and False
# Step 1: not True = False
# Step 2: False and False = False
print(result)    # Output: False

result = not False or True
# Step 1: not False = True
# Step 2: True or True = True
print(result)    # Output: True
\`\`\`

## Using Parentheses for Clarity

Even when parentheses are not required, you can use them to make your code more readable:

\`\`\`python
# Hard to read
result = a + b * c - d / e ** 2

# Much clearer with parentheses
result = a + (b * c) - (d / (e ** 2))
\`\`\`

\`\`\`python
age = 25
has_id = True
is_member = False

# Hard to read
if age >= 18 and has_id or is_member:
    print("Access granted")

# Much clearer
if (age >= 18 and has_id) or is_member:
    print("Access granted")
\`\`\`

## Step-by-Step Breakdown Tool

You can use Python's intermediate variables to break down complex expressions:

\`\`\`python
# Complex expression
result = 3 + 4 ** 2 // 5 - 1

# Breaking it down step by step:
step1 = 4 ** 2       # Exponent first: 16
step2 = step1 // 5   # Floor division: 3
step3 = 3 + step2    # Addition: 6
step4 = step3 - 1    # Subtraction: 5
result = step4

print(result)   # Output: 5

# Verify
print(3 + 4 ** 2 // 5 - 1)  # Output: 5
\`\`\`

## Practical Example: BMI Calculator

\`\`\`python
weight_kg = float(input("Enter your weight (kg): "))
height_m = float(input("Enter your height (m): "))

# BMI = weight / height^2
# Without parentheses understanding, this could be written wrong
bmi = weight_kg / height_m ** 2
# Correctly evaluated as: weight_kg / (height_m ** 2)
# because ** has higher precedence than /

print(f"Your BMI is: {bmi:.2f}")

if bmi < 18.5:
    print("Underweight")
elif 18.5 <= bmi < 25:
    print("Normal weight")
elif 25 <= bmi < 30:
    print("Overweight")
else:
    print("Obese")
\`\`\`

## Quick Reference

\`\`\`python
# Memorize this order (high to low):
# 1. ()   - Parentheses
# 2. **   - Exponentiation (right to left)
# 3. * / // %  - Multiplication/Division (left to right)
# 4. + -  - Addition/Subtraction (left to right)
# 5. Comparisons (==, !=, >, <, >=, <=, is, in)
# 6. not
# 7. and
# 8. or

print(2 + 3 * 4)         # 14  (not 20)
print((2 + 3) * 4)       # 20
print(2 ** 3 + 1)         # 9   (not 16)
print(not True or False)  # False (not has priority)
print(not (True or False)) # False
\`\`\`

> [!TIP]
> When in doubt, use parentheses. They make your intention clear, prevent bugs from incorrect precedence assumptions, and make your code easier for others to read. A good rule: if you have to think about precedence, just add parentheses.`,
  objectives: [
    "Understand what operator precedence means.",
    "Know the order of precedence for arithmetic, comparison, and logical operators.",
    "Use parentheses to control the order of evaluation.",
    "Recognize that exponentiation is evaluated right to left.",
    "Write clear expressions using parentheses for readability."
  ],
  difficulty: "beginner",
  xpReward: 65,
};