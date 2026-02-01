import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/Card";
import { BookOpen, CheckCircle } from "lucide-react";

interface CourseCardProps {
  courseCode: string;
  title: string;
  field: string | null;
  subtopicCount: number;
  // studentCount: number;
  isActive: boolean;
  onClick?: () => void;
}

export default function CourseCard({
  courseCode,
  title,
  field,
  subtopicCount,
  // studentCount,
  isActive,
  onClick,
}: CourseCardProps) {
  return (
    <Card hover onClick={onClick} className="course-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-primary-dark">
              {courseCode}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {title}
            </CardDescription>
          </div>
          {isActive && (
            <div className="badge-validated">
              <CheckCircle size={16} />
              <span>Validated</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <BookOpen size={16} />
            <span>field: {field}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <BookOpen size={16} />
            <span>{subtopicCount} Subtopics</span>
          </div>
          {/* <div className="flex items-center gap-2 text-muted">
            <Users size={16} />
            <span>{studentCount} students</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
