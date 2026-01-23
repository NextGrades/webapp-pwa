import { Skeleton } from "@/components/Skeleton";

export function ExercisePageSkeleton() {
  return (
    <div className="container max-w-xl py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Exercise Card */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm space-y-4">
        <Skeleton className="h-4 w-3/4" />

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-background rounded-xl p-3 border space-y-2"
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}

        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
