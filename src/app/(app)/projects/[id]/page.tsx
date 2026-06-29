"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronLeft, Bot, GitBranch, Clock, Calculator, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [repoLink, setRepoLink] = useState("");

  const handleSubmit = () => {
    if (!repoLink.includes("github.com")) {
      toast.error("Please enter a valid GitHub repository link.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate AI Code Review
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReviewed(true);
      toast.success("AI Code Review completed successfully!");
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
            <Calculator className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Terminal Calculator</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 Hours</span>
              &bull;
              <span className="text-success font-medium">Easy</span>
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
                    <CardDescription>Build a fully functional command-line calculator that handles continuous operations and error handling.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h3 className="font-semibold text-sm">Milestones</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> Accept user input for two numbers.</li>
                      <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> Accept user input for an operator (+, -, *, /).</li>
                      <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> Create separate functions for each mathematical operation.</li>
                      <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> Gracefully handle Division by Zero errors using Try/Except blocks.</li>
                      <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-muted-foreground/50 shrink-0" /> Ask the user if they want to perform another calculation before exiting.</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai-guidance" className="space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2"><Bot className="h-5 w-5" /> Mentor Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm leading-relaxed">
                    <p>To tackle this project effectively, I recommend setting up a <code>while True:</code> loop early on. This will allow the calculator to run continuously until the user explicitly decides to quit.</p>
                    <p>For the mathematical operations, you can use a dictionary to map strings to functions like this:</p>
                    <pre className="bg-[#1E1E1E] text-[#D4D4D4] p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      {`operations = {\n  "+": add,\n  "-": subtract,\n  "*": multiply,\n  "/": divide\n}`}
                    </pre>
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
                      placeholder="https://github.com/username/calculator" 
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
                    <p className="text-xs text-success/80">Excellent work handling the ZeroDivisionError. Your code is clean and modular.</p>
                    <Button variant="outline" className="w-full mt-2 border-success/30 hover:bg-success/20 text-success">
                      Claim XP & Badge
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
