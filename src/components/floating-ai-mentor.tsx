"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Bot,
  Send,
  User,
  X,
  Shield,
  ShieldAlert,
  Info,
  Lightbulb,
  AlertCircle,
  Sparkles,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { remarkAlerts } from "@/lib/remark-alerts";
import {
  getChatHistoryAction,
  createChatAction,
  addChatMessageAction,
} from "@/app/actions";
import { useMentorContext } from "@/components/mentor-context";
// getSuggestedQuestions moved inline to prevent server-module import in client component

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProviderStatus {
  configured: boolean;
  name: string | null;
  model: string;
}

export function getSuggestedQuestions(ctx: { topicSlug?: string; exerciseSlug?: string; code?: string } = {}, config: any): string[] {
  if (ctx.code) {
    return [
      "My code isn't working — help me debug",
      "Give me a hint, not the full answer",
      "Review my approach and suggest improvements",
      "Explain what my code is doing step by step",
    ];
  }
  if (ctx.exerciseSlug) {
    return [
      "Give me a hint to get started",
      "Explain what this exercise is asking",
      "Show me a small example",
    ];
  }
  if (ctx.topicSlug) {
    return [
      "Explain this lesson in simple terms",
      "What are common mistakes beginners make here?",
      "Give me a practice problem",
      "Show me a real-world example",
    ];
  }
  
  return [
    "Quiz me on something I should know",
    "What should I learn next?",
    `Explain a ${config.languageCapitalized} concept I'm shaky on`,
  ];
}

import { usePlatform } from "@/components/platform-provider";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

function getWelcomeMessage(config: any): Message {
  return {
    role: "assistant",
    content: `Hi! I'm **${config.appName}**, your AI coding mentor. 👋

I can help you:
- **Explain** a lesson or concept in plain language
- **Debug** your code or review your approach
- **Quiz** you and give practice problems
- **Suggest** what to learn next

Ask me anything, or tap a suggestion below to get started.`,
  };
}

function getGenericSuggestions(config: any) {
  return [
    `Quiz me on ${config.languageCapitalized} basics`,
    "What should I learn next?",
    "Explain variables like I'm 5",
    "Give me a quick practice problem",
  ];
}

// Regex that captures model-generated "what you can ask next" follow-up block.
// Matches the exact format the system prompt instructs the model to emit.
const SUGGESTION_BLOCK_REGEX = /\n*>>>\s*What you can ask next:\s*\n([\s\S]*?)$/i;

export function FloatingAiMentor() {
  const config = usePlatform();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(config)]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  // The DB id of the current chat (created lazily on first user message).
  const chatIdRef = useRef<string | null>(null);
  // Lets an in-flight stream be cancelled.
  const abortRef = useRef<AbortController | null>(null);
  // Avoid clobbering the streaming message when the DB-persistence effect runs.
  const streamingLockRef = useRef(false);

  const context = useMentorContext();

  // ── Auto-scroll to bottom on new content ───────────────────────────────
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // ── Check provider status on mount ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch("/api/ai-mentor", { method: "GET" })
      .then((r) => r.json())
      .then((data: ProviderStatus) => {
        if (!cancelled) setProviderStatus(data);
      })
      .catch(() => {
        if (!cancelled) setProviderStatus({ configured: false, name: null, model: "" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Load persisted chat history when the chat opens ───────────────────
  useEffect(() => {
    if (!isOpen) return;
    streamingLockRef.current = false;
    let cancelled = false;
    getChatHistoryAction()
      .then((result) => {
        if (cancelled || !result.success || !result.history || result.history.length === 0) return;
        const latest = result.history[0];
        chatIdRef.current = latest.id;
        const restored: Message[] = latest.messages
          .filter((m: { role: string }) => m.role === "user" || m.role === "assistant")
          .map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }));
        if (restored.length > 0) setMessages(restored);
      })
      .catch((e) => {
        if (!cancelled) console.error("Failed to load chat history", e);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // ── Suggestions adapt to current page context ──────────────────────────
  const suggestions = useMemo(() => {
    const fromContext = getSuggestedQuestions({
      topicSlug: context.topicSlug,
      exerciseSlug: context.exerciseSlug,
      code: context.code,
    }, config);
    // Prefer context-aware ones, fall back to generic.
    return fromContext.length > 0 ? fromContext.slice(0, 4) : getGenericSuggestions(config);
  }, [context.topicSlug, context.exerciseSlug, context.code, config]);

  // ── Parse a model reply into (body, followUpSuggestions) ───────────────
  function parseSuggestions(content: string): { body: string; followUps: string[] } {
    const match = content.match(SUGGESTION_BLOCK_REGEX);
    if (!match) return { body: content, followUps: [] };
    const body = content.slice(0, match.index).trimEnd();
    const lines = match[1]
      .split("\n")
      .map((l) => l.replace(/^\s*[-•]\s*/, "").trim())
      .filter((l) => l.length > 0);
    return { body, followUps: lines.slice(0, 4) };
  }

  // ── The core send/stream routine ───────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setError(null);
      setInput("");
      const userMessage: Message = { role: "user", content: trimmed };
      // Snapshot the full thread we're about to send (before state updates resolve).
      const thread: Message[] = [...messages, userMessage];
      setMessages(thread);
      setIsTyping(true);
      streamingLockRef.current = true;

      // Lazily create a DB chat on first message, then persist the user turn.
      try {
        if (!chatIdRef.current) {
          const created = await createChatAction(
            "Mentor chat",
            JSON.stringify(context),
          );
          if (created.success && created.chat) {
            chatIdRef.current = created.chat.id;
          }
        }
        if (chatIdRef.current) {
          addChatMessageAction(chatIdRef.current, "user", trimmed).catch((e) =>
            console.error("Failed to persist user message", e),
          );
        }
      } catch (e) {
        // Persistence failure must not block the answer.
        console.error("Chat persistence error", e);
      }

      // Add an empty assistant message to stream into.
      const assistantIndex = thread.length;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/ai-mentor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // Send the pre-assistant thread; the route adds the system prompt.
            messages: thread.map((m) => ({ role: m.role, content: m.content })),
            context,
          }),
        });

        if (!response.ok) {
          let detail = `Request failed (${response.status})`;
          try {
            const data = await response.json();
            detail = data?.error || detail;
          } catch {
            /* non-JSON error body */
          }
          // 503 means no provider configured — surface a setup hint.
          if (response.status === 503) {
            setError("AI provider not configured. Run 'pymentor config --set-key OPENROUTER_API_KEY=your-key' to enable the mentor, or add it to ~/.pymentor/.env");
          } else {
            setError(detail);
          }
          // Remove the empty assistant placeholder on error.
          setMessages((prev) => prev.slice(0, assistantIndex));
          return;
        }

        if (!response.body) {
          setError("No response stream from the mentor.");
          setMessages((prev) => prev.slice(0, assistantIndex));
          return;
        }

        // Stream the body, accumulating content into the assistant message.
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          accumulated += chunk;
          const snapshot = accumulated;
          setMessages((prev) => {
            const next = [...prev];
            if (next[assistantIndex]) {
              next[assistantIndex] = { role: "assistant", content: snapshot };
            }
            return next;
          });
        }

        // Persist the completed assistant turn (best-effort).
        if (chatIdRef.current && accumulated.length > 0) {
          addChatMessageAction(chatIdRef.current, "assistant", accumulated).catch((e) =>
            console.error("Failed to persist assistant message", e),
          );
        }
      } catch (e: unknown) {
        const err = e as { name?: string };
        if (err?.name === "AbortError") {
          // User cancelled; keep whatever streamed so far. Remove empty placeholder.
          setMessages((prev) => {
            if (prev[assistantIndex]?.content === "") {
              return prev.slice(0, assistantIndex);
            }
            return prev;
          });
        } else {
          console.error("Mentor stream error", e);
          setError("Couldn't reach the AI mentor. Check your connection and try again. If you're offline, all other features still work — only AI chat needs internet.");
          setMessages((prev) => prev.slice(0, assistantIndex));
        }
      } finally {
        setIsTyping(false);
        streamingLockRef.current = false;
        abortRef.current = null;
      }
    },
    [messages, isTyping, context],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  // Start a fresh conversation (also clears DB chat binding).
  const handleNewChat = () => {
    abortRef.current?.abort();
    chatIdRef.current = null;
    setError(null);
    setMessages([getWelcomeMessage(config)]);
  };

  // Determine the most recent assistant follow-up suggestions (for the chips).
  const lastAssistant = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant" && messages[i].content) {
        return messages[i];
      }
    }
    return null;
  }, [messages]);

  const showFollowUps =
    !isTyping && lastAssistant?.role === "assistant" && lastAssistant.content.length > 0;
  const followUps = useMemo(
    () => (showFollowUps ? parseSuggestions(lastAssistant!.content).followUps : []),
    [showFollowUps, lastAssistant],
  );

  // Header status pill reflects provider state.
  const statusText = (() => {
    if (!providerStatus) return "Connecting…";
    if (!providerStatus.configured) return "Not configured";
    return "Online";
  })();
  const statusColor = (() => {
    if (!providerStatus) return "bg-muted-foreground";
    if (!providerStatus.configured) return "bg-destructive";
    return "bg-success";
  })();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Expanded Chat Window */}
      <div
        className={`mb-4 w-[90vw] sm:w-[450px] h-[600px] max-h-[calc(100vh-6rem)] bg-card/80 backdrop-blur-2xl border border-primary/20 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-12 pointer-events-none absolute bottom-16 right-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b bg-muted/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-semibold block text-sm">AI Mentor</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75 ${providerStatus?.configured ? "animate-ping" : ""}`}
                  ></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}></span>
                </span>
                {statusText}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              title="New conversation"
              className="rounded-full h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Not-configured banner */}
        {providerStatus && !providerStatus.configured && (
          <div className="px-4 py-3 bg-destructive/10 border-b border-destructive/20 text-xs text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-medium">AI Mentor requires an API key</p>
              <p className="opacity-80">
                The AI Mentor is the only feature that needs internet. Everything else — lessons, exercises, quizzes, code execution — works fully offline.
              </p>
              <p className="opacity-80">
                To enable AI chat, run:
              </p>
              <code className="block bg-background/50 px-2 py-1 rounded text-[11px] font-mono border">
                pymentor config --set-key OPENROUTER_API_KEY=your-key
              </code>
              <p className="opacity-60">
                Or add it to <code className="font-mono">~/.pymentor/.env</code>
              </p>
            </div>
          </div>
        )}

        {/* Error toast (inline) */}
        {error && (
          <div className="px-4 py-2 bg-destructive/10 border-b border-destructive/20 text-xs text-destructive flex items-start justify-between gap-2">
            <span className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              {error}
            </span>
            <button onClick={() => setError(null)} className="shrink-0 opacity-70 hover:opacity-100">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 p-4 bg-muted/10 overflow-y-auto" ref={scrollRef}>
          <div className="space-y-6 pb-2">
            {messages.map((msg, idx) => {
              const isLastAssistant =
                msg.role === "assistant" &&
                idx === messages.length - 1 &&
                msg.content.length > 0 &&
                !isTyping;
              const { body } = isLastAssistant
                ? parseSuggestions(msg.content)
                : { body: msg.content };

              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 border"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-background border rounded-tl-none prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:my-2 prose-pre:bg-[#1E1E1E] prose-pre:p-3 prose-pre:border"
                      }`}
                    >
                      {msg.role === "user" ? (
                        msg.content
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkAlerts]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            div: ({ node, className, children, ...props }: any) => {
                              if (
                                typeof className === "string" &&
                                className.includes("markdown-alert")
                              ) {
                                const type =
                                  node?.data?.hProperties?.["data-alert-type"] ||
                                  className.match(
                                    /markdown-alert-(note|tip|warning|important|caution)/,
                                  )?.[1] ||
                                  "note";

                                let Icon = Info;
                                let colorClass =
                                  "bg-blue-500/10 text-blue-500 border-blue-500/20";
                                let title = "Note";

                                switch (type) {
                                  case "tip":
                                    Icon = Lightbulb;
                                    colorClass =
                                      "bg-green-500/10 text-green-500 border-green-500/20 dark:text-green-400";
                                    title = "Tip";
                                    break;
                                  case "warning":
                                    Icon = AlertCircle;
                                    colorClass =
                                      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
                                    title = "Warning";
                                    break;
                                  case "caution":
                                    Icon = ShieldAlert;
                                    colorClass =
                                      "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400";
                                    title = "Caution";
                                    break;
                                  case "important":
                                    Icon = Shield;
                                    colorClass =
                                      "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400";
                                    title = "Important";
                                    break;
                                  case "note":
                                  default:
                                    Icon = Info;
                                    colorClass =
                                      "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400";
                                    title = "Note";
                                    break;
                                }

                                return (
                                  <div className={`my-4 rounded-lg border p-3 ${colorClass}`} {...props}>
                                    <div className="flex items-center gap-2 font-semibold mb-1 text-sm">
                                      <Icon className="h-4 w-4" />
                                      <span>{title}</span>
                                    </div>
                                    <div className="text-sm opacity-90 leading-relaxed [&>p]:m-0">
                                      {children}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <div className={className} {...props}>
                                  {children}
                                </div>
                              );
                            },
                          }}
                        >
                          {body}
                        </ReactMarkdown>
                      )}
                      {msg.role === "assistant" && msg.content === "" && (
                        <span className="flex gap-1 items-center h-4">
                          <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Follow-up suggestion chips after the last assistant reply */}
            {showFollowUps && followUps.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-11">
                {followUps.map((q: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3" />
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Initial suggestions under the welcome message */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pl-11">
                {suggestions.map((q: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="h-3 w-3 text-primary" />
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 bg-background border-t shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isTyping ? "AI is typing..." : "Ask a question..."}
              className="pr-12 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/50"
              disabled={isTyping}
            />
            {isTyping ? (
              <Button
                type="button"
                size="icon"
                onClick={handleStop}
                title="Stop"
                className="absolute right-1 top-1 bottom-1 h-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-300 w-8"
              >
                <span className="h-3 w-3 bg-current rounded-[2px]" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="absolute right-1 top-1 bottom-1 h-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 w-8"
              >
                <Send className="h-4 w-4 ml-1" />
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative h-12 rounded-full px-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 flex items-center overflow-hidden bg-primary/90 backdrop-blur-md text-primary-foreground border border-primary/20 hover:bg-primary hover:shadow-primary/50 hover:shadow-lg ${
          isOpen
            ? "translate-y-20 opacity-0 pointer-events-none absolute"
            : "translate-y-0 opacity-100 delay-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Bot className="h-5 w-5 shrink-0 animate-pulse relative z-10" />
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-semibold text-sm relative z-10">
          Ask AI Mentor
        </span>
      </Button>
    </div>
  );
}
