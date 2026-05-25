import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Text } from "react-native"

import ScheduleStack from "./ScheduleStack"
import TeamsStack from "./TeamsStack"
import { type MainTabsParamList } from "./types"

const Tab = createBottomTabNavigator<MainTabsParamList>()

const tabBarStyle = { backgroundColor: "#1a1a2e", borderTopColor: "#2a2a4e" }
const tabBarActiveTintColor = "#c9a84c"
const tabBarInactiveTintColor = "#666"

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📅</Text>,
        }}
      />
      <Tab.Screen
        name="Teams"
        component={TeamsStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏀</Text>,
        }}
      />
    </Tab.Navigator>
  )
}
