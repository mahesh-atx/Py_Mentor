/**
 * Schema Synchronization Test
 *
 * Verifies that the PostgreSQL schema and SQLite schema have the same
 * models, fields, and relationships. The ONLY differences should be:
 *   - datasource provider (postgresql vs sqlite)
 *   - Json fields → String fields in SQLite
 *
 * This test catches accidental drift between the two schemas.
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Parse a Prisma schema into a map of model names → field definitions
function parsePrismaSchema(content: string) {
  const models: Record<string, { fields: Record<string, { type: string; raw: string }>; uniques: string[] }> = {};
  let currentModel = "";

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    // Match model declaration
    const modelMatch = trimmed.match(/^model\s+(\w+)\s*\{/);
    if (modelMatch) {
      currentModel = modelMatch[1];
      models[currentModel] = { fields: {}, uniques: [] };
      continue;
    }

    if (trimmed === "}" && currentModel) {
      currentModel = "";
      continue;
    }

    if (!currentModel) continue;

    // Match field definition (name + type)
    const fieldMatch = trimmed.match(/^(\w+)\s+(\w+)/);
    if (fieldMatch && !trimmed.startsWith("//") && !trimmed.startsWith("@@")) {
      const [, name, type] = fieldMatch;
      models[currentModel].fields[name] = { type, raw: trimmed };
    }

    // Match @@unique
    const uniqueMatch = trimmed.match(/@@unique\(\[([^\]]+)\]\)/);
    if (uniqueMatch) {
      models[currentModel].uniques.push(uniqueMatch[1]);
    }
  }

  return models;
}

describe("PostgreSQL ↔ SQLite Schema Sync", () => {
  const pgSchema = fs.readFileSync(
    path.join(__dirname, "..", "prisma", "schema.prisma"),
    "utf-8"
  );
  const sqliteSchema = fs.readFileSync(
    path.join(__dirname, "..", "prisma", "schema.sqlite.prisma"),
    "utf-8"
  );

  const pgModels = parsePrismaSchema(pgSchema);
  const sqliteModels = parsePrismaSchema(sqliteSchema);

  const pgModelNames = Object.keys(pgModels).sort();
  const sqliteModelNames = Object.keys(sqliteModels).sort();

  it("has the same models in both schemas", () => {
    expect(sqliteModelNames).toEqual(pgModelNames);
  });

  // For each model, check that all fields exist in both schemas
  describe.each(pgModelNames)("Model: %s", (modelName) => {
    const pgFields = Object.keys(pgModels[modelName].fields).sort();
    const sqliteFields = Object.keys(sqliteModels[modelName]?.fields ?? {}).sort();

    it("has the same fields", () => {
      expect(sqliteFields).toEqual(pgFields);
    });

    // Check that the ONLY type differences are Json → String
    it("only differs in Json → String type conversions", () => {
      for (const fieldName of pgFields) {
        const pgType = pgModels[modelName].fields[fieldName].type;
        const sqliteType = sqliteModels[modelName]?.fields[fieldName]?.type;

        if (!sqliteType) continue;

        if (pgType === "Json" && sqliteType === "String") {
          // This is the expected difference
          continue;
        }

        // All other types must match exactly
        expect(sqliteType).toBe(pgType);
      }
    });

    it("has the same unique constraints", () => {
      expect(sqliteModels[modelName]?.uniques ?? []).toEqual(
        pgModels[modelName].uniques
      );
    });
  });

  // ── Explicitly verify the known Json → String conversions ─────────────

  describe("known Json → String conversions", () => {
    const jsonFields: [string, string][] = [
      ["Lesson", "objectives"],
      ["Exercise", "testCases"],
      ["Exercise", "hints"],
      ["QuizQuestion", "options"],
      ["Project", "requirements"],
      ["Project", "milestones"],
    ];

    it.each(jsonFields)(
      "%s.%s is Json in PG and String in SQLite",
      (model, field) => {
        expect(pgModels[model]?.fields[field]?.type).toBe("Json");
        expect(sqliteModels[model]?.fields[field]?.type).toBe("String");
      }
    );
  });

  // ── Verify NO other fields are Json in PG that aren't String in SQLite ─

  it("no unexpected Json fields exist in PostgreSQL schema that aren't converted in SQLite", () => {
    for (const modelName of pgModelNames) {
      for (const [fieldName, fieldDef] of Object.entries(pgModels[modelName].fields)) {
        if (fieldDef.type === "Json") {
          const sqliteField = sqliteModels[modelName]?.fields[fieldName];
          expect(sqliteField?.type).toBe("String");
        }
      }
    }
  });
});
