import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

//main controller of app, decides what to show based on if its logged in or not. 
export default function App() {
  const [showLogin, setShowLogin] = useState(true)
  const { tokens, error, login, register, logout } = useAuth()

  if (tokens) {
    return <Dashboard tokens={tokens} onLogout={logout} />
  }

  return showLogin
    ? <Login onSwitch={() => setShowLogin(false)} onLogin={login} error={error} />
    : <Register onSwitch={() => setShowLogin(true)} onRegister={register} error={error} />
}