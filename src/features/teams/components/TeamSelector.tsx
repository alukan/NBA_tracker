import { useRef } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { colors } from "@shared"

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
      <Text style={styles.label}>Favorite Team</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {NBA_TEAMS.map((team) => (
          <TouchableOpacity
            key={team}
            style={[styles.chip, selected === team && styles.chipSelected]}
            onPress={() => { onSelect(team) }}
          >
            <Text
              style={[
                styles.chipText,
                selected === team && styles.chipTextSelected,
              ]}
            >
              {team}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: colors.bg,
  },
  chipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#000",
  },
})
