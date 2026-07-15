export const syntaxLesson = {
  title: "Syntax & Indentation",
  slug: "syntax",
  content: `# Syntax & Indentation

Every language, whether spoken (like English) or programmatic (like Python), has a set of rules for how sentences or statements must be structured. This is called **Syntax**.

Python is famous for having an incredibly clean, uncluttered syntax that is designed to be highly readable.

## The Theory — Building the Logic

Syntax is the grammar of a language — the rules that decide which arrangements of symbols are meaningful. Most languages use explicit markers (semicolons, braces) to show where a statement ends and a block begins. Python instead makes **structure itself carry meaning**: indentation is not decoration, it *is* the syntax that defines a block. So the visual layout of your code and its logical structure are the same thing — you cannot have code that merely looks grouped but isn't. The mental model: in Python, *shape equals meaning*. A logic error caused by misplaced braces in other languages becomes a visible indentation error you can catch at a glance.

## No Semicolons or Curly Braces

If you have seen other languages like C++, JavaScript, or Java, you're probably used to seeing code drowning in semicolons \`;\` and curly braces \`{}\`. 

In Python, we don't use those!
- We don't use semicolons to end lines. A simple "Enter" (newline) tells Python the statement is over.
- We don't use curly braces to group blocks of code together. Instead, Python uses **indentation**.

## The Power of Whitespace (Indentation)

In Python, **whitespace matters**. Indentation is not just for making code look pretty—it is a strict requirement of the language.

Indentation is used to define blocks of code (like loops, functions, and if-statements). The standard practice is to use **4 spaces** for each level of indentation.

### Correct Indentation:
\`\`\`python
if 5 > 2:
    print("Five is greater than two!")
    print("This line is in the same block.")
\`\`\`

### Incorrect Indentation:
> [!WARNING]
> **IndentationError:**
> \`\`\`python
> if 5 > 2:
> print("Five is greater than two!")
> \`\`\`
> *If you forget to indent, Python will crash and throw an \`IndentationError\`.*

### Mismatched Indentation:
> [!WARNING]
> **IndentationError:**
> \`\`\`python
> if 5 > 2:
>     print("Line 1")
>       print("Line 2") 
> \`\`\`
> *All lines inside the same block must be indented by the exact same amount of spaces.*

When using a good code editor like VS Code, it will handle the 4-space indentation for you automatically when you press the \`Tab\` key!`,
  objectives: [
    "Learn the basic syntax of Python.",
    "Understand the importance of indentation."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
