export const listMethodsRemoveLesson = {
  title: "List Methods - Removing Items",
  slug: "list-methods-remove",
  content: `# List Methods - Removing Items

Python gives you several ways to remove items from a list: \`remove()\`, \`pop()\`, and \`clear()\`. Each one works differently.

## The Theory — Building the Logic

Removing items is really about shifting references inside the same list object so the remaining items stay contiguous. \`remove()\` finds a value then deletes it, \`pop()\` deletes by position and hands the value back, and \`clear()\` empties everything while keeping the same list object. Because deletion shifts later elements left, removing items while iterating forward can skip the neighbor that slides into the deleted slot. The pitfall is forgetting that \`remove()\` only deletes the first match and raises \`ValueError\` if the value is absent.

## remove() - Remove by Value

\`remove(value)\` finds the **first occurrence** of the value and removes it.

\`\`\`python
fruits = ["apple", "banana", "cherry", "banana"]

fruits.remove("banana")   # Removes the FIRST "banana"
print(fruits)   # Output: ['apple', 'cherry', 'banana']
\`\`\`

\`\`\`python
numbers = [1, 2, 3, 4, 5]
numbers.remove(3)
print(numbers)   # Output: [1, 2, 4, 5]
\`\`\`

### ValueError if Item Not Found

\`\`\`python
fruits = ["apple", "banana", "cherry"]

fruits.remove("mango")   # ValueError: list.remove(x): x not in list
\`\`\`

Safe removal - check before removing:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
item = "mango"

if item in fruits:
    fruits.remove(item)
    print(f"Removed {item}")
else:
    print(f"{item} not in list")
# Output: mango not in list
\`\`\`

## pop() - Remove by Index

\`pop(index)\` removes the item at the given index and **returns it** so you can use the removed value.

### pop() with No Argument - Removes Last Item

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]

last = fruits.pop()   # Removes and returns last item
print(last)     # Output: mango
print(fruits)   # Output: ['apple', 'banana', 'cherry']
\`\`\`

### pop(index) - Remove at Specific Index

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]

removed = fruits.pop(1)   # Remove item at index 1
print(removed)   # Output: banana
print(fruits)    # Output: ['apple', 'cherry', 'mango']
\`\`\`

\`\`\`python
# pop() with negative index
numbers = [1, 2, 3, 4, 5]

first = numbers.pop(0)    # Remove first item
print(first)    # Output: 1
print(numbers)  # Output: [2, 3, 4, 5]

second_last = numbers.pop(-2)  # Remove second to last
print(second_last)  # Output: 3
print(numbers)      # Output: [2, 4, 5]
\`\`\`

### pop() Returns the Removed Value

This is the key advantage of \`pop()\` - you can use the removed item:

\`\`\`python
# Stack implementation (Last In, First Out)
stack = []
stack.append("first")
stack.append("second")
stack.append("third")

print(stack)           # Output: ['first', 'second', 'third']

item = stack.pop()     # Remove and USE the last item
print(f"Popped: {item}")   # Output: Popped: third
print(stack)           # Output: ['first', 'second']
\`\`\`

\`\`\`python
# Queue implementation (First In, First Out)
queue = ["Alice", "Bob", "Charlie"]

served = queue.pop(0)   # Remove first person
print(f"Serving: {served}")   # Output: Serving: Alice
print(f"Waiting: {queue}")    # Output: Waiting: ['Bob', 'Charlie']
\`\`\`

## clear() - Remove All Items

\`clear()\` removes **every item** from the list, leaving an empty list.

\`\`\`python
fruits = ["apple", "banana", "cherry"]

fruits.clear()
print(fruits)      # Output: []
print(len(fruits)) # Output: 0
\`\`\`

\`\`\`python
# clear() vs reassigning to []
cart = ["item1", "item2", "item3"]

# Option 1: clear() - empties the SAME list object
cart.clear()
print(cart)   # Output: []

# Option 2: Reassign - creates a NEW list object
cart = ["item1", "item2", "item3"]
cart = []     # cart now points to a new empty list
print(cart)   # Output: []
\`\`\`

## del Statement - Another Way to Remove

The \`del\` statement is not a method but can also remove items:

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]

del fruits[1]       # Remove item at index 1
print(fruits)   # Output: ['apple', 'cherry', 'mango']

del fruits[0:2]     # Remove a slice
print(fruits)   # Output: ['mango']

del fruits          # Delete the entire variable
# print(fruits)   # NameError - fruits no longer exists
\`\`\`

## Comparison: remove() vs pop() vs clear()

\`\`\`
Method         Removes By       Returns        Use When
-----------    -------------    -----------    ---------------------------
remove(val)    Value            None           You know the VALUE to remove
pop(index)     Index            Removed item   You need to USE the removed item
pop()          Last item        Removed item   Stack/queue operations
clear()        Everything       None           You need to empty the list
\`\`\`

## Practical Example: Shopping Cart

\`\`\`python
cart = ["apple", "bread", "milk", "cheese", "eggs"]

print(f"Cart: {cart}")

# Customer changed their mind - remove milk by value
cart.remove("milk")
print(f"Removed milk: {cart}")

# Remove the last item added (undo)
undone = cart.pop()
print(f"Undid adding '{undone}': {cart}")

# Remove the first item (checkout first item)
first = cart.pop(0)
print(f"Checked out '{first}': {cart}")

# Clear the cart after purchase
cart.clear()
print(f"After purchase: {cart}")
\`\`\`

Output:
\`\`\`
Cart: ['apple', 'bread', 'milk', 'cheese', 'eggs']
Removed milk: ['apple', 'bread', 'cheese', 'eggs']
Undid adding 'eggs': ['apple', 'bread', 'cheese']
Checked out 'apple': ['bread', 'cheese']
After purchase: []
\`\`\`

> [!TIP]
> Use \`remove()\` when you know the value. Use \`pop()\` when you know the index or need the removed value back. Use \`pop()\` with no argument for stack behavior (last in, first out). Use \`pop(0)\` for queue behavior (first in, first out) - though collections.deque is faster for large lists.`,
  objectives: [
    "Use remove() to delete the first occurrence of a value.",
    "Use pop() to remove and return an item by index.",
    "Use pop() with no argument to remove the last item.",
    "Use clear() to empty a list completely.",
    "Handle the ValueError when remove() cannot find the item."
  ],
  difficulty: "beginner",
  xpReward: 55,
};