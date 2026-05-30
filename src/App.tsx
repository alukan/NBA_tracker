import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

import { SettingsProvider } from "./context/SettingsContext"
import RootNavigator from "./navigation/RootNavigator"

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SettingsProvider>
  )
}

export default App
