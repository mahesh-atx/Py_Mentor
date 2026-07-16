export const dictionaryMethodsLesson = {
  title: "Dictionary Methods",
  slug: "dictionary-methods",
  content: `# Dictionary Methods

Python dictionaries come with a powerful set of built-in methods. This lesson covers all the essential ones. The view methods \`keys()\`, \`values()\`, and \`items()\` return **live windows** onto the dictionary rather than copies, so they stay in sync as the data changes. Watch out with copying: \`copy()\` makes only a **shallow** copy, so nested objects are still shared — reach for \`copy.deepcopy()\` when you need true independence.

## Viewing Keys, Values, and Items

### keys() - Get All Keys

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

keys = person.keys()
print(keys)         # Output: dict_keys(['name', 'age', 'city'])
print(type(keys))   # Output: <class 'dict_keys'>

# Convert to a list
keys_list = list(person.keys())
print(keys_list)    # Output: ['name', 'age', 'city']

# Iterate over keys
for key in person.keys():
    print(key)
# Also works without .keys() (default iteration is over keys)
for key in person:
    print(key)
\`\`\`

### values() - Get All Values

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

values = person.values()
print(values)   # Output: dict_values(['Alice', 25, 'New York'])

# Convert to list
values_list = list(person.values())
print(values_list)   # Output: ['Alice', 25, 'New York']

# Check if a VALUE exists
print("Alice" in person.values())   # Output: True
print(25 in person.values())        # Output: True

# Sum numeric values
scores = {"Alice": 88, "Bob": 72, "Charlie": 95}
total = sum(scores.values())
average = total / len(scores)
print(f"Average: {average:.1f}")   # Output: Average: 85.0
\`\`\`

### items() - Get All Key-Value Pairs

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

items = person.items()
print(items)
# Output: dict_items([('name', 'Alice'), ('age', 25), ('city', 'New York')])

# Each item is a (key, value) tuple - perfect for unpacking
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

Output:
\`\`\`
name: Alice
age: 25
city: New York
\`\`\`

### Views are Dynamic

\`\`\`python
person = {"name": "Alice", "age": 25}
keys_view = person.keys()

print(keys_view)    # Output: dict_keys(['name', 'age'])

# After modifying the dict, the view updates automatically!
person["city"] = "New York"
print(keys_view)    # Output: dict_keys(['name', 'age', 'city'])
\`\`\`

## Safe Access Methods

### get() - Access with a Default

\`\`\`python
person = {"name": "Alice", "age": 25}

# Safe access - no KeyError if key missing
print(person.get("name"))              # Output: Alice
print(person.get("email"))             # Output: None
print(person.get("email", "N/A"))      # Output: N/A
print(person.get("age", 0))            # Output: 25 (key exists)
\`\`\`

\`\`\`python
# Practical: counting words
text = "apple banana apple cherry banana apple"
word_count = {}

for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1

print(word_count)
# Output: {'apple': 3, 'banana': 2, 'cherry': 1}
\`\`\`

### setdefault() - Get or Set a Default

\`setdefault(key, default)\` returns the value if the key exists. If not, it **inserts** the key with the default value and returns it.

\`\`\`python
person = {"name": "Alice"}

# Key exists - returns existing value, does NOT change it
result = person.setdefault("name", "Bob")
print(result)    # Output: Alice
print(person)    # Output: {'name': 'Alice'}  (unchanged)

# Key does NOT exist - inserts with default and returns it
result = person.setdefault("age", 25)
print(result)    # Output: 25
print(person)    # Output: {'name': 'Alice', 'age': 25}
\`\`\`

\`\`\`python
# Classic use: grouping items
students = [
    ("Math", "Alice"),
    ("Science", "Bob"),
    ("Math", "Charlie"),
    ("Science", "Diana"),
    ("Math", "Eve"),
]

# Group students by subject
classes = {}
for subject, student in students:
    classes.setdefault(subject, []).append(student)

print(classes)
# Output: {'Math': ['Alice', 'Charlie', 'Eve'], 'Science': ['Bob', 'Diana']}
\`\`\`

## Modifying Methods

### update() - Merge or Update

\`\`\`python
person = {"name": "Alice", "age": 25}

# Update with another dict
person.update({"age": 26, "city": "Boston"})
print(person)
# Output: {'name': 'Alice', 'age': 26, 'city': 'Boston'}

# Update with keyword arguments
person.update(email="alice@example.com", country="USA")
print(person)

# Merge two dicts (Python 3.9+ also has | operator)
defaults = {"theme": "light", "language": "en", "notifications": True}
user_prefs = {"theme": "dark", "font_size": 14}

# user_prefs overrides defaults
merged = {**defaults, **user_prefs}
print(merged)
# Output: {'theme': 'dark', 'language': 'en', 'notifications': True, 'font_size': 14}
\`\`\`

### pop() - Remove and Return

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Remove and get the value
age = person.pop("age")
print(age)     # Output: 25
print(person)  # Output: {'name': 'Alice', 'city': 'New York'}

# Safe pop with default - no KeyError
phone = person.pop("phone", None)
print(phone)   # Output: None
\`\`\`

### popitem() - Remove Last Item

\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Removes and returns the last inserted (key, value) pair
item = person.popitem()
print(item)      # Output: ('city', 'New York')
print(person)    # Output: {'name': 'Alice', 'age': 25}
\`\`\`

\`\`\`python
# Process and remove all items one by one
data = {"a": 1, "b": 2, "c": 3}
while data:
    key, value = data.popitem()
    print(f"Processing: {key} = {value}")
\`\`\`

### copy() - Shallow Copy

\`\`\`python
original = {"name": "Alice", "scores": [88, 92, 78]}

# Direct assignment - both point to the SAME dict
alias = original
alias["name"] = "Bob"
print(original["name"])   # Output: Bob  (CHANGED! not intended)

# copy() - independent copy
original = {"name": "Alice", "scores": [88, 92, 78]}
copy_dict = original.copy()

copy_dict["name"] = "Bob"
print(original["name"])   # Output: Alice  (unchanged)

# BUT nested objects are still shared (shallow copy!)
copy_dict["scores"].append(95)
print(original["scores"]) # Output: [88, 92, 78, 95]  (CHANGED!)

# For nested objects, use deepcopy
import copy
deep = copy.deepcopy(original)
deep["scores"].append(100)
print(original["scores"]) # Output: [88, 92, 78, 95]  (not affected)
\`\`\`

### clear() - Empty the Dictionary

\`\`\`python
person = {"name": "Alice", "age": 25}
person.clear()
print(person)      # Output: {}
print(len(person)) # Output: 0
\`\`\`

## Complete Methods Reference

\`\`\`python
d = {"a": 1, "b": 2, "c": 3}

# Viewing
print(d.keys())            # dict_keys(['a', 'b', 'c'])
print(d.values())          # dict_values([1, 2, 3])
print(d.items())           # dict_items([('a',1), ('b',2), ('c',3)])

# Safe access
print(d.get("a"))          # 1
print(d.get("z", 0))       # 0  (default)
print(d.setdefault("d", 4)) # 4  (inserts 'd':4)
print(d)                   # {'a':1, 'b':2, 'c':3, 'd':4}

# Modification
d.update({"a": 10, "e": 5})
print(d)                   # {'a':10, 'b':2, 'c':3, 'd':4, 'e':5}

val = d.pop("b")
print(val)                 # 2
print(d)                   # {'a':10, 'c':3, 'd':4, 'e':5}

last = d.popitem()
print(last)                # ('e', 5)

copy_d = d.copy()
d.clear()
print(d)                   # {}
print(copy_d)              # {'a': 10, 'c': 3, 'd': 4}
\`\`\`

## Practical Example: Configuration Manager

\`\`\`python
DEFAULT_CONFIG = {
    "theme": "light",
    "language": "en",
    "font_size": 12,
    "notifications": True,
    "auto_save": False,
    "timeout": 30
}

def load_user_config(user_settings):
    config = DEFAULT_CONFIG.copy()
    config.update(user_settings)
    return config

def get_setting(config, key):
    return config.get(key, f"Setting '{key}' not found")

def reset_setting(config, key):
    default_val = DEFAULT_CONFIG.get(key)
    if default_val is not None:
        config[key] = default_val
        return True
    return False

user_prefs = {"theme": "dark", "font_size": 16, "auto_save": True}
config = load_user_config(user_prefs)

print("=== Current Configuration ===")
for key, value in config.items():
    marker = " *" if key in user_prefs else ""
    print(f"  {key:<20}: {value}{marker}")

print(f"\\nFont size: {get_setting(config, 'font_size')}")
print(f"Password : {get_setting(config, 'password')}")

reset_setting(config, "theme")
print(f"\\nAfter reset, theme: {config['theme']}")
\`\`\`

Output:
\`\`\`
=== Current Configuration ===
  theme               : dark *
  language            : en
  font_size           : 16 *
  notifications       : True
  auto_save           : True *
  timeout             : 30

Font size: 16
Password : Setting 'password' not found

After reset, theme: light
\`\`\`

> [!TIP]
> Use \`get()\` almost always instead of direct \`[]\` access when you are not 100% sure a key exists. Use \`setdefault()\` to initialize keys lazily (especially useful for grouping). Use \`update()\` to merge dictionaries or apply bulk changes.`,
  objectives: [
    "Use keys(), values(), and items() to view dictionary contents.",
    "Understand that dict views are dynamic and reflect changes.",
    "Use get() for safe access with an optional default value.",
    "Use setdefault() to get or initialize a value.",
    "Use update(), pop(), popitem(), copy(), and clear() effectively."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};