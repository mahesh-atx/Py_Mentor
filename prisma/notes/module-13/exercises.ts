export const exercisesModule13: Record<string, any[]> = {
  "functional-programming-concepts": [
    {
      title: "Pure Function Check",
      prompt: "Write a pure function `safe_divide(a, b)` that returns `(result, None)` on success or `(None, error_message)` on failure (no exceptions, no side effects). Read a and b from input. Print `Result: X.XX` or `Error: message`.",
      starterCode: "# Write a pure safe_divide function\n",
      solutionCode: "def safe_divide(a, b):\n    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):\n        return None, 'Inputs must be numeric'\n    if b == 0:\n        return None, 'Division by zero'\n    return a / b, None\n\ntry:\n    a = float(input())\n    b = float(input())\n    result, error = safe_divide(a, b)\n    if error:\n        print(f'Error: {error}')\n    else:\n        print(f'Result: {result:.2f}')\nexcept ValueError:\n    print('Error: Inputs must be numeric')",
      testCases: [
        { input: "10\n4\n", expectedOutput: "Result: 2.50\n" },
        { input: "5\n0\n", expectedOutput: "Error: Division by zero\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Immutable Data Transform",
      prompt: "Write a function `transform_record(record, updates)` that takes a dict and a dict of updates and returns a NEW dict without modifying the original. Read a base record (N key-value pairs), then M updates. Print the original and updated record to show immutability.",
      starterCode: "# Write immutable transform_record function\n",
      solutionCode: "def transform_record(record, updates):\n    return {**record, **updates}\n\nn = int(input())\nrecord = {}\nfor _ in range(n):\n    k, v = input().split(' ', 1)\n    record[k] = v\n\nm = int(input())\nupdates = {}\nfor _ in range(m):\n    k, v = input().split(' ', 1)\n    updates[k] = v\n\nupdated = transform_record(record, updates)\nprint(f'Original: {record}')\nprint(f'Updated: {updated}')",
      testCases: [
        {
          input: "2\nname Alice\nage 25\n2\nage 26\ncity London\n",
          expectedOutput: "Original: {'name': 'Alice', 'age': '25'}\nUpdated: {'name': 'Alice', 'age': '26', 'city': 'London'}\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Function Composition Pipeline",
      prompt: "Define a `compose(*functions)` function that applies functions right-to-left. Read N function names from input (available: `double`, `square`, `increment`, `negate`, `absolute`) then a number. Apply the composed pipeline and print the result. If unknown function, print `Unknown: NAME`.",
      starterCode: "from functools import reduce\n# Define compose and apply pipeline from input\n",
      solutionCode: "from functools import reduce\n\ndef compose(*functions):\n    return reduce(lambda f, g: lambda x: f(g(x)), functions)\n\navailable = {\n    'double': lambda x: x * 2,\n    'square': lambda x: x ** 2,\n    'increment': lambda x: x + 1,\n    'negate': lambda x: -x,\n    'absolute': abs,\n}\n\nn = int(input())\nfuncs = []\nvalid = True\nfor _ in range(n):\n    name = input().strip()\n    if name not in available:\n        print(f'Unknown: {name}')\n        valid = False\n        break\n    funcs.append(available[name])\n\nif valid:\n    value = float(input())\n    if funcs:\n        pipeline = compose(*funcs)\n        print(pipeline(value))\n    else:\n        print(value)",
      testCases: [
        { input: "3\ndouble\nincrement\nsquare\n5\n", expectedOutput: "121.0\n" },
        { input: "2\ndouble\nunknown\n5\n", expectedOutput: "Unknown: unknown\n" }
      ],
      difficulty: "advanced",
      xpReward: 70
    }
  ],

  "currying-partial-functions": [
    {
      title: "Partial Function Application",
      prompt: "Using `functools.partial`, create a `validate_range(value, min_val, max_val)` function. Then create specialized validators: `validate_age` (0-150), `validate_score` (0-100), `validate_percent` (0-100). Read values and validator names from input until `quit`. Print `VALID` or `INVALID: out of range`.",
      starterCode: "from functools import partial\n# Create range validators using partial\n",
      solutionCode: "from functools import partial\n\ndef validate_range(value, min_val, max_val):\n    return min_val <= value <= max_val\n\nvalidate_age = partial(validate_range, min_val=0, max_val=150)\nvalidate_score = partial(validate_range, min_val=0, max_val=100)\nvalidate_percent = partial(validate_range, min_val=0, max_val=100)\n\nvalidators = {\n    'age': validate_age,\n    'score': validate_score,\n    'percent': validate_percent,\n}\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    validator_name = parts[0]\n    value = float(parts[1])\n    if validator_name not in validators:\n        print('Unknown validator')\n    elif validators[validator_name](value):\n        print('VALID')\n    else:\n        print('INVALID: out of range')",
      testCases: [
        {
          input: "age 25\nage -5\nscore 85\nscore 150\npercent 50\nquit\n",
          expectedOutput: "VALID\nINVALID: out of range\nVALID\nINVALID: out of range\nVALID\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "functools-module": [
    {
      title: "LRU Cache Efficiency",
      prompt: "Implement `fibonacci(n)` with `@lru_cache`. Read N from input. Print the Nth Fibonacci number, then print cache info as `hits=X misses=X`.\n\nIf N <= 0 print `Invalid`. If N > 60 print `N too large`.",
      starterCode: "from functools import lru_cache\n# Implement cached fibonacci\n",
      solutionCode: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nn = int(input())\nif n <= 0:\n    print('Invalid')\nelif n > 60:\n    print('N too large')\nelse:\n    print(fibonacci(n))\n    info = fibonacci.cache_info()\n    print(f'hits={info.hits} misses={info.misses}')",
      testCases: [
        { input: "10\n", expectedOutput: "55\nhits=8 misses=11\n" },
        { input: "0\n", expectedOutput: "Invalid\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Decorator with wraps",
      prompt: "Write a `validate_args(*types)` decorator that checks argument types. Use `@wraps` to preserve function metadata. Apply it to `add(a: int, b: int)` and `divide(a: float, b: float)`. Read operations from input. If types are wrong print `TypeError: arg N expected TYPE`. Test with correct and incorrect types.",
      starterCode: "from functools import wraps\n# Write a type-validating decorator with @wraps\n",
      solutionCode: "from functools import wraps\nimport inspect\n\ndef validate_args(*types):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args):\n            for i, (arg, expected_type) in enumerate(zip(args, types)):\n                if not isinstance(arg, expected_type):\n                    print(f'TypeError: arg {i+1} expected {expected_type.__name__}')\n                    return None\n            return func(*args)\n        return wrapper\n    return decorator\n\n@validate_args(int, int)\ndef add(a, b):\n    \"\"\"Add two integers.\"\"\"\n    return a + b\n\n@validate_args(float, float)\ndef divide(a, b):\n    \"\"\"Divide two floats.\"\"\"\n    if b == 0:\n        return None\n    return a / b\n\nprint(add.__name__)\nprint(add.__doc__)\nresult = add(3, 4)\nif result is not None: print(result)\nresult = add(3, 'four')",
      testCases: [
        { input: "", expectedOutput: "add\nAdd two integers.\n7\nTypeError: arg 2 expected int\n" }
      ],
      difficulty: "advanced",
      xpReward: 70
    }
  ],

  "itertools-module": [
    {
      title: "Combinations Finder",
      prompt: "Read N numbers and a target sum from input. Using `itertools.combinations`, find all pairs (combinations of 2) that sum to the target. Print each pair as `(A, B)` sorted, then print total count. If none found, print `No pairs found`.",
      starterCode: "from itertools import combinations\n# Find all pairs summing to target\n",
      solutionCode: "from itertools import combinations\nn = int(input())\nnumbers = [int(input()) for _ in range(n)]\ntarget = int(input())\npairs = [(a, b) for a, b in combinations(numbers, 2) if a + b == target]\nif not pairs:\n    print('No pairs found')\nelse:\n    for pair in sorted(pairs):\n        print(pair)\n    print(f'Count: {len(pairs)}')",
      testCases: [
        { input: "6\n1\n2\n3\n4\n5\n6\n7\n", expectedOutput: "(1, 6)\n(2, 5)\n(3, 4)\nCount: 3\n" },
        { input: "3\n1\n2\n3\n10\n", expectedOutput: "No pairs found\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Batch Iterator",
      prompt: "Define `batch(iterable, size)` using `islice`. Read N items and a batch size from input. Print each batch as a list. If size <= 0, print `Invalid batch size`.",
      starterCode: "from itertools import islice\n# Define batch() using islice and process input\n",
      solutionCode: "from itertools import islice\n\ndef batch(iterable, size):\n    it = iter(iterable)\n    while True:\n        chunk = list(islice(it, size))\n        if not chunk:\n            return\n        yield chunk\n\nn = int(input())\nitems = [input() for _ in range(n)]\nsize = int(input())\n\nif size <= 0:\n    print('Invalid batch size')\nelse:\n    for b in batch(items, size):\n        print(b)",
      testCases: [
        {
          input: "7\na\nb\nc\nd\ne\nf\ng\n3\n",
          expectedOutput: "['a', 'b', 'c']\n['d', 'e', 'f']\n['g']\n"
        },
        { input: "3\na\nb\nc\n0\n", expectedOutput: "Invalid batch size\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Cartesian Product Generator",
      prompt: "Read K lists (K given first). Each list is on one line as space-separated items. Generate the Cartesian product of all lists using `itertools.product`. Print each combination as a space-separated tuple, one per line. Print the total count at the end.\n\nIf K is 0 or any list is empty, print `Invalid input`.",
      starterCode: "from itertools import product\n# Read K lists and generate their Cartesian product\n",
      solutionCode: "from itertools import product\nk = int(input())\nif k == 0:\n    print('Invalid input')\nelse:\n    lists = []\n    valid = True\n    for _ in range(k):\n        items = input().split()\n        if not items:\n            print('Invalid input')\n            valid = False\n            break\n        lists.append(items)\n    if valid:\n        combos = list(product(*lists))\n        for combo in combos:\n            print(' '.join(combo))\n        print(f'Total: {len(combos)}')",
      testCases: [
        {
          input: "2\nred blue\nS M L\n",
          expectedOutput: "red S\nred M\nred L\nblue S\nblue M\nblue L\nTotal: 6\n"
        },
        { input: "0\n", expectedOutput: "Invalid input\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],

  "operator-module": [
    {
      title: "itemgetter Sorting",
      prompt: "Read N student records (N given first). Each line: `name score grade`. Use `operator.itemgetter` to sort by score descending, then print each as `name: score (grade)`. Use `itemgetter` for both sorting and data extraction.",
      starterCode: "from operator import itemgetter\n# Read students and sort using itemgetter\n",
      solutionCode: "from operator import itemgetter\nn = int(input())\nstudents = []\nfor _ in range(n):\n    parts = input().split()\n    students.append({'name': parts[0], 'score': int(parts[1]), 'grade': parts[2]})\n\nsorted_students = sorted(students, key=itemgetter('score'), reverse=True)\nfor s in sorted_students:\n    print(f\"{s['name']}: {s['score']} ({s['grade']})\")",
      testCases: [
        {
          input: "3\nAlice 88 B\nBob 95 A\nCharlie 72 C\n",
          expectedOutput: "Bob: 95 (A)\nAlice: 88 (B)\nCharlie: 72 (C)\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Operator-Powered Calculator",
      prompt: "Using `operator` module functions (add, sub, mul, truediv, mod, pow), build a calculator. Read operations from input until `quit`. Each line: `A OP B`. Support `+`, `-`, `*`, `/`, `%`, `**`. Print result to 4dp or `Error: message` for invalid ops or division by zero.",
      starterCode: "import operator\n# Build calculator using operator module functions\n",
      solutionCode: "import operator\n\nops = {\n    '+': operator.add,\n    '-': operator.sub,\n    '*': operator.mul,\n    '/': operator.truediv,\n    '%': operator.mod,\n    '**': operator.pow,\n}\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    if len(parts) != 3:\n        print('Error: invalid format')\n        continue\n    try:\n        a = float(parts[0])\n        op = parts[1]\n        b = float(parts[2])\n        if op not in ops:\n            print(f'Error: unknown operator {op}')\n        elif op in ['/', '%'] and b == 0:\n            print('Error: division by zero')\n        else:\n            print(round(ops[op](a, b), 4))\n    except ValueError:\n        print('Error: invalid number')",
      testCases: [
        {
          input: "10 + 5\n10 / 0\n2 ** 8\n10 % 3\nquit\n",
          expectedOutput: "15.0\nError: division by zero\n256.0\n1.0\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ]
};