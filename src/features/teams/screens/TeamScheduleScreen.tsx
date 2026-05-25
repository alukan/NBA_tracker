import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors, MOCK_GAMES } from "@shared"

import { ScheduleList } from "../../schedule/components/ScheduleList"
import { type TeamsStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamSchedule">

export function TeamScheduleScreen({ route, navigation }: Props) {
  const { team } = route.params

  return (
    <View style={styles.root}>
      <ScheduleList
        games={MOCK_GAMES}
        selectedTeam={team}
        onPressGame={(game) => {
          navigation.navigate("GameDetail", { gameId: game.id })
        }}
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
