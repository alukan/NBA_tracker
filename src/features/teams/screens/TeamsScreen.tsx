/**
 * Reusability: LOW — page-level screen.
 * Specific to the Teams tab entry point. Not intended for reuse.
 */

import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { colors } from "@ds"
import { type TeamInfo } from "@shared"

import { TeamList } from "../components/TeamList"
import { type TeamsStackParamList } from "../../../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamsList">

export function TeamsScreen({ navigation }: Props) {
  function handleSelect(team: TeamInfo) {
    navigation.navigate("TeamSchedule", { team: team.abbr })
  }

  return (
    <View style={styles.root}>
      <TeamList onSelect={handleSelect} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
})
