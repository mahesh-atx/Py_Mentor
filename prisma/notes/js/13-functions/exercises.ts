export const exercises: Record<string, any[]> = {
  "js-13-functions": [
    {
        "title": "Simple Function",
        "prompt": "Write a function named 'greet' that prints 'Hello'. Call it once.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "function greet() {\n  console.log('Hello');\n}\ngreet();",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Hello\n"
            }
        ],
        "difficulty": "beginner",
        "xpReward": 20
    },
    {
        "title": "Arrow Function",
        "prompt": "Write an arrow function 'add' that takes two parameters and returns their sum. Then print the result of add(3, 4).",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "const add = (a, b) => a + b;\nconsole.log(add(3, 4));",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "7\n"
            }
        ],
        "difficulty": "intermediate",
        "xpReward": 30
    }
]
};
