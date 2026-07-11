"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Award, Flame, Zap, CheckCircle2, Target, Trophy, Clock, Repeat, Rocket, Bug } from "lucide-react";
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
        <Card className="bg-background shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Completed Lessons</span>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div className="text-3xl font-bold">{stats.lessonsCompleted}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-background shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Completed Exercises</span>
              <CodeIcon className="h-4 w-4 text-info" />
            </div>
            <div className="text-3xl font-bold">{stats.exercisesCompleted}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-background shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Coding Time</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.codingTime}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-background shadow-sm">
          <CardContent className="p-6 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Flame className="h-24 w-24 text-destructive" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
              <Flame className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-3xl font-bold">{stats.currentStreak} Days</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card className="bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Coding Activity (This Week)</CardTitle>
            <CardDescription>Hours spent coding per day.</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="bg-background shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Topic Mastery</CardTitle>
            <CardDescription>Identify your strong and weak areas.</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-warning" /> Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((acc, i) => {
            const IconComponent = iconMap[acc.icon] || Award;
            // E.g. "text-yellow-500" -> we need bg equivalent or we can just use dynamic styling
            // Wait, we can extract the base color, but for simplicity we'll just use inline styles or fixed class
            
            return (
              <motion.div 
                key={acc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`relative overflow-hidden transition-all h-full ${acc.isUnlocked ? 'border-border shadow-sm' : 'border-dashed border-border/50 bg-muted/20 opacity-60'}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${acc.isUnlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                      <IconComponent className={`h-6 w-6 ${acc.isUnlocked ? acc.color : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{acc.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{acc.description}</p>
                    </div>
                    {!acc.isUnlocked && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider scale-75">Locked</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
