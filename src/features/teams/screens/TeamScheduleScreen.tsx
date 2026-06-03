/**
 * Reusability: LOW — page-level screen.
 * Shows last season's games for a specific team, paginated by display-side slicing.
 */

import { useCallback } from "react"
import { ActivityIndicator, SectionList, StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Text } from "@ds"
import { colors, spacing } from "@ds"
import { type Game } from "@shared"

import { useTeamSchedule } from "../../../hooks/useTeamSchedule"
import { GameCard } from "../../schedule/components/GameCard"
import { useAppSettings } from "../../../context/SettingsContext"
import { type TeamsStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamSchedule">

export function TeamScheduleScreen({ route, navigation }: Props) {
  const { team } = route.params
  const { settings } = useAppSettings()
  const { sections, isLoading, error, onEndReached, isLoadingMore } = useTeamSchedule(team)

  const handlePressGame = useCallback(
    (game: Game) => {
      navigation.navigate("GameDetail", { game })
    },
    [navigation],
  )

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    )
  }

  if (error != null) {
    return (
      <View style={styles.center}>
        <Text variant="dim">{error}</Text>
      </View>
    )
  }

  return (
    <SectionList
      style={styles.root}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GameCard
          game={item}
          onPress={handlePressGame}
          spoilerFreeMode={settings.spoilerFreeMode}
          use24HourTime={settings.use24HourTime}
          highlightTeam={team}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text variant="label">{section.title}</Text>
        </View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text variant="dim">No games found.</Text>
        </View>
      }
      ListFooterComponent={
        isLoadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator color={colors.accent} />
          </View>
        ) : null
      }
    />
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  center: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xs,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
})
