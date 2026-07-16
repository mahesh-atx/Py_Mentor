export const exercises: Record<string, any[]> = {
  "try-except-else-finally": [
    {
      "title": "Safe Division",
      "prompt": "Write a function `safe_divide(a, b)` that returns `a / b` but handles:\n- `ZeroDivisionError` → print `Error: Cannot divide by zero` and return `None`\n- `TypeError` → print `Error: Both arguments must be numbers` and return `None`\n\nRead two values from input and call the function. Print the result (rounded to 2dp) or the error.",
      "starterCode": "# Write safe_divide with try/except\n",
      "solutionCode": "def safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print('Error: Cannot divide by zero')\n        return None\n    except TypeError:\n        print('Error: Both arguments must be numbers')\n        return None\n    else:\n        return result\n\ntry:\n    a = float(input())\n    b = float(input())\nexcept ValueError:\n    a, b = input(), input()\n\nresult = safe_divide(a, b)\nif result is not None:\n    print(round(result, 2))",
      "testCases": [
        {
          "input": "10\n4\n",
          "expectedOutput": "2.5\n"
        },
        {
          "input": "10\n0\n",
          "expectedOutput": "Error: Cannot divide by zero\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "try / except / else / finally All Four",
      "prompt": "Write a function `parse_and_calculate(text)` that:\n1. **try**: converts text to float and computes its square root (import math)\n2. **except ValueError**: prints `Invalid number: TEXT` and returns None\n3. **except** for negative sqrt: prints `Cannot take sqrt of negative: N` and returns None\n4. **else**: prints `Result: X` (4dp) and returns the result\n5. **finally**: always prints `Calculation complete`\n\nRead N values (N given first) and call the function for each.",
      "starterCode": "import math\n# Write parse_and_calculate using all four blocks\n",
      "solutionCode": "import math\n\ndef parse_and_calculate(text):\n    try:\n        n = float(text)\n        if n < 0:\n            raise ValueError(f'Cannot take sqrt of negative: {n}')\n        result = math.sqrt(n)\n    except ValueError as e:\n        msg = str(e)\n        if 'sqrt' in msg:\n            print(msg)\n        else:\n            print(f'Invalid number: {text}')\n        return None\n    else:\n        print(f'Result: {result:.4f}')\n        return result\n    finally:\n        print('Calculation complete')\n\nn = int(input())\nfor _ in range(n):\n    text = input().strip()\n    parse_and_calculate(text)",
      "testCases": [
        {
          "input": "3\n16\nhello\n-4\n",
          "expectedOutput": "Result: 4.0000\nCalculation complete\nInvalid number: hello\nCalculation complete\nCannot take sqrt of negative: -4.0\nCalculation complete\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 50
    },
    {
      "title": "Retry Logic",
      "prompt": "Implement `retry(func, max_attempts, exceptions)`. It calls `func()` up to `max_attempts` times. On each failure (one of the given exceptions), print `Attempt N failed: ERROR`. If all fail, print `All N attempts failed` and return None. If success, print `Succeeded on attempt N` and return the result.\n\nSimulate with a counter: fail for first K attempts, succeed on attempt K+1. Read max_attempts and K from input.",
      "starterCode": "# Implement retry logic\n",
      "solutionCode": "def retry(func, max_attempts, exceptions):\n    for attempt in range(1, max_attempts + 1):\n        try:\n            result = func()\n            print(f'Succeeded on attempt {attempt}')\n            return result\n        except exceptions as e:\n            print(f'Attempt {attempt} failed: {e}')\n    print(f'All {max_attempts} attempts failed')\n    return None\n\nmax_attempts = int(input())\nk = int(input())\ncall_count = [0]\n\ndef flaky_function():\n    call_count[0] += 1\n    if call_count[0] <= k:\n        raise RuntimeError(f'Temporary error #{call_count[0]}')\n    return f'Success after {k} failures'\n\nresult = retry(flaky_function, max_attempts, RuntimeError)\nif result:\n    print(result)",
      "testCases": [
        {
          "input": "5\n2\n",
          "expectedOutput": "Attempt 1 failed: Temporary error #1\nAttempt 2 failed: Temporary error #2\nSucceeded on attempt 3\nSuccess after 2 failures\n"
        },
        {
          "input": "3\n5\n",
          "expectedOutput": "Attempt 1 failed: Temporary error #1\nAttempt 2 failed: Temporary error #2\nAttempt 3 failed: Temporary error #3\nAll 3 attempts failed\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Basic Try/Except",
      "prompt": "Use a `try-except` block to catch a `ZeroDivisionError` when dividing 10 by 0. In the except block, print 'Cannot divide by zero'.",
      "starterCode": "# Write try-except for 10 / 0\n",
      "solutionCode": "try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Cannot divide by zero\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Catching Multiple Exceptions",
      "prompt": "Given a string `s = 'a'`. Try to convert it to an integer using `int(s)`. Use a single `except` block to catch `(ValueError, TypeError)` and print 'Invalid conversion'.",
      "starterCode": "s = 'a'\n# Try converting to int, catch ValueError or TypeError\n",
      "solutionCode": "s = 'a'\ntry:\n    res = int(s)\nexcept (ValueError, TypeError):\n    print('Invalid conversion')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Invalid conversion\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Using Else",
      "prompt": "Use `try-except-else`. Try dividing 10 by 2. Catch `ZeroDivisionError`. In the `else` block, print 'Success'.",
      "starterCode": "# Try division, add except, and add else block\n",
      "solutionCode": "try:\n    res = 10 / 2\nexcept ZeroDivisionError:\n    print('Error')\nelse:\n    print('Success')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Success\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Using Finally",
      "prompt": "Use `try-finally`. Try printing 'Executing'. In the `finally` block, print 'Cleaning up'. (No except block is needed here).",
      "starterCode": "# Write try-finally\n",
      "solutionCode": "try:\n    print('Executing')\nfinally:\n    print('Cleaning up')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Executing\nCleaning up\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "common-exceptions": [
    {
      "title": "Identify the Exception",
      "prompt": "For each of these operations, catch the specific exception and print its type name and message:\n1. `int('hello')`\n2. `[][0]`\n3. `{}['key']`\n4. `10 / 0`\n5. `None.upper()`\n\nPrint format: `ExceptionType: message`",
      "starterCode": "# Catch specific exceptions for each operation\n",
      "solutionCode": "operations = [\n    lambda: int('hello'),\n    lambda: [][0],\n    lambda: {}['key'],\n    lambda: 10 / 0,\n    lambda: None.upper(),\n]\n\nfor op in operations:\n    try:\n        op()\n    except Exception as e:\n        print(f'{type(e).__name__}: {e}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "ValueError: invalid literal for int() with base 10: 'hello'\nIndexError: list index out of range\nKeyError: 'key'\nZeroDivisionError: division by zero\nAttributeError: 'NoneType' object has no attribute 'upper'\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 25
    },
    {
      "title": "Multi-Exception Handler",
      "prompt": "Write `safe_process(data)` that takes a dict and:\n1. Gets `data['value']` → KeyError if missing → print `Missing key: value`\n2. Converts to int → ValueError → print `Not a number: VALUE`\n3. Computes `100 / int_value` → ZeroDivisionError → print `Division by zero`\n4. On success → print `Result: X.Xf`\n\nRead N test cases (N given first, each line is a Python-eval-able dict). Handle eval errors with `Invalid input`.",
      "starterCode": "# Write safe_process with multi-exception handling\n",
      "solutionCode": "def safe_process(data):\n    try:\n        raw = data['value']\n    except KeyError:\n        print('Missing key: value')\n        return\n    try:\n        num = int(raw)\n    except (ValueError, TypeError):\n        print(f'Not a number: {raw}')\n        return\n    try:\n        result = 100 / num\n    except ZeroDivisionError:\n        print('Division by zero')\n        return\n    print(f'Result: {result:.1f}')\n\nn = int(input())\nfor _ in range(n):\n    line = input()\n    try:\n        data = eval(line)\n        safe_process(data)\n    except Exception:\n        print('Invalid input')",
      "testCases": [
        {
          "input": "4\n{'value': '4'}\n{'value': '0'}\n{'other': '5'}\n{'value': 'abc'}\n",
          "expectedOutput": "Result: 25.0\nDivision by zero\nMissing key: value\nNot a number: abc\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Catch ValueError",
      "prompt": "Use `int(input())` to read a number. The test case provides 'abc'. Catch `ValueError` and print 'Not a number'.",
      "starterCode": "# Read input as int, catch ValueError\n",
      "solutionCode": "try:\n    n = int(input())\nexcept ValueError:\n    print('Not a number')",
      "testCases": [
        {
          "input": "abc\n",
          "expectedOutput": "Not a number\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Catch KeyError",
      "prompt": "Given `d = {'a': 1}`. Try to print `d['b']`. Catch `KeyError` and print 'Missing key'.",
      "starterCode": "d = {'a': 1}\n# Try accessing 'b', catch KeyError\n",
      "solutionCode": "d = {'a': 1}\ntry:\n    print(d['b'])\nexcept KeyError:\n    print('Missing key')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Missing key\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Catch IndexError",
      "prompt": "Given `lst = [1]`. Try to print `lst[5]`. Catch `IndexError` and print 'Out of bounds'.",
      "starterCode": "lst = [1]\n# Try accessing index 5, catch IndexError\n",
      "solutionCode": "lst = [1]\ntry:\n    print(lst[5])\nexcept IndexError:\n    print('Out of bounds')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Out of bounds\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "raising-exceptions": [
    {
      "title": "Input Validator",
      "prompt": "Write `validate_age(age)` that raises:\n- `TypeError` if age is not an int\n- `ValueError` with message `Age must be 0-150, got AGE` if out of range\n- Returns age if valid\n\nWrite `validate_name(name)` that raises:\n- `TypeError` if not a string\n- `ValueError` with `Name cannot be empty` if blank\n- `ValueError` with `Name too long (max 50)` if > 50 chars\n- Returns stripped title-cased name if valid\n\nRead N pairs (N given first, each line: `name age`). Print result or error.",
      "starterCode": "# Write validate_age and validate_name with raises\n",
      "solutionCode": "def validate_age(age):\n    if not isinstance(age, int):\n        raise TypeError(f'Age must be int, got {type(age).__name__}')\n    if not 0 <= age <= 150:\n        raise ValueError(f'Age must be 0-150, got {age}')\n    return age\n\ndef validate_name(name):\n    if not isinstance(name, str):\n        raise TypeError('Name must be a string')\n    if not name.strip():\n        raise ValueError('Name cannot be empty')\n    if len(name.strip()) > 50:\n        raise ValueError('Name too long (max 50)')\n    return name.strip().title()\n\nn = int(input())\nfor _ in range(n):\n    parts = input().rsplit(' ', 1)\n    raw_name = parts[0]\n    raw_age = parts[1]\n    try:\n        age = validate_age(int(raw_age))\n        name = validate_name(raw_name)\n        print(f'Valid: {name}, age {age}')\n    except (ValueError, TypeError) as e:\n        print(f'Error: {e}')",
      "testCases": [
        {
          "input": "3\nAlice 25\n 30\nBob 200\n",
          "expectedOutput": "Valid: Alice, age 25\nError: Name cannot be empty\nError: Age must be 0-150, got 200\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 50
    },
    {
      "title": "Exception Chaining",
      "prompt": "Write a data loading pipeline:\n1. `parse_int(s)` → raises `ValueError(f'Cannot parse int: {s!r}')` if s is not numeric\n2. `load_record(line)` → splits line by `,`, parses first field as id (int), second as name (str, non-empty), third as score (float 0-100). Raises `RuntimeError(f'Bad record: {reason}') from original_exception` using exception chaining for parse errors\n3. Read N lines (N given first) and process each. Print record or `Failed: ERROR` and `Caused by: CAUSE`.",
      "starterCode": "# Implement parse pipeline with exception chaining\n",
      "solutionCode": "def parse_int(s):\n    s = s.strip()\n    if not s.lstrip('-').isdigit():\n        raise ValueError(f'Cannot parse int: {s!r}')\n    return int(s)\n\ndef load_record(line):\n    parts = line.split(',')\n    if len(parts) != 3:\n        raise RuntimeError(f'Expected 3 fields, got {len(parts)}')\n    \n    try:\n        record_id = parse_int(parts[0])\n    except ValueError as e:\n        raise RuntimeError(f'Bad record: invalid id') from e\n    \n    name = parts[1].strip()\n    if not name:\n        raise RuntimeError('Bad record: name cannot be empty')\n    \n    try:\n        score = float(parts[2].strip())\n        if not 0 <= score <= 100:\n            raise ValueError(f'Score out of range: {score}')\n    except ValueError as e:\n        raise RuntimeError(f'Bad record: invalid score') from e\n    \n    return {'id': record_id, 'name': name, 'score': score}\n\nn = int(input())\nfor _ in range(n):\n    line = input()\n    try:\n        record = load_record(line)\n        print(f\"Record: id={record['id']}, name={record['name']}, score={record['score']}\")\n    except RuntimeError as e:\n        print(f'Failed: {e}')\n        if e.__cause__:\n            print(f'Caused by: {e.__cause__}')",
      "testCases": [
        {
          "input": "3\n1,Alice,88.5\nabc,Bob,72\n2,Charlie,150\n",
          "expectedOutput": "Record: id=1, name=Alice, score=88.5\nFailed: Bad record: invalid id\nCaused by: Cannot parse int: 'abc'\nFailed: Bad record: invalid score\nCaused by: Score out of range: 150.0\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Raise ValueError",
      "prompt": "Define a function `check_age(age)`. If `age < 0`, use `raise ValueError('Negative age')`. Otherwise print 'Valid'. Call `check_age(-5)` inside a try-except, print the exception message.",
      "starterCode": "# Define function, raise exception, call it inside try-except\n",
      "solutionCode": "def check_age(age):\n    if age < 0:\n        raise ValueError('Negative age')\n    print('Valid')\n\ntry:\n    check_age(-5)\nexcept ValueError as e:\n    print(e)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Negative age\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ],
  "custom-exceptions": [
    {
      "title": "Custom Exception Hierarchy",
      "prompt": "Define:\n- `AppError(Exception)` base class with `code` attribute\n- `ValidationError(AppError)` with `field` and `value` attributes, message: `Field 'FIELD': VALUE_IS_INVALID`\n- `NotFoundError(AppError)` with `resource` and `id` attributes, message: `RESOURCE #ID not found`\n\nRead N commands (N given first):\n- `validate FIELD VALUE` → raise ValidationError(field, value)\n- `find RESOURCE ID` → raise NotFoundError(resource, id)\n\nCatch each and print: `ExceptionType (code=CODE): message` then `  field=X` or `  resource=X` as applicable.",
      "starterCode": "# Define custom exception hierarchy\n",
      "solutionCode": "class AppError(Exception):\n    def __init__(self, message, code='APP_ERROR'):\n        self.code = code\n        super().__init__(message)\n\nclass ValidationError(AppError):\n    def __init__(self, field, value):\n        self.field = field\n        self.value = value\n        super().__init__(f\"Field '{field}': {value!r} is invalid\", 'VALIDATION_ERROR')\n\nclass NotFoundError(AppError):\n    def __init__(self, resource, resource_id):\n        self.resource = resource\n        self.resource_id = resource_id\n        super().__init__(f'{resource} #{resource_id} not found', 'NOT_FOUND')\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    try:\n        if parts[0] == 'validate':\n            raise ValidationError(parts[1], parts[2])\n        elif parts[0] == 'find':\n            raise NotFoundError(parts[1], parts[2])\n    except ValidationError as e:\n        print(f'{type(e).__name__} (code={e.code}): {e}')\n        print(f'  field={e.field}')\n    except NotFoundError as e:\n        print(f'{type(e).__name__} (code={e.code}): {e}')\n        print(f'  resource={e.resource}')\n    except AppError as e:\n        print(f'{type(e).__name__} (code={e.code}): {e}')",
      "testCases": [
        {
          "input": "3\nvalidate email bad-email\nfind User 42\nvalidate age -5\n",
          "expectedOutput": "ValidationError (code=VALIDATION_ERROR): Field 'email': 'bad-email' is invalid\n  field=email\nNotFoundError (code=NOT_FOUND): User #42 not found\n  resource=User\nValidationError (code=VALIDATION_ERROR): Field 'age': '-5' is invalid\n  field=age\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "E-commerce Order System",
      "prompt": "Build an order system with custom exceptions:\n- `ShopError(Exception)` - base\n- `OutOfStockError(ShopError)` with `product` and `available` attrs\n- `InvalidQuantityError(ShopError)` with `quantity` attr\n- `ProductNotFoundError(ShopError)` with `product_id` attr\n\nInventory: `{'A': 5, 'B': 0, 'C': 10}`. Write `place_order(product_id, quantity)` that raises the right exception. Read N orders (N given first, each line: `product_id quantity`). Print `Order placed: PRODUCT x QTY` or the specific error.",
      "starterCode": "# Build order system with custom exception hierarchy\n",
      "solutionCode": "class ShopError(Exception):\n    pass\n\nclass OutOfStockError(ShopError):\n    def __init__(self, product, available):\n        self.product = product\n        self.available = available\n        super().__init__(f'{product} is out of stock (available: {available})')\n\nclass InvalidQuantityError(ShopError):\n    def __init__(self, quantity):\n        self.quantity = quantity\n        super().__init__(f'Invalid quantity: {quantity} (must be > 0)')\n\nclass ProductNotFoundError(ShopError):\n    def __init__(self, product_id):\n        self.product_id = product_id\n        super().__init__(f'Product {product_id!r} not found')\n\nINVENTORY = {'A': 5, 'B': 0, 'C': 10}\n\ndef place_order(product_id, quantity):\n    if product_id not in INVENTORY:\n        raise ProductNotFoundError(product_id)\n    if quantity <= 0:\n        raise InvalidQuantityError(quantity)\n    available = INVENTORY[product_id]\n    if quantity > available:\n        raise OutOfStockError(product_id, available)\n    INVENTORY[product_id] -= quantity\n    return f'Order placed: {product_id} x {quantity}'\n\nn = int(input())\nfor _ in range(n):\n    parts = input().split()\n    pid = parts[0]\n    qty = int(parts[1])\n    try:\n        print(place_order(pid, qty))\n    except ShopError as e:\n        print(f'Error ({type(e).__name__}): {e}')",
      "testCases": [
        {
          "input": "5\nA 3\nB 1\nC 5\nX 2\nA 0\n",
          "expectedOutput": "Order placed: A x 3\nError (OutOfStockError): B is out of stock (available: 0)\nOrder placed: C x 5\nError (ProductNotFoundError): Product 'X' not found\nError (InvalidQuantityError): Invalid quantity: 0 (must be > 0)\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Define Custom Exception",
      "prompt": "Create a class `NetworkError` that inherits from `Exception`. Then raise `NetworkError('Timeout')` inside a try-except block, catching `NetworkError` and printing the exception.",
      "starterCode": "# Define NetworkError, raise it, catch it, print it\n",
      "solutionCode": "class NetworkError(Exception):\n    pass\n\ntry:\n    raise NetworkError('Timeout')\nexcept NetworkError as e:\n    print(e)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Timeout\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    }
  ],
  "assertions": [
    {
      "title": "Binary Search with Assertions",
      "prompt": "Implement `binary_search(arr, target)` with assertions:\n- Assert arr is a list\n- Assert arr is not empty\n- Assert arr is sorted\n- Returns index of target or -1 if not found\n\nRead N (sorted array size), then N integers, then M targets (M given). For each target, print the index or -1. If any assertion fails, print `AssertionError: MESSAGE`.",
      "starterCode": "# Implement binary_search with precondition assertions\n",
      "solutionCode": "def binary_search(arr, target):\n    assert isinstance(arr, list), 'arr must be a list'\n    assert len(arr) > 0, 'arr cannot be empty'\n    assert arr == sorted(arr), 'arr must be sorted'\n    \n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nn = int(input())\narr = [int(input()) for _ in range(n)]\nm = int(input())\nfor _ in range(m):\n    target = int(input())\n    try:\n        result = binary_search(arr, target)\n        print(result)\n    except AssertionError as e:\n        print(f'AssertionError: {e}')",
      "testCases": [
        {
          "input": "5\n1\n3\n5\n7\n9\n3\n5\n6\n1\n",
          "expectedOutput": "2\n-1\n0\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Data Processor with Assertions",
      "prompt": "Write `normalize_list(data)` that normalizes values to [0, 1] range.\n- Assert data is a non-empty list\n- Assert all items are numeric (int or float)\n- Compute: `(x - min) / (max - min)` for each, OR `0.5` for all if max == min\n- Assert all results are in [0.0, 1.0] (postcondition)\n- Returns the normalized list (rounded to 4dp)\n\nAlso write `compute_stats(data)` using assert for preconditions (non-empty list of numbers) returning mean, min, max (2dp each).\n\nRead N numbers (N given first). Run both functions and print results.",
      "starterCode": "# Write normalize_list and compute_stats with assertions\n",
      "solutionCode": "def normalize_list(data):\n    assert isinstance(data, list) and len(data) > 0, 'data must be non-empty list'\n    assert all(isinstance(x, (int, float)) for x in data), 'all items must be numeric'\n    \n    mn, mx = min(data), max(data)\n    if mx == mn:\n        result = [0.5] * len(data)\n    else:\n        result = [(x - mn) / (mx - mn) for x in data]\n    \n    assert all(0.0 <= r <= 1.0 for r in result), 'Normalization bug!'\n    return [round(r, 4) for r in result]\n\ndef compute_stats(data):\n    assert isinstance(data, list) and len(data) > 0, 'data must be non-empty list'\n    assert all(isinstance(x, (int, float)) for x in data), 'all items must be numeric'\n    return {\n        'mean': round(sum(data) / len(data), 2),\n        'min': round(min(data), 2),\n        'max': round(max(data), 2)\n    }\n\nn = int(input())\ndata = [float(input()) for _ in range(n)]\n\ntry:\n    normalized = normalize_list(data)\n    print(f'Normalized: {normalized}')\nexcept AssertionError as e:\n    print(f'Normalize error: {e}')\n\ntry:\n    stats = compute_stats(data)\n    print(f\"Mean: {stats['mean']}, Min: {stats['min']}, Max: {stats['max']}\")\nexcept AssertionError as e:\n    print(f'Stats error: {e}')",
      "testCases": [
        {
          "input": "5\n10\n20\n30\n40\n50\n",
          "expectedOutput": "Normalized: [0.0, 0.25, 0.5, 0.75, 1.0]\nMean: 30.0, Min: 10.0, Max: 50.0\n"
        },
        {
          "input": "3\n5\n5\n5\n",
          "expectedOutput": "Normalized: [0.5, 0.5, 0.5]\nMean: 5.0, Min: 5.0, Max: 5.0\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Testing Calculator with Assertions",
      "prompt": "Build a simple calculator and write tests using assertions.\n\nFunctions: `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)` (raises `ZeroDivisionError` if b==0), `power(base, exp)`.\n\nWrite `run_tests()` that uses assert to verify at least 3 test cases per function. Print `PASS: test_FUNCTION` for each passing group, or `FAIL: test_FUNCTION - MESSAGE` if an assertion fails.\n\nRead nothing from input - just run the tests and print results.",
      "starterCode": "# Build calculator and test with assertions\n",
      "solutionCode": "def add(a, b): return a + b\ndef subtract(a, b): return a - b\ndef multiply(a, b): return a * b\ndef divide(a, b):\n    if b == 0: raise ZeroDivisionError('division by zero')\n    return a / b\ndef power(base, exp): return base ** exp\n\ndef run_tests():\n    tests = [\n        ('add', lambda: [\n            assert_eq(add(2, 3), 5),\n            assert_eq(add(0, 0), 0),\n            assert_eq(add(-1, 1), 0),\n        ]),\n        ('subtract', lambda: [\n            assert_eq(subtract(10, 3), 7),\n            assert_eq(subtract(0, 5), -5),\n            assert_eq(subtract(3, 3), 0),\n        ]),\n        ('multiply', lambda: [\n            assert_eq(multiply(3, 4), 12),\n            assert_eq(multiply(0, 100), 0),\n            assert_eq(multiply(-2, 3), -6),\n        ]),\n        ('divide', lambda: [\n            assert_eq(divide(10, 2), 5.0),\n            assert_eq(divide(0, 5), 0.0),\n        ]),\n        ('power', lambda: [\n            assert_eq(power(2, 10), 1024),\n            assert_eq(power(5, 0), 1),\n            assert_eq(power(3, 3), 27),\n        ]),\n    ]\n    \n    def assert_eq(a, b): assert a == b\n    \n    for name, test_fn in tests:\n        try:\n            test_fn()\n            print(f'PASS: test_{name}')\n        except AssertionError as e:\n            print(f'FAIL: test_{name} - {e}')\n\n# Simpler approach\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(0, 0) == 0\n    assert add(-1, 1) == 0\n    assert add(1.5, 2.5) == 4.0\n\ndef test_subtract():\n    assert subtract(10, 3) == 7\n    assert subtract(0, 5) == -5\n    assert subtract(3, 3) == 0\n\ndef test_multiply():\n    assert multiply(3, 4) == 12\n    assert multiply(0, 100) == 0\n    assert multiply(-2, 3) == -6\n\ndef test_divide():\n    assert divide(10, 2) == 5.0\n    assert divide(0, 5) == 0.0\n    try:\n        divide(1, 0)\n        assert False, 'Should have raised ZeroDivisionError'\n    except ZeroDivisionError:\n        pass\n\ndef test_power():\n    assert power(2, 10) == 1024\n    assert power(5, 0) == 1\n    assert power(3, 3) == 27\n\nfor test_name, test_fn in [('add', test_add), ('subtract', test_subtract),\n                             ('multiply', test_multiply), ('divide', test_divide),\n                             ('power', test_power)]:\n    try:\n        test_fn()\n        print(f'PASS: test_{test_name}')\n    except AssertionError as e:\n        print(f'FAIL: test_{test_name} - {e}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "PASS: test_add\nPASS: test_subtract\nPASS: test_multiply\nPASS: test_divide\nPASS: test_power\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Basic Assertion",
      "prompt": "Given `x = 5`. Use `assert x > 0, 'x must be positive'`. Then print 'Passed'.",
      "starterCode": "x = 5\n# Write assertion, then print 'Passed'\n",
      "solutionCode": "x = 5\nassert x > 0, 'x must be positive'\nprint('Passed')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Passed\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Robust Calculator",
      "prompt": "Read two strings from input representing numbers, and a third string representing an operator ('/' or '+'). Try to convert both strings to float. Then perform the operation. Use a `try-except` block to catch `ValueError` (print 'Invalid Number') and `ZeroDivisionError` (print 'Cannot divide by zero'). If successful, print the result. Finally, add a `finally` block that prints 'Calculation attempted'.",
      "starterCode": "# Read a, b, op. Try conversion and math. Catch errors. Add finally.\n",
      "solutionCode": "a_str = input().strip()\nb_str = input().strip()\nop = input().strip()\n\ntry:\n    a = float(a_str)\n    b = float(b_str)\n    if op == '+':\n        print(a + b)\n    elif op == '/':\n        print(a / b)\nexcept ValueError:\n    print('Invalid Number')\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nfinally:\n    print('Calculation attempted')",
      "testCases": [
        {
          "input": "10\n0\n/\n",
          "expectedOutput": "Cannot divide by zero\nCalculation attempted\n"
        },
        {
          "input": "abc\n5\n+\n",
          "expectedOutput": "Invalid Number\nCalculation attempted\n"
        },
        {
          "input": "10\n5\n/\n",
          "expectedOutput": "2.0\nCalculation attempted\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    },
    {
      "title": "Module Integration: Safe File Reader",
      "prompt": "Define a function `read_config(filename)`. Try to open the file and return its content. Catch `FileNotFoundError` and return 'Config not found'. Catch `PermissionError` and return 'Access denied'. Test it by calling `print(read_config('missing.json'))`.",
      "starterCode": "# Define read_config with multiple exception handling\n",
      "solutionCode": "def read_config(filename):\n    try:\n        with open(filename, 'r') as f:\n            return f.read()\n    except FileNotFoundError:\n        return 'Config not found'\n    except PermissionError:\n        return 'Access denied'\n\nprint(read_config('missing.json'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Config not found\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    }
  ]
};
