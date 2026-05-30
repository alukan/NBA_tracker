/**
 * Reusability: MEDIUM — NBA game card.
 * Tied to the Game domain model. Reusable anywhere an NBA game needs to be displayed,
 * but not suitable outside the NBA schedule context.
 */

import { StyleSheet, View } from "react-native"

import { Badge, Card, Text } from "@ds"
import { colors, spacing } from "@ds"
import { type Game, type GameStatus, formatGameTime } from "@shared"

interface GameCardProps {
  game: Game
  onPress?: (game: Game) => void
  spoilerFreeMode?: boolean
  use24HourTime?: boolean
}

const STATUS_LABEL: Record<GameStatus, string> = {
  upcoming: "Upcoming",
  live: "LIVE",
  final: "Final",
}

export function GameCard({ game, onPress, spoilerFreeMode = false, use24HourTime = false }: GameCardProps) {
  const isLive = game.status === "live"
  const hasScores = game.homeScore !== null && game.awayScore !== null
  const scoresHidden = spoilerFreeMode && hasScores

  return (
    <Card
      style={styles.card}
      onPress={onPress != null ? () => { onPress(game) } : undefined}
    >
      <View style={styles.row}>
        <View style={styles.teams}>
          <Text variant="subheading">{game.awayTeam}</Text>
          <Text variant="dim">@</Text>
          <Text variant="subheading">{game.homeTeam}</Text>
        </View>

        {scoresHidden ? (
          <Text variant="dim" color={colors.textFaint}>tap to reveal</Text>
        ) : hasScores ? (
          <View style={styles.scores}>
            <Text
              variant="subheading"
              style={styles.score}
              color={isLive ? colors.accent : undefined}
            >
              {game.awayScore}
            </Text>
            <Text variant="dim">-</Text>
            <Text
              variant="subheading"
              style={styles.score}
              color={isLive ? colors.accent : undefined}
            >
              {game.homeScore}
            </Text>
          </View>
        ) : (
          <Text variant="dim">{formatGameTime(game.time, use24HourTime)}</Text>
        )}
      </View>

      <View style={styles.meta}>
        <Text variant="caption">{game.date}</Text>
        <Badge
          label={STATUS_LABEL[game.status]}
          color={isLive ? colors.live : colors.textMuted}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teams: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  scores: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
})
