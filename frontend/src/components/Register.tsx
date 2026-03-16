import { useState } from 'react'

interface Props {
  onSwitch: () => void
  onRegister: (username: string, password: string, email: string) => void
  error: string
}

export default function Register({ onSwitch, onRegister, error }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Create Account</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Start your wellness journey</p>

      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: 12, fontSize: 14 }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        onClick={() => onRegister(username, password, email)}
        style={{ width: '100%', padding: '12px', background: '#4ade80', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>
        Register
      </button>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#888' }}>
        Already have an account?{' '}
        <span onClick={onSwitch} style={{ color: '#38bdf8', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  )
}