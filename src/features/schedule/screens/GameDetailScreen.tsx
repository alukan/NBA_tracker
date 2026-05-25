import { StyleSheet, Text, View } from "react-native"

import { useRoute, type RouteProp } from "@react-navigation/native"

import { colors, MOCK_GAMES } from "@shared"

type GameDetailRoute = RouteProp<{ GameDetail: { gameId: string } }, "GameDetail">

const STATUS_COLOR: Record<string, string> = {
  live: colors.live,
  final: colors.textMuted,
  upcoming: colors.accent,
}

export function GameDetailScreen() {
  const route = useRoute<GameDetailRoute>()
  const game = MOCK_GAMES.find((g) => g.id === route.params.gameId)

  if (!game) {
    return (
      <View style={styles.root}>
        <Text style={styles.notFound}>Game not found.</Text>
      </View>
    )
  }

  const statusColor = STATUS_COLOR[game.status] ?? colors.textMuted
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
    backgroundColor: colors.bg,
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  teamLabel: {
    color: colors.textDim,
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
    color: colors.text,
    fontSize: 36,
    fontWeight: "bold",
  },
  scoreLive: {
    color: colors.accent,
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
    color: colors.textMuted,
    fontSize: 14,
  },
  metaDot: {
    color: "#555",
  },
  notFound: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
})
