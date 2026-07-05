export const typeConversionFunctionsLesson = {
  title: "Type Conversion Functions",
  slug: "type-conversion-functions",
  content: `# Type Conversion Functions

Type conversion (also called type casting) converts a value from one type to another. Python provides built-in functions for all common conversions.

## Numeric Type Conversions

### int() - Convert to Integer

\`\`\`python
# From float - truncates (does NOT round)
print(int(3.9))     # Output: 3   (not 4!)
print(int(3.1))     # Output: 3
print(int(-3.9))    # Output: -3  (truncates towards zero)

# From string
print(int("42"))    # Output: 42
print(int("  42  "))# Output: 42  (strips whitespace)
# print(int("3.14")) # ValueError - cannot convert decimal string directly

# From bool
print(int(True))    # Output: 1
print(int(False))   # Output: 0

# With base - convert number strings in different bases
print(int("1010", 2))   # Output: 10  (binary to decimal)
print(int("ff", 16))    # Output: 255 (hex to decimal)
print(int("17", 8))     # Output: 15  (octal to decimal)
print(int("z", 36))     # Output: 35  (base 36)
\`\`\`

### float() - Convert to Float

\`\`\`python
print(float(42))        # Output: 42.0
print(float("3.14"))    # Output: 3.14
print(float("42"))      # Output: 42.0
print(float("  3.14 ")) # Output: 3.14  (strips whitespace)
print(float(True))      # Output: 1.0
print(float(False))     # Output: 0.0

# Special float values
print(float("inf"))     # Output: inf
print(float("-inf"))    # Output: -inf
print(float("nan"))     # Output: nan

# Check for special values
import math
print(math.isinf(float("inf")))    # Output: True
print(math.isnan(float("nan")))    # Output: True
print(math.isfinite(3.14))         # Output: True
print(math.isfinite(float("inf"))) # Output: False
\`\`\`

### str() - Convert to String

\`\`\`python
print(str(42))        # Output: 42
print(str(3.14))      # Output: 3.14
print(str(True))      # Output: True
print(str(False))     # Output: False
print(str(None))      # Output: None
print(str([1,2,3]))   # Output: [1, 2, 3]
print(str((1,2,3)))   # Output: (1, 2, 3)
print(str({"a": 1}))  # Output: {'a': 1}

# Building strings
age = 25
message = "I am " + str(age) + " years old."
print(message)        # Output: I am 25 years old.
# (f-strings are preferred: f"I am {age} years old.")
\`\`\`

### bool() - Convert to Boolean

\`\`\`python
# Falsy values (convert to False)
print(bool(0))      # Output: False
print(bool(0.0))    # Output: False
print(bool(""))     # Output: False
print(bool([]))     # Output: False
print(bool({}))     # Output: False
print(bool(()))     # Output: False
print(bool(set()))  # Output: False
print(bool(None))   # Output: False

# Truthy values (convert to True)
print(bool(1))      # Output: True
print(bool(-1))     # Output: True
print(bool("a"))    # Output: True
print(bool([0]))    # Output: True   (non-empty list, even if contains 0)
print(bool(0.001))  # Output: True

# Practical use
user_input = input("Enter something: ")
if bool(user_input.strip()):
    print("You entered something!")
else:
    print("Empty input!")
\`\`\`

## Collection Type Conversions

### list() - Convert to List

\`\`\`python
# From tuple
print(list((1, 2, 3)))     # Output: [1, 2, 3]

# From set (order not guaranteed)
print(list({3, 1, 4, 1}))  # Output: [1, 3, 4] (order varies)

# From string
print(list("Python"))      # Output: ['P', 'y', 't', 'h', 'o', 'n']

# From dict (gets keys)
print(list({"a": 1, "b": 2}))   # Output: ['a', 'b']
print(list({"a": 1, "b": 2}.values()))  # Output: [1, 2]
print(list({"a": 1, "b": 2}.items()))   # Output: [('a', 1), ('b', 2)]

# From range
print(list(range(5)))      # Output: [0, 1, 2, 3, 4]

# From zip
names  = ["Alice", "Bob"]
scores = [88, 72]
print(list(zip(names, scores)))  # Output: [('Alice', 88), ('Bob', 72)]
\`\`\`

### tuple() - Convert to Tuple

\`\`\`python
# From list
print(tuple([1, 2, 3]))    # Output: (1, 2, 3)

# From set
print(tuple({1, 2, 3}))   # Output: (1, 2, 3)  (order may vary)

# From string
print(tuple("Hi"))         # Output: ('H', 'i')

# From range
print(tuple(range(4)))     # Output: (0, 1, 2, 3)

# Use case: make a list immutable
mutable = [1, 2, 3]
immutable = tuple(mutable)
print(immutable)           # Output: (1, 2, 3)
# immutable[0] = 99       # TypeError!
\`\`\`

### set() - Convert to Set (Removes Duplicates)

\`\`\`python
# Remove duplicates from a list
print(set([1, 2, 2, 3, 3, 3]))   # Output: {1, 2, 3}

# From string
print(set("hello"))               # Output: {'h', 'e', 'l', 'o'}  (no duplicate 'l')

# From tuple
print(set((1, 2, 2, 3)))         # Output: {1, 2, 3}

# Practical: get unique items
emails = ["alice@example.com", "bob@example.com", "alice@example.com"]
unique_emails = list(set(emails))
print(unique_emails)   # Output: ['bob@example.com', 'alice@example.com']
\`\`\`

### dict() - Convert to Dictionary

\`\`\`python
# From list of tuples
print(dict([("a", 1), ("b", 2), ("c", 3)]))
# Output: {'a': 1, 'b': 2, 'c': 3}

# From zip
keys   = ["name", "age", "city"]
values = ["Alice", 25, "London"]
print(dict(zip(keys, values)))
# Output: {'name': 'Alice', 'age': 25, 'city': 'London'}

# From keyword arguments
print(dict(name="Alice", age=25, city="London"))
# Output: {'name': 'Alice', 'age': 25, 'city': 'London'}

# From two lists using dict comprehension
print({k: v for k, v in zip(keys, values)})
# Output: {'name': 'Alice', 'age': 25, 'city': 'London'}
\`\`\`

## Number Base Conversions

### bin() - Integer to Binary String

\`\`\`python
print(bin(0))     # Output: 0b0
print(bin(5))     # Output: 0b101
print(bin(10))    # Output: 0b1010
print(bin(255))   # Output: 0b11111111
print(bin(-5))    # Output: -0b101

# Remove the '0b' prefix
print(bin(10)[2:])   # Output: 1010
print(format(10, 'b'))  # Output: 1010  (cleaner)
print(f"{10:08b}")       # Output: 00001010  (zero-padded to 8 bits)
\`\`\`

### oct() - Integer to Octal String

\`\`\`python
print(oct(0))     # Output: 0o0
print(oct(8))     # Output: 0o10
print(oct(64))    # Output: 0o100
print(oct(255))   # Output: 0o377
print(oct(-8))    # Output: -0o10

# Remove the '0o' prefix
print(oct(64)[2:])      # Output: 100
print(format(64, 'o'))  # Output: 100
\`\`\`

### hex() - Integer to Hexadecimal String

\`\`\`python
print(hex(0))     # Output: 0x0
print(hex(10))    # Output: 0xa
print(hex(16))    # Output: 0x10
print(hex(255))   # Output: 0xff
print(hex(256))   # Output: 0x100
print(hex(-16))   # Output: -0x10

# Remove the '0x' prefix
print(hex(255)[2:])       # Output: ff
print(format(255, 'x'))   # Output: ff
print(format(255, 'X'))   # Output: FF  (uppercase)
print(format(255, '#x'))  # Output: 0xff  (with prefix)

# Practical: color codes
r, g, b = 255, 128, 0
color_hex = f"#{r:02X}{g:02X}{b:02X}"
print(color_hex)   # Output: #FF8000
\`\`\`

### ord() - Character to Unicode Code Point

\`\`\`python
print(ord('A'))    # Output: 65
print(ord('a'))    # Output: 97
print(ord('0'))    # Output: 48
print(ord(' '))    # Output: 32
print(ord('!'))    # Output: 33
print(ord('€'))    # Output: 8364
print(ord('中'))   # Output: 20013

# Practical: check if character is uppercase
def is_uppercase(char):
    return ord('A') <= ord(char) <= ord('Z')

print(is_uppercase('A'))   # Output: True
print(is_uppercase('a'))   # Output: False
\`\`\`

### chr() - Unicode Code Point to Character

\`\`\`python
print(chr(65))     # Output: A
print(chr(97))     # Output: a
print(chr(48))     # Output: 0
print(chr(8364))   # Output: €

# Generate alphabet
alphabet = [chr(i) for i in range(65, 91)]
print(alphabet)
# Output: ['A', 'B', 'C', ..., 'Z']

lowercase = [chr(i) for i in range(97, 123)]
print(lowercase)
# Output: ['a', 'b', 'c', ..., 'z']
\`\`\`

## ord() and chr() Together - Caesar Cipher

\`\`\`python
def caesar_encrypt(text, shift):
    result = []
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            encrypted = chr((ord(char) - base + shift) % 26 + base)
            result.append(encrypted)
        else:
            result.append(char)
    return ''.join(result)

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)

message = "Hello, World!"
encrypted = caesar_encrypt(message, 3)
decrypted = caesar_decrypt(encrypted, 3)

print(f"Original : {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")
\`\`\`

Output:
\`\`\`
Original : Hello, World!
Encrypted: Khoor, Zruog!
Decrypted: Hello, World!
\`\`\`

## Conversion Summary Table

\`\`\`
From\\To   int      float    str      bool     list     tuple    set
------    -----    -----    -----    -----    -----    -----    -----
int       -        float()  str()    bool()   [x]      (x,)     {x}
float     int()    -        str()    bool()   [x]      (x,)     {x}
str       int()    float()  -        bool()   list()   tuple()  set()
bool      int()    float()  str()    -        [x]      (x,)     {x}
list      -        -        str()    bool()   -        tuple()  set()
tuple     -        -        str()    bool()   list()   -        set()
set       -        -        str()    bool()   list()   tuple()  -
\`\`\`

## Practical Example: Data Type Normalizer

\`\`\`python
def normalize_value(value):
    """Try to convert a string to the most appropriate Python type."""
    if not isinstance(value, str):
        return value

    stripped = value.strip()

    # Try bool first (before int, since int("True") fails but we want True)
    if stripped.lower() == 'true':
        return True
    if stripped.lower() == 'false':
        return False
    if stripped.lower() == 'none' or stripped.lower() == 'null':
        return None

    # Try int
    try:
        return int(stripped)
    except ValueError:
        pass

    # Try float
    try:
        return float(stripped)
    except ValueError:
        pass

    # Return as string
    return stripped

# Test
raw_values = ["42", "3.14", "true", "False", "None", "hello", "  100  ", "1e5"]
for v in raw_values:
    converted = normalize_value(v)
    print(f"{v!r:15} -> {converted!r:15} ({type(converted).__name__})")
\`\`\`

Output:
\`\`\`
'42'            -> 42              (int)
'3.14'          -> 3.14            (float)
'true'          -> True            (bool)
'False'         -> False           (bool)
'None'          -> None            (NoneType)
'hello'         -> 'hello'         (str)
'  100  '       -> 100             (int)
'1e5'           -> 100000.0        (float)
\`\`\`

> [!TIP]
> When converting strings to numbers, always use \`try-except\` to handle invalid input gracefully. Use \`int(x, base)\` to convert from binary, octal, or hex strings. Use \`ord()\` and \`chr()\` when working with character-level operations or encoding/decoding. Remember \`int()\` truncates floats - it does NOT round them.`,
  objectives: [
    "Convert between numeric types using int(), float(), str(), and bool().",
    "Convert between collection types using list(), tuple(), set(), and dict().",
    "Use bin(), oct(), and hex() to convert integers to different base representations.",
    "Use ord() and chr() to convert between characters and Unicode code points.",
    "Handle conversion errors safely using try-except."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};