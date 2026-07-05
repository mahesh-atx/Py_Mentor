export const exercises: Record<string, any[]> = {
  "builtin-functions-core": [
    {
      title: "Min, Max and Sum",
      prompt: "Read N integers from input (N given first). Print the minimum, maximum, and sum on separate lines. If N is 0, print `No data`.",
      starterCode: "# Read N integers and print min, max, sum\n",
      solutionCode: "n = int(input())\nif n == 0:\n    print('No data')\nelse:\n    nums = [int(input()) for _ in range(n)]\n    print(min(nums))\n    print(max(nums))\n    print(sum(nums))",
      testCases: [
        { input: "5\n3\n1\n4\n1\n5\n", expectedOutput: "1\n5\n14\n" },
        { input: "0\n", expectedOutput: "No data\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Sorted Leaderboard",
      prompt: "Read N name-score pairs (N given first, format `name score`). Sort by score descending and print as `#RANK. name: score`. Use `sorted()` with a `key` argument. If N is 0 print `No entries`.",
      starterCode: "# Read N name-score pairs and print sorted leaderboard\n",
      solutionCode: "n = int(input())\nif n == 0:\n    print('No entries')\nelse:\n    entries = []\n    for _ in range(n):\n        parts = input().split()\n        entries.append((parts[0], int(parts[1])))\n    ranked = sorted(entries, key=lambda x: x[1], reverse=True)\n    for i, (name, score) in enumerate(ranked, 1):\n        print(f'#{i}. {name}: {score}')",
      testCases: [
        {
          input: "3\nAlice 88\nBob 95\nCharlie 72\n",
          expectedOutput: "#1. Bob: 95\n#2. Alice: 88\n#3. Charlie: 72\n"
        },
        { input: "0\n", expectedOutput: "No entries\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Zip and Enumerate Report",
      prompt: "Read two lists of N items each (N given first): first N names, then N scores. Use `zip()` to pair them and `enumerate()` to rank them. Sort by score descending. Print `#RANK. name (score): GRADE` where grade is A>=90, B>=80, C>=70, D>=60, F<60. Print average at the end.",
      starterCode: "# Read N names then N scores, zip, rank, and grade\n",
      solutionCode: "n = int(input())\nnames = [input() for _ in range(n)]\nscores = [int(input()) for _ in range(n)]\npairs = sorted(zip(names, scores), key=lambda x: x[1], reverse=True)\nfor rank, (name, score) in enumerate(pairs, 1):\n    grade = 'A' if score >= 90 else 'B' if score >= 80 else 'C' if score >= 70 else 'D' if score >= 60 else 'F'\n    print(f'#{rank}. {name} ({score}): {grade}')\navg = sum(s for _, s in pairs) / n\nprint(f'Average: {avg:.2f}')",
      testCases: [
        {
          input: "3\nAlice\nBob\nCharlie\n88\n95\n72\n",
          expectedOutput: "#1. Bob (95): A\n#2. Alice (88): B\n#3. Charlie (72): C\nAverage: 85.00\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Data Pipeline with map, filter, sorted",
      prompt: "Read N records (N given first). Each line: `name,score,active` (active is `true` or `false`). Using `map()`, `filter()`, and `sorted()`:\n1. Parse each record with `map()`\n2. Keep only active users with `filter()`\n3. Sort by score descending with `sorted()`\n4. Print ranked active users\n5. Print average score of active users (2dp) or `No active users`\n\nIf any score is outside 0-100, print `Invalid data`.",
      starterCode: "# Read records, map/filter/sort and report\n",
      solutionCode: "n = int(input())\nlines = [input() for _ in range(n)]\ntry:\n    def parse(line):\n        parts = line.split(',')\n        name = parts[0].strip()\n        score = int(parts[1].strip())\n        active = parts[2].strip().lower() == 'true'\n        if score < 0 or score > 100:\n            raise ValueError('Invalid score')\n        return {'name': name, 'score': score, 'active': active}\n    records = list(map(parse, lines))\n    active = list(filter(lambda r: r['active'], records))\n    if not active:\n        print('No active users')\n    else:\n        ranked = sorted(active, key=lambda r: r['score'], reverse=True)\n        for i, r in enumerate(ranked, 1):\n            print(f\"#{i}. {r['name']}: {r['score']}\")\n        avg = sum(r['score'] for r in active) / len(active)\n        print(f'Average: {avg:.2f}')\nexcept ValueError:\n    print('Invalid data')",
      testCases: [
        {
          input: "4\nAlice,88,true\nBob,45,false\nCharlie,92,true\nDiana,67,true\n",
          expectedOutput: "#1. Charlie: 92\n#2. Alice: 88\n#3. Diana: 67\nAverage: 82.33\n"
        },
        {
          input: "2\nAlice,88,false\nBob,72,false\n",
          expectedOutput: "No active users\n"
        },
        { input: "1\nBad,200,true\n", expectedOutput: "Invalid data\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "type-conversion-functions": [
    {
      title: "Safe Type Conversion",
      prompt: "Read a string from input. Try to convert it to int, then float, then leave as string. Print the result and its type name (`int`, `float`, or `str`).",
      starterCode: "# Read a string and convert to the most appropriate type\n",
      solutionCode: "value = input().strip()\ntry:\n    result = int(value)\n    print(result)\n    print('int')\nexcept ValueError:\n    try:\n        result = float(value)\n        print(result)\n        print('float')\n    except ValueError:\n        print(value)\n        print('str')",
      testCases: [
        { input: "42\n", expectedOutput: "42\nint\n" },
        { input: "3.14\n", expectedOutput: "3.14\nfloat\n" },
        { input: "hello\n", expectedOutput: "hello\nstr\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Base Converter",
      prompt: "Read an integer and a target base (2, 8, or 16) from input. Convert the integer to the target base and print it WITHOUT the prefix (no 0b, 0o, 0x). If base is invalid, print `Invalid base`. If number is negative, print `Negative numbers not supported`.",
      starterCode: "# Read an integer and base, convert and print without prefix\n",
      solutionCode: "n = int(input())\nbase = int(input())\nif n < 0:\n    print('Negative numbers not supported')\nelif base == 2:\n    print(bin(n)[2:])\nelif base == 8:\n    print(oct(n)[2:])\nelif base == 16:\n    print(hex(n)[2:].upper())\nelse:\n    print('Invalid base')",
      testCases: [
        { input: "255\n16\n", expectedOutput: "FF\n" },
        { input: "10\n2\n", expectedOutput: "1010\n" },
        { input: "64\n8\n", expectedOutput: "100\n" },
        { input: "5\n3\n", expectedOutput: "Invalid base\n" },
        { input: "-1\n2\n", expectedOutput: "Negative numbers not supported\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Caesar Cipher",
      prompt: "Read a message and a shift number from input. Encrypt the message using a Caesar cipher: shift each letter by the given amount (wrap around at Z/z). Leave non-letter characters unchanged. Print the encrypted message.\n\nIf shift is 0, print `No shift applied`.\n\n(Input: `Hello, World!`, shift `3` → `Khoor, Zruog!`)",
      starterCode: "# Read message and shift, apply Caesar cipher using ord/chr\n",
      solutionCode: "message = input()\nshift = int(input())\nif shift == 0:\n    print('No shift applied')\nelse:\n    result = []\n    for char in message:\n        if char.isupper():\n            result.append(chr((ord(char) - ord('A') + shift) % 26 + ord('A')))\n        elif char.islower():\n            result.append(chr((ord(char) - ord('a') + shift) % 26 + ord('a')))\n        else:\n            result.append(char)\n    print(''.join(result))",
      testCases: [
        { input: "Hello, World!\n3\n", expectedOutput: "Khoor, Zruog!\n" },
        { input: "Python!\n0\n", expectedOutput: "No shift applied\n" },
        { input: "XYZ\n3\n", expectedOutput: "ABC\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Data Type Normalizer",
      prompt: "Read N key-value pairs (N given first, format `key value`). Normalize each value:\n- `true`/`false` (case-insensitive) → bool\n- `none`/`null` → None (print as `None`)\n- Pure integer string → int\n- Pure float string → float\n- Otherwise → string (strip quotes if present)\n\nPrint each as `KEY: VALUE (TYPE)` sorted by key.",
      starterCode: "# Read N key-value pairs and normalize the values\n",
      solutionCode: "n = int(input())\ndata = {}\nfor _ in range(n):\n    parts = input().split(' ', 1)\n    key = parts[0]\n    raw = parts[1].strip().strip('\"\\'')\n    if raw.lower() in ('true', 'false'):\n        val = raw.lower() == 'true'\n    elif raw.lower() in ('none', 'null'):\n        val = None\n    else:\n        try:\n            val = int(raw)\n        except ValueError:\n            try:\n                val = float(raw)\n            except ValueError:\n                val = raw\n    data[key] = val\nfor key in sorted(data):\n    val = data[key]\n    type_name = type(val).__name__ if val is not None else 'NoneType'\n    print(f'{key}: {val} ({type_name})')",
      testCases: [
        {
          input: "5\nage 25\nname Alice\nactive true\nscore 3.14\nvalue none\n",
          expectedOutput: "active: True (bool)\nage: 25 (int)\nname: Alice (str)\nscore: 3.14 (float)\nvalue: None (NoneType)\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "numeric-functions-math": [
    {
      title: "Circle Calculator",
      prompt: "Read a radius from input. Using `math.pi`, calculate and print the area (2dp) and circumference (2dp). If radius is negative, print `Invalid radius`.",
      starterCode: "import math\n# Read radius and calculate circle area and circumference\n",
      solutionCode: "import math\nradius = float(input())\nif radius < 0:\n    print('Invalid radius')\nelse:\n    area = math.pi * radius ** 2\n    circumference = 2 * math.pi * radius\n    print(f'{area:.2f}')\n    print(f'{circumference:.2f}')",
      testCases: [
        { input: "5\n", expectedOutput: "78.54\n31.42\n" },
        { input: "0\n", expectedOutput: "0.00\n0.00\n" },
        { input: "-3\n", expectedOutput: "Invalid radius\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Rounding Comparison",
      prompt: "Read a float from input. Print the result of `math.floor()`, `math.ceil()`, `math.trunc()`, and `round()` each on a separate line with a label:\n`floor: X`, `ceil: X`, `trunc: X`, `round: X`",
      starterCode: "import math\n# Read a float and print all rounding results\n",
      solutionCode: "import math\nx = float(input())\nprint(f'floor: {math.floor(x)}')\nprint(f'ceil: {math.ceil(x)}')\nprint(f'trunc: {math.trunc(x)}')\nprint(f'round: {round(x)}')",
      testCases: [
        { input: "3.7\n", expectedOutput: "floor: 3\nceil: 4\ntrunc: 3\nround: 4\n" },
        { input: "-3.7\n", expectedOutput: "floor: -4\nceil: -3\ntrunc: -3\nround: -4\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "GCD and LCM Calculator",
      prompt: "Read N integers from input (N given first, N >= 2). Calculate and print:\n1. GCD of all numbers\n2. LCM of all numbers (use formula: LCM(a,b) = abs(a*b) // gcd(a,b))\n\nIf any number is 0 or negative, print `Invalid input`.",
      starterCode: "import math\n# Read N integers and compute GCD and LCM\n",
      solutionCode: "import math\nn = int(input())\nnumbers = [int(input()) for _ in range(n)]\nif any(x <= 0 for x in numbers):\n    print('Invalid input')\nelse:\n    gcd = numbers[0]\n    for x in numbers[1:]:\n        gcd = math.gcd(gcd, x)\n    lcm = numbers[0]\n    for x in numbers[1:]:\n        lcm = abs(lcm * x) // math.gcd(lcm, x)\n    print(f'GCD: {gcd}')\n    print(f'LCM: {lcm}')",
      testCases: [
        { input: "3\n12\n8\n4\n", expectedOutput: "GCD: 4\nLCM: 24\n" },
        { input: "2\n7\n13\n", expectedOutput: "GCD: 1\nLCM: 91\n" },
        { input: "2\n5\n0\n", expectedOutput: "Invalid input\n" }
      ],
      difficulty: "advanced",
      xpReward: 60
    },
    {
      title: "Scientific Calculator",
      prompt: "Read an operation and a number (or two numbers) from input. Support:\n- `sqrt X` → square root (error if X < 0)\n- `factorial N` → N! (error if N < 0 or not integer)\n- `log X` → natural log (error if X <= 0)\n- `pow X Y` → X^Y\n- `hyp X Y` → hypotenuse of X, Y\n\nPrint result rounded to 4 decimal places. Print `Error: reason` for invalid inputs.",
      starterCode: "import math\n# Read operation and compute result\n",
      solutionCode: "import math\nline = input().split()\nop = line[0]\ntry:\n    if op == 'sqrt':\n        x = float(line[1])\n        if x < 0:\n            print('Error: cannot take sqrt of negative')\n        else:\n            print(round(math.sqrt(x), 4))\n    elif op == 'factorial':\n        n = float(line[1])\n        if n < 0 or n != int(n):\n            print('Error: factorial requires non-negative integer')\n        else:\n            print(math.factorial(int(n)))\n    elif op == 'log':\n        x = float(line[1])\n        if x <= 0:\n            print('Error: log requires positive number')\n        else:\n            print(round(math.log(x), 4))\n    elif op == 'pow':\n        x, y = float(line[1]), float(line[2])\n        print(round(math.pow(x, y), 4))\n    elif op == 'hyp':\n        x, y = float(line[1]), float(line[2])\n        print(round(math.hypot(x, y), 4))\n    else:\n        print('Error: unknown operation')\nexcept (ValueError, IndexError):\n    print('Error: invalid input')",
      testCases: [
        { input: "sqrt 16\n", expectedOutput: "4.0\n" },
        { input: "factorial 5\n", expectedOutput: "120\n" },
        { input: "log 1\n", expectedOutput: "0.0\n" },
        { input: "hyp 3 4\n", expectedOutput: "5.0\n" },
        { input: "sqrt -4\n", expectedOutput: "Error: cannot take sqrt of negative\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "string-builtins": [
    {
      title: "Character Analysis",
      prompt: "Read a string from input. Using built-in functions, print:\n1. Length\n2. Maximum character (by ASCII value)\n3. Minimum character (by ASCII value)\n4. Sorted characters joined as a string (ascending)\n\nIf empty, print `Empty string`.",
      starterCode: "# Read a string and print its character analysis\n",
      solutionCode: "text = input()\nif not text:\n    print('Empty string')\nelse:\n    print(len(text))\n    print(max(text))\n    print(min(text))\n    print(''.join(sorted(text)))",
      testCases: [
        { input: "python\n", expectedOutput: "6\ny\nh\nhnopty\n" },
        { input: "\n", expectedOutput: "Empty string\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Word Transformer",
      prompt: "Read N words (N given first). Using `map()` and `filter()`:\n1. Print all words converted to title case using `map(str.title, ...)`\n2. Print only words longer than 4 characters using `filter()`\n3. Print words sorted by length using `sorted()` with `key=len`\n\nIf N is 0, print `No words`.",
      starterCode: "# Read N words and apply map, filter, sorted\n",
      solutionCode: "n = int(input())\nif n == 0:\n    print('No words')\nelse:\n    words = [input() for _ in range(n)]\n    titled = list(map(str.title, words))\n    print(titled)\n    long_words = list(filter(lambda w: len(w) > 4, words))\n    print(long_words)\n    by_length = sorted(words, key=len)\n    print(by_length)",
      testCases: [
        {
          input: "4\nhello\nhi\npython\nok\n",
          expectedOutput: "['Hello', 'Hi', 'Python', 'Ok']\n['hello', 'python']\n['hi', 'ok', 'hello', 'python']\n"
        },
        { input: "0\n", expectedOutput: "No words\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Password Strength Analyzer",
      prompt: "Read a password from input. Use `any()`, `all()`, `sum()`, and `len()` to check:\n- Length >= 8\n- Has at least one uppercase\n- Has at least one lowercase\n- Has at least one digit\n- Has at least one special char (`!@#$%^&*`)\n- Has NO spaces\n\nPrint each check as `CHECK_NAME: PASS/FAIL`. Then print `Overall: Strong` or `Overall: Weak`.",
      starterCode: "# Read password and analyze strength using built-in functions\n",
      solutionCode: "pwd = input()\nchecks = [\n    ('Length >= 8', len(pwd) >= 8),\n    ('Has uppercase', any(c.isupper() for c in pwd)),\n    ('Has lowercase', any(c.islower() for c in pwd)),\n    ('Has digit', any(c.isdigit() for c in pwd)),\n    ('Has special', any(c in '!@#$%^&*' for c in pwd)),\n    ('No spaces', all(c != ' ' for c in pwd)),\n]\nfor name, result in checks:\n    print(f'{name}: {\"PASS\" if result else \"FAIL\"}')\nif all(r for _, r in checks):\n    print('Overall: Strong')\nelse:\n    print('Overall: Weak')",
      testCases: [
        {
          input: "Hello@123\n",
          expectedOutput: "Length >= 8: PASS\nHas uppercase: PASS\nHas lowercase: PASS\nHas digit: PASS\nHas special: PASS\nNo spaces: PASS\nOverall: Strong\n"
        },
        {
          input: "abc\n",
          expectedOutput: "Length >= 8: FAIL\nHas uppercase: FAIL\nHas lowercase: PASS\nHas digit: FAIL\nHas special: FAIL\nNo spaces: PASS\nOverall: Weak\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Text Statistics with Built-ins",
      prompt: "Read a multi-line text (read until empty line). Use built-in functions only (no explicit loops where possible):\n1. Total characters\n2. Total words\n3. Total lines (non-empty)\n4. Longest word\n5. Most used character (non-space, case-insensitive)\n6. Average word length (2dp)\n\nIf no text entered, print `No text`.",
      starterCode: "# Read text until empty line, compute stats using built-ins\n",
      solutionCode: "lines = []\nwhile True:\n    line = input()\n    if not line:\n        break\n    lines.append(line)\nif not lines:\n    print('No text')\nelse:\n    text = ' '.join(lines)\n    words = text.split()\n    print(f'Characters: {len(text)}')\n    print(f'Words: {len(words)}')\n    print(f'Lines: {len(lines)}')\n    print(f'Longest word: {max(words, key=len)}')\n    chars = [c.lower() for c in text if not c.isspace()]\n    most_used = max(set(chars), key=chars.count)\n    print(f'Most used char: {most_used}')\n    avg_len = sum(map(len, words)) / len(words)\n    print(f'Avg word length: {avg_len:.2f}')",
      testCases: [
        {
          input: "Hello World\nPython is great\n\n",
          expectedOutput: "Characters: 27\nWords: 5\nLines: 2\nLongest word: Python\nMost used char: l\nAvg word length: 5.00\n"
        },
        { input: "\n", expectedOutput: "No text\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "functional-builtins": [
    {
      title: "Map and Filter Basics",
      prompt: "Given a list of numbers, use `map()` to square all of them and `filter()` to keep only those greater than 20. Print the final list.\n\nDefine `numbers = [1, 3, 5, 7, 9]`.",
      starterCode: "numbers = [1, 3, 5, 7, 9]\n# Square all using map(), then filter > 20, print result\n",
      solutionCode: "numbers = [1, 3, 5, 7, 9]\nsquared = list(map(lambda x: x ** 2, numbers))\nresult = list(filter(lambda x: x > 20, squared))\nprint(result)",
      testCases: [
        { input: "", expectedOutput: "[25, 49, 81]\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Functional Data Transform",
      prompt: "Read N comma-separated records (N given first). Each record: `name,score`. Using `map()` to parse, `filter()` to keep passing scores (>=60), and `sorted()` to rank:\n1. Print all parsed names and scores\n2. Print only passing students sorted by score descending\n3. Use `reduce()` to compute total score of passing students\n\nIf N is 0 or none pass, handle gracefully.",
      starterCode: "from functools import reduce\n# Read N records, map/filter/sort/reduce\n",
      solutionCode: "from functools import reduce\nn = int(input())\nif n == 0:\n    print('No data')\nelse:\n    def parse(line):\n        parts = line.split(',')\n        return (parts[0].strip(), int(parts[1].strip()))\n    records = list(map(parse, [input() for _ in range(n)]))\n    print('All records:', records)\n    passing = list(filter(lambda r: r[1] >= 60, records))\n    if not passing:\n        print('No passing students')\n    else:\n        ranked = sorted(passing, key=lambda r: r[1], reverse=True)\n        print('Passing (ranked):', ranked)\n        total = reduce(lambda acc, r: acc + r[1], passing, 0)\n        print(f'Total score: {total}')",
      testCases: [
        {
          input: "4\nAlice,88\nBob,45\nCharlie,92\nDiana,67\n",
          expectedOutput: "All records: [('Alice', 88), ('Bob', 45), ('Charlie', 92), ('Diana', 67)]\nPassing (ranked): [('Charlie', 92), ('Alice', 88), ('Diana', 67)]\nTotal score: 247\n"
        },
        { input: "0\n", expectedOutput: "No data\n" }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "any() and all() Validator",
      prompt: "Read N strings representing student records (N given first). Each line: `name age score`. Use `any()` and `all()` with generator expressions to check:\n1. `All ages valid` (1-120)\n2. `Any score perfect` (100)\n3. `All scores passing` (>=60)\n4. `Any name starts with A`\n\nPrint each as `CHECK: True/False`. If any line is malformed, print `Invalid data`.",
      starterCode: "# Read N student records and validate using any/all\n",
      solutionCode: "n = int(input())\ntry:\n    students = []\n    for _ in range(n):\n        parts = input().split()\n        name, age, score = parts[0], int(parts[1]), int(parts[2])\n        students.append({'name': name, 'age': age, 'score': score})\n    print(f\"All ages valid: {all(1 <= s['age'] <= 120 for s in students)}\")\n    print(f\"Any score perfect: {any(s['score'] == 100 for s in students)}\")\n    print(f\"All scores passing: {all(s['score'] >= 60 for s in students)}\")\n    print(f\"Any name starts with A: {any(s['name'].startswith('A') for s in students)}\")\nexcept (ValueError, IndexError):\n    print('Invalid data')",
      testCases: [
        {
          input: "3\nAlice 20 88\nBob 30 95\nCharlie 25 72\n",
          expectedOutput: "All ages valid: True\nAny score perfect: False\nAll scores passing: True\nAny name starts with A: True\n"
        },
        { input: "1\nBadData\n", expectedOutput: "Invalid data\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Fibonacci with lru_cache",
      prompt: "Read N from input. Using `functools.lru_cache`, implement a memoized Fibonacci function. Print:\n1. The Nth Fibonacci number\n2. The first N Fibonacci numbers as a list\n3. The sum of the first N Fibonacci numbers\n\nIf N <= 0, print `Invalid input`. If N > 50, print `N too large`.",
      starterCode: "from functools import lru_cache\n# Implement cached fibonacci and print stats\n",
      solutionCode: "from functools import lru_cache\nn = int(input())\nif n <= 0:\n    print('Invalid input')\nelif n > 50:\n    print('N too large')\nelse:\n    @lru_cache(maxsize=None)\n    def fib(k):\n        if k <= 1:\n            return k\n        return fib(k-1) + fib(k-2)\n    print(fib(n))\n    fibs = [fib(i) for i in range(n)]\n    print(fibs)\n    print(sum(fibs))",
      testCases: [
        {
          input: "8\n",
          expectedOutput: "21\n[0, 1, 1, 2, 3, 5, 8, 13]\n33\n"
        },
        { input: "0\n", expectedOutput: "Invalid input\n" },
        { input: "100\n", expectedOutput: "N too large\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ]
};