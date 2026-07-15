import { CurriculumService } from "@/lib/services/curriculum.service";
import { PracticeListClient } from "./practice-list-client";
import { Dumbbell, TerminalSquare } from "lucide-react";
import { getPlatformConfig } from "@/lib/config/platform";

export default async function PracticeDashboard() {
  const roadmaps = await CurriculumService.getRoadmapsWithExercises();
  const modules = roadmaps.flatMap((r: any) => r.modules);
  const config = getPlatformConfig();

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
          Sharpen your logic and master {config.languageCapitalized}. Choose a challenge below to jump straight into the interactive coding environment.
        </p>
      </header>

      <PracticeListClient modules={modules} />

      {modules.every((m: any) => !m.topics.some((t: any) => t.exercises.length > 0)) && (
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
