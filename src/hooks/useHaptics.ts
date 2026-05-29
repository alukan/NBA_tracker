import * as Haptics from "expo-haptics"
import { useCallback } from "react"

/**
 * Semantic haptic feedback abstraction over expo-haptics.
 *
 * Encapsulates all device vibration/taptic calls so no component or hook
 * ever imports expo-haptics directly. Each method maps a user-meaningful
 * action to the appropriate feedback style:
 *
 *   teamSelected  – medium impact: user committed to a preference
 *   teamCleared   – light selection: user removed a preference
 *
 * Falls back silently on devices that do not support haptics.
 */
export function useHaptics() {
  const teamSelected = useCallback(() => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }, [])

  const teamCleared = useCallback(() => {
    void Haptics.selectionAsync()
  }, [])

  return { teamSelected, teamCleared }
}
