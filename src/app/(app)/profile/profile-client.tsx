"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Trophy, Flame, Target } from "lucide-react";
import { motion } from "framer-motion";

export function ProfileClient({ user, stats }: { user: any; stats: any }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-3 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="h-24 w-24 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name || "Python Learner"}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-4 inline-flex items-center gap-2 bg-background px-3 py-1 rounded-full border shadow-sm">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Level {stats.level} Coder</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalXp}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak} Days</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedLessons}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
