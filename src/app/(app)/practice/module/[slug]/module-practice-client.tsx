"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TerminalSquare, Sparkles, CheckCircle2, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ModulePracticeClient({ exercises, completedExerciseSlugs }: { exercises: any[], completedExerciseSlugs: string[] }) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");

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

  const filteredExercises = exercises.filter(ex => {
    const isCompleted = completedExerciseSlugs.includes(ex.id) || completedExerciseSlugs.includes(ex.slug);
    
    if (filterDifficulty !== "All" && ex.difficulty.toLowerCase() !== filterDifficulty.toLowerCase()) return false;
    
    if (filterStatus === "Solved" && !isCompleted) return false;
    if (filterStatus === "Unsolved" && isCompleted) return false;
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border/50 bg-card/30 items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground w-full sm:w-auto">
          <ListFilter className="h-4 w-4" />
          <span>Filters:</span>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="flex bg-background border border-border/50 rounded-lg p-1">
            {["All", "Easy", "Medium", "Hard"].map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  filterDifficulty === diff ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {diff}
              </button>
            ))}
          </div>
          <div className="flex bg-background border border-border/50 rounded-lg p-1">
            {["All", "Unsolved", "Solved"].map(stat => (
              <button
                key={stat}
                onClick={() => setFilterStatus(stat)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  filterStatus === stat ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flat Exercise List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => {
              const isCompleted = completedExerciseSlugs.includes(exercise.id) || completedExerciseSlugs.includes(exercise.slug);
              
              return (
                <motion.div
                  key={exercise.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <Link
                    href={`/practice/${exercise.slug}`}
                    className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg block gap-4 sm:gap-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
                      <div className={cn(
                        "h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border transition-colors",
                        isCompleted
                          ? "bg-success/10 border-success/30"
                          : "bg-muted border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30"
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <TerminalSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>

                      <div className="flex flex-col gap-1 w-full overflow-hidden">
                        <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-base sm:text-lg truncate">
                          {exercise.title}
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md border border-border/30">
                            {exercise.topicName}
                          </span>
                          <span className="flex items-center gap-1.5 text-foreground/70 text-xs font-medium bg-muted/50 px-2 py-0.5 rounded-md border border-border/30">
                            <Sparkles className="h-3 w-3 text-warning" />
                            {exercise.xpReward} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 relative z-10 sm:w-auto shrink-0 self-end sm:self-auto">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50">
                        <div className={`w-2 h-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`} />
                        <span className="text-xs font-medium capitalize text-muted-foreground">
                          {exercise.difficulty}
                        </span>
                      </div>
                      <div className="h-9 px-4 rounded-lg bg-primary/10 text-primary font-medium text-sm flex items-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {isCompleted ? "Review" : "Solve"}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
                Try adjusting your filters to see more results.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { setFilterDifficulty("All"); setFilterStatus("All"); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
