export const exercises: Record<string, any[]> = {
  "js-19-async": [
    {
        "title": "Promises",
        "prompt": "Create a resolved promise that prints 'Resolved!' in a .then() block.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "Promise.resolve().then(() => console.log('Resolved!'));",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Resolved!\n"
            }
        ],
        "difficulty": "intermediate",
        "xpReward": 30
    }
]
};
