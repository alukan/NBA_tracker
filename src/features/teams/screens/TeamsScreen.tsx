/**
 * Reusability: LOW — page-level screen.
 * Specific to the Teams tab entry point. Not intended for reuse.
 */

import { type NativeStackScreenProps } from "@react-navigation/native-stack"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { colors } from "@ds"
import { type TeamInfo } from "@shared"

import { type TeamsStackParamList } from "../../../navigation/types"
import { TeamList } from "../components/TeamList"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamsList">

export function TeamsScreen({ navigation }: Props): ReactElement {
  function handleSelect(team: TeamInfo): void {
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
