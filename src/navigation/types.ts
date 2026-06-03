import  { type NavigatorScreenParams } from "@react-navigation/native"

import  { type Game } from "@shared"

export type ScheduleStackParamList = {
  ScheduleList: undefined
  GameDetail: { game: Game }
}

export type TeamsStackParamList = {
  TeamsList: undefined
  TeamSchedule: { team: string }
  GameDetail: { game: Game }
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
