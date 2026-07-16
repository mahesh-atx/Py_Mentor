"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/lib/actions/onboarding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ArrowLeft, User as UserIcon, Code2, Map } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AVATARS = [
  "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Jasper&backgroundColor=ffd5dc",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Sasha&backgroundColor=d1d4f9",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Cleo&backgroundColor=ffdfbf",
];

interface Track {
  id: string;
  title: string;
  description: string;
}

export default function OnboardingClient({ tracks }: { tracks: Track[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedTrackId, setSelectedTrackId] = useState(tracks[0]?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (!name.trim()) {
      toast.error("Please enter your name before continuing");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!selectedTrackId) {
      toast.error("Please select a learning track");
      return;
    }

    setIsSubmitting(true);
    const result = await completeOnboarding({
      name: name.trim(),
      avatarUrl: selectedAvatar,
      trackId: selectedTrackId,
    });

    if (result.success) {
      toast.success("Profile setup complete! Welcome!");
      router.push("/");
    } else {
      toast.error(result.error || "Failed to complete setup");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-background relative overflow-hidden flex items-center justify-center p-6 md:p-12 lg:p-24">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 h-full max-h-[800px]">
        
        {/* Left Column: Welcome Section */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 w-full">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-3xl"
          >
            <Sparkles className="h-10 w-10 text-primary" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
          >
            Welcome to PyMentor
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-lg leading-relaxed"
          >
            Let's personalize your learning experience. Tell us a bit about yourself to get started on your journey.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2 items-center"
          >
             <div className={cn("h-2 w-12 rounded-full transition-colors", step === 1 ? "bg-primary" : "bg-muted")} />
             <div className={cn("h-2 w-12 rounded-full transition-colors", step === 2 ? "bg-primary" : "bg-muted")} />
             <span className="text-sm font-medium text-muted-foreground ml-2">Step {step} of 2</span>
          </motion.div>
        </div>

        {/* Right Column: Wizard Steps */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none relative h-full flex flex-col justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Name & Avatar */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl rounded-[2.5rem] p-8 sm:p-12 space-y-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                  
                  {/* Name Input */}
                  <div className="space-y-4 relative z-10">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-primary" /> What should we call you?
                    </label>
                    <Input 
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="Your awesome name..." 
                      className="h-16 text-xl px-6 rounded-2xl bg-background/50 border-border/50 hover:border-primary/30 focus-visible:ring-primary/50 placeholder:text-muted-foreground/40 transition-all shadow-inner"
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div className="space-y-4 relative z-10">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Choose your avatar
                    </label>
                    <div className="flex flex-wrap gap-4 justify-start">
                      {AVATARS.map((avatar, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={cn(
                            "relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden transition-all duration-300 ring-offset-background bg-card",
                            selectedAvatar === avatar 
                              ? "ring-4 ring-primary scale-110 shadow-lg shadow-primary/20" 
                              : "opacity-60 hover:opacity-100 hover:scale-105 border-2 border-border/50 hover:border-primary/50"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Next Action */}
                  <div className="pt-4 relative z-10">
                    <Button 
                      size="lg" 
                      onClick={handleNext} 
                      disabled={!name.trim()}
                      className="w-full h-16 text-lg rounded-2xl gap-2 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all font-semibold"
                    >
                      Next Step <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 2: Track Selection */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl rounded-[2.5rem] p-8 sm:p-12 space-y-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                  
                  {/* Track Selection */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                       <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 rounded-full">
                          <ArrowLeft className="h-4 w-4" />
                       </Button>
                       <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                         <Map className="h-4 w-4 text-primary" /> Select your learning track
                       </label>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => setSelectedTrackId(track.id)}
                          className={cn(
                            "text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                            selectedTrackId === track.id
                              ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.15)]"
                              : "border-border/50 bg-background/30 hover:border-primary/50 hover:bg-background/50"
                          )}
                        >
                          <div className={cn(
                            "absolute top-0 left-0 w-1.5 h-full transition-colors",
                            selectedTrackId === track.id ? "bg-primary" : "bg-transparent group-hover:bg-primary/50"
                          )} />
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "p-3 rounded-xl mt-1",
                              selectedTrackId === track.id ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors"
                            )}>
                              <Code2 className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-1">{track.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                      {tracks.length === 0 && (
                        <div className="p-4 border border-dashed rounded-2xl text-center text-muted-foreground">
                          No tracks available. Please seed the database.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Action */}
                  <div className="pt-2 relative z-10">
                    <Button 
                      size="lg" 
                      onClick={handleSubmit} 
                      disabled={isSubmitting || !selectedTrackId}
                      className="w-full h-16 text-lg rounded-2xl gap-2 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all font-semibold bg-primary text-primary-foreground"
                    >
                      {isSubmitting ? "Setting up curriculum... (This may take a minute)" : "Start Learning"}
                      {!isSubmitting && <Sparkles className="h-5 w-5" />}
                    </Button>
                  </div>

                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
