export const exercises: Record<string, any[]> = {
  "arithmetic-operators": [
    {
      "title": "Basic Math",
      "prompt": "Print the result of 15 modulus 4 (15 % 4).",
      "starterCode": "# Print 15 modulo 4\n",
      "solutionCode": "print(15 % 4)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Area of a Circle",
      "prompt": "Given `pi = 3.14` and `r = 5`, calculate the area of a circle (`pi * r^2`) using the exponentiation operator `**`. Print the result.",
      "starterCode": "pi = 3.14\nr = 5\n# Calculate and print the area\n",
      "solutionCode": "pi = 3.14\nr = 5\nprint(pi * (r ** 2))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "78.5\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Simple Calculator",
      "prompt": "Write a program that takes two numbers and an operator (+, -, *, /) as input and performs the operation. If the operator is '/' and the second number is 0, print 'Cannot divide by zero'. Use float() for inputs. (Input: 10, +, 5 → Output: 15.0)",
      "starterCode": "# Read two numbers and an operator, perform the operation\n",
      "solutionCode": "num1 = float(input())\nop = input().strip()\nnum2 = float(input())\nif op == '+':\n    print(num1 + num2)\nelif op == '-':\n    print(num1 - num2)\nelif op == '*':\n    print(num1 * num2)\nelif op == '/':\n    if num2 == 0:\n        print('Cannot divide by zero')\n    else:\n        print(num1 / num2)",
      "testCases": [
        {
          "input": "10\n+\n5\n",
          "expectedOutput": "15.0\n"
        },
        {
          "input": "8\n/\n0\n",
          "expectedOutput": "Cannot divide by zero\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "Floor Division vs Standard Division",
      "prompt": "Given `x = 20` and `y = 3`. Print the standard division of x by y, followed by the floor division (`//`) of x by y on a new line.",
      "starterCode": "x = 20\ny = 3\n# Print standard division, then floor division\n",
      "solutionCode": "x = 20\ny = 3\nprint(x / y)\nprint(x // y)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "6.666666666666667\n6\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Extracting Digits with Modulo",
      "prompt": "Given a 3-digit number `num = 482`, extract and print the last digit using the modulo operator.",
      "starterCode": "num = 482\n# Use % to print the last digit\n",
      "solutionCode": "num = 482\nprint(num % 10)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "assignment-operators": [
    {
      "title": "Add and Assign",
      "prompt": "Given `x = 10`, use the `+=` operator to add 5 to `x`, then print `x`.",
      "starterCode": "x = 10\n# Use += to add 5, then print x\n",
      "solutionCode": "x = 10\nx += 5\nprint(x)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "15\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Multiply and Assign",
      "prompt": "Given `savings = 100`, use the `*=` operator to multiply it by 2 (doubling it). Then print `savings`.",
      "starterCode": "savings = 100\n# Double the savings using *=, then print\n",
      "solutionCode": "savings = 100\nsavings *= 2\nprint(savings)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "200\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Discount Calculator",
      "prompt": "A store offers a discount. Read the original price and discount percentage as inputs. Calculate the final price after discount using assignment operators. If the discount percentage is 0 or negative, print 'Invalid discount'. (Input: 100, 20 → Output: 80.0)",
      "starterCode": "# Read price and discount, calculate final price\n",
      "solutionCode": "price = float(input())\ndiscount = float(input())\nif discount <= 0:\n    print('Invalid discount')\nelse:\n    discount_amount = price * (discount / 100)\n    price -= discount_amount\n    print(price)",
      "testCases": [
        {
          "input": "100\n20\n",
          "expectedOutput": "80.0\n"
        },
        {
          "input": "50\n0\n",
          "expectedOutput": "Invalid discount\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 60
    },
    {
      "title": "Chaining Assignments",
      "prompt": "Start with `score = 50`. Simulate finding an item by adding 10 (`+=`), then hitting a trap which halves your score (`/=` or `//=`). Print the final score as an integer.",
      "starterCode": "score = 50\n# Add 10, then divide by 2 using assignment operators. Print result as int\n",
      "solutionCode": "score = 50\nscore += 10\nscore //= 2\nprint(score)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "30\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "comparison-operators": [
    {
      "title": "Compare Numbers",
      "prompt": "Print the boolean result of checking if 100 is greater than or equal to 100.",
      "starterCode": "# Print if 100 is >= 100\n",
      "solutionCode": "print(100 >= 100)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Check Equality",
      "prompt": "Print the boolean result of checking if the string 'Apple' is equal to the string 'apple' (case-sensitive!).",
      "starterCode": "# Print if 'Apple' == 'apple'\n",
      "solutionCode": "print('Apple' == 'apple')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "False\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "BMI Calculator",
      "prompt": "Write a program that reads weight (kg) and height (m) as inputs, calculates BMI, and prints the category: 'Underweight' (<18.5), 'Normal' (18.5-24.9), 'Overweight' (25-29.9), or 'Obese' (>=30). Use the formula: BMI = weight / (height ** 2). (Input: 70, 1.75 → Output: Normal)",
      "starterCode": "# Read weight and height, calculate BMI, print category\n",
      "solutionCode": "weight = float(input())\nheight = float(input())\nbmi = weight / (height ** 2)\nif bmi < 18.5:\n    print('Underweight')\nelif bmi < 25:\n    print('Normal')\nelif bmi < 30:\n    print('Overweight')\nelse:\n    print('Obese')",
      "testCases": [
        {
          "input": "70\n1.75\n",
          "expectedOutput": "Normal\n"
        },
        {
          "input": "50\n1.80\n",
          "expectedOutput": "Underweight\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Chained Comparisons",
      "prompt": "Given `x = 15`, use a chained comparison to verify if `10 < x <= 20`. Print the boolean result.",
      "starterCode": "x = 15\n# Print if x is between 10 (exclusive) and 20 (inclusive)\n",
      "solutionCode": "x = 15\nprint(10 < x <= 20)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "logical-operators": [
    {
      "title": "Logical AND",
      "prompt": "Given `a = True` and `b = False`, print the result of `a and b`.",
      "starterCode": "a = True\nb = False\n# Print a and b\n",
      "solutionCode": "a = True\nb = False\nprint(a and b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "False\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Logical NOT",
      "prompt": "Given `is_weekend = False`, use the `not` operator to print its opposite.",
      "starterCode": "is_weekend = False\n# Print the logical NOT of is_weekend\n",
      "solutionCode": "is_weekend = False\nprint(not is_weekend)",
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
      "title": "Number Analyzer",
      "prompt": "Write a program that reads an integer and checks: 1) Even or Odd, 2) Positive, Negative, or Zero, and 3) Divisible by both 3 and 5. Print results on separate lines. (Input: 15 → Output: Odd, Positive, Divisible by 3 and 5: True)",
      "starterCode": "# Read a number, analyze its properties\n",
      "solutionCode": "num = int(input())\nprint('Even' if num % 2 == 0 else 'Odd')\nif num > 0:\n    print('Positive')\nelif num < 0:\n    print('Negative')\nelse:\n    print('Zero')\nprint('Divisible by 3 and 5:', num % 3 == 0 and num % 5 == 0)",
      "testCases": [
        {
          "input": "15\n",
          "expectedOutput": "Odd\nPositive\nDivisible by 3 and 5: True\n"
        },
        {
          "input": "-6\n",
          "expectedOutput": "Even\nNegative\nDivisible by 3 and 5: False\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Logical NOT",
      "prompt": "Given `is_logged_in = False`, use the `not` operator to print the opposite value.",
      "starterCode": "is_logged_in = False\n# Print not is_logged_in\n",
      "solutionCode": "is_logged_in = False\nprint(not is_logged_in)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Short-Circuit OR",
      "prompt": "Given `x = 0` and `y = 10`. Print `x or y`. Observe how `or` returns the first truthy value.",
      "starterCode": "x = 0\ny = 10\n# Print x or y\n",
      "solutionCode": "x = 0\ny = 10\nprint(x or y)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "identity-operators": [
    {
      "title": "Identity vs Equality",
      "prompt": "Create two identical lists `l1 = [1, 2]` and `l2 = [1, 2]`. Print the result of `l1 is l2`.",
      "starterCode": "l1 = [1, 2]\nl2 = [1, 2]\n# Print l1 is l2\n",
      "solutionCode": "l1 = [1, 2]\nl2 = [1, 2]\nprint(l1 is l2)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "False\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Same Object via Assignment",
      "prompt": "Create a list `a = [1, 2, 3]`, then set `b = a`. Print the result of `a is b`, then append `4` to `a` and print `b` to show they share the same object.",
      "starterCode": "a = [1, 2, 3]\n# Assign b = a and print a is b, then append to a and print b\n",
      "solutionCode": "a = [1, 2, 3]\nb = a\nprint(a is b)\na.append(4)\nprint(b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Check for None",
      "prompt": "Set `value = None` and print `True` if value is None, otherwise `False`, using the `is` operator.",
      "starterCode": "value = None\n# Print True/False using 'is'\n",
      "solutionCode": "value = None\nprint(value is None)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "is not Operator",
      "prompt": "Create two separate lists `x = [1, 2]` and `y = [1, 2]`. Print the result of `x is not y` (they are different objects).",
      "starterCode": "x = [1, 2]\ny = [1, 2]\n# Print x is not y\n",
      "solutionCode": "x = [1, 2]\ny = [1, 2]\nprint(x is not y)",
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
      "title": "Understanding 'is'",
      "prompt": "Create two variables `a = 5` and `b = 5`. Print the result of `a is b`. (Due to integer caching in Python, this will be True for small numbers).",
      "starterCode": "a = 5\nb = 5\n# Print a is b\n",
      "solutionCode": "a = 5\nb = 5\nprint(a is b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "'is' vs '==' with Lists",
      "prompt": "Create two identical lists: `list1 = [1, 2]` and `list2 = [1, 2]`. Print `list1 == list2` on the first line, and `list1 is list2` on the second line.",
      "starterCode": "list1 = [1, 2]\nlist2 = [1, 2]\n# Compare with == and is\n",
      "solutionCode": "list1 = [1, 2]\nlist2 = [1, 2]\nprint(list1 == list2)\nprint(list1 is list2)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\nFalse\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "membership-operators": [
    {
      "title": "Check Membership",
      "prompt": "Print the result of checking if the letter 'a' is in the string 'banana'.",
      "starterCode": "# Check if 'a' is in 'banana'\n",
      "solutionCode": "print('a' in 'banana')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Check Absence",
      "prompt": "Given `vowels = ['a', 'e', 'i', 'o', 'u']`, use `not in` to print whether 'x' is NOT in the vowels list.",
      "starterCode": "vowels = ['a', 'e', 'i', 'o', 'u']\n# Check if 'x' is not in vowels\n",
      "solutionCode": "vowels = ['a', 'e', 'i', 'o', 'u']\nprint('x' not in vowels)",
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
      "title": "Check for Vowel",
      "prompt": "Given `vowels = 'aeiou'`, check if the character `'e'` is in the string `vowels` using the `in` operator. Print the boolean result.",
      "starterCode": "vowels = 'aeiou'\n# Check if 'e' is in vowels and print result\n",
      "solutionCode": "vowels = 'aeiou'\nprint('e' in vowels)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Not In Operator",
      "prompt": "Given `banned_words = ['spam', 'scam']`. Use `not in` to check if `'hello'` is NOT in the list. Print the boolean result.",
      "starterCode": "banned_words = ['spam', 'scam']\n# Check if 'hello' is not in the list and print result\n",
      "solutionCode": "banned_words = ['spam', 'scam']\nprint('hello' not in banned_words)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "bitwise-operators": [
    {
      "title": "Bitwise AND",
      "prompt": "Print the result of the bitwise AND operation between 5 and 3 (`5 & 3`).",
      "starterCode": "# Print 5 & 3\n",
      "solutionCode": "print(5 & 3)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Bit Manipulation",
      "prompt": "Write a program that reads an integer and checks: 1) If it is even or odd using bitwise AND (num & 1), 2) If bit 3 (0-indexed, value 8) is set. Print results on separate lines. (Input: 10 → Output: Even, Bit 3 set: True)",
      "starterCode": "# Read a number, check even/odd and bit 3\n",
      "solutionCode": "num = int(input())\nprint('Even' if (num & 1) == 0 else 'Odd')\nprint('Bit 3 set:', (num & 8) != 0)",
      "testCases": [
        {
          "input": "10\n",
          "expectedOutput": "Even\nBit 3 set: True\n"
        },
        {
          "input": "5\n",
          "expectedOutput": "Odd\nBit 3 set: False\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Bitwise AND",
      "prompt": "Calculate and print the bitwise AND of `a = 5` (binary 0101) and `b = 3` (binary 0011).",
      "starterCode": "a = 5\nb = 3\n# Print a & b\n",
      "solutionCode": "a = 5\nb = 3\nprint(a & b)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Bitwise XOR",
      "prompt": "Calculate and print the bitwise XOR of `x = 10` (binary 1010) and `y = 12` (binary 1100).",
      "starterCode": "x = 10\ny = 12\n# Print x ^ y\n",
      "solutionCode": "x = 10\ny = 12\nprint(x ^ y)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "6\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ],
  "operator-precedence": [
    {
      "title": "Control Precedence",
      "prompt": "Use parentheses to force the addition to happen before multiplication in `2 + 3 * 4` so the result is 20, and print it.",
      "starterCode": "# Modify the expression to equal 20\nprint(2 + 3 * 4)\n",
      "solutionCode": "print((2 + 3) * 4)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "20\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Temperature Converter Program",
      "prompt": "Write a program that takes a Fahrenheit temperature as input (a float) and converts it to Celsius using the formula `C = (F - 32) * 5/9`. Print the exact Celsius result. (Input provided: 98.6)",
      "starterCode": "# Read fahrenheit, convert to celsius using correct precedence, and print\n",
      "solutionCode": "f = float(input())\nc = (f - 32) * 5 / 9\nprint(c)",
      "testCases": [
        {
          "input": "98.6\n",
          "expectedOutput": "37.0\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    },
    {
      "title": "Leap Year Checker",
      "prompt": "Write a program that reads a year and checks if it is a leap year. A leap year is divisible by 4, but not by 100, unless also by 400. Print 'Leap Year' or 'Not a Leap Year'. (Input: 2020 → Output: Leap Year)",
      "starterCode": "# Read a year, check leap year conditions\n",
      "solutionCode": "year = int(input())\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print('Leap Year')\nelse:\n    print('Not a Leap Year')",
      "testCases": [
        {
          "input": "2020\n",
          "expectedOutput": "Leap Year\n"
        },
        {
          "input": "1900\n",
          "expectedOutput": "Not a Leap Year\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Simple Interest Calculator",
      "prompt": "Write a program that reads Principal, Rate of Interest, and Time (all as float inputs). Calculate Simple Interest using SI = (P * R * T) / 100. If any input is less than or equal to 0, print 'Invalid input'. Otherwise, print the SI rounded to 2 decimal places. (Input: 1000, 5, 2 → Output: 100.00)",
      "starterCode": "# Read P, R, T, calculate Simple Interest\n",
      "solutionCode": "p = float(input())\nr = float(input())\nt = float(input())\nif p <= 0 or r <= 0 or t <= 0:\n    print('Invalid input')\nelse:\n    si = (p * r * t) / 100\n    print(f'{si:.2f}')",
      "testCases": [
        {
          "input": "1000\n5\n2\n",
          "expectedOutput": "100.00\n"
        },
        {
          "input": "1000\n0\n2\n",
          "expectedOutput": "Invalid input\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Order of Operations",
      "prompt": "Calculate and print `10 + 5 * 2`. Note how multiplication happens before addition.",
      "starterCode": "# Print 10 + 5 * 2\n",
      "solutionCode": "print(10 + 5 * 2)",
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
      "title": "Using Parentheses",
      "prompt": "Use parentheses to force the addition to happen before the multiplication: `(10 + 5) * 2`. Print the result.",
      "starterCode": "# Print (10 + 5) * 2\n",
      "solutionCode": "print((10 + 5) * 2)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "30\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Module Integration: Access Control System",
      "prompt": "Write a program that takes three inputs on separate lines: `user_role` (string), `is_active` (string 'True' or 'False'), and `file_name` (string). Determine if the user has access. They have access if their role is 'admin' OR if they are an 'editor' and `is_active` is 'True'. If they have access, print 'Access Granted to [file_name]'. Otherwise print 'Access Denied'.",
      "starterCode": "# Read inputs, evaluate access, print result\n",
      "solutionCode": "user_role = input()\nis_active = input() == 'True'\nfile_name = input()\nif user_role == 'admin' or (user_role == 'editor' and is_active):\n    print(f'Access Granted to {file_name}')\nelse:\n    print('Access Denied')",
      "testCases": [
        {
          "input": "editor\nTrue\nsecret.txt\n",
          "expectedOutput": "Access Granted to secret.txt\n"
        },
        {
          "input": "editor\nFalse\nsecret.txt\n",
          "expectedOutput": "Access Denied\n"
        },
        {
          "input": "admin\nFalse\ndata.csv\n",
          "expectedOutput": "Access Granted to data.csv\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Module Integration: Complex Math Solver",
      "prompt": "Read `x` (int) and `y` (int) as inputs. Calculate `z = (x ** 2) + (y % 3)`. Then check if `z` is an even number AND greater than 10. Print the boolean result.",
      "starterCode": "# Read x and y, calculate z, check conditions, print boolean\n",
      "solutionCode": "x = int(input())\ny = int(input())\nz = (x ** 2) + (y % 3)\nprint(z % 2 == 0 and z > 10)",
      "testCases": [
        {
          "input": "4\n5\n",
          "expectedOutput": "True\n"
        },
        {
          "input": "2\n1\n",
          "expectedOutput": "False\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
