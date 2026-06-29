"use client";

import { motion } from "framer-motion";
import { Play, Flame, Target, Trophy, Clock, Code, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Module, Topic } from "@prisma/client";

// A Topic with its parent Module
export type TopicWithModule = Topic & { module: Module };

interface DashboardClientProps {
  continueTopic: TopicWithModule | null;
  recommendedTopics: TopicWithModule[];
}

export function DashboardClient({ continueTopic, recommendedTopics }: DashboardClientProps) {
  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! You're making great progress.
          </p>
        </div>
      </div>

      {/* Hero Banner: Continue Learning */}
      {continueTopic ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
        >
          <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background">Module {continueTopic.module.order}</Badge>
                  <span className="text-sm font-medium text-muted-foreground">{continueTopic.module.title}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{continueTopic.title}</h2>
                  <p className="text-muted-foreground mt-1 max-w-xl">
                    {continueTopic.description || "Continue your learning journey."}
                  </p>
                </div>
                <div className="w-full max-w-md space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
              <Link 
                href={`/learn/${continueTopic.slug}`}
                className={buttonVariants({ size: "lg", className: "w-full md:w-auto gap-2 group shrink-0" })}
              >
                <Play className="h-4 w-4 fill-current group-hover:translate-x-1 transition-transform" />
                Continue Lesson
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden relative p-8">
          <p className="text-muted-foreground">You have completed all available topics!</p>
        </Card>
      )}

      {/* Stats Row - MOCKED for single player */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 / 3</div>
              <p className="text-xs text-muted-foreground mt-1">Lessons completed today</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">0 Days</div>
              <p className="text-xs text-muted-foreground mt-1">Start learning to build your streak!</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Earn XP by completing challenges</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Lessons - MOCKED */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <Card className="flex items-center justify-between p-4 bg-muted/50 text-muted-foreground">
                No recent activity yet.
              </Card>
            </div>
          </section>

          {/* Recommended Lessons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedTopics.map(topic => (
                <Link href={`/learn/${topic.slug}`} key={topic.id}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-info text-info-foreground">Beginner</Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" /> 15m
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
              {recommendedTopics.length === 0 && (
                <p className="text-muted-foreground text-sm">No recommendations right now.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <Card>
              <CardContent className="p-0 flex flex-col">
                <Link 
                  href="/practice"
                  className={buttonVariants({ variant: "ghost", className: "justify-start h-14 px-6 rounded-none border-b hover:bg-accent/50 text-left" })}
                >
                  <Zap className="h-5 w-5 mr-3 text-warning" />
                  <div className="flex flex-col items-start">
                    <span>Daily Challenge</span>
                    <span className="text-xs text-muted-foreground font-normal">Earn double XP today</span>
                  </div>
                </Link>
                <Link 
                  href="/practice"
                  className={buttonVariants({ variant: "ghost", className: "justify-start h-14 px-6 rounded-none border-b hover:bg-accent/50 text-left" })}
                >
                  <Code className="h-5 w-5 mr-3 text-primary" />
                  <div className="flex flex-col items-start">
                    <span>Practice Arena</span>
                    <span className="text-xs text-muted-foreground font-normal">Solve algorithmic problems</span>
                  </div>
                </Link>
                <Link 
                  href="/ai-mentor"
                  className={buttonVariants({ variant: "ghost", className: "justify-start h-14 px-6 rounded-none hover:bg-accent/50 text-left" })}
                >
                  <Bot className="h-5 w-5 mr-3 text-info" />
                  <div className="flex flex-col items-start">
                    <span>Ask AI Mentor</span>
                    <span className="text-xs text-muted-foreground font-normal">Stuck? Get a hint</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>

      </div>
    </div>
  );
}

function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
