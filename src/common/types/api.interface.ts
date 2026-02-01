// Generic success response wrapper
interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Error response from NestJS
interface ApiErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  response: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
}

// Union type for API responses
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

type AxiosResponseWrapper<T> = { data: ApiResponse<T> };

// Type guard to check if response is successful
function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> {
  return "success" in response && response.success === true;
}

// Type guard to check if response is an error
function isApiError<T>(response: ApiResponse<T>): response is ApiErrorResponse {
  return "statusCode" in response && "response" in response;
}

export type {
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  AxiosResponseWrapper,
};

export { isApiSuccess, isApiError };
