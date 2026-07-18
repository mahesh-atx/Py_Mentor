export const oopIntroductionLesson = {
  title: "What is OOP & Why Use It",
  slug: "oop-introduction",
  content: `# What is OOP & Why Use It

Object-oriented programming bundles state and behavior together so the logic for some data lives right beside that data instead of in faraway functions, letting you model a program around the "things" in your domain. The pitfall is forcing OOP onto a tiny script where a few plain functions would be clearer — OOP pays off when you have many instances of related things and behavior that must evolve over time.

## The Problem OOP Solves

Imagine you are building a student management system. Without OOP, you might store student data in separate variables and functions:

\`\`\`python
# Without OOP - messy and hard to manage
student1_name = "Alice"
student1_age = 20
student1_score = 88

student2_name = "Bob"
student2_age = 22
student2_score = 72

def get_grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    else: return "F"

def print_student(name, age, score):
    print(f"{name} (age {age}): {score} - {get_grade(score)}")

print_student(student1_name, student1_age, student1_score)
print_student(student2_name, student2_age, student2_score)
\`\`\`

This becomes unmanageable with 100 students. The data and the functions that work on that data are separate and not connected.

## What is OOP?

**Object-Oriented Programming (OOP)** is a way of organizing code where you group related **data** and **functions** together into a single unit called a **class**. Instances of classes are called **objects**.

\`\`\`
Class = Blueprint/Template
Object = An instance built from the blueprint
\`\`\`

Think of it like this:
- A **class** is like an architectural blueprint for a house
- An **object** is an actual house built from that blueprint
- You can build many houses (objects) from one blueprint (class)

\`\`\`python
# With OOP - clean and organized
class Student:
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score

    def get_grade(self):
        if self.score >= 90: return "A"
        elif self.score >= 80: return "B"
        elif self.score >= 70: return "C"
        else: return "F"

    def display(self):
        print(f"{self.name} (age {self.age}): {self.score} - {self.get_grade()}")

# Create objects from the class
student1 = Student("Alice", 20, 88)
student2 = Student("Bob", 22, 72)

student1.display()    # Alice (age 20): 88 - B
student2.display()    # Bob (age 22): 72 - C
\`\`\`

## The Four Pillars of OOP

\`\`\`
1. Encapsulation  - Bundle data + methods, hide internal details
2. Inheritance    - Child classes inherit from parent classes
3. Polymorphism   - Different objects respond to the same interface
4. Abstraction    - Hide complex implementation, show simple interface
\`\`\`

We cover encapsulation in this module. The rest are covered in the Advanced OOP module.

## Why Use OOP?

### 1. Organization - Related things stay together

\`\`\`python
# Everything about a BankAccount is IN the BankAccount class
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False

    def get_balance(self):
        return self.balance

# Easy to use - all methods are on the object
account = BankAccount("Alice", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())   # 1300
\`\`\`

### 2. Reusability - Build once, use many times

\`\`\`python
# Define once
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# Create many different rectangles
r1 = Rectangle(5, 3)
r2 = Rectangle(10, 7)
r3 = Rectangle(100, 50)

print(r1.area())      # 15
print(r2.area())      # 70
print(r3.area())      # 5000
\`\`\`

### 3. Modeling Real-World Concepts

OOP maps naturally to real-world thinking:

\`\`\`python
# Real-world objects have:
# - Attributes (data about the object)
# - Behaviors (what the object can do)

class Car:
    # Attributes: make, model, speed, fuel
    def __init__(self, make, model):
        self.make = make
        self.model = model
        self.speed = 0
        self.fuel = 100

    # Behaviors: accelerate, brake, refuel
    def accelerate(self, amount):
        self.speed += amount
        self.fuel -= amount * 0.5

    def brake(self, amount):
        self.speed = max(0, self.speed - amount)

    def status(self):
        print(f"{self.make} {self.model}: {self.speed} km/h, {self.fuel:.0f}% fuel")

my_car = Car("Toyota", "Corolla")
my_car.accelerate(60)
my_car.accelerate(20)
my_car.brake(30)
my_car.status()   # Toyota Corolla: 50 km/h, 60% fuel
\`\`\`

### 4. Maintainability - Easy to update and fix

\`\`\`python
# To change how grades work, you only update ONE place:
class Student:
    def get_grade(self):
        # Changed grading scale - only update here, works everywhere
        if self.score >= 93: return "A"
        elif self.score >= 90: return "A-"
        elif self.score >= 87: return "B+"
        elif self.score >= 83: return "B"
        # ... etc
\`\`\`

### 5. Scalability - OOP programs are easier to grow

\`\`\`python
# Start simple
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

# Add more animals later without breaking anything
class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

animals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")
\`\`\`

## OOP in Real Projects

Almost every major Python library uses OOP:

\`\`\`python
# Django web framework - models are classes
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

# SQLAlchemy database ORM
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Tkinter GUI
class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("My App")

# Even exceptions are classes!
try:
    x = 1 / 0
except ZeroDivisionError as e:   # ZeroDivisionError is a class
    print(type(e))               # <class 'ZeroDivisionError'>
\`\`\`

> [!TIP]
> OOP is not always the best approach for every problem. Simple scripts and functional programming work great for many tasks. Use OOP when you have complex data with associated behaviors, multiple instances of the same type of thing, or code that needs to grow and be maintained over time.`,
  objectives: [
    "Understand what Object-Oriented Programming is and the problem it solves.",
    "Know the relationship between classes (blueprints) and objects (instances).",
    "Understand the four pillars of OOP: encapsulation, inheritance, polymorphism, abstraction.",
    "Know why OOP makes code more organized, reusable, and maintainable.",
    "Recognize OOP in real-world Python libraries and frameworks."
  ],
  difficulty: "beginner",
  xpReward: 50,
};