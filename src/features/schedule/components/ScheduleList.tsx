/**
 * Reusability: MEDIUM — NBA schedule list.
 * Reusable across any screen that needs to show a filtered list of NBA games,
 * but tied to the Game domain model.
 */

import { useMemo } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import { Text } from "@ds"
import { spacing } from "@ds"
import { type Game } from "@shared"

import { GameCard } from "./GameCard"

interface ScheduleListProps {
  games: Game[]
  selectedTeam: string | null
  onPressGame?: (game: Game) => void
  spoilerFreeMode?: boolean
  use24HourTime?: boolean
}

export function ScheduleList({ games, selectedTeam, onPressGame, spoilerFreeMode = false, use24HourTime = false }: ScheduleListProps) {
  const filtered = useMemo(() => {
    if (!selectedTeam) return games
    return games.filter(
      (g) => g.homeTeam === selectedTeam || g.awayTeam === selectedTeam,
    )
  }, [games, selectedTeam])

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GameCard game={item} onPress={onPressGame} spoilerFreeMode={spoilerFreeMode} use24HourTime={use24HourTime} />}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text variant="dim">No games found.</Text>
        </View>
      }
      ListHeaderComponent={
        <Text variant="label" style={styles.header}>
          {selectedTeam ? `${selectedTeam} Schedule` : "All Games"}
        </Text>
      }
    />
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xs,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
})
