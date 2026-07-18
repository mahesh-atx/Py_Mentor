"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, TerminalSquare, Sparkles, CheckCircle2, ListFilter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ModulePracticeClient({ exercises, completedExerciseSlugs }: { exercises: any[], completedExerciseSlugs: string[] }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";
      case "medium":
      case "intermediate":
        return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]";
      case "hard":
      case "advanced":
      case "expert":
        return "bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]";
      default:
        return "bg-slate-500";
    }
  };

  const getDifficultyWeight = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return 1;
      case "medium":
      case "intermediate":
        return 2;
      case "hard":
      case "advanced":
      case "expert":
        return 3;
      default:
        return 4;
    }
  };

  const groupedExercises = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const ex of exercises) {
      const tn = ex.topicName || "General";
      if (!map.has(tn)) map.set(tn, []);
      map.get(tn)!.push(ex);
    }
    return Array.from(map.entries()).map(([topicName, exercises]) => ({ topicName, exercises }));
  }, [exercises]);

  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (groupedExercises.length > 0 && !hasInitialized) {
      setOpenTopics(new Set([groupedExercises[0].topicName]));
      setHasInitialized(true);
    }
  }, [groupedExercises, hasInitialized]);

  const toggleTopic = (topicName: string) => {
    setOpenTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicName)) next.delete(topicName);
      else next.add(topicName);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Grouped Exercise List */}
      <div className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {groupedExercises.length > 0 ? (
            groupedExercises.map((group, groupIndex) => {
              const isOpen = openTopics.has(group.topicName);
              
              return (
                <div key={group.topicName} className="flex flex-col gap-3">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleTopic(group.topicName)}
                    className="group/acc flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/acc:scale-110 transition-transform">
                        <ListFilter className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-lg">{group.topicName}</span>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {group.exercises.length} {group.exercises.length === 1 ? "Exercise" : "Exercises"}
                      </span>
                    </div>
                    <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 pb-2 pt-1 pl-2 sm:pl-6 ml-2 sm:ml-4 border-l-2 border-border/30">
                          {group.exercises.map((exercise, index) => {
                            const isCompleted = completedExerciseSlugs.includes(exercise.id) || completedExerciseSlugs.includes(exercise.slug);
                            
                            return (
                              <motion.div
                                key={exercise.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
                              >
                                <Link
                                  href={`/practice/${exercise.slug}`}
                                  className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block gap-4 sm:gap-0"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                  <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                                    <div className={cn(
                                      "h-9 w-9 shrink-0 rounded-lg flex items-center justify-center border transition-colors",
                                      isCompleted
                                        ? "bg-success/10 border-success/30"
                                        : "bg-muted border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30"
                                    )}>
                                      {isCompleted ? (
                                        <CheckCircle2 className="h-4 w-4 text-success" />
                                      ) : (
                                        <TerminalSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                      )}
                                    </div>

                                    <div className="flex flex-col gap-1 w-full overflow-hidden">
                                      <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-base truncate">
                                        {exercise.title}
                                      </span>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="flex items-center gap-1 text-foreground/70 text-xs font-medium bg-muted/50 px-2 py-0.5 rounded-md border border-border/30">
                                          <Sparkles className="h-3 w-3 text-warning" />
                                          {exercise.xpReward} XP
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 relative z-10 sm:w-auto shrink-0 self-end sm:self-auto">
                                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50">
                                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`} />
                                      <span className="text-xs font-medium capitalize text-muted-foreground">
                                        {exercise.difficulty}
                                      </span>
                                    </div>
                                    <div className="h-8 px-3 rounded-lg bg-primary/10 text-primary font-medium text-xs flex items-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                      {isCompleted ? "Review" : "Solve"}
                                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-border/60 rounded-2xl bg-muted/10 backdrop-blur-sm"
            >
              <TerminalSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-foreground mb-1">No challenges found</h3>
              <p className="text-sm text-muted-foreground">
                There are no exercises available in this module yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
