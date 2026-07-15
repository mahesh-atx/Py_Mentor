export const workingWithJsonLesson = {
  title: "Working with JSON Files",
  slug: "working-with-json",
  content: `# Working with JSON Files

## The Theory — Building the Logic

JSON is a text format for structured data that maps almost one-to-one onto Python's own building blocks: objects become dictionaries, arrays become lists, and scalars become strings, numbers, booleans, or None. The core idea is *serialization* — converting a live Python object graph into a portable string (or file) that another program, even written in another language, can rebuild exactly. Because it is plain text, JSON is safe to store and transmit, but it also means Python types that are not part of the JSON spec, such as tuples or datetime objects, must be converted by you or they raise a TypeError. The conversion is lossy in subtle ways: a tuple becomes a list after a round-trip, and the original distinction is gone. A common pitfall is trying to store Python-specific objects directly and expecting them back unchanged, when JSON only preserves the universal data types it understands.

## What is JSON?

**JSON** (JavaScript Object Notation) is the most popular format for storing and exchanging structured data. It maps naturally to Python's dictionaries, lists, strings, numbers, booleans, and None.

\`\`\`json
{
  "name": "Alice",
  "age": 25,
  "active": true,
  "score": null,
  "courses": ["Python", "Math"],
  "address": {
    "city": "London",
    "zip": "SW1A 1AA"
  }
}
\`\`\`

\`\`\`python
import json
\`\`\`

## The Four Core Functions

\`\`\`
json.dumps(obj)          Python dict/list  ->  JSON string
json.loads(string)       JSON string       ->  Python dict/list
json.dump(obj, file)     Python dict/list  ->  JSON file
json.load(file)          JSON file         ->  Python dict/list
\`\`\`

## json.dumps() - Python to JSON String

\`\`\`python
import json

person = {
    "name": "Alice",
    "age": 25,
    "active": True,
    "score": None,
    "courses": ["Python", "Math"]
}

# Convert to JSON string (compact)
json_str = json.dumps(person)
print(json_str)
# {"name": "Alice", "age": 25, "active": true, "score": null, "courses": ["Python", "Math"]}

# Pretty-printed with indentation
pretty = json.dumps(person, indent=4)
print(pretty)
\`\`\`

Pretty output:
\`\`\`json
{
    "name": "Alice",
    "age": 25,
    "active": true,
    "score": null,
    "courses": [
        "Python",
        "Math"
    ]
}
\`\`\`

\`\`\`python
# Additional options
json.dumps(data, indent=2, sort_keys=True)           # Sort keys alphabetically
json.dumps(data, indent=2, ensure_ascii=False)        # Allow Unicode characters
json.dumps(data, separators=(',', ':'))               # Compact with no spaces

# Type conversion: Python -> JSON
# True  -> true
# False -> false
# None  -> null
# int   -> number
# float -> number
# str   -> string
# list  -> array
# dict  -> object
\`\`\`

## json.loads() - JSON String to Python

\`\`\`python
import json

json_string = '{"name": "Alice", "age": 25, "active": true, "score": null}'

data = json.loads(json_string)
print(type(data))          # <class 'dict'>
print(data["name"])        # Alice
print(data["active"])      # True  (JSON true -> Python True)
print(data["score"])       # None  (JSON null -> Python None)

# JSON array -> Python list
json_array = '[1, "hello", true, null, 3.14]'
python_list = json.loads(json_array)
print(python_list)   # [1, 'hello', True, None, 3.14]
\`\`\`

## json.dump() - Python to JSON File

\`\`\`python
import json

data = {
    "users": [
        {"id": 1, "name": "Alice", "score": 88},
        {"id": 2, "name": "Bob",   "score": 72},
    ],
    "total": 2
}

# Write to a JSON file
with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print("Saved to data.json")
\`\`\`

data.json:
\`\`\`json
{
    "users": [
        {
            "id": 1,
            "name": "Alice",
            "score": 88
        },
        {
            "id": 2,
            "name": "Bob",
            "score": 72
        }
    ],
    "total": 2
}
\`\`\`

## json.load() - JSON File to Python

\`\`\`python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

print(type(data))              # <class 'dict'>
print(data["total"])           # 2
print(data["users"][0]["name"]) # Alice

for user in data["users"]:
    print(f"  {user['name']}: {user['score']}")
\`\`\`

## Error Handling

\`\`\`python
import json

# Invalid JSON
try:
    data = json.loads("{'name': 'Alice'}")   # Single quotes - invalid JSON!
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
    # Expecting property name enclosed in double quotes: line 1 column 2 (char 1)

# File not found
try:
    with open("nonexistent.json", "r") as f:
        data = json.load(f)
except FileNotFoundError:
    print("Config file not found, using defaults")
    data = {"debug": False, "port": 8080}

# Data that can't be serialized
import datetime
data = {"timestamp": datetime.datetime.now()}  # datetime is not JSON serializable!

try:
    json_str = json.dumps(data)
except TypeError as e:
    print(f"Cannot serialize: {e}")
    # Object of type datetime is not JSON serializable
\`\`\`

## Custom JSON Serialization

\`\`\`python
import json
import datetime

# Custom encoder
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()   # Convert to ISO format string
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

data = {
    "event": "Python Conference",
    "date": datetime.datetime(2024, 6, 15, 10, 30),
    "created": datetime.date.today()
}

# Use custom encoder
json_str = json.dumps(data, cls=DateTimeEncoder, indent=2)
print(json_str)

# Alternative: default parameter (simpler)
def json_serial(obj):
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

json_str = json.dumps(data, default=json_serial, indent=2)
print(json_str)
\`\`\`

## Practical Example: Configuration File Manager

\`\`\`python
import json
import os
from typing import Any

DEFAULT_CONFIG = {
    "app_name": "MyApp",
    "version": "1.0.0",
    "debug": False,
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "mydb"
    },
    "logging": {
        "level": "INFO",
        "file": "app.log"
    },
    "max_connections": 100,
    "allowed_hosts": ["localhost", "127.0.0.1"]
}

CONFIG_FILE = "config.json"

def load_config(config_file: str = CONFIG_FILE) -> dict:
    """Load config from file, creating with defaults if not found."""
    if not os.path.exists(config_file):
        print(f"Config not found. Creating {config_file} with defaults.")
        save_config(DEFAULT_CONFIG, config_file)
        return DEFAULT_CONFIG.copy()

    try:
        with open(config_file, "r", encoding="utf-8") as f:
            config = json.load(f)
        print(f"Config loaded from {config_file}")
        return config
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {config_file}: {e}")
        print("Using default config.")
        return DEFAULT_CONFIG.copy()

def save_config(config: dict, config_file: str = CONFIG_FILE) -> None:
    """Save config to file."""
    with open(config_file, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=4)
    print(f"Config saved to {config_file}")

def update_config(key_path: str, value: Any, config_file: str = CONFIG_FILE) -> None:
    """Update a nested config value using dot notation. E.g. 'database.port'"""
    config = load_config(config_file)

    keys = key_path.split(".")
    current = config

    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]

    current[keys[-1]] = value
    save_config(config, config_file)
    print(f"Updated {key_path} = {value}")

def get_config_value(key_path: str, default=None) -> Any:
    """Get a nested config value using dot notation."""
    config = load_config()
    keys = key_path.split(".")
    current = config

    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return default

    return current

# Demo
config = load_config()
print(f"\\nApp: {config['app_name']} v{config['version']}")
print(f"Debug: {config['debug']}")
print(f"DB Host: {config['database']['host']}:{config['database']['port']}")

# Update a value
update_config("debug", True)
update_config("database.port", 3306)
update_config("new_feature.enabled", True)

# Get specific value
port = get_config_value("database.port", default=5432)
print(f"\\nDatabase port: {port}")

debug = get_config_value("debug")
print(f"Debug mode: {debug}")

# View the final config
print("\\nFinal config:")
with open(CONFIG_FILE) as f:
    print(f.read())
\`\`\`

## Practical Example: Simple JSON Database

\`\`\`python
import json
import os
from datetime import datetime

class JSONDatabase:
    """A simple file-based database using JSON."""

    def __init__(self, filepath: str):
        self.filepath = filepath
        self._ensure_file()

    def _ensure_file(self):
        if not os.path.exists(self.filepath):
            self._write({"records": [], "meta": {"count": 0, "created": datetime.now().isoformat()}})

    def _read(self) -> dict:
        with open(self.filepath, "r", encoding="utf-8") as f:
            return json.load(f)

    def _write(self, data: dict):
        with open(self.filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def insert(self, record: dict) -> int:
        data = self._read()
        record_id = len(data["records"]) + 1
        record["id"] = record_id
        record["created_at"] = datetime.now().isoformat()
        data["records"].append(record)
        data["meta"]["count"] = len(data["records"])
        self._write(data)
        return record_id

    def find_all(self) -> list:
        return self._read()["records"]

    def find_by_id(self, record_id: int) -> dict | None:
        for record in self.find_all():
            if record.get("id") == record_id:
                return record
        return None

    def find_by(self, **kwargs) -> list:
        results = []
        for record in self.find_all():
            if all(record.get(k) == v for k, v in kwargs.items()):
                results.append(record)
        return results

    def update(self, record_id: int, updates: dict) -> bool:
        data = self._read()
        for record in data["records"]:
            if record.get("id") == record_id:
                record.update(updates)
                record["updated_at"] = datetime.now().isoformat()
                self._write(data)
                return True
        return False

    def delete(self, record_id: int) -> bool:
        data = self._read()
        original_count = len(data["records"])
        data["records"] = [r for r in data["records"] if r.get("id") != record_id]
        if len(data["records"]) < original_count:
            data["meta"]["count"] = len(data["records"])
            self._write(data)
            return True
        return False

    def count(self) -> int:
        return self._read()["meta"]["count"]

# Usage
db = JSONDatabase("users.json")

# Insert records
id1 = db.insert({"name": "Alice", "age": 25, "role": "admin"})
id2 = db.insert({"name": "Bob", "age": 30, "role": "user"})
id3 = db.insert({"name": "Charlie", "age": 22, "role": "user"})

print(f"Total records: {db.count()}")

# Find records
alice = db.find_by_id(id1)
print(f"Found: {alice['name']}")

users = db.find_by(role="user")
print(f"Users: {[u['name'] for u in users]}")

# Update
db.update(id2, {"age": 31, "role": "moderator"})
bob = db.find_by_id(id2)
print(f"Bob updated: age={bob['age']}, role={bob['role']}")

# Delete
db.delete(id3)
print(f"After delete: {db.count()} records")
\`\`\`

> [!TIP]
> Use \`json.dump(data, file, indent=4)\` when saving human-readable JSON files (configs, exports). Use \`json.dump(data, file)\` for compact storage when file size matters. Always use \`encoding='utf-8'\` to handle international characters. Use \`json.JSONDecodeError\` to catch invalid JSON. Remember that tuples become lists after a JSON round-trip.`,
  objectives: [
    "Use json.dumps() and json.loads() to convert between Python objects and JSON strings.",
    "Use json.dump() and json.load() to read and write JSON files.",
    "Handle JSONDecodeError for invalid JSON input.",
    "Create custom encoders for non-serializable types like datetime.",
    "Build practical applications using JSON files for data persistence."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};