"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Keyboard, Terminal } from "lucide-react";
import {
  buildExerciseGuide,
  type ExerciseTestCase,
} from "@/lib/exercise-format";

interface ExercisePromptProps {
  prompt: string;
  title?: string;
  exerciseTitle?: string;
  testCase?: ExerciseTestCase | null;
}

const markdownComponents = {
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p className="my-0" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="my-1 list-disc space-y-0.5 pl-5" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
    <ol className="my-1 list-decimal space-y-0.5 pl-5" {...props}>{children}</ol>
  ),
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <pre className="my-2 overflow-x-auto rounded-lg border border-border/50 bg-muted/60 p-3 text-xs" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: React.ComponentProps<"code">) => (
    <code
      className={className || "text-xs bg-muted px-1.5 py-0.5 rounded border border-border/50 font-mono text-primary"}
      {...props}
    >
      {children}
    </code>
  ),
};

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/80">
      <span className="text-primary">{icon}</span>
      {children}
    </h3>
  );
}

/**
 * Renders all legacy and new exercises as a compact description, numbered
 * steps, Sample Input (when needed), and Expected Output.
 */
export function ExercisePrompt({ prompt, title, exerciseTitle, testCase = null }: ExercisePromptProps) {
  const guide = buildExerciseGuide(prompt, testCase, exerciseTitle || title);

  return (
    <div className="space-y-3.5">
      {title && (
        <div className="flex items-center gap-2 pb-2 border-b border-border/20">
          <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground">{title}</span>
        </div>
      )}

      <div className="text-sm leading-snug text-foreground/90">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {guide.task}
        </ReactMarkdown>
      </div>

      <ol className="space-y-1.5">
        {guide.todos.map((todo, index) => (
          <li key={`${index}-${todo}`} className="flex items-start gap-2 text-sm leading-snug">
            <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary">
              {index + 1}
            </span>
            <div className="min-w-0 text-foreground/90">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {todo}
              </ReactMarkdown>
            </div>
          </li>
        ))}
      </ol>

      {guide.sampleInput !== null && (
        <section className="space-y-1.5">
          <SectionTitle icon={<Keyboard className="h-3.5 w-3.5" />}>Sample Input</SectionTitle>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/60 p-2.5 font-mono text-xs leading-snug text-foreground">
            {guide.sampleInput}
          </pre>
        </section>
      )}

      <section className="space-y-1.5">
        <SectionTitle icon={<Terminal className="h-3.5 w-3.5" />}>Expected Output</SectionTitle>
        {guide.outputIsVariable ? (
          <p className="rounded-lg border border-border/50 bg-muted/40 p-3 text-xs text-muted-foreground">
            Output may vary. Your program must run successfully and produce the requested result.
          </p>
        ) : guide.expectedOutput !== null ? (
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-[#1E1E1E] p-2.5 font-mono text-xs leading-snug text-[#CCCCCC]">
            {guide.expectedOutput}
          </pre>
        ) : (
          <p className="rounded-lg border border-border/50 bg-muted/40 p-3 text-xs text-muted-foreground">
            No printed output is required. Complete the behavior described above.
          </p>
        )}
      </section>
    </div>
  );
}
