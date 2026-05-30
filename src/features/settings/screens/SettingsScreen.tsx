/**
 * Reusability: LOW — page-level screen.
 * Specific to the Settings tab. Not intended for reuse.
 */

import { ScrollView, StyleSheet, Switch, TextInput, View } from "react-native"

import { Text } from "@ds"
import { colors, fontSize, spacing } from "@ds"

import { useAppSettings } from "../../../context/SettingsContext"

export function SettingsScreen() {
  const { settings, updateSetting } = useAppSettings()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="label" style={styles.sectionLabel}>Profile</Text>

      <View style={styles.fieldGroup}>
        <View style={styles.field}>
          <Text variant="dim">Display Name</Text>
          <TextInput
            style={styles.input}
            value={settings.displayName}
            onChangeText={(text) => { updateSetting("displayName", text) }}
            placeholder="Your name"
            placeholderTextColor={colors.textFaint}
            returnKeyType="done"
          />
        </View>
      </View>

      <Text variant="label" style={styles.sectionLabel}>Preferences</Text>

      <View style={styles.fieldGroup}>
        <View style={styles.row}>
          <Text variant="body">Enable Notifications</Text>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={(val) => { updateSetting("notificationsEnabled", val) }}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.text}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowLabel}>
            <Text variant="body">Spoiler-Free Mode</Text>
            <Text variant="dim">Hide scores until you tap a game</Text>
          </View>
          <Switch
            value={settings.spoilerFreeMode}
            onValueChange={(val) => { updateSetting("spoilerFreeMode", val) }}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.text}
          />
        </View>
        <View style={[styles.row, styles.rowLast]}>
          <Text variant="body">24-Hour Time</Text>
          <Switch
            value={settings.use24HourTime}
            onValueChange={(val) => { updateSetting("use24HourTime", val) }}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={colors.text}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: spacing.xxxl,
  },
  sectionLabel: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.sm,
  },
  fieldGroup: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  field: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  input: {
    color: colors.text,
    fontSize: fontSize.base,
    paddingVertical: spacing.xs,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    gap: spacing.xs,
  },
})
