import { CurriculumService } from "@/lib/services/curriculum.service";
import { notFound } from "next/navigation";
import { LessonClient } from "./lesson-client";

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1. Fetch the topic globally
  const topic = await CurriculumService.getTopicBySlugGlobal(slug);
  
  if (!topic) {
    notFound();
  }

  // 2. Fetch navigation
  const { prevTopic, nextTopic } = await CurriculumService.getNavigation(topic.id);

  // 3. Extract lesson content (assuming the first lesson is the primary content for this topic)
  const lessonContent = topic.lessons && topic.lessons.length > 0 
    ? topic.lessons[0].content 
    : "No lesson content available yet.";

  return (
    <LessonClient 
      topic={topic}
      lessonContent={lessonContent}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
    />
  );
}
