"use client";

import Link from "next/link";
import { FolderDot, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function PracticeListClient({ modules, completedExerciseSlugs = [] }: { modules: any[], completedExerciseSlugs?: string[] }) {
  return (
      <div className="space-y-6">
      {modules.map((module, index) => {
        let totalExercises = 0;
        let completed = 0;
        
        module.topics.forEach((t: any) => {
          if (!t.exercises) return;
          totalExercises += t.exercises.length;
          t.exercises.forEach((ex: any) => {
             if (completedExerciseSlugs.includes(ex.id) || completedExerciseSlugs.includes(ex.slug)) {
                completed++;
             }
          });
        });

        if (totalExercises === 0) return null;

        const progressPercent = Math.round((completed / totalExercises) * 100);

        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link 
              href={`/practice/module/${module.slug}`} 
              className="group relative overflow-hidden flex items-center justify-between p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full"
            >
               {/* Hover Gradient Background */}
               <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               
               <div className="relative z-10 flex items-center gap-6 flex-1 min-w-0">
                 <div className="shrink-0 h-12 w-12 rounded-xl hidden sm:flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                   <FolderDot className="h-6 w-6 text-primary" />
                 </div>
                 
                 <div className="space-y-2 flex-1 min-w-0">
                   <div className="flex items-center gap-3">
                     <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">{module.title}</h3>
                     {completed === totalExercises && totalExercises > 0 && (
                       <span className="shrink-0 flex items-center gap-1 text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <CheckCircle2 className="h-3 w-3" /> Done
                       </span>
                     )}
                   </div>
                   <p className="text-muted-foreground text-sm truncate">{module.description}</p>
                   
                   <div className="flex items-center gap-3 max-w-md">
                     <div className="h-2 flex-1 bg-secondary/50 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                         style={{ width: `${progressPercent}%` }} 
                       />
                     </div>
                     <span className="text-xs font-medium text-muted-foreground shrink-0 whitespace-nowrap">
                       {completed} / {totalExercises} ({progressPercent}%)
                     </span>
                   </div>
                 </div>
               </div>

               <div className="relative z-10 shrink-0 h-10 w-10 rounded-full bg-background border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 ml-4 sm:ml-6">
                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  );
}
