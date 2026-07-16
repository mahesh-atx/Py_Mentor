"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Bot, GitBranch, Clock, Calculator, Loader2, Gamepad2, Trophy, FolderDot, Receipt, HelpCircle, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { submitProjectAction } from "@/app/actions";

interface Milestone {
  title: string;
  description: string;
}

const IconMap: Record<string, any> = {
  Calculator: Calculator,
  Gamepad2: CreditCard,
  Trophy: Trophy,
  Bot: Bot
};

export function ProjectAccordionItem({ 
  project, 
  isCompletedInitially, 
  isExpanded, 
  onToggle 
}: { 
  project: any, 
  isCompletedInitially: boolean, 
  isExpanded: boolean, 
  onToggle: () => void 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewed, setIsReviewed] = useState(isCompletedInitially);
  const [repoLink, setRepoLink] = useState("");

  let parsedSkills: string[] = [];
  try {
    if (project.skills) parsedSkills = JSON.parse(project.skills);
    else if (project.requirements) parsedSkills = project.requirements.split(',').map((s: string) => s.trim());
  } catch(e) {}

  const requirements = project.requirements && project.requirements.startsWith('[') ? JSON.parse(project.requirements) : parsedSkills;
  const milestones = project.milestones ? JSON.parse(project.milestones) : [];
  const hints = project.hints ? JSON.parse(project.hints) : [];

  let ProjectIcon = HelpCircle;
  if (project.slug.includes("calculator")) ProjectIcon = Calculator;
  else if (project.slug.includes("game")) ProjectIcon = CreditCard;
  else if (project.slug.includes("quiz")) ProjectIcon = HelpCircle;
  else if (project.slug.includes("expense")) ProjectIcon = Receipt;
  else ProjectIcon = FolderDot;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'beginner': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'medium':
      case 'intermediate': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'hard':
      case 'advanced':
      case 'expert': return 'bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  const handleSubmit = async () => {
    if (!repoLink.includes("github.com")) {
      toast.error("Please enter a valid GitHub repository link.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate AI Code Review delay
    setTimeout(async () => {
      try {
        const result = await submitProjectAction(project.id, repoLink);
        setIsSubmitting(false);
        setIsReviewed(true);
        
        if (result.success) {
          toast.success("AI Code Review passed! Project completed.");
          if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
            result.unlockedAchievements.forEach((ach: any) => {
              toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
                duration: 5000,
              });
            });
          }
        } else {
          toast.error("Failed to save project progress.");
        }
      } catch (e) {
        setIsSubmitting(false);
        toast.error("An error occurred during submission.");
      }
    }, 2500);
  };

  return (
    <div className="rounded-xl border border-border/50 bg-background overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      <button 
        onClick={onToggle}
        className="w-full text-left group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-background hover:bg-card/50 transition-colors block gap-4 sm:gap-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
          <div className={`hidden sm:flex h-12 w-12 shrink-0 rounded-xl items-center justify-center border transition-colors ${
            isReviewed
              ? "bg-success/10 border-success/30" 
              : "bg-muted border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30"
          }`}>
            {isReviewed ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <ProjectIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
          
          <div className="flex flex-col gap-1.5 w-full">
            <span className="font-semibold text-foreground/90 group-hover:text-primary transition-colors text-base sm:text-lg">
              {project.title}
            </span>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium bg-muted/50 px-2 py-0.5 rounded-md text-foreground/70">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                {project.estimatedTime || "2 Hours"}
              </span>
              
              {parsedSkills.length > 0 && <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />}
              
              {parsedSkills.slice(0, 3).map((skill, idx) => (
                <span key={skill} className={`bg-background border border-border/50 px-2 py-0.5 rounded-md text-xs font-medium ${idx > 1 ? 'hidden sm:inline-flex' : ''}`}>
                  {skill}
                </span>
              ))}
              {parsedSkills.length > 3 && (
                <span className="text-xs text-muted-foreground">+{parsedSkills.length - 3} more</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10 sm:w-auto shrink-0 self-end sm:self-auto">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50">
            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(project.difficulty)}`} />
            <span className="text-xs font-medium capitalize text-muted-foreground">
              {project.difficulty}
            </span>
          </div>
          <div className="h-9 px-4 rounded-lg bg-primary/5 text-primary font-medium text-sm flex items-center gap-2 group-hover:bg-primary/10 transition-all duration-300">
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? (
               <ChevronUp className="h-4 w-4" />
            ) : (
               <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-muted/10"
          >
            <div className="p-4 md:p-6 max-w-3xl">
              {milestones.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground/80 mb-4">Project Steps</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {milestones.map((m: Milestone, i: number) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Timeline dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                          {i + 1}
                        </div>
                        
                        {/* Content */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-border/50 bg-background shadow-sm hover:border-primary/30 transition-colors">
                          <h4 className="font-semibold text-sm text-foreground mb-1">{m.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2 font-medium text-foreground">Project Overview</p>
                  <p>{project.description}</p>
                  {requirements.length > 0 && (
                    <ul className="mt-4 space-y-1 list-disc list-inside">
                      {requirements.map((req: string, i: number) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
