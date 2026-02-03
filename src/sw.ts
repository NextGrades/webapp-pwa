/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

// 👇 this line is injected automatically by vite-pwa
precacheAndRoute(self.__WB_MANIFEST);

// --- ADD PUSH SUPPORT ONLY BELOW ---

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  // console.log("Data", data)

  event.waitUntil(
    self.registration.showNotification(data.title ?? "Notification", {
      body: data.body,
      icon: "/web-app-manifest-192x192.png",
      data: data.url,
      badge: "/favicon-96x96.png",
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data || "/"));
});
