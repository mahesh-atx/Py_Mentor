"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, HelpCircle, Code, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  
  // Parse options safely
  const options = currentQuestion?.options ? JSON.parse(currentQuestion.options) : [];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleCheck = () => {
    if (!selectedAnswer) return;
    
    setIsChecked(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore(s => s + 1);
      toast.success("Correct! Great job.");
    } else {
      setIsCorrect(false);
      toast.error(`Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer("");
      setIsChecked(false);
      setIsCorrect(false);
    } else {
      // End of quiz - Submit
      setIsSubmitting(true);
      try {
        const { submitQuizAction } = await import("@/app/actions");
        // final score includes the current question if it was correct
        const finalScore = isCorrect ? score + 1 : score;
        
        const result = await submitQuizAction(quiz.id, finalScore, questions.length);
        
        if (result.success) {
          toast.success(`Quiz Completed! You earned +${result.earnedXp} XP`);
          if (result.unlockedAchievements && result.unlockedAchievements.length > 0) {
            result.unlockedAchievements.forEach((ach: any) => {
              toast.success(`🏆 Achievement Unlocked: ${ach.title}! +${ach.xpReward} XP`, {
                duration: 5000,
              });
            });
          }
          
          if (nextTopicSlug) {
            router.push(`/learn/${nextTopicSlug}`);
          } else {
            router.push('/dashboard');
          }
        } else {
          toast.error("Failed to save quiz results.");
          setIsSubmitting(false);
        }
      } catch (e) {
        console.error(e);
        toast.error("An error occurred while saving.");
        setIsSubmitting(false);
      }
    }
  };

  if (!currentQuestion) {
    return <div>No questions found for this quiz.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col pt-8">
      
      {/* Progress Header */}
      <div className="flex items-center gap-4 mb-12">
        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
        <Progress value={progress} className="h-3 flex-1" />
        <span className="font-semibold text-muted-foreground">{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
              {options.map((option: string, idx: number) => {
                const isSelected = selectedAnswer === option;
                const isWrong = isChecked && isSelected && !isCorrect;
                const isActualCorrect = isChecked && option === currentQuestion.correctAnswer;
                
                let borderClass = "border-border hover:border-primary/50";
                if (isSelected && !isChecked) borderClass = "border-primary bg-primary/5 ring-1 ring-primary";
                if (isActualCorrect) borderClass = "border-success bg-success/10 ring-1 ring-success";
                if (isWrong) borderClass = "border-destructive bg-destructive/10 ring-1 ring-destructive";

                return (
                  <div key={idx} className="relative">
                    <RadioGroupItem value={option} id={`option-${idx}`} className="peer sr-only" disabled={isChecked} />
                    <Label
                      htmlFor={`option-${idx}`}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${borderClass}`}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0
                        ${isSelected && !isChecked ? 'border-primary bg-primary' : ''}
                        ${isActualCorrect ? 'border-success bg-success' : ''}
                        ${isWrong ? 'border-destructive bg-destructive' : ''}
                        ${!isSelected && !isActualCorrect ? 'border-muted-foreground' : ''}
                      `}>
                        {(isActualCorrect || (isSelected && !isChecked && !isWrong)) && <div className="h-2 w-2 rounded-full bg-background" />}
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
      <div className="pt-8 mt-auto border-t">
        {!isChecked ? (
          <Button 
            size="lg" 
            className="w-full text-lg h-14 bg-primary hover:bg-primary/90"
            disabled={!selectedAnswer}
            onClick={handleCheck}
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            size="lg" 
            className={`w-full text-lg h-14 ${isCorrect ? 'bg-success hover:bg-success/90 text-success-foreground' : 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'}`}
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Continue'} <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>

    </div>
  );
}
