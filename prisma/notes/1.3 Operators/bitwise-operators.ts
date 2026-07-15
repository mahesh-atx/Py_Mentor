export const bitwiseOperatorsLesson = {
  title: "Bitwise Operators",
  slug: "bitwise-operators",
  content: `# Bitwise Operators

Bitwise operators work on numbers at the **binary level** - meaning they operate on the individual bits (0s and 1s) that make up a number in memory.

## The Theory — Building the Logic

Bitwise operators work on the raw binary representation of integers, treating each number as a row of on/off switches (bits) rather than as a single quantity. Each operator applies a simple per-bit rule — \`&\` keeps a bit on only when both are on, \`|\` when either is on, \`^\` when they differ — which is exactly how digital logic gates behave in hardware. Shifting bits left or right (\`<<\`, \`>>\`) is just a fast way to multiply or divide by powers of two, because moving a bit one place multiplies its place-value by 2. The common pitfall is expecting bitwise \`&\` or \`|\` to return True/False like logical operators; they return an integer built from the resulting bits, so \`5 & 3\` is \`1\`, not \`True\`.

## Understanding Binary Numbers

Before understanding bitwise operators, you need to understand how numbers look in binary:

\`\`\`
Decimal    Binary
-------    ------
0          0000
1          0001
2          0010
3          0011
4          0100
5          0101
6          0110
7          0111
8          1000
\`\`\`

In Python, you can see the binary of any number:
\`\`\`python
print(bin(5))    # Output: 0b101  (0b means binary)
print(bin(10))   # Output: 0b1010
print(bin(255))  # Output: 0b11111111

# Remove the 0b prefix
print(format(5, 'b'))    # Output: 101
print(format(10, 'b'))   # Output: 1010
\`\`\`

## The Bitwise Operators

\`\`\`
Operator    Name                 Example
--------    ----------------     ---------
&           Bitwise AND          5 & 3
|           Bitwise OR           5 | 3
^           Bitwise XOR          5 ^ 3
~           Bitwise NOT          ~5
<<          Left Shift           5 << 1
>>          Right Shift          5 >> 1
\`\`\`

## Bitwise AND (&)

Compares each bit. Result bit is \`1\` only if **both** bits are \`1\`.

\`\`\`
5  = 0101
3  = 0011
-----------
&  = 0001  = 1
\`\`\`

\`\`\`python
result = 5 & 3
print(result)      # Output: 1

print(bin(5))      # Output: 0b101
print(bin(3))      # Output: 0b011
print(bin(5 & 3))  # Output: 0b001 = 1
\`\`\`

More examples:
\`\`\`python
print(12 & 10)     # Output: 8
# 12 = 1100
# 10 = 1010
# &  = 1000 = 8

print(255 & 15)    # Output: 15
# 255 = 11111111
#  15 = 00001111
#   & = 00001111 = 15
\`\`\`

Common use - checking if a number is even or odd:
\`\`\`python
number = 7
if number & 1:
    print("Odd")
else:
    print("Even")
# Output: Odd
# (odd numbers have 1 as their last bit)
\`\`\`

## Bitwise OR (|)

Compares each bit. Result bit is \`1\` if **at least one** bit is \`1\`.

\`\`\`
5  = 0101
3  = 0011
-----------
|  = 0111  = 7
\`\`\`

\`\`\`python
result = 5 | 3
print(result)      # Output: 7

print(bin(5 | 3))  # Output: 0b111 = 7
\`\`\`

More examples:
\`\`\`python
print(12 | 10)     # Output: 14
# 12 = 1100
# 10 = 1010
# |  = 1110 = 14

print(0 | 5)       # Output: 5
# 0 = 0000
# 5 = 0101
# | = 0101 = 5
\`\`\`

## Bitwise XOR (^)

Compares each bit. Result bit is \`1\` if the bits are **different**.

\`\`\`
5  = 0101
3  = 0011
-----------
^  = 0110  = 6
\`\`\`

\`\`\`python
result = 5 ^ 3
print(result)      # Output: 6

print(bin(5 ^ 3))  # Output: 0b110 = 6
\`\`\`

Interesting property of XOR - applying it twice returns the original:
\`\`\`python
a = 42
b = 15

encoded = a ^ b
print(encoded)         # Output: 37  (encoded value)

decoded = encoded ^ b
print(decoded)         # Output: 42  (original value restored!)
\`\`\`

## Bitwise NOT (~)

Flips all the bits. The result is \`-(n + 1)\` for any integer \`n\`.

\`\`\`python
print(~5)    # Output: -6   (-(5+1))
print(~0)    # Output: -1   (-(0+1))
print(~-1)   # Output: 0    (-(-1+1))
print(~10)   # Output: -11
\`\`\`

## Left Shift (<<)

Shifts all bits to the **left** by a specified number of positions. Each left shift doubles the number.

\`\`\`
5 = 0101
5 << 1 = 1010 = 10  (shifted left by 1)
5 << 2 = 10100 = 20 (shifted left by 2)
\`\`\`

\`\`\`python
print(5 << 1)    # Output: 10   (5 * 2^1 = 5 * 2)
print(5 << 2)    # Output: 20   (5 * 2^2 = 5 * 4)
print(5 << 3)    # Output: 40   (5 * 2^3 = 5 * 8)
print(1 << 4)    # Output: 16   (1 * 2^4 = 16)

# Quick powers of 2
print(1 << 0)    # Output: 1
print(1 << 1)    # Output: 2
print(1 << 2)    # Output: 4
print(1 << 3)    # Output: 8
print(1 << 4)    # Output: 16
print(1 << 8)    # Output: 256
\`\`\`

## Right Shift (>>)

Shifts all bits to the **right** by a specified number of positions. Each right shift halves the number (integer division by 2).

\`\`\`
20 = 10100
20 >> 1 = 01010 = 10  (shifted right by 1)
20 >> 2 = 00101 = 5   (shifted right by 2)
\`\`\`

\`\`\`python
print(20 >> 1)   # Output: 10   (20 / 2^1 = 10)
print(20 >> 2)   # Output: 5    (20 / 2^2 = 5)
print(20 >> 3)   # Output: 2    (20 / 2^3 = 2.5 -> 2)
print(16 >> 4)   # Output: 1
\`\`\`

## Practical Use Cases

### Checking Permissions (Flags)

A very common real-world use of bitwise operators is managing permissions:

\`\`\`python
# Define permissions using powers of 2
READ    = 0b001   # 1
WRITE   = 0b010   # 2
EXECUTE = 0b100   # 4

# Give a user READ and WRITE permissions
user_permissions = READ | WRITE
print(bin(user_permissions))   # Output: 0b11 = 3

# Check if user has READ permission
has_read = bool(user_permissions & READ)
print(f"Can read: {has_read}")      # Output: Can read: True

# Check if user has EXECUTE permission
has_execute = bool(user_permissions & EXECUTE)
print(f"Can execute: {has_execute}") # Output: Can execute: False

# Add EXECUTE permission
user_permissions |= EXECUTE
print(f"After adding execute: {bin(user_permissions)}")  # Output: 0b111

# Remove WRITE permission (using AND with NOT)
user_permissions &= ~WRITE
print(f"After removing write: {bin(user_permissions)}")  # Output: 0b101
\`\`\`

### Fast Multiplication and Division by Powers of 2

\`\`\`python
number = 8

# Multiply by 2 using left shift (faster than *)
print(number << 1)   # Output: 16  (8 * 2)
print(number << 2)   # Output: 32  (8 * 4)
print(number << 3)   # Output: 64  (8 * 8)

# Divide by 2 using right shift (faster than //)
print(number >> 1)   # Output: 4   (8 / 2)
print(number >> 2)   # Output: 2   (8 / 4)
\`\`\`

> [!NOTE]
> As a beginner, you will not use bitwise operators often in everyday programming. They are more commonly used in systems programming, cryptography, game development, and working with hardware. However, understanding them gives you a deeper understanding of how computers work.`,
  objectives: [
    "Understand what binary numbers are and how to read them.",
    "Use bitwise AND, OR, XOR, NOT, left shift, and right shift operators.",
    "Understand how each operator works at the bit level.",
    "Apply bitwise operators in practical scenarios like permission flags."
  ],
  difficulty: "beginner",
  xpReward: 65,
};