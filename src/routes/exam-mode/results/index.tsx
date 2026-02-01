import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exam-mode/results/")({
  component: ExamResultsPage,
});

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Award,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Button from "@/components/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";

// Dummy results data
const RESULTS = {
  score: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  timeTaken: "18:32",
  breakdown: {
    "Circuit Analysis": { correct: 3, total: 3 },
    "AC Theory": { correct: 3, total: 5 },
    Transistors: { correct: 2, total: 2 },
  },
};

const QUESTION_REVIEW = [
  {
    id: "1",
    question: "What is Ohm's Law?",
    userAnswer: "V = I × R",
    correctAnswer: "V = I × R",
    isCorrect: true,
    explanation:
      "Correct! Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R). This is one of the fundamental laws of electrical circuits.",
    difficulty: "Easy",
    subtopic: "Circuit Analysis",
  },
  {
    id: "2",
    question: "In a series circuit, the total resistance is:",
    userAnswer: "The sum of all resistances",
    correctAnswer: "The sum of all resistances",
    isCorrect: true,
    explanation:
      "Correct! In a series circuit, resistances add up: R_total = R1 + R2 + R3 + ...",
    difficulty: "Medium",
    subtopic: "Circuit Analysis",
  },
  {
    id: "3",
    question:
      "What is the RMS value of a sinusoidal voltage with peak value 100V?",
    userAnswer: "100V",
    correctAnswer: "70.7V",
    isCorrect: false,
    explanation:
      "The RMS (Root Mean Square) value of a sinusoidal voltage is the peak value divided by √2. So: RMS = 100V / √2 ≈ 70.7V. The RMS value represents the equivalent DC voltage that would deliver the same power.",
    difficulty: "Hard",
    subtopic: "AC Theory",
  },
  // Add more questions...
];

export default function ExamResultsPage() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const filteredQuestions = showOnlyIncorrect
    ? QUESTION_REVIEW.filter((q) => !q.isCorrect)
    : QUESTION_REVIEW;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-5xl">
        {/* Score Summary */}
        <div className="text-center mb-8">
          {RESULTS.score >= 90 ? (
            <div className="mb-4">
              <div className="text-6xl">🎉</div>
              <p className="text-lg text-accent font-semibold mt-2">
                Excellent Work!
              </p>
            </div>
          ) : RESULTS.score >= 70 ? (
            <div className="mb-4">
              <div className="text-6xl">✨</div>
              <p className="text-lg text-success font-semibold mt-2">
                Great Job!
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <div className="text-6xl">💪</div>
              <p className="text-lg text-warning font-semibold mt-2">
                Keep Practicing!
              </p>
            </div>
          )}

          <h1 className="text-6xl font-display font-bold text-primary-dark mb-4">
            {RESULTS.score}%
          </h1>
          <p className="text-xl text-muted">
            {RESULTS.correctAnswers} out of {RESULTS.totalQuestions} correct
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={() => console.log("Retake exam")}>
            <RotateCcw size={20} className="mr-2" />
            Retake Exam
          </Button>
          <Button
            variant="secondary"
            onClick={() => console.log("Back to course")}>
            Back to Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="text-success" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {RESULTS.correctAnswers}
                </p>
                <p className="text-sm text-muted">Correct</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                <XCircle className="text-error" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {RESULTS.incorrectAnswers}
                </p>
                <p className="text-sm text-muted">Incorrect</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="text-accent" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {RESULTS.timeTaken}
                </p>
                <p className="text-sm text-muted">Time Taken</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {RESULTS.score}%
                </p>
                <p className="text-sm text-muted">Score</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Breakdown by Subtopic */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Performance by Subtopic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(RESULTS.breakdown).map(([subtopic, data]) => {
                const percentage = Math.round(
                  (data.correct / data.total) * 100,
                );
                return (
                  <div key={subtopic}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">
                        {subtopic}
                      </span>
                      <span className="text-sm text-muted">
                        {data.correct}/{data.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          percentage >= 80
                            ? "bg-success"
                            : percentage >= 60
                              ? "bg-warning"
                              : "bg-error"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Question Review
            </h2>
            <button
              onClick={() => setShowOnlyIncorrect(!showOnlyIncorrect)}
              className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                showOnlyIncorrect
                  ? "border-error bg-error/10 text-error"
                  : "border-border text-muted hover:border-error hover:text-error"
              }`}>
              {showOnlyIncorrect ? "Show All" : "Show Only Incorrect"}
            </button>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <Card
                key={q.id}
                className={`border-l-4 ${
                  q.isCorrect ? "border-l-success" : "border-l-error"
                }`}>
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full text-left">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {q.isCorrect ? (
                        <CheckCircle className="text-success" size={24} />
                      ) : (
                        <XCircle className="text-error" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {q.question}
                        </h3>
                        {expandedQuestion === q.id ? (
                          <ChevronUp
                            className="text-muted flex-shrink-0"
                            size={20}
                          />
                        ) : (
                          <ChevronDown
                            className="text-muted flex-shrink-0"
                            size={20}
                          />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                        <span className="text-sm text-muted">{q.subtopic}</span>
                      </div>
                    </div>
                  </div>
                </button>

                {expandedQuestion === q.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-muted mb-1">
                        Your Answer:
                      </p>
                      <p
                        className={`font-medium ${
                          q.isCorrect ? "text-success" : "text-error"
                        }`}>
                        {q.userAnswer}
                      </p>
                    </div>

                    {!q.isCorrect && (
                      <div>
                        <p className="text-sm font-semibold text-muted mb-1">
                          Correct Answer:
                        </p>
                        <p className="font-medium text-success">
                          {q.correctAnswer}
                        </p>
                      </div>
                    )}

                    <div className="bg-surface-elevated rounded-lg p-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Explanation:
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => console.log("Retake exam")} size="lg">
            <RotateCcw size={20} className="mr-2" />
            Retake Exam
          </Button>
        </div>
      </div>
    </div>
  );
}
