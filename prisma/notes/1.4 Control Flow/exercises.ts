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
      title: "Grade the Score",
      prompt: "Given `score = 85`, write an `if`, `elif`, `else` block: if score >= 90 print 'A', elif score >= 80 print 'B', else print 'C'.",
      starterCode: "score = 85\n# Write your if/elif/else block\n",
      solutionCode: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
      testCases: [{ input: "", expectedOutput: "B\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Valid Triangle Checker",
      prompt: "Read three angle values (floats) as input, one per line. Check if they can form a valid triangle. A triangle is valid if all angles are positive and their sum is 180. Also check if it is 'Right', 'Obtuse', or 'Acute'. Print the type of triangle. (Input: 90, 45, 45 → Output: Right, Valid)",
      starterCode: "# Read three angles and determine triangle type and validity\n",
      solutionCode: "a = float(input())\nb = float(input())\nc = float(input())\nif a <= 0 or b <= 0 or c <= 0 or (a + b + c) != 180:\n    print('Invalid')\nelse:\n    if a == 90 or b == 90 or c == 90:\n        print('Right')\n    elif a > 90 or b > 90 or c > 90:\n        print('Obtuse')\n    else:\n        print('Acute')",
      testCases: [
        { input: "90\n45\n45\n", expectedOutput: "Right\n" },
        { input: "60\n60\n60\n", expectedOutput: "Acute\n" }
      ],
      difficulty: "expert",
      xpReward: 80
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
      xpReward: 100
    }
  ]
};
