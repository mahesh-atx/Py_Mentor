export const listIteratingLesson = {
  title: "Iterating Through Lists",
  slug: "list-iterating",
  content: `# Iterating Through Lists

Iterating means going through each item in a list one by one. Python gives you several ways to do this, each useful in different situations. Under the hood, iteration is driven by the iterator protocol: a \`for\` loop repeatedly asks the list for its next item until none remain, so you loop over values rather than indices. The pitfall is reassigning the loop variable and expecting the list to change — that only rebinds a temporary name, leaving the original data untouched.

## Method 1: Basic for Loop

The simplest and most common way:

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

\`\`\`python
# Doing something with each item
prices = [9.99, 4.50, 14.99, 2.99]
total = 0

for price in prices:
    total += price

print(f"Total: \${total:.2f}")   # Output: Total: $32.47
\`\`\`

## Method 2: enumerate() - With Index

Use \`enumerate()\` when you need both the index and the value:

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

\`\`\`python
# Find items that match a condition and their positions
scores = [85, 42, 92, 58, 78, 35, 90]

print("Failing scores:")
for i, score in enumerate(scores):
    if score < 60:
        print(f"  Index {i}: {score}")
\`\`\`

Output:
\`\`\`
Failing scores:
  Index 1: 42
  Index 3: 58
  Index 5: 35
\`\`\`

## Method 3: range(len()) - With Index Only

Use this when you need the index to modify items or access multiple lists:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
\`\`\`

\`\`\`python
# Modify items in-place (you cannot do this with "for item in list")
prices = [10.0, 25.0, 8.5, 14.99]

for i in range(len(prices)):
    prices[i] = prices[i] * 1.1   # Apply 10% price increase

print(prices)   # Output: [11.0, 27.5, 9.35, 16.489]
\`\`\`

> [!NOTE]
> You cannot modify the list by reassigning \`item\` in a simple \`for item in list\` loop:
> \`\`\`python
> prices = [10.0, 25.0, 8.5]
> for price in prices:
>     price = price * 1.1   # This only changes the LOCAL variable, not the list!
> print(prices)   # Output: [10.0, 25.0, 8.5]  (unchanged!)
> \`\`\`

## Method 4: zip() - Multiple Lists Together

\`\`\`python
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
\`\`\`

Output:
\`\`\`
Alice: 88
Bob: 72
Charlie: 95
\`\`\`

\`\`\`python
# Three lists at once
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]
cities = ["New York", "London", "Paris"]

for name, score, city in zip(names, scores, cities):
    grade = "Pass" if score >= 60 else "Fail"
    print(f"{name} ({city}): {score} - {grade}")
\`\`\`

Output:
\`\`\`
Alice (New York): 88 - Pass
Bob (London): 72 - Pass
Charlie (Paris): 95 - Pass
\`\`\`

## Method 5: while Loop - When Condition Matters

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]
index = 0

while index < len(fruits):
    print(fruits[index])
    index += 1
\`\`\`

\`\`\`python
# Process until a condition is met
numbers = [3, 7, 2, 9, 1, 8, 4]
total = 0
i = 0

# Sum numbers until total exceeds 15
while i < len(numbers) and total <= 15:
    total += numbers[i]
    print(f"Added {numbers[i]}, total = {total}")
    i += 1

print(f"Stopped at index {i-1}")
\`\`\`

## Method 6: Reversed Iteration

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Method 1: reversed() function
for fruit in reversed(fruits):
    print(fruit)

# Method 2: slicing
for fruit in fruits[::-1]:
    print(fruit)

# Method 3: range with negative step
for i in range(len(fruits)-1, -1, -1):
    print(fruits[i])
\`\`\`

## Iteration with Conditions

\`\`\`python
numbers = [5, -3, 8, -1, 12, -7, 4, -2, 9]

# Using continue to skip
print("Positive numbers only:")
for num in numbers:
    if num <= 0:
        continue
    print(num, end=" ")
print()

# Using break to stop early
print("Numbers until we hit a negative:")
for num in numbers:
    if num < 0:
        break
    print(num, end=" ")
print()
\`\`\`

Output:
\`\`\`
Positive numbers only:
5 8 12 4 9
Numbers until we hit a negative:
5
\`\`\`

## Accumulating While Iterating

Very common patterns:

\`\`\`python
numbers = [4, 7, 2, 9, 1, 8, 3, 6, 5]

# Running total
running_total = 0
for num in numbers:
    running_total += num
    print(f"Added {num:2}, total = {running_total}")
\`\`\`

\`\`\`python
# Find maximum and its index
scores = [85, 92, 78, 95, 88, 91]
max_score = scores[0]
max_index = 0

for i, score in enumerate(scores):
    if score > max_score:
        max_score = score
        max_index = i

print(f"Best score: {max_score} at position {max_index}")
# Output: Best score: 95 at position 3
\`\`\`

## Practical Example: Inventory Manager

\`\`\`python
inventory = [
    {"item": "Laptop",   "price": 999.99, "stock": 15},
    {"item": "Mouse",    "price": 29.99,  "stock": 0},
    {"item": "Keyboard", "price": 79.99,  "stock": 8},
    {"item": "Monitor",  "price": 349.99, "stock": 0},
    {"item": "Headset",  "price": 59.99,  "stock": 22},
]

print(f"{'Item':<12} {'Price':>10} {'Stock':>7} {'Status':>12}")
print("=" * 46)

total_value = 0
out_of_stock = []

for product in inventory:
    value = product["price"] * product["stock"]
    total_value += value
    status = "In Stock" if product["stock"] > 0 else "OUT OF STOCK"

    if product["stock"] == 0:
        out_of_stock.append(product["item"])

    print(f"{product['item']:<12} \${product['price']:>9.2f} {product['stock']:>7} {status:>12}")

print("=" * 46)
print(f"Total inventory value: \${total_value:,.2f}")
print(f"Out of stock items: {', '.join(out_of_stock)}")
\`\`\`

Output:
\`\`\`
Item           Price   Stock       Status
==============================================
Laptop       $999.99      15     In Stock
Mouse         $29.99       0  OUT OF STOCK
Keyboard      $79.99       8     In Stock
Monitor      $349.99       0  OUT OF STOCK
Headset       $59.99      22     In Stock
==============================================
Total inventory value: $17,217.63
Out of stock items: Mouse, Monitor
\`\`\`

## Choosing the Right Iteration Method

\`\`\`
Situation                              Method
-------------------------------------  ----------------------
Just need values                       for item in list
Need index too                         enumerate()
Need to MODIFY items in-place          range(len(list))
Two lists in parallel                  zip()
Until a condition changes              while loop
Go backwards                           reversed() or [::-1]
\`\`\`

> [!TIP]
> The simple \`for item in list\` loop is the most Pythonic and readable. Only use \`range(len())\` when you specifically need the index to modify the list. Use \`enumerate()\` when you need both the index and value. Never use \`range(len())\` just to access values - that is what \`for item in list\` is for.`,
  objectives: [
    "Use a for loop to iterate over list items.",
    "Use enumerate() to iterate with both index and value.",
    "Use range(len()) to iterate when you need to modify items in-place.",
    "Use zip() to iterate over multiple lists simultaneously.",
    "Know which iteration method to use in different situations."
  ],
  difficulty: "beginner",
  xpReward: 60,
};