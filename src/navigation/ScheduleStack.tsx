import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { GameDetailScreen } from "../features/schedule/screens/GameDetailScreen"
import { ScheduleScreen } from "../features/schedule/screens/ScheduleScreen"
import { colors } from "@shared"
import { type ScheduleStackParamList } from "./types"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const headerStyle = { backgroundColor: colors.header } as const

export default function ScheduleStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ScheduleList"
        component={ScheduleScreen}
        options={{ title: "NBA Schedule" }}
      />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{ title: "Game Details" }}
      />
    </Stack.Navigator>
  )
}
