"use client";

import Link from "next/link";
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
} from "@/components/ui/sidebar";
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
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Roadmaps", url: "/roadmaps", icon: Map },
  { title: "Practice", url: "/practice", icon: Dumbbell },
  { title: "Projects", url: "/projects", icon: FolderDot },
  { title: "Playground", url: "#", icon: Terminal },
  { title: "AI Mentor", url: "/ai-mentor", icon: Bot },
];

const secondaryItems = [
  { title: "Progress", url: "/progress", icon: Award },
  { title: "Daily Challenge", url: "#", icon: Calendar },
  { title: "Bookmarks", url: "/notes", icon: Bookmark },
  { title: "Notes", url: "/notes", icon: FileText },
];

const bottomItems = [
  { title: "Search", url: "#", icon: Search },
  { title: "Profile", url: "#", icon: User },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4 border-b">
        <div className="font-bold text-xl text-primary flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          <span>PyMentor</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.url}>
                        <item.icon />
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
                    render={
                      <Link href={item.url}>
                        <item.icon />
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
                        <item.icon />
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
