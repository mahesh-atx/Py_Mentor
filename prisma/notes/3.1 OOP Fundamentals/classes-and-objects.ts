export const classesAndObjectsLesson = {
  title: "Classes & Objects",
  slug: "classes-and-objects",
  content: `# Classes & Objects

A class is a blueprint that defines shared shape and behavior but occupies no memory until instantiated, and because every Python value — integers, strings, even functions — is itself an object, "object" is the default way Python represents *everything*. The pitfall is assuming that setting a class attribute on one instance changes it for everyone — in reality you usually create a separate instance attribute that merely shadows the shared one.

## Defining a Class

Use the \`class\` keyword followed by the class name and a colon. By convention, class names use **PascalCase** (each word capitalized, no underscores).

\`\`\`python
class Dog:
    pass   # 'pass' means empty body - valid empty class

class BankAccount:
    pass

class UserProfile:
    pass
\`\`\`

## A Class with Methods

Methods are functions defined inside a class:

\`\`\`python
class Dog:
    def bark(self):
        print("Woof!")

    def sit(self):
        print("*sits down*")

    def fetch(self):
        print("*fetches the ball*")
\`\`\`

## Creating Objects (Instantiation)

To create an object from a class, call the class like a function:

\`\`\`python
class Dog:
    def bark(self):
        print("Woof!")

# Create objects (instances) from the Dog class
dog1 = Dog()   # Create one Dog object
dog2 = Dog()   # Create another Dog object

print(dog1)    # <__main__.Dog object at 0x...>
print(dog2)    # <__main__.Dog object at 0x...>  (different memory address)

# Each object is independent
print(dog1 is dog2)   # False - different objects!
\`\`\`

## Calling Methods on Objects

Use dot notation to call methods on an object:

\`\`\`python
class Dog:
    def bark(self):
        print("Woof!")

    def sit(self):
        print("*sits down*")

dog1 = Dog()
dog2 = Dog()

dog1.bark()    # Output: Woof!
dog2.bark()    # Output: Woof!
dog1.sit()     # Output: *sits down*
\`\`\`

## Adding Data to Objects

You can add attributes (data) to objects:

\`\`\`python
class Dog:
    def bark(self):
        print(f"{self.name} says: Woof!")

dog1 = Dog()
dog1.name = "Rex"      # Add name attribute to dog1
dog1.breed = "Labrador"
dog1.age = 3

dog2 = Dog()
dog2.name = "Buddy"
dog2.breed = "Poodle"
dog2.age = 5

dog1.bark()   # Rex says: Woof!
dog2.bark()   # Buddy says: Woof!

print(dog1.name)    # Rex
print(dog2.breed)   # Poodle
\`\`\`

But this is messy. The proper way is to use an \`__init__\` constructor (covered next lesson).

## Class Attributes - Shared by All Objects

Attributes defined at the class level are shared by ALL instances:

\`\`\`python
class Dog:
    species = "Canis familiaris"   # Class attribute - shared by all dogs

    def bark(self):
        print("Woof!")

dog1 = Dog()
dog2 = Dog()
dog3 = Dog()

# All dogs share the same species
print(dog1.species)   # Canis familiaris
print(dog2.species)   # Canis familiaris
print(Dog.species)    # Can also access via class name

# If you change it on the class, it changes for all instances
Dog.species = "Canis lupus familiaris"
print(dog1.species)   # Canis lupus familiaris  (all changed!)
\`\`\`

## Everything in Python is an Object

Understanding that EVERYTHING in Python is an object helps you understand OOP deeply:

\`\`\`python
# Integers are objects
x = 42
print(type(x))         # <class 'int'>
print(x.bit_length())  # 6 (method on the int object)

# Strings are objects
s = "hello"
print(type(s))         # <class 'str'>
print(s.upper())       # HELLO (method on the string object)

# Lists are objects
lst = [1, 2, 3]
print(type(lst))       # <class 'list'>
lst.append(4)          # method on the list object

# Functions are objects!
def greet():
    pass

print(type(greet))     # <class 'function'>
print(greet.__name__)  # greet (attribute on the function object)
\`\`\`

## Checking Object Type and Instance

\`\`\`python
class Dog:
    pass

class Cat:
    pass

dog = Dog()
cat = Cat()

print(type(dog))            # <class '__main__.Dog'>
print(type(dog).__name__)   # Dog

print(isinstance(dog, Dog))   # True
print(isinstance(dog, Cat))   # False
print(isinstance(cat, Cat))   # True
\`\`\`

## Multiple Objects from One Class

\`\`\`python
class Circle:
    pi = 3.14159

    def area(self):
        return self.pi * self.radius ** 2

    def circumference(self):
        return 2 * self.pi * self.radius

c1 = Circle()
c1.radius = 5

c2 = Circle()
c2.radius = 10

c3 = Circle()
c3.radius = 1

print(f"Circle 1 area: {c1.area():.2f}")   # 78.54
print(f"Circle 2 area: {c2.area():.2f}")   # 314.16
print(f"Circle 3 area: {c3.area():.2f}")   # 3.14
\`\`\`

## Practical Example: Simple Contact Book

\`\`\`python
class Contact:
    total_contacts = 0    # Class variable - tracks total

    def greet(self):
        print(f"Hi, I'm {self.name} from {self.city}!")

    def call(self):
        print(f"Calling {self.name} at {self.phone}...")

    def email(self):
        print(f"Emailing {self.name} at {self.email_addr}...")

# Create contacts
alice = Contact()
alice.name = "Alice Johnson"
alice.phone = "555-1234"
alice.city = "London"
alice.email_addr = "alice@example.com"

bob = Contact()
bob.name = "Bob Smith"
bob.phone = "555-5678"
bob.city = "Paris"
bob.email_addr = "bob@example.com"

# Use them
alice.greet()   # Hi, I'm Alice Johnson from London!
bob.call()      # Calling Bob Smith at 555-5678...
alice.email()   # Emailing Alice Johnson at alice@example.com...
\`\`\`

> [!TIP]
> Class names should use PascalCase (e.g., \`BankAccount\`, \`UserProfile\`). Object/variable names should use snake_case (e.g., \`bank_account\`, \`user_profile\`). Each object is an independent instance - changing one does not affect others. Use class attributes for data shared by ALL instances.`,
  objectives: [
    "Define a class using the class keyword and PascalCase naming.",
    "Create multiple objects (instances) from a single class.",
    "Call methods on objects using dot notation.",
    "Understand the difference between class attributes and instance attributes.",
    "Use isinstance() and type() to inspect objects."
  ],
  difficulty: "beginner",
  xpReward: 55,
};