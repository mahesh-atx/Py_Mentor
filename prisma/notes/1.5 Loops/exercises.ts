export const exercises: Record<string, any[]> = {
  "while-loop": [
    {
      "title": "Count Down",
      "prompt": "Use a `while` loop to print numbers from 3 down to 1 (inclusive), one per line.",
      "starterCode": "count = 3\n# Write your while loop here\n",
      "solutionCode": "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n2\n1\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Sum with While Loop",
      "prompt": "Use a `while` loop to add the numbers 1 through 5 to a variable `total`. Print `total` at the end.",
      "starterCode": "total = 0\ni = 1\n# Write your while loop to calculate the total\n\nprint(total)",
      "solutionCode": "total = 0\ni = 1\nwhile i <= 5:\n    total += i\n    i += 1\nprint(total)",
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
      "title": "Sum of Digits",
      "prompt": "Write a program that reads a positive integer and calculates the sum of its digits using a while loop. (Input: 1234 → Output: 10)",
      "starterCode": "# Read a number and sum its digits using while loop\n",
      "solutionCode": "num = int(input())\nif num <= 0:\n    print('Invalid')\nelse:\n    total = 0\n    while num > 0:\n        total += num % 10\n        num //= 10\n    print(total)",
      "testCases": [
        {
          "input": "1234\n",
          "expectedOutput": "10\n"
        },
        {
          "input": "0\n",
          "expectedOutput": "Invalid\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Reverse a Number",
      "prompt": "Write a program that reads a positive integer, reverses its digits using a while loop, and prints the reversed number. (Input: 1234 → Output: 4321)",
      "starterCode": "# Read a number and reverse its digits\n",
      "solutionCode": "num = int(input())\nreversed_num = 0\nwhile num > 0:\n    digit = num % 10\n    reversed_num = reversed_num * 10 + digit\n    num //= 10\nprint(reversed_num)",
      "testCases": [
        {
          "input": "1234\n",
          "expectedOutput": "4321\n"
        },
        {
          "input": "100\n",
          "expectedOutput": "1\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Basic While Loop",
      "prompt": "Write a `while` loop that prints the numbers from 1 to 3 (inclusive), each on a new line.",
      "starterCode": "count = 1\n# Write your while loop here\n",
      "solutionCode": "count = 1\nwhile count <= 3:\n    print(count)\n    count += 1",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Blastoff Countdown",
      "prompt": "Given `t = 5`, use a `while` loop to print a countdown from 5 to 1. After the loop, print 'Blastoff!'.",
      "starterCode": "t = 5\n# Write the countdown loop\n",
      "solutionCode": "t = 5\nwhile t > 0:\n    print(t)\n    t -= 1\nprint('Blastoff!')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "5\n4\n3\n2\n1\nBlastoff!\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Input Validation Loop",
      "prompt": "Write a `while` loop that repeatedly reads input using `input()`. If the input is 'yes', print 'Confirmed' and stop the loop. (The test provides 'no', 'maybe', 'yes').",
      "starterCode": "# Read input in a loop until it is 'yes'\n",
      "solutionCode": "while True:\n    ans = input().strip()\n    if ans == 'yes':\n        print('Confirmed')\n        break",
      "testCases": [
        {
          "input": "no\nmaybe\nyes\n",
          "expectedOutput": "Confirmed\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "ATM Pin Entry",
      "prompt": "Set the correct pin to '1234'. Create a loop that reads a pin using `input()`. The user has a maximum of 3 tries. If correct, print 'Access Granted' and exit. If wrong, print 'Wrong Pin'. If they fail 3 times, print 'Locked Out'. (Test provides: '0000', '1111', '1234')",
      "starterCode": "# Write the ATM pin simulation\n",
      "solutionCode": "correct = '1234'\ntries = 0\nwhile tries < 3:\n    pin = input().strip()\n    if pin == correct:\n        print('Access Granted')\n        break\n    else:\n        print('Wrong Pin')\n        tries += 1\nif tries == 3:\n    print('Locked Out')",
      "testCases": [
        {
          "input": "0000\n1111\n1234\n",
          "expectedOutput": "Wrong Pin\nWrong Pin\nAccess Granted\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 60
    }
  ],
  "for-loop": [
    {
      "title": "Iterate a List",
      "prompt": "Given `fruits = ['apple', 'banana']`, use a `for` loop to print each fruit.",
      "starterCode": "fruits = ['apple', 'banana']\n# Write your for loop here\n",
      "solutionCode": "fruits = ['apple', 'banana']\nfor f in fruits:\n    print(f)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "apple\nbanana\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Sum a List",
      "prompt": "Given `numbers = [10, 20, 30]`, use a `for` loop to calculate their sum and store it in `total`. Print `total`.",
      "starterCode": "numbers = [10, 20, 30]\ntotal = 0\n# Write your for loop here\n\nprint(total)",
      "solutionCode": "numbers = [10, 20, 30]\ntotal = 0\nfor num in numbers:\n    total += num\nprint(total)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "60\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Factorial Calculator",
      "prompt": "Write a program that reads a non-negative integer and calculates its factorial using a for loop. If the number is negative, print 'Invalid'. 0! = 1. (Input: 5 → Output: 120)",
      "starterCode": "# Read a number, calculate its factorial\n",
      "solutionCode": "num = int(input())\nif num < 0:\n    print('Invalid')\nelse:\n    factorial = 1\n    for i in range(1, num + 1):\n        factorial *= i\n    print(factorial)",
      "testCases": [
        {
          "input": "5\n",
          "expectedOutput": "120\n"
        },
        {
          "input": "0\n",
          "expectedOutput": "1\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "FizzBuzz",
      "prompt": "Write a program that prints numbers from 1 to 20. But for multiples of 3 print 'Fizz' instead of the number, for multiples of 5 print 'Buzz', and for multiples of both 3 and 5 print 'FizzBuzz'. One per line. (Input: none → Output: 1, 2, Fizz, ... 20 with appropriate rules)",
      "starterCode": "# Print FizzBuzz for numbers 1 to 20\n",
      "solutionCode": "for i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 90
    },
    {
      "title": "Iterate over a String",
      "prompt": "Use a `for` loop to iterate over the string `word = 'Python'` and print each character on a new line.",
      "starterCode": "word = 'Python'\n# Write your for loop below\n",
      "solutionCode": "word = 'Python'\nfor char in word:\n    print(char)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "P\ny\nt\nh\no\nn\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Vowel Counter",
      "prompt": "Read a string using `input()`. Use a `for` loop to count how many vowels (a, e, i, o, u - lowercase only for simplicity) are in the string. Print the final count.",
      "starterCode": "# Read a string, count its lowercase vowels, and print the count\n",
      "solutionCode": "text = input()\nvowels = 'aeiou'\ncount = 0\nfor char in text:\n    if char in vowels:\n        count += 1\nprint(count)",
      "testCases": [
        {
          "input": "hello world\n",
          "expectedOutput": "3\n"
        },
        {
          "input": "sky\n",
          "expectedOutput": "0\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Sum a Sequence",
      "prompt": "Given a list `nums = [10, 20, 30, 40]`, use a `for` loop to calculate the sum of all elements. Print the total.",
      "starterCode": "nums = [10, 20, 30, 40]\n# Sum the numbers and print the total\n",
      "solutionCode": "nums = [10, 20, 30, 40]\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "100\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Iterate over a List",
      "prompt": "Given `fruits = ['apple', 'banana', 'cherry']`. Use a `for` loop to print each fruit prefixed with 'I like ': e.g., 'I like apple'.",
      "starterCode": "fruits = ['apple', 'banana', 'cherry']\n# Print 'I like [fruit]'\n",
      "solutionCode": "fruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(f'I like {fruit}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "I like apple\nI like banana\nI like cherry\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "range-function": [
    {
      "title": "Using Range",
      "prompt": "Use a `for` loop and the `range()` function to print the numbers 0, 1, and 2.",
      "starterCode": "# Use for loop and range()\n",
      "solutionCode": "for i in range(3):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "0\n1\n2\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Range with Step",
      "prompt": "Use `range()` to print all EVEN numbers from 2 to 10 (inclusive) using a step value of 2.",
      "starterCode": "# Use range(start, stop, step) to print evens\n",
      "solutionCode": "for i in range(2, 11, 2):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n4\n6\n8\n10\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Multiplication Table",
      "prompt": "Write a program that reads an integer and prints its multiplication table from 1 to 10. Each line should be like '5 x 3 = 15'. (Input: 5 → Output: 5 x 1 = 5, 5 x 2 = 10, ... 5 x 10 = 50)",
      "starterCode": "# Read a number and print its multiplication table\n",
      "solutionCode": "num = int(input())\nfor i in range(1, 11):\n    print(f'{num} x {i} = {num * i}')",
      "testCases": [
        {
          "input": "5\n",
          "expectedOutput": "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Armstrong Number Checker",
      "prompt": "A 3-digit Armstrong number is one where the sum of cubes of its digits equals the number itself (e.g., 153 = 1^3 + 5^3 + 3^3). Write a program that reads a 3-digit number and prints 'Armstrong' or 'Not Armstrong'. Validate that it's a 3-digit number. (Input: 153 → Output: Armstrong)",
      "starterCode": "# Read a 3-digit number and check if Armstrong\n",
      "solutionCode": "num = int(input())\nif num < 100 or num > 999:\n    print('Not a 3-digit number')\nelse:\n    original = num\n    total = 0\n    while num > 0:\n        digit = num % 10\n        total += digit ** 3\n        num //= 10\n    if total == original:\n        print('Armstrong')\n    else:\n        print('Not Armstrong')",
      "testCases": [
        {
          "input": "153\n",
          "expectedOutput": "Armstrong\n"
        },
        {
          "input": "123\n",
          "expectedOutput": "Not Armstrong\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Simple Range",
      "prompt": "Use `for i in range(5):` to print the numbers 0 through 4.",
      "starterCode": "# Use range(5) in a for loop\n",
      "solutionCode": "for i in range(5):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "0\n1\n2\n3\n4\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Range with Start and Stop",
      "prompt": "Use a `for` loop and `range(10, 15)` to print the numbers from 10 to 14.",
      "starterCode": "# Print numbers from 10 to 14\n",
      "solutionCode": "for i in range(10, 15):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n11\n12\n13\n14\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Range with Step (Evens)",
      "prompt": "Use `range(2, 11, 2)` to print all even numbers from 2 up to 10.",
      "starterCode": "# Print even numbers using range step\n",
      "solutionCode": "for i in range(2, 11, 2):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n4\n6\n8\n10\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Reverse Range",
      "prompt": "Use `range(5, 0, -1)` to print a countdown from 5 to 1.",
      "starterCode": "# Use range to print 5, 4, 3, 2, 1\n",
      "solutionCode": "for i in range(5, 0, -1):\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "5\n4\n3\n2\n1\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "loop-control-statements": [
    {
      "title": "Break the Loop",
      "prompt": "Write a `for` loop from 1 to 5 using `range(1, 6)`. Print the number, but `break` the loop when the number equals 3.",
      "starterCode": "# Write your loop with a break statement\n",
      "solutionCode": "for i in range(1, 6):\n    print(i)\n    if i == 3:\n        break",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Continue the Loop",
      "prompt": "Write a `for` loop from 1 to 5 using `range(1, 6)`. Use `continue` to SKIP the number 3. Print all other numbers.",
      "starterCode": "# Write your loop with a continue statement\n",
      "solutionCode": "for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n4\n5\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Prime Number Checker",
      "prompt": "Write a program that reads an integer and checks if it is a prime number (greater than 1 and divisible only by 1 and itself). Use a loop with break. Print 'Prime' or 'Not Prime'. (Input: 17 → Output: Prime)",
      "starterCode": "# Read a number, check if prime using loops and break\n",
      "solutionCode": "num = int(input())\nif num <= 1:\n    print('Not Prime')\nelse:\n    is_prime = True\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            is_prime = False\n            break\n    print('Prime' if is_prime else 'Not Prime')",
      "testCases": [
        {
          "input": "17\n",
          "expectedOutput": "Prime\n"
        },
        {
          "input": "1\n",
          "expectedOutput": "Not Prime\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 95
    },
    {
      "title": "Break the Loop",
      "prompt": "Write a loop from `i = 1` to `10`. If `i` equals `5`, use `break` to exit the loop immediately. Print `i` in the loop before the break check.",
      "starterCode": "# Loop 1 to 10, print i, break if i == 5\n",
      "solutionCode": "for i in range(1, 11):\n    print(i)\n    if i == 5:\n        break",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n3\n4\n5\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Skip with Continue",
      "prompt": "Loop through `range(1, 6)`. If the number is `3`, use `continue` to skip printing it. Print the other numbers.",
      "starterCode": "# Loop 1 to 5, skip printing 3\n",
      "solutionCode": "for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n4\n5\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Find the Target",
      "prompt": "Given `items = ['apple', 'rock', 'banana', 'rock', 'cherry']`. Loop through it. If you find 'banana', print 'Found it!' and `break`. If you find 'rock', `continue` without printing.",
      "starterCode": "items = ['apple', 'rock', 'banana', 'rock', 'cherry']\n# Implement the search logic\n",
      "solutionCode": "items = ['apple', 'rock', 'banana', 'rock', 'cherry']\nfor item in items:\n    if item == 'rock':\n        continue\n    if item == 'banana':\n        print('Found it!')\n        break",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Found it!\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ],
  "nested-loops": [
    {
      "title": "Matrix Printing",
      "prompt": "Given `matrix = [[1, 2], [3, 4]]`, use nested `for` loops to print each number on a new line.",
      "starterCode": "matrix = [[1, 2], [3, 4]]\n# Write your nested loops\n",
      "solutionCode": "matrix = [[1, 2], [3, 4]]\nfor row in matrix:\n    for num in row:\n        print(num)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n2\n3\n4\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Prime Number Finder",
      "prompt": "Write a program using nested loops to find and print all prime numbers between 2 and 10 (inclusive). A prime number is only divisible by 1 and itself.",
      "starterCode": "# Use nested loops to find and print primes between 2 and 10\n",
      "solutionCode": "for num in range(2, 11):\n    is_prime = True\n    for i in range(2, num):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n3\n5\n7\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    },
    {
      "title": "Find Maximum",
      "prompt": "Write a program that reads a line of space-separated integers and finds the maximum value without using the built-in max() function. Use a loop. (Input: '10 45 23 78 12' → Output: 78)",
      "starterCode": "# Read numbers, find the maximum using loops\n",
      "solutionCode": "nums = list(map(int, input().split()))\nif not nums:\n    print('Empty')\nelse:\n    max_val = nums[0]\n    for num in nums:\n        if num > max_val:\n            max_val = num\n    print(max_val)",
      "testCases": [
        {
          "input": "10 45 23 78 12\n",
          "expectedOutput": "78\n"
        },
        {
          "input": "-5 -2 -10\n",
          "expectedOutput": "-2\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Check Palindrome",
      "prompt": "Write a program that reads a string and checks if it is a palindrome (same forwards and backwards). Use a loop to compare characters. Print 'Palindrome' or 'Not Palindrome'. Ignore case. (Input: 'racecar' → Output: Palindrome)",
      "starterCode": "# Read a string, check if palindrome using a loop\n",
      "solutionCode": "s = input().lower()\nis_pal = True\nfor i in range(len(s) // 2):\n    if s[i] != s[len(s) - 1 - i]:\n        is_pal = False\n        break\nprint('Palindrome' if is_pal else 'Not Palindrome')",
      "testCases": [
        {
          "input": "racecar\n",
          "expectedOutput": "Palindrome\n"
        },
        {
          "input": "hello\n",
          "expectedOutput": "Not Palindrome\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Print a Grid Coordinates",
      "prompt": "Write a nested `for` loop. The outer loop `x` goes from 1 to 2. The inner loop `y` goes from 1 to 3. Print the string `f'({x},{y})'` inside the inner loop.",
      "starterCode": "# Write nested loops for x (1-2) and y (1-3)\n",
      "solutionCode": "for x in range(1, 3):\n    for y in range(1, 4):\n        print(f'({x},{y})')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "(1,1)\n(1,2)\n(1,3)\n(2,1)\n(2,2)\n(2,3)\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Multiplication Table",
      "prompt": "Print the 2 and 3 multiplication tables from 1 to 3. E.g., '2 x 1 = 2', '2 x 2 = 4', etc. The outer loop should be the base (2, 3), inner is the multiplier (1, 2, 3).",
      "starterCode": "# Use nested loops to print tables for 2 and 3\n",
      "solutionCode": "for base in range(2, 4):\n    for mult in range(1, 4):\n        print(f'{base} x {mult} = {base * mult}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 50
    }
  ],
  "pattern-printing": [
    {
      "title": "Square Pattern",
      "prompt": "Use a loop to print a 2x2 square of asterisks (*). It should output two lines, each with two asterisks.",
      "starterCode": "# Print a 2x2 star square\n",
      "solutionCode": "for i in range(2):\n    print('**')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "**\n**\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Triangle Pattern",
      "prompt": "Use a loop to print a right triangle of stars:\n*\n**\n***",
      "starterCode": "# Print a triangle with 1, 2, and 3 stars\n",
      "solutionCode": "for i in range(1, 4):\n    print('*' * i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "*\n**\n***\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Floyd's Triangle",
      "prompt": "Write a program that reads the number of rows (n) and prints Floyd's Triangle. Each row has consecutive natural numbers. For n=4:\n1\n2 3\n4 5 6\n7 8 9 10",
      "starterCode": "# Read rows and print Floyd's Triangle\n",
      "solutionCode": "rows = int(input())\nnum = 1\nfor i in range(1, rows + 1):\n    line = ''\n    for j in range(i):\n        line += str(num) + ' '\n        num += 1\n    print(line.strip())",
      "testCases": [
        {
          "input": "4\n",
          "expectedOutput": "1\n2 3\n4 5 6\n7 8 9 10\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Pascal's Triangle",
      "prompt": "Write a program that reads the number of rows (n) and prints Pascal's Triangle. For n=5:\n    1\n   1 1\n  1 2 1\n 1 3 3 1\n1 4 6 4 1",
      "starterCode": "# Read rows and print Pascal's Triangle\n",
      "solutionCode": "rows = int(input())\nfor i in range(rows):\n    print(' ' * (rows - i), end='')\n    val = 1\n    for j in range(i + 1):\n        print(val, end=' ')\n        val = val * (i - j) // (j + 1)\n    print()",
      "testCases": [
        {
          "input": "5\n",
          "expectedOutput": "     1 \n    1 1 \n   1 2 1 \n  1 3 3 1 \n 1 4 6 4 1 \n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    },
    {
      "title": "Right Triangle",
      "prompt": "Use a `for` loop and string multiplication to print a right triangle of stars (`*`). The triangle should have 4 rows. Row 1 has 1 star, Row 4 has 4 stars.",
      "starterCode": "# Print a 4-row right triangle of stars\n",
      "solutionCode": "for i in range(1, 5):\n    print('*' * i)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "*\n**\n***\n****\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Square Box",
      "prompt": "Write a nested loop to print a 3x3 square of hashes (`#`). The outer loop runs 3 times, the inner loop runs 3 times printing a hash without a newline (`print('#', end='')`). Print an empty line at the end of the outer loop.",
      "starterCode": "# Print a 3x3 box of #\n",
      "solutionCode": "for row in range(3):\n    for col in range(3):\n        print('#', end='')\n    print()",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "###\n###\n###\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 50
    },
    {
      "title": "Module Integration: Prime Number Finder",
      "prompt": "Read an integer `max_num`. Use nested loops to find and print all prime numbers between 2 and `max_num` (inclusive). (A prime number is only divisible by 1 and itself). (Input: 10 → Output: 2\\n3\\n5\\n7)",
      "starterCode": "# Read max_num, find and print primes up to max_num\n",
      "solutionCode": "max_num = int(input())\nfor num in range(2, max_num + 1):\n    is_prime = True\n    for i in range(2, num):\n        if num % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(num)",
      "testCases": [
        {
          "input": "10\n",
          "expectedOutput": "2\n3\n5\n7\n"
        },
        {
          "input": "20\n",
          "expectedOutput": "2\n3\n5\n7\n11\n13\n17\n19\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    },
    {
      "title": "Module Integration: Interactive Menu Loop",
      "prompt": "Create an infinite `while` loop that reads commands. If 'hello', print 'Hi there'. If 'status', print 'All good'. If 'quit', print 'Goodbye' and `break`. For anything else, print 'Unknown'.",
      "starterCode": "# Write an interactive loop matching commands\n",
      "solutionCode": "while True:\n    cmd = input().strip()\n    if cmd == 'hello':\n        print('Hi there')\n    elif cmd == 'status':\n        print('All good')\n    elif cmd == 'quit':\n        print('Goodbye')\n        break\n    else:\n        print('Unknown')",
      "testCases": [
        {
          "input": "hello\ntest\nstatus\nquit\n",
          "expectedOutput": "Hi there\nUnknown\nAll good\nGoodbye\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    }
  ]
};
