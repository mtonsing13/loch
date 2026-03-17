import { useProfile } from '../hooks/useProfile'
import { AuthTokens } from '../types'

export default function StreakCard({ tokens }: { tokens: AuthTokens }) {
  const { profile } = useProfile(tokens)

  if (!profile) return <p>Loading...</p>

  return (
    <div>
      <p>Current Streak: {profile.current_streak}</p>
      <p>Longest Streak: {profile.longest_streak}</p>
    </div>
  )
}