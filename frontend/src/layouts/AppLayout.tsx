import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        {/* Fixed player at bottom */}
        <Player />
      </div>
    </div>
  )
}
