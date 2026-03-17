import { useProfile } from '../hooks/useProfile'
import { AuthTokens } from '../types'


// helper to get last 7 days as date strings
function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })
}

export default function StreakCard({ tokens }: { tokens: AuthTokens }) {
  const { profile, moodDates } = useProfile(tokens)

  if (!profile) return <p>Loading...</p>

  const last7Days = getLast7Days()

  return (
    <div style={{ marginBottom: 24 }}>
      <p>Current Streak: {profile.current_streak} 🔥 </p>
      <p>Longest Streak: {profile.longest_streak}</p>
      
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {last7Days.map(date => {
            const hasCheckin = moodDates.includes(date)
            return (
                <div
                key = {date}
                style = {{
                    width:32,
                    height:32,
                    borderRadius: '50%',
                    background:hasCheckin ? '#4ade80':'#333'
                }}
                />
            )
            })}
        </div>
    </div>
  )
}