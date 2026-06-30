import { CurriculumService } from "@/lib/services/curriculum.service";
import { redirect } from "next/navigation";

export default async function PracticeRootRedirect() {
  const firstExercise = await CurriculumService.getFirstExercise();
  
  if (firstExercise) {
    redirect(`/practice/${firstExercise.slug}`);
  }

  // Fallback
  redirect("/");
}
