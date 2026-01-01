import {
  API_BASE_URL,
  isApiError,
  isApiSuccess,
  type ApiResponse,
} from "@/common/api/api.interface";
import type { Subject } from "@/features/curriculum/curriculum.types";
import { createFileRoute, Link } from "@tanstack/react-router";

async function fetchSubjects(): Promise<Subject[]> {
  const response = await fetch(`${API_BASE_URL}/curriculum/subjects`);
  const result: ApiResponse<Subject[]> = await response.json();

  if (!response.ok || !isApiSuccess(result)) {
    // Handle error response
    if (isApiError(result)) {
      const messages = Array.isArray(result.response.message)
        ? result.response.message.join(", ")
        : result.response.message;
      throw new Error(messages);
    }
    throw new Error("An unknown error occurred");
  }

  return result.data;
}

export const Route = createFileRoute("/lesson/subjects/")({
  component: SubjectPage,
  loader: () => fetchSubjects(),
  errorComponent: ({ error }) => {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  },
});

import { ChevronRight } from "lucide-react";

function SubjectPage() {
  const subjectData = Route.useLoaderData();

  console.log(subjectData);
  return (
    <div className="min-h-screen container font-sans mt-6">
      {/* Header */}
      <header className="mb-10">
        <h1
          className="text-3xl font-bold mb-2 "
          style={{ color: "var(--blue-dark)" }}>
          Your Subjects
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Select a subject to continue your learning journey.
        </p>
      </header>

      {/* Subject Grid */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
        {subjectData.map((subject) => (
          <Link
            to="/lesson/subjects/$subjectId"
            params={{
              subjectId: subject.id.toString(),
            }}
            key={subject.id}
            className="flex items-center justify-between p-6 transition-all border rounded-2xl group hover:shadow-lg text-left"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "transparent",
            }}>
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl text-white"
                style={{ backgroundColor: "var(--blue-main)" }}></div>

              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {subject.name}
                </h3>
              </div>
            </div>

            <ChevronRight
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              style={{ color: "var(--muted)" }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
