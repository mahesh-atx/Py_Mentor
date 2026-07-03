import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { gettingStartedLessons, gettingStartedPractice } from "./notes/phase1/getting-started";
import { pythonBasicsLessons } from "./notes/phase1/python-basics";
import { inputOutputLessons } from "./notes/phase1/input-output";


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
  await prisma.quiz.deleteMany();
  await prisma.exercise.deleteMany();
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
  // MODULE 1: Introduction to Python
  // ============================================================
  const mod1 = await prisma.module.create({
    data: {
      title: "Module 1: Introduction to Python",
      slug: "introduction-to-python",
      description: "Introduction to Python, setup, and basics.",
      order: 1,
      isPublished: true,
      roadmapId: pythonRoadmap.id,
    },
  });

  // --- Topic 1.1: Getting Started ---
  const topicGettingStarted = await prisma.topic.create({
    data: {
      title: "Getting Started",
      slug: "getting-started",
      description: "Learn what Python is and set up your environment.",
      order: 1,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  for (let i = 0; i < gettingStartedLessons.length; i++) {
    const lesson = gettingStartedLessons[i];
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
        objectives: JSON.stringify(lesson.objectives),
        examples: JSON.stringify(lesson.examples),
        order: i + 1,
        difficulty: "beginner",
        xpReward: 50,
        isPublished: true,
        topicId: topicGettingStarted.id,
      },
    });
  }

  // --- Seed Topic 1.1 Quizzes and Exercises ---
  for (const lessonData of gettingStartedPractice.lessons) {
    const lessonSlug = lessonData.lessonSlug;
    const quizTitle = `Quiz: ${lessonSlug.replace(/-/g, ' ')}`;
    
    const quiz = await prisma.quiz.create({
      data: {
        title: quizTitle,
        slug: `${lessonSlug}-quiz`,
        topicId: topicGettingStarted.id,
        isPublished: true,
      },
    });

    for (let i = 0; i < lessonData.quiz.length; i++) {
      const q = lessonData.quiz[i];
      await prisma.quizQuestion.create({
        data: {
          quizId: quiz.id,
          type: q.type === "multiple-choice" ? "mcq" : (q.type === "true-false" ? "mcq" : "mcq"),
          question: q.question,
          options: q.options ? JSON.stringify(q.options) : (q.type === "true-false" ? JSON.stringify(["True", "False"]) : null),
          correctAnswer: q.answer.toString(),
          explanation: q.explanation,
          difficulty: q.difficulty,
          order: i,
        }
      });
    }

  }

  // --- Topic 1.2: Python Basics ---
  const topicBasics = await prisma.topic.create({
    data: {
      title: "Python Basics",
      slug: "python-basics",
      description: "Understand the basic syntax and rules of Python.",
      order: 2,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  for (let i = 0; i < pythonBasicsLessons.length; i++) {
    const lesson = pythonBasicsLessons[i];
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
        objectives: JSON.stringify(lesson.objectives),
        examples: JSON.stringify(lesson.examples),
        order: i + 1,
        difficulty: "beginner",
        xpReward: 50,
        isPublished: true,
        topicId: topicBasics.id,
      },
    });
  }

  // --- Topic 1.3: Input & Output ---
  const topicIO = await prisma.topic.create({
    data: {
      title: "Input & Output",
      slug: "input-output",
      description: "Learn to interact with users through print() and input().",
      order: 3,
      isPublished: true,
      moduleId: mod1.id,
    },
  });

  for (let i = 0; i < inputOutputLessons.length; i++) {
    const lesson = inputOutputLessons[i];
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        slug: lesson.slug,
        content: lesson.content,
        objectives: JSON.stringify(lesson.objectives),
        examples: JSON.stringify(lesson.examples),
        order: i + 1,
        difficulty: "beginner",
        xpReward: 50,
        isPublished: true,
        topicId: topicIO.id,
      },
    });
  }

  console.log("✅ Module 1 created");

  


  // ACHIEVEMENTS


  // ============================================================
  await prisma.achievement.createMany({
    data: [
      { title: "First Blood", description: "Complete your first lesson.", icon: "Zap", color: "text-yellow-500", xpReward: 50, condition: JSON.stringify({ type: "lessons_completed", count: 1 }) },
      { title: "Getting Started", description: "Complete 5 lessons.", icon: "Rocket", color: "text-blue-500", xpReward: 100, condition: JSON.stringify({ type: "lessons_completed", count: 5 }) },
      { title: "7-Day Streak", description: "Code for 7 consecutive days.", icon: "Flame", color: "text-red-500", xpReward: 300, condition: JSON.stringify({ type: "streak", days: 7 }) },
      { title: "Project Alpha", description: "Complete your first project.", icon: "Trophy", color: "text-purple-500", xpReward: 500, condition: JSON.stringify({ type: "projects_completed", count: 1 }) },
      { title: "Bug Hunter", description: "Fix 10 code errors.", icon: "Bug", color: "text-orange-500", xpReward: 150, condition: JSON.stringify({ type: "errors_fixed", count: 10 }) },
    ],
  });

  console.log("✅ Achievements created");
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
