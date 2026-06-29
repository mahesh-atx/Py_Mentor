"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, PlayCircle, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface RoadmapTopicData {
  id: string;
  title: string;
  type: string; // 'lesson' | 'practice'
  status: "completed" | "in-progress" | "locked";
  slug: string;
}

export interface RoadmapModuleData {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  topics: RoadmapTopicData[];
}

export interface RoadmapClientProps {
  modules: RoadmapModuleData[];
}

export function RoadmapClient({ modules }: RoadmapClientProps) {
  return (
    <div className="max-w-4xl mx-auto pb-16 pt-4">
      
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Official Curriculum</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Python Developer Roadmap</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Master Python from scratch. Complete modules sequentially to unlock advanced concepts and earn your certification.
        </p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-muted">
        
        {modules.map((module, index) => {
          const isLocked = module.status === "locked";
          const isCompleted = module.status === "completed";
          
          return (
            <div key={module.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
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
                <Card className={`relative overflow-hidden transition-all duration-300 ${isLocked ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-md hover:border-primary/50'}`}>
                  {isLocked && <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10" />}
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Module {index + 1}</div>
                        <h3 className="text-xl font-bold">{module.title}</h3>
                      </div>
                      {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                      {module.description}
                    </p>

                    <div className="space-y-3">
                      {module.topics.map((topic, tIndex) => (
                        <div key={tIndex} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-transparent">
                          <div className="flex items-center gap-3">
                            {topic.type === 'lesson' ? (
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={`text-sm font-medium ${topic.status === 'locked' ? 'text-muted-foreground' : ''}`}>
                              {topic.title}
                            </span>
                          </div>
                          {topic.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-success" />}
                          {topic.status === 'in-progress' && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Up Next</Badge>}
                        </div>
                      ))}
                    </div>

                    {!isLocked && (
                      <Button className="w-full mt-6 gap-2 group/btn" variant={module.status === 'completed' ? "outline" : "default"}>
                        {module.status === 'completed' ? 'Review Module' : 'Continue Module'}
                        <PlayCircle className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )
        })}
        
      </div>
    </div>
  );
}
