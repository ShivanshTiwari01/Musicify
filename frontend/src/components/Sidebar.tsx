import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Library, Music2, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/library', icon: Library, label: 'Your Library' },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="flex flex-col w-60 min-h-full bg-[#111111] border-r border-[#2a2a2a] px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-9 h-9 rounded-lg bg-[#e5173f] flex items-center justify-center shadow-lg shadow-[#e5173f]/30">
          <Music2 size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Musicify</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#e5173f]/15 text-[#e5173f]'
                  : 'text-[#888888] hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-[#e5173f]' : ''} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[#2a2a2a] pt-4 mt-4">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#e5173f]/20 border border-[#e5173f]/40 flex items-center justify-center text-[#e5173f] text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-[#888888] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#888888] hover:text-[#e5173f] hover:bg-[#e5173f]/10 transition-all duration-150"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
