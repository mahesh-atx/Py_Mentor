export const logicalOperatorsLesson = {
  title: "Logical Operators",
  slug: "logical-operators",
  content: `# Logical Operators

Logical operators let you combine multiple conditions together. Instead of asking one yes/no question, you can ask multiple questions at once and combine their answers.

Under the hood, \`and\`/\`or\`/\`not\` follow fixed truth tables and use short-circuit evaluation (e.g., \`False and (1/0)\` is safe, but \`5 or 10\` returns \`5\`, not \`True\`).

## The Operators

\`\`\`
Operator    Description
--------    ------------------------------------
and         True if BOTH conditions are True
or          True if AT LEAST ONE condition is True
not         Reverses the boolean value
\`\`\`

## and Operator

The \`and\` operator returns \`True\` only if **both** conditions are \`True\`. If either one is \`False\`, the result is \`False\`.

Think of it like: "I will go to the park if it is sunny AND I have free time."

### Truth Table for and

\`\`\`
Condition A    Condition B    A and B
-----------    -----------    -------
True           True           True
True           False          False
False          True           False
False          False          False
\`\`\`

### Examples

\`\`\`python
print(True and True)    # Output: True
print(True and False)   # Output: False
print(False and True)   # Output: False
print(False and False)  # Output: False
\`\`\`

With real conditions:
\`\`\`python
age = 25
has_id = True

# Both must be True to enter
can_enter = age >= 18 and has_id
print(can_enter)   # Output: True

# Example where one condition fails
age = 15
can_enter = age >= 18 and has_id
print(can_enter)   # Output: False  (age check failed)
\`\`\`

Practical example:
\`\`\`python
username = "alice"
password = "secret"

entered_user = input("Username: ")
entered_pass = input("Password: ")

if entered_user == username and entered_pass == password:
    print("Welcome, Alice!")
else:
    print("Invalid credentials.")
\`\`\`

## or Operator

The \`or\` operator returns \`True\` if **at least one** condition is \`True\`. It only returns \`False\` when **both** conditions are \`False\`.

Think of it like: "I will eat pizza OR pasta for dinner."

### Truth Table for or

\`\`\`
Condition A    Condition B    A or B
-----------    -----------    ------
True           True           True
True           False          True
False          True           True
False          False          False
\`\`\`

### Examples

\`\`\`python
print(True or True)    # Output: True
print(True or False)   # Output: True
print(False or True)   # Output: True
print(False or False)  # Output: False
\`\`\`

With real conditions:
\`\`\`python
is_weekend = True
is_holiday = False

# Either one being True means no work
day_off = is_weekend or is_holiday
print(day_off)   # Output: True

# Both are False - must go to work
is_weekend = False
is_holiday = False
day_off = is_weekend or is_holiday
print(day_off)   # Output: False
\`\`\`

Practical example:
\`\`\`python
favorite_color = input("Enter your favorite color: ")

if favorite_color == "red" or favorite_color == "blue" or favorite_color == "green":
    print("That is a primary color!")
else:
    print("That is not a primary color.")
\`\`\`

## not Operator

The \`not\` operator **reverses** a boolean value. \`True\` becomes \`False\`, and \`False\` becomes \`True\`.

Think of it like: "If it is NOT raining, I will go for a walk."

### Examples

\`\`\`python
print(not True)    # Output: False
print(not False)   # Output: True

is_raining = False
print(not is_raining)   # Output: True

is_logged_in = True
print(not is_logged_in) # Output: False
\`\`\`

With conditions:
\`\`\`python
is_raining = False

if not is_raining:
    print("Great weather for a walk!")
else:
    print("Stay inside.")
# Output: Great weather for a walk!
\`\`\`

\`\`\`python
is_empty = len("hello") == 0
print(is_empty)        # Output: False
print(not is_empty)    # Output: True
\`\`\`

## Combining Logical Operators

You can combine \`and\`, \`or\`, and \`not\` together:

\`\`\`python
age = 25
has_ticket = True
is_vip = False

# Can enter if: has ticket AND (is 18+ OR is VIP)
can_enter = has_ticket and (age >= 18 or is_vip)
print(can_enter)   # Output: True
\`\`\`

\`\`\`python
temperature = 22
is_sunny = True
is_windy = False

# Good weather: sunny AND not windy AND temperature between 18 and 30
good_weather = is_sunny and not is_windy and 18 <= temperature <= 30
print(good_weather)   # Output: True
\`\`\`

## Short-Circuit Evaluation

Python is smart about evaluating logical expressions. It stops as soon as it knows the final result:

**For \`and\`**: If the first condition is \`False\`, Python does not even check the second condition (the result must be \`False\` anyway).

**For \`or\`**: If the first condition is \`True\`, Python does not even check the second condition (the result must be \`True\` anyway).

\`\`\`python
x = 0

# Short circuit with and - second condition not evaluated
# because x == 0 is already False
result = x != 0 and (10 / x > 1)
print(result)   # Output: False  (no ZeroDivisionError!)

# Short circuit with or - second condition not evaluated
# because True is already True
result = True or (10 / 0 > 1)
print(result)   # Output: True  (no ZeroDivisionError!)
\`\`\`

## Logical Operators with Non-Boolean Values

In Python, \`and\` and \`or\` do not always return \`True\` or \`False\`. They return one of the actual values:

\`\`\`python
# 'and' returns the first falsy value, or the last value if all are truthy
print(5 and 10)      # Output: 10
print(0 and 10)      # Output: 0   (0 is falsy, returned immediately)
print("" and "hi")  # Output:     (empty string is falsy)

# 'or' returns the first truthy value, or the last value if all are falsy
print(5 or 10)       # Output: 5   (5 is truthy, returned immediately)
print(0 or 10)       # Output: 10
print("" or "hi")   # Output: hi
print(0 or "")       # Output:     (last value when all are falsy)
\`\`\`

A common use of this: providing default values:
\`\`\`python
user_input = ""
name = user_input or "Guest"
print(name)   # Output: Guest  (user_input was empty, so used default)

user_input = "Alice"
name = user_input or "Guest"
print(name)   # Output: Alice  (user_input was truthy, used it)
\`\`\`

## Practical Example: Loan Eligibility

\`\`\`python
age = int(input("Enter your age: "))
income = float(input("Enter your monthly income: "))
credit_score = int(input("Enter your credit score: "))
has_existing_loan = input("Do you have an existing loan? (yes/no): ") == "yes"

# Eligibility conditions
age_ok = age >= 21 and age <= 65
income_ok = income >= 3000
credit_ok = credit_score >= 700
no_existing_loan = not has_existing_loan

if age_ok and income_ok and credit_ok and no_existing_loan:
    print("Congratulations! You are eligible for a loan.")
else:
    print("Sorry, you do not meet the loan requirements.")
    if not age_ok:
        print("- Age must be between 21 and 65.")
    if not income_ok:
        print("- Monthly income must be at least $3000.")
    if not credit_ok:
        print("- Credit score must be at least 700.")
    if not no_existing_loan:
        print("- You cannot have an existing loan.")
\`\`\`

> [!TIP]
> Use parentheses to group conditions when combining \`and\` and \`or\` together. It makes your code easier to read and avoids unexpected results due to operator precedence.`,
  objectives: [
    "Use the and operator to combine conditions where all must be True.",
    "Use the or operator to combine conditions where at least one must be True.",
    "Use the not operator to reverse a boolean value.",
    "Understand short-circuit evaluation.",
    "Combine multiple logical operators in complex conditions."
  ],
  difficulty: "beginner",
  xpReward: 65,
};