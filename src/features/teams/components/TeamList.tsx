/**
 * Reusability: MEDIUM — vertical NBA team browser.
 * Reusable anywhere a full team list with logos is needed.
 */

import { Image, FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { useState } from "react"

import { Text } from "@ds"
import { colors, spacing, radius } from "@ds"
import { NBA_TEAMS, teamLogoUrl, type TeamInfo } from "@shared"

interface TeamListProps {
  onSelect: (team: TeamInfo) => void
}

function TeamLogo({ abbr }: { abbr: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <View style={styles.logoFallback}>
        <Text variant="caption" style={styles.logoFallbackText}>{abbr}</Text>
      </View>
    )
  }
  return (
    <Image
      source={{ uri: teamLogoUrl(abbr) }}
      style={styles.logo}
      resizeMode="contain"
      onError={() => { setFailed(true) }}
    />
  )
}

function TeamRow({ team, onSelect }: { team: TeamInfo; onSelect: (t: TeamInfo) => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => { onSelect(team) }} activeOpacity={0.7}>
      <TeamLogo abbr={team.abbr} />
      <View style={styles.info}>
        <Text variant="subheading">{team.city}</Text>
        <Text variant="caption">{team.name}</Text>
      </View>
      <Text variant="dim" style={styles.chevron}>›</Text>
    </TouchableOpacity>
  )
}

export function TeamList({ onSelect }: TeamListProps) {
  return (
    <FlatList
      data={NBA_TEAMS}
      keyExtractor={(item) => item.abbr}
      renderItem={({ item }) => <TeamRow team={item} onSelect={onSelect} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
  },
  logoFallback: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  logoFallbackText: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 11,
  },
  info: {
    flex: 1,
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.xl + 44 + spacing.lg,
  },
})
