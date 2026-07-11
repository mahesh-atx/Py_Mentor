"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TerminalSquare, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function PracticeListClient({ modules }: { modules: any[] }) {
  const firstModuleWithExercises = modules.find(m => m.topics.some((t: any) => t.exercises.length > 0));
  const [openModuleIds, setOpenModuleIds] = useState<Set<string>>(
    new Set(firstModuleWithExercises ? [firstModuleWithExercises.id] : [])
  );

  const toggleModule = (id: string) => {
    setOpenModuleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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

  const containerVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeInOut" }
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: -15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    }
  };

  return (
    <div className="space-y-6">
      {modules.map((module, index) => {
        const hasExercises = module.topics.some((t: any) => t.exercises.length > 0);
        if (!hasExercises) return null;

        const isOpen = openModuleIds.has(module.id);

        return (
          <div key={module.id} className="border border-border/50 bg-card/20 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
            {/* Accordion Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-card/40 transition-colors text-left outline-none"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-1 rounded-md">
                    Module {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground tracking-tight">{module.title}</h2>
              </div>
              <div
                className={`shrink-0 h-10 w-10 rounded-full bg-background border flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-primary/10 border-primary/30 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>

            {/* Accordion Body with Framer Motion */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 flex flex-col gap-6">
                    {module.topics.map((topic: any) => {
                      if (!topic.exercises || topic.exercises.length === 0) return null;
                      
                      return (
                        <TopicAccordion 
                          key={topic.id} 
                          topic={topic} 
                          itemVariants={itemVariants} 
                          getDifficultyColor={getDifficultyColor} 
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function TopicAccordion({ topic, itemVariants, getDifficultyColor }: { topic: any, itemVariants: Variants, getDifficultyColor: (d: string) => string }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const containerVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.3, ease: "easeInOut" },
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeInOut" }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors group text-left outline-none"
      >
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300", isOpen ? "rotate-180" : "")} />
        <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground/80 group-hover:text-foreground transition-colors shrink-0">
          {topic.title}
        </h3>
        <div className="h-[1px] bg-border flex-1 ml-2 hidden sm:block" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden flex flex-col gap-3 pl-8 border-l-2 border-border/30 ml-4"
          >
            {topic.exercises.map((exercise: any) => (
              <motion.div key={exercise.id} variants={itemVariants}>
                <Link
                  href={`/practice/${exercise.slug}`}
                  className="group relative overflow-hidden flex items-center justify-between p-4 sm:p-5 rounded-xl border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center gap-5 relative z-10">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                      <TerminalSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-base sm:text-lg">
                        {exercise.title}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 text-foreground/70 font-medium bg-muted/50 px-2 py-0.5 rounded-md">
                          <Sparkles className="h-3 w-3 text-warning" />
                          {exercise.xpReward} XP
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 relative z-10">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50">
                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`} />
                      <span className="text-xs font-medium capitalize text-muted-foreground">
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className="h-8 w-8 shrink-0 rounded-full bg-background border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
