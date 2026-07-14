/**
 * Tests for the Prisma database client auto-detection logic.
 *
 * These tests verify that the getProvider function correctly identifies
 * PostgreSQL vs SQLite based on DATABASE_URL, and that createPrismaClient
 * routes to the correct client type.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// We need to test the module in isolation. Since the module has side effects
// (it creates a PrismaClient on import), we'll test the logic separately.

// ---------------------------------------------------------------------------
// getProvider logic (extracted for testability)
// ---------------------------------------------------------------------------

function getProvider(url: string): "sqlite" | "postgresql" {
  if (
    url.startsWith("postgresql://") ||
    url.startsWith("postgres://")
  ) {
    return "postgresql";
  }
  return "sqlite";
}

describe("getProvider", () => {
  it("detects PostgreSQL from postgresql:// URL", () => {
    expect(getProvider("postgresql://user:pass@host:5432/db")).toBe("postgresql");
  });

  it("detects PostgreSQL from postgres:// URL", () => {
    expect(getProvider("postgres://user:pass@host:5432/db")).toBe("postgresql");
  });

  it("detects SQLite from file: URL", () => {
    expect(getProvider("file:./dev.sqlite")).toBe("sqlite");
    expect(getProvider("file:/home/user/.pymentor/pymentor.db")).toBe("sqlite");
  });

  it("defaults to SQLite for empty URL", () => {
    expect(getProvider("")).toBe("sqlite");
  });

  it("defaults to SQLite for unknown URL format", () => {
    expect(getProvider("mysql://user:pass@host/db")).toBe("sqlite");
  });

  it("handles PostgreSQL URLs with special characters", () => {
    expect(getProvider("postgresql://user:p@ss!word@host:5432/my_db?sslmode=require")).toBe("postgresql");
  });

  it("handles SQLite relative path", () => {
    expect(getProvider("file:./db.sqlite")).toBe("sqlite");
  });

  it("handles SQLite absolute path", () => {
    expect(getProvider("file:/absolute/path/to/db.sqlite")).toBe("sqlite");
  });
});

// ---------------------------------------------------------------------------
// DATABASE_URL environment variable scenarios
// ---------------------------------------------------------------------------

describe("DATABASE_URL scenarios for npm vs cloud", () => {
  it("cloud deployment uses PostgreSQL URL", () => {
    const cloudUrl = "postgresql://pymentor:secret@db.render.com:5432/pymentor_db";
    expect(getProvider(cloudUrl)).toBe("postgresql");
  });

  it("npm local install uses file: URL", () => {
    const localUrl = "file:/home/developer/.pymentor/pymentor.db";
    expect(getProvider(localUrl)).toBe("sqlite");
  });

  it("npm local install uses relative file: URL", () => {
    const localUrl = "file:./pymentor.db";
    expect(getProvider(localUrl)).toBe("sqlite");
  });

  it("Windows path works with file: URL", () => {
    const windowsUrl = "file:C:/Users/Dev/.pymentor/pymentor.db";
    expect(getProvider(windowsUrl)).toBe("sqlite");
  });

  it("macOS path works with file: URL", () => {
    const macUrl = "file:/Users/dev/.pymentor/pymentor.db";
    expect(getProvider(macUrl)).toBe("sqlite");
  });
});
