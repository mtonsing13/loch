import { AuthTokens } from '../types'
import MoodCheckIn from './MoodCheckIn'
import StreakCard from './StreakCard'
//protected home page 
export default function Dashboard({ tokens, onLogout }: { tokens: AuthTokens, onLogout: () => void }) {
  return (
  <div className="min-h-screen bg-forest">
    {/* Navbar */}
    <nav className="flex justify-between items-center bg-sage px-6 py-4 fixed top-0 w-full z-10">
      <h2 className="text-white text-xl font-bold">Loch 🌊</h2>
      <button
        onClick={onLogout}
        className="bg-blush-500 hover:bg-blush-400 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
        Logout
      </button>
    </nav>

    {/* Content */}
    <div className="max-w-2xl mx-auto px-6 pt-24">
      <StreakCard tokens={tokens} />
      <MoodCheckIn tokens={tokens} />
    </div>
  </div>
)
}