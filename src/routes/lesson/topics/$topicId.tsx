import { curriculumClient } from "@/common/api/curriculum/client";
import { isApiSuccess } from "@/common/types/api.interface";
import { TeachingContent } from "@/routes/lesson/topics/-components/TeachingContent";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lesson/topics/$topicId")({
  component: LessonPage,
});


function LessonPage() {
  const generateTeachingContentMutation = useMutation({
    mutationFn: curriculumClient.generateTeachingContent,
  });

  function handleGenerate() {
    generateTeachingContentMutation.mutate({
      prompt: `Teach addition for Primary 5 pupils using the NERDC curriculum.
Explain step by step and include examples for:
- multi-digit whole numbers
- fractions or decimals where applicable
`,
      userId: "1",
    });
  }

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-foreground)">
      <div className="container py-8 space-y-6">
        {/* Action Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Generate Lesson on Addition for class 5</h2>
            <p className="text-sm text-(--color-muted)">
              AI-generated structured teaching content
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generateTeachingContentMutation.isPending}
            className="px-5 py-2 rounded-xl bg-(--color-primary) text-white font-medium hover:bg-(--color-primary-dark) disabled:opacity-60">
            {generateTeachingContentMutation.isPending
              ? "Generating…"
              : "Generate"}
          </button>
        </div>

        {/* Loading */}
        {generateTeachingContentMutation.isPending && (
          <div className="rounded-2xl bg-(--color-surface) p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        )}

        {/* Error */}
        {generateTeachingContentMutation.isError && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">
            Something went wrong while generating content.
          </div>
        )}

        {/* Success */}
        {generateTeachingContentMutation.isSuccess &&
          isApiSuccess(generateTeachingContentMutation.data) && (
            <TeachingContent data={generateTeachingContentMutation.data.data} />
          )}

        {/* <TeachingContent data={staticData} /> */}
      </div>
    </div>
  );
}
