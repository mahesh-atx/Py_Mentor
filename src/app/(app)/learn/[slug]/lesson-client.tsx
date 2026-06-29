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

export interface NavigationTopic {
  id: string;
  title: string;
  slug: string;
}

export interface LessonClientProps {
  topic: any;
  lessonContent: string;
  prevTopic: NavigationTopic | null;
  nextTopic: NavigationTopic | null;
}

export function LessonClient({ topic, lessonContent, prevTopic, nextTopic }: LessonClientProps) {
  const router = useRouter();

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
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 lg:pb-4 max-w-3xl">
          {prevTopic ? (
            <Link 
              href={`/learn/${prevTopic.slug}`}
              className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous: {prevTopic.title}
            </Link>
          ) : (
            <div /> // Empty div to keep flex space-between alignment
          )}
          
          <div className="flex gap-4 w-full sm:w-auto">
            {topic.quizzes && topic.quizzes.length > 0 && (
              <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => router.push('/quiz')}>
                Take Quiz
              </Button>
            )}
            {topic.exercises && topic.exercises.length > 0 && (
              <Button onClick={() => router.push('/practice')} className="flex-1 sm:flex-none gap-2">
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
      <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l bg-muted/20 flex flex-col h-[400px] lg:h-auto shrink-0">
        <div className="p-4 border-b bg-background flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold">AI Mentor</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-background border rounded-xl p-3 shadow-sm rounded-tl-none">
            <p className="text-sm">Hi! I'm your AI Mentor. I noticed you're learning about {topic.title.toLowerCase()}.</p>
          </div>
          <div className="bg-background border rounded-xl p-3 shadow-sm rounded-tl-none">
            <p className="text-sm">I'm not fully hooked up yet (that's Phase 10!), but soon you'll be able to ask me anything about this lesson.</p>
          </div>
        </div>

        <div className="p-4 bg-background border-t">
          <Button variant="outline" className="w-full justify-start text-muted-foreground h-10 disabled:opacity-50" disabled>
            Ask a question...
          </Button>
        </div>
      </div>

    </div>
  );
}
