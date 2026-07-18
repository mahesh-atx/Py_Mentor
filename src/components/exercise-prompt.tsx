"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Terminal } from "lucide-react";

interface ExercisePromptProps {
  title: string;
  prompt: string;
}

/**
 * ExercisePrompt renders a well-structured, visually clear exercise prompt.
 * It parses the markdown and enhances sections with visual cues:
 * - Task description
 * - Input/Output format
 * - Examples
 * - Constraints/Notes
 */
export function ExercisePrompt({ title, prompt }: ExercisePromptProps) {
  return (
    <div className="space-y-6">
      {/* Title with icon */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 mt-0.5 shrink-0">
          <Terminal className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight leading-tight">{title}</h2>
          <p className="text-xs text-muted-foreground mt-1">Solve the challenge below</p>
        </div>
      </div>

      {/* Prompt Content with enhanced markdown */}
      <div className="prose prose-neutral dark:prose-invert max-w-none 
        prose-headings:font-semibold prose-headings:text-base prose-headings:mt-6 prose-headings:mb-2
        prose-p:text-sm prose-p:leading-relaxed prose-p:text-foreground/90
        prose-code:text-xs prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-border/50
        prose-pre:bg-muted/80 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg
        prose-li:text-sm prose-li:leading-relaxed
        prose-strong:text-foreground
        prose-hr:my-4 prose-hr:border-border/50
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Style headings with visual indicators
            h2: ({ children, ...props }) => (
              <h2 className="flex items-center gap-2 text-base font-semibold mt-6 mb-2 pb-1 border-b border-border/30" {...props}>
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 className="flex items-center gap-2 text-sm font-semibold mt-4 mb-2 text-foreground" {...props}>
                <span className="w-1 h-4 rounded-full bg-primary/60 inline-block" />
                {children}
              </h3>
            ),
            // Style inline code
            code: ({ className, children, ...props }: any) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded border border-border/50 font-mono text-primary" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // Style code blocks
            pre: ({ children, ...props }: any) => (
              <div className="relative group">
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] text-muted-foreground bg-muted/90 rounded-bl-lg rounded-tr-lg border-l border-b border-border/30 font-mono">
                  Python
                </div>
                <pre className="bg-muted/80 border border-border/50 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed" {...props}>
                  {children}
                </pre>
              </div>
            ),
            // Style blockquotes as tips/notes
            blockquote: ({ children, ...props }: any) => (
              <blockquote className="border-l-4 border-primary/40 bg-primary/5 rounded-r-lg px-4 py-3 my-3 text-sm" {...props}>
                {children}
              </blockquote>
            ),
            // Style lists
            ul: ({ children, ...props }: any) => (
              <ul className="space-y-1.5 my-3" {...props}>
                {children}
              </ul>
            ),
            li: ({ children, ...props }: any) => (
              <li className="flex items-start gap-2 text-sm" {...props}>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                <span>{children}</span>
              </li>
            ),
            // Style horizontal rules as section dividers
            hr: () => <hr className="my-4 border-border/30" />,
          }}
        >
          {prompt}
        </ReactMarkdown>
      </div>

    </div>
  );
}
