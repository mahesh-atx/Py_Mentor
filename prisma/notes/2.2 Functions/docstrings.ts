export const docstringsLesson = {
  title: "Docstrings",
  slug: "docstrings",
  content: `# Docstrings

A **docstring** (documentation string) is a string literal that appears as the first statement in a function, class, or module. It documents what the code does. Python stores it in the \`__doc__\` attribute.

A docstring is a real string object Python attaches to the function as its \`__doc__\` attribute, so tools like \`help()\` can read it back — a contract recording what a function promises to do. The pitfall is writing docstrings that merely restate the code instead of explaining behavior and edge cases, which adds noise without building understanding.

## Basic Docstrings

\`\`\`python
def add(a, b):
    """Return the sum of a and b."""
    return a + b

def greet(name):
    """Print a greeting message for the given name."""
    print(f"Hello, {name}!")

# Access the docstring
print(add.__doc__)      # Return the sum of a and b.
help(add)               # Shows formatted documentation
\`\`\`

## Single-Line Docstrings

Use for simple functions where the purpose is clear:

\`\`\`python
def is_even(n):
    """Return True if n is even, False otherwise."""
    return n % 2 == 0

def get_area(radius):
    """Calculate and return the area of a circle."""
    import math
    return math.pi * radius ** 2

def to_celsius(fahrenheit):
    """Convert Fahrenheit temperature to Celsius."""
    return (fahrenheit - 32) * 5 / 9
\`\`\`

## Multi-Line Docstrings

For complex functions, use multi-line docstrings with a summary, description, and parameter documentation.

### Google Style (Most Popular)

\`\`\`python
def calculate_discount(price, discount_percent, max_discount=None):
    """Calculate the final price after applying a discount.

    Applies a percentage discount to the original price and optionally
    caps the maximum discount amount.

    Args:
        price (float): The original price. Must be non-negative.
        discount_percent (float): Discount percentage (0-100).
        max_discount (float, optional): Maximum discount amount in dollars.
            If None, no cap is applied. Defaults to None.

    Returns:
        float: The final price after applying the discount.

    Raises:
        ValueError: If price is negative or discount_percent is outside 0-100.

    Examples:
        >>> calculate_discount(100, 20)
        80.0
        >>> calculate_discount(100, 20, max_discount=10)
        90.0
    """
    if price < 0:
        raise ValueError(f"Price cannot be negative: {price}")
    if not 0 <= discount_percent <= 100:
        raise ValueError(f"Discount must be 0-100: {discount_percent}")
    
    discount_amount = price * (discount_percent / 100)
    if max_discount is not None:
        discount_amount = min(discount_amount, max_discount)
    
    return price - discount_amount
\`\`\`

### NumPy/SciPy Style

\`\`\`python
def linear_interpolation(x, x1, y1, x2, y2):
    """
    Perform linear interpolation between two points.

    Parameters
    ----------
    x : float
        The x value to interpolate at.
    x1, y1 : float
        Coordinates of the first known point.
    x2, y2 : float
        Coordinates of the second known point.

    Returns
    -------
    float
        The interpolated y value at x.

    Raises
    ------
    ValueError
        If x1 equals x2 (vertical line, undefined interpolation).

    Notes
    -----
    Uses the formula: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
    """
    if x1 == x2:
        raise ValueError("x1 and x2 must be different")
    return y1 + (x - x1) * (y2 - y1) / (x2 - x1)
\`\`\`

### reStructuredText Style (Standard Library)

\`\`\`python
def send_email(to, subject, body, cc=None):
    """
    Send an email message.

    :param to: Recipient email address.
    :type to: str
    :param subject: Email subject line.
    :type subject: str
    :param body: Email body text.
    :type body: str
    :param cc: Carbon copy recipients, defaults to None.
    :type cc: list[str], optional
    :return: True if sent successfully, False otherwise.
    :rtype: bool
    :raises ConnectionError: If email server is unavailable.
    """
    pass
\`\`\`

## Accessing Docstrings

\`\`\`python
def greet(name):
    """
    Print a personalized greeting.

    Args:
        name (str): The person's name to greet.
    """
    print(f"Hello, {name}!")

# Three ways to access
print(greet.__doc__)        # Direct access
help(greet)                 # Formatted display
print(greet.__doc__.strip())  # Stripped whitespace
\`\`\`

## Type Hints + Docstrings (Modern Python)

\`\`\`python
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """
    Calculate Body Mass Index (BMI).

    BMI is calculated as weight in kilograms divided by height
    in meters squared.

    Args:
        weight_kg: Body weight in kilograms. Must be positive.
        height_m: Height in meters. Must be positive.

    Returns:
        BMI value as a float.

    Raises:
        ValueError: If weight or height is not positive.

    Examples:
        >>> calculate_bmi(70, 1.75)
        22.857142857142858
        >>> round(calculate_bmi(70, 1.75), 1)
        22.9
    """
    if weight_kg <= 0 or height_m <= 0:
        raise ValueError("Weight and height must be positive")
    return weight_kg / (height_m ** 2)
\`\`\`

## Docstring Best Practices

\`\`\`python
# BAD: Redundant docstring (restates what the code already says)
def add(a, b):
    """Add a to b."""    # We can see that from the code!
    return a + b

# BETTER: Explain behavior, not just what it does
def add(a, b):
    """Return the arithmetic sum of two numbers.
    
    Both numbers are converted to float if they are not already numeric.
    Returns float even if both inputs are integers for consistency.
    """
    return a + b

# BAD: Missing important details
def get_user(user_id):
    """Get a user."""
    pass

# BETTER: Document return value and error conditions
def get_user(user_id):
    """Fetch user data from the database by ID.
    
    Args:
        user_id (int): Unique identifier for the user.
    
    Returns:
        dict: User data with keys 'name', 'email', 'role'.
        None: If user_id does not exist.
    
    Raises:
        TypeError: If user_id is not an integer.
        DatabaseError: If database connection fails.
    """
    pass
\`\`\`

## Module and Class Docstrings

\`\`\`python
"""
math_utils.py - Mathematical utility functions.

This module provides helper functions for common mathematical
operations used throughout the application.

Functions:
    factorial: Calculate n factorial
    is_prime: Check if a number is prime
    lcm: Find least common multiple

Usage:
    from math_utils import factorial, is_prime
    print(factorial(5))  # 120
"""

class BankAccount:
    """
    A simple bank account with deposit and withdrawal functionality.

    Attributes:
        owner (str): The account owner's name.
        balance (float): Current account balance.

    Example:
        >>> account = BankAccount("Alice", 1000)
        >>> account.deposit(500)
        >>> account.balance
        1500.0
    """
    
    def __init__(self, owner: str, initial_balance: float = 0.0):
        """
        Initialize a new bank account.

        Args:
            owner: The account owner's full name.
            initial_balance: Starting balance. Defaults to 0.0.

        Raises:
            ValueError: If initial_balance is negative.
        """
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.owner = owner
        self.balance = initial_balance
\`\`\`

## doctest - Running Examples in Docstrings

\`\`\`python
def factorial(n):
    """
    Return the factorial of n (n!).

    >>> factorial(0)
    1
    >>> factorial(1)
    1
    >>> factorial(5)
    120
    >>> factorial(10)
    3628800
    >>> factorial(-1)
    Traceback (most recent call last):
        ...
    ValueError: n must be non-negative
    """
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Run doctests
if __name__ == "__main__":
    import doctest
    doctest.testmod(verbose=True)
\`\`\`

> [!TIP]
> Always write docstrings for functions that will be used by others (or your future self). The Google style is most popular in modern Python. Use type hints alongside docstrings for the best documentation. A function with a clear, concise docstring is a sign of professional, maintainable code.`,
  objectives: [
    "Write single-line docstrings for simple functions.",
    "Write multi-line docstrings documenting parameters, return values, and exceptions.",
    "Access docstrings using __doc__ and help().",
    "Use the Google, NumPy, or reST docstring conventions consistently.",
    "Write testable examples in docstrings using doctest format."
  ],
  difficulty: "beginner",
  xpReward: 50,
};