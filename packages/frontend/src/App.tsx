import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { PlayersListPage } from '@/pages/PlayersListPage'
import { PlayerDetailPage } from '@/pages/PlayerDetailPage'
import { PlayerEditPage } from '@/pages/PlayerEditPage'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayersListPage />} />
          <Route path="/player/:id" element={<PlayerDetailPage />} />
          <Route path="/player/:id/edit" element={<PlayerEditPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
