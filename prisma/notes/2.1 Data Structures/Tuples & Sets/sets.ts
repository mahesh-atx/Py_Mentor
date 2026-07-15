export const setsLesson = {
  title: "Sets",
  slug: "sets",
  content: `# Sets

## The Theory — Building the Logic

A set is Python's implementation of the mathematical idea of a **collection of distinct things**, where membership — not position — is what matters. Because order is irrelevant and duplicates are forbidden, Python stores set elements in a hash table, which is why membership tests like \`x in s\` are extremely fast (roughly constant time) compared to scanning a list element by element. The trade-off is that elements must themselves be \`hashable\` (immutable), so you can put numbers, strings, and tuples inside a set but not lists. To build intuition, think of a set as answering questions like "is this item present?" or "what do these two groups have in common?", rather than "what is the third item?". A common pitfall is expecting a fixed order or trying to index a set; also note that \`{}\` creates an empty *dictionary*, so you must use \`set()\` to make an empty set.

## What is a Set?

A set is an **unordered collection of unique items**. Sets automatically remove duplicates and have no guaranteed order.

Key properties:
- **Unordered** - items have no index or position
- **Unique** - no duplicate values allowed
- **Mutable** - you can add and remove items
- **Elements must be hashable** - strings, numbers, tuples work; lists do not

\`\`\`python
# A list can have duplicates and order matters
my_list = [1, 2, 2, 3, 3, 3]
print(my_list)   # Output: [1, 2, 2, 3, 3, 3]

# A set removes duplicates automatically
my_set = {1, 2, 2, 3, 3, 3}
print(my_set)    # Output: {1, 2, 3}  (order may vary)
\`\`\`

---

## Creating Sets

### Using Curly Braces

\`\`\`python
fruits = {"apple", "banana", "cherry"}
print(fruits)        # Output: {'apple', 'banana', 'cherry'} (order varies)
print(type(fruits))  # Output: <class 'set'>

# Duplicates are automatically removed
numbers = {1, 2, 2, 3, 3, 3, 4}
print(numbers)   # Output: {1, 2, 3, 4}

# Mixed types
mixed = {1, "hello", 3.14, True}
print(mixed)
\`\`\`

### Using set() Constructor

\`\`\`python
# From a list (great for removing duplicates!)
from_list = set([1, 2, 2, 3, 3, 3])
print(from_list)   # Output: {1, 2, 3}

# From a string (each character becomes an element)
from_string = set("hello")
print(from_string)   # Output: {'h', 'e', 'l', 'o'}  (duplicate 'l' removed)

# From a tuple
from_tuple = set((1, 2, 2, 3))
print(from_tuple)   # Output: {1, 2, 3}

# Empty set - MUST use set(), not {} (which creates a dict!)
empty_set = set()
print(type(empty_set))   # Output: <class 'set'>

empty_dict = {}           # This is a dict, NOT a set!
print(type(empty_dict))  # Output: <class 'dict'>
\`\`\`

### Removing Duplicates from a List (Common Use Case)

\`\`\`python
names = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]

unique_names = list(set(names))
print(unique_names)   # Output: ['Bob', 'Alice', 'Charlie'] (order may vary)
print(f"Original: {len(names)}, Unique: {len(unique_names)}")
# Output: Original: 6, Unique: 3
\`\`\`

### Sets Cannot Be Indexed

\`\`\`python
fruits = {"apple", "banana", "cherry"}

# This raises TypeError - sets have no index
# print(fruits[0])   # TypeError: 'set' object is not subscriptable

# To access items, iterate or convert to list
for fruit in fruits:
    print(fruit)

# Check membership
print("apple" in fruits)    # Output: True
print("mango" in fruits)    # Output: False
\`\`\`

---

## Set Methods

### add() - Add a Single Item

\`\`\`python
fruits = {"apple", "banana"}

fruits.add("cherry")
print(fruits)   # Output: {'apple', 'banana', 'cherry'}

# Adding a duplicate does nothing (no error, no change)
fruits.add("apple")
print(fruits)   # Output: {'apple', 'banana', 'cherry'}  (unchanged)

# Adding multiple times - still just one
fruits.add("mango")
fruits.add("mango")
fruits.add("mango")
print(fruits)   # Output: {'apple', 'banana', 'cherry', 'mango'}
\`\`\`

### remove() - Remove (Raises Error if Not Found)

\`\`\`python
fruits = {"apple", "banana", "cherry"}

fruits.remove("banana")
print(fruits)   # Output: {'apple', 'cherry'}

# Raises KeyError if item not found
try:
    fruits.remove("mango")
except KeyError:
    print("'mango' not in set")
# Output: 'mango' not in set
\`\`\`

### discard() - Remove Safely (No Error if Not Found)

\`\`\`python
fruits = {"apple", "banana", "cherry"}

fruits.discard("banana")
print(fruits)   # Output: {'apple', 'cherry'}

# No error even if item not found
fruits.discard("mango")   # Silently does nothing
print(fruits)   # Output: {'apple', 'cherry'}
\`\`\`

### remove() vs discard()

\`\`\`
remove()   - Raises KeyError if item not found. Use when missing item = a bug.
discard()  - Silent if item not found. Use when missing item is acceptable.
\`\`\`

### pop() - Remove and Return a Random Item

\`\`\`python
fruits = {"apple", "banana", "cherry", "mango"}

removed = fruits.pop()    # Removes and returns an arbitrary item
print(f"Removed: {removed}")
print(f"Remaining: {fruits}")

# pop() on empty set raises KeyError
empty = set()
try:
    empty.pop()
except KeyError:
    print("Cannot pop from empty set")
\`\`\`

### clear() - Remove All Items

\`\`\`python
fruits = {"apple", "banana", "cherry"}

fruits.clear()
print(fruits)      # Output: set()
print(len(fruits)) # Output: 0
\`\`\`

### update() - Add Multiple Items

\`\`\`python
fruits = {"apple", "banana"}

# Add from another set
fruits.update({"cherry", "mango"})
print(fruits)   # Output: {'apple', 'banana', 'cherry', 'mango'}

# Add from a list
fruits.update(["grape", "kiwi"])
print(fruits)

# Add from multiple iterables at once
fruits.update(["pear"], {"fig"}, ("plum",))
print(fruits)
\`\`\`

### Other Useful Methods

\`\`\`python
s = {1, 2, 3, 4, 5}

print(len(s))           # Output: 5
print(min(s))           # Output: 1
print(max(s))           # Output: 5
print(sum(s))           # Output: 15
print(sorted(s))        # Output: [1, 2, 3, 4, 5] (returns a LIST)
print(3 in s)           # Output: True
print(9 not in s)       # Output: True
\`\`\`

---

## Set Operations

Set operations are one of the most powerful features of sets. They work just like mathematical sets.

### Union (|) - All Items from Both Sets

Returns all items that are in **either** set (or both).

\`\`\`python
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# Using | operator
union = set_a | set_b
print(union)   # Output: {1, 2, 3, 4, 5, 6, 7, 8}

# Using union() method
union = set_a.union(set_b)
print(union)   # Output: {1, 2, 3, 4, 5, 6, 7, 8}

# union() can take multiple arguments
set_c = {8, 9, 10}
union3 = set_a.union(set_b, set_c)
print(union3)   # Output: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
\`\`\`

\`\`\`python
# Real world: combine two guest lists
morning_guests = {"Alice", "Bob", "Charlie"}
evening_guests = {"Charlie", "Diana", "Eve"}

all_guests = morning_guests | evening_guests
print(all_guests)   # Output: {'Alice', 'Bob', 'Charlie', 'Diana', 'Eve'}
\`\`\`

### Intersection (&) - Items in Both Sets

Returns items that appear in **both** sets.

\`\`\`python
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# Using & operator
intersection = set_a & set_b
print(intersection)   # Output: {4, 5}

# Using intersection() method
intersection = set_a.intersection(set_b)
print(intersection)   # Output: {4, 5}
\`\`\`

\`\`\`python
# Real world: find students in BOTH classes
math_students = {"Alice", "Bob", "Charlie", "Diana"}
science_students = {"Charlie", "Diana", "Eve", "Frank"}

both_classes = math_students & science_students
print(f"In both classes: {both_classes}")
# Output: In both classes: {'Charlie', 'Diana'}
\`\`\`

### Difference (-) - Items Only in the First Set

Returns items in the **first set but NOT in the second**.

\`\`\`python
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# set_a - set_b: items in A but not in B
diff_a = set_a - set_b
print(diff_a)   # Output: {1, 2, 3}

# set_b - set_a: items in B but not in A
diff_b = set_b - set_a
print(diff_b)   # Output: {6, 7, 8}

# Using difference() method
print(set_a.difference(set_b))   # Output: {1, 2, 3}
print(set_b.difference(set_a))   # Output: {6, 7, 8}
\`\`\`

\`\`\`python
# Real world: find who is absent today
all_students = {"Alice", "Bob", "Charlie", "Diana", "Eve"}
present_today = {"Alice", "Charlie", "Eve"}

absent = all_students - present_today
print(f"Absent today: {absent}")
# Output: Absent today: {'Bob', 'Diana'}
\`\`\`

### Symmetric Difference (^) - Items in Either But Not Both

Returns items that are in **one set or the other, but NOT in both** (exclusive or).

\`\`\`python
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

sym_diff = set_a ^ set_b
print(sym_diff)   # Output: {1, 2, 3, 6, 7, 8}

# Using symmetric_difference() method
print(set_a.symmetric_difference(set_b))   # Output: {1, 2, 3, 6, 7, 8}
\`\`\`

\`\`\`python
# Real world: items that changed between two versions
version_1_features = {"login", "signup", "dashboard", "profile"}
version_2_features = {"login", "signup", "settings", "notifications"}

changed = version_1_features ^ version_2_features
print(f"Changed features: {changed}")
# Output: {'dashboard', 'profile', 'settings', 'notifications'}

removed = version_1_features - version_2_features
added = version_2_features - version_1_features
print(f"Removed: {removed}")   # Output: {'dashboard', 'profile'}
print(f"Added: {added}")       # Output: {'settings', 'notifications'}
\`\`\`

### All Set Operations at a Glance

\`\`\`python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print(f"A           = {A}")
print(f"B           = {B}")
print(f"A | B       = {A | B}")   # Union:         {1,2,3,4,5,6}
print(f"A & B       = {A & B}")   # Intersection:  {3,4}
print(f"A - B       = {A - B}")   # Difference:    {1,2}
print(f"B - A       = {B - A}")   # Difference:    {5,6}
print(f"A ^ B       = {A ^ B}")   # Sym Diff:      {1,2,5,6}
\`\`\`

### Set Comparison Methods

\`\`\`python
A = {1, 2, 3}
B = {1, 2, 3, 4, 5}
C = {1, 2, 3}

# issubset() - is A entirely inside B?
print(A.issubset(B))    # Output: True  (A ⊆ B)
print(A <= B)           # Output: True  (same thing)
print(A < B)            # Output: True  (proper subset)
print(A < C)            # Output: False (equal sets)

# issuperset() - does B contain all of A?
print(B.issuperset(A))  # Output: True  (B ⊇ A)
print(B >= A)           # Output: True

# isdisjoint() - do they share NO items?
D = {10, 20, 30}
print(A.isdisjoint(D))  # Output: True  (no common elements)
print(A.isdisjoint(B))  # Output: False (they share elements)
\`\`\`

### In-place Set Operations

\`\`\`python
A = {1, 2, 3}

# |= union in-place
A |= {4, 5}
print(A)   # Output: {1, 2, 3, 4, 5}

# &= intersection in-place
A &= {3, 4, 5, 6}
print(A)   # Output: {3, 4, 5}

# -= difference in-place
A -= {4}
print(A)   # Output: {3, 5}

# ^= symmetric difference in-place
A ^= {3, 7}
print(A)   # Output: {5, 7}
\`\`\`

---

## Frozen Sets

A **frozen set** is an **immutable** version of a set. Once created, it cannot be changed. This lets you use a set as a dictionary key or store it in another set.

### Creating Frozen Sets

\`\`\`python
# frozenset() constructor
frozen = frozenset([1, 2, 3, 4, 5])
print(frozen)         # Output: frozenset({1, 2, 3, 4, 5})
print(type(frozen))   # Output: <class 'frozenset'>

frozen_strings = frozenset({"apple", "banana", "cherry"})
print(frozen_strings) # Output: frozenset({'apple', 'banana', 'cherry'})
\`\`\`

### Frozen Sets are Immutable

\`\`\`python
frozen = frozenset([1, 2, 3])

# These all raise AttributeError:
# frozen.add(4)
# frozen.remove(1)
# frozen.clear()

# But read operations still work
print(len(frozen))       # Output: 3
print(2 in frozen)       # Output: True
print(frozen | {4, 5})   # Output: frozenset({1, 2, 3, 4, 5})
\`\`\`

### Using Frozen Sets as Dictionary Keys

\`\`\`python
# Regular sets CANNOT be dictionary keys (unhashable)
# regular = {1, 2, 3}
# my_dict = {regular: "value"}   # TypeError!

# Frozen sets CAN be dictionary keys
combinations = {
    frozenset({"rock"}): "player chose rock",
    frozenset({"paper"}): "player chose paper",
    frozenset({"rock", "scissors"}): "rock wins",
    frozenset({"paper", "rock"}): "paper wins",
}

player1, player2 = "rock", "scissors"
key = frozenset({player1, player2})
print(combinations.get(key, "unknown outcome"))
# Output: rock wins
\`\`\`

### Frozen Sets as Set Elements

\`\`\`python
# Sets within sets (using frozensets)
teams = {
    frozenset({"Alice", "Bob"}),
    frozenset({"Charlie", "Diana"}),
    frozenset({"Eve", "Frank"})
}
print(len(teams))   # Output: 3
\`\`\`

---

## Set Comprehension

Set comprehension creates a set using a compact expression - similar to list comprehension but using curly braces \`{}\` and automatically removing duplicates.

### Basic Syntax

\`\`\`python
new_set = {expression for item in iterable}
new_set = {expression for item in iterable if condition}
\`\`\`

### Basic Examples

\`\`\`python
# Squares of 1-10 (duplicates would be removed automatically)
squares = {x ** 2 for x in range(1, 11)}
print(squares)
# Output: {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# Uppercase letters from a string
letters = {char.upper() for char in "hello world" if char.isalpha()}
print(letters)
# Output: {'H', 'E', 'L', 'O', 'W', 'R', 'D'}

# Even numbers from a list (removes duplicates too)
numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6]
evens = {n for n in numbers if n % 2 == 0}
print(evens)   # Output: {2, 4, 6}
\`\`\`

### With Conditions

\`\`\`python
# Words longer than 4 characters
words = ["hello", "hi", "python", "is", "awesome", "cool"]
long_words = {w.lower() for w in words if len(w) > 4}
print(long_words)   # Output: {'hello', 'python', 'awesome'}

# Unique first characters
names = ["Alice", "Bob", "Anna", "Charlie", "Beth"]
first_chars = {name[0] for name in names}
print(first_chars)   # Output: {'A', 'B', 'C'}
\`\`\`

### Set Comprehension for Deduplication and Transformation

\`\`\`python
# Extract unique domains from email list
emails = [
    "alice@gmail.com",
    "bob@yahoo.com",
    "charlie@gmail.com",
    "diana@outlook.com",
    "eve@yahoo.com"
]

domains = {email.split("@")[1] for email in emails}
print(domains)   # Output: {'gmail.com', 'yahoo.com', 'outlook.com'}

# Count unique domains
print(f"Number of unique domains: {len(domains)}")   # Output: 3
\`\`\`

### Set Comprehension vs List Comprehension

\`\`\`python
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

list_comp = [x * 2 for x in data]
set_comp  = {x * 2 for x in data}

print(list_comp)   # Output: [2, 4, 4, 6, 6, 6, 8, 8, 8, 8]  (keeps duplicates, ordered)
print(set_comp)    # Output: {8, 2, 4, 6}                     (removes duplicates, unordered)
\`\`\`

## Practical Example: Access Control System

\`\`\`python
# Define permission groups
admin_permissions = frozenset({"read", "write", "delete", "manage_users", "view_logs"})
editor_permissions = frozenset({"read", "write", "view_logs"})
viewer_permissions = frozenset({"read"})

user_roles = {
    "Alice":   admin_permissions,
    "Bob":     editor_permissions,
    "Charlie": viewer_permissions,
    "Diana":   editor_permissions,
}

def check_access(user, required_permission):
    perms = user_roles.get(user, frozenset())
    return required_permission in perms

def get_users_with_permission(permission):
    return {user for user, perms in user_roles.items() if permission in perms}

def compare_roles(user1, user2):
    perms1 = user_roles.get(user1, frozenset())
    perms2 = user_roles.get(user2, frozenset())
    shared = perms1 & perms2
    only1  = perms1 - perms2
    only2  = perms2 - perms1
    return shared, only1, only2

print("=== Access Control Report ===")
print(f"Can Alice delete?   {check_access('Alice', 'delete')}")
print(f"Can Bob delete?     {check_access('Bob', 'delete')}")
print(f"Can Charlie write?  {check_access('Charlie', 'write')}")

print(f"\\nWho can write? {get_users_with_permission('write')}")
print(f"Who can delete? {get_users_with_permission('delete')}")

shared, only_alice, only_bob = compare_roles("Alice", "Bob")
print(f"\\nAlice & Bob share: {shared}")
print(f"Only Alice has:    {only_alice}")
print(f"Only Bob has:      {only_bob}")

# Unique permissions across all users
all_permissions = set()
for perms in user_roles.values():
    all_permissions |= perms
print(f"\\nAll permissions in system: {sorted(all_permissions)}")
\`\`\`

Output:
\`\`\`
=== Access Control Report ===
Can Alice delete?   True
Can Bob delete?     False
Can Charlie write?  False

Who can write? {'Alice', 'Bob', 'Diana'}
Who can delete? {'Alice'}

Alice & Bob share: {'read', 'write', 'view_logs'}
Only Alice has:    {'delete', 'manage_users'}
Only Bob has:      set()

All permissions in system: ['delete', 'manage_users', 'read', 'view_logs', 'write']
\`\`\`

> [!TIP]
> Use sets when you need uniqueness guarantees or fast membership testing (\`in\` is O(1) for sets vs O(n) for lists). Use frozen sets when you need an immutable set (as a dict key, or stored inside another set). Set operations like union, intersection, and difference are extremely useful for data analysis and comparison tasks.`,
  objectives: [
    "Create sets using curly braces and the set() constructor.",
    "Use add(), remove(), discard(), pop(), and clear() to modify sets.",
    "Perform set operations: union (|), intersection (&), difference (-), symmetric difference (^).",
    "Use subset, superset, and disjoint checks.",
    "Create and use frozen sets as immutable, hashable sets.",
    "Write set comprehensions to create sets concisely."
  ],
  difficulty: "intermediate",
  xpReward: 80,
};