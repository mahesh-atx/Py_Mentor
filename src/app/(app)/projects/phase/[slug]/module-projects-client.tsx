"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderDot, ArrowRight, TerminalSquare, Calculator, CreditCard, HelpCircle, Receipt, Clock, CheckCircle2, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ProjectAccordionItem } from "./project-accordion-item";

export function ModuleProjectsClient({ projects, completedProjectSlugs = [] }: { projects: any[], completedProjectSlugs?: string[] }) {
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

  const sortedProjects = [...projects].sort((a, b) => getDifficultyWeight(a.difficulty) - getDifficultyWeight(b.difficulty));

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {sortedProjects.length > 0 ? (
             sortedProjects.map((project: any, index) => {
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
                There are no projects available in this module yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
