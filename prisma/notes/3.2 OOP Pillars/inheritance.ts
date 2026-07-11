export const inheritanceLesson = {
  title: "Inheritance",
  slug: "inheritance",
  content: `# Inheritance

## What is Inheritance?

**Inheritance** allows a class (child/subclass) to **inherit** attributes and methods from another class (parent/superclass). The child class gets everything the parent has, and can add more or change what it inherits.

Think of it like real inheritance: a child inherits traits from their parents but is still their own person with unique qualities.

\`\`\`python
# Without inheritance - repetitive code
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def eat(self):
        print(f"{self.name} is eating.")
    def sleep(self):
        print(f"{self.name} is sleeping.")
    def bark(self):
        print(f"{self.name} says: Woof!")

class Cat:
    def __init__(self, name, age):
        self.name = name    # Repeated!
        self.age = age      # Repeated!
    def eat(self):          # Repeated!
        print(f"{self.name} is eating.")
    def sleep(self):        # Repeated!
        print(f"{self.name} is sleeping.")
    def meow(self):
        print(f"{self.name} says: Meow!")

# With inheritance - clean and DRY
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def eat(self):
        print(f"{self.name} is eating.")

    def sleep(self):
        print(f"{self.name} is sleeping.")

class Dog(Animal):    # Dog inherits from Animal
    def bark(self):
        print(f"{self.name} says: Woof!")

class Cat(Animal):    # Cat inherits from Animal
    def meow(self):
        print(f"{self.name} says: Meow!")
\`\`\`

---

## Single Inheritance

A child class inherits from **one** parent class. This is the most common and simplest form.

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        return "..."

    def describe(self):
        return f"{self.name} is {self.age} years old"

class Dog(Animal):
    def speak(self):           # Override parent's speak()
        return "Woof!"

    def fetch(self):           # New method unique to Dog
        return f"{self.name} fetches the ball!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

    def purr(self):
        return f"{self.name} is purring..."

# Create instances
dog = Dog("Rex", 3)
cat = Cat("Whiskers", 5)

# Inherited methods work
print(dog.describe())     # Rex is 3 years old
print(cat.describe())     # Whiskers is 5 years old

# Overridden methods
print(dog.speak())        # Woof!
print(cat.speak())        # Meow!

# Own methods
print(dog.fetch())        # Rex fetches the ball!
print(cat.purr())         # Whiskers is purring...

# isinstance checks
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True - Dog IS-A Animal
print(isinstance(cat, Dog))     # False
\`\`\`

---

## Multilevel Inheritance

A class inherits from a class that itself inherits from another class. Like grandparent → parent → child.

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def breathe(self):
        return f"{self.name} is breathing."

class Mammal(Animal):         # Mammal inherits Animal
    def feed_young(self):
        return f"{self.name} feeds its young with milk."

class Dog(Mammal):            # Dog inherits Mammal (which inherits Animal)
    def bark(self):
        return f"{self.name} says: Woof!"

rex = Dog("Rex")

# Access methods from ALL levels
print(rex.breathe())      # From Animal:  Rex is breathing.
print(rex.feed_young())   # From Mammal:  Rex feeds its young with milk.
print(rex.bark())         # From Dog:     Rex says: Woof!

# Check inheritance chain
print(isinstance(rex, Dog))     # True
print(isinstance(rex, Mammal))  # True
print(isinstance(rex, Animal))  # True
\`\`\`

\`\`\`python
# Real-world multilevel: Employee hierarchy
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"I'm {self.name}, age {self.age}"

class Employee(Person):
    def __init__(self, name, age, employee_id, department):
        super().__init__(name, age)
        self.employee_id = employee_id
        self.department = department

    def work(self):
        return f"{self.name} is working in {self.department}"

class Manager(Employee):
    def __init__(self, name, age, employee_id, department, team_size):
        super().__init__(name, age, employee_id, department)
        self.team_size = team_size

    def manage(self):
        return f"{self.name} manages a team of {self.team_size}"

manager = Manager("Alice", 35, "MGR001", "Engineering", 10)
print(manager.introduce())  # From Person
print(manager.work())       # From Employee
print(manager.manage())     # From Manager
\`\`\`

---

## Hierarchical Inheritance

Multiple child classes inherit from the **same single parent**.

\`\`\`python
class Shape:
    def __init__(self, color="black"):
        self.color = color

    def describe(self):
        return f"A {self.color} shape"

    def area(self):
        return 0

class Circle(Shape):
    def __init__(self, radius, color="black"):
        super().__init__(color)
        self.radius = radius

    def area(self):
        import math
        return round(math.pi * self.radius ** 2, 2)

    def describe(self):
        return f"A {self.color} circle with radius {self.radius}"

class Rectangle(Shape):
    def __init__(self, width, height, color="black"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def describe(self):
        return f"A {self.color} rectangle {self.width}x{self.height}"

class Triangle(Shape):
    def __init__(self, base, height, color="black"):
        super().__init__(color)
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

shapes = [
    Circle(5, "red"),
    Rectangle(4, 6, "blue"),
    Triangle(3, 8, "green")
]

for shape in shapes:
    print(f"{shape.describe()} -> Area: {shape.area()}")
\`\`\`

Output:
\`\`\`
A red circle with radius 5 -> Area: 78.54
A blue rectangle 4x6 -> Area: 24
A green triangle -> Area: 12.0
\`\`\`

---

## Multiple Inheritance

A class inherits from **two or more parent classes**.

\`\`\`python
class Flyable:
    def fly(self):
        return f"{self.name} is flying!"

    def land(self):
        return f"{self.name} has landed."

class Swimmable:
    def swim(self):
        return f"{self.name} is swimming!"

    def dive(self):
        return f"{self.name} dives underwater."

class Duck(Flyable, Swimmable):  # Inherits from BOTH
    def __init__(self, name):
        self.name = name

    def quack(self):
        return f"{self.name} says: Quack!"

donald = Duck("Donald")
print(donald.fly())     # Donald is flying!
print(donald.swim())    # Donald is swimming!
print(donald.quack())   # Donald says: Quack!
print(donald.dive())    # Donald dives underwater.
\`\`\`

\`\`\`python
# More practical: Mixins - common pattern in Python
class LoggingMixin:
    """Add logging to any class."""
    def log(self, message):
        print(f"[LOG] {self.__class__.__name__}: {message}")

class ValidationMixin:
    """Add validation to any class."""
    def validate_positive(self, value, name):
        if value <= 0:
            raise ValueError(f"{name} must be positive, got {value}")
        return True

class BankAccount(LoggingMixin, ValidationMixin):
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.validate_positive(amount, "Deposit amount")
        self.balance += amount
        self.log(f"Deposited \${amount}. New balance: \${self.balance}")

    def withdraw(self, amount):
        self.validate_positive(amount, "Withdrawal amount")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.log(f"Withdrew \${amount}. New balance: \${self.balance}")

acc = BankAccount("Alice", 1000)
acc.deposit(500)
acc.withdraw(200)
\`\`\`

Output:
\`\`\`
[LOG] BankAccount: Deposited $500. New balance: $1500
[LOG] BankAccount: Withdrew $200. New balance: $1300
\`\`\`

---

## Hybrid Inheritance

A combination of multiple inheritance types.

\`\`\`python
class Vehicle:
    def __init__(self, speed):
        self.speed = speed

    def move(self):
        return f"Moving at {self.speed} km/h"

class Car(Vehicle):
    def drive(self):
        return "Driving on road"

class Boat(Vehicle):
    def sail(self):
        return "Sailing on water"

class AmphibiousVehicle(Car, Boat):  # Inherits from Car AND Boat
    def __init__(self, speed):
        super().__init__(speed)

    def describe(self):
        return f"Can {self.drive()} and {self.sail()}"

amphibious = AmphibiousVehicle(60)
print(amphibious.move())      # Moving at 60 km/h
print(amphibious.drive())     # Driving on road
print(amphibious.sail())      # Sailing on water
print(amphibious.describe())  # Can Driving on road and Sailing on water
\`\`\`

---

## super() Function

\`super()\` calls a method from the **parent class**. It is essential when overriding \`__init__\` to ensure the parent is properly set up.

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Animal.__init__ called for {name}")

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Call Animal's __init__ first!
        self.breed = breed            # Then add Dog-specific attributes
        print(f"Dog.__init__ called for {name}")

rex = Dog("Rex", 3, "Labrador")
print(rex.name)    # Rex   (set by Animal.__init__)
print(rex.age)     # 3     (set by Animal.__init__)
print(rex.breed)   # Labrador (set by Dog.__init__)
\`\`\`

### What happens WITHOUT super()

\`\`\`python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Dog(Animal):
    def __init__(self, name, age, breed):
        # FORGOT super().__init__()
        self.breed = breed

rex = Dog("Rex", 3, "Labrador")
# print(rex.name)   # AttributeError! name was never set
print(rex.breed)    # Labrador (this works)
\`\`\`

### super() in Method Overriding

\`\`\`python
class Employee:
    def describe(self):
        return f"Employee: {self.name}, Dept: {self.department}"

class Manager(Employee):
    def describe(self):
        # Call parent's describe() and ADD to it
        base = super().describe()
        return f"{base}, Team size: {self.team_size}"

\`\`\`

### super() with Multiple Inheritance

\`\`\`python
class A:
    def hello(self):
        return "Hello from A"

class B(A):
    def hello(self):
        return super().hello() + " and B"

class C(A):
    def hello(self):
        return super().hello() + " and C"

class D(B, C):    # Inherits from B and C
    def hello(self):
        return super().hello() + " and D"

d = D()
print(d.hello())
# Hello from A and C and B and D  <- MRO determines order!
\`\`\`

---

## Method Resolution Order (MRO)

When a method is called, Python uses the **MRO** to determine which class's version to use. It follows the **C3 Linearization** algorithm - roughly: left to right, depth first, no duplicates.

\`\`\`python
class A:
    def hello(self):
        return "A"

class B(A):
    def hello(self):
        return "B"

class C(A):
    def hello(self):
        return "C"

class D(B, C):
    pass

d = D()
print(d.hello())   # B  <- B is checked before C

# See the full MRO
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

# Or as a list
print([cls.__name__ for cls in D.__mro__])
# ['D', 'B', 'C', 'A', 'object']

# mro() method
print(D.mro())
\`\`\`

### MRO in Action - super() follows MRO

\`\`\`python
class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return f"B->{super().greet()}"

class C(A):
    def greet(self):
        return f"C->{super().greet()}"

class D(B, C):
    def greet(self):
        return f"D->{super().greet()}"

d = D()
print(d.greet())   # D->B->C->A
# MRO: D -> B -> C -> A -> object
# super() in D calls B
# super() in B calls C  (not A! follows MRO)
# super() in C calls A
\`\`\`

### Understanding MRO Rules

\`\`\`python
# MRO is resolved left-to-right for multiple parents
class X: pass
class Y: pass
class A(X, Y): pass   # A's MRO includes X before Y
class B(Y, X): pass   # B's MRO includes Y before X

print([c.__name__ for c in A.__mro__])  # ['A', 'X', 'Y', 'object']
print([c.__name__ for c in B.__mro__])  # ['B', 'Y', 'X', 'object']

# Conflicting MRO raises TypeError
class C(A, B): pass   # TypeError! Cannot create consistent MRO
\`\`\`

## Practical Example: Complete Inheritance Hierarchy

\`\`\`python
class Person:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

    def __str__(self):
        return f"{self.name} (age {self.age})"

    def introduce(self):
        return f"I'm {self.name}"

class Employee(Person):
    total_employees = 0

    def __init__(self, name, age, email, employee_id, salary):
        super().__init__(name, age, email)
        self.employee_id = employee_id
        self.salary = salary
        Employee.total_employees += 1

    def give_raise(self, percent):
        self.salary *= (1 + percent / 100)
        return self.salary

    def __str__(self):
        return f"{super().__str__()} | ID: {self.employee_id} | \${self.salary:,.0f}"

class Manager(Employee):
    def __init__(self, name, age, email, employee_id, salary, team):
        super().__init__(name, age, email, employee_id, salary)
        self.team = team    # List of Employee objects

    def add_team_member(self, employee):
        self.team.append(employee)

    def give_team_raise(self, percent):
        for member in self.team:
            member.give_raise(percent)

    def team_summary(self):
        print(f"\\n{self.name}'s Team ({len(self.team)} members):")
        for member in self.team:
            print(f"  {member}")

e1 = Employee("Bob", 28, "bob@company.com", "EMP001", 75000)
e2 = Employee("Charlie", 32, "charlie@company.com", "EMP002", 80000)
manager = Manager("Alice", 38, "alice@company.com", "MGR001", 120000, [])

manager.add_team_member(e1)
manager.add_team_member(e2)
manager.team_summary()

manager.give_team_raise(10)   # Give whole team a 10% raise
print("\\nAfter team raise:")
manager.team_summary()
\`\`\`

Output:
\`\`\`
Alice's Team (2 members):
  Bob (age 28) | ID: EMP001 | $75,000
  Charlie (age 32) | ID: EMP002 | $80,000

After team raise:
Alice's Team (2 members):
  Bob (age 28) | ID: EMP001 | $82,500
  Charlie (age 32) | ID: EMP002 | $88,000
\`\`\`

> [!TIP]
> Always call \`super().__init__()\` in child class \`__init__\` to ensure the parent is properly initialized. Use \`ClassName.__mro__\` or \`ClassName.mro()\` to see the method resolution order. For multiple inheritance, use mixins (classes that add specific behavior) rather than deep class hierarchies.`,
  objectives: [
    "Implement single, multilevel, hierarchical, multiple, and hybrid inheritance.",
    "Use super() to call parent class methods and __init__.",
    "Understand and read the Method Resolution Order (MRO).",
    "Know when to use each type of inheritance.",
    "Apply mixins for adding reusable behavior to classes."
  ],
  difficulty: "intermediate",
  xpReward: 80,
};