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
  Target,
  Zap,
  Brain,
  Trophy,
  Star,
} from "lucide-react";
import Badge from "@/components/Badge";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  staticData: {
    showHeader: true,
  },
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
  weeklyGoal: 50,
  questionsThisWeek: 45,
  rank: "Top 15%",
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

const QUICK_ACTIONS = [
  {
    id: "1",
    icon: <Target size={20} />,
    label: "Daily Challenge",
    description: "5 questions",
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: "2",
    icon: <Brain size={20} />,
    label: "AI Tutor",
    description: "Ask anything",
    bgColor: "bg-info/10",
    iconColor: "text-info",
  },
  {
    id: "3",
    icon: <Zap size={20} />,
    label: "Quick Quiz",
    description: "Test yourself",
    bgColor: "bg-warning/10",
    iconColor: "text-warning",
  },
];

const ACHIEVEMENTS = [
  { id: "1", name: "Week Warrior", icon: "🔥", unlocked: true },
  { id: "2", name: "Perfect Score", icon: "⭐", unlocked: true },
  { id: "3", name: "Speed Demon", icon: "⚡", unlocked: false },
  { id: "4", name: "Knowledge Master", icon: "🎓", unlocked: true },
];

// --------------------------------------------------
// Component
// --------------------------------------------------

export default function DashboardPage() {
  const weeklyProgress =
    (USER_DATA.questionsThisWeek / USER_DATA.weeklyGoal) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl space-y-12">
        {/* Enhanced Welcome Header with Concentric Circles */}
        <header className="relative p-8 rounded-2xl bg-primary text-white overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {/* Concentric circles - top left */}
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-2 border-white/10"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full border-2 border-white/10"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full border-2 border-white/15"></div>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-2 border-white/20"></div>

            {/* Decorative circles - bottom right */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5"></div>
            <div className="absolute bottom-4 right-12 w-24 h-24 rounded-full bg-white/5"></div>

            {/* Floating dots pattern */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-accent"></div>
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-accent/60"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-accent/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Welcome Message */}
              <div className="space-y-3">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
                    Welcome back, {USER_DATA.name}!
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Flame size={20} className="text-accent" />
                    <span className="font-semibold">
                      {USER_DATA.streak}-day streak
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Trophy size={20} className="text-accent" />
                    <span className="font-semibold">{USER_DATA.rank}</span>
                  </div>
                </div>
              </div>

              {/* Weekly Goal Progress Circle */}
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28">
                  {/* Progress Circle */}
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="var(--amber-main)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${weeklyProgress * 2.64} 264`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {USER_DATA.questionsThisWeek}
                    </span>
                    <span className="text-xs text-white/70">
                      of {USER_DATA.weeklyGoal}
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold mb-1">Weekly Goal</p>
                  <p className="text-white/70">
                    {USER_DATA.weeklyGoal - USER_DATA.questionsThisWeek}{" "}
                    questions to go
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 rounded-xl p-4 text-left group"
                  onClick={() => console.log(`Quick action: ${action.label}`)}>
                  <div
                    className={`${action.bgColor} ${action.iconColor} w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{action.label}</p>
                    <p className="text-xs text-white/70">
                      {action.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Continue Learning Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Continue Learning
            </h2>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_COURSES.map((course) => (
              <Card
                key={course.id}
                hover
                onClick={() => console.log(`Continue ${course.courseCode}`)}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="text-primary" size={24} />
                    </div>
                    <Badge variant="success" className="text-xs">
                      {course.progress}%
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{course.courseCode}</CardTitle>
                  <CardDescription>{course.courseName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ProgressBar progress={course.progress} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted flex items-center gap-1">
                      <Clock size={14} />
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
              trend="+12%"
              trendUp={true}
            />
            <StatsCard
              icon={<TrendingUp className="text-success" size={24} />}
              bgColor="bg-success/10"
              value={`${USER_DATA.averageScore}%`}
              label="Average score"
              trend="+5%"
              trendUp={true}
            />
            <StatsCard
              icon={<Clock className="text-accent" size={24} />}
              bgColor="bg-accent/10"
              value={USER_DATA.studyTimeThisWeek}
              label="Study time"
              trend="+30 min"
              trendUp={true}
            />
            <StatsCard
              icon={<Award className="text-info" size={24} />}
              bgColor="bg-info/10"
              value={USER_DATA.totalQuestionsAnswered}
              label="Total questions"
              trend="All time"
              trendUp={null}
            />
          </div>
        </section>

        {/* Performance Chart */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Score Trend (Last 7 Days)</CardTitle>
                  <CardDescription>
                    Your performance is improving! Keep it up.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp size={20} />
                  <span className="font-semibold">+8% this week</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {WEEKLY_SCORES.map((score, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-elevated rounded-t-lg overflow-hidden relative">
                      <div
                        className="bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all duration-500 group-hover:from-primary-dark group-hover:to-primary"
                        style={{ height: `${score * 2.5}px` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Recommendations */}
          <section className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Recommendations for You
            </h2>
            <div className="grid gap-4">
              {RECOMMENDATIONS.map((rec) => (
                <Card key={rec.id} className="border-l-4 border-l-warning">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="text-warning" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium mb-2">
                          {rec.message}
                        </p>
                        <Badge variant={rec.variant} className="text-xs">
                          AI Recommendation
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary">
                      {rec.action}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Achievements */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Achievements
            </h2>
            <Card>
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                      achievement.unlocked
                        ? "bg-success/10 hover:bg-success/20"
                        : "bg-muted/10 opacity-50"
                    }`}>
                    <span className="text-3xl">{achievement.icon}</span>
                    <span className="text-xs font-medium text-center">
                      {achievement.name}
                    </span>
                    {achievement.unlocked && (
                      <Star size={12} className="text-accent fill-accent" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="secondary" size="sm" className="w-full">
                  View All Achievements
                </Button>
              </div>
            </Card>
          </section>
        </div>

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
  trend,
  trendUp,
}: {
  icon: React.ReactNode;
  bgColor: string;
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean | null;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor}`}>
            {icon}
          </div>
          {trend && (
            <span
              className={`text-xs font-semibold ${
                trendUp === true
                  ? "text-success"
                  : trendUp === false
                    ? "text-error"
                    : "text-muted"
              }`}>
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted mt-1">{label}</p>
        </div>
      </div>
    </Card>
  );
}
