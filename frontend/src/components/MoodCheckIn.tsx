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
    axios.get('http://127.0.0.1:8000/api/moods/', { headers })
      .then(res => setMoods(res.data))
      .catch(err => console.error(err))
  }, [submitted])

  const submitMood = async () => {
    if (selected === null) return
    try {
      await axios.post('http://127.0.0.1:8000/api/moods/', 
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
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h3 style={{ marginBottom: 16 }}>How are you feeling today?</h3>

      {/* Emoji selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {EMOJIS.map((emoji, i) => (
          <button
            key={i}
            onClick={() => setSelected(i + 1)}
            style={{
              fontSize: 32,
              background: selected === i + 1 ? '#f0fdf4' : 'white',
              border: selected === i + 1 ? '2px solid #4ade80' : '2px solid #eee',
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
        style={{ width: '100%', padding: 10, fontSize: 14, borderRadius: 8, border: '1px solid #eee', marginBottom: 12, resize: 'none', height: 80 }}
      />

      {/* Submit button */}
      <button
        onClick={submitMood}
        disabled={selected === null}
        style={{
          width: '100%',
          padding: 12,
          background: selected !== null ? '#4ade80' : '#eee',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          cursor: selected !== null ? 'pointer' : 'not-allowed',
          marginBottom: 24
        }}>
        Log Mood
      </button>

      {/* Last 7 moods */}
      <h3 style={{ marginBottom: 12 }}>Recent Moods</h3>
      {moods.length === 0 && <p style={{ color: '#aaa' }}>No moods logged yet!</p>}
      {moods.map(mood => (
        <div key={mood.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 24 }}>{EMOJIS[mood.score - 1]}</span>
          <div>
            <p style={{ fontSize: 13, color: '#888', margin: 0 }}>{new Date(mood.created_at).toLocaleDateString()}</p>
            {mood.note && <p style={{ fontSize: 13, margin: 0 }}>{mood.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}