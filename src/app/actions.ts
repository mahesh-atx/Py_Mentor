"use server";

import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { GamificationService } from "@/lib/services/gamification.service";
import { NotesService } from "@/lib/services/notes.service";
import { AIChatService } from "@/lib/services/ai-chat.service";
import { revalidatePath } from "next/cache";

export async function completeLessonAction(lessonId: string) {
  try {
    const user = await UserService.getLocalUser();
    await ProgressService.markLessonComplete(user.id, lessonId);
    
    // Check for new achievements
    const unlockedAchievements = await GamificationService.checkAchievements(user.id);
    
    // Revalidate paths so the UI updates
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
  testResults
}: {
  exerciseId: string;
  code: string;
  status: "passed" | "failed" | "error";
  testResults: any;
}) {
  try {
    const user = await UserService.getLocalUser();
    await ProgressService.saveExerciseSubmission({
      userId: user.id,
      exerciseId,
      code,
      status,
      testResults
    });
    
    // Check for new achievements
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
  try {
    const user = await UserService.getLocalUser();
    const { QuizService } = await import("@/lib/services/quiz.service");
    
    const result = await QuizService.saveQuizSubmission({
      userId: user.id,
      quizId,
      score,
      total
    });
    
    // Check for new achievements
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
  try {
    const user = await UserService.getLocalUser();
    await ProgressService.saveProjectSubmission({
      userId: user.id,
      projectId,
      repoUrl
    });
    
    // Check for new achievements
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
  try {
    const message = await AIChatService.addMessage(chatId, role, content, code);
    return { success: true, message };
  } catch (error) {
    console.error("Failed to add chat message", error);
    return { success: false, error: "Failed to add chat message" };
  }
}
