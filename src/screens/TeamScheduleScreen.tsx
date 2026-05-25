import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import ScheduleList from "../components/ScheduleList"
import { MOCK_GAMES } from "../data/games"
import { type TeamsStackParamList } from "../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamSchedule">

export default function TeamScheduleScreen({ route, navigation }: Props) {
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
    backgroundColor: "#0f0f23",
  },
})
