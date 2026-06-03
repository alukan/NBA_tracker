/**
 * Reusability: MEDIUM — NBA schedule list.
 * Reusable across any screen that needs to show a filtered list of NBA games,
 * but tied to the Game domain model.
 */

import { type ReactElement } from "react"
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from "react-native"

import { Text, colors, spacing } from "@ds"
import { type Game } from "@shared"

import { useScheduleSections } from "../../../hooks/useScheduleSections"

import { GameCard } from "./GameCard"

type ScheduleListProps = {
  selectedTeam: string | null
  onPressGame?: (game: Game) => void
  spoilerFreeMode?: boolean
  use24HourTime?: boolean
}

export function ScheduleList({
  selectedTeam,
  onPressGame,
  spoilerFreeMode = false,
  use24HourTime = false,
}: ScheduleListProps): ReactElement {
  const {
    sections,
    isLoading,
    error,
    refreshing,
    onRefresh,
    onEndReached,
    isLoadingMore,
  } = useScheduleSections(selectedTeam)

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
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GameCard
          game={item}
          onPress={onPressGame}
          spoilerFreeMode={spoilerFreeMode}
          use24HourTime={use24HourTime}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text variant="label">{section.title}</Text>
        </View>
      )}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent}
        />
      }
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingBottom: spacing.xxxl,
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
