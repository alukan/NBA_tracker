import type { NavigatorScreenParams } from "@react-navigation/native"

export type ScheduleStackParamList = {
  ScheduleList: undefined
  GameDetail: { gameId: string }
}

export type TeamsStackParamList = {
  TeamsList: undefined
  TeamSchedule: { team: string }
  GameDetail: { gameId: string }
}

export type SettingsStackParamList = {
  Settings: undefined
}

export type MainTabsParamList = {
  Schedule: NavigatorScreenParams<ScheduleStackParamList>
  Teams: NavigatorScreenParams<TeamsStackParamList>
  Settings: NavigatorScreenParams<SettingsStackParamList>
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabsParamList>
}
