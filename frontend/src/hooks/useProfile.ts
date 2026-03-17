import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserProfile, AuthTokens } from '../types'

export function useProfile(tokens: AuthTokens) {
  const [profile, setProfile] = useState<UserProfile | null>(null)



  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/auth/profile/', { headers: { Authorization: `Bearer ${tokens.access}` } })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
  }, []) //empty array = fetch once when components load

  return { profile }
}