"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Terminal, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LearnSidebar({ roadmaps }: { roadmaps?: any[] }) {
  const pathname = usePathname();
  const firstRoadmap = roadmaps?.[0];
  const modules = firstRoadmap?.modules || [];

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            <span>PyMentor</span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="w-full justify-start text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {modules.map((module: any, index: number) => (
          <SidebarGroup key={module.id}>
            <SidebarGroupLabel className="text-xs font-semibold text-primary uppercase tracking-wider">
              {module.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {module.topics?.map((topic: any) => {
                  const isActive = pathname === `/learn/${topic.slug}`;
                  const isCompleted = topic.status === 'completed';
                  
                  return (
                    <SidebarMenuItem key={topic.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        render={
                          <Link href={`/learn/${topic.slug}`} className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span className="truncate" title={topic.title}>{topic.title}</span>
                            </div>
                            {isCompleted && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
                          </Link>
                        }
                      />
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {modules.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No curriculum data found.
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
