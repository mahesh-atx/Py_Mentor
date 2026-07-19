"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Square, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PythonTerminalStatus } from "@/lib/hooks/useInteractivePython";
import { cn } from "@/lib/utils";

export function PythonTerminal({
  output,
  status,
  onInput,
  onStop,
  emptyMessage = 'Ready. Click "Run" to execute script.',
  className,
}: {
  output: string;
  status: PythonTerminalStatus;
  onInput: (value: string) => void;
  onStop: () => void;
  emptyMessage?: string;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const waiting = status === "waiting-input";
  const running = status === "running" || waiting;

  useEffect(() => {
    if (waiting) inputRef.current?.focus();
  }, [waiting]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [output, waiting]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!waiting) return;
    onInput(value);
    setValue("");
  };

  return (
    <div className={cn("bg-[#1E1E1E] flex h-full flex-col", className)}>
      <div className="h-10 shrink-0 border-b border-[#404040] bg-[#2D2D2D] flex items-center px-4 gap-2">
        <TerminalIcon className="h-4 w-4 text-[#858585]" />
        <span className="text-xs font-semibold text-[#CCCCCC] tracking-wider uppercase">Terminal</span>
        <span className="ml-auto text-[10px] text-[#858585]" aria-live="polite">
          {waiting ? "Waiting for input" : running ? "Running" : status === "loading" ? "Loading Python" : ""}
        </span>
        {running && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onStop}
            className="h-7 px-2 text-xs text-[#CCCCCC] hover:bg-[#444] hover:text-white"
            aria-label="Stop Python program"
          >
            <Square className="mr-1 h-3 w-3 fill-current" /> Stop
          </Button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-[#CCCCCC]"
        aria-live="polite"
        aria-label="Python terminal output"
        onClick={() => waiting && inputRef.current?.focus()}
      >
        {output ? (
          <span className="whitespace-pre-wrap break-words">{output}</span>
        ) : (
          !waiting && <span className="text-[#858585] italic">{emptyMessage}</span>
        )}

        {waiting && (
          <form onSubmit={submit} className="inline">
            <label className="sr-only" htmlFor={inputId}>Python program input</label>
            <input
              id={inputId}
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="min-w-[12rem] max-w-full bg-transparent text-[#CCCCCC] outline-none caret-white"
              aria-label="Python program input"
            />
          </form>
        )}
      </div>
    </div>
  );
}
