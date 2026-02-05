import { useEffect, useState, useRef } from "react";
import { RefreshCcw } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

const EXIT_ANIMATION_MS = 300;
const FORCE_UPDATE = import.meta.env.VITE_FORCE_UPDATE === "true";

// How often to poll for a new SW (1 hour in prod, can lower for testing)
const POLL_INTERVAL_MS = 60 * 60 * 1000;

export default function UpdateToast() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // This is the missing piece. Without it, an installed PWA on Android
    // has no navigation event to trigger the browser's built-in SW check.
    onRegisteredSW(swUrl, r) {
      if (!r) return;

      // Also check immediately on registration — catches the case where
      // the SW updated while the app was in the background.
      r.update();

      // Then poll periodically.
      setInterval(async () => {
        if (r.installing || !navigator) return;
        if ("connection" in navigator && !navigator.onLine) return;

        // Fetch the SW script directly with no-cache to see if it changed.
        // Only call r.update() if the server actually responded — avoids
        // issues if the server is down or the user goes offline mid-check.
        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) {
          await r.update();
        }
      }, POLL_INTERVAL_MS);
    },
  });

  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!needRefresh) return;
    if (hasShownRef.current) return;
    if (!FORCE_UPDATE && sessionStorage.getItem("pwa-update-dismissed")) return;

    hasShownRef.current = true;
    setShow(true);
    requestAnimationFrame(() => setVisible(true));
  }, [needRefresh]);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const dismiss = () => {
    if (FORCE_UPDATE) return;
    sessionStorage.setItem("pwa-update-dismissed", "1");
    setVisible(false);
    setTimeout(() => setShow(false), EXIT_ANIMATION_MS);
  };

  const refresh = async () => {
    // Hide the modal FIRST, before anything reloads.
    // Otherwise the modal is still mounted and visible during the reload race.
    setVisible(false);
    setTimeout(() => {
      setShow(false);

      // Pass false — do NOT let workbox-window's controllerchange handler reload.
      // We control the reload ourselves after the modal is gone.
      updateServiceWorker(false).then(() => {
        // Give the SW a tick to actually activate after skipWaiting is posted,
        // then do a single hard reload.
        setTimeout(() => window.location.reload(), 200);
      });
    }, EXIT_ANIMATION_MS); // wait for the exit animation to finish
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`
        fixed inset-0 z-9999
        flex min-h-screen w-screen items-center justify-center
        bg-black/10 backdrop-blur-sm
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}>
      <div
        className={`
          relative w-full max-w-80 md:max-w-100 mx-4
          rounded-2xl bg-surface p-6 shadow-2xl
          transform transition-all duration-300 ease-out
          ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-6"}
        `}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <RefreshCcw size={22} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Update available
            </h2>
            <p className="mt-1 text-sm text-muted">
              {FORCE_UPDATE
                ? "This update is required to continue using the app."
                : "A newer version of NextGrades is ready."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            autoFocus
            onClick={refresh}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary-dark transition">
            Refresh now
          </button>
          {!FORCE_UPDATE && (
            <button
              onClick={dismiss}
              className="w-full rounded-lg px-4 py-2 text-sm text-muted hover:bg-white-soft transition">
              Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
