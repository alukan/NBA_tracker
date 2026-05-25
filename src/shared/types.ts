export type GameStatus = "upcoming" | "live" | "final"

export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  date: string
  time: string
  status: GameStatus
}
