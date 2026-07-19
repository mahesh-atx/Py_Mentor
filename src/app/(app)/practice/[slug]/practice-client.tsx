"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import {
  Play, CheckCircle2, ChevronLeft, ChevronDown,
  Lightbulb, Terminal as TerminalIcon, Send, XCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { outputsMatch } from "@/lib/output-match";
import { getFirstExerciseTestCase } from "@/lib/exercise-format";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ExercisePrompt } from "@/components/exercise-prompt";
import { useInteractivePython } from "@/lib/hooks/useInteractivePython";
import { PythonTerminal } from "@/components/python-terminal";
import {
  MentorContextProvider,
  useMentorContextUpdater,
} from "@/components/mentor-context";
import { usePlatform } from "@/components/platform-provider";
import { cn } from "@/lib/utils";

export function PracticeClient({
  exercise: initialExercise,
  allExercises: rawExercises,
  initialCompletedSlugs = [],
  moduleTitle = "",
}: {
  exercise: any;
  allExercises: any[];
  initialCompletedSlugs: string[];
  moduleTitle: string;
}) {
  return (
    <MentorContextProvider
      exerciseSlug={initialExercise?.slug}
      topicSlug={initialExercise?.topic?.slug}
      pageLabel={initialExercise?.title ? `Practice: ${initialExercise.title}` : "Practice"}
    >
      <PracticeClientInner
        initialExercise={initialExercise}
        rawExercises={rawExercises}
        initialCompletedSlugs={initialCompletedSlugs}
        moduleTitle={moduleTitle}
      />
    </MentorContextProvider>
  );
}

function PracticeClientInner({
  initialExercise,
  rawExercises,
  initialCompletedSlugs = [],
  moduleTitle = "",
}: {
  initialExercise: any;
  rawExercises: any[];
  initialCompletedSlugs: string[];
  moduleTitle: string;
}) {
  const router = useRouter();
  const config = usePlatform();
  const terminal = useInteractivePython(true);
  const pushCodeToMentor = useMentorContextUpdater();
  const [showResults, setShowResults] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const resultsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Group exercises by topic ─────────────────────────────────────
  const grouped = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const ex of rawExercises) {
      const tn = ex.topicName || "General";
      if (!map.has(tn)) map.set(tn, []);
      map.get(tn)!.push(ex);
    }
    return Array.from(map.entries()).map(([topicName, exercises]) => ({ topicName, exercises }));
  }, [rawExercises]);

  // Flatten with topic group info for indexing
  const flatExercises = useMemo(() => {
    const result: { ex: any; topicIdx: number }[] = [];
    for (const group of grouped) {
      for (const ex of group.exercises) {
        result.push({ ex, topicIdx: grouped.findIndex(g => g.topicName === group.topicName) });
      }
    }
    return result;
  }, [grouped]);

  const allExercises = useMemo(() => flatExercises.map(f => f.ex), [flatExercises]);

  // ── State ─────────────────────────────────────────────────────────
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
  const [codeStore, setCodeStore] = useState<Record<string, string>>({});
  const [outputStore, setOutputStore] = useState<Record<string, string>>({});
  const [terminalExerciseSlug, setTerminalExerciseSlug] = useState<string | null>(null);

  const activeExercise = allExercises[activeIndex];
  const activeTopicName = activeExercise?.topicName || "";
  const code = codeStore[activeExercise?.slug] ?? activeExercise?.starterCode ?? "";
  const savedOutput = outputStore[activeExercise?.slug] ?? "";
  const output = terminalExerciseSlug === activeExercise?.slug
    ? terminal.output
    : savedOutput;

  const setCode = useCallback(
    (val: string) => {
      setCodeStore((prev) => ({ ...prev, [activeExercise?.slug]: val }));
    },
    [activeExercise?.slug]
  );

  useEffect(() => {
    pushCodeToMentor({ code });
  }, [code, pushCodeToMentor]);

  // ── Run / Submit ─────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileTab, setMobileTab] = useState("list");

  const tc = getFirstExerciseTestCase(activeExercise?.testCases);

  const runCode = async () => {
    if (!activeExercise) return;
    const slug = activeExercise.slug;
    setMobileTab("console");
    setTerminalExerciseSlug(slug);
    setOutputStore((prev) => ({ ...prev, [slug]: "" }));
    const result = await terminal.runInteractive(code);
    setOutputStore((prev) => ({
      ...prev,
      [slug]: result.error
        ? `${result.output}${result.output && !result.output.endsWith("\n") ? "\n" : ""}Error: ${result.error}`
        : result.output || "Execution finished without output.",
    }));
    setTerminalExerciseSlug(null);
  };

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
        scheduleAdvance(slug);
      }
      setIsSubmitting(false);
      return;
    }

    // Grading is intentionally non-interactive and always uses the official
    // test input, while Run behaves like a real terminal.
    const result = await terminal.runAutomated(code, tc.input || "");
    const actual = result.output || "";
    const expected = tc.expectedOutput || "";
    const passed = outputsMatch(actual, expected) && !result.error;

    setOutputStore((prev) => ({
      ...prev,
      [slug]: result.error ? `Error: ${result.error}` : actual,
    }));

    const results = [{ passed, input: tc.input || "", expectedOutput: expected, actualOutput: actual, error: result.error || undefined }];
    setTestResults(results);
    setIsSuccess(passed);
    setShowResults(true);
    setIsSubmitting(false);

    if (passed) {
      setCompletedSet((prev) => new Set(prev).add(slug));
      try {
        const { submitExerciseAction } = await import("@/app/actions");
        submitExerciseAction({ exerciseId: slug, code, status: "passed", testResults: results }).then((res: any) => {
          if (res?.unlockedAchievements?.length) {
            import("sonner").then(({ toast }) => {
              res.unlockedAchievements.forEach((ach: any) =>
                toast.success(`🏆 ${ach.title}! +${ach.xpReward} XP`, { duration: 5000 })
              );
            });
          }
        });
      } catch {}
      if (resultsTimeoutRef.current) clearTimeout(resultsTimeoutRef.current);
      resultsTimeoutRef.current = setTimeout(() => {
        setShowResults(false);
        scheduleAdvance(slug);
      }, 1200);
    }
  };

  const scheduleAdvance = (slug: string) => {
    const idx = allExercises.findIndex((e: any) => e.slug === slug);
    if (idx < 0) return;
    // Find next unsolved among all exercises
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
    if (terminal.isRunning) terminal.stop();
    setTerminalExerciseSlug(null);
    if (accordionOpen === idx) {
      setAccordionOpen(null);
    } else {
      setActiveIndex(idx);
      setAccordionOpen(idx);
      setShowResults(false);
    }
  };

  // ── Hints ────────────────────────────────────────────────────────
  const [showHint, setShowHint] = useState(false);
  const parsedHints: string[] = (() => {
    try {
      if (!activeExercise?.hints) return [];
      const h = typeof activeExercise.hints === "string" ? JSON.parse(activeExercise.hints) : activeExercise.hints;
      return Array.isArray(h) ? h : [];
    } catch { return []; }
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

  const isCompleted = (ex: any) => completedSet.has(ex.slug) || completedSet.has(ex.id);

  // ── Build topic-grouped visible list ────────────────────────────
  // Only show items that are not completed
  const visibleGroups = useMemo(() => {
    const result: { topicName: string; exercises: any[] }[] = [];
    for (const group of grouped) {
      const unsolved = group.exercises.filter(ex => !isCompleted(ex));
      if (unsolved.length > 0) {
        result.push({ topicName: group.topicName, exercises: unsolved });
      }
    }
    return result;
  }, [grouped, completedSet]);

  // Map each visible exercise to its real index in allExercises
  const getRealIndex = useCallback((slug: string) => allExercises.findIndex(e => e.slug === slug), [allExercises]);

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => router.push("/practice")} />

        <div className="relative w-[95vw] sm:w-[90vw] md:w-[90vw] lg:w-[85vw] h-[85vh] max-h-[900px] bg-background border border-border/60 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">

          {/* ── Header ── */}
          <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div className="flex items-center gap-4 min-w-0">
              <Button variant="ghost" size="icon" onClick={() => router.push("/practice")} className="text-muted-foreground shrink-0">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 min-w-0">
                {moduleTitle && (
                  <>
                    <span className="text-sm font-semibold text-muted-foreground hidden md:block">{moduleTitle}</span>
                    <span className="text-sm font-semibold text-muted-foreground/40 hidden md:block">/</span>
                  </>
                )}
                <span className="text-sm font-semibold text-foreground/80 truncate max-w-[200px]">
                  {activeTopicName}
                </span>
                <Badge
                  variant="outline"
                  className={`hidden sm:inline-flex shrink-0 text-[10px] h-5 ${
                    activeExercise?.difficulty === "easy" || activeExercise?.difficulty === "beginner"
                      ? "bg-success/10 text-success border-success/20"
                      : activeExercise?.difficulty === "medium" || activeExercise?.difficulty === "intermediate"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }`}
                >
                  {activeExercise?.difficulty?.charAt(0).toUpperCase() + activeExercise?.difficulty?.slice(1) || "?"}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {completedCount}/{allExercises.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {parsedHints.length > 0 && (
                <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => setShowHint(true)}>
                  <Lightbulb className="h-4 w-4" /><span className="hidden sm:inline">Hint</span>
                </Button>
              )}
              <Button variant="secondary" size="sm" className="gap-1.5" onClick={runCode}
                disabled={terminal.isRunning || isSubmitting || terminal.isLoading || !activeExercise}>
                {terminal.isLoading || terminal.isRunning ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : <Play className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{terminal.isLoading ? "Loading..." : "Run"}</span>
              </Button>
              <Button size="sm" className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground" onClick={submitCode}
                disabled={terminal.isRunning || isSubmitting || terminal.isLoading || !activeExercise}>
                {isSubmitting ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : <Send className="h-3.5 w-3.5" />}
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
                  <div className="px-4 py-3 border-b bg-muted/20 shrink-0">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <TerminalIcon className="h-4 w-4 text-primary" />
                      Exercises
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                      {visibleGroups.map((group, gIdx) => (
                        <div key={group.topicName}>
                          {/* Elegant topic separator */}
                          <div className="flex items-center gap-3 px-4 py-3 opacity-60">
                            <div className="h-px bg-border/50 flex-1" />
                            <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">
                              {group.topicName}
                            </span>
                            <div className="h-px bg-border/50 flex-1" />
                          </div>

                          {/* Exercises in this topic group */}
                          <AnimatePresence mode="popLayout">
                            {group.exercises.map((ex: any) => {
                              const realIdx = getRealIndex(ex.slug);
                              const isOpen = accordionOpen === realIdx;

                              return (
                                <motion.div
                                  key={ex.slug || ex.id}
                                  layout
                                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                  transition={{ duration: 0.4, ease: "easeOut", delay: realIdx * 0.05 }}
                                  className={cn(
                                    "transition-all duration-300 relative",
                                    isOpen
                                      ? "bg-card/80 dark:bg-primary/5 shadow-lg shadow-primary/5 border border-primary/20 rounded-xl my-2 mx-2 z-10"
                                      : "border-b border-border/15 last:border-0 opacity-40 hover:opacity-70"
                                  )}
                                >
                                  <button
                                    onClick={() => toggleAccordion(realIdx)}
                                    className={cn(
                                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                                    )}
                                  >
                                    <div className={cn(
                                      "h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border text-sm font-bold transition-all",
                                      isOpen
                                        ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                                        : "bg-muted/80 border-border/30 text-muted-foreground"
                                    )}>
                                      <TerminalIcon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className={cn(
                                        "font-semibold truncate leading-tight transition-colors",
                                        isOpen ? "text-base text-foreground" : "text-sm text-foreground/60"
                                      )}>
                                        {ex.title}
                                      </div>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyColor(ex.difficulty)}`} />
                                        <span className="text-[10px] text-muted-foreground/50 capitalize">{ex.difficulty}</span>
                                        <span className="text-[10px] text-muted-foreground/50 flex items-center gap-0.5">
                                          <Sparkles className="h-2.5 w-2.5 text-warning/60" />{ex.xpReward}
                                        </span>
                                      </div>
                                    </div>
                                    <ChevronDown className={cn(
                                      "h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform duration-200",
                                      isOpen && "rotate-180"
                                    )} />
                                  </button>

                                  {/* Accordion expand */}
                                  <AnimatePresence initial={false}>
                                    {isOpen && (
                                      <motion.div
                                        key="ac"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 pb-4 pt-0 border-t border-border/15 mx-4">
                                          <div className="pt-3">
                                            <ExercisePrompt
                                              prompt={ex.prompt || ex.description}
                                              testCase={getFirstExerciseTestCase(ex.testCases)}
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
                      ))}
                    </AnimatePresence>

                    {visibleGroups.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                        <CheckCircle2 className="h-10 w-10 text-success mb-3" />
                        <h3 className="text-lg font-semibold text-foreground mb-1">All exercises solved!</h3>
                        <p className="text-sm text-muted-foreground mb-4">You've completed every exercise in this module.</p>
                        <Button variant="outline" onClick={() => router.push("/practice")}>Back to Practice</Button>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

              {/* ─── RIGHT: Editor & Console ─── */}
              <ResizablePanel defaultSize={65}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
                    <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 justify-between">
                      <span className="text-xs font-mono text-[#9CDCFE]">main.py</span>
                      {activeExercise && (
                        <span className="text-xs text-[#858585]">
                          {activeExercise.title}
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
                          minimap: { enabled: false }, fontSize: 14, padding: { top: 16 },
                          scrollBeyondLastLine: false, smoothScrolling: true, cursorBlinking: "smooth", wordWrap: "on",
                        }}
                      />
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle className="h-1.5 bg-[#404040] hover:bg-primary/50 transition-colors" />

                  <ResizablePanel defaultSize={30} minSize={15} className="bg-[#1E1E1E]">
                    <PythonTerminal
                      output={output}
                      status={terminalExerciseSlug === activeExercise?.slug ? terminal.status : "idle"}
                      onInput={terminal.submitInput}
                      onStop={terminal.stop}
                      emptyMessage={'Click "Run" for an interactive program, or "Submit" to grade it.'}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* ── Mobile ── */}
          <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
            <Tabs value={mobileTab} onValueChange={setMobileTab} className="h-full flex flex-col">
              <div className="px-4 border-b shrink-0 bg-background">
                <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-4 rounded-none">
                  <TabsTrigger value="list" className="data-[state=active]:bg-transparent rounded-none px-0 h-full font-medium text-xs">Exercises</TabsTrigger>
                  <TabsTrigger value="editor" className="data-[state=active]:bg-transparent rounded-none px-0 h-full font-medium text-xs">Editor</TabsTrigger>
                  <TabsTrigger value="console" className="data-[state=active]:bg-transparent rounded-none px-0 h-full font-medium text-xs">Console</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="flex-1 overflow-y-auto m-0 outline-none bg-background">
                <AnimatePresence mode="popLayout">
                  {visibleGroups.map((group) => (
                    <div key={group.topicName}>
                      {/* Elegant topic separator */}
                      <div className="flex items-center gap-3 px-4 py-3 opacity-60">
                        <div className="h-px bg-border/50 flex-1" />
                        <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">
                          {group.topicName}
                        </span>
                        <div className="h-px bg-border/50 flex-1" />
                      </div>
                      {group.exercises.map((ex) => {
                        const realIdx = getRealIndex(ex.slug);
                        const isOpen = accordionOpen === realIdx;
                        return (
                          <motion.div key={ex.slug || ex.id} layout
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: realIdx * 0.05 }}
                            className={cn(
                              "transition-all duration-300 relative",
                              isOpen 
                                ? "bg-card/80 dark:bg-primary/5 shadow-lg shadow-primary/5 border border-primary/20 rounded-xl my-2 mx-2 z-10" 
                                : "border-b border-border/15 last:border-0 opacity-40 hover:opacity-70"
                            )}
                          >
                            <button onClick={() => toggleAccordion(realIdx)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left">
                              <div className={cn("h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border text-sm font-bold",
                                isOpen ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/80 border-border/30 text-muted-foreground")}>
                                <TerminalIcon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={cn("font-semibold truncate", isOpen ? "text-base" : "text-sm text-foreground/60")}>
                                  {ex.title}
                                </div>
                              </div>
                              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                  <div className="px-4 pb-3">
                                    <ExercisePrompt
                                      prompt={ex.prompt || ex.description}
                                      testCase={getFirstExerciseTestCase(ex.testCases)}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="editor" className="flex-1 m-0 p-0 outline-none relative bg-[#1E1E1E]">
                <Editor key={activeExercise?.slug} height="100%" defaultLanguage="python" theme="vs-dark"
                  value={code} onChange={(val) => setCode(val || "")}
                  options={{ minimap: { enabled: false }, fontSize: 13, padding: { top: 16 } }} />
              </TabsContent>

              <TabsContent value="console" className="flex-1 m-0 p-0 outline-none overflow-hidden bg-[#1E1E1E]">
                <PythonTerminal
                  output={output}
                  status={terminalExerciseSlug === activeExercise?.slug ? terminal.status : "idle"}
                  onInput={terminal.submitInput}
                  onStop={terminal.stop}
                  emptyMessage="Run your code to start the interactive terminal."
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent>
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Need a Hint?</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {parsedHints.map((hint: string, i: number) => (
              <div key={i} className="flex gap-2 p-3 bg-muted rounded-lg">
                <Badge variant="secondary" className="h-6 mt-0.5 shrink-0">Hint {i + 1}</Badge>
                <p className="text-sm text-foreground">{hint}</p>
              </div>
            ))}
          </div>
          <DialogFooter><Button onClick={() => setShowHint(false)}>Got it</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-xl md:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {isSuccess ? <><CheckCircle2 className="h-8 w-8 text-success" /> Success!</>
                : <><XCircle className="h-8 w-8 text-destructive" /> Tests Failed</>}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isSuccess ? `You passed the test case. +${activeExercise?.xpReward || 0} XP!`
                : "Your code failed on a test case."}
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
                    <span className={tr.passed ? "text-success font-medium" : "text-destructive font-medium"}>{tr.passed ? "Pass" : "Fail"}</span>
                  </div>
                  {!tr.passed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      <div><span className="text-xs text-muted-foreground font-semibold">Expected:</span>
                        <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border text-success">{tr.expectedOutput || "<none>"}</pre></div>
                      <div><span className="text-xs text-muted-foreground font-semibold">Actual:</span>
                        <pre className="mt-1 bg-background p-2 rounded text-xs overflow-x-auto border text-destructive">{tr.actualOutput || "<none>"}</pre></div>
                    </div>
                  )}
                  {tr.error && <div className="mt-2"><span className="text-xs text-destructive font-semibold">Error:</span>
                    <pre className="mt-1 bg-destructive/10 p-2 rounded text-xs border border-destructive/20 text-destructive">{tr.error}</pre></div>}
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            {isSuccess ? <Button className="w-full" onClick={() => setShowResults(false)}>Continue</Button>
              : <Button variant="outline" onClick={() => setShowResults(false)}>Keep Trying</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
