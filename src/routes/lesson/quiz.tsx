import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, BookOpen, ArrowLeft, Target } from "lucide-react";

export const Route = createFileRoute("/lesson/quiz")({
  component: LessonPage,
});

interface Step {
  step: number;
  text: string;
  result: string;
}

interface Example {
  id: number;
  title: string;
  problem: string;
  steps: Step[];
}

interface MultipleChoiceExercise {
  id: number;
  type: "multiple-choice";
  question: string;
  options: string[];
  correct: number;
}

interface FillBlankExercise {
  id: number;
  type: "fill-blank";
  question: string;
  answer: string;
}

type Exercise = MultipleChoiceExercise | FillBlankExercise;

function LessonPage() {
  const [activeTab, setActiveTab] = useState<
    "learn" | "examples" | "exercises"
  >("learn");
  const [currentExample, setCurrentExample] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number | string>
  >({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  console.log(showResults);

  const lesson = {
    subject: "Mathematics",
    topic: "Quadratic Equations",
    grade: "SS2",
    duration: "45 mins",
    progress: 65,
    objectives: [
      "Identify quadratic equations",
      "Solve using factorization method",
      "Apply the quadratic formula",
    ],
  };

  const examples: Example[] = [
    {
      id: 1,
      title: "Factorization Method",
      problem: "x² + 5x + 6 = 0",
      steps: [
        {
          step: 1,
          text: "Find two numbers that multiply to 6 and add to 5",
          result: "2 and 3",
        },
        { step: 2, text: "Rewrite as factors", result: "(x + 2)(x + 3) = 0" },
        {
          step: 3,
          text: "Set each factor to zero",
          result: "x + 2 = 0 or x + 3 = 0",
        },
        { step: 4, text: "Solve for x", result: "x = -2 or x = -3" },
      ],
    },
    {
      id: 2,
      title: "Quadratic Formula",
      problem: "2x² - 7x + 3 = 0",
      steps: [
        {
          step: 1,
          text: "Identify a, b, and c",
          result: "a = 2, b = -7, c = 3",
        },
        { step: 2, text: "Apply formula", result: "x = (7 ± √25) / 4" },
        { step: 3, text: "Simplify", result: "x = (7 ± 5) / 4" },
        { step: 4, text: "Final answers", result: "x = 3 or 0.5" },
      ],
    },
  ];

  const exercises: Exercise[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "Solve the equation: x² - 9 = 0",
      options: ["x = 3 only", "x = -3 only", "x = ±3", "x = 9"],
      correct: 2,
    },
    {
      id: 2,
      type: "fill-blank",
      question: "If x² - 5x + 6 = 0, then x = 2 or x = ___",
      answer: "3",
    },
  ];

  const handleAnswerSelect = (id: number, value: number | string) => {
    setSelectedAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswer = (id: number) => {
    setShowResults((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Neutral Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {lesson.subject}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {lesson.grade}
              </span>
            </div>
            <h1 className="text-xl font-black text-black">{lesson.topic}</h1>
          </div>
        </div>
      </header>

      {/* Progress Bar - Minimalist Blue */}
      <div className="h-1 bg-gray-100 w-full overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${lesson.progress}%`,
            backgroundColor: "var(--blue-main)",
          }}
        />
      </div>

      {/* Modern Tabs - Pill Style */}
      <nav className="flex justify-center p-4 border-b bg-gray-50/50">
        <div className="flex p-1 bg-gray-200/50 rounded-xl gap-1">
          {(["learn", "examples", "exercises"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
                ${activeTab === tab ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}
              `}>
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 lg:p-10">
        {activeTab === "learn" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <section>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={16} /> Objectives
              </h2>
              <div className="grid gap-3">
                {lesson.objectives.map((objective, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-700 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {objective}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen size={16} /> Key Formula
              </h2>
              <div className="p-8 rounded-2xl border border-gray-100 bg-white text-center shadow-sm">
                <p className="text-xs text-gray-400 uppercase font-bold mb-4 tracking-widest">
                  Standard Quadratic Form
                </p>
                <div className="text-3xl font-mono text-black tracking-tighter">
                  ax² + bx + c = 0
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-6">
            <div className="flex gap-2 mb-8">
              {examples.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentExample(i)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all border ${
                    currentExample === i
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}>
                  Example 0{i + 1}
                </button>
              ))}
            </div>

            <div className="border border-gray-100 rounded-3xl p-8 bg-white shadow-sm">
              <h3 className="text-2xl font-black mb-2">
                {examples[currentExample].title}
              </h3>
              <div className="inline-block px-3 py-1 rounded-md bg-gray-100 font-mono text-sm mb-8 text-gray-600">
                {examples[currentExample].problem}
              </div>

              <div className="space-y-6">
                {examples[currentExample].steps.map((s) => (
                  <div key={s.step} className="flex gap-4 group">
                    <span className="text-gray-300 font-black text-xl tabular-nums">
                      0{s.step}
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">
                        {s.text}
                      </p>
                      <p className="font-mono text-lg font-bold text-black">
                        {s.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "exercises" && (
          <div className="grid gap-6 md:grid-cols-1">
            {exercises.map((ex, idx) => (
              <div
                key={ex.id}
                className="border border-gray-100 rounded-2xl p-6 bg-white transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-lg text-black">{ex.question}</p>
                </div>

                <div className="space-y-2 mb-6">
                  {ex.type === "multiple-choice" ? (
                    ex.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswerSelect(ex.id, i)}
                        className={`w-full text-left p-4 rounded-xl border transition-all font-medium ${
                          selectedAnswers[ex.id] === i
                            ? "border-black bg-black text-white"
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        }`}>
                        {opt}
                      </button>
                    ))
                  ) : (
                    <input
                      placeholder="Type your answer here..."
                      className="w-full p-4 rounded-xl border border-gray-100 focus:border-black focus:ring-0 transition-all font-mono"
                      onChange={(e) =>
                        handleAnswerSelect(ex.id, e.target.value)
                      }
                    />
                  )}
                </div>

                <button
                  onClick={() => checkAnswer(ex.id)}
                  style={{ backgroundColor: "var(--blue-main)" }}
                  className="w-full py-4 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                  Verify Answer
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
