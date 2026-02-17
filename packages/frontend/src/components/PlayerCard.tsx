import type { Player } from '@/types/player'

interface PlayerCardProps {
  player: Player
  onClick?: () => void
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  return (
    <button type="button" className="card card-hover p-6 text-left w-full" onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{player.name}</h3>
          <p className="text-sm text-slate-400">
            {player.team} {player.position && `• ${player.position}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-br from-accent-blue to-blue-400 bg-clip-text text-transparent">
            {player.hits}
          </p>
          <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Hits</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-br from-accent-green to-emerald-400 bg-clip-text text-transparent">
            {player.homeRuns}
          </p>
          <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Home Runs</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-br from-accent-purple to-purple-400 bg-clip-text text-transparent">
            {player.average.toFixed(3)}
          </p>
          <p className="text-xs text-slate-500 uppercase font-semibold mt-1">AVG</p>
        </div>
      </div>
    </button>
  )
}
