import { db } from "@/lib/db/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { ModuleProjectsClient } from "./module-projects-client";
import { CurriculumService } from "@/lib/services/curriculum.service";

export default async function PhaseProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const roadmapData = await CurriculumService.getRoadmapBySlug(slug);

  if (!roadmapData) {
    notFound();
  }

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

  // Flatten projects from roadmap -> modules -> topics -> projects
  const allProjects = roadmapData.modules.flatMap((module: any) => 
    module.topics.flatMap((topic: any) => 
      (topic.projects || []).map((proj: any) => ({
        ...proj,
        topicName: topic.title,
        moduleName: module.title
      }))
    )
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      <header className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-1 rounded-md">
            Phase Projects
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {roadmapData.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {roadmapData.description}
        </p>
      </header>

      <ModuleProjectsClient 
        projects={allProjects} 
        completedProjectSlugs={completedProjectSlugs} 
      />
    </div>
  );
}
