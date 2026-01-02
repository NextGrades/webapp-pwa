import { Link } from "@tanstack/react-router";
import type { JSX } from "react/jsx-dev-runtime";

export default function SubjectCard({
  subject,
  icon,
}: {
  subject: { id: number; name: string };
  icon: JSX.Element;
}) {
  return (
    <Link
      to="/lesson/subjects/$subjectId"
      params={{
        subjectId: subject.id.toString(),
      }}
      key={subject.id}>
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        {icon}
        <h3 className="font-semibold text-lg">{subject.name}</h3>
      </div>
    </Link>
  );
}
