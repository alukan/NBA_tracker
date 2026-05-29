import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"
import { useHaptics } from "./useHaptics"

const STORAGE_KEY = "@favorite_team"

/**
 * Persists the user's favorite team filter across app sessions.
 *
 * Encapsulates all AsyncStorage reads/writes so components never touch
 * storage directly. Haptic feedback is fired automatically on every
 * selection/clear via useHaptics — callers need not know about it.
 *
 * Returns the same `[value, setter]` shape as useState, plus an
 * `isLoading` flag to suppress UI flicker on the initial read.
 *
 * Toggle pattern: call setTeam(team) to select, setTeam(null) to clear.
 */
export function useFavoriteTeam(): {
  favoriteTeam: string | null
  setFavoriteTeam: (team: string | null) => void
  isLoading: boolean
} {
  const [favoriteTeam, setFavoriteTeamState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const haptics = useHaptics()

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved != null) setFavoriteTeamState(saved)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const setFavoriteTeam = useCallback(
    (team: string | null) => {
      setFavoriteTeamState(team)
      if (team == null) {
        haptics.teamCleared()
        void AsyncStorage.removeItem(STORAGE_KEY)
      } else {
        haptics.teamSelected()
        void AsyncStorage.setItem(STORAGE_KEY, team)
      }
    },
    [haptics],
  )

  return { favoriteTeam, setFavoriteTeam, isLoading }
}
