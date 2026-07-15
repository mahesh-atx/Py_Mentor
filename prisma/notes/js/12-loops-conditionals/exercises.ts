export const exercises: Record<string, any[]> = {
  "js-12-loops": [
    {
        "title": "For Loop",
        "prompt": "Write a for loop that prints numbers from 1 to 5.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
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
        "title": "If/Else Statement",
        "prompt": "Write an if statement that prints 'Even' if x is even, and 'Odd' if x is odd. (Assume x is 4)",
        "starterCode": "const x = 4;\n// Write your code below\n\n",
        "solutionCode": "const x = 4;\nif (x % 2 === 0) {\n  console.log('Even');\n} else {\n  console.log('Odd');\n}",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Even\n"
            }
        ],
        "difficulty": "beginner",
        "xpReward": 20
    }
]
};
