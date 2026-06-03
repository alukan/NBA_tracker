/**
 * Reusability: MEDIUM — NBA game card.
 * Tied to the Game domain model. Reusable anywhere an NBA game needs to be displayed,
 * but not suitable outside the NBA schedule context.
 */

import { useState, type ReactElement } from "react"
import { Image, StyleSheet, View } from "react-native"

import { Badge, Card, Text, colors, spacing, radius } from "@ds"
import {
  type Game,
  type GameStatus,
  formatGameTime,
  teamLogoUrl,
} from "@shared"

type GameCardProps = {
  game: Game
  onPress?: (game: Game) => void
  spoilerFreeMode?: boolean
  use24HourTime?: boolean
  highlightTeam?: string
}

const STATUS_LABEL: Record<GameStatus, string> = {
  upcoming: "Upcoming",
  live: "LIVE",
  final: "Final",
}

function TeamLogo({ abbr }: { abbr: string }): ReactElement {
  const [failed, setFailed] = useState(false)
  if (failed) return <View style={styles.logoFallback} />
  return (
    <Image
      source={{ uri: teamLogoUrl(abbr) }}
      style={styles.logo}
      resizeMode="contain"
      onError={() => {
        setFailed(true)
      }}
    />
  )
}

function WLBadge({ result }: { result: "W" | "L" }): ReactElement {
  return (
    <View style={[styles.wlBadge, result === "W" ? styles.win : styles.loss]}>
      <Text style={[styles.wlText, { color: colors.text }]}>{result}</Text>
    </View>
  )
}

export function GameCard({
  game,
  onPress,
  spoilerFreeMode = false,
  use24HourTime = false,
  highlightTeam,
}: GameCardProps): ReactElement {
  const isLive = game.status === "live"
  const hasScores = game.homeScore !== null && game.awayScore !== null
  const scoresHidden = spoilerFreeMode && hasScores

  let result: "W" | "L" | null = null
  if (
    highlightTeam &&
    game.status === "final" &&
    game.homeScore !== null &&
    game.awayScore !== null
  ) {
    const isHome = game.homeTeam === highlightTeam
    const myScore = isHome ? game.homeScore : game.awayScore
    const theirScore = isHome ? game.awayScore : game.homeScore
    result = myScore > theirScore ? "W" : "L"
  }

  return (
    <Card
      style={styles.card}
      onPress={
        onPress != null
          ? () => {
              onPress(game)
            }
          : undefined
      }
    >
      <View style={styles.row}>
        <View style={styles.teams}>
          <TeamLogo abbr={game.awayTeam} />
          <Text variant="subheading">{game.awayTeam}</Text>
          <Text variant="dim">@</Text>
          <TeamLogo abbr={game.homeTeam} />
          <Text variant="subheading">{game.homeTeam}</Text>
        </View>

        <View style={styles.right}>
          {result && <WLBadge result={result} />}
          {scoresHidden ? (
            <Text variant="dim" color={colors.textFaint}>
              tap
            </Text>
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
            <Text variant="dim">
              {formatGameTime(game.time, use24HourTime)}
            </Text>
          )}
        </View>
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
    gap: spacing.sm,
    flex: 1,
  },
  logo: {
    width: 22,
    height: 22,
  },
  logoFallback: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
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
  wlBadge: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  win: {
    backgroundColor: "#2d7a3a",
  },
  loss: {
    backgroundColor: "#8b1a1a",
  },
  wlText: {
    fontSize: 11,
    fontWeight: "700",
  },
})
