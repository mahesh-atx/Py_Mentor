export const exercises: Record<string, any[]> = {
  "js-21-advanced": [
    {
        "title": "Destructuring",
        "prompt": "Destructure the 'a' and 'b' properties from {a: 1, b: 2} and print them separated by space.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "const { a, b } = { a: 1, b: 2 };\nconsole.log(a + ' ' + b);",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "1 2\n"
            }
        ],
        "difficulty": "intermediate",
        "xpReward": 30
    }
]
};
