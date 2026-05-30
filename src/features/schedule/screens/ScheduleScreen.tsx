/**
 * Reusability: LOW — page-level screen.
 * Specific to the Schedule tab. Not intended for reuse.
 */

import { useCallback } from "react"
import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Text } from "@ds"
import { colors, spacing } from "@ds"
import { MOCK_GAMES } from "@shared"

import { useAppSettings } from "../../../context/SettingsContext"
import { useFavoriteTeam } from "../../../hooks/useFavoriteTeam"
import { ScheduleList } from "../components/ScheduleList"
import { TeamSelector } from "../../teams/components/TeamSelector"
import { type ScheduleStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<ScheduleStackParamList, "ScheduleList">

export function ScheduleScreen({ navigation }: Props) {
  const { favoriteTeam, setFavoriteTeam, isLoading } = useFavoriteTeam()
  const { settings } = useAppSettings()

  const handleSelectTeam = useCallback(
    (team: string) => {
      setFavoriteTeam(favoriteTeam === team ? null : team)
    },
    [favoriteTeam, setFavoriteTeam],
  )

  return (
    <View style={styles.root}>
      {settings.displayName ? (
        <View style={styles.greeting}>
          <Text variant="dim">Hi, {settings.displayName}</Text>
        </View>
      ) : null}
      <TeamSelector selected={isLoading ? null : favoriteTeam} onSelect={handleSelectTeam} />
      <ScheduleList
        games={MOCK_GAMES}
        selectedTeam={isLoading ? null : favoriteTeam}
        onPressGame={(game) => {
          navigation.navigate("GameDetail", { gameId: game.id })
        }}
        spoilerFreeMode={settings.spoilerFreeMode}
        use24HourTime={settings.use24HourTime}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  greeting: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
})
