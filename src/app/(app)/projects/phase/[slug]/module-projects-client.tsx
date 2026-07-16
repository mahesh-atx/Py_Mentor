"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderDot, ArrowRight, TerminalSquare, Calculator, CreditCard, HelpCircle, Receipt, Clock, CheckCircle2, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ProjectAccordionItem } from "./project-accordion-item";

export function ModuleProjectsClient({ projects, completedProjectSlugs = [] }: { projects: any[], completedProjectSlugs?: string[] }) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const getDifficultyWeight = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
      case "beginner": return 1;
      case "medium":
      case "intermediate": return 2;
      case "hard":
      case "advanced":
      case "expert": return 3;
      default: return 4;
    }
  };

  const filteredProjects = projects.filter(project => {
    const isCompleted = completedProjectSlugs.includes(project.slug) || completedProjectSlugs.includes(project.id);
    
    if (filterDifficulty !== "All") {
       const d = project.difficulty?.toLowerCase();
       const f = filterDifficulty.toLowerCase();
       const matchesBeginner = f === "beginner" && (d === "easy" || d === "beginner");
       const matchesIntermediate = f === "intermediate" && (d === "medium" || d === "intermediate");
       const matchesAdvanced = f === "advanced" && (d === "hard" || d === "advanced" || d === "expert");
       
       if (!matchesBeginner && !matchesIntermediate && !matchesAdvanced) return false;
    }
    
    if (filterStatus === "Solved" && !isCompleted) return false;
    if (filterStatus === "Unsolved" && isCompleted) return false;
    
    return true;
  }).sort((a, b) => getDifficultyWeight(a.difficulty) - getDifficultyWeight(b.difficulty));

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
            {["All", "Beginner", "Intermediate", "Advanced"].map(diff => (
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

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
             filteredProjects.map((project: any, index) => {
              const isCompleted = completedProjectSlugs.includes(project.slug) || completedProjectSlugs.includes(project.id);
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <ProjectAccordionItem 
                    project={project} 
                    isCompletedInitially={isCompleted}
                    isExpanded={expandedProjectId === project.id}
                    onToggle={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                  />
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
              <h3 className="text-lg font-medium text-foreground mb-1">No projects found</h3>
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
