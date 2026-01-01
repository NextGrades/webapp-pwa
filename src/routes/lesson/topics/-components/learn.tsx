import { CheckCircle2, BookOpen, Target } from "lucide-react";

export function LearnTab({ lesson }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="section-title">
          <Target size={16} /> Objectives
        </h2>

        {lesson.objectives.map((obj, i) => (
          <div key={i} className="objective-card">
            <CheckCircle2 size={18} className="text-emerald-500" />
            {obj}
          </div>
        ))}
      </section>

      <section>
        <h2 className="section-title">
          <BookOpen size={16} /> Key Formula
        </h2>

        <div className="formula-card">
          ax² + bx + c = 0
        </div>
      </section>
    </div>
  );
}
