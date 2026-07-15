export const exercises: Record<string, any[]> = {
  "js-18-oop": [
    {
        "title": "Create a Class",
        "prompt": "Create a class 'Dog' with a 'bark' method that prints 'Woof!'. Instantiate it and call bark.",
        "starterCode": "// Write your code below\n\n",
        "solutionCode": "class Dog {\n  bark() {\n    console.log('Woof!');\n  }\n}\nnew Dog().bark();",
        "testCases": [
            {
                "input": "",
                "expectedOutput": "Woof!\n"
            }
        ],
        "difficulty": "intermediate",
        "xpReward": 30
    }
]
};
