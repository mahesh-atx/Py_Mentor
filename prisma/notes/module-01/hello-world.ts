export const helloWorldLesson = {
  title: "Hello World",
  slug: "hello-world",
  content: `# Hello World

Welcome to your very first Python program! 

In the programming world, it is a long-standing tradition that your first program in any new language is one that simply prints the phrase **"Hello, World!"** to the screen. It's a simple test to ensure everything is set up correctly and you know how to execute code.

## The print() Function

In Python, displaying text on the screen is incredibly easy. We use a built-in feature called the \`print()\` function.

Here is what your first program looks like:

\`\`\`python
print("Hello, World!")
\`\`\`

When you run this code, the computer will look at the instruction and output exactly what is inside the quotes:
\`Hello, World!\`

## Breaking it down

Let's look at the three main parts of this single line of code:

1. **\`print\`**: This is the name of the function. It tells Python what action you want it to perform (in this case, print something to the screen).
2. **\`()\` (Parentheses)**: Everything you want the \`print\` function to output must be placed inside these parentheses.
3. **\`" "\` (Quotation Marks)**: The text you want to print must be surrounded by quotation marks. This tells Python that "Hello, World!" is text (called a **string**), not a command or a variable. You can use single quotes (\`' '\`) or double quotes (\`" "\`), but they must match!

## Common Mistakes

When writing your first code, it's completely normal to make mistakes! Here are a few common errors:

> [!WARNING]
> **Missing Parentheses:**
> \`print "Hello, World!"\` 
> *(This will cause a SyntaxError in Python 3!)*

> [!WARNING]
> **Missing Quotation Marks:**
> \`print(Hello, World!)\`
> *(Python will think Hello and World are variables and give a NameError or SyntaxError)*

> [!WARNING]
> **Mismatched Quotation Marks:**
> \`print("Hello, World!')\`
> *(You cannot start with a double quote and end with a single quote!)*

## Your Turn!

Now that you know how to use the \`print()\` function, you aren't limited to just saying hello to the world. Try printing your name, your favorite food, or a message to a friend!

\`\`\`python
print("My name is PyMentor!")
print('I love learning Python.')
\`\`\`
`,
  objectives: [
    "Write your first Python program.",
    "Understand the print() function."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
