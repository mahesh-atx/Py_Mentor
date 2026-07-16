export const exercises: Record<string, any[]> = {
  "variables": [
    {
      "title": "Create a Variable",
      "prompt": "Create a variable named `player_name` and assign it the string value 'Hero'. Then, print the variable.",
      "starterCode": "# Create your variable and print it\n\n",
      "solutionCode": "player_name = 'Hero'\nprint(player_name)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hero\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Variable Math",
      "prompt": "Create a variable `x` equal to 5 and `y` equal to 10. Create a third variable `z` that is the sum of `x` and `y`, then print `z`.",
      "starterCode": "# Create x, y, and z, then print z\n",
      "solutionCode": "x = 5\ny = 10\nz = x + y\nprint(z)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "15\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Swap Variables",
      "prompt": "Given `a = 1` and `b = 2`, swap their values so that `a` becomes 2 and `b` becomes 1. Print `a` and `b` on separate lines.",
      "starterCode": "a = 1\nb = 2\n# Swap the variables below\n\nprint(a)\nprint(b)",
      "solutionCode": "a = 1\nb = 2\na, b = b, a\nprint(a)\nprint(b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n1\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Create a Variable",
      "prompt": "Create a variable named `player_name` and assign it the string value 'Hero'. Then, print the variable.",
      "starterCode": "# Create your variable and print it\n\n",
      "solutionCode": "player_name = 'Hero'\nprint(player_name)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hero\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Variable Math",
      "prompt": "Create a variable `x` equal to 5 and `y` equal to 10. Create a third variable `z` that is the sum of `x` and `y`, then print `z`.",
      "starterCode": "# Create x, y, and z, then print z\n",
      "solutionCode": "x = 5\ny = 10\nz = x + y\nprint(z)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "15\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Swap Variables",
      "prompt": "Given `a = 1` and `b = 2`, swap their values so that `a` becomes 2 and `b` becomes 1. Print `a` and `b` on separate lines.",
      "starterCode": "a = 1\nb = 2\n# Swap the variables below\n\nprint(a)\nprint(b)",
      "solutionCode": "a = 1\nb = 2\na, b = b, a\nprint(a)\nprint(b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n1\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Multiple Assignment",
      "prompt": "Assign the value 10 to three different variables `x`, `y`, and `z` in a single line of code. Then print their sum.",
      "starterCode": "# Assign 10 to x, y, and z in one line\n",
      "solutionCode": "x = y = z = 10\nprint(x + y + z)",
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
      "title": "Naming Conventions",
      "prompt": "Fix the variable names in the starter code so they are valid Python identifiers, and then print the result of `valid_name + valid_age`.",
      "starterCode": "1st_name = 'John'\nvalid-age = 30\n# Fix the variable names above and print their concatenation (as strings)\n",
      "solutionCode": "first_name = 'John'\nvalid_age = 30\nprint(first_name + str(valid_age))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "John30\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "data-types": [
    {
      "title": "Check Data Type",
      "prompt": "Create a variable `age = 25` and print its data type using the `type()` function.",
      "starterCode": "age = 25\n# Print the type of age below\n",
      "solutionCode": "age = 25\nprint(type(age))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'int'>\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Float and Boolean Types",
      "prompt": "Create a float variable `price = 9.99` and a boolean `is_active = True`. Print the types of both on separate lines.",
      "starterCode": "# Create price and is_active, then print their types\n",
      "solutionCode": "price = 9.99\nis_active = True\nprint(type(price))\nprint(type(is_active))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'float'>\n<class 'bool'>\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Rectangle Area Calculator",
      "prompt": "Write a program that reads the length and width of a rectangle (as floats), calculates the area (length * width), and prints: 'Area = [value]'. If either value is zero or negative, print 'Invalid dimensions'. (Input: 5, 3 → Output: Area = 15.0)",
      "starterCode": "# Read length and width, calculate area, print result\n",
      "solutionCode": "length = float(input())\nwidth = float(input())\nif length <= 0 or width <= 0:\n    print('Invalid dimensions')\nelse:\n    area = length * width\n    print(f'Area = {area}')",
      "testCases": [
        {
          "input": "5\n3\n",
          "expectedOutput": "Area = 15.0\n"
        },
        {
          "input": "-1\n4\n",
          "expectedOutput": "Invalid dimensions\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Check Data Type",
      "prompt": "Create a variable `age = 25` and print its data type using the `type()` function.",
      "starterCode": "age = 25\n# Print the type of age below\n",
      "solutionCode": "age = 25\nprint(type(age))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'int'>\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Float and Boolean Types",
      "prompt": "Create a float variable `price = 9.99` and a boolean `is_active = True`. Print the types of both on separate lines.",
      "starterCode": "# Create price and is_active, then print their types\n",
      "solutionCode": "price = 9.99\nis_active = True\nprint(type(price))\nprint(type(is_active))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'float'>\n<class 'bool'>\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Rectangle Area Calculator",
      "prompt": "Write a program that reads the length and width of a rectangle (as floats), calculates the area (length * width), and prints: 'Area = [value]'. If either value is zero or negative, print 'Invalid dimensions'. (Input: 5, 3 → Output: Area = 15.0)",
      "starterCode": "# Read length and width, calculate area, print result\n",
      "solutionCode": "length = float(input())\nwidth = float(input())\nif length <= 0 or width <= 0:\n    print('Invalid dimensions')\nelse:\n    area = length * width\n    print(f'Area = {area}')",
      "testCases": [
        {
          "input": "5\n3\n",
          "expectedOutput": "Area = 15.0\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Multiline String",
      "prompt": "Create a multiline string variable named `poem` containing 'Roses are red\\nViolets are blue'. Print it.",
      "starterCode": "# Create the multiline string and print it\n",
      "solutionCode": "poem = '''Roses are red\nViolets are blue'''\nprint(poem)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Roses are red\nViolets are blue\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Boolean Logic Basics",
      "prompt": "Create `is_sunny = True` and `is_raining = False`. Print the result of `is_sunny and not is_raining`.",
      "starterCode": "# Write your code below\n",
      "solutionCode": "is_sunny = True\nis_raining = False\nprint(is_sunny and not is_raining)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "type-id": [
    {
      "title": "Print Object ID",
      "prompt": "Create a variable `x = 10` and print its memory address using the `id()` function.",
      "starterCode": "x = 10\n# Print the id of x\n",
      "solutionCode": "x = 10\nprint(id(x))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "IGNORE_OUTPUT_CHECK"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Compare Object IDs",
      "prompt": "Create `x = 100` and `y = 100`. Print `True` if they share the same memory ID, or `False` if they don't, by comparing `id(x) == id(y)`.",
      "starterCode": "x = 100\ny = 100\n# Compare and print their IDs\n",
      "solutionCode": "x = 100\ny = 100\nprint(id(x) == id(y))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Print Object ID",
      "prompt": "Create a variable `x = 10` and print its memory address using the `id()` function.",
      "starterCode": "x = 10\n# Print the id of x\n",
      "solutionCode": "x = 10\nprint(id(x))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "IGNORE_OUTPUT_CHECK"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Compare Object IDs",
      "prompt": "Create `x = 100` and `y = 100`. Print `True` if they share the same memory ID, or `False` if they don't, by comparing `id(x) == id(y)`.",
      "starterCode": "x = 100\ny = 100\n# Compare and print their IDs\n",
      "solutionCode": "x = 100\ny = 100\nprint(id(x) == id(y))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "type-casting": [
    {
      "title": "String to Integer",
      "prompt": "Given the string `num_str = '50'`, cast it to an integer, add 10 to it, and print the result.",
      "starterCode": "num_str = '50'\n# Convert num_str to an int, add 10, and print\n",
      "solutionCode": "num_str = '50'\nnum_int = int(num_str)\nprint(num_int + 10)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "60\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Float to Integer",
      "prompt": "Given `pi = 3.14159`, cast it to an integer (which drops the decimals) and print it.",
      "starterCode": "pi = 3.14159\n# Cast to int and print\n",
      "solutionCode": "pi = 3.14159\nprint(int(pi))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Simple Interest Calculator",
      "prompt": "Read Principal (float), Rate (float), and Time in years (float) as inputs. Calculate Simple Interest using the formula: SI = (P * R * T) / 100. Print the SI value. (Input: 1000, 5, 2 → Output: 100.0)",
      "starterCode": "# Read P, R, T, calculate and print Simple Interest\n",
      "solutionCode": "p = float(input())\nr = float(input())\nt = float(input())\nsi = (p * r * t) / 100\nprint(si)",
      "testCases": [
        {
          "input": "1000\n5\n2\n",
          "expectedOutput": "100.0\n"
        },
        {
          "input": "2000\n3.5\n1\n",
          "expectedOutput": "70.0\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "String to Integer",
      "prompt": "Given the string `num_str = '50'`, cast it to an integer, add 10 to it, and print the result.",
      "starterCode": "num_str = '50'\n# Convert num_str to an int, add 10, and print\n",
      "solutionCode": "num_str = '50'\nnum_int = int(num_str)\nprint(num_int + 10)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "60\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Float to Integer",
      "prompt": "Given `pi = 3.14159`, cast it to an integer (which drops the decimals) and print it.",
      "starterCode": "pi = 3.14159\n# Cast to int and print\n",
      "solutionCode": "pi = 3.14159\nprint(int(pi))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Simple Interest Calculator",
      "prompt": "Read Principal (float), Rate (float), and Time in years (float) as inputs. Calculate Simple Interest using the formula: SI = (P * R * T) / 100. Print the SI value. (Input: 1000, 5, 2 → Output: 100.0)",
      "starterCode": "# Read P, R, T, calculate and print Simple Interest\n",
      "solutionCode": "p = float(input())\nr = float(input())\nt = float(input())\nsi = (p * r * t) / 100\nprint(si)",
      "testCases": [
        {
          "input": "1000\n5\n2\n",
          "expectedOutput": "100.0\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Boolean Casting",
      "prompt": "Cast the empty string `\"\"` and the string `\"False\"` to booleans using `bool()`. Print both results on separate lines.",
      "starterCode": "# Cast \"\" and \"False\" to bool and print them\n",
      "solutionCode": "print(bool(''))\nprint(bool('False'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "False\nTrue\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Chaining Casts",
      "prompt": "Given the string `\" 45.67 \"`, convert it directly to an integer by first casting to a float, then to an int. Print the result.",
      "starterCode": "raw_data = \" 45.67 \"\n# Convert to float, then to int, and print\n",
      "solutionCode": "raw_data = \" 45.67 \"\nprint(int(float(raw_data)))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "45\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "user-input": [
    {
      "title": "Reading Input",
      "prompt": "Use `input()` to read a user's color preference and print it. (The testing system will type 'Blue' for you).",
      "starterCode": "# Use input() and print the result\n",
      "solutionCode": "color = input()\nprint(color)",
      "testCases": [
        {
          "input": "Blue\n",
          "expectedOutput": "Blue\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Adding Two Inputs",
      "prompt": "Read two numbers using `input()` on separate lines. By default they are strings! Cast them to integers, add them, and print the result. (Inputs provided: 10, 20)",
      "starterCode": "# Read two inputs, convert to int, add, and print\n",
      "solutionCode": "num1 = int(input())\nnum2 = int(input())\nprint(num1 + num2)",
      "testCases": [
        {
          "input": "10\n20\n",
          "expectedOutput": "30\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "User Profile Generator",
      "prompt": "Write a program that takes two lines of input: the user's name, followed by their birth year. Calculate their age (assume the current year is 2026) and use an f-string to print: 'Profile: [Name], Age: [Age]'.",
      "starterCode": "# Read name and birth_year, calculate age, and print the profile\n",
      "solutionCode": "name = input()\nbirth_year = int(input())\nage = 2026 - birth_year\nprint(f'Profile: {name}, Age: {age}')",
      "testCases": [
        {
          "input": "Alice\n1996\n",
          "expectedOutput": "Profile: Alice, Age: 30\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    },
    {
      "title": "Reading Input",
      "prompt": "Use `input()` to read a user's color preference and print it. (The testing system will type 'Blue' for you).",
      "starterCode": "# Use input() and print the result\n",
      "solutionCode": "color = input()\nprint(color)",
      "testCases": [
        {
          "input": "Blue\n",
          "expectedOutput": "Blue\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Adding Two Inputs",
      "prompt": "Read two numbers using `input()` on separate lines. By default they are strings! Cast them to integers, add them, and print the result. (Inputs provided: 10, 20)",
      "starterCode": "# Read two inputs, convert to int, add, and print\n",
      "solutionCode": "num1 = int(input())\nnum2 = int(input())\nprint(num1 + num2)",
      "testCases": [
        {
          "input": "10\n20\n",
          "expectedOutput": "30\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "User Profile Generator",
      "prompt": "Write a program that takes two lines of input: the user's name, followed by their birth year. Calculate their age (assume the current year is 2026) and use an f-string to print: 'Profile: [Name], Age: [Age]'.",
      "starterCode": "# Read name and birth_year, calculate age, and print the profile\n",
      "solutionCode": "name = input()\nbirth_year = int(input())\nage = 2026 - birth_year\nprint(f'Profile: {name}, Age: {age}')",
      "testCases": [
        {
          "input": "Alice\n1996\n",
          "expectedOutput": "Profile: Alice, Age: 30\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    },
    {
      "title": "Multiple Inputs Simulation",
      "prompt": "Read a single line of input containing three words separated by spaces (e.g. 'one two three'). Use `.split()` to turn it into a list, and print the second word.",
      "starterCode": "# Read input, split it, print the second word\n",
      "solutionCode": "words = input().split()\nprint(words[1])",
      "testCases": [
        {
          "input": "one two three\n",
          "expectedOutput": "two\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "dynamic-typing": [
    {
      "title": "Reassign Variables",
      "prompt": "Assign the integer 5 to a variable `data`. Print it. Then reassign `data` to the string 'five' and print it again.",
      "starterCode": "# Write your code below\n",
      "solutionCode": "data = 5\nprint(data)\ndata = 'five'\nprint(data)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "5\nfive\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Type Tracking",
      "prompt": "Assign `val = 10`. Print its type. Then reassign `val = 10.5` and print its new type.",
      "starterCode": "val = 10\n# Print type, reassign to 10.5, print type again\n",
      "solutionCode": "val = 10\nprint(type(val))\nval = 10.5\nprint(type(val))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'int'>\n<class 'float'>\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Reassign Variables",
      "prompt": "Assign the integer 5 to a variable `data`. Print it. Then reassign `data` to the string 'five' and print it again.",
      "starterCode": "# Write your code below\n",
      "solutionCode": "data = 5\nprint(data)\ndata = 'five'\nprint(data)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "5\nfive\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Type Tracking",
      "prompt": "Assign `val = 10`. Print its type. Then reassign `val = 10.5` and print its new type.",
      "starterCode": "val = 10\n# Print type, reassign to 10.5, print type again\n",
      "solutionCode": "val = 10\nprint(type(val))\nval = 10.5\nprint(type(val))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "<class 'int'>\n<class 'float'>\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Reassigning across Types",
      "prompt": "Start with `result = 'Pending'`. Print `result`. Then reassign `result` to the boolean `True`. Print `result`. Finally, reassign to integer `1` and print it.",
      "starterCode": "# Create result, and reassign it twice, printing each time\n",
      "solutionCode": "result = 'Pending'\nprint(result)\nresult = True\nprint(result)\nresult = 1\nprint(result)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pending\nTrue\n1\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "print-formatting": [
    {
      "title": "Basic f-strings",
      "prompt": "Given `name = 'Alice'` and `score = 100`, use an f-string to print exactly: 'Alice scored 100 points!'",
      "starterCode": "name = 'Alice'\nscore = 100\n# Use an f-string to print the message\n",
      "solutionCode": "name = 'Alice'\nscore = 100\nprint(f'{name} scored {score} points!')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice scored 100 points!\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Formatting Decimals",
      "prompt": "Given `pi = 3.14159265`, use an f-string with formatting (e.g. `{pi:.2f}`) to print it rounded to 2 decimal places: 'Pi is 3.14'.",
      "starterCode": "pi = 3.14159265\n# Print Pi rounded to 2 decimal places\n",
      "solutionCode": "pi = 3.14159265\nprint(f'Pi is {pi:.2f}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pi is 3.14\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Temperature Converter (C to F)",
      "prompt": "Write a program that reads a temperature in Celsius (float), converts it to Fahrenheit using the formula F = (C * 9/5) + 32, and prints the result formatted to 2 decimal places like: '[value]°F'. (Input: 37 → Output: 98.60°F)",
      "starterCode": "# Read Celsius, convert to Fahrenheit, print formatted\n",
      "solutionCode": "c = float(input())\nf = (c * 9 / 5) + 32\nprint(f'{f:.2f}°F')",
      "testCases": [
        {
          "input": "37\n",
          "expectedOutput": "98.60°F\n"
        },
        {
          "input": "0\n",
          "expectedOutput": "32.00°F\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Basic f-strings",
      "prompt": "Given `name = 'Alice'` and `score = 100`, use an f-string to print exactly: 'Alice scored 100 points!'",
      "starterCode": "name = 'Alice'\nscore = 100\n# Use an f-string to print the message\n",
      "solutionCode": "name = 'Alice'\nscore = 100\nprint(f'{name} scored {score} points!')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice scored 100 points!\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Formatting Decimals",
      "prompt": "Given `pi = 3.14159265`, use an f-string with formatting (e.g. `{pi:.2f}`) to print it rounded to 2 decimal places: 'Pi is 3.14'.",
      "starterCode": "pi = 3.14159265\n# Print Pi rounded to 2 decimal places\n",
      "solutionCode": "pi = 3.14159265\nprint(f'Pi is {pi:.2f}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pi is 3.14\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Temperature Converter (C to F)",
      "prompt": "Write a program that reads a temperature in Celsius (float), converts it to Fahrenheit using the formula F = (C * 9/5) + 32, and prints the result formatted to 2 decimal places like: '[value]°F'. (Input: 37 → Output: 98.60°F)",
      "starterCode": "# Read Celsius, convert to Fahrenheit, print formatted\n",
      "solutionCode": "c = float(input())\nf = (c * 9 / 5) + 32\nprint(f'{f:.2f}°F')",
      "testCases": [
        {
          "input": "37\n",
          "expectedOutput": "98.60°F\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Padding and Alignment",
      "prompt": "Given `id_num = 42`, use an f-string with zero-padding `{id_num:05d}` to print it as a 5-digit number (i.e. '00042').",
      "starterCode": "id_num = 42\n# Print id_num padded with zeroes to 5 digits\n",
      "solutionCode": "id_num = 42\nprint(f'{id_num:05d}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "00042\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Module Integration: Receipt Generator",
      "prompt": "Write a program that reads the `item_name` (string), `price` (float), and `quantity` (int) on separate lines. Calculate the total cost. Print a receipt using f-strings exactly like this: 'Item: [name], Total: $[total formatted to 2 decimals]'. (Input: Apple, 1.5, 4 → Output: Item: Apple, Total: $6.00)",
      "starterCode": "# Read inputs, calculate total, format output\n",
      "solutionCode": "item_name = input()\nprice = float(input())\nquantity = int(input())\ntotal = price * quantity\nprint(f'Item: {item_name}, Total: ${total:.2f}')",
      "testCases": [
        {
          "input": "Apple\n1.5\n4\n",
          "expectedOutput": "Item: Apple, Total: $6.00\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Module Integration: Profile Builder",
      "prompt": "Read `first_name` and `last_name` on separate lines. Combine them into `full_name`. Read `birth_year` and calculate age (current year is 2026). Print 'User: [full_name], Age: [age]'. (Input: Jane, Doe, 1990 → Output: User: Jane Doe, Age: 36)",
      "starterCode": "# Build the profile and print it\n",
      "solutionCode": "first_name = input()\nlast_name = input()\nbirth_year = int(input())\nfull_name = first_name + ' ' + last_name\nage = 2026 - birth_year\nprint(f'User: {full_name}, Age: {age}')",
      "testCases": [
        {
          "input": "Jane\nDoe\n1990\n",
          "expectedOutput": "User: Jane Doe, Age: 36\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
