"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, ChevronLeft, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useRouter } from "next/navigation";
import { usePyodide } from "@/lib/hooks/usePyodide";

const DEFAULT_CODE = `# Python Playground
# This is a freeform environment. Write any Python code here!

def greet(name):
    print(f"Hello, {name}! Welcome to the Playground.")

greet("Developer")
`;

export default function PlaygroundPage() {
  const router = useRouter();
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { isPyodideLoading, runPython } = usePyodide();

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Executing...\n");
    
    try {
      const result = await runPython(code);
      
      if (result.error) {
        setOutput((prev) => prev + result.output + "\nError: " + result.error);
      } else if (result.output) {
        setOutput(result.output);
      } else {
        setOutput("Execution finished without output.");
      }
    } catch (error) {
      setOutput(`Internal Error: Failed to execute code.\n${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col -mx-6 -mb-6 -mt-6">
      
      {/* Top Navbar */}
      <div className="h-14 border-b bg-background flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="font-semibold">Playground</div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="gap-2" onClick={runCode} disabled={isRunning || isPyodideLoading}>
            {isPyodideLoading ? (
               <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : isRunning ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isPyodideLoading ? "Loading Engine..." : isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        {/* @ts-expect-error - shadcn type issue */}
        <ResizablePanelGroup direction="horizontal">
          
          {/* Editor */}
          <ResizablePanel defaultSize={70} minSize={30} className="bg-[#1E1E1E] relative">
            <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4">
              <span className="text-xs font-mono text-[#9CDCFE]">script.py</span>
            </div>
            <div className="absolute inset-0 top-10">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || "")}
                options={{
                  minimap: { enabled: true },
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

          <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

          {/* Console */}
          <ResizablePanel defaultSize={30} minSize={20} className="bg-[#1E1E1E] flex flex-col">
            <div className="h-10 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2">
              <TerminalIcon className="h-4 w-4 text-[#858585]" />
              <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Terminal</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
              {output ? (
                <span>{output}</span>
              ) : (
                <span className="text-[#858585] italic">Ready. Click "Run Code" to execute script.</span>
              )}
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
