import { createNativeStackNavigator } from "@react-navigation/native-stack"

import GameDetailScreen from "../screens/GameDetailScreen"
import TeamScheduleScreen from "../screens/TeamScheduleScreen"
import TeamsScreen from "../screens/TeamsScreen"
import { type TeamsStackParamList } from "./types"

const Stack = createNativeStackNavigator<TeamsStackParamList>()

const headerStyle = { backgroundColor: "#1a1a2e" } as const

export default function TeamsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="TeamsList"
        component={TeamsScreen}
        options={{ title: "Teams" }}
      />
      <Stack.Screen
        name="TeamSchedule"
        component={TeamScheduleScreen}
        options={({ route }) => ({ title: `${route.params.team} Schedule` })}
      />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{ title: "Game Details" }}
      />
    </Stack.Navigator>
  )
}
