"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Bot, ChevronLeft, ChevronRight, CheckCircle2, Copy, ArrowDown } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    // Only show scroll hint if content is actually scrollable
    const checkScrollable = () => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
          setShowScrollHint(true);
        } else {
          setShowScrollHint(false);
        }
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [lessonContent]);

  // Extract headings from markdown content
  const headings = useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extracted = [];
    let match;
    while ((match = headingRegex.exec(lessonContent)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      extracted.push({ level, text, id });
    }
    return extracted;
  }, [lessonContent]);

  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0 || !scrollRef.current) return;
    const container = scrollRef.current;
    
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScrollSpy = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        let currentActiveId = '';
        
        for (const el of headingElements) {
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          
          if (relativeTop <= 150) {
            currentActiveId = el.id;
          }
        }
        
        if (currentActiveId) {
          setActiveHeadingId(currentActiveId);
        } else if (container.scrollTop < 100) {
          setActiveHeadingId('');
        }
        
        timeoutId = null;
      }, 50); // 50ms throttle
    };

    container.addEventListener('scroll', handleScrollSpy);
    
    // Initial check with a slight delay to ensure render
    setTimeout(handleScrollSpy, 100);
    
    return () => {
      container.removeEventListener('scroll', handleScrollSpy);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [headings]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollHint(e.currentTarget.scrollTop <= 10);
  };

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

  // Custom components to inject IDs for scrolling
  const generateSlug = (children: any) => {
    return String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const MarkdownComponents = {
    h2: ({ node, children, ...props }: any) => (
      <h2 id={generateSlug(children)} className="scroll-m-20" {...props}>
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }: any) => (
      <h3 id={generateSlug(children)} className="scroll-m-20" {...props}>
        {children}
      </h3>
    ),
  };

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-5rem)] overflow-hidden relative">
      
      {/* Main Content Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 xl:pr-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        
        {/* Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Module {topic.module.order}</Badge>
            <span className="text-sm font-medium text-muted-foreground">{topic.module.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{topic.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {topic.description}
          </p>
        </header>

        <Separator className="max-w-3xl" />

        {/* Content Body */}
        <article className="prose prose-neutral dark:prose-invert max-w-3xl prose-headings:font-semibold prose-a:text-primary overflow-x-hidden">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
            components={MarkdownComponents}
          >
            {lessonContent}
          </ReactMarkdown>
        </article>

        <Separator className="max-w-3xl" />

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

      {/* Right Sidebar Minimap (TOC) */}
      {headings.length > 0 && (
        <aside className="hidden xl:block w-64 shrink-0 pl-8 pt-8 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden">
          <div className="sticky top-8">
            <h4 className="font-medium text-sm mb-6 flex items-center text-foreground">
              <span className="opacity-70 mr-2 text-lg leading-none mt-[-2px]">≡</span> On this page
            </h4>
            <nav className="flex flex-col relative border-l border-border/40 ml-[2px]">
              {headings.map((heading, i) => {
                const isActive = activeHeadingId === heading.id;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const el = document.getElementById(heading.id);
                      const container = scrollRef.current;
                      if (el && container) {
                        const containerRect = container.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const scrollTop = container.scrollTop;
                        const targetScroll = scrollTop + (elRect.top - containerRect.top) - 40;
                        
                        container.scrollTo({
                          top: targetScroll,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`relative text-left py-2 pl-4 transition-all duration-200 text-sm ${
                      isActive 
                        ? 'text-success font-medium' 
                        : 'text-muted-foreground hover:text-foreground'
                    } ${heading.level === 3 ? 'pl-8' : ''}`}
                  >
                    {isActive && (
                      <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-success rounded-full" />
                    )}
                    {heading.text}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      {/* Scroll Hint Popup */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 xl:-translate-x-[calc(50%+8rem)] flex items-center gap-1 bg-card text-card-foreground border border-border px-3 py-3 rounded-full shadow-xl transition-all duration-500 pointer-events-none z-50 ${showScrollHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        <span className="text-sm font-medium">Scroll to read more</span>
      </div>

    </div>
  );
}
