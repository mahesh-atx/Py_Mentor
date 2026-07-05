export const complexNumbersLesson = {
  title: "Complex Numbers in Python",
  slug: "complex-numbers",
  content: `# Complex Numbers in Python

A complex number has a **real** part and an **imaginary** part, written as \`a + bj\` in Python (where \`j\` is the imaginary unit, the square root of -1).

## Creating Complex Numbers

\`\`\`python
# Literal notation - use 'j' (not 'i' like in math)
c1 = 3 + 4j
c2 = -2 + 1j
c3 = 5j         # Pure imaginary (real part = 0)
c4 = 7 + 0j     # Real number as complex

print(c1)        # (3+4j)
print(c2)        # (-2+1j)
print(c3)        # 5j
print(type(c1))  # <class 'complex'>

# Using complex() constructor
c5 = complex(3, 4)    # same as 3 + 4j
c6 = complex(5)       # 5 + 0j
c7 = complex(0, 1)    # 0 + 1j  (pure imaginary unit)

print(complex(2, -3))  # (2-3j)
print(complex("3+4j")) # (3+4j)  (from string)
\`\`\`

## Accessing Real and Imaginary Parts

\`\`\`python
c = 3 + 4j

print(c.real)    # 3.0   (always float)
print(c.imag)    # 4.0   (always float)

# Even for integer-looking complex numbers
c2 = 5 + 2j
print(type(c2.real))   # <class 'float'>
print(type(c2.imag))   # <class 'float'>
\`\`\`

## Arithmetic Operations

\`\`\`python
a = 3 + 4j
b = 1 - 2j

print(a + b)    # (4+2j)      addition
print(a - b)    # (2+6j)      subtraction
print(a * b)    # (11-2j)     multiplication: (3+4j)(1-2j) = 3-6j+4j-8j² = 3-2j+8 = 11-2j
print(a / b)    # (-1+2j)     division
print(a ** 2)   # (-7+24j)    power

# Conjugate: flip the sign of imaginary part
print(a.conjugate())   # (3-4j)

# Absolute value: magnitude/modulus = sqrt(real² + imag²)
print(abs(a))          # 5.0   (sqrt(3² + 4²) = sqrt(25) = 5)
print(abs(1j))         # 1.0
print(abs(3 + 4j))     # 5.0
\`\`\`

## cmath Module for Complex Math

\`\`\`python
import cmath

c = 3 + 4j

# Square root of complex (cmath.sqrt handles negatives)
print(cmath.sqrt(-1))     # 1j   (imaginary unit!)
print(cmath.sqrt(-4))     # 2j
print(cmath.sqrt(c))      # (2+1j) approximately

# Polar form: (magnitude, phase angle in radians)
magnitude, phase = cmath.polar(c)
print(f"Magnitude: {magnitude:.2f}")   # 5.0
print(f"Phase: {cmath.phase(c):.4f} rad = {cmath.phase(c) * 180 / cmath.pi:.2f}°")

# Convert from polar back to rectangular
c_back = cmath.rect(magnitude, phase)
print(f"Back to rect: {c_back:.1f}")   # (3+4j)

# Euler's formula: e^(iθ) = cos(θ) + i*sin(θ)
theta = cmath.pi / 4  # 45 degrees
result = cmath.exp(1j * theta)
print(f"e^(i*π/4) = {result}")
print(f"cos(45°) + i*sin(45°) = {cmath.cos(theta):.4f} + {cmath.sin(theta):.4f}j")

# Natural log
print(cmath.log(1j))      # 1.5707...j  (= i*π/2)
print(cmath.log(-1))      # (0+3.14159...)j  (= iπ, Euler's identity!)
\`\`\`

## Euler's Famous Identity

\`\`\`python
import cmath

# e^(iπ) + 1 = 0  (Euler's identity - "the most beautiful formula")
result = cmath.exp(1j * cmath.pi) + 1
print(result)        # ~0 (with floating point error)
print(abs(result) < 1e-10)   # True  (essentially zero)
print(f"e^(iπ) = {cmath.exp(1j * cmath.pi)}")  # (-1+0j) approximately
\`\`\`

## Practical Example: Electrical Engineering (Impedance)

\`\`\`python
import cmath

# In AC circuits, impedance is a complex number
# Z = R + jX  where R=resistance, X=reactance

def series_impedance(*impedances):
    """Total impedance in series: Z = Z1 + Z2 + ..."""
    return sum(impedances)

def parallel_impedance(*impedances):
    """Total impedance in parallel: 1/Z = 1/Z1 + 1/Z2 + ..."""
    return 1 / sum(1/z for z in impedances)

# Components
R = 100 + 0j        # 100 Ω resistor
L = 0 + 50j         # Inductor: XL = 50 Ω
C = 0 - 30j         # Capacitor: XC = -30 Ω (negative reactance)

# Series RLC circuit
z_series = series_impedance(R, L, C)
print("=== Series RLC Circuit ===")
print(f"Z = {z_series}")
print(f"Impedance magnitude: {abs(z_series):.2f} Ω")
print(f"Phase angle: {cmath.phase(z_series) * 180 / cmath.pi:.2f}°")

# Power calculation
voltage = 120 + 0j  # 120V
current = voltage / z_series
power = voltage * current.conjugate()
print(f"Current: {abs(current):.4f} A")
print(f"Real power (W): {power.real:.2f}")
print(f"Reactive power (VAR): {power.imag:.2f}")
\`\`\`

Output:
\`\`\`
=== Series RLC Circuit ===
Z = (100+20j)
Impedance magnitude: 101.98 Ω
Phase angle: 11.31°
Current: 1.1762 A
Real power (W): 138.35
Reactive power (VAR): 27.67
\`\`\`

## Practical Example: Mandelbrot Set

\`\`\`python
def mandelbrot(c, max_iter=100):
    """
    Check if complex number c is in the Mandelbrot set.
    Returns number of iterations before divergence.
    """
    z = 0
    for n in range(max_iter):
        if abs(z) > 2:
            return n
        z = z * z + c
    return max_iter

# Simple text visualization
def plot_mandelbrot(width=60, height=25):
    print("Mandelbrot Set:")
    for y_pixel in range(height):
        row = ""
        for x_pixel in range(width):
            # Map pixels to complex plane
            x = (x_pixel / width) * 3.5 - 2.5
            y = (y_pixel / height) * 2 - 1
            c = complex(x, y)
            iters = mandelbrot(c)
            if iters == 100:
                row += "*"
            elif iters > 50:
                row += "."
            else:
                row += " "
        print(row)

plot_mandelbrot()
\`\`\`

> [!TIP]
> In Python, the imaginary unit is written as \`j\` not \`i\`. Use the \`cmath\` module (complex math) instead of \`math\` for operations on complex numbers since \`math.sqrt(-1)\` raises an error but \`cmath.sqrt(-1)\` returns \`1j\`. Complex numbers are mainly used in engineering, physics, and signal processing.`,
  objectives: [
    "Create complex numbers using j notation and the complex() constructor.",
    "Access real and imaginary parts using .real and .imag.",
    "Perform arithmetic on complex numbers.",
    "Use the cmath module for complex mathematical functions.",
    "Apply complex numbers in practical engineering scenarios."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};