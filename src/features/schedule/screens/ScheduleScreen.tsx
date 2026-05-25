import { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors, MOCK_GAMES } from "@shared"

import { ScheduleList } from "../components/ScheduleList"
import { TeamSelector } from "../../teams/components/TeamSelector"
import { type ScheduleStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<ScheduleStackParamList, "ScheduleList">

export function ScheduleScreen({ navigation }: Props) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const handleSelectTeam = useCallback((team: string) => {
    setSelectedTeam((prev) => (prev === team ? null : team))
  }, [])

  return (
    <View style={styles.root}>
      <TeamSelector selected={selectedTeam} onSelect={handleSelectTeam} />
      <ScheduleList
        games={MOCK_GAMES}
        selectedTeam={selectedTeam}
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
