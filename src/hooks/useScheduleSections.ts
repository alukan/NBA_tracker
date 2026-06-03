import { useMemo } from "react"

import { type Game } from "@shared"

import { useGames } from "./useGames"

type Section = {
  title: string
  data: Game[]
}

/**
 * Combines live game data with section grouping for the schedule SectionList.
 *
 * Delegates all fetching, refresh, and load-more state to useGames.
 * Responsible only for filtering by team and grouping results by date.
 */
export function useScheduleSections(selectedTeam: string | null): {
  sections: Section[]
  isLoading: boolean
  error: string | null
  refreshing: boolean
  onRefresh: () => void
  isLoadingMore: boolean
  onEndReached: () => void
} {
  const {
    games,
    isLoading,
    error,
    refreshing,
    refresh,
    isLoadingMore,
    loadMore,
  } = useGames()

  const sections = useMemo<Section[]>(() => {
    const filtered = selectedTeam
      ? games.filter(
          (g) => g.homeTeam === selectedTeam || g.awayTeam === selectedTeam,
        )
      : games

    const byDate = new Map<string, Game[]>()
    for (const game of filtered) {
      const bucket = byDate.get(game.date) ?? []
      bucket.push(game)
      byDate.set(game.date, bucket)
    }

    return Array.from(byDate.entries()).map(([title, data]) => ({
      title,
      data,
    }))
  }, [games, selectedTeam])

  return {
    sections,
    isLoading,
    error,
    refreshing,
    onRefresh: refresh,
    isLoadingMore,
    onEndReached: loadMore,
  }
}
