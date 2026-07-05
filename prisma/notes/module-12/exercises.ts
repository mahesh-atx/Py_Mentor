export const exercisesModule12: Record<string, any[]> = {
  "lambda-functions": [
    {
      title: "Simple Lambda",
      prompt: "Create a lambda function that takes a number and returns its cube (n³). Read a number from input and print the result.",
      starterCode: "# Create a cube lambda and use it\n",
      solutionCode: "cube = lambda x: x ** 3\nn = float(input())\nprint(cube(n))",
      testCases: [
        { input: "3\n", expectedOutput: "27.0\n" },
        { input: "4\n", expectedOutput: "64.0\n" }
      ],
      difficulty: "beginner",
      xpReward: 15
    },
    {
      title: "Lambda Sorter",
      prompt: "Read N words (N given first). Sort them by their last character using a lambda key, then print each word on a separate line. If N is 0, print `No words`.",
      starterCode: "# Read N words and sort by last character using lambda\n",
      solutionCode: "n = int(input())\nif n == 0:\n    print('No words')\nelse:\n    words = [input() for _ in range(n)]\n    sorted_words = sorted(words, key=lambda w: w[-1])\n    for word in sorted_words:\n        print(word)",
      testCases: [
        { input: "4\nbanana\nfig\napple\nkiwi\n", expectedOutput: "banana\nfig\napple\nkiwi\n" },
        { input: "0\n", expectedOutput: "No words\n" }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Multi-Key Lambda Sort",
      prompt: "Read N student records (N given first). Each line: `name score`. Sort by score descending, then by name ascending for ties. Print each as `name: score`. Use a lambda key that returns a tuple.",
      starterCode: "# Read students and sort with lambda multi-key\n",
      solutionCode: "n = int(input())\nstudents = []\nfor _ in range(n):\n    parts = input().split()\n    students.append((parts[0], int(parts[1])))\nsorted_students = sorted(students, key=lambda s: (-s[1], s[0]))\nfor name, score in sorted_students:\n    print(f'{name}: {score}')",
      testCases: [
        {
          input: "4\nCharlie 88\nAlice 88\nBob 95\nDiana 72\n",
          expectedOutput: "Bob: 95\nAlice: 88\nCharlie: 88\nDiana: 72\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 60
    }
  ],

  "map-filter-reduce": [
    {
      title: "Map Squares",
      prompt: "Read N integers (N given first). Use `map()` with a lambda to square each number. Print the results as a list.",
      starterCode: "# Read N integers, use map() to square them\n",
      solutionCode: "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nresult = list(map(lambda x: x ** 2, numbers))\nprint(result)",
      testCases: [
        { input: "4\n1\n2\n3\n4\n", expectedOutput: "[1, 4, 9, 16]\n" },
        { input: "3\n-2\n0\n5\n", expectedOutput: "[4, 0, 25]\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Filter and Map Pipeline",
      prompt: "Read N integers (N given first). Using `filter()` to keep only positive numbers, then `map()` to square them. Print the final list. If no positives, print `[]`.",
      starterCode: "# Filter positives then square using filter() and map()\n",
      solutionCode: "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nresult = list(map(lambda x: x**2, filter(lambda x: x > 0, numbers)))\nprint(result)",
      testCases: [
        { input: "5\n-3\n2\n-1\n4\n5\n", expectedOutput: "[4, 16, 25]\n" },
        { input: "3\n-1\n-2\n-3\n", expectedOutput: "[]\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Reduce for Running Stats",
      prompt: "Read N numbers (N given first, N >= 2). Using `reduce()`:\n1. Compute the total sum\n2. Compute the product\n3. Compute the maximum\n\nPrint each on a separate line with label `Sum: X`, `Product: X`, `Max: X`. If N < 2, print `Need at least 2`.",
      starterCode: "from functools import reduce\n# Read N numbers and compute sum, product, max using reduce\n",
      solutionCode: "from functools import reduce\nn = int(input())\nif n < 2:\n    print('Need at least 2')\nelse:\n    numbers = [float(input()) for _ in range(n)]\n    total = reduce(lambda acc, x: acc + x, numbers)\n    product = reduce(lambda acc, x: acc * x, numbers)\n    maximum = reduce(lambda acc, x: acc if acc > x else x, numbers)\n    print(f'Sum: {total}')\n    print(f'Product: {product}')\n    print(f'Max: {maximum}')",
      testCases: [
        { input: "4\n2\n3\n4\n5\n", expectedOutput: "Sum: 14.0\nProduct: 120.0\nMax: 5.0\n" },
        { input: "1\n5\n", expectedOutput: "Need at least 2\n" }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Data Processing Pipeline",
      prompt: "Read N CSV records (N given first). Each: `name,score,active` (active is `true`/`false`). Using `map()`, `filter()`, `sorted()`, and `reduce()`:\n1. Parse with map\n2. Keep only active users with filter\n3. Sort by score descending\n4. Print ranked active users\n5. Print total score with reduce\n\nIf no active users, print `No active users`.",
      starterCode: "from functools import reduce\n# Build a data pipeline using map, filter, sorted, reduce\n",
      solutionCode: "from functools import reduce\nn = int(input())\nlines = [input() for _ in range(n)]\n\ndef parse(line):\n    parts = line.split(',')\n    return {'name': parts[0].strip(), 'score': int(parts[1].strip()), 'active': parts[2].strip().lower() == 'true'}\n\nrecords = list(map(parse, lines))\nactive = list(filter(lambda r: r['active'], records))\n\nif not active:\n    print('No active users')\nelse:\n    ranked = sorted(active, key=lambda r: r['score'], reverse=True)\n    for i, r in enumerate(ranked, 1):\n        print(f\"#{i} {r['name']}: {r['score']}\")\n    total = reduce(lambda acc, r: acc + r['score'], ranked, 0)\n    print(f'Total: {total}')",
      testCases: [
        {
          input: "4\nAlice,88,true\nBob,45,false\nCharlie,92,true\nDiana,67,true\n",
          expectedOutput: "#1 Charlie: 92\n#2 Alice: 88\n#3 Diana: 67\nTotal: 247\n"
        },
        { input: "2\nAlice,88,false\nBob,72,false\n", expectedOutput: "No active users\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "zip-enumerate-sorted": [
    {
      title: "Zip and Print",
      prompt: "Read two lists of N items each (N given first, then list 1 items, then list 2 items). Use `zip()` to pair them and print each pair as `ITEM1: ITEM2`.",
      starterCode: "# Read two lists, zip them, and print pairs\n",
      solutionCode: "n = int(input())\nlist1 = [input() for _ in range(n)]\nlist2 = [input() for _ in range(n)]\nfor a, b in zip(list1, list2):\n    print(f'{a}: {b}')",
      testCases: [
        { input: "3\nalice\nbob\ncharlie\n88\n72\n95\n", expectedOutput: "alice: 88\nbob: 72\ncharlie: 95\n" }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Enumerate for Ranking",
      prompt: "Read N words (N given first). Sort them by length ascending, then alphabetically. Use `enumerate()` starting at 1 to print each as `#RANK. word (LENGTH chars)`. If N is 0, print `No words`.",
      starterCode: "# Read N words, sort by length then alpha, print ranked with enumerate\n",
      solutionCode: "n = int(input())\nif n == 0:\n    print('No words')\nelse:\n    words = [input() for _ in range(n)]\n    sorted_words = sorted(words, key=lambda w: (len(w), w))\n    for rank, word in enumerate(sorted_words, 1):\n        print(f'#{rank}. {word} ({len(word)} chars)')",
      testCases: [
        {
          input: "4\nbanana\nfig\napple\nkiwi\n",
          expectedOutput: "#1. fig (3 chars)\n#2. kiwi (4 chars)\n#3. apple (5 chars)\n#4. banana (6 chars)\n"
        },
        { input: "0\n", expectedOutput: "No words\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Multi-Level Sort",
      prompt: "Read N product records (N given first). Each line: `name price stock`. Sort by:\n1. In-stock first (stock > 0), then out-of-stock\n2. Among same availability: by price ascending\n3. Among same price: by name alphabetically\n\nPrint each as `name: $price (stock units)`. Use `sorted()` with a lambda tuple key.",
      starterCode: "# Read products and sort by availability, price, name\n",
      solutionCode: "n = int(input())\nproducts = []\nfor _ in range(n):\n    parts = input().split()\n    products.append({'name': parts[0], 'price': float(parts[1]), 'stock': int(parts[2])})\n\nsorted_products = sorted(products, key=lambda p: (p['stock'] == 0, p['price'], p['name']))\n\nfor p in sorted_products:\n    print(f\"{p['name']}: \\${p['price']:.2f} ({p['stock']} units)\")",
      testCases: [
        {
          input: "4\nLaptop 999 5\nMouse 30 0\nKeyboard 80 8\nMonitor 350 0\n",
          expectedOutput: "Keyboard: $80.00 (8 units)\nLaptop: $999.00 (5 units)\nMouse: $30.00 (0 units)\nMonitor: $350.00 (0 units)\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "any-all-combining": [
    {
      title: "any() and all() Checks",
      prompt: "Read N integers (N given first). Print:\n1. `Any negative: True/False`\n2. `All positive: True/False`\n3. `Any > 100: True/False`\n4. `All even: True/False`\n\nIf N is 0, print `Empty list` for all.",
      starterCode: "# Read N integers and print any/all checks\n",
      solutionCode: "n = int(input())\nif n == 0:\n    for _ in range(4): print('Empty list')\nelse:\n    nums = [int(input()) for _ in range(n)]\n    print(f'Any negative: {any(x < 0 for x in nums)}')\n    print(f'All positive: {all(x > 0 for x in nums)}')\n    print(f'Any > 100: {any(x > 100 for x in nums)}')\n    print(f'All even: {all(x % 2 == 0 for x in nums)}')",
      testCases: [
        {
          input: "5\n2\n4\n-1\n6\n8\n",
          expectedOutput: "Any negative: True\nAll positive: False\nAny > 100: False\nAll even: False\n"
        },
        {
          input: "3\n2\n4\n6\n",
          expectedOutput: "Any negative: False\nAll positive: True\nAny > 100: False\nAll even: True\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 35
    },
    {
      title: "Full Functional Pipeline",
      prompt: "Read N employee records (N given first). Each line: `name department salary`. Using ONLY functional tools (map, filter, sorted, reduce, any, all - no explicit for loops for processing):\n1. Print total payroll (reduce)\n2. Print highest paid employee\n3. Check if any earn over $100,000 (any)\n4. Check if all earn at least $30,000 (all)\n5. Print Engineering dept employees sorted by salary descending\n\nIf N is 0, print `No employees`.",
      starterCode: "from functools import reduce\n# Process employee data using only functional tools\n",
      solutionCode: "from functools import reduce\nn = int(input())\nif n == 0:\n    print('No employees')\nelse:\n    def parse(line):\n        parts = line.split()\n        return {'name': parts[0], 'dept': parts[1], 'salary': int(parts[2])}\n    \n    employees = list(map(parse, [input() for _ in range(n)]))\n    \n    total = reduce(lambda acc, e: acc + e['salary'], employees, 0)\n    print(f'Total payroll: \\${total:,}')\n    \n    top = max(employees, key=lambda e: e['salary'])\n    print(f\"Highest paid: {top['name']} (\\${top['salary']:,})\")\n    \n    print(f\"Any over \\$100k: {any(e['salary'] > 100000 for e in employees)}\")\n    print(f\"All at least \\$30k: {all(e['salary'] >= 30000 for e in employees)}\")\n    \n    eng = sorted(\n        filter(lambda e: e['dept'] == 'Engineering', employees),\n        key=lambda e: e['salary'],\n        reverse=True\n    )\n    print('Engineering:')\n    for e in eng:\n        print(f\"  {e['name']}: \\${e['salary']:,}\")",
      testCases: [
        {
          input: "4\nAlice Engineering 95000\nBob Marketing 72000\nCharlie Engineering 88000\nDiana Marketing 45000\n",
          expectedOutput: "Total payroll: $300,000\nHighest paid: Alice ($95,000)\nAny over $100k: False\nAll at least $30k: True\nEngineering:\n  Alice: $95,000\n  Charlie: $88,000\n"
        }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ]
};