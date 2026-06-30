import { QuizService } from "@/lib/services/quiz.service";
import { CurriculumService } from "@/lib/services/curriculum.service";
import { notFound } from "next/navigation";
import { QuizClient } from "./quiz-client";

export default async function QuizSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const quiz = await QuizService.getQuizBySlug(slug);
  
  if (!quiz) {
    notFound();
  }

  // Get the next topic for navigation after quiz completion
  const { nextTopic } = await CurriculumService.getNavigation(quiz.topicId);

  return (
    <QuizClient 
      quiz={quiz} 
      nextTopicSlug={nextTopic?.slug || null} 
    />
  );
}
