export const numericFunctionsMathLesson = {
  title: "Numeric Functions - math Module",
  slug: "numeric-functions-math",
  content: `# Numeric Functions - math Module

The \`math\` module provides mathematical functions and constants. You must import it before using it.

\`\`\`python
import math
\`\`\`

## Mathematical Constants

### math.pi and math.e

\`\`\`python
import math

print(math.pi)    # Output: 3.141592653589793
print(math.e)     # Output: 2.718281828459045
print(math.tau)   # Output: 6.283185307179586  (2 * pi)
print(math.inf)   # Output: inf
print(math.nan)   # Output: nan

# Using pi for geometry
radius = 5
area = math.pi * radius ** 2
circumference = 2 * math.pi * radius
print(f"Area: {area:.4f}")             # Output: Area: 78.5398
print(f"Circumference: {circumference:.4f}")  # Output: Circumference: 31.4159

# Using e for exponential growth
principal = 1000
rate = 0.05
time = 10
# Continuous compound interest: A = P * e^(rt)
amount = principal * math.e ** (rate * time)
print(f"Amount after {time} years: \${amount:.2f}")
# Output: Amount after 10 years: $1648.72
\`\`\`

## Square Root and Powers

### math.sqrt() - Square Root

\`\`\`python
import math

print(math.sqrt(16))    # Output: 4.0
print(math.sqrt(2))     # Output: 1.4142135623730951
print(math.sqrt(0))     # Output: 0.0
print(math.sqrt(100))   # Output: 10.0

# math.sqrt() vs ** 0.5
# math.sqrt is faster and more accurate for real numbers
print(math.sqrt(9))     # Output: 3.0
print(9 ** 0.5)         # Output: 3.0

# Cannot use on negative numbers
try:
    math.sqrt(-1)
except ValueError as e:
    print(f"Error: {e}")   # Error: math domain error

# For complex numbers, use cmath
import cmath
print(cmath.sqrt(-1))   # Output: 1j
\`\`\`

\`\`\`python
# Practical: distance between two points
def distance(x1, y1, x2, y2):
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

print(distance(0, 0, 3, 4))    # Output: 5.0
print(distance(1, 1, 4, 5))    # Output: 5.0
\`\`\`

### math.pow() - Power

\`\`\`python
import math

print(math.pow(2, 10))   # Output: 1024.0  (always returns float)
print(math.pow(3, 3))    # Output: 27.0
print(math.pow(9, 0.5))  # Output: 3.0    (square root)
print(math.pow(2, -1))   # Output: 0.5

# Difference from ** operator
print(2 ** 10)            # Output: 1024   (returns int for int inputs)
print(math.pow(2, 10))    # Output: 1024.0 (always float)
\`\`\`

### math.exp() - e to the Power

\`\`\`python
import math

print(math.exp(0))    # Output: 1.0   (e^0 = 1)
print(math.exp(1))    # Output: 2.718281828459045  (e^1 = e)
print(math.exp(2))    # Output: 7.38905609893065
print(math.exp(-1))   # Output: 0.36787944117144233
\`\`\`

## Ceiling and Floor

### math.ceil() - Round Up

\`\`\`python
import math

print(math.ceil(3.1))    # Output: 4
print(math.ceil(3.9))    # Output: 4
print(math.ceil(4.0))    # Output: 4
print(math.ceil(-3.1))   # Output: -3  (towards zero)
print(math.ceil(-3.9))   # Output: -3
\`\`\`

### math.floor() - Round Down

\`\`\`python
import math

print(math.floor(3.1))   # Output: 3
print(math.floor(3.9))   # Output: 3
print(math.floor(4.0))   # Output: 4
print(math.floor(-3.1))  # Output: -4  (away from zero)
print(math.floor(-3.9))  # Output: -4
\`\`\`

### math.trunc() - Truncate (Remove Decimal)

\`\`\`python
import math

print(math.trunc(3.9))    # Output: 3   (towards zero)
print(math.trunc(-3.9))   # Output: -3  (towards zero, unlike floor)
print(math.trunc(3.1))    # Output: 3
\`\`\`

### Comparison: floor, ceil, trunc, round

\`\`\`python
import math

values = [3.1, 3.5, 3.9, -3.1, -3.5, -3.9]

print(f"{'Value':>8} {'floor':>8} {'ceil':>8} {'trunc':>8} {'round':>8}")
print("-" * 45)
for v in values:
    print(f"{v:>8.1f} {math.floor(v):>8} {math.ceil(v):>8} {math.trunc(v):>8} {round(v):>8}")
\`\`\`

Output:
\`\`\`
   Value    floor     ceil    trunc    round
---------------------------------------------
     3.1        3        4        3        3
     3.5        3        4        3        4
     3.9        3        4        3        4
    -3.1       -4       -3       -3       -3
    -3.5       -4       -3       -3       -4
    -3.9       -4       -3       -3       -4
\`\`\`

## Logarithms

### math.log() - Natural Logarithm

\`\`\`python
import math

print(math.log(math.e))    # Output: 1.0      (ln(e) = 1)
print(math.log(1))         # Output: 0.0      (ln(1) = 0)
print(math.log(10))        # Output: 2.302...

# log with base
print(math.log(100, 10))   # Output: 2.0      (log base 10 of 100)
print(math.log(8, 2))      # Output: 3.0      (log base 2 of 8)
\`\`\`

### math.log10() and math.log2()

\`\`\`python
import math

print(math.log10(100))     # Output: 2.0
print(math.log10(1000))    # Output: 3.0
print(math.log10(1))       # Output: 0.0

print(math.log2(8))        # Output: 3.0
print(math.log2(1024))     # Output: 10.0
print(math.log2(1))        # Output: 0.0
\`\`\`

## Factorial and GCD

### math.factorial() - Factorial

\`\`\`python
import math

print(math.factorial(0))   # Output: 1     (0! = 1 by definition)
print(math.factorial(1))   # Output: 1
print(math.factorial(5))   # Output: 120   (5! = 5*4*3*2*1)
print(math.factorial(10))  # Output: 3628800
print(math.factorial(20))  # Output: 2432902008176640000

# Practical: combinations (n choose k)
def combinations(n, k):
    return math.factorial(n) // (math.factorial(k) * math.factorial(n - k))

print(combinations(10, 3))  # Output: 120  (C(10,3) = 120 ways)
print(combinations(52, 5))  # Output: 2598960  (poker hands)

# math.comb() is available in Python 3.8+
print(math.comb(10, 3))    # Output: 120
print(math.perm(10, 3))    # Output: 720  (permutations)
\`\`\`

### math.gcd() - Greatest Common Divisor

\`\`\`python
import math

print(math.gcd(12, 8))     # Output: 4
print(math.gcd(100, 75))   # Output: 25
print(math.gcd(7, 13))     # Output: 1   (coprime numbers)
print(math.gcd(0, 5))      # Output: 5
print(math.gcd(0, 0))      # Output: 0

# Python 3.9+: gcd of multiple numbers
print(math.gcd(12, 8, 4))  # Output: 4

# Practical: simplify a fraction
def simplify_fraction(numerator, denominator):
    g = math.gcd(abs(numerator), abs(denominator))
    return numerator // g, denominator // g

n, d = simplify_fraction(12, 8)
print(f"12/8 simplified = {n}/{d}")   # Output: 12/8 simplified = 3/2

n, d = simplify_fraction(100, 75)
print(f"100/75 simplified = {n}/{d}") # Output: 100/75 simplified = 4/3
\`\`\`

### math.lcm() - Least Common Multiple (Python 3.9+)

\`\`\`python
import math

print(math.lcm(4, 6))      # Output: 12
print(math.lcm(3, 5))      # Output: 15
print(math.lcm(12, 8))     # Output: 24

# For older Python versions
def lcm(a, b):
    return abs(a * b) // math.gcd(a, b)
\`\`\`

## Trigonometric Functions

\`\`\`python
import math

# All trig functions work in RADIANS
angle_deg = 90
angle_rad = math.radians(angle_deg)   # Convert degrees to radians

print(math.sin(angle_rad))    # Output: 1.0
print(math.cos(angle_rad))    # Output: ~0.0 (very small floating point error)
print(math.tan(math.radians(45)))  # Output: ~1.0

# Convert radians to degrees
print(math.degrees(math.pi))      # Output: 180.0
print(math.degrees(math.pi / 2))  # Output: 90.0

# Inverse trig functions
print(math.asin(1))   # Output: 1.5707... (pi/2 = 90 degrees)
print(math.degrees(math.asin(1)))   # Output: 90.0
\`\`\`

## Other Useful math Functions

\`\`\`python
import math

# Absolute value (also built-in abs())
print(math.fabs(-3.14))    # Output: 3.14  (always returns float)

# Sum of floats (more accurate than sum())
print(math.fsum([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]))
# Output: 1.0  (more accurate than sum([0.1]*10) = 0.9999999999999999)

# Hypotenuse: sqrt(x^2 + y^2)
print(math.hypot(3, 4))    # Output: 5.0
print(math.hypot(5, 12))   # Output: 13.0

# isclose - floating point comparison
print(math.isclose(0.1 + 0.2, 0.3))              # Output: True
print(0.1 + 0.2 == 0.3)                          # Output: False (floating point!)
print(math.isclose(1.0, 1.0000001, rel_tol=1e-5)) # Output: True

# Copysign - magnitude of first, sign of second
print(math.copysign(3, -1))   # Output: -3.0
print(math.copysign(-3, 1))   # Output: 3.0
\`\`\`

## Practical Example: Geometry Calculator

\`\`\`python
import math

def circle_properties(radius):
    if radius < 0:
        raise ValueError("Radius cannot be negative")
    return {
        "area": round(math.pi * radius ** 2, 4),
        "circumference": round(2 * math.pi * radius, 4),
        "diameter": radius * 2
    }

def triangle_properties(a, b, c):
    # Check if valid triangle
    if a + b <= c or a + c <= b or b + c <= a:
        raise ValueError("Invalid triangle sides")
    # Heron's formula for area
    s = (a + b + c) / 2
    area = math.sqrt(s * (s-a) * (s-b) * (s-c))
    # Angles using law of cosines
    angle_c = math.degrees(math.acos((a**2 + b**2 - c**2) / (2*a*b)))
    return {
        "area": round(area, 4),
        "perimeter": a + b + c,
        "angle_C": round(angle_c, 2)
    }

# Circle with radius 5
r = 5
props = circle_properties(r)
print(f"Circle (r={r}):")
for k, v in props.items():
    print(f"  {k}: {v}")

# Right triangle (3, 4, 5)
a, b, c = 3, 4, 5
props = triangle_properties(a, b, c)
print(f"\\nTriangle ({a}, {b}, {c}):")
for k, v in props.items():
    print(f"  {k}: {v}")
\`\`\`

Output:
\`\`\`
Circle (r=5):
  area: 78.5398
  circumference: 31.4159
  diameter: 10

Triangle (3, 4, 5):
  area: 6.0
  perimeter: 12
  angle_C: 90.0
\`\`\`

## Quick Reference

\`\`\`python
import math

# Constants
math.pi       # 3.14159...
math.e        # 2.71828...
math.inf      # Infinity
math.nan      # Not a Number

# Rounding
math.floor(x)  # Round down
math.ceil(x)   # Round up
math.trunc(x)  # Truncate (towards zero)

# Powers and roots
math.sqrt(x)   # Square root
math.pow(x, y) # x to the power y (returns float)
math.exp(x)    # e^x

# Logarithms
math.log(x)        # Natural log (base e)
math.log(x, base)  # Log with base
math.log10(x)      # Log base 10
math.log2(x)       # Log base 2

# Number theory
math.factorial(n)  # n!
math.gcd(a, b)     # Greatest common divisor
math.lcm(a, b)     # Least common multiple (3.9+)
math.comb(n, k)    # Combinations (3.8+)
math.perm(n, k)    # Permutations (3.8+)

# Trig (in radians)
math.sin(x), math.cos(x), math.tan(x)
math.radians(degrees)   # Convert to radians
math.degrees(radians)   # Convert to degrees

# Utility
math.fabs(x)      # Absolute value (float)
math.hypot(x, y)  # sqrt(x^2 + y^2)
math.isclose(a, b)# Floating point comparison
math.isfinite(x)  # Check if finite
math.isinf(x)     # Check if infinite
math.isnan(x)     # Check if NaN
\`\`\`

> [!TIP]
> Always use \`math.isclose()\` instead of \`==\` when comparing floating-point numbers. Use \`math.fsum()\` for summing many floats accurately. Remember that all trig functions expect radians - use \`math.radians()\` and \`math.degrees()\` to convert.`,
  objectives: [
    "Use math.pi, math.e, and other mathematical constants.",
    "Use math.sqrt(), math.pow(), and math.exp() for power operations.",
    "Use math.ceil(), math.floor(), and math.trunc() for rounding.",
    "Use math.factorial() and math.gcd() for number theory.",
    "Use trigonometric functions and handle degree/radian conversion."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};