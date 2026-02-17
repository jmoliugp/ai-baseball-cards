import { useParams, useNavigate } from 'react-router-dom'
import { usePlayer } from '@/hooks/usePlayer'

export function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: player, isLoading, error } = usePlayer(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Player not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-accent-blue hover:text-blue-400 transition-colors"
          >
            Go back to list
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="text-accent-blue hover:text-blue-400 transition-colors mb-6 inline-flex items-center gap-2"
        >
          <span>←</span> Back to players
        </button>

        <div className="card p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{player.name}</h1>
            <p className="text-lg text-slate-400">
              {player.team} {player.position && `• ${player.position}`}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="stat-card bg-accent-blue/10 border border-accent-blue/20">
              <p className="text-3xl font-bold text-accent-blue">{player.hits}</p>
              <p className="text-sm text-slate-400 mt-1 font-medium">Hits</p>
            </div>
            <div className="stat-card bg-accent-green/10 border border-accent-green/20">
              <p className="text-3xl font-bold text-accent-green">{player.homeRuns}</p>
              <p className="text-sm text-slate-400 mt-1 font-medium">Home Runs</p>
            </div>
            <div className="stat-card bg-accent-purple/10 border border-accent-purple/20">
              <p className="text-3xl font-bold text-accent-purple">{player.average.toFixed(3)}</p>
              <p className="text-sm text-slate-400 mt-1 font-medium">Average</p>
            </div>
            {player.atBats && (
              <div className="stat-card bg-accent-orange/10 border border-accent-orange/20">
                <p className="text-3xl font-bold text-accent-orange">{player.atBats}</p>
                <p className="text-sm text-slate-400 mt-1 font-medium">At Bats</p>
              </div>
            )}
          </div>

          {player.runs !== undefined && player.rbi !== undefined && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="stat-card bg-accent-yellow/10 border border-accent-yellow/20">
                <p className="text-2xl font-bold text-accent-yellow">{player.runs}</p>
                <p className="text-sm text-slate-400 mt-1 font-medium">Runs</p>
              </div>
              <div className="stat-card bg-blue-400/10 border border-blue-400/20">
                <p className="text-2xl font-bold text-blue-400">{player.rbi}</p>
                <p className="text-sm text-slate-400 mt-1 font-medium">RBI</p>
              </div>
            </div>
          )}

          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-xl font-bold text-white mb-3">AI Description</h2>
            {player.description ? (
              <p className="text-slate-300 leading-relaxed">{player.description}</p>
            ) : (
              <div className="text-center py-8 bg-bg-tertiary/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 mb-4">No AI description generated yet</p>
                <button className="btn-primary">Generate Description</button>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => navigate(`/player/${player.id}/edit`)} className="btn-success">
              Edit Player
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
