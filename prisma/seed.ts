import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { module1 } from "./notes/module-01";
import { module2 } from "./notes/module-02";
import { module3 } from "./notes/module-03";
import { module4 } from "./notes/module-04";

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
  await prisma.module.deleteMany();
  await prisma.topic.deleteMany();
  // ============================================================
  // ROADMAP
  // ============================================================
  const phase1Roadmap = await prisma.roadmap.create({
    data: {
      title: "PHASE 1: FOUNDATION (Weeks 1-4)",
      slug: "phase-1",
      description: "Master the fundamentals of Python, from setting up your environment to understanding basic syntax, variables, operators, and control flow.",
      language: "python",
      icon: "🐍",
      order: 1,
      isPublished: true,
    },
  });

  console.log("✅ Roadmap created");

  // ============================================================
  // MODULE 1: Getting Started
  // ============================================================
  const mod1 = await prisma.module.create({
    data: {
      title: "Module 1: Getting Started",
      slug: "module-1-getting-started",
      description: "Getting Started with Python.",
      order: 1,
      isPublished: true,
      roadmapId: phase1Roadmap.id,
    },
  });

  for (let i = 0; i < module1.lessons.length; i++) {
    const lessonData = module1.lessons[i];
    const topic = await prisma.topic.create({
      data: {
        title: lessonData.title,
        slug: `m1-topic-${i + 1}`,
        description: `Learn about ${lessonData.title}`,
        order: i + 1,
        isPublished: true,
        moduleId: mod1.id,
      },
    });

    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        slug: lessonData.slug,
        content: lessonData.content,
        objectives: JSON.stringify(lessonData.objectives),
        examples: JSON.stringify([]),
        order: 1,
        difficulty: lessonData.difficulty,
        xpReward: lessonData.xpReward,
        isPublished: true,
        topicId: topic.id,
      },
    });
  }

  // ============================================================
  // MODULE 2: Variables & Data Types
  // ============================================================
  const mod2 = await prisma.module.create({
    data: {
      title: "Module 2: Variables & Data Types",
      slug: "module-2-variables",
      description: "Variables & Data Types.",
      order: 2,
      isPublished: true,
      roadmapId: phase1Roadmap.id,
    },
  });

  for (let i = 0; i < module2.lessons.length; i++) {
    const lessonData = module2.lessons[i];
    const topic = await prisma.topic.create({
      data: {
        title: lessonData.title,
        slug: `m2-topic-${i + 1}`,
        description: `Learn about ${lessonData.title}`,
        order: i + 1,
        isPublished: true,
        moduleId: mod2.id,
      },
    });

    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        slug: lessonData.slug,
        content: lessonData.content,
        objectives: JSON.stringify(lessonData.objectives),
        examples: JSON.stringify([]),
        order: 1,
        difficulty: lessonData.difficulty,
        xpReward: lessonData.xpReward,
        isPublished: true,
        topicId: topic.id,
      },
    });
  }

  // ============================================================
  // MODULE 3: Operators
  // ============================================================
  const mod3 = await prisma.module.create({
    data: {
      title: "Module 3: Operators",
      slug: "module-3-operators",
      description: "Operators.",
      order: 3,
      isPublished: true,
      roadmapId: phase1Roadmap.id,
    },
  });

  for (let i = 0; i < module3.lessons.length; i++) {
    const lessonData = module3.lessons[i];
    const topic = await prisma.topic.create({
      data: {
        title: lessonData.title,
        slug: `m3-topic-${i + 1}`,
        description: `Learn about ${lessonData.title}`,
        order: i + 1,
        isPublished: true,
        moduleId: mod3.id,
      },
    });

    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        slug: lessonData.slug,
        content: lessonData.content,
        objectives: JSON.stringify(lessonData.objectives),
        examples: JSON.stringify([]),
        order: 1,
        difficulty: lessonData.difficulty,
        xpReward: lessonData.xpReward,
        isPublished: true,
        topicId: topic.id,
      },
    });
  }

  // ============================================================
  // MODULE 4: Control Flow
  // ============================================================
  const mod4 = await prisma.module.create({
    data: {
      title: "Module 4: Control Flow",
      slug: "module-4-control-flow",
      description: "Control Flow.",
      order: 4,
      isPublished: true,
      roadmapId: phase1Roadmap.id,
    },
  });

  for (let i = 0; i < module4.lessons.length; i++) {
    const lessonData = module4.lessons[i];
    const topic = await prisma.topic.create({
      data: {
        title: lessonData.title,
        slug: `m4-topic-${i + 1}`,
        description: `Learn about ${lessonData.title}`,
        order: i + 1,
        isPublished: true,
        moduleId: mod4.id,
      },
    });

    await prisma.lesson.create({
      data: {
        title: lessonData.title,
        slug: lessonData.slug,
        content: lessonData.content,
        objectives: JSON.stringify(lessonData.objectives),
        examples: JSON.stringify([]),
        order: 1,
        difficulty: lessonData.difficulty,
        xpReward: lessonData.xpReward,
        isPublished: true,
        topicId: topic.id,
      },
    });
  }

  console.log("✅ Modules 1-4 created with topics");
  


  


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
