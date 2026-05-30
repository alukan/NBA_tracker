import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { colors } from "@shared"

import { SettingsScreen } from "../features/settings/screens/SettingsScreen"
import { type SettingsStackParamList } from "./types"

const Stack = createNativeStackNavigator<SettingsStackParamList>()

const headerStyle = { backgroundColor: colors.header } as const

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  )
}
