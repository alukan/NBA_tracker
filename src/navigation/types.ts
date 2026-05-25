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

export type MainTabsParamList = {
  Schedule: NavigatorScreenParams<ScheduleStackParamList>
  Teams: NavigatorScreenParams<TeamsStackParamList>
}

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabsParamList>
}
