/**
 * Reusability: HIGH
 * Generic surface container. No domain knowledge — safe to use anywhere in the app.
 * Renders a TouchableOpacity when `onPress` is provided, otherwise a plain View.
 */

import { StyleSheet, TouchableOpacity, View, type ViewStyle } from "react-native"

import { colors, radius, spacing } from "../tokens"

interface CardProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}

export function Card({ children, onPress, style }: CardProps) {
  if (onPress != null) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    )
  }
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
})
