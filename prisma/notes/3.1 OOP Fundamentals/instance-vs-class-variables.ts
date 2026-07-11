export const instanceVsClassVariablesLesson = {
  title: "Instance Variables vs Class Variables",
  slug: "instance-vs-class-variables",
  content: `# Instance Variables vs Class Variables

## Instance Variables

**Instance variables** are unique to each object. They are defined using \`self\` inside \`__init__()\` or other methods. Each object gets its OWN copy.

\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name     # Instance variable - unique to each dog
        self.breed = breed   # Instance variable - unique to each dog

dog1 = Dog("Rex", "Labrador")
dog2 = Dog("Buddy", "Poodle")

print(dog1.name)    # Rex
print(dog2.name)    # Buddy  (different! Each dog has its own name)
\`\`\`

Think of instance variables as each person having their own name, age, and height.

## Class Variables

**Class variables** are shared across ALL instances of the class. Defined at the class level (not inside any method).

\`\`\`python
class Dog:
    species = "Canis familiaris"   # Class variable - shared by ALL dogs
    total_dogs = 0                  # Class variable - counts all dogs

    def __init__(self, name, breed):
        self.name = name    # Instance variable
        self.breed = breed  # Instance variable
        Dog.total_dogs += 1 # Increment shared counter

dog1 = Dog("Rex", "Labrador")
dog2 = Dog("Buddy", "Poodle")
dog3 = Dog("Max", "Beagle")

# Access class variable - same for all
print(dog1.species)     # Canis familiaris
print(dog2.species)     # Canis familiaris
print(Dog.species)      # Canis familiaris (best way to access)

print(Dog.total_dogs)   # 3 (all dogs share this counter)
\`\`\`

## Side-by-Side Comparison

\`\`\`python
class Car:
    # Class variables - SHARED by all cars
    wheels = 4
    total_cars_made = 0

    def __init__(self, make, model, color):
        # Instance variables - UNIQUE to each car
        self.make = make
        self.model = model
        self.color = color
        self.speed = 0              # Each car has its own speed
        Car.total_cars_made += 1   # All cars share this count

car1 = Car("Toyota", "Corolla", "Red")
car2 = Car("Honda", "Civic", "Blue")

# Instance variables - different for each car
print(car1.make, car1.color)   # Toyota Red
print(car2.make, car2.color)   # Honda Blue

# Class variables - same for all cars
print(car1.wheels)             # 4
print(car2.wheels)             # 4
print(Car.wheels)              # 4

# Class variable tracking instances
print(Car.total_cars_made)     # 2
\`\`\`

## The Tricky Part: Instance Variables Shadow Class Variables

When you set an attribute on an **instance** with the same name as a class variable, it creates a NEW instance variable that shadows (hides) the class variable for that object only:

\`\`\`python
class Dog:
    species = "Canis familiaris"

dog1 = Dog()
dog2 = Dog()

# Both access the class variable
print(dog1.species)   # Canis familiaris
print(dog2.species)   # Canis familiaris

# Set on the INSTANCE - creates instance variable that shadows class variable
dog1.species = "Canis lupus"   # Creates dog1-specific instance variable

print(dog1.species)   # Canis lupus    (instance variable shadows class var)
print(dog2.species)   # Canis familiaris  (class variable, unchanged)
print(Dog.species)    # Canis familiaris  (class variable, unchanged)

# dog1 now has BOTH a class variable AND an instance variable named 'species'
print(dog1.__dict__)  # {'species': 'Canis lupus'}  (instance's own dict)
print(Dog.__dict__['species'])  # 'Canis familiaris'  (class dict)
\`\`\`

## Mutable Class Variables - A Common Pitfall

\`\`\`python
# DANGEROUS - mutable class variable shared by all instances
class Student:
    # This list is SHARED by all students!
    grades = []

    def __init__(self, name):
        self.name = name

    def add_grade(self, grade):
        self.grades.append(grade)   # Adds to the SHARED list!

s1 = Student("Alice")
s2 = Student("Bob")

s1.add_grade(88)
s2.add_grade(72)

print(s1.grades)   # [88, 72]  - Bob's grade shows up in Alice's!
print(s2.grades)   # [88, 72]  - Same list!

# CORRECT - use instance variable for mutable data
class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []   # Each student gets their OWN empty list

    def add_grade(self, grade):
        self.grades.append(grade)

s1 = Student("Alice")
s2 = Student("Bob")

s1.add_grade(88)
s2.add_grade(72)

print(s1.grades)   # [88]   (Alice's grades only)
print(s2.grades)   # [72]   (Bob's grades only)
\`\`\`

> [!IMPORTANT]
> Never use mutable objects (lists, dicts) as class variables if each instance needs its own copy. Always initialize mutable instance data inside \`__init__\`.

## When to Use Class Variables

\`\`\`python
class BankAccount:
    # Good uses of class variables:
    interest_rate = 0.05      # Same policy for all accounts
    bank_name = "PyBank"      # Same for all accounts
    total_accounts = 0        # Counter for all accounts
    MINIMUM_BALANCE = 100     # Constant - minimum balance rule

    def __init__(self, owner, balance=0):
        # Instance variables - unique per account:
        self.owner = owner
        self.balance = balance
        self.account_number = BankAccount.total_accounts + 1
        BankAccount.total_accounts += 1

    def apply_interest(self):
        self.balance *= (1 + BankAccount.interest_rate)

    @classmethod
    def change_interest_rate(cls, new_rate):
        cls.interest_rate = new_rate   # Changes for ALL accounts

acc1 = BankAccount("Alice", 1000)
acc2 = BankAccount("Bob", 2000)
acc3 = BankAccount("Charlie", 500)

print(f"Total accounts: {BankAccount.total_accounts}")   # 3
print(f"Interest rate: {BankAccount.interest_rate}")     # 0.05

acc1.apply_interest()
print(f"Alice's balance: {acc1.balance:.2f}")   # 1050.00

# Change interest rate for ALL accounts
BankAccount.change_interest_rate(0.07)
acc2.apply_interest()
print(f"Bob's balance: {acc2.balance:.2f}")     # 2140.00  (uses new 7% rate)
\`\`\`

## Inspecting Variables

\`\`\`python
class Demo:
    class_var = "I am a class variable"

    def __init__(self, value):
        self.instance_var = value

obj = Demo("I am an instance variable")

# Object's own dict (instance variables only)
print(obj.__dict__)
# {'instance_var': 'I am an instance variable'}

# Class dict (class variables and methods)
print(Demo.__dict__.keys())
# dict_keys(['__module__', 'class_var', '__init__', '__dict__', ...])

# vars() is same as __dict__
print(vars(obj))   # {'instance_var': 'I am an instance variable'}
\`\`\`

## Summary

\`\`\`
                    Instance Variable    Class Variable
Defined in          __init__ (with self)  Class body (no self)
Accessed via        self.variable         ClassName.variable or self.variable
Shared?             No - unique per obj   Yes - shared by all instances
Typical use         Name, age, balance    Constants, counters, config
Mutable (list/dict) Safe - own copy       DANGEROUS - shared copy!
\`\`\`

> [!TIP]
> Use class variables for: constants (like minimum balance), counters (like total instances created), configuration shared by all instances. Use instance variables for everything else - especially any data that differs between instances. When in doubt, use instance variables.`,
  objectives: [
    "Understand that instance variables are unique to each object.",
    "Understand that class variables are shared across all instances.",
    "Know how instance variables can shadow class variables.",
    "Avoid the common pitfall of mutable class variables.",
    "Use class variables appropriately for constants and shared state."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};