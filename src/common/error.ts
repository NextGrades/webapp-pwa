import type { ApiErrorResponse } from "@/common/types/api.interface";

export class ApiRequestError extends Error {
  readonly payload: ApiErrorResponse;

  constructor(payload: ApiErrorResponse) {
    super(
      Array.isArray(payload.response.message)
        ? payload.response.message.join(", ")
        : payload.response.message,
    );

    this.name = "ApiRequestError";
    this.payload = payload;
  }
}
