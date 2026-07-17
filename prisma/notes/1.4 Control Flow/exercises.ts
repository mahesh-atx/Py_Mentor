export const exercises: Record<string, any[]> = {
  "conditional-statements": [
    {
      "title": "Check Even or Odd",
      "prompt": "Write an `if/else` statement that checks if the variable `num` is even. If it is, print 'Even', otherwise print 'Odd'.",
      "starterCode": "num = 7\n# Write your if/else statement below\n",
      "solutionCode": "num = 7\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Odd\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Positive or Negative",
      "prompt": "Given `x = -3`, write an `if/else` that prints 'Positive' if x > 0, otherwise 'Non-positive'.",
      "starterCode": "x = -3\n# Write your if/else statement below\n",
      "solutionCode": "x = -3\nif x > 0:\n    print('Positive')\nelse:\n    print('Non-positive')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Non-positive\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Login Gate",
      "prompt": "Read `username` and `password` from input (one per line). If username is 'admin' AND password is 'secret', print 'Access granted', otherwise print 'Access denied'.",
      "starterCode": "# Read username and password, check credentials\n",
      "solutionCode": "username = input()\npassword = input()\nif username == 'admin' and password == 'secret':\n    print('Access granted')\nelse:\n    print('Access denied')",
      "testCases": [
        {
          "input": "admin\nsecret\n",
          "expectedOutput": "Access granted\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Simple If",
      "prompt": "Given `is_raining = True`, write an `if` statement that prints 'Take an umbrella'.",
      "starterCode": "is_raining = True\n# Write your if statement below\n",
      "solutionCode": "is_raining = True\nif is_raining:\n    print('Take an umbrella')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Take an umbrella\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "If-Else",
      "prompt": "Read an integer using input(). If it's greater than 10, print 'Big'. Else, print 'Small'. (Input: 15)",
      "starterCode": "# Read input, convert to int, use if-else\n",
      "solutionCode": "num = int(input())\nif num > 10:\n    print('Big')\nelse:\n    print('Small')",
      "testCases": [
        {
          "input": "15\n",
          "expectedOutput": "Big\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Odd or Even",
      "prompt": "Read an integer. If it is divisible by 2 (use `%`), print 'Even'. Else, print 'Odd'.",
      "starterCode": "# Read an integer, check if it's even or odd, print result\n",
      "solutionCode": "num = int(input())\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
      "testCases": [
        {
          "input": "42\n",
          "expectedOutput": "Even\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Length Check",
      "prompt": "Read a word using `input()`. If the length (`len(word)`) is exactly 5, print 'Valid'. Otherwise print 'Invalid'.",
      "starterCode": "# Read a word, check its length\n",
      "solutionCode": "word = input()\nif len(word) == 5:\n    print('Valid')\nelse:\n    print('Invalid')",
      "testCases": [
        {
          "input": "hello\n",
          "expectedOutput": "Valid\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Positive, Negative or Zero",
      "prompt": "Read an integer. Print Positive if it is greater than 0, Negative if less than 0, and Zero otherwise.",
      "starterCode": "# Classify the number\n",
      "solutionCode": "n = int(input())\nif n > 0:\n    print('Positive')\nelif n < 0:\n    print('Negative')\nelse:\n    print('Zero')",
      "testCases": [{ "input": "0\n", "expectedOutput": "Zero\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Leap Year Check",
      "prompt": "Read a year. Print Leap Year if it is divisible by 4 and (not divisible by 100 or divisible by 400). Otherwise print Not a Leap Year.",
      "starterCode": "# Leap year logic\n",
      "solutionCode": "year = int(input())\nif year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):\n    print('Leap Year')\nelse:\n    print('Not a Leap Year')",
      "testCases": [{ "input": "2024\n", "expectedOutput": "Leap Year\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "if-elif-else": [
    {
      "title": "Grade the Score",
      "prompt": "Given `score = 85`, write an `if`, `elif`, `else` block: if score >= 90 print 'A', elif score >= 80 print 'B', else print 'C'.",
      "starterCode": "score = 85\n# Write your if/elif/else block\n",
      "solutionCode": "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "B\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Day Type",
      "prompt": "Read a day name from input (lowercased). Print 'Weekend' if it is 'saturday' or 'sunday', 'Friday' if 'friday', else 'Weekday'.",
      "starterCode": "# Read a day and classify it\n",
      "solutionCode": "day = input()\nif day == 'saturday' or day == 'sunday':\n    print('Weekend')\nelif day == 'friday':\n    print('Friday')\nelse:\n    print('Weekday')",
      "testCases": [
        {
          "input": "sunday\n",
          "expectedOutput": "Weekend\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Number to Words (1-99)",
      "prompt": "Write a program that reads a number from 1 to 99 and prints it in English words. E.g., 23 → 'twenty-three'. Validate the range first. (Input: 23 → Output: twenty-three)",
      "starterCode": "# Read a number 1-99 and convert to words\n",
      "solutionCode": "num = int(input())\nif num < 1 or num > 99:\n    print('Out of range')\nelse:\n    ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',\n            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',\n            'seventeen', 'eighteen', 'nineteen']\n    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']\n    if num < 20:\n        print(ones[num])\n    else:\n        t = num // 10\n        o = num % 10\n        if o == 0:\n            print(tens[t])\n        else:\n            print(f'{tens[t]}-{ones[o]}')",
      "testCases": [
        {
          "input": "23\n",
          "expectedOutput": "twenty-three\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Valid Triangle Checker",
      "prompt": "Read three angle values (floats) as input, one per line. Check if they can form a valid triangle. A triangle is valid if all angles are positive and their sum is 180. Also check if it is 'Right', 'Obtuse', or 'Acute'. Print the type of triangle. (Input: 90, 45, 45 → Output: Right)",
      "starterCode": "# Read three angles and determine triangle type and validity\n",
      "solutionCode": "a = float(input())\nb = float(input())\nc = float(input())\nif a <= 0 or b <= 0 or c <= 0 or (a + b + c) != 180:\n    print('Invalid')\nelse:\n    if a == 90 or b == 90 or c == 90:\n        print('Right')\n    elif a > 90 or b > 90 or c > 90:\n        print('Obtuse')\n    else:\n        print('Acute')",
      "testCases": [
        {
          "input": "90\n45\n45\n",
          "expectedOutput": "Right\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Multiple Conditions",
      "prompt": "Read an integer. If it's > 0, print 'Positive'. If it's < 0, print 'Negative'. Else, print 'Zero'.",
      "starterCode": "# Use if, elif, and else to check the number\n",
      "solutionCode": "num = int(input())\nif num > 0:\n    print('Positive')\nelif num < 0:\n    print('Negative')\nelse:\n    print('Zero')",
      "testCases": [
        {
          "input": "5\n",
          "expectedOutput": "Positive\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Grade Calculator",
      "prompt": "Read a score (0-100). Print 'A' for >= 90, 'B' for >= 80, 'C' for >= 70, and 'F' for below 70.",
      "starterCode": "# Read score and print the grade\n",
      "solutionCode": "score = int(input())\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelif score >= 70:\n    print('C')\nelse:\n    print('F')",
      "testCases": [
        {
          "input": "85\n",
          "expectedOutput": "B\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Ticket Pricing",
      "prompt": "Read an age (int). Print 'Free' if age < 5, 'Half' if age is between 5 and 12 (inclusive), 'Full' if age is between 13 and 64 (inclusive), and 'Discount' if age >= 65.",
      "starterCode": "# Read age, apply pricing logic\n",
      "solutionCode": "age = int(input())\nif age < 5:\n    print('Free')\nelif age <= 12:\n    print('Half')\nelif age <= 64:\n    print('Full')\nelse:\n    print('Discount')",
      "testCases": [
        {
          "input": "10\n",
          "expectedOutput": "Half\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Menu Selection",
      "prompt": "Read a string representing a menu choice: '1', '2', or '3'. Print 'Burger' for 1, 'Pizza' for 2, 'Salad' for 3. For any other input, print 'Invalid choice'.",
      "starterCode": "# Read choice, use if-elif-else to print food\n",
      "solutionCode": "choice = input().strip()\nif choice == '1':\n    print('Burger')\nelif choice == '2':\n    print('Pizza')\nelif choice == '3':\n    print('Salad')\nelse:\n    print('Invalid choice')",
      "testCases": [
        {
          "input": "2\n",
          "expectedOutput": "Pizza\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Ticket Price",
      "prompt": "Read an age and print the ticket price: under 5 -> 0, 5-12 -> 10, 13-60 -> 20, over 60 -> 15. Print just the number.",
      "starterCode": "# Age-based ticket pricing\n",
      "solutionCode": "age = int(input())\nif age < 5:\n    print(0)\nelif age <= 12:\n    print(10)\nelif age <= 60:\n    print(20)\nelse:\n    print(15)",
      "testCases": [{ "input": "70\n", "expectedOutput": "15\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "nested-if": [
    {
      "title": "Age and ID Check",
      "prompt": "Given `age = 20` and `has_id = True`, use a nested `if`: if age >= 18, then check has_id — if True print 'Access granted', else print 'Show ID'; if age < 18 print 'Too young'.",
      "starterCode": "age = 20\nhas_id = True\n# Use a nested if\n",
      "solutionCode": "age = 20\nhas_id = True\nif age >= 18:\n    if has_id:\n        print('Access granted')\n    else:\n        print('Show ID')\nelse:\n    print('Too young')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Access granted\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 25
    },
    {
      "title": "Number Sign and Parity",
      "prompt": "Read an integer. If it is >= 0: print 'Non-negative', then if it is even print 'Even' else 'Odd'. If it is < 0: print 'Negative', then if divisible by 2 print 'Even' else 'Odd'.",
      "starterCode": "# Read a number and classify sign then parity\n",
      "solutionCode": "n = int(input())\nif n >= 0:\n    print('Non-negative')\n    if n % 2 == 0:\n        print('Even')\n    else:\n        print('Odd')\nelse:\n    print('Negative')\n    if n % 2 == 0:\n        print('Even')\n    else:\n        print('Odd')",
      "testCases": [
        {
          "input": "7\n",
          "expectedOutput": "Non-negative\nOdd\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Authenticated Action",
      "prompt": "Read `user`, `pass` (password), and `active` (yes/no) from input, one per line. If user == 'admin': if pass == 'secret': if active == 'yes' print 'Welcome', else print 'Inactive'; else print 'Bad password'. Else print 'Unknown user'.",
      "starterCode": "# Read credentials and active flag, use nested if\n",
      "solutionCode": "user = input()\npwd = input()\nactive = input()\nif user == 'admin':\n    if pwd == 'secret':\n        if active == 'yes':\n            print('Welcome')\n        else:\n            print('Inactive')\n    else:\n        print('Bad password')\nelse:\n    print('Unknown user')",
      "testCases": [
        {
          "input": "admin\nsecret\nyes\n",
          "expectedOutput": "Welcome\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Nested Conditions",
      "prompt": "Given `has_ticket = True` and `is_vip = False`. Write an `if` checking `has_ticket`. Inside it, write another `if` checking `is_vip`. If both are true, print 'VIP Access'. If they have a ticket but aren't VIP, print 'Regular Access'.",
      "starterCode": "has_ticket = True\nis_vip = False\n# Write nested if statements below\n",
      "solutionCode": "has_ticket = True\nis_vip = False\nif has_ticket:\n    if is_vip:\n        print('VIP Access')\n    else:\n        print('Regular Access')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Regular Access\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Authentication Check",
      "prompt": "Read `username` and `password`. If `username` is 'admin', check the `password`. If password is '1234', print 'Login Success'. If the password is wrong, print 'Wrong Password'. If the username is not 'admin', print 'Unknown User'.",
      "starterCode": "# Read username and password, use nested conditions\n",
      "solutionCode": "username = input().strip()\npassword = input().strip()\nif username == 'admin':\n    if password == '1234':\n        print('Login Success')\n    else:\n        print('Wrong Password')\nelse:\n    print('Unknown User')",
      "testCases": [
        {
          "input": "admin\n1234\n",
          "expectedOutput": "Login Success\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Discount Logic",
      "prompt": "Read `total_amount` (float) and `has_coupon` (string 'True'/'False'). If `total_amount` > 100, check `has_coupon`. If they have a coupon, print '20% Off'. If not, print '10% Off'. If `total_amount` is <= 100, print 'No Discount'.",
      "starterCode": "# Read inputs and print the correct discount string\n",
      "solutionCode": "total = float(input())\nhas_coupon = input().strip() == 'True'\nif total > 100:\n    if has_coupon:\n        print('20% Off')\n    else:\n        print('10% Off')\nelse:\n    print('No Discount')",
      "testCases": [
        {
          "input": "150\nTrue\n",
          "expectedOutput": "20% Off\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    }
  ,
    {
      "title": "Even and Positive",
      "prompt": "Read an integer. If it is positive, check parity: print Positive Even or Positive Odd. Otherwise print Not positive.",
      "starterCode": "# Nested conditionals\n",
      "solutionCode": "n = int(input())\nif n > 0:\n    if n % 2 == 0:\n        print('Positive Even')\n    else:\n        print('Positive Odd')\nelse:\n    print('Not positive')",
      "testCases": [{ "input": "14\n", "expectedOutput": "Positive Even\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "ternary-operator": [
    {
      "title": "One-Line Status",
      "prompt": "Given `age = 20`, use a ternary operator to set `status = 'adult' if age >= 18 else 'minor'`, then print status.",
      "starterCode": "age = 20\n# Use a ternary to set status\n",
      "solutionCode": "age = 20\nstatus = 'adult' if age >= 18 else 'minor'\nprint(status)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "adult\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Inline Parity",
      "prompt": "Read an integer and print 'even' if it is even, else 'odd', using a ternary inside a print statement.",
      "starterCode": "# Read a number and print even/odd via ternary\n",
      "solutionCode": "n = int(input())\nprint('even' if n % 2 == 0 else 'odd')",
      "testCases": [
        {
          "input": "8\n",
          "expectedOutput": "even\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 25
    },
    {
      "title": "Ternary in a Function",
      "prompt": "Define `classify(n)` that returns 'positive' if n > 0, 'zero' if n == 0, else 'negative' using a nested ternary. Read N integers and print each classification.",
      "starterCode": "# Define classify using a nested ternary\n",
      "solutionCode": "def classify(n):\n    return 'positive' if n > 0 else ('zero' if n == 0 else 'negative')\n\nn = int(input())\nfor _ in range(n):\n    print(classify(int(input())))",
      "testCases": [
        {
          "input": "3\n5\n0\n-2\n",
          "expectedOutput": "positive\nzero\nnegative\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Ternary Assignment",
      "prompt": "Given `score = 75`, use a conditional expression (ternary operator) to assign 'Pass' to `result` if `score >= 50`, else 'Fail'. Print `result`.",
      "starterCode": "score = 75\n# Assign 'Pass' or 'Fail' to result using a one-liner, then print result\n",
      "solutionCode": "score = 75\nresult = 'Pass' if score >= 50 else 'Fail'\nprint(result)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pass\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Inline Print",
      "prompt": "Read an integer. Use a ternary operator directly inside a `print()` function to output 'Even' if it's divisible by 2, else 'Odd'.",
      "starterCode": "# Read integer, print 'Even' or 'Odd' using a one-liner\n",
      "solutionCode": "num = int(input())\nprint('Even' if num % 2 == 0 else 'Odd')",
      "testCases": [
        {
          "input": "11\n",
          "expectedOutput": "Odd\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Status Toggle",
      "prompt": "Given `is_on = True`, use a ternary operator to toggle it. If `is_on` is True, assign it False, else assign it True. Print the new value.",
      "starterCode": "is_on = True\n# Toggle is_on using ternary operator, then print\n",
      "solutionCode": "is_on = True\nis_on = False if is_on else True\nprint(is_on)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "False\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Min of Two",
      "prompt": "Read two integers (one per line). Use a ternary expression to print the smaller one.",
      "starterCode": "# Ternary minimum\n",
      "solutionCode": "a = int(input())\nb = int(input())\nprint(a if a < b else b)",
      "testCases": [{ "input": "9\n4\n", "expectedOutput": "4\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "match-case": [
    {
      "title": "Command Dispatcher",
      "prompt": "Read a command string. Use a `match` statement: 'start' → 'Starting', 'stop' → 'Stopping', 'pause' → 'Paused', anything else → 'Unknown: CMD' (replace CMD with the input).",
      "starterCode": "# Read a command and match it\n",
      "solutionCode": "cmd = input()\nmatch cmd:\n    case 'start':\n        print('Starting')\n    case 'stop':\n        print('Stopping')\n    case 'pause':\n        print('Paused')\n    case _:\n        print(f'Unknown: {cmd}')",
      "testCases": [
        {
          "input": "stop\n",
          "expectedOutput": "Stopping\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 30
    },
    {
      "title": "Weekend Matcher",
      "prompt": "Read a day name. Use `match` with an OR pattern: 'saturday' | 'sunday' → 'Weekend', 'friday' → 'Friday', else → 'Weekday'.",
      "starterCode": "# Read a day and match weekend/weekday\n",
      "solutionCode": "day = input()\nmatch day:\n    case 'saturday' | 'sunday':\n        print('Weekend')\n    case 'friday':\n        print('Friday')\n    case _:\n        print('Weekday')",
      "testCases": [
        {
          "input": "sunday\n",
          "expectedOutput": "Weekend\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Point Destructuring",
      "prompt": "Read two integers x and y (one per line). Build the tuple `(x, y)` and `match` it: case (0, 0) → 'Origin'; case (x, 0) → 'On x-axis'; case (0, y) → 'On y-axis'; case (x, y) → 'Point (X, Y)'. Print the matched message.",
      "starterCode": "# Read x and y, match the point tuple\n",
      "solutionCode": "x = int(input())\ny = int(input())\nmatch (x, y):\n    case (0, 0):\n        print('Origin')\n    case (x, 0):\n        print('On x-axis')\n    case (0, y):\n        print('On y-axis')\n    case (x, y):\n        print(f'Point ({x}, {y})')",
      "testCases": [
        {
          "input": "0\n0\n",
          "expectedOutput": "Origin\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "HTTP Status Codes",
      "prompt": "Read an HTTP status code (integer). Use a `match` statement to print 'OK' for 200, 'Not Found' for 404, 'Server Error' for 500, and 'Unknown' for anything else.",
      "starterCode": "# Read code, use match-case to print message\n",
      "solutionCode": "code = int(input())\nmatch code:\n    case 200:\n        print('OK')\n    case 404:\n        print('Not Found')\n    case 500:\n        print('Server Error')\n    case _:\n        print('Unknown')",
      "testCases": [
        {
          "input": "404\n",
          "expectedOutput": "Not Found\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Command Parser",
      "prompt": "Read a command (string). Use `match` to parse it. 'start' -> 'Starting engine', 'stop' -> 'Stopping engine', 'pause' -> 'Pausing', anything else -> 'Invalid command'.",
      "starterCode": "# Read command, use match-case\n",
      "solutionCode": "cmd = input().strip()\nmatch cmd:\n    case 'start':\n        print('Starting engine')\n    case 'stop':\n        print('Stopping engine')\n    case 'pause':\n        print('Pausing')\n    case _:\n        print('Invalid command')",
      "testCases": [
        {
          "input": "start\n",
          "expectedOutput": "Starting engine\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Day of the Week",
      "prompt": "Read a number 1-7. Use match-case to print the day (1 = 'Monday', 7 = 'Sunday'). If outside 1-7, print 'Error'.",
      "starterCode": "# Match day numbers 1 to 7\n",
      "solutionCode": "day = int(input())\nmatch day:\n    case 1:\n        print('Monday')\n    case 2:\n        print('Tuesday')\n    case 3:\n        print('Wednesday')\n    case 4:\n        print('Thursday')\n    case 5:\n        print('Friday')\n    case 6:\n        print('Saturday')\n    case 7:\n        print('Sunday')\n    case _:\n        print('Error')",
      "testCases": [
        {
          "input": "3\n",
          "expectedOutput": "Wednesday\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Text-based Adventure",
      "prompt": "Read a room string ('cave', 'forest') and a tool string ('sword', 'torch'). Use nested `match` or `if` statements. If 'cave': if tool is 'torch' print 'You can see!', else print 'It is dark.' If 'forest': if tool is 'sword' print 'You cut through the brush', else print 'You are stuck.' Anything else print 'You are lost.'",
      "starterCode": "# Read room and tool, print the outcome\n",
      "solutionCode": "room = input().strip()\ntool = input().strip()\nif room == 'cave':\n    if tool == 'torch':\n        print('You can see!')\n    else:\n        print('It is dark.')\nelif room == 'forest':\n    if tool == 'sword':\n        print('You cut through the brush')\n    else:\n        print('You are stuck.')\nelse:\n    print('You are lost.')",
      "testCases": [
        {
          "input": "cave\ntorch\n",
          "expectedOutput": "You can see!\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Module Integration: Tax Bracket Calculator",
      "prompt": "Read `income` (float). Calculate and print the tax amount based on these brackets: 0% up to $10,000, 10% on amount over $10,000 up to $50,000, and 20% on amount over $50,000. (e.g. Income $60,000 -> 10k at 0%, 40k at 10% = 4k, 10k at 20% = 2k -> Total tax: 6000.0). Format exactly: 'Tax: $[tax_value]'",
      "starterCode": "# Read income, calculate progressive tax, print result\n",
      "solutionCode": "income = float(input())\ntax = 0.0\nif income > 50000:\n    tax += (income - 50000) * 0.20\n    income = 50000\nif income > 10000:\n    tax += (income - 10000) * 0.10\nprint(f'Tax: ${tax}')",
      "testCases": [
        {
          "input": "60000\n",
          "expectedOutput": "Tax: $6000.0\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    }
  ,
    {
      "title": "Day Type",
      "prompt": "Read a day number (1-7). Use match/case to print Weekday for 1-5 and Weekend for 6 or 7.",
      "starterCode": "# match/case day classifier\n",
      "solutionCode": "day = int(input())\nmatch day:\n    case 1 | 2 | 3 | 4 | 5:\n        print('Weekday')\n    case 6 | 7:\n        print('Weekend')",
      "testCases": [{ "input": "6\n", "expectedOutput": "Weekend\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ]
};
