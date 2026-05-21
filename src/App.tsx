import { useCallback, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import TeamSelector from "./components/TeamSelector"
import ScheduleList from "./components/ScheduleList"
import { type Game } from "./components/GameCard"

const MOCK_GAMES: Game[] = [
  {
    id: "1",
    awayTeam: "BOS",
    homeTeam: "NYK",
    date: "May 22",
    time: "7:30 PM",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
  },
  {
    id: "2",
    awayTeam: "LAL",
    homeTeam: "GSW",
    date: "May 22",
    time: "10:00 PM",
    homeScore: 108,
    awayScore: 104,
    status: "live",
  },
  {
    id: "3",
    awayTeam: "MIA",
    homeTeam: "BOS",
    date: "May 21",
    time: "8:00 PM",
    homeScore: 112,
    awayScore: 99,
    status: "final",
  },
  {
    id: "4",
    awayTeam: "DEN",
    homeTeam: "OKC",
    date: "May 23",
    time: "9:00 PM",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
  },
  {
    id: "5",
    awayTeam: "NYK",
    homeTeam: "PHI",
    date: "May 23",
    time: "7:00 PM",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
  },
  {
    id: "6",
    awayTeam: "MIL",
    homeTeam: "IND",
    date: "May 21",
    time: "7:00 PM",
    homeScore: 120,
    awayScore: 115,
    status: "final",
  },
]

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const handleSelectTeam = useCallback((team: string) => {
    setSelectedTeam((prev) => (prev === team ? null : team))
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>NBA Schedule</Text>
        <View style={styles.liveBadge}>
          <Text style={styles.liveBadgeText}>● LIVE</Text>
        </View>
      </View>
      <TeamSelector selected={selectedTeam} onSelect={handleSelectTeam} />
      <ScheduleList games={MOCK_GAMES} selectedTeam={selectedTeam} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f0f23",
  },
  header: {
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a2e",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a4e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  liveBadge: {
    backgroundColor: "#1a0a0a",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e94560",
  },
  liveBadgeText: {
    color: "#e94560",
    fontSize: 11,
    fontWeight: "700",
  },
})
