export const exercises: Record<string, any[]> = {
  "arithmetic-operators": [
    {
      title: "Basic Math",
      prompt: "Print the result of 15 modulus 4 (15 % 4).",
      starterCode: "# Print 15 modulo 4\n",
      solutionCode: "print(15 % 4)",
      testCases: [{ input: "", expectedOutput: "3\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Area of a Circle",
      prompt: "Given `pi = 3.14` and `r = 5`, calculate the area of a circle (`pi * r^2`) using the exponentiation operator `**`. Print the result.",
      starterCode: "pi = 3.14\nr = 5\n# Calculate and print the area\n",
      solutionCode: "pi = 3.14\nr = 5\nprint(pi * (r ** 2))",
      testCases: [{ input: "", expectedOutput: "78.5\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Simple Calculator",
      prompt: "Write a program that takes two numbers and an operator (+, -, *, /) as input and performs the operation. If the operator is '/' and the second number is 0, print 'Cannot divide by zero'. Use float() for inputs. (Input: 10, +, 5 → Output: 15.0)",
      starterCode: "# Read two numbers and an operator, perform the operation\n",
      solutionCode: "num1 = float(input())\nop = input().strip()\nnum2 = float(input())\nif op == '+':\n    print(num1 + num2)\nelif op == '-':\n    print(num1 - num2)\nelif op == '*':\n    print(num1 * num2)\nelif op == '/':\n    if num2 == 0:\n        print('Cannot divide by zero')\n    else:\n        print(num1 / num2)",
      testCases: [
        { input: "10\n+\n5\n", expectedOutput: "15.0\n" },
        { input: "8\n/\n0\n", expectedOutput: "Cannot divide by zero\n" }
      ],
      difficulty: "expert",
      xpReward: 75
    }
  ],
  "assignment-operators": [
    {
      title: "Add and Assign",
      prompt: "Given `x = 10`, use the `+=` operator to add 5 to `x`, then print `x`.",
      starterCode: "x = 10\n# Use += to add 5, then print x\n",
      solutionCode: "x = 10\nx += 5\nprint(x)",
      testCases: [{ input: "", expectedOutput: "15\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Multiply and Assign",
      prompt: "Given `savings = 100`, use the `*=` operator to multiply it by 2 (doubling it). Then print `savings`.",
      starterCode: "savings = 100\n# Double the savings using *=, then print\n",
      solutionCode: "savings = 100\nsavings *= 2\nprint(savings)",
      testCases: [{ input: "", expectedOutput: "200\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Discount Calculator",
      prompt: "A store offers a discount. Read the original price and discount percentage as inputs. Calculate the final price after discount using assignment operators. If the discount percentage is 0 or negative, print 'Invalid discount'. (Input: 100, 20 → Output: 80.0)",
      starterCode: "# Read price and discount, calculate final price\n",
      solutionCode: "price = float(input())\ndiscount = float(input())\nif discount <= 0:\n    print('Invalid discount')\nelse:\n    discount_amount = price * (discount / 100)\n    price -= discount_amount\n    print(price)",
      testCases: [
        { input: "100\n20\n", expectedOutput: "80.0\n" },
        { input: "50\n0\n", expectedOutput: "Invalid discount\n" }
      ],
      difficulty: "intermediate",
      xpReward: 60
    }
  ],
  "comparison-operators": [
    {
      title: "Compare Numbers",
      prompt: "Print the boolean result of checking if 100 is greater than or equal to 100.",
      starterCode: "# Print if 100 is >= 100\n",
      solutionCode: "print(100 >= 100)",
      testCases: [{ input: "", expectedOutput: "True\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Check Equality",
      prompt: "Print the boolean result of checking if the string 'Apple' is equal to the string 'apple' (case-sensitive!).",
      starterCode: "# Print if 'Apple' == 'apple'\n",
      solutionCode: "print('Apple' == 'apple')",
      testCases: [{ input: "", expectedOutput: "False\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "BMI Calculator",
      prompt: "Write a program that reads weight (kg) and height (m) as inputs, calculates BMI, and prints the category: 'Underweight' (<18.5), 'Normal' (18.5-24.9), 'Overweight' (25-29.9), or 'Obese' (>=30). Use the formula: BMI = weight / (height ** 2). (Input: 70, 1.75 → Output: Normal)",
      starterCode: "# Read weight and height, calculate BMI, print category\n",
      solutionCode: "weight = float(input())\nheight = float(input())\nbmi = weight / (height ** 2)\nif bmi < 18.5:\n    print('Underweight')\nelif bmi < 25:\n    print('Normal')\nelif bmi < 30:\n    print('Overweight')\nelse:\n    print('Obese')",
      testCases: [
        { input: "70\n1.75\n", expectedOutput: "Normal\n" },
        { input: "50\n1.80\n", expectedOutput: "Underweight\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],
  "logical-operators": [
    {
      title: "Logical AND",
      prompt: "Given `a = True` and `b = False`, print the result of `a and b`.",
      starterCode: "a = True\nb = False\n# Print a and b\n",
      solutionCode: "a = True\nb = False\nprint(a and b)",
      testCases: [{ input: "", expectedOutput: "False\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Logical NOT",
      prompt: "Given `is_weekend = False`, use the `not` operator to print its opposite.",
      starterCode: "is_weekend = False\n# Print the logical NOT of is_weekend\n",
      solutionCode: "is_weekend = False\nprint(not is_weekend)",
      testCases: [{ input: "", expectedOutput: "True\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Number Analyzer",
      prompt: "Write a program that reads an integer and checks: 1) Even or Odd, 2) Positive, Negative, or Zero, and 3) Divisible by both 3 and 5. Print results on separate lines. (Input: 15 → Output: Odd, Positive, Divisible by 3 and 5: True)",
      starterCode: "# Read a number, analyze its properties\n",
      solutionCode: "num = int(input())\nprint('Even' if num % 2 == 0 else 'Odd')\nif num > 0:\n    print('Positive')\nelif num < 0:\n    print('Negative')\nelse:\n    print('Zero')\nprint('Divisible by 3 and 5:', num % 3 == 0 and num % 5 == 0)",
      testCases: [
        { input: "15\n", expectedOutput: "Odd\nPositive\nDivisible by 3 and 5: True\n" },
        { input: "-6\n", expectedOutput: "Even\nNegative\nDivisible by 3 and 5: False\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],
  "identity-operators": [
    {
      title: "Identity vs Equality",
      prompt: "Create two identical lists `l1 = [1, 2]` and `l2 = [1, 2]`. Print the result of `l1 is l2`.",
      starterCode: "l1 = [1, 2]\nl2 = [1, 2]\n# Print l1 is l2\n",
      solutionCode: "l1 = [1, 2]\nl2 = [1, 2]\nprint(l1 is l2)",
      testCases: [{ input: "", expectedOutput: "False\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ],
  "membership-operators": [
    {
      title: "Check Membership",
      prompt: "Print the result of checking if the letter 'a' is in the string 'banana'.",
      starterCode: "# Check if 'a' is in 'banana'\n",
      solutionCode: "print('a' in 'banana')",
      testCases: [{ input: "", expectedOutput: "True\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Check Absence",
      prompt: "Given `vowels = ['a', 'e', 'i', 'o', 'u']`, use `not in` to print whether 'x' is NOT in the vowels list.",
      starterCode: "vowels = ['a', 'e', 'i', 'o', 'u']\n# Check if 'x' is not in vowels\n",
      solutionCode: "vowels = ['a', 'e', 'i', 'o', 'u']\nprint('x' not in vowels)",
      testCases: [{ input: "", expectedOutput: "True\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ],
  "bitwise-operators": [
    {
      title: "Bitwise AND",
      prompt: "Print the result of the bitwise AND operation between 5 and 3 (`5 & 3`).",
      starterCode: "# Print 5 & 3\n",
      solutionCode: "print(5 & 3)",
      testCases: [{ input: "", expectedOutput: "1\n" }],
      difficulty: "advanced",
      xpReward: 40
    },
    {
      title: "Bit Manipulation",
      prompt: "Write a program that reads an integer and checks: 1) If it is even or odd using bitwise AND (num & 1), 2) If bit 3 (0-indexed, value 8) is set. Print results on separate lines. (Input: 10 → Output: Even, Bit 3 set: True)",
      starterCode: "# Read a number, check even/odd and bit 3\n",
      solutionCode: "num = int(input())\nprint('Even' if (num & 1) == 0 else 'Odd')\nprint('Bit 3 set:', (num & 8) != 0)",
      testCases: [
        { input: "10\n", expectedOutput: "Even\nBit 3 set: True\n" },
        { input: "5\n", expectedOutput: "Odd\nBit 3 set: False\n" }
      ],
      difficulty: "expert",
      xpReward: 80
    }
  ],
  "operator-precedence": [
    {
      title: "Control Precedence",
      prompt: "Use parentheses to force the addition to happen before multiplication in `2 + 3 * 4` so the result is 20, and print it.",
      starterCode: "# Modify the expression to equal 20\nprint(2 + 3 * 4)\n",
      solutionCode: "print((2 + 3) * 4)",
      testCases: [{ input: "", expectedOutput: "20\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Temperature Converter Program",
      prompt: "Write a program that takes a Fahrenheit temperature as input (a float) and converts it to Celsius using the formula `C = (F - 32) * 5/9`. Print the exact Celsius result. (Input provided: 98.6)",
      starterCode: "# Read fahrenheit, convert to celsius using correct precedence, and print\n",
      solutionCode: "f = float(input())\nc = (f - 32) * 5 / 9\nprint(c)",
      testCases: [{ input: "98.6\n", expectedOutput: "37.0\n" }],
      difficulty: "expert",
      xpReward: 50
    },
    {
      title: "Leap Year Checker",
      prompt: "Write a program that reads a year and checks if it is a leap year. A leap year is divisible by 4, but not by 100, unless also by 400. Print 'Leap Year' or 'Not a Leap Year'. (Input: 2020 → Output: Leap Year)",
      starterCode: "# Read a year, check leap year conditions\n",
      solutionCode: "year = int(input())\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print('Leap Year')\nelse:\n    print('Not a Leap Year')",
      testCases: [
        { input: "2020\n", expectedOutput: "Leap Year\n" },
        { input: "1900\n", expectedOutput: "Not a Leap Year\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    },
    {
      title: "Simple Interest Calculator",
      prompt: "Write a program that reads Principal, Rate of Interest, and Time (all as float inputs). Calculate Simple Interest using SI = (P * R * T) / 100. If any input is less than or equal to 0, print 'Invalid input'. Otherwise, print the SI rounded to 2 decimal places. (Input: 1000, 5, 2 → Output: 100.00)",
      starterCode: "# Read P, R, T, calculate Simple Interest\n",
      solutionCode: "p = float(input())\nr = float(input())\nt = float(input())\nif p <= 0 or r <= 0 or t <= 0:\n    print('Invalid input')\nelse:\n    si = (p * r * t) / 100\n    print(f'{si:.2f}')",
      testCases: [
        { input: "1000\n5\n2\n", expectedOutput: "100.00\n" },
        { input: "1000\n0\n2\n", expectedOutput: "Invalid input\n" }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ]
};
