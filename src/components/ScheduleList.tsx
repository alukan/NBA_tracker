import { useMemo } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import { type Game } from "../data/games"
import GameCard from "./GameCard"

interface ScheduleListProps {
  games: Game[]
  selectedTeam: string | null
  onPressGame?: (game: Game) => void
}

const ScheduleList: React.FC<ScheduleListProps> = ({ games, selectedTeam, onPressGame }) => {
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
      renderItem={({ item }) => <GameCard game={item} onPress={onPressGame} />}
      contentContainerStyle={styles.content}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No games found.</Text>
        </View>
      }
      ListHeaderComponent={
        <Text style={styles.header}>
          {selectedTeam ? `${selectedTeam} Schedule` : "All Games"}
        </Text>
      }
    />
  )
}

export default ScheduleList

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  header: {
    color: "#888",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    color: "#555",
    fontSize: 15,
  },
})
