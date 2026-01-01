import { api } from "@/common/api/axios";
import type { ApiResponse } from "@/common/types/api.interface";
import type { TeachingResponse } from "@/common/types/curriculum.types";

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
};
