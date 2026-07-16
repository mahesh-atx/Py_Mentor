export const exercises: Record<string, any[]> = {
  "defining-calling-functions": [
    {
      title: "Your First Function",
      prompt: "Define a function called `print_greeting` that prints `Hello from a function!`. Then call it.",
      starterCode: "# Define and call print_greeting\n",
      solutionCode: "def print_greeting():\n    print('Hello from a function!')\n\nprint_greeting()",
      testCases: [
        { input: "", expectedOutput: "Hello from a function!\n" }
      ],
      difficulty: "beginner",
      xpReward: 15
    },
    {
      title: "Function with Parameter",
      prompt: "Define a function `greet(name)` that prints `Hello, NAME!` where NAME is the argument. Call it with `Alice` and `Bob`.",
      starterCode: "# Define greet and call it with Alice and Bob\n",
      solutionCode: "def greet(name):\n    print(f'Hello, {name}!')\n\ngreet('Alice')\ngreet('Bob')",
      testCases: [
        { input: "", expectedOutput: "Hello, Alice!\nHello, Bob!\n" }
      ],
      difficulty: "beginner",
      xpReward: 15
    },
    {
      title: "Temperature Converter",
      prompt: "Define a function `celsius_to_fahrenheit(celsius)` that returns the temperature in Fahrenheit using `(celsius * 9/5) + 32`. Read N temperature values from input (N given first) and print each converted value rounded to 1 decimal place. If N is 0, print `No temperatures`.",
      starterCode: "# Define converter and process N temperatures from input\n",
      solutionCode: "def celsius_to_fahrenheit(celsius):\n    return (celsius * 9/5) + 32\n\nn = int(input())\nif n == 0:\n    print('No temperatures')\nelse:\n    for _ in range(n):\n        c = float(input())\n        print(round(celsius_to_fahrenheit(c), 1))",
      testCases: [
        { input: "3\n0\n100\n37\n", expectedOutput: "32.0\n212.0\n98.6\n" },
        { input: "0\n", expectedOutput: "No temperatures\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Invoice Printer",
      prompt: "Define three functions:\n1. `print_header(title)` - prints `=== TITLE ===`\n2. `print_item(name, price)` - prints `  name: $price` (price to 2dp)\n3. `print_total(items)` - prints `Total: $X.XX`\n\nRead N items (N given first, each line `name price`). Call the functions to print a full invoice. If N is 0, print `No items`.",
      starterCode: "# Define three functions and use them to print an invoice\n",
      solutionCode: "def print_header(title):\n    print(f'=== {title} ===')\n\ndef print_item(name, price):\n    print(f'  {name}: \\${price:.2f}')\n\ndef print_total(items):\n    total = sum(p for _, p in items)\n    print(f'Total: \\${total:.2f}')\n\nn = int(input())\nif n == 0:\n    print('No items')\nelse:\n    items = []\n    for _ in range(n):\n        parts = input().split()\n        name = parts[0]\n        price = float(parts[1])\n        items.append((name, price))\n    print_header('INVOICE')\n    for name, price in items:\n        print_item(name, price)\n    print_total(items)",
      testCases: [
        {
          input: "3\nCoffee 4.99\nSandwich 8.99\nJuice 3.25\n",
          expectedOutput: "=== INVOICE ===\n  Coffee: $4.99\n  Sandwich: $8.99\n  Juice: $3.25\nTotal: $17.23\n"
        },
        { input: "0\n", expectedOutput: "No items\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "parameters-and-arguments": [
    {
      title: "Keyword Arguments",
      prompt: "Define `describe_pet(name, animal_type='dog')` that prints `I have a ANIMAL_TYPE named NAME.`. Call it:\n1. With just `name='Whiskers'`\n2. With `name='Buddy'` and `animal_type='cat'`\n3. Using keyword arguments in any order: `animal_type='rabbit', name='Cinnamon'`",
      starterCode: "# Define describe_pet and call it three ways\n",
      solutionCode: "def describe_pet(name, animal_type='dog'):\n    print(f'I have a {animal_type} named {name}.')\n\ndescribe_pet(name='Whiskers')\ndescribe_pet(name='Buddy', animal_type='cat')\ndescribe_pet(animal_type='rabbit', name='Cinnamon')",
      testCases: [
        {
          input: "",
          expectedOutput: "I have a dog named Whiskers.\nI have a cat named Buddy.\nI have a rabbit named Cinnamon.\n"
        }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Sum with *args",
      prompt: "Define `flexible_sum(*numbers)` that returns the sum of any number of arguments. Read N values from input (N given first), convert to floats, and call the function. Print the result rounded to 2dp. If N is 0, print `0.00`.",
      starterCode: "# Define flexible_sum using *args and use it with input values\n",
      solutionCode: "def flexible_sum(*numbers):\n    return sum(numbers)\n\nn = int(input())\nif n == 0:\n    print('0.00')\nelse:\n    values = [float(input()) for _ in range(n)]\n    result = flexible_sum(*values)\n    print(f'{result:.2f}')",
      testCases: [
        { input: "3\n10.5\n20.5\n5.0\n", expectedOutput: "36.00\n" },
        { input: "0\n", expectedOutput: "0.00\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "HTML Tag Builder with **kwargs",
      prompt: "Define `build_tag(tag, content, **attrs)` that builds an HTML tag string. Attributes go inside the opening tag. Print the result.\n\nFormat: `<tag attr1=\"val1\" attr2=\"val2\">content</tag>`\n\nRead from input:\n- Line 1: tag name\n- Line 2: content\n- Line 3: N (number of attributes)\n- Next N lines: `attr_name value`\n\nIf N is 0, print the tag without attributes.",
      starterCode: "# Define build_tag with **kwargs and build from input\n",
      solutionCode: "def build_tag(tag, content, **attrs):\n    if attrs:\n        attr_str = ' '.join(f'{k}=\"{v}\"' for k, v in attrs.items())\n        return f'<{tag} {attr_str}>{content}</{tag}>'\n    return f'<{tag}>{content}</{tag}>'\n\ntag = input()\ncontent = input()\nn = int(input())\nattr_dict = {}\nfor _ in range(n):\n    parts = input().split(' ', 1)\n    attr_dict[parts[0]] = parts[1]\nprint(build_tag(tag, content, **attr_dict))",
      testCases: [
        {
          input: "a\nClick here\n2\nhref https://python.org\ntarget _blank\n",
          expectedOutput: "<a href=\"https://python.org\" target=\"_blank\">Click here</a>\n"
        },
        { input: "p\nHello World\n0\n", expectedOutput: "<p>Hello World</p>\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Universal Function Wrapper",
      prompt: "Define `apply_and_report(func_name, *args, **kwargs)` that:\n1. Looks up the function by name in a dictionary of available functions: `double` (x*2), `square` (x**2), `add` (a+b), `greet` (returns 'Hello, NAME!')\n2. Calls the function with the given args and kwargs\n3. Prints `FUNC_NAME(args, kwargs) = RESULT`\n4. If function not found, prints `Unknown function: FUNC_NAME`\n\nRead commands from input until `quit`. Each line: `func_name arg1 arg2...`",
      starterCode: "# Define apply_and_report and process commands from input\n",
      solutionCode: "def apply_and_report(func_name, *args, **kwargs):\n    functions = {\n        'double': lambda x: float(x) * 2,\n        'square': lambda x: float(x) ** 2,\n        'add': lambda a, b: float(a) + float(b),\n        'greet': lambda name: f'Hello, {name}!',\n    }\n    if func_name not in functions:\n        print(f'Unknown function: {func_name}')\n        return\n    result = functions[func_name](*args)\n    args_str = ', '.join(str(a) for a in args)\n    print(f'{func_name}({args_str}) = {result}')\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    apply_and_report(parts[0], *parts[1:])",
      testCases: [
        {
          input: "double 5\nsquare 4\nadd 3 7\ngreet Alice\nunknown 1\nquit\n",
          expectedOutput: "double(5) = 10.0\nsquare(4) = 16.0\nadd(3, 7) = 10.0\ngreet(Alice) = Hello, Alice!\nUnknown function: unknown\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "return-statement": [
    {
      title: "Return a Value",
      prompt: "Define `square(n)` that returns n squared. Read an integer from input and print the square.",
      starterCode: "# Define square function that returns n**2\n",
      solutionCode: "def square(n):\n    return n ** 2\n\nn = int(input())\nprint(square(n))",
      testCases: [
        { input: "7\n", expectedOutput: "49\n" },
        { input: "0\n", expectedOutput: "0\n" },
        { input: "-4\n", expectedOutput: "16\n" }
      ],
      difficulty: "beginner",
      xpReward: 15
    },
    {
      title: "Multiple Return Values",
      prompt: "Define `analyze_list(numbers)` that returns (minimum, maximum, sum, average) of a list. Read N integers (N given first). Print each stat on a separate line with a label. If N is 0, print `Empty list`.\n\nFormat:\n`Min: X`\n`Max: X`\n`Sum: X`\n`Avg: X.XX`",
      starterCode: "# Define analyze_list returning multiple values\n",
      solutionCode: "def analyze_list(numbers):\n    return min(numbers), max(numbers), sum(numbers), sum(numbers)/len(numbers)\n\nn = int(input())\nif n == 0:\n    print('Empty list')\nelse:\n    nums = [int(input()) for _ in range(n)]\n    mn, mx, s, avg = analyze_list(nums)\n    print(f'Min: {mn}')\n    print(f'Max: {mx}')\n    print(f'Sum: {s}')\n    print(f'Avg: {avg:.2f}')",
      testCases: [
        {
          input: "5\n3\n1\n4\n1\n5\n",
          expectedOutput: "Min: 1\nMax: 5\nSum: 14\nAvg: 2.80\n"
        },
        { input: "0\n", expectedOutput: "Empty list\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Early Return Validator",
      prompt: "Define `validate_password(pwd)` that returns `(True, 'Valid')` or `(False, reason)` using early returns. Rules (check in order):\n1. Must be at least 8 characters\n2. Must contain at least one uppercase letter\n3. Must contain at least one digit\n4. Must not contain spaces\n\nRead passwords from input until empty line. Print `VALID` or `INVALID: reason` for each.",
      starterCode: "# Define validate_password with early returns, check passwords from input\n",
      solutionCode: "def validate_password(pwd):\n    if len(pwd) < 8:\n        return False, 'Too short (min 8 chars)'\n    if not any(c.isupper() for c in pwd):\n        return False, 'Missing uppercase letter'\n    if not any(c.isdigit() for c in pwd):\n        return False, 'Missing digit'\n    if ' ' in pwd:\n        return False, 'Contains spaces'\n    return True, 'Valid'\n\nwhile True:\n    pwd = input()\n    if not pwd:\n        break\n    is_valid, reason = validate_password(pwd)\n    if is_valid:\n        print('VALID')\n    else:\n        print(f'INVALID: {reason}')",
      testCases: [
        {
          input: "Hello123\nabc\nHELLOWORLD\nhello world1A\nSecure99\n\n",
          expectedOutput: "VALID\nINVALID: Too short (min 8 chars)\nINVALID: Missing digit\nINVALID: Contains spaces\nVALID\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Statistics Calculator",
      prompt: "Define `calculate_stats(data)` that returns a dictionary with keys: `mean`, `median`, `mode`, `std_dev`, `range`. Read N floats and compute all stats (rounded to 2dp). Print each stat on a separate line as `KEY: VALUE`. Sort output alphabetically by key. If N < 2, print `Need at least 2 values`.",
      starterCode: "import statistics\n# Define calculate_stats returning a dictionary of stats\n",
      solutionCode: "import statistics\n\ndef calculate_stats(data):\n    mean = statistics.mean(data)\n    median = statistics.median(data)\n    modes = statistics.multimode(data)\n    mode = modes[0] if len(modes) == 1 else modes[0]\n    std_dev = statistics.stdev(data)\n    data_range = max(data) - min(data)\n    return {\n        'mean': round(mean, 2),\n        'median': round(median, 2),\n        'mode': round(mode, 2),\n        'std_dev': round(std_dev, 2),\n        'range': round(data_range, 2)\n    }\n\nn = int(input())\nif n < 2:\n    print('Need at least 2 values')\nelse:\n    data = [float(input()) for _ in range(n)]\n    stats = calculate_stats(data)\n    for key in sorted(stats):\n        print(f'{key}: {stats[key]}')",
      testCases: [
        {
          input: "5\n2\n4\n4\n4\n6\n",
          expectedOutput: "mean: 4.0\nmedian: 4.0\nmode: 4.0\nrange: 4.0\nstd_dev: 1.41\n"
        },
        { input: "1\n5\n", expectedOutput: "Need at least 2 values\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "scope": [
    {
      title: "Local vs Global",
      prompt: "A global variable `message = 'Global message'` is defined. Write a function `show_local()` that creates a LOCAL variable `message = 'Local message'` and prints it. Then print the global message after calling the function. Show they are independent.",
      starterCode: "message = 'Global message'\n# Define show_local() that has its own local message\n",
      solutionCode: "message = 'Global message'\n\ndef show_local():\n    message = 'Local message'\n    print(message)\n\nshow_local()\nprint(message)",
      testCases: [
        { input: "", expectedOutput: "Local message\nGlobal message\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Global Counter",
      prompt: "Define a global `visit_count = 0`. Define `visit()` that increments it using `global` and prints `Visit number: N`. Define `reset_count()` that resets it to 0 and prints `Counter reset`. Read commands from input (`visit`, `reset`, `show`, `quit`). `show` prints the current count.",
      starterCode: "visit_count = 0\n# Define visit() and reset_count() using global keyword\n",
      solutionCode: "visit_count = 0\n\ndef visit():\n    global visit_count\n    visit_count += 1\n    print(f'Visit number: {visit_count}')\n\ndef reset_count():\n    global visit_count\n    visit_count = 0\n    print('Counter reset')\n\nwhile True:\n    cmd = input().strip()\n    if cmd == 'quit':\n        break\n    elif cmd == 'visit':\n        visit()\n    elif cmd == 'reset':\n        reset_count()\n    elif cmd == 'show':\n        print(f'Current count: {visit_count}')",
      testCases: [
        {
          input: "visit\nvisit\nvisit\nshow\nreset\nshow\nvisit\nquit\n",
          expectedOutput: "Visit number: 1\nVisit number: 2\nVisit number: 3\nCurrent count: 3\nCounter reset\nCurrent count: 0\nVisit number: 1\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "nonlocal Counter Factory",
      prompt: "Define `make_counter(start=0, step=1)` that returns a function `counter()`. Each call to `counter()` returns the current count and advances by `step`. Use `nonlocal`. Read `start` and `step` from input, then N call counts. Print the result of each call.",
      starterCode: "# Define make_counter using nonlocal to maintain state\n",
      solutionCode: "def make_counter(start=0, step=1):\n    count = start\n    def counter():\n        nonlocal count\n        current = count\n        count += step\n        return current\n    return counter\n\nstart = int(input())\nstep = int(input())\nn = int(input())\ncounter = make_counter(start, step)\nfor _ in range(n):\n    print(counter())",
      testCases: [
        { input: "0\n1\n5\n", expectedOutput: "0\n1\n2\n3\n4\n" },
        { input: "10\n-2\n4\n", expectedOutput: "10\n8\n6\n4\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "LEGB Scope Tracer",
      prompt: "Read a series of scope operations from input until `quit`:\n- `set_global VAL` → set global variable `x = VAL`\n- `read_global` → print the global x\n- `local_shadow VAL` → call a function that has LOCAL `x = VAL`, prints it, then prints global x\n- `modify_global VAL` → call a function that MODIFIES global x by adding VAL\n\nPrint `x not set` if global x hasn't been defined yet.",
      starterCode: "# Implement scope operations from input\n",
      solutionCode: "x = None\n\ndef local_shadow(val):\n    x = val\n    print(f'Local x: {x}')\n    global_x = globals().get('x')\n    print(f'Global x: {global_x}')\n\ndef modify_global(val):\n    global x\n    if x is None:\n        x = val\n    else:\n        x += val\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    cmd = parts[0]\n    if cmd == 'set_global':\n        x = int(parts[1])\n    elif cmd == 'read_global':\n        print('x not set' if x is None else f'Global x: {x}')\n    elif cmd == 'local_shadow':\n        local_shadow(int(parts[1]))\n    elif cmd == 'modify_global':\n        modify_global(int(parts[1]))\n        print(f'Global x after modify: {x}')",
      testCases: [
        {
          input: "read_global\nset_global 10\nread_global\nlocal_shadow 99\nmodify_global 5\nquit\n",
          expectedOutput: "x not set\nGlobal x: 10\nLocal x: 99\nGlobal x: 10\nGlobal x after modify: 15\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "docstrings": [
    {
      title: "Write a Docstring",
      prompt: "The function `add(a, b)` below is missing a docstring. Add a proper Google-style docstring documenting: what it does, args (both are int or float), and return value. Then print the docstring using `.__doc__`.",
      starterCode: "def add(a, b):\n    return a + b\n\n# Print the docstring\n",
      solutionCode: "def add(a, b):\n    \"\"\"Return the sum of two numbers.\n\n    Args:\n        a (int or float): The first number.\n        b (int or float): The second number.\n\n    Returns:\n        int or float: The sum of a and b.\n    \"\"\"\n    return a + b\n\nprint(add.__doc__)",
      testCases: [
        { input: "", expectedOutput: "Return the sum of two numbers.\n\n    Args:\n        a (int or float): The first number.\n        b (int or float): The second number.\n\n    Returns:\n        int or float: The sum of a and b.\n    \n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Document and Validate",
      prompt: "Write a well-documented function `divide(a, b)` with a Google-style docstring that:\n- Documents args (both numeric)\n- Documents return (float)\n- Documents the ZeroDivisionError raised when b=0\n- Has an example in the docstring\n\nRead a and b from input. Print the result to 2dp or `Error: Cannot divide by zero`.",
      starterCode: "# Write a documented divide function\n",
      solutionCode: "def divide(a, b):\n    \"\"\"Divide a by b and return the result.\n\n    Args:\n        a (float): The numerator.\n        b (float): The denominator.\n\n    Returns:\n        float: The result of a / b.\n\n    Raises:\n        ZeroDivisionError: If b is zero.\n\n    Examples:\n        >>> divide(10, 2)\n        5.0\n    \"\"\"\n    if b == 0:\n        raise ZeroDivisionError('Cannot divide by zero')\n    return a / b\n\ntry:\n    a = float(input())\n    b = float(input())\n    print(f'{divide(a, b):.2f}')\nexcept ZeroDivisionError as e:\n    print(f'Error: {e}')",
      testCases: [
        { input: "10\n4\n", expectedOutput: "2.50\n" },
        { input: "10\n0\n", expectedOutput: "Error: Cannot divide by zero\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    }
  ],

  "recursive-functions": [
    {
      title: "Recursive Factorial",
      prompt: "Write a recursive function `factorial(n)` that returns n!. Read a non-negative integer from input and print its factorial. If n < 0, print `Invalid: n must be non-negative`.",
      starterCode: "# Write recursive factorial function\n",
      solutionCode: "def factorial(n):\n    if n < 0:\n        return None\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nif n < 0:\n    print('Invalid: n must be non-negative')\nelse:\n    print(factorial(n))",
      testCases: [
        { input: "5\n", expectedOutput: "120\n" },
        { input: "0\n", expectedOutput: "1\n" },
        { input: "-1\n", expectedOutput: "Invalid: n must be non-negative\n" }
      ],
      difficulty: "beginner",
      xpReward: 25
    },
    {
      title: "Recursive Sum",
      prompt: "Write a recursive function `recursive_sum(lst)` that sums a list WITHOUT using `sum()`. Read N integers (N given first). Print the sum. If N is 0, print `0`.",
      starterCode: "# Write recursive_sum without using sum()\n",
      solutionCode: "def recursive_sum(lst):\n    if not lst:\n        return 0\n    return lst[0] + recursive_sum(lst[1:])\n\nn = int(input())\nif n == 0:\n    print(0)\nelse:\n    numbers = [int(input()) for _ in range(n)]\n    print(recursive_sum(numbers))",
      testCases: [
        { input: "5\n1\n2\n3\n4\n5\n", expectedOutput: "15\n" },
        { input: "0\n", expectedOutput: "0\n" },
        { input: "1\n42\n", expectedOutput: "42\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Fibonacci with Memoization",
      prompt: "Write `fibonacci(n)` using recursion AND `@lru_cache` for memoization. Read N from input. Print:\n1. The Nth Fibonacci number\n2. The first N Fibonacci numbers as a list\n3. Their sum\n\nIf N <= 0, print `Invalid N`. If N > 50, print `N too large`.",
      starterCode: "from functools import lru_cache\n# Write memoized fibonacci and compute stats\n",
      solutionCode: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fibonacci(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n-1) + fibonacci(n-2)\n\nn = int(input())\nif n <= 0:\n    print('Invalid N')\nelif n > 50:\n    print('N too large')\nelse:\n    print(fibonacci(n))\n    fibs = [fibonacci(i) for i in range(1, n+1)]\n    print(fibs)\n    print(sum(fibs))",
      testCases: [
        {
          input: "7\n",
          expectedOutput: "13\n[1, 1, 2, 3, 5, 8, 13]\n33\n"
        },
        { input: "0\n", expectedOutput: "Invalid N\n" },
        { input: "51\n", expectedOutput: "N too large\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Recursive Flatten and Search",
      prompt: "Write two recursive functions:\n1. `flatten(nested)` - flatten a nested list to a 1D list\n2. `recursive_search(lst, target)` - return the index of first occurrence in FLATTENED list, or -1\n\nRead a description of a nested list from input (as a Python literal eval), then a target. Print the flattened list and the search result.\n\nIf eval fails, print `Invalid input`.",
      starterCode: "# Write recursive flatten and recursive_search functions\n",
      solutionCode: "def flatten(nested):\n    result = []\n    for item in nested:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result\n\ndef recursive_search(lst, target, index=0):\n    if index >= len(lst):\n        return -1\n    if lst[index] == target:\n        return index\n    return recursive_search(lst, target, index + 1)\n\ntry:\n    nested = eval(input())\n    target = eval(input())\n    flat = flatten(nested)\n    print(flat)\n    idx = recursive_search(flat, target)\n    print(idx)\nexcept:\n    print('Invalid input')",
      testCases: [
        {
          input: "[1, [2, 3], [4, [5, 6]]]\n5\n",
          expectedOutput: "[1, 2, 3, 4, 5, 6]\n4\n"
        },
        {
          input: "[1, [2, 3], [4, [5, 6]]]\n99\n",
          expectedOutput: "[1, 2, 3, 4, 5, 6]\n-1\n"
        }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "nested-functions": [
    {
      title: "Multiplier Factory",
      prompt: "Define `make_multiplier(factor)` that returns a closure. The returned function takes a number and returns it multiplied by `factor`. Read factor and N numbers from input. Print each multiplied result.",
      starterCode: "# Define make_multiplier that returns a closure\n",
      solutionCode: "def make_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\nfactor = float(input())\nn = int(input())\nmultiply = make_multiplier(factor)\nfor _ in range(n):\n    x = float(input())\n    print(multiply(x))",
      testCases: [
        { input: "3\n4\n1\n2\n3\n4\n", expectedOutput: "3.0\n6.0\n9.0\n12.0\n" },
        { input: "0.5\n3\n10\n20\n40\n", expectedOutput: "5.0\n10.0\n20.0\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Validator Factory",
      prompt: "Define `make_range_validator(min_val, max_val, name='value')` that returns a validator closure. The validator takes a number and returns `(True, 'OK')` or `(False, 'FIELD must be between MIN and MAX')`. Read min, max, field name, then N values. Print `VALID` or `INVALID: reason` for each.",
      starterCode: "# Define make_range_validator and use it to validate input\n",
      solutionCode: "def make_range_validator(min_val, max_val, name='value'):\n    def validate(x):\n        if min_val <= x <= max_val:\n            return True, 'OK'\n        return False, f'{name} must be between {min_val} and {max_val}'\n    return validate\n\nmin_val = float(input())\nmax_val = float(input())\nname = input()\nn = int(input())\nvalidate = make_range_validator(min_val, max_val, name)\nfor _ in range(n):\n    x = float(input())\n    is_valid, msg = validate(x)\n    if is_valid:\n        print('VALID')\n    else:\n        print(f'INVALID: {msg}')",
      testCases: [
        {
          input: "0\n100\nscore\n4\n85\n-5\n100\n101\n",
          expectedOutput: "VALID\nINVALID: score must be between 0.0 and 100.0\nVALID\nINVALID: score must be between 0.0 and 100.0\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Accumulator with Closure",
      prompt: "Define `make_accumulator(initial=0)` that returns three closures: `add(x)`, `subtract(x)`, `get_total()`. Use `nonlocal` to share state. Read `initial` then commands until `quit`:\n- `add X` → add X to total, print new total\n- `sub X` → subtract X, print new total\n- `get` → print current total\n\nIf total goes below 0, print `Warning: negative balance` after printing the total.",
      starterCode: "# Define make_accumulator returning add, subtract, get_total closures\n",
      solutionCode: "def make_accumulator(initial=0):\n    total = initial\n    def add(x):\n        nonlocal total\n        total += x\n        return total\n    def subtract(x):\n        nonlocal total\n        total -= x\n        return total\n    def get_total():\n        return total\n    return add, subtract, get_total\n\ninitial = float(input())\nadd, subtract, get_total = make_accumulator(initial)\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    if parts[0] == 'add':\n        result = add(float(parts[1]))\n        print(result)\n        if result < 0:\n            print('Warning: negative balance')\n    elif parts[0] == 'sub':\n        result = subtract(float(parts[1]))\n        print(result)\n        if result < 0:\n            print('Warning: negative balance')\n    elif parts[0] == 'get':\n        print(get_total())",
      testCases: [
        {
          input: "100\nadd 50\nsub 200\nget\nadd 75\nquit\n",
          expectedOutput: "150.0\n-50.0\nWarning: negative balance\n-50.0\n25.0\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "lambda-functions": [
    {
      title: "Basic Lambda Square",
      prompt: "Assign a lambda to `square` that returns its argument squared, then print `square(6)`.",
      starterCode: "# Assign a lambda to square and call it\n",
      solutionCode: "square = lambda x: x ** 2\nprint(square(6))",
      testCases: [
        { input: "", expectedOutput: "36\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Lambda with Two Parameters",
      prompt: "Create a lambda `add` that takes two arguments and returns their sum, then print `add(8, 12)`.",
      starterCode: "# Create an add lambda and call it\n",
      solutionCode: "add = lambda a, b: a + b\nprint(add(8, 12))",
      testCases: [
        { input: "", expectedOutput: "20\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Conditional Lambda",
      prompt: "Create a lambda `classify` that returns 'even' if its argument is even, otherwise 'odd', then print `classify(7)` and `classify(10)`.",
      starterCode: "# Create a classify lambda using a conditional expression\n",
      solutionCode: "classify = lambda n: 'even' if n % 2 == 0 else 'odd'\nprint(classify(7))\nprint(classify(10))",
      testCases: [
        { input: "", expectedOutput: "odd\neven\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Lambda as a Sort Key",
      prompt: "Given `people = [{'name': 'Bob', 'age': 25}, {'name': 'Alice', 'age': 30}, {'name': 'Carol', 'age': 20}]`, sort it by `age` using a lambda key and print the names in order, joined by commas.",
      starterCode: "# Sort people by age using a lambda key\n",
      solutionCode: "people = [{'name': 'Bob', 'age': 25}, {'name': 'Alice', 'age': 30}, {'name': 'Carol', 'age': 20}]\nby_age = sorted(people, key=lambda p: p['age'])\nprint(', '.join(p['name'] for p in by_age))",
      testCases: [
        { input: "", expectedOutput: "Carol, Bob, Alice\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Map with Lambda",
      prompt: "Use `map()` with a lambda that doubles a number to transform `[1, 2, 3, 4, 5]` into a list, then print the result.",
      starterCode: "# Use map with a lambda to double each number\n",
      solutionCode: "result = list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))\nprint(result)",
      testCases: [
        { input: "", expectedOutput: "[2, 4, 6, 8, 10]\n" }
      ],
      difficulty: "advanced",
      xpReward: 55
    },
    {
      title: "Filter with Lambda",
      prompt: "Use `filter()` with a lambda that keeps only even numbers to filter `[1, 2, 3, 4, 5, 6]`, convert the result to a list, and print it.",
      starterCode: "# Use filter with a lambda to keep even numbers\n",
      solutionCode: "evens = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))\nprint(evens)",
      testCases: [
        { input: "", expectedOutput: "[2, 4, 6]\n" }
      ],
      difficulty: "advanced",
      xpReward: 55
    }
  ],

  "first-class-functions": [
    {
      title: "Functions as Arguments",
      prompt: "Define `apply_twice(func, value)` that applies `func` to `value` twice (applies func to the result of func(value)). Test it with `double` (x*2) and `increment` (x+1). Read a number from input and print:\n1. apply_twice(double, n)\n2. apply_twice(increment, n)",
      starterCode: "# Define apply_twice and test with double and increment\n",
      solutionCode: "def apply_twice(func, value):\n    return func(func(value))\n\ndef double(x):\n    return x * 2\n\ndef increment(x):\n    return x + 1\n\nn = float(input())\nprint(apply_twice(double, n))\nprint(apply_twice(increment, n))",
      testCases: [
        { input: "5\n", expectedOutput: "20.0\n7.0\n" },
        { input: "3\n", expectedOutput: "12.0\n5.0\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Function Pipeline",
      prompt: "Define `create_pipeline(*functions)` that returns a function applying all functions in sequence. Read N function names from input (N given first) and a value to process. Available functions: `double`, `square`, `negate`, `increment`, `absolute`. Apply the pipeline and print the result.\n\nIf a function name is unknown, print `Unknown function: NAME`.",
      starterCode: "# Define create_pipeline and build from input function names\n",
      solutionCode: "def create_pipeline(*functions):\n    def pipeline(value):\n        result = value\n        for func in functions:\n            result = func(result)\n        return result\n    return pipeline\n\navailable = {\n    'double': lambda x: x * 2,\n    'square': lambda x: x ** 2,\n    'negate': lambda x: -x,\n    'increment': lambda x: x + 1,\n    'absolute': abs,\n}\n\nn = int(input())\nfunc_list = []\nvalid = True\nfor _ in range(n):\n    name = input().strip()\n    if name not in available:\n        print(f'Unknown function: {name}')\n        valid = False\n        break\n    func_list.append(available[name])\n\nif valid:\n    value = float(input())\n    pipeline = create_pipeline(*func_list)\n    print(pipeline(value))",
      testCases: [
        { input: "3\ndouble\nincrement\nsquare\n5\n", expectedOutput: "121.0\n" },
        { input: "2\nnegate\nabsolute\n-7\n", expectedOutput: "7.0\n" },
        { input: "2\ndouble\nunknown\n5\n", expectedOutput: "Unknown function: unknown\n" }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "Dispatch Table Calculator",
      prompt: "Build a calculator using a dictionary of functions (dispatch table). Support: `+`, `-`, `*`, `/`, `**`, `%`, `//`. Read operations from input until `quit`. Each line: `A OP B`. Print result to 4dp or `Error: reason` for invalid operations.\n\nAlso support unary operations: `abs X`, `round X N`, `sqrt X`.",
      starterCode: "import math\n# Build dispatch table calculator\n",
      solutionCode: "import math\n\nbinary_ops = {\n    '+':  lambda a, b: a + b,\n    '-':  lambda a, b: a - b,\n    '*':  lambda a, b: a * b,\n    '/':  lambda a, b: a / b if b != 0 else None,\n    '**': lambda a, b: a ** b,\n    '%':  lambda a, b: a % b if b != 0 else None,\n    '//': lambda a, b: a // b if b != 0 else None,\n}\n\nunary_ops = {\n    'abs':   lambda x, *_: abs(x),\n    'sqrt':  lambda x, *_: math.sqrt(x) if x >= 0 else None,\n    'round': lambda x, n=0: round(x, int(n)),\n}\n\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    parts = line.split()\n    if parts[0] in unary_ops:\n        try:\n            x = float(parts[1])\n            extra = float(parts[2]) if len(parts) > 2 else 0\n            result = unary_ops[parts[0]](x, extra)\n            if result is None:\n                print('Error: invalid operation')\n            else:\n                print(round(result, 4))\n        except (ValueError, IndexError):\n            print('Error: invalid input')\n    elif len(parts) == 3:\n        try:\n            a, op, b = float(parts[0]), parts[1], float(parts[2])\n            if op not in binary_ops:\n                print(f'Error: unknown operator {op}')\n            else:\n                result = binary_ops[op](a, b)\n                if result is None:\n                    print('Error: division by zero')\n                else:\n                    print(round(result, 4))\n        except ValueError:\n            print('Error: invalid input')\n    else:\n        print('Error: invalid format')",
      testCases: [
        {
          input: "10 + 5\n10 / 0\n2 ** 10\nabs -42\nsqrt 16\nround 3.14159 2\nquit\n",
          expectedOutput: "15.0\nError: division by zero\n1024.0\n42.0\n4.0\n3.14\n"
        }
      ],
      difficulty: "expert",
      xpReward: 95
    }
  ]
};