import { Link } from "@tanstack/react-router";
import { useState } from "react";

// Quick Exercises UI built from exerciseConfig, difficultyConfig, dailyFlowConfig
// Focus: fast selection, grouping, and preview before starting

const exerciseTypes = [
  { id: "academic-spelling", name: "Academic Spelling" },
  { id: "fill-in-blank", name: "Fill in the Blank" },
  { id: "one-word-answer", name: "One Word Answer" },
  { id: "correct-the-error", name: "Correct the Mistake" },
  { id: "match-terms", name: "Match the Term" },
  { id: "symbol-translation", name: "Symbol Translation" },
  { id: "sorting", name: "Sorting" },
  { id: "definition-snap", name: "Definition Snap" },
];

const dailyFlows = [
  {
    id: "primary-flow",
    label: "Primary (3–5)",
    duration: "2 mins",
    exercises: ["academic-spelling", "fill-in-blank", "match-terms"],
  },
  {
    id: "upper-primary-flow",
    label: "Primary 6",
    duration: "3 mins",
    exercises: ["academic-spelling", "correct-the-error", "one-word-answer"],
  },
  {
    id: "jss-flow",
    label: "JSS (1–3)",
    duration: "4 mins",
    exercises: [
      "academic-spelling",
      "correct-the-error",
      "symbol-translation",
      "definition-snap",
    ],
  },
];

export default function QuickExercisesUI() {
  const [selectedFlow, setSelectedFlow] = useState<
    (typeof dailyFlows)[0] | null
  >(null);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-primary-dark">
          Quick Exercises
        </h1>
        <p className="text-gray-600 text-sm">
          Short daily practice aligned with NERDC & WAEC-ready curriculum
        </p>
      </header>

      {/* ALL EXERCISES (FREE MODE) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Explore by Exercise Type</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {exerciseTypes.map((ex) => (
            <Link
              to={`/quick-exercises/$exerciseSlug`}
              params={{
                exerciseSlug: ex.id,
              }}
              key={ex.id}
              className="rounded-2xl border p-4 hover:shadow cursor-pointer">
              <h3 className="font-medium text-sm">{ex.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Quick • Auto graded</p>
            </Link>
          ))}
        </div>
      </section>

      {/* DAILY FLOWS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Choose a Daily Flow</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {dailyFlows.map((flow) => (
            <button
              key={flow.id}
              onClick={() => setSelectedFlow(flow)}
              className={`rounded-2xl p-4 text-left shadow-sm border transition hover:shadow-md ${
                selectedFlow?.id === flow.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}>
              <h3 className="font-semibold text-base">{flow.label}</h3>
              <p className="text-sm text-gray-500">⏱ {flow.duration}</p>
              <p className="text-xs text-gray-500 mt-2">
                {flow.exercises.length} exercises
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* FLOW PREVIEW */}
      {selectedFlow && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Today's Exercises</h2>

          <div className="bg-white rounded-2xl shadow p-4 space-y-3">
            {selectedFlow.exercises.map((exId, index) => {
              const ex = exerciseTypes.find((e) => e.id === exId);
              return (
                <div
                  key={exId}
                  className="flex items-center justify-between border-b last:border-none pb-2">
                  <div>
                    <p className="font-medium">
                      {index + 1}. {ex?.name}
                    </p>
                    <p className="text-xs text-gray-500">Auto-graded</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                    Quick
                  </span>
                </div>
              );
            })}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700">
            Start Quick Session ▶
          </button>
        </section>
      )}
    </div>
  );
}
