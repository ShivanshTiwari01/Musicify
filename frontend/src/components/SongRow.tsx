import { Play, Pause, Music } from 'lucide-react'
import type { Song } from '../types'
import { usePlayerStore } from '../store/playerStore'

interface SongRowProps {
  song: Song
  index: number
}

function formatDuration(seconds: number) {
  if (!seconds) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function SongRow({ song, index }: SongRowProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayerStore()

  const isCurrentSong = currentSong?.ID === song.ID
  const isCurrentAndPlaying = isCurrentSong && isPlaying

  const handleClick = () => {
    if (isCurrentSong) {
      togglePlay()
    } else {
      playSong(song)
    }
  }

  return (
    <tr
      onClick={handleClick}
      className={`group cursor-pointer transition-colors duration-100 ${
        isCurrentSong
          ? 'bg-[#e5173f]/8'
          : 'hover:bg-white/5'
      }`}
    >
      {/* Index / Play icon */}
      <td className="py-3 pl-4 pr-3 w-12">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {isCurrentAndPlaying ? (
            <span className="flex gap-[3px] items-end h-4">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] bg-[#e5173f] rounded-sm animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, height: `${8 + i * 4}px` }}
                />
              ))}
            </span>
          ) : (
            <>
              <span className={`text-sm tabular-nums text-[#888888] group-hover:hidden ${isCurrentSong ? 'text-[#e5173f]' : ''}`}>
                {index + 1}
              </span>
              <span className="hidden group-hover:flex text-white">
                {isCurrentAndPlaying ? <Pause size={16} /> : <Play size={16} />}
              </span>
            </>
          )}
        </div>
      </td>

      {/* Song info */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
            isCurrentSong ? 'bg-[#e5173f]/20' : 'bg-[#1a1a1a]'
          }`}>
            <Music size={15} className={isCurrentSong ? 'text-[#e5173f]' : 'text-[#555555]'} />
          </div>
          <div>
            <p className={`text-sm font-medium ${isCurrentSong ? 'text-[#e5173f]' : 'text-white'}`}>
              {song.title}
            </p>
            <p className="text-xs text-[#888888]">{song.artist}</p>
          </div>
        </div>
      </td>

      {/* Artist */}
      <td className="py-3 pr-4 hidden md:table-cell">
        <span className="text-sm text-[#888888]">{song.artist}</span>
      </td>

      {/* Duration */}
      <td className="py-3 pr-4 text-right">
        <span className="text-sm text-[#888888] tabular-nums">{formatDuration(song.duration)}</span>
      </td>
    </tr>
  )
}
