import { useEffect, useState } from "react";
import { RefreshCcw, X } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

const EXIT_ANIMATION_MS = 350;

export default function UpdateToast() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  // Mount control
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show toast when update is available
  useEffect(() => {
    if (!needRefresh) return;

    setShow(true);
    requestAnimationFrame(() => setVisible(true));
  }, [needRefresh]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => setShow(false), EXIT_ANIMATION_MS);
  };

  const refresh = async () => {
    // true = skip waiting + reload
    await updateServiceWorker(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-50 md:left-auto md:right-4 md:w-88">
      <div
        className={`
          relative rounded-xl bg-surface border border-gray-200 shadow-lg p-4
          transform transition-all duration-350 ease-out
          motion-reduce:transition-none motion-reduce:transform-none
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}>
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss update"
          className="absolute right-3 top-3 text-muted hover:text-foreground transition">
          <X size={18} />
        </button>

        <div className="flex gap-3">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <RefreshCcw size={22} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Update available
            </h3>

            <p className="mt-1 text-sm text-muted">
              A newer version of NextGrades is ready.
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={refresh}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition">
                Refresh
              </button>

              <button
                onClick={dismiss}
                className="rounded-md px-3 py-2 text-sm text-muted hover:bg-white-soft transition">
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
