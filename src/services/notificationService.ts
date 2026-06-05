/**
 * Notification service — wraps expo-notifications to schedule and cancel
 * NBA game reminders (30 min before tip-off) and a test notification.
 */

import { PermissionStatus } from "expo"
import * as Notifications from "expo-notifications"

import { type Game } from "@shared"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync()
  if (existing === PermissionStatus.GRANTED) return true
  const { status } = await Notifications.requestPermissionsAsync()
  return status === PermissionStatus.GRANTED
}

/**
 * Cancels all scheduled notifications, then schedules one notification per
 * upcoming game, firing 30 minutes before tip-off. Games that tip off in
 * less than 30 minutes (or have already started) are skipped.
 */
export async function scheduleUpcomingGameNotifications(
  games: Game[],
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()

  const now = Date.now()
  const thirtyMin = 30 * 60 * 1000

  for (const game of games) {
    if (game.status !== "upcoming") continue

    const tipOff = new Date(game.isoDate).getTime()
    const fireAt = tipOff - thirtyMin

    if (fireAt <= now) continue

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "NBA Tip-Off Soon 🏀",
        body: `${game.awayTeam} @ ${game.homeTeam} starts in 30 minutes`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(fireAt),
      },
    })
  }
}

/** Schedules a test notification that fires in 5 seconds. */
export async function scheduleTestNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "NBA Today 🏀",
      body: "This is a test notification.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  })
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
