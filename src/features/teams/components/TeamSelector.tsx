/**
 * Reusability: MEDIUM — NBA team filter bar.
 * Reusable wherever a horizontal NBA team chip selector is needed,
 * but tied to the hardcoded NBA team list.
 */

import { useRef } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { Chip, Text } from "@ds"
import { colors, spacing } from "@ds"

const NBA_TEAMS = [
  "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN",
  "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA",
  "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX",
  "POR", "SAC", "SAS", "TOR", "UTA", "WAS",
]

interface TeamSelectorProps {
  selected: string | null
  onSelect: (team: string) => void
}

export function TeamSelector({ selected, onSelect }: TeamSelectorProps) {
  const scrollRef = useRef<ScrollView>(null)

  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.sectionLabel}>Favorite Team</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {NBA_TEAMS.map((team) => (
          <Chip
            key={team}
            label={team}
            selected={selected === team}
            onPress={() => { onSelect(team) }}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionLabel: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
})
