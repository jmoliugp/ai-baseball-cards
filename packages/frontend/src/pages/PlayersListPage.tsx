import { useState } from 'react'
import { usePlayers } from '@/hooks/usePlayers'
import { PlayerCard } from '@/components/PlayerCard'
import { useNavigate } from 'react-router-dom'

export function PlayersListPage() {
  const [sortBy, setSortBy] = useState<'hits' | 'homeRuns' | 'average' | 'atBats' | 'runs' | 'rbi'>('hits')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  
  const { data: result, isLoading, isFetching } = usePlayers(sortBy, order, page, limit)
  const navigate = useNavigate()

  const players = result?.data || []
  const pagination = result?.pagination

  // Only show full loading screen on initial load, not when refetching
  if (isLoading && !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-row">
            <h1 className="text-5xl font-bold mb-2 mr-3">⚾</h1>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green bg-clip-text text-transparent">
              Baseball Cards
            </h1>
          </div>
          <p className="text-slate-400">AI-powered player statistics viewer</p>
        </div>

        <div className="card p-4 mb-6 relative">
          {isFetching && result && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
            </div>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-slate-300">Sort by:</span>
            <select
              className="bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as typeof sortBy)
                setPage(1) // Reset to first page when sorting changes
              }}
            >
              <option value="hits">Hits</option>
              <option value="homeRuns">Home Runs</option>
              <option value="average">Batting Average</option>
              <option value="atBats">At Bats</option>
              <option value="runs">Runs</option>
              <option value="rbi">RBI</option>
            </select>

            <select
              className="bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value as 'asc' | 'desc')
                setPage(1) // Reset to first page when order changes
              }}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <span className="text-sm font-medium text-slate-300">Per page:</span>
            <select
              className="bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value))
                setPage(1) // Reset to first page when limit changes
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <div className="ml-auto text-sm text-slate-400">
              {pagination ? (
                <>
                  Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, pagination.total)} of {pagination.total} players
                </>
              ) : (
                `${players.length} players`
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={() => navigate(`/player/${player.id}`)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="card p-4">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrev}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <span className="text-slate-300">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={!pagination.hasNext}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

