export const fractionsModuleLesson = {
  title: "fractions Module",
  slug: "fractions-module",
  content: `# fractions Module

The \`fractions\` module provides support for rational number arithmetic - numbers expressed as exact fractions (e.g., 1/3, 22/7). Unlike floats, fractions are always exact.

\`\`\`python
from fractions import Fraction
\`\`\`

## Creating Fractions

\`\`\`python
from fractions import Fraction

# From two integers (numerator, denominator)
f1 = Fraction(1, 3)
print(f1)        # 1/3

f2 = Fraction(3, 4)
print(f2)        # 3/4

# Automatically reduces to lowest terms
print(Fraction(4, 8))     # 1/2  (reduced from 4/8)
print(Fraction(6, 9))     # 2/3  (reduced from 6/9)
print(Fraction(-4, 8))    # -1/2

# From a string
print(Fraction("1/3"))    # 1/3
print(Fraction("0.5"))    # 1/2  (converts decimal string!)
print(Fraction("1.5"))    # 3/2
print(Fraction("3"))      # 3    (3/1 = 3)

# From a float (may have floating point error!)
print(Fraction(0.1))      # 3602879701896397/36028797018963968  (NOT 1/10!)
print(Fraction(0.5))      # 1/2  (exact because 0.5 is representable in binary)

# Best practice: use string form for exact fractions
print(Fraction("0.1"))    # 1/10  (exact!)

# From a Decimal
from decimal import Decimal
print(Fraction(Decimal("0.1")))   # 1/10  (exact!)
\`\`\`

## Accessing Numerator and Denominator

\`\`\`python
from fractions import Fraction

f = Fraction(3, 4)
print(f.numerator)     # 3
print(f.denominator)   # 4

f2 = Fraction(6, 8)
print(f2.numerator)    # 3  (automatically reduced)
print(f2.denominator)  # 4
\`\`\`

## Arithmetic Operations

All arithmetic with Fraction objects returns exact Fraction results:

\`\`\`python
from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(1, 4)

print(a + b)    # 7/12   (1/3 + 1/4 = 4/12 + 3/12 = 7/12)
print(a - b)    # 1/12   (1/3 - 1/4 = 4/12 - 3/12 = 1/12)
print(a * b)    # 1/12   (1/3 * 1/4)
print(a / b)    # 4/3    (1/3 ÷ 1/4 = 1/3 * 4/1)
print(a ** 2)   # 1/9
print(a ** -1)  # 3/1 = 3  (reciprocal)

# Mixed with integers
print(Fraction(1, 3) + 1)    # 4/3
print(Fraction(1, 3) * 6)    # 2
print(Fraction(2, 3) * 3)    # 2  (exact integer!)

# Mixed with float returns float
print(Fraction(1, 3) + 0.5)  # 0.8333...  (float)
\`\`\`

## Comparison

\`\`\`python
from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(2, 6)   # Same as 1/3

print(a == b)    # True   (both are 1/3)
print(a < Fraction(1, 2))   # True   (1/3 < 1/2)
print(a > Fraction(1, 4))   # True   (1/3 > 1/4)

# Sort fractions
fracs = [Fraction(3, 4), Fraction(1, 3), Fraction(2, 5), Fraction(5, 8)]
print(sorted(fracs))
# [1/3, 2/5, 5/8, 3/4]
\`\`\`

## Converting Fractions

\`\`\`python
from fractions import Fraction

f = Fraction(1, 3)

print(float(f))          # 0.3333333333333333
print(int(f))            # 0   (truncates)
print(round(float(f), 4))  # 0.3333

# limit_denominator() - approximate with simple fraction
# Very useful for converting floats to readable fractions
pi_approx = Fraction(3.14159265358979)
print(pi_approx)                          # 3537118876014453/1125899906842624  (messy!)
print(pi_approx.limit_denominator(10))    # 22/7
print(pi_approx.limit_denominator(100))   # 311/99
print(pi_approx.limit_denominator(1000))  # 355/113  (very accurate!)

# Convert float to simple fraction
print(Fraction(0.333333).limit_denominator(10))    # 1/3
print(Fraction(0.666667).limit_denominator(10))    # 2/3
print(Fraction(0.142857).limit_denominator(10))    # 1/7
\`\`\`

## Practical Applications

### Recipe Scaling

\`\`\`python
from fractions import Fraction

recipe = {
    "flour":  Fraction(2, 1),       # 2 cups
    "sugar":  Fraction(3, 4),       # 3/4 cup
    "butter": Fraction(1, 2),       # 1/2 cup
    "eggs":   Fraction(2, 1),       # 2 eggs
    "milk":   Fraction(1, 3),       # 1/3 cup
}

def scale_recipe(recipe, scale_factor):
    """Scale recipe by a fraction factor."""
    factor = Fraction(scale_factor)
    return {ingredient: amount * factor for ingredient, amount in recipe.items()}

def format_fraction(f):
    """Format Fraction as a readable string."""
    if f.denominator == 1:
        return str(f.numerator)
    elif f.numerator > f.denominator:
        whole = f.numerator // f.denominator
        remainder = f - whole
        return f"{whole} {remainder}"
    return str(f)

# Make half the recipe
half_recipe = scale_recipe(recipe, Fraction(1, 2))
print("Half Recipe:")
for ingredient, amount in half_recipe.items():
    print(f"  {ingredient}: {format_fraction(amount)}")

print()
# Make 1.5x the recipe
big_recipe = scale_recipe(recipe, Fraction(3, 2))
print("1.5x Recipe:")
for ingredient, amount in big_recipe.items():
    print(f"  {ingredient}: {format_fraction(amount)}")
\`\`\`

Output:
\`\`\`
Half Recipe:
  flour: 1
  sugar: 3/8
  butter: 1/4
  eggs: 1
  milk: 1/6

1.5x Recipe:
  flour: 3
  sugar: 1 1/8
  butter: 3/4
  eggs: 3
  milk: 1/2
\`\`\`

### Music Theory - Note Durations

\`\`\`python
from fractions import Fraction

# Musical note durations as fractions of a whole note
note_durations = {
    "whole":     Fraction(1, 1),
    "half":      Fraction(1, 2),
    "quarter":   Fraction(1, 4),
    "eighth":    Fraction(1, 8),
    "sixteenth": Fraction(1, 16),
}

# Check if a measure is complete (adds up to 1 whole note in 4/4 time)
measure = [
    ("quarter", 1),
    ("quarter", 1),
    ("eighth", 2),
    ("sixteenth", 4),
]

total = sum(note_durations[note] * count for note, count in measure)
print(f"Total beats: {total}")         # 1
print(f"Measure complete: {total == 1}") # True
\`\`\`

> [!TIP]
> Use \`Fraction\` when exact rational arithmetic matters - recipe scaling, music theory, probability calculations, and educational programs. Use \`limit_denominator()\` to convert an approximate float to the nearest simple fraction. Always create Fractions from strings or integers, not from floats, unless you specifically want the float's exact representation.`,
  objectives: [
    "Create Fraction objects from integers, strings, and Decimals.",
    "Perform exact arithmetic with fractions.",
    "Use limit_denominator() to approximate floats as simple fractions.",
    "Convert between Fraction and other numeric types.",
    "Apply fractions in real-world scenarios like recipe scaling."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};