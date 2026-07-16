import { CurriculumService } from "@/lib/services/curriculum.service";
import { FolderDot, TerminalSquare } from "lucide-react";
import { getPlatformConfig } from "@/lib/config/platform";
import { db } from "@/lib/db/prisma";
import { auth } from "@/auth";
import { ProjectsModuleListClient } from "./projects-module-list-client";

export default async function ProjectsPage() {
  const roadmaps = await CurriculumService.getRoadmaps();
  const config = getPlatformConfig();

  const session = await auth();
  let completedProjectSlugs: string[] = [];

  if (session?.user?.id) {
    const userSubmissions = await db.submission.findMany({
      where: {
        userId: session.user.id,
        status: "passed",
        projectId: { not: null }
      },
      select: { projectId: true }
    });
    completedProjectSlugs = Array.from(new Set(userSubmissions.map(s => s.projectId as string)));
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <header className="mb-16 relative flex flex-col md:flex-row items-center justify-between gap-8 py-2">
        {/* Subtle background glow effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
        
        <div className="space-y-4 flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 flex items-center gap-4 text-foreground">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <FolderDot className="h-8 w-8 text-primary" />
            </div>
            Real-World Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Put your {config.languageCapitalized} knowledge to the test. These guided projects simulate real-world applications and will solidify your understanding of core concepts while helping you build a portfolio.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-1/3 max-w-[180px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/illustrations/notion-2.jpg" alt="Projects Illustration" className="w-full h-auto rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
        </div>
      </header>

      <ProjectsModuleListClient roadmaps={roadmaps} completedProjectSlugs={completedProjectSlugs} />

      {roadmaps.every((r: any) => !r.modules.some((m: any) => m.topics.some((t: any) => t.projects && t.projects.length > 0))) && (
        <div className="text-center py-24 border border-dashed border-border/60 rounded-2xl bg-muted/20 backdrop-blur-sm">
          <TerminalSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">No projects available yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Check back later for exciting hands-on projects.
          </p>
        </div>
      )}
    </div>
  );
}
