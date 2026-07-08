export const exercises: Record<string, any[]> = {
  "inheritance": [
    {
      title: "Single Inheritance",
      prompt: "Define an `Animal` class with `name`, `sound` attributes and a `speak()` method returning `'NAME says: SOUND'`. Define `Dog(Animal)` with an extra `breed` attribute and overriding `speak()` to return `'NAME says: Woof! (BREED)'`. Read N animals (N given first, each line: `type name sound [breed]`). Create correct type and print speak().",
      starterCode: "# Define Animal and Dog with single inheritance\n",
      solutionCode: "class Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    \n    def speak(self):\n        return f'{self.name} says: {self.sound}'\n\nclass Dog(Animal):\n    def __init__(self, name, sound, breed):\n        super().__init__(name, sound)\n        self.breed = breed\n    \n    def speak(self):\n        return f'{self.name} says: Woof! ({self.breed})'\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    if parts[0] == 'Dog':\n        obj = Dog(parts[1], parts[2], parts[3])\n    else:\n        obj = Animal(parts[1], parts[2])\n    print(obj.speak())",
      testCases: [
        {
          input: "3\nAnimal Cat Meow\nDog Rex Woof Labrador\nAnimal Bird Tweet\n",
          expectedOutput: "Cat says: Meow\nRex says: Woof! (Labrador)\nBird says: Tweet\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "super() Constructor Chain",
      prompt: "Define three classes in a multilevel hierarchy:\n- `Person(name, age)` with `introduce()` returning `'I am NAME, age AGE'`\n- `Employee(Person)` adds `company`, `salary`; `describe()` returns parent's introduce + `, works at COMPANY`\n- `Manager(Employee)` adds `team_size`; `describe()` returns employee's describe + `, manages TEAM_SIZE people`\n\nRead: name age company salary team_size. Create Manager and call describe().",
      starterCode: "# Define Person -> Employee -> Manager using super()\n",
      solutionCode: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def introduce(self):\n        return f'I am {self.name}, age {self.age}'\n\nclass Employee(Person):\n    def __init__(self, name, age, company, salary):\n        super().__init__(name, age)\n        self.company = company\n        self.salary = salary\n    \n    def describe(self):\n        return f'{self.introduce()}, works at {self.company}'\n\nclass Manager(Employee):\n    def __init__(self, name, age, company, salary, team_size):\n        super().__init__(name, age, company, salary)\n        self.team_size = team_size\n    \n    def describe(self):\n        return f'{super().describe()}, manages {self.team_size} people'\n\nparts = input().split()\nm = Manager(parts[0], int(parts[1]), parts[2], int(parts[3]), int(parts[4]))\nprint(m.describe())",
      testCases: [
        {
          input: "Alice 35 TechCorp 120000 10\n",
          expectedOutput: "I am Alice, age 35, works at TechCorp, manages 10 people\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 50
    },
    {
      title: "Multiple Inheritance with Mixins",
      prompt: "Define:\n- `LogMixin` with `log(msg)` printing `[LOG] CLASSNAME: MSG`\n- `SerializeMixin` with `to_dict()` returning the instance's `__dict__`\n- `User(LogMixin, SerializeMixin)` with `name`, `email`, `role` attributes and `activate()` method that logs activation and sets `active=True`\n\nRead: name email role. Create User, activate, print to_dict() sorted by key.",
      starterCode: "# Define mixins and User class using multiple inheritance\n",
      solutionCode: "class LogMixin:\n    def log(self, msg):\n        print(f'[LOG] {self.__class__.__name__}: {msg}')\n\nclass SerializeMixin:\n    def to_dict(self):\n        return self.__dict__\n\nclass User(LogMixin, SerializeMixin):\n    def __init__(self, name, email, role):\n        self.name = name\n        self.email = email\n        self.role = role\n        self.active = False\n    \n    def activate(self):\n        self.active = True\n        self.log(f'{self.name} activated')\n\nparts = input().split()\nu = User(parts[0], parts[1], parts[2])\nu.activate()\nd = u.to_dict()\nfor key in sorted(d):\n    print(f'{key}: {d[key]}')",
      testCases: [
        {
          input: "Alice alice@example.com admin\n",
          expectedOutput: "[LOG] User: Alice activated\nactive: True\nemail: alice@example.com\nname: Alice\nrole: admin\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "MRO and super() Chain",
      prompt: "Define classes A, B(A), C(A), D(B, C). Each has a `greet()` method that calls `super().greet()` and adds its own name. A's `greet()` returns `'A'`. B returns `'B->' + super().greet()`. C returns `'C->' + super().greet()`. D returns `'D->' + super().greet()`.\n\nPrint D's MRO (class names only, dash-separated) and the result of `D().greet()`.",
      starterCode: "# Define A, B, C, D and demonstrate MRO\n",
      solutionCode: "class A:\n    def greet(self):\n        return 'A'\n\nclass B(A):\n    def greet(self):\n        return f'B->{super().greet()}'\n\nclass C(A):\n    def greet(self):\n        return f'C->{super().greet()}'\n\nclass D(B, C):\n    def greet(self):\n        return f'D->{super().greet()}'\n\nmro_names = '-'.join(cls.__name__ for cls in D.__mro__)\nprint(mro_names)\nprint(D().greet())",
      testCases: [
        { input: "", expectedOutput: "D-B-C-A-object\nD->B->C->A\n" }
      ],
      difficulty: "expert",
      xpReward: 75
    }
  ],

  "polymorphism": [
    {
      title: "Method Overriding",
      prompt: "Define `Shape` with `area()` returning 0 and `describe()` returning `'Shape with area AREA'`. Define `Circle(Shape)` and `Rectangle(Shape)` overriding `area()`. Read N shapes (N given first, each line: `Circle radius` or `Rectangle width height`). Print describe() for each.",
      starterCode: "import math\n# Define Shape, Circle, Rectangle with method overriding\n",
      solutionCode: "import math\n\nclass Shape:\n    def area(self):\n        return 0\n    \n    def describe(self):\n        return f'Shape with area {self.area():.2f}'\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return math.pi * self.radius ** 2\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.width = w\n        self.height = h\n    \n    def area(self):\n        return self.width * self.height\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    if parts[0] == 'Circle':\n        s = Circle(float(parts[1]))\n    else:\n        s = Rectangle(float(parts[1]), float(parts[2]))\n    print(s.describe())",
      testCases: [
        {
          input: "3\nCircle 5\nRectangle 4 6\nCircle 1\n",
          expectedOutput: "Shape with area 78.54\nShape with area 24.00\nShape with area 3.14\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Operator Overloading - Vector",
      prompt: "Define a `Vector2D` class with `x` and `y`. Implement:\n- `__add__` (v1 + v2)\n- `__sub__` (v1 - v2)\n- `__mul__` (v * scalar)\n- `__abs__` (magnitude, sqrt(x²+y²))\n- `__eq__` (same x and y)\n- `__str__` returning `'(x, y)'` with 1dp\n\nRead 2 vectors and a scalar. Print sum, difference, first vector times scalar, magnitude of first, equality check.",
      starterCode: "import math\n# Define Vector2D with operator overloading\n",
      solutionCode: "import math\n\nclass Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n    \n    def __sub__(self, other):\n        return Vector2D(self.x - other.x, self.y - other.y)\n    \n    def __mul__(self, scalar):\n        return Vector2D(self.x * scalar, self.y * scalar)\n    \n    def __abs__(self):\n        return math.sqrt(self.x**2 + self.y**2)\n    \n    def __eq__(self, other):\n        if not isinstance(other, Vector2D): return NotImplemented\n        return self.x == other.x and self.y == other.y\n    \n    def __str__(self):\n        return f'({self.x:.1f}, {self.y:.1f})'\n\nx1, y1 = map(float, input().split())\nx2, y2 = map(float, input().split())\nscalar = float(input())\nv1 = Vector2D(x1, y1)\nv2 = Vector2D(x2, y2)\nprint(v1 + v2)\nprint(v1 - v2)\nprint(v1 * scalar)\nprint(f'{abs(v1):.2f}')\nprint(v1 == v2)",
      testCases: [
        {
          input: "3 4\n1 2\n3\n",
          expectedOutput: "(4.0, 6.0)\n(2.0, 2.0)\n(9.0, 12.0)\n5.00\nFalse\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Duck Typing Payment System",
      prompt: "Define three payment classes WITHOUT a shared parent:\n- `CreditCard(card_last4, amount)` with `process()` returning `'Charged $AMT to card ending ****LAST4'`\n- `PayPal(email, amount)` with `process()` returning `'PayPal: $AMT sent from EMAIL'`\n- `Bitcoin(wallet, amount)` with `process()` returning `'BTC: $AMT to WALLET'`\n\nRead N payments (N first, each line: `type data amount`). Call process() on each using duck typing (single function `checkout(p)` that calls p.process()).",
      starterCode: "# Define payment classes without shared parent - use duck typing\n",
      solutionCode: "class CreditCard:\n    def __init__(self, card_last4, amount):\n        self.card_last4 = card_last4\n        self.amount = float(amount)\n    \n    def process(self):\n        return f'Charged \\${self.amount:.2f} to card ending ****{self.card_last4}'\n\nclass PayPal:\n    def __init__(self, email, amount):\n        self.email = email\n        self.amount = float(amount)\n    \n    def process(self):\n        return f'PayPal: \\${self.amount:.2f} sent from {self.email}'\n\nclass Bitcoin:\n    def __init__(self, wallet, amount):\n        self.wallet = wallet\n        self.amount = float(amount)\n    \n    def process(self):\n        return f'BTC: \\${self.amount:.2f} to {self.wallet}'\n\ndef checkout(p):\n    print(p.process())\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    if parts[0] == 'CreditCard':\n        checkout(CreditCard(parts[1], parts[2]))\n    elif parts[0] == 'PayPal':\n        checkout(PayPal(parts[1], parts[2]))\n    elif parts[0] == 'Bitcoin':\n        checkout(Bitcoin(parts[1], parts[2]))",
      testCases: [
        {
          input: "3\nCreditCard 3456 99.99\nPayPal alice@example.com 49.50\nBitcoin 1BvBM 0.01\n",
          expectedOutput: "Charged $99.99 to card ending ****3456\nPayPal: $49.50 sent from alice@example.com\nBTC: $0.01 to 1BvBM\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "abstraction": [
    {
      title: "Abstract Shape Hierarchy",
      prompt: "Using `ABC` and `@abstractmethod`, define:\n- Abstract `Shape` with abstract `area()` and `perimeter()`, and concrete `describe()` returning `'CLASSNAME: area=AREA, perimeter=PERIMETER'` (2dp)\n- `Square(Shape)` with `side`\n- `Circle(Shape)` with `radius`\n\nRead N shapes (N first, each line: `Square side` or `Circle radius`). Print describe() for each. Show that Shape() raises TypeError.",
      starterCode: "from abc import ABC, abstractmethod\nimport math\n# Define abstract Shape and concrete Square, Circle\n",
      solutionCode: "from abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n    \n    @abstractmethod\n    def perimeter(self): pass\n    \n    def describe(self):\n        return f'{self.__class__.__name__}: area={self.area():.2f}, perimeter={self.perimeter():.2f}'\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    \n    def area(self):\n        return self.side ** 2\n    \n    def perimeter(self):\n        return 4 * self.side\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return math.pi * self.radius ** 2\n    \n    def perimeter(self):\n        return 2 * math.pi * self.radius\n\ntry:\n    Shape()\nexcept TypeError as e:\n    print(f'Error: Cannot instantiate Shape')\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    if parts[0] == 'Square':\n        s = Square(float(parts[1]))\n    else:\n        s = Circle(float(parts[1]))\n    print(s.describe())",
      testCases: [
        {
          input: "2\nSquare 4\nCircle 3\n",
          expectedOutput: "Error: Cannot instantiate Shape\nSquare: area=16.00, perimeter=16.00\nCircle: area=28.27, perimeter=18.85\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Abstract Interface - Logger",
      prompt: "Define an abstract `Logger(ABC)` with:\n- `@abstractmethod log(level, message)` \n- `@abstractmethod clear()`\n- Concrete `info(msg)` calling `log('INFO', msg)`\n- Concrete `error(msg)` calling `log('ERROR', msg)`\n\nImplement `ConsoleLogger` (prints `[LEVEL] MESSAGE`) and `ListLogger` (stores in list, `clear()` empties it, `get_logs()` returns the list).\n\nRead commands until `quit`: `console MSG_TYPE MSG`, `list MSG_TYPE MSG`, `list_show`, `list_clear`.",
      starterCode: "from abc import ABC, abstractmethod\n# Define abstract Logger and two implementations\n",
      solutionCode: "from abc import ABC, abstractmethod\n\nclass Logger(ABC):\n    @abstractmethod\n    def log(self, level, message): pass\n    \n    @abstractmethod\n    def clear(self): pass\n    \n    def info(self, msg):\n        self.log('INFO', msg)\n    \n    def error(self, msg):\n        self.log('ERROR', msg)\n\nclass ConsoleLogger(Logger):\n    def log(self, level, message):\n        print(f'[{level}] {message}')\n    \n    def clear(self):\n        pass\n\nclass ListLogger(Logger):\n    def __init__(self):\n        self._logs = []\n    \n    def log(self, level, message):\n        self._logs.append(f'[{level}] {message}')\n    \n    def clear(self):\n        self._logs.clear()\n    \n    def get_logs(self):\n        return self._logs\n\nconsole = ConsoleLogger()\nlist_logger = ListLogger()\n\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split(' ', 2)\n    if parts[0] == 'console':\n        if parts[1] == 'info': console.info(parts[2])\n        else: console.error(parts[2])\n    elif parts[0] == 'list':\n        if parts[1] == 'info': list_logger.info(parts[2])\n        else: list_logger.error(parts[2])\n    elif line == 'list_show':\n        for log in list_logger.get_logs(): print(log)\n    elif line == 'list_clear':\n        list_logger.clear()\n        print('Cleared')",
      testCases: [
        {
          input: "console info Server started\nconsole error Connection failed\nlist info User logged in\nlist error Access denied\nlist_show\nlist_clear\nlist_show\nquit\n",
          expectedOutput: "[INFO] Server started\n[ERROR] Connection failed\n[INFO] User logged in\n[ERROR] Access denied\nCleared\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "composition-vs-inheritance": [
    {
      title: "HAS-A Relationship",
      prompt: "Define using COMPOSITION (not inheritance):\n- `Engine(type, hp)` with `start()` returning `'TYPE engine started (HPhp)'`\n- `GPS()` with `navigate(dest)` returning `'Navigating to DEST'`\n- `Car(make, model)` that HAS-A engine and optionally a GPS. Methods: `start()` delegates to engine, `navigate(dest)` delegates to GPS or returns `'No GPS'`, `__str__` returning `'MAKE MODEL'`\n\nRead commands until `quit`: `create NAME make model`, `add_engine NAME type hp`, `add_gps NAME`, `start NAME`, `navigate NAME dest`.",
      starterCode: "# Define Car using composition (HAS-A, not IS-A)\n",
      solutionCode: "class Engine:\n    def __init__(self, type_, hp):\n        self.type_ = type_\n        self.hp = int(hp)\n    \n    def start(self):\n        return f'{self.type_} engine started ({self.hp}hp)'\n\nclass GPS:\n    def navigate(self, dest):\n        return f'Navigating to {dest}'\n\nclass Car:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n        self.engine = None\n        self.gps = None\n    \n    def add_engine(self, engine):\n        self.engine = engine\n    \n    def add_gps(self):\n        self.gps = GPS()\n    \n    def start(self):\n        if self.engine:\n            return self.engine.start()\n        return 'No engine'\n    \n    def navigate(self, dest):\n        if self.gps:\n            return self.gps.navigate(dest)\n        return 'No GPS'\n    \n    def __str__(self):\n        return f'{self.make} {self.model}'\n\ncars = {}\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    cmd = parts[0]\n    if cmd == 'create':\n        cars[parts[1]] = Car(parts[2], parts[3])\n    elif cmd == 'add_engine':\n        cars[parts[1]].add_engine(Engine(parts[2], parts[3]))\n    elif cmd == 'add_gps':\n        cars[parts[1]].add_gps()\n    elif cmd == 'start':\n        print(cars[parts[1]].start())\n    elif cmd == 'navigate':\n        print(cars[parts[1]].navigate(parts[2]))",
      testCases: [
        {
          input: "create mycar Toyota Corolla\nadd_engine mycar Petrol 140\nadd_gps mycar\nstart mycar\nnavigate mycar London\nquit\n",
          expectedOutput: "Petrol engine started (140hp)\nNavigating to London\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 70
    }
  ],

  "magic-methods": [
    {
      title: "Container Magic Methods",
      prompt: "Define a `Stack` class using composition (contains a list). Implement:\n- `push(item)` - add to top\n- `pop()` - remove and return top (raise `IndexError` if empty)\n- `peek()` - return top without removing\n- `__len__` - number of items\n- `__contains__` - `item in stack`\n- `__str__` - `'Stack([items])'` with top on right\n- `__bool__` - True if not empty\n\nRead commands until `quit`. Handle IndexError.",
      starterCode: "# Define Stack with magic methods\n",
      solutionCode: "class Stack:\n    def __init__(self):\n        self._items = []\n    \n    def push(self, item):\n        self._items.append(item)\n    \n    def pop(self):\n        if not self._items:\n            raise IndexError('Stack is empty')\n        return self._items.pop()\n    \n    def peek(self):\n        if not self._items:\n            raise IndexError('Stack is empty')\n        return self._items[-1]\n    \n    def __len__(self):\n        return len(self._items)\n    \n    def __contains__(self, item):\n        return item in self._items\n    \n    def __str__(self):\n        return f'Stack({self._items})'\n    \n    def __bool__(self):\n        return len(self._items) > 0\n\nstack = Stack()\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    cmd = parts[0]\n    try:\n        if cmd == 'push':\n            stack.push(parts[1])\n        elif cmd == 'pop':\n            print(stack.pop())\n        elif cmd == 'peek':\n            print(stack.peek())\n        elif cmd == 'len':\n            print(len(stack))\n        elif cmd == 'has':\n            print(parts[1] in stack)\n        elif cmd == 'show':\n            print(stack)\n        elif cmd == 'bool':\n            print(bool(stack))\n    except IndexError as e:\n        print(f'Error: {e}')",
      testCases: [
        {
          input: "push a\npush b\npush c\nshow\npeek\nhas b\nlen\npop\nshow\nquit\n",
          expectedOutput: "Stack(['a', 'b', 'c'])\nc\nTrue\n3\nc\nStack(['a', 'b'])\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "Context Manager",
      prompt: "Define a `Timer` context manager class that:\n- `__enter__` records start time and prints `'Timer started'`, returns self\n- `__exit__` records end time, prints `'Timer stopped: X.Xs'` (4dp), returns False\n- Has `elapsed` property returning elapsed seconds\n\nAlso define a `Transaction` context manager that:\n- `__enter__` prints `'Transaction started'`, returns self\n- `__exit__` prints `'Committed'` on success, `'Rolled back: ERROR'` on exception, returns False\n\nRead which context manager to test: `timer N` (time a loop of N iterations) or `transaction ok/fail`.",
      starterCode: "import time\n# Define Timer and Transaction context managers\n",
      solutionCode: "import time\n\nclass Timer:\n    def __init__(self):\n        self._start = None\n        self._end = None\n    \n    def __enter__(self):\n        self._start = time.perf_counter()\n        print('Timer started')\n        return self\n    \n    def __exit__(self, *args):\n        self._end = time.perf_counter()\n        print(f'Timer stopped: {self.elapsed:.4f}s')\n        return False\n    \n    @property\n    def elapsed(self):\n        if self._end:\n            return self._end - self._start\n        return time.perf_counter() - self._start\n\nclass Transaction:\n    def __enter__(self):\n        print('Transaction started')\n        return self\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type:\n            print(f'Rolled back: {exc_val}')\n        else:\n            print('Committed')\n        return False\n\nline = input().split()\ncmd = line[0]\nif cmd == 'timer':\n    n = int(line[1])\n    with Timer() as t:\n        total = sum(range(n))\n    print(f'Sum: {total}')\nelif cmd == 'transaction':\n    mode = line[1]\n    try:\n        with Transaction() as tx:\n            if mode == 'fail':\n                raise ValueError('Operation failed')\n            print('Work done')\n    except ValueError:\n        pass",
      testCases: [
        {
          input: "transaction ok\n",
          expectedOutput: "Transaction started\nWork done\nCommitted\n"
        },
        {
          input: "transaction fail\n",
          expectedOutput: "Transaction started\nRolled back: Operation failed\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    },
    {
      title: "Arithmetic Overloading - Fraction",
      prompt: "Define a `Fraction` class with `numerator` and `denominator`. Auto-reduce using GCD. Implement:\n- `__add__`, `__sub__`, `__mul__`, `__truediv__`\n- `__eq__`, `__lt__`\n- `__str__` as `'num/den'` (or just `'num'` if den is 1)\n- `__float__` returning float value\n\nRead N operations (N given first). Each line: `A/B OP C/D`. Print the result. Handle division by zero with `Error: division by zero`.",
      starterCode: "import math\n# Define Fraction with full operator overloading\n",
      solutionCode: "import math\n\nclass Fraction:\n    def __init__(self, num, den):\n        if den == 0:\n            raise ZeroDivisionError('division by zero')\n        if den < 0:\n            num, den = -num, -den\n        g = math.gcd(abs(num), abs(den))\n        self.numerator = num // g\n        self.denominator = den // g\n    \n    @classmethod\n    def from_string(cls, s):\n        parts = s.split('/')\n        if len(parts) == 1:\n            return cls(int(parts[0]), 1)\n        return cls(int(parts[0]), int(parts[1]))\n    \n    def __add__(self, other):\n        return Fraction(self.numerator * other.denominator + other.numerator * self.denominator, self.denominator * other.denominator)\n    \n    def __sub__(self, other):\n        return Fraction(self.numerator * other.denominator - other.numerator * self.denominator, self.denominator * other.denominator)\n    \n    def __mul__(self, other):\n        return Fraction(self.numerator * other.numerator, self.denominator * other.denominator)\n    \n    def __truediv__(self, other):\n        return Fraction(self.numerator * other.denominator, self.denominator * other.numerator)\n    \n    def __eq__(self, other):\n        return self.numerator == other.numerator and self.denominator == other.denominator\n    \n    def __lt__(self, other):\n        return self.numerator * other.denominator < other.numerator * self.denominator\n    \n    def __str__(self):\n        if self.denominator == 1:\n            return str(self.numerator)\n        return f'{self.numerator}/{self.denominator}'\n    \n    def __float__(self):\n        return self.numerator / self.denominator\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    try:\n        a = Fraction.from_string(parts[0])\n        op = parts[1]\n        b = Fraction.from_string(parts[2])\n        if op == '+': print(a + b)\n        elif op == '-': print(a - b)\n        elif op == '*': print(a * b)\n        elif op == '/': print(a / b)\n    except ZeroDivisionError as e:\n        print(f'Error: {e}')",
      testCases: [
        {
          input: "4\n1/2 + 1/3\n3/4 - 1/4\n2/3 * 3/4\n1/2 / 0/1\n",
          expectedOutput: "5/6\n1/2\n1/2\nError: division by zero\n"
        }
      ],
      difficulty: "expert",
      xpReward: 95
    }
  ]
};