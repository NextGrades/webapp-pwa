import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lesson/")({
  component: LessonLayoutComponent,
});

function LessonLayoutComponent() {
  return (
    <main className="container min-h-screen mt-6">
      <div>Hello "/lesson/"!</div>
      <Outlet />
    </main>
  );
}
