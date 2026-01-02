import { createFileRoute } from "@tanstack/react-router";
import UnifiedInstallPrompt from "@/components/InstallPrompt";
import QuickExercisesUI from "@/components/QuickExercises";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="my-4">
      <header className="container p-4 rounded-2xl flex flex-col bg-primary text-white gap-6">
        <div>
          <div>
            <h2 className="font-medium text-4xl mb-2">Hello,</h2>
            <p className="text-sm md:text-base">Welcome to NextGrades!</p>
          </div>
        </div>
      </header>

      <QuickExercisesUI />
      <UnifiedInstallPrompt />
    </div>
  );
}
