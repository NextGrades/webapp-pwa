import Button from "@/components/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/Card";
import UnifiedInstallPrompt from "@/components/InstallPrompt";
import ProgressBar from "@/components/Progress";
import { createFileRoute } from "@tanstack/react-router";

import {
  TrendingUp,
  Clock,
  Award,
  Flame,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Badge from "@/components/Badge"; // your Badge component

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

// --------------------------------------------------
// Dummy Data
// --------------------------------------------------

const USER_DATA = {
  name: "Sarah",
  streak: 3,
  totalQuestionsAnswered: 287,
  averageScore: 78,
  studyTimeThisWeek: "4.5 hours",
};

const RECENT_COURSES = [
  {
    id: "1",
    courseCode: "EEE211",
    courseName: "Electrical Engineering",
    progress: 67,
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    courseCode: "CSC201",
    courseName: "Data Structures",
    progress: 85,
    lastAccessed: "Yesterday",
  },
  {
    id: "3",
    courseCode: "MEC301",
    courseName: "Thermodynamics",
    progress: 42,
    lastAccessed: "3 days ago",
  },
];

const WEEKLY_SCORES = [65, 72, 78, 75, 81, 79, 85];

const RECOMMENDATIONS = [
  {
    id: "1",
    message: `Focus on "AC Theory" - your average is 60%`,
    action: "Practice now",
    variant: "warning" as const,
  },
  {
    id: "2",
    message: `Try 10 questions in "Transistor Basics"`,
    action: "Start practice",
    variant: "info" as const,
  },
];

// --------------------------------------------------
// Component
// --------------------------------------------------

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl space-y-12">
        {/* Welcome Header */}
        <header className="p-4 rounded-2xl flex flex-col bg-primary text-white gap-6">
          <div>
            <div>
              <h2 className="font-medium font-display text-4xl mb-2">
                Welcome back, {USER_DATA.name}!,
              </h2>
              <div className="flex items-center gap-2 text-accent">
                <Flame size={20} />
                <span className="font-semibold text-lg">
                  {USER_DATA.streak}-day streak
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Continue Learning Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_COURSES.map((course) => (
              <Card
                key={course.id}
                hover
                onClick={() => console.log(`Continue ${course.courseCode}`)}>
                <CardHeader>
                  <CardTitle className="text-xl">{course.courseCode}</CardTitle>
                  <CardDescription>{course.courseName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ProgressBar progress={course.progress} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                      {course.lastAccessed}
                    </span>
                    <Button
                      size="sm"
                      className="text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Continue ${course.courseCode}`);
                      }}>
                      Continue <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            This Week's Performance
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<BookOpen className="text-primary" size={24} />}
              bgColor="bg-primary/10"
              value="45"
              label="Questions answered"
            />
            <StatsCard
              icon={<TrendingUp className="text-success" size={24} />}
              bgColor="bg-success/10"
              value={`${USER_DATA.averageScore}%`}
              label="Average score"
            />
            <StatsCard
              icon={<Clock className="text-accent" size={24} />}
              bgColor="bg-accent/10"
              value={USER_DATA.studyTimeThisWeek}
              label="Study time"
            />
            <StatsCard
              icon={<Award className="text-info" size={24} />}
              bgColor="bg-info/10"
              value={USER_DATA.totalQuestionsAnswered}
              label="Total questions"
            />
          </div>
        </section>

        {/* Performance Chart */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Score Trend (Last 7 Days)</CardTitle>
              <CardDescription>
                Your performance is improving! Keep it up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {WEEKLY_SCORES.map((score, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-surface-elevated rounded-t-lg overflow-hidden">
                      <div
                        className="bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all duration-500"
                        style={{ height: `${score * 2.5}px` }}
                      />
                    </div>
                    <span className="text-xs text-muted font-medium">
                      {score}%
                    </span>
                    <span className="text-xs text-muted">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Recommendations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Recommendations for You
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {RECOMMENDATIONS.map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-warning">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">
                      💡 {rec.message}
                    </p>
                    <Badge variant={rec.variant} className="text-xs">
                      AI Recommendation
                    </Badge>
                  </div>
                  <Button size="sm" variant="secondary">
                    {rec.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Browse More Courses */}
        <div className="mt-8 text-center">
          <Button variant="secondary" size="lg">
            <BookOpen className="mr-2" size={20} /> Browse All Courses
          </Button>
        </div>
      </div>

      <UnifiedInstallPrompt />
    </div>
  );
}

// --------------------------------------------------
// Helper StatsCard
// --------------------------------------------------

function StatsCard({
  icon,
  bgColor,
  value,
  label,
}: {
  icon: React.ReactNode;
  bgColor: string;
  value: string | number;
  label: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      </div>
    </Card>
  );
}
