import { useCallback, useEffect, useState } from "react"

import { type Game } from "@shared"
import { fetchGames } from "../services/gamesApi"

/**
 * Fetches NBA games from the ESPN scoreboard and manages all loading state.
 *
 * - Initial load on mount (today's games)
 * - refresh: re-fetches today, resets load-more eligibility
 * - loadMore: fetches next-week games and appends them (one page only)
 */
export function useGames(): {
  games: Game[]
  isLoading: boolean
  error: string | null
  refreshing: boolean
  refresh: () => void
  isLoadingMore: boolean
  loadMore: () => void
} {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetchGames()
      .then((data) => { setGames(data) })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load games")
      })
      .finally(() => { setIsLoading(false) })
  }, [])

  const refresh = useCallback(() => {
    setRefreshing(true)
    setError(null)
    fetchGames()
      .then((data) => { setGames(data); setHasMore(true) })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load games")
      })
      .finally(() => { setRefreshing(false) })
  }, [])

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return
    setIsLoadingMore(true)
    fetchGames([7, 10, 14])
      .then((data) => { setGames((prev) => [...prev, ...data]); setHasMore(false) })
      .catch(() => { /* silently ignore load-more errors */ })
      .finally(() => { setIsLoadingMore(false) })
  }, [hasMore, isLoadingMore])

  return { games, isLoading, error, refreshing, refresh, isLoadingMore, loadMore }
}
