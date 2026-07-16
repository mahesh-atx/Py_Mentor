import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FloatingAiMentor } from "@/components/floating-ai-mentor";
import { FloatingEditor } from "@/components/floating-editor";
import { MentorContextProvider } from "@/components/mentor-context";
import { CurriculumService } from "@/lib/services/curriculum.service";
import { UserService } from "@/lib/services/user.service";
import { db } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roadmaps = await CurriculumService.getRoadmaps();

  const user = await UserService.getLocalUser();
  const onboarded = await db.userMemory.findFirst({
    where: { userId: user.id, key: "onboarding_completed" }
  });

  if (!onboarded || onboarded.value !== "true") {
    redirect("/onboarding");
  }

  let completedLessonSlugs: string[] = [];
  if (user?.id) {
    const progress = await db.progress.findMany({
      where: { userId: user.id, status: "completed" },
      select: { lessonId: true }
    });
    completedLessonSlugs = Array.from(new Set(progress.map(p => p.lessonId)));
  }

  // The mentor context provider wraps the entire app subtree so client pages
  // (lessons, practice) can declare context AND the floating mentor can read
  // it. It's a client component; server-rendered children pass through fine.
  return (
    <MentorContextProvider>
      <SidebarProvider>
        <AppSidebar roadmaps={roadmaps} completedLessonSlugs={completedLessonSlugs} />
        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <TopNav roadmaps={roadmaps} user={user} />
          <main className="flex-1 bg-background p-6">
            {children}
          </main>
        </SidebarInset>
        <FloatingAiMentor />
        <FloatingEditor />
      </SidebarProvider>
    </MentorContextProvider>
  );
}
