import { AuthTokens } from '../types'
import MoodCheckIn from './MoodCheckIn'
//protected home page 
export default function Dashboard({ tokens, onLogout }: { tokens: AuthTokens, onLogout: () => void }) {
  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ margin: 0 }}>Loch 🌊</h2>
        <button
          onClick={onLogout}
          style={{ padding: '8px 16px', background: '#f472b6', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <MoodCheckIn tokens={tokens} />
    </div>
  )
}