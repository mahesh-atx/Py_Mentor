"use client";

import { motion } from "framer-motion";
import { Play, Flame, Target, Trophy, Clock, Code, ChevronRight, Zap, FolderDot, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Module, Topic } from "@prisma/client";
import { formatDate } from "@/lib/utils";

// A Topic with its parent Module
export type TopicWithModule = Topic & { module: Module };

interface DashboardClientProps {
  continueTopic: TopicWithModule | null;
  recommendedTopics: TopicWithModule[];
  stats: {
    totalXp: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    level: number;
    currentStreak: number;
    xpInCurrentLevel: number;
    xpForNextLevel: number;
  };
  recentActivity?: {
    id: string;
    type: "lesson" | "exercise" | "project";
    title: string;
    date: Date;
    status: string;
    score?: number;
    targetId: string;
  }[];
}

export function DashboardClient({ continueTopic, recommendedTopics, stats, recentActivity = [] }: DashboardClientProps) {
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
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            {/* Background Illustration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0 mix-blend-luminosity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/illustrations/study-group.jpg" alt="Study Group" className="w-full h-full object-cover object-left" />
            </div>
            
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-3xl z-10" />
            
            <div className="space-y-4 flex-1 relative z-10">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background rounded-full px-3 shadow-sm border-border">Module {continueTopic.module.order}</Badge>
                <span className="text-sm font-medium text-muted-foreground">{continueTopic.module.title}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">{continueTopic.title}</h2>
                <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                  {continueTopic.description || "Continue your learning journey."}
                </p>
              </div>
              <div className="w-full max-w-md space-y-2 mt-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Level {stats.level}</span>
                  <span className="text-primary font-bold">{stats.xpInCurrentLevel} / {stats.xpForNextLevel} XP</span>
                </div>
                <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                   <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${(stats.xpInCurrentLevel / stats.xpForNextLevel) * 100}%` }} 
                   />
                </div>
              </div>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <Link 
                href={`/learn/${continueTopic.slug}`}
                className={buttonVariants({ size: "lg", className: "w-full md:w-auto gap-2 group/btn h-14 px-8 text-md rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" })}
              >
                <Play className="h-5 w-5 fill-current group-hover/btn:translate-x-1 transition-transform" />
                Continue Lesson
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 flex flex-col items-center justify-center text-center gap-4">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src="/images/illustrations/notion-3.jpg" alt="All caught up" className="w-32 h-32 opacity-70 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
          <p className="text-muted-foreground text-lg">You have completed all available topics! Amazing work.</p>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Lessons Completed</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold group-hover:text-primary transition-colors">{stats.lessonsCompleted}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-warning/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Streak</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-warning/10 border border-warning/20 group-hover:scale-110 transition-transform duration-300">
                <Flame className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold text-warning">{stats.currentStreak} Days</div>
              <p className="text-xs text-muted-foreground mt-1">Start learning to build your streak!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-success/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Total XP</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-success/10 border border-success/20 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold group-hover:text-success transition-colors">{stats.totalXp}</div>
              <p className="text-xs text-muted-foreground mt-1">Earn XP by completing challenges</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="flex items-center justify-center p-8 bg-card/30 border border-border/50 rounded-2xl text-muted-foreground">
                  No recent activity yet.
                </div>
              ) : (
                recentActivity.map((activity, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    key={activity.id}
                  >
                    <div className="group relative overflow-hidden flex flex-row items-center justify-between p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer gap-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`h-10 w-10 flex items-center justify-center rounded-lg border group-hover:scale-110 transition-transform duration-300 ${
                          activity.type === 'lesson' ? 'bg-primary/10 border-primary/20 text-primary' : 
                          activity.type === 'exercise' ? 'bg-warning/10 border-warning/20 text-warning' : 
                          'bg-purple-500/10 border-purple-500/20 text-purple-500'
                        }`}>
                          {activity.type === 'lesson' ? <Play className="h-4 w-4" /> : 
                           activity.type === 'exercise' ? <Code className="h-4 w-4" /> : 
                           <FolderDot className="h-4 w-4" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{activity.title}</h3>
                          <p className="text-xs text-muted-foreground capitalize">{activity.type} • {activity.status}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1 relative z-10">
                        {activity.score !== undefined && (
                          <div className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">+{activity.score} XP</div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {formatDate(new Date(activity.date), "short")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Recommended Lessons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link 
                    href={`/learn/${topic.slug}`} 
                    className="group relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                     
                     <div className="flex items-start justify-between relative z-10 mb-6">
                       <Badge className="bg-info/10 text-info hover:bg-info/20 border-0 rounded-full px-3 py-1 font-semibold shadow-none">Beginner</Badge>
                       <div className="h-8 w-8 rounded-full bg-background border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
                         <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </div>
                     </div>
                     
                     <div className="relative z-10 flex-1">
                       <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{topic.title}</h3>
                       <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{topic.description}</p>
                     </div>

                     <div className="relative z-10 mt-auto flex items-center text-sm text-muted-foreground font-medium">
                       <Clock className="h-4 w-4 mr-1.5" /> 15m to complete
                     </div>
                  </Link>
                </motion.div>
              ))}
              {recommendedTopics.length === 0 && (
                <div className="col-span-1 sm:col-span-2 text-center p-8 border border-dashed border-border/60 rounded-2xl bg-muted/20">
                  <p className="text-muted-foreground text-sm">No recommendations right now.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-4">
              <Link 
                href="/practice"
                className="group relative overflow-hidden flex flex-row items-center justify-between p-5 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-warning/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-warning/10 border border-warning/20 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-warning" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg group-hover:text-warning transition-colors">Daily Challenge</span>
                    <span className="text-sm text-muted-foreground font-normal">Earn double XP today</span>
                  </div>
                </div>
                
                <div className="h-8 w-8 rounded-full bg-background border flex items-center justify-center group-hover:bg-warning group-hover:border-warning group-hover:text-warning-foreground transition-all duration-300 relative z-10">
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link 
                href="/practice"
                className="group relative overflow-hidden flex flex-row items-center justify-between p-5 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg group-hover:text-primary transition-colors">Practice Arena</span>
                    <span className="text-sm text-muted-foreground font-normal">Solve algorithmic problems</span>
                  </div>
                </div>
                
                <div className="h-8 w-8 rounded-full bg-background border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300 relative z-10">
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
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
