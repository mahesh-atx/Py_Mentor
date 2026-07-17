export const exercises: Record<string, any[]> = {
  "oop-introduction": [
    {
      "title": "Identify OOP Benefits",
      "prompt": "Create a class `Rectangle` with `width` and `height` attributes and an `area()` method. Create 3 different rectangles with dimensions read from input (each line: `width height`). Print the area of each. Show why OOP is better than separate variables.",
      "starterCode": "# Define Rectangle class and create 3 instances from input\n",
      "solutionCode": "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n\nfor _ in range(3):\n    w, h = map(float, input().split())\n    r = Rectangle(w, h)\n    print(r.area())",
      "testCases": [
        {
          "input": "5 3\n10 7\n2 2\n",
          "expectedOutput": "15.0\n70.0\n4.0\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Car Objects",
      "prompt": "Define a class `Car` with attributes `make` and `speed`, and a method `describe()` that prints `MAKE (speed: SPEED)`. Read N cars (N given first, each line: `make speed`). Create objects and call describe() for each.",
      "starterCode": "# Define Car class and create N cars from input\n",
      "solutionCode": "class Car:\n    def __init__(self, make, speed):\n        self.make = make\n        self.speed = int(speed)\n    \n    def describe(self):\n        print(f'{self.make} (speed: {self.speed})')\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    Car(parts[0], parts[1]).describe()",
      "testCases": [
        {
          "input": "2\nToyota 120\nBMW 200\n",
          "expectedOutput": "Toyota (speed: 120)\nBMW (speed: 200)\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 25
    },
    {
      "title": "Student Grade (Objects + Method)",
      "prompt": "Define a `Student` class with `name` and `score`. Method `get_grade()` returns 'A' if score >= 90, 'B' if >= 80, else 'C'. Read N students (N given first, each line: `name score`) and print `NAME: GRADE` for each.",
      "starterCode": "# Define Student class with get_grade and create N students\n",
      "solutionCode": "class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = int(score)\n    \n    def get_grade(self):\n        if self.score >= 90: return 'A'\n        elif self.score >= 80: return 'B'\n        return 'C'\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    s = Student(parts[0], parts[1])\n    print(f'{s.name}: {s.get_grade()}')",
      "testCases": [
        {
          "input": "3\nAlice 95\nBob 82\nCharlie 75\n",
          "expectedOutput": "Alice: A\nBob: B\nCharlie: C\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 25
    },
    {
      "title": "Everything is an Object",
      "prompt": "In Python, even integers are objects. Given `x = 5`. Print the type of `x`.",
      "starterCode": "x = 5\n# Print the type of x\n",
      "solutionCode": "x = 5\nprint(type(x))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'int'>\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 10
    }
  ,
    {
      "title": "Simplest Class",
      "prompt": "Define an empty class Dog (use pass). Create an instance d, set d.name = 'Rex', and print d.name.",
      "starterCode": "# Empty class + attribute\n",
      "solutionCode": "class Dog:\n    pass\n\nd = Dog()\nd.name = 'Rex'\nprint(d.name)",
      "testCases": [{ "input": "", "expectedOutput": "Rex\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "classes-and-objects": [
    {
      "title": "Create and Use Objects",
      "prompt": "Define a class `Car` with attributes `make`, `model`, and `year`, and a method `description()` that prints `YEAR MAKE MODEL`. Read N cars (N given first, each line: `make model year`) and print each description. If N is 0, print `No cars`.",
      "starterCode": "# Define Car class and create N cars from input\n",
      "solutionCode": "class Car:\n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n    \n    def description(self):\n        print(f'{self.year} {self.make} {self.model}')\n\nn = int(input())\nif n == 0:\n    print('No cars')\nelse:\n    for _ in range(n):\n        parts = input().split()\n        car = Car(parts[0], parts[1], int(parts[2]))\n        car.description()",
      "testCases": [
        {
          "input": "3\nToyota Corolla 2022\nHonda Civic 2020\nFord Focus 2019\n",
          "expectedOutput": "2022 Toyota Corolla\n2020 Honda Civic\n2019 Ford Focus\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Class with Counter",
      "prompt": "Define a class `Counter` with a class variable `total_created = 0`. Each time an instance is created, increment `total_created`. Each instance has its own `count = 0`. Methods: `increment()`, `decrement()`, `reset()`, `value()`. Read N commands from input until `quit`: `new` (create new counter), `inc N` (increment counter N), `dec N` (decrement counter N), `reset N` (reset counter N), `show N` (print value of counter N), `total` (print total created). Counters are 1-indexed.",
      "starterCode": "# Define Counter class with class variable and process commands\n",
      "solutionCode": "class Counter:\n    total_created = 0\n    \n    def __init__(self):\n        self.count = 0\n        Counter.total_created += 1\n    \n    def increment(self): self.count += 1\n    def decrement(self): self.count -= 1\n    def reset(self): self.count = 0\n    def value(self): return self.count\n\ncounters = []\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    cmd = parts[0]\n    if cmd == 'new':\n        counters.append(Counter())\n    elif cmd == 'inc':\n        counters[int(parts[1])-1].increment()\n    elif cmd == 'dec':\n        counters[int(parts[1])-1].decrement()\n    elif cmd == 'reset':\n        counters[int(parts[1])-1].reset()\n    elif cmd == 'show':\n        print(counters[int(parts[1])-1].value())\n    elif cmd == 'total':\n        print(Counter.total_created)",
      "testCases": [
        {
          "input": "new\nnew\ninc 1\ninc 1\ninc 2\nshow 1\nshow 2\ntotal\nquit\n",
          "expectedOutput": "2\n1\n2\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Define a Class",
      "prompt": "Define an empty class called `Dog` using the `pass` keyword. Then create an instance of it named `my_dog` and print it.",
      "starterCode": "# Define Dog class and instantiate my_dog\n",
      "solutionCode": "class Dog:\n    pass\n\nmy_dog = Dog()\nprint(type(my_dog))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class '__main__.Dog'>\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Set Attributes manually",
      "prompt": "Define an empty `Cat` class. Create an instance `c`. Set `c.name = 'Whiskers'` and print `c.name`.",
      "starterCode": "# Define Cat, instantiate c, set name, print name\n",
      "solutionCode": "class Cat:\n    pass\n\nc = Cat()\nc.name = 'Whiskers'\nprint(c.name)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Whiskers\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Two Cats",
      "prompt": "Define a class Cat with a class attribute sound = 'Meow'. Create two instances and print both of their sound attributes on one line separated by a space.",
      "starterCode": "# Class attribute shared by instances\n",
      "solutionCode": "class Cat:\n    sound = 'Meow'\n\na = Cat()\nb = Cat()\nprint(a.sound, b.sound)",
      "testCases": [{ "input": "", "expectedOutput": "Meow Meow\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "init-and-self": [
    {
      "title": "Constructor with Validation",
      "prompt": "Define a `Person` class. `__init__` takes `name` (str) and `age` (int). Validate: name must be non-empty, age must be 0-150. If invalid, raise `ValueError` with message `Invalid name` or `Invalid age`. Method `greet()` prints `Hi, I'm NAME and I am AGE years old.`\n\nRead N persons (N given first, each line: `name age`). Print greeting or `Error: message`.",
      "starterCode": "# Define Person class with validation in __init__\n",
      "solutionCode": "class Person:\n    def __init__(self, name, age):\n        if not name or not name.strip():\n            raise ValueError('Invalid name')\n        if not isinstance(age, int) or age < 0 or age > 150:\n            raise ValueError('Invalid age')\n        self.name = name.strip().title()\n        self.age = age\n    \n    def greet(self):\n        print(f\"Hi, I'm {self.name} and I am {self.age} years old.\")\n\nn = int(input())\nfor _ in range(n):\n    parts = input().rsplit(' ', 1)\n    name = parts[0]\n    try:\n        age = int(parts[1])\n        p = Person(name, age)\n        p.greet()\n    except ValueError as e:\n        print(f'Error: {e}')",
      "testCases": [
        {
          "input": "3\nAlice 25\nBob 200\n 30\n",
          "expectedOutput": "Hi, I'm Alice and I am 25 years old.\nError: Invalid age\nError: Invalid name\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 50
    },
    {
      "title": "Self in Action",
      "prompt": "Define a `Temperature` class. `__init__` takes `celsius` (float). Methods:\n- `to_fahrenheit()` returns `(c * 9/5) + 32`\n- `to_kelvin()` returns `c + 273.15`\n- `is_freezing()` returns True if celsius <= 0\n- `classify()` returns 'Freezing' (<= 0), 'Cold' (<= 15), 'Warm' (<= 25), 'Hot' (> 25)\n\nRead N temperatures, print all four results for each.",
      "starterCode": "# Define Temperature class using self\n",
      "solutionCode": "class Temperature:\n    def __init__(self, celsius):\n        self.celsius = celsius\n    \n    def to_fahrenheit(self):\n        return (self.celsius * 9/5) + 32\n    \n    def to_kelvin(self):\n        return self.celsius + 273.15\n    \n    def is_freezing(self):\n        return self.celsius <= 0\n    \n    def classify(self):\n        if self.celsius <= 0: return 'Freezing'\n        elif self.celsius <= 15: return 'Cold'\n        elif self.celsius <= 25: return 'Warm'\n        return 'Hot'\n\nn = int(input())\nfor _ in range(n):\n    c = float(input())\n    t = Temperature(c)\n    print(f'{t.to_fahrenheit():.1f}')\n    print(f'{t.to_kelvin():.2f}')\n    print(t.is_freezing())\n    print(t.classify())",
      "testCases": [
        {
          "input": "2\n0\n30\n",
          "expectedOutput": "32.0\n273.15\nTrue\nFreezing\n86.0\n303.15\nFalse\nHot\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "The __init__ Method",
      "prompt": "Define a class `Person` with an `__init__` method that accepts `name` and sets `self.name = name`. Create a Person named 'Alice' and print her name.",
      "starterCode": "# Define Person with __init__, create Alice, print name\n",
      "solutionCode": "class Person:\n    def __init__(self, name):\n        self.name = name\n\np = Person('Alice')\nprint(p.name)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Multiple Attributes",
      "prompt": "Define `Car` with `__init__(self, make, model)`. Instantiate `my_car` as a 'Toyota' 'Corolla'. Print the make and model separated by a space.",
      "starterCode": "# Define Car, instantiate, print\n",
      "solutionCode": "class Car:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n\nmy_car = Car('Toyota', 'Corolla')\nprint(my_car.make, my_car.model)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Toyota Corolla\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Person Greeting",
      "prompt": "Define a class Person whose __init__ stores a name. Add a method greet() returning 'Hi, I am <name>'. Create Person('Mia') and print her greeting.",
      "starterCode": "# __init__ and self\n",
      "solutionCode": "class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f'Hi, I am {self.name}'\n\np = Person('Mia')\nprint(p.greet())",
      "testCases": [{ "input": "", "expectedOutput": "Hi, I am Mia\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "instance-vs-class-variables": [
    {
      "title": "Class Variable Counter",
      "prompt": "Define a `Vehicle` class with a class variable `total_vehicles = 0`. Each new vehicle increments it. Instance variables: `make`, `model`, `year`. Class method `get_total()` returns the count. Static method `is_valid_year(year)` returns True if 1886 <= year <= 2024.\n\nRead N vehicles (N given first), then print total and validate each year.",
      "starterCode": "# Define Vehicle class with class variable and methods\n",
      "solutionCode": "class Vehicle:\n    total_vehicles = 0\n    \n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n        Vehicle.total_vehicles += 1\n    \n    @classmethod\n    def get_total(cls):\n        return cls.total_vehicles\n    \n    @staticmethod\n    def is_valid_year(year):\n        return 1886 <= year <= 2024\n\nn = int(input())\nvehicles = []\nfor _ in range(n):\n    parts = input().split()\n    v = Vehicle(parts[0], parts[1], int(parts[2]))\n    vehicles.append(v)\n\nprint(f'Total: {Vehicle.get_total()}')\nfor v in vehicles:\n    valid = Vehicle.is_valid_year(v.year)\n    print(f'{v.make} {v.model} ({v.year}): {\"Valid\" if valid else \"Invalid\"}')",
      "testCases": [
        {
          "input": "3\nToyota Corolla 2022\nFord T 1900\nFuture Car 2050\n",
          "expectedOutput": "Total: 3\nToyota Corolla (2022): Valid\nFord T (1900): Valid\nFuture Car (2050): Invalid\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Class Variables",
      "prompt": "Define `Robot` with a class variable `population = 0`. In `__init__`, increment `Robot.population` by 1. Create two robots, then print `Robot.population`.",
      "starterCode": "# Define Robot, class variable, __init__, create 2 robots, print population\n",
      "solutionCode": "class Robot:\n    population = 0\n    def __init__(self):\n        Robot.population += 1\n\nr1 = Robot()\nr2 = Robot()\nprint(Robot.population)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Instance Variables",
      "prompt": "Define `Employee` with an instance variable `name` set in `__init__`. Create `e1 = Employee('John')` and `e2 = Employee('Jane')`. Print both names.",
      "starterCode": "# Define Employee, create 2 instances, print names\n",
      "solutionCode": "class Employee:\n    def __init__(self, name):\n        self.name = name\n\ne1 = Employee('John')\ne2 = Employee('Jane')\nprint(e1.name)\nprint(e2.name)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "John\nJane\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Bird Counter",
      "prompt": "Define a class Bird with a class attribute count = 0. In __init__, increment Bird.count by 1. Create three birds and print Bird.count.",
      "starterCode": "# Class variable as a counter\n",
      "solutionCode": "class Bird:\n    count = 0\n    def __init__(self):\n        Bird.count += 1\n\nBird()\nBird()\nBird()\nprint(Bird.count)",
      "testCases": [{ "input": "", "expectedOutput": "3\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "methods": [
    {
      "title": "All Three Method Types",
      "prompt": "Define a `Circle` class:\n- Class variable `PI = 3.14159`\n- Instance method `area()` → PI * r²\n- Instance method `circumference()` → 2 * PI * r\n- Class method `unit_circle()` → returns a Circle with radius 1\n- Static method `is_valid_radius(r)` → True if r > 0\n\nRead N radii (N given first). For valid ones print area and circumference (2dp). For invalid print `Invalid radius`.",
      "starterCode": "# Define Circle class with all three method types\n",
      "solutionCode": "class Circle:\n    PI = 3.14159\n    \n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return Circle.PI * self.radius ** 2\n    \n    def circumference(self):\n        return 2 * Circle.PI * self.radius\n    \n    @classmethod\n    def unit_circle(cls):\n        return cls(1)\n    \n    @staticmethod\n    def is_valid_radius(r):\n        return r > 0\n\nn = int(input())\nfor _ in range(n):\n    r = float(input())\n    if not Circle.is_valid_radius(r):\n        print('Invalid radius')\n    else:\n        c = Circle(r)\n        print(f'{c.area():.2f}')\n        print(f'{c.circumference():.2f}')",
      "testCases": [
        {
          "input": "3\n5\n0\n3\n",
          "expectedOutput": "78.54\n31.42\nInvalid radius\n28.27\n18.85\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Alternative Constructor",
      "prompt": "Define a `Date` class with `year`, `month`, `day` instance variables and:\n- `__init__(year, month, day)` with validation (month 1-12, day 1-31)\n- `@classmethod from_string(cls, s)` - creates from `'YYYY-MM-DD'`\n- `__str__` returning `'DD/MM/YYYY'`\n- `is_valid()` instance method returning True\n\nRead N date strings (N given first). Create using `from_string` and print. On invalid format/values print `Invalid date`.",
      "starterCode": "# Define Date class with alternative constructor\n",
      "solutionCode": "class Date:\n    def __init__(self, year, month, day):\n        if not (1 <= month <= 12):\n            raise ValueError('Invalid month')\n        if not (1 <= day <= 31):\n            raise ValueError('Invalid day')\n        self.year = year\n        self.month = month\n        self.day = day\n    \n    @classmethod\n    def from_string(cls, s):\n        parts = s.split('-')\n        if len(parts) != 3:\n            raise ValueError('Invalid format')\n        return cls(int(parts[0]), int(parts[1]), int(parts[2]))\n    \n    def __str__(self):\n        return f'{self.day:02d}/{self.month:02d}/{self.year}'\n\nn = int(input())\nfor _ in range(n):\n    s = input().strip()\n    try:\n        d = Date.from_string(s)\n        print(d)\n    except (ValueError, IndexError):\n        print('Invalid date')",
      "testCases": [
        {
          "input": "3\n2024-01-15\n2024-13-01\nabc\n",
          "expectedOutput": "15/01/2024\nInvalid date\nInvalid date\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Instance Methods",
      "prompt": "Define `Greeter` with `__init__(self, name)` and a method `say_hi(self)` that prints 'Hi, I am [name]'. Create 'Bob' and call `say_hi()`.",
      "starterCode": "# Define Greeter with say_hi, test it\n",
      "solutionCode": "class Greeter:\n    def __init__(self, name):\n        self.name = name\n    def say_hi(self):\n        print(f'Hi, I am {self.name}')\n\ng = Greeter('Bob')\ng.say_hi()",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hi, I am Bob\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Method modifying state",
      "prompt": "Define `BankAccount` with `__init__` setting `self.balance = 0`. Add `deposit(self, amount)` that adds to balance. Create account, deposit 50, deposit 20, print balance.",
      "starterCode": "# Define BankAccount, deposit 50, deposit 20, print balance\n",
      "solutionCode": "class BankAccount:\n    def __init__(self):\n        self.balance = 0\n    def deposit(self, amount):\n        self.balance += amount\n\nacc = BankAccount()\nacc.deposit(50)\nacc.deposit(20)\nprint(acc.balance)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "70\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ,
    {
      "title": "Wallet",
      "prompt": "Define a class Wallet with __init__ setting self.money = 0, a method add(amount) that adds to it, and total() returning the balance. Add 50 then 25 and print the total.",
      "starterCode": "# Instance methods\n",
      "solutionCode": "class Wallet:\n    def __init__(self):\n        self.money = 0\n    def add(self, amount):\n        self.money += amount\n    def total(self):\n        return self.money\n\nw = Wallet()\nw.add(50)\nw.add(25)\nprint(w.total())",
      "testCases": [{ "input": "", "expectedOutput": "75\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "str-and-repr": [
    {
      "title": "Implement __str__",
      "prompt": "Define a `Book` class with `title`, `author`, `year`, `pages`. Implement `__str__` returning `'TITLE by AUTHOR (YEAR, PAGES pages)'`. Read N books (N given first, each line: `title author year pages`) and print each using str().",
      "starterCode": "# Define Book class with __str__\n",
      "solutionCode": "class Book:\n    def __init__(self, title, author, year, pages):\n        self.title = title\n        self.author = author\n        self.year = int(year)\n        self.pages = int(pages)\n    \n    def __str__(self):\n        return f'{self.title} by {self.author} ({self.year}, {self.pages} pages)'\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    pages = parts[-1]\n    year = parts[-2]\n    author = parts[-3]\n    title = ' '.join(parts[:-3])\n    b = Book(title, author, year, pages)\n    print(b)",
      "testCases": [
        {
          "input": "2\nPython Programming Lutz 2013 1200\nClean Code Martin 2008 464\n",
          "expectedOutput": "Python Programming by Lutz (2013, 1200 pages)\nClean Code by Martin (2008, 464 pages)\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Both __str__ and __repr__",
      "prompt": "Define a `Point3D` class with `x`, `y`, `z`.\n- `__str__` returns `'(X, Y, Z)'`\n- `__repr__` returns `'Point3D(x=X, y=Y, z=Z)'`\n- `distance_from_origin()` returns `sqrt(x²+y²+z²)` (2dp)\n- `__add__(other)` returns a new Point3D with summed coordinates\n\nRead 2 points (each line: `x y z`). Print: str of each, repr of each, distance of each, str of their sum.",
      "starterCode": "import math\n# Define Point3D with __str__, __repr__, distance, and __add__\n",
      "solutionCode": "import math\n\nclass Point3D:\n    def __init__(self, x, y, z):\n        self.x = x\n        self.y = y\n        self.z = z\n    \n    def __str__(self):\n        return f'({self.x}, {self.y}, {self.z})'\n    \n    def __repr__(self):\n        return f'Point3D(x={self.x}, y={self.y}, z={self.z})'\n    \n    def distance_from_origin(self):\n        return round(math.sqrt(self.x**2 + self.y**2 + self.z**2), 2)\n    \n    def __add__(self, other):\n        return Point3D(self.x + other.x, self.y + other.y, self.z + other.z)\n\np1_vals = list(map(float, input().split()))\np2_vals = list(map(float, input().split()))\np1 = Point3D(*p1_vals)\np2 = Point3D(*p2_vals)\nprint(str(p1))\nprint(str(p2))\nprint(repr(p1))\nprint(repr(p2))\nprint(p1.distance_from_origin())\nprint(p2.distance_from_origin())\nprint(p1 + p2)",
      "testCases": [
        {
          "input": "1 2 3\n4 5 6\n",
          "expectedOutput": "(1.0, 2.0, 3.0)\n(4.0, 5.0, 6.0)\nPoint3D(x=1.0, y=2.0, z=3.0)\nPoint3D(x=4.0, y=5.0, z=6.0)\n3.74\n8.77\n(5.0, 7.0, 9.0)\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "The __str__ Method",
      "prompt": "Define `Book` with `__init__(self, title, author)`. Define `__str__(self)` to return '[title] by [author]'. Create a book and print it.",
      "starterCode": "# Define Book with __str__ and print it\n",
      "solutionCode": "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n    def __str__(self):\n        return f'{self.title} by {self.author}'\n\nb = Book('1984', 'Orwell')\nprint(b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1984 by Orwell\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ,
    {
      "title": "Point to String",
      "prompt": "Define a class Point storing x and y, with __str__ returning '(x, y)' e.g. '(3, 4)'. Print Point(3, 4).",
      "starterCode": "# __str__\n",
      "solutionCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\nprint(Point(3, 4))",
      "testCases": [{ "input": "", "expectedOutput": "(3, 4)\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "encapsulation": [
    {
      "title": "Property Getter",
      "prompt": "Define a `Temperature` class with a private `__celsius` attribute. Use `@property` for `celsius` (getter) and `fahrenheit` (computed read-only property returning `(c*9/5)+32`). Add a setter for `celsius` that raises `ValueError` if below -273.15. Read N values, set each and print both celsius and fahrenheit (1dp).",
      "starterCode": "# Define Temperature with @property getter and computed property\n",
      "solutionCode": "class Temperature:\n    def __init__(self, celsius=0):\n        self.celsius = celsius\n    \n    @property\n    def celsius(self):\n        return self.__celsius\n    \n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError('Temperature below absolute zero')\n        self.__celsius = value\n    \n    @property\n    def fahrenheit(self):\n        return (self.__celsius * 9/5) + 32\n\nn = int(input())\nfor _ in range(n):\n    val = float(input())\n    try:\n        t = Temperature(val)\n        print(f'{t.celsius:.1f}')\n        print(f'{t.fahrenheit:.1f}')\n    except ValueError as e:\n        print(f'Error: {e}')",
      "testCases": [
        {
          "input": "3\n100\n0\n-300\n",
          "expectedOutput": "100.0\n212.0\n0.0\n32.0\nError: Temperature below absolute zero\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 50
    },
    {
      "title": "Full Encapsulation: BankAccount",
      "prompt": "Define a `BankAccount` class with:\n- Private `__balance` and `__owner`\n- `@property` for `balance` (read-only) and `owner` (read-only)\n- `deposit(amount)`: validates > 0, adds to balance, prints `Deposited $X`\n- `withdraw(amount)`: validates > 0 and sufficient funds, prints `Withdrew $X` or raises `ValueError`\n- `transfer(amount, other_account)`: withdraws from self, deposits to other\n- `__str__` returning `'OWNER: $BALANCE'`\n\nRead commands until `quit`: `create NAME BALANCE`, `deposit ACC AMT`, `withdraw ACC AMT`, `transfer FROM TO AMT`, `show ACC`.",
      "starterCode": "# Define BankAccount with full encapsulation\n",
      "solutionCode": "class BankAccount:\n    def __init__(self, owner, balance=0):\n        if balance < 0: raise ValueError('Negative balance')\n        self.__owner = owner\n        self.__balance = balance\n    \n    @property\n    def balance(self): return self.__balance\n    \n    @property\n    def owner(self): return self.__owner\n    \n    def deposit(self, amount):\n        if amount <= 0: raise ValueError('Amount must be positive')\n        self.__balance += amount\n        print(f'Deposited ${amount:.2f}')\n    \n    def withdraw(self, amount):\n        if amount <= 0: raise ValueError('Amount must be positive')\n        if amount > self.__balance: raise ValueError('Insufficient funds')\n        self.__balance -= amount\n        print(f'Withdrew ${amount:.2f}')\n    \n    def transfer(self, amount, other):\n        self.withdraw(amount)\n        other.deposit(amount)\n    \n    def __str__(self):\n        return f'{self.__owner}: ${self.__balance:.2f}'\n\naccounts = {}\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    try:\n        if parts[0] == 'create':\n            accounts[parts[1]] = BankAccount(parts[1], float(parts[2]))\n        elif parts[0] == 'deposit':\n            accounts[parts[1]].deposit(float(parts[2]))\n        elif parts[0] == 'withdraw':\n            accounts[parts[1]].withdraw(float(parts[2]))\n        elif parts[0] == 'transfer':\n            accounts[parts[1]].transfer(float(parts[3]), accounts[parts[2]])\n        elif parts[0] == 'show':\n            print(accounts[parts[1]])\n    except ValueError as e:\n        print(f'Error: {e}')",
      "testCases": [
        {
          "input": "create Alice 1000\ncreate Bob 500\ndeposit Alice 200\nwithdraw Bob 600\ntransfer Alice Bob 300\nshow Alice\nshow Bob\nquit\n",
          "expectedOutput": "Deposited $200.00\nError: Insufficient funds\nWithdrew $300.00\nDeposited $300.00\nAlice: $900.00\nBob: $800.00\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 95
    },
    {
      "title": "Private Attributes",
      "prompt": "Define `Wallet` with `__init__(self, balance)`. Make balance private by naming it `__balance`. Provide a method `get_balance(self)` that returns it. Create wallet with 100 and print it using the method.",
      "starterCode": "# Define Wallet with __balance and get_balance()\n",
      "solutionCode": "class Wallet:\n    def __init__(self, balance):\n        self.__balance = balance\n    def get_balance(self):\n        return self.__balance\n\nw = Wallet(100)\nprint(w.get_balance())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "100\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Module Integration: RPG Character",
      "prompt": "Define an `RPGCharacter` class. `__init__` takes `name` and `attack_power`, and sets a private `__health` to 100. Define `take_damage(self, amount)` that reduces health but not below 0. Define `__str__` returning '[name] (HP: [health])'. Create character, apply 40 damage, print character.",
      "starterCode": "# Implement RPGCharacter and test logic\n",
      "solutionCode": "class RPGCharacter:\n    def __init__(self, name, attack_power):\n        self.name = name\n        self.attack_power = attack_power\n        self.__health = 100\n    def take_damage(self, amount):\n        self.__health -= amount\n        if self.__health < 0:\n            self.__health = 0\n    def __str__(self):\n        return f'{self.name} (HP: {self.__health})'\n\nhero = RPGCharacter('Arthur', 15)\nhero.take_damage(40)\nprint(hero)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Arthur (HP: 60)\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    },
    {
      "title": "Module Integration: Counter Class",
      "prompt": "Define a `Counter` class with a private `__count` starting at 0. Add `increment(self)`, `decrement(self)`, and `get_count(self)`. Read a sequence of commands from input on one line (e.g., 'inc inc dec inc') separated by spaces. Apply them to a Counter instance and print the final count.",
      "starterCode": "# Define Counter, read inputs, apply, print count\n",
      "solutionCode": "class Counter:\n    def __init__(self):\n        self.__count = 0\n    def increment(self):\n        self.__count += 1\n    def decrement(self):\n        self.__count -= 1\n    def get_count(self):\n        return self.__count\n\nc = Counter()\ncmds = input().split()\nfor cmd in cmds:\n    if cmd == 'inc':\n        c.increment()\n    elif cmd == 'dec':\n        c.decrement()\nprint(c.get_count())",
      "testCases": [
        {
          "input": "inc inc dec inc\n",
          "expectedOutput": "2\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    }
  ,
    {
      "title": "Secret Vault",
      "prompt": "Define a class Vault whose __init__ stores a value in the private attribute __secret, with a method reveal() returning it. Create Vault('gold') and print reveal().",
      "starterCode": "# Private attribute + getter method\n",
      "solutionCode": "class Vault:\n    def __init__(self, secret):\n        self.__secret = secret\n    def reveal(self):\n        return self.__secret\n\nv = Vault('gold')\nprint(v.reveal())",
      "testCases": [{ "input": "", "expectedOutput": "gold\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ]
};
