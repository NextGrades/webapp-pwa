import { api } from "@/common/api/axios";
import type { ApiResponse } from "@/common/types/api.interface";
import type { TeachingResponse } from "@/common/types/curriculum.types";
import type { QuickExerciseData } from "@/common/types/exercise.type";

export const curriculumClient = {
  async generateTeachingContent(input: {
    prompt: string;
    userId: string;
  }): Promise<ApiResponse<TeachingResponse>> {
    const res = await api.post<ApiResponse<TeachingResponse>>("/agent/teach", {
      prompt: input.prompt,
      userId: input.userId,
    });

    return res.data;
  },

  async generateQuickExercise(input: {
    exerciseType: string;
    count: number;
    userId: string;
    classLevel: number;
    threadId?: string;
  }): Promise<ApiResponse<QuickExerciseData>> {
    const res = await api.post<ApiResponse<QuickExerciseData>>(
      "/agent/exercise/quick",
      {
        exerciseType: input.exerciseType,
        count: input.count,
        userId: input.userId,
        classLevel: input.classLevel,
        threadId: input.threadId,
      },
    );

    return res.data;
  },
};
