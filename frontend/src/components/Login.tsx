import { useState } from 'react'

interface Props {
  onSwitch: () => void
  onLogin: (username: string, password: string) => void
  error: string
}

export default function Login({ onSwitch, onLogin, error }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center">
      <div className="bg-sage p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-white text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-forest text-sm mb-8">Log in to track your mood</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full bg-blush text-white placeholder-slate-400 rounded-lg px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-blush text-white placeholder-slate-400 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={() => onLogin(username, password)}
          className="w-full bg-forest hover:bg-blush text-white font-semibold py-3 rounded-lg transition-colors">
          Login
        </button>
        <p className="text-center text-forest text-sm mt-4">
          Don't have an account?{' '}
          <span onClick={onSwitch} className="text-forest-400 cursor-pointer hover:text-blush">
            Register
          </span>
        </p>
      </div>
    </div>
  )
}