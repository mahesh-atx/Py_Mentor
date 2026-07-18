export const exercises: Record<string, any[]> = {
  "tuples": [
    {
      "title": "Create and Access a Tuple",
      "prompt": "Create a tuple called `point` with values `(10, 20, 30)`. Print the first element, the last element using negative indexing, and the length of the tuple.",
      "starterCode": "# Create point tuple and print first, last, and length\n",
      "solutionCode": "point = (10, 20, 30)\nprint(point[0])\nprint(point[-1])\nprint(len(point))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n30\n3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Single Item Tuple",
      "prompt": "Create a single-item tuple containing the integer `42`. Print the tuple and its type to confirm it is a tuple, not an integer.",
      "starterCode": "# Create a single-item tuple with 42\n",
      "solutionCode": "single = (42,)\nprint(single)\nprint(type(single))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "(42,)\n<class 'tuple'>\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Tuple Unpacking",
      "prompt": "Read a CSV line from input in the format `name,age,city`. Unpack the three fields using tuple unpacking and print each on a separate line with a label:\n`Name: X`\n`Age: X`\n`City: X`\n\nIf the input does not have exactly 3 comma-separated fields, print `Invalid format`.",
      "starterCode": "# Read CSV line, unpack into name, age, city, print each\n",
      "solutionCode": "line = input()\nparts = line.split(',')\nif len(parts) != 3:\n    print('Invalid format')\nelse:\n    name, age, city = parts\n    print(f'Name: {name}')\n    print(f'Age: {age}')\n    print(f'City: {city}')",
      "testCases": [
        {
          "input": "Alice,25,New York\n",
          "expectedOutput": "Name: Alice\nAge: 25\nCity: New York\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Count and Index",
      "prompt": "Read N integers from input (N given first). Store them in a tuple. Then read a search value. Print:\n1. How many times it appears using `count()`\n2. The index of its first occurrence using `index()` (or `Not found` if it is not in the tuple)\n\n(Input: N=5, values 1 2 3 2 1, search 2 → count: 2, index: 1)",
      "starterCode": "# Read N integers into a tuple, then search value, print count and index\n",
      "solutionCode": "n = int(input())\nnumbers = tuple(int(input()) for _ in range(n))\nvalue = int(input())\nprint(f'Count: {numbers.count(value)}')\nif value in numbers:\n    print(f'First index: {numbers.index(value)}')\nelse:\n    print('Not found')",
      "testCases": [
        {
          "input": "5\n1\n2\n3\n2\n1\n2\n",
          "expectedOutput": "Count: 2\nFirst index: 1\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Tuple vs List Decision",
      "prompt": "Read N records from input (N given first). Each record is a line: `name score`. Store each record as a tuple `(name, score)` in a list. Sort by score descending using the tuple's second element as the key. Print each record as `#RANK: name - score` and print whether the top score beats 90 (`Top score is excellent` or `Top score is not excellent`).",
      "starterCode": "# Read N name-score records, store as tuples, sort and rank\n",
      "solutionCode": "n = int(input())\nrecords = []\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    score = int(parts[1])\n    records.append((name, score))\nrecords.sort(key=lambda x: x[1], reverse=True)\nfor rank, (name, score) in enumerate(records, 1):\n    print(f'#{rank}: {name} - {score}')\nif records[0][1] > 90:\n    print('Top score is excellent')\nelse:\n    print('Top score is not excellent')",
      "testCases": [
        {
          "input": "3\nAlice 88\nBob 95\nCharlie 72\n",
          "expectedOutput": "#1: Bob - 95\n#2: Alice - 88\n#3: Charlie - 72\nTop score is excellent\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Coordinate Distance Calculator",
      "prompt": "Read two 2D coordinate pairs from input (each on one line as `x y`). Store each as a tuple. Calculate the Euclidean distance between them using the formula `sqrt((x2-x1)^2 + (y2-y1)^2)`. Print:\n1. Both coordinates as tuples\n2. The distance rounded to 2 decimal places\n3. Whether the points are the same (`Same location`) or different (`Different locations`)\n\nHandle invalid (non-numeric) inputs by printing `Invalid coordinates`.",
      "starterCode": "import math\n# Read two coordinates as tuples, calculate and print distance\n",
      "solutionCode": "import math\ntry:\n    x1, y1 = map(float, input().split())\n    x2, y2 = map(float, input().split())\n    p1 = (x1, y1)\n    p2 = (x2, y2)\n    print(p1)\n    print(p2)\n    distance = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n    print(f'Distance: {distance:.2f}')\n    if p1 == p2:\n        print('Same location')\n    else:\n        print('Different locations')\nexcept ValueError:\n    print('Invalid coordinates')",
      "testCases": [
        {
          "input": "0 0\n3 4\n",
          "expectedOutput": "(0.0, 0.0)\n(3.0, 4.0)\nDistance: 5.00\nDifferent locations\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Create a Tuple",
      "prompt": "Create a tuple named `my_tuple` containing the numbers 1, 2, and 3. Print the tuple.",
      "starterCode": "# Create my_tuple and print it\n",
      "solutionCode": "my_tuple = (1, 2, 3)\nprint(my_tuple)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "(1, 2, 3)\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Access Tuple Elements",
      "prompt": "Given `t = (10, 20, 30)`. Print the second element.",
      "starterCode": "t = (10, 20, 30)\n# Print the second element\n",
      "solutionCode": "t = (10, 20, 30)\nprint(t[1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "20\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Tuple Immutability",
      "prompt": "Tuples cannot be changed. To prove this, try to change the first element of `t = (1, 2)` to `5`. Use a try-except block to catch the `TypeError` and print 'Cannot modify'.",
      "starterCode": "t = (1, 2)\ntry:\n    # Try changing t[0] to 5\n    pass\nexcept TypeError:\n    print('Cannot modify')",
      "solutionCode": "t = (1, 2)\ntry:\n    t[0] = 5\nexcept TypeError:\n    print('Cannot modify')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Cannot modify\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Tuple Unpacking",
      "prompt": "Given `person = ('Alice', 30, 'Engineer')`. Unpack this into three variables `name`, `age`, and `job`. Print them separated by spaces.",
      "starterCode": "person = ('Alice', 30, 'Engineer')\n# Unpack and print\n",
      "solutionCode": "person = ('Alice', 30, 'Engineer')\nname, age, job = person\nprint(name, age, job)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice 30 Engineer\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Single Element Tuple",
      "prompt": "Create a tuple with a single element `5` and assign it to `t1`. Print `t1` and its type.",
      "starterCode": "# Create single element tuple and print it along with its type\n",
      "solutionCode": "t1 = (5,)\nprint(t1)\nprint(type(t1))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "(5,)\n<class 'tuple'>\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Returning Multiple Values",
      "prompt": "Simulate a function return: assign `result = (10, 20)`. Unpack it into `x` and `y`. Print their sum.",
      "starterCode": "# Unpack (10, 20) into x and y, then print x + y\n",
      "solutionCode": "result = (10, 20)\nx, y = result\nprint(x + y)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "30\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Nested Tuples",
      "prompt": "Given `nested = ((1, 2), (3, 4))`. Print the number `4`.",
      "starterCode": "nested = ((1, 2), (3, 4))\n# Access and print 4\n",
      "solutionCode": "nested = ((1, 2), (3, 4))\nprint(nested[1][1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "4\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Tuple to List Conversion",
      "prompt": "Given `t = (1, 2, 3)`. Convert it to a list, append `4`, and print the list.",
      "starterCode": "t = (1, 2, 3)\n# Convert to list, append 4, print\n",
      "solutionCode": "t = (1, 2, 3)\nl = list(t)\nl.append(4)\nprint(l)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "sets": [
    {
      "title": "Create a Set and Check Membership",
      "prompt": "Create a set called `vowels` containing `'a'`, `'e'`, `'i'`, `'o'`, `'u'`. Print whether `'a'` is in the set and whether `'b'` is in the set.",
      "starterCode": "# Create vowels set and check membership\n",
      "solutionCode": "vowels = {'a', 'e', 'i', 'o', 'u'}\nprint('a' in vowels)\nprint('b' in vowels)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\nFalse\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Remove Duplicates",
      "prompt": "Read N integers from input (N given first). Use a set to remove duplicates, then print the sorted unique values as a list and print how many duplicates were removed.\n\n(Input: N=6, values: 1 2 2 3 3 3 → unique sorted, 3 duplicates removed)",
      "starterCode": "# Read N integers, remove duplicates using set, print sorted unique and duplicate count\n",
      "solutionCode": "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nunique = set(numbers)\nprint(sorted(unique))\nprint(f'Duplicates removed: {n - len(unique)}')",
      "testCases": [
        {
          "input": "6\n1\n2\n2\n3\n3\n3\n",
          "expectedOutput": "[1, 2, 3]\nDuplicates removed: 3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Set Operations",
      "prompt": "Read two sets of integers from input. Each set is given as a count N followed by N integers. Print the following on separate lines:\n1. Union\n2. Intersection\n3. Items only in set A (A - B)\n4. Items only in set B (B - A)\n5. Symmetric difference\n\nPrint each as a sorted list.",
      "starterCode": "# Read two sets and print all set operation results\n",
      "solutionCode": "n = int(input())\nset_a = {int(input()) for _ in range(n)}\nm = int(input())\nset_b = {int(input()) for _ in range(m)}\nprint(sorted(set_a | set_b))\nprint(sorted(set_a & set_b))\nprint(sorted(set_a - set_b))\nprint(sorted(set_b - set_a))\nprint(sorted(set_a ^ set_b))",
      "testCases": [
        {
          "input": "5\n1\n2\n3\n4\n5\n4\n4\n5\n6\n7\n",
          "expectedOutput": "[1, 2, 3, 4, 5, 6, 7]\n[4, 5]\n[1, 2, 3]\n[6, 7]\n[1, 2, 3, 6, 7]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Attendance Tracker",
      "prompt": "Read a class roster (N students, N given first). Then read M attendance records (M given next), each is a student name who attended that day. Print:\n1. Students who attended (sorted)\n2. Students who were absent (sorted)\n3. Any names in attendance that are NOT on the roster (sorted, or `None` if all valid)\n4. Attendance percentage (2 decimal places)\n\nIf roster is empty, print `Empty roster`.",
      "starterCode": "# Read roster and attendance, calculate attendance statistics\n",
      "solutionCode": "n = int(input())\nif n == 0:\n    print('Empty roster')\nelse:\n    roster = {input().strip() for _ in range(n)}\n    m = int(input())\n    attended = {input().strip() for _ in range(m)}\n    present = roster & attended\n    absent = roster - attended\n    unknown = attended - roster\n    pct = len(present) / len(roster) * 100\n    print(sorted(present))\n    print(sorted(absent))\n    print(sorted(unknown) if unknown else 'None')\n    print(f'{pct:.2f}%')",
      "testCases": [
        {
          "input": "4\nAlice\nBob\nCharlie\nDiana\n3\nAlice\nCharlie\nEve\n",
          "expectedOutput": "['Alice', 'Charlie']\n['Bob', 'Diana']\n['Eve']\n50.00%\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Set Comprehension - Unique Words",
      "prompt": "Read a paragraph of text from input (single line). Using a set comprehension:\n1. Create a set of unique words (lowercase, ignore punctuation: `.`, `,`, `!`, `?`)\n2. Create a set of unique words longer than 4 characters\n3. Create a set of unique first characters of all words\n\nPrint each as a sorted list and print the count of each set.",
      "starterCode": "# Read text and create three sets using set comprehension\n",
      "solutionCode": "text = input().lower()\nfor ch in '.!?,;:':\n    text = text.replace(ch, '')\nall_words = text.split()\nunique_words = {w for w in all_words}\nlong_words = {w for w in all_words if len(w) > 4}\nfirst_chars = {w[0] for w in all_words if w}\nprint(sorted(unique_words))\nprint(f'Unique words: {len(unique_words)}')\nprint(sorted(long_words))\nprint(f'Long words: {len(long_words)}')\nprint(sorted(first_chars))\nprint(f'First chars: {len(first_chars)}')",
      "testCases": [
        {
          "input": "Python is great and python is easy\n",
          "expectedOutput": "['and', 'easy', 'great', 'is', 'python']\nUnique words: 5\n['great', 'python']\nLong words: 2\n['a', 'e', 'g', 'i', 'p']\nFirst chars: 5\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Frozen Set Permission System",
      "prompt": "Define three frozen sets of permissions:\n- `admin`: `read`, `write`, `delete`, `manage`\n- `editor`: `read`, `write`\n- `viewer`: `read`\n\nRead a role name and a permission to check from input. Print:\n1. `Has permission: True/False`\n2. `Permissions: [sorted list]`\n3. `Exclusive to this role: [sorted list]` (permissions only this role has, compared to the other two combined)\n\nIf the role is invalid, print `Unknown role`.",
      "starterCode": "# Define frozen set roles and check permissions\n",
      "solutionCode": "admin = frozenset({'read', 'write', 'delete', 'manage'})\neditor = frozenset({'read', 'write'})\nviewer = frozenset({'read'})\nroles = {'admin': admin, 'editor': editor, 'viewer': viewer}\nrole_name = input().strip().lower()\npermission = input().strip().lower()\nif role_name not in roles:\n    print('Unknown role')\nelse:\n    role_perms = roles[role_name]\n    others = set()\n    for name, perms in roles.items():\n        if name != role_name:\n            others |= perms\n    exclusive = role_perms - others\n    print(f'Has permission: {permission in role_perms}')\n    print(f'Permissions: {sorted(role_perms)}')\n    print(f'Exclusive to this role: {sorted(exclusive)}')",
      "testCases": [
        {
          "input": "admin\ndelete\n",
          "expectedOutput": "Has permission: True\nPermissions: ['delete', 'manage', 'read', 'write']\nExclusive to this role: ['delete', 'manage']\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Create a Set",
      "prompt": "Create a set named `my_set` containing the numbers 1, 2, and 2 (duplicate). Print the set to see duplicates removed.",
      "starterCode": "# Create set and print it\n",
      "solutionCode": "my_set = {1, 2, 2}\nprint(my_set)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1, 2}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Add and Remove",
      "prompt": "Given `s = {1, 2}`. Use `.add(3)` to add an element. Use `.remove(1)` to remove an element. Print the set.",
      "starterCode": "s = {1, 2}\n# Add 3, remove 1, print set\n",
      "solutionCode": "s = {1, 2}\ns.add(3)\ns.remove(1)\nprint(s)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{2, 3}\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Set Union",
      "prompt": "Given `setA = {1, 2}` and `setB = {2, 3}`. Print their union using the `|` operator.",
      "starterCode": "setA = {1, 2}\nsetB = {2, 3}\n# Print union\n",
      "solutionCode": "setA = {1, 2}\nsetB = {2, 3}\nprint(setA | setB)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1, 2, 3}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Set Intersection",
      "prompt": "Given `setA = {1, 2, 3}` and `setB = {2, 3, 4}`. Print their intersection using the `&` operator.",
      "starterCode": "setA = {1, 2, 3}\nsetB = {2, 3, 4}\n# Print intersection\n",
      "solutionCode": "setA = {1, 2, 3}\nsetB = {2, 3, 4}\nprint(setA & setB)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{2, 3}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Set Difference",
      "prompt": "Given `setA = {1, 2, 3}` and `setB = {3, 4, 5}`. Print the elements that are in `setA` but not in `setB` using the `-` operator.",
      "starterCode": "setA = {1, 2, 3}\nsetB = {3, 4, 5}\n# Print difference\n",
      "solutionCode": "setA = {1, 2, 3}\nsetB = {3, 4, 5}\nprint(setA - setB)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "{1, 2}\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Subset Check",
      "prompt": "Given `small = {1, 2}` and `big = {1, 2, 3}`. Print whether `small` is a subset of `big` using the `<=` operator.",
      "starterCode": "small = {1, 2}\nbig = {1, 2, 3}\n# Print if small is subset of big\n",
      "solutionCode": "small = {1, 2}\nbig = {1, 2, 3}\nprint(small <= big)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "List Deduplication",
      "prompt": "Given `data = [1, 2, 2, 3, 1, 4]`. Convert it to a set to remove duplicates, then convert it back to a list and sort it. Print the new list.",
      "starterCode": "data = [1, 2, 2, 3, 1, 4]\n# Deduplicate, convert back to list, sort and print\n",
      "solutionCode": "data = [1, 2, 2, 3, 1, 4]\nclean_data = list(set(data))\nclean_data.sort()\nprint(clean_data)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Module Integration: Data Analyst Filter",
      "prompt": "Read two lines of inputs representing user IDs who visited a site on Monday and Tuesday (space-separated, e.g., '1 2 3' and '2 3 4'). Find the common visitors (intersection). Print the result as a sorted tuple.",
      "starterCode": "# Read two lines, split, convert to sets, find intersection, sort, convert to tuple, print\n",
      "solutionCode": "mon = set(input().split())\ntue = set(input().split())\ncommon = mon & tue\nres = tuple(sorted(common))\nprint(res)",
      "testCases": [
        {
          "input": "1 2 3\n2 3 4\n",
          "expectedOutput": "('2', '3')\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Module Integration: Unique Characters",
      "prompt": "Read a string from input. Find all the unique characters in the string, filter out any spaces, sort them alphabetically, and print them joined as a single string.",
      "starterCode": "# Find unique chars, remove space, sort, join, print\n",
      "solutionCode": "text = input()\nunique_chars = set(text)\nif ' ' in unique_chars:\n    unique_chars.remove(' ')\nres = ''.join(sorted(unique_chars))\nprint(res)",
      "testCases": [
        {
          "input": "hello world\n",
          "expectedOutput": "dehlorw\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
