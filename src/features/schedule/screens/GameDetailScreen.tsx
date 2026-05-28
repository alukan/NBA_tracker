/**
 * Reusability: LOW — page-level screen.
 * Specific to the Game Detail view. Not intended for reuse.
 * Styling is handled primarily by design system components (Card, Text, Badge).
 */

import { StyleSheet, View } from "react-native"

import { useRoute, type RouteProp } from "@react-navigation/native"

import { Badge, Card, Text } from "@ds"
import { colors, fontSize, spacing } from "@ds"
import { MOCK_GAMES } from "@shared"

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
        <Text variant="body" color={colors.textMuted} style={styles.notFound}>
          Game not found.
        </Text>
      </View>
    )
  }

  const statusColor = STATUS_COLOR[game.status] ?? colors.textMuted
  const hasScores = game.homeScore !== null && game.awayScore !== null
  const isLive = game.status === "live"

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Badge label={game.status.toUpperCase()} color={statusColor} />

        <View style={styles.matchup}>
          <View style={styles.team}>
            <Text variant="heading">{game.awayTeam}</Text>
            <Text variant="caption" style={styles.teamLabel}>Away</Text>
          </View>

          {hasScores ? (
            <View style={styles.scoreBox}>
              <Text variant="score" color={isLive ? colors.accent : undefined}>
                {game.awayScore}
              </Text>
              <Text style={styles.scoreDash}>–</Text>
              <Text variant="score" color={isLive ? colors.accent : undefined}>
                {game.homeScore}
              </Text>
            </View>
          ) : (
            <Text style={styles.vs}>VS</Text>
          )}

          <View style={styles.team}>
            <Text variant="heading">{game.homeTeam}</Text>
            <Text variant="caption" style={styles.teamLabel}>Home</Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text variant="body" color={colors.textMuted}>{game.date}</Text>
          <Text variant="dim">·</Text>
          <Text variant="body" color={colors.textMuted}>{game.time}</Text>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
  },
  card: {
    borderRadius: 14,
    padding: spacing.xxxl,
    alignItems: "center",
    gap: spacing.xxl,
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
  teamLabel: {
    marginTop: spacing.xs,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
    justifyContent: "center",
  },
  scoreDash: {
    color: colors.textFaint,
    fontSize: fontSize.xxl,
  },
  vs: {
    color: colors.textFaint,
    fontSize: fontSize.xl,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  meta: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  notFound: {
    textAlign: "center",
    marginTop: 40,
  },
})
