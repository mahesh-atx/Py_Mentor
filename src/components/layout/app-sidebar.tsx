"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Dumbbell,
  FolderDot,
  Terminal,
  Bot,
  Award,
  Calendar,
  Bookmark,
  FileText,
  Search,
  Settings,
  User,
  ChevronDown,
  CheckCircle2
} from "lucide-react";

const overviewItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, colorClass: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" },
];

const learnItems = [
  { title: "Roadmaps", url: "/roadmaps", icon: Map, colorClass: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" },
  { title: "Practice", url: "/practice", icon: Dumbbell, colorClass: "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" },
  { title: "Projects", url: "/projects", icon: FolderDot, colorClass: "text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" },
];

const progressItems = [
  { title: "Progress", url: "/progress", icon: Award, colorClass: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" },
  { title: "Daily Challenge", url: "/daily-challenge", icon: Calendar, colorClass: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]" },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark, colorClass: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User, colorClass: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all" },
  { title: "Settings", url: "/settings", icon: Settings, colorClass: "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all" },
];

function CollapsibleModule({ mod, pathname, completedLessonSlugs }: { mod: any; pathname: string; completedLessonSlugs: string[] }) {
  const isModActive = mod.topics?.some((t: any) => pathname.includes(`/learn/${t.slug}`)) || false;
  // Modules start collapsed by default
  const [isOpen, setIsOpen] = useState(false);
  const cleanModTitle = mod.title.replace(/^(?:Module|Topic|Phase)?\s*[\d\.]+\s*[\.\-\:]?\s*/i, '');

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton 
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        isActive={isModActive && !isOpen} 
        className="justify-between cursor-pointer w-full group/mod"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <FolderDot className="h-4 w-4 shrink-0 text-primary/70 group-hover/mod:text-primary transition-colors" />
          <span className="truncate text-sm font-medium text-sidebar-foreground/90 group-hover/mod:text-primary transition-all duration-300">
            {cleanModTitle}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </SidebarMenuSubButton>
      {isOpen && (
        <SidebarMenuSub className="mr-0 pr-0 border-l border-border/50 ml-4">
          {mod.topics?.map((topic: any) => {
            const isTopicActive = pathname.includes(`/learn/${topic.slug}`);
            const isCompleted = topic.lessons?.length > 0 && topic.lessons.every((l: any) => completedLessonSlugs.includes(l.slug));
            const cleanTopicTitle = topic.title.replace(/^(?:Module|Topic|Phase)?\s*[\d\.]+\s*[\.\-\:]?\s*/i, '');
            
            return (
              <SidebarMenuSubItem key={topic.id}>
                <SidebarMenuSubButton
                  isActive={isTopicActive}
                  className={cn(
                    "py-1.5 h-auto",
                    isTopicActive ? "bg-primary/10 border-l-2 border-primary rounded-none" : ""
                  )}
                  render={
                    <Link href={`/learn/${topic.slug}`} className="flex items-center gap-2 w-full group/topic">
                      {isCompleted ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success opacity-80" />
                      ) : (
                        <FileText className={`h-3.5 w-3.5 shrink-0 ${isTopicActive ? 'text-primary' : 'text-sidebar-foreground/50 group-hover/topic:text-sidebar-foreground'}`} />
                      )}
                      <span className={cn(
                        "truncate transition-all duration-300 text-sm font-normal",
                        isTopicActive ? "text-primary" : "text-sidebar-foreground/70 group-hover/topic:text-sidebar-foreground"
                      )}>
                        {cleanTopicTitle}
                      </span>
                    </Link>
                  }
                />
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuSubItem>
  );
}

function RoadmapAccordionItem({ roadmap, pathname, completedLessonSlugs }: { roadmap: any, pathname: string, completedLessonSlugs: string[] }) {
  const isRoadmapActive = roadmap.modules?.some((mod: any) => 
    mod.topics?.some((t: any) => pathname.includes(`/learn/${t.slug}`))
  ) || false;
  
  const [isOpen, setIsOpen] = useState(isRoadmapActive);
  const cleanRoadmapTitle = roadmap.title;
  
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton 
        onClick={(e) => { 
          e.preventDefault(); 
          setIsOpen(!isOpen); 
        }}
        isActive={isRoadmapActive && !isOpen} 
        className="justify-between cursor-pointer w-full group/roadmap"
      >
        <span className="truncate text-sm font-semibold text-sidebar-foreground/90 group-hover/roadmap:text-primary transition-all duration-300">
          {cleanRoadmapTitle}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </SidebarMenuSubButton>
      
      {isOpen && (
        <SidebarMenuSub className="mr-0 pr-0 border-l border-border/50 ml-4">
          {roadmap.modules?.map((mod: any) => (
            <CollapsibleModule key={mod.id} mod={mod} pathname={pathname} completedLessonSlugs={completedLessonSlugs} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuSubItem>
  );
}

function CurriculumAccordion({ roadmaps, pathname, completedLessonSlugs }: { roadmaps?: any[]; pathname: string; completedLessonSlugs: string[] }) {
  const isLearnActive = pathname.startsWith("/learn");
  const [isOpen, setIsOpen] = useState(isLearnActive);
  const { state } = useSidebar();

  if (!roadmaps || roadmaps.length === 0) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={(e) => { 
          e.preventDefault(); 
          if (state === "expanded") setIsOpen(!isOpen); 
        }}
        className="justify-between cursor-pointer w-full"
        isActive={isLearnActive && !isOpen}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 shrink-0 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="group-data-[collapsible=icon]:hidden">Curriculum</span>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform group-data-[collapsible=icon]:hidden ${isOpen ? "rotate-180" : ""}`} />
      </SidebarMenuButton>
      {isOpen && state === "expanded" && (
        <SidebarMenuSub className="mr-0 pr-0 border-l border-border/50 ml-3 group-data-[collapsible=icon]:hidden">
          {roadmaps.map((roadmap) => (
            <RoadmapAccordionItem key={roadmap.id} roadmap={roadmap} pathname={pathname} completedLessonSlugs={completedLessonSlugs} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

import { usePlatform } from "@/components/platform-provider";

export function AppSidebar({ roadmaps, completedLessonSlugs = [], ...props }: { roadmaps?: any[], completedLessonSlugs?: string[] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const config = usePlatform();

  return (
    <Sidebar collapsible="icon" className="!border-r-0 !bg-background/60 backdrop-blur-xl shadow-2xl" {...props}>
      <SidebarHeader className="p-4 border-b border-sidebar-border flex flex-col gap-2">
        <div className="font-bold text-xl text-primary flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Terminal className="h-6 w-6 shrink-0 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
            <span className="drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] truncate group-data-[collapsible=icon]:hidden">{config.appName}</span>
          </div>
          {state === "expanded" && <SidebarTrigger className="h-6 w-6 ml-auto" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Overview Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/40 mb-1">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    className="group"
                    render={
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4 shrink-0", item.colorClass)} />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learn Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/40 mb-1">Learn</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <CurriculumAccordion roadmaps={roadmaps} pathname={pathname} completedLessonSlugs={completedLessonSlugs} />
              {learnItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    className="group"
                    render={
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4 shrink-0", item.colorClass)} />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Your Progress Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/40 mb-1">Your Progress</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {progressItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    className="group"
                    render={
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4 shrink-0", item.colorClass)} />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-sidebar-foreground/40 mb-1">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    className="group"
                    render={
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className={cn("h-4 w-4 shrink-0", item.colorClass)} />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
