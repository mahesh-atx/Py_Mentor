"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePlatform } from "@/components/platform-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User, DownloadCloud } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { UpdateModal } from "@/components/update-modal";
import { VersionInfo } from "@/lib/services/version.service";
import { motion } from "framer-motion";

export function TopNav({ roadmaps = [], user }: { roadmaps?: any[], user?: any }) {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const config = usePlatform();
  
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    // Check for updates quietly in the background
    const checkForUpdates = async () => {
      try {
        const res = await fetch("/api/version");
        if (res.ok) {
          const data = await res.json();
          setVersionInfo(data);
        }
      } catch (e) {
        console.error("Failed to check for updates");
      }
    };
    
    checkForUpdates();
    // Poll every 4 hours just in case the app is left open
    const interval = setInterval(checkForUpdates, 14400000); 
    return () => clearInterval(interval);
  }, []);
  
  // Find matching topic context
  let breadcrumbs: { title: string; href?: string }[] = [];
  
  if (pathname.startsWith("/learn/")) {
    const slug = pathname.split('/').pop();
    let found = false;
    
    for (const roadmap of roadmaps) {
      if (found) break;
      for (const mod of roadmap.modules || []) {
        if (found) break;
        for (const topic of mod.topics || []) {
          if (topic.slug === slug) {
            const cleanTopicTitle = topic.title.replace(/^(?:Module|Topic|Phase)?\s*[\d\.]+\s*[\.\-\:]?\s*/i, '');
            breadcrumbs = [
              { title: "Learn" },
              { title: cleanTopicTitle, href: `/learn/${topic.slug}` }
            ];
            found = true;
            break;
          }
        }
      }
    }
    
    if (!found) {
       breadcrumbs = [{ title: "Learn" }, { title: slug ? slug.replace(/-/g, ' ') : "Topic" }];
    }
  } else {
    // Basic dynamic breadcrumb generation
    const segments = pathname.split('/').filter(Boolean);
    const currentPathName = segments.length > 0 ? segments[segments.length - 1] : "Dashboard";
    const titleCasePath = currentPathName.charAt(0).toUpperCase() + currentPathName.slice(1);
    if (currentPathName !== "Dashboard") {
      breadcrumbs = [{ title: titleCasePath }];
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur px-4">
        {(state === "collapsed" || isMobile) && (
          <>
            <SidebarTrigger className="-ml-1" />
            <div className="mr-2 h-4 w-px bg-border" />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">{config.appName}</BreadcrumbLink>
            </BreadcrumbItem>
            
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {crumb.href && index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={crumb.href} className="hidden md:block">{crumb.title}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className={index < breadcrumbs.length - 1 ? "hidden md:block" : ""}>
                      {crumb.title}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="ml-auto flex items-center gap-2 md:gap-4">

          {versionInfo?.updateAvailable && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center gap-1.5 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary hover:text-primary transition-all rounded-full px-3 h-8"
                onClick={() => setUpdateModalOpen(true)}
              >
                <DownloadCloud className="h-4 w-4" />
                <span className="text-xs font-semibold">Update Available</span>
              </Button>
            </motion.div>
          )}

          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger render={<button className="rounded-full outline-none" />}>
              <Avatar className="h-8 w-8 cursor-pointer border hover:opacity-80 transition-opacity">
                <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.name || "@user"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <UpdateModal 
        open={updateModalOpen} 
        onOpenChange={setUpdateModalOpen} 
        versionInfo={versionInfo} 
      />
    </>
  );
}
