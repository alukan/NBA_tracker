import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>
        Magna laboris qui sit irure consectetur. Commodo anim sit nulla
        adipisicing reprehenderit eu cupidatat sit eu consequat. Velit commodo
        culpa veniam id nulla sunt Lorem ut id sunt ipsum esse incididunt
        officia. Veniam sint nulla aute enim.
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})