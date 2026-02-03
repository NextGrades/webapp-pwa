import { notificationClient } from "@/common/api/notification/client";
import Input from "@/components/Input";
import { useEffect, useState } from "react";


function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Attach to the already-registered service worker
   * and sync existing subscription with backend
   */
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    setIsSupported(true);

    navigator.serviceWorker.ready
      .then(async (registration) => {
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);

        if (sub) {
          try {
            const serialized = JSON.parse(JSON.stringify(sub));
            await notificationClient.subscribe(serialized);
            console.log("Push subscription synced with server");
          } catch (err) {
            console.error("Failed to sync push subscription", err);
          }
        }
      })
      .catch((err) => {
        console.error("Service worker not ready", err);
      });
  }, []);

  async function subscribeToPush() {
    try {
      setLoading(true);

      const registration = await navigator.serviceWorker.ready;

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY!,
        ),
      });

      setSubscription(sub);

      const serialized = JSON.parse(JSON.stringify(sub));
      await notificationClient.subscribe(serialized);
    } catch (err) {
      console.error("Subscribe failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    try {
      if (!subscription) return;

      setLoading(true);

      const endpoint = subscription.endpoint;

      await subscription.unsubscribe();
      await notificationClient.unsubscribe(endpoint);

      setSubscription(null);
    } catch (err) {
      console.error("Unsubscribe failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function sendTestNotification() {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await notificationClient.sendTest(message);
      setMessage("");
    } catch (err) {
      console.error("Send notification failed:", err);
    } finally {
      setLoading(false);
    }
  }

  if (!isSupported) {
    return (
      <div className="my-4">
        <h3 className="text-primary font-bold text-2xl">Push Notifications</h3>
        <p className="text-sm text-gray-600 mt-2">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <h3 className="text-primary font-bold text-2xl">Push Notifications</h3>

      {subscription ? (
        <div className="flex flex-col gap-3 mt-3">
          <p className="text-green-600 text-sm">
            You are subscribed to push notifications.
          </p>

          <button
            onClick={unsubscribeFromPush}
            disabled={loading}
            className="bg-red-500 disabled:opacity-50 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Unsubscribe
          </button>

          <label className="sr-only" htmlFor="test-message">
            Notification message
          </label>

          <Input
            id="test-message"
            type="text"
            placeholder="Enter notification message to test"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={sendTestNotification}
            disabled={!message.trim() || loading}
            className="bg-primary disabled:opacity-50 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Send Test
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-3">
          <p className="text-gray-600 italic text-sm">
            You are not subscribed to push notifications.
          </p>

          <button
            onClick={subscribeToPush}
            disabled={loading}
            className="bg-primary disabled:opacity-50 text-white py-2 px-4 rounded-md w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
