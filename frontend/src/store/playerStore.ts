import { create } from 'zustand'
import type { Song } from '../types'
import { API_BASE } from '../lib/constants'

interface PlayerState {
  songs: Song[]
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number

  setSongs: (songs: Song[]) => void
  playSong: (song: Song) => void
  togglePlay: () => void
  setCurrentTime: (t: number) => void
  setDuration: (d: number) => void
  setVolume: (v: number) => void
  playNext: () => void
  playPrev: () => void
  getStreamUrl: (song: Song) => string
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  songs: [],
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,

  setSongs: (songs) => set({ songs }),

  playSong: (song) => set({ currentSong: song, isPlaying: true }),

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),

  setVolume: (volume) => set({ volume }),

  playNext: () => {
    const { songs, currentSong } = get()
    if (!currentSong || songs.length === 0) return
    const idx = songs.findIndex((s) => s.ID === currentSong.ID)
    const next = songs[(idx + 1) % songs.length]
    set({ currentSong: next, isPlaying: true })
  },

  playPrev: () => {
    const { songs, currentSong } = get()
    if (!currentSong || songs.length === 0) return
    const idx = songs.findIndex((s) => s.ID === currentSong.ID)
    const prev = songs[(idx - 1 + songs.length) % songs.length]
    set({ currentSong: prev, isPlaying: true })
  },

  getStreamUrl: (song) => {
    const token = localStorage.getItem('token') || ''
    return `${API_BASE}/songs/${song.ID}/stream?token=${token}`
  },
}))
