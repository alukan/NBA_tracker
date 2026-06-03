import { useCallback, useMemo, useState } from "react"

import { type Game, MOCK_GAMES_PAGE_2 } from "@shared"

interface Section {
  title: string
  data: Game[]
}

/**
 * Manages SectionList data for the schedule feature.
 *
 * Takes the base game list and active team filter, and returns:
 *   - sections: games grouped by date, filtered by team
 *   - pull-to-refresh: resets extra pages back to the base list
 *   - onEndReached: appends the next page of games when the user scrolls to the bottom
 *
 * Owns all loading state so ScheduleList stays a pure rendering component.
 */
export function useScheduleSections(baseGames: Game[], selectedTeam: string | null): {
  sections: Section[]
  refreshing: boolean
  onRefresh: () => void
  onEndReached: () => void
  isLoadingMore: boolean
} {
  const [extraGames, setExtraGames] = useState<Game[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const sections = useMemo<Section[]>(() => {
    const all = [...baseGames, ...extraGames]
    const filtered = selectedTeam
      ? all.filter((g) => g.homeTeam === selectedTeam || g.awayTeam === selectedTeam)
      : all

    const byDate = new Map<string, Game[]>()
    for (const game of filtered) {
      const bucket = byDate.get(game.date) ?? []
      bucket.push(game)
      byDate.set(game.date, bucket)
    }

    return Array.from(byDate.entries()).map(([title, data]) => ({ title, data }))
  }, [baseGames, extraGames, selectedTeam])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setExtraGames([])
      setHasMore(true)
      setRefreshing(false)
    }, 1000)
  }, [])

  const onEndReached = useCallback(() => {
    if (!hasMore || isLoadingMore || extraGames.length > 0) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setExtraGames(MOCK_GAMES_PAGE_2)
      setHasMore(false)
      setIsLoadingMore(false)
    }, 800)
  }, [hasMore, isLoadingMore, extraGames.length])

  return { sections, refreshing, onRefresh, onEndReached, isLoadingMore }
}
