import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const PROMPT_DELAY = 2500;
const EXIT_ANIMATION_MS = 350;

export default function UnifiedInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Mount control
  const [showPrompt, setShowPrompt] = useState(false);

  // Animation control
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) return;

    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => {
        setShowPrompt(true);
        requestAnimationFrame(() => setIsVisible(true));
      }, PROMPT_DELAY);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS manual install prompt
    if (ios && !standalone) {
      setTimeout(() => {
        setShowPrompt(true);
        requestAnimationFrame(() => setIsVisible(true));
      }, PROMPT_DELAY);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    dismissPrompt();
  };

  const dismissPrompt = () => {
    setIsVisible(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());

    setTimeout(() => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }, EXIT_ANIMATION_MS);
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed inset-x-3 bottom-4 z-50 md:left-auto md:right-4 md:w-88">
      <div
        className={`
          relative rounded-xl bg-surface border border-gray-200 shadow-lg p-4
          transform transition-all duration-350 ease-out
          motion-reduce:transition-none motion-reduce:transform-none
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}>
        {/* Close button */}
        <button
          onClick={dismissPrompt}
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
                    onClick={dismissPrompt}
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
            onClick={dismissPrompt}
            className="mt-3 w-full rounded-md px-3 py-2 text-sm text-muted hover:bg-white-soft transition">
            Got it
          </button>
        )}
      </div>
    </div>
  );
}
