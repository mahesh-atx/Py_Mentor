import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserService } from "@/lib/services/user.service";

export default async function DailyChallengePage() {
  const user = await UserService.getLocalUser();

  // Find all exercises the user hasn't completed
  const exercises = await db.exercise.findMany({
    where: {
      isPublished: true,
      NOT: {
        submissions: {
          some: {
            userId: user.id,
            status: "passed"
          }
        }
      }
    }
  });

  if (exercises.length === 0) {
    // If they have completed all exercises, just pick a random one to review
    const allExercises = await db.exercise.findMany({
      where: { isPublished: true }
    });
    
    if (allExercises.length === 0) {
      redirect("/dashboard");
    }
    
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    redirect(`/practice/${allExercises[randomIndex].slug}`);
  }

  // Pick a random uncompleted exercise
  const randomIndex = Math.floor(Math.random() * exercises.length);
  const selectedExercise = exercises[randomIndex];

  redirect(`/practice/${selectedExercise.slug}`);
}
