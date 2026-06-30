"use client";

import { useState } from "react";
import { Bot, ChevronLeft, ChevronRight, CheckCircle2, Copy } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { AiMentorSidebar } from "@/components/ai-mentor-sidebar";

export interface NavigationTopic {
  id: string;
  title: string;
  slug: string;
}

export interface LessonClientProps {
  topic: any;
  lessonId?: string;
  lessonContent: string;
  prevTopic: NavigationTopic | null;
  nextTopic: NavigationTopic | null;
  initialIsCompleted?: boolean;
}

export function LessonClient({ topic, lessonId, lessonContent, prevTopic, nextTopic, initialIsCompleted = false }: LessonClientProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (!lessonId || isCompleted) return;
    setIsCompleting(true);
    try {
      const { completeLessonAction } = await import("@/app/actions");
      const result = await completeLessonAction(lessonId);
      if (result.success) {
        setIsCompleted(true);
        toast.success("Lesson marked as complete! +50 XP");
        
        if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
          result.unlockedAchievements.forEach((ach: any) => {
            toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
              duration: 5000,
            });
          });
        }
      } else {
        toast.error("Failed to mark as complete.");
      }
    } catch (e) {
      toast.error("Error updating progress.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 lg:pr-8">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Module {topic.module.order}</Badge>
            <span className="text-sm font-medium text-muted-foreground">{topic.module.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{topic.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {topic.description}
          </p>
        </header>

        <Separator />

        {/* Content Body */}
        <article className="prose prose-neutral dark:prose-invert max-w-3xl prose-headings:font-semibold prose-a:text-primary overflow-x-hidden">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
          >
            {lessonContent}
          </ReactMarkdown>
        </article>

        <Separator />

        {/* Bottom Navigation */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 lg:pb-4 max-w-3xl border-t mt-8">
          {prevTopic ? (
            <Link 
              href={`/learn/${prevTopic.slug}`}
              className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous: {prevTopic.title}
            </Link>
          ) : (
            <div />
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            {lessonId && !isCompleted && (
              <Button 
                variant="default" 
                className="flex-1 sm:flex-none gap-2 bg-success text-success-foreground hover:bg-success/90" 
                onClick={handleComplete}
                disabled={isCompleting}
              >
                {isCompleting ? "Saving..." : <><CheckCircle2 className="h-4 w-4" /> Mark as Complete</>}
              </Button>
            )}
            
            {topic.quizzes && topic.quizzes.length > 0 && (
              <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => router.push(`/quiz/${topic.quizzes![0].slug}`)}>
                Take Quiz
              </Button>
            )}
            {topic.exercises && topic.exercises.length > 0 && (
              <Button onClick={() => router.push(`/practice/${topic.exercises[0].slug}`)} className="flex-1 sm:flex-none gap-2">
                Practice Code <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            {nextTopic && (!topic.exercises || topic.exercises.length === 0) && (
              <Button onClick={() => router.push(`/learn/${nextTopic.slug}`)} className="flex-1 sm:flex-none gap-2">
                Next: {nextTopic.title} <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </footer>

      </div>

      {/* AI Mentor Sidebar (Sticky on Desktop) */}
      <AiMentorSidebar topicTitle={topic.title} />

    </div>
  );
}
