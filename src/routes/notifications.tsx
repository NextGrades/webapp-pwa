import PushNotificationManager from '@/components/PushNotificationsManager'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notifications')({
  component: PushNotificationManager,
})


