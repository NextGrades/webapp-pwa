import { ApiRequestError } from "@/common/error";

type GenericErrorProps = {
  error: unknown;
  onRetry?: () => void;
};

export function GenericErrorComponent({ error, onRetry }: GenericErrorProps) {
  /* ---------------- API / DOMAIN ERRORS ---------------- */
  if (error instanceof ApiRequestError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600">{error.message}</p>

        {error.code && (
          <p className="mt-2 text-xs text-red-500">
            Error code: <span className="font-mono">{error.code}</span>
          </p>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Retry
          </button>
        )}
      </div>
    );
  }

  /* ---------------- GENERIC JS ERRORS ---------------- */
  if (error instanceof Error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600">{error.message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded bg-gray-800 px-4 py-2 text-white">
            Retry
          </button>
        )}
      </div>
    );
  }

  /* ---------------- UNKNOWN ---------------- */
  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold text-red-700">Unexpected error</h2>
      <p className="text-sm text-red-600">An unknown error occurred.</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-gray-600 px-4 py-2 text-white">
          Retry
        </button>
      )}
    </div>
  );
}
