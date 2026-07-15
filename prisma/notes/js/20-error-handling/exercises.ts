export const exercises: Record<string, any[]> = {
  "js-20-error-handling": [
    {
        "title": "Try...Catch",
        "prompt": "Write a try-catch block where you throw an error 'Oops', catch it, and print the error message.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "try {\n  throw new Error('Oops');\n} catch (e) {\n  console.log(e.message);\n}",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Oops\n"
            }
        ],
        "difficulty": "intermediate",
        "xpReward": 30
    }
]
};
