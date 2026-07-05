export const decimalModuleLesson = {
  title: "decimal Module (Precision Arithmetic)",
  slug: "decimal-module",
  content: `# decimal Module (Precision Arithmetic)

## The Problem with Regular Floats

Python's regular \`float\` uses binary floating-point representation (IEEE 754), which cannot represent many decimal fractions exactly. This causes surprising results:

\`\`\`python
# Floating point surprises
print(0.1 + 0.2)          # 0.30000000000000004  (NOT 0.3!)
print(0.1 + 0.2 == 0.3)   # False
print(1.1 + 2.2)          # 3.3000000000000003
print(0.1 * 3)             # 0.30000000000000004

# Financial calculation gone wrong
price = 4.99
tax_rate = 0.07
tax = price * tax_rate
print(f"Tax: {tax}")       # 0.34930000000000003  (should be 0.3493)
total = price + tax
print(f"Total: {total}")   # 5.339300000000001    (rounding issues!)
\`\`\`

The \`decimal\` module solves this by using decimal (base 10) arithmetic with configurable precision.

## Basic Usage

\`\`\`python
from decimal import Decimal

# Create Decimal from a string (recommended)
a = Decimal("0.1")
b = Decimal("0.2")
result = a + b
print(result)              # 0.3  (exact!)
print(result == Decimal("0.3"))   # True

# From integer
print(Decimal(5))          # 5
print(Decimal(5) / Decimal(2))   # 2.5

# From float - shows the float's actual imprecision
print(Decimal(0.1))        # 0.1000000000000000055511151231257827021181583404541015625
# Always use Decimal("0.1"), not Decimal(0.1)!
\`\`\`

## Arithmetic Operations

\`\`\`python
from decimal import Decimal

a = Decimal("10.25")
b = Decimal("3.50")

print(a + b)    # 13.75
print(a - b)    # 6.75
print(a * b)    # 35.875 (exact!)
print(a / b)    # 2.928571428571428571428571429
print(a // b)   # 2
print(a % b)    # 3.25
print(a ** 2)   # 105.0625

# Mixed with integers is fine
print(Decimal("5.5") + 2)    # 7.5
print(Decimal("5.5") * 3)    # 16.5

# Mixed with float raises TypeError
# print(Decimal("5.5") + 2.5)  # TypeError!
# Always convert: Decimal("5.5") + Decimal("2.5")
\`\`\`

## Controlling Precision

\`\`\`python
from decimal import Decimal, getcontext

# Default precision is 28 significant digits
print(Decimal("1") / Decimal("3"))
# 0.3333333333333333333333333333

# Change global precision
getcontext().prec = 10
print(Decimal("1") / Decimal("3"))
# 0.3333333333

getcontext().prec = 50
print(Decimal("1") / Decimal("3"))
# 0.33333333333333333333333333333333333333333333333333

# Reset to default
getcontext().prec = 28
\`\`\`

## Rounding Modes

\`\`\`python
from decimal import Decimal, ROUND_HALF_UP, ROUND_HALF_DOWN, ROUND_HALF_EVEN
from decimal import ROUND_UP, ROUND_DOWN, ROUND_CEILING, ROUND_FLOOR

value = Decimal("2.5")

# quantize() - round to specific decimal places
print(value.quantize(Decimal("1"), rounding=ROUND_HALF_UP))    # 3
print(value.quantize(Decimal("1"), rounding=ROUND_HALF_DOWN))  # 2
print(value.quantize(Decimal("1"), rounding=ROUND_HALF_EVEN))  # 2 (banker's)
print(value.quantize(Decimal("1"), rounding=ROUND_UP))         # 3
print(value.quantize(Decimal("1"), rounding=ROUND_DOWN))       # 2

value = Decimal("2.567")
print(value.quantize(Decimal("0.01")))               # 2.57 (default ROUND_HALF_EVEN)
print(value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))  # 2.57
print(value.quantize(Decimal("0.1")))                # 2.6
\`\`\`

## Financial Calculations

\`\`\`python
from decimal import Decimal, ROUND_HALF_UP

def format_money(amount):
    """Format as currency with exactly 2 decimal places."""
    return str(amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))

# Shopping cart
items = [
    ("Coffee",    Decimal("4.99"),  2),
    ("Sandwich",  Decimal("8.99"),  1),
    ("Juice",     Decimal("3.25"),  3),
    ("Chips",     Decimal("1.99"),  2),
]

subtotal = Decimal("0")
print(f"{'Item':<15} {'Price':>8} {'Qty':>5} {'Total':>10}")
print("-" * 42)

for name, price, qty in items:
    total = price * qty
    subtotal += total
    print(f"{name:<15} \${format_money(price):>7} {qty:>5} \${format_money(total):>9}")

tax_rate = Decimal("0.0875")   # 8.75%
tax = (subtotal * tax_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
grand_total = subtotal + tax

print("-" * 42)
print(f"{'Subtotal':>37} \${format_money(subtotal):>9}")
print(f"{'Tax (8.75%)':>37} \${format_money(tax):>9}")
print(f"{'TOTAL':>37} \${format_money(grand_total):>9}")
\`\`\`

Output:
\`\`\`
Item             Price   Qty      Total
------------------------------------------
Coffee           $ 4.99     2 $     9.98
Sandwich         $ 8.99     1 $     8.99
Juice            $ 3.25     3 $     9.75
Chips            $ 1.99     2 $     3.98
------------------------------------------
                             Subtotal $     32.70
                             Tax (8.75%) $      2.86
                                TOTAL $     35.56
\`\`\`

## Useful Decimal Methods

\`\`\`python
from decimal import Decimal

d = Decimal("3.14159")

print(d.sqrt())           # 1.772810520855515528...  (precise sqrt)
print(abs(Decimal("-5"))) # 5
print(d.is_finite())      # True
print(d.is_nan())         # False
print(d.is_zero())        # False

# Convert
print(float(d))           # 3.14159  (convert back to float if needed)
print(int(d))             # 3        (truncates)
print(str(d))             # "3.14159"

# Comparison
print(Decimal("3.10") == Decimal("3.1"))   # True  (numerically equal)
print(Decimal("3.10") > Decimal("3.0"))    # True
\`\`\`

## Local Context (Temporary Precision Change)

\`\`\`python
from decimal import Decimal, localcontext

# Change precision just for a block
with localcontext() as ctx:
    ctx.prec = 5
    result = Decimal("1") / Decimal("3")
    print(result)   # 0.33333  (5 digits)

# Outside: precision restored to default (28)
result = Decimal("1") / Decimal("3")
print(result)   # 0.3333333333333333333333333333

# Different rounding in a block
from decimal import ROUND_CEILING
with localcontext() as ctx:
    ctx.rounding = ROUND_CEILING
    print(Decimal("2.1").to_integral_value())  # 3
\`\`\`

> [!TIP]
> Always create Decimal from strings (\`Decimal("0.1")\`), never from floats (\`Decimal(0.1)\`). Use the \`decimal\` module for financial calculations, tax, pricing, or anywhere rounding errors are unacceptable. For scientific calculations where floats are fast enough and small errors are acceptable, stick with regular \`float\`.`,
  objectives: [
    "Understand why regular floats have precision issues.",
    "Create Decimal objects correctly (from strings, not floats).",
    "Perform exact arithmetic with the Decimal type.",
    "Control precision using getcontext() and localcontext().",
    "Apply different rounding modes using quantize()."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};