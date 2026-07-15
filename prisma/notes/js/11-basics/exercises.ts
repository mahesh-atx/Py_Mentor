export const exercises: Record<string, any[]> = {
  "js-11-basics": [
    {
      title: "Print Hello, JavaScript!",
      prompt: "Write a JavaScript program that prints the exact phrase 'Hello, JavaScript!' to the console.",
      starterCode: "// Write your code below\n\n",
      solutionCode: "console.log('Hello, JavaScript!');",
      testCases: [{ input: "", expectedOutput: "Hello, JavaScript!\n" }],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Declare Variables",
      prompt: "Declare a constant named `pi` with a value of 3.14. Then declare a variable `radius` using `let` with a value of 5. Finally, print the values of both variables separated by a space.",
      starterCode: "// Declare your variables and print them\n\n",
      solutionCode: "const pi = 3.14;\nlet radius = 5;\nconsole.log(pi + ' ' + radius);",
      testCases: [{ input: "", expectedOutput: "3.14 5\n" }],
      difficulty: "beginner",
      xpReward: 30
    },
    {
      title: "String Concatenation",
      prompt: "Declare a variable `firstName` as 'John' and `lastName` as 'Doe'. Print them together as 'John Doe' using console.log.",
      starterCode: "// Write your code below\n\n",
      solutionCode: "const firstName = 'John';\nconst lastName = 'Doe';\nconsole.log(firstName + ' ' + lastName);",
      testCases: [{ input: "", expectedOutput: "John Doe\n" }],
      difficulty: "intermediate",
      xpReward: 30
    }
  ]
};
