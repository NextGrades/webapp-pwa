import { useState } from "react";
import { Check, X } from "lucide-react";

export function FillInBlankExercise({
  exercises,
  instructions,
  onSubmit,
}: {
  exercises: {
    sentence_with_blank: string;
    correct_answer: string;
  }[];
  instructions: string;
  onSubmit: (answers: string[]) => void;
}) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<(boolean | null)[]>(
    Array(exercises.length).fill(null)
  );

  const handleCheck = (index: number) => {
    const userAnswer = answers[index]?.trim().toLowerCase();
    if (!userAnswer) return;

    const correct =
      userAnswer === exercises[index].correct_answer.toLowerCase();

    const copy = [...checkedAnswers];
    copy[index] = correct;
    setCheckedAnswers(copy);
  };

  const isDone = checkedAnswers.every((v) => v !== null);

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-surface rounded-xl p-4 border">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          {instructions}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {exercises.map((ex, index) => {
          const status = checkedAnswers[index];

          return (
            <div
              key={index}
              className={[
                "rounded-2xl p-4 border transition",
                status === true && "bg-green-50 border-green-400",
                status === false && "bg-red-50 border-red-400",
                status === null && "bg-background",
              ].join(" ")}>
              {/* Sentence */}
              <p className="text-sm mb-3">
                <span className="font-semibold mr-2">{index + 1}.</span>
                {ex.sentence_with_blank}
              </p>

              <div className="flex items-center gap-3">
                {/* Input */}
                <input
                  type="text"
                  disabled={status !== null}
                  placeholder="Fill in the blank"
                  className="
                    flex-1 rounded-xl border px-4 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                  "
                  onChange={(e) => {
                    const copy = [...answers];
                    copy[index] = e.target.value;
                    setAnswers(copy);
                  }}
                />

                {/* Check */}
                {status === null && (
                  <button
                    onClick={() => handleCheck(index)}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-surface">
                    Check
                  </button>
                )}
              </div>

              {/* Feedback */}
              {status === true && (
                <p className="mt-2 flex items-center gap-2 text-green-700 text-sm font-medium">
                  <Check className="w-4 h-4" /> Correct answer!
                </p>
              )}

              {status === false && (
                <p className="mt-2 flex items-center gap-2 text-red-700 text-sm font-medium">
                  <X className="w-4 h-4" />
                  Correct answer:
                  <span className="font-bold">{ex.correct_answer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Finish */}
      {isDone && (
        <button
          onClick={() => onSubmit(answers)}
          className="w-full rounded-2xl py-3 font-semibold text-white bg-primary hover:bg-primary-dark transition">
          Finish Exercise
        </button>
      )}
    </div>
  );
}
