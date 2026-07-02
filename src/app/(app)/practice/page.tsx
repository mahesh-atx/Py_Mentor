import { CurriculumService } from "@/lib/services/curriculum.service";
import Link from "next/link";
import { Dumbbell, ArrowRight, TerminalSquare, Sparkles } from "lucide-react";

export default async function PracticeDashboard() {
  const roadmaps = await CurriculumService.getRoadmapsWithExercises();
  const modules = roadmaps.flatMap(r => r.modules);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'medium': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'hard': return 'bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <header className="mb-16 relative">
        {/* Subtle background glow effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 flex items-center gap-4 text-foreground">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <Dumbbell className="h-8 w-8 text-primary" />
          </div>
          Practice Arena
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sharpen your logic and master Python. Choose a challenge below to jump straight into the interactive coding environment.
        </p>
      </header>

      <div className="space-y-16">
        {modules.map((module, index) => {
          const hasExercises = module.topics.some(t => t.exercises.length > 0);
          if (!hasExercises) return null;

          return (
            <section key={module.id} className="relative">
              {/* Module Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-bold tracking-widest text-primary/70 uppercase">
                  Module {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-6 text-foreground tracking-tight">{module.title}</h2>
              
              {/* Exercise List */}
              <div className="flex flex-col gap-3">
                {module.topics.map((topic) => (
                  topic.exercises.map((exercise) => (
                    <Link 
                      key={exercise.id} 
                      href={`/practice/${exercise.slug}`}
                      className="group relative overflow-hidden flex items-center justify-between p-4 sm:p-5 rounded-xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    >
                      {/* Hover Gradient Background */}
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
                            <span>{topic.title}</span>
                            <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
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
                  ))
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {modules.every(m => !m.topics.some(t => t.exercises.length > 0)) && (
        <div className="text-center py-24 border border-dashed border-border/60 rounded-2xl bg-muted/20 backdrop-blur-sm">
          <TerminalSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">No exercises available yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Check back later for new interactive coding challenges to test your skills.
          </p>
        </div>
      )}
    </div>
  );
}
