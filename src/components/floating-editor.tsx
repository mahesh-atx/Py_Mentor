"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, Terminal as TerminalIcon, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { usePyodide } from "@/lib/hooks/usePyodide";

const DEFAULT_CODE = `# Quick Practice Editor
# Write your Python code here and run it instantly.

def hello_world():
    print("Ready to code!")

hello_world()
`;

export function FloatingEditor() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Floating Action Button (Bottom Right, Stacked) */}
      <div className="fixed bottom-[5.5rem] right-6 z-[90] flex flex-col items-end">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`group h-12 rounded-full px-3.5 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:shadow-primary/25 flex items-center overflow-hidden ${
            isOpen ? 'translate-y-20 opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100 delay-100'
          }`}
        >
          <Code2 className="h-5 w-5 shrink-0" />
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-semibold text-sm">
            Practice Code
          </span>
        </Button>
      </div>

      {/* Editor Overlay and Modal */}
      <div 
        className={`fixed inset-0 z-[110] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/60 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Editor Window */}
        <div 
          className={`relative w-[95vw] sm:w-[90vw] md:w-[80vw] h-[85vh] max-h-[900px] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
        >
          {/* Header */}
          <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold">Code Editor</div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="default" size="sm" className="gap-2" onClick={runCode} disabled={isRunning || isPyodideLoading}>
                {isPyodideLoading ? (
                   <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : isRunning ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-current" />
                )}
                {isPyodideLoading ? "Loading..." : isRunning ? "Running..." : "Run"}
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 overflow-hidden bg-background">
            {/* @ts-expect-error - shadcn type issue */}
            <ResizablePanelGroup direction="horizontal">
              
              {/* Code Editor Panel */}
              <ResizablePanel defaultSize={65} minSize={30} className="bg-[#1E1E1E] relative">
                <div className="h-9 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4">
                  <span className="text-xs font-mono text-[#9CDCFE]">script.py</span>
                </div>
                <div className="absolute inset-0 top-9">
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

              <ResizableHandle withHandle className="w-1.5 bg-border hover:bg-primary/50 transition-colors" />

              {/* Console Panel */}
              <ResizablePanel defaultSize={35} minSize={20} className="bg-[#1E1E1E] flex flex-col">
                <div className="h-9 bg-[#2D2D2D] border-b border-[#404040] flex items-center px-4 gap-2">
                  <TerminalIcon className="h-4 w-4 text-[#858585]" />
                  <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Terminal</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap text-[#CCCCCC]">
                  {output ? (
                    <span>{output}</span>
                  ) : (
                    <span className="text-[#858585] italic">Ready. Click "Run" to execute script.</span>
                  )}
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </div>

        </div>
      </div>
    </>
  );
}
