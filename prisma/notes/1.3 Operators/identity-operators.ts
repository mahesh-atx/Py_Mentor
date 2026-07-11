export const identityOperatorsLesson = {
  title: "Identity Operators",
  slug: "identity-operators",
  content: `# Identity Operators

Identity operators check whether two variables **point to the exact same object in memory**, not just whether they have the same value.

## The Operators

\`\`\`
Operator    Description
--------    ------------------------------------------
is          True if both variables are the same object
is not      True if both variables are different objects
\`\`\`

## The Difference Between == and is

This is the most important concept in this lesson:

- \`==\` checks if two variables have the **same value**
- \`is\` checks if two variables are the **same object in memory**

\`\`\`python
a = [1, 2, 3]
b = [1, 2, 3]   # Same values, but a different list object
c = a            # c points to the EXACT SAME object as a

# Value comparison
print(a == b)    # Output: True   (same values)
print(a == c)    # Output: True   (same values)

# Identity comparison
print(a is b)    # Output: False  (different objects in memory)
print(a is c)    # Output: True   (same object in memory)
\`\`\`

Think of it like this: You and your twin may look identical (\`==\`) but you are not the same person (\`is\`).

## is Operator

\`\`\`python
x = [1, 2, 3]
y = x           # y points to the same object as x

print(x is y)   # Output: True

# Proof - changing x also changes y
x.append(4)
print(y)        # Output: [1, 2, 3, 4]  (y changed too!)
\`\`\`

\`\`\`python
x = [1, 2, 3]
y = [1, 2, 3]   # Completely separate object

print(x is y)   # Output: False

# Changing x does NOT affect y
x.append(4)
print(x)    # Output: [1, 2, 3, 4]
print(y)    # Output: [1, 2, 3]   (unchanged)
\`\`\`

## is not Operator

\`\`\`python
a = [1, 2, 3]
b = [1, 2, 3]

print(a is not b)   # Output: True   (they ARE different objects)

c = a
print(a is not c)   # Output: False  (they are the SAME object)
\`\`\`

## Checking for None

The most common use of \`is\` in Python is checking if a variable is \`None\`. This is the recommended Pythonic way to do it:

\`\`\`python
result = None

# Recommended way
if result is None:
    print("No result yet.")

# Also works but less recommended
if result == None:
    print("No result yet.")

# Checking if NOT None
user = "Alice"
if user is not None:
    print(f"Hello, {user}!")
# Output: Hello, Alice!
\`\`\`

Why use \`is None\` instead of \`== None\`? Because \`is None\` is more explicit and safer - some objects might override \`==\` to behave unexpectedly, but \`is\` always checks memory identity.

## Integer Caching (Small Integers)

Python caches small integers (typically -5 to 256) as an optimization. This means variables with the same small integer value share the same object:

\`\`\`python
a = 100
b = 100
print(a is b)    # Output: True   (same cached object)

# But large integers are not cached
x = 1000
y = 1000
print(x is y)    # Output: False  (different objects)
print(x == y)    # Output: True   (same value)
\`\`\`

> [!NOTE]
> Do not rely on this caching behavior in your code. Always use \`==\` for value comparison and \`is\` only for checking identity (like checking for \`None\`).

## String Interning

Python also caches (interns) some strings - mainly short strings that look like identifiers:

\`\`\`python
a = "hello"
b = "hello"
print(a is b)    # Output: True   (interned)

# Strings with spaces are usually NOT interned
c = "hello world"
d = "hello world"
print(c is d)    # Output: False  (may vary)
print(c == d)    # Output: True
\`\`\`

> [!NOTE]
> Again, never rely on string interning. Always use \`==\` to compare string values.

## Practical Example: Function Return Check

\`\`\`python
def find_user(user_id):
    users = {1: "Alice", 2: "Bob", 3: "Charlie"}
    return users.get(user_id)   # Returns None if not found

result = find_user(2)
if result is not None:
    print(f"User found: {result}")
else:
    print("User not found.")
# Output: User found: Bob

result = find_user(99)
if result is not None:
    print(f"User found: {result}")
else:
    print("User not found.")
# Output: User not found.
\`\`\`

## Practical Example: Singleton Check

\`\`\`python
# None, True, and False are singletons in Python
# There is only ever ONE None object

x = None
y = None

print(x is y)     # Output: True  (same None object)
print(x is None)  # Output: True

# True and False are also singletons
a = True
b = True
print(a is b)     # Output: True
\`\`\`

## Summary: == vs is

\`\`\`python
# Use == when you want to compare VALUES
print(1 + 1 == 2)          # True
print("hello" == "hello")  # True
print([1,2] == [1,2])      # True

# Use 'is' when you want to check if it is the SAME OBJECT
# Most commonly used with None
value = None
print(value is None)       # True  - recommended way
print(value is not None)   # False
\`\`\`

> [!TIP]
> In practice, use \`is\` mainly for checking \`None\`, \`True\`, and \`False\`. For comparing values of variables (numbers, strings, lists, etc.), always use \`==\`.`,
  objectives: [
    "Understand the difference between == (value equality) and is (identity).",
    "Use the is operator to check if two variables point to the same object.",
    "Use is not to check if two variables are different objects.",
    "Apply is and is not correctly when checking for None."
  ],
  difficulty: "beginner",
  xpReward: 55,
};