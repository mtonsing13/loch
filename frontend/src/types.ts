export interface User {
  id: number
  username: string
  email: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface MoodEntry {
  id: number
  score: number
  note: string
  created_at: string
}