export const itertoolsModuleLesson = {
  title: "itertools Module",
  slug: "itertools-module",
  content: `# itertools Module

The \`itertools\` module provides fast, memory-efficient iterators for common iteration patterns. All functions return lazy iterators - they compute values on demand.

\`\`\`python
import itertools
# or import specific functions
from itertools import count, cycle, repeat, chain, islice, zip_longest
from itertools import product, permutations, combinations, combinations_with_replacement
\`\`\`

## Infinite Iterators

These produce values indefinitely - you must limit them with \`islice()\` or \`break\`.

### count() - Count from a Start Value

\`\`\`python
from itertools import count, islice

# Count up from 1 (infinite!)
counter = count(1)
print(list(islice(counter, 5)))   # [1, 2, 3, 4, 5]

# Count with step
evens = count(0, 2)
print(list(islice(evens, 6)))     # [0, 2, 4, 6, 8, 10]

# Count down (negative step)
countdown = count(10, -1)
print(list(islice(countdown, 5))) # [10, 9, 8, 7, 6]

# Float counting
floats = count(0.0, 0.5)
print(list(islice(floats, 6)))    # [0.0, 0.5, 1.0, 1.5, 2.0, 2.5]

# Practical: auto-increment IDs
def make_id_generator(prefix="ID"):
    for n in count(1):
        yield f"{prefix}-{n:04d}"

id_gen = make_id_generator("USR")
print(next(id_gen))   # USR-0001
print(next(id_gen))   # USR-0002
print(next(id_gen))   # USR-0003
\`\`\`

### cycle() - Repeat a Sequence Infinitely

\`\`\`python
from itertools import cycle, islice

# Cycle through colors
colors = cycle(["red", "green", "blue"])
print(list(islice(colors, 8)))
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red', 'green']

# Round-robin assignment
teams = ["Team A", "Team B", "Team C"]
team_cycle = cycle(teams)
players = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"]

for player, team in zip(players, team_cycle):
    print(f"{player} -> {team}")

# Alternating True/False
booleans = cycle([True, False])
print(list(islice(booleans, 6)))   # [True, False, True, False, True, False]
\`\`\`

### repeat() - Repeat a Value

\`\`\`python
from itertools import repeat

# Finite repetition
print(list(repeat("hello", 3)))   # ['hello', 'hello', 'hello']
print(list(repeat(0, 5)))         # [0, 0, 0, 0, 0]

# Use with map() - provide a constant alongside other iterables
result = list(map(pow, [2, 3, 4], repeat(2)))
print(result)   # [4, 9, 16]  (each squared)

# Create a filled grid
grid = [list(repeat(0, 4)) for _ in repeat(None, 3)]
print(grid)   # [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
\`\`\`

## Iterators That Terminate

### chain() - Concatenate Iterables

\`\`\`python
from itertools import chain

# Combine multiple iterables seamlessly
a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]

combined = list(chain(a, b, c))
print(combined)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Chain strings
letters = list(chain("ABC", "DEF", "GHI"))
print(letters)    # ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

# chain.from_iterable - flatten a nested iterable
nested = [[1, 2], [3, 4], [5, 6]]
flat = list(chain.from_iterable(nested))
print(flat)   # [1, 2, 3, 4, 5, 6]

# Faster than reduce(lambda a, b: a + b, nested)!
words = [["hello", "world"], ["foo", "bar"], ["baz"]]
print(list(chain.from_iterable(words)))
# ['hello', 'world', 'foo', 'bar', 'baz']
\`\`\`

### islice() - Slice an Iterator

\`\`\`python
from itertools import islice, count

# islice(iterable, stop)
print(list(islice(range(100), 5)))   # [0, 1, 2, 3, 4]

# islice(iterable, start, stop)
print(list(islice(range(100), 2, 7)))   # [2, 3, 4, 5, 6]

# islice(iterable, start, stop, step)
print(list(islice(range(100), 0, 20, 2)))   # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Slice an infinite iterator
naturals = count(1)
first_10 = list(islice(naturals, 10))
print(first_10)   # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Read first N lines from a file-like iterator
lines = iter(["line1\n", "line2\n", "line3\n", "line4\n", "line5\n"])
first_3 = list(islice(lines, 3))
print(first_3)   # ['line1\n', 'line2\n', 'line3\n']
\`\`\`

### zip_longest() - Zip Without Truncating

\`\`\`python
from itertools import zip_longest

a = [1, 2, 3, 4, 5]
b = [10, 20, 30]

# Regular zip truncates
print(list(zip(a, b)))
# [(1, 10), (2, 20), (3, 30)]

# zip_longest fills missing with fillvalue
print(list(zip_longest(a, b, fillvalue=0)))
# [(1, 10), (2, 20), (3, 30), (4, 0), (5, 0)]

# Multiple iterables
x = [1, 2, 3]
y = ["a", "b"]
z = [True]
print(list(zip_longest(x, y, z, fillvalue=None)))
# [(1, 'a', True), (2, 'b', None), (3, None, None)]
\`\`\`

## Combinatoric Iterators

### product() - Cartesian Product

\`\`\`python
from itertools import product

# All combinations of two lists
colors = ["red", "blue"]
sizes  = ["S", "M", "L"]

for color, size in product(colors, sizes):
    print(f"{color}-{size}", end="  ")
# red-S  red-M  red-L  blue-S  blue-M  blue-L

# Same as nested loops
# for color in colors:
#     for size in sizes:
#         print(f"{color}-{size}")

# With repeat parameter (same iterable multiple times)
digits = [0, 1]
print(list(product(digits, repeat=3)))
# All 3-bit binary numbers
# [(0,0,0), (0,0,1), (0,1,0), (0,1,1), (1,0,0), (1,0,1), (1,1,0), (1,1,1)]

# All possible 2-character codes (letters only)
from string import ascii_lowercase
codes = list(product(ascii_lowercase[:5], repeat=2))
print(codes[:10])   # [('a','a'), ('a','b'), ('a','c'), ...]
print(f"Total codes: {len(codes)}")   # 25
\`\`\`

### permutations() - Ordered Arrangements

\`\`\`python
from itertools import permutations

items = ["A", "B", "C"]

# All permutations of length 3
all_perms = list(permutations(items))
print(all_perms)
# [('A','B','C'), ('A','C','B'), ('B','A','C'), ('B','C','A'), ('C','A','B'), ('C','B','A')]
print(f"Count: {len(all_perms)}")   # 6 (3!)

# Permutations of length 2 (r=2)
perms_2 = list(permutations(items, 2))
print(perms_2)
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')]
print(f"Count: {len(perms_2)}")   # 6 (P(3,2) = 3!/(3-2)! = 6)

# Practical: password generation
import string
chars = string.ascii_lowercase[:5]  # 'abcde'
passwords_4char = list(permutations(chars, 4))
print(f"Possible 4-char passwords from 'abcde': {len(passwords_4char)}")  # 120
\`\`\`

### combinations() - Unordered Selections

\`\`\`python
from itertools import combinations

items = ["A", "B", "C", "D"]

# Choose 2 from 4 (order does NOT matter)
combos_2 = list(combinations(items, 2))
print(combos_2)
# [('A','B'), ('A','C'), ('A','D'), ('B','C'), ('B','D'), ('C','D')]
print(f"Count: {len(combos_2)}")   # 6 (C(4,2) = 4!/(2!*2!) = 6)

# Choose 3 from 4
combos_3 = list(combinations(items, 3))
print(combos_3)
# [('A','B','C'), ('A','B','D'), ('A','C','D'), ('B','C','D')]

# Lottery: choose 6 from 49
from itertools import combinations
lottery_count = sum(1 for _ in combinations(range(1, 50), 6))
print(f"Possible lottery combinations: {lottery_count:,}")   # 13,983,816

# Practical: find all pairs that sum to a target
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
target = 10
pairs = [(a, b) for a, b in combinations(numbers, 2) if a + b == target]
print(pairs)   # [(1, 9), (2, 8), (3, 7), (4, 6)]
\`\`\`

### combinations_with_replacement()

\`\`\`python
from itertools import combinations_with_replacement

# Like combinations but items can repeat
items = ["A", "B", "C"]
cwr = list(combinations_with_replacement(items, 2))
print(cwr)
# [('A','A'), ('A','B'), ('A','C'), ('B','B'), ('B','C'), ('C','C')]
# Note: ('A','A') is allowed!
\`\`\`

## Other Useful itertools

\`\`\`python
from itertools import groupby, takewhile, dropwhile, filterfalse, starmap, accumulate

# groupby - group consecutive equal elements
data = [("A", 1), ("A", 2), ("B", 1), ("B", 2), ("B", 3), ("C", 1)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(f"{key}: {list(group)}")

# takewhile - take items while condition is True
numbers = [2, 4, 6, 1, 8, 10]  # Note: stops at 1 (not even)
print(list(takewhile(lambda x: x % 2 == 0, numbers)))   # [2, 4, 6]

# dropwhile - skip items while condition is True
print(list(dropwhile(lambda x: x % 2 == 0, numbers)))   # [1, 8, 10]

# accumulate - running totals
from itertools import accumulate
nums = [1, 2, 3, 4, 5]
print(list(accumulate(nums)))             # [1, 3, 6, 10, 15]  (running sum)
print(list(accumulate(nums, lambda a, b: a * b)))  # [1, 2, 6, 24, 120]  (running product)

# starmap - like map but unpacks arguments from tuples
pairs = [(2, 5), (3, 3), (10, 2)]
print(list(starmap(pow, pairs)))   # [32, 27, 100]
\`\`\`

## Practical Example: Batch Processing Pipeline

\`\`\`python
from itertools import chain, islice, groupby, count

def batch(iterable, size):
    """Split an iterable into batches of given size."""
    it = iter(iterable)
    while True:
        batch_items = list(islice(it, size))
        if not batch_items:
            return
        yield batch_items

# Process 1000 users in batches of 100
def process_users(users):
    for batch_num, user_batch in enumerate(batch(users, 100), 1):
        print(f"Processing batch {batch_num}: {len(user_batch)} users")

users = range(1, 1001)
process_users(users)

# Generate all test cases
def generate_test_cases():
    """Generate comprehensive test inputs."""
    positives = range(1, 6)
    negatives = range(-5, 0)
    special = [0, float('inf'), float('-inf')]
    return chain(positives, negatives, special)

print(list(generate_test_cases()))

# Find all pairs that sum to target
def find_pairs(numbers, target):
    from itertools import combinations
    return [(a, b) for a, b in combinations(numbers, 2) if a + b == target]

print(find_pairs([1, 2, 3, 4, 5, 6, 7, 8, 9], 10))
\`\`\`

> [!TIP]
> Use \`chain.from_iterable()\` instead of \`reduce(lambda a,b: a+b, nested_list)\` to flatten lists - it is much faster. Use \`islice()\` to safely limit infinite iterators. Remember that all itertools return lazy iterators - convert with \`list()\` only when you need all values at once.`,
  objectives: [
    "Use count(), cycle(), and repeat() for infinite iteration patterns.",
    "Use chain(), islice(), and zip_longest() for combining and slicing iterators.",
    "Use product(), permutations(), and combinations() for combinatorial problems.",
    "Understand that itertools returns lazy iterators.",
    "Apply itertools in practical batch processing and data generation scenarios."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};