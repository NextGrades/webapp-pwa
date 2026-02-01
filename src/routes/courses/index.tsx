import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Filter, X, Plus } from "lucide-react";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { CourseCardSkeleton } from "@/components/Skeleton";
import CourseCard from "@/routes/courses/-components/CourseCard";
import { courseClient } from "@/common/api/course/client";

import { z } from "zod";

export const Route = createFileRoute("/courses/")({
  staticData: {
    showHeader: true,
  },
  validateSearch: z.object({
    page: z.number().int().positive().catch(1),
    limit: z.number().int().positive().catch(10),
  }),
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: ({ deps: { page, limit } }) =>
    courseClient.getCourseSummary(page, limit),
  component: CourseLibraryPage,
});

const FACULTIES = [
  "All",
  "Engineering",
  "Computer Science",
  "Mechanical Engineering",
  "Chemistry",
  "Physics",
  "Mathematics",
];

export default function CourseLibraryPage() {
  const courseSummary = Route.useLoaderData();
  const navigate = Route.useNavigate();
  console.log(courseSummary);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const COURSES = courseSummary.data;

  const hasAnyCourses = COURSES.length > 0;

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFaculty =
      selectedFaculty === "All" || course.field === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  const handleSuggestCourse = () => {
    console.log("Navigate to suggest course flow");
    // router.navigate({ to: "/courses/suggest" })
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-semibold text-foreground mb-3">
              Course Library
            </h1>
            <p className="text-lg text-muted">
              Browse courses, filter by faculty, and start learning
            </p>
          </div>

          {/* Persistent CTA */}
          <Button onClick={handleSuggestCourse} className="shrink-0">
            <Plus size={18} className="mr-2" />
            Suggest Course
          </Button>
        </div>

        {/* Search and Filter Bar */}
        {hasAnyCourses && (
          <div className="mb-8 flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search by course code or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden">
              <Filter size={20} className="mr-2" />
              Filters
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {hasAnyCourses && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Filter by Faculty
                </h3>
                <div className="space-y-2">
                  {FACULTIES.map((faculty) => (
                    <button
                      key={faculty}
                      onClick={() => setSelectedFaculty(faculty)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedFaculty === faculty
                          ? "bg-primary text-white font-semibold"
                          : "text-foreground hover:bg-surface-elevated"
                      }`}>
                      {faculty}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden">
              <div className="absolute inset-x-0 bottom-0 bg-surface rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    Filter by Faculty
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-surface-elevated rounded-lg">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {FACULTIES.map((faculty) => (
                    <button
                      key={faculty}
                      onClick={() => {
                        setSelectedFaculty(faculty);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedFaculty === faculty
                          ? "bg-primary-dark text-white font-semibold"
                          : "text-foreground hover:bg-surface-elevated"
                      }`}>
                      {faculty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* TRUE EMPTY STATE */}
            {!isLoading && !hasAnyCourses && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-muted" size={48} />
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  No courses yet
                </h3>

                <p className="text-muted mb-6 max-w-md mx-auto">
                  This library is built by students. Be the first to suggest a
                  course and help others learn.
                </p>

                <Button size="lg" onClick={handleSuggestCourse}>
                  <Plus size={18} className="mr-2" />
                  Suggest a Course
                </Button>
              </div>
            )}

            {/* FILTERED RESULTS */}
            {hasAnyCourses && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted">
                    {filteredCourses.length} course
                    {filteredCourses.length !== 1 ? "s" : ""} found
                  </p>

                  {selectedFaculty !== "All" && (
                    <button
                      onClick={() => setSelectedFaculty("All")}
                      className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
                      <X size={16} />
                      Clear filter
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <CourseCardSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredCourses.length > 0 ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        {...course}
                        onClick={() =>
                          navigate({
                            to: "/courses/$courseId", // or whatever your route path is
                            params: { courseId: course.id },
                          })
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-muted" size={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
