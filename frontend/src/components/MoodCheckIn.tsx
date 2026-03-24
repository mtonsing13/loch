import { useState, useEffect } from 'react'
import axios from 'axios'
import { MoodEntry, AuthTokens } from '../types'

const EMOJIS = ['😞', '😐', '🙂', '😊', '🤩']

export default function MoodCheckIn({ tokens }: { tokens: AuthTokens }) {
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const headers = { Authorization: `Bearer ${tokens.access}` }

  // Fetch last 7 moods
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/moods/`, { headers })
      .then(res => setMoods(res.data))
      .catch(err => console.error(err))
  }, [submitted])

  const submitMood = async () => {
    if (selected === null) return
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/moods/`, 
        { score: selected, note },
        { headers }
      )
      setSelected(null)
      setNote('')
      setSubmitted(!submitted)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-blush rounded-2xl p-6 mb-6">
      <h3 className="text-sage text-xl font-bold mb-4">How are you feeling today?</h3>

      {/* Emoji selector */}
      <div className="flex gap-3 mb-4">
        {EMOJIS.map((emoji, i) => (
          <button
            key={i}
            onClick={() => setSelected(i + 1)}
            style={{
              fontSize: 32,
              background: selected === i + 1 ? '#AACC96' : 'transparent',
              border: selected === i + 1 ? '2px solid #AACC96' : '2px solid #AACC9640',
              borderRadius: 12,
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: selected === i + 1 ? 'scale(1.2)' : 'scale(1)',
            }}>
            {emoji}
          </button>
        ))}
      </div>

      {/* Note input */}
      <textarea
        placeholder="Add a note (optional)..."
        value={note}
        onChange={e => setNote(e.target.value)}
        className="w-full bg-forest text-white placeholder-gray-400 rounded-lg px-4 py-3 mb-4 outline-none border border-sage resize-none h-20"
      />

      {/* Submit button */}
      <button
        onClick={submitMood}
        disabled={selected === null}
        style={{
          width: '100%',
          padding: 12,
          background: selected !== null ? '#AACC96' : '#25533f',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          color: selected !== null ? '#25533f' :'#AACC96',
          marginBottom: 24
        }}>
        Log Mood
      </button>

      {/* Last 7 moods */}
      <h3 className="text-sage font-bold text-lg mb-3">Recent Moods</h3>
      {moods.length === 0 && <p style={{ color: '#AACC96' }}>No moods logged yet!</p>}
      {moods.map(mood => (
        <div key={mood.id} className="flex items-center gap-3 py-3 border-b border-sage/20">
          <span className="text-white text-3xl font-bold">{EMOJIS[mood.score - 1]}</span>
          <div>
            <p className="text-sage text-sm">{new Date(mood.created_at).toLocaleDateString()}</p>
            {mood.note && <p className="text-white text-sm">{mood.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}