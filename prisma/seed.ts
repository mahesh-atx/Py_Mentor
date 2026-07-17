import "dotenv/config";
import { db as prisma } from "../src/lib/db/prisma";
import { stringifyJsonField } from "../src/lib/db/json-helper";

// ── Python module imports ──────────────────────────────────────────────
import { gettingStartedModule } from "./notes/1.1 Getting Started";
import { variablesDataTypesModule } from "./notes/1.2 Variables & Data Types";
import { operatorsModule } from "./notes/1.3 Operators";
import { controlFlowModule } from "./notes/1.4 Control Flow";
import { loopsModule } from "./notes/1.5 Loops";
import { dictionariesModule } from "./notes/2.1 Data Structures/Dictionaries";
import { listsModule } from "./notes/2.1 Data Structures/Lists";
import { tuplesSetsModule } from "./notes/2.1 Data Structures/Tuples & Sets";
import { stringsCompleteModule } from "./notes/2.1 Data Structures/Strings";
import { functionsModule } from "./notes/2.2 Functions";
import { functionalToolsModule } from "./notes/2.6 Lambda, Map, Filter & Reduce";
import { modulesPackagesModule } from "./notes/2.7 Modules & Packages";
import { stringManipulationModule } from "./notes/2.3 String Manipulation";
import { oopFundamentalsModule } from "./notes/3.1 OOP Fundamentals";
import { oopPillarsModule } from "./notes/3.2 OOP Pillars";
import { fileHandlingModule } from "./notes/2.4 File Handling";
import { errorHandlingModule } from "./notes/2.5 Error Handling";
import { seedProjects } from "./seed-projects";


// ============================================================
// PHASE DEFINITIONS — Grouping modules into progressive roadmaps
// ============================================================
const pythonPhases = [
  {
    slug: "phase-1",
    title: "Phase 1: Python Fundamentals",
    description:
      "Learn to think in Python. Set up your environment, understand syntax, variables, operators, and control flow.",
    order: 1,
    modules: [
      gettingStartedModule,
      variablesDataTypesModule,
      operatorsModule,
      controlFlowModule,
      loopsModule,
    ],
  },
  {
    slug: "phase-2",
    title: "Phase 2: Working with Data",
    description:
      "Master Python's core data types and built-in tools — strings, lists, tuples, sets, dictionaries, and essential built-in functions.",
    order: 2,
    modules: [
      listsModule,
      tuplesSetsModule,
      stringsCompleteModule,
      dictionariesModule,
      functionsModule,
      functionalToolsModule,
      modulesPackagesModule,
      stringManipulationModule,
      fileHandlingModule,
      errorHandlingModule,
    ],
  },
  {
    slug: "phase-3",
    title: "Phase 3: Object-Oriented Programming",
    description:
      "Design and architect with classes, objects, inheritance, polymorphism, abstraction, and magic methods.",
    order: 3,
    modules: [oopFundamentalsModule, oopPillarsModule],
  },
];


// ============================================================
// ACHIEVEMENT DEFINITIONS
// ============================================================
const achievements = [
  {
    title: "First Blood",
    description: "Complete your first lesson.",
    icon: "Zap",
    color: "text-yellow-500",
    xpReward: 50,
    condition: JSON.stringify({ type: "lessons_completed", count: 1 }),
  },
  {
    title: "Getting Started",
    description: "Complete 5 lessons.",
    icon: "Rocket",
    color: "text-blue-500",
    xpReward: 100,
    condition: JSON.stringify({ type: "lessons_completed", count: 5 }),
  },
  {
    title: "7-Day Streak",
    description: "Code for 7 consecutive days.",
    icon: "Flame",
    color: "text-red-500",
    xpReward: 300,
    condition: JSON.stringify({ type: "streak", days: 7 }),
  },
  {
    title: "Project Alpha",
    description: "Complete your first project.",
    icon: "Trophy",
    color: "text-purple-500",
    xpReward: 500,
    condition: JSON.stringify({ type: "projects_completed", count: 1 }),
  },
  {
    title: "Bug Hunter",
    description: "Fix 10 code errors.",
    icon: "Bug",
    color: "text-orange-500",
    xpReward: 150,
    condition: JSON.stringify({ type: "errors_fixed", count: 10 }),
  },
];

// ============================================================
// EXPORTED SEED FUNCTION
// ============================================================
export async function seedCurriculum(force: boolean = false) {
  const FORCE = force;
  const phases = pythonPhases;
  

  // ── Force-reset path (opt-in via --force) ──────────────────────────
  if (FORCE) {
    console.log("\x1b[36m│  │\x1b[0m  \x1b[33mℹ Upsert mode\x1b[0m");
  }

  // ── Seed roadmaps, modules, topics, lessons, exercises ─────────────
  for (const phase of phases) {
    console.log(`\x1b[36m│  ├─ ►\x1b[0m Seeding ${phase.title}...`);

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
      const moduleOrder = mIndex + 1;
      

      const moduleRecord = await prisma.module.upsert({
        where: { slug: m.slug },
        update: {
          title: m.title,
          description: m.description,
          order: moduleOrder,
          isPublished: true,
          roadmapId: roadmap.id,
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
        const lessonDef = m.lessons[lIndex] as any;
        const topicSlug = `${m.slug}-topic-${lIndex + 1}`;

        const topic = await prisma.topic.upsert({
          where: { slug: topicSlug },
          update: {
            title: lessonDef.title,
            description: `Learn about ${lessonDef.title}`,
            order: lIndex + 1,
            isPublished: true,
          },
          create: {
            title: lessonDef.title,
            slug: topicSlug,
            description: `Learn about ${lessonDef.title}`,
            order: lIndex + 1,
            isPublished: true,
            moduleId: moduleRecord.id,
          },
        });

        // Lesson
        await prisma.lesson.upsert({
          where: { topicId_slug: { topicId: topic.id, slug: lessonDef.slug } },
          update: {
            title: lessonDef.title,
            content: lessonDef.content,
            objectives: stringifyJsonField(lessonDef.objectives || []),
            duration: 15,
            xpReward: lessonDef.xpReward || 50,
            order: 1,
            isPublished: true,
          },
          create: {
            title: lessonDef.title,
            slug: lessonDef.slug,
            content: lessonDef.content,
            objectives: stringifyJsonField(lessonDef.objectives || []),
            duration: 15,
            xpReward: lessonDef.xpReward || 50,
            order: 1,
            isPublished: true,
            topicId: topic.id,
          },
        });

        // Exercises
        if (lessonDef.exercises) {
          const exercises = lessonDef.exercises;
          for (let eIndex = 0; eIndex < exercises.length; eIndex++) {
            const e = exercises[eIndex];
            const exSlug = `${lessonDef.slug}-ex-${eIndex + 1}`;

            await prisma.exercise.upsert({
              where: { topicId_slug: { topicId: topic.id, slug: exSlug } },
              update: {
                title: e.title,
                description: e.prompt,
                starterCode: e.starterCode,
                solution: e.solutionCode || "",
                testCases: stringifyJsonField(e.testCases || []),
                hints: stringifyJsonField([]),
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
                testCases: stringifyJsonField(e.testCases || []),
                hints: stringifyJsonField([]),
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

  // ── Seed achievements ─────────────────────────────────────────────
  console.log("\x1b[36m│  ├─ ►\x1b[0m Seeding achievements...");
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

  // ── Seed projects ───────────────────────────────────────────────
  console.log("\x1b[36m│  ├─ ►\x1b[0m Seeding projects...");
  await seedProjects();
}

// Allow running from CLI directly
if (require.main === module) {
  const cliForce = process.argv.includes("--force");
  seedCurriculum(cliForce)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
