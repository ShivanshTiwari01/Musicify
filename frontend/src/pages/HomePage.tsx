import { useEffect, useState } from 'react'
import { Music, Disc3 } from 'lucide-react'
import TopBar from '../components/TopBar'
import SongRow from '../components/SongRow'
import api from '../lib/api'
import type { Song } from '../types'
import { usePlayerStore } from '../store/playerStore'

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { setSongs: setStoreSongs } = usePlayerStore()

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await api.get<{ songs: Song[] }>('/songs')
        const list = data.songs ?? []
        setSongs(list)
        setStoreSongs(list)
      } catch {
        setError('Failed to load songs. Is the backend running?')
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopBar />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e5173f]/20 via-[#7a0a21]/10 to-transparent border border-[#e5173f]/15 p-8 mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e5173f]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative">
            <p className="text-[#e5173f] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Your Music</p>
            <h2 className="text-4xl font-bold text-white mb-3">
              Listen to what<br />
              <span className="text-[#e5173f]">moves you.</span>
            </h2>
            <p className="text-[#888888] text-sm max-w-sm">
              {songs.length > 0
                ? `${songs.length} song${songs.length > 1 ? 's' : ''} in your library. Click any track to start playing.`
                : 'Add audio files to the /music folder to start listening.'}
            </p>
          </div>
        </div>

        {/* Songs table */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Disc3 size={20} className="text-[#e5173f]" />
            All Songs
          </h3>

          {loading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 bg-[#1a1a1a] rounded-lg animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-[#e5173f]/10 border border-[#e5173f]/30 rounded-xl p-6 text-center">
              <p className="text-[#e5173f] text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && songs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-5">
                <Music size={36} className="text-[#333333]" />
              </div>
              <p className="text-[#888888] font-medium">No songs yet</p>
              <p className="text-[#555555] text-sm mt-1">
                Drop audio files into the <code className="text-[#e5173f]/80">/music</code> folder and restart the backend.
              </p>
            </div>
          )}

          {!loading && !error && songs.length > 0 && (
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="py-3 pl-4 pr-3 w-12 text-left text-xs text-[#555555] font-medium">#</th>
                    <th className="py-3 pr-4 text-left text-xs text-[#555555] font-medium">TITLE</th>
                    <th className="py-3 pr-4 text-left text-xs text-[#555555] font-medium hidden md:table-cell">ARTIST</th>
                    <th className="py-3 pr-4 text-right text-xs text-[#555555] font-medium">DURATION</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song, idx) => (
                    <SongRow key={song.ID} song={song} index={idx} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
