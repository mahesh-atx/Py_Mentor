export const exercises: Record<string, any[]> = {
  "conditional-statements": [
    {
      title: "Check Even or Odd",
      prompt: "Write an `if/else` statement that checks if the variable `num` is even. If it is, print 'Even', otherwise print 'Odd'.",
      starterCode: "num = 7\n# Write your if/else statement below\n",
      solutionCode: "num = 7\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
      testCases: [{ input: "", expectedOutput: "Odd\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Positive or Negative",
      prompt: "Given `x = -3`, write an `if/else` that prints 'Positive' if x > 0, otherwise 'Non-positive'.",
      starterCode: "x = -3\n# Write your if/else statement below\n",
      solutionCode: "x = -3\nif x > 0:\n    print('Positive')\nelse:\n    print('Non-positive')",
      testCases: [{ input: "", expectedOutput: "Non-positive\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Login Gate",
      prompt: "Read `username` and `password` from input (one per line). If username is 'admin' AND password is 'secret', print 'Access granted', otherwise print 'Access denied'.",
      starterCode: "# Read username and password, check credentials\n",
      solutionCode: "username = input()\npassword = input()\nif username == 'admin' and password == 'secret':\n    print('Access granted')\nelse:\n    print('Access denied')",
      testCases: [
        { input: "admin\nsecret\n", expectedOutput: "Access granted\n" },
        { input: "admin\nwrong\n", expectedOutput: "Access denied\n" }
      ],
      difficulty: "intermediate",
      xpReward: 30
    }
  ],

  "if-elif-else": [
    {
      title: "Grade the Score",
      prompt: "Given `score = 85`, write an `if`, `elif`, `else` block: if score >= 90 print 'A', elif score >= 80 print 'B', else print 'C'.",
      starterCode: "score = 85\n# Write your if/elif/else block\n",
      solutionCode: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
      testCases: [{ input: "", expectedOutput: "B\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Day Type",
      prompt: "Read a day name from input (lowercased). Print 'Weekend' if it is 'saturday' or 'sunday', 'Friday' if 'friday', else 'Weekday'.",
      starterCode: "# Read a day and classify it\n",
      solutionCode: "day = input()\nif day == 'saturday' or day == 'sunday':\n    print('Weekend')\nelif day == 'friday':\n    print('Friday')\nelse:\n    print('Weekday')",
      testCases: [
        { input: "sunday\n", expectedOutput: "Weekend\n" },
        { input: "wednesday\n", expectedOutput: "Weekday\n" }
      ],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Number to Words (1-99)",
      prompt: "Write a program that reads a number from 1 to 99 and prints it in English words. E.g., 23 → 'twenty-three'. Validate the range first. (Input: 23 → Output: twenty-three)",
      starterCode: "# Read a number 1-99 and convert to words\n",
      solutionCode: "num = int(input())\nif num < 1 or num > 99:\n    print('Out of range')\nelse:\n    ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',\n            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',\n            'seventeen', 'eighteen', 'nineteen']\n    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']\n    if num < 20:\n        print(ones[num])\n    else:\n        t = num // 10\n        o = num % 10\n        if o == 0:\n            print(tens[t])\n        else:\n            print(f'{tens[t]}-{ones[o]}')",
      testCases: [
        { input: "23\n", expectedOutput: "twenty-three\n" },
        { input: "5\n", expectedOutput: "five\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    },
    {
      title: "Valid Triangle Checker",
      prompt: "Read three angle values (floats) as input, one per line. Check if they can form a valid triangle. A triangle is valid if all angles are positive and their sum is 180. Also check if it is 'Right', 'Obtuse', or 'Acute'. Print the type of triangle. (Input: 90, 45, 45 → Output: Right)",
      starterCode: "# Read three angles and determine triangle type and validity\n",
      solutionCode: "a = float(input())\nb = float(input())\nc = float(input())\nif a <= 0 or b <= 0 or c <= 0 or (a + b + c) != 180:\n    print('Invalid')\nelse:\n    if a == 90 or b == 90 or c == 90:\n        print('Right')\n    elif a > 90 or b > 90 or c > 90:\n        print('Obtuse')\n    else:\n        print('Acute')",
      testCases: [
        { input: "90\n45\n45\n", expectedOutput: "Right\n" },
        { input: "60\n60\n60\n", expectedOutput: "Acute\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],

  "nested-if": [
    {
      title: "Age and ID Check",
      prompt: "Given `age = 20` and `has_id = True`, use a nested `if`: if age >= 18, then check has_id — if True print 'Access granted', else print 'Show ID'; if age < 18 print 'Too young'.",
      starterCode: "age = 20\nhas_id = True\n# Use a nested if\n",
      solutionCode: "age = 20\nhas_id = True\nif age >= 18:\n    if has_id:\n        print('Access granted')\n    else:\n        print('Show ID')\nelse:\n    print('Too young')",
      testCases: [{ input: "", expectedOutput: "Access granted\n" }],
      difficulty: "beginner",
      xpReward: 25
    },
    {
      title: "Number Sign and Parity",
      prompt: "Read an integer. If it is >= 0: print 'Non-negative', then if it is even print 'Even' else 'Odd'. If it is < 0: print 'Negative', then if divisible by 2 print 'Even' else 'Odd'.",
      starterCode: "# Read a number and classify sign then parity\n",
      solutionCode: "n = int(input())\nif n >= 0:\n    print('Non-negative')\n    if n % 2 == 0:\n        print('Even')\n    else:\n        print('Odd')\nelse:\n    print('Negative')\n    if n % 2 == 0:\n        print('Even')\n    else:\n        print('Odd')",
      testCases: [
        { input: "7\n", expectedOutput: "Non-negative\nOdd\n" },
        { input: "-4\n", expectedOutput: "Negative\nEven\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Authenticated Action",
      prompt: "Read `user`, `pass` (password), and `active` (yes/no) from input, one per line. If user == 'admin': if pass == 'secret': if active == 'yes' print 'Welcome', else print 'Inactive'; else print 'Bad password'. Else print 'Unknown user'.",
      starterCode: "# Read credentials and active flag, use nested if\n",
      solutionCode: "user = input()\npwd = input()\nactive = input()\nif user == 'admin':\n    if pwd == 'secret':\n        if active == 'yes':\n            print('Welcome')\n        else:\n            print('Inactive')\n    else:\n        print('Bad password')\nelse:\n    print('Unknown user')",
      testCases: [
        { input: "admin\nsecret\nyes\n", expectedOutput: "Welcome\n" },
        { input: "admin\nsecret\nno\n", expectedOutput: "Inactive\n" },
        { input: "guest\nx\nyes\n", expectedOutput: "Unknown user\n" }
      ],
      difficulty: "advanced",
      xpReward: 60
    }
  ],

  "ternary-operator": [
    {
      title: "One-Line Status",
      prompt: "Given `age = 20`, use a ternary operator to set `status = 'adult' if age >= 18 else 'minor'`, then print status.",
      starterCode: "age = 20\n# Use a ternary to set status\n",
      solutionCode: "age = 20\nstatus = 'adult' if age >= 18 else 'minor'\nprint(status)",
      testCases: [{ input: "", expectedOutput: "adult\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Inline Parity",
      prompt: "Read an integer and print 'even' if it is even, else 'odd', using a ternary inside a print statement.",
      starterCode: "# Read a number and print even/odd via ternary\n",
      solutionCode: "n = int(input())\nprint('even' if n % 2 == 0 else 'odd')",
      testCases: [
        { input: "8\n", expectedOutput: "even\n" },
        { input: "3\n", expectedOutput: "odd\n" }
      ],
      difficulty: "beginner",
      xpReward: 25
    },
    {
      title: "Ternary in a Function",
      prompt: "Define `classify(n)` that returns 'positive' if n > 0, 'zero' if n == 0, else 'negative' using a nested ternary. Read N integers and print each classification.",
      starterCode: "# Define classify using a nested ternary\n",
      solutionCode: "def classify(n):\n    return 'positive' if n > 0 else ('zero' if n == 0 else 'negative')\n\nn = int(input())\nfor _ in range(n):\n    print(classify(int(input())))",
      testCases: [
        { input: "3\n5\n0\n-2\n", expectedOutput: "positive\nzero\nnegative\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    }
  ],

  "match-case": [
    {
      title: "Command Dispatcher",
      prompt: "Read a command string. Use a `match` statement: 'start' → 'Starting', 'stop' → 'Stopping', 'pause' → 'Paused', anything else → 'Unknown: CMD' (replace CMD with the input).",
      starterCode: "# Read a command and match it\n",
      solutionCode: "cmd = input()\nmatch cmd:\n    case 'start':\n        print('Starting')\n    case 'stop':\n        print('Stopping')\n    case 'pause':\n        print('Paused')\n    case _:\n        print(f'Unknown: {cmd}')",
      testCases: [
        { input: "stop\n", expectedOutput: "Stopping\n" },
        { input: "rocket\n", expectedOutput: "Unknown: rocket\n" }
      ],
      difficulty: "beginner",
      xpReward: 30
    },
    {
      title: "Weekend Matcher",
      prompt: "Read a day name. Use `match` with an OR pattern: 'saturday' | 'sunday' → 'Weekend', 'friday' → 'Friday', else → 'Weekday'.",
      starterCode: "# Read a day and match weekend/weekday\n",
      solutionCode: "day = input()\nmatch day:\n    case 'saturday' | 'sunday':\n        print('Weekend')\n    case 'friday':\n        print('Friday')\n    case _:\n        print('Weekday')",
      testCases: [
        { input: "sunday\n", expectedOutput: "Weekend\n" },
        { input: "monday\n", expectedOutput: "Weekday\n" }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Point Destructuring",
      prompt: "Read two integers x and y (one per line). Build the tuple `(x, y)` and `match` it: case (0, 0) → 'Origin'; case (x, 0) → 'On x-axis'; case (0, y) → 'On y-axis'; case (x, y) → 'Point (X, Y)'. Print the matched message.",
      starterCode: "# Read x and y, match the point tuple\n",
      solutionCode: "x = int(input())\ny = int(input())\nmatch (x, y):\n    case (0, 0):\n        print('Origin')\n    case (x, 0):\n        print('On x-axis')\n    case (0, y):\n        print('On y-axis')\n    case (x, y):\n        print(f'Point ({x}, {y})')",
      testCases: [
        { input: "0\n0\n", expectedOutput: "Origin\n" },
        { input: "3\n4\n", expectedOutput: "Point (3, 4)\n" },
        { input: "0\n5\n", expectedOutput: "On y-axis\n" }
      ],
      difficulty: "advanced",
      xpReward: 60
    }
  ]
};
