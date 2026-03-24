import { useState } from 'react'
import axios from 'axios'
import { AuthTokens } from '../types'

const API = `${process.env.REACT_APP_API_URL}/api`

export function useAuth() {
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [error, setError] = useState<string>('')

  const register = async (username: string, password: string, email: string) => {
    try {
      await axios.post(`${API}/auth/register/`, { username, password, email })
      await login(username, password)
    } catch (err) {
      setError('Registration failed — username may already exist')
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(`${API}/auth/login/`, { username, password })
      setTokens(res.data)
      setError('')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  const logout = () => setTokens(null)

  return { tokens, error, register, login, logout }
}