export const exercises: Record<string, any[]> = {
  "introduction": [
    {
      "title": "First Program",
      "prompt": "Write a program that prints exactly: I am learning Python!",
      "starterCode": "# Print your first line of Python\n",
      "solutionCode": "print('I am learning Python!')",
      "testCases": [{ "input": "", "expectedOutput": "I am learning Python!\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Three Facts",
      "prompt": "Use three print statements to output these three lines:\nPython is interpreted\nPython is versatile\nPython is fun",
      "starterCode": "# Print three facts about Python\n",
      "solutionCode": "print('Python is interpreted')\nprint('Python is versatile')\nprint('Python is fun')",
      "testCases": [{ "input": "", "expectedOutput": "Python is interpreted\nPython is versatile\nPython is fun\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "setup": [
    {
      "title": "Setup Check",
      "prompt": "Verify your setup works by printing exactly: Python is ready!",
      "starterCode": "# Print a setup confirmation\n",
      "solutionCode": "print('Python is ready!')",
      "testCases": [{ "input": "", "expectedOutput": "Python is ready!\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Two-Step Launch",
      "prompt": "Print two lines:\nSetup complete\nLet's code!",
      "starterCode": "# Print two lines\n",
      "solutionCode": "print('Setup complete')\nprint(\"Let's code!\")",
      "testCases": [{ "input": "", "expectedOutput": "Setup complete\nLet's code!\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ],
  "hello-world": [
    {
      title: "Print Hello, World!",
      prompt: "Write a Python program that prints the exact phrase 'Hello, World!' to the console.",
      starterCode: "# Write your code below\n\n",
      solutionCode: "print('Hello, World!')",
      testCases: [{ input: "", expectedOutput: "Hello, World!\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Two Lines of Text",
      prompt: "Use two separate print statements to output 'First Line' on the first line, and 'Second Line' on the second line.",
      starterCode: "# Print two separate lines\n",
      solutionCode: "print('First Line')\nprint('Second Line')",
      testCases: [{ input: "", expectedOutput: "First Line\nSecond Line\n" }],
      difficulty: "intermediate",
      xpReward: 30
    },
    {
      title: "Multi-line Printing",
      prompt: "Use a single print statement with triple quotes (''' or \"\"\") to print:\nLine 1\nLine 2\nLine 3",
      starterCode: "# Print a multi-line string\n",
      solutionCode: "print('''Line 1\nLine 2\nLine 3''')",
      testCases: [{ input: "", expectedOutput: "Line 1\nLine 2\nLine 3\n" }],
      difficulty: "advanced",
      xpReward: 40
    },
    {
      title: "ASCII Art Masterpiece",
      prompt: "Write a program that uses print statements to output a 3-line ASCII triangle:\n  *\n ***\n*****",
      starterCode: "# Print the 3-line ASCII triangle below\n",
      solutionCode: "print('  *')\nprint(' ***')\nprint('*****')",
      testCases: [{ input: "", expectedOutput: "  *\n ***\n*****\n" }],
      difficulty: "expert",
      xpReward: 50
    }
  ],
  "interpreter": [
    {
      title: "Python as a Calculator",
      prompt: "Use Python to calculate 15 plus 27 and print the result.",
      starterCode: "# Add 15 and 27, then print the result\n",
      solutionCode: "print(15 + 27)",
      testCases: [{ input: "", expectedOutput: "42\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Complex Math",
      prompt: "Calculate 10 multiplied by 5, then divided by 2. Print the result.",
      starterCode: "# Print (10 * 5) / 2\n",
      solutionCode: "print((10 * 5) / 2)",
      testCases: [{ input: "", expectedOutput: "25.0\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ,
    {
      "title": "Division Practice",
      "prompt": "Use Python as a calculator: print the result of 100 divided by 4.",
      "starterCode": "# Print 100 / 4\n",
      "solutionCode": "print(100 / 4)",
      "testCases": [{ "input": "", "expectedOutput": "25.0\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "syntax": [
    {
      title: "Correct Indentation",
      prompt: "Fix the indentation in the starter code so that it prints 'Correct!' without any syntax errors.",
      starterCode: "if True:\nprint('Correct!')",
      solutionCode: "if True:\n    print('Correct!')",
      testCases: [{ input: "", expectedOutput: "Correct!\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Nested Indentation",
      prompt: "Fix the indentation of the nested condition.",
      starterCode: "if True:\nprint('Level 1')\nif True:\nprint('Level 2')",
      solutionCode: "if True:\n    print('Level 1')\n    if True:\n        print('Level 2')",
      testCases: [{ input: "", expectedOutput: "Level 1\nLevel 2\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ],
  "comments": [
    {
      title: "Add a Comment",
      prompt: "Write a single-line comment saying 'This is a comment' and on the next line, print 'Success'.",
      starterCode: "# Write your comment and print statement below\n",
      solutionCode: "# This is a comment\nprint('Success')",
      testCases: [{ input: "", expectedOutput: "Success\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Inline Comments",
      prompt: "Print the number 10, and add an inline comment on the same line that says '# ten'.",
      starterCode: "# Add an inline comment next to the print statement\nprint(10)",
      solutionCode: "print(10) # ten",
      testCases: [{ input: "", expectedOutput: "10\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ,
    {
      "title": "Comments Don't Run",
      "prompt": "Add a comment line (starting with #) that says 'this is ignored', then print exactly: Visible",
      "starterCode": "# Add a comment, then print 'Visible'\n",
      "solutionCode": "# this is ignored\nprint('Visible')",
      "testCases": [{ "input": "", "expectedOutput": "Visible\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ]
};
