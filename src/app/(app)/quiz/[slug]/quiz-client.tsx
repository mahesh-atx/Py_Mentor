"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft, HelpCircle, Code, Bug, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  id: string;
  type: string;
  question: string;
  options: string | null; // JSON array string
  correctAnswer: string;
  code: string | null;
}

interface QuizData {
  id: string;
  title: string;
  slug: string;
  topicId: string;
  questions: QuizQuestion[];
}

interface QuizClientProps {
  quiz: QuizData;
  nextTopicSlug: string | null;
}

export function QuizClient({ quiz, nextTopicSlug }: QuizClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Track user answers keyed by question ID
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  
  // Safe options parsing
  const options = currentQuestion?.options ? JSON.parse(currentQuestion.options) : [];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelectAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    // Calculate final score locally
    let calculatedScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setFinalScore(calculatedScore);

    try {
      const { submitQuizAction } = await import("@/app/actions");
      const result = await submitQuizAction(quiz.slug, calculatedScore, questions.length);
      
      if (result.success) {
        setEarnedXp(result.earnedXp ?? 0);
        setShowResults(true); // Switch to results view
        
        toast.success(`Quiz Completed! You earned +${result.earnedXp} XP`);
        if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
          result.unlockedAchievements.forEach((ach: any) => {
            toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
              duration: 5000,
            });
          });
        }
      } else {
        toast.error("Failed to save quiz results.");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    if (nextTopicSlug) {
      router.push(`/learn/${nextTopicSlug}`);
    } else {
      router.push('/dashboard');
    }
  };

  if (!currentQuestion) {
    return <div>No questions found for this quiz.</div>;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm" 
        onClick={showResults ? handleFinish : () => router.back()}
      />
      
      {/* Centered Window */}
      <div className="relative w-[95vw] sm:w-[90vw] max-w-3xl h-[85vh] max-h-[800px] bg-background border border-border/60 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 p-6 sm:p-8">
      
        {!showResults ? (
          <>
            {/* Progress Header */}
            <div className="flex items-center gap-4 mb-8 shrink-0">
              <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
              <Progress value={progress} className="h-3 flex-1" />
              <span className="font-semibold text-muted-foreground">{currentIndex + 1} / {questions.length}</span>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col overflow-y-auto pr-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2 text-primary font-medium mb-4">
                    {currentQuestion.type === 'mcq' && <HelpCircle className="h-5 w-5" />}
                    {currentQuestion.type === 'output' && <Code className="h-5 w-5" />}
                    {currentQuestion.type === 'debug' && <Bug className="h-5 w-5" />}
                    <span className="uppercase tracking-wider text-sm">
                      {currentQuestion.type === 'mcq' ? 'Multiple Choice' : currentQuestion.type === 'output' ? 'Predict Output' : 'Debugging'}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold mb-6">{currentQuestion.question}</h1>

                  {currentQuestion.code && (
                    <div className="mb-8 p-6 bg-[#1E1E1E] text-[#D4D4D4] rounded-xl font-mono text-sm shadow-inner whitespace-pre-wrap border border-[#404040]">
                      {currentQuestion.code}
                    </div>
                  )}

                  <RadioGroup 
                    value={answers[currentQuestion.id] || ""} 
                    onValueChange={handleSelectAnswer} 
                    className="space-y-3"
                  >
                    {options.map((option: string, idx: number) => {
                      const isSelected = answers[currentQuestion.id] === option;
                      
                      return (
                        <div key={idx} className="relative">
                          <RadioGroupItem value={option} id={`option-${idx}`} className="peer sr-only" />
                          <Label
                            htmlFor={`option-${idx}`}
                            className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected 
                                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className={`h-5 w-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                            }`}>
                              {isSelected && <div className="h-2 w-2 rounded-full bg-background" />}
                            </div>
                            <span className="text-base font-medium">{option}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-6 mt-6 border-t shrink-0 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handlePrev}
                disabled={currentIndex === 0 || isSubmitting}
                className="w-32"
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> Back
              </Button>

              {currentIndex < questions.length - 1 ? (
                <Button 
                  size="lg" 
                  className="w-32 bg-primary hover:bg-primary/90"
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  onClick={handleNext}
                >
                  Next <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="w-40 bg-primary hover:bg-primary/90"
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  onClick={handleSubmitQuiz}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              )}
            </div>
          </>
        ) : (
          /* RESULTS SCREEN */
          <div className="flex flex-col h-full">
            <div className="text-center mb-8 shrink-0">
              <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground text-lg mb-4">
                You scored <span className="text-foreground font-semibold">{finalScore}</span> out of <span className="text-foreground font-semibold">{questions.length}</span>
              </p>
              {earnedXp > 0 && (
                <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-1.5 rounded-full border border-warning/20 font-medium">
                  +{earnedXp} XP Earned
                </div>
              )}
            </div>

            {/* Answers Breakdown */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Your Answers</h3>
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrectAnswer = userAnswer === q.correctAnswer;

                return (
                  <div key={q.id} className={`p-4 rounded-xl border ${isCorrectAnswer ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="mt-1 shrink-0">
                        {isCorrectAnswer ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground/90">{idx + 1}. {q.question}</p>
                      </div>
                    </div>
                    
                    <div className="ml-8 space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Your Answer: <span className={`font-medium ${isCorrectAnswer ? 'text-success' : 'text-destructive'}`}>{userAnswer || "Not answered"}</span>
                      </p>
                      {!isCorrectAnswer && (
                        <p className="text-muted-foreground">
                          Correct Answer: <span className="font-medium text-success">{q.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 mt-6 border-t shrink-0">
              <Button 
                size="lg" 
                className="w-full text-lg h-14 bg-primary hover:bg-primary/90"
                onClick={handleFinish}
              >
                Continue to Next Lesson
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
