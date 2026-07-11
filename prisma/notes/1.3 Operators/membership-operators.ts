export const membershipOperatorsLesson = {
  title: "Membership Operators",
  slug: "membership-operators",
  content: `# Membership Operators

Membership operators check whether a value **exists inside a collection** (like a string, list, tuple, set, or dictionary). They return \`True\` or \`False\`.

## The Operators

\`\`\`
Operator    Description
--------    -----------------------------------------
in          True if value is found in the collection
not in      True if value is NOT found in the collection
\`\`\`

## in Operator

Checks if a value **exists** in a collection.

### With Strings

\`\`\`python
text = "Hello, World!"

print("Hello" in text)      # Output: True
print("Python" in text)     # Output: False
print("World" in text)      # Output: True
print("world" in text)      # Output: False  (case sensitive)
print("!" in text)          # Output: True
print("H" in text)          # Output: True
\`\`\`

Checking for substrings:
\`\`\`python
email = "alice@example.com"

if "@" in email and "." in email:
    print("Looks like a valid email format.")
else:
    print("Invalid email format.")
# Output: Looks like a valid email format.
\`\`\`

### With Lists

\`\`\`python
fruits = ["apple", "banana", "cherry", "mango"]

print("apple" in fruits)     # Output: True
print("grape" in fruits)     # Output: False
print("banana" in fruits)    # Output: True

# Real world example
allowed_users = ["alice", "bob", "charlie"]
username = "alice"

if username in allowed_users:
    print(f"Welcome, {username}!")
else:
    print("Access denied.")
# Output: Welcome, alice!
\`\`\`

### With Tuples

\`\`\`python
colors = ("red", "green", "blue")

print("red" in colors)      # Output: True
print("yellow" in colors)   # Output: False
\`\`\`

### With Sets

\`\`\`python
valid_grades = {"A", "B", "C", "D", "F"}

grade = "B"
print(grade in valid_grades)    # Output: True

grade = "Z"
print(grade in valid_grades)    # Output: False
\`\`\`

### With Dictionaries

When used with a dictionary, \`in\` checks the **keys**, not the values:

\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print("name" in student)     # Output: True   (key exists)
print("Alice" in student)    # Output: False  (that's a value, not a key)
print("grade" in student)    # Output: True
print("score" in student)    # Output: False

# To check values, use .values()
print("Alice" in student.values())  # Output: True
print("A" in student.values())      # Output: True
\`\`\`

## not in Operator

Checks if a value **does NOT exist** in a collection.

### With Strings

\`\`\`python
text = "Hello, World!"

print("Python" not in text)   # Output: True
print("Hello" not in text)    # Output: False
\`\`\`

### With Lists

\`\`\`python
blocked_users = ["spammer", "hacker", "troll"]
username = "alice"

if username not in blocked_users:
    print(f"{username} is allowed.")
else:
    print(f"{username} is blocked!")
# Output: alice is allowed.
\`\`\`

### With Numbers in a List

\`\`\`python
numbers = [1, 2, 3, 4, 5]

print(6 not in numbers)    # Output: True
print(3 not in numbers)    # Output: False
\`\`\`

## Checking Characters in a String

\`\`\`python
password = input("Create a password: ")

has_upper = any(c.isupper() for c in password)
has_digit = any(c.isdigit() for c in password)
has_special = any(c in "!@#$%^&*" for c in password)

if not has_upper:
    print("Password must contain at least one uppercase letter.")
if not has_digit:
    print("Password must contain at least one digit.")
if not has_special:
    print("Password must contain at least one special character (!@#$%^&*).")

if has_upper and has_digit and has_special:
    print("Strong password!")
\`\`\`

## Practical Example: Simple Menu System

\`\`\`python
valid_choices = ["1", "2", "3", "4"]

print("Menu")
print("1. View Profile")
print("2. Edit Profile")
print("3. Change Password")
print("4. Logout")

choice = input("Enter your choice: ")

if choice in valid_choices:
    if choice == "1":
        print("Showing profile...")
    elif choice == "2":
        print("Opening editor...")
    elif choice == "3":
        print("Opening password change...")
    elif choice == "4":
        print("Logging out...")
else:
    print("Invalid choice. Please enter 1, 2, 3, or 4.")
\`\`\`

## Practical Example: Word Filter

\`\`\`python
banned_words = ["spam", "advertisement", "click here", "free money"]

message = input("Enter your message: ").lower()

contains_banned = False
for word in banned_words:
    if word in message:
        contains_banned = True
        print(f"Message rejected: contains banned phrase '{word}'.")
        break

if not contains_banned:
    print("Message sent successfully!")
\`\`\`

## Practical Example: Vowel Counter

\`\`\`python
text = input("Enter a sentence: ")
vowels = "aeiouAEIOU"
count = 0

for character in text:
    if character in vowels:
        count += 1

print(f"Number of vowels: {count}")
\`\`\`

Sample run:
\`\`\`
Enter a sentence: Hello World
Number of vowels: 3
\`\`\`

## Performance Note

For large collections, sets and dictionaries are much faster than lists for membership testing:

\`\`\`python
# Slower - Python checks each element one by one
large_list = list(range(1000000))
print(999999 in large_list)   # Slow

# Faster - sets use hash-based lookup
large_set = set(range(1000000))
print(999999 in large_set)    # Much faster
\`\`\`

> [!TIP]
> Membership operators are one of the most readable features of Python. Code like \`if username in allowed_users\` reads almost like plain English. Use them whenever you need to check if something exists in a collection.`,
  objectives: [
    "Use in to check if a value exists in a string, list, tuple, set, or dictionary.",
    "Use not in to check if a value does not exist in a collection.",
    "Understand that in checks keys when used with dictionaries.",
    "Apply membership operators in real-world scenarios like access control and validation."
  ],
  difficulty: "beginner",
  xpReward: 55,
};