export const assignmentOperatorsLesson = {
  title: "Assignment Operators",
  slug: "assignment-operators",
  content: `# Assignment Operators

Assignment operators are used to **store values in variables**. You already know the basic \`=\` operator. Python also has shorthand operators that combine assignment with arithmetic in one step.

At its core, \`=\` is a *command* that binds a name to a value (a reference to an object in memory), not a statement of mathematical truth - which is why \`x += 5\` just re-binds \`x\` to a fresh result. The common pitfall is reading \`=\` as \"is equal to\" and writing \`if x = 5\`, which assigns instead of comparing and raises an error.

## The Basic Assignment Operator (=)

The \`=\` operator stores a value in a variable.

\`\`\`python
name = "Alice"       # Store string in name
age = 25             # Store integer in age
price = 9.99         # Store float in price
is_active = True     # Store boolean in is_active

print(name)          # Output: Alice
print(age)           # Output: 25
\`\`\`

## Compound Assignment Operators

These operators combine an arithmetic operation with assignment. Instead of writing \`x = x + 5\`, you can write \`x += 5\`. They both do the exact same thing.

### All Compound Assignment Operators

\`\`\`
Operator    Example       Same As          Description
--------    ----------    -------------    -----------------------
+=          x += 5        x = x + 5        Add and assign
-=          x -= 5        x = x - 5        Subtract and assign
*=          x *= 5        x = x * 5        Multiply and assign
/=          x /= 5        x = x / 5        Divide and assign
//=         x //= 5       x = x // 5       Floor divide and assign
%=          x %= 5        x = x % 5        Modulus and assign
**=         x **= 5       x = x ** 5       Exponentiate and assign
\`\`\`

## += (Add and Assign)

\`\`\`python
score = 0
print(score)   # Output: 0

score += 10    # Same as: score = score + 10
print(score)   # Output: 10

score += 5
print(score)   # Output: 15

score += 25
print(score)   # Output: 40
\`\`\`

Works with strings too (concatenation):
\`\`\`python
message = "Hello"
message += ", World"
message += "!"
print(message)   # Output: Hello, World!
\`\`\`

Real world example - adding to a shopping cart total:
\`\`\`python
total = 0.0

total += 12.99   # Added item 1
total += 5.49    # Added item 2
total += 8.00    # Added item 3

print(f"Cart total: \${total:.2f}")  # Output: Cart total: $26.48
\`\`\`

## -= (Subtract and Assign)

\`\`\`python
health = 100
print(health)   # Output: 100

health -= 20    # Took damage
print(health)   # Output: 80

health -= 15
print(health)   # Output: 65
\`\`\`

Real world example - countdown:
\`\`\`python
remaining_days = 30

remaining_days -= 7
print(f"Days remaining: {remaining_days}")  # Output: Days remaining: 23

remaining_days -= 7
print(f"Days remaining: {remaining_days}")  # Output: Days remaining: 16
\`\`\`

## *= (Multiply and Assign)

\`\`\`python
price = 10
quantity = 3

price *= quantity   # Same as: price = price * quantity
print(price)        # Output: 30

# Double a value
value = 5
value *= 2
print(value)    # Output: 10

value *= 2
print(value)    # Output: 20
\`\`\`

Works with strings (repetition):
\`\`\`python
line = "-"
line *= 20
print(line)   # Output: --------------------
\`\`\`

## /= (Divide and Assign)

\`\`\`python
total = 100.0

# Split equally among 4 people
share = total
share /= 4
print(share)   # Output: 25.0

# Always returns float
number = 20
number /= 4
print(number)        # Output: 5.0
print(type(number))  # Output: <class 'float'>
\`\`\`

## //= (Floor Divide and Assign)

\`\`\`python
items = 47

# How many groups of 5 can you make?
items //= 5
print(items)   # Output: 9

number = 100
number //= 3
print(number)   # Output: 33
\`\`\`

## %= (Modulus and Assign)

\`\`\`python
number = 17

number %= 5
print(number)   # Output: 2   (17 % 5 = 2)

# Useful for cycling through values
position = 7
position %= 3   # Keeps value within 0, 1, 2
print(position) # Output: 1
\`\`\`

## **= (Exponentiate and Assign)

\`\`\`python
base = 2

base **= 3
print(base)   # Output: 8   (2 ** 3 = 8)

value = 3
value **= 4
print(value)  # Output: 81  (3 ** 4 = 81)
\`\`\`

## Walrus Operator (:=) - Python 3.8+

Python 3.8 introduced the walrus operator \`:=\`, which assigns a value to a variable as part of an expression.

\`\`\`python
# Without walrus operator
data = input("Enter something: ")
if len(data) > 5:
    print(f"Long input: {data}")

# With walrus operator (assigns and checks in one step)
if (n := len(input("Enter something: "))) > 5:
    print(f"Input is {n} characters long")
\`\`\`

Another example:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Process items while there are items to process
while chunk := numbers[:3]:
    print(chunk)
    numbers = numbers[3:]
\`\`\`

## Practical Example: Simple Game Score Tracker

\`\`\`python
player_name = input("Enter player name: ")
score = 0
lives = 3
level = 1

print(f"\\nGame started for {player_name}!")
print(f"Score: {score} | Lives: {lives} | Level: {level}")

# Simulate game events
score += 100       # Completed a level
level += 1
print(f"\\nLevel complete! Score: {score}, Level: {level}")

score += 250       # Boss defeated
print(f"Boss defeated! Score: {score}")

lives -= 1         # Lost a life
print(f"Oops! Lives remaining: {lives}")

score *= 2         # Double score power-up
print(f"Double score activated! Score: {score}")

score //= 10       # Display in simplified form
print(f"\\nFinal score card: {score}")
\`\`\`

Sample output:
\`\`\`
Enter player name: Alice

Game started for Alice!
Score: 0 | Lives: 3 | Level: 1

Level complete! Score: 100, Level: 2
Boss defeated! Score: 350
Oops! Lives remaining: 2
Double score activated! Score: 700

Final score card: 70
\`\`\`

> [!TIP]
> Compound assignment operators like \`+=\` and \`-=\` are used constantly in real programs, especially in loops where you accumulate totals, count items, or track changing values. Get comfortable with them early.`,
  objectives: [
    "Use the basic = assignment operator.",
    "Use all compound assignment operators: +=, -=, *=, /=, //=, %=, **=.",
    "Understand that compound operators are shorthand for longer expressions.",
    "Apply assignment operators in real-world scenarios like score tracking."
  ],
  difficulty: "beginner",
  xpReward: 55,
};