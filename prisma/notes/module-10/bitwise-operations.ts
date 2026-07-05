export const bitwiseOperationsLesson = {
  title: "Bitwise Operations on Numbers",
  slug: "bitwise-operations",
  content: `# Bitwise Operations on Numbers

Bitwise operators manipulate individual bits within integers. They are essential for systems programming, cryptography, compression, and working with hardware.

## Review: Binary Representation

\`\`\`python
# Python integers in binary
print(f"5  = {5:08b}")   # 00000101
print(f"3  = {3:08b}")   # 00000011
print(f"12 = {12:08b}")  # 00001100
print(f"10 = {10:08b}")  # 00001010
\`\`\`

## The Six Bitwise Operators

\`\`\`
Operator    Name               Symbol
--------    ---------------    ------
&           AND                &
|           OR                 |
^           XOR                ^
~           NOT (complement)   ~
<<          Left Shift         <<
>>          Right Shift        >>
\`\`\`

## Bitwise AND (&)

Each bit in the result is 1 only if **both** corresponding bits are 1.

\`\`\`
5  = 0101
3  = 0011
---------
&  = 0001 = 1
\`\`\`

\`\`\`python
print(5 & 3)     # 1
print(12 & 10)   # 8    (1100 & 1010 = 1000)
print(255 & 15)  # 15   (11111111 & 00001111 = 00001111)
print(7 & 7)     # 7
print(0 & 255)   # 0

# Visual
def show_and(a, b):
    result = a & b
    bits = max(a.bit_length(), b.bit_length(), 4)
    print(f"  {a:>{bits}b}  ({a})")
    print(f"& {b:>{bits}b}  ({b})")
    print(f"  {'─'*bits}")
    print(f"  {result:>{bits}b}  ({result})")

show_and(5, 3)
\`\`\`

### Common Uses of AND

\`\`\`python
# Check if a number is even or odd
def is_even(n):
    return (n & 1) == 0   # Last bit 0 = even

def is_odd(n):
    return (n & 1) == 1   # Last bit 1 = odd

for n in [0, 1, 4, 7, 12, 15]:
    print(f"{n}: {'even' if is_even(n) else 'odd'}")

# Extract lower N bits (masking)
value = 0b11101010   # 234
lower_4 = value & 0b00001111   # Mask lower 4 bits
lower_4_alt = value & 0xF      # Same with hex mask
print(f"Lower 4 bits of {value}: {lower_4} = {lower_4:04b}")

# Extract a specific byte from a larger number
number = 0x12345678
byte0 = (number >> 0) & 0xFF   # 0x78 = 120
byte1 = (number >> 8) & 0xFF   # 0x56 = 86
byte2 = (number >> 16) & 0xFF  # 0x34 = 52
byte3 = (number >> 24) & 0xFF  # 0x12 = 18
print(f"Bytes: {byte3}, {byte2}, {byte1}, {byte0}")
\`\`\`

## Bitwise OR (|)

Each bit in the result is 1 if **either** corresponding bit is 1.

\`\`\`
5  = 0101
3  = 0011
---------
|  = 0111 = 7
\`\`\`

\`\`\`python
print(5 | 3)     # 7    (0101 | 0011 = 0111)
print(12 | 10)   # 14   (1100 | 1010 = 1110)
print(0 | 5)     # 5
print(255 | 0)   # 255
\`\`\`

### Common Uses of OR

\`\`\`python
# Set a specific bit
def set_bit(number, position):
    """Set bit at position to 1."""
    return number | (1 << position)

value = 0b10100000   # 160
value = set_bit(value, 2)   # Set bit 2
print(f"After setting bit 2: {value:08b} = {value}")   # 10100100 = 164

# Combine flags
READ    = 0b001   # 1
WRITE   = 0b010   # 2
EXECUTE = 0b100   # 4

# User has read and write permission
user_perms = READ | WRITE
print(f"Permissions: {user_perms:03b} = {user_perms}")  # 011 = 3

# Add execute permission
user_perms = user_perms | EXECUTE
print(f"With execute: {user_perms:03b} = {user_perms}") # 111 = 7
\`\`\`

## Bitwise XOR (^)

Each bit is 1 if the bits are **different**, 0 if they are the **same**.

\`\`\`
5  = 0101
3  = 0011
---------
^  = 0110 = 6
\`\`\`

\`\`\`python
print(5 ^ 3)     # 6    (0101 ^ 0011 = 0110)
print(12 ^ 10)   # 6    (1100 ^ 1010 = 0110)
print(7 ^ 0)     # 7    (anything XOR 0 = itself)
print(7 ^ 7)     # 0    (anything XOR itself = 0)
\`\`\`

### XOR Properties and Uses

\`\`\`python
# XOR is its own inverse: a ^ b ^ b = a
a = 42
b = 17
encoded = a ^ b
print(a ^ b ^ b)   # 42  (original value restored!)

# Swap two numbers WITHOUT a temp variable
x = 5
y = 10
x = x ^ y
y = x ^ y
x = x ^ y
print(x, y)   # 10 5  (swapped!)

# Toggle a specific bit
def toggle_bit(number, position):
    return number ^ (1 << position)

value = 0b10101010   # 170
value = toggle_bit(value, 0)   # Toggle bit 0
print(f"{value:08b}")           # 10101011 = 171

value = toggle_bit(value, 0)   # Toggle again
print(f"{value:08b}")           # 10101010 = 170  (restored)

# Simple XOR encryption/decryption
def xor_cipher(text, key):
    return "".join(chr(ord(c) ^ key) for c in text)

key = 42
plaintext = "Hello!"
encrypted = xor_cipher(plaintext, key)
decrypted = xor_cipher(encrypted, key)  # XOR twice restores original

print(f"Plaintext : {plaintext}")
print(f"Encrypted : {encrypted!r}")
print(f"Decrypted : {decrypted}")
\`\`\`

## Bitwise NOT (~)

Flips all bits. For integer n, the result is \`-(n + 1)\`.

\`\`\`python
print(~0)     # -1
print(~1)     # -2
print(~5)     # -6   (-(5+1))
print(~-1)    # 0    (-(-1+1))
print(~100)   # -101
print(~-5)    # 4    (-(-5+1))

# Why? Two's complement: ~n = -(n+1)
# In binary (two's complement):
# 5    =  0000...0101
# ~5   =  1111...1010  = -6 in two's complement
\`\`\`

### Use of NOT: Clear a Bit

\`\`\`python
def clear_bit(number, position):
    """Set bit at position to 0."""
    return number & ~(1 << position)

value = 0b11111111   # 255
value = clear_bit(value, 3)   # Clear bit 3
print(f"{value:08b} = {value}")  # 11110111 = 247

value = clear_bit(value, 7)   # Clear bit 7
print(f"{value:08b} = {value}")  # 01110111 = 119
\`\`\`

## Left Shift (<<)

Shifts bits to the left, filling with zeros on the right. Equivalent to multiplying by 2 for each shift.

\`\`\`
5  = 00000101
5 << 1 = 00001010 = 10   (multiplied by 2)
5 << 2 = 00010100 = 20   (multiplied by 4)
5 << 3 = 00101000 = 40   (multiplied by 8)
\`\`\`

\`\`\`python
print(5 << 1)    # 10    (5 * 2)
print(5 << 2)    # 20    (5 * 4)
print(5 << 3)    # 40    (5 * 8)
print(1 << 0)    # 1
print(1 << 1)    # 2
print(1 << 2)    # 4
print(1 << 4)    # 16
print(1 << 8)    # 256
print(1 << 10)   # 1024

# Powers of 2 using shift
for i in range(10):
    print(f"2^{i} = {1 << i}")

# Fast multiplication by power of 2
n = 100
print(n << 1)    # 200  (n * 2)
print(n << 3)    # 800  (n * 8)

# Creating bit masks
mask_bit3 = 1 << 3   # 0b1000 = 8 (bit 3 set)
mask_3bits = (1 << 3) - 1   # 0b0111 = 7 (lower 3 bits)
\`\`\`

## Right Shift (>>)

Shifts bits to the right, discarding bits on the right. Equivalent to dividing by 2 for each shift (integer division).

\`\`\`
20 = 00010100
20 >> 1 = 00001010 = 10  (divided by 2)
20 >> 2 = 00000101 = 5   (divided by 4)
\`\`\`

\`\`\`python
print(20 >> 1)   # 10    (20 / 2)
print(20 >> 2)   # 5     (20 / 4)
print(20 >> 3)   # 2     (20 / 8, truncated)
print(16 >> 4)   # 1     (16 / 16)

# Fast division by power of 2
n = 1000
print(n >> 1)    # 500   (n / 2)
print(n >> 2)    # 250   (n / 4)
print(n >> 3)    # 125   (n / 8)

# Extract specific bits
number = 0b11001010   # 202
bit5 = (number >> 5) & 1   # Extract bit 5
print(f"Bit 5 of {number:08b}: {bit5}")   # 1
\`\`\`

## Compound Bitwise Assignment Operators

\`\`\`python
n = 60   # 0b111100

n &= 15   # n = n & 15
print(n)  # 12   (0b001100)

n = 60
n |= 3    # n = n | 3
print(n)  # 63   (0b111111)

n = 60
n ^= 15   # n = n ^ 15
print(n)  # 51   (0b110011)

n = 5
n <<= 2   # n = n << 2
print(n)  # 20

n = 20
n >>= 2   # n = n >> 2
print(n)  # 5
\`\`\`

## Practical Example: Permission System

\`\`\`python
# Permission flags as bit positions
class Permissions:
    NONE    = 0b000000   # 0
    READ    = 0b000001   # 1
    WRITE   = 0b000010   # 2
    DELETE  = 0b000100   # 4
    SHARE   = 0b001000   # 8
    ADMIN   = 0b010000   # 16
    SUPERUSER = 0b100000 # 32

    ALL = READ | WRITE | DELETE | SHARE | ADMIN | SUPERUSER

def has_permission(user_perms, permission):
    return bool(user_perms & permission)

def grant(user_perms, permission):
    return user_perms | permission

def revoke(user_perms, permission):
    return user_perms & ~permission

def toggle(user_perms, permission):
    return user_perms ^ permission

def describe_permissions(perms):
    p = Permissions
    descriptions = []
    for name, flag in [("Read", p.READ), ("Write", p.WRITE),
                        ("Delete", p.DELETE), ("Share", p.SHARE),
                        ("Admin", p.ADMIN), ("Superuser", p.SUPERUSER)]:
        if has_permission(perms, flag):
            descriptions.append(name)
    return ", ".join(descriptions) if descriptions else "None"

P = Permissions

# New user - read only
user = P.READ
print(f"Initial: {describe_permissions(user)}")

# Grant write
user = grant(user, P.WRITE)
print(f"After grant write: {describe_permissions(user)}")

# Grant admin
user = grant(user, P.ADMIN)
print(f"After grant admin: {describe_permissions(user)}")

# Revoke write
user = revoke(user, P.WRITE)
print(f"After revoke write: {describe_permissions(user)}")

# Check specific permission
print(f"Has Admin? {has_permission(user, P.ADMIN)}")
print(f"Has Delete? {has_permission(user, P.DELETE)}")
\`\`\`

Output:
\`\`\`
Initial: Read
After grant write: Read, Write
After grant admin: Read, Write, Admin
After revoke write: Read, Admin
Has Admin? True
Has Delete? False
\`\`\`

## Practical Example: Count Set Bits

\`\`\`python
def count_bits(n):
    """Count the number of 1 bits (Hamming weight)."""
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# Faster with built-in (Python 3.10+)
# n.bit_count()

for n in [0, 1, 7, 255, 1023]:
    print(f"{n:>5} = {n:08b} -> {count_bits(n)} bits set")

# Find the only non-duplicated number using XOR
def find_unique(numbers):
    """Find the number that appears once (others appear twice)."""
    result = 0
    for n in numbers:
        result ^= n  # Duplicate numbers cancel out (a^a=0)
    return result

data = [4, 1, 2, 1, 2, 3, 4]
unique = find_unique(data)
print(f"Unique number: {unique}")   # Output: 3
\`\`\`

> [!TIP]
> Use \`&\` for masking (extracting bits), \`|\` for setting bits, \`^\` for toggling bits, and \`~\` for clearing bits (combined with \`&\`). Left shift (\`<<\`) for multiplication by powers of 2, right shift (\`>>\`) for division by powers of 2. These operations are extremely fast - they execute in a single CPU instruction.`,
  objectives: [
    "Apply bitwise AND, OR, XOR, NOT to manipulate individual bits.",
    "Use left shift and right shift for fast multiplication and division.",
    "Check, set, clear, and toggle specific bits in an integer.",
    "Implement a permission system using bit flags.",
    "Use XOR for simple encryption and finding unique values."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};