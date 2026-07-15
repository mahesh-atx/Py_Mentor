export const initAndSelfLesson = {
  title: "__init__() Constructor & self Keyword",
  slug: "init-and-self",
  content: `# __init__() Constructor & self Keyword

## The Theory — Building the Logic

\`__init__\` exists because an object must be given its required starting state at the moment of creation; without it, you bolt attributes on manually afterward and any forgotten step produces a broken object. The \`self\` parameter is the crux of how Python connects a method to its object: it is not magic but a plain reference to the specific instance, automatically supplied by Python when you call \`dog.bark()\`, which is really shorthand for \`Dog.bark(dog)\`. This is why every method lists \`self\` first even though you never pass it yourself, and why the same method code operates correctly on a thousand different objects. Thinking of \`self\` as "the object currently receiving this message" makes inheritance and shared behavior far easier to reason about. A common pitfall is forgetting that \`__init__\` is an *initializer*, not a constructor — Python already creates the empty object before \`__init__\` runs, so you are filling in state, not building the object from nothing.

## The Problem Without __init__

Without a constructor, you have to manually set attributes after creating an object - easy to forget and error-prone:

\`\`\`python
class Dog:
    def bark(self):
        print(f"{self.name} says Woof!")

dog = Dog()
# Must manually set EVERY attribute - what if you forget one?
dog.name = "Rex"
dog.bark()   # Works

dog2 = Dog()
# Forgot to set name!
dog2.bark()   # AttributeError: 'Dog' object has no attribute 'name'
\`\`\`

## The __init__() Constructor

\`__init__()\` is automatically called when you create a new object. It **initializes** (sets up) the object's attributes. It is called the **constructor** or **initializer**.

\`\`\`python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name     # Set the name attribute
        self.breed = breed   # Set the breed attribute
        self.age = age       # Set the age attribute

    def bark(self):
        print(f"{self.name} says Woof!")

    def info(self):
        print(f"{self.name} is a {self.age}-year-old {self.breed}")

# Now creating an object REQUIRES the arguments
dog1 = Dog("Rex", "Labrador", 3)
dog2 = Dog("Buddy", "Poodle", 5)

dog1.bark()   # Rex says Woof!
dog2.info()   # Buddy is a 5-year-old Poodle
\`\`\`

## How __init__ is Called

When you write \`Dog("Rex", "Labrador", 3)\`, Python does this automatically:

\`\`\`
1. Create a new empty Dog object
2. Call Dog.__init__(new_object, "Rex", "Labrador", 3)
3. Return the initialized object
\`\`\`

\`\`\`python
class Dog:
    def __init__(self, name, breed, age):
        print(f"Creating a new Dog named {name}!")
        self.name = name
        self.breed = breed
        self.age = age
        print(f"Dog created successfully!")

dog = Dog("Rex", "Labrador", 3)
# Output:
# Creating a new Dog named Rex!
# Dog created successfully!
\`\`\`

## The self Keyword

\`self\` refers to the **specific object** that the method is being called on. It is always the first parameter of every method in a class, but you never pass it manually - Python does it automatically.

\`\`\`python
class Counter:
    def __init__(self):
        self.count = 0    # self.count belongs to THIS specific object

    def increment(self):
        self.count += 1   # Modifies THIS object's count

    def get_count(self):
        return self.count  # Returns THIS object's count

# Create two independent counters
c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()
c1.increment()

c2.increment()

print(c1.get_count())   # 3  (c1's count)
print(c2.get_count())   # 1  (c2's count - completely independent!)
\`\`\`

### What self Actually Is

\`self\` is just a reference to the object itself. When you call \`c1.increment()\`, Python translates this to \`Counter.increment(c1)\`:

\`\`\`python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} says Woof!")

rex = Dog("Rex")

# These two lines are EQUIVALENT:
rex.bark()              # Python way
Dog.bark(rex)           # Manual way (same thing!)

# Output: Rex says Woof!  (both)
\`\`\`

### self is Just a Convention

You could name it anything (but NEVER do this in real code):

\`\`\`python
class Dog:
    def __init__(this_dog, name):   # Could use any name
        this_dog.name = name        # But this is confusing!

    def bark(me):                   # Please don't do this
        print(f"{me.name}: Woof!")

# Always use 'self' - it's universal convention
\`\`\`

## Default Values in __init__

\`\`\`python
class Student:
    def __init__(self, name, age, score=0, grade="Not set"):
        self.name = name
        self.age = age
        self.score = score
        self.grade = grade

# Provide all arguments
s1 = Student("Alice", 20, 88, "B")

# Use defaults for score and grade
s2 = Student("Bob", 22)

# Override only some defaults
s3 = Student("Charlie", 21, score=95)

print(s1.score)    # 88
print(s2.score)    # 0      (default)
print(s2.grade)    # Not set (default)
print(s3.score)    # 95
\`\`\`

## __init__ with Computed Attributes

You can compute attributes in \`__init__\` from the provided arguments:

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height          # Computed
        self.perimeter = 2 * (width + height)  # Computed

    def describe(self):
        print(f"Rectangle {self.width}x{self.height}")
        print(f"  Area: {self.area}")
        print(f"  Perimeter: {self.perimeter}")

r = Rectangle(5, 3)
r.describe()
# Rectangle 5x3
# Area: 15
# Perimeter: 16
\`\`\`

## __init__ with Validation

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        if not owner or not isinstance(owner, str):
            raise ValueError("Owner must be a non-empty string")
        if balance < 0:
            raise ValueError("Initial balance cannot be negative")

        self.owner = owner.strip().title()
        self.balance = balance
        self.transactions = []   # Empty list for transaction history

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        self.transactions.append(f"Deposited \${amount:.2f}")

    def get_balance(self):
        return self.balance

# Valid creation
acc = BankAccount("alice", 1000)
print(acc.owner)     # Alice  (title-cased)
print(acc.balance)   # 1000

# Invalid creation - raises ValueError
try:
    bad_acc = BankAccount("", -500)
except ValueError as e:
    print(f"Error: {e}")
# Error: Owner must be a non-empty string
\`\`\`

## Practical Example: Complete Student Class

\`\`\`python
class Student:
    def __init__(self, name, student_id, age):
        # Validate inputs
        if not name:
            raise ValueError("Name cannot be empty")
        if age < 16 or age > 100:
            raise ValueError("Age must be between 16 and 100")

        # Set attributes
        self.name = name.strip().title()
        self.student_id = student_id
        self.age = age
        self.courses = []        # Empty list - added later
        self.grades = {}         # Empty dict - added later
        self.is_active = True

    def enroll(self, course):
        if course not in self.courses:
            self.courses.append(course)
            self.grades[course] = None   # No grade yet
            print(f"{self.name} enrolled in {course}")

    def add_grade(self, course, score):
        if course not in self.courses:
            print(f"{self.name} is not enrolled in {course}")
            return
        self.grades[course] = score

    def get_gpa(self):
        scores = [s for s in self.grades.values() if s is not None]
        if not scores:
            return 0.0
        return sum(scores) / len(scores)

    def summary(self):
        print(f"\\n=== Student Profile ===")
        print(f"Name    : {self.name}")
        print(f"ID      : {self.student_id}")
        print(f"Age     : {self.age}")
        print(f"Courses : {self.courses}")
        print(f"GPA     : {self.get_gpa():.1f}")

# Use it
alice = Student("alice johnson", "STU001", 20)
alice.enroll("Python")
alice.enroll("Math")
alice.enroll("English")
alice.add_grade("Python", 92)
alice.add_grade("Math", 85)
alice.add_grade("English", 88)
alice.summary()
\`\`\`

Output:
\`\`\`
Alice Johnson enrolled in Python
Alice Johnson enrolled in Math
Alice Johnson enrolled in English

=== Student Profile ===
Name    : Alice Johnson
ID      : STU001
Age     : 20
Courses : ['Python', 'Math', 'English']
GPA     : 88.3
\`\`\`

> [!TIP]
> \`__init__\` is not technically a "constructor" (Python creates the object before \`__init__\` is called) but think of it as the constructor because it initializes the object. Always use \`self\` as the first parameter - it is a universal Python convention that every developer expects. Use \`__init__\` for validation and setting initial state.`,
  objectives: [
    "Understand what __init__() does and when it is called.",
    "Use self to reference the current object's attributes and methods.",
    "Set instance attributes in __init__().",
    "Provide default values for __init__ parameters.",
    "Add validation logic inside __init__()."
  ],
  difficulty: "beginner",
  xpReward: 60,
};