"use server";

import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { GamificationService } from "@/lib/services/gamification.service";
import { NotesService } from "@/lib/services/notes.service";
import { AIChatService } from "@/lib/services/ai-chat.service";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------------------
// Input validation helpers
// ---------------------------------------------------------------------------

/** Maximum code size for an exercise submission (50 KB). */
const MAX_CODE_LENGTH = 50_000;

/** Maximum note / chat message length (100 KB). */
const MAX_TEXT_LENGTH = 100_000;

/** Maximum project URL length. */
const MAX_URL_LENGTH = 2_048;

/** Whitelist of allowed submission statuses. */
const ALLOWED_STATUSES = new Set(["passed", "failed", "error"]);

function isNonEmptyString(value: unknown, maxLen: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLen
  );
}

function parseStatus(raw: unknown): "passed" | "failed" | "error" | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim().toLowerCase();
  return ALLOWED_STATUSES.has(s) ? (s as "passed" | "failed" | "error") : null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function completeLessonAction(lessonId: string) {
  try {
    const user = await UserService.getLocalUser();
    await ProgressService.markLessonComplete(user.id, lessonId);

    const unlockedAchievements = await GamificationService.checkAchievements(user.id);

    revalidatePath("/dashboard");
    revalidatePath("/progress");
    revalidatePath("/learn/[slug]", "page");

    return { success: true, unlockedAchievements };
  } catch (error) {
    console.error("Failed to complete lesson", error);
    return { success: false, error: "Failed to mark lesson as complete" };
  }
}

export async function submitExerciseAction({
  exerciseId,
  code,
  status,
  testResults,
}: {
  exerciseId: string;
  code: string;
  status: "passed" | "failed" | "error";
  testResults: any;
}) {
  // ── Validate inputs ───────────────────────────────────────────────────
  if (!isNonEmptyString(exerciseId, 200)) {
    return { success: false, error: "Invalid exercise ID." };
  }
  if (!isNonEmptyString(code, MAX_CODE_LENGTH)) {
    return {
      success: false,
      error: `Code is required and must be under ${MAX_CODE_LENGTH} characters.`,
    };
  }
  const parsedStatus = parseStatus(status);
  if (!parsedStatus) {
    return { success: false, error: "Status must be 'passed', 'failed', or 'error'." };
  }

  try {
    const user = await UserService.getLocalUser();
    await ProgressService.saveExerciseSubmission({
      userId: user.id,
      exerciseId,
      code,
      status: parsedStatus,
      testResults,
    });

    const unlockedAchievements = await GamificationService.checkAchievements(user.id);

    revalidatePath("/dashboard");
    revalidatePath("/progress");
    revalidatePath("/practice/[slug]", "page");

    return { success: true, unlockedAchievements };
  } catch (error) {
    console.error("Failed to submit exercise", error);
    return { success: false, error: "Failed to submit exercise" };
  }
}

export async function submitQuizAction(quizId: string, score: number, total: number) {
  // ── Validate ──────────────────────────────────────────────────────────
  if (!isNonEmptyString(quizId, 200)) {
    return { success: false, error: "Invalid quiz ID." };
  }
  if (typeof score !== "number" || typeof total !== "number" || total <= 0 || score < 0 || score > total) {
    return { success: false, error: "Invalid score or total." };
  }

  try {
    const user = await UserService.getLocalUser();
    const { QuizService } = await import("@/lib/services/quiz.service");

    const result = await QuizService.saveQuizSubmission({
      userId: user.id,
      quizId,
      score,
      total,
    });

    const unlockedAchievements = await GamificationService.checkAchievements(user.id);

    revalidatePath("/dashboard");
    revalidatePath("/progress");
    revalidatePath("/quiz/[slug]", "page");

    return { success: true, earnedXp: result.earnedXp, unlockedAchievements };
  } catch (error) {
    console.error("Failed to submit quiz", error);
    return { success: false, error: "Failed to submit quiz" };
  }
}

export async function submitProjectAction(projectId: string, repoUrl: string) {
  // ── Validate ──────────────────────────────────────────────────────────
  if (!isNonEmptyString(projectId, 200)) {
    return { success: false, error: "Invalid project ID." };
  }
  if (!isNonEmptyString(repoUrl, MAX_URL_LENGTH)) {
    return { success: false, error: "Repository URL is required." };
  }

  try {
    const user = await UserService.getLocalUser();
    await ProgressService.saveProjectSubmission({
      userId: user.id,
      projectId,
      repoUrl,
    });

    const unlockedAchievements = await GamificationService.checkAchievements(user.id);

    revalidatePath("/dashboard");
    revalidatePath("/progress");
    revalidatePath("/projects/[slug]", "page");

    return { success: true, unlockedAchievements };
  } catch (error) {
    console.error("Failed to submit project", error);
    return { success: false, error: "Failed to submit project" };
  }
}

// ----------------------------------------------------------------------------
// NOTES & BOOKMARKS ACTIONS
// ----------------------------------------------------------------------------

export async function createNoteAction(content: string, module?: string, lessonRef?: string) {
  if (!isNonEmptyString(content, MAX_TEXT_LENGTH)) {
    return { success: false, error: "Note content is required." };
  }

  try {
    const user = await UserService.getLocalUser();
    const note = await NotesService.createNote(user.id, content, module, lessonRef);
    revalidatePath("/notes");
    return { success: true, note };
  } catch (error) {
    console.error("Failed to create note", error);
    return { success: false, error: "Failed to create note" };
  }
}

export async function deleteNoteAction(noteId: string) {
  try {
    await NotesService.deleteNote(noteId);
    revalidatePath("/notes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete note", error);
    return { success: false, error: "Failed to delete note" };
  }
}

export async function toggleBookmarkAction(title: string, type: string, targetId: string, module?: string) {
  if (!isNonEmptyString(title, 200) || !isNonEmptyString(targetId, 200)) {
    return { success: false, error: "Invalid bookmark data." };
  }

  try {
    const user = await UserService.getLocalUser();
    const result = await NotesService.toggleBookmark(user.id, title, type, targetId, module);
    revalidatePath("/notes");
    return { success: true, bookmarked: result.bookmarked };
  } catch (error) {
    console.error("Failed to toggle bookmark", error);
    return { success: false, error: "Failed to toggle bookmark" };
  }
}

export async function getNotesAction() {
  try {
    const user = await UserService.getLocalUser();
    const notes = await NotesService.getNotes(user.id);
    return { success: true, notes };
  } catch (error) {
    console.error("Failed to get notes", error);
    return { success: false, error: "Failed to get notes" };
  }
}

export async function getBookmarksAction() {
  try {
    const user = await UserService.getLocalUser();
    const bookmarks = await NotesService.getBookmarks(user.id);
    return { success: true, bookmarks };
  } catch (error) {
    console.error("Failed to get bookmarks", error);
    return { success: false, error: "Failed to get bookmarks" };
  }
}

// ----------------------------------------------------------------------------
// AI CHAT ACTIONS
// ----------------------------------------------------------------------------

export async function getChatHistoryAction() {
  try {
    const user = await UserService.getLocalUser();
    const history = await AIChatService.getChatHistory(user.id);
    return { success: true, history };
  } catch (error) {
    console.error("Failed to get chat history", error);
    return { success: false, error: "Failed to get chat history" };
  }
}

export async function createChatAction(title?: string, context?: string) {
  try {
    const user = await UserService.getLocalUser();
    const chat = await AIChatService.createChat(user.id, title, context);
    return { success: true, chat };
  } catch (error) {
    console.error("Failed to create chat", error);
    return { success: false, error: "Failed to create chat" };
  }
}

export async function addChatMessageAction(chatId: string, role: string, content: string, code?: string) {
  if (!isNonEmptyString(content, MAX_TEXT_LENGTH)) {
    return { success: false, error: "Message content is required." };
  }

  try {
    const message = await AIChatService.addMessage(chatId, role, content, code);
    return { success: true, message };
  } catch (error) {
    console.error("Failed to add chat message", error);
    return { success: false, error: "Failed to add chat message" };
  }
}
