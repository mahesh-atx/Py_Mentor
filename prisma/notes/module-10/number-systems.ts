export const numberSystemsLesson = {
  title: "Number Systems (Binary, Octal, Hex)",
  slug: "number-systems",
  content: `# Number Systems

Computers store everything as binary (base 2). Understanding number systems helps you work with low-level programming, file permissions, colors, and memory.

## The Four Common Number Systems

\`\`\`
System       Base    Digits Used            Example
----------   ----    -------------------    --------
Binary       2       0, 1                   0b1010
Octal        8       0, 1, 2, 3, 4, 5, 6, 7  0o17
Decimal      10      0-9                    42
Hexadecimal  16      0-9, A-F               0xFF
\`\`\`

## Binary (Base 2)

Binary is the native language of computers - everything is 0s and 1s.

### Converting to Binary

\`\`\`python
# Decimal to binary
print(bin(0))      # 0b0
print(bin(1))      # 0b1
print(bin(5))      # 0b101
print(bin(10))     # 0b1010
print(bin(42))     # 0b101010
print(bin(255))    # 0b11111111
print(bin(-5))     # -0b101

# Remove 0b prefix
print(bin(10)[2:])          # 1010
print(format(10, 'b'))      # 1010
print(format(10, '08b'))    # 00001010  (zero-padded to 8 bits)
print(f"{255:08b}")          # 11111111

# How binary works (positional notation)
# 1010 = 1*2³ + 0*2² + 1*2¹ + 0*2⁰
#      = 8  +  0  +  2  +  0
#      = 10
\`\`\`

### Writing Binary Literals

\`\`\`python
# Binary literals in Python code
a = 0b1010      # decimal 10
b = 0b11111111  # decimal 255
c = 0b00001111  # decimal 15

print(a, b, c)   # 10 255 15

# Python 3.6+: underscores for readability
byte = 0b1111_0000    # decimal 240
print(byte)           # 240
\`\`\`

### Converting FROM Binary

\`\`\`python
# Binary string to decimal integer
print(int("1010", 2))      # 10
print(int("11111111", 2))  # 255
print(int("0b1010", 2))    # 10  (with prefix)
print(int("101010", 2))    # 42

# Binary literal to decimal (automatic)
print(0b101010)   # 42
\`\`\`

### Practical Binary: Working with Bytes

\`\`\`python
# A byte is 8 bits - values 0 to 255
def to_binary_string(n, bits=8):
    """Convert integer to fixed-width binary string."""
    return format(n, f'0{bits}b')

# Show common values as 8-bit binary
values = [0, 1, 127, 128, 255]
for v in values:
    print(f"{v:>3} = {to_binary_string(v)}")

# Check specific bits
def is_bit_set(number, bit_position):
    """Check if bit at position (0=LSB) is set."""
    return bool(number & (1 << bit_position))

num = 0b10110110   # 182
for i in range(8):
    print(f"Bit {i}: {'1' if is_bit_set(num, i) else '0'}", end="  ")
\`\`\`

Output:
\`\`\`
  0 = 00000000
  1 = 00000001
127 = 01111111
128 = 10000000
255 = 11111111
Bit 0: 0  Bit 1: 1  Bit 2: 1  Bit 3: 0  Bit 4: 1  Bit 5: 1  Bit 6: 0  Bit 7: 1
\`\`\`

## Octal (Base 8)

Octal was historically used for Unix file permissions.

### Converting to Octal

\`\`\`python
print(oct(0))     # 0o0
print(oct(7))     # 0o7
print(oct(8))     # 0o10   (1*8 + 0 = 8)
print(oct(64))    # 0o100  (1*64 = 64)
print(oct(255))   # 0o377
print(oct(511))   # 0o777

print(format(64, 'o'))    # 100  (no prefix)
print(f"{255:o}")          # 377
\`\`\`

### Writing Octal Literals

\`\`\`python
a = 0o7    # decimal 7
b = 0o10   # decimal 8
c = 0o100  # decimal 64
d = 0o777  # decimal 511

print(a, b, c, d)  # 7 8 64 511
\`\`\`

### From Octal to Decimal

\`\`\`python
print(int("17", 8))    # 15   (1*8 + 7 = 15)
print(int("100", 8))   # 64   (1*64 = 64)
print(int("777", 8))   # 511
print(0o777)           # 511  (literal)
\`\`\`

### Unix File Permissions

\`\`\`python
# Unix permissions use octal
# r=4, w=2, x=1
# rwxr-xr-x = 111 101 101 = 755 octal

def explain_permissions(octal_perm):
    """Explain Unix file permissions from octal."""
    perm_map = {0: "---", 1: "--x", 2: "-w-", 3: "-wx",
                4: "r--", 5: "r-x", 6: "rw-", 7: "rwx"}
    digits = [int(d) for d in oct(octal_perm)[2:].zfill(3)]
    owner  = perm_map[digits[0]]
    group  = perm_map[digits[1]]
    others = perm_map[digits[2]]
    print(f"{octal_perm:>4o} -> {owner} {group} {others}")

for perm in [0o755, 0o644, 0o600, 0o777, 0o400]:
    explain_permissions(perm)
\`\`\`

Output:
\`\`\`
 755 -> rwx r-x r-x
 644 -> rw- r-- r--
 600 -> rw- --- ---
 777 -> rwx rwx rwx
 400 -> r-- --- ---
\`\`\`

## Hexadecimal (Base 16)

Hex is the most commonly used non-decimal system in programming - colors, memory addresses, encoding.

### Converting to Hexadecimal

\`\`\`python
print(hex(0))      # 0x0
print(hex(10))     # 0xa
print(hex(15))     # 0xf
print(hex(16))     # 0x10
print(hex(255))    # 0xff
print(hex(256))    # 0x100
print(hex(65535))  # 0xffff
print(hex(-255))   # -0xff

print(format(255, 'x'))    # ff   (lowercase, no prefix)
print(format(255, 'X'))    # FF   (uppercase, no prefix)
print(format(255, '#x'))   # 0xff (lowercase with prefix)
print(format(255, '#X'))   # 0XFF (uppercase with prefix)
print(f"{255:02x}")         # ff   (zero-padded)
print(f"{15:02X}")          # 0F   (zero-padded uppercase)
\`\`\`

### Writing Hex Literals

\`\`\`python
a = 0x0         # 0
b = 0xFF        # 255
c = 0x10        # 16
d = 0xDEAD     # 57005
e = 0x1_234_567  # 19088743 (underscores for readability)

print(a, b, c, d)   # 0 255 16 57005
\`\`\`

### From Hexadecimal to Decimal

\`\`\`python
print(int("ff", 16))    # 255
print(int("FF", 16))    # 255  (case insensitive)
print(int("0xFF", 16))  # 255  (with prefix)
print(int("10", 16))    # 16
print(0xFF)             # 255  (literal)
\`\`\`

### Practical Hex: RGB Colors

\`\`\`python
def rgb_to_hex(r, g, b):
    """Convert RGB values to hex color code."""
    if not all(0 <= v <= 255 for v in [r, g, b]):
        raise ValueError("Values must be 0-255")
    return f"#{r:02X}{g:02X}{b:02X}"

def hex_to_rgb(hex_color):
    """Convert hex color code to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return r, g, b

# Common colors
colors = {
    "Red":    (255, 0, 0),
    "Green":  (0, 255, 0),
    "Blue":   (0, 0, 255),
    "White":  (255, 255, 255),
    "Black":  (0, 0, 0),
    "Python": (52, 101, 164),
}

for name, (r, g, b) in colors.items():
    hex_code = rgb_to_hex(r, g, b)
    back_rgb = hex_to_rgb(hex_code)
    print(f"{name:<10}: RGB({r:>3},{g:>3},{b:>3}) = {hex_code}")

# Parse hex colors
hex_colors = ["#FF5733", "#2ECC71", "#3498DB"]
for hc in hex_colors:
    r, g, b = hex_to_rgb(hc)
    print(f"{hc} -> RGB({r}, {g}, {b})")
\`\`\`

Output:
\`\`\`
Red       : RGB(255,  0,  0) = #FF0000
Green     : RGB(  0,255,  0) = #00FF00
Blue      : RGB(  0,  0,255) = #0000FF
White     : RGB(255,255,255) = #FFFFFF
Black     : RGB(  0,  0,  0) = #000000
Python    : RGB( 52,101,164) = #3465A4

#FF5733 -> RGB(255, 87, 51)
#2ECC71 -> RGB(46, 204, 113)
#3498DB -> RGB(52, 152, 219)
\`\`\`

## Converting Between Any Bases

\`\`\`python
def to_base(number, base):
    """Convert decimal to any base (2-36)."""
    if number == 0:
        return "0"
    digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    result = ""
    negative = number < 0
    number = abs(number)
    while number:
        number, remainder = divmod(number, base)
        result = digits[remainder] + result
    return ("-" if negative else "") + result

print(to_base(42, 2))    # 101010  (binary)
print(to_base(42, 8))    # 52      (octal)
print(to_base(42, 16))   # 2A      (hexadecimal)
print(to_base(42, 36))   # 16      (base 36)

# Cross-system table
print(f"{'Dec':>5} {'Bin':>10} {'Oct':>6} {'Hex':>6}")
print("-" * 30)
for n in [0, 1, 7, 8, 10, 15, 16, 255, 256]:
    print(f"{n:>5} {bin(n):>10} {oct(n):>6} {hex(n):>6}")
\`\`\`

Output:
\`\`\`
  Dec        Bin    Oct    Hex
------------------------------
    0        0b0     0o0    0x0
    1        0b1     0o1    0x1
    7      0b111     0o7    0x7
    8     0b1000    0o10    0x8
   10     0b1010    0o12    0xa
   15     0b1111    0o17    0xf
   16    0b10000    0o20   0x10
  255  0b11111111  0o377   0xff
  256 0b100000000  0o400  0x100
\`\`\`

> [!TIP]
> Use \`0b\` for binary, \`0o\` for octal, \`0x\` for hexadecimal literals. Use \`bin()\`, \`oct()\`, \`hex()\` to convert integers to these representations as strings. Use \`int(string, base)\` to convert from any base back to decimal. Use \`format(n, '08b')\` for fixed-width binary strings.`,
  objectives: [
    "Understand binary, octal, and hexadecimal number systems.",
    "Convert between number systems using bin(), oct(), hex(), and int().",
    "Write number literals using 0b, 0o, and 0x prefixes.",
    "Apply hexadecimal to practical problems like RGB colors.",
    "Apply octal to Unix file permissions."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};