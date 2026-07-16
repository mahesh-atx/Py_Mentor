import "dotenv/config";
import { db as prisma } from "../src/lib/db/prisma";

const projects = [
  // Phase 1: Beginner
  {
    title: "Tip Calculator",
    slug: "tip-calculator",
    description: "Read bill, tip %, and party size; compute per-person share.",
    requirements: "Variables, Operators, F-strings, Rounding",
    milestones: "1. Get Input\n2. Calculate total\n3. Display output",
    difficulty: "beginner",
    order: 1,
  },
  {
    title: "Grade Classifier",
    slug: "grade-classifier",
    description: "Input a score (0–100); print the letter grade with nested if statements.",
    requirements: "Conditionals, Ternary operators",
    milestones: "1. Read score\n2. Determine grade\n3. Print result",
    difficulty: "beginner",
    order: 2,
  },
  // Phase 1: Intermediate
  {
    title: "Number Guessing Game",
    slug: "number-guessing-game",
    description: "Computer picks a secret number; player guesses with hints.",
    requirements: "while loops, if/elif/else",
    milestones: "1. Generate random number\n2. Loop for guesses\n3. Provide feedback",
    difficulty: "intermediate",
    order: 3,
  },
  {
    title: "Multiplication Table Generator",
    slug: "multiplication-table",
    description: "For a given n, print its 1..12 table using a for loop.",
    requirements: "for loops, f-string alignment",
    milestones: "1. Get n\n2. Loop 1 to 12\n3. Format output",
    difficulty: "intermediate",
    order: 4,
  },
  {
    title: "Rock, Paper, Scissors",
    slug: "rock-paper-scissors",
    description: "Play against the computer. Keep track of the score.",
    requirements: "Variables, Loops, Conditionals",
    milestones: "1. Game loop\n2. Get choices\n3. Determine winner",
    difficulty: "intermediate",
    order: 5,
  },
  // Phase 1: Advanced
  {
    title: "FizzBuzz Variants",
    slug: "fizzbuzz-variants",
    description: "Print 1–100, replacing multiples of 3/5 with Fizz/Buzz.",
    requirements: "Loops, match/case, custom rules",
    milestones: "1. Basic FizzBuzz\n2. Match/case refactor\n3. Add custom rules",
    difficulty: "advanced",
    order: 6,
  },
  {
    title: "Simple ATM Simulator",
    slug: "atm-simulator",
    description: "Build a menu loop with balance, deposit, and withdraw limits.",
    requirements: "Nested loops, state management",
    milestones: "1. Main menu loop\n2. Handle transactions\n3. Guard clauses",
    difficulty: "advanced",
    order: 7,
  },
  {
    title: "ASCII Pyramid Builder",
    slug: "ascii-pyramid",
    description: "Print a perfectly symmetrical pyramid using characters.",
    requirements: "Nested for loops, String multiplication",
    milestones: "1. Get height\n2. Loop rows\n3. Print spaces and chars",
    difficulty: "advanced",
    order: 8,
  },
  
  // Phase 2: Beginner
  {
    title: "Custom stats Module",
    slug: "custom-stats-module",
    description: "Write functions for mean, median, mode, and variance.",
    requirements: "Functions, Error Handling",
    milestones: "1. mean function\n2. median/mode functions\n3. Error raising on empty",
    difficulty: "beginner",
    order: 9,
  },
  {
    title: "Password Generator & Validator",
    slug: "password-generator",
    description: "Generate a strong random password and validate criteria.",
    requirements: "Strings, Functions, random module",
    milestones: "1. Generator function\n2. Validator function\n3. CLI interface",
    difficulty: "beginner",
    order: 10,
  },
  // Phase 2: Intermediate
  {
    title: "Contacts Manager (CLI)",
    slug: "contacts-manager",
    description: "Store contacts in a dict; persist data to a JSON file.",
    requirements: "Dictionaries, File Handling, try/except",
    milestones: "1. CRUD operations\n2. JSON save/load\n3. Error handling",
    difficulty: "intermediate",
    order: 11,
  },
  {
    title: "To-Do List with Persistence",
    slug: "persistent-todo",
    description: "Manage tasks as a list of dicts; save/load from a text file.",
    requirements: "Lists, Dicts, File I/O",
    milestones: "1. Task model\n2. CLI menu\n3. File operations",
    difficulty: "intermediate",
    order: 12,
  },
  {
    title: "Student Grade Tracker",
    slug: "grade-tracker",
    description: "Calculate class average and identify top scorers.",
    requirements: "Lists of dicts, Functions",
    milestones: "1. Data structure\n2. Calculation functions\n3. Search functions",
    difficulty: "intermediate",
    order: 13,
  },
  // Phase 2: Advanced
  {
    title: "Word Frequency Counter",
    slug: "word-frequency-counter",
    description: "Clean a text file and count word frequencies.",
    requirements: "String methods, Dictionaries/Counter",
    milestones: "1. Read file\n2. Clean text\n3. Count and sort",
    difficulty: "advanced",
    order: 14,
  },
  {
    title: "Log Analyzer",
    slug: "log-analyzer",
    description: "Parse a log file line by line; extract INFO/WARN/ERROR levels.",
    requirements: "Regex, String ops, File reading",
    milestones: "1. Read lines\n2. Regex extraction\n3. Aggregation",
    difficulty: "advanced",
    order: 15,
  },
  {
    title: "Quiz Bank from CSV",
    slug: "quiz-bank-csv",
    description: "Load questions from a CSV file, ask in random order.",
    requirements: "CSV module, assertions",
    milestones: "1. Load CSV\n2. Assert structure\n3. Ask and score",
    difficulty: "advanced",
    order: 16,
  },

  // Phase 3: Beginner
  {
    title: "Shape Calculator",
    slug: "shape-calculator",
    description: "Shape base class with subclasses for Circle, Rectangle, Triangle.",
    requirements: "Classes, Inheritance, Polymorphism",
    milestones: "1. Base class\n2. Subclasses\n3. Polymorphic iteration",
    difficulty: "beginner",
    order: 17,
  },
  {
    title: "Task Tracker (OOP)",
    slug: "task-tracker-oop",
    description: "Project class that composes Task objects.",
    requirements: "Classes, Composition, @property",
    milestones: "1. Task class\n2. Project class\n3. Progress property",
    difficulty: "beginner",
    order: 18,
  },
  // Phase 3: Intermediate
  {
    title: "Bank Account Hierarchy",
    slug: "bank-account-hierarchy",
    description: "Account base class with Savings and Checking subclasses.",
    requirements: "Inheritance, Overriding, Encapsulation",
    milestones: "1. Base Account\n2. Savings subclass\n3. Checking subclass",
    difficulty: "intermediate",
    order: 19,
  },
  {
    title: "Inventory & Product Model",
    slug: "inventory-product",
    description: "Product class with rich comparison methods.",
    requirements: "Magic methods, Sorting",
    milestones: "1. Product class\n2. Dunder methods\n3. Catalog sorting",
    difficulty: "intermediate",
    order: 20,
  },
  {
    title: "Fleet Vehicle Rental",
    slug: "vehicle-rental",
    description: "Base Vehicle class with Car, Truck, and Bicycle subclasses.",
    requirements: "Polymorphism, Method overriding",
    milestones: "1. Base Vehicle\n2. Subclasses\n3. Rental calculation",
    difficulty: "intermediate",
    order: 21,
  },
  // Phase 3: Advanced
  {
    title: "Library System",
    slug: "library-system",
    description: "Book, Member, and Library classes with borrowing logic.",
    requirements: "Composition, Encapsulation",
    milestones: "1. Book/Member models\n2. Library manager\n3. Borrow/Return logic",
    difficulty: "advanced",
    order: 22,
  },
  {
    title: "RPG Battle Simulator",
    slug: "rpg-battle-sim",
    description: "Player and Computer classes with polymorphic attacks.",
    requirements: "OOP fundamentals, State management",
    milestones: "1. Base Character\n2. Warrior/Mage subclasses\n3. Battle loop",
    difficulty: "advanced",
    order: 23,
  },
  
  // Capstone
  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    description: "OOP + file persistence + error handling + CLI menu.",
    requirements: "All Phase 1-3 concepts",
    milestones: "1. Model design\n2. Persistence\n3. CLI UI",
    difficulty: "advanced",
    order: 24,
  },
  {
    title: "Text Adventure Game",
    slug: "text-adventure",
    description: "Rooms as objects, persistent state, save/load.",
    requirements: "Complex OOP, File IO",
    milestones: "1. Map system\n2. Game loop\n3. Save system",
    difficulty: "advanced",
    order: 25,
  },
];

async function seedProjects() {
  console.log("Seeding projects into proper phases...");
  
  // Define which projects belong to which phase based on their position in the array.
  // Projects 0-7: Phase 1, Projects 8-15: Phase 2, Projects 16-24: Phase 3
  
  const phase1Roadmap = await prisma.roadmap.findUnique({ where: { slug: "phase-1" }, include: { modules: { include: { topics: true } } } });
  const phase2Roadmap = await prisma.roadmap.findUnique({ where: { slug: "phase-2" }, include: { modules: { include: { topics: true } } } });
  const phase3Roadmap = await prisma.roadmap.findUnique({ where: { slug: "phase-3" }, include: { modules: { include: { topics: true } } } });

  if (!phase1Roadmap || !phase2Roadmap || !phase3Roadmap) {
    console.error("Missing roadmaps. Please run full seed first.");
    return;
  }

  // Helper to get any valid topic from a roadmap
  const getTopic = (roadmap: any) => roadmap.modules[0]?.topics[0];

  const phase1Topic = getTopic(phase1Roadmap);
  const phase2Topic = getTopic(phase2Roadmap);
  const phase3Topic = getTopic(phase3Roadmap);

  if (!phase1Topic || !phase2Topic || !phase3Topic) {
    console.error("Missing topics in roadmaps.");
    return;
  }

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    
    let targetTopicId = phase1Topic.id;
    if (i >= 8 && i <= 15) targetTopicId = phase2Topic.id;
    if (i >= 16) targetTopicId = phase3Topic.id;

    await prisma.project.upsert({
      where: { topicId_slug: { topicId: targetTopicId, slug: p.slug } },
      update: {
        title: p.title,
        description: p.description,
        requirements: p.requirements,
        milestones: p.milestones,
        difficulty: p.difficulty,
        order: p.order,
        isPublished: true,
      },
      create: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        requirements: p.requirements,
        milestones: p.milestones,
        difficulty: p.difficulty,
        order: p.order,
        isPublished: true,
        topicId: targetTopicId,
      },
    });
    console.log(`Seeded project: ${p.title} -> Topic ${targetTopicId}`);
  }
  
  console.log("Done.");
}

if (require.main === module) {
  seedProjects()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
}
