import { curriculumClient } from "@/common/api/curriculum/client";
// import { ExamplesTab } from "@/routes/lesson/topics/-components/examples";
// import { ExercisesTab } from "@/routes/lesson/topics/-components/exercises";
// import { LessonHeader } from "@/routes/lesson/topics/-components/header";
// import { LearnTab } from "@/routes/lesson/topics/-components/learn";
// import { ProgressBar } from "@/routes/lesson/topics/-components/progressbar";
// import { LessonTabs } from "@/routes/lesson/topics/-components/tabs";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lesson/topics/$topicId")({
  component: LessonPage,
});

// import { useState } from "react";

function LessonPage() {
  // const [activeTab, setActiveTab] = useState<
  //   "learn" | "examples" | "exercises"
  // >("learn");
  const generateTeachingContentMutation = useMutation({
    mutationFn: curriculumClient.generateTeachingContent,
    onSuccess: (data) => {
      console.log("Server says:", data);
    },
    onError: (error) => {
      console.error("Error generating content:", error);
    },
  });

  function handleGenerate() {
    generateTeachingContentMutation.mutate({
      prompt: "Teach addition of numbers",
      userId: "1",
    });
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="border rounded-xl p-4">
        {/* Answer UI */}
        {/* <input
          className="border p-2 w-full"
          onChange={(e) => setAnswer(e.target.value)}
        /> */}

        <button
          onClick={handleGenerate}
          disabled={generateTeachingContentMutation.isPending}
          className="mt-4 px-4 py-2 bg-black text-white rounded">
          {generateTeachingContentMutation.isPending
            ? "Checking…"
            : "Verify Answer"}
        </button>

        {/* Mutation states */}
        {generateTeachingContentMutation.isSuccess && (
          <p className="text-green-600 mt-2">Submitted ✅</p>
        )}

        {generateTeachingContentMutation.isError && (
          <p className="text-red-600 mt-2">Something went wrong ❌</p>
        )}
      </div>
      {/* <LessonHeader lesson={lesson} />
      <ProgressBar progress={lesson.progress} />
      <LessonTabs activeTab={activeTab} onChange={setActiveTab} />

      <main className="max-w-4xl mx-auto p-6 lg:p-10">
        {activeTab === "learn" && <LearnTab lesson={lesson} />}
        {activeTab === "examples" && <ExamplesTab examples={examples} />}
        {activeTab === "exercises" && <ExercisesTab exercises={exercises} />}
      </main> */}
    </div>
  );
}

// const examples = [
//   {
//     id: 1,
//     title: "Factorization Method",
//     problem: "x² + 5x + 6 = 0",
//     steps: [
//       {
//         step: 1,
//         text: "Find two numbers that multiply to 6 and add to 5",
//         result: "2 and 3",
//       },
//       { step: 2, text: "Rewrite as factors", result: "(x + 2)(x + 3) = 0" },
//       {
//         step: 3,
//         text: "Set each factor to zero",
//         result: "x + 2 = 0 or x + 3 = 0",
//       },
//       { step: 4, text: "Solve for x", result: "x = -2 or x = -3" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Quadratic Formula",
//     problem: "2x² - 7x + 3 = 0",
//     steps: [
//       { step: 1, text: "Identify a, b, and c", result: "a = 2, b = -7, c = 3" },
//       { step: 2, text: "Apply formula", result: "x = (7 ± √25) / 4" },
//       { step: 3, text: "Simplify", result: "x = (7 ± 5) / 4" },
//       { step: 4, text: "Final answers", result: "x = 3 or 0.5" },
//     ],
//   },
// ];
// const exercises = [
//   {
//     id: 1,
//     type: "multiple-choice",
//     question: "Solve the equation: x² - 9 = 0",
//     options: ["x = 3 only", "x = -3 only", "x = ±3", "x = 9"],
//     correct: 2,
//   },
//   {
//     id: 2,
//     type: "fill-blank",
//     question: "If x² - 5x + 6 = 0, then x = 2 or x = ___",
//     answer: "3",
//   },
// ];

// const lesson = {
//   subject: "Mathematics",
//   topic: "Quadratic Equations",
//   grade: "SS2",
//   duration: "45 mins",
//   progress: 65,
//   objectives: [
//     "Identify quadratic equations",
//     "Solve using factorization method",
//     "Apply the quadratic formula",
//   ],
// };
