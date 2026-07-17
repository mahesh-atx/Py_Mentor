"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, PlayCircle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface RoadmapData {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  modules: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface RoadmapClientProps {
  roadmaps: RoadmapData[];
}
import { usePlatform } from "@/components/platform-provider";

export function RoadmapClient({ roadmaps }: RoadmapClientProps) {
  const config = usePlatform();
  return (
    <div className="max-w-4xl mx-auto pb-16 pt-4">
      
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Official Curriculum</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">{config.languageCapitalized} Developer Roadmap</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Master {config.languageCapitalized} from scratch. Complete phases sequentially to unlock advanced concepts and earn your certification.
        </p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-muted">
        
        {roadmaps.map((roadmap, index) => {
          const isLocked = roadmap.status === "locked";
          const isCompleted = roadmap.status === "completed";
          
          return (
            <div key={roadmap.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Node Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                {isCompleted ? (
                  <div className="w-full h-full rounded-full bg-success flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-success-foreground" />
                  </div>
                ) : isLocked ? (
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4"
              >
                <div className={`group relative overflow-hidden flex flex-col p-6 rounded-2xl border bg-card/30 transition-all duration-300 ${isLocked ? 'opacity-75 grayscale-[0.5] border-border/50' : 'hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 border-border/50 hover:bg-card'} h-full`}>
                  {isLocked && <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10" />}
                  
                  {!isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{roadmap.title}</div>
                      <h3 className={`text-2xl font-bold ${!isLocked && 'group-hover:text-primary transition-colors'}`}>{roadmap.title}</h3>
                    </div>
                    {isLocked && <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-muted border"><Lock className="h-5 w-5 text-muted-foreground" /></div>}
                    {!isLocked && roadmap.status === 'completed' && (
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-success/10 border border-success/20 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 relative z-10">
                    {roadmap.description}
                  </p>

                  <div className="space-y-3 relative z-10 flex-1">
                    {roadmap.modules.map((mod, mIndex) => (
                      <div key={mIndex} className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${!isLocked ? 'bg-accent/30 border-border/50 group-hover:border-primary/20 hover:bg-accent/50' : 'bg-accent/50 border-transparent'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${!isLocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {mod.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 mt-6 pt-2">
                    {!isLocked && (
                      <Button className="w-full gap-2 group/btn h-12 rounded-xl text-md font-semibold" variant={roadmap.status === 'completed' ? "secondary" : "default"}>
                        {roadmap.status === 'completed' ? 'Review Phase' : 'Continue Phase'}
                        <PlayCircle className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
        
      </div>
    </div>
  );
}
