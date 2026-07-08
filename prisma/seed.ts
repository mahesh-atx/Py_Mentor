import "dotenv/config";
import { db as prisma } from "../src/lib/db/prisma";
import { module1 } from "./notes/module-01";
import { module2 } from "./notes/module-02";
import { module3 } from "./notes/module-03";
import { module4 } from "./notes/module-04";
import { module5 } from "./notes/module-05";
import { module6 } from "./notes/module-06";
import { module7 } from "./notes/module-07";
import { module8 } from "./notes/module-08";
import { module9 } from "./notes/module-09";
import { module10 } from "./notes/module-10";
import { module11 } from "./notes/module-11";
import { module12 } from "./notes/module-12";
import { module13 } from "./notes/module-13";
import { module14 } from "./notes/module-14";
import { module15 } from "./notes/module-15";
import { module16 } from "./notes/module-16";

// ============================================================
// PHASE DEFINITIONS — Grouping modules into progressive roadmaps
// ============================================================
const phases = [
  {
    slug: "phase-1",
    title: "Phase 1: Python Fundamentals",
    description: "Learn to think in Python. Set up your environment, understand syntax, variables, operators, and control flow.",
    order: 1,
    modules: [module1, module2, module3, module4],
  },
  {
    slug: "phase-2",
    title: "Phase 2: Working with Data",
    description: "Master Python's core data types and built-in tools — strings, lists, tuples, sets, dictionaries, and essential built-in functions.",
    order: 2,
    modules: [module5, module6, module7, module8, module9, module10],
  },
  {
    slug: "phase-3",
    title: "Phase 3: Functions & Functional Programming",
    description: "Write reusable, elegant code with functions, closures, decorators, and functional programming patterns.",
    order: 3,
    modules: [module11, module12, module13],
  },
  {
    slug: "phase-4",
    title: "Phase 4: Object-Oriented Programming",
    description: "Design and architect with classes, objects, inheritance, polymorphism, abstraction, and magic methods.",
    order: 4,
    modules: [module14, module15],
  },
  {
    slug: "phase-5",
    title: "Phase 5: Advanced Python",
    description: "Write production-quality Python with type hints, annotations, and modern typing patterns.",
    order: 5,
    modules: [module16],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================================
  // SEED ROADMAPS & MODULES
  // ============================================================
  for (const phase of phases) {
    console.log(`\n📦 Seeding ${phase.title}...`);

    const roadmap = await prisma.roadmap.upsert({
      where: { slug: phase.slug },
      update: {
        title: phase.title,
        description: phase.description,
        order: phase.order,
        isPublished: true,
      },
      create: {
        title: phase.title,
        slug: phase.slug,
        description: phase.description,
        order: phase.order,
        isPublished: true,
      },
    });

    for (let mIndex = 0; mIndex < phase.modules.length; mIndex++) {
      const m = phase.modules[mIndex];
      // Module order is relative within the phase (1-based)
      const moduleOrder = mIndex + 1;

      const moduleId = await prisma.module.upsert({
        where: { slug: m.slug },
        update: {
          title: m.title,
          description: m.description,
          order: moduleOrder,
          isPublished: true,
          roadmapId: roadmap.id, // Reassign to correct roadmap on re-seed
        },
        create: {
          title: m.title,
          slug: m.slug,
          description: m.description,
          order: moduleOrder,
          isPublished: true,
          roadmapId: roadmap.id,
        },
      });

      for (let lIndex = 0; lIndex < m.lessons.length; lIndex++) {
        const l = m.lessons[lIndex] as any;
        const topicSlug = `m${m.order}-topic-${lIndex + 1}`;

        const topic = await prisma.topic.upsert({
          where: { slug: topicSlug },
          update: {
            title: l.title,
            description: `Learn about ${l.title}`,
            order: lIndex + 1,
            isPublished: true,
          },
          create: {
            title: l.title,
            slug: topicSlug,
            description: `Learn about ${l.title}`,
            order: lIndex + 1,
            isPublished: true,
            moduleId: moduleId.id,
          },
        });

        // Lesson
        await prisma.lesson.upsert({
          where: { topicId_slug: { topicId: topic.id, slug: l.slug } },
          update: {
            title: l.title,
            content: l.content,
            objectives: l.objectives || [],
            duration: 15,
            xpReward: l.xpReward || 50,
            order: 1,
            isPublished: true,
          },
          create: {
            title: l.title,
            slug: l.slug,
            content: l.content,
            objectives: l.objectives || [],
            duration: 15,
            xpReward: l.xpReward || 50,
            order: 1,
            isPublished: true,
            topicId: topic.id,
          },
        });

        // Exercises
        if ((l as any).exercises) {
          const exercises = (l as any).exercises;
          for (let eIndex = 0; eIndex < exercises.length; eIndex++) {
            const e = exercises[eIndex];
            const exSlug = `${l.slug}-ex-${eIndex + 1}`;

            await prisma.exercise.upsert({
              where: { topicId_slug: { topicId: topic.id, slug: exSlug } },
              update: {
                title: e.title,
                description: e.prompt,
                starterCode: e.starterCode,
                solution: e.solutionCode || "",
                testCases: e.testCases || [],
                hints: [],
                difficulty: e.difficulty || "beginner",
                xpReward: e.xpReward || 20,
                order: eIndex + 1,
                isPublished: true,
              },
              create: {
                title: e.title,
                slug: exSlug,
                description: e.prompt,
                starterCode: e.starterCode,
                solution: e.solutionCode || "",
                testCases: e.testCases || [],
                hints: [],
                difficulty: e.difficulty || "beginner",
                xpReward: e.xpReward || 20,
                order: eIndex + 1,
                isPublished: true,
                topicId: topic.id,
              },
            });
          }
        }
      }
    }
  }

    // ACHIEVEMENTS
    const achievements = [
      { title: "First Blood", description: "Complete your first lesson.", icon: "Zap", color: "text-yellow-500", xpReward: 50, condition: JSON.stringify({ type: "lessons_completed", count: 1 }) },
      { title: "Getting Started", description: "Complete 5 lessons.", icon: "Rocket", color: "text-blue-500", xpReward: 100, condition: JSON.stringify({ type: "lessons_completed", count: 5 }) },
      { title: "7-Day Streak", description: "Code for 7 consecutive days.", icon: "Flame", color: "text-red-500", xpReward: 300, condition: JSON.stringify({ type: "streak", days: 7 }) },
      { title: "Project Alpha", description: "Complete your first project.", icon: "Trophy", color: "text-purple-500", xpReward: 500, condition: JSON.stringify({ type: "projects_completed", count: 1 }) },
      { title: "Bug Hunter", description: "Fix 10 code errors.", icon: "Bug", color: "text-orange-500", xpReward: 150, condition: JSON.stringify({ type: "errors_fixed", count: 10 }) },
    ];

    for (const a of achievements) {
      await prisma.achievement.upsert({
        where: { title: a.title },
        update: {
          description: a.description,
          icon: a.icon,
          color: a.color,
          xpReward: a.xpReward,
          condition: a.condition,
        },
        create: {
          title: a.title,
          description: a.description,
          icon: a.icon,
          color: a.color,
          xpReward: a.xpReward,
          condition: a.condition,
        },
      });
    }
  
  console.log("✅ Curriculum and Achievements seeded via upserts");
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
