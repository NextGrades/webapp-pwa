import { useState } from "react";
import { Volume2, Loader2, Check, X } from "lucide-react";
import { API_BASE_URL } from "@/common/api/axios";

export function AcademicSpellingExercise({
  exercises,
  instructions,
  onSubmit,
}: {
  exercises: {
    word: string;
  }[];
  instructions: string;
  onSubmit: (answers: string[]) => void;
}) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [checkedAnswers, setCheckedAnswers] = useState<(boolean | null)[]>(
    Array(exercises.length).fill(null)
  );

  const playWord = (word: string, index: number) => {
    const audio = new Audio(
      `${API_BASE_URL}/audio/speak?text=${encodeURIComponent(word)}`
    );

    setPlayingIndex(index);
    audio.onended = () => setPlayingIndex(null);
    audio.onerror = () => setPlayingIndex(null);
    audio.play();
  };

  const handleCheck = (index: number) => {
    const userAnswer = answers[index]?.trim().toLowerCase();
    if (!userAnswer) return;

    const isCorrect = userAnswer === exercises[index].word.toLowerCase();
    const copy = [...checkedAnswers];
    copy[index] = isCorrect;
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

      {/* Exercises */}
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
              <div className="flex items-center gap-4">
                {/* Number */}
                <div className="text-sm font-semibold text-muted">
                  {index + 1}.
                </div>

                {/* Play */}
                <button
                  onClick={() => playWord(ex.word, index)}
                  className="shrink-0 flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark">
                  {playingIndex === index ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  Play
                </button>

                {/* Input */}
                <input
                  type="text"
                  disabled={status !== null}
                  placeholder="Type what you hear"
                  className="flex-1 rounded-xl border px-4 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30
                    disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  <Check className="w-4 h-4" /> Correct spelling!
                </p>
              )}

              {status === false && (
                <p className="mt-2 flex items-center gap-2 text-red-700 text-sm font-medium">
                  <X className="w-4 h-4" />
                  Incorrect — correct spelling:
                  <span className="font-bold">{ex.word}</span>
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
          className="w-full rounded-2xl py-3 font-semibold text-white bg-primary hover:bg-primary-dark">
          Finish Exercise
        </button>
      )}
    </div>
  );
}
