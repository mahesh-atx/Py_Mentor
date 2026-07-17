"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronLeft, Bot, GitBranch, Clock, Calculator, Loader2, Gamepad2, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitProjectAction } from "@/app/actions";

interface Milestone {
  title: string;
  description: string;
}

interface ProjectClientProps {
  project: any;
}

const IconMap: Record<string, any> = {
  Calculator: Calculator,
  Gamepad2: Gamepad2,
  Trophy: Trophy,
  Bot: Bot
};

export default function ProjectClient({ project }: ProjectClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [repoLink, setRepoLink] = useState("");

  const requirements = project.requirements ? JSON.parse(project.requirements) : [];
  const milestones = project.milestones ? JSON.parse(project.milestones) : [];
  const hints = project.hints ? JSON.parse(project.hints) : [];
  
  const ProjectIcon = IconMap[project.icon] || Trophy;

  const handleSubmit = async () => {
    if (!repoLink.includes("github.com")) {
      toast.error("Please enter a valid GitHub repository link.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate AI Code Review delay
    setTimeout(async () => {
      try {
        const result = await submitProjectAction(project.id, repoLink);
        setIsSubmitting(false);
        setIsReviewed(true);
        
        if (result.success) {
          toast.success("AI Code Review passed! Project completed.");
          if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
            result.unlockedAchievements.forEach((ach: any) => {
              toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
                duration: 5000,
              });
            });
          }
        } else {
          toast.error("Failed to save project progress.");
        }
      } catch (e) {
        setIsSubmitting(false);
        toast.error("An error occurred during submission.");
      }
    }, 2500);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col -mx-6 -mb-6 -mt-6">
      
      {/* Header */}
      <div className="h-16 border-b bg-background flex items-center px-4 lg:px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <ProjectIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">{project.title}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {project.estimatedTime}</span>
              &bull;
              <span className="text-success font-medium capitalize">{project.difficulty}</span>
              &bull;
              <span className="text-yellow-500 font-medium">+{project.xpReward} XP</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="ai-guidance" className="gap-2"><Bot className="h-4 w-4" /> AI Guidance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    
                    <div>
                      <h3 className="font-semibold text-sm mb-4 text-foreground/80">Key Requirements</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {requirements.map((req: string, i: number) => (
                          <li key={i} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> {req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm mb-4 text-foreground/80">Milestones</h3>
                      <div className="space-y-4">
                        {milestones.map((m: Milestone, i: number) => (
                          <div key={i} className="flex gap-4 p-4 rounded-lg bg-background border">
                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">{i+1}</div>
                            <div>
                              <h4 className="font-medium text-sm text-foreground">{m.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai-guidance" className="space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2"><Bot className="h-5 w-5" /> Mentor Hints</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-relaxed">
                    {hints.map((hint: string, i: number) => (
                      <div key={i} className="p-3 bg-background rounded-lg border shadow-sm">
                        <span className="text-primary font-semibold mr-2">Hint {i+1}:</span> {hint}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column (Submission) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Project</CardTitle>
                <CardDescription>Submit your GitHub repository link for an automated AI Code Review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Repository Link</label>
                  <div className="relative">
                    <GitBranch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="https://github.com/username/project" 
                      className="pl-9"
                      value={repoLink}
                      onChange={(e) => setRepoLink(e.target.value)}
                      disabled={isSubmitting || isReviewed}
                    />
                  </div>
                </div>
                
                {!isReviewed ? (
                  <Button 
                    className="w-full gap-2" 
                    onClick={handleSubmit}
                    disabled={!repoLink || isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                    {isSubmitting ? "Reviewing Code..." : "Request AI Review"}
                  </Button>
                ) : (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-success font-semibold">
                      <CheckCircle2 className="h-5 w-5" /> Review Passed!
                    </div>
                    <p className="text-xs text-success/80">Excellent work! Your code is clean and passes all requirements.</p>
                    <Button variant="outline" className="w-full mt-2 border-success/30 hover:bg-success/20 text-success" onClick={() => router.push('/')}>
                      Return to Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
