/**
 * Reusability: HIGH
 * Generic status/label badge. No domain knowledge — caller supplies label text and color.
 * Intended for short, uppercase, high-contrast labels like "LIVE", "FINAL", or "UPCOMING".
 */

import { type ReactElement } from "react"
import { StyleSheet } from "react-native"

import { fontWeight, letterSpacing, fontSize } from "../tokens"

import { Text } from "./Text"

type BadgeProps = {
  label: string
  color: string
}

export function Badge({ label, color }: BadgeProps): ReactElement {
  return <Text style={[styles.badge, { color }]}>{label}</Text>
}

const styles = StyleSheet.create({
  badge: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.wider,
  },
})
