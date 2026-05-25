import { StyleSheet, Text, View } from "react-native"

import { useRoute, type RouteProp } from "@react-navigation/native"

import { MOCK_GAMES } from "../data/games"

type GameDetailRoute = RouteProp<{ GameDetail: { gameId: string } }, "GameDetail">

const STATUS_COLOR: Record<string, string> = {
  live: "#e94560",
  final: "#888",
  upcoming: "#c9a84c",
}

export default function GameDetailScreen() {
  const route = useRoute<GameDetailRoute>()
  const game = MOCK_GAMES.find((g) => g.id === route.params.gameId)

  if (!game) {
    return (
      <View style={styles.root}>
        <Text style={styles.notFound}>Game not found.</Text>
      </View>
    )
  }

  const statusColor = STATUS_COLOR[game.status] ?? "#888"
  const hasScores = game.homeScore !== null && game.awayScore !== null

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={[styles.status, { color: statusColor }]}>
          {game.status.toUpperCase()}
        </Text>

        <View style={styles.matchup}>
          <View style={styles.team}>
            <Text style={styles.teamName}>{game.awayTeam}</Text>
            <Text style={styles.teamLabel}>Away</Text>
          </View>

          {hasScores ? (
            <View style={styles.scoreBox}>
              <Text style={[styles.score, game.status === "live" && styles.scoreLive]}>
                {game.awayScore}
              </Text>
              <Text style={styles.scoreDash}>–</Text>
              <Text style={[styles.score, game.status === "live" && styles.scoreLive]}>
                {game.homeScore}
              </Text>
            </View>
          ) : (
            <Text style={styles.vs}>VS</Text>
          )}

          <View style={styles.team}>
            <Text style={styles.teamName}>{game.homeTeam}</Text>
            <Text style={styles.teamLabel}>Home</Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaText}>{game.date}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{game.time}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f0f23",
    padding: 16,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2a2a4e",
    alignItems: "center",
    gap: 20,
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  matchup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  team: {
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  teamLabel: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  score: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  scoreLive: {
    color: "#c9a84c",
  },
  scoreDash: {
    color: "#555",
    fontSize: 28,
  },
  vs: {
    color: "#555",
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  meta: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  metaText: {
    color: "#888",
    fontSize: 14,
  },
  metaDot: {
    color: "#555",
  },
  notFound: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
})
