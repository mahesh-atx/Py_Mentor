"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckSquare2, Keyboard, Target, Terminal } from "lucide-react";
import {
  buildExerciseGuide,
  type ExerciseTestCase,
} from "@/lib/exercise-format";

interface ExercisePromptProps {
  prompt: string;
  title?: string;
  testCase?: ExerciseTestCase | null;
}

const markdownComponents = {
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p className="my-1.5" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="my-2 list-disc space-y-1 pl-5" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
    <ol className="my-2 list-decimal space-y-1 pl-5" {...props}>{children}</ol>
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
 * Renders all legacy and new exercises with one beginner-friendly structure:
 * Task, TODO, Sample Input (when needed), and Expected Output.
 */
export function ExercisePrompt({ prompt, title, testCase = null }: ExercisePromptProps) {
  const guide = buildExerciseGuide(prompt, testCase);

  return (
    <div className="space-y-5">
      {title && (
        <div className="flex items-center gap-2 pb-2 border-b border-border/20">
          <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
            <Terminal className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground">{title}</span>
        </div>
      )}

      <section className="space-y-2">
        <SectionTitle icon={<Target className="h-4 w-4" />}>Task</SectionTitle>
        <div className="text-sm leading-relaxed text-foreground/90">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {guide.task}
          </ReactMarkdown>
        </div>
      </section>

      <section className="space-y-2">
        <SectionTitle icon={<CheckSquare2 className="h-4 w-4" />}>TODO</SectionTitle>
        <ol className="space-y-2">
          {guide.todos.map((todo, index) => (
            <li key={`${index}-${todo}`} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
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
      </section>

      {guide.sampleInput !== null && (
        <section className="space-y-2">
          <SectionTitle icon={<Keyboard className="h-4 w-4" />}>Sample Input</SectionTitle>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/60 p-3 font-mono text-xs leading-relaxed text-foreground">
            {guide.sampleInput}
          </pre>
        </section>
      )}

      <section className="space-y-2">
        <SectionTitle icon={<Terminal className="h-4 w-4" />}>Expected Output</SectionTitle>
        {guide.outputIsVariable ? (
          <p className="rounded-lg border border-border/50 bg-muted/40 p-3 text-xs text-muted-foreground">
            Output may vary. Your program must run successfully and produce the requested result.
          </p>
        ) : guide.expectedOutput !== null ? (
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-[#1E1E1E] p-3 font-mono text-xs leading-relaxed text-[#CCCCCC]">
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
