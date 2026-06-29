"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, CheckCircle2, ChevronLeft, Lightbulb, Terminal as TerminalIcon, Send, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DEFAULT_CODE = `# Variables Challenge
# 1. Create a variable called 'hero' and assign it the string "Batman"
# 2. Create a variable called 'power_level' and assign it the integer 9000

hero = "Batman"
power_level = 9000

print(f"Hero: {hero}, Power Level: {power_level}")
`;

export default function PracticePage() {
  const router = useRouter();
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showHint, setShowHint] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Executing...\n");
    
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ content: code }]
        }),
      });
      
      const data = await response.json();
      
      if (data.run && data.run.output) {
        setOutput(data.run.output);
      } else if (data.message) {
        setOutput(`API Error: ${data.message}`);
      } else {
        setOutput("Execution finished without output.");
      }
    } catch (error) {
      setOutput(`Network Error: Failed to execute code.\n${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (code.includes('hero =') && code.includes('power_level =') && code.includes('print')) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsSubmitting(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col -mx-6 -mb-6 -mt-6">
      
      {/* Top Navbar for Practice */}
      <div className="h-14 border-b bg-background flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="font-semibold">Practice: Variables</div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 hidden sm:inline-flex">Easy</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-muted-foreground hidden sm:inline-flex" onClick={() => setShowHint(true)}>
            <Lightbulb className="h-4 w-4" /> Hint
          </Button>
          <Button variant="secondary" className="gap-2" onClick={runCode} disabled={isRunning || isSubmitting}>
            {isRunning ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Run Code
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground" onClick={submitCode} disabled={isRunning || isSubmitting}>
            {isSubmitting ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Submit
          </Button>
        </div>
      </div>

      {/* Desktop Split Interface (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* @ts-expect-error - shadcn type issue with direction prop */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          
          {/* Left Panel: Instructions */}
          <ResizablePanel defaultSize={35} minSize={25} className="bg-background">
            <Tabs defaultValue="problem" className="h-full flex flex-col">
              <div className="px-6 border-b">
                <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-6 rounded-none">
                  <TabsTrigger value="problem" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Problem</TabsTrigger>
                  <TabsTrigger value="submissions" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-muted-foreground font-medium">Submissions</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="problem" className="flex-1 overflow-y-auto p-6 m-0 outline-none">
                <article className="prose prose-neutral dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold tracking-tight mt-0 mb-4">Variables Challenge</h2>
                  <p className="text-muted-foreground">
                    In this challenge, you will put your knowledge of variables to the test. Ensure you use the exact names specified.
                  </p>
                  
                  <h3 className="font-semibold text-lg mt-8 mb-2">Task</h3>
                  <ol className="space-y-2">
                    <li>Create a variable named <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">hero</code> and assign it the string value <code>"Batman"</code>.</li>
                    <li>Create a variable named <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">power_level</code> and assign it the integer value <code>9000</code>.</li>
                  </ol>

                  <div className="bg-accent/50 p-4 rounded-xl border mt-8">
                    <h4 className="font-semibold text-sm mt-0 mb-3 flex items-center gap-2">
                      <TerminalIcon className="h-4 w-4" /> Expected Output
                    </h4>
                    <pre className="bg-[#1E1E1E] text-[#D4D4D4] p-4 rounded-lg mt-0 mb-0 font-mono text-sm overflow-x-auto shadow-inner">
                      Hero: Batman, Power Level: 9000
                    </pre>
                  </div>
                </article>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

          {/* Right Panel: Editor & Output */}
          <ResizablePanel defaultSize={65}>
            {/* @ts-expect-error - shadcn type issue with direction prop */}
            <ResizablePanelGroup direction="vertical">
              
              {/* Editor */}
              <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
                <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4">
                  <span className="text-xs font-mono text-[#9CDCFE]">main.py</span>
                </div>
                <div className="absolute inset-0 top-10">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                      smoothScrolling: true,
                      cursorBlinking: "smooth",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle className="h-1.5 bg-[#404040] hover:bg-primary/50 transition-colors" />
              
              {/* Output Console */}
              <ResizablePanel defaultSize={30} minSize={15} className="bg-[#1E1E1E] flex flex-col">
                <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2">
                  <TerminalIcon className="h-4 w-4 text-[#858585]" />
                  <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Console</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
                  {output ? (
                    <span>{output}</span>
                  ) : (
                    <span className="text-[#858585] italic">Click "Run Code" to test, or "Submit" to validate against hidden test cases.</span>
                  )}
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile Stacked Layout (Visible only on mobile/tablet) */}
      <div className="lg:hidden flex flex-col flex-1 overflow-hidden">
        <Tabs defaultValue="editor" className="h-full flex flex-col">
          <div className="px-4 border-b shrink-0 bg-background">
            <TabsList className="bg-transparent border-none p-0 h-12 w-full justify-start gap-6 rounded-none">
              <TabsTrigger value="problem" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Problem</TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full font-medium">Editor</TabsTrigger>
              <TabsTrigger value="console" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-muted-foreground font-medium">Console</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="problem" className="flex-1 overflow-y-auto p-4 m-0 outline-none bg-background">
             <article className="prose prose-sm dark:prose-invert">
                <h2 className="text-xl font-bold tracking-tight mt-0 mb-4">Variables Challenge</h2>
                <p className="text-muted-foreground">In this challenge, you will put your knowledge of variables to the test.</p>
                <h3 className="font-semibold text-base mt-6 mb-2">Task</h3>
                <ol className="space-y-2">
                  <li>Create <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">hero</code> = <code>"Batman"</code></li>
                  <li>Create <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">power_level</code> = <code>9000</code></li>
                </ol>
              </article>
          </TabsContent>
          
          <TabsContent value="editor" className="flex-1 m-0 p-0 outline-none relative bg-[#1E1E1E]">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{ minimap: { enabled: false }, fontSize: 13, padding: { top: 16 } }}
            />
          </TabsContent>

          <TabsContent value="console" className="flex-1 m-0 p-4 outline-none overflow-y-auto bg-[#1E1E1E] font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
            {output ? <span>{output}</span> : <span className="text-[#858585] italic">Run your code to see output...</span>}
          </TabsContent>
        </Tabs>
      </div>

      {/* Hints Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" /> Need a Hint?
            </DialogTitle>
            <DialogDescription>
              Remember that strings need to be wrapped in quotes, but integers do not.
              For example: <code>name = "John"</code> and <code>age = 30</code>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowHint(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {isSuccess ? (
                <><CheckCircle2 className="h-8 w-8 text-success" /> Success!</>
              ) : (
                <><XCircle className="h-8 w-8 text-destructive" /> Tests Failed</>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isSuccess 
                ? "You passed all 3 hidden test cases. You've earned 50 XP!" 
                : "Your code failed on Test Case #2. Check your variable names and types carefully."}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-accent/50 p-4 rounded-xl border space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Test Case 1 (Basic Print)</span>
              <span className="text-success font-medium">Pass</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                {isSuccess ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />} 
                Test Case 2 (Variable Types)
              </span>
              <span className={isSuccess ? "text-success font-medium" : "text-destructive font-medium"}>
                {isSuccess ? "Pass" : "Fail"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                {isSuccess ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-warning" />} 
                Test Case 3 (Edge Cases)
              </span>
              <span className={isSuccess ? "text-success font-medium" : "text-warning font-medium"}>
                {isSuccess ? "Pass" : "Skipped"}
              </span>
            </div>
          </div>
          <DialogFooter className="mt-4">
            {isSuccess ? (
              <Button className="w-full" onClick={() => { setShowResults(false); router.push('/'); }}>
                Return to Dashboard
              </Button>
            ) : (
              <Button className="w-full" variant="outline" onClick={() => setShowResults(false)}>
                Keep Trying
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
