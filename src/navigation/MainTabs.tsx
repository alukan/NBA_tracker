import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text } from "react-native"

import { colors, fontSize } from "@ds"

import ScheduleStack from "./ScheduleStack"
import SettingsStack from "./SettingsStack"
import TeamsStack from "./TeamsStack"
import { type MainTabsParamList } from "./types"

const Tab = createBottomTabNavigator<MainTabsParamList>()

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.header, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDim,
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: fontSize.xxl }}>📅</Text>,
        }}
      />
      <Tab.Screen
        name="Teams"
        component={TeamsStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: fontSize.xxl }}>🏀</Text>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: fontSize.xxl }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  )
}
