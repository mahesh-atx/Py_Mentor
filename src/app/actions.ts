"use server";

import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { GamificationService } from "@/lib/services/gamification.service";
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
