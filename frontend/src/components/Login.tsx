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
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Welcome back</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Log in to track your mood</p>

      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: 12, fontSize: 14 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: 16, fontSize: 14 }}
      />
      <button
        onClick={() => onLogin(username, password)}
        style={{ width: '100%', padding: '12px', background: '#38bdf8', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>
        Login
      </button>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#888' }}>
        Don't have an account?{' '}
        <span onClick={onSwitch} style={{ color: '#4ade80', cursor: 'pointer' }}>Register</span>
      </p>
    </div>
  )
}