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

export interface UserProfile {
  current_streak:number
  longest_streak:number
  last_checkin_date: string
}