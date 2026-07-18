"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Sparkles,
  Play, Send, Lightbulb, XCircle, ListFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Editor } from "@monaco-editor/react";
import { usePyodide } from "@/lib/hooks/usePyodide";
import { outputsMatch } from "@/lib/output-match";
import { ExercisePrompt } from "@/components/exercise-prompt";
import { usePlatform } from "@/components/platform-provider";

export function ModulePracticeClient({ exercises, completedExerciseSlugs: initialCompleted }: { exercises: any[], completedExerciseSlugs: string[] }) {
  const config = usePlatform();
  const { isPyodideLoading, runPython } = usePyodide(true);

  // ── State ────────────────────────────────────────────────────────────
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set(initialCompleted));
  const [codeBySlug, setCodeBySlug] = useState<Map<string, string>>(new Map());
  const [outputBySlug, setOutputBySlug] = useState<Map<string, string>>(new Map());
  const [runningSlug, setRunningSlug] = useState<string | null>(null);
  const [submittingSlug, setSubmittingSlug] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [hintText, setHintText] = useState<string[]>([]);

  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // ── Filtering ────────────────────────────────────────────────────────
  const filteredExercises = exercises.filter(ex => {
    const isCompleted = completedSlugs.has(ex.id) || completedSlugs.has(ex.slug);
    if (filterDifficulty !== "All" && ex.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) return false;
    if (filterStatus === "Solved" && !isCompleted) return false;
    if (filterStatus === "Unsolved" && isCompleted) return false;
    return true;
  });

  // Auto-open first unsolved when filter changes
  useEffect(() => {
    if (openIndex === null) {
      const firstUnsolved = filteredExercises.findIndex(
        ex => !completedSlugs.has(ex.id) && !completedSlugs.has(ex.slug)
      );
      if (firstUnsolved >= 0) setOpenIndex(firstUnsolved);
    }
  }, [filteredExercises.length]);

  // ── Code helpers ─────────────────────────────────────────────────────
  const getCode = useCallback((slug: string, starter?: string) => {
    return codeBySlug.get(slug) ?? starter ?? "";
  }, [codeBySlug]);

  const setCode = useCallback((slug: string, code: string) => {
    setCodeBySlug(prev => {
      const next = new Map(prev);
      next.set(slug, code);
      return next;
    });
  }, []);

  // ── Run / Submit ─────────────────────────────────────────────────────
  const handleRun = async (ex: any) => {
    const slug = ex.slug;
    setRunningSlug(slug);
    const code = getCode(slug, ex.starterCode);
    const tc = Array.isArray(ex.testCases) ? ex.testCases[0] : null;

    const result = await runPython(code, tc?.input || "");
    setOutputBySlug(prev => {
      const next = new Map(prev);
      next.set(slug, result.error ? `Error: ${result.error}` : (result.output || "Execution finished without output."));
      return next;
    });
    setRunningSlug(null);
  };

  const handleSubmit = async (ex: any) => {
    const slug = ex.slug;
    setSubmittingSlug(slug);
    const code = getCode(slug, ex.starterCode);
    const tc = Array.isArray(ex.testCases) ? ex.testCases[0] : null;

    if (!tc) {
      const passed = code.includes("print") || code.includes("console.log");
      if (passed) {
        setCompletedSlugs(prev => new Set(prev).add(slug));
        advanceToNext(slug);
      }
      setSubmittingSlug(null);
      return;
    }

    const result = await runPython(code, tc.input || "");
    const actual = result.output || "";
    const expected = tc.expectedOutput || "";
    const passed = outputsMatch(actual, expected) && !result.error;

    setOutputBySlug(prev => {
      const next = new Map(prev);
      next.set(slug, result.error ? `Error: ${result.error}` : actual);
      return next;
    });

    if (passed) {
      setCompletedSlugs(prev => new Set(prev).add(slug));
      // Save submission
      try {
        const { submitExerciseAction } = await import("@/app/actions");
        submitExerciseAction({
          exerciseId: slug, code, status: "passed",
          testResults: [{ passed: true, input: tc.input, expectedOutput: expected, actualOutput: actual }]
        });
      } catch {}
      setTimeout(() => advanceToNext(slug), 800);
    }
    setSubmittingSlug(null);
  };

  const advanceToNext = (currentSlug: string) => {
    const idx = exercises.findIndex(e => e.slug === currentSlug || e.id === currentSlug);
    if (idx >= 0) {
      // Find next unsolved
      for (let i = idx + 1; i < exercises.length; i++) {
        if (!completedSlugs.has(exercises[i].id) && !completedSlugs.has(exercises[i].slug)) {
          setOpenIndex(i);
          return;
        }
      }
      // All remaining are solved — close
      setOpenIndex(null);
    }
  };

  // ── Hint parsing ─────────────────────────────────────────────────────
  const openHint = (ex: any) => {
    try {
      const hints = typeof ex.hints === "string" ? JSON.parse(ex.hints) : (ex.hints || []);
      setHintText(Array.isArray(hints) ? hints : []);
    } catch {
      setHintText([]);
    }
    setShowHint(ex.slug);
  };

  // ── Difficulty badge ─────────────────────────────────────────────────
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": case "beginner": return "bg-emerald-500";
      case "medium": case "intermediate": return "bg-amber-500";
      case "hard": case "advanced": case "expert": return "bg-rose-500";
      default: return "bg-slate-500";
    }
  };

  const diffWeight = (diff: string) =>
    ({ beginner: 1, easy: 1, intermediate: 2, medium: 2, advanced: 3, hard: 3, expert: 3 }[diff.toLowerCase()] || 4);

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border/50 bg-card/30 items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground w-full sm:w-auto">
          <ListFilter className="h-4 w-4" />
          <span>Filters:</span>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="flex bg-background border border-border/50 rounded-lg p-1">
            {["All", "Easy", "Medium", "Hard"].map(diff => (
              <button key={diff} onClick={() => setFilterDifficulty(diff)}
                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  filterDifficulty === diff ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>{diff}</button>
            ))}
          </div>
          <div className="flex bg-background border border-border/50 rounded-lg p-1">
            {["All", "Unsolved", "Solved"].map(stat => (
              <button key={stat} onClick={() => setFilterStatus(stat)}
                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  filterStatus === stat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>{stat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <span>
          {exercises.filter(e => completedSlugs.has(e.id) || completedSlugs.has(e.slug)).length} / {exercises.length} solved
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-warning" />
          {exercises.reduce((sum, e) => sum + ((completedSlugs.has(e.id) || completedSlugs.has(e.slug)) ? (e.xpReward || 0) : 0), 0)} XP earned
        </span>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filteredExercises.length > 0 ? filteredExercises.map((ex, index) => {
            const slug = ex.slug || ex.id;
            const isCompleted = completedSlugs.has(ex.id) || completedSlugs.has(ex.slug);
            const isOpen = openIndex === index;
            const hasHints = (() => { try {
              const h = typeof ex.hints === "string" ? JSON.parse(ex.hints) : ex.hints;
              return Array.isArray(h) && h.length > 0;
            } catch { return false; } })();

            return (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "rounded-xl border overflow-hidden transition-all duration-300",
                  isOpen
                    ? "border-primary/40 shadow-lg shadow-primary/5"
                    : isCompleted
                      ? "border-success/30 bg-success/5"
                      : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50",
                )}
              >
                {/* ── Accordion Header ── */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={cn(
                      "h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border transition-colors",
                      isCompleted
                        ? "bg-success/10 border-success/30"
                        : isOpen
                          ? "bg-primary/10 border-primary/30"
                          : "bg-muted border-border/50"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <TerminalSquare className={cn("h-5 w-5", isOpen ? "text-primary" : "text-muted-foreground")} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          "font-semibold text-base truncate",
                          isCompleted ? "text-success/80" : "text-foreground/90",
                        )}>
                          {ex.title}
                        </span>
                        {isCompleted && (
                          <Badge variant="outline" className="text-[10px] h-5 border-success/30 text-success bg-success/5 shrink-0">
                            Solved
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">{ex.topicName}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Sparkles className="h-3 w-3 text-warning" />
                          {ex.xpReward} XP
                        </span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(ex.difficulty)}`} />
                          <span className="text-xs capitalize text-muted-foreground hidden sm:inline">{ex.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180"
                  )} />
                </button>

                {/* ── Accordion Content (collapsible) ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-border/30"
                    >
                      <div className="p-4 sm:p-5 space-y-4">
                        {/* Prompt */}
                        <div className="max-h-60 overflow-y-auto bg-muted/30 rounded-lg p-4 border border-border/30">
                          <ExercisePrompt title={ex.title} prompt={ex.prompt || ex.description} />
                        </div>

                        {/* Editor */}
                        <div className="rounded-lg overflow-hidden border border-border/50 min-h-[200px]">
                          <div className="h-9 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4">
                            <span className="text-xs font-mono text-[#9CDCFE]">main.py</span>
                          </div>
                          <div className="h-[200px]">
                            <Editor
                              height="100%"
                              defaultLanguage={config.language}
                              theme="vs-dark"
                              value={getCode(slug, ex.starterCode)}
                              onChange={(val) => setCode(slug, val || "")}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                padding: { top: 12 },
                                scrollBeyondLastLine: false,
                                wordWrap: "on",
                              }}
                            />
                          </div>
                        </div>

                        {/* Output Console */}
                        <div className="rounded-lg bg-[#1E1E1E] border border-[#404040] min-h-[60px]">
                          <div className="h-8 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-3 gap-2">
                            <TerminalSquare className="h-3.5 w-3.5 text-[#858585]" />
                            <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Console</span>
                          </div>
                          <pre className="p-3 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC] min-h-[28px] max-h-[120px] overflow-y-auto">
                            {outputBySlug.get(slug) ? (
                              outputBySlug.get(slug)
                            ) : (
                              <span className="text-[#858585] italic">Run your code to see output...</span>
                            )}
                          </pre>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {hasHints && (
                              <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => openHint(ex)}>
                                <Lightbulb className="h-3.5 w-3.5" /> Hint
                              </Button>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {ex.xpReward} XP on pass
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary" size="sm" className="gap-1.5"
                              onClick={() => handleRun(ex)}
                              disabled={runningSlug === slug || submittingSlug === slug || isPyodideLoading}
                            >
                              {runningSlug === slug ? (
                                <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                              ) : <Play className="h-3.5 w-3.5" />}
                              Run
                            </Button>
                            <Button
                              size="sm" className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground"
                              onClick={() => handleSubmit(ex)}
                              disabled={runningSlug === slug || submittingSlug === slug || isPyodideLoading}
                            >
                              {submittingSlug === slug ? (
                                <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                              ) : <Send className="h-3.5 w-3.5" />}
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-border/60 rounded-2xl bg-muted/10 backdrop-blur-sm"
            >
              <TerminalSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-foreground mb-1">No challenges found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
              <Button variant="outline" size="sm" onClick={() => { setFilterDifficulty("All"); setFilterStatus("All"); }} className="mt-4">
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint Dialog */}
      {showHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={() => setShowHint(null)}>
          <div className="bg-background border border-border/60 rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-lg">Need a Hint?</h3>
            </div>
            <div className="space-y-3">
              {hintText.map((hint, i) => (
                <div key={i} className="flex gap-2 p-3 bg-muted rounded-lg">
                  <Badge variant="secondary" className="h-6 mt-0.5 shrink-0">Hint {i + 1}</Badge>
                  <p className="text-sm">{hint}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" onClick={() => setShowHint(null)}>Got it</Button>
          </div>
        </div>
      )}
    </div>
  );
}
