import { db } from "@/lib/db/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { ModulePracticeClient } from "@/app/(app)/practice/module/[slug]/module-practice-client";
import { Dumbbell, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ModulePracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const moduleData = await db.module.findUnique({
    where: { slug },
    include: {
      topics: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          exercises: {
            where: { isPublished: true },
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  if (!moduleData) {
    notFound();
  }

  const session = await auth();
  let completedExerciseSlugs: string[] = [];

  if (session?.user?.id) {
    const userSubmissions = await db.submission.findMany({
      where: {
        userId: session.user.id,
        status: "passed",
        exerciseId: { not: null }
      },
      select: { exerciseId: true }
    });
    completedExerciseSlugs = Array.from(new Set(userSubmissions.map(s => s.exerciseId as string)));
  }

  // Flatten exercises
  const allExercises = moduleData.topics.flatMap(topic => 
    topic.exercises.map(ex => ({
      ...ex,
      topicName: topic.title,
    }))
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">


      <header className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-1 rounded-md">
            Module Practice
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          {moduleData.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {moduleData.description}
        </p>
      </header>

      <ModulePracticeClient 
        exercises={allExercises} 
        completedExerciseSlugs={completedExerciseSlugs} 
      />
    </div>
  );
}
