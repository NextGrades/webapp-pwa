import { curriculumClient } from "@/common/api/curriculum/client";
import { isApiSuccess } from "@/common/types/api.interface";
import type {
  ExerciseConfig,
  ExerciseName,
} from "@/common/types/exercise.type";
import { ExercisePageSkeleton } from "@/routes/quick-exercises/-components/ExercisePageSkeleton";
// import { ExercisePageSkeleton } from "@/routes/quick-exercises/-components/ExercisePageSkeleton";
import { ExerciseRenderer } from "@/routes/quick-exercises/-components/ExerciseRenderer";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quick-exercises/$exerciseSlug")({
  component: RouteComponent,
});

// Exercise configuration map
const exerciseConfigMap: Record<ExerciseName, ExerciseConfig> = {
  "academic-spelling": {
    name: "Academic Spelling",
    inputType: "text",
    prompt: "Listen and spell the word",
  },
  // "one-word-answer": {
  //   name: "One Word Answer",
  //   inputType: "text",
  //   prompt: "{{question}}",
  // },
  "fill-in-blank": {
    name: "Fill in the Blank",
    inputType: "text",
    prompt: "{{sentenceWithBlank}}",
  },
  // "correct-the-error": {
  //   name: "Correct the Mistake",
  //   inputType: "text",
  //   prompt: "Correct this statement: {{statement}}",
  // },
};

function RouteComponent() {
  const { exerciseSlug } = Route.useParams();
  const exercise = exerciseConfigMap[exerciseSlug as ExerciseName];

  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["quick-exercise", exerciseSlug],
    queryFn: () =>
      curriculumClient.generateQuickExercise({
        exerciseType: exerciseSlug as ExerciseName,
        count: 5,
        userId: "user-123",
        classLevel: 4,
      }),
    enabled: !!exercise,
  });

  console.log("API Response:", apiResponse);

  if (!exercise) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-semibold">Exercise not yet implemented</h1>
      </div>
    );
  }

  if (isLoading) {
    return <ExercisePageSkeleton />;
  }

  if (isError || !apiResponse || !isApiSuccess(apiResponse)) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to generate exercise.
        <button onClick={() => refetch()} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-xl py-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-bold text-foreground">{exercise.name}</h1>
        <p className="text-sm text-muted">Quick Exercise</p>
      </header>

      <div className="bg-surface rounded-2xl p-5 shadow-sm space-y-4">
        <ExerciseRenderer
          type={exerciseSlug as ExerciseName}
          data={apiResponse.data}
          onSubmit={(answers) => {
            console.log(answers);
          }}
        />
      </div>
    </div>
  );
}
