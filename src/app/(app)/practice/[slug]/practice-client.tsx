"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import {
  Play, CheckCircle2, ChevronLeft, ChevronDown,
  Lightbulb, Terminal as TerminalIcon, Send, XCircle,
  Sparkles, ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { outputsMatch } from "@/lib/output-match";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ExercisePrompt } from "@/components/exercise-prompt";
import { usePyodide } from "@/lib/hooks/usePyodide";
import {
  MentorContextProvider,
  useMentorContextUpdater,
} from "@/components/mentor-context";
import { usePlatform } from "@/components/platform-provider";
import { cn } from "@/lib/utils";

export function PracticeClient({
  exercise: initialExercise,
  allExercises,
  initialCompletedSlugs = [],
}: {
  exercise: any;
  allExercises: any[];
  initialCompletedSlugs: string[];
}) {
  return (
    <MentorContextProvider
      exerciseSlug={initialExercise?.slug}
      topicSlug={initialExercise?.topic?.slug}
      pageLabel={initialExercise?.title ? `Practice: ${initialExercise.title}` : "Practice"}
    >
      <PracticeClientInner
        initialExercise={initialExercise}
        allExercises={allExercises}
        initialCompletedSlugs={initialCompletedSlugs}
      />
    </MentorContextProvider>
  );
}

function PracticeClientInner({
  initialExercise,
  allExercises,
  initialCompletedSlugs = [],
}: {
  initialExercise: any;
  allExercises: any[];
  initialCompletedSlugs: string[];
}) {
  const router = useRouter();
  const config = usePlatform();
  const { isPyodideLoading, runPython } = usePyodide(true);
  const pushCodeToMentor = useMentorContextUpdater();

  // ── Exercise list & active index ──────────────────────────────────
  const initialIndex = allExercises.findIndex(
    (e: any) => e.slug === initialExercise?.slug
  );

  const [activeIndex, setActiveIndex] = useState(Math.max(0, initialIndex));
  const [accordionOpen, setAccordionOpen] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [completedSet, setCompletedSet] = useState<Set<string>>(
    new Set(initialCompletedSlugs)
  );

  // Code store — one entry per exercise slug
  const [codeStore, setCodeStore] = useState<Record<string, string>>({});
  const [outputStore, setOutputStore] = useState<Record<string, string>>({});
  const accordionContentRef = useRef<HTMLDivElement>(null);

  const activeExercise = allExercises[activeIndex];

  // ── Derive code / output for active exercise ──────────────────────
  const code = codeStore[activeExercise?.slug] ?? activeExercise?.starterCode ?? "";
  const output = outputStore[activeExercise?.slug] ?? "";

  const setCode = useCallback(
    (val: string) => {
      setCodeStore((prev) => ({ ...prev, [activeExercise?.slug]: val }));
    },
    [activeExercise?.slug]
  );

  // Keep mentor context in sync
  useEffect(() => {
    pushCodeToMentor({ code });
  }, [code, pushCodeToMentor]);

  // ── Run / Submit ─────────────────────────────────────────────────
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse test cases
  const parsedTCs = activeExercise?.testCases
    ? typeof activeExercise.testCases === "string"
      ? JSON.parse(activeExercise.testCases)
      : activeExercise.testCases
    : [];
  const tc = Array.isArray(parsedTCs) ? parsedTCs[0] ?? null : null;

  const runCode = async () => {
    if (!activeExercise) return;
    setIsRunning(true);
    setOutputStore((prev) => ({ ...prev, [activeExercise.slug]: "Executing...\n" }));

    const result = await runPython(code, tc?.input || "");
    setOutputStore((prev) => ({
      ...prev,
      [activeExercise.slug]: result.error
        ? `Error: ${result.error}`
        : result.output || "Execution finished without output.",
    }));
    setIsRunning(false);
  };

  const [showResults, setShowResults] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const resultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const submitCode = async () => {
    if (!activeExercise) return;
    setIsSubmitting(true);
    const slug = activeExercise.slug;

    if (!tc) {
      const passed = code.includes("print") || code.includes("console.log");
      if (passed) {
        setCompletedSet((prev) => new Set(prev).add(slug));
        try {
          const { submitExerciseAction } = await import("@/app/actions");
          submitExerciseAction({ exerciseId: slug, code, status: "passed", testResults: [] });
        } catch {}
        advanceAfterSubmit(slug);
      }
      setIsSubmitting(false);
      return;
    }

    const result = await runPython(code, tc.input || "");
    const actual = result.output || "";
    const expected = tc.expectedOutput || "";
    const passed = outputsMatch(actual, expected) && !result.error;

    setOutputStore((prev) => ({
      ...prev,
      [slug]: result.error ? `Error: ${result.error}` : actual,
    }));

    const results = [
      {
        passed,
        input: tc.input || "",
        expectedOutput: expected,
        actualOutput: actual,
        error: result.error || undefined,
      },
    ];

    setTestResults(results);
    setIsSuccess(passed);
    setShowResults(true);
    setIsSubmitting(false);

    if (passed) {
      setCompletedSet((prev) => new Set(prev).add(slug));
      try {
        const { submitExerciseAction } = await import("@/app/actions");
        submitExerciseAction({
          exerciseId: slug, code, status: "passed", testResults: results,
        }).then((res: any) => {
          if (res?.unlockedAchievements?.length) {
            import("sonner").then(({ toast }) => {
              res.unlockedAchievements.forEach((ach: any) =>
                toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, { duration: 5000 })
              );
            });
          }
        });
      } catch {}

      // Auto-advance after showing results briefly
      if (resultsTimeoutRef.current) clearTimeout(resultsTimeoutRef.current);
      resultsTimeoutRef.current = setTimeout(() => {
        setShowResults(false);
        advanceAfterSubmit(slug);
      }, 1500);
    }
  };

  const advanceAfterSubmit = (slug: string) => {
    const idx = allExercises.findIndex((e: any) => e.slug === slug);
    if (idx < 0) return;
    for (let i = idx + 1; i < allExercises.length; i++) {
      if (!completedSet.has(allExercises[i].slug) && !completedSet.has(allExercises[i].id)) {
        setActiveIndex(i);
        setAccordionOpen(i);
        return;
      }
    }
    setAccordionOpen(null);
  };

  const toggleAccordion = (idx: number) => {
    if (accordionOpen === idx) {
      setAccordionOpen(null);
    } else {
      setActiveIndex(idx);
      setAccordionOpen(idx);
    }
  };

  // ── Hints ────────────────────────────────────────────────────────
  const [showHint, setShowHint] = useState(false);
  const parsedHints: string[] = (() => {
    try {
      if (!activeExercise?.hints) return [];
      const h = typeof activeExercise.hints === "string"
        ? JSON.parse(activeExercise.hints)
        : activeExercise.hints;
      return Array.isArray(h) ? h : [];
    } catch {
      return [];
    }
  })();

  const completedCount = allExercises.filter(
    (e: any) => completedSet.has(e.slug) || completedSet.has(e.id)
  ).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": case "beginner": return "bg-emerald-500";
      case "medium": case "intermediate": return "bg-amber-500";
      case "hard": case "advanced": case "expert": return "bg-rose-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          onClick={() => router.push("/practice")}
        />

        {/* Centered Window */}
        <div className="relative w-[95vw] sm:w-[90vw] md:w-[90vw] lg:w-[85vw] h-[85vh] max-h-[900px] bg-background border border-border/60 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          {/* ── Header ── */}
          <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div className="flex items-center gap-4 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/practice")}
                className="text-muted-foreground shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-semibold truncate hidden md:block">
                  {activeExercise?.title || "Practice"}
                </span>
                <Badge
                  variant="outline"
                  className={`hidden sm:inline-flex shrink-0 ${
                    activeExercise?.difficulty === "easy" || activeExercise?.difficulty === "beginner"
                      ? "bg-success/10 text-success border-success/20"
                      : activeExercise?.difficulty === "medium" || activeExercise?.difficulty === "intermediate"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
                >
                  {activeExercise?.difficulty?.charAt(0).toUpperCase() +
                    activeExercise?.difficulty?.slice(1) || "?"}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {completedCount}/{allExercises.length} solved
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {completedSet.has(activeExercise?.slug) && (
                <Badge variant="default" className="bg-success hover:bg-success/90 gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </Badge>
              )}
              {parsedHints.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                  onClick={() => setShowHint(true)}
                >
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Hint</span>
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="gap-1.5"
                onClick={runCode}
                disabled={isRunning || isSubmitting || isPyodideLoading || !activeExercise}
              >
                {isPyodideLoading || isRunning ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">
                  {isPyodideLoading ? "Loading..." : "Run"}
                </span>
              </Button>
              <Button
                size="sm"
                className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground"
                onClick={submitCode}
                disabled={isRunning || isSubmitting || isPyodideLoading || !activeExercise}
              >
                {isSubmitting ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                Submit
              </Button>
            </div>
          </div>

          {/* ── Split Layout ── */}
          <div className="hidden lg:flex flex-1 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              {/* ─── LEFT: Accordion Exercise List ─── */}
              <ResizablePanel defaultSize={35} minSize={22} className="bg-background">
                <div className="h-full flex flex-col">
                  <div className="px-4 py-3 border-b bg-muted/20 shrink-0 flex items-center justify-between">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-primary" />
                      Exercises in this topic
                    </h3>
                    <span className="text-[11px] text-muted-foreground">{completedCount}/{allExercises.length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                      {allExercises.map((ex: any, idx: number) => {
                        const isDone = completedSet.has(ex.slug) || completedSet.has(ex.id);
                        const isOpen = accordionOpen === idx;

                        return (
                          <motion.div
                            key={ex.id || ex.slug}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.4) }}
                            className={cn(
                              "border-b border-border/20 last:border-0",
                              isOpen && "bg-primary/[0.03]",
                              !isOpen && !isDone && "opacity-80 hover:opacity-100 transition-opacity",
                              isDone && !isOpen && "opacity-50 hover:opacity-70"
                            )}
                          >
                            {/* Accordion trigger */}
                            <button
                              onClick={() => toggleAccordion(idx)}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                                isOpen && "bg-primary/[0.05]"
                              )}
                            >
                              <div
                                className={cn(
                                  "h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border text-sm font-bold transition-all duration-200",
                                  isDone
                                    ? "bg-success/10 border-success/30 text-success"
                                    : isOpen
                                    ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                                    : "bg-muted/80 border-border/40 text-muted-foreground"
                                )}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  idx + 1
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={cn(
                                  "font-semibold truncate leading-tight",
                                  isOpen ? "text-base text-foreground" : "text-sm text-foreground/80",
                                  isDone && "text-success/80"
                                )}>
                                  {ex.title}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyColor(ex.difficulty)}`} />
                                  <span className="text-[10px] text-muted-foreground capitalize">{ex.difficulty}</span>
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                    <Sparkles className="h-2.5 w-2.5 text-warning" />
                                    {ex.xpReward}
                                  </span>
                                </div>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                                  isOpen && "rotate-180"
                                )}
                              />
                            </button>

                            {/* ── Animated accordion content ── */}
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="accordion-content"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-0 border-t border-border/20 mx-4">
                                    <div className="pt-3">
                                      <ExercisePrompt
                                        title={ex.title}
                                        prompt={ex.prompt || ex.description}
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

              {/* ─── RIGHT: Editor & Console ─── */}
              <ResizablePanel defaultSize={65}>
                <ResizablePanelGroup direction="vertical">
                  {/* Editor */}
                  <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
                    <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 justify-between">
                      <span className="text-xs font-mono text-[#9CDCFE]">main.py</span>
                      {activeExercise && (
                        <span className="text-xs text-[#858585]">
                          Exercise {activeIndex + 1} of {allExercises.length}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 top-10">
                      <Editor
                        key={activeExercise?.slug}
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

                  {/* Console */}
                  <ResizablePanel defaultSize={30} minSize={15} className="bg-[#1E1E1E] flex flex-col">
                    <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2">
                      <TerminalIcon className="h-4 w-4 text-[#858585]" />
                      <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Console</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
                      {output ? (
                        <span>{output}</span>
                      ) : (
                        <span className="text-[#858585] italic">
                          Click "Run" to test, or "Submit" to validate against the test case.
                        </span>
                      )}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* ── Mobile Layout ── */}
          <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
            <Tabs defaultValue="list" className="h-full flex flex-col">
              <div className="px-4 border-b shrink-0 bg-background">
                <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-4 rounded-none">
                  <TabsTrigger value="list" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium text-xs">
                    Exercises
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium text-xs">
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="console" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium text-xs">
                    Console
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="flex-1 overflow-y-auto m-0 outline-none bg-background">
                <AnimatePresence mode="popLayout">
                  {allExercises.map((ex: any, idx: number) => {
                    const isDone = completedSet.has(ex.slug) || completedSet.has(ex.id);
                    const isOpen = accordionOpen === idx;

                    return (
                      <motion.div
                        key={ex.id || ex.slug}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                        className={cn(
                          "border-b border-border/20",
                          isOpen && "bg-primary/[0.03]"
                        )}
                      >
                        <button
                          onClick={() => toggleAccordion(idx)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left"
                        >
                          <div className={cn(
                            "h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border text-sm font-bold",
                            isDone ? "bg-success/10 border-success/30 text-success" : isOpen ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/80 border-border/40"
                          )}>
                            {isDone ? <CheckCircle2 className="h-4.5 w-4.5" /> : idx + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className={cn("font-semibold truncate", isOpen ? "text-base" : "text-sm", isDone && "text-success/80")}>
                              {ex.title}
                            </div>
                          </div>
                          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3">
                                <ExercisePrompt title={ex.title} prompt={ex.prompt || ex.description} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="editor" className="flex-1 m-0 p-0 outline-none relative bg-[#1E1E1E]">
                <Editor
                  key={activeExercise?.slug}
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

      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" /> Need a Hint?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {parsedHints.map((hint: string, i: number) => (
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
                ? `You passed the test case. You've earned ${activeExercise?.xpReward || 0} XP!`
                : "Your code failed on a test case. Try running it first to debug!"}
            </DialogDescription>
          </DialogHeader>
          {testResults.length > 0 && (
            <div className="bg-accent/50 p-4 rounded-xl border space-y-4 max-h-[60vh] overflow-y-auto">
              {testResults.map((tr: any, index: number) => (
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
                        <span className="text-xs text-muted-foreground font-semibold">Expected:</span>
                        <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border text-success">{tr.expectedOutput || "<none>"}</pre>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground font-semibold">Actual:</span>
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
              ))}
            </div>
          )}
          <DialogFooter>
            {isSuccess ? (
              <Button className="w-full" onClick={() => { setShowResults(false); }}>
                Continue
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Keep Trying
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
