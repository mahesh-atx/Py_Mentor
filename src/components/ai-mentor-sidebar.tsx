"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiMentorSidebarProps {
  topicTitle: string;
}

export function AiMentorSidebar({ topicTitle }: AiMentorSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI Mentor. I noticed you're learning about **${topicTitle}**.\n\nHow can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
      rawResponse = `That's an interesting question about ${topicTitle}! Since I'm currently running in simulated offline mode, I don't have a real LLM connected to answer that fully. But keep exploring and experimenting!`;
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
      }, 50); // 50ms per word
      
    }, 600); // 600ms initial thought delay
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l bg-muted/20 flex flex-col h-[400px] lg:h-[calc(100vh-5rem)] shrink-0">
      
      {/* Header */}
      <div className="p-4 border-b bg-background flex items-center gap-3 shrink-0">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="font-semibold block text-sm">AI Mentor</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            Simulated Agent
          </span>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 p-4 bg-muted/10 overflow-y-auto" ref={scrollRef}>
        <div className="space-y-6 pb-4">
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
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
      <div className="p-4 bg-background border-t shrink-0">
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
  );
}
