// ESPN's logo CDN uses non-standard paths for a handful of teams.
const ESPN_LOGO_ABBR: Record<string, string> = {
  UTA: "utah",
  NOP: "no",
}

/**
 * Returns the ESPN CDN URL for a team's logo given its normalized abbreviation.
 */
export function teamLogoUrl(abbr: string): string {
  const cdnAbbr = ESPN_LOGO_ABBR[abbr] ?? abbr.toLowerCase()
  return `https://a.espncdn.com/i/teamlogos/nba/500/${cdnAbbr}.png`
}

/**
 * Converts a 12-hour time string (e.g. "7:30 PM") to 24-hour format ("19:30").
 * Returns the original string unchanged if it cannot be parsed or use24Hour is false.
 */
export function formatGameTime(time: string, use24Hour: boolean): string {
  if (!use24Hour) return time
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time)
  if (!match) return time
  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const period = match[3].toUpperCase()
  if (period === "PM" && hours !== 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0
  return `${String(hours).padStart(2, "0")}:${minutes}`
}
