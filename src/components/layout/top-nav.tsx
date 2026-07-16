"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
    // 1. Electron auto-updater listener
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.onUpdateAvailable((info) => {
        setVersionInfo({
          currentVersion: "Current",
          latestVersion: info.version || "New",
          updateAvailable: true
        });
      });
      // The main process automatically checks for updates on startup
    } else {
      // 2. Fallback to NPM check for web/cli
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
      const interval = setInterval(checkForUpdates, 14400000); 
      return () => clearInterval(interval);
    }
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
    if (segments.length > 0 && segments[0] !== "dashboard") {
      breadcrumbs = segments
        .filter(seg => seg !== 'module') // Skip filler segments
        .map((seg, index, arr) => {
          let title = seg;
          // Capitalize first segment (e.g., 'practice' -> 'Practice')
          if (index === 0) {
            title = seg.charAt(0).toUpperCase() + seg.slice(1);
          }
          
          return {
            title: title,
            href: index < arr.length - 1 ? `/${segments.slice(0, segments.indexOf(seg) + 1).join('/')}` : undefined
          };
        });
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
          
          <Link href="/profile">
            <Avatar className="h-8 w-8 cursor-pointer border hover:opacity-80 transition-opacity">
              <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.name || "@user"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </Link>
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
