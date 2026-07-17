export const exercises: Record<string, any[]> = {
  "lambda-functions": [
    {
      "title": "Basic Lambda Square",
      "prompt": "Assign a lambda to `square` that returns its argument squared, then print `square(6)`.",
      "starterCode": "# Assign a lambda to square and call it\n",
      "solutionCode": "square = lambda x: x ** 2\nprint(square(6))",
      "testCases": [{ "input": "", "expectedOutput": "36\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Lambda with Two Parameters",
      "prompt": "Create a lambda `add` that takes two arguments and returns their sum, then print `add(8, 12)`.",
      "starterCode": "# Create an add lambda and call it\n",
      "solutionCode": "add = lambda a, b: a + b\nprint(add(8, 12))",
      "testCases": [{ "input": "", "expectedOutput": "20\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Conditional Lambda",
      "prompt": "Create a lambda `classify` that returns 'even' if its argument is even, otherwise 'odd', then print `classify(7)` and `classify(10)`.",
      "starterCode": "# Create a classify lambda using a conditional expression\n",
      "solutionCode": "classify = lambda n: 'even' if n % 2 == 0 else 'odd'\nprint(classify(7))\nprint(classify(10))",
      "testCases": [{ "input": "", "expectedOutput": "odd\neven\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Immediately Invoked Lambda",
      "prompt": "Use an immediately invoked lambda expression to calculate and print the cube of 4 (define and call the lambda in one expression).",
      "starterCode": "# Define and invoke a lambda in one expression\n",
      "solutionCode": "result = (lambda x: x ** 3)(4)\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "64\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Lambda with *args",
      "prompt": "Create a lambda `multiply_all` that takes any number of arguments and returns their product. Print `multiply_all(2, 3, 4)`.",
      "starterCode": "# Create a lambda that multiplies all arguments\n",
      "solutionCode": "from functools import reduce\nmultiply_all = lambda *args: reduce(lambda a, b: a * b, args, 1)\nprint(multiply_all(2, 3, 4))",
      "testCases": [{ "input": "", "expectedOutput": "24\n" }],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Module Integration: Sorting with Lambda",
      "prompt": "Given a list of tuples `products = [('Laptop', 999.99), ('Mouse', 29.99), ('Keyboard', 79.99), ('Monitor', 349.99)]`, sort them by price (second element) in ascending order using a lambda as the key. Print the sorted list.",
      "starterCode": "products = [('Laptop', 999.99), ('Mouse', 29.99), ('Keyboard', 79.99), ('Monitor', 349.99)]\n# Sort by price using a lambda\n",
      "solutionCode": "products = [('Laptop', 999.99), ('Mouse', 29.99), ('Keyboard', 79.99), ('Monitor', 349.99)]\nsorted_products = sorted(products, key=lambda p: p[1])\nprint(sorted_products)",
      "testCases": [{ "input": "", "expectedOutput": "[('Mouse', 29.99), ('Keyboard', 79.99), ('Monitor', 349.99), ('Laptop', 999.99)]\n" }],
      "difficulty": "expert",
      "xpReward": 60
    }
  ,
    {
      "title": "Lambda Add",
      "prompt": "Create add = lambda a, b: a + b and print add(17, 25).",
      "starterCode": "# lambda addition\n",
      "solutionCode": "add = lambda a, b: a + b\nprint(add(17, 25))",
      "testCases": [{ "input": "", "expectedOutput": "42\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ],
  "map-function": [
    {
      "title": "Square All Numbers",
      "prompt": "Given `nums = [1, 2, 3, 4, 5]`, use `map()` with a lambda to create a list of squares. Print the result.",
      "starterCode": "nums = [1, 2, 3, 4, 5]\n# Use map() to square each number\n",
      "solutionCode": "nums = [1, 2, 3, 4, 5]\nsquares = list(map(lambda x: x ** 2, nums))\nprint(squares)",
      "testCases": [{ "input": "", "expectedOutput": "[1, 4, 9, 16, 25]\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Convert Strings to Integers",
      "prompt": "Given `strings = ['10', '20', '30', '40']`, use `map()` with the `int` function to convert all strings to integers. Print the result.",
      "starterCode": "strings = ['10', '20', '30', '40']\n# Use map() to convert to integers\n",
      "solutionCode": "strings = ['10', '20', '30', '40']\nintegers = list(map(int, strings))\nprint(integers)",
      "testCases": [{ "input": "", "expectedOutput": "[10, 20, 30, 40]\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "map() with Two Lists",
      "prompt": "Given `a = [1, 2, 3]` and `b = [10, 20, 30]`, use `map()` with a lambda to add corresponding elements. Print the result.",
      "starterCode": "a = [1, 2, 3]\nb = [10, 20, 30]\n# Use map() to add corresponding elements\n",
      "solutionCode": "a = [1, 2, 3]\nb = [10, 20, 30]\nsums = list(map(lambda x, y: x + y, a, b))\nprint(sums)",
      "testCases": [{ "input": "", "expectedOutput": "[11, 22, 33]\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Temperature Conversion",
      "prompt": "Given a list of Celsius temperatures `temps = [0, 20, 37, 100]`, use `map()` to convert them all to Fahrenheit using the formula F = (C * 9/5) + 32. Print the result as a list of floats.",
      "starterCode": "temps = [0, 20, 37, 100]\n# Convert to Fahrenheit using map()\n",
      "solutionCode": "temps = [0, 20, 37, 100]\nfahrenheit = list(map(lambda c: (c * 9/5) + 32, temps))\nprint(fahrenheit)",
      "testCases": [{ "input": "", "expectedOutput": "[32.0, 68.0, 98.6, 212.0]\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Extract Dictionary Values",
      "prompt": "Given `users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]`, use `map()` to extract just the names into a list. Print the result.",
      "starterCode": "users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]\n# Extract names using map()\n",
      "solutionCode": "users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]\nnames = list(map(lambda u: u['name'], users))\nprint(names)",
      "testCases": [{ "input": "", "expectedOutput": "['Alice', 'Bob', 'Charlie']\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: String Normalizer",
      "prompt": "Given a list of strings `words = ['  hello  ', 'WORLD', '  PyThOn  ']`, use `map()` to create a new list where each string is stripped of whitespace and converted to lowercase. Print the result.",
      "starterCode": "words = ['  hello  ', 'WORLD', '  PyThOn  ']\n# Normalize using map()\n",
      "solutionCode": "words = ['  hello  ', 'WORLD', '  PyThOn  ']\nnormalized = list(map(lambda s: s.strip().lower(), words))\nprint(normalized)",
      "testCases": [{ "input": "", "expectedOutput": "['hello', 'world', 'python']\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ,
    {
      "title": "Square All",
      "prompt": "Use map() with a lambda to square every number in [1, 2, 3, 4]. Print the result as a list.",
      "starterCode": "# map + lambda\n",
      "solutionCode": "print(list(map(lambda x: x ** 2, [1, 2, 3, 4])))",
      "testCases": [{ "input": "", "expectedOutput": "[1, 4, 9, 16]\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "filter-function": [
    {
      "title": "Filter Even Numbers",
      "prompt": "Given `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, use `filter()` with a lambda to keep only even numbers. Print the result.",
      "starterCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Filter even numbers\n",
      "solutionCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)",
      "testCases": [{ "input": "", "expectedOutput": "[2, 4, 6, 8, 10]\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Filter Long Words",
      "prompt": "Given `words = ['apple', 'pie', 'banana', 'kiwi', 'strawberry', 'fig']`, use `filter()` to keep only words longer than 4 characters. Print the result.",
      "starterCode": "words = ['apple', 'pie', 'banana', 'kiwi', 'strawberry', 'fig']\n# Filter words longer than 4 characters\n",
      "solutionCode": "words = ['apple', 'pie', 'banana', 'kiwi', 'strawberry', 'fig']\nlong_words = list(filter(lambda w: len(w) > 4, words))\nprint(long_words)",
      "testCases": [{ "input": "", "expectedOutput": "['apple', 'banana', 'strawberry']\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Filter Truthy Values",
      "prompt": "Given `mixed = [0, 1, '', 'hello', [], [1, 2], None, True, False, '', 'world']`, use `filter(None, ...)` to keep only truthy values. Print the result.",
      "starterCode": "mixed = [0, 1, '', 'hello', [], [1, 2], None, True, False, '', 'world']\n# Filter truthy values using None\n",
      "solutionCode": "mixed = [0, 1, '', 'hello', [], [1, 2], None, True, False, '', 'world']\ntruthy = list(filter(None, mixed))\nprint(truthy)",
      "testCases": [{ "input": "", "expectedOutput": "[1, 'hello', [1, 2], True, 'world']\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Filter Passing Scores",
      "prompt": "Read N scores from input (N given first, one score per line). Use `filter()` to keep only passing scores (>= 60). Print the passing scores and the count. (Input: 5, 45, 78, 92, 58, 70 → Output: [78, 92, 70] then Count: 3)",
      "starterCode": "# Read N scores and filter passing ones\n",
      "solutionCode": "n = int(input())\nscores = [int(input()) for _ in range(n)]\npassing = list(filter(lambda s: s >= 60, scores))\nprint(passing)\nprint(f'Count: {len(passing)}')",
      "testCases": [
        { "input": "5\n45\n78\n92\n58\n70\n", "expectedOutput": "[78, 92, 70]\nCount: 3\n" }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Module Integration: Product Filter",
      "prompt": "Given a list of product dictionaries, use `filter()` to find all in-stock products under $100. Print their names.\n\nproducts = [\n    {'name': 'Laptop', 'price': 999, 'in_stock': True},\n    {'name': 'Mouse', 'price': 25, 'in_stock': True},\n    {'name': 'Keyboard', 'price': 75, 'in_stock': False},\n    {'name': 'USB Cable', 'price': 12, 'in_stock': True},\n]",
      "starterCode": "products = [\n    {'name': 'Laptop', 'price': 999, 'in_stock': True},\n    {'name': 'Mouse', 'price': 25, 'in_stock': True},\n    {'name': 'Keyboard', 'price': 75, 'in_stock': False},\n    {'name': 'USB Cable', 'price': 12, 'in_stock': True},\n]\n# Filter in-stock products under $100\n",
      "solutionCode": "products = [\n    {'name': 'Laptop', 'price': 999, 'in_stock': True},\n    {'name': 'Mouse', 'price': 25, 'in_stock': True},\n    {'name': 'Keyboard', 'price': 75, 'in_stock': False},\n    {'name': 'USB Cable', 'price': 12, 'in_stock': True},\n]\naffordable = list(filter(lambda p: p['in_stock'] and p['price'] < 100, products))\nprint([p['name'] for p in affordable])",
      "testCases": [{ "input": "", "expectedOutput": "['Mouse', 'USB Cable']\n" }],
      "difficulty": "expert",
      "xpReward": 60
    }
  ,
    {
      "title": "Keep Evens",
      "prompt": "Use filter() with a lambda to keep only the even numbers of range(10). Print the result as a list.",
      "starterCode": "# filter + lambda\n",
      "solutionCode": "print(list(filter(lambda x: x % 2 == 0, range(10))))",
      "testCases": [{ "input": "", "expectedOutput": "[0, 2, 4, 6, 8]\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "reduce-function": [
    {
      "title": "Sum with reduce()",
      "prompt": "Given `numbers = [1, 2, 3, 4, 5]`, use `reduce()` to calculate the sum. Print the result.",
      "starterCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5]\n# Use reduce() to sum all numbers\n",
      "solutionCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5]\ntotal = reduce(lambda acc, x: acc + x, numbers)\nprint(total)",
      "testCases": [{ "input": "", "expectedOutput": "15\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Product with reduce()",
      "prompt": "Given `numbers = [1, 2, 3, 4, 5]`, use `reduce()` to calculate the product (1 * 2 * 3 * 4 * 5). Print the result.",
      "starterCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5]\n# Use reduce() to calculate the product\n",
      "solutionCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5]\nproduct = reduce(lambda acc, x: acc * x, numbers, 1)\nprint(product)",
      "testCases": [{ "input": "", "expectedOutput": "120\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Find Maximum with reduce()",
      "prompt": "Given `numbers = [23, 45, 12, 67, 34, 89, 15]`, use `reduce()` to find the maximum value. Print the result.",
      "starterCode": "from functools import reduce\nnumbers = [23, 45, 12, 67, 34, 89, 15]\n# Use reduce() to find the maximum\n",
      "solutionCode": "from functools import reduce\nnumbers = [23, 45, 12, 67, 34, 89, 15]\nmaximum = reduce(lambda a, b: a if a > b else b, numbers)\nprint(maximum)",
      "testCases": [{ "input": "", "expectedOutput": "89\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Factorial with reduce()",
      "prompt": "Read an integer N from input. Use `reduce()` to calculate N! (factorial). Print the result. If N is 0, print 1. (Input: 6 → Output: 720)",
      "starterCode": "from functools import reduce\n# Read N and calculate factorial using reduce()\n",
      "solutionCode": "from functools import reduce\nn = int(input())\nfactorial = reduce(lambda acc, x: acc * x, range(1, n + 1), 1)\nprint(factorial)",
      "testCases": [
        { "input": "6\n", "expectedOutput": "720\n" }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Flatten a List of Lists",
      "prompt": "Given `nested = [[1, 2], [3, 4], [5, 6]]`, use `reduce()` to flatten it into a single list. Print the result.",
      "starterCode": "from functools import reduce\nnested = [[1, 2], [3, 4], [5, 6]]\n# Use reduce() to flatten\n",
      "solutionCode": "from functools import reduce\nnested = [[1, 2], [3, 4], [5, 6]]\nflat = reduce(lambda acc, x: acc + x, nested)\nprint(flat)",
      "testCases": [{ "input": "", "expectedOutput": "[1, 2, 3, 4, 5, 6]\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Word Frequency",
      "prompt": "Read a line of text from input. Use `reduce()` to build a word frequency dictionary. Print the dictionary sorted alphabetically by word. (Input: 'the cat sat on the mat' → Output includes 'the': 2, 'cat': 1, etc.)",
      "starterCode": "from functools import reduce\n# Read input and build word frequency using reduce()\n",
      "solutionCode": "from functools import reduce\ntext = input().lower().split()\nfreq = reduce(lambda d, w: {**d, w: d.get(w, 0) + 1}, text, {})\nfor word in sorted(freq):\n    print(f'{word}: {freq[word]}')",
      "testCases": [
        { "input": "the cat sat on the mat\n", "expectedOutput": "cat: 1\nmat: 1\non: 1\nsat: 1\nthe: 2\n" }
      ],
      "difficulty": "expert",
      "xpReward": 70
    }
  ,
    {
      "title": "Product of All",
      "prompt": "Use functools.reduce to compute the product of [1, 2, 3, 4, 5] and print it.",
      "starterCode": "from functools import reduce\n# reduce to a product\n",
      "solutionCode": "from functools import reduce\nprint(reduce(lambda acc, x: acc * x, [1, 2, 3, 4, 5], 1))",
      "testCases": [{ "input": "", "expectedOutput": "120\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "zip-function": [
    {
      "title": "Zip Two Lists",
      "prompt": "Given `names = ['Alice', 'Bob', 'Charlie']` and `ages = [25, 30, 35]`, use `zip()` to pair them. Print the result as a list of tuples.",
      "starterCode": "names = ['Alice', 'Bob', 'Charlie']\nages = [25, 30, 35]\n# Use zip() to pair them\n",
      "solutionCode": "names = ['Alice', 'Bob', 'Charlie']\nages = [25, 30, 35]\npaired = list(zip(names, ages))\nprint(paired)",
      "testCases": [{ "input": "", "expectedOutput": "[('Alice', 25), ('Bob', 30), ('Charlie', 35)]\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Zip to Dictionary",
      "prompt": "Given `keys = ['name', 'age', 'city']` and `values = ['Alice', 25, 'New York']`, use `zip()` and `dict()` to create a dictionary. Print the result.",
      "starterCode": "keys = ['name', 'age', 'city']\nvalues = ['Alice', 25, 'New York']\n# Use zip() to create a dictionary\n",
      "solutionCode": "keys = ['name', 'age', 'city']\nvalues = ['Alice', 25, 'New York']\nperson = dict(zip(keys, values))\nprint(person)",
      "testCases": [{ "input": "", "expectedOutput": "{'name': 'Alice', 'age': 25, 'city': 'New York'}\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Unzip a List of Tuples",
      "prompt": "Given `pairs = [('Alice', 25), ('Bob', 30), ('Charlie', 35)]`, use `zip(*...)` to unzip into separate tuples. Print the names tuple and ages tuple.",
      "starterCode": "pairs = [('Alice', 25), ('Bob', 30), ('Charlie', 35)]\n# Unzip using zip(*...)\n",
      "solutionCode": "pairs = [('Alice', 25), ('Bob', 30), ('Charlie', 35)]\nnames, ages = zip(*pairs)\nprint(names)\nprint(ages)",
      "testCases": [{ "input": "", "expectedOutput": "('Alice', 'Bob', 'Charlie')\n(25, 30, 35)\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Parallel Iteration",
      "prompt": "Read N students and their scores (N given first, then N lines of 'name score'). Use `zip()` to iterate over both lists simultaneously and print each student's result. (Input: 2, Alice 85, Bob 92 → Output: Alice: 85, Bob: 92)",
      "starterCode": "# Read N students and scores, use zip() to pair them\n",
      "solutionCode": "n = int(input())\nnames = []\nscores = []\nfor _ in range(n):\n    parts = input().split()\n    names.append(parts[0])\n    scores.append(int(parts[1]))\nfor name, score in zip(names, scores):\n    print(f'{name}: {score}')",
      "testCases": [
        { "input": "2\nAlice 85\nBob 92\n", "expectedOutput": "Alice: 85\nBob: 92\n" }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Module Integration: Transpose a Matrix",
      "prompt": "Given a 3x3 matrix as a list of lists, use `zip(*matrix)` to transpose it. Print the transposed matrix as a list of tuples.\n\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      "starterCode": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# Transpose using zip(*matrix)\n",
      "solutionCode": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\ntransposed = list(zip(*matrix))\nprint(transposed)",
      "testCases": [{ "input": "", "expectedOutput": "[(1, 4, 7), (2, 5, 8), (3, 6, 9)]\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ,
    {
      "title": "Zip Sum",
      "prompt": "Given a = [1, 2, 3] and b = [10, 20, 30], use zip() to pair them and print a list of the pairwise sums.",
      "starterCode": "# zip pairs\n",
      "solutionCode": "a = [1, 2, 3]\nb = [10, 20, 30]\nprint([x + y for x, y in zip(a, b)])",
      "testCases": [{ "input": "", "expectedOutput": "[11, 22, 33]\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "enumerate-function": [
    {
      "title": "Basic enumerate()",
      "prompt": "Given `fruits = ['apple', 'banana', 'cherry']`, use `enumerate()` to print each fruit with its index in the format 'Index X: fruit'.",
      "starterCode": "fruits = ['apple', 'banana', 'cherry']\n# Use enumerate() to print index and fruit\n",
      "solutionCode": "fruits = ['apple', 'banana', 'cherry']\nfor i, fruit in enumerate(fruits):\n    print(f'Index {i}: {fruit}')",
      "testCases": [{ "input": "", "expectedOutput": "Index 0: apple\nIndex 1: banana\nIndex 2: cherry\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "enumerate() with start=1",
      "prompt": "Given `tasks = ['Write code', 'Test code', 'Deploy code']`, use `enumerate()` with `start=1` to print a numbered list. Format: '1. Write code'",
      "starterCode": "tasks = ['Write code', 'Test code', 'Deploy code']\n# Use enumerate() with start=1\n",
      "solutionCode": "tasks = ['Write code', 'Test code', 'Deploy code']\nfor i, task in enumerate(tasks, start=1):\n    print(f'{i}. {task}')",
      "testCases": [{ "input": "", "expectedOutput": "1. Write code\n2. Test code\n3. Deploy code\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Find Matching Indices",
      "prompt": "Given `words = ['hello', 'world', 'hello', 'python', 'hello']`, use `enumerate()` in a list comprehension to find all indices where the word is 'hello'. Print the result.",
      "starterCode": "words = ['hello', 'world', 'hello', 'python', 'hello']\n# Find indices of 'hello' using enumerate()\n",
      "solutionCode": "words = ['hello', 'world', 'hello', 'python', 'hello']\nindices = [i for i, w in enumerate(words) if w == 'hello']\nprint(indices)",
      "testCases": [{ "input": "", "expectedOutput": "[0, 2, 4]\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Line Numberer",
      "prompt": "Read N lines of text from input (N given first). Use `enumerate()` to print each line with its line number (starting at 1). Format: 'Line X: content'. (Input: 3, Hello, World, Python → Output: Line 1: Hello, Line 2: World, Line 3: Python)",
      "starterCode": "# Read N lines and number them using enumerate()\n",
      "solutionCode": "n = int(input())\nlines = [input() for _ in range(n)]\nfor i, line in enumerate(lines, start=1):\n    print(f'Line {i}: {line}')",
      "testCases": [
        { "input": "3\nHello\nWorld\nPython\n", "expectedOutput": "Line 1: Hello\nLine 2: World\nLine 3: Python\n" }
      ],
      "difficulty": "expert",
      "xpReward": 55
    }
  ,
    {
      "title": "Indexed Letters",
      "prompt": "Loop over 'abc' with enumerate() and print each index and letter separated by a space, one pair per line.",
      "starterCode": "# enumerate\n",
      "solutionCode": "for i, c in enumerate('abc'):\n    print(i, c)",
      "testCases": [{ "input": "", "expectedOutput": "0 a\n1 b\n2 c\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "sorted-with-key": [
    {
      "title": "Sort by Length",
      "prompt": "Given `words = ['banana', 'Apple', 'cherry', 'date', 'Elderberry']`, use `sorted()` with a key function to sort by word length (shortest first). Print the result.",
      "starterCode": "words = ['banana', 'Apple', 'cherry', 'date', 'Elderberry']\n# Sort by length using key=len\n",
      "solutionCode": "words = ['banana', 'Apple', 'cherry', 'date', 'Elderberry']\nsorted_words = sorted(words, key=len)\nprint(sorted_words)",
      "testCases": [{ "input": "", "expectedOutput": "['date', 'Apple', 'banana', 'cherry', 'Elderberry']\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Sort Dictionaries by Key",
      "prompt": "Given `people = [{'name': 'Charlie', 'age': 30}, {'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 35}]`, use `sorted()` with a lambda to sort by age. Print the sorted list.",
      "starterCode": "people = [{'name': 'Charlie', 'age': 30}, {'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 35}]\n# Sort by age using a lambda key\n",
      "solutionCode": "people = [{'name': 'Charlie', 'age': 30}, {'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 35}]\nsorted_people = sorted(people, key=lambda p: p['age'])\nprint(sorted_people)",
      "testCases": [{ "input": "", "expectedOutput": "[{'name': 'Alice', 'age': 25}, {'name': 'Charlie', 'age': 30}, {'name': 'Bob', 'age': 35}]\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Case-Insensitive Sort",
      "prompt": "Given `words = ['banana', 'Apple', 'cherry', 'Date', 'elderberry']`, use `sorted()` with a key function to sort alphabetically ignoring case. Print the result.",
      "starterCode": "words = ['banana', 'Apple', 'cherry', 'Date', 'elderberry']\n# Sort case-insensitively\n",
      "solutionCode": "words = ['banana', 'Apple', 'cherry', 'Date', 'elderberry']\nsorted_words = sorted(words, key=str.lower)\nprint(sorted_words)",
      "testCases": [{ "input": "", "expectedOutput": "['Apple', 'banana', 'cherry', 'Date', 'elderberry']\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Sort by Multiple Criteria",
      "prompt": "Given a list of students with name and score, sort by score descending, then by name ascending for ties. Print the sorted list.\n\nstudents = [('Alice', 85), ('Bob', 92), ('Charlie', 85), ('Diana', 92)]",
      "starterCode": "students = [('Alice', 85), ('Bob', 92), ('Charlie', 85), ('Diana', 92)]\n# Sort by score descending, then name ascending\n",
      "solutionCode": "students = [('Alice', 85), ('Bob', 92), ('Charlie', 85), ('Diana', 92)]\nsorted_students = sorted(students, key=lambda s: (-s[1], s[0]))\nprint(sorted_students)",
      "testCases": [{ "input": "", "expectedOutput": "[('Bob', 92), ('Diana', 92), ('Alice', 85), ('Charlie', 85)]\n" }],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Module Integration: Sort Files",
      "prompt": "Read N filenames from input (N given first). Sort them first by extension alphabetically, then by filename alphabetically. Print each filename on its own line. (Input: 3, report.pdf, data.csv, notes.txt → Output: data.csv, report.pdf, notes.txt)",
      "starterCode": "# Read N filenames and sort by extension then name\n",
      "solutionCode": "n = int(input())\nfiles = [input() for _ in range(n)]\nsorted_files = sorted(files, key=lambda f: (f.split('.')[-1], f))\nfor f in sorted_files:\n    print(f)",
      "testCases": [
        { "input": "3\nreport.pdf\ndata.csv\nnotes.txt\n", "expectedOutput": "data.csv\nreport.pdf\nnotes.txt\n" }
      ],
      "difficulty": "expert",
      "xpReward": 60
    }
  ,
    {
      "title": "Sort by Length",
      "prompt": "Print sorted(['pear', 'fig', 'banana'], key=len) — shortest word first.",
      "starterCode": "# sorted with key=len\n",
      "solutionCode": "print(sorted(['pear', 'fig', 'banana'], key=len))",
      "testCases": [{ "input": "", "expectedOutput": "['fig', 'pear', 'banana']\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "any-all-functions": [
    {
      "title": "Check Any Positive",
      "prompt": "Given `numbers = [-3, -1, 0, 5, -2]`, use `any()` to check if any number is positive. Print the boolean result.",
      "starterCode": "numbers = [-3, -1, 0, 5, -2]\n# Check if any number is positive\n",
      "solutionCode": "numbers = [-3, -1, 0, 5, -2]\nresult = any(n > 0 for n in numbers)\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "True\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Check All Even",
      "prompt": "Given `numbers = [2, 4, 6, 8, 10]`, use `all()` to check if all numbers are even. Print the boolean result.",
      "starterCode": "numbers = [2, 4, 6, 8, 10]\n# Check if all numbers are even\n",
      "solutionCode": "numbers = [2, 4, 6, 8, 10]\nresult = all(n % 2 == 0 for n in numbers)\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "True\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Password Validation",
      "prompt": "Read a password from input. Use `any()` to check if it contains at least one uppercase letter, one digit, and one special character (from '!@#$%^&*'). Print 'True' if all conditions are met, 'False' otherwise. (Input: 'Secure1!' → Output: True)",
      "starterCode": "# Read password and validate using any()\n",
      "solutionCode": "password = input()\nhas_upper = any(c.isupper() for c in password)\nhas_digit = any(c.isdigit() for c in password)\nhas_special = any(c in '!@#$%^&*' for c in password)\nprint(has_upper and has_digit and has_special)",
      "testCases": [
        { "input": "Secure1!\n", "expectedOutput": "True\n" }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Module Integration: Data Validator",
      "prompt": "Read N email addresses from input (N given first, one per line). Use `all()` to check if ALL emails are valid (contain '@' and '.'). Print 'All valid' or 'Some invalid'. Also use `any()` to check if any email is from 'gmail.com'. Print 'Has Gmail' or 'No Gmail'. (Input: 3, alice@gmail.com, bob@yahoo.com, charlie@@invalid → Output: Some invalid, Has Gmail)",
      "starterCode": "# Read N emails and validate using all() and any()\n",
      "solutionCode": "n = int(input())\nemails = [input() for _ in range(n)]\nall_valid = all('@' in e and '.' in e and e.count('@') == 1 for e in emails)\nhas_gmail = any(e.endswith('@gmail.com') for e in emails)\nprint('All valid' if all_valid else 'Some invalid')\nprint('Has Gmail' if has_gmail else 'No Gmail')",
      "testCases": [
        { "input": "3\nalice@gmail.com\nbob@yahoo.com\ncharlie@gmail.com\n", "expectedOutput": "All valid\nHas Gmail\n" }
      ],
      "difficulty": "expert",
      "xpReward": 60
    }
  ,
    {
      "title": "Any and All",
      "prompt": "Given nums = [3, -1, 4]: on the first line print whether ANY number is negative; on the second line print whether ALL numbers are positive.",
      "starterCode": "# any() and all()\n",
      "solutionCode": "nums = [3, -1, 4]\nprint(any(n < 0 for n in nums))\nprint(all(n > 0 for n in nums))",
      "testCases": [{ "input": "", "expectedOutput": "True\nFalse\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "combining-lambda-map-filter-reduce": [
    {
      "title": "Filter then Map",
      "prompt": "Given `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, use `filter()` to keep even numbers, then `map()` to square them. Print the result as a list.",
      "starterCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Filter evens, then square them\n",
      "solutionCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nresult = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "[4, 16, 36, 64, 100]\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Sum of Squares of Odds",
      "prompt": "Given `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, use `filter()` to keep odd numbers, `map()` to square them, and `reduce()` to sum the squares. Print the result.",
      "starterCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Filter odds, square them, then sum with reduce()\n",
      "solutionCode": "from functools import reduce\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nresult = reduce(lambda acc, x: acc + x, map(lambda x: x ** 2, filter(lambda x: x % 2 != 0, numbers)))\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "165\n" }],
      "difficulty": "advanced",
      "xpReward": 45
    },
    {
      "title": "Pipeline: Average of Passing Scores",
      "prompt": "Read N scores from input (N given first). Use `filter()` to keep passing scores (>= 60), then calculate and print their average rounded to 2 decimal places. If no passing scores, print 'No passing scores'. (Input: 5, 45, 78, 92, 55, 88 → Output: 86.00)",
      "starterCode": "# Read scores, filter passing, calculate average\n",
      "solutionCode": "n = int(input())\nscores = [int(input()) for _ in range(n)]\npassing = list(filter(lambda s: s >= 60, scores))\nif passing:\n    average = sum(passing) / len(passing)\n    print(f'{average:.2f}')\nelse:\n    print('No passing scores')",
      "testCases": [
        { "input": "5\n45\n78\n92\n55\n88\n", "expectedOutput": "86.00\n" }
      ],
      "difficulty": "advanced",
      "xpReward": 50
    },
    {
      "title": "Module Integration: Sales Report",
      "prompt": "Given sales data as a list of dictionaries, calculate the total revenue from items priced over $50. Use `filter()` to select qualifying items, `map()` to compute revenue (price * quantity), and `reduce()` to sum. Print the total.\n\nsales = [\n    {'item': 'Laptop', 'price': 999, 'qty': 2},\n    {'item': 'Mouse', 'price': 25, 'qty': 10},\n    {'item': 'Monitor', 'price': 349, 'qty': 3},\n    {'item': 'Cable', 'price': 10, 'qty': 50},\n]",
      "starterCode": "from functools import reduce\nsales = [\n    {'item': 'Laptop', 'price': 999, 'qty': 2},\n    {'item': 'Mouse', 'price': 25, 'qty': 10},\n    {'item': 'Monitor', 'price': 349, 'qty': 3},\n    {'item': 'Cable', 'price': 10, 'qty': 50},\n]\n# Calculate total revenue for items over $50\n",
      "solutionCode": "from functools import reduce\nsales = [\n    {'item': 'Laptop', 'price': 999, 'qty': 2},\n    {'item': 'Mouse', 'price': 25, 'qty': 10},\n    {'item': 'Monitor', 'price': 349, 'qty': 3},\n    {'item': 'Cable', 'price': 10, 'qty': 50},\n]\nexpensive = filter(lambda s: s['price'] > 50, sales)\nrevenues = map(lambda s: s['price'] * s['qty'], expensive)\ntotal = reduce(lambda acc, x: acc + x, revenues, 0)\nprint(f'Total revenue: ${total}')",
      "testCases": [{ "input": "", "expectedOutput": "Total revenue: $3045\n" }],
      "difficulty": "expert",
      "xpReward": 75
    }
  ]
};
