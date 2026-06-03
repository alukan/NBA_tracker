export type GameStatus = "upcoming" | "live" | "final"

export type Game = {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  date: string     // formatted for display, e.g. "May 22"
  time: string     // formatted for display, e.g. "7:30 PM"
  isoDate: string  // raw ISO string — used for sorting and grouping
  status: GameStatus
}

export type TeamInfo = {
  abbr: string    // normalized 3-letter code, e.g. "NYK"
  city: string    // e.g. "New York"
  name: string    // e.g. "Knicks"
  espnId: number  // ESPN numeric team ID
}
