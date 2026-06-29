import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, HelpCircle, Receipt } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "calculator",
    title: "Terminal Calculator",
    description: "Build a fully functional command-line calculator that handles basic arithmetic, continuous operations, and error handling for division by zero.",
    icon: Calculator,
    difficulty: "Easy",
    time: "2 Hours",
    skills: ["Variables", "Functions", "Conditionals", "Input"],
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "atm",
    title: "ATM System Simulator",
    description: "Create an interactive ATM interface. Implement PIN authentication, balance checking, deposits, and withdrawal constraints using object-oriented principles.",
    icon: CreditCard,
    difficulty: "Medium",
    time: "4 Hours",
    skills: ["Classes", "Loops", "Exception Handling"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    id: "quiz",
    title: "Interactive Quiz App",
    description: "Develop a multiple-choice quiz engine that loads questions from a dictionary, tracks the user's score, and provides a final grade breakdown.",
    icon: HelpCircle,
    difficulty: "Medium",
    time: "3 Hours",
    skills: ["Dictionaries", "Lists", "Loops"],
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "expense",
    title: "Expense Tracker",
    description: "Build an application that allows users to log daily expenses, categorize them, and generate a simple terminal-based report of their spending habits.",
    icon: Receipt,
    difficulty: "Hard",
    time: "6 Hours",
    skills: ["File I/O", "Data Structures", "Functions"],
    color: "text-destructive",
    bg: "bg-destructive/10"
  }
];

export default function ProjectsPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Real-World Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          Put your Python knowledge to the test. These guided projects simulate real-world applications and will solidify your understanding of core concepts while helping you build a portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-background shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${project.bg}`}>
                  <project.icon className={`h-6 w-6 ${project.color}`} />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-background">
                    {project.time}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={
                      project.difficulty === 'Easy' ? 'bg-success/10 text-success hover:bg-success/20' : 
                      project.difficulty === 'Medium' ? 'bg-warning/10 text-warning hover:bg-warning/20' : 
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
                {project.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs text-muted-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 pt-4">
              <Link href={`/projects/${project.id}`} className="w-full">
                <Button className="w-full">Start Project</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
