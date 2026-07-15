export const interpreterLesson = {
  title: "Python Interpreter",
  slug: "interpreter",
  content: `# Python Interpreter

When you write Python code, you are writing instructions in a format that humans can easily read and understand. However, your computer's hardware only understands binary (1s and 0s). 

So, how does the computer run your Python code? Enter the **Python Interpreter**.

## The Theory — Building the Logic

A computer only understands machine code (binary), but humans write in a higher-level notation, so something must bridge that gap. An **interpreter** reads your source one statement at a time, translates it into instructions the machine can run, and runs them immediately — there is no separate "build" step. This is why you can type a line and see a result instantly. The trade-off: because translation happens at runtime, interpreted code is generally slower than pre-compiled code, but far faster to experiment with. The REPL (Read-Evaluate-Print Loop) is this cycle in its purest form: it reads your input, evaluates it, prints the result, and waits — the same loop your own programs follow internally.

## What is an Interpreter?

Python is an **interpreted language**. This means that there is a special program—the Python Interpreter—that reads your code line-by-line, translates it into machine code on the fly, and immediately executes it.

Unlike compiled languages (like C++ or Java), where the entire code is translated into a standalone executable file before running, Python translates and runs your code simultaneously. 

### Pros of Interpreted Languages:
- Faster testing and debugging (you can run code instantly).
- Cross-platform: The same Python code runs on Windows, Mac, and Linux, as long as the interpreter is installed.

### Cons of Interpreted Languages:
- Slightly slower execution speed compared to compiled languages.

## The Interactive Shell (REPL)

Because Python is interpreted, it comes with a built-in interactive environment called the **REPL** (Read-Evaluate-Print Loop). 

If you open your terminal and type \`python\` (or \`python3\` on Mac/Linux) and hit Enter, you will see something like this:

\`\`\`bash
Python 3.11.4 (main, Jun  7 2023, 00:00:00) 
Type "help", "copyright", "credits" or "license" for more information.
>>> 
\`\`\`

The \`>>>\` is the Python prompt. You can type Python code directly here and it will run instantly!

\`\`\`python
>>> print("Hello from the shell!")
Hello from the shell!
>>> 2 + 5
7
\`\`\`

The REPL is fantastic for quick experiments, testing small snippets of code, or using Python as a glorified calculator. To exit the shell, type \`exit()\` or press \`Ctrl+Z\` (Windows) / \`Ctrl+D\` (Mac/Linux).`,
  objectives: [
    "Understand what an interpreter is.",
    "Learn how Python executes code."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
