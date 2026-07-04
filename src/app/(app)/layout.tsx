import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FloatingAiMentor } from "@/components/floating-ai-mentor";
import { FloatingEditor } from "@/components/floating-editor";
import { CurriculumService } from "@/lib/services/curriculum.service";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roadmaps = await CurriculumService.getRoadmaps();

  return (
    <SidebarProvider>
      <AppSidebar roadmaps={roadmaps} />
      <SidebarInset className="flex flex-col min-w-0 flex-1">
        <TopNav />
        <main className="flex-1 bg-background p-6">
          {children}
        </main>
      </SidebarInset>
      <FloatingAiMentor />
      <FloatingEditor />
    </SidebarProvider>
  );
}
