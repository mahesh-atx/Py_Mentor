"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, FileText, Bot, Search, ExternalLink, MoreVertical } from "lucide-react";
import type { Note, Bookmark as BookmarkModel } from "@prisma/client";

interface NotesClientProps {
  initialNotes: Note[];
  initialBookmarks: BookmarkModel[];
}

export default function NotesClient({ initialNotes, initialBookmarks }: NotesClientProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Saved Content</h1>
          <p className="text-muted-foreground">Manage your bookmarks, personal notes, and saved AI explanations.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search your notes..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="mb-6 grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="notes" className="gap-2"><FileText className="h-4 w-4 hidden sm:block" /> Notes</TabsTrigger>
          <TabsTrigger value="bookmarks" className="gap-2"><Bookmark className="h-4 w-4 hidden sm:block" /> Bookmarks</TabsTrigger>
          <TabsTrigger value="chats" className="gap-2"><Bot className="h-4 w-4 hidden sm:block" /> AI Chats</TabsTrigger>
        </TabsList>
        
        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          {initialNotes.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
              You haven't saved any notes yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialNotes.filter(n => n.content.toLowerCase().includes(search.toLowerCase())).map(note => (
                <Card key={note.id} className="bg-background shadow-sm group">
                  <CardHeader className="pb-3 flex flex-row items-start justify-between">
                    <Badge variant="secondary" className="font-normal">{note.module || "General"}</Badge>
                    <Button variant="ghost" size="icon-sm" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{note.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground">
                    Added {new Date(note.createdAt).toLocaleDateString()}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4">
          {initialBookmarks.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
              You haven't saved any bookmarks yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {initialBookmarks.filter(bm => bm.title.toLowerCase().includes(search.toLowerCase())).map(bm => (
                <Card key={bm.id} className="bg-background shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{bm.type}</Badge>
                      <Bookmark className="h-4 w-4 text-primary fill-primary" />
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{bm.title}</CardTitle>
                    <CardDescription>{bm.module || "General"}</CardDescription>
                  </CardHeader>
                  <CardFooter className="text-xs text-muted-foreground flex justify-between">
                    <span>{new Date(bm.createdAt).toLocaleDateString()}</span>
                    <ExternalLink className="h-3 w-3" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Chats Tab */}
        <TabsContent value="chats" className="space-y-4">
          <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
            You haven't saved any AI chats yet.
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}
