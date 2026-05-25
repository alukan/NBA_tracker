import { StyleSheet, View } from "react-native"

import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import TeamSelector from "../components/TeamSelector"
import { type TeamsStackParamList } from "../navigation/types"

type Props = NativeStackScreenProps<TeamsStackParamList, "TeamsList">

export default function TeamsScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <TeamSelector
        selected={null}
        onSelect={(team) => {
          navigation.navigate("TeamSchedule", { team })
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
