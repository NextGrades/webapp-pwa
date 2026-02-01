import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params: { courseId } }) => courseClient.getCourseDetails(courseId),
  component: CourseDetailPage,
  staticData: {
    showHeader: true,
    header: {
      center: <div>Course Data</div>,
    },
  },
});

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Target,
  MessageCircle,
  CheckCircle,
  Users,
} from "lucide-react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import ProgressBar from "@/components/Progress";
import Badge from "@/components/Badge";
import type { ExamFrequency } from "@/common/types/course.types";
import { courseClient } from "@/common/api/course/client";

function CourseDetailPage() {
  const data = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const course = data.data;

  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>(null);

  // Simulated auth state (replace later with real session/user context)
  const isLoggedIn = false;

  const toggleSubtopic = (id: string) => {
    setExpandedSubtopic((prev) => (prev === id ? null : id));
  };

  const formatFrequency = (f: ExamFrequency) =>
    f.charAt(0).toUpperCase() + f.slice(1);

  const getFrequencyColor = (frequency: ExamFrequency) => {
    switch (frequency) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background py-4 sm:py-6 lg:py-8">
      <div className="container max-w-5xl px-3 sm:px-4 lg:px-6">
        {/* Course Header */}
        <Card className="mb-6 sm:mb-8" variant="primary">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-1 sm:mb-2 break-words">
                    {course.code}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-muted break-words">
                    {course.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                {course.isActive && (
                  <Badge variant="success">
                    <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                    Active in syllabus
                  </Badge>
                )}

                <div className="flex items-center gap-1.5 sm:gap-2 text-muted">
                  <Users size={14} className="sm:w-4 sm:h-4" />
                  <span>Level {course.level}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-muted flex-wrap">
                  <span className="whitespace-nowrap">
                    {course.creditUnits} Credit Units
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">
                    Semester {course.semester}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar (Logged-in users only) */}
          {isLoggedIn && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
              <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">
                Your Progress
              </h3>

              {/* Example progress: % of active subtopics expanded/completed later */}
              <ProgressBar
                progress={
                  course.subtopics.length
                    ? Math.round(
                        (course.subtopics.filter((s) => s.isActive).length /
                          course.subtopics.length) *
                          100,
                      )
                    : 0
                }
              />
            </div>
          )}
        </Card>

        {/* Subtopics Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 sm:mb-6 px-1">
            Course Subtopics
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {course.subtopics
              .sort((a, b) => a.teachingOrder - b.teachingOrder)
              .map((subtopic) => (
                <Card
                  key={subtopic.id}
                  className={`transition-all ${
                    expandedSubtopic === subtopic.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}>
                  {/* Subtopic Header */}
                  <button
                    onClick={() => toggleSubtopic(subtopic.id)}
                    className="w-full flex items-start justify-between gap-3 sm:gap-4 text-left">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="mt-0.5 sm:mt-1 shrink-0">
                        {expandedSubtopic === subtopic.id ? (
                          <ChevronDown className="text-primary w-5 h-5 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronRight className="text-muted w-5 h-5 sm:w-5 sm:h-5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">
                            {subtopic.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-muted mb-2 sm:mb-3 break-words">
                          {subtopic.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <Badge
                            variant={getFrequencyColor(subtopic.examFrequency)}>
                            <span className="text-xs">
                              Exam Frequency:{" "}
                              {formatFrequency(subtopic.examFrequency)}
                            </span>
                          </Badge>

                          <span className="text-xs sm:text-sm text-muted whitespace-nowrap">
                            {subtopic.prerequisites.length} prerequisites
                          </span>

                          {subtopic.isActive && (
                            <Badge variant="success">
                              <span className="text-xs">Active</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content - Mode Selection */}
                  {expandedSubtopic === subtopic.id && (
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                      <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4 px-1">
                        Choose how you want to study this subtopic:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Exam Mode */}
                        <button
                          className="group bg-surface-elevated hover:bg-primary/5 border-2 border-border hover:border-primary rounded-lg p-4 sm:p-6 transition-all text-left"
                          onClick={() =>
                            console.log(`Start exam mode for ${subtopic.id}`)
                          }>
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors shrink-0">
                              <Target className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                            </div>

                            <h4 className="text-base sm:text-lg font-semibold text-foreground">
                              Exam Mode
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-muted">
                            Practice with timed questions and track your
                            performance
                          </p>
                        </button>

                        {/* Mini Tutor Mode */}
                        <button
                          className="group bg-surface-elevated hover:bg-accent/5 border-2 border-border hover:border-accent rounded-lg p-4 sm:p-6 transition-all text-left"
                          onClick={() =>
                            navigate({
                              to: "/tutor", // or whatever your route path is
                              params: { courseId: course.id },
                            })
                          }>
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 group-hover:bg-accent/20 rounded-full flex items-center justify-center transition-colors shrink-0">
                              <MessageCircle className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
                            </div>

                            <h4 className="text-base sm:text-lg font-semibold text-foreground">
                              Mini Tutor
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-muted">
                            Get instant help and explanations from AI
                          </p>
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 sm:gap-4 px-1">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Back to Courses
          </Button>
        </div>
      </div>
    </div>
  );
}
