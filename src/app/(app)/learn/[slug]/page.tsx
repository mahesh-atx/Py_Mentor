import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { ProgressService } from "@/lib/services/progress.service";
import { notFound } from "next/navigation";
import { LessonClient } from "./lesson-client";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch the topic globally
  const topic = await CurriculumService.getTopicBySlugGlobal(slug);
  
  if (!topic) {
    notFound();
  }

  // 2. Fetch navigation
  const { prevTopic, nextTopic } = await CurriculumService.getNavigation(topic.id);

  // 3. Extract lesson content
  const lesson = topic.lessons && topic.lessons.length > 0 ? topic.lessons[0] : null;
  const lessonContent = lesson ? lesson.content : "No lesson content available yet.";

  // 4. Get User Progress
  const user = await UserService.getLocalUser();
  const isCompleted = lesson ? await ProgressService.isLessonCompleted(user.id, lesson.slug) : false;

  return (
    <LessonClient 
      topic={topic}
      lessonId={lesson?.slug}
      lessonContent={lessonContent}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
      initialIsCompleted={isCompleted}
    />
  );
}
