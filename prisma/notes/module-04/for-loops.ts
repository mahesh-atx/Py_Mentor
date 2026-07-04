export const forLoopLesson = {
  title: "The for Loop",
  slug: "for-loop",
  content: `# The for Loop

A \`for\` loop lets you **repeat a block of code** for each item in a sequence. Instead of writing the same code ten times, you write it once and let the loop handle the repetition.

## How the for Loop Works

\`\`\`python
for variable in sequence:
    # This block runs once for each item in the sequence
    # 'variable' holds the current item each time
\`\`\`

Each time the loop repeats, the \`variable\` automatically gets the next value from the sequence. This one repetition is called an **iteration**.

## Looping Through a List

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]

for fruit in fruits:
    print(fruit)
\`\`\`

Output:
\`\`\`
apple
banana
cherry
mango
\`\`\`

What is happening step by step:
\`\`\`
Iteration 1: fruit = "apple"  -> print("apple")
Iteration 2: fruit = "banana" -> print("banana")
Iteration 3: fruit = "cherry" -> print("cherry")
Iteration 4: fruit = "mango"  -> print("mango")
Loop ends (no more items)
\`\`\`

More list examples:
\`\`\`python
numbers = [1, 2, 3, 4, 5]

for num in numbers:
    squared = num ** 2
    print(f"{num} squared is {squared}")
\`\`\`

Output:
\`\`\`
1 squared is 1
2 squared is 4
3 squared is 9
4 squared is 16
5 squared is 25
\`\`\`

\`\`\`python
# Summing all numbers in a list
prices = [12.99, 5.49, 8.00, 22.50, 3.99]
total = 0

for price in prices:
    total += price

print(f"Total: \${total:.2f}")   # Output: Total: $52.97
\`\`\`

## Looping Through a String

A string is a sequence of characters, so you can loop through it:

\`\`\`python
word = "Python"

for letter in word:
    print(letter)
\`\`\`

Output:
\`\`\`
P
y
t
h
o
n
\`\`\`

\`\`\`python
# Count vowels in a word
word = "programming"
vowels = "aeiou"
count = 0

for letter in word:
    if letter in vowels:
        count += 1

print(f"Number of vowels in '{word}': {count}")
# Output: Number of vowels in 'programming': 3
\`\`\`

## Looping Through a Tuple

\`\`\`python
coordinates = (10, 20, 30, 40)

for coord in coordinates:
    print(coord)
# Output: 10  20  30  40 (each on a new line)
\`\`\`

## Looping Through a Dictionary

\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

# Loop through keys (default)
for key in student:
    print(key)
# Output: name  age  grade

# Loop through values
for value in student.values():
    print(value)
# Output: Alice  20  A

# Loop through key-value pairs
for key, value in student.items():
    print(f"{key}: {value}")
# Output:
# name: Alice
# age: 20
# grade: A
\`\`\`

## The range() Function with for Loops

\`range()\` generates a sequence of numbers. It is the most common way to loop a specific number of times. We will explore it deeply in a later lesson, but here is the basic usage:

\`\`\`python
# Loop 5 times
for i in range(5):
    print(i)
# Output: 0  1  2  3  4  (starts at 0, stops before 5)
\`\`\`

## Using enumerate() - Get Index and Value

\`enumerate()\` gives you both the **index** (position) and the **value** of each item:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

Output:
\`\`\`
0: apple
1: banana
2: cherry
\`\`\`

Start the index from 1:
\`\`\`python
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
\`\`\`

Output:
\`\`\`
1. apple
2. banana
3. cherry
\`\`\`

## Using zip() - Loop Through Multiple Lists Together

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
\`\`\`

Output:
\`\`\`
Alice: 85
Bob: 92
Charlie: 78
\`\`\`

## Accumulating Values in a Loop

A very common pattern - building up a result across iterations:

\`\`\`python
# Find the sum
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
total = 0

for num in numbers:
    total += num

print(f"Sum: {total}")      # Output: Sum: 55

# Find the maximum
maximum = numbers[0]  # Start with the first element

for num in numbers:
    if num > maximum:
        maximum = num

print(f"Maximum: {maximum}")  # Output: Maximum: 10

# Collect only even numbers
evens = []
for num in numbers:
    if num % 2 == 0:
        evens.append(num)

print(f"Even numbers: {evens}")  # Output: Even numbers: [2, 4, 6, 8, 10]
\`\`\`

## for Loop with else

Python's \`for\` loop has an optional \`else\` block that runs **after the loop finishes normally** (without being interrupted by \`break\`):

\`\`\`python
numbers = [1, 3, 5, 7, 9]

for num in numbers:
    if num % 2 == 0:
        print(f"Found an even number: {num}")
        break
else:
    print("No even numbers found in the list.")

# Output: No even numbers found in the list.
\`\`\`

\`\`\`python
# Search for an item
target = "banana"
fruits = ["apple", "cherry", "mango"]

for fruit in fruits:
    if fruit == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} was not found in the list.")

# Output: banana was not found in the list.
\`\`\`

## Practical Example: Shopping Cart

\`\`\`python
cart = [
    {"name": "Apple",    "price": 1.20, "qty": 3},
    {"name": "Bread",    "price": 2.50, "qty": 1},
    {"name": "Milk",     "price": 1.80, "qty": 2},
    {"name": "Cheese",   "price": 4.50, "qty": 1},
]

print("=" * 40)
print(f"{'Item':<15} {'Price':>8} {'Qty':>5} {'Total':>8}")
print("=" * 40)

grand_total = 0

for item in cart:
    item_total = item["price"] * item["qty"]
    grand_total += item_total
    print(f"{item['name']:<15} \${item['price']:>7.2f} {item['qty']:>5} \${item_total:>7.2f}")

print("=" * 40)
print(f"{'GRAND TOTAL':<29} \${grand_total:>7.2f}")
print("=" * 40)
\`\`\`

Output:
\`\`\`
========================================
Item              Price   Qty    Total
========================================
Apple             $  1.20     3 $   3.60
Bread             $  2.50     1 $   2.50
Milk              $  1.80     2 $   3.60
Cheese            $  4.50     1 $   4.50
========================================
GRAND TOTAL                   $  14.20
========================================
\`\`\`

> [!TIP]
> The \`for\` loop is best used when you know in advance how many times you want to loop, or when you want to process each item in a collection. For unknown repetition counts, use the \`while\` loop.`,
  objectives: [
    "Use a for loop to iterate over lists, strings, tuples, and dictionaries.",
    "Use range() to loop a specific number of times.",
    "Use enumerate() to get both index and value.",
    "Use zip() to loop through multiple lists simultaneously.",
    "Accumulate values across loop iterations."
  ],
  difficulty: "beginner",
  xpReward: 70,
};