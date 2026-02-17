import { useState } from 'react'
import { usePlayers } from '@/hooks/usePlayers'
import { PlayerCard } from '@/components/PlayerCard'
import { useNavigate } from 'react-router-dom'

export function PlayersListPage() {
  const [sortBy, setSortBy] = useState<'hits' | 'homeRuns'>('hits')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const { data: players, isLoading } = usePlayers(sortBy, order)
  const navigate = useNavigate()

  if (isLoading) {
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

        <div className="card p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-slate-300">Sort by:</span>
            <select
              className="bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'hits' | 'homeRuns')}
            >
              <option value="hits">Hits</option>
              <option value="homeRuns">Home Runs</option>
            </select>

            <select
              className="bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2 text-sm text-slate-200 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              value={order}
              onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <div className="ml-auto text-sm text-slate-400">{players?.length || 0} players</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players?.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={() => navigate(`/player/${player.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
