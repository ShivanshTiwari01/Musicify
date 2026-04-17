import TopBar from '../components/TopBar'
import { Library } from 'lucide-react'

export default function LibraryPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopBar title="Your Library" />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-5">
            <Library size={36} className="text-[#333333]" />
          </div>
          <p className="text-white font-semibold text-lg">Your Library</p>
          <p className="text-[#888888] text-sm mt-1 max-w-xs">
            Playlist and favorites features coming soon. For now, all your songs are on the Home page.
          </p>
        </div>
      </main>
    </div>
  )
}
