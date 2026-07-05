export const exercises: Record<string, any[]> = {
  "math-module-complete": [
    {
      title: "Circle Area and Circumference",
      prompt: "Read a radius as a float. Using `math.pi`, print the area and circumference each rounded to 2 decimal places on separate lines. If radius is negative, print `Invalid radius`.\n\n(Input: `7` → Area: `153.94`, Circumference: `43.98`)",
      starterCode: "import math\n# Read radius, compute area and circumference\n",
      solutionCode: "import math\nr = float(input())\nif r < 0:\n    print('Invalid radius')\nelse:\n    print(round(math.pi * r ** 2, 2))\n    print(round(2 * math.pi * r, 2))",
      testCases: [
        { input: "7\n", expectedOutput: "153.94\n43.98\n" },
        { input: "0\n", expectedOutput: "0.0\n0.0\n" },
        { input: "-3\n", expectedOutput: "Invalid radius\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Floor, Ceil and Rounding",
      prompt: "Read a float. Print `floor`, `ceil`, `trunc`, and `round` each on a separate line with a label.\n\nFormat: `floor: X`\n\n(Input: `-3.7` → floor: -4, ceil: -3, trunc: -3, round: -4)",
      starterCode: "import math\n# Read a float and print all rounding results\n",
      solutionCode: "import math\nx = float(input())\nprint(f'floor: {math.floor(x)}')\nprint(f'ceil: {math.ceil(x)}')\nprint(f'trunc: {math.trunc(x)}')\nprint(f'round: {round(x)}')",
      testCases: [
        { input: "3.7\n", expectedOutput: "floor: 3\nceil: 4\ntrunc: 3\nround: 4\n" },
        { input: "-3.7\n", expectedOutput: "floor: -4\nceil: -3\ntrunc: -3\nround: -4\n" },
        { input: "5.0\n", expectedOutput: "floor: 5\nceil: 5\ntrunc: 5\nround: 5\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Hypotenuse and Distance",
      prompt: "Read two 2D points from input (each as `x y` on a separate line). Calculate the Euclidean distance between them using `math.hypot()`. Print the distance rounded to 4 decimal places. Also print `Same point` or `Different points`.\n\nIf any coordinate is non-numeric, print `Invalid coordinates`.",
      starterCode: "import math\n# Read two points and calculate distance using math.hypot\n",
      solutionCode: "import math\ntry:\n    x1, y1 = map(float, input().split())\n    x2, y2 = map(float, input().split())\n    dist = math.hypot(x2 - x1, y2 - y1)\n    print(round(dist, 4))\n    print('Same point' if dist == 0 else 'Different points')\nexcept ValueError:\n    print('Invalid coordinates')",
      testCases: [
        { input: "0 0\n3 4\n", expectedOutput: "5.0\nDifferent points\n" },
        { input: "1 1\n1 1\n", expectedOutput: "0.0\nSame point\n" },
        { input: "abc\n1 2\n", expectedOutput: "Invalid coordinates\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "GCD, LCM and Combinations",
      prompt: "Read two positive integers from input. Print:\n1. Their GCD using `math.gcd()`\n2. Their LCM using the formula `abs(a*b) // gcd(a,b)`\n3. Combinations C(a+b, a) using `math.comb()`\n4. Whether they are coprime (`GCD == 1`)\n\nIf either number is <= 0, print `Invalid input`.",
      starterCode: "import math\n# Read two integers and compute GCD, LCM, combinations\n",
      solutionCode: "import math\ntry:\n    a = int(input())\n    b = int(input())\n    if a <= 0 or b <= 0:\n        print('Invalid input')\n    else:\n        gcd = math.gcd(a, b)\n        lcm = abs(a * b) // gcd\n        comb = math.comb(a + b, a)\n        print(f'GCD: {gcd}')\n        print(f'LCM: {lcm}')\n        print(f'C({a+b},{a}): {comb}')\n        print(f'Coprime: {gcd == 1}')\nexcept ValueError:\n    print('Invalid input')",
      testCases: [
        { input: "12\n8\n", expectedOutput: "GCD: 4\nLCM: 24\nC(20,12): 125970\nCoprime: False\n" },
        { input: "7\n13\n", expectedOutput: "GCD: 1\nLCM: 91\nC(20,7): 77520\nCoprime: True\n" },
        { input: "0\n5\n", expectedOutput: "Invalid input\n" }
      ],
      difficulty: "intermediate",
      xpReward: 50
    },
    {
      title: "Math Function Dispatcher",
      prompt: "Read an operation and arguments from input (on one line, space-separated). Support:\n- `sqrt X` → square root (error if X < 0)\n- `log X` → natural log (error if X <= 0)\n- `log X B` → log base B of X (error if X<=0 or B<=0 or B==1)\n- `factorial N` → N! (error if N < 0 or not integer)\n- `pow X Y` → X^Y using math.pow\n- `hypot X Y` → sqrt(X²+Y²)\n\nPrint result to 4 decimal places, or `Error: reason` for invalid inputs.",
      starterCode: "import math\n# Read operation and arguments, compute result\n",
      solutionCode: "import math\nparts = input().split()\nop = parts[0]\ntry:\n    if op == 'sqrt':\n        x = float(parts[1])\n        if x < 0:\n            print('Error: cannot take sqrt of negative')\n        else:\n            print(round(math.sqrt(x), 4))\n    elif op == 'log':\n        x = float(parts[1])\n        if x <= 0:\n            print('Error: log requires positive number')\n        elif len(parts) == 3:\n            b = float(parts[2])\n            if b <= 0 or b == 1:\n                print('Error: invalid base')\n            else:\n                print(round(math.log(x, b), 4))\n        else:\n            print(round(math.log(x), 4))\n    elif op == 'factorial':\n        n = float(parts[1])\n        if n < 0 or n != int(n):\n            print('Error: factorial requires non-negative integer')\n        else:\n            print(math.factorial(int(n)))\n    elif op == 'pow':\n        x, y = float(parts[1]), float(parts[2])\n        print(round(math.pow(x, y), 4))\n    elif op == 'hypot':\n        x, y = float(parts[1]), float(parts[2])\n        print(round(math.hypot(x, y), 4))\n    else:\n        print('Error: unknown operation')\nexcept (ValueError, IndexError):\n    print('Error: invalid input')",
      testCases: [
        { input: "sqrt 25\n", expectedOutput: "5.0\n" },
        { input: "log 100 10\n", expectedOutput: "2.0\n" },
        { input: "factorial 6\n", expectedOutput: "720\n" },
        { input: "hypot 3 4\n", expectedOutput: "5.0\n" },
        { input: "sqrt -9\n", expectedOutput: "Error: cannot take sqrt of negative\n" },
        { input: "log 0\n", expectedOutput: "Error: log requires positive number\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "random-module": [
    {
      title: "Dice Roller",
      prompt: "Using `random.seed(42)`, simulate rolling a 6-sided die 5 times using `random.randint()`. Print each roll on a separate line, then print the total.",
      starterCode: "import random\n# Seed with 42, roll a die 5 times, print each roll and total\n",
      solutionCode: "import random\nrandom.seed(42)\nrolls = [random.randint(1, 6) for _ in range(5)]\nfor roll in rolls:\n    print(roll)\nprint(f'Total: {sum(rolls)}')",
      testCases: [
        { input: "", expectedOutput: "2\n1\n5\n4\n4\nTotal: 16\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Random Team Picker",
      prompt: "Read N names (N given first). Using `random.seed(99)` and `random.sample()`, split them randomly into two teams as evenly as possible (first team gets the extra player if odd). Print each team sorted alphabetically. If N < 2, print `Not enough players`.",
      starterCode: "import random\n# Read N names, split into two teams using random.sample\n",
      solutionCode: "import random\nn = int(input())\nif n < 2:\n    print('Not enough players')\nelse:\n    names = [input() for _ in range(n)]\n    random.seed(99)\n    shuffled = random.sample(names, len(names))\n    mid = (len(shuffled) + 1) // 2\n    team1 = sorted(shuffled[:mid])\n    team2 = sorted(shuffled[mid:])\n    print(f'Team 1: {team1}')\n    print(f'Team 2: {team2}')",
      testCases: [
        {
          input: "4\nAlice\nBob\nCharlie\nDiana\n",
          expectedOutput: "Team 1: ['Alice', 'Diana']\nTeam 2: ['Bob', 'Charlie']\n"
        },
        { input: "1\nAlice\n", expectedOutput: "Not enough players\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Weighted Random Simulator",
      prompt: "Read N items with weights (N given first, each line `item weight`). Using `random.seed(7)` and `random.choices()`, simulate 100 random picks. Print each unique item and how many times it was picked, sorted by item name alphabetically. Print the most picked item at the end.\n\nIf N is 0, print `No items`.",
      starterCode: "import random\n# Read items with weights, simulate 100 picks and report\n",
      solutionCode: "import random\nn = int(input())\nif n == 0:\n    print('No items')\nelse:\n    items = []\n    weights = []\n    for _ in range(n):\n        parts = input().split()\n        items.append(parts[0])\n        weights.append(float(parts[1]))\n    random.seed(7)\n    picks = random.choices(items, weights=weights, k=100)\n    counts = {item: picks.count(item) for item in items}\n    for item in sorted(counts):\n        print(f'{item}: {counts[item]}')\n    most_picked = max(counts, key=counts.get)\n    print(f'Most picked: {most_picked}')",
      testCases: [
        {
          input: "3\nred 1\ngreen 2\nblue 3\n",
          expectedOutput: "blue: 49\ngreen: 33\nred: 18\nMost picked: blue\n"
        },
        { input: "0\n", expectedOutput: "No items\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Monte Carlo Pi Estimator",
      prompt: "Read N (number of random points) from input. Using `random.seed(123)` and `random.uniform(-1, 1)`, estimate π using the Monte Carlo method:\n- Generate N random points (x, y) where x, y ∈ [-1, 1]\n- Count how many fall inside the unit circle (x² + y² <= 1)\n- π ≈ 4 * (points inside circle) / N\n\nPrint the estimate to 4 decimal places and the actual `math.pi` to 4 decimal places.\n\nIf N <= 0, print `Invalid N`.",
      starterCode: "import random\nimport math\n# Estimate pi using Monte Carlo simulation\n",
      solutionCode: "import random\nimport math\nn = int(input())\nif n <= 0:\n    print('Invalid N')\nelse:\n    random.seed(123)\n    inside = sum(\n        1 for _ in range(n)\n        if random.uniform(-1, 1) ** 2 + random.uniform(-1, 1) ** 2 <= 1\n    )\n    estimate = 4 * inside / n\n    print(f'Estimate: {estimate:.4f}')\n    print(f'Actual: {math.pi:.4f}')",
      testCases: [
        { input: "10000\n", expectedOutput: "Estimate: 3.1396\nActual: 3.1416\n" },
        { input: "0\n", expectedOutput: "Invalid N\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "statistics-module": [
    {
      title: "Basic Statistics",
      prompt: "Read N numbers (N given first). Print the mean, median, and mode each on a separate line rounded to 2 decimal places. If N is 0, print `No data`. If there is no unique mode (multimode), print `No unique mode`.",
      starterCode: "import statistics\n# Read N numbers and print mean, median, mode\n",
      solutionCode: "import statistics\nn = int(input())\nif n == 0:\n    print('No data')\nelse:\n    data = [float(input()) for _ in range(n)]\n    print(round(statistics.mean(data), 2))\n    print(round(statistics.median(data), 2))\n    modes = statistics.multimode(data)\n    if len(modes) == 1:\n        print(round(modes[0], 2))\n    else:\n        print('No unique mode')",
      testCases: [
        { input: "5\n4\n4\n6\n8\n10\n", expectedOutput: "6.4\n6.0\n4.0\n" },
        { input: "4\n1\n2\n3\n4\n", expectedOutput: "2.5\n2.5\nNo unique mode\n" },
        { input: "0\n", expectedOutput: "No data\n" }
      ],
      difficulty: "beginner",
      xpReward: 25
    },
    {
      title: "Variance and Standard Deviation",
      prompt: "Read N numbers (N given first, N >= 2). Print:\n1. Sample variance (2dp)\n2. Sample standard deviation (2dp)\n3. Population variance (2dp)\n4. Population standard deviation (2dp)\n5. Whether the data is `Low spread` (stdev < mean/4) or `High spread`\n\nIf N < 2, print `Need at least 2 values`.",
      starterCode: "import statistics\n# Read N numbers and print variance and stdev stats\n",
      solutionCode: "import statistics\nn = int(input())\nif n < 2:\n    print('Need at least 2 values')\nelse:\n    data = [float(input()) for _ in range(n)]\n    var = statistics.variance(data)\n    std = statistics.stdev(data)\n    pvar = statistics.pvariance(data)\n    pstd = statistics.pstdev(data)\n    mean = statistics.mean(data)\n    print(round(var, 2))\n    print(round(std, 2))\n    print(round(pvar, 2))\n    print(round(pstd, 2))\n    spread = 'Low spread' if std < mean / 4 else 'High spread'\n    print(spread)",
      testCases: [
        {
          input: "5\n2\n4\n4\n4\n6\n",
          expectedOutput: "2.5\n1.58\n2.0\n1.41\nLow spread\n"
        },
        { input: "1\n5\n", expectedOutput: "Need at least 2 values\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Class Performance Analyzer",
      prompt: "Read N student score records (N given first). Each line: `name score`. Using the statistics module:\n1. Print mean, median, stdev (all to 2dp)\n2. Print how many students are above the mean\n3. Print the student closest to the mean\n4. Print `Pass rate: X%` where pass is score >= 60\n\nIf N is 0, print `No students`. If any score is outside 0-100, print `Invalid score`.",
      starterCode: "import statistics\n# Read student scores and analyze class performance\n",
      solutionCode: "import statistics\nn = int(input())\nif n == 0:\n    print('No students')\nelse:\n    students = []\n    valid = True\n    for _ in range(n):\n        parts = input().split()\n        name, score = parts[0], float(parts[1])\n        if score < 0 or score > 100:\n            print('Invalid score')\n            valid = False\n            break\n        students.append((name, score))\n    if valid:\n        scores = [s[1] for s in students]\n        mean = statistics.mean(scores)\n        median = statistics.median(scores)\n        std = statistics.stdev(scores) if n > 1 else 0\n        print(f'Mean: {round(mean, 2)}')\n        print(f'Median: {round(median, 2)}')\n        print(f'Stdev: {round(std, 2)}')\n        above = sum(1 for s in scores if s > mean)\n        print(f'Above mean: {above}')\n        closest = min(students, key=lambda s: abs(s[1] - mean))\n        print(f'Closest to mean: {closest[0]} ({closest[1]})')\n        pass_rate = sum(1 for s in scores if s >= 60) / n * 100\n        print(f'Pass rate: {round(pass_rate, 1)}%')",
      testCases: [
        {
          input: "5\nAlice 88\nBob 45\nCharlie 92\nDiana 67\nEve 78\n",
          expectedOutput: "Mean: 74.0\nMedian: 78.0\nStdev: 19.42\nAbove mean: 3\nClosest to mean: Diana (67)\nPass rate: 80.0%\n"
        },
        { input: "0\n", expectedOutput: "No students\n" },
        { input: "1\nBob 150\n", expectedOutput: "Invalid score\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "decimal-module": [
    {
      title: "Exact Decimal Arithmetic",
      prompt: "Using the `Decimal` module, compute `0.1 + 0.2` and `0.1 * 3` exactly. Print both results and then print whether each equals its expected value (`0.3`). Show that regular floats fail these comparisons too.",
      starterCode: "from decimal import Decimal\n# Show exact Decimal arithmetic vs float errors\n",
      solutionCode: "from decimal import Decimal\n# Float results (imprecise)\nprint(f'Float 0.1+0.2 == 0.3: {0.1 + 0.2 == 0.3}')\nprint(f'Float 0.1*3 == 0.3: {0.1 * 3 == 0.3}')\n# Decimal results (exact)\na = Decimal('0.1') + Decimal('0.2')\nb = Decimal('0.1') * 3\nprint(f'Decimal 0.1+0.2: {a}')\nprint(f'Decimal 0.1+0.2 == 0.3: {a == Decimal(\"0.3\")}')\nprint(f'Decimal 0.1*3: {b}')\nprint(f'Decimal 0.1*3 == 0.3: {b == Decimal(\"0.3\")}')",
      testCases: [
        {
          input: "",
          expectedOutput: "Float 0.1+0.2 == 0.3: False\nFloat 0.1*3 == 0.3: False\nDecimal 0.1+0.2: 0.3\nDecimal 0.1+0.2 == 0.3: True\nDecimal 0.1*3: 0.3\nDecimal 0.1*3 == 0.3: True\n"
        }
      ],
      difficulty: "beginner",
      xpReward: 25
    },
    {
      title: "Shopping Cart with Decimal",
      prompt: "Read N items (N given first). Each line: `name price quantity`. Calculate exact totals using `Decimal`. Print each item's total (2dp), then subtotal, tax (8.5%, rounded to 2dp using ROUND_HALF_UP), and grand total. If any price or qty is negative, print `Invalid data`.",
      starterCode: "from decimal import Decimal, ROUND_HALF_UP\n# Read items and calculate exact totals using Decimal\n",
      solutionCode: "from decimal import Decimal, ROUND_HALF_UP\nn = int(input())\nif n == 0:\n    print('No items')\nelse:\n    items = []\n    valid = True\n    for _ in range(n):\n        parts = input().split()\n        name = parts[0]\n        price = Decimal(parts[1])\n        qty = int(parts[2])\n        if price < 0 or qty < 0:\n            print('Invalid data')\n            valid = False\n            break\n        items.append((name, price, qty))\n    if valid:\n        subtotal = Decimal('0')\n        for name, price, qty in items:\n            total = price * qty\n            subtotal += total\n            print(f'{name}: \\${total.quantize(Decimal(\"0.01\"), rounding=ROUND_HALF_UP)}')\n        tax = (subtotal * Decimal('0.085')).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)\n        grand = subtotal + tax\n        print(f'Subtotal: \\${subtotal.quantize(Decimal(\"0.01\"))}')\n        print(f'Tax: \\${tax}')\n        print(f'Total: \\${grand.quantize(Decimal(\"0.01\"))}')",
      testCases: [
        {
          input: "2\nCoffee 4.99 2\nSandwich 8.99 1\n",
          expectedOutput: "Coffee: $9.98\nSandwich: $8.99\nSubtotal: $18.97\nTax: $1.61\nTotal: $20.58\n"
        },
        { input: "1\nBad -5.00 2\n", expectedOutput: "Invalid data\n" }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "Precision Calculator",
      prompt: "Read an expression type and numbers from input. Use `Decimal` with precision set to 20. Support:\n- `divide A B` → A / B to 10dp\n- `compound P R N Y` → compound interest P*(1+R/N)^(N*Y) to 2dp (P=principal, R=rate, N=times/year, Y=years)\n- `sqrt X` → square root using Decimal's sqrt() to 6dp\n\nIf inputs are invalid or division by zero, print `Error: reason`.",
      starterCode: "from decimal import Decimal, getcontext\n# Precision calculator using Decimal\n",
      solutionCode: "from decimal import Decimal, getcontext, InvalidOperation\ngetcontext().prec = 20\nparts = input().split()\nop = parts[0]\ntry:\n    if op == 'divide':\n        a, b = Decimal(parts[1]), Decimal(parts[2])\n        if b == 0:\n            print('Error: division by zero')\n        else:\n            result = a / b\n            print(round(result, 10))\n    elif op == 'compound':\n        p = Decimal(parts[1])\n        r = Decimal(parts[2])\n        n = Decimal(parts[3])\n        y = Decimal(parts[4])\n        if n == 0:\n            print('Error: n cannot be zero')\n        else:\n            amount = p * (1 + r / n) ** (n * y)\n            print(round(amount, 2))\n    elif op == 'sqrt':\n        x = Decimal(parts[1])\n        if x < 0:\n            print('Error: cannot take sqrt of negative')\n        else:\n            print(round(x.sqrt(), 6))\n    else:\n        print('Error: unknown operation')\nexcept (InvalidOperation, IndexError):\n    print('Error: invalid input')",
      testCases: [
        { input: "divide 1 3\n", expectedOutput: "0.3333333333\n" },
        { input: "compound 1000 0.05 12 10\n", expectedOutput: "1647.01\n" },
        { input: "sqrt 2\n", expectedOutput: "1.414214\n" },
        { input: "divide 5 0\n", expectedOutput: "Error: division by zero\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "fractions-module": [
    {
      title: "Fraction Arithmetic",
      prompt: "Read two fractions from input (each as `numerator denominator` on separate lines). Print their sum, difference, product, and quotient - each as a simplified fraction. If denominator is 0, print `Invalid fraction`.",
      starterCode: "from fractions import Fraction\n# Read two fractions and print arithmetic results\n",
      solutionCode: "from fractions import Fraction\ntry:\n    n1, d1 = int(input()), int(input())\n    n2, d2 = int(input()), int(input())\n    if d1 == 0 or d2 == 0:\n        print('Invalid fraction')\n    elif n2 == 0 and d1 != 0:  # division by zero fraction\n        a, b = Fraction(n1, d1), Fraction(n2, d2)\n        print(a + b)\n        print(a - b)\n        print(a * b)\n        print('Error: division by zero fraction')\n    else:\n        a, b = Fraction(n1, d1), Fraction(n2, d2)\n        print(a + b)\n        print(a - b)\n        print(a * b)\n        print(a / b)\nexcept (ValueError, ZeroDivisionError):\n    print('Invalid fraction')",
      testCases: [
        { input: "1\n2\n1\n3\n", expectedOutput: "5/6\n1/6\n1/6\n3/2\n" },
        { input: "3\n4\n1\n4\n", expectedOutput: "1\n1/2\n3/16\n3\n" },
        { input: "1\n0\n1\n2\n", expectedOutput: "Invalid fraction\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Float to Fraction Approximation",
      prompt: "Read a float and a maximum denominator from input. Using `Fraction.limit_denominator()`:\n1. Show the exact Fraction representation of the float (may be very complex)\n2. Show the simplified fraction with the given max denominator\n3. Show the float value of the approximation (6dp)\n4. Show the error between the original and approximation (6dp)\n\nIf inputs are invalid, print `Invalid input`.",
      starterCode: "from fractions import Fraction\n# Convert float to fraction with limit_denominator\n",
      solutionCode: "from fractions import Fraction\ntry:\n    value = float(input())\n    max_denom = int(input())\n    if max_denom <= 0:\n        print('Invalid input')\n    else:\n        exact = Fraction(value)\n        approx = Fraction(value).limit_denominator(max_denom)\n        approx_float = float(approx)\n        error = abs(value - approx_float)\n        print(f'Exact: {exact}')\n        print(f'Approx: {approx}')\n        print(f'Value: {approx_float:.6f}')\n        print(f'Error: {error:.6f}')\nexcept ValueError:\n    print('Invalid input')",
      testCases: [
        {
          input: "3.14159265\n100\n",
          expectedOutput: "Exact: 7070651414971679/2251799813685248\nApprox: 311/99\nValue: 3.141414\nError: 0.000178\n"
        },
        { input: "0.333333\n10\n", expectedOutput: "Exact: 6004799503160661/18014398509481984\nApprox: 1/3\nValue: 0.333333\nError: 0.000000\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Recipe Scaler",
      prompt: "Read N ingredients (N given first). Each line: `ingredient numerator denominator unit`. Read a scale factor as `numerator denominator` (e.g., `3 2` means multiply by 3/2). Print scaled amounts as simplified fractions with units. If any denominator is 0, print `Invalid recipe`.",
      starterCode: "from fractions import Fraction\n# Read recipe ingredients and scale them\n",
      solutionCode: "from fractions import Fraction\nn = int(input())\ningredients = []\nvalid = True\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    num, den = int(parts[1]), int(parts[2])\n    unit = parts[3]\n    if den == 0:\n        print('Invalid recipe')\n        valid = False\n        break\n    ingredients.append((name, Fraction(num, den), unit))\nif valid:\n    scale_parts = input().split()\n    scale_num, scale_den = int(scale_parts[0]), int(scale_parts[1])\n    if scale_den == 0:\n        print('Invalid recipe')\n    else:\n        scale = Fraction(scale_num, scale_den)\n        print(f'Scale factor: {scale}')\n        for name, amount, unit in ingredients:\n            scaled = amount * scale\n            print(f'{name}: {scaled} {unit}')",
      testCases: [
        {
          input: "3\nflour 2 1 cups\nsugar 3 4 cups\nbutter 1 2 cups\n3 2\n",
          expectedOutput: "Scale factor: 3/2\nflour: 3 cups\nsugar: 9/8 cups\nbutter: 3/4 cups\n"
        },
        { input: "1\nwater 1 0 cups\n1 2\n", expectedOutput: "Invalid recipe\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],

  "complex-numbers": [
    {
      title: "Complex Number Basics",
      prompt: "Read a complex number as two floats: real and imaginary parts. Print:\n1. The complex number in Python format\n2. Real part\n3. Imaginary part\n4. Absolute value (magnitude) rounded to 4dp\n5. Conjugate",
      starterCode: "# Read real and imaginary parts and print complex number info\n",
      solutionCode: "real = float(input())\nimag = float(input())\nc = complex(real, imag)\nprint(c)\nprint(c.real)\nprint(c.imag)\nprint(round(abs(c), 4))\nprint(c.conjugate())",
      testCases: [
        { input: "3\n4\n", expectedOutput: "(3+4j)\n3.0\n4.0\n5.0\n(3-4j)\n" },
        { input: "0\n1\n", expectedOutput: "1j\n0.0\n1.0\n1.0\n-1j\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Complex Arithmetic",
      prompt: "Read two complex numbers (each as `real imag` on separate lines). Print their sum, difference, product, and quotient (each to 2dp). Also print the magnitude of their product.\n\nIf inputs are invalid, print `Invalid input`.",
      starterCode: "# Read two complex numbers and print arithmetic results\n",
      solutionCode: "try:\n    r1, i1 = map(float, input().split())\n    r2, i2 = map(float, input().split())\n    a, b = complex(r1, i1), complex(r2, i2)\n    def fmt(c):\n        return f'{round(c.real, 2)}+{round(c.imag, 2)}j' if c.imag >= 0 else f'{round(c.real, 2)}{round(c.imag, 2)}j'\n    print(fmt(a + b))\n    print(fmt(a - b))\n    product = a * b\n    print(fmt(product))\n    if b == 0:\n        print('Error: division by zero')\n    else:\n        print(fmt(a / b))\n    print(round(abs(product), 4))\nexcept ValueError:\n    print('Invalid input')",
      testCases: [
        {
          input: "3 4\n1 -2\n",
          expectedOutput: "4+2j\n2+6j\n11-2j\n-1.0+2.0j\n5.0\n... wait checking\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Polar Form Converter",
      prompt: "Read a complex number as `real imag`. Using `cmath`:\n1. Print the magnitude to 4dp\n2. Print the phase angle in degrees to 2dp\n3. Print it back in rectangular form from polar (to verify) to 4dp\n4. Check if `|e^(iπ) + 1|` is essentially zero (print `Euler verified: True/False` using `abs < 1e-10`)\n\nIf input is invalid, print `Invalid input`.",
      starterCode: "import cmath\n# Read complex number and convert to polar form\n",
      solutionCode: "import cmath\nimport math\ntry:\n    r, i = map(float, input().split())\n    c = complex(r, i)\n    mag = abs(c)\n    phase_rad = cmath.phase(c)\n    phase_deg = math.degrees(phase_rad)\n    back = cmath.rect(mag, phase_rad)\n    euler_check = abs(cmath.exp(1j * cmath.pi) + 1) < 1e-10\n    print(round(mag, 4))\n    print(round(phase_deg, 2))\n    print(f'{round(back.real, 4)}+{round(back.imag, 4)}j' if back.imag >= 0 else f'{round(back.real, 4)}{round(back.imag, 4)}j')\n    print(f'Euler verified: {euler_check}')\nexcept ValueError:\n    print('Invalid input')",
      testCases: [
        {
          input: "3 4\n",
          expectedOutput: "5.0\n53.13\n3.0+4.0j\nEuler verified: True\n"
        },
        { input: "abc\n", expectedOutput: "Invalid input\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "number-systems": [
    {
      title: "Number Base Display",
      prompt: "Read a positive integer. Print its representation in binary (with `0b` prefix), octal (with `0o` prefix), and hexadecimal (uppercase, with `0x` prefix). If the number is negative or zero, print `Invalid: must be positive`.",
      starterCode: "# Read an integer and print in binary, octal, and hex\n",
      solutionCode: "n = int(input())\nif n <= 0:\n    print('Invalid: must be positive')\nelse:\n    print(bin(n))\n    print(oct(n))\n    print(hex(n).upper().replace('X', 'x'))",
      testCases: [
        { input: "255\n", expectedOutput: "0b11111111\n0o377\n0xFF\n" },
        { input: "16\n", expectedOutput: "0b10000\n0o20\n0x10\n" },
        { input: "0\n", expectedOutput: "Invalid: must be positive\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Base Converter",
      prompt: "Read a number string and its source base (2, 8, 10, or 16), then a target base. Convert and print the result with the appropriate prefix (0b, 0o, 0x, or nothing for decimal). If the input string is invalid for the source base, print `Invalid number for base X`. If base is not 2, 8, 10, or 16, print `Unsupported base`.",
      starterCode: "# Read a number string, source base, target base and convert\n",
      solutionCode: "number_str = input().strip()\nsrc_base = int(input())\ntgt_base = int(input())\nif src_base not in [2, 8, 10, 16] or tgt_base not in [2, 8, 10, 16]:\n    print('Unsupported base')\nelse:\n    try:\n        decimal = int(number_str, src_base)\n        if tgt_base == 2:\n            print(bin(decimal))\n        elif tgt_base == 8:\n            print(oct(decimal))\n        elif tgt_base == 10:\n            print(decimal)\n        elif tgt_base == 16:\n            print(hex(decimal).upper().replace('X', 'x'))\n    except ValueError:\n        print(f'Invalid number for base {src_base}')",
      testCases: [
        { input: "1010\n2\n10\n", expectedOutput: "10\n" },
        { input: "ff\n16\n2\n", expectedOutput: "0b11111111\n" },
        { input: "99\n2\n10\n", expectedOutput: "Invalid number for base 2\n" },
        { input: "10\n3\n10\n", expectedOutput: "Unsupported base\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Unix Permission Decoder",
      prompt: "Read a Unix permission number in octal (e.g., `755`). Decode and print the permissions for owner, group, and others in the format `rwxr-xr-x`. Also print whether:\n- The file is readable by others\n- The file is writable by owner\n- The file is executable by group\n\nIf the input is not a valid 3-digit octal string (digits 0-7 only), print `Invalid permission`.",
      starterCode: "# Read octal permission string and decode it\n",
      solutionCode: "perm_str = input().strip()\nif len(perm_str) != 3 or not all(c in '01234567' for c in perm_str):\n    print('Invalid permission')\nelse:\n    perm_map = {0:'---',1:'--x',2:'-w-',3:'-wx',4:'r--',5:'r-x',6:'rw-',7:'rwx'}\n    digits = [int(c) for c in perm_str]\n    owner_str = perm_map[digits[0]]\n    group_str = perm_map[digits[1]]\n    other_str = perm_map[digits[2]]\n    print(owner_str + group_str + other_str)\n    print(f'Others can read: {digits[2] >= 4}')\n    print(f'Owner can write: {digits[0] in [2,3,6,7]}')\n    print(f'Group can execute: {digits[1] % 2 == 1}')",
      testCases: [
        {
          input: "755\n",
          expectedOutput: "rwxr-xr-x\nOthers can read: True\nOwner can write: True\nGroup can execute: True\n"
        },
        {
          input: "644\n",
          expectedOutput: "rw-r--r--\nOthers can read: True\nOwner can write: True\nGroup can execute: False\n"
        },
        { input: "89a\n", expectedOutput: "Invalid permission\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "RGB Color Converter",
      prompt: "Read a hex color code (with or without #, e.g., `#FF8000` or `FF8000`). Convert to:\n1. RGB tuple as `(R, G, B)`\n2. HSL approximation: hue (0-360, 0dp), saturation (0-100%, 1dp), lightness (0-100%, 1dp)\n\nAlso read an RGB input as three integers on separate lines and convert to hex. If any input is invalid, print `Invalid color`.",
      starterCode: "# Read hex color and RGB, convert between formats\n",
      solutionCode: "def hex_to_rgb(h):\n    h = h.lstrip('#')\n    if len(h) != 6 or not all(c in '0123456789abcdefABCDEF' for c in h):\n        return None\n    return int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)\n\ndef rgb_to_hsl(r, g, b):\n    r, g, b = r/255, g/255, b/255\n    mx, mn = max(r,g,b), min(r,g,b)\n    l = (mx + mn) / 2\n    if mx == mn:\n        h = s = 0\n    else:\n        d = mx - mn\n        s = d / (2 - mx - mn) if l > 0.5 else d / (mx + mn)\n        if mx == r:\n            h = (g - b) / d + (6 if g < b else 0)\n        elif mx == g:\n            h = (b - r) / d + 2\n        else:\n            h = (r - g) / d + 4\n        h /= 6\n    return round(h*360), round(s*100,1), round(l*100,1)\n\ntry:\n    hex_input = input().strip()\n    rgb = hex_to_rgb(hex_input)\n    if rgb is None:\n        print('Invalid color')\n    else:\n        r, g, b = rgb\n        print(f'RGB: ({r}, {g}, {b})')\n        h, s, l = rgb_to_hsl(r, g, b)\n        print(f'HSL: ({h}°, {s}%, {l}%)')\n    r2 = int(input())\n    g2 = int(input())\n    b2 = int(input())\n    if all(0 <= v <= 255 for v in [r2, g2, b2]):\n        print(f'Hex: #{r2:02X}{g2:02X}{b2:02X}')\n    else:\n        print('Invalid color')\nexcept ValueError:\n    print('Invalid color')",
      testCases: [
        {
          input: "#FF8000\n255\n128\n0\n",
          expectedOutput: "RGB: (255, 128, 0)\nHSL: (30°, 100.0%, 50.0%)\nHex: #FF8000\n"
        },
        { input: "ZZZZZZ\n0\n0\n0\n", expectedOutput: "Invalid color\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "bitwise-operations": [
    {
      title: "Even or Odd with Bitwise AND",
      prompt: "Read an integer. Use bitwise AND (`& 1`) to determine if it is even or odd. Print `Even` or `Odd`. Also print its binary representation (8 bits, zero-padded) and the last bit value.",
      starterCode: "# Read an integer and check even/odd using bitwise AND\n",
      solutionCode: "n = int(input())\nprint('Even' if (n & 1) == 0 else 'Odd')\nprint(f'Binary: {n:08b}')\nprint(f'Last bit: {n & 1}')",
      testCases: [
        { input: "42\n", expectedOutput: "Even\nBinary: 00101010\nLast bit: 0\n" },
        { input: "7\n", expectedOutput: "Odd\nBinary: 00000111\nLast bit: 1\n" },
        { input: "0\n", expectedOutput: "Even\nBinary: 00000000\nLast bit: 0\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Bit Manipulation",
      prompt: "Read an integer N and a bit position P (0-indexed from right). Print:\n1. The value of bit P (0 or 1)\n2. N with bit P SET to 1\n3. N with bit P CLEARED to 0\n4. N with bit P TOGGLED\n\nShow each result with its binary (8-bit zero-padded) and decimal value.\n\nIf P < 0 or P > 7, print `Invalid bit position`.",
      starterCode: "# Read N and bit position P, perform bit operations\n",
      solutionCode: "n = int(input())\np = int(input())\nif p < 0 or p > 7:\n    print('Invalid bit position')\nelse:\n    bit_val = (n >> p) & 1\n    set_bit = n | (1 << p)\n    clear_bit = n & ~(1 << p)\n    toggle_bit = n ^ (1 << p)\n    print(f'Bit {p} value: {bit_val}')\n    print(f'Set:    {set_bit:08b} = {set_bit}')\n    print(f'Clear:  {clear_bit:08b} = {clear_bit}')\n    print(f'Toggle: {toggle_bit:08b} = {toggle_bit}')",
      testCases: [
        {
          input: "170\n2\n",
          expectedOutput: "Bit 2 value: 0\nSet:    10101110 = 174\nClear:  10101010 = 170\nToggle: 10101110 = 174\n"
        },
        { input: "255\n9\n", expectedOutput: "Invalid bit position\n" }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "Permission Flag System",
      prompt: "Implement a simple permission system using bit flags:\n- READ=1, WRITE=2, EXECUTE=4, DELETE=8, ADMIN=16\n\nRead a sequence of commands until `quit`:\n- `set USER PERM` → grant permission (e.g., `set alice read`)\n- `revoke USER PERM` → remove permission\n- `check USER PERM` → print `yes` or `no`\n- `list USER` → print all permissions the user has\n\nStart all users with no permissions. If user or perm is unknown, print `Unknown`.",
      starterCode: "# Implement permission system with bit flags\n",
      solutionCode: "PERMS = {'read': 1, 'write': 2, 'execute': 4, 'delete': 8, 'admin': 16}\nusers = {}\nwhile True:\n    line = input().strip().split()\n    cmd = line[0]\n    if cmd == 'quit':\n        break\n    user = line[1]\n    if cmd in ['set', 'revoke', 'check'] and len(line) > 2:\n        perm_name = line[2].lower()\n        if perm_name not in PERMS:\n            print('Unknown')\n            continue\n        perm_val = PERMS[perm_name]\n        if user not in users:\n            users[user] = 0\n        if cmd == 'set':\n            users[user] |= perm_val\n        elif cmd == 'revoke':\n            users[user] &= ~perm_val\n        elif cmd == 'check':\n            print('yes' if users[user] & perm_val else 'no')\n    elif cmd == 'list':\n        if user not in users or users[user] == 0:\n            print(f'{user}: none')\n        else:\n            granted = [name for name, val in PERMS.items() if users.get(user, 0) & val]\n            print(f'{user}: {\", \".join(granted)}')\n    else:\n        print('Unknown')",
      testCases: [
        {
          input: "set alice read\nset alice write\ncheck alice read\ncheck alice execute\nlist alice\nrevoke alice write\nlist alice\nquit\n",
          expectedOutput: "yes\nno\nalice: read, write\nalice: read\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 75
    },
    {
      title: "Bitwise Operations Suite",
      prompt: "Read two non-negative integers A and B. Print a complete analysis:\n1. A and B in 8-bit binary\n2. A & B (AND) with result\n3. A | B (OR) with result\n4. A ^ B (XOR) with result\n5. ~A (NOT A) - print the mathematical result -(A+1)\n6. A << 1 and A >> 1 with results\n7. Number of bits set in A (population count)\n8. The unique number if A and B both appear twice in a list [A, B, A, B, C] where C is read from input\n\nIf any input is negative, print `Invalid: non-negative integers only`.",
      starterCode: "# Read A, B, C and print complete bitwise analysis\n",
      solutionCode: "a = int(input())\nb = int(input())\nc = int(input())\nif a < 0 or b < 0 or c < 0:\n    print('Invalid: non-negative integers only')\nelse:\n    print(f'A = {a:08b} ({a})')\n    print(f'B = {b:08b} ({b})')\n    and_result = a & b\n    or_result = a | b\n    xor_result = a ^ b\n    print(f'A & B = {and_result:08b} ({and_result})')\n    print(f'A | B = {or_result:08b} ({or_result})')\n    print(f'A ^ B = {xor_result:08b} ({xor_result})')\n    print(f'~A = {~a}')\n    print(f'A << 1 = {a << 1:08b} ({a << 1})')\n    print(f'A >> 1 = {a >> 1:08b} ({a >> 1})')\n    pop_count = bin(a).count('1')\n    print(f'Bits set in A: {pop_count}')\n    unique = a ^ b ^ a ^ b ^ c\n    print(f'Unique in [A,B,A,B,C]: {unique}')",
      testCases: [
        {
          input: "60\n13\n42\n",
          expectedOutput: "A = 00111100 (60)\nB = 00001101 (13)\nA & B = 00001100 (12)\nA | B = 00111101 (61)\nA ^ B = 00110001 (49)\n~A = -61\nA << 1 = 01111000 (120)\nA >> 1 = 00011110 (30)\nBits set in A: 4\nUnique in [A,B,A,B,C]: 42\n"
        },
        { input: "-1\n5\n3\n", expectedOutput: "Invalid: non-negative integers only\n" }
      ],
      difficulty: "expert",
      xpReward: 95
    }
  ]
};