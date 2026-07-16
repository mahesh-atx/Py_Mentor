"use client"

import * as React from "react"
import {
  BookOpen,
  Calculator,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Settings,
  Smile,
  Terminal,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function CommandPalette({ open, setOpen, roadmaps = [] }: { open: boolean, setOpen: (open: boolean) => void, roadmaps?: any[] }) {
  const router = useRouter()

  const topics = React.useMemo(() => {
    const all: { title: string; href: string; parent: string }[] = [];
    roadmaps.forEach(r => {
      r.modules?.forEach((m: any) => {
        m.topics?.forEach((t: any) => {
          all.push({
            title: t.title.replace(/^(?:Module|Topic|Phase)?\s*[\d\.]+\s*[\.\-\:]?\s*/i, ''),
            href: `/learn/${t.slug}`,
            parent: m.title.replace(/^(?:Module|Topic|Phase)?\s*[\d\.]+\s*[\.\-\:]?\s*/i, '')
          });
        });
      });
    });
    return all;
  }, [roadmaps]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search topics..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="Dashboard" onSelect={() => runCommand(() => router.push("/"))}>
            <LayoutDashboard />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem value="Learn" onSelect={() => runCommand(() => router.push("/learn"))}>
            <BookOpen />
            <span>Learn</span>
          </CommandItem>
        </CommandGroup>
        
        {topics.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Topics">
              {topics.map(topic => (
                <CommandItem key={topic.href} value={`${topic.title} ${topic.parent}`} onSelect={() => runCommand(() => router.push(topic.href))}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{topic.title}</span>
                    <span className="text-xs text-muted-foreground">{topic.parent}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="Profile" onSelect={() => runCommand(() => router.push("/profile"))}>
            <User />
            <span>Profile</span>
          </CommandItem>
          <CommandItem value="Settings" onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
