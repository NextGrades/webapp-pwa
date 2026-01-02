import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function UnifiedInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    if (ios && !standalone) {
      setShowPrompt(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed inset-x-3 bottom-4 z-50 md:left-auto md:right-4 md:w-[22rem]">
      <div className="relative rounded-xl bg-surface border border-gray-200 shadow-lg p-4">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-muted hover:text-foreground transition">
          <X size={18} />
        </button>

        <div className="flex gap-3">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {isIOS ? <Share size={22} /> : <Download size={22} />}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">
              Install NextGrades
            </h3>

            {isIOS ? (
              <div className="mt-2 text-sm text-muted">
                <p className="mb-2">Add NextGrades to your home screen:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    Tap the Share icon{" "}
                    <Share size={14} className="inline-block mb-0.5" />
                  </li>
                  <li>Select “Add to Home Screen”</li>
                  <li>Tap “Add” to finish</li>
                </ol>
              </div>
            ) : (
              <>
                <p className="mt-1 text-sm text-muted">
                  Get quick access to lessons and quizzes — even offline.
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition">
                    Install app
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="rounded-md px-3 py-2 text-sm text-muted hover:bg-white-soft transition">
                    Not now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {isIOS && (
          <button
            onClick={handleDismiss}
            className="mt-3 w-full rounded-md px-3 py-2 text-sm text-muted hover:bg-white-soft transition">
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
