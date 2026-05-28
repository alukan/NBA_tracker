/**
 * Reusability: HIGH
 * Generic selectable pill/chip. No domain knowledge — safe to use anywhere in the app.
 * Handles both selected and unselected visual states internally.
 */

import { StyleSheet, TouchableOpacity } from "react-native"

import { Text } from "./Text"
import { colors, fontWeight, fontSize, radius, spacing } from "../tokens"

interface ChipProps {
  label: string
  selected?: boolean
  onPress: () => void
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  chipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  text: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  textSelected: {
    color: colors.black,
  },
})
