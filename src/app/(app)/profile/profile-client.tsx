"use client";

import { User, Trophy, Flame, Target } from "lucide-react";
import { motion } from "framer-motion";

export function ProfileClient({ user, stats }: { user: any; stats: any }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-3 relative overflow-hidden flex flex-col p-8 rounded-3xl border border-primary/20 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/images/illustrations/notion-3.jpg" alt="Profile Background" className="w-full h-full object-cover object-right mix-blend-plus-lighter" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0 pointer-events-none" />

          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-3xl z-10" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="h-24 w-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">{user.name || "Python Learner"}</h2>
              <div className="mt-4 inline-flex items-center gap-2 bg-background/50 px-4 py-1.5 rounded-full border border-border/50 shadow-sm backdrop-blur-sm">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Level {stats.level} Coder</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-success/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Total XP</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-success/10 border border-success/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Trophy className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold group-hover:text-success transition-colors">{stats.totalXp}</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-warning/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-warning/10 border border-warning/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Flame className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold text-warning">{stats.currentStreak} Days</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-row items-center justify-between pb-2 relative z-10">
              <h3 className="text-sm font-medium text-muted-foreground">Lessons Completed</h3>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="relative z-10 mt-2">
              <div className="text-3xl font-bold group-hover:text-primary transition-colors">{stats.completedLessons}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
