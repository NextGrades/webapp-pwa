/* ---------------- PAGINATION META ---------------- */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* ---------------- CANONICAL API RESPONSE ---------------- */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  error?: {
    code: string;
    details?: unknown;
  };
}

/* ---------------- AXIOS WRAPPER ---------------- */

export type AxiosResponseWrapper<T> = {
  data: ApiResponse<T>;
};

/* ---------------- TYPE GUARDS ---------------- */

export function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true;
}

export function isApiError<T>(
  response: ApiResponse<T>,
): response is ApiResponse<T> & {
  success: false;
  data: null;
  error: { code: string; details?: unknown };
} {
  return response.success === false;
}
