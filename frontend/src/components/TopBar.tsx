import { Search, Bell } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

interface TopBarProps {
  title?: string
}

export default function TopBar({ title = 'Good evening' }: TopBarProps) {
  const { user } = useAuthStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-10">
      <div>
        <p className="text-xs text-[#888888] font-medium uppercase tracking-widest mb-0.5">
          {getGreeting()}
        </p>
        <h1 className="text-2xl font-bold text-white">{user?.name ?? title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search box */}
        <div className="relative hidden md:flex items-center">
          <Search size={15} className="absolute left-3 text-[#555555]" />
          <input
            type="text"
            placeholder="Search songs..."
            className="pl-9 pr-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-sm text-[#f5f5f5] placeholder-[#555555] focus:outline-none focus:border-[#e5173f]/50 transition-colors w-52"
          />
        </div>

        <button className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:text-white hover:border-[#333333] transition-all">
          <Bell size={16} />
        </button>
      </div>
    </header>
  )
}
