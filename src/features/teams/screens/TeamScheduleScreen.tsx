/**
 * Reusability: LOW — page-level screen.
 * Specific to the team-filtered schedule view. Not intended for reuse.
 */

import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors } from "@ds"
import { MOCK_GAMES } from "@shared"

import { useAppSettings } from "../../../context/SettingsContext"
import { ScheduleList } from "../../schedule/components/ScheduleList"
import { type TeamsStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamSchedule">

export function TeamScheduleScreen({ route, navigation }: Props) {
  const { team } = route.params
  const { settings } = useAppSettings()

  return (
    <View style={styles.root}>
      <ScheduleList
        games={MOCK_GAMES}
        selectedTeam={team}
        onPressGame={(game) => {
          navigation.navigate("GameDetail", { gameId: game.id })
        }}
        spoilerFreeMode={settings.spoilerFreeMode}
        use24HourTime={settings.use24HourTime}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
})
