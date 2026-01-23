import type { ExerciseName } from "@/common/types/exercise.type";
import { AcademicSpellingExercise } from "@/routes/quick-exercises/-components/AcademicSpelling";
import { FillInBlankExercise } from "@/routes/quick-exercises/-components/FillInBlanks";

type ExerciseRendererProps = {
  type: ExerciseName;
  data: any;
  onSubmit: (payload: any) => void;
};

export function ExerciseRenderer({ type, data, onSubmit }: ExerciseRendererProps) {
  switch (type) {
    case "academic-spelling":
      return (
        <AcademicSpellingExercise
          exercises={data.exercises}
          instructions={data.instructions}
          onSubmit={onSubmit}
        />
      );

    case "fill-in-blank":
      return (
        <FillInBlankExercise
          exercises={data.exercises}
          instructions={data.instructions}
          onSubmit={onSubmit}
        />
      );

    default:
      return (
        <p className="text-sm text-muted">
          Unsupported exercise type
        </p>
      );
  }
}
