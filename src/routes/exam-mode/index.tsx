import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Flag, ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ExitModal from "@/routes/exam-mode/-components/ExitModal";
import { useModal } from "@/context/ModalContext";


export const Route = createFileRoute("/exam-mode/")({
  component: ExamModePage,
});

// Dummy exam data
const EXAM_DATA = {
  courseCode: "EEE211",
  subtopic: "Circuit Analysis Fundamentals",
  totalQuestions: 10,
  timeLimit: 30, // minutes
};

const QUESTIONS = [
  {
    id: "1",
    question: "What is Ohm's Law?",
    options: ["V = I × R", "V = R / I", "I = V × R", "R = V × I"],
    correctAnswer: 0,
  },
  {
    id: "2",
    question: "In a series circuit, the total resistance is:",
    options: [
      "The sum of all resistances",
      "The product of all resistances",
      "The average of all resistances",
      "The smallest resistance",
    ],
    correctAnswer: 0,
  },
  {
    id: "3",
    question: "What unit is used to measure electric current?",
    options: ["Volts", "Amperes", "Ohms", "Watts"],
    correctAnswer: 1,
  },
];

export default function ExamModePage() {
  const { open } = useModal();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(EXAM_DATA.totalQuestions).fill(null),
  );
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DATA.timeLimit * 60);

  const question = QUESTIONS[currentQuestion];

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const next = new Set(flaggedQuestions);
    next.has(currentQuestion)
      ? next.delete(currentQuestion)
      : next.add(currentQuestion);
    setFlaggedQuestions(next);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    console.log("Submitting exam with answers:", answers);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    if (timeRemaining < 300) return "text-error";
    if (timeRemaining < 600) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {EXAM_DATA.courseCode} - {EXAM_DATA.subtopic}
              </h1>
              <p className="text-sm text-muted">
                Question {currentQuestion + 1} of {EXAM_DATA.totalQuestions}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 font-mono text-xl font-bold ${getTimeColor()}`}>
                <Clock size={20} />
                {formatTime(timeRemaining)}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => open(<ExitModal />)}>
                <X size={20} />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-5xl py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Question Panel */}
          <div>
            <Card className="mb-6">
              <h2 className="text-2xl font-display font-semibold mb-6">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === index
                        ? "border-primary bg-primary/5 font-semibold"
                        : "border-border hover:border-primary/50 hover:bg-surface-elevated"
                    }`}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index
                            ? "border-primary bg-primary"
                            : "border-muted"
                        }`}>
                        {answers[currentQuestion] === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-border mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFlag}
                  className={
                    flaggedQuestions.has(currentQuestion) ? "text-warning" : ""
                  }>
                  <Flag size={16} className="mr-2" />
                  {flaggedQuestions.has(currentQuestion)
                    ? "Unflag"
                    : "Flag for Review"}
                </Button>
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="secondary"
                disabled={currentQuestion === 0}
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }>
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </Button>

              <Button
                disabled={currentQuestion === EXAM_DATA.totalQuestions - 1}
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(EXAM_DATA.totalQuestions - 1, currentQuestion + 1),
                  )
                }>
                Next
                <ChevronRight size={20} className="ml-1" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {Array.from({ length: EXAM_DATA.totalQuestions }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`relative aspect-square rounded-lg border-2 font-semibold text-sm ${
                        currentQuestion === index
                          ? "border-primary bg-primary text-white scale-110"
                          : answers[index] !== null
                            ? "border-success bg-success/10 text-success"
                            : "border-border bg-surface-elevated"
                      }`}>
                      {index + 1}
                      {flaggedQuestions.has(index) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full" />
                      )}
                    </button>
                  ),
                )}
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit Exam
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
