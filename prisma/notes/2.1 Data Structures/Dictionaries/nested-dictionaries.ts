export const nestedDictionariesLesson = {
  title: "Nested Dictionaries",
  slug: "nested-dictionaries",
  content: `# Nested Dictionaries

A nested dictionary is a dictionary where the **values are themselves dictionaries**. This creates a hierarchical structure perfect for representing complex real-world data. Because a value can be any object, structure grows to any depth like a tree, where a key chain such as \`data["a"]["b"]["c"]\` walks one path to a leaf. Beware that inner dictionaries are stored by **reference**, so a shallow \`copy()\` leaves them shared — editing a nested value in the "copy" silently mutates the original, and only \`copy.deepcopy()\` gives true independence.

## Creating Nested Dictionaries

\`\`\`python
# Student with nested address and grades
student = {
    "name": "Alice",
    "age": 20,
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "10001"
    },
    "grades": {
        "math": 92,
        "science": 88,
        "english": 95
    }
}
\`\`\`

\`\`\`python
# Company structure
company = {
    "name": "TechCorp",
    "departments": {
        "engineering": {
            "head": "Alice",
            "employees": 50,
            "budget": 2_000_000
        },
        "marketing": {
            "head": "Bob",
            "employees": 20,
            "budget": 500_000
        },
        "hr": {
            "head": "Charlie",
            "employees": 10,
            "budget": 300_000
        }
    }
}
\`\`\`

## Accessing Nested Values

Use chained square brackets to drill down:

\`\`\`python
student = {
    "name": "Alice",
    "address": {"city": "New York", "zip": "10001"},
    "grades": {"math": 92, "science": 88}
}

# Level 1 access
print(student["name"])         # Output: Alice
print(student["address"])      # Output: {'city': 'New York', 'zip': '10001'}

# Level 2 access
print(student["address"]["city"])     # Output: New York
print(student["grades"]["math"])      # Output: 92

# Safe nested access using get()
print(student.get("address", {}).get("city", "Unknown"))
# Output: New York

print(student.get("phone", {}).get("mobile", "Not provided"))
# Output: Not provided  (no KeyError!)
\`\`\`

## Modifying Nested Dictionaries

\`\`\`python
student = {
    "name": "Alice",
    "grades": {"math": 92, "science": 88}
}

# Modify a nested value
student["grades"]["math"] = 95
print(student["grades"])   # Output: {'math': 95, 'science': 88}

# Add a new nested key
student["grades"]["english"] = 90
print(student["grades"])   # Output: {'math': 95, 'science': 88, 'english': 90}

# Add a whole new nested dict
student["contact"] = {"email": "alice@example.com", "phone": "555-1234"}
print(student["contact"])  # Output: {'email': 'alice@example.com', 'phone': '555-1234'}
\`\`\`

## Iterating Through Nested Dictionaries

\`\`\`python
company = {
    "engineering": {"head": "Alice", "employees": 50},
    "marketing":   {"head": "Bob",   "employees": 20},
    "hr":          {"head": "Charlie","employees": 10},
}

# Iterate outer
for dept_name, dept_info in company.items():
    print(f"Department: {dept_name}")
    # Iterate inner
    for key, value in dept_info.items():
        print(f"  {key}: {value}")
\`\`\`

Output:
\`\`\`
Department: engineering
  head: Alice
  employees: 50
Department: marketing
  head: Bob
  employees: 20
Department: hr
  head: Charlie
  employees: 10
\`\`\`

## Dictionary of Dictionaries - Common Pattern

\`\`\`python
# User database
users = {
    "alice": {
        "password": "hashed_pw_1",
        "email": "alice@example.com",
        "role": "admin",
        "active": True
    },
    "bob": {
        "password": "hashed_pw_2",
        "email": "bob@example.com",
        "role": "editor",
        "active": True
    },
    "charlie": {
        "password": "hashed_pw_3",
        "email": "charlie@example.com",
        "role": "viewer",
        "active": False
    }
}

# Access user info
def get_user_info(username):
    user = users.get(username)
    if user is None:
        return f"User '{username}' not found"
    return f"{username} ({user['role']}) - Active: {user['active']}"

print(get_user_info("alice"))    # Output: alice (admin) - Active: True
print(get_user_info("unknown"))  # Output: User 'unknown' not found

# Find all active admins
active_admins = [
    username
    for username, info in users.items()
    if info["active"] and info["role"] == "admin"
]
print(f"Active admins: {active_admins}")   # Output: Active admins: ['alice']
\`\`\`

## Building Nested Dictionaries Programmatically

\`\`\`python
# Build a gradebook from data
records = [
    ("Alice", "math", 92),
    ("Alice", "science", 88),
    ("Bob", "math", 75),
    ("Bob", "science", 82),
    ("Alice", "english", 95),
]

gradebook = {}
for student, subject, score in records:
    if student not in gradebook:
        gradebook[student] = {}
    gradebook[student][subject] = score

print(gradebook)
# Output: {'Alice': {'math': 92, 'science': 88, 'english': 95}, 'Bob': {'math': 75, 'science': 82}}
\`\`\`

\`\`\`python
# Using setdefault() - cleaner approach
gradebook = {}
for student, subject, score in records:
    gradebook.setdefault(student, {})[subject] = score

print(gradebook["Alice"])
# Output: {'math': 92, 'science': 88, 'english': 95}
\`\`\`

## Deep Copy of Nested Dicts

\`\`\`python
import copy

original = {
    "name": "Alice",
    "grades": {"math": 92, "science": 88}
}

# Shallow copy - nested dict is SHARED
shallow = original.copy()
shallow["grades"]["math"] = 100
print(original["grades"]["math"])   # Output: 100  (AFFECTED!)

# Deep copy - completely independent
original = {"name": "Alice", "grades": {"math": 92, "science": 88}}
deep = copy.deepcopy(original)
deep["grades"]["math"] = 100
print(original["grades"]["math"])   # Output: 92  (safe!)
\`\`\`

## Practical Example: School Management System

\`\`\`python
school = {
    "name": "Python Academy",
    "classes": {
        "CS101": {
            "teacher": "Prof. Smith",
            "students": {
                "alice": {"scores": [88, 92, 85], "attendance": 0.95},
                "bob":   {"scores": [72, 68, 75], "attendance": 0.88},
                "charlie":{"scores":[95, 98, 92], "attendance": 0.99},
            }
        },
        "MATH201": {
            "teacher": "Prof. Jones",
            "students": {
                "alice": {"scores": [90, 85, 92], "attendance": 0.92},
                "diana": {"scores": [78, 82, 80], "attendance": 0.85},
            }
        }
    }
}

def class_report(school, class_id):
    cls = school["classes"].get(class_id)
    if not cls:
        print(f"Class {class_id} not found")
        return

    print(f"\\n=== {class_id} - {cls['teacher']} ===")
    print(f"{'Student':<12} {'Avg Score':>10} {'Attendance':>12} {'Grade':>7}")
    print("-" * 45)

    all_avgs = []
    for name, data in cls["students"].items():
        avg = sum(data["scores"]) / len(data["scores"])
        all_avgs.append(avg)
        grade = "A" if avg >= 90 else "B" if avg >= 80 else "C" if avg >= 70 else "F"
        print(f"{name:<12} {avg:>10.1f} {data['attendance']:>11.0%} {grade:>7}")

    print("-" * 45)
    class_avg = sum(all_avgs) / len(all_avgs)
    print(f"{'Class Avg':<12} {class_avg:>10.1f}")

class_report(school, "CS101")
class_report(school, "MATH201")
\`\`\`

Output:
\`\`\`
=== CS101 - Prof. Smith ===
Student       Avg Score   Attendance   Grade
---------------------------------------------
alice              88.3          95%       B
bob                71.7          88%       C
charlie            95.0          99%       A
---------------------------------------------
Class Avg          85.0

=== MATH201 - Prof. Jones ===
Student       Avg Score   Attendance   Grade
---------------------------------------------
alice              89.0          92%       B
diana              80.0          85%       B
---------------------------------------------
Class Avg          84.5
\`\`\`

> [!TIP]
> Use \`dict.get(key, {}).get(nested_key, default)\` for safe nested access without chaining \`try-except\` blocks. Use \`setdefault()\` when building nested dicts dynamically. Always use \`copy.deepcopy()\` when you need truly independent copies of nested dictionaries.`,
  objectives: [
    "Create nested dictionaries to represent hierarchical data.",
    "Access nested values using chained square brackets.",
    "Use get() for safe nested access without KeyError.",
    "Modify nested dictionary values directly.",
    "Build nested dictionaries dynamically using loops and setdefault()."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};