import { useEffect, useRef } from 'react'
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Music,
} from 'lucide-react'
import { usePlayerStore } from '../store/playerStore'

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Player() {
  const {
    currentSong, isPlaying, currentTime, duration, volume,
    togglePlay, setCurrentTime, setDuration, setVolume,
    playNext, playPrev, getStreamUrl,
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement>(null)

  // Sync play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Load new song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    audio.src = getStreamUrl(currentSong)
    audio.load()
    audio.play().catch(() => {})
  }, [currentSong?.ID])

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!currentSong) {
    return (
      <footer className="h-20 border-t border-[#2a2a2a] bg-[#111111] flex items-center justify-center">
        <p className="text-[#555555] text-sm flex items-center gap-2">
          <Music size={16} />
          Select a song to start listening
        </p>
      </footer>
    )
  }

  return (
    <footer className="h-24 border-t border-[#2a2a2a] bg-[#111111]/95 backdrop-blur-md flex items-center px-6 gap-8">
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={playNext}
      />

      {/* Song info */}
      <div className="flex items-center gap-4 w-64 min-w-0">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-[#e5173f] to-[#7a0a21] flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-playing' : ''}`}>
          <Music size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{currentSong.title}</p>
          <p className="text-xs text-[#888888] truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-5">
          <button
            onClick={playPrev}
            className="text-[#888888] hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
          >
            {isPlaying
              ? <Pause size={18} className="text-black" />
              : <Play size={18} className="text-black ml-0.5" />
            }
          </button>

          <button
            onClick={playNext}
            className="text-[#888888] hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 w-full max-w-lg">
          <span className="text-xs text-[#888888] w-8 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                const t = Number(e.target.value)
                setCurrentTime(t)
                if (audioRef.current) audioRef.current.currentTime = t
              }}
              className="w-full"
              style={{
                background: `linear-gradient(to right, #e5173f ${progress}%, #2a2a2a ${progress}%)`,
              }}
            />
          </div>
          <span className="text-xs text-[#888888] w-8 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-36">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
          className="text-[#888888] hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1"
          style={{
            background: `linear-gradient(to right, #e5173f ${volume * 100}%, #2a2a2a ${volume * 100}%)`,
          }}
        />
      </div>
    </footer>
  )
}
