import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { colors } from "@shared"
import { GameDetailScreen } from "../features/schedule/screens/GameDetailScreen"
import { TeamsScreen } from "../features/teams/screens/TeamsScreen"
import { TeamScheduleScreen } from "../features/teams/screens/TeamScheduleScreen"
import { type TeamsStackParamList } from "./types"

const Stack = createNativeStackNavigator<TeamsStackParamList>()

const headerStyle = { backgroundColor: colors.header } as const

export default function TeamsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: colors.text,
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
