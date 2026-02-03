import { RefreshCcw } from "lucide-react";

export default function UpdateToastPreview() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="
        fixed inset-0 z-9999
        flex min-h-screen w-screen items-center justify-center
        bg-black/50 backdrop-blur-sm
      "
    >
      <div
        className="
          relative w-full max-w-80 md:max-w-100 mx-4
          rounded-2xl bg-surface p-6 shadow-2xl
          scale-100 translate-y-0
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <RefreshCcw size={22} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">
              Update available
            </h2>
            <p className="mt-1 text-sm text-muted">
              A newer version of NextGrades is ready.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            className="
              w-full rounded-lg bg-primary px-4 py-3
              text-sm font-medium text-white
            "
          >
            Refresh now
          </button>

          <button
            className="
              w-full rounded-lg px-4 py-2
              text-sm text-muted
            "
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
