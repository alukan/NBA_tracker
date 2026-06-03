/**
 * Reusability: LOW — page-level screen.
 * Specific to the Schedule tab. Not intended for reuse.
 */

import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { useCallback, type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { Text, colors, spacing } from "@ds"

import { type Game } from "@shared"

import { useAppSettings } from "../../../context/SettingsContext"
import { useFavoriteTeam } from "../../../hooks/useFavoriteTeam"
import { type ScheduleStackParamList } from "../../../navigation/types"
import { TeamSelector } from "../../teams/components/TeamSelector"
import { ScheduleList } from "../components/ScheduleList"

type Props = NativeStackScreenProps<ScheduleStackParamList, "ScheduleList">

export function ScheduleScreen({ navigation }: Props): ReactElement {
  const { favoriteTeam, setFavoriteTeam, isLoading } = useFavoriteTeam()
  const { settings } = useAppSettings()

  const handleSelectTeam = useCallback(
    (team: string) => {
      setFavoriteTeam(favoriteTeam === team ? null : team)
    },
    [favoriteTeam, setFavoriteTeam],
  )

  const handlePressGame = useCallback(
    (game: Game) => {
      navigation.navigate("GameDetail", { game })
    },
    [navigation],
  )

  return (
    <View style={styles.root}>
      {settings.displayName ? (
        <View style={styles.greeting}>
          <Text variant="dim">Hi, {settings.displayName}</Text>
        </View>
      ) : null}
      <TeamSelector
        selected={isLoading ? null : favoriteTeam}
        onSelect={handleSelectTeam}
      />
      <ScheduleList
        selectedTeam={isLoading ? null : favoriteTeam}
        onPressGame={handlePressGame}
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
