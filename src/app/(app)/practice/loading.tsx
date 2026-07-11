import { Dumbbell } from "lucide-react";

export default function PracticeLoading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <header className="mb-16 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10 animate-pulse" />
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 flex items-center gap-4 text-foreground">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 animate-pulse">
            <Dumbbell className="h-8 w-8 text-primary opacity-50" />
          </div>
          Practice Arena
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sharpen your logic and master Python. Choose a challenge below to jump straight into the interactive coding environment.
        </p>
      </header>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border/50 bg-card/20 rounded-2xl overflow-hidden shadow-sm animate-pulse">
            <div className="w-full flex items-center justify-between p-6">
              <div className="space-y-3">
                <div className="h-6 w-24 bg-primary/10 rounded-md" />
                <div className="h-8 w-48 sm:w-64 bg-muted rounded-md" />
              </div>
              <div className="shrink-0 h-10 w-10 rounded-full bg-muted border border-border/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
