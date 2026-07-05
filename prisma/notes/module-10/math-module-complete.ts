export const mathModuleCompleteLesson = {
  title: "math Module (Complete)",
  slug: "math-module-complete",
  content: `# math Module (Complete)

The \`math\` module provides access to mathematical functions defined by the C standard. It covers everything from basic arithmetic to trigonometry, logarithms, and more.

\`\`\`python
import math
\`\`\`

## Constants

\`\`\`python
import math

print(math.pi)      # 3.141592653589793  - ratio of circumference to diameter
print(math.e)       # 2.718281828459045  - Euler's number (base of natural log)
print(math.tau)     # 6.283185307179586  - 2 * pi
print(math.inf)     # inf                - positive infinity
print(math.nan)     # nan                - Not a Number
print(-math.inf)    # -inf               - negative infinity

# Using constants
print(math.pi * 5 ** 2)    # Area of circle r=5: 78.539...
print(math.e ** 1)         # 2.718...
print(math.tau / 2)        # Same as pi: 3.14159...
\`\`\`

## Checking Special Values

\`\`\`python
import math

print(math.isfinite(3.14))        # True   - regular number
print(math.isfinite(math.inf))    # False
print(math.isfinite(math.nan))    # False

print(math.isinf(math.inf))       # True
print(math.isinf(-math.inf))      # True
print(math.isinf(3.14))           # False

print(math.isnan(math.nan))       # True
print(math.isnan(3.14))           # False

# Floating point comparison (NEVER use == for floats)
a = 0.1 + 0.2
print(a == 0.3)                   # False  (floating point error!)
print(math.isclose(a, 0.3))       # True   (use this instead)
print(math.isclose(a, 0.3, rel_tol=1e-9))   # True  (custom tolerance)
print(math.isclose(1.0, 1.001, abs_tol=0.01)) # True
\`\`\`

## Rounding Functions

\`\`\`python
import math

# math.floor() - round DOWN to nearest integer
print(math.floor(3.7))     # 3
print(math.floor(-3.7))    # -4  (NOT -3!)
print(math.floor(3.0))     # 3

# math.ceil() - round UP to nearest integer
print(math.ceil(3.2))      # 4
print(math.ceil(-3.2))     # -3  (NOT -4!)
print(math.ceil(3.0))      # 3

# math.trunc() - truncate decimal (towards zero)
print(math.trunc(3.9))     # 3
print(math.trunc(-3.9))    # -3  (towards zero, different from floor!)

# round() built-in (banker's rounding)
print(round(3.5))          # 4
print(round(4.5))          # 4   (rounds to even!)
print(round(3.14159, 3))   # 3.142

# Practical: ceiling division (pages needed for N items)
items = 23
per_page = 5
pages = math.ceil(items / per_page)
print(f"Pages needed: {pages}")   # Pages needed: 5
\`\`\`

## Power and Root Functions

\`\`\`python
import math

# math.sqrt() - square root
print(math.sqrt(16))       # 4.0
print(math.sqrt(2))        # 1.4142135623730951
print(math.sqrt(0))        # 0.0
# math.sqrt(-1)            # ValueError: math domain error

# math.pow() - always returns float
print(math.pow(2, 10))     # 1024.0
print(math.pow(3, 3))      # 27.0
print(math.pow(9, 0.5))    # 3.0  (square root)
print(math.pow(8, 1/3))    # 2.0  (cube root)

# math.exp() - e raised to the power x
print(math.exp(0))         # 1.0    (e^0)
print(math.exp(1))         # 2.71828...  (e^1 = e)
print(math.exp(2))         # 7.38905...

# math.cbrt() - cube root (Python 3.11+)
# print(math.cbrt(27))     # 3.0
# For older Python:
print(27 ** (1/3))         # ~3.0  (may have floating point error)
print(round(27 ** (1/3)))  # 3

# math.hypot() - Euclidean norm: sqrt(x^2 + y^2 + ...)
print(math.hypot(3, 4))          # 5.0   (classic 3-4-5 triangle)
print(math.hypot(5, 12))         # 13.0
print(math.hypot(1, 1, 1))       # 1.732... (3D distance from origin)
\`\`\`

## Logarithmic Functions

\`\`\`python
import math

# math.log() - natural logarithm (base e)
print(math.log(1))            # 0.0    (ln(1) = 0)
print(math.log(math.e))       # 1.0    (ln(e) = 1)
print(math.log(math.e ** 2))  # 2.0
print(math.log(10))           # 2.302585...

# math.log(x, base) - logarithm with custom base
print(math.log(100, 10))      # 2.0    (log10(100) = 2)
print(math.log(8, 2))         # 3.0    (log2(8) = 3)
print(math.log(1000, 10))     # 3.0

# math.log10() - base 10 (more accurate than log(x, 10))
print(math.log10(100))        # 2.0
print(math.log10(1000))       # 3.0
print(math.log10(1))          # 0.0

# math.log2() - base 2 (more accurate than log(x, 2))
print(math.log2(8))           # 3.0
print(math.log2(1024))        # 10.0
print(math.log2(1))           # 0.0

# math.log1p(x) - natural log of (1 + x), more accurate for small x
print(math.log1p(0))          # 0.0
print(math.log1p(1))          # 0.693...  (same as log(2))
\`\`\`

## Trigonometric Functions

\`\`\`python
import math

# All trig functions use RADIANS
# Convert: radians = degrees * pi / 180

# Convert helpers
print(math.radians(180))      # 3.14159... (pi)
print(math.radians(90))       # 1.5707... (pi/2)
print(math.degrees(math.pi))  # 180.0
print(math.degrees(math.pi/2)) # 90.0

# Basic trig
print(math.sin(math.radians(30)))   # 0.5
print(math.sin(math.radians(90)))   # 1.0
print(math.cos(math.radians(60)))   # 0.5
print(math.cos(math.radians(0)))    # 1.0
print(math.tan(math.radians(45)))   # 1.0 (approximately)

# Inverse trig
print(math.degrees(math.asin(0.5)))    # 30.0
print(math.degrees(math.acos(0.5)))    # 60.0
print(math.degrees(math.atan(1.0)))    # 45.0

# math.atan2(y, x) - angle of point (x,y) from origin
print(math.degrees(math.atan2(1, 1))) # 45.0
print(math.degrees(math.atan2(0, -1))) # 180.0

# Hyperbolic functions
print(math.sinh(1))    # 1.1752...
print(math.cosh(0))    # 1.0
print(math.tanh(0))    # 0.0
\`\`\`

## Number Theory Functions

\`\`\`python
import math

# math.factorial(n) - n!
print(math.factorial(0))    # 1
print(math.factorial(5))    # 120    (5*4*3*2*1)
print(math.factorial(10))   # 3628800
print(math.factorial(20))   # 2432902008176640000

# math.gcd(a, b) - greatest common divisor
print(math.gcd(12, 8))      # 4
print(math.gcd(100, 75))    # 25
print(math.gcd(7, 13))      # 1   (coprime)
print(math.gcd(0, 5))       # 5

# Python 3.9+: gcd of multiple numbers
print(math.gcd(12, 8, 4))   # 4

# math.lcm(a, b) - least common multiple (Python 3.9+)
print(math.lcm(4, 6))       # 12
print(math.lcm(3, 5))       # 15
print(math.lcm(12, 8))      # 24

# math.comb(n, k) - combinations C(n,k) = n! / (k! * (n-k)!)
print(math.comb(5, 2))      # 10   (5 choose 2)
print(math.comb(10, 3))     # 120
print(math.comb(52, 5))     # 2598960 (poker hands)

# math.perm(n, k) - permutations P(n,k) = n! / (n-k)!
print(math.perm(5, 2))      # 20   (ordered pairs from 5)
print(math.perm(10, 3))     # 720
\`\`\`

## Absolute Value and Sign

\`\`\`python
import math

# math.fabs() - absolute value, always returns float
print(math.fabs(-5))        # 5.0
print(math.fabs(3.14))      # 3.14
print(math.fabs(0))         # 0.0

# vs abs() built-in (can return int)
print(abs(-5))              # 5   (int)
print(math.fabs(-5))        # 5.0 (float)

# math.copysign(x, y) - magnitude of x, sign of y
print(math.copysign(5, -1))   # -5.0
print(math.copysign(-5, 1))   # 5.0
print(math.copysign(3, -7))   # -3.0
\`\`\`

## Sum Functions

\`\`\`python
import math

# math.fsum() - accurate floating point sum
print(sum([0.1] * 10))         # 0.9999999999999999  (floating point error!)
print(math.fsum([0.1] * 10))   # 1.0                 (accurate!)

# math.prod() - product of all items (Python 3.8+)
print(math.prod([1, 2, 3, 4, 5]))    # 120
print(math.prod([1, 2, 3], start=10)) # 60  (10 * 1 * 2 * 3)
print(math.prod([]))                  # 1   (empty = multiplicative identity)
\`\`\`

## Practical Example: Engineering Calculator

\`\`\`python
import math

def pendulum_period(length_m):
    """Calculate the period of a pendulum: T = 2π√(L/g)"""
    g = 9.81  # gravitational acceleration m/s^2
    return 2 * math.pi * math.sqrt(length_m / g)

def compound_interest(principal, rate, n_times, years):
    """A = P(1 + r/n)^(nt)"""
    return principal * (1 + rate/n_times) ** (n_times * years)

def continuous_compound(principal, rate, years):
    """A = Pe^(rt) - continuous compounding"""
    return principal * math.exp(rate * years)

def degrees_to_slope_percent(degrees):
    """Convert slope angle to percent grade"""
    return math.tan(math.radians(degrees)) * 100

# Pendulum periods
for length in [0.25, 1.0, 4.0]:
    period = pendulum_period(length)
    print(f"Pendulum {length}m: T = {period:.3f}s")

print()

# Investment growth
p = 10_000
for years in [5, 10, 20]:
    annual = compound_interest(p, 0.07, 12, years)
    continuous = continuous_compound(p, 0.07, years)
    print(f"{years} years: Annual={annual:>12,.2f}  Continuous={continuous:>12,.2f}")

print()

# Road grades
for angle in [5, 10, 15, 20]:
    grade = degrees_to_slope_percent(angle)
    print(f"{angle}° slope = {grade:.1f}% grade")
\`\`\`

Output:
\`\`\`
Pendulum 0.25m: T = 1.004s
Pendulum 1.0m: T = 2.007s
Pendulum 4.0m: T = 4.015s

 5 years: Annual=   14,105.99  Continuous=   14,190.68
10 years: Annual=   19,889.86  Continuous=   20,137.53
20 years: Annual=   39,560.87  Continuous=   40,552.00

5° slope = 8.7% grade
10° slope = 17.6% grade
15° slope = 26.8% grade
20° slope = 36.4% grade
\`\`\`

> [!TIP]
> Always use \`math.isclose()\` instead of \`==\` for floating-point comparisons. Use \`math.fsum()\` when accuracy of float addition matters. Trig functions work in radians - always convert with \`math.radians()\` and \`math.degrees()\`.`,
  objectives: [
    "Use mathematical constants like math.pi, math.e, and math.tau.",
    "Apply rounding functions: floor(), ceil(), trunc().",
    "Use power and root functions: sqrt(), pow(), exp(), hypot().",
    "Apply logarithmic and trigonometric functions correctly.",
    "Use number theory functions: factorial(), gcd(), lcm(), comb(), perm()."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};