"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { remarkAlerts } from "@/lib/remark-alerts";
import { Shield, ShieldAlert, Info, Lightbulb, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function FloatingAiMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI Mentor.\n\nHow can I help you with your coding journey today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Prepare simulated response
    let rawResponse = "";
    const lowerInput = userMessage.toLowerCase();
    
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      rawResponse = "Hello there! Ready to write some Python?";
    } else if (lowerInput.includes("loop")) {
      rawResponse = "Loops are great for repeating actions! Use a `for` loop when you know how many times to iterate, and a `while` loop when you want to loop until a condition is met.\n\n```python\nfor i in range(5):\n    print(i)\n```";
    } else if (lowerInput.includes("variable")) {
      rawResponse = "In Python, variables are dynamically typed. You don't need to declare their type!\n\n```python\nmy_var = 42\nname = \"PyMentor\"\n```";
    } else if (lowerInput.includes("error") || lowerInput.includes("bug") || lowerInput.includes("help")) {
      rawResponse = "Don't worry, everyone encounters bugs! Check the traceback to find the exact line number, and read the error type (like `TypeError` or `SyntaxError`) to understand what went wrong.";
    } else {
      rawResponse = `That's an interesting question! Since I'm currently running in simulated offline mode, I don't have a real LLM connected to answer that fully. But keep exploring and experimenting!`;
    }

    // Simulate network delay
    setTimeout(() => {
      // Add empty assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      
      // Stream words one by one
      const words = rawResponse.split(" ");
      let currentIdx = 0;
      
      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          const word = words[currentIdx];
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.content += (currentIdx === 0 ? "" : " ") + word;
            return newMessages;
          });
          currentIdx++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Expanded Chat Window */}
      <div 
        className={`mb-4 w-[90vw] sm:w-[450px] h-[600px] max-h-[calc(100vh-6rem)] bg-background border border-border/60 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-12 pointer-events-none absolute bottom-16 right-0'
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
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Online
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 p-4 bg-muted/10 overflow-y-auto" ref={scrollRef}>
          <div className="space-y-6 pb-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 border'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                </div>
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div 
                    className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-background border rounded-tl-none prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:my-2 prose-pre:bg-[#1E1E1E] prose-pre:p-3 prose-pre:border'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkAlerts]} 
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          div: ({ node, className, children, ...props }: any) => {
                            if (typeof className === 'string' && className.includes('markdown-alert')) {
                              const type = node?.data?.hProperties?.['data-alert-type'] || className.match(/markdown-alert-(note|tip|warning|important|caution)/)?.[1] || 'note';
                              
                              let Icon = Info;
                              let colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/20";
                              let title = "Note";

                              switch (type) {
                                case 'tip':
                                  Icon = Lightbulb;
                                  colorClass = "bg-green-500/10 text-green-500 border-green-500/20 dark:text-green-400";
                                  title = "Tip";
                                  break;
                                case 'warning':
                                  Icon = AlertCircle;
                                  colorClass = "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
                                  title = "Warning";
                                  break;
                                case 'caution':
                                  Icon = ShieldAlert;
                                  colorClass = "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400";
                                  title = "Caution";
                                  break;
                                case 'important':
                                  Icon = Shield;
                                  colorClass = "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400";
                                  title = "Important";
                                  break;
                                case 'note':
                                default:
                                  Icon = Info;
                                  colorClass = "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400";
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
                            return <div className={className} {...props}>{children}</div>;
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                    {msg.role === 'assistant' && msg.content === "" && (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isTyping}
              className="absolute right-1 top-1 bottom-1 h-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 w-8"
            >
              <Send className="h-4 w-4 ml-1" />
            </Button>
          </form>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`group h-12 rounded-full px-3.5 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:shadow-primary/25 flex items-center overflow-hidden ${
          isOpen ? 'translate-y-20 opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100 delay-100'
        }`}
      >
        <Bot className="h-5 w-5 shrink-0 animate-pulse" />
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-semibold text-sm">
          Ask AI Mentor
        </span>
      </Button>

    </div>
  );
}
