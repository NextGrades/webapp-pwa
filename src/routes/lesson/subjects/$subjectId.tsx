import {
  type ApiResponse,
  isApiSuccess,
  isApiError,
} from "@/common/api/api.interface";
import type { Topic } from "@/features/curriculum/curriculum.types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Target, Layers } from "lucide-react";

// Helper to group topics by Theme Name
const groupTopicsByTheme = (topics: Topic[]): Record<string, Topic[]> => {
  return topics.reduce((acc, topic) => {
    const themeName = topic.subTheme.theme.name;
    if (!acc[themeName]) acc[themeName] = [];
    acc[themeName].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);
};

async function fetchTopics(
  subjectId: number,
  classLevel: number
): Promise<Topic[]> {
  const params = new URLSearchParams({
    subject_id: subjectId.toString(),
    class_level: classLevel.toString(),
  });

  const response = await fetch(
    `http://localhost:7500/api/v1/curriculum/topics?${params}`
  );
  const result: ApiResponse<Topic[]> = await response.json();

  if (!response.ok || !isApiSuccess(result)) {
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

export const Route = createFileRoute("/lesson/subjects/$subjectId")({
  component: SubjectDetailComponent,
  loader: async ({ params }) => {
    return fetchTopics(Number(params.subjectId), 4);
  },
});

function SubjectDetailComponent() {
  const topics = Route.useLoaderData();
  const groupedThemes = groupTopicsByTheme(topics);
  
  const subjectName = topics[0]?.subTheme.theme.subject.name || "Subject";
  const classLevel = topics[0]?.subTheme.theme.classLevel.name || "Primary";

  return (
    <div className="min-h-screen pb-20 font-sans bg-white text-black">
      {/* Hero Header - Clean & Neutral */}
      <div className="p-6 md:p-10 border-b bg-gray-50" style={{ borderColor: 'var(--white-soft)' }}>
        <div className="max-w-5xl mx-auto">
          <Link 
            to="/lesson/subjects" 
            className="flex items-center gap-2 text-sm font-medium mb-4 hover:text-black transition-colors"
            style={{ color: 'var(--muted)' }} // Muted gray back button
          >
            <ArrowLeft size={16} /> Back to Subjects
          </Link>
          
          <h1 className="text-4xl font-black mb-2 text-black">
            {subjectName}
          </h1>
          <p className="text-lg text-gray-600">
            {classLevel} Curriculum • {topics.length} Topics found
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 mt-8">
        {Object.entries(groupedThemes).map(([themeName, themeTopics]) => (
          <section key={themeName} className="mb-12">
            {/* Theme Heading - Blue used only as a small accent mark */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: 'var(--blue-main)' }} />
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                {themeName}
              </h2>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {themeTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="group relative flex flex-col p-5 rounded-xl border border-gray-200 transition-all hover:border-blue-400 hover:shadow-md bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-600">
                      Topic {topic.name.includes('.') ? topic.name.split('.')[0] : topic.id}
                    </span>
                    <div className="text-gray-300 group-hover:text-blue-600 transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  {/* Topic Title - Pure Black */}
                  <h3 className="text-lg font-bold mb-4 pr-8 text-black leading-tight">
                    {topic.name.includes('.') ? topic.name.split('. ')[1] : topic.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <Target size={14} className="text-gray-400" />
                      <span>{Math.max(0, topic.performanceObjectives.length - 1)} Objectives</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <Layers size={14} className="text-gray-400" />
                      <span className="truncate max-w-[150px]">{topic.subTheme.name}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/lesson/topics/$topicId" 
                    params={{ topicId: topic.id.toString() }}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${topic.name}`}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}