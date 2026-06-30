"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Paperclip, Code, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addChatMessageAction } from "@/app/actions";
import type { AIChatMessage } from "@prisma/client";

interface AIMentorClientProps {
  chatId: string;
  initialMessages: AIChatMessage[];
}

export default function AIMentorClient({ chatId, initialMessages }: AIMentorClientProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userContent = input;
    setInput("");
    setIsTyping(true);

    // Optimistically update UI
    const tempUserMsg = {
      id: Date.now().toString(),
      chatId,
      role: "user",
      content: userContent,
      code: null,
      createdAt: new Date()
    };
    setMessages(prev => [...prev, tempUserMsg as AIChatMessage]);

    // Save to DB
    const userRes = await addChatMessageAction(chatId, "user", userContent);

    // Mock AI response
    setTimeout(async () => {
      const aiContent = "That's a great question! Here's a quick explanation:\n\nIn Python, a variable is created the moment you first assign a value to it. There's no need to declare its type explicitly.\n\n```python\nx = 5\ny = \"Hello\"\n```\n\nWould you like to try writing a function with variables?";
      
      const tempAiMsg = {
        id: (Date.now() + 1).toString(),
        chatId,
        role: "assistant",
        content: aiContent,
        code: null,
        createdAt: new Date()
      };
      setMessages(prev => [...prev, tempAiMsg as AIChatMessage]);
      setIsTyping(false);

      // Save AI response to DB
      await addChatMessageAction(chatId, "assistant", aiContent);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertShortcut = (text: string) => {
    setInput(text);
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col -mx-6 -mb-6 -mt-6">
      
      {/* Header */}
      <div className="h-14 border-b bg-background flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div className="font-semibold text-lg">AI Mentor</div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          Online
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="h-10 w-10 shrink-0 border shadow-sm">
                {msg.role === 'user' ? (
                  <>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-background border rounded-tl-none'}`}>
                {msg.content.split('\n').map((line, i) => {
                  if (line.startsWith('```')) return null;
                  if (line.includes('x = 5') || line.includes('y = "Hello"')) {
                    return <div key={i} className="bg-[#1E1E1E] text-[#D4D4D4] px-4 py-1.5 font-mono text-sm first-of-type:pt-3 first-of-type:rounded-t-md last-of-type:pb-3 last-of-type:rounded-b-md">{line}</div>;
                  }
                  return <p key={i} className="mb-1.5 last:mb-0 leading-relaxed text-[15px]">{line}</p>;
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 shrink-0 border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-background border rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1 items-center h-12">
                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t shrink-0">
        <div className="max-w-3xl mx-auto space-y-4">
          
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="h-8 text-xs rounded-full gap-1.5 shadow-sm" onClick={() => insertShortcut("Can you explain how Variables work?")}>
              <Lightbulb className="h-3.5 w-3.5 text-warning" /> Explain Variables
            </Button>
            <Button variant="secondary" size="sm" className="h-8 text-xs rounded-full gap-1.5 shadow-sm" onClick={() => insertShortcut("Please review this code snippet:")}>
              <Code className="h-3.5 w-3.5 text-primary" /> Review Code
            </Button>
            <Button variant="secondary" size="sm" className="h-8 text-xs rounded-full gap-1.5 shadow-sm" onClick={() => insertShortcut("I need a hint for the current challenge.")}>
              <FileText className="h-3.5 w-3.5 text-info" /> Get a Hint
            </Button>
          </div>

          <div className="relative flex items-end gap-2 bg-muted/30 rounded-2xl p-2 border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full shrink-0 text-muted-foreground hover:bg-muted">
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the AI Mentor anything..."
              className="min-h-[44px] max-h-32 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent py-3 px-1 text-[15px]"
              rows={1}
            />
            
            <Button 
              size="icon" 
              className="h-10 w-10 rounded-full shrink-0 bg-primary hover:bg-primary/90 shadow-md transition-transform active:scale-95"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground">AI Mentor can make mistakes. Consider verifying critical coding concepts.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
