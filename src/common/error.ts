import { isApiError, isApiSuccess, type ApiResponse } from "@/common/types/api.interface";

export class ApiRequestError extends Error {
  readonly response: ApiResponse<null>;

  constructor(response: ApiResponse<null>) {
    super(response.message);

    this.name = "ApiRequestError";
    this.response = response;
  }

  get code(): string | undefined {
    return this.response.error?.code;
  }

  get details(): unknown {
    return this.response.error?.details;
  }
}


export function unwrapApiResponse<T>(body: ApiResponse<T>): ApiResponse<T> {
  if (isApiSuccess(body)) {
    return body;
  }

  if (isApiError(body)) {
    throw new ApiRequestError(body);
  }

  throw new Error("Unknown API response shape");
}
