import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { type Game, type GameStatus } from "../data/games"

export type { Game, GameStatus }

interface GameCardProps {
  game: Game
  onPress?: (game: Game) => void
}

const STATUS_LABEL: Record<GameStatus, string> = {
  upcoming: "Upcoming",
  live: "LIVE",
  final: "Final",
}

const GameCard: React.FC<GameCardProps> = ({ game, onPress }) => {
  const isLive = game.status === "live"
  const hasScores = game.homeScore !== null && game.awayScore !== null

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => { onPress?.(game) }}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <View style={styles.teams}>
          <Text style={styles.team}>{game.awayTeam}</Text>
          <Text style={styles.vs}>@</Text>
          <Text style={styles.team}>{game.homeTeam}</Text>
        </View>

        {hasScores ? (
          <View style={styles.scores}>
            <Text style={[styles.score, isLive && styles.scoreLive]}>
              {game.awayScore}
            </Text>
            <Text style={styles.scoreDash}>-</Text>
            <Text style={[styles.score, isLive && styles.scoreLive]}>
              {game.homeScore}
            </Text>
          </View>
        ) : (
          <Text style={styles.time}>{game.time}</Text>
        )}
      </View>

      <View style={styles.meta}>
        <Text style={styles.date}>{game.date}</Text>
        <Text style={[styles.status, isLive && styles.statusLive]}>
          {STATUS_LABEL[game.status]}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default GameCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2a2a4e",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teams: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  team: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  vs: {
    color: "#666",
    fontSize: 13,
  },
  scores: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  score: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreLive: {
    color: "#c9a84c",
  },
  scoreDash: {
    color: "#666",
  },
  time: {
    color: "#aaa",
    fontSize: 14,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
  status: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  statusLive: {
    color: "#e94560",
  },
})
