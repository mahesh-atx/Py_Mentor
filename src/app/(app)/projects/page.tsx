import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, HelpCircle, Receipt } from "lucide-react";
import Link from "next/link";

import { CurriculumService } from "@/lib/services/curriculum.service";

export default async function ProjectsPage() {
  const dbProjects = await CurriculumService.getAllProjects();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Real-World Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          Put your Python knowledge to the test. These guided projects simulate real-world applications and will solidify your understanding of core concepts while helping you build a portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dbProjects.map((project) => {
          let parsedSkills: string[] = [];
          try {
            if (project.skills) parsedSkills = JSON.parse(project.skills);
          } catch(e) {}

          // Determine icon dynamically or use a fallback
          let ProjectIcon = HelpCircle;
          let color = "text-blue-500";
          let bg = "bg-blue-500/10";
          
          if (project.slug.includes("calculator")) { ProjectIcon = Calculator; color = "text-blue-500"; bg = "bg-blue-500/10"; }
          else if (project.slug.includes("game")) { ProjectIcon = CreditCard; color = "text-emerald-500"; bg = "bg-emerald-500/10"; }
          else if (project.slug.includes("quiz")) { ProjectIcon = HelpCircle; color = "text-purple-500"; bg = "bg-purple-500/10"; }
          else if (project.slug.includes("expense")) { ProjectIcon = Receipt; color = "text-destructive"; bg = "bg-destructive/10"; }

          return (
            <Card key={project.slug} className="bg-background shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${bg}`}>
                    <ProjectIcon className={`h-6 w-6 ${color}`} />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-background">
                      {project.estimatedTime || "2 Hours"}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={
                        project.difficulty.toLowerCase() === 'easy' ? 'bg-success/10 text-success hover:bg-success/20' : 
                        project.difficulty.toLowerCase() === 'medium' ? 'bg-warning/10 text-warning hover:bg-warning/20' : 
                        'bg-destructive/10 text-destructive hover:bg-destructive/20'
                      }
                    >
                      {project.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-[15px] leading-relaxed pt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mt-2">
                  {parsedSkills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 pt-4">
                <Link href={`/projects/${project.slug}`} className="w-full">
                  <Button className="w-full group">Start Project</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
