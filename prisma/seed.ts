import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
// ts-expect-error - Prisma 7 adapter typing
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.roadmap.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.user.deleteMany();
  // ============================================================
  // ROADMAP
  // ============================================================
  const pythonRoadmap = await prisma.roadmap.create({
    data: {
      title: "Python Mastery",
      slug: "python",
      description: "Learn Python from scratch. Master variables, control flow, data structures, functions, OOP, and build real-world projects.",
      language: "python",
      icon: "🐍",
      order: 1,
      isPublished: true,
    },
  });

  console.log("✅ Roadmap created");

  // ============================================================
  // MODULE 1: FOUNDATIONS
  // ============================================================
  const mod1 = await prisma.module.create({
    data: {
      title: "Python Foundations",
      slug: "foundations",
      description: "Learn the building blocks of Python: variables, data types, operators, and basic I/O.",
      order: 1,
      isPublished: true,
      roadmapId: pythonRoadmap.id,
    },
  });

  // --- Topic 1.1: Variables ---
  const topicVariables = await prisma.topic.create({
    data: {
      title: "Variables",
      slug: "variables",
      description: "Understand how to store and manipulate data using variables.",
      order: 1,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "What are Variables?",
      slug: "what-are-variables",
      content: `# What are Variables?\n\nA variable is a named container that stores a value in your computer's memory. Think of it like a labeled box — you put something inside (a value), and you can refer to it later by its label (the variable name).\n\n## Creating Variables\n\nIn Python, you create a variable simply by assigning a value to a name using the \`=\` operator:\n\n\`\`\`python\nname = "Alice"\nage = 25\nheight = 5.6\nis_student = True\n\`\`\`\n\n## Rules for Variable Names\n\n1. Must start with a letter or underscore\n2. Can contain letters, numbers, and underscores\n3. Case-sensitive (\`age\` and \`Age\` are different)\n4. Cannot use Python keywords (\`if\`, \`for\`, \`class\`, etc.)\n\n## Dynamic Typing\n\nPython is dynamically typed — you don't need to declare the type of a variable. Python figures it out automatically:\n\n\`\`\`python\nx = 10      # x is an integer\nx = "hello" # now x is a string\n\`\`\``,
      objectives: JSON.stringify([
        "Understand what variables are and why they're useful",
        "Create variables with meaningful names",
        "Follow Python naming conventions",
        "Understand dynamic typing"
      ]),
      examples: JSON.stringify([
        { title: "Basic Assignment", code: 'name = "PyMentor"\nprint(name)', output: "PyMentor" },
        { title: "Multiple Assignment", code: 'x, y, z = 1, 2, 3\nprint(x, y, z)', output: "1 2 3" },
        { title: "Swapping Variables", code: 'a = 10\nb = 20\na, b = b, a\nprint(a, b)', output: "20 10" }
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicVariables.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "Variable Naming Conventions",
      slug: "naming-conventions",
      content: `# Variable Naming Conventions\n\nWriting clean, readable code starts with good variable names.\n\n## Snake Case (Python Standard)\n\nPython uses **snake_case** for variable and function names:\n\n\`\`\`python\nfirst_name = "Alice"\ntotal_score = 95\nis_logged_in = True\n\`\`\`\n\n## Constants\n\nFor values that should never change, use **ALL_CAPS**:\n\n\`\`\`python\nMAX_RETRIES = 3\nPI = 3.14159\nBASE_URL = "https://api.example.com"\n\`\`\`\n\n## Bad vs Good Names\n\n| ❌ Bad | ✅ Good |\n|--------|--------|\n| \`x\` | \`user_age\` |\n| \`temp\` | \`temperature_celsius\` |\n| \`lst\` | \`student_names\` |\n| \`n\` | \`retry_count\` |`,
      objectives: JSON.stringify([
        "Use snake_case for variables",
        "Use ALL_CAPS for constants",
        "Choose descriptive variable names"
      ]),
      examples: JSON.stringify([
        { title: "Snake Case", code: 'user_name = "Bob"\nprint(user_name)', output: "Bob" },
        { title: "Constants", code: 'MAX_SPEED = 120\nprint(f"Speed limit: {MAX_SPEED} km/h")', output: "Speed limit: 120 km/h" }
      ]),
      order: 2,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicVariables.id,
    },
  });

  // Exercise for Variables
  await prisma.exercise.create({
    data: {
      title: "Create Your First Variables",
      slug: "first-variables",
      description: "Create a variable called `hero` with the value `\"Batman\"` and a variable called `power_level` with the value `9000`. Then print them using an f-string: `f\"Hero: {hero}, Power Level: {power_level}\"`",
      starterCode: '# Create your variables below\n\n\n# Print the result\nprint(f"Hero: {hero}, Power Level: {power_level}")',
      solutionCode: 'hero = "Batman"\npower_level = 9000\nprint(f"Hero: {hero}, Power Level: {power_level}")',
      hints: JSON.stringify([
        "Use the = operator to assign values to variables",
        "Strings need quotes around them, numbers don't",
        'hero = "Batman"\npower_level = 9000'
      ]),
      testCases: JSON.stringify([
        { input: "", expectedOutput: "Hero: Batman, Power Level: 9000" }
      ]),
      difficulty: "easy",
      xpReward: 100,
      order: 1,
      isPublished: true,
      topicId: topicVariables.id,
    },
  });

  // Quiz for Variables
  const quizVars = await prisma.quiz.create({
    data: {
      title: "Variables Quiz",
      slug: "variables-quiz",
      description: "Test your knowledge of Python variables.",
      xpReward: 150,
      order: 1,
      isPublished: true,
      topicId: topicVariables.id,
    },
  });

  await prisma.quizQuestion.createMany({
    data: [
      {
        type: "mcq",
        question: "Which of the following is a valid Python variable name?",
        options: JSON.stringify(["2fast", "my-var", "user_name", "class"]),
        correctAnswer: "user_name",
        explanation: "Variable names must start with a letter or underscore. Hyphens and keywords are not allowed.",
        order: 1,
        quizId: quizVars.id,
      },
      {
        type: "output_prediction",
        question: "What will this code output?",
        code: 'x = 5\nx = x + 3\nprint(x)',
        options: JSON.stringify(["5", "3", "8", "Error"]),
        correctAnswer: "8",
        explanation: "x starts as 5, then x + 3 = 8 is reassigned to x.",
        order: 2,
        quizId: quizVars.id,
      },
      {
        type: "mcq",
        question: "Python is a _____ typed language.",
        options: JSON.stringify(["statically", "dynamically", "strongly", "weakly"]),
        correctAnswer: "dynamically",
        explanation: "Python determines variable types at runtime, making it dynamically typed.",
        order: 3,
        quizId: quizVars.id,
      },
    ],
  });

  // --- Topic 1.2: Data Types ---
  const topicDataTypes = await prisma.topic.create({
    data: {
      title: "Data Types",
      slug: "data-types",
      description: "Learn about integers, floats, strings, booleans, and type conversion.",
      order: 2,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "Python Data Types",
      slug: "python-data-types",
      content: `# Python Data Types\n\nEvery value in Python has a type. Understanding types is crucial for writing correct programs.\n\n## Core Types\n\n| Type | Example | Description |\n|------|---------|-------------|\n| \`int\` | \`42\` | Whole numbers |\n| \`float\` | \`3.14\` | Decimal numbers |\n| \`str\` | \`"hello"\` | Text |\n| \`bool\` | \`True\` | True or False |\n| \`None\` | \`None\` | Absence of value |\n\n## Checking Types\n\nUse the \`type()\` function:\n\n\`\`\`python\nprint(type(42))       # <class 'int'>\nprint(type(3.14))     # <class 'float'>\nprint(type("hello"))  # <class 'str'>\nprint(type(True))     # <class 'bool'>\n\`\`\`\n\n## Type Conversion\n\n\`\`\`python\n# String to Integer\nage = int("25")     # 25\n\n# Integer to String\ntext = str(100)     # "100"\n\n# Float to Integer (truncates)\nwhole = int(3.9)    # 3\n\`\`\``,
      objectives: JSON.stringify([
        "Identify the core Python data types",
        "Use type() to check a value's type",
        "Convert between types using int(), str(), float()"
      ]),
      examples: JSON.stringify([
        { title: "Type Checking", code: 'x = 42\nprint(type(x))', output: "<class 'int'>" },
        { title: "Type Conversion", code: 'age = int("25")\nprint(age + 5)', output: "30" }
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicDataTypes.id,
    },
  });

  await prisma.exercise.create({
    data: {
      title: "Type Converter",
      slug: "type-converter",
      description: 'Given the string `num_str = "42"`, convert it to an integer, add 8 to it, and print the result.',
      starterCode: 'num_str = "42"\n\n# Convert and add 8\n\n# Print the result',
      solutionCode: 'num_str = "42"\nresult = int(num_str) + 8\nprint(result)',
      hints: JSON.stringify([
        "Use int() to convert a string to an integer",
        "Store the result in a variable, then print it",
        'result = int(num_str) + 8\nprint(result)'
      ]),
      testCases: JSON.stringify([
        { input: "", expectedOutput: "50" }
      ]),
      difficulty: "easy",
      xpReward: 100,
      order: 1,
      isPublished: true,
      topicId: topicDataTypes.id,
    },
  });

  // --- Topic 1.3: Operators ---
  const topicOperators = await prisma.topic.create({
    data: {
      title: "Operators",
      slug: "operators",
      description: "Arithmetic, comparison, logical, and assignment operators.",
      order: 3,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "Python Operators",
      slug: "python-operators",
      content: `# Python Operators\n\nOperators are symbols that perform operations on values.\n\n## Arithmetic Operators\n\n| Operator | Name | Example | Result |\n|----------|------|---------|--------|\n| \`+\` | Addition | \`5 + 3\` | \`8\` |\n| \`-\` | Subtraction | \`5 - 3\` | \`2\` |\n| \`*\` | Multiplication | \`5 * 3\` | \`15\` |\n| \`/\` | Division | \`5 / 3\` | \`1.666...\` |\n| \`//\` | Floor Division | \`5 // 3\` | \`1\` |\n| \`%\` | Modulus | \`5 % 3\` | \`2\` |\n| \`**\` | Exponent | \`5 ** 3\` | \`125\` |\n\n## Comparison Operators\n\n\`\`\`python\n5 == 5   # True\n5 != 3   # True\n5 > 3    # True\n5 < 3    # False\n5 >= 5   # True\n5 <= 3   # False\n\`\`\`\n\n## Logical Operators\n\n\`\`\`python\nTrue and False  # False\nTrue or False   # True\nnot True        # False\n\`\`\``,
      objectives: JSON.stringify([
        "Use arithmetic operators for calculations",
        "Understand the difference between / and //",
        "Use comparison and logical operators"
      ]),
      examples: JSON.stringify([
        { title: "Floor Division", code: 'print(17 // 5)\nprint(17 % 5)', output: "3\n2" },
        { title: "Exponentiation", code: 'print(2 ** 10)', output: "1024" }
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicOperators.id,
    },
  });

  // --- Topic 1.4: Input & Output ---
  const topicIO = await prisma.topic.create({
    data: {
      title: "Input & Output",
      slug: "input-output",
      description: "Learn to interact with users through print() and input().",
      order: 4,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "Print and Input",
      slug: "print-and-input",
      content: `# Print and Input\n\n## The print() Function\n\n\`\`\`python\nprint("Hello, World!")\nprint("Name:", "Alice", "Age:", 25)\nprint(f"I have {3 + 4} apples")\n\`\`\`\n\n## f-Strings (Formatted Strings)\n\nThe most modern and readable way to format strings:\n\n\`\`\`python\nname = "Alice"\nage = 25\nprint(f"My name is {name} and I am {age} years old.")\nprint(f"Next year I'll be {age + 1}.")\n\`\`\`\n\n## The input() Function\n\n\`\`\`python\nname = input("What is your name? ")\nprint(f"Hello, {name}!")\n\`\`\`\n\n> ⚠️ **Important:** \`input()\` always returns a string. Convert it if you need a number:\n\n\`\`\`python\nage = int(input("How old are you? "))\nprint(f"In 5 years you'll be {age + 5}")\n\`\`\``,
      objectives: JSON.stringify([
        "Use print() with multiple arguments",
        "Format strings with f-strings",
        "Read user input with input()",
        "Convert input to the correct type"
      ]),
      examples: JSON.stringify([
        { title: "f-String", code: 'name = "PyMentor"\nprint(f"Welcome to {name}!")', output: "Welcome to PyMentor!" },
        { title: "String Concatenation", code: 'first = "Hello"\nsecond = "World"\nprint(first + " " + second)', output: "Hello World" }
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicIO.id,
    },
  });

  console.log("✅ Module 1: Foundations — 4 Topics, 5 Lessons, 2 Exercises, 1 Quiz");

  // ============================================================
  // MODULE 2: CONTROL FLOW
  // ============================================================
  const mod2 = await prisma.module.create({
    data: {
      title: "Control Flow",
      slug: "control-flow",
      description: "Master conditional statements and loops to control program execution.",
      order: 2,
      isPublished: true,
      roadmapId: pythonRoadmap.id,
    },
  });

  // --- Topic 2.1: Conditionals ---
  const topicConditionals = await prisma.topic.create({
    data: {
      title: "Conditionals",
      slug: "conditionals",
      description: "Use if, elif, and else to make decisions in your code.",
      order: 1,
      isPublished: true,
      moduleId: mod2.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "If, Elif, and Else",
      slug: "if-elif-else",
      content: `# Conditional Statements\n\nConditionals allow your program to make decisions.\n\n## Basic If Statement\n\n\`\`\`python\nage = 18\nif age >= 18:\n    print("You can vote!")\n\`\`\`\n\n## If-Else\n\n\`\`\`python\ntemperature = 30\nif temperature > 25:\n    print("It's hot outside")\nelse:\n    print("It's cool outside")\n\`\`\`\n\n## If-Elif-Else Chain\n\n\`\`\`python\nscore = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\nprint(f"Your grade: {grade}")\n\`\`\`\n\n## Nested Conditions\n\n\`\`\`python\nhas_ticket = True\nage = 15\nif has_ticket:\n    if age >= 13:\n        print("Enjoy the movie!")\n    else:\n        print("You need a parent.")\nelse:\n    print("Buy a ticket first.")\n\`\`\``,
      objectives: JSON.stringify([
        "Write if/elif/else statements",
        "Use comparison operators in conditions",
        "Understand code indentation in Python",
        "Nest conditional blocks"
      ]),
      examples: JSON.stringify([
        { title: "Grade Checker", code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")', output: "B" },
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicConditionals.id,
    },
  });

  await prisma.exercise.create({
    data: {
      title: "Even or Odd Checker",
      slug: "even-or-odd",
      description: 'Write a program that checks if the number `num = 7` is even or odd. Print "Even" or "Odd" accordingly.',
      starterCode: 'num = 7\n\n# Check if even or odd\n',
      solutionCode: 'num = 7\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
      hints: JSON.stringify([
        "Use the modulus operator % to check divisibility by 2",
        "If num % 2 equals 0, the number is even",
        'if num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")'
      ]),
      testCases: JSON.stringify([
        { input: "", expectedOutput: "Odd" }
      ]),
      difficulty: "easy",
      xpReward: 100,
      order: 1,
      isPublished: true,
      topicId: topicConditionals.id,
    },
  });

  // --- Topic 2.2: Loops ---
  const topicLoops = await prisma.topic.create({
    data: {
      title: "Loops",
      slug: "loops",
      description: "Repeat actions with for loops and while loops.",
      order: 2,
      isPublished: true,
      moduleId: mod2.id,
    },
  });

  await prisma.lesson.create({
    data: {
      title: "For Loops and While Loops",
      slug: "for-and-while-loops",
      content: `# Loops\n\nLoops let you repeat a block of code multiple times.\n\n## For Loop\n\nUse \`for\` when you know how many times to repeat:\n\n\`\`\`python\nfor i in range(5):\n    print(f"Iteration {i}")\n\`\`\`\n\n## Looping Over Collections\n\n\`\`\`python\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\`\`\`\n\n## While Loop\n\nUse \`while\` when you don't know how many iterations:\n\n\`\`\`python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\`\`\`\n\n## Break and Continue\n\n\`\`\`python\nfor i in range(10):\n    if i == 5:\n        break    # Stop the loop entirely\n    if i % 2 == 0:\n        continue # Skip to the next iteration\n    print(i)     # Prints: 1, 3\n\`\`\``,
      objectives: JSON.stringify([
        "Write for loops with range()",
        "Iterate over lists and strings",
        "Write while loops with a condition",
        "Use break and continue"
      ]),
      examples: JSON.stringify([
        { title: "Range Loop", code: 'for i in range(1, 6):\n    print(i)', output: "1\n2\n3\n4\n5" },
        { title: "Sum with While", code: 'total = 0\nn = 1\nwhile n <= 100:\n    total += n\n    n += 1\nprint(total)', output: "5050" }
      ]),
      order: 1,
      difficulty: "beginner",
      xpReward: 50,
      isPublished: true,
      topicId: topicLoops.id,
    },
  });

  await prisma.exercise.create({
    data: {
      title: "FizzBuzz",
      slug: "fizzbuzz",
      description: 'Print numbers from 1 to 15. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".',
      starterCode: '# Print FizzBuzz from 1 to 15\n',
      solutionCode: 'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
      hints: JSON.stringify([
        "Use a for loop with range(1, 16)",
        "Check divisibility by 15 first (both 3 and 5), then 3, then 5",
        "Use the modulus operator % to check divisibility"
      ]),
      testCases: JSON.stringify([
        { input: "", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }
      ]),
      difficulty: "medium",
      xpReward: 150,
      order: 1,
      isPublished: true,
      topicId: topicLoops.id,
    },
  });

  console.log("✅ Module 2: Control Flow — 2 Topics, 2 Lessons, 2 Exercises");

  // ============================================================
  // QUIZZES
  // ============================================================
  await prisma.quiz.create({
    data: {
      title: "Loops Mastery Quiz",
      slug: "loops-mastery",
      description: "Test your understanding of for and while loops in Python.",
      xpReward: 100,
      order: 1,
      isPublished: true,
      topicId: topicLoops.id,
      questions: {
        create: [
          {
            type: "mcq",
            question: "Which of the following is a valid variable name in Python?",
            options: JSON.stringify(["1st_name", "first-name", "first_name", "first name"]),
            correctAnswer: "first_name",
            difficulty: "easy",
            order: 1
          },
          {
            type: "output",
            question: "What will be the output of the following code?",
            code: "x = 5\ny = \"10\"\nprint(x + y)",
            options: JSON.stringify(["15", "510", "TypeError", "SyntaxError"]),
            correctAnswer: "TypeError",
            difficulty: "medium",
            order: 2
          },
          {
            type: "debug",
            question: "Find the bug in this code. It is supposed to print 'Hello World'.",
            code: "print(\"Hello World')",
            options: JSON.stringify(["Missing parentheses", "Mismatched quotes", "print should be capitalized", "Nothing is wrong"]),
            correctAnswer: "Mismatched quotes",
            difficulty: "easy",
            order: 3
          }
        ]
      }
    }
  });

  console.log("✅ Quiz created");

  // ============================================================
  // PROJECTS (linked to Topics)
  // ============================================================
  await prisma.project.create({
    data: {
      title: "Terminal Calculator",
      slug: "terminal-calculator",
      description: "Build a fully functional command-line calculator that handles basic arithmetic, continuous operations, and error handling for division by zero.",
      requirements: JSON.stringify([
        "Accept user input for two numbers",
        "Accept user input for an operator (+, -, *, /)",
        "Create separate functions for each operation",
        "Handle division by zero with try/except",
        "Ask user if they want to continue"
      ]),
      milestones: JSON.stringify([
        { title: "Basic Input", description: "Get two numbers and an operator from the user" },
        { title: "Operations", description: "Implement add, subtract, multiply, divide functions" },
        { title: "Error Handling", description: "Handle division by zero and invalid input" },
        { title: "Loop", description: "Allow continuous calculations" }
      ]),
      hints: JSON.stringify([
        "Start with a while True: loop for continuous operation",
        "Use a dictionary to map operator strings to functions",
        "Wrap division in a try/except ZeroDivisionError block"
      ]),
      difficulty: "easy",
      estimatedTime: "2 Hours",
      xpReward: 500,
      skills: JSON.stringify(["Variables", "Functions", "Conditionals", "Input"]),
      icon: "Calculator",
      order: 1,
      isPublished: true,
      topicId: topicOperators.id,
    },
  });

  await prisma.project.create({
    data: {
      title: "Number Guessing Game",
      slug: "number-guessing-game",
      description: "Create a game where the computer picks a random number and the user has to guess it with hints.",
      requirements: JSON.stringify([
        "Generate a random number between 1 and 100",
        "Accept user guesses via input()",
        "Tell the user if the guess is too high or too low",
        "Count the number of attempts",
        "Congratulate when correct and show attempt count"
      ]),
      milestones: JSON.stringify([
        { title: "Random Number", description: "Use random.randint() to generate the target" },
        { title: "Game Loop", description: "Create a while loop for guessing" },
        { title: "Feedback", description: "Provide too high / too low hints" },
        { title: "Win Condition", description: "Detect correct guess and show stats" }
      ]),
      hints: JSON.stringify([
        "import random at the top of your file",
        "Use while True: and break when the guess is correct",
        "Remember to convert input() to int()"
      ]),
      difficulty: "easy",
      estimatedTime: "1.5 Hours",
      xpReward: 400,
      skills: JSON.stringify(["Loops", "Conditionals", "Random", "Input"]),
      icon: "Gamepad2",
      order: 2,
      isPublished: true,
      topicId: topicLoops.id,
    },
  });

  console.log("✅ Projects created");

  // ============================================================
  // ACHIEVEMENTS
  // ============================================================
  await prisma.achievement.createMany({
    data: [
      { title: "First Blood", description: "Complete your first lesson.", icon: "Zap", color: "text-yellow-500", xpReward: 50, condition: JSON.stringify({ type: "lessons_completed", count: 1 }) },
      { title: "Getting Started", description: "Complete 5 lessons.", icon: "Rocket", color: "text-blue-500", xpReward: 100, condition: JSON.stringify({ type: "lessons_completed", count: 5 }) },
      { title: "Loop Master", description: "Ace the Loops quiz with 100%.", icon: "Repeat", color: "text-green-500", xpReward: 200, condition: JSON.stringify({ type: "quiz_perfect", topic: "loops" }) },
      { title: "7-Day Streak", description: "Code for 7 consecutive days.", icon: "Flame", color: "text-red-500", xpReward: 300, condition: JSON.stringify({ type: "streak", days: 7 }) },
      { title: "Project Alpha", description: "Complete your first project.", icon: "Trophy", color: "text-purple-500", xpReward: 500, condition: JSON.stringify({ type: "projects_completed", count: 1 }) },
      { title: "Bug Hunter", description: "Fix 10 code errors.", icon: "Bug", color: "text-orange-500", xpReward: 150, condition: JSON.stringify({ type: "errors_fixed", count: 10 }) },
    ],
  });

  console.log("✅ Achievements created");
  console.log("\n🎉 Database seeded successfully!");
  console.log("   📊 1 Roadmap");
  console.log("   📦 2 Modules");
  console.log("   📑 6 Topics");
  console.log("   📖 7 Lessons");
  console.log("   💻 4 Exercises");
  console.log("   ❓ 1 Quiz (3 questions)");
  console.log("   🏗️  2 Projects");
  console.log("   🏆 6 Achievements");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
