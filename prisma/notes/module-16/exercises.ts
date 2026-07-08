export const exercises: Record<string, any[]> = {
  "type-hints-introduction": [
    {
      title: "Annotate a Function",
      prompt: "Write a function `calculate_bmi(weight_kg: float, height_m: float) -> float` with proper type hints. Also annotate these variables: `name: str = 'Alice'`, `age: int = 25`, `active: bool = True`. Print the BMI for weight=70, height=1.75 rounded to 1dp.",
      starterCode: "# Annotate variables and function, calculate BMI\n",
      solutionCode: "name: str = 'Alice'\nage: int = 25\nactive: bool = True\n\ndef calculate_bmi(weight_kg: float, height_m: float) -> float:\n    return weight_kg / (height_m ** 2)\n\nbmi = calculate_bmi(70, 1.75)\nprint(round(bmi, 1))",
      testCases: [
        { input: "", expectedOutput: "22.9\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Annotate a Class",
      prompt: "Define a `Rectangle` class with type annotations:\n- `width: float` and `height: float` instance variables\n- `__init__(self, width: float, height: float) -> None`\n- `area(self) -> float`\n- `perimeter(self) -> float`\n- `is_square(self) -> bool`\n\nRead width and height from input, create a Rectangle, print area, perimeter, and is_square.",
      starterCode: "# Define fully annotated Rectangle class\n",
      solutionCode: "class Rectangle:\n    def __init__(self, width: float, height: float) -> None:\n        self.width: float = width\n        self.height: float = height\n    \n    def area(self) -> float:\n        return self.width * self.height\n    \n    def perimeter(self) -> float:\n        return 2 * (self.width + self.height)\n    \n    def is_square(self) -> bool:\n        return self.width == self.height\n\nw, h = map(float, input().split())\nr = Rectangle(w, h)\nprint(r.area())\nprint(r.perimeter())\nprint(r.is_square())",
      testCases: [
        { input: "5 3\n", expectedOutput: "15.0\n16.0\nFalse\n" },
        { input: "4 4\n", expectedOutput: "16.0\n16.0\nTrue\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    }
  ],

  "basic-type-annotations": [
    {
      title: "Function with Multiple Parameter Types",
      prompt: "Write a fully annotated function `create_report(title: str, scores: list[float], passing_threshold: float = 60.0) -> dict[str, object]` that returns a dict with keys: `title` (str), `count` (int), `average` (float, 2dp), `passing` (int), `failing` (int), `pass_rate` (float, percentage rounded to 1dp).\n\nRead title, threshold, N scores (N given after threshold). Print each key: value sorted alphabetically.",
      starterCode: "# Write annotated create_report function\n",
      solutionCode: "def create_report(\n    title: str,\n    scores: list[float],\n    passing_threshold: float = 60.0\n) -> dict[str, object]:\n    count = len(scores)\n    average = round(sum(scores) / count, 2) if count else 0.0\n    passing = sum(1 for s in scores if s >= passing_threshold)\n    failing = count - passing\n    pass_rate = round(passing / count * 100, 1) if count else 0.0\n    return {\n        'average': average,\n        'count': count,\n        'failing': failing,\n        'pass_rate': pass_rate,\n        'passing': passing,\n        'title': title,\n    }\n\ntitle = input()\nthreshold = float(input())\nn = int(input())\nscores = [float(input()) for _ in range(n)]\nresult = create_report(title, scores, threshold)\nfor key in sorted(result):\n    print(f'{key}: {result[key]}')",
      testCases: [
        {
          input: "Math Test\n60\n5\n85\n45\n92\n58\n76\n",
          expectedOutput: "average: 71.2\ncount: 5\nfailing: 2\npass_rate: 60.0\npassing: 3\ntitle: Math Test\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "typing-module": [
    {
      title: "Optional and Union",
      prompt: "Write two annotated functions:\n1. `find_item(items: list[str], target: str) -> Optional[int]` - returns index of first match or None\n2. `stringify(value: Union[int, float, bool, str]) -> str` - converts to string with type prefix: `'int:5'`, `'float:3.14'`, `'bool:True'`, `'str:hello'`\n\nRead N items (N given first), then a target. Print find_item result. Then read M values and print stringify for each.",
      starterCode: "from typing import Optional, Union\n# Write find_item and stringify with type annotations\n",
      solutionCode: "from typing import Optional, Union\n\ndef find_item(items: list[str], target: str) -> Optional[int]:\n    try:\n        return items.index(target)\n    except ValueError:\n        return None\n\ndef stringify(value: Union[int, float, bool, str]) -> str:\n    if isinstance(value, bool):\n        return f'bool:{value}'\n    elif isinstance(value, int):\n        return f'int:{value}'\n    elif isinstance(value, float):\n        return f'float:{value}'\n    return f'str:{value}'\n\nn = int(input())\nitems = [input() for _ in range(n)]\ntarget = input()\nresult = find_item(items, target)\nprint(result)\n\nm = int(input())\nfor _ in range(m):\n    val = input()\n    try:\n        v: Union[int, float, bool, str] = int(val)\n    except ValueError:\n        try:\n            v = float(val)\n        except ValueError:\n            if val in ('True', 'False'):\n                v = val == 'True'\n            else:\n                v = val\n    print(stringify(v))",
      testCases: [
        {
          input: "4\napple\nbanana\ncherry\nmango\ncherry\n3\n42\n3.14\nhello\n",
          expectedOutput: "2\nint:42\nfloat:3.14\nstr:hello\n"
        },
        {
          input: "3\na\nb\nc\nd\n1\n99\n",
          expectedOutput: "None\nint:99\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 50
    },
    {
      title: "Generic Stack",
      prompt: "Define a generic `Stack[T]` class using `TypeVar` and `Generic`. Methods:\n- `push(item: T) -> None`\n- `pop() -> T` (raise IndexError if empty)\n- `peek() -> T` (raise IndexError if empty)\n- `is_empty() -> bool`\n- `__len__() -> int`\n\nRead a type (`int` or `str`) then commands until `quit`: `push VAL`, `pop`, `peek`, `len`, `empty`.\nConvert values to the appropriate type.",
      starterCode: "from typing import TypeVar, Generic, Optional\n# Define generic Stack class\n",
      solutionCode: "from typing import TypeVar, Generic\n\nT = TypeVar('T')\n\nclass Stack(Generic[T]):\n    def __init__(self) -> None:\n        self._items: list[T] = []\n    \n    def push(self, item: T) -> None:\n        self._items.append(item)\n    \n    def pop(self) -> T:\n        if not self._items:\n            raise IndexError('Stack is empty')\n        return self._items.pop()\n    \n    def peek(self) -> T:\n        if not self._items:\n            raise IndexError('Stack is empty')\n        return self._items[-1]\n    \n    def is_empty(self) -> bool:\n        return len(self._items) == 0\n    \n    def __len__(self) -> int:\n        return len(self._items)\n\ntype_name = input().strip()\nconverter = int if type_name == 'int' else str\nstack: Stack = Stack()\n\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    try:\n        if parts[0] == 'push':\n            stack.push(converter(parts[1]))\n        elif parts[0] == 'pop':\n            print(stack.pop())\n        elif parts[0] == 'peek':\n            print(stack.peek())\n        elif parts[0] == 'len':\n            print(len(stack))\n        elif parts[0] == 'empty':\n            print(stack.is_empty())\n    except IndexError as e:\n        print(f'Error: {e}')",
      testCases: [
        {
          input: "int\npush 1\npush 2\npush 3\npeek\nlen\npop\nlen\nempty\nquit\n",
          expectedOutput: "3\n3\n3\n2\nFalse\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "Callable and Higher-Order Functions",
      prompt: "Write fully annotated higher-order functions:\n1. `apply_all(funcs: list[Callable[[int], int]], value: int) -> list[int]` - apply each function to value\n2. `compose(f: Callable[[int], int], g: Callable[[int], int]) -> Callable[[int], int]` - returns f(g(x))\n3. `make_adder(n: int) -> Callable[[int], int]` - returns a function adding n\n\nRead a value, then N function names (double, square, negate, increment), apply_all, then print each result. Then compose the first two functions and print result.",
      starterCode: "from typing import Callable\n# Write annotated higher-order functions\n",
      solutionCode: "from typing import Callable\n\ndef apply_all(funcs: list[Callable[[int], int]], value: int) -> list[int]:\n    return [f(value) for f in funcs]\n\ndef compose(f: Callable[[int], int], g: Callable[[int], int]) -> Callable[[int], int]:\n    return lambda x: f(g(x))\n\ndef make_adder(n: int) -> Callable[[int], int]:\n    return lambda x: x + n\n\navailable: dict[str, Callable[[int], int]] = {\n    'double': lambda x: x * 2,\n    'square': lambda x: x ** 2,\n    'negate': lambda x: -x,\n    'increment': lambda x: x + 1,\n}\n\nvalue = int(input())\nn = int(input())\nfunc_names = [input().strip() for _ in range(n)]\nfuncs = [available[name] for name in func_names]\n\nresults = apply_all(funcs, value)\nfor r in results:\n    print(r)\n\nif len(funcs) >= 2:\n    composed = compose(funcs[0], funcs[1])\n    print(f'Composed: {composed(value)}')",
      testCases: [
        {
          input: "5\n3\ndouble\nsquare\nnegate\n",
          expectedOutput: "10\n25\n-5\nComposed: 50\n"
        }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],

  "advanced-type-features": [
    {
      title: "TypedDict",
      prompt: "Define a `ProductDict(TypedDict)` with required fields: `id: int`, `name: str`, `price: float`, `category: str`, and optional `description: str` (use `total=False` in a second TypedDict that inherits from the first).\n\nWrite `format_product(p: ProductDict) -> str` returning `'[ID] NAME - $PRICE (CATEGORY)'`.\n\nRead N products (N given first, each line: `id name price category`) and print format_product for each.",
      starterCode: "from typing import TypedDict\n# Define ProductDict and format_product function\n",
      solutionCode: "from typing import TypedDict\n\nclass ProductBase(TypedDict):\n    id: int\n    name: str\n    price: float\n    category: str\n\nclass ProductDict(ProductBase, total=False):\n    description: str\n\ndef format_product(p: ProductDict) -> str:\n    return f\"[{p['id']}] {p['name']} - ${p['price']:.2f} ({p['category']})\"\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    product: ProductDict = {\n        'id': int(parts[0]),\n        'name': parts[1],\n        'price': float(parts[2]),\n        'category': parts[3]\n    }\n    print(format_product(product))",
      testCases: [
        {
          input: "3\n1 Laptop 999.99 Electronics\n2 Book 29.99 Education\n3 Mouse 49.99 Electronics\n",
          expectedOutput: "[1] Laptop - $999.99 (Electronics)\n[2] Book - $29.99 (Education)\n[3] Mouse - $49.99 (Electronics)\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Literal Types",
      prompt: "Define a `Direction = Literal['north', 'south', 'east', 'west']` and `Status = Literal['pending', 'active', 'done', 'failed']`.\n\nWrite:\n1. `move(direction: Direction, steps: int) -> tuple[int, int]` - starts at (0,0), returns (x, y) after movement\n2. `update_status(current: Status, new: Status) -> tuple[bool, str]` - valid transitions: pending->active, active->done, active->failed. Returns (success, message).\n\nRead N commands until `quit`: `move DIR STEPS` or `status CURRENT NEW`. Print results.",
      starterCode: "from typing import Literal\n# Define Literal types and functions\n",
      solutionCode: "from typing import Literal\n\nDirection = Literal['north', 'south', 'east', 'west']\nStatus = Literal['pending', 'active', 'done', 'failed']\n\npos = [0, 0]\n\ndef move(direction: Direction, steps: int) -> tuple[int, int]:\n    if direction == 'north': pos[1] += steps\n    elif direction == 'south': pos[1] -= steps\n    elif direction == 'east': pos[0] += steps\n    elif direction == 'west': pos[0] -= steps\n    return (pos[0], pos[1])\n\nvalid_transitions: dict[str, list[str]] = {\n    'pending': ['active'],\n    'active': ['done', 'failed'],\n    'done': [],\n    'failed': [],\n}\n\ndef update_status(current: Status, new: Status) -> tuple[bool, str]:\n    if new in valid_transitions.get(current, []):\n        return True, f'Status changed: {current} -> {new}'\n    return False, f'Invalid transition: {current} -> {new}'\n\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split()\n    if parts[0] == 'move':\n        result = move(parts[1], int(parts[2]))\n        print(result)\n    elif parts[0] == 'status':\n        ok, msg = update_status(parts[1], parts[2])\n        print(msg)",
      testCases: [
        {
          input: "move north 5\nmove east 3\nmove south 2\nstatus pending active\nstatus active done\nstatus done pending\nquit\n",
          expectedOutput: "(0, 5)\n(3, 5)\n(3, 3)\nStatus changed: pending -> active\nStatus changed: active -> done\nInvalid transition: done -> pending\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "Protocol Classes",
      prompt: "Define a `Serializable` Protocol requiring:\n- `to_dict() -> dict[str, object]`\n- `@classmethod from_dict(cls, data: dict[str, object]) -> 'Serializable'`\n\nDefine `serialize_all(items: list[Serializable]) -> list[dict[str, object]]` and `deserialize_all(cls, data: list[dict[str, object]]) -> list` functions.\n\nDefine `Point(x, y)` and `Color(r, g, b)` WITHOUT inheriting from Serializable but implementing the protocol. Show both work with serialize_all.",
      starterCode: "from typing import Protocol, runtime_checkable\n# Define Serializable Protocol and Point, Color classes\n",
      solutionCode: "from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Serializable(Protocol):\n    def to_dict(self) -> dict[str, object]: ...\n\ndef serialize_all(items: list[Serializable]) -> list[dict[str, object]]:\n    return [item.to_dict() for item in items]\n\nclass Point:\n    def __init__(self, x: float, y: float) -> None:\n        self.x = x\n        self.y = y\n    \n    def to_dict(self) -> dict[str, object]:\n        return {'type': 'Point', 'x': self.x, 'y': self.y}\n    \n    def __str__(self) -> str:\n        return f'Point({self.x}, {self.y})'\n\nclass Color:\n    def __init__(self, r: int, g: int, b: int) -> None:\n        self.r = r\n        self.g = g\n        self.b = b\n    \n    def to_dict(self) -> dict[str, object]:\n        return {'type': 'Color', 'r': self.r, 'g': self.g, 'b': self.b}\n    \n    def __str__(self) -> str:\n        return f'Color({self.r}, {self.g}, {self.b})'\n\nprint(isinstance(Point(1, 2), Serializable))\nprint(isinstance(Color(255, 0, 0), Serializable))\n\nitems: list[Serializable] = [\n    Point(1.0, 2.0),\n    Color(255, 128, 0),\n    Point(3.0, 4.0)\n]\n\nresult = serialize_all(items)\nfor d in result:\n    print(d)",
      testCases: [
        {
          input: "",
          expectedOutput: "True\nTrue\n{'type': 'Point', 'x': 1.0, 'y': 2.0}\n{'type': 'Color', 'r': 255, 'g': 128, 'b': 0}\n{'type': 'Point', 'x': 3.0, 'y': 4.0}\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "type-checking-runtime": [
    {
      title: "Runtime Type Validation",
      prompt: "Write a `validate_types` decorator that checks function argument types at runtime using `get_type_hints`. Apply it to `add(a: int, b: int) -> int` and `greet(name: str, times: int) -> str`. Test with correct and incorrect types. Print `TypeError: description` for type mismatches, else print the result.",
      starterCode: "import functools\nimport inspect\nfrom typing import get_type_hints\n# Write validate_types decorator and test functions\n",
      solutionCode: "import functools\nimport inspect\nfrom typing import get_type_hints, Any\n\ndef validate_types(func):\n    hints = get_type_hints(func)\n    sig = inspect.signature(func)\n    \n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        bound = sig.bind(*args, **kwargs)\n        bound.apply_defaults()\n        for name, value in bound.arguments.items():\n            if name in hints:\n                expected = hints[name]\n                if expected is Any:\n                    continue\n                origin = getattr(expected, '__origin__', expected)\n                if not isinstance(value, origin):\n                    exp_name = getattr(expected, '__name__', str(expected))\n                    raise TypeError(f\"'{name}' expected {exp_name}, got {type(value).__name__}\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@validate_types\ndef add(a: int, b: int) -> int:\n    return a + b\n\n@validate_types\ndef greet(name: str, times: int) -> str:\n    return (name + ' ') * times\n\ntest_cases = [\n    ('add', lambda: add(3, 4)),\n    ('add_bad', lambda: add('hello', 4)),\n    ('greet', lambda: greet('Hi', 3)),\n    ('greet_bad', lambda: greet(42, 3)),\n]\n\nfor name, call in test_cases:\n    try:\n        result = call()\n        print(result)\n    except TypeError as e:\n        print(f'TypeError: {e}')",
      testCases: [
        {
          input: "",
          expectedOutput: "7\nTypeError: 'a' expected int, got str\nHi Hi Hi \nTypeError: 'name' expected str, got int\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    },
    {
      title: "Typed Dataclass with Validation",
      prompt: "Define a `@dataclass` called `Product` with:\n- `name: str`\n- `price: float`\n- `quantity: int`\n- `category: Literal['electronics', 'food', 'clothing', 'books']`\n- `discount: float = 0.0`\n\nValidate in `__post_init__`: name non-empty, price > 0, quantity >= 0, 0 <= discount < 1.\n\nAdd `final_price() -> float` property and `__str__` method.\n\nRead N products (N given first). Each line: `name price quantity category [discount]`. Print each or `Error: message`.",
      starterCode: "from dataclasses import dataclass\nfrom typing import Literal\n# Define validated Product dataclass\n",
      solutionCode: "from dataclasses import dataclass, field\nfrom typing import Literal\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int\n    category: Literal['electronics', 'food', 'clothing', 'books']\n    discount: float = 0.0\n    \n    def __post_init__(self) -> None:\n        if not self.name.strip():\n            raise ValueError('Name cannot be empty')\n        if self.price <= 0:\n            raise ValueError(f'Price must be positive, got {self.price}')\n        if self.quantity < 0:\n            raise ValueError(f'Quantity must be non-negative, got {self.quantity}')\n        if not 0 <= self.discount < 1:\n            raise ValueError(f'Discount must be in [0, 1), got {self.discount}')\n        valid_cats = ['electronics', 'food', 'clothing', 'books']\n        if self.category not in valid_cats:\n            raise ValueError(f'Invalid category: {self.category}')\n    \n    @property\n    def final_price(self) -> float:\n        return round(self.price * (1 - self.discount), 2)\n    \n    def __str__(self) -> str:\n        return f'{self.name} (${self.final_price:.2f}, qty:{self.quantity}, {self.category})'\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    try:\n        name = parts[0]\n        price = float(parts[1])\n        qty = int(parts[2])\n        cat = parts[3]\n        disc = float(parts[4]) if len(parts) > 4 else 0.0\n        p = Product(name, price, qty, cat, disc)\n        print(p)\n    except (ValueError, IndexError) as e:\n        print(f'Error: {e}')",
      testCases: [
        {
          input: "4\nLaptop 999.99 5 electronics 0.1\nBread 2.50 100 food\nShirt -20 10 clothing\nBook 29.99 50 games\n",
          expectedOutput: "Laptop ($900.00, qty:5, electronics)\nBread ($2.50, qty:100, food)\nError: Price must be positive, got -20.0\nError: Invalid category: games\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 75
    }
  ]
};