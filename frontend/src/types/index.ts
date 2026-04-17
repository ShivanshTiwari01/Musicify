export interface User {
  id: number
  name: string
  email: string
}

export interface Song {
  ID: number
  title: string
  filename: string
  artist: string
  duration: number
  CreatedAt: string
}

export interface AuthResponse {
  token: string
  user: User
}
