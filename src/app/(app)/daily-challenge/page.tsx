import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserService } from "@/lib/services/user.service";
import { allExercises } from "@/lib/curriculum-data";

export default async function DailyChallengePage() {
  const user = await UserService.getLocalUser();

  const userSubmissions = await db.submission.findMany({
    where: {
      userId: user.id,
      status: "passed",
      exerciseId: { not: null }
    }
  });
  
  const passedExerciseIds = new Set(userSubmissions.map(s => s.exerciseId));
  
  const uncompletedExercises = allExercises.filter(e => !passedExerciseIds.has(e.id));

  if (uncompletedExercises.length === 0) {
    if (allExercises.length === 0) {
      redirect("/dashboard");
    }
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    redirect(`/practice/${allExercises[randomIndex].slug}`);
  }

  const randomIndex = Math.floor(Math.random() * uncompletedExercises.length);
  const selectedExercise = uncompletedExercises[randomIndex];

  redirect(`/practice/${selectedExercise.slug}`);
}
