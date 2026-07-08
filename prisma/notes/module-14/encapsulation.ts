export const encapsulationLesson = {
  title: "Encapsulation: Public, Protected, Private & @property",
  slug: "encapsulation",
  content: `# Encapsulation: Public, Protected, Private & @property

## What is Encapsulation?

**Encapsulation** means bundling data and the methods that work on that data together, and **controlling access** to that data. It prevents outside code from directly messing with an object's internal state.

Think of a bank account:
- You can deposit and withdraw (controlled access)
- But you cannot directly set \`balance = 1000000\` from outside (that would be bad!)

## Public Members (No Underscore)

By default, ALL class attributes and methods are **public** - accessible from anywhere.

\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name      # Public - accessible from anywhere
        self.breed = breed    # Public

    def bark(self):           # Public method
        print(f"{self.name} says Woof!")

dog = Dog("Rex", "Labrador")

# All of these work fine - public access
print(dog.name)     # Rex
print(dog.breed)    # Labrador
dog.bark()          # Rex says Woof!

# Can even MODIFY directly
dog.name = "Max"    # No restriction
print(dog.name)     # Max
\`\`\`

## Protected Members (Single Underscore _)

A single underscore prefix is a **convention** (NOT enforced by Python) that signals: "This is intended for internal use - don't access it from outside unless you know what you're doing."

It is a warning to other developers, but Python does not actually prevent access.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner          # Public
        self._balance = balance     # Protected - "internal use"
        self._transaction_log = []  # Protected

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            self._transaction_log.append(f"Deposit: +\${amount}")

    def get_balance(self):
        return self._balance         # Access through a method

acc = BankAccount("Alice", 1000)

# Technically works, but you're told "don't do this directly"
print(acc._balance)    # 1000  (works, but bad practice)

# Better: use the provided method
print(acc.get_balance())   # 1000
acc.deposit(500)
print(acc.get_balance())   # 1500
\`\`\`

## Private Members (Double Underscore __)

A double underscore prefix triggers **name mangling** - Python renames the attribute to make it much harder to access from outside the class. This provides actual (though not absolute) privacy.

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance       # Private - name mangling applied
        self.__pin = "1234"            # Private

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount, pin):
        if pin != self.__pin:
            print("Wrong PIN!")
            return False
        if amount > self.__balance:
            print("Insufficient funds!")
            return False
        self.__balance -= amount
        return True

    def get_balance(self):
        return self.__balance

acc = BankAccount("Alice", 1000)

# This works - through method
print(acc.get_balance())   # 1000
acc.deposit(500)

# This FAILS - private attribute
try:
    print(acc.__balance)   # AttributeError!
except AttributeError as e:
    print(f"Error: {e}")

# Name mangling: Python renamed it to _BankAccount__balance
print(acc._BankAccount__balance)   # 1500 (technically accessible, but DON'T do this)
\`\`\`

### Name Mangling Explained

\`\`\`python
class MyClass:
    def __init__(self):
        self.public = "public"
        self._protected = "protected"
        self.__private = "private"   # Becomes _MyClass__private

obj = MyClass()

print(obj.public)         # public   - OK
print(obj._protected)     # protected - OK (but discouraged)
# print(obj.__private)    # AttributeError!
print(obj._MyClass__private)  # private - works, but very discouraged

# See all attributes
print([attr for attr in dir(obj) if not attr.startswith('__')])
# ['_MyClass__private', '_protected', 'public']
\`\`\`

## Summary: Naming Conventions

\`\`\`
Name             Convention         Access Level    Enforcement
-----------      ---------------    ------------    -----------
name             No prefix          Public          None
_name            Single _           Protected       Convention only
__name           Double __          Private         Name mangling
\`\`\`

## Getters & Setters

Instead of direct attribute access, provide **getter** (read) and **setter** (write) methods that can include validation:

\`\`\`python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.__score = score    # Private

    # Getter method
    def get_score(self):
        return self.__score

    # Setter method with validation
    def set_score(self, score):
        if not isinstance(score, (int, float)):
            raise TypeError("Score must be a number")
        if score < 0 or score > 100:
            raise ValueError("Score must be between 0 and 100")
        self.__score = score

    def get_grade(self):
        if self.__score >= 90: return "A"
        elif self.__score >= 80: return "B"
        elif self.__score >= 70: return "C"
        else: return "F"

student = Student("Alice", 85)

# Use getter
print(student.get_score())    # 85

# Use setter with validation
student.set_score(92)
print(student.get_score())    # 92
print(student.get_grade())    # A

# Invalid - raises ValueError
try:
    student.set_score(150)   # Score must be between 0 and 100
except ValueError as e:
    print(f"Error: {e}")
\`\`\`

## @property Decorator - Pythonic Getters & Setters

Python's \`@property\` decorator lets you use getter/setter methods that LOOK like regular attribute access. This is the preferred Pythonic approach.

### Basic @property

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.__radius = radius   # Private

    @property
    def radius(self):
        """Getter - access with circle.radius"""
        return self.__radius

    @radius.setter
    def radius(self, value):
        """Setter - assign with circle.radius = value"""
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self.__radius = value

    @property
    def area(self):
        """Computed property - read-only"""
        import math
        return math.pi * self.__radius ** 2

    @property
    def diameter(self):
        return self.__radius * 2

c = Circle(5)

# Looks like attribute access, but calls the getter!
print(c.radius)    # 5     <- calls @property getter
print(c.area)      # 78.54  <- computed property (no setter)
print(c.diameter)  # 10

# Looks like attribute assignment, but calls the setter with validation!
c.radius = 10
print(c.radius)    # 10

# This triggers the setter's validation
try:
    c.radius = -5    # ValueError: Radius cannot be negative
except ValueError as e:
    print(f"Error: {e}")

# Read-only property - no setter defined
try:
    c.area = 100     # AttributeError: can't set attribute
except AttributeError as e:
    print(f"Error: {e}")
\`\`\`

### @property vs get/set methods

\`\`\`python
# Old style (Java-like)
class OldStudent:
    def __init__(self, name, score):
        self.__score = score
        self.name = name

    def get_score(self):
        return self.__score

    def set_score(self, value):
        if 0 <= value <= 100:
            self.__score = value

student = OldStudent("Alice", 85)
print(student.get_score())   # 85
student.set_score(90)

# Pythonic style with @property
class Student:
    def __init__(self, name, score):
        self.__score = score
        self.name = name

    @property
    def score(self):
        return self.__score

    @score.setter
    def score(self, value):
        if 0 <= value <= 100:
            self.__score = value

student = Student("Alice", 85)
print(student.score)    # 85  - looks like attribute access
student.score = 90      # looks like attribute assignment
\`\`\`

### @property.deleter

\`\`\`python
class Email:
    def __init__(self, email):
        self.__email = email

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, value):
        if "@" not in value:
            raise ValueError("Invalid email address")
        self.__email = value.lower().strip()

    @email.deleter
    def email(self):
        print("Email deleted")
        self.__email = None

contact = Email("Alice@Example.COM")
print(contact.email)      # alice@example.com  (normalized)

contact.email = "alice@newdomain.com"
print(contact.email)      # alice@newdomain.com

del contact.email          # Email deleted
print(contact.email)       # None
\`\`\`

## Complete Practical Example: BankAccount

\`\`\`python
class BankAccount:
    """A bank account with full encapsulation."""

    _minimum_balance = 0    # Protected class variable

    def __init__(self, owner, account_number, initial_balance=0):
        self.owner = owner
        self.__account_number = account_number
        self.__balance = 0
        self.__transactions = []

        # Use property setter for validation
        if initial_balance > 0:
            self.deposit(initial_balance)

    @property
    def balance(self):
        """Read-only balance."""
        return self.__balance

    @property
    def account_number(self):
        """Masked account number."""
        return f"****{self.__account_number[-4:]}"

    @property
    def transaction_count(self):
        return len(self.__transactions)

    def deposit(self, amount):
        """Deposit money."""
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise ValueError("Deposit amount must be a positive number")
        self.__balance += amount
        self.__transactions.append(f"Deposit: +\${amount:.2f}")
        return self.__balance

    def withdraw(self, amount):
        """Withdraw money."""
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.__balance:
            raise ValueError(f"Insufficient funds. Balance: \${self.__balance:.2f}")
        self.__balance -= amount
        self.__transactions.append(f"Withdrawal: -\${amount:.2f}")
        return self.__balance

    def get_statement(self):
        """Get transaction history."""
        print(f"\\n=== Statement for {self.owner} ===")
        print(f"Account: {self.account_number}")
        for t in self.__transactions:
            print(f"  {t}")
        print(f"Current Balance: \${self.__balance:.2f}")

    def __str__(self):
        return f"Account({self.owner}, {self.account_number}, \${self.__balance:.2f})"

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, number={self.account_number!r})"

# Test it
acc = BankAccount("Alice Johnson", "1234567890123456", 1000)

print(acc.balance)          # 1000 (read-only property)
print(acc.account_number)   # ****3456 (masked)

acc.deposit(500)
acc.withdraw(200)

try:
    acc.withdraw(10000)     # ValueError
except ValueError as e:
    print(f"Error: {e}")

acc.get_statement()
\`\`\`

Output:
\`\`\`
1000
****3456
Error: Insufficient funds. Balance: $1300.00

=== Statement for Alice Johnson ===
Account: ****3456
  Deposit: +$1000.00
  Deposit: +$500.00
  Withdrawal: -$200.00
Current Balance: $1300.00
\`\`\`

## Access Level Decision Guide

\`\`\`
When to use EACH:

Public (name):        Everything that is part of the public API.
                      If users of your class should use it, make it public.

Protected (_name):    Internal implementation details.
                      Subclasses might need it, but external code should not.
                      "I'm using this internally, be careful if you touch it"

Private (__name):     Truly internal - you want name mangling protection.
                      Sensitive data (passwords, account numbers).
                      Use sparingly - it makes inheritance harder.

@property:            When you want attribute-like access but need
                      validation, computation, or read-only enforcement.
\`\`\`

> [!TIP]
> Python's encapsulation is based on trust and convention, not strict enforcement. The single underscore \`_\` is just a convention, and even double underscore \`__\` can be bypassed with name mangling. Focus on the \`@property\` decorator - it is the most Pythonic way to provide controlled access to attributes while keeping a clean interface.`,
  objectives: [
    "Understand the three access levels: public, protected (_), and private (__).",
    "Know that Python uses name mangling for __ attributes.",
    "Write getter and setter methods to control attribute access.",
    "Use the @property decorator for Pythonic attribute access with validation.",
    "Create computed read-only properties using @property without a setter."
  ],
  difficulty: "intermediate",
  xpReward: 75,
};