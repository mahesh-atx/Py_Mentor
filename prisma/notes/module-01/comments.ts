export const commentsLesson = {
  title: "Comments",
  slug: "comments",
  content: `# Comments

Writing code isn't just about telling the computer what to do; it's also about explaining to *other humans* (or your future self) what your code does. This is where **comments** come in.

A comment is text inside your code file that the Python interpreter completely ignores. It is purely for documentation and readability.

## Single-Line Comments

To write a single-line comment in Python, use the hash character: \`#\`. Everything after the hash on that line will be ignored.

\`\`\`python
# This is a comment. Python will ignore this.
print("Hello, World!") 

print("Hello again!") # You can also put comments at the end of a line
\`\`\`

## Multi-Line Comments (Docstrings)

If you need to write a long explanation that spans multiple lines, using a \`#\` on every line can get tedious. 

Python allows you to create multi-line strings using triple quotes (\`'''\` or \`"""\`). If these strings are not assigned to a variable, Python will essentially ignore them, making them function perfectly as multi-line comments.

\`\`\`python
"""
This is a multi-line comment.
It can span as many lines as you want.
It is often used to explain complex logic or 
describe what a function does.
"""
print("Running the code!")
\`\`\`

## Best Practices for Commenting

> [!TIP]
> **1. Don't state the obvious:** 
> \`x = 5 # Assigns 5 to x\` (Bad comment, we can clearly read that!)
> 
> **2. Explain the "Why", not the "What":** 
> \`x = 5 # We set a max of 5 retries to prevent API rate limiting\` (Good comment!)
> 
> **3. Keep them updated:** An incorrect comment is worse than no comment at all. If you change your code, make sure you update the comment!`,
  objectives: [
    "Learn how to write single-line comments.",
    "Learn how to write multi-line comments (docstrings)."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
