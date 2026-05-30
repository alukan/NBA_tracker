import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "@settings"

export interface Settings {
  displayName: string
  notificationsEnabled: boolean
  spoilerFreeMode: boolean
  use24HourTime: boolean
}

const DEFAULT_SETTINGS: Settings = {
  displayName: "",
  notificationsEnabled: false,
  spoilerFreeMode: false,
  use24HourTime: false,
}

/**
 * Persists user preferences across app sessions.
 *
 * All settings are stored as a single JSON blob. Components never touch
 * storage directly — they call updateSetting(key, value).
 *
 * Intended to be called once inside SettingsProvider, not directly in screens.
 */
export function useSettings(): {
  settings: Settings
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  isLoading: boolean
} {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored != null) {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const updateSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value }
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  return { settings, updateSetting, isLoading }
}
