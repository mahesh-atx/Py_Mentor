export const polymorphismLesson = {
  title: "Polymorphism",
  slug: "polymorphism",
  content: `# Polymorphism

Polymorphism lets one piece of code operate correctly on many different types because each supplies its own meaning for the same operation, resolved by *late binding* at runtime — so a loop over \`Dog\`, \`Cat\`, and \`Robot\` can call the same method and get different results. The pitfall is assuming polymorphism requires a shared parent class; in Python it usually does not, since the only requirement is that the objects respond to the same message.

## What is Polymorphism?

**Polymorphism** means "many forms". In OOP, it means the same method name works differently depending on the object it is called on. One interface, many implementations.

\`\`\`python
# Same method name 'speak' - different behavior for each animal
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# Polymorphism in action - same code works for all types
animals = [Dog(), Cat(), Duck()]
for animal in animals:
    print(animal.speak())   # Each animal responds in its own way
# Woof!
# Meow!
# Quack!
\`\`\`

---

## Method Overriding

**Method overriding** is when a child class provides its own implementation of a method inherited from the parent. This is the core of polymorphism with inheritance.

\`\`\`python
class Shape:
    def area(self):
        return 0

    def describe(self):
        return f"I am a shape with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):              # Override parent's area()
        import math
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.width = w
        self.height = h

    def area(self):              # Override parent's area()
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):              # Override parent's area()
        return 0.5 * self.base * self.height

# Polymorphic behavior - describe() calls area() but gets different results
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    print(shape.describe())
    # Uses the CORRECT area() for each shape type
\`\`\`

Output:
\`\`\`
I am a shape with area 78.54
I am a shape with area 24.00
I am a shape with area 12.00
\`\`\`

### Rules for Method Overriding

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def move(self):
        return f"{self.name} is moving"

class Dog(Animal):
    # Override - must have same name
    def speak(self):
        return f"{self.name} says: Woof!"

    # Can extend (call parent + add own behavior)
    def move(self):
        base = super().move()   # Get parent's result
        return f"{base} by running"

dog = Dog("Rex")
print(dog.speak())   # Rex says: Woof!
print(dog.move())    # Rex is moving by running
\`\`\`

---

## Operator Overloading (Dunder/Magic Methods)

**Operator overloading** lets you define what operators like \`+\`, \`-\`, \`*\`, \`<\`, \`>\`, \`==\` do for your custom classes.

Python calls these automatically when you use operators. They have the form \`__name__\`.

### Arithmetic Operators

\`\`\`python
class Vector:
    """2D mathematical vector."""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector({self.x!r}, {self.y!r})"

    # + operator
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    # - operator
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    # * operator (scalar multiplication)
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    # * from the right side (3 * vector)
    def __rmul__(self, scalar):
        return self.__mul__(scalar)

    # unary - (negative)
    def __neg__(self):
        return Vector(-self.x, -self.y)

    # abs() - magnitude
    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1 + v2)    # Vector(4, 6)
print(v1 - v2)    # Vector(2, 2)
print(v1 * 3)     # Vector(9, 12)
print(3 * v1)     # Vector(9, 12)
print(-v1)        # Vector(-3, -4)
print(abs(v1))    # 5.0   (magnitude: sqrt(9+16))
\`\`\`

### Comparison Operators

\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __str__(self):
        return f"{self.celsius}°C"

    # == operator
    def __eq__(self, other):
        if isinstance(other, Temperature):
            return self.celsius == other.celsius
        return NotImplemented   # Let Python handle non-Temperature comparisons

    # != operator (automatically derived from __eq__ if not defined)
    # def __ne__(self, other):
    #     return not self.__eq__(other)

    # < operator
    def __lt__(self, other):
        if isinstance(other, Temperature):
            return self.celsius < other.celsius
        return NotImplemented

    # <= operator
    def __le__(self, other):
        return self == other or self < other

    # > operator
    def __gt__(self, other):
        return not self <= other

    # >= operator
    def __ge__(self, other):
        return not self < other

t1 = Temperature(20)
t2 = Temperature(30)
t3 = Temperature(20)

print(t1 == t3)    # True
print(t1 < t2)     # True
print(t2 > t1)     # True
print(t1 <= t3)    # True
print(sorted([t2, t1, t3]))   # [20°C, 20°C, 30°C]
print(max([t1, t2, t3]))      # 30°C
\`\`\`

### Container-Like Operators

\`\`\`python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []

    # len() support
    def __len__(self):
        return len(self.songs)

    # [] indexing support
    def __getitem__(self, index):
        return self.songs[index]

    # [] assignment support
    def __setitem__(self, index, value):
        self.songs[index] = value

    # del [] support
    def __delitem__(self, index):
        del self.songs[index]

    # 'in' operator support
    def __contains__(self, item):
        return item in self.songs

    # Iteration support
    def __iter__(self):
        return iter(self.songs)

    def add(self, song):
        self.songs.append(song)

    def __str__(self):
        return f"Playlist '{self.name}' ({len(self)} songs)"

playlist = Playlist("My Favorites")
playlist.add("Song A")
playlist.add("Song B")
playlist.add("Song C")

print(len(playlist))       # 3
print(playlist[0])         # Song A
print("Song B" in playlist)  # True

for song in playlist:      # Iteration works!
    print(f"  - {song}")

playlist[0] = "New Song"   # Assignment works
print(playlist[0])         # New Song
\`\`\`

### Complete Operator Reference

\`\`\`
Operator    Method          Description
--------    ------          -----------
+           __add__         Addition
-           __sub__         Subtraction
*           __mul__         Multiplication
/           __truediv__     Division
//          __floordiv__    Floor division
%           __mod__         Modulo
**          __pow__         Power
-x          __neg__         Unary negative
+x          __pos__         Unary positive
abs(x)      __abs__         Absolute value
==          __eq__          Equal
!=          __ne__          Not equal
<           __lt__          Less than
<=          __le__          Less than or equal
>           __gt__          Greater than
>=          __ge__          Greater than or equal
len(x)      __len__         Length
x[i]        __getitem__     Index access
x[i]=v      __setitem__     Index assignment
del x[i]    __delitem__     Index deletion
i in x      __contains__    Membership test
str(x)      __str__         String conversion
repr(x)     __repr__        Debug representation
bool(x)     __bool__        Boolean conversion
\`\`\`

---

## Duck Typing

**"If it walks like a duck and quacks like a duck, it's a duck."**

Python does NOT require objects to inherit from a specific class to be used together. If an object has the required methods, it works. This is duck typing.

\`\`\`python
# These classes do NOT share a parent class
class Dog:
    def speak(self):
        return "Woof!"

    def move(self):
        return "runs"

class Robot:
    def speak(self):
        return "Beep boop"

    def move(self):
        return "rolls"

class Car:
    def speak(self):   # Cars can "speak" too (honk)
        return "Honk!"

    def move(self):
        return "drives"

# Same code works for ALL of them - duck typing
def make_it_move_and_speak(thing):
    # We don't care WHAT 'thing' is - just that it has speak() and move()
    print(f"It says: {thing.speak()}")
    print(f"It: {thing.move()}")

for thing in [Dog(), Robot(), Car()]:
    make_it_move_and_speak(thing)
    print()
\`\`\`

Output:
\`\`\`
It says: Woof!
It: runs

It says: Beep boop
It: rolls

It says: Honk!
It: drives
\`\`\`

### Duck Typing in Practice

\`\`\`python
# Any object with a 'read' method works as a file-like object
class FileReader:
    def __init__(self, filename):
        self.file = open(filename)

    def read(self):
        return self.file.read()

class StringReader:
    def __init__(self, content):
        self.content = content

    def read(self):
        return self.content

class NetworkReader:
    def __init__(self, url):
        self.url = url

    def read(self):
        return f"Data from {self.url}"

# This function works with ANY object that has a read() method
def process_content(reader):
    content = reader.read()   # Duck typing - just needs read()
    return content.upper()

# All three work!
# process_content(FileReader("data.txt"))
print(process_content(StringReader("hello world")))    # HELLO WORLD
print(process_content(NetworkReader("api.example.com"))) # DATA FROM API.EXAMPLE.COM
\`\`\`

### Duck Typing vs isinstance()

\`\`\`python
# Strict approach (using isinstance - checks type)
def process_strict(shape):
    if not isinstance(shape, Shape):
        raise TypeError("Must be a Shape!")
    return shape.area()

# Duck typing approach (more flexible)
def process_flexible(thing):
    if not hasattr(thing, 'area'):
        raise AttributeError("Object must have an area() method!")
    return thing.area()

# process_flexible works with ANY object that has area()
class FakeShape:
    def area(self):
        return 42.0

print(process_flexible(FakeShape()))   # 42.0  - works! No inheritance needed
\`\`\`

## Practical Example: Payment System with Polymorphism

\`\`\`python
class Payment:
    """Base payment processor."""

    def __init__(self, amount):
        self.amount = amount

    def process(self):
        raise NotImplementedError("Subclasses must implement process()")

    def receipt(self):
        return f"Payment of \${self.amount:.2f} processed"

class CreditCard(Payment):
    def __init__(self, amount, card_number):
        super().__init__(amount)
        self.card_number = f"****{card_number[-4:]}"

    def process(self):
        return f"Credit card {self.card_number} charged \${self.amount:.2f}"

    def receipt(self):
        return f"{super().receipt()} via credit card {self.card_number}"

class PayPal(Payment):
    def __init__(self, amount, email):
        super().__init__(amount)
        self.email = email

    def process(self):
        return f"PayPal payment of \${self.amount:.2f} sent from {self.email}"

class Crypto(Payment):
    def __init__(self, amount, wallet, currency="BTC"):
        super().__init__(amount)
        self.wallet = wallet
        self.currency = currency

    def process(self):
        return f"\${self.amount:.2f} sent to {self.wallet} in {self.currency}"

# Polymorphic function - works with ANY payment type
def checkout(payment_method):
    result = payment_method.process()   # Same call, different behavior
    print(result)
    print(payment_method.receipt())
    print()

payments = [
    CreditCard(99.99, "1234567890123456"),
    PayPal(49.50, "alice@example.com"),
    Crypto(0.005, "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"),
]

for payment in payments:
    checkout(payment)
\`\`\`

Output:
\`\`\`
Credit card ****3456 charged $99.99
Payment of $99.99 processed via credit card ****3456

PayPal payment of $49.50 sent from alice@example.com
Payment of $49.50 processed

$0.01 sent to 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2 in BTC
Payment of $0.01 processed
\`\`\`

> [!TIP]
> Method overriding is the most common form of polymorphism - override parent methods in child classes to specialize behavior. Duck typing is Python's default approach - focus on what an object CAN DO rather than what it IS. Use operator overloading to make custom objects work naturally with Python operators like \`+\`, \`<\`, and \`len()\`.`,
  objectives: [
    "Implement method overriding to specialize inherited behavior.",
    "Use operator overloading with dunder methods for custom operators.",
    "Understand duck typing and how Python uses it.",
    "Write code that works with multiple object types through polymorphism.",
    "Know the most important dunder methods for operators and containers."
  ],
  difficulty: "intermediate",
  xpReward: 75,
};