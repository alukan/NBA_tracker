import React, { createContext, useContext } from "react"

import { useSettings, type Settings } from "../hooks/useSettings"

interface SettingsContextValue {
  settings: Settings
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  isLoading: boolean
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const value = useSettings()
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

/**
 * Returns the app-wide settings and an updater function.
 * Must be called inside a component wrapped by SettingsProvider.
 */
export function useAppSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (ctx == null) throw new Error("useAppSettings must be used within SettingsProvider")
  return ctx
}
