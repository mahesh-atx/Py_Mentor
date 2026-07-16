export const exercises: Record<string, any[]> = {
  "creating-dictionaries": [
    {
      "title": "Create a Dictionary",
      "prompt": "Create a dictionary called `person` with keys `name` (value: `'Alice'`), `age` (value: `30`), and `city` (value: `'London'`). Print the dictionary and its length.",
      "starterCode": "# Create the person dictionary and print it and its length\n",
      "solutionCode": "person = {'name': 'Alice', 'age': 30, 'city': 'London'}\nprint(person)\nprint(len(person))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'name': 'Alice', 'age': 30, 'city': 'London'}\n3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Dict from Two Lists",
      "prompt": "Read N key-value pairs from input (N given first). Each pair is on one line as `key value` (space-separated). Build a dictionary and print it. If N is 0, print `Empty dictionary`.",
      "starterCode": "# Read N key-value pairs and build a dictionary\n",
      "solutionCode": "n = int(input())\nif n == 0:\n    print('Empty dictionary')\nelse:\n    d = {}\n    for _ in range(n):\n        parts = input().split()\n        key = parts[0]\n        value = parts[1]\n        d[key] = value\n    print(d)",
      "testCases": [
        {
          "input": "3\nname Alice\nage 25\ncity London\n",
          "expectedOutput": "{'name': 'Alice', 'age': '25', 'city': 'London'}\n"
        },
        {
          "input": "0\n",
          "expectedOutput": "Empty dictionary\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Word Frequency Builder",
      "prompt": "Read a sentence from input. Build a word frequency dictionary (case-insensitive) and print words with their counts sorted alphabetically. Then print the most frequent word. If the sentence is empty, print `No words`.",
      "starterCode": "# Read a sentence and build a word frequency dictionary\n",
      "solutionCode": "sentence = input().lower().strip()\nif not sentence:\n    print('No words')\nelse:\n    words = sentence.split()\n    freq = {}\n    for word in words:\n        freq[word] = freq.get(word, 0) + 1\n    for word in sorted(freq):\n        print(f'{word}: {freq[word]}')\n    most_common = max(freq, key=freq.get)\n    print(f'Most frequent: {most_common}')",
      "testCases": [
        {
          "input": "the cat sat on the mat the cat\n",
          "expectedOutput": "cat: 2\nmat: 1\non: 1\nsat: 1\nthe: 3\nMost frequent: the\n"
        },
        {
          "input": "\n",
          "expectedOutput": "No words\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Student Registry",
      "prompt": "Read N students (N given first). Each line: `id name score` (space separated). Build a dictionary with `id` as the key and `{name, score}` as the value. Then read a student ID and print their details formatted as `Name: X, Score: X`, or `Student not found` if the ID doesn't exist. If any score is outside 0-100, print `Invalid score`.",
      "starterCode": "# Build student registry and look up a student by ID\n",
      "solutionCode": "n = int(input())\nregistry = {}\nvalid = True\nfor _ in range(n):\n    parts = input().split()\n    sid, name, score = parts[0], parts[1], int(parts[2])\n    if score < 0 or score > 100:\n        print('Invalid score')\n        valid = False\n        break\n    registry[sid] = {'name': name, 'score': score}\nif valid:\n    lookup = input()\n    if lookup in registry:\n        s = registry[lookup]\n        print(f\"Name: {s['name']}, Score: {s['score']}\")\n    else:\n        print('Student not found')",
      "testCases": [
        {
          "input": "3\nS001 Alice 88\nS002 Bob 72\nS003 Charlie 95\nS002\n",
          "expectedOutput": "Name: Bob, Score: 72\n"
        },
        {
          "input": "1\nS001 Alice 88\nS999\n",
          "expectedOutput": "Student not found\n"
        },
        {
          "input": "1\nS001 Alice 150\n",
          "expectedOutput": "Invalid score\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Empty Dictionary",
      "prompt": "Create an empty dictionary called `my_dict` and print it.",
      "starterCode": "# Create an empty dictionary and print it\n",
      "solutionCode": "my_dict = {}\nprint(my_dict)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 10
    },
    {
      "title": "Basic Dictionary",
      "prompt": "Create a dictionary `user` with keys 'name' mapping to 'Alice' and 'age' mapping to 25. Print `user`.",
      "starterCode": "# Create user dictionary and print\n",
      "solutionCode": "user = {'name': 'Alice', 'age': 25}\nprint(user)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'name': 'Alice', 'age': 25}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "dictionary-access-modify": [
    {
      "title": "Access Dictionary Values",
      "prompt": "Given `capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia'}`, print the capital of Japan and then the capital of Brazil.",
      "starterCode": "capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia'}\n# Print capital of Japan then Brazil\n",
      "solutionCode": "capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia'}\nprint(capitals['Japan'])\nprint(capitals['Brazil'])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Tokyo\nBrasilia\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Safe Lookup with get()",
      "prompt": "Read a country name from input. Using `get()` with a default, look it up in `capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia', 'Germany': 'Berlin'}`. Print the capital or `Capital not found` if the country is not in the dictionary.",
      "starterCode": "capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia', 'Germany': 'Berlin'}\n# Read country and print capital using get()\n",
      "solutionCode": "capitals = {'France': 'Paris', 'Japan': 'Tokyo', 'Brazil': 'Brasilia', 'Germany': 'Berlin'}\ncountry = input().strip()\nprint(capitals.get(country, 'Capital not found'))",
      "testCases": [
        {
          "input": "France\n",
          "expectedOutput": "Paris\n"
        },
        {
          "input": "Australia\n",
          "expectedOutput": "Capital not found\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "CRUD Operations",
      "prompt": "Start with an empty dictionary. Read commands until `quit`:\n- `add KEY VALUE` → add or update key with value, print `Added: KEY = VALUE`\n- `get KEY` → print value or `Not found`\n- `delete KEY` → remove and print `Deleted: KEY` or `Key not found`\n- `show` → print the dictionary\n- `quit` → stop",
      "starterCode": "# Implement CRUD operations on a dictionary\n",
      "solutionCode": "d = {}\nwhile True:\n    line = input().strip()\n    if line == 'quit':\n        break\n    elif line == 'show':\n        print(d)\n    elif line.startswith('add '):\n        parts = line.split(' ', 2)\n        key, value = parts[1], parts[2]\n        d[key] = value\n        print(f'Added: {key} = {value}')\n    elif line.startswith('get '):\n        key = line.split(' ', 1)[1]\n        print(d.get(key, 'Not found'))\n    elif line.startswith('delete '):\n        key = line.split(' ', 1)[1]\n        if key in d:\n            del d[key]\n            print(f'Deleted: {key}')\n        else:\n            print('Key not found')",
      "testCases": [
        {
          "input": "add name Alice\nadd age 25\nget name\nget email\ndelete age\nshow\nquit\n",
          "expectedOutput": "Added: name = Alice\nAdded: age = 25\nAlice\nNot found\nDeleted: age\n{'name': 'Alice'}\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Access by Key",
      "prompt": "Given `user = {'name': 'Bob', 'role': 'admin'}`. Print the value of the 'role' key.",
      "starterCode": "user = {'name': 'Bob', 'role': 'admin'}\n# Print the role\n",
      "solutionCode": "user = {'name': 'Bob', 'role': 'admin'}\nprint(user['role'])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "admin\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Safe Access with .get()",
      "prompt": "Given `user = {'name': 'Bob'}`. Use `.get('role', 'guest')` to safely try to access the role. Print the result.",
      "starterCode": "user = {'name': 'Bob'}\n# Use .get() and print\n",
      "solutionCode": "user = {'name': 'Bob'}\nprint(user.get('role', 'guest'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "guest\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Modify and Add",
      "prompt": "Given `user = {'name': 'Bob'}`. Add a new key 'age' with value 30, and change 'name' to 'Robert'. Print the dictionary.",
      "starterCode": "user = {'name': 'Bob'}\n# Add age, change name, print\n",
      "solutionCode": "user = {'name': 'Bob'}\nuser['age'] = 30\nuser['name'] = 'Robert'\nprint(user)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'name': 'Robert', 'age': 30}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Remove a Key",
      "prompt": "Given `user = {'name': 'Bob', 'age': 30}`. Use `del` or `.pop()` to remove the 'age' key. Print the dictionary.",
      "starterCode": "user = {'name': 'Bob', 'age': 30}\n# Remove age and print\n",
      "solutionCode": "user = {'name': 'Bob', 'age': 30}\ndel user['age']\nprint(user)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'name': 'Bob'}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "dictionary-methods": [
    {
      "title": "Keys, Values, Items",
      "prompt": "Given `scores = {'Alice': 88, 'Bob': 72, 'Charlie': 95}`, print:\n1. All keys as a sorted list\n2. All values as a sorted list\n3. The sum of all values",
      "starterCode": "scores = {'Alice': 88, 'Bob': 72, 'Charlie': 95}\n# Print sorted keys, sorted values, and sum of values\n",
      "solutionCode": "scores = {'Alice': 88, 'Bob': 72, 'Charlie': 95}\nprint(sorted(scores.keys()))\nprint(sorted(scores.values()))\nprint(sum(scores.values()))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['Alice', 'Bob', 'Charlie']\n[72, 88, 95]\n255\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "setdefault Grouper",
      "prompt": "Read N items from input (N given first). Each line: `category item`. Use `setdefault()` to group items by category. Print each category and its items sorted, one category per line in alphabetical order.\n\n(Input: 4 items → grouped output)",
      "starterCode": "# Read category-item pairs and group using setdefault\n",
      "solutionCode": "n = int(input())\ngroups = {}\nfor _ in range(n):\n    parts = input().split(' ', 1)\n    category, item = parts[0], parts[1]\n    groups.setdefault(category, []).append(item)\nfor category in sorted(groups):\n    print(f'{category}: {sorted(groups[category])}')",
      "testCases": [
        {
          "input": "5\nFruit apple\nVeg carrot\nFruit banana\nVeg broccoli\nFruit cherry\n",
          "expectedOutput": "Fruit: ['apple', 'banana', 'cherry']\nVeg: ['broccoli', 'carrot']\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Config Merger",
      "prompt": "Read a base config (N key-value pairs, N given first) and user overrides (M key-value pairs, M given next). Use `copy()` and `update()` to merge without changing the base. Print the merged config (sorted by key) and list which keys were overridden.\n\nIf M is 0, print `No overrides` instead of the override list.",
      "starterCode": "# Read base config and overrides, merge and print\n",
      "solutionCode": "n = int(input())\nbase = {}\nfor _ in range(n):\n    k, v = input().split(' ', 1)\n    base[k] = v\nm = int(input())\noverrides = {}\nfor _ in range(m):\n    k, v = input().split(' ', 1)\n    overrides[k] = v\nmerged = base.copy()\nmerged.update(overrides)\nfor k in sorted(merged):\n    print(f'{k}: {merged[k]}')\nif m == 0:\n    print('No overrides')\nelse:\n    overridden = [k for k in overrides if k in base]\n    print(f'Overridden keys: {sorted(overridden)}')",
      "testCases": [
        {
          "input": "3\ntheme light\nlang en\nsize 12\n2\ntheme dark\nsize 16\n",
          "expectedOutput": "lang: en\nsize: 16\ntheme: dark\nOverridden keys: ['size', 'theme']\n"
        },
        {
          "input": "2\ntheme light\nlang en\n0\n",
          "expectedOutput": "lang: en\ntheme: light\nNo overrides\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Get Keys",
      "prompt": "Given `data = {'a': 1, 'b': 2}`. Use `.keys()`, convert it to a list, and print it.",
      "starterCode": "data = {'a': 1, 'b': 2}\n# Print list of keys\n",
      "solutionCode": "data = {'a': 1, 'b': 2}\nprint(list(data.keys()))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['a', 'b']\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Get Values",
      "prompt": "Given `data = {'a': 1, 'b': 2}`. Use `.values()`, convert it to a list, and print it.",
      "starterCode": "data = {'a': 1, 'b': 2}\n# Print list of values\n",
      "solutionCode": "data = {'a': 1, 'b': 2}\nprint(list(data.values()))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Get Items",
      "prompt": "Given `data = {'a': 1}`. Use `.items()`, convert it to a list, and print it. It should be a list of tuples.",
      "starterCode": "data = {'a': 1}\n# Print list of items\n",
      "solutionCode": "data = {'a': 1}\nprint(list(data.items()))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[('a', 1)]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Update Dictionary",
      "prompt": "Given `dict1 = {'a': 1}` and `dict2 = {'b': 2, 'c': 3}`. Use `.update()` to add `dict2` to `dict1`. Print `dict1`.",
      "starterCode": "dict1 = {'a': 1}\ndict2 = {'b': 2, 'c': 3}\n# Update and print dict1\n",
      "solutionCode": "dict1 = {'a': 1}\ndict2 = {'b': 2, 'c': 3}\ndict1.update(dict2)\nprint(dict1)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'a': 1, 'b': 2, 'c': 3}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "dictionary-comprehension": [
    {
      "title": "Squares Dictionary",
      "prompt": "Using a dictionary comprehension, create a dictionary mapping numbers 1-10 to their squares. Print the dictionary.",
      "starterCode": "# Create squares dictionary using comprehension\n",
      "solutionCode": "squares = {x: x ** 2 for x in range(1, 11)}\nprint(squares)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Filter and Transform",
      "prompt": "Read N name-score pairs (N given first, each on one line as `name score`). Using a dictionary comprehension:\n1. Create a dict of only passing students (score >= 60) with their letter grades (A>=90, B>=80, C>=70, D>=60)\n2. Print the result sorted by name\n3. Print the count of passing students",
      "starterCode": "# Read N name-score pairs, filter and grade passing students\n",
      "solutionCode": "n = int(input())\nstudents = {}\nfor _ in range(n):\n    parts = input().split()\n    students[parts[0]] = int(parts[1])\npassing = {\n    name: ('A' if score >= 90 else 'B' if score >= 80 else 'C' if score >= 70 else 'D')\n    for name, score in students.items() if score >= 60\n}\nfor name in sorted(passing):\n    print(f'{name}: {passing[name]}')\nprint(f'Passing: {len(passing)}')",
      "testCases": [
        {
          "input": "5\nAlice 88\nBob 45\nCharlie 92\nDiana 67\nEve 55\n",
          "expectedOutput": "Alice: B\nCharlie: A\nDiana: D\nPassing: 3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Inverted Index",
      "prompt": "Read a sentence from input. Build an inverted index: a dictionary mapping each unique word (lowercase) to the list of positions (0-indexed) where it appears. Print each word alphabetically with its positions.\n\nIf the sentence is empty, print `Empty input`.",
      "starterCode": "# Read a sentence and build an inverted index\n",
      "solutionCode": "sentence = input().strip().lower()\nif not sentence:\n    print('Empty input')\nelse:\n    words = sentence.split()\n    index = {}\n    for i, word in enumerate(words):\n        index.setdefault(word, []).append(i)\n    for word in sorted(index):\n        print(f'{word}: {index[word]}')",
      "testCases": [
        {
          "input": "the cat sat on the mat the cat\n",
          "expectedOutput": "cat: [1, 7]\nmat: [5]\non: [3]\nsat: [2]\nthe: [0, 4, 6]\n"
        },
        {
          "input": "\n",
          "expectedOutput": "Empty input\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Price Analyzer",
      "prompt": "Read N product-price pairs (N given first, format `product price`). Using dictionary comprehensions:\n1. Apply a 15% discount to items over $50 (rounded to 2dp), keep others unchanged\n2. Invert the resulting dictionary (price -> product name), handle ties by keeping the last alphabetically\n3. Print original prices sorted by product name\n4. Print discounted prices sorted by product name\n5. Print the cheapest item after discount\n\nIf any price is negative, print `Invalid price`.",
      "starterCode": "# Read products and prices, apply discounts and analyze\n",
      "solutionCode": "n = int(input())\noriginal = {}\nvalid = True\nfor _ in range(n):\n    parts = input().split()\n    name, price = parts[0], float(parts[1])\n    if price < 0:\n        print('Invalid price')\n        valid = False\n        break\n    original[name] = price\nif valid:\n    discounted = {\n        name: round(price * 0.85, 2) if price > 50 else price\n        for name, price in original.items()\n    }\n    print('Original:')\n    for name in sorted(original):\n        print(f'  {name}: \\${original[name]:.2f}')\n    print('Discounted:')\n    for name in sorted(discounted):\n        print(f'  {name}: \\${discounted[name]:.2f}')\n    cheapest = min(discounted, key=discounted.get)\n    print(f'Cheapest after discount: {cheapest} (\\${discounted[cheapest]:.2f})')",
      "testCases": [
        {
          "input": "3\nLaptop 999.99\nMouse 29.99\nKeyboard 79.99\n",
          "expectedOutput": "Original:\n  Keyboard: $79.99\n  Laptop: $999.99\n  Mouse: $29.99\nDiscounted:\n  Keyboard: $67.99\n  Laptop: $849.99\n  Mouse: $29.99\nCheapest after discount: Mouse ($29.99)\n"
        },
        {
          "input": "1\nItem -5.00\n",
          "expectedOutput": "Invalid price\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Basic Comprehension",
      "prompt": "Use dictionary comprehension to create a dictionary mapping numbers 1 to 3 to their squares (e.g., `{1: 1, 2: 4, ...}`). Print it.",
      "starterCode": "# Create dict using comprehension and print\n",
      "solutionCode": "squares = {x: x**2 for x in range(1, 4)}\nprint(squares)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1: 1, 2: 4, 3: 9}\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Swap Keys and Values",
      "prompt": "Given `data = {'a': 1, 'b': 2}`. Use dictionary comprehension to swap the keys and values so it becomes `{1: 'a', 2: 'b'}`. Print it.",
      "starterCode": "data = {'a': 1, 'b': 2}\n# Swap keys/values and print\n",
      "solutionCode": "data = {'a': 1, 'b': 2}\nswapped = {v: k for k, v in data.items()}\nprint(swapped)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1: 'a', 2: 'b'}\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    }
  ],
  "nested-dictionaries": [
    {
      "title": "Access Nested Value",
      "prompt": "Given the nested dictionary below, print the city of Alice and the score of Bob in science.\n```python\nstudents = {\n    'Alice': {'city': 'London', 'scores': {'math': 90, 'science': 85}},\n    'Bob':   {'city': 'Paris',  'scores': {'math': 75, 'science': 80}}\n}\n```",
      "starterCode": "students = {\n    'Alice': {'city': 'London', 'scores': {'math': 90, 'science': 85}},\n    'Bob':   {'city': 'Paris',  'scores': {'math': 75, 'science': 80}}\n}\n# Print Alice's city and Bob's science score\n",
      "solutionCode": "students = {\n    'Alice': {'city': 'London', 'scores': {'math': 90, 'science': 85}},\n    'Bob':   {'city': 'Paris',  'scores': {'math': 75, 'science': 80}}\n}\nprint(students['Alice']['city'])\nprint(students['Bob']['scores']['science'])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "London\n80\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Build Nested from Records",
      "prompt": "Read N records (N given first). Each line: `name subject score`. Build a nested dictionary `{name: {subject: score}}`. Then print each student's name and average score (2dp), sorted by name. Print the overall top student.",
      "starterCode": "# Read records and build nested dictionary, print averages\n",
      "solutionCode": "n = int(input())\ngradebook = {}\nfor _ in range(n):\n    parts = input().split()\n    name, subject, score = parts[0], parts[1], int(parts[2])\n    gradebook.setdefault(name, {})[subject] = score\nfor name in sorted(gradebook):\n    scores = gradebook[name].values()\n    avg = sum(scores) / len(scores)\n    print(f'{name}: {avg:.2f}')\nbest = max(gradebook, key=lambda n: sum(gradebook[n].values()) / len(gradebook[n]))\nprint(f'Top student: {best}')",
      "testCases": [
        {
          "input": "6\nAlice math 92\nAlice science 88\nBob math 75\nBob science 82\nCharlie math 98\nCharlie science 94\n",
          "expectedOutput": "Alice: 90.00\nBob: 78.50\nCharlie: 96.00\nTop student: Charlie\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Company Org Chart",
      "prompt": "Read a company structure from input. First line: number of departments N. Each department block: department name, then number of employees M, then M employee names. Build a nested dict and print:\n1. Each department with its employee count and sorted employee list\n2. Total employees across all departments\n3. Department with most employees",
      "starterCode": "# Build org chart nested dictionary and analyze it\n",
      "solutionCode": "n = int(input())\norg = {}\nfor _ in range(n):\n    dept = input().strip()\n    m = int(input())\n    employees = [input().strip() for _ in range(m)]\n    org[dept] = {'count': m, 'employees': employees}\ntotal = 0\nfor dept in sorted(org):\n    info = org[dept]\n    total += info['count']\n    print(f\"{dept} ({info['count']}): {sorted(info['employees'])}\")\nprint(f'Total employees: {total}')\nbiggest = max(org, key=lambda d: org[d]['count'])\nprint(f'Largest department: {biggest}')",
      "testCases": [
        {
          "input": "2\nEngineering\n3\nAlice\nBob\nCharlie\nMarketing\n2\nDiana\nEve\n",
          "expectedOutput": "Engineering (3): ['Alice', 'Bob', 'Charlie']\nMarketing (2): ['Diana', 'Eve']\nTotal employees: 5\nLargest department: Engineering\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Access Nested Dictionary",
      "prompt": "Given `users = {'user1': {'name': 'Alice'}}`. Print the name 'Alice'.",
      "starterCode": "users = {'user1': {'name': 'Alice'}}\n# Access and print Alice\n",
      "solutionCode": "users = {'user1': {'name': 'Alice'}}\nprint(users['user1']['name'])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Modify Nested Dictionary",
      "prompt": "Given `users = {'user1': {'age': 20}}`. Update the age to 21 and print `users`.",
      "starterCode": "users = {'user1': {'age': 20}}\n# Update age and print users\n",
      "solutionCode": "users = {'user1': {'age': 20}}\nusers['user1']['age'] = 21\nprint(users)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{'user1': {'age': 21}}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "iterating-dictionaries": [
    {
      "title": "Print All Key-Value Pairs",
      "prompt": "Given `config = {'theme': 'dark', 'font': 'mono', 'size': '14', 'lang': 'en'}`, iterate using `.items()` and print each pair as `KEY = VALUE`, sorted alphabetically by key.",
      "starterCode": "config = {'theme': 'dark', 'font': 'mono', 'size': '14', 'lang': 'en'}\n# Print each key-value pair sorted by key\n",
      "solutionCode": "config = {'theme': 'dark', 'font': 'mono', 'size': '14', 'lang': 'en'}\nfor key, value in sorted(config.items()):\n    print(f'{key} = {value}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "font = mono\nlang = en\nsize = 14\ntheme = dark\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Score Summary",
      "prompt": "Read N name-score pairs (N given first). Iterate the dictionary to print:\n1. All entries sorted by score descending (format: `NAME: SCORE`)\n2. Average score (2dp)\n3. Names of students above the average (sorted alphabetically)\n\nIf N is 0, print `No students`.",
      "starterCode": "# Read N name-score pairs and print summary\n",
      "solutionCode": "n = int(input())\nif n == 0:\n    print('No students')\nelse:\n    scores = {}\n    for _ in range(n):\n        parts = input().split()\n        scores[parts[0]] = int(parts[1])\n    for name, score in sorted(scores.items(), key=lambda x: x[1], reverse=True):\n        print(f'{name}: {score}')\n    avg = sum(scores.values()) / len(scores)\n    print(f'Average: {avg:.2f}')\n    above = sorted(name for name, score in scores.items() if score > avg)\n    print(f'Above average: {above}')",
      "testCases": [
        {
          "input": "4\nAlice 88\nBob 72\nCharlie 95\nDiana 67\n",
          "expectedOutput": "Charlie: 95\nAlice: 88\nBob: 72\nDiana: 67\nAverage: 80.50\nAbove average: ['Alice', 'Charlie']\n"
        },
        {
          "input": "0\n",
          "expectedOutput": "No students\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Safe Inventory Update",
      "prompt": "Read an inventory dictionary (N items, format `product quantity`). Then read M update commands (format `product quantity_change`). Apply each update (add the change to existing quantity). If a product does not exist, add it. If quantity drops to 0 or below, remove it. Print the final inventory sorted by product name. Print how many items were removed.",
      "starterCode": "# Read inventory and updates, apply changes safely\n",
      "solutionCode": "n = int(input())\ninventory = {}\nfor _ in range(n):\n    parts = input().split()\n    inventory[parts[0]] = int(parts[1])\nm = int(input())\nremoved = 0\nfor _ in range(m):\n    parts = input().split()\n    product, change = parts[0], int(parts[1])\n    current = inventory.get(product, 0)\n    new_qty = current + change\n    if new_qty <= 0:\n        if product in inventory:\n            del inventory[product]\n            removed += 1\n    else:\n        inventory[product] = new_qty\nfor product in sorted(inventory):\n    print(f'{product}: {inventory[product]}')\nprint(f'Items removed: {removed}')",
      "testCases": [
        {
          "input": "3\napple 50\nbanana 30\ncherry 20\n3\napple -50\nbanana 10\ngrape 15\n",
          "expectedOutput": "banana: 40\ncherry: 20\ngrape: 15\nItems removed: 1\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Iterate Keys",
      "prompt": "Given `data = {'a': 1, 'b': 2}`. Use a `for` loop to print each key.",
      "starterCode": "data = {'a': 1, 'b': 2}\n# Loop and print keys\n",
      "solutionCode": "data = {'a': 1, 'b': 2}\nfor key in data:\n    print(key)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "a\nb\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Iterate Items",
      "prompt": "Given `data = {'a': 1, 'b': 2}`. Use a `for` loop with `.items()` to print formatted strings: 'Key: [key], Value: [value]'.",
      "starterCode": "data = {'a': 1, 'b': 2}\n# Loop items and print formatted string\n",
      "solutionCode": "data = {'a': 1, 'b': 2}\nfor k, v in data.items():\n    print(f'Key: {k}, Value: {v}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Key: a, Value: 1\nKey: b, Value: 2\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "dictionary-vs-json": [
    {
      "title": "Dict to JSON String",
      "prompt": "Given `person = {'name': 'Alice', 'age': 25, 'active': True, 'score': None}`, convert it to a JSON string using `json.dumps()` with an indent of 2 and print it.",
      "starterCode": "import json\nperson = {'name': 'Alice', 'age': 25, 'active': True, 'score': None}\n# Convert to JSON string with indent=2 and print\n",
      "solutionCode": "import json\nperson = {'name': 'Alice', 'age': 25, 'active': True, 'score': None}\nprint(json.dumps(person, indent=2))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{\n  \"name\": \"Alice\",\n  \"age\": 25,\n  \"active\": true,\n  \"score\": null\n}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "JSON Parser",
      "prompt": "Read a JSON string from input (single line). Parse it with `json.loads()`. Print:\n1. The type of the parsed result\n2. The number of keys (if it is a dict)\n3. Each key-value pair sorted alphabetically\n\nIf the JSON is invalid, print `Invalid JSON`.",
      "starterCode": "import json\n# Read a JSON string, parse it and display info\n",
      "solutionCode": "import json\nline = input()\ntry:\n    data = json.loads(line)\n    print(type(data).__name__)\n    if isinstance(data, dict):\n        print(f'Keys: {len(data)}')\n        for key in sorted(data):\n            print(f'{key}: {data[key]}')\nexcept json.JSONDecodeError:\n    print('Invalid JSON')",
      "testCases": [
        {
          "input": "{\"name\": \"Alice\", \"age\": 25, \"active\": true}\n",
          "expectedOutput": "dict\nKeys: 3\nactive: True\nage: 25\nname: Alice\n"
        },
        {
          "input": "{'bad': 'json'}\n",
          "expectedOutput": "Invalid JSON\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "JSON File Simulator",
      "prompt": "Simulate reading and writing a JSON config file. Start with a default config as a Python dict. Read N update commands (N given first) as `key value`. Apply them to the config. Serialize to JSON (indent=2), then deserialize it back and print each key-value pair sorted by key. Also print `Round-trip successful: True/False` (True if the re-parsed dict equals the original updated dict).",
      "starterCode": "import json\n# Simulate JSON config round-trip\n",
      "solutionCode": "import json\nconfig = {'theme': 'light', 'language': 'en', 'font_size': 12, 'notifications': True}\nn = int(input())\nfor _ in range(n):\n    parts = input().split(' ', 1)\n    key, value = parts[0], parts[1]\n    if value.isdigit():\n        value = int(value)\n    elif value.lower() == 'true':\n        value = True\n    elif value.lower() == 'false':\n        value = False\n    config[key] = value\njson_str = json.dumps(config, indent=2)\nreparsed = json.loads(json_str)\nfor key in sorted(reparsed):\n    print(f'{key}: {reparsed[key]}')\nprint(f'Round-trip successful: {reparsed == config}')",
      "testCases": [
        {
          "input": "2\ntheme dark\nfont_size 16\n",
          "expectedOutput": "font_size: 16\nlanguage: en\nnotifications: True\ntheme: dark\nRound-trip successful: True\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "API Response Processor",
      "prompt": "Read a JSON string from input representing an API response with structure:\n`{\"status\": \"...\", \"data\": {\"users\": [{\"name\": ..., \"score\": ..., \"active\": ...}]}}`\n\nParse it and:\n1. Print `Status: X`\n2. Print only active users sorted by score descending as `NAME: SCORE`\n3. Print average score of active users (2dp) or `No active users` if none\n4. If status is not `success`, print `Error response` and stop after step 1\n5. If JSON is invalid, print `Invalid JSON`",
      "starterCode": "import json\n# Read and process an API response JSON\n",
      "solutionCode": "import json\nline = input()\ntry:\n    response = json.loads(line)\n    print(f\"Status: {response['status']}\")\n    if response['status'] != 'success':\n        print('Error response')\n    else:\n        users = response['data']['users']\n        active = [u for u in users if u.get('active', False)]\n        if not active:\n            print('No active users')\n        else:\n            for u in sorted(active, key=lambda x: x['score'], reverse=True):\n                print(f\"{u['name']}: {u['score']}\")\n            avg = sum(u['score'] for u in active) / len(active)\n            print(f'Average: {avg:.2f}')\nexcept (json.JSONDecodeError, KeyError):\n    print('Invalid JSON')",
      "testCases": [
        {
          "input": "{\"status\": \"success\", \"data\": {\"users\": [{\"name\": \"Alice\", \"score\": 88, \"active\": true}, {\"name\": \"Bob\", \"score\": 95, \"active\": false}, {\"name\": \"Charlie\", \"score\": 72, \"active\": true}]}}\n",
          "expectedOutput": "Status: success\nAlice: 88\nCharlie: 72\nAverage: 80.00\n"
        },
        {
          "input": "{\"status\": \"error\", \"data\": {}}\n",
          "expectedOutput": "Status: error\nError response\n"
        },
        {
          "input": "not valid json\n",
          "expectedOutput": "Invalid JSON\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 95
    },
    {
      "title": "Simulate JSON Parsing",
      "prompt": "In Python, parsed JSON becomes a dictionary. Given `json_dict = {'status': 'success', 'data': {'id': 10}}`. Extract and print the `id`.",
      "starterCode": "json_dict = {'status': 'success', 'data': {'id': 10}}\n# Extract id and print\n",
      "solutionCode": "json_dict = {'status': 'success', 'data': {'id': 10}}\nprint(json_dict['data']['id'])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Contact Book",
      "prompt": "You are given `contacts = {}`. Read inputs in a loop until the input is 'exit'. Inputs are formatted like 'add Alice 123', 'get Alice', 'delete Alice'. Execute the commands on the `contacts` dictionary. For 'get', print the number or 'Not found'. After 'exit', print the whole dictionary.",
      "starterCode": "contacts = {}\n# Write loop to process commands\n",
      "solutionCode": "contacts = {}\nwhile True:\n    cmd = input().strip().split()\n    if cmd[0] == 'exit':\n        break\n    elif cmd[0] == 'add':\n        contacts[cmd[1]] = cmd[2]\n    elif cmd[0] == 'get':\n        print(contacts.get(cmd[1], 'Not found'))\n    elif cmd[0] == 'delete':\n        if cmd[1] in contacts:\n            del contacts[cmd[1]]\nprint(contacts)",
      "testCases": [
        {
          "input": "add Alice 123\nget Alice\nexit\n",
          "expectedOutput": "123\n{'Alice': '123'}\n"
        },
        {
          "input": "add Bob 456\ndelete Bob\nget Bob\nexit\n",
          "expectedOutput": "Not found\n{}\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    },
    {
      "title": "Module Integration: Letter Frequency",
      "prompt": "Read a string from input. Create a dictionary that counts the frequency of each character in the string. Print the dictionary.",
      "starterCode": "# Read string, count frequencies, print dict\n",
      "solutionCode": "text = input()\nfreq = {}\nfor char in text:\n    freq[char] = freq.get(char, 0) + 1\nprint(freq)",
      "testCases": [
        {
          "input": "hello\n",
          "expectedOutput": "{'h': 1, 'e': 1, 'l': 2, 'o': 1}\n"
        },
        {
          "input": "aaa\n",
          "expectedOutput": "{'a': 3}\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
