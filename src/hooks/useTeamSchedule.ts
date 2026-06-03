import { useCallback, useEffect, useMemo, useState } from "react"

import { type Game } from "@shared"

import { fetchTeamSchedule } from "../services/gamesApi"

/**
 * Returns the ESPN season year for the current NBA season.
 * ESPN names seasons by their ending calendar year (e.g. 2025-26 → 2026).
 * The season starts in October, so Oct-Dec use next year; Jan-Sep use current year.
 */
function currentNbaSeason(): number {
  const now = new Date()
  return now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear()
}
const PAGE_SIZE = 15 // games revealed per onEndReached

type Section = {
  title: string // e.g. "June 2025"
  data: Game[]
}

function monthLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

/**
 * Fetches the full 2024-25 season schedule for `team` in a single request,
 * then paginates display-side (PAGE_SIZE games per page) so the list grows
 * incrementally as the user scrolls.
 *
 * Returns SectionList-ready sections grouped by calendar month,
 * sorted most-recent first.
 */
export function useTeamSchedule(team: string): {
  sections: Section[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  onEndReached: () => void
  isLoadingMore: boolean
} {
  const [allGames, setAllGames] = useState<Game[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    setPage(1)
    fetchTeamSchedule(team, currentNbaSeason())
      .then((games) => {
        setAllGames(games)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load schedule")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [team])

  const visibleGames = useMemo(
    () => allGames.slice(0, page * PAGE_SIZE),
    [allGames, page],
  )

  const hasMore = visibleGames.length < allGames.length

  const sections = useMemo<Section[]>(() => {
    const byMonth = new Map<string, Game[]>()
    for (const game of visibleGames) {
      const label = monthLabel(game.isoDate)
      const bucket = byMonth.get(label) ?? []
      bucket.push(game)
      byMonth.set(label, bucket)
    }
    return Array.from(byMonth.entries()).map(([title, data]) => ({
      title,
      data,
    }))
  }, [visibleGames])

  const onEndReached = useCallback(() => {
    if (hasMore) setPage((p) => p + 1)
  }, [hasMore])

  return {
    sections,
    isLoading,
    error,
    hasMore,
    onEndReached,
    isLoadingMore: false,
  }
}
