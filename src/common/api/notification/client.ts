import { api } from "@/common/api/axios";
import { type ApiResponse } from "@/common/types/api.interface";

// function normalizeSubscription(sub: any) {
//   return {
//     endpoint: sub.endpoint,
//     keys: {
//       p256dh: sub.keys?.p256dh || "",
//       auth: sub.keys?.auth || "",
//     },
//   };
// }

export const notificationClient = {
  async subscribe(subscription: PushSubscription): Promise<void> {
    console.log("subscription object", subscription);
    const { expirationTime, ...payload } = subscription;
    await api.post<ApiResponse<string>>(
      "/push-subscriptions/subscribe",
      payload,
    );
  },

  async unsubscribe(endpoint: string) {
    const encoded = encodeURIComponent(endpoint);

    await api.delete<ApiResponse<string>>(
      `/push-subscriptions/unsubscribe/${encoded}`,
    );
  },

  async sendTest(message: string): Promise<void> {
    await api.post("/push-notifications/test", { message });
  },
};
