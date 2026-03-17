import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserProfile, AuthTokens } from '../types'

export function useProfile(tokens: AuthTokens) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [moodDates, setMoodDates] = useState<string[]>([])


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/auth/profile/', { headers: { Authorization: `Bearer ${tokens.access}` } })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
  }, []) //empty array = fetch once when components load
  
  //just want dates
  useEffect(() => {
    // also fetch moods and extract just the dates
    axios.get('http://127.0.0.1:8000/api/moods/', {
      headers: { Authorization: `Bearer ${tokens.access}` }
    })
      .then(res => {
        const dates = res.data.map((mood:any) => mood.created_at.split('T')[0])
        setMoodDates(dates)
        // res.data is array of moods
        // extract just the date part of created_at
        // hint mood.created_at.split('T')[0] gives you "2026-03-16"
      })
      .catch(err => console.error(err))
  }, [])

  return { profile, moodDates }
}