/**
 * Reusability: HIGH
 * Generic text primitive with named variants. No domain knowledge — safe to use anywhere in the app.
 * Use `variant` for common text styles, `color` to override the variant's default color,
 * and `style` for one-off layout adjustments.
 */

import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from "react-native"

import { colors, fontSize, fontWeight, letterSpacing } from "../tokens"

export type TextVariant =
  | "heading"   // Large, heavy — team names, screen titles
  | "subheading" // Medium bold — card titles, list items
  | "score"     // Extra-large bold — live/final score display
  | "body"      // Default reading text
  | "dim"       // Secondary/tertiary info in a muted color
  | "caption"   // Small supplemental label
  | "label"     // All-caps section header with letter spacing

interface TextProps extends RNTextProps {
  variant?: TextVariant
  color?: string
}

export function Text({ variant = "body", color, style, ...props }: TextProps) {
  return (
    <RNText
      style={[variantStyles[variant], color != null ? { color } : undefined, style]}
      {...props}
    />
  )
}

const variantStyles = StyleSheet.create({
  heading: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.heavy,
  },
  subheading: {
    color: colors.text,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
  },
  score: {
    color: colors.text,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  body: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
  },
  dim: {
    color: colors.textDim,
    fontSize: fontSize.sm,
  },
  caption: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wide,
    textTransform: "uppercase",
  },
})
