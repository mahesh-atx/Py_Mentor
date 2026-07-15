export const rangeFunctionLesson = {
  title: "The range() Function",
  slug: "range-function",
  content: `# The range() Function

The \`range()\` function generates a sequence of numbers. It is one of the most frequently used functions in Python, especially with \`for\` loops. Understanding \`range()\` well will make your loops much more powerful.

## The Theory — Building the Logic

\`range()\` is Python's clever answer to the problem of "I want the numbers from A to B" without paying the memory cost of building a giant list. Rather than storing every number up front, \`range()\` returns a lazy *sequence object* that computes each value only at the moment it is needed — so \`range(1000000)\` is tiny in memory but still lets you loop a million times. The other key idea is that \`range()\` is *half-open*: it includes the start value but stops strictly before the end value, which is why \`range(1, 6)\` yields 1, 2, 3, 4, 5. This half-open design turns out to match how lengths and indexes work in Python (an object of length n is indexed 0 to n-1), so loops line up naturally with real data. The most common logical trap is an off-by-one mistake — forgetting that the stop value is excluded and writing \`range(1, 10)\` when you meant to reach 10.

## Why range() Exists

Without \`range()\`, if you wanted to print numbers 1 to 100, you would need to create a list of 100 numbers manually. \`range()\` generates them on-demand without storing all of them in memory at once.

\`\`\`python
# Without range - tedious and memory-inefficient
for num in [0, 1, 2, 3, 4]:
    print(num)

# With range - clean and efficient
for num in range(5):
    print(num)
\`\`\`

## Three Forms of range()

### Form 1: range(stop)

Generates numbers from \`0\` up to (but NOT including) \`stop\`.

\`\`\`python
range(stop)
\`\`\`

\`\`\`python
for i in range(5):
    print(i)
# Output: 0  1  2  3  4

for i in range(10):
    print(i, end=" ")
# Output: 0 1 2 3 4 5 6 7 8 9

print(list(range(5)))
# Output: [0, 1, 2, 3, 4]
\`\`\`

\`\`\`python
# Print "Hello" 5 times
for _ in range(5):  # _ is used when you don't need the loop variable
    print("Hello!")
\`\`\`

### Form 2: range(start, stop)

Generates numbers from \`start\` up to (but NOT including) \`stop\`.

\`\`\`python
range(start, stop)
\`\`\`

\`\`\`python
for i in range(1, 6):
    print(i)
# Output: 1  2  3  4  5

for i in range(5, 11):
    print(i, end=" ")
# Output: 5 6 7 8 9 10

print(list(range(1, 6)))
# Output: [1, 2, 3, 4, 5]
\`\`\`

\`\`\`python
# Print numbers 1 to 100
for i in range(1, 101):
    print(i, end=" ")
\`\`\`

\`\`\`python
# Sum of numbers 1 to 100
total = 0
for i in range(1, 101):
    total += i
print(total)   # Output: 5050
\`\`\`

### Form 3: range(start, stop, step)

Generates numbers from \`start\` to \`stop\`, jumping by \`step\` each time.

\`\`\`python
range(start, stop, step)
\`\`\`

\`\`\`python
# Every 2nd number (step = 2)
for i in range(0, 11, 2):
    print(i, end=" ")
# Output: 0 2 4 6 8 10

# Every 5th number
for i in range(0, 51, 5):
    print(i, end=" ")
# Output: 0 5 10 15 20 25 30 35 40 45 50

# Odd numbers only
for i in range(1, 20, 2):
    print(i, end=" ")
# Output: 1 3 5 7 9 11 13 15 17 19
\`\`\`

## Counting Backwards (Negative Step)

Use a negative step to count backwards:

\`\`\`python
for i in range(10, 0, -1):
    print(i, end=" ")
# Output: 10 9 8 7 6 5 4 3 2 1

for i in range(5, -1, -1):
    print(i, end=" ")
# Output: 5 4 3 2 1 0
\`\`\`

\`\`\`python
# Countdown
for i in range(10, 0, -1):
    print(f"{i}...")
print("Blast off!")
\`\`\`

\`\`\`python
# Reverse through a list using range
fruits = ["apple", "banana", "cherry", "mango"]
for i in range(len(fruits) - 1, -1, -1):
    print(fruits[i])
# Output: mango  cherry  banana  apple
\`\`\`

## Converting range to Other Types

\`\`\`python
# range to list
numbers = list(range(1, 6))
print(numbers)   # Output: [1, 2, 3, 4, 5]

# range to tuple
numbers = tuple(range(1, 6))
print(numbers)   # Output: (1, 2, 3, 4, 5)

# range to set
numbers = set(range(1, 6))
print(numbers)   # Output: {1, 2, 3, 4, 5}
\`\`\`

## Checking Membership in range

You can use \`in\` with \`range()\` without converting it to a list - very efficient:

\`\`\`python
print(5 in range(10))       # Output: True
print(15 in range(10))      # Output: False
print(5 in range(0, 10, 2)) # Output: False  (0,2,4,6,8 - 5 is not there)
print(4 in range(0, 10, 2)) # Output: True   (0,2,4,6,8 - 4 is there)
\`\`\`

## range() Properties

\`\`\`python
r = range(1, 10)

print(len(r))     # Output: 9   (number of values)
print(r[0])       # Output: 1   (first value)
print(r[-1])      # Output: 9   (last value)
print(r[3])       # Output: 4   (value at index 3)

# range with step
r2 = range(0, 20, 3)
print(list(r2))   # Output: [0, 3, 6, 9, 12, 15, 18]
print(len(r2))    # Output: 7
\`\`\`

## range() is Memory Efficient

\`range()\` does NOT store all numbers in memory. It generates them one at a time as needed:

\`\`\`python
import sys

# A list of 1 million numbers - uses a LOT of memory
big_list = list(range(1000000))
print(sys.getsizeof(big_list))   # Output: ~8,697,464 bytes (~8.7 MB)

# A range of 1 million numbers - uses almost no memory
big_range = range(1000000)
print(sys.getsizeof(big_range))  # Output: 48 bytes (same regardless of size!)
\`\`\`

## Practical Examples

### Times Table Generator

\`\`\`python
table = int(input("Enter a number for its times table: "))

print(f"\\nTimes table for {table}:")
print("-" * 20)

for i in range(1, 13):
    result = table * i
    print(f"{table} x {i:2} = {result}")
\`\`\`

Sample output:
\`\`\`
Enter a number for its times table: 7

Times table for 7:
--------------------
7 x  1 = 7
7 x  2 = 14
7 x  3 = 21
...
7 x 12 = 84
\`\`\`

### FizzBuzz (Classic Programming Problem)

\`\`\`python
# Print 1 to 100
# If divisible by 3: print "Fizz"
# If divisible by 5: print "Buzz"
# If divisible by both: print "FizzBuzz"
# Otherwise: print the number

for i in range(1, 101):
    if i % 15 == 0:    # Divisible by both 3 and 5
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
\`\`\`

### Generating Even/Odd Lists

\`\`\`python
evens = list(range(2, 21, 2))
odds = list(range(1, 21, 2))

print(f"Even numbers: {evens}")
print(f"Odd numbers:  {odds}")
\`\`\`

Output:
\`\`\`
Even numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
Odd numbers:  [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
\`\`\`

### Using range() with Index Access

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango", "grape"]

# Access each element by index
for i in range(len(fruits)):
    print(f"Index {i}: {fruits[i]}")

# Modify elements by index
for i in range(len(fruits)):
    fruits[i] = fruits[i].upper()

print(fruits)
# Output: ['APPLE', 'BANANA', 'CHERRY', 'MANGO', 'GRAPE']
\`\`\`

## Quick Reference

\`\`\`python
range(5)          # 0, 1, 2, 3, 4
range(1, 6)       # 1, 2, 3, 4, 5
range(0, 10, 2)   # 0, 2, 4, 6, 8
range(10, 0, -1)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
range(5, -1, -1)  # 5, 4, 3, 2, 1, 0

# Remember: stop value is NEVER included
# range(1, 6) gives 1, 2, 3, 4, 5  (NOT 6)
\`\`\`

> [!TIP]
> The most common mistake with \`range()\` is forgetting that the stop value is exclusive. If you want numbers 1 to 10, use \`range(1, 11)\` not \`range(1, 10)\`.`,
  objectives: [
    "Use range(stop) to generate numbers from 0 to stop-1.",
    "Use range(start, stop) to generate numbers from start to stop-1.",
    "Use range(start, stop, step) to generate numbers with a custom step.",
    "Use a negative step to count backwards.",
    "Understand that range() is memory efficient."
  ],
  difficulty: "beginner",
  xpReward: 60,
};