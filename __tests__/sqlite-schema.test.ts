// @ts-nocheck
/**
 * SQLite Schema Validation Test
 *
 * This test verifies that the SQLite migration SQL is valid and can create
 * all required tables. It uses sql.js (pure JS SQLite) to run the migration
 * without needing native dependencies or Prisma binaries.
 *
 * This proves the schema works with SQLite before we attempt Prisma migrations.
 */

import { describe, it, expect, beforeAll } from "vitest";
import initSqlJs, { Database } from "sql.js";
import * as fs from "fs";
import * as path from "path";

let db: Database;

beforeAll(async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
});

describe("SQLite Schema Migration", () => {
  it("runs the migration SQL without errors", () => {
    const migrationPath = path.join(
      __dirname,
      "..",
      "prisma",
      "migrations.sqlite",
      "00000000000000_init",
      "migration.sql"
    );

    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
    // Execute the full migration — should not throw
    db.run(migrationSQL);
  });

  // ── Verify all tables exist ────────────────────────────────────────────

  const expectedTables = [
    "User",
    "Account",
    "Session",
    "VerificationToken",
    "Submission",
    "Progress",
    "QuizSubmission",
    "Streak",
    "Achievement",
    "UserAchievement",
    "Note",
    "Bookmark",
    "AIChat",
    "AIChatMessage",
    "UserMemory",
    "Roadmap",
    "Module",
    "Topic",
    "Lesson",
    "Exercise",
    "Quiz",
    "QuizQuestion",
    "Project",
  ];

  it.each(expectedTables)("creates the %s table", (tableName) => {
    const result = db.exec(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].values.length).toBeGreaterThan(0);
  });

  // ── Verify JSON fields are stored as TEXT in SQLite ────────────────────

  describe("JSON fields are stored as TEXT (String)", () => {
    it("Lesson.objectives is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(Lesson)");
      const objectivesCol = info[0].values.find((row) => row[1] === "objectives");
      expect(objectivesCol).toBeDefined();
      expect(objectivesCol![2]).toBe("TEXT");
    });

    it("Exercise.testCases is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(Exercise)");
      const testCasesCol = info[0].values.find((row) => row[1] === "testCases");
      expect(testCasesCol).toBeDefined();
      expect(testCasesCol![2]).toBe("TEXT");
    });

    it("Exercise.hints is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(Exercise)");
      const hintsCol = info[0].values.find((row) => row[1] === "hints");
      expect(hintsCol).toBeDefined();
      expect(hintsCol![2]).toBe("TEXT");
    });

    it("QuizQuestion.options is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(QuizQuestion)");
      const optionsCol = info[0].values.find((row) => row[1] === "options");
      expect(optionsCol).toBeDefined();
      expect(optionsCol![2]).toBe("TEXT");
    });

    it("Project.requirements is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(Project)");
      const requirementsCol = info[0].values.find((row) => row[1] === "requirements");
      expect(requirementsCol).toBeDefined();
      expect(requirementsCol![2]).toBe("TEXT");
    });

    it("Project.milestones is TEXT type", () => {
      const info = db.exec("PRAGMA table_info(Project)");
      const milestonesCol = info[0].values.find((row) => row[1] === "milestones");
      expect(milestonesCol).toBeDefined();
      expect(milestonesCol![2]).toBe("TEXT");
    });
  });

  // ── Verify unique indexes ─────────────────────────────────────────────

  describe("unique indexes", () => {
    it("User has unique email", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='User' AND sql LIKE '%email%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Roadmap has unique slug", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Roadmap' AND sql LIKE '%slug%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Module has unique slug", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Module' AND sql LIKE '%slug%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Topic has unique slug", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Topic' AND sql LIKE '%slug%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Lesson has unique (topicId, slug)", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Lesson' AND sql LIKE '%topicId%slug%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Exercise has unique (topicId, slug)", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Exercise' AND sql LIKE '%topicId%slug%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Bookmark has unique (userId, targetId)", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Bookmark' AND sql LIKE '%userId%targetId%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("Progress has unique (userId, lessonId)", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='Progress' AND sql LIKE '%userId%lessonId%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });

    it("UserMemory has unique (userId, key)", () => {
      const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='UserMemory' AND sql LIKE '%userId%key%'"
      );
      expect(result.length).toBeGreaterThan(0);
    });
  });

  // ── Verify foreign key constraints ────────────────────────────────────

  describe("foreign key relationships", () => {
    it("Progress references User", () => {
      const result = db.exec("PRAGMA foreign_key_list(Progress)");
      const fk = result[0]?.values.find((row) => row[2] === "User");
      expect(fk).toBeDefined();
    });

    it("Lesson references Topic", () => {
      const result = db.exec("PRAGMA foreign_key_list(Lesson)");
      const fk = result[0]?.values.find((row) => row[2] === "Topic");
      expect(fk).toBeDefined();
    });

    it("Exercise references Topic", () => {
      const result = db.exec("PRAGMA foreign_key_list(Exercise)");
      const fk = result[0]?.values.find((row) => row[2] === "Topic");
      expect(fk).toBeDefined();
    });

    it("Note references User", () => {
      const result = db.exec("PRAGMA foreign_key_list(Note)");
      const fk = result[0]?.values.find((row) => row[2] === "User");
      expect(fk).toBeDefined();
    });

    it("AIChatMessage references AIChat", () => {
      const result = db.exec("PRAGMA foreign_key_list(AIChatMessage)");
      const fk = result[0]?.values.find((row) => row[2] === "AIChat");
      expect(fk).toBeDefined();
    });

    it("Module references Roadmap", () => {
      const result = db.exec("PRAGMA foreign_key_list(Module)");
      const fk = result[0]?.values.find((row) => row[2] === "Roadmap");
      expect(fk).toBeDefined();
    });

    it("Topic references Module", () => {
      const result = db.exec("PRAGMA foreign_key_list(Topic)");
      const fk = result[0]?.values.find((row) => row[2] === "Module");
      expect(fk).toBeDefined();
    });
  });

  // ── Verify triggers (updatedAt) ───────────────────────────────────────

  describe("updatedAt triggers", () => {
    const tablesWithUpdatedAt = [
      "User",
      "Progress",
      "Note",
      "AIChat",
      "UserMemory",
      "Roadmap",
      "Module",
      "Topic",
      "Lesson",
      "Exercise",
      "Quiz",
      "Project",
    ];

    it.each(tablesWithUpdatedAt)(
      "%s has an updatedAt trigger",
      (tableName) => {
        const result = db.exec(
          `SELECT name FROM sqlite_master WHERE type='trigger' AND name='${tableName}_updatedAt'`
        );
        expect(result.length).toBeGreaterThan(0);
      }
    );
  });
});

// ---------------------------------------------------------------------------
// Data insertion tests — verify we can insert and query JSON-as-String
// ---------------------------------------------------------------------------

describe("SQLite Data Operations", () => {
  it("can insert and query a User", () => {
    db.run(
      `INSERT INTO "User" (id, name, email, "createdAt", "updatedAt") VALUES ('test-user-1', 'Test User', 'test@example.com', datetime('now'), datetime('now'))`
    );
    const result = db.exec("SELECT * FROM \"User\" WHERE id = 'test-user-1'");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].values[0][0]).toBe("test-user-1");
  });

  it("can insert and query a Roadmap with curriculum hierarchy", () => {
    db.run(
      `INSERT INTO "Roadmap" (id, title, slug, description, "order", "isPublished", "createdAt", "updatedAt") VALUES ('rm-1', 'Phase 1', 'phase-1', 'Fundamentals', 1, 1, datetime('now'), datetime('now'))`
    );
    db.run(
      `INSERT INTO "Module" (id, title, slug, description, "order", "isPublished", "createdAt", "updatedAt", "roadmapId") VALUES ('mod-1', 'Getting Started', 'getting-started', 'Setup', 1, 1, datetime('now'), datetime('now'), 'rm-1')`
    );
    db.run(
      `INSERT INTO "Topic" (id, title, slug, description, "order", "isPublished", "createdAt", "updatedAt", "moduleId") VALUES ('topic-1', 'Hello World', 'hello-world', 'First program', 1, 1, datetime('now'), datetime('now'), 'mod-1')`
    );

    const result = db.exec(`
      SELECT r.title as roadmap, m.title as module, t.title as topic
      FROM Roadmap r
      JOIN Module m ON m.roadmapId = r.id
      JOIN Topic t ON t.moduleId = m.id
      WHERE r.id = 'rm-1'
    `);
    expect(result[0].values[0]).toEqual(["Phase 1", "Getting Started", "Hello World"]);
  });

  it("can store and retrieve JSON-as-String in Lesson.objectives", () => {
    const objectives = JSON.stringify(["Learn variables", "Write functions"]);

    db.run(
      `INSERT INTO "Lesson" (id, title, slug, content, objectives, duration, "xpReward", "order", "isPublished", "createdAt", "updatedAt", "topicId")
       VALUES ('lesson-1', 'Variables', 'variables', 'Content here', '${objectives}', 15, 50, 1, 1, datetime('now'), datetime('now'), 'topic-1')`
    );

    const result = db.exec("SELECT objectives FROM \"Lesson\" WHERE id = 'lesson-1'");
    const rawValue = result[0].values[0][0] as string;
    expect(typeof rawValue).toBe("string");
    const parsed = JSON.parse(rawValue);
    expect(parsed).toEqual(["Learn variables", "Write functions"]);
  });

  it("can store and retrieve JSON-as-String in Exercise.testCases", () => {
    const testCases = JSON.stringify([
      { input: "5", expected: "25" },
      { input: "10", expected: "100" },
    ]);

    db.run(
      `INSERT INTO "Exercise" (id, title, slug, description, "starterCode", solution, "testCases", hints, difficulty, "xpReward", "order", "isPublished", "createdAt", "updatedAt", "topicId")
       VALUES ('ex-1', 'Square', 'square', 'Square a number', 'def square(n):', 'def square(n): return n*n', '${testCases}', '[]', 'beginner', 20, 1, 1, datetime('now'), datetime('now'), 'topic-1')`
    );

    const result = db.exec("SELECT testCases FROM \"Exercise\" WHERE id = 'ex-1'");
    const rawValue = result[0].values[0][0] as string;
    const parsed = JSON.parse(rawValue);
    expect(parsed).toEqual([
      { input: "5", expected: "25" },
      { input: "10", expected: "100" },
    ]);
  });

  it("can store and retrieve JSON-as-String in QuizQuestion.options", () => {
    const options = JSON.stringify(["print()", "echo()", "console.log()"]);

    db.run(
      `INSERT INTO "Quiz" (id, title, slug, description, "xpReward", "order", "isPublished", "createdAt", "updatedAt", "topicId")
       VALUES ('quiz-1', 'Basics Quiz', 'basics-quiz', 'Test your knowledge', 100, 1, 1, datetime('now'), datetime('now'), 'topic-1')`
    );
    db.run(
      `INSERT INTO "QuizQuestion" (id, question, options, "correctOption", explanation, "order", "quizId")
       VALUES ('qq-1', 'How to print?', '${options}', 0, 'print() is correct', 1, 'quiz-1')`
    );

    const result = db.exec("SELECT options FROM \"QuizQuestion\" WHERE id = 'qq-1'");
    const rawValue = result[0].values[0][0] as string;
    const parsed = JSON.parse(rawValue);
    expect(parsed).toEqual(["print()", "echo()", "console.log()"]);
  });

  it("can store and retrieve user notes", () => {
    db.run(
      `INSERT INTO "Note" (id, content, module, "lessonRef", "createdAt", "updatedAt", "userId")
       VALUES ('note-1', 'Remember: Python is dynamically typed', '1.2 Variables', 'variables', datetime('now'), datetime('now'), 'test-user-1')`
    );

    const result = db.exec("SELECT content, module FROM \"Note\" WHERE id = 'note-1'");
    expect(result[0].values[0]).toEqual([
      "Remember: Python is dynamically typed",
      "1.2 Variables",
    ]);
  });

  it("can store and retrieve user progress", () => {
    db.run(
      `INSERT INTO "Progress" (id, status, "timeSpent", "createdAt", "updatedAt", "userId", "lessonId")
       VALUES ('prog-1', 'completed', 300, datetime('now'), datetime('now'), 'test-user-1', 'lesson-1')`
    );

    const result = db.exec("SELECT status, timeSpent FROM \"Progress\" WHERE id = 'prog-1'");
    expect(result[0].values[0]).toEqual(["completed", 300]);
  });

  it("can store and retrieve bookmarks", () => {
    db.run(
      `INSERT INTO "Bookmark" (id, title, type, "targetId", module, "createdAt", "userId")
       VALUES ('bm-1', 'Variables Lesson', 'lesson', 'variables', '1.2', datetime('now'), 'test-user-1')`
    );

    const result = db.exec("SELECT title, type, targetId FROM \"Bookmark\" WHERE id = 'bm-1'");
    expect(result[0].values[0]).toEqual(["Variables Lesson", "lesson", "variables"]);
  });

  it("can store and retrieve AI chat messages", () => {
    db.run(
      `INSERT INTO "AIChat" (id, title, context, "createdAt", "updatedAt", "userId")
       VALUES ('chat-1', 'Python Help', '{"topicSlug":"variables"}', datetime('now'), datetime('now'), 'test-user-1')`
    );
    db.run(
      `INSERT INTO "AIChatMessage" (id, role, content, code, "createdAt", "chatId")
       VALUES ('msg-1', 'user', 'How do I create a variable?', NULL, datetime('now'), 'chat-1')`
    );

    const result = db.exec(`
      SELECT c.title, m.role, m.content
      FROM AIChat c
      JOIN AIChatMessage m ON m.chatId = c.id
      WHERE c.id = 'chat-1'
    `);
    expect(result[0].values[0]).toEqual([
      "Python Help",
      "user",
      "How do I create a variable?",
    ]);
  });

  it("enforces unique email on User", () => {
    expect(() => {
      db.run(
        `INSERT INTO "User" (id, name, email, "createdAt", "updatedAt") VALUES ('test-user-2', 'Another', 'test@example.com', datetime('now'), datetime('now'))`
      );
    }).toThrow();
  });

  it("enforces unique (userId, lessonId) on Progress", () => {
    expect(() => {
      db.run(
        `INSERT INTO "Progress" (id, status, "timeSpent", "createdAt", "updatedAt", "userId", "lessonId")
         VALUES ('prog-2', 'in_progress', 100, datetime('now'), datetime('now'), 'test-user-1', 'lesson-1')`
      );
    }).toThrow();
  });

  it("enforces unique (userId, targetId) on Bookmark", () => {
    expect(() => {
      db.run(
        `INSERT INTO "Bookmark" (id, title, type, "targetId", "createdAt", "userId")
         VALUES ('bm-2', 'Variables Lesson', 'lesson', 'variables', datetime('now'), 'test-user-1')`
      );
    }).toThrow();
  });

  it("cascades delete when User is deleted", () => {
    // Create a separate user with notes
    db.run(
      `INSERT INTO "User" (id, name, email, "createdAt", "updatedAt") VALUES ('del-user', 'Delete Me', 'del@example.com', datetime('now'), datetime('now'))`
    );
    db.run(
      `INSERT INTO "Note" (id, content, "createdAt", "updatedAt", "userId")
       VALUES ('del-note', 'Will be deleted', datetime('now'), datetime('now'), 'del-user')`
    );

    // Verify note exists
    let result = db.exec("SELECT * FROM \"Note\" WHERE id = 'del-note'");
    expect(result.length).toBeGreaterThan(0);

    // Enable foreign keys and delete user
    db.run("PRAGMA foreign_keys = ON");
    db.run("DELETE FROM \"User\" WHERE id = 'del-user'");

    // Note should be cascade-deleted
    result = db.exec("SELECT * FROM \"Note\" WHERE id = 'del-note'");
    expect(result.length).toBe(0);
  });
});
