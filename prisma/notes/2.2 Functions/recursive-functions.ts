export const recursiveFunctionsLesson = {
  title: "Recursive Functions",
  slug: "recursive-functions",
  content: `# Recursive Functions

A **recursive function** is a function that calls **itself**. Every recursive solution has two parts:
1. **Base case** - the condition where the function stops calling itself
2. **Recursive case** - where the function calls itself with a simpler input

## The Theory — Building the Logic

Recursion is the idea that a problem can be solved by breaking it into a smaller copy of the *same* problem, so the function simply calls itself on the smaller piece until the work becomes trivial. Each call opens a new frame on the call stack — a private workspace holding its own arguments and local variables — and those frames unwind in reverse order once the smallest case (the base case) is reached. The logic only works if every recursive step moves strictly closer to that base case; otherwise the stack grows forever until Python hits its recursion limit and raises an error. The mental model is "solve the tiny version, then trust that the smaller version already solved the rest for you." The common pitfall is the naive recursive Fibonacci, which recomputes the same subproblems exponentially many times — fixed by memoization, which remembers answers instead of redoing them.

## How Recursion Works

\`\`\`python
def countdown(n):
    if n <= 0:           # Base case - stop here
        print("Go!")
        return
    print(n)             # Do something
    countdown(n - 1)     # Recursive call with simpler input

countdown(5)
\`\`\`

Output:
\`\`\`
5
4
3
2
1
Go!
\`\`\`

The call stack for \`countdown(3)\`:
\`\`\`
countdown(3) -> prints 3, calls countdown(2)
  countdown(2) -> prints 2, calls countdown(1)
    countdown(1) -> prints 1, calls countdown(0)
      countdown(0) -> prints "Go!", returns
    countdown(1) -> returns
  countdown(2) -> returns
countdown(3) -> returns
\`\`\`

## Factorial - The Classic Example

\`n! = n × (n-1) × (n-2) × ... × 2 × 1\`

\`\`\`python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))    # 120  (5 × 4 × 3 × 2 × 1)
print(factorial(0))    # 1
print(factorial(10))   # 3628800

# Step by step for factorial(4):
# factorial(4) = 4 * factorial(3)
#              = 4 * 3 * factorial(2)
#              = 4 * 3 * 2 * factorial(1)
#              = 4 * 3 * 2 * 1
#              = 24
\`\`\`

## Fibonacci Sequence

Each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21...

\`\`\`python
def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i), end=" ")
# Output: 0 1 1 2 3 5 8 13 21 34
\`\`\`

### The Problem with Naive Recursion

The simple Fibonacci is exponentially slow because it recalculates the same values:

\`\`\`python
import time

# Count how many times fibonacci(35) actually calls itself
call_count = 0

def fibonacci_count(n):
    global call_count
    call_count += 1
    if n <= 1:
        return n
    return fibonacci_count(n-1) + fibonacci_count(n-2)

start = time.time()
result = fibonacci_count(35)
elapsed = time.time() - start

print(f"fib(35) = {result}")
print(f"Function calls: {call_count:,}")   # ~29 million calls!
print(f"Time: {elapsed:.2f}s")

# Solution: Memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n-1) + fib_fast(n-2)

start = time.time()
print(fib_fast(100))   # Instant!
print(f"Time: {time.time() - start:.6f}s")
\`\`\`

## Sum of a List

\`\`\`python
def recursive_sum(lst):
    # Base case: empty list
    if not lst:
        return 0
    # Recursive case: first element + sum of the rest
    return lst[0] + recursive_sum(lst[1:])

print(recursive_sum([1, 2, 3, 4, 5]))    # 15
print(recursive_sum([]))                   # 0
print(recursive_sum([42]))                 # 42
\`\`\`

## Power Function

\`\`\`python
def power(base, exp):
    # Base cases
    if exp == 0:
        return 1
    if exp == 1:
        return base
    # Recursive case: base^exp = base × base^(exp-1)
    return base * power(base, exp - 1)

print(power(2, 10))    # 1024
print(power(3, 4))     # 81
print(power(5, 0))     # 1

# Efficient version: divide exponent by 2 each time
def fast_power(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = fast_power(base, exp // 2)
        return half * half        # Square it (only ONE recursive call)
    return base * fast_power(base, exp - 1)

print(fast_power(2, 100))   # Very fast even for large exponents
\`\`\`

## Binary Search

\`\`\`python
def binary_search(arr, target, low, high):
    # Base case: not found
    if low > high:
        return -1
    
    mid = (low + high) // 2
    
    if arr[mid] == target:
        return mid              # Found!
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)  # Search right
    else:
        return binary_search(arr, target, low, mid - 1)   # Search left

numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(numbers, 23, 0, len(numbers)-1))   # Output: 5
print(binary_search(numbers, 99, 0, len(numbers)-1))   # Output: -1
\`\`\`

## Flattening a Nested List

\`\`\`python
def flatten(nested_list):
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))   # Recursively flatten sublists
        else:
            result.append(item)
    return result

nested = [1, [2, 3], [4, [5, 6]], [7, [8, [9, 10]]]]
print(flatten(nested))   # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

deeply_nested = [1, [2, [3, [4, [5]]]]]
print(flatten(deeply_nested))   # [1, 2, 3, 4, 5]
\`\`\`

## Recursion Depth Limit

Python limits recursion to prevent infinite loops from crashing:

\`\`\`python
import sys

print(sys.getrecursionlimit())    # Default: 1000

# This will fail at depth ~1000
def infinite(n):
    return infinite(n + 1)   # No base case!

# infinite(0)   # RecursionError: maximum recursion depth exceeded

# You can increase the limit (use cautiously)
sys.setrecursionlimit(5000)

# Better: use iteration for deep recursion
def countdown_iterative(n):
    while n > 0:
        print(n)
        n -= 1
    print("Go!")
\`\`\`

## When to Use Recursion vs Iteration

\`\`\`python
# Good candidates for recursion:
# - Tree/graph traversal
# - Divide and conquer algorithms
# - Problems with naturally recursive structure (factorial, fib)
# - Parsing nested structures (JSON, XML, file systems)

# Recursion for directory tree
import os

def list_directory(path, indent=0):
    print("  " * indent + os.path.basename(path))
    if os.path.isdir(path):
        for item in os.listdir(path):
            list_directory(os.path.join(path, item), indent + 1)

# Use iteration when:
# - Simple loops work fine (don't add complexity unnecessarily)
# - Stack depth could be large (thousands of recursive calls)
# - Performance is critical (function call overhead)
\`\`\`

## Practical Example: Tower of Hanoi

\`\`\`python
def hanoi(n, source, target, auxiliary):
    """
    Move n disks from source to target using auxiliary.
    
    Args:
        n: Number of disks
        source: Starting peg
        target: Destination peg
        auxiliary: Helper peg
    """
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # Move n-1 disks to auxiliary
    hanoi(n - 1, source, auxiliary, target)
    
    # Move the largest disk to target
    print(f"Move disk {n} from {source} to {target}")
    
    # Move n-1 disks from auxiliary to target
    hanoi(n - 1, auxiliary, target, source)

print("Tower of Hanoi with 3 disks:")
hanoi(3, "A", "C", "B")
print(f"\\nMoves needed: {2**3 - 1}")   # 2^n - 1 moves
\`\`\`

Output:
\`\`\`
Tower of Hanoi with 3 disks:
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C

Moves needed: 7
\`\`\`

> [!TIP]
> Always define your base case FIRST before the recursive case. Make sure each recursive call moves closer to the base case - otherwise you get infinite recursion. Use \`@lru_cache\` from functools to speed up recursive functions that recalculate the same inputs.`,
  objectives: [
    "Understand the two parts of recursion: base case and recursive case.",
    "Implement classic recursive algorithms like factorial and Fibonacci.",
    "Understand the call stack and recursion depth limit.",
    "Use memoization to optimize recursive functions.",
    "Know when to use recursion vs iteration."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};