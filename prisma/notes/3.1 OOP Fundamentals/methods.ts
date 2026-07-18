export const methodsLesson = {
  title: "Instance, Class & Static Methods",
  slug: "methods",
  content: `# Instance, Class & Static Methods

Python classes support three types of methods, each with a different purpose and way of accessing class/instance data.

The three method types are three answers to *what context the function needs*: an instance method is bound to a specific object (\`self\`), a class method to the class (\`cls\`), and a static method to neither — the decorators just tell Python what first argument to inject. The pitfall is reaching for a static method when you actually need class data, or writing an instance method that never touches \`self\`; if you never use \`self\`, the method belongs at the class or module level.

## Instance Methods

**Instance methods** are the most common. They always take \`self\` as the first parameter and can access and modify both instance variables and class variables.

\`\`\`python
class Dog:
    total_dogs = 0

    def __init__(self, name, breed):
        self.name = name       # Instance variable
        self.breed = breed
        self.tricks = []
        Dog.total_dogs += 1

    # Instance method - operates on THIS specific dog
    def bark(self):
        print(f"{self.name} says: Woof!")

    def learn_trick(self, trick):
        self.tricks.append(trick)
        print(f"{self.name} learned {trick}!")

    def show_tricks(self):
        if not self.tricks:
            print(f"{self.name} knows no tricks yet.")
        else:
            print(f"{self.name}'s tricks: {', '.join(self.tricks)}")

    def birthday(self):
        self.age += 1
        print(f"Happy birthday {self.name}! Now {self.age} years old.")

dog = Dog("Rex", "Labrador")
dog.bark()
dog.learn_trick("sit")
dog.learn_trick("shake")
dog.show_tricks()
\`\`\`

### Instance Methods Can Call Other Instance Methods

\`\`\`python
class Circle:
    PI = 3.14159

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return self.PI * self.radius ** 2

    def circumference(self):
        return 2 * self.PI * self.radius

    def is_larger_than(self, other_circle):
        return self.area() > other_circle.area()

    def summary(self):
        # Calls other instance methods
        print(f"Circle with radius {self.radius}:")
        print(f"  Area: {self.area():.2f}")
        print(f"  Circumference: {self.circumference():.2f}")

c1 = Circle(5)
c2 = Circle(3)
c1.summary()
print(c1.is_larger_than(c2))   # True
\`\`\`

## Class Methods (@classmethod)

**Class methods** receive the **class itself** as the first argument (conventionally named \`cls\`), not an instance. They can access and modify class variables but NOT instance variables. Use the \`@classmethod\` decorator.

\`\`\`python
class Student:
    total_students = 0
    passing_grade = 60

    def __init__(self, name, score):
        self.name = name
        self.score = score
        Student.total_students += 1

    # Class method - works with the CLASS, not a specific instance
    @classmethod
    def get_total(cls):
        return cls.total_students

    @classmethod
    def change_passing_grade(cls, new_grade):
        cls.passing_grade = new_grade
        print(f"Passing grade changed to {new_grade}")

    @classmethod
    def from_string(cls, data_string):
        """Alternative constructor - create a Student from a string like 'Alice:88'"""
        name, score = data_string.split(":")
        return cls(name.strip(), int(score.strip()))

    def is_passing(self):
        return self.score >= Student.passing_grade

# Use class methods WITHOUT creating an instance
print(Student.get_total())   # 0

s1 = Student("Alice", 88)
s2 = Student("Bob", 45)
s3 = Student.from_string("Charlie:72")   # Create from string!

print(Student.get_total())   # 3
Student.change_passing_grade(50)
print(s2.is_passing())       # True now (45 >= 50? No, still False)

# Can also call on an instance (but cls is still the class)
print(s1.get_total())   # 3 (same result)
\`\`\`

### Alternative Constructors - A Key Use of @classmethod

\`\`\`python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_string):
        """Create Date from 'YYYY-MM-DD' format."""
        year, month, day = map(int, date_string.split("-"))
        return cls(year, month, day)

    @classmethod
    def from_iso(cls, iso_string):
        """Create Date from '20240115' format."""
        year = int(iso_string[:4])
        month = int(iso_string[4:6])
        day = int(iso_string[6:])
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """Create Date for today."""
        import datetime
        now = datetime.date.today()
        return cls(now.year, now.month, now.day)

    def __str__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

# Multiple ways to create a Date
d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-01-15")
d3 = Date.from_iso("20240115")
d4 = Date.today()

print(d1)   # 2024-01-15
print(d2)   # 2024-01-15
print(d3)   # 2024-01-15
print(d4)   # Today's date
\`\`\`

## Static Methods (@staticmethod)

**Static methods** don't receive \`self\` or \`cls\`. They are just regular functions that live inside a class for organizational purposes. They cannot access instance or class variables.

\`\`\`python
class MathHelper:
    # No self, no cls - just a utility function in the class
    @staticmethod
    def is_prime(n):
        if n < 2:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True

    @staticmethod
    def factorial(n):
        if n < 0:
            raise ValueError("Factorial requires non-negative integer")
        if n <= 1:
            return 1
        return n * MathHelper.factorial(n - 1)

    @staticmethod
    def celsius_to_fahrenheit(celsius):
        return (celsius * 9/5) + 32

# Call WITHOUT creating an instance
print(MathHelper.is_prime(17))     # True
print(MathHelper.factorial(5))     # 120
print(MathHelper.celsius_to_fahrenheit(100))  # 212.0

# Can also call on an instance
helper = MathHelper()
print(helper.is_prime(7))   # True
\`\`\`

### When to Use Static Methods

\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @staticmethod
    def validate(value):
        """Validate a temperature value. Used before creating an instance."""
        return -273.15 <= value <= 10000

    @staticmethod
    def celsius_to_fahrenheit(c):
        return (c * 9/5) + 32

    @staticmethod
    def fahrenheit_to_celsius(f):
        return (f - 32) * 5/9

    def to_fahrenheit(self):
        return Temperature.celsius_to_fahrenheit(self.celsius)

    def to_kelvin(self):
        return self.celsius + 273.15

# Static methods can be used before creating an instance
user_input = 25
if Temperature.validate(user_input):
    temp = Temperature(user_input)
    print(temp.to_fahrenheit())    # 77.0
    print(temp.to_kelvin())        # 298.15
\`\`\`

## Comparing All Three Method Types

\`\`\`python
class MyClass:
    class_var = "I'm a class variable"

    def __init__(self, value):
        self.instance_var = value

    def instance_method(self):
        """Can access self (instance) and class data."""
        print(f"instance_var: {self.instance_var}")
        print(f"class_var: {MyClass.class_var}")

    @classmethod
    def class_method(cls):
        """Can access class data but NOT instance data."""
        print(f"class_var: {cls.class_var}")
        # print(self.instance_var)  # ERROR! No self here

    @staticmethod
    def static_method():
        """Cannot access instance OR class data directly."""
        print("I'm just a utility function in the class")
        # print(self.instance_var)  # ERROR! No self
        # print(cls.class_var)      # ERROR! No cls

obj = MyClass("hello")

obj.instance_method()    # Can call on instance
MyClass.class_method()   # Best to call on class
MyClass.static_method()  # Best to call on class
\`\`\`

## Practical Example: Complete Class with All Three Methods

\`\`\`python
class Employee:
    # Class variables
    company = "TechCorp"
    total_employees = 0
    salary_raise_percent = 5

    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary
        Employee.total_employees += 1
        self.employee_id = Employee.total_employees

    # Instance methods
    def apply_raise(self):
        raise_amount = self.salary * (Employee.salary_raise_percent / 100)
        self.salary += raise_amount
        print(f"{self.name} got a raise! New salary: \${self.salary:,.0f}")

    def display(self):
        print(f"Employee #{self.employee_id}: {self.name}")
        print(f"  Department : {self.department}")
        print(f"  Salary     : \${self.salary:,}")

    # Class method - alternative constructor
    @classmethod
    def from_dict(cls, data):
        """Create Employee from a dictionary."""
        return cls(data["name"], data["department"], data["salary"])

    @classmethod
    def set_raise_percent(cls, percent):
        """Change raise percentage for all employees."""
        cls.salary_raise_percent = percent

    @classmethod
    def get_headcount(cls):
        return cls.total_employees

    # Static method - utility
    @staticmethod
    def is_valid_salary(salary):
        return 30_000 <= salary <= 500_000

    @staticmethod
    def format_salary(salary):
        return f"\${salary:,.2f}"

# Usage
e1 = Employee("Alice", "Engineering", 95000)
e2 = Employee.from_dict({"name": "Bob", "department": "Marketing", "salary": 72000})

print(f"Total employees: {Employee.get_headcount()}")
print(f"Is $45000 a valid salary? {Employee.is_valid_salary(45000)}")
print(f"Formatted: {Employee.format_salary(95000)}")

e1.display()
Employee.set_raise_percent(8)
e1.apply_raise()
\`\`\`

Output:
\`\`\`
Total employees: 2
Is $45000 a valid salary? True
Formatted: $95,000.00
Employee #1: Alice
  Department : Engineering
  Salary     : $95,000
Alice got a raise! New salary: $102,600
\`\`\`

## Quick Decision Guide

\`\`\`
Method type          First param    Access              When to use
-----------          ----------     -------             --------------------------------
Instance method      self           instance + class    Most things - default choice
Class method         cls            class only          Alternative constructors,
                                                        modifying class state
Static method        (none)         neither             Utility functions related
                                                        to the class topic
\`\`\`

> [!TIP]
> When in doubt, use an instance method. Use \`@classmethod\` when you need to create objects in alternative ways (from strings, files, dicts) - this is the most common use. Use \`@staticmethod\` for helper functions that belong conceptually to the class but don't need access to \`self\` or \`cls\`.`,
  objectives: [
    "Write instance methods that access and modify object data via self.",
    "Write class methods with @classmethod that operate on class-level data.",
    "Create alternative constructors using @classmethod.",
    "Write static methods with @staticmethod for utility functions.",
    "Know when to use each method type based on what data is needed."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};