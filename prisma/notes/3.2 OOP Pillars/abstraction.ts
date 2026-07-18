export const abstractionLesson = {
  title: "Abstraction: Abstract Classes & Methods",
  slug: "abstraction",
  content: `# Abstraction: Abstract Classes & Methods

Abstraction defines a *contract* — a promise of *what* an object can do while hiding the *how* — and Python's \`abc\` module enforces it at instantiation time, refusing to build an object until every abstract method is implemented by a subclass. The pitfall is expecting abstraction to hide data or reduce code; its real job is to guarantee a consistent shape, and a class built only from concrete methods behaves exactly like any ordinary class.

## What is Abstraction?

**Abstraction** means hiding complex implementation details and showing only the essential features. In OOP, abstract classes define a **contract** - what methods subclasses MUST implement - without providing the implementation.

Think of a USB interface: you know that any USB device can be connected to your computer (the contract), but you don't need to know HOW each device works internally.

## The Problem Without Abstraction

\`\`\`python
class Shape:
    def area(self):
        return 0   # What should this return? Empty shapes don't make sense!

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # What if someone FORGETS to implement area()?

class Rectangle(Shape):
    def __init__(self, w, h):
        self.width = w
        self.height = h
    # What if THEY also forget?

# No error when creating - but area() returns 0 which is WRONG
missing_circle = Circle(5)
print(missing_circle.area())   # 0 - should be 78.54! Bug is silent!
\`\`\`

## The ABC Module

Python's \`abc\` (Abstract Base Classes) module provides tools for creating abstract classes that FORCE subclasses to implement specific methods.

\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):   # Inherit from ABC to make it abstract
    @abstractmethod
    def area(self):
        pass   # No implementation - subclasses MUST provide it

    @abstractmethod
    def perimeter(self):
        pass

# Cannot instantiate an abstract class!
try:
    s = Shape()   # TypeError!
except TypeError as e:
    print(f"Error: {e}")
# Error: Can't instantiate abstract class Shape with abstract method area
\`\`\`

## Implementing Abstract Classes

\`\`\`python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, color="black"):
        self.color = color

    @abstractmethod
    def area(self):
        """Calculate and return the area."""
        pass

    @abstractmethod
    def perimeter(self):
        """Calculate and return the perimeter."""
        pass

    # Concrete method - shared by all shapes (not abstract)
    def describe(self):
        return (f"{self.color.title()} {self.__class__.__name__}: "
                f"area={self.area():.2f}, perimeter={self.perimeter():.2f}")

class Circle(Shape):
    def __init__(self, radius, color="black"):
        super().__init__(color)
        self.radius = radius

    def area(self):          # MUST implement - no choice
        return math.pi * self.radius ** 2

    def perimeter(self):     # MUST implement - no choice
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, width, height, color="black"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Triangle(Shape):
    def __init__(self, a, b, c, color="black"):
        super().__init__(color)
        self.a, self.b, self.c = a, b, c

    def area(self):
        # Heron's formula
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s-self.a) * (s-self.b) * (s-self.c))

    def perimeter(self):
        return self.a + self.b + self.c

# Now if you FORGET to implement a method:
class BadShape(Shape):
    pass   # Didn't implement area() or perimeter()

try:
    bad = BadShape()   # TypeError immediately!
except TypeError as e:
    print(f"Error: {e}")
# Error: Can't instantiate abstract class BadShape with abstract methods area, perimeter

# Correct shapes work fine
shapes = [
    Circle(5, "red"),
    Rectangle(4, 6, "blue"),
    Triangle(3, 4, 5, "green"),
]

for shape in shapes:
    print(shape.describe())
\`\`\`

Output:
\`\`\`
Error: Can't instantiate abstract class BadShape with abstract methods area, perimeter
Red Circle: area=78.54, perimeter=31.42
Blue Rectangle: area=24.00, perimeter=20.00
Green Triangle: area=6.00, perimeter=12.00
\`\`\`

## Abstract Properties

You can make properties abstract too:

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name):
        self.name = name

    @property
    @abstractmethod
    def sound(self):
        """The sound this animal makes."""
        pass

    @property
    @abstractmethod
    def legs(self):
        """Number of legs."""
        pass

    def describe(self):
        return f"{self.name} has {self.legs} legs and says '{self.sound}'"

class Dog(Animal):
    @property
    def sound(self):
        return "Woof"

    @property
    def legs(self):
        return 4

class Bird(Animal):
    @property
    def sound(self):
        return "Tweet"

    @property
    def legs(self):
        return 2

class Fish(Animal):
    @property
    def sound(self):
        return "..."

    @property
    def legs(self):
        return 0

for animal in [Dog("Rex"), Bird("Tweety"), Fish("Nemo")]:
    print(animal.describe())
\`\`\`

Output:
\`\`\`
Rex has 4 legs and says 'Woof'
Tweety has 2 legs and says 'Tweet'
Nemo has 0 legs and says '...'
\`\`\`

## Abstract Classes as Interfaces

Abstract classes in Python serve as **interfaces** - defining a contract that all implementations must follow:

\`\`\`python
from abc import ABC, abstractmethod

class DatabaseInterface(ABC):
    """Interface for database operations. All databases must implement these."""

    @abstractmethod
    def connect(self):
        """Establish database connection."""
        pass

    @abstractmethod
    def disconnect(self):
        """Close database connection."""
        pass

    @abstractmethod
    def query(self, sql):
        """Execute a query and return results."""
        pass

    @abstractmethod
    def execute(self, sql, params=None):
        """Execute a command (INSERT, UPDATE, DELETE)."""
        pass

    # Concrete method shared by all databases
    def table_exists(self, table_name):
        try:
            self.query(f"SELECT 1 FROM {table_name} LIMIT 1")
            return True
        except Exception:
            return False

class SQLiteDB(DatabaseInterface):
    def __init__(self, db_file):
        self.db_file = db_file
        self.connection = None

    def connect(self):
        import sqlite3
        self.connection = sqlite3.connect(self.db_file)
        print(f"Connected to SQLite: {self.db_file}")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Disconnected from SQLite")

    def query(self, sql):
        cursor = self.connection.cursor()
        cursor.execute(sql)
        return cursor.fetchall()

    def execute(self, sql, params=None):
        cursor = self.connection.cursor()
        cursor.execute(sql, params or [])
        self.connection.commit()

class MockDB(DatabaseInterface):
    """For testing - simulates a database."""

    def __init__(self):
        self.data = {}
        self.connected = False

    def connect(self):
        self.connected = True
        print("Connected to MockDB")

    def disconnect(self):
        self.connected = False
        print("Disconnected from MockDB")

    def query(self, sql):
        print(f"Mock query: {sql}")
        return []

    def execute(self, sql, params=None):
        print(f"Mock execute: {sql} with {params}")

# Same function works with ANY database implementation
def setup_database(db: DatabaseInterface):
    db.connect()
    db.execute("CREATE TABLE IF NOT EXISTS users (id, name)")
    db.execute("INSERT INTO users VALUES (?, ?)", [1, "Alice"])
    results = db.query("SELECT * FROM users")
    db.disconnect()
    return results

# Switch between implementations without changing setup_database!
mock_results = setup_database(MockDB())
\`\`\`

## Checking Abstract Class Relationships

\`\`\`python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self): pass

class Dog(Animal):
    def speak(self):
        return "Woof"

dog = Dog()

print(isinstance(dog, Animal))    # True - Dog IS-A Animal
print(isinstance(dog, ABC))       # True - Animal IS-A ABC
print(issubclass(Dog, Animal))    # True
print(issubclass(Dog, ABC))       # True

# Check if a class has abstract methods
print(hasattr(Animal, '__abstractmethods__'))  # True
print(Animal.__abstractmethods__)              # frozenset({'speak'})
print(hasattr(Dog, '__abstractmethods__'))     # False (all implemented)
\`\`\`

## Abstract Class vs Regular Class vs Interface

\`\`\`
Type                Can Instantiate?  Can Have Concrete Methods?  Can Have State?
-----------------   ----------------  --------------------------  ---------------
Regular class       Yes               Yes                         Yes
Abstract class      No                Yes                         Yes
Pure interface      No                No (abstract only)          No

Python uses abstract classes for both abstract classes and interfaces.
There is no separate 'interface' keyword in Python.
\`\`\`

## Practical Example: Plugin System

\`\`\`python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    """Abstract base for all data processors."""

    @abstractmethod
    def load(self, source):
        """Load data from source."""
        pass

    @abstractmethod
    def process(self, data):
        """Process the data."""
        pass

    @abstractmethod
    def save(self, data, destination):
        """Save processed data."""
        pass

    # Template method pattern
    def run(self, source, destination):
        """Run the full pipeline."""
        print(f"Loading from {source}...")
        data = self.load(source)
        print(f"Processing {len(data)} records...")
        processed = self.process(data)
        print(f"Saving to {destination}...")
        self.save(processed, destination)
        print("Done!")
        return processed

class CSVProcessor(DataProcessor):
    def load(self, source):
        # Simulated CSV loading
        return [{"name": "Alice", "score": 88}, {"name": "Bob", "score": 72}]

    def process(self, data):
        # Add grade to each record
        for record in data:
            s = record["score"]
            record["grade"] = "A" if s >= 90 else "B" if s >= 80 else "C"
        return data

    def save(self, data, destination):
        print(f"Saved {len(data)} records to {destination}")
        for record in data:
            print(f"  {record}")

processor = CSVProcessor()
results = processor.run("students.csv", "output.csv")
\`\`\`

Output:
\`\`\`
Loading from students.csv...
Processing 2 records...
Saving to output.csv...
Saved 2 records to output.csv
  {'name': 'Alice', 'score': 88, 'grade': 'B'}
  {'name': 'Bob', 'score': 72, 'grade': 'C'}
Done!
\`\`\`

> [!TIP]
> Use abstract classes when you have a family of related classes that should all support the same interface. The \`@abstractmethod\` decorator immediately tells developers "you MUST implement this in your subclass." This catches errors at class definition time rather than runtime. Abstract classes can mix abstract and concrete methods - only the abstract ones must be overridden.`,
  objectives: [
    "Import and use ABC and abstractmethod from the abc module.",
    "Create abstract classes that cannot be instantiated directly.",
    "Mark methods as abstract to force subclasses to implement them.",
    "Make abstract properties using @property and @abstractmethod together.",
    "Use abstract classes as interfaces to define contracts for implementations."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};