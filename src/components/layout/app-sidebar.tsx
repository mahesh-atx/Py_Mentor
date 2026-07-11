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
  ChevronDown
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, colorClass: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" },
  { title: "Roadmaps", url: "/roadmaps", icon: Map, colorClass: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" },
  { title: "Practice", url: "/practice", icon: Dumbbell, colorClass: "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" },
  { title: "Projects", url: "/projects", icon: FolderDot, colorClass: "text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" },
];

const secondaryItems = [
  { title: "Progress", url: "/progress", icon: Award, colorClass: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" },
  { title: "Daily Challenge", url: "/daily-challenge", icon: Calendar, colorClass: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]" },
  { title: "Bookmarks", url: "/notes", icon: Bookmark, colorClass: "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" },
  { title: "Notes", url: "/notes", icon: FileText, colorClass: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" },
];

const bottomItems = [
  { title: "Search", url: "#", icon: Search, colorClass: "text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all" },
  { title: "Profile", url: "#", icon: User, colorClass: "text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all" },
  { title: "Settings", url: "#", icon: Settings, colorClass: "text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all" },
];

function CollapsibleModule({ mod, pathname }: { mod: any; pathname: string }) {
  const isModActive = mod.topics?.some((t: any) => pathname.includes(`/learn/${t.slug}`)) || false;
  // Modules start collapsed by default
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton 
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        isActive={isModActive && !isOpen} 
        className="justify-between cursor-pointer w-full"
      >
        <span className="truncate text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300">{mod.title}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </SidebarMenuSubButton>
      {isOpen && (
        <SidebarMenuSub className="mr-0 pr-0 border-l border-border/50 ml-2">
          {mod.topics?.map((topic: any) => {
            const isTopicActive = pathname.includes(`/learn/${topic.slug}`);
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
                      <span className={cn(
                        "truncate transition-all duration-300 text-sm font-normal",
                        isTopicActive ? "text-primary pl-2" : "text-muted-foreground group-hover/topic:text-foreground pl-2"
                      )}>
                        {topic.title}
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

function SidebarPhase({ roadmap, pathname }: { roadmap: any; pathname: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 mt-4 px-2">
        {roadmap.title}
      </div>
      <SidebarMenuSub className="mr-0 pr-0 border-none ml-0 space-y-1">
        {roadmap.modules?.map((mod: any) => (
          <CollapsibleModule key={mod.id} mod={mod} pathname={pathname} />
        ))}
      </SidebarMenuSub>
    </div>
  );
}

function LearnAccordion({ roadmaps, pathname }: { roadmaps?: any[]; pathname: string }) {
  const isLearnActive = pathname.startsWith("/learn");
  const [isOpen, setIsOpen] = useState(isLearnActive);
  const { state } = useSidebar();

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
          <BookOpen className="h-4 w-4 shrink-0 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <span className="group-data-[collapsible=icon]:hidden">Learn</span>
        </div>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform group-data-[collapsible=icon]:hidden ${isOpen ? "rotate-180" : ""}`} />
      </SidebarMenuButton>
      {isOpen && state === "expanded" && (
        <SidebarMenuSub className="mr-0 pr-0 border-l border-border/50 ml-3 group-data-[collapsible=icon]:hidden">
          {roadmaps?.map(roadmap => (
            <SidebarPhase key={roadmap.id} roadmap={roadmap} pathname={pathname} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar({ roadmaps }: { roadmaps?: any[] }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="bg-background !border-r-0" style={{ borderRight: 'none' }}>
      <SidebarHeader className="p-4 border-b flex flex-col gap-2">
        <div className="font-bold text-xl text-primary flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Terminal className="h-6 w-6 shrink-0 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
            <span className="drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] truncate group-data-[collapsible=icon]:hidden">PyMentor</span>
          </div>
          {state === "expanded" && <SidebarTrigger className="h-6 w-6 ml-auto" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/"} render={
                  <Link href="/"><LayoutDashboard className="h-4 w-4 shrink-0 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" /><span>Dashboard</span></Link>
                } />
              </SidebarMenuItem>

              <LearnAccordion roadmaps={roadmaps} pathname={pathname} />

              {navItems.filter(i => i.title !== "Dashboard").map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    render={
                      <Link href={item.url}>
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
        <SidebarGroup>
          <SidebarGroupLabel>Your Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    render={
                      <Link href={item.url}>
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
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.url}>
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
