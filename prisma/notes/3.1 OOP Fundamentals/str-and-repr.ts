export const strAndReprLesson = {
  title: "__str__() and __repr__() Methods",
  slug: "str-and-repr",
  content: `# __str__() and __repr__() Methods

## The Theory — Building the Logic

\`__str__\` and \`__repr__\` are part of Python's *protocol* system: special double-underscore methods that let your ordinary objects hook into built-in operations like \`print()\` and \`str()\`, so custom types feel like native ones. The guiding idea is that every object has two audiences — a human user who wants a friendly summary, and a developer who needs an unambiguous, debuggable view — and Python calls the appropriate method depending on *who* is looking. \`__repr__\` is considered the "official" representation and is the fallback when \`__str__\` is missing, which is why the convention is to make it look like a valid constructor call such as \`Dog(name='Rex')\`. Understanding this split saves hours of confusion when objects print differently inside a list than on their own — containers always prefer \`__repr__\`. A common pitfall is writing only \`__str__\` and then struggling to debug, since containers and the REPL fall back to the unhelpful default memory-address form; always define at least \`__repr__\`.

## The Problem Without These Methods

Without \`__str__\` or \`__repr__\`, printing an object gives you a useless memory address:

\`\`\`python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.breed = breed
        self.age = age

dog = Dog("Rex", "Labrador", 3)

print(dog)       # <__main__.Dog object at 0x000001A2B3C4D5E6>  (useless!)
print(str(dog))  # <__main__.Dog object at 0x000001A2B3C4D5E6>  (useless!)
\`\`\`

## __str__() - Human-Readable String

\`__str__()\` is called when you:
- \`print(object)\`
- \`str(object)\`
- Use it in an f-string: \`f"{object}"\`

It should return a **human-friendly, readable string** intended for end users.

\`\`\`python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.breed = breed
        self.age = age

    def __str__(self):
        return f"{self.name} ({self.breed}, {self.age} years old)"

dog = Dog("Rex", "Labrador", 3)

print(dog)         # Rex (Labrador, 3 years old)
print(str(dog))    # Rex (Labrador, 3 years old)
print(f"My dog: {dog}")   # My dog: Rex (Labrador, 3 years old)
\`\`\`

## __repr__() - Developer/Debug String

\`__repr__()\` is called when you:
- Type an object in the Python interpreter (REPL)
- \`repr(object)\`
- A container (list, dict) prints the object

It should return a string that could **recreate the object** (or at least be unambiguous).

\`\`\`python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.breed = breed
        self.age = age

    def __repr__(self):
        return f"Dog(name={self.name!r}, breed={self.breed!r}, age={self.age})"

dog = Dog("Rex", "Labrador", 3)

print(repr(dog))   # Dog(name='Rex', breed='Labrador', age=3)

# In a list, __repr__ is used (not __str__)
dogs = [Dog("Rex", "Labrador", 3), Dog("Buddy", "Poodle", 5)]
print(dogs)
# [Dog(name='Rex', breed='Labrador', age=3), Dog(name='Buddy', breed='Poodle', age=5)]
\`\`\`

## Defining Both

Best practice is to define BOTH. If only one is defined:
- If only \`__repr__\` is defined: it is used as a fallback for \`__str__\` too
- If only \`__str__\` is defined: \`__repr__\` falls back to the default memory address

\`\`\`python
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def __str__(self):
        """Human-readable - for end users."""
        return f"{self.name}: \${self.price:.2f} (qty: {self.quantity})"

    def __repr__(self):
        """Developer-readable - for debugging."""
        return f"Product(name={self.name!r}, price={self.price}, quantity={self.quantity})"

p = Product("Laptop", 999.99, 5)

print(p)          # Laptop: $999.99 (qty: 5)   <- __str__
print(repr(p))    # Product(name='Laptop', price=999.99, quantity=5)  <- __repr__

# In a list: __repr__ is used
inventory = [Product("Laptop", 999.99, 5), Product("Mouse", 29.99, 20)]
print(inventory)
# [Product(name='Laptop', price=999.99, quantity=5), Product(name='Mouse', price=29.99, quantity=20)]
\`\`\`

## When is Each Called?

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p = Point(3, 4)

# __str__ is called here:
print(p)                    # (3, 4)
print(str(p))               # (3, 4)
print(f"Point: {p}")        # Point: (3, 4)
"Point: " + str(p)          # (3, 4)

# __repr__ is called here:
print(repr(p))              # Point(3, 4)
[p, Point(1, 2)]            # [Point(3, 4), Point(1, 2)]  <- in containers
{p: "origin"}               # uses __repr__ in dict display
\`\`\`

## The !r Formatting Trick

Using \`!r\` in f-strings calls \`repr()\` on the value, adding quotes around strings:

\`\`\`python
name = "Rex"
print(f"{name}")    # Rex   (no quotes)
print(f"{name!r}")  # 'Rex' (with quotes - from repr)

class Dog:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        # !r adds quotes around string values
        return f"Dog(name={self.name!r})"
        # Produces: Dog(name='Rex')  - not Dog(name=Rex)

dog = Dog("Rex")
print(repr(dog))   # Dog(name='Rex')
\`\`\`

## Practical Examples

### Bank Account

\`\`\`python
class BankAccount:
    def __init__(self, owner, account_num, balance):
        self.owner = owner
        self.account_num = account_num
        self.balance = balance

    def __str__(self):
        """For customers - friendly display."""
        return (f"Account: ****{self.account_num[-4:]}\\n"
                f"Owner: {self.owner}\\n"
                f"Balance: \${self.balance:,.2f}")

    def __repr__(self):
        """For developers - full details."""
        return (f"BankAccount(owner={self.owner!r}, "
                f"account_num={self.account_num!r}, "
                f"balance={self.balance})")

acc = BankAccount("Alice Johnson", "1234567890", 5420.50)

print(acc)
# Account: ****7890
# Owner: Alice Johnson
# Balance: $5,420.50

print(repr(acc))
# BankAccount(owner='Alice Johnson', account_num='1234567890', balance=5420.5)
\`\`\`

### Student Grade Report

\`\`\`python
class Student:
    def __init__(self, name, student_id, grades):
        self.name = name
        self.student_id = student_id
        self.grades = grades

    @property
    def average(self):
        return sum(self.grades.values()) / len(self.grades) if self.grades else 0

    @property
    def letter_grade(self):
        avg = self.average
        if avg >= 90: return "A"
        elif avg >= 80: return "B"
        elif avg >= 70: return "C"
        elif avg >= 60: return "D"
        return "F"

    def __str__(self):
        subjects = ", ".join(f"{k}: {v}" for k, v in self.grades.items())
        return (f"Student: {self.name} (ID: {self.student_id})\\n"
                f"Grades: {subjects}\\n"
                f"Average: {self.average:.1f} ({self.letter_grade})")

    def __repr__(self):
        return (f"Student(name={self.name!r}, "
                f"student_id={self.student_id!r}, "
                f"grades={self.grades!r})")

alice = Student(
    "Alice Johnson",
    "STU001",
    {"Math": 92, "Science": 88, "English": 95}
)

print(alice)
print()
print(repr(alice))
\`\`\`

Output:
\`\`\`
Student: Alice Johnson (ID: STU001)
Grades: Math: 92, Science: 88, English: 95
Average: 91.7 (A)

Student(name='Alice Johnson', student_id='STU001', grades={'Math': 92, 'Science': 88, 'English': 95})
\`\`\`

## Quick Reference

\`\`\`python
class MyClass:
    def __str__(self):
        # Called by: print(), str(), f"{obj}", str concat
        return "Human-friendly string for users"

    def __repr__(self):
        # Called by: repr(), interactive shell, inside containers
        return "Developer string, ideally: ClassName(args...)"

# Golden rule:
# __str__ = What a USER sees
# __repr__ = What a DEVELOPER sees for debugging
#
# If you only define one: define __repr__
# Python will use __repr__ as fallback for __str__
\`\`\`

> [!TIP]
> Always define at least \`__repr__\` - it makes debugging much easier. A good \`__repr__\` looks like \`ClassName(arg1=val1, arg2=val2)\` so you can see exactly what the object contains. Use \`!r\` in f-strings inside \`__repr__\` to automatically add quotes around string values.`,
  objectives: [
    "Implement __str__() to provide a human-readable string representation.",
    "Implement __repr__() to provide a developer-friendly debug representation.",
    "Understand when Python calls each method.",
    "Use the !r format specifier inside __repr__.",
    "Know that __repr__ is used as fallback when __str__ is not defined."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};