export const dictionaryAccessModifyLesson = {
  title: "Accessing, Adding, Updating & Deleting Dictionary Items",
  slug: "dictionary-access-modify",
  content: `# Accessing, Adding, Updating & Deleting Dictionary Items

## Accessing Items

### Using Square Bracket Notation

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

print(person["name"])   # Output: Alice
print(person["age"])    # Output: 25
print(person["city"])   # Output: New York
\`\`\`

### KeyError - When Key Does Not Exist

\`\`\`python
person = {"name": "Alice", "age": 25}

print(person["email"])   # KeyError: 'email'
\`\`\`

Safe access - check before accessing:
\`\`\`python
if "email" in person:
    print(person["email"])
else:
    print("Email not found")
# Output: Email not found
\`\`\`

### Using get() - Safe Access

\`\`\`python
person = {"name": "Alice", "age": 25}

# Returns None if key not found (no error)
print(person.get("name"))    # Output: Alice
print(person.get("email"))   # Output: None

# Returns a default value if key not found
print(person.get("email", "Not provided"))
# Output: Not provided

print(person.get("age", 0))
# Output: 25  (key exists, returns actual value)
\`\`\`

## Adding Items

### Adding a New Key-Value Pair

\`\`\`python
person = {"name": "Alice", "age": 25}

# Add new key
person["email"] = "alice@example.com"
person["city"] = "New York"

print(person)
# Output: {'name': 'Alice', 'age': 25, 'email': 'alice@example.com', 'city': 'New York'}
\`\`\`

\`\`\`python
# Build a dictionary item by item
inventory = {}
inventory["apples"] = 50
inventory["bananas"] = 30
inventory["cherries"] = 100

print(inventory)
# Output: {'apples': 50, 'bananas': 30, 'cherries': 100}
\`\`\`

## Updating Items

### Updating an Existing Key

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Update existing key - same syntax as adding
person["age"] = 26           # Birthday!
person["city"] = "Boston"    # Moved

print(person)
# Output: {'name': 'Alice', 'age': 26, 'city': 'Boston'}
\`\`\`

\`\`\`python
# Increment a value
scores = {"Alice": 10, "Bob": 8}

scores["Alice"] += 5    # Alice scored 5 more points
print(scores)           # Output: {'Alice': 15, 'Bob': 8}
\`\`\`

### Using update() - Update Multiple Keys at Once

\`\`\`python
person = {"name": "Alice", "age": 25}

# Update with a dictionary
person.update({"age": 26, "city": "Boston", "email": "alice@email.com"})
print(person)
# Output: {'name': 'Alice', 'age': 26, 'city': 'Boston', 'email': 'alice@email.com'}

# Update with keyword arguments
person.update(age=27, country="USA")
print(person)
\`\`\`

## Deleting Items

### del Statement - Delete by Key

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York", "email": "alice@example.com"}

del person["email"]
print(person)
# Output: {'name': 'Alice', 'age': 25, 'city': 'New York'}

# KeyError if key does not exist
# del person["phone"]   # KeyError!
\`\`\`

### pop() - Remove and Return a Value

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Remove and return the value
age = person.pop("age")
print(f"Removed age: {age}")   # Output: Removed age: 25
print(person)                   # Output: {'name': 'Alice', 'city': 'New York'}

# pop() with default - no error if key not found
phone = person.pop("phone", "Not found")
print(phone)   # Output: Not found
\`\`\`

### popitem() - Remove and Return the Last Item

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Removes and returns the last inserted key-value pair as a tuple
last = person.popitem()
print(last)      # Output: ('city', 'New York')
print(person)    # Output: {'name': 'Alice', 'age': 25}

last2 = person.popitem()
print(last2)     # Output: ('age', 25)
\`\`\`

### clear() - Remove All Items

\`\`\`python
person = {"name": "Alice", "age": 25}

person.clear()
print(person)    # Output: {}
print(len(person))   # Output: 0
\`\`\`

## Checking Keys and Values

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Check if key exists
print("name" in person)      # Output: True
print("email" in person)     # Output: False
print("email" not in person) # Output: True

# Check does NOT work for values by default
print("Alice" in person)     # Output: False  (checks keys only!)

# To check values, use .values()
print("Alice" in person.values())   # Output: True
\`\`\`

## Practical Example: Student Grade Manager

\`\`\`python
grades = {}

def add_student(name, score):
    if name in grades:
        print(f"{name} already exists. Use update to change their grade.")
    else:
        grades[name] = score
        print(f"Added {name} with score {score}")

def update_grade(name, new_score):
    if name not in grades:
        print(f"{name} not found.")
    else:
        old = grades[name]
        grades[name] = new_score
        print(f"Updated {name}: {old} -> {new_score}")

def remove_student(name):
    removed_score = grades.pop(name, None)
    if removed_score is not None:
        print(f"Removed {name} (score was {removed_score})")
    else:
        print(f"{name} not found.")

def show_grades():
    if not grades:
        print("No students.")
        return
    for name, score in sorted(grades.items(), key=lambda x: x[1], reverse=True):
        grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"
        print(f"  {name:<15} {score:>5}  ({grade})")

add_student("Alice", 88)
add_student("Bob", 72)
add_student("Charlie", 95)
update_grade("Bob", 85)
remove_student("Charlie")
show_grades()
\`\`\`

Output:
\`\`\`
Added Alice with score 88
Added Bob with score 72
Added Charlie with score 95
Updated Bob: 72 -> 85
Removed Charlie (score was 95)
  Alice            88  (B)
  Bob              85  (B)
\`\`\`

> [!TIP]
> Use \`dict[key]\` for access when you are certain the key exists. Use \`dict.get(key, default)\` when the key might not exist - it avoids KeyError. Use \`pop(key, default)\` for safe deletion that also returns the value.`,
  objectives: [
    "Access dictionary values using square bracket notation and get().",
    "Add new key-value pairs using assignment.",
    "Update existing values using assignment and update().",
    "Delete items using del, pop(), popitem(), and clear().",
    "Check if keys and values exist in a dictionary."
  ],
  difficulty: "beginner",
  xpReward: 60,
};