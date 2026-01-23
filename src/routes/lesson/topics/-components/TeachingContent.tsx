import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, Lightbulb, Target, CheckCircle2 } from "lucide-react";
import type { TeachingResponse } from "@/common/types/curriculum.types";

export function TeachingContent({ data }: { data: TeachingResponse }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-linear-to-br from-primary to-primary-dark p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white">{data.topic}</h1>
        <p className="mt-1 text-sm text-blue-100">
          Class {data.class_level} · Age {data.learner_age}
        </p>
      </div>

      {/* Explanation - Main lesson content */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Lesson</h2>
        </div>

        {/* Standard markdown prose styling */}
        <div
          className="prose prose-gray max-w-none
          prose-headings:text-gray-800 
          prose-p:text-gray-700 
          prose-strong:text-gray-900 
          prose-li:text-gray-700
          prose-pre:bg-gray-50 
          prose-pre:border 
          prose-pre:border-gray-200
          prose-pre:rounded-xl
          prose-code:before:content-none 
          prose-code:after:content-none
          prose-code:bg-gray-100
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:text-gray-800
          prose-code:font-normal
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.explanation}
          </ReactMarkdown>
        </div>
      </div>

      {/* Examples */}
      <Section
        title="Examples"
        icon={<Lightbulb size={20} className="text-amber-500" />}
        bgColor="bg-amber-50"
        borderColor="border-amber-100">
        <div className="space-y-2">
          {data.examples.map((ex, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-amber-200">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-medium">
                {i + 1}
              </span>
              <div className="text-gray-700 prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{ex}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section
        title="Key Takeaways"
        icon={<CheckCircle2 size={20} className="text-emerald-500" />}
        bgColor="bg-emerald-50"
        borderColor="border-emerald-100">
        <div className="space-y-2">
          {data.key_takeaways.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-emerald-200">
              <CheckCircle2
                size={18}
                className="text-emerald-500 flex-shrink-0 mt-0.5"
              />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Covered Objectives */}
      <Section
        title="Covered Objectives"
        icon={<Target size={20} className="text-purple-500" />}
        bgColor="bg-purple-50"
        borderColor="border-purple-100">
        <div className="space-y-2">
          {data.covered_objectives.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-purple-200">
              <Target
                size={18}
                className="text-purple-500 flex-shrink-0 mt-0.5"
              />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  icon,
  bgColor,
  borderColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl p-5 ${bgColor} ${borderColor} border`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}
