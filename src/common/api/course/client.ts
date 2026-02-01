import { api } from "@/common/api/axios";
import { ApiRequestError } from "@/common/error";
import {
  isApiError,
  isApiSuccess,
  type ApiResponse,
  type ApiSuccessResponse,
} from "@/common/types/api.interface";
import type {
  CourseData,
  CourseSummary,
  CourseTutorResponse,
  FollowUpAIResponse,
  GenerateTeachingResponse,
} from "@/common/types/course.types";
import type { QuickExerciseData } from "@/common/types/exercise.type";

function unwrapApiResponse<T>(body: ApiResponse<T>): ApiSuccessResponse<T> {
  if (isApiSuccess(body)) {
    return body;
  }

  if (isApiError(body)) {
    throw new ApiRequestError(body);
  }

  throw new Error("Unknown API response shape");
}

export const courseClient = {
  async generateTeachingContent(input: {
    topicId: string;
    userId: string;
  }): Promise<ApiSuccessResponse<GenerateTeachingResponse>> {
    const res = await api.post<ApiResponse<GenerateTeachingResponse>>(
      "/agent/teach",
      input,
    );

    return unwrapApiResponse(res.data);
  },

  async getJobData(
    jobId: string,
  ): Promise<ApiSuccessResponse<CourseTutorResponse>> {
    const res = await api.get<ApiResponse<CourseTutorResponse>>(
      `/agent/exercise-queue/${jobId}`,
    );
    console.log(res.data);
    return unwrapApiResponse(res.data);
  },

  async askFollowUpQuestion(input: {
    question: string;
    conversationId: string;
    userId: string;
  }): Promise<ApiSuccessResponse<FollowUpAIResponse>> {
    const res = await api.post<ApiResponse<FollowUpAIResponse>>(
      "/agent/ask",
      input,
    );

    return unwrapApiResponse(res.data);
  },
  async getCourseSummary(
    page: number,
    limit: number,
  ): Promise<ApiSuccessResponse<CourseSummary[]>> {
    const res = await api.get<ApiResponse<CourseSummary[]>>(
      "/academics/courses",
      {
        params: { page, limit },
      },
    );

    return unwrapApiResponse(res.data);
  },

  async getCourseDetails(id: string): Promise<ApiSuccessResponse<CourseData>> {
    const res = await api.get<ApiResponse<CourseData>>(
      `/academics/courses/id/${id}`,
    );

    return unwrapApiResponse(res.data);
  },

  async generateQuickExercise(input: {
    exerciseType: string;
    count: number;
    userId: string;
    classLevel: number;
    threadId?: string;
  }): Promise<ApiSuccessResponse<QuickExerciseData>> {
    const res = await api.post<ApiResponse<QuickExerciseData>>(
      "/agent/exercise/quick",
      input,
    );

    return unwrapApiResponse(res.data);
  },
};
