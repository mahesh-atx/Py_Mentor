export const exercises: Record<string, any[]> = {
  "js-14-arrays-objects": [
    {
        "title": "Array Iteration",
        "prompt": "Create an array 'nums' with 1, 2, 3. Iterate over it and print each number.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "const nums = [1, 2, 3];\nnums.forEach(n => console.log(n));",
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
        "title": "Object Properties",
        "prompt": "Create an object 'user' with name 'Alice'. Print the name.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "const user = { name: 'Alice' };\nconsole.log(user.name);",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Alice\n"
            }
        ],
        "difficulty": "beginner",
        "xpReward": 20
    }
]
};
