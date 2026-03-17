import { useProfile } from '../hooks/useProfile'
import { AuthTokens } from '../types'

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })
}

export default function StreakCard({ tokens }: { tokens: AuthTokens }) {
  const { profile, moodDates } = useProfile(tokens)

  if (!profile) return <p className="text-white">Loading...</p>

  const last7Days = getLast7Days()

  return (
    <div className="bg-sage rounded-2xl p-6 mb-6">
      {/* Streak numbers */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-blush text-sm mb-1">Current Streak</p>
          <p className="text-white text-3xl font-bold">{profile.current_streak} 🔥</p>
        </div>
        <div>
          <p className="text-blush text-sm mb-1">Longest Streak</p>
          <p className="text-white text-3xl font-bold">{profile.longest_streak} ⭐</p>
        </div>
      </div>

      {/* 7 day calendar strip */}
      <p className="text-blush text-sm mb-3">Last 7 days</p>
      <div className="flex gap-2">
        {last7Days.map(date => {
          const hasCheckin = moodDates.includes(date)
          return (
            <div
              key={date}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: hasCheckin ? '#25533f' : '#334155'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}