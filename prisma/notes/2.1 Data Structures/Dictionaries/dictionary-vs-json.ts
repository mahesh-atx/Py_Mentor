export const dictionaryVsJsonLesson = {
  title: "Dictionary vs JSON",
  slug: "dictionary-vs-json",
  content: `# Dictionary vs JSON

## The Theory — Building the Logic

The key idea is to separate two different things that merely *look* alike: a Python dictionary is a **live object in memory** your program can manipulate, while JSON is **text** — a universal, language-neutral format for transmitting or storing that data. Converting between them has proper names: **serialization** (\`dumps\`/\`dump\`) flattens a dictionary into a JSON string so it can travel or be saved, and **deserialization** (\`loads\`/\`load\`) rebuilds a dictionary from that text. They look similar because JSON was inspired by JavaScript object syntax, but they are not identical: JSON demands **double quotes**, uses lowercase \`true\`/\`false\`/\`null\`, and only allows string keys — Python's \`True\`/\`False\`/\`None\` and richer key types are translated during conversion. The pitfall that surprises beginners is that the round trip is **lossy for types**: a tuple becomes a list and non-string keys become strings, so what you load back may not exactly match what you dumped — never assume JSON preserves every Python type perfectly.

## What is JSON?

**JSON** (JavaScript Object Notation) is a text-based data format used to exchange data between systems - between a Python backend and a web browser, between APIs, or for storing configuration. JSON looks very similar to Python dictionaries, which is why understanding the relationship between them is important.

\`\`\`json
{
    "name": "Alice",
    "age": 25,
    "active": true,
    "scores": [88, 92, 75],
    "address": null
}
\`\`\`

## Similarities Between Python Dict and JSON

\`\`\`
Feature            Python Dict         JSON
-----------------  ------------------  ------------------
Structure          key: value          "key": value
Nesting            Supported           Supported
Lists/Arrays       list []             array []
Strings            'text' or "text"    "text" only
Numbers            int, float          number
Booleans           True, False         true, false
Null/None          None                null
\`\`\`

## Key Differences

\`\`\`
Difference         Python Dict         JSON
-----------------  ------------------  --------------------
Booleans           True, False         true, false
Null value         None                null
String quotes      Single or double    Double quotes ONLY
Key types          Any immutable       Strings ONLY
Comments           No (in data)        Not supported
Trailing commas    Allowed             Not allowed
\`\`\`

\`\`\`python
# Python dict
python_dict = {
    "name": "Alice",
    "active": True,       # Python: True
    "score": None,        # Python: None
    42: "a number key",   # Python: any immutable key
}

# Equivalent JSON (strings only, different bool/null)
json_string = '''
{
    "name": "Alice",
    "active": true,
    "score": null
}
'''
# Note: 42 as a key is not valid JSON (must be a string)
\`\`\`

## The json Module

Python's built-in \`json\` module handles all conversions between Python dicts and JSON strings.

\`\`\`python
import json
\`\`\`

## Converting Python Dict to JSON String (Serialization)

### json.dumps() - Dict to JSON String

\`\`\`python
import json

person = {
    "name": "Alice",
    "age": 25,
    "active": True,
    "score": None,
    "hobbies": ["reading", "coding"]
}

# Convert to JSON string
json_string = json.dumps(person)
print(json_string)
print(type(json_string))   # Output: <class 'str'>
\`\`\`

Output:
\`\`\`
{"name": "Alice", "age": 25, "active": true, "score": null, "hobbies": ["reading", "coding"]}
<class 'str'>
\`\`\`

Notice how Python's \`True\` became JSON's \`true\` and Python's \`None\` became JSON's \`null\`.

### Pretty Printing JSON

\`\`\`python
import json

person = {
    "name": "Alice",
    "age": 25,
    "address": {"city": "New York", "zip": "10001"},
    "scores": [88, 92, 75]
}

# indent parameter makes it human-readable
pretty = json.dumps(person, indent=4)
print(pretty)
\`\`\`

Output:
\`\`\`json
{
    "name": "Alice",
    "age": 25,
    "address": {
        "city": "New York",
        "zip": "10001"
    },
    "scores": [
        88,
        92,
        75
    ]
}
\`\`\`

\`\`\`python
# Additional options
json.dumps(person, indent=2, sort_keys=True)      # Sort keys alphabetically
json.dumps(person, indent=2, ensure_ascii=False)  # Allow non-ASCII (é, ñ, 中)
json.dumps(person, separators=(',', ':'))          # Compact - no spaces
\`\`\`

## Converting JSON String to Python Dict (Deserialization)

### json.loads() - JSON String to Dict

\`\`\`python
import json

json_string = '{"name": "Alice", "age": 25, "active": true, "score": null}'

# Convert JSON string to Python dict
python_dict = json.loads(json_string)
print(python_dict)
print(type(python_dict))   # Output: <class 'dict'>

# JSON 'true' became Python True, JSON 'null' became Python None
print(python_dict["active"])   # Output: True  (Python bool)
print(python_dict["score"])    # Output: None  (Python None)
\`\`\`

\`\`\`python
# JSON array becomes Python list
json_array = '[1, 2, 3, "hello", true, null]'
python_list = json.loads(json_array)
print(python_list)         # Output: [1, 2, 3, 'hello', True, None]
print(type(python_list))   # Output: <class 'list'>
\`\`\`

## Working with JSON Files

### Writing a Dict to a JSON File

\`\`\`python
import json

data = {
    "students": [
        {"name": "Alice", "grade": "A", "score": 92},
        {"name": "Bob",   "grade": "B", "score": 85},
        {"name": "Charlie","grade":"A", "score": 95}
    ],
    "class": "CS101",
    "semester": "Fall 2024"
}

# json.dump() - write to a file (note: no 's')
with open("students.json", "w") as file:
    json.dump(data, file, indent=4)

print("Data written to students.json")
\`\`\`

### Reading a JSON File into a Dict

\`\`\`python
import json

# json.load() - read from a file (note: no 's')
with open("students.json", "r") as file:
    loaded_data = json.load(file)

print(type(loaded_data))   # Output: <class 'dict'>
print(loaded_data["class"])   # Output: CS101

for student in loaded_data["students"]:
    print(f"{student['name']}: {student['grade']}")
\`\`\`

## Type Conversion Table

\`\`\`
Python Type    JSON Type      Python Type (after loading)
-----------    ---------      ---------------------------
dict           object {}      dict
list           array []       list
tuple          array []       list  (tuples become lists!)
str            string ""      str
int            number         int
float          number         float
True           true           True
False          false          False
None           null           None
\`\`\`

\`\`\`python
import json

# Tuples become lists after JSON round-trip!
original = {"point": (10, 20)}
json_str = json.dumps(original)
print(json_str)     # Output: {"point": [10, 20]}

loaded = json.loads(json_str)
print(loaded["point"])            # Output: [10, 20]
print(type(loaded["point"]))      # Output: <class 'list'>  (was tuple!)
\`\`\`

## Handling JSON Errors

\`\`\`python
import json

# Invalid JSON string
bad_json = "{'name': 'Alice'}"   # Single quotes - invalid JSON!

try:
    data = json.loads(bad_json)
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
# Output: JSON Error: Expecting property name enclosed in double quotes...
\`\`\`

## Real-World Example: Working with an API Response

\`\`\`python
import json

# Simulated API response (what you would get from requests.get().json())
api_response = """
{
    "status": "success",
    "data": {
        "user": {
            "id": 12345,
            "username": "alice_smith",
            "email": "alice@example.com",
            "premium": true,
            "last_login": "2024-01-15"
        },
        "permissions": ["read", "write", "export"],
        "quota": {
            "used": 2048,
            "total": 10240,
            "unit": "MB"
        }
    },
    "message": null
}
"""

# Parse the response
response = json.loads(api_response)

# Extract data
user = response["data"]["user"]
permissions = response["data"]["permissions"]
quota = response["data"]["quota"]

print(f"User      : {user['username']}")
print(f"Email     : {user['email']}")
print(f"Premium   : {user['premium']}")
print(f"Permissions: {', '.join(permissions)}")

used_pct = (quota["used"] / quota["total"]) * 100
print(f"Storage   : {quota['used']} / {quota['total']} {quota['unit']} ({used_pct:.1f}%)")
print(f"Message   : {response['message']}")   # Prints: None

# Modify and save back to JSON
user["email"] = "alice.smith@example.com"
print("\\nUpdated JSON:")
print(json.dumps(response["data"]["user"], indent=2))
\`\`\`

Output:
\`\`\`
User      : alice_smith
Email     : alice@example.com
Premium   : True
Permissions: read, write, export
Storage   : 2048 / 10240 MB (20.0%)
Message   : None

Updated JSON:
{
  "id": 12345,
  "username": "alice_smith",
  "email": "alice.smith@example.com",
  "premium": true,
  "last_login": "2024-01-15"
}
\`\`\`

## Quick Reference

\`\`\`python
import json

# Dict -> JSON string
json_str = json.dumps(my_dict)              # Compact
json_str = json.dumps(my_dict, indent=4)    # Pretty

# JSON string -> Dict
my_dict = json.loads(json_str)

# Dict -> JSON file
with open("file.json", "w") as f:
    json.dump(my_dict, f, indent=4)

# JSON file -> Dict
with open("file.json", "r") as f:
    my_dict = json.load(f)
\`\`\`

> [!TIP]
> Remember the four functions: \`dumps()\` and \`loads()\` for strings (the 's' stands for 'string'), \`dump()\` and \`load()\` for files. Also remember that JSON requires double quotes for strings and uses \`true\`/\`false\`/\`null\` (lowercase) - Python's \`True\`/\`False\`/\`None\` are automatically converted.`,
  objectives: [
    "Understand the similarities and differences between Python dicts and JSON.",
    "Use json.dumps() to convert a Python dictionary to a JSON string.",
    "Use json.loads() to convert a JSON string to a Python dictionary.",
    "Use json.dump() and json.load() to write and read JSON files.",
    "Understand how Python types map to JSON types and vice versa."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};