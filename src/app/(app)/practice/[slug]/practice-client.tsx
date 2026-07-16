"use client";

import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, CheckCircle2, ChevronLeft, Lightbulb, Terminal as TerminalIcon, Send, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkAlerts } from "@/lib/remark-alerts";
import { Shield, ShieldAlert, Info } from "lucide-react";
import { usePyodide } from "@/lib/hooks/usePyodide";
import {
  MentorContextProvider,
  useMentorContextUpdater,
} from "@/components/mentor-context";
import { usePlatform } from "@/components/platform-provider";

export function PracticeClient({ exercise, initialIsCompleted = false }: { exercise: any, initialIsCompleted?: boolean }) {
  // Provider lives here so the mentor (rendered at the app layout level) can
  // read the current exercise slug and the learner's live editor code.
  return (
    <MentorContextProvider
      exerciseSlug={exercise?.slug}
      topicSlug={exercise?.topic?.slug}
      pageLabel={exercise?.title ? `Practice: ${exercise.title}` : "Practice"}
    >
      <PracticeClientInner exercise={exercise} initialIsCompleted={initialIsCompleted} />
    </MentorContextProvider>
  );
}

function PracticeClientInner({ exercise, initialIsCompleted = false }: { exercise: any, initialIsCompleted?: boolean }) {
  const router = useRouter();
  const [code, setCode] = useState(exercise.starterCode || "");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const config = usePlatform();
  const { isPyodideLoading, runPython } = usePyodide(true);

  // Keep the mentor context's `code` in sync with the editor so "debug my code"
  // includes exactly what the learner is looking at.
  const pushCodeToMentor = useMentorContextUpdater();
  useEffect(() => {
    pushCodeToMentor({ code });
  }, [code, pushCodeToMentor]);
  
  const [showHint, setShowHint] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [autoNavCountdown, setAutoNavCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess && showResults) {
      setAutoNavCountdown(3);
    } else {
      setAutoNavCountdown(null);
    }
  }, [isSuccess, showResults]);

  useEffect(() => {
    if (autoNavCountdown === null) return;
    
    if (autoNavCountdown > 0) {
      const timer = setTimeout(() => setAutoNavCountdown(c => c !== null ? c - 1 : null), 1000);
      return () => clearTimeout(timer);
    } else if (autoNavCountdown === 0) {
      // Navigate!
      const exercises = exercise.topic?.exercises || [];
      const currentIndex = exercises.findIndex((e: any) => e.slug === exercise.slug);
      const nextExercise = currentIndex !== -1 && currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

      setShowResults(false);
      if (nextExercise) {
        router.push(`/practice/${nextExercise.slug}`);
      } else {
        router.push(`/learn/${exercise.topic?.slug || ''}`);
      }
    }
  }, [autoNavCountdown, exercise, router]);

  interface TestResult {
    passed: boolean;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
  }
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  // Parse hints from JSON safely
  let parsedHints: string[] = [];
  try {
    if (exercise.hints) {
      parsedHints = typeof exercise.hints === "string" ? JSON.parse(exercise.hints) : exercise.hints;
    }
  } catch (e) {
    console.error("Failed to parse hints", e);
  }

  // Parse test cases safely
  let testCases: any[] = [];
  try {
    if (exercise.testCases) {
      testCases = typeof exercise.testCases === "string" ? JSON.parse(exercise.testCases) : exercise.testCases;
    }
  } catch (e) {
    console.error("Failed to parse test cases", e);
  }

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Executing...\n");
    
    try {
      const result = await runPython(code);
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else if (result.output) {
        setOutput(result.output);
      } else {
        setOutput("Execution finished without output.");
      }
    } catch (error) {
      setOutput(`Internal Error: Failed to execute code.\n${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    
    if (!testCases || testCases.length === 0) {
      // Fallback if no test cases defined
      setTimeout(() => {
        setIsSuccess(code.includes('console.log') || code.includes('print'));
        setIsSubmitting(false);
        setShowResults(true);
        if (code.includes('console.log') || code.includes('print')) setIsCompleted(true);
      }, 500);
      return;
    }

    const results: TestResult[] = [];
    let allPassed = true;

    for (const tc of testCases) {
      try {
        let actualOutput = "";
        let error;

        const result = await runPython(code, tc.input || "");
        actualOutput = result.output || "";
        error = result.error;
        
        const expected = tc.expectedOutput || "";
        const passed = actualOutput.trim() === expected.trim() && !error;
        
        if (!passed) {
          allPassed = false;
        }

        results.push({
          passed,
          input: tc.input || "",
          expectedOutput: expected,
          actualOutput: actualOutput,
          error: error || undefined
        });

      } catch (error) {
        allPassed = false;
        results.push({
          passed: false,
          input: tc.input || "",
          expectedOutput: tc.expectedOutput || "",
          actualOutput: "",
          error: `Network Error: ${error}`
        });
      }
    }

    setTestResults(results);
    setIsSuccess(allPassed);
    setIsSubmitting(false);
    setShowResults(true);
    
    if (allPassed) {
      setIsCompleted(true);
    }

    // Save submission to database (fire and forget)
    if (exercise?.slug) {
      import("@/app/actions").then(({ submitExerciseAction }) => {
        submitExerciseAction({
          exerciseId: exercise.slug,
          code,
          status: allPassed ? "passed" : "failed",
          testResults: results
        }).then((result) => {
          if (result.success && result.unlockedAchievements && result.unlockedAchievements.length > 0) {
            import("sonner").then(({ toast }) => {
              result.unlockedAchievements.forEach((ach: any) => {
                toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
                  duration: 5000,
                });
              });
            });
          }
        }).catch(console.error);
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm" 
        onClick={() => { setAutoNavCountdown(null); router.push('/practice'); }}
      />
      
      {/* Centered Window */}
      <div className="relative w-[95vw] sm:w-[90vw] md:w-[90vw] lg:w-[85vw] h-[85vh] max-h-[900px] bg-background border border-border/60 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 lg:px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => { setAutoNavCountdown(null); router.push('/practice'); }} className="text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="font-semibold hidden md:block">Practice: {exercise.title}</div>
          <Badge variant="outline" className={`hidden sm:inline-flex ${
            exercise.difficulty === 'easy' ? 'bg-success/10 text-success border-success/20' :
            exercise.difficulty === 'medium' ? 'bg-warning/10 text-warning border-warning/20' :
            'bg-destructive/10 text-destructive border-destructive/20'
          }`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </Badge>
          {isCompleted && (
            <Badge variant="default" className="hidden sm:inline-flex bg-success hover:bg-success/90 text-success-foreground gap-1">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {parsedHints.length > 0 && (
            <Button variant="outline" className="gap-2 text-muted-foreground" onClick={() => setShowHint(true)}>
              <Lightbulb className="h-4 w-4" /> <span className="hidden sm:inline">Hint</span>
            </Button>
          )}
          <Button variant="secondary" className="gap-2" onClick={runCode} disabled={isRunning || isSubmitting || isPyodideLoading}>
            {isPyodideLoading ? (
               <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : isRunning ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isPyodideLoading ? "Loading Engine..." : "Run"}</span>
          </Button>
          <Button className="gap-2 bg-success hover:bg-success/90 text-success-foreground" onClick={submitCode} disabled={isRunning || isSubmitting || isPyodideLoading}>
            {isSubmitting ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Submit
          </Button>
        </div>
      </div>

      {/* Desktop Split Interface */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* @ts-expect-error - shadcn type issue */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          
          {/* Left Panel: Instructions */}
          <ResizablePanel defaultSize={35} minSize={25} className="bg-background">
            <Tabs defaultValue="problem" className="h-full flex flex-col">
              <div className="px-6 border-b">
                <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-6 rounded-none">
                  <TabsTrigger value="problem" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Problem</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="problem" className="flex-1 overflow-y-auto p-6 m-0 outline-none">
                <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:mt-0">
                  <h2 className="text-2xl font-bold tracking-tight mb-4">{exercise.title}</h2>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkAlerts]}
                    components={{
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
                              Icon = AlertCircle;
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
                            <div className={`my-4 rounded-lg border p-3 ${colorClass}`} {...props}>
                              <div className="flex items-center gap-2 font-semibold mb-1 text-sm">
                                <Icon className="h-4 w-4" />
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
                    }}
                  >
                    {exercise.prompt || exercise.description}
                  </ReactMarkdown>
                </article>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

          {/* Right Panel: Editor & Output */}
          <ResizablePanel defaultSize={65}>
            {/* @ts-expect-error - shadcn type issue */}
            <ResizablePanelGroup direction="vertical">
              
              {/* Editor */}
              <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
                <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4">
                  <span className="text-xs font-mono text-[#9CDCFE]">main.py</span>
                </div>
                <div className="absolute inset-0 top-10">
                  <Editor
                    height="100%"
                    defaultLanguage={config.language}
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
                      wordWrap: "on",
                    }}
                  />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle className="h-1.5 bg-[#404040] hover:bg-primary/50 transition-colors" />
              
              {/* Output Console */}
              <ResizablePanel defaultSize={30} minSize={15} className="bg-[#1E1E1E] flex flex-col">
                <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2">
                  <TerminalIcon className="h-4 w-4 text-[#858585]" />
                  <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Console</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
                  {output ? (
                    <span>{output}</span>
                  ) : (
                    <span className="text-[#858585] italic">Click "Run Code" to test, or "Submit" to validate against hidden test cases.</span>
                  )}
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
        <Tabs defaultValue="editor" className="h-full flex flex-col">
          <div className="px-4 border-b shrink-0 bg-background">
            <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-6 rounded-none">
              <TabsTrigger value="problem" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Problem</TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Editor</TabsTrigger>
              <TabsTrigger value="console" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-muted-foreground font-medium">Console</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="problem" className="flex-1 overflow-y-auto p-4 m-0 outline-none bg-background">
             <article className="prose prose-sm dark:prose-invert">
                <h2 className="text-xl font-bold tracking-tight mb-4">{exercise.title}</h2>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkAlerts]}
                  components={{
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
                            Icon = AlertCircle;
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
                          <div className={`my-4 rounded-lg border p-3 ${colorClass}`} {...props}>
                            <div className="flex items-center gap-2 font-semibold mb-1 text-sm">
                              <Icon className="h-4 w-4" />
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
                  }}
                >
                  {exercise.prompt || exercise.description}
                </ReactMarkdown>
              </article>
          </TabsContent>
          
          <TabsContent value="editor" className="flex-1 m-0 p-0 outline-none relative bg-[#1E1E1E]">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{ minimap: { enabled: false }, fontSize: 13, padding: { top: 16 } }}
            />
          </TabsContent>

          <TabsContent value="console" className="flex-1 m-0 p-4 outline-none overflow-y-auto bg-[#1E1E1E] font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
            {output ? <span>{output}</span> : <span className="text-[#858585] italic">Run your code to see output...</span>}
          </TabsContent>
        </Tabs>
      </div>

      </div>
    </div>

      {/* Hints Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" /> Need a Hint?
            </DialogTitle>
            <DialogDescription className="pt-2 text-muted-foreground">
              Here are some hints to help you out.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {parsedHints.map((hint, i) => (
              <div key={i} className="flex gap-2 p-3 bg-muted rounded-lg">
                <Badge variant="secondary" className="h-6 mt-0.5 shrink-0">Hint {i + 1}</Badge>
                <p className="text-sm text-foreground">{hint}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHint(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-xl md:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {isSuccess ? (
                <><CheckCircle2 className="h-8 w-8 text-success" /> Success!</>
              ) : (
                <><XCircle className="h-8 w-8 text-destructive" /> Tests Failed</>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isSuccess 
                ? `You passed all ${testCases.length > 0 ? testCases.length : 1} test cases. You've earned ${exercise.xpReward} XP!`
                : "Your code failed on a test case. Try running it first to debug!"}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-accent/50 p-4 rounded-xl border space-y-4 max-h-[60vh] overflow-y-auto">
            {testResults.length > 0 ? testResults.map((tr, index) => (
              <div key={index} className="flex flex-col text-sm border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold">
                    {tr.passed ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />} 
                    Test Case {index + 1}
                  </span>
                  <span className={tr.passed ? "text-success font-medium" : "text-destructive font-medium"}>
                    {tr.passed ? "Pass" : "Fail"}
                  </span>
                </div>
                {tr.input && (
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground font-semibold">Input:</span>
                    <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border">{tr.input}</pre>
                  </div>
                )}
                {!tr.passed && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-xs text-muted-foreground font-semibold">Expected Output:</span>
                      <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border text-success">{tr.expectedOutput || "<none>"}</pre>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-semibold">Actual Output:</span>
                      <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border text-destructive">{tr.actualOutput || "<none>"}</pre>
                    </div>
                  </div>
                )}
                {tr.error && (
                  <div className="mt-2">
                     <span className="text-xs text-destructive font-semibold">Error:</span>
                     <pre className="mt-1 bg-destructive/10 p-2 rounded text-xs overflow-x-auto border border-destructive/20 text-destructive">{tr.error}</pre>
                  </div>
                )}
              </div>
            )) : testCases.length === 0 && (
               <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2">
                   {isSuccess ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />} 
                   Hidden Validation Test
                 </span>
                 <span className={isSuccess ? "text-success font-medium" : "text-destructive font-medium"}>
                   {isSuccess ? "Pass" : "Fail"}
                 </span>
               </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            {isSuccess ? (
              (() => {
                const exercises = exercise.topic?.exercises || [];
                const currentIndex = exercises.findIndex((e: any) => e.slug === exercise.slug);
                const nextExercise = currentIndex !== -1 && currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

                if (nextExercise) {
                  return (
                    <Button className="w-full sm:w-auto" onClick={() => { setAutoNavCountdown(null); setShowResults(false); router.push(`/practice/${nextExercise.slug}`); }}>
                      Next Exercise {autoNavCountdown !== null && `(${autoNavCountdown}s)`}
                    </Button>
                  );
                } else {
                  return (
                    <Button className="w-full sm:w-auto" onClick={() => { setAutoNavCountdown(null); setShowResults(false); router.push(`/learn/${exercise.topic?.slug || ''}`); }}>
                      Return to Lesson {autoNavCountdown !== null && `(${autoNavCountdown}s)`}
                    </Button>
                  );
                }
              })()
            ) : (
              <Button className="w-full sm:w-auto" variant="outline" onClick={() => setShowResults(false)}>
                Keep Trying
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
