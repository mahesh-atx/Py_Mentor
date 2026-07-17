export const exercises: Record<string, any[]> = {
  "what-are-modules": [
    {
      "title": "Import and Use a Module",
      "prompt": "Import the `math` module and use it to print the value of pi and the square root of 144.",
      "starterCode": "# Import math module and use it\n",
      "solutionCode": "import math\nprint(math.pi)\nprint(math.sqrt(144))",
      "testCases": [{ "input": "", "expectedOutput": "3.141592653589793\n12.0\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Import Specific Names",
      "prompt": "Use `from math import` to import only `pi` and `sqrt`. Print pi and sqrt(25) without the module prefix.",
      "starterCode": "# Import specific names from math\n",
      "solutionCode": "from math import pi, sqrt\nprint(pi)\nprint(sqrt(25))",
      "testCases": [{ "input": "", "expectedOutput": "3.141592653589793\n5.0\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module with Random",
      "prompt": "Import the `random` module and use it to print a random integer between 1 and 10 (inclusive).",
      "starterCode": "# Use random module\n",
      "solutionCode": "import random\nprint(random.randint(1, 10))",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module Integration: Date Info",
      "prompt": "Import the `datetime` module and print today's date in the format 'YYYY-MM-DD' using strftime.",
      "starterCode": "# Use datetime module to format today's date\n",
      "solutionCode": "from datetime import datetime\ntoday = datetime.now()\nprint(today.strftime('%Y-%m-%d'))",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "expert",
      "xpReward": 50
    }
  ],
  "import-statements": [
    {
      "title": "Basic Import",
      "prompt": "Import the `os` module and print the current working directory using `os.getcwd()`.",
      "starterCode": "# Import os and print current directory\n",
      "solutionCode": "import os\nprint(os.getcwd())",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "from...import",
      "prompt": "Use `from os.path import join` to import the `join` function. Use it to create a path 'folder/subfolder/file.txt' and print it.",
      "starterCode": "# Import join from os.path\n",
      "solutionCode": "from os.path import join\npath = join('folder', 'subfolder', 'file.txt')\nprint(path)",
      "testCases": [{ "input": "", "expectedOutput": "folder/subfolder/file.txt\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "import...as Alias",
      "prompt": "Import the `datetime` module with the alias `dt` and use it to print the current year.",
      "starterCode": "# Import datetime with alias\n",
      "solutionCode": "import datetime as dt\nprint(dt.datetime.now().year)",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "from...import...as",
      "prompt": "Use `from math import factorial as fact` and print `fact(6)` (6 factorial).",
      "starterCode": "# Import factorial with alias\n",
      "solutionCode": "from math import factorial as fact\nprint(fact(6))",
      "testCases": [{ "input": "", "expectedOutput": "720\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Multiple Imports",
      "prompt": "Import `sqrt` from `math` and `choice` from `random`. Use them to: (1) print sqrt(81), and (2) randomly choose and print one item from the list ['apple', 'banana', 'cherry'].",
      "starterCode": "# Import sqrt and choice, then use them\n",
      "solutionCode": "from math import sqrt\nfrom random import choice\nprint(sqrt(81))\nprint(choice(['apple', 'banana', 'cherry']))",
      "testCases": [{ "input": "", "expectedOutput": "9.0\nIGNORE_OUTPUT_CHECK\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ],
  "creating-your-own-modules": [
    {
      "title": "Create a Simple Module",
      "prompt": "In the starter code, a module `calculator.py` is provided. Import it and use its `add` and `multiply` functions. Print `add(5, 3)` and `multiply(4, 7)`.",
      "starterCode": "# calculator.py is provided with:\n# def add(a, b): return a + b\n# def multiply(a, b): return a * b\n# Import and use the calculator module\n",
      "solutionCode": "import calculator\nprint(calculator.add(5, 3))\nprint(calculator.multiply(4, 7))",
      "testCases": [{ "input": "", "expectedOutput": "8\n28\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Import from Custom Module",
      "prompt": "A module `greetings.py` contains a function `hello(name)`. Import this function directly and print `hello('World')`.",
      "starterCode": "# greetings.py contains: def hello(name): return f'Hello, {name}!'\n# Import and use the hello function\n",
      "solutionCode": "from greetings import hello\nprint(hello('World'))",
      "testCases": [{ "input": "", "expectedOutput": "Hello, World!\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module with Constants",
      "prompt": "A module `config.py` defines `MAX_USERS = 100` and `APP_NAME = 'MyApp'`. Import the module and print both constants.",
      "starterCode": "# config.py contains MAX_USERS and APP_NAME\n# Import config and print constants\n",
      "solutionCode": "import config\nprint(config.MAX_USERS)\nprint(config.APP_NAME)",
      "testCases": [{ "input": "", "expectedOutput": "100\nMyApp\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: String Utils",
      "prompt": "A module `string_utils.py` contains `reverse(s)` and `count_vowels(s)`. Import both functions. Print `reverse('Python')` and `count_vowels('Hello World')`.",
      "starterCode": "# string_utils.py contains reverse() and count_vowels()\n# Import and use both functions\n",
      "solutionCode": "from string_utils import reverse, count_vowels\nprint(reverse('Python'))\nprint(count_vowels('Hello World'))",
      "testCases": [{ "input": "", "expectedOutput": "nohtyP\n3\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ],
  "name-main": [
    {
      "title": "Check __name__",
      "prompt": "Print the value of `__name__` to see what it equals when running this script directly.",
      "starterCode": "# Print the __name__ variable\n",
      "solutionCode": "print(__name__)",
      "testCases": [{ "input": "", "expectedOutput": "__main__\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Basic Main Guard",
      "prompt": "Write a function `greet()` that returns 'Hello!'. Use the `if __name__ == \"__main__\"` guard to call `greet()` and print the result only when run directly.",
      "starterCode": "# Define greet() and use the main guard\n",
      "solutionCode": "def greet():\n    return 'Hello!'\n\nif __name__ == \"__main__\":\n    print(greet())",
      "testCases": [{ "input": "", "expectedOutput": "Hello!\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Main Guard with Demo",
      "prompt": "Create a function `double(n)` that returns n * 2. Add a main guard that prints double(5) and double(10) only when the script is run directly.",
      "starterCode": "# Create double() and add demo in main guard\n",
      "solutionCode": "def double(n):\n    return n * 2\n\nif __name__ == \"__main__\":\n    print(double(5))\n    print(double(10))",
      "testCases": [{ "input": "", "expectedOutput": "10\n20\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Calculator with Tests",
      "prompt": "Create functions `add(a, b)` and `subtract(a, b)`. In the main guard, run test assertions: assert add(2, 3) == 5 and assert subtract(10, 4) == 6. Print 'All tests passed!' if assertions succeed.",
      "starterCode": "# Create add() and subtract(), add tests in main guard\n",
      "solutionCode": "def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\nif __name__ == \"__main__\":\n    assert add(2, 3) == 5\n    assert subtract(10, 4) == 6\n    print('All tests passed!')",
      "testCases": [{ "input": "", "expectedOutput": "All tests passed!\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ],
  "standard-library-overview": [
    {
      "title": "Math Module Basics",
      "prompt": "Import the `math` module and print: math.ceil(4.2), math.floor(4.8), and math.factorial(5).",
      "starterCode": "# Use math module functions\n",
      "solutionCode": "import math\nprint(math.ceil(4.2))\nprint(math.floor(4.8))\nprint(math.factorial(5))",
      "testCases": [{ "input": "", "expectedOutput": "5\n4\n120\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Random Module",
      "prompt": "Import the `random` module. Use `random.choice()` to pick and print a random element from the list [1, 2, 3, 4, 5].",
      "starterCode": "# Use random.choice()\n",
      "solutionCode": "import random\nprint(random.choice([1, 2, 3, 4, 5]))",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Datetime Module",
      "prompt": "Import `datetime` from the `datetime` module. Print the current date and time using `datetime.now()`.",
      "starterCode": "# Use datetime module\n",
      "solutionCode": "from datetime import datetime\nprint(datetime.now())",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "OS Module",
      "prompt": "Import the `os` module and print the list of files in the current directory using `os.listdir('.')`.",
      "starterCode": "# Use os module\n",
      "solutionCode": "import os\nprint(os.listdir('.'))",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Collections Counter",
      "prompt": "Import `Counter` from `collections`. Use it to count occurrences of each element in the list ['a', 'b', 'a', 'c', 'b', 'a']. Print the Counter object.",
      "starterCode": "# Use Counter from collections\n",
      "solutionCode": "from collections import Counter\ncounts = Counter(['a', 'b', 'a', 'c', 'b', 'a'])\nprint(counts)",
      "testCases": [{ "input": "", "expectedOutput": "Counter({'a': 3, 'b': 2, 'c': 1})\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Regex Module",
      "prompt": "Import the `re` module. Use `re.findall()` to find all digits in the string 'abc123def456'. Print the result as a list.",
      "starterCode": "# Use re module to find digits\n",
      "solutionCode": "import re\nresult = re.findall(r'\\d+', 'abc123def456')\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "['123', '456']\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Data Analysis",
      "prompt": "Use `Counter` from collections to find the 2 most common words in the text: 'the cat sat on the mat the cat'. Print the result of `most_common(2)`.",
      "starterCode": "# Use Counter.most_common()\n",
      "solutionCode": "from collections import Counter\ntext = 'the cat sat on the mat the cat'.split()\ncounts = Counter(text)\nprint(counts.most_common(2))",
      "testCases": [{ "input": "", "expectedOutput": "[('the', 3), ('cat', 2)]\n" }],
      "difficulty": "expert",
      "xpReward": 60
    }
  ],
  "packages-init-py": [
    {
      "title": "Import from Package",
      "prompt": "A package `shapes` contains a module `circle` with class `Circle`. Import `Circle` from `shapes.circle` and create a Circle with radius 5. Print its area (use 3.14159 * r ** 2).",
      "starterCode": "# shapes/circle.py contains the Circle class\n# Import and use it\n",
      "solutionCode": "from shapes.circle import Circle\nc = Circle(5)\nprint(c.area())",
      "testCases": [{ "input": "", "expectedOutput": "78.53975\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Package with Multiple Modules",
      "prompt": "A package `utils` has modules `string_utils` (with `reverse(s)`) and `number_utils` (with `is_prime(n)`). Import both and print `reverse('hello')` and `is_prime(17)`.",
      "starterCode": "# utils package has string_utils and number_utils\n# Import and use both\n",
      "solutionCode": "from utils.string_utils import reverse\nfrom utils.number_utils import is_prime\nprint(reverse('hello'))\nprint(is_prime(17))",
      "testCases": [{ "input": "", "expectedOutput": "olleh\nTrue\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Math Package",
      "prompt": "A package `math_tools` has modules `basic` (with `add(a, b)`, `multiply(a, b)`) and `advanced` (with `power(base, exp)`). Import all three functions and print: add(3, 4), multiply(5, 6), power(2, 10).",
      "starterCode": "# math_tools package has basic and advanced modules\n# Import and use all functions\n",
      "solutionCode": "from math_tools.basic import add, multiply\nfrom math_tools.advanced import power\nprint(add(3, 4))\nprint(multiply(5, 6))\nprint(power(2, 10))",
      "testCases": [{ "input": "", "expectedOutput": "7\n30\n1024\n" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ],
  "installing-third-party-packages": [
    {
      "title": "Check pip Version",
      "prompt": "Write a command (as a comment) to check your pip version. Then import `importlib.metadata` and print the version of the `requests` package (or any installed package).",
      "starterCode": "# Check pip version and print a package version\n",
      "solutionCode": "# pip --version\nimport importlib.metadata\ntry:\n    version = importlib.metadata.version('pip')\n    print(f'pip version: {version}')\nexcept:\n    print('Could not determine version')",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "List Installed Packages",
      "prompt": "Use `importlib.metadata.distributions()` to print the names of all installed packages (just the first 5). Print each name on a separate line.",
      "starterCode": "# List installed packages using importlib.metadata\n",
      "solutionCode": "import importlib.metadata\ndists = list(importlib.metadata.distributions())\nfor dist in dists[:5]:\n    print(dist.metadata['Name'])",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Package Info",
      "prompt": "Use `importlib.metadata` to check if 'os' and 'sys' are available (they're built-in). Print 'os available: True' and 'sys available: True'. Then print the Python version using `sys.version`.",
      "starterCode": "# Check module availability and print Python version\n",
      "solutionCode": "import sys\nimport os\nprint(f'os available: {True}')\nprint(f'sys available: {True}')\nprint(f'Python version: {sys.version.split()[0]}')",
      "testCases": [{ "input": "", "expectedOutput": "os available: True\nsys available: True\nPython version: IGNORE_OUTPUT_CHECK\n" }],
      "difficulty": "expert",
      "xpReward": 50
    }
  ],
  "virtual-environments": [
    {
      "title": "Check Virtual Environment",
      "prompt": "Import `sys` and print `sys.prefix` to see the Python installation prefix. This helps identify if you're in a virtual environment.",
      "starterCode": "# Check if in a virtual environment\n",
      "solutionCode": "import sys\nprint(sys.prefix)",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Detect Virtual Environment",
      "prompt": "Use `sys.prefix` and `sys.base_prefix` to detect if running in a virtual environment. Print 'In venv: True' if they differ, 'In venv: False' if they're the same.",
      "starterCode": "# Detect virtual environment\n",
      "solutionCode": "import sys\nin_venv = sys.prefix != sys.base_prefix\nprint(f'In venv: {in_venv}')",
      "testCases": [{ "input": "", "expectedOutput": "In venv: False\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Environment Report",
      "prompt": "Create a script that prints: (1) Python version, (2) Python executable path, (3) whether in a virtual environment, (4) the platform. Use `sys` module for all of these.",
      "starterCode": "# Create an environment report using sys module\n",
      "solutionCode": "import sys\nprint(f'Python version: {sys.version.split()[0]}')\nprint(f'Executable: {sys.executable}')\nprint(f'In venv: {sys.prefix != sys.base_prefix}')\nprint(f'Platform: {sys.platform}')",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ],
  "requirements-txt": [
    {
      "title": "Parse Requirements File",
      "prompt": "Given a string `requirements = 'requests==2.31.0\\nflask==3.0.0\\nnumpy==1.24.3'`, parse it and print each package and version on separate lines in the format 'Package: X, Version: Y'.",
      "starterCode": "requirements = 'requests==2.31.0\\nflask==3.0.0\\nnumpy==1.24.3'\n# Parse and print each requirement\n",
      "solutionCode": "requirements = 'requests==2.31.0\\nflask==3.0.0\\nnumpy==1.24.3'\nfor line in requirements.strip().split('\\n'):\n    if '==' in line:\n        pkg, ver = line.split('==')\n        print(f'Package: {pkg}, Version: {ver}')",
      "testCases": [{ "input": "", "expectedOutput": "Package: requests, Version: 2.31.0\nPackage: flask, Version: 3.0.0\nPackage: numpy, Version: 1.24.3\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Filter Requirements by Version",
      "prompt": "Given `requirements = 'requests>=2.28.0\\nflask==3.0.0\\nnumpy>=1.20.0\\npandas<2.0.0'`, parse and print only the packages with exact versions (using ==).",
      "starterCode": "requirements = 'requests>=2.28.0\\nflask==3.0.0\\nnumpy>=1.20.0\\npandas<2.0.0'\n# Filter for exact versions only\n",
      "solutionCode": "requirements = 'requests>=2.28.0\\nflask==3.0.0\\nnumpy>=1.20.0\\npandas<2.0.0'\nfor line in requirements.strip().split('\\n'):\n    if '==' in line:\n        print(line)",
      "testCases": [{ "input": "", "expectedOutput": "flask==3.0.0\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Requirements Analyzer",
      "prompt": "Read N requirements from input (N given first, each line is a package spec like 'pkg==1.0.0'). Parse them and print: (1) total packages, (2) packages with exact versions, (3) packages with version ranges. (Input: 3, requests==2.31.0, flask>=2.0.0, numpy → Output: Total: 3, Exact: 1, Ranges: 1)",
      "starterCode": "# Read and analyze requirements\n",
      "solutionCode": "n = int(input())\nreqs = [input().strip() for _ in range(n)]\ntotal = len(reqs)\nexact = sum(1 for r in reqs if '==' in r)\nranges = sum(1 for r in reqs if any(op in r for op in ['>=', '<=', '!=', '~=']) and '==' not in r)\nprint(f'Total: {total}')\nprint(f'Exact: {exact}')\nprint(f'Ranges: {ranges}')",
      "testCases": [
        { "input": "3\nrequests==2.31.0\nflask>=2.0.0\nnumpy\n", "expectedOutput": "Total: 3\nExact: 1\nRanges: 1\n" },
        { "input": "2\npandas==2.0.3\nscipy>=1.0.0\n", "expectedOutput": "Total: 2\nExact: 1\nRanges: 1\n" }
      ],
      "difficulty": "expert",
      "xpReward": 60
    }
  ]
};
