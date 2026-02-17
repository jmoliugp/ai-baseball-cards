import { useParams, useNavigate } from 'react-router-dom'
import { usePlayer } from '@/hooks/usePlayer'
import { useState } from 'react'

export function PlayerEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: player } = usePlayer(id || '')

  const [formData, setFormData] = useState({
    name: player?.name || '',
    team: player?.team || '',
    position: player?.position || '',
    hits: player?.hits || 0,
    homeRuns: player?.homeRuns || 0,
    average: player?.average || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement update logic in Phase 4
    alert('Update functionality will be implemented in Phase 4')
    navigate(`/player/${id}`)
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Player not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(`/player/${id}`)}
          className="text-accent-blue hover:text-blue-400 transition-colors mb-6 inline-flex items-center gap-2"
        >
          <span>←</span> Back to player
        </button>

        <div className="card p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Edit Player</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Team</label>
              <input
                type="text"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hits</label>
                <input
                  type="number"
                  value={formData.hits}
                  onChange={(e) => setFormData({ ...formData, hits: Number(e.target.value) })}
                  className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Home Runs</label>
                <input
                  type="number"
                  value={formData.homeRuns}
                  onChange={(e) => setFormData({ ...formData, homeRuns: Number(e.target.value) })}
                  className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Average</label>
                <input
                  type="number"
                  value={formData.average}
                  onChange={(e) => setFormData({ ...formData, average: Number(e.target.value) })}
                  className="w-full bg-bg-tertiary border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                  required
                  min="0"
                  max="1"
                  step="0.001"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(`/player/${id}`)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
