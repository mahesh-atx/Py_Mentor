import { CurriculumService } from "@/lib/services/curriculum.service";
import { notFound } from "next/navigation";
import { PracticeClient } from "./practice-client";

export default async function PracticeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const exercise = await CurriculumService.getExerciseBySlug(slug);
  
  if (!exercise) {
    notFound();
  }

  return <PracticeClient exercise={exercise} />;
}
