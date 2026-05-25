import { createNativeStackNavigator } from "@react-navigation/native-stack"

import GameDetailScreen from "../screens/GameDetailScreen"
import ScheduleScreen from "../screens/ScheduleScreen"
import { type ScheduleStackParamList } from "./types"

const Stack = createNativeStackNavigator<ScheduleStackParamList>()

const headerStyle = { backgroundColor: "#1a1a2e" } as const

export default function ScheduleStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: "#ffffff",
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
