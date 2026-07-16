"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Award, Flame, Zap, CheckCircle2, Target, Trophy, Clock, Repeat, Rocket, Bug, Lock } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Zap, Flame, CheckCircle2, Award, Trophy, Target, Clock, Repeat, Rocket, Bug
};

interface ProgressClientProps {
  stats: {
    totalXp: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    level: number;
    currentStreak: number;
    xpInCurrentLevel: number;
    xpForNextLevel: number;
    codingTime: string;
    activityData: { day: string; hours: number }[];
  };
  topicMastery: { subject: string; mastery: number }[];
  achievements: any[];
}



export function ProgressClient({ stats, topicMastery, achievements }: ProgressClientProps) {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your learning journey and view your earned achievements.</p>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 p-2 pr-6 rounded-full border shadow-sm">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary shrink-0">
            <span className="font-bold text-primary">Lv. {stats.level}</span>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-xs font-semibold mb-1 w-full gap-4">
              <span>XP: {stats.totalXp}</span>
              <span className="text-muted-foreground">/ {stats.level * 500}</span>
            </div>
            <Progress value={(stats.xpInCurrentLevel / stats.xpForNextLevel) * 100} className="h-2 w-32 md:w-48" />
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-success/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex flex-row items-start justify-between pb-2 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground pr-2">Completed Lessons</h3>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-success/10 border border-success/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-3xl font-bold group-hover:text-success transition-colors">{stats.lessonsCompleted}</div>
          </div>
        </div>
        
        <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-info/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex flex-row items-start justify-between pb-2 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground pr-2">Completed Exercises</h3>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-info/10 border border-info/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <CodeIcon className="h-5 w-5 text-info" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-3xl font-bold group-hover:text-info transition-colors">{stats.exercisesCompleted}</div>
          </div>
        </div>
        
        <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex flex-row items-start justify-between pb-2 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground pr-2">Coding Time</h3>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-3xl font-bold group-hover:text-primary transition-colors">{stats.codingTime}</div>
          </div>
        </div>
        
        <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-destructive/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <Flame className="h-24 w-24 text-destructive" />
          </div>
          <div className="flex flex-row items-start justify-between pb-2 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground pr-2">Current Streak</h3>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-destructive/10 border border-destructive/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <Flame className="h-5 w-5 text-destructive" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-3xl font-bold group-hover:text-destructive transition-colors">{stats.currentStreak} Days</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="group relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-6 relative z-10">
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Coding Activity (This Week)</h3>
            <p className="text-sm text-muted-foreground">Hours spent coding per day.</p>
          </div>
          <div className="relative z-10">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.activityData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888888" }} />
                  <YAxis hide />
                  <RechartsTooltip 
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #333", borderRadius: "8px" }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl h-full">
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="mb-6 relative z-10">
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Topic Mastery</h3>
            <p className="text-sm text-muted-foreground">Identify your strong and weak areas.</p>
          </div>
          <div className="relative z-10">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={topicMastery}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#888888", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Mastery" dataKey="mastery" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid #333", borderRadius: "8px" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
          <div className="p-2 bg-warning/10 rounded-xl border border-warning/20">
            <Award className="h-6 w-6 text-warning" />
          </div>
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((acc, i) => {
            const IconComponent = iconMap[acc.icon] || Award;
            
            return (
              <motion.div 
                key={acc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <div className={`group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 h-full ${
                  acc.isUnlocked 
                    ? 'border border-border/50 bg-card/30 hover:bg-card hover:-translate-y-1 hover:shadow-lg hover:border-primary/40' 
                    : 'border border-dashed border-border/50 bg-muted/10 opacity-60 grayscale-[0.5]'
                }`}>
                  {acc.isUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  )}
                  
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 border ${
                    acc.isUnlocked 
                      ? 'bg-primary/10 border-primary/20 group-hover:scale-110 transition-transform duration-300 shadow-inner' 
                      : 'bg-muted border-transparent'
                  }`}>
                    <IconComponent className={`h-7 w-7 ${acc.isUnlocked ? acc.color : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h4 className={`font-bold text-sm ${acc.isUnlocked && 'group-hover:text-primary transition-colors'}`}>{acc.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{acc.description}</p>
                  </div>
                  
                  {!acc.isUnlocked && (
                    <div className="absolute top-3 right-3">
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function CodeIcon(props: any) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
