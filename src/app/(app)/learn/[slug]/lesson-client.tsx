"use client";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Bot, ChevronLeft, ChevronRight, CheckCircle2, Copy, ArrowDown, Play, Terminal as TerminalIcon, ChevronDown, PanelRight, BrainCircuit, Code2, BookOpen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { remarkAlerts } from "@/lib/remark-alerts";
import { Info, AlertTriangle, Lightbulb, ShieldAlert, Shield } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { usePyodide } from "@/lib/hooks/usePyodide";
import { MentorContextProvider } from "@/components/mentor-context";

export interface NavigationTopic {
  id: string;
  title: string;
  slug: string;
  description?: string;
  module?: any;
}

export interface LessonClientProps {
  topic: any;
  lessonId?: string;
  lessonContent: string;
  prevTopic: NavigationTopic | null;
  nextTopic: NavigationTopic | null;
  initialIsCompleted?: boolean;
}

// ── Stable helper: slug generator ────────────────────────────────────
const generateSlug = (children: any) =>
  String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// ── Memoised Markdown renderer ──────────────────────────────────────
// Defined OUTSIDE the component so its identity never changes between renders.
const MemoizedMarkdown = memo(function MemoizedMarkdown({
  content,
  onCopyToEditor,
}: {
  content: string;
  onCopyToEditor: (code: string) => void;
}) {
  const components = useMemo(() => ({
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
    pre: ({ node, children, ...props }: any) => {
      const extractText = (child: any): string => {
        if (typeof child === 'string') return child;
        if (Array.isArray(child)) return child.map(extractText).join('');
        if (child?.props?.children) return extractText(child.props.children);
        return '';
      };
      const codeString = extractText(children);

      return (
        <div className="relative group/code">
          <pre {...props}>{children}</pre>
          {codeString && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-all duration-200 transform translate-y-1 group-hover/code:translate-y-0 h-8 gap-1 active:scale-95"
              onClick={() => {
                onCopyToEditor(codeString);
                toast.success("Copied to editor!");
              }}
            >
              <Copy className="h-3 w-3" />
              Copy to Editor
            </Button>
          )}
        </div>
      );
    },
    div: ({ node, className, children, ...props }: any) => {
      if (typeof className === 'string' && className.includes('markdown-alert')) {
        const type = node?.data?.hProperties?.['data-alert-type'] || className.match(/markdown-alert-(note|tip|warning|important|caution)/)?.[1] || 'note';

        let Icon = Info;
        let colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/20";
        let title = "Note";

        switch (type) {
          case 'tip':
            Icon = Lightbulb;
            colorClass = "bg-green-500/10 text-green-500 border-green-500/20 dark:text-green-400";
            title = "Tip";
            break;
          case 'warning':
            Icon = AlertTriangle;
            colorClass = "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
            title = "Warning";
            break;
          case 'caution':
            Icon = ShieldAlert;
            colorClass = "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400";
            title = "Caution";
            break;
          case 'important':
            Icon = Shield;
            colorClass = "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400";
            title = "Important";
            break;
          case 'note':
          default:
            Icon = Info;
            colorClass = "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400";
            title = "Note";
            break;
        }

        return (
          <div className={`my-6 rounded-lg border p-4 ${colorClass}`} {...props}>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <Icon className="h-5 w-5" />
              <span>{title}</span>
            </div>
            <div className="text-sm opacity-90 leading-relaxed [&>p]:m-0">
              {children}
            </div>
          </div>
        );
      }
      return <div className={className} {...props}>{children}</div>;
    }
  }), [onCopyToEditor]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkAlerts]}
      rehypePlugins={[rehypeHighlight]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
});

export function LessonClient({ topic, lessonId, lessonContent, prevTopic, nextTopic, initialIsCompleted = false }: LessonClientProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isCompleting, setIsCompleting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const isJS = topic?.slug?.startsWith("js-") || topic?.module?.slug?.startsWith("js-");
  const language = isJS ? "javascript" : "python";

  const DEFAULT_CODE = isJS 
    ? `// Practice the code from the lesson here\n// Write JavaScript and click Run ▸\nconsole.log("Hello JS!");\n`
    : `# Practice the code from the lesson here\n# Write Python and click Run ▸\n`;
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // ── Lazy-load Pyodide only when editor is opened ──────────────────
  const [pyodideEnabled, setPyodideEnabled] = useState(false);
  const { isPyodideLoading, runPython } = usePyodide(pyodideEnabled);

  // When user opens editor, start loading Pyodide (only if Python)
  useEffect(() => {
    if (showEditor && !pyodideEnabled && language === "python") {
      setPyodideEnabled(true);
    }
  }, [showEditor, pyodideEnabled, language]);

  // Stable callback for "Copy to Editor"
  const handleCopyToEditor = useCallback((codeStr: string) => {
    setCode(codeStr);
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("Executing...\n");
    
    try {
      if (language === "javascript") {
        // Native JavaScript evaluation
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        
        console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        console.error = (...args) => logs.push('ERROR: ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));

        try {
          // Add a slight artificial delay to make the UI feel like it's running
          await new Promise(r => setTimeout(r, 200)); 
          const result = new Function(code)();
          if (result !== undefined) {
             logs.push(String(result));
          }
          setOutput(logs.length > 0 ? logs.join('\n') : "Execution finished without output.");
        } catch (err: any) {
          setOutput((logs.length > 0 ? logs.join('\n') + '\n' : '') + "Error: " + err.toString());
        } finally {
          console.log = originalLog;
          console.error = originalError;
        }
      } else {
        // Python Pyodide evaluation
        const result = await runPython(code);
        
        if (result.error) {
          setOutput((prev) => prev + result.output + "\nError: " + result.error);
        } else if (result.output) {
          setOutput(result.output);
        } else {
          setOutput("Execution finished without output.");
        }
      }
    } catch (error) {
      setOutput(`Internal Error: Failed to execute code.\n${error}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, runPython, language]);

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
    
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScrollSpy = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        let currentActiveId = '';
        
        // Find visible container (desktop or mobile)
        const container = scrollRef.current || document.querySelector('.notes-scroll-container') as HTMLDivElement;
        if (!container) {
            timeoutId = null;
            return;
        }
        
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
      }, 100); // 100ms throttle (was 50ms)
    };

    // Add listener to window for capturing scroll on elements with the class
    const scrollContainers = document.querySelectorAll('.notes-scroll-container');
    scrollContainers.forEach(c => c.addEventListener('scroll', handleScrollSpy, { passive: true }));
    
    // Initial check with a slight delay to ensure render
    setTimeout(handleScrollSpy, 100);
    
    return () => {
      scrollContainers.forEach(c => c.removeEventListener('scroll', handleScrollSpy));
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [headings]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollHint(e.currentTarget.scrollTop <= 10);
  }, []);

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

  const renderNotesContent = (isMobile: boolean = false) => (
    <motion.div 
      key={topic.slug}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      ref={isMobile ? null : scrollRef}
      onScroll={handleScroll}
      className={`notes-scroll-container flex-1 overflow-y-auto overscroll-contain p-4 pt-[60px] md:p-8 md:pt-[70px] space-y-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth ${isMobile ? 'h-full' : ''}`}
    >
      {/* Header */}
      <header className="space-y-4 max-w-3xl mx-auto w-full relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Module {topic.module.order}</Badge>
            <span className="text-sm font-medium text-muted-foreground">{topic.module.title}</span>
          </div>
          {!isMobile && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowEditor(!showEditor)} 
              className="hidden lg:flex gap-2"
            >
              <PanelRight className="h-4 w-4" />
              {showEditor ? "Hide Editor" : "Show Editor"}
            </Button>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{topic.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {topic.description}
        </p>
      </header>

      {/* Inline TOC */}
      {headings.length > 0 && (
        <details className="group border rounded-lg p-4 bg-muted/50 open:bg-transparent transition-colors max-w-3xl mx-auto">
          <summary className="flex items-center justify-between font-medium cursor-pointer list-none outline-none">
            <span className="flex items-center gap-2">
              <span className="opacity-70 text-lg leading-none mt-[-2px]">≡</span> On this page
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <nav className="flex flex-col relative ml-[2px] mt-4 space-y-1">
            {headings.map((heading, i) => {
              const isActive = activeHeadingId === heading.id;
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(heading.id);
                    const container = e.currentTarget.closest('.notes-scroll-container');
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
                  className={`relative text-left py-1.5 pl-4 transition-all duration-200 text-sm ${
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
        </details>
      )}

      <Separator className="max-w-3xl mx-auto" />

      {/* Content Body — uses memoised markdown renderer */}
      <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto prose-headings:font-semibold prose-a:text-primary overflow-x-hidden">
        <MemoizedMarkdown content={lessonContent} onCopyToEditor={handleCopyToEditor} />
      </article>

      <Separator className="max-w-3xl mx-auto" />

      {/* What's Next Section */}
      {(() => {
        let targetTitle = "";
        let targetDesc = "";
        let targetHref = "";
        let TargetIconComponent: any = null;
        let actionText = "";
        let colorClass = "";
        
        if (nextTopic) {
           targetTitle = nextTopic.title;
           targetDesc = nextTopic.description || `Learn more about ${nextTopic.title.toLowerCase()}`;
           targetHref = `/learn/${nextTopic.slug}`;
           TargetIconComponent = BookOpen;
           actionText = `dive deeper into ${nextTopic.module?.title?.toLowerCase() || 'the next topic'}.`;
           colorClass = "text-green-400 bg-green-400/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
        } else {
           return null;
        }

        return (
          <div className="max-w-3xl mx-auto mt-12 mb-4 w-full">
            <h2 className="text-2xl font-bold tracking-tight mb-2">What's next?</h2>
            <p className="text-muted-foreground mb-6">
              You've completed {topic.title}! Let's {actionText}
            </p>
            <Link 
              href={targetHref}
              className="block group relative bg-card border border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6 relative z-10">
                <div className="flex-1 space-y-4">
                  <div className={`inline-flex items-center justify-center p-3.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
                    {TargetIconComponent && <TargetIconComponent className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors text-foreground">{targetTitle}</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">{targetDesc}</p>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-1/3 max-w-[160px] opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/illustrations/stairs.jpg" alt="Next Lesson" className="w-full h-auto rounded-xl shadow-md mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 transform group-hover:scale-105" />
                </div>
              </div>
            </Link>
          </div>
        );
      })()}

      {/* Bottom Navigation */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12 lg:pb-4 max-w-3xl mx-auto border-t mt-8">
        {prevTopic ? (
          <Link 
            href={`/learn/${prevTopic.slug}`}
            className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {prevTopic.module.roadmapId !== topic.module.roadmapId 
              ? `Back to ${prevTopic.module.roadmap.title}`
              : `Previous: ${prevTopic.title}`}
          </Link>
        ) : (
          <div />
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          {lessonId && !isCompleted && (
            <Button 
              variant="default" 
              className="flex-1 sm:flex-none gap-2 bg-success text-success-foreground hover:bg-success/90 hover:scale-[1.02] active:scale-[0.98] transition-transform" 
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
              {nextTopic.module.roadmapId !== topic.module.roadmapId
                ? `Start ${nextTopic.module.roadmap.title}`
                : `Next: ${nextTopic.title}`}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </footer>
    </motion.div>
  );

  const renderEditor = () => (
    <div className="flex flex-col h-full w-full bg-[#1E1E1E]">
      <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center justify-between px-4 shrink-0">
        <span className="text-xs font-mono text-[#9CDCFE]">script.py</span>
        <Button 
          variant="default" 
          size="sm" 
          className="h-7 gap-1.5 px-3 text-xs" 
          onClick={runCode} 
          disabled={isRunning || isPyodideLoading}
        >
          {isPyodideLoading ? (
             <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : isRunning ? (
            <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <Play className="h-3 w-3 fill-current" />
          )}
          {isPyodideLoading ? "Loading..." : isRunning ? "Running..." : "Run"}
        </Button>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <Editor
            height="100%"
            defaultLanguage={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              fontFamily: "var(--font-mono)",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderConsole = () => (
    <div className="flex flex-col h-full w-full bg-[#1E1E1E]">
      <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2 shrink-0">
        <TerminalIcon className="h-4 w-4 text-[#858585]" />
        <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Terminal</span>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
        {output ? (
          <span>{output}</span>
        ) : (
          <span className="text-[#858585] italic">Ready. Click "Run" to execute script.</span>
        )}
      </div>
    </div>
  );

  const mentorContextBase = {
    topicSlug: topic?.slug,
    pageLabel: topic?.title ? `Lesson: ${topic.title}` : "Lesson",
  };

  return (
    <MentorContextProvider {...mentorContextBase}>
    <div className="flex h-full overflow-hidden relative w-full">
      
      {/* Desktop Split View */}
      <div className="hidden lg:flex w-full h-full">
        {/* @ts-expect-error - shadcn type issue */}
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel: Lesson Notes */}
          <ResizablePanel defaultSize={showEditor ? 50 : 100} minSize={30} className="flex flex-col bg-background">
            {renderNotesContent(false)}
          </ResizablePanel>

          {showEditor && (
            <>
              <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

              {/* Right Panel: Editor & Console */}
              <ResizablePanel defaultSize={50} minSize={25}>
                {/* @ts-expect-error - shadcn type issue */}
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
                    {renderEditor()}
                  </ResizablePanel>
                  <ResizableHandle withHandle className="h-1.5 bg-[#404040] hover:bg-primary/50 transition-colors" />
                  <ResizablePanel defaultSize={30} minSize={15} className="bg-[#1E1E1E] flex flex-col">
                    {renderConsole()}
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Mobile Tabs View */}
      <div className="flex lg:hidden w-full h-full">
        <Tabs defaultValue="notes" className="h-full w-full flex flex-col">
          <div className="px-4 border-b shrink-0 bg-background">
            <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-6 rounded-none">
              <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Notes</TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Editor</TabsTrigger>
              <TabsTrigger value="console" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-muted-foreground font-medium">Console</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="notes" className="flex-1 m-0 p-0 outline-none bg-background overflow-hidden">
             {renderNotesContent(true)}
          </TabsContent>
          
          <TabsContent value="editor" className="flex-1 m-0 p-0 outline-none relative bg-[#1E1E1E]">
            {renderEditor()}
          </TabsContent>

          <TabsContent value="console" className="flex-1 m-0 p-0 outline-none overflow-y-auto bg-[#1E1E1E]">
            {renderConsole()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Scroll Hint Popup */}
      <div 
        className={`absolute bottom-8 left-1/4 -translate-x-1/2 flex items-center gap-1 bg-card text-card-foreground border border-border px-3 py-3 rounded-full shadow-xl transition-all duration-500 pointer-events-none z-50 ${showScrollHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        <span className="text-sm font-medium">Scroll to read more</span>
      </div>

    </div>
    </MentorContextProvider>
  );
}
