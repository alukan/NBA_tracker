import { type Game, type GameStatus, NBA_TEAMS } from "@shared"

/**
 * ESPN uses non-standard abbreviations for several teams.
 * Map them to the 3-letter codes used everywhere else in the app.
 */
const ESPN_ABBR: Record<string, string> = {
  GS: "GSW",
  NO: "NOP",
  NY: "NYK",
  SA: "SAS",
  PHO: "PHX",
  UTH: "UTA",
}

function normalizeAbbr(raw: string): string {
  return ESPN_ABBR[raw] ?? raw
}

const ESPN_SCOREBOARD =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"

function toDateParam(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}${m}${day}`
}

function mapStatus(name: string): GameStatus {
  if (name === "STATUS_IN_PROGRESS" || name === "STATUS_HALFTIME") return "live"
  if (name.startsWith("STATUS_FINAL")) return "final"
  return "upcoming"
}

function parseScore(raw: unknown, status: GameStatus): number | null {
  if (status === "upcoming") return null
  // Scoreboard returns a plain string; team schedule returns { value, displayValue }
  const str =
    typeof raw === "string" ? raw
    : typeof raw === "object" && raw !== null
      ? String((raw as { displayValue?: string }).displayValue ?? "")
      : ""
  const n = parseInt(str, 10)
  return isNaN(n) ? null : n
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(event: any): Game {
  const competition = event.competitions[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const home = competition.competitors.find((c: any) => c.homeAway === "home")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const away = competition.competitors.find((c: any) => c.homeAway === "away")
  // The scoreboard endpoint puts status at event.status.type.name;
  // the team schedule endpoint puts it at event.competitions[0].status.type.name.
  const statusType = event.status?.type ?? competition?.status?.type
  const status = mapStatus((statusType?.name ?? "") as string)

  return {
    id: event.id as string,
    homeTeam: normalizeAbbr((home?.team.abbreviation ?? "???") as string),
    awayTeam: normalizeAbbr((away?.team.abbreviation ?? "???") as string),
    homeScore: parseScore(home?.score as string | undefined, status),
    awayScore: parseScore(away?.score as string | undefined, status),
    date: formatDate(event.date as string),
    time: formatTime(event.date as string),
    isoDate: event.date as string,
    status,
  }
}

const ESPN_TEAMS =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams"

async function fetchTeamSchedulePage(url: string): Promise<Game[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = (await res.json()) as { events?: unknown[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.events ?? []).map((e) => mapEvent(e as any))
}

/**
 * Fetches all games for a team in a given season (regular season + playoffs).
 * `season` is the ending year (e.g. 2025 for the 2024-25 season).
 * Returns games sorted most-recent first.
 */
export async function fetchTeamSchedule(abbr: string, season: number): Promise<Game[]> {
  const team = NBA_TEAMS.find((t) => t.abbr === abbr)
  if (!team) throw new Error(`Unknown team: ${abbr}`)

  const base = `${ESPN_TEAMS}/${team.espnId}/schedule?season=${season}`
  const [regular, postseason] = await Promise.all([
    fetchTeamSchedulePage(`${base}&seasontype=2`),
    fetchTeamSchedulePage(`${base}&seasontype=3`),
  ])

  const all = [...regular, ...postseason]
  all.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
  return all
}

async function fetchDay(date?: Date): Promise<Game[]> {
  const url = date
    ? `${ESPN_SCOREBOARD}?dates=${toDateParam(date)}`
    : ESPN_SCOREBOARD

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = (await res.json()) as { events?: unknown[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (json.events ?? []).map((e) => mapEvent(e as any))
}

function daysFrom(base: Date, offset: number): Date {
  const d = new Date(base)
  d.setDate(d.getDate() + offset)
  return d
}

/**
 * Fetches NBA games from the ESPN scoreboard endpoint.
 *
 * Pass offsets (in days relative to today) to control the window fetched.
 * Defaults to [-3, 0, +3] so every team has at least some games visible.
 * Results are deduplicated by game ID and sorted chronologically.
 */
export async function fetchGames(offsets = [-3, 0, 3]): Promise<Game[]> {
  const today = new Date()
  const results = await Promise.all(
    offsets.map((n) => fetchDay(n === 0 ? undefined : daysFrom(today, n))),
  )
  const seen = new Set<string>()
  const games: Game[] = []
  for (const batch of results) {
    for (const game of batch) {
      if (!seen.has(game.id)) {
        seen.add(game.id)
        games.push(game)
      }
    }
  }
  return games
}
