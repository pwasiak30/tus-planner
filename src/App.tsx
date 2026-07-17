import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Library from './pages/Library'
import Planner from './pages/Planner'
import Tracker from './pages/Tracker'
import Stories from './pages/Stories'
import Cards from './pages/Cards'
import Groups from './pages/Groups'
import Progress from './pages/Progress'
import { seedIfEmpty } from './db'

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedIfEmpty().then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/biblioteka" replace />} />
          <Route path="/biblioteka" element={<Library />} />
          <Route path="/planer" element={<Planner />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/historyjki" element={<Stories />} />
          <Route path="/karty" element={<Cards />} />
          <Route path="/grupy" element={<Groups />} />
          <Route path="/analiza" element={<Progress />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
