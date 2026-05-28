// Design tokens — primitive values only.
// No components, no StyleSheet imports.
// Every spacing, color, and typography value used across the app originates here.

/** Raw hex values — never reference these directly in components; use `colors` instead */
export const palette = {
  navy900: "#0f0f23",
  navy800: "#16213e",
  navy700: "#1a1a2e",
  navy600: "#2a2a4e",
  gray500: "#555555",
  gray600: "#666666",
  gray700: "#888888",
  white: "#ffffff",
  gold: "#c9a84c",
  red: "#e94560",
  black: "#000000",
} as const

/** Semantic color tokens — use these in all components and styles */
export const colors = {
  bg: palette.navy900,
  surface: palette.navy800,
  header: palette.navy700,
  border: palette.navy600,
  text: palette.white,
  textMuted: palette.gray700,
  textDim: palette.gray600,
  textFaint: palette.gray500,
  accent: palette.gold,
  live: palette.red,
  black: palette.black,
} as const

/** Spacing scale in density-independent pixels */
export const spacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
} as const

/** Font size scale */
export const fontSize = {
  xs: 11,
  sm: 13,
  md: 14,
  base: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
} as const

/** Font weight scale */
export const fontWeight = {
  regular: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
  heavy: "800" as const,
}

/** Letter spacing scale */
export const letterSpacing = {
  normal: 0,
  wide: 1,
  wider: 1.5,
} as const

/** Border radius scale */
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 999,
} as const
