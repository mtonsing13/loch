import { useState, useEffect, useRef } from 'react'
import { AuthTokens } from '../types'
import axios from 'axios'


export default function MeditationTimer({ tokens }: { tokens: AuthTokens }) {
    const PRESETS = [1, 2, 3, 5]

    const [duration, setDuration] = useState<number>(5 * 60) // seconds
    const [timeLeft, setTimeLeft] = useState<number>(5 * 60)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [completed, setCompleted] = useState<boolean>(false)

    const headers = { Authorization: `Bearer ${tokens.access}` }
    //countdown logic
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    //sound 
    const playCompletionSound = () => {
      const audioCtx = new AudioContext()
      // create a gentle bell tone
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
  
      oscillator.type = 'sine'        // smooth sine wave = gentle sound
      oscillator.frequency.value = 528 // 528hz = calming frequency
  
          // fade in then fade out gently
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.5)
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3)
  
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 3)
    }
        //
    const saveSession = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/meditation/`,
          { duration_minutes: duration / 60 },
          {headers}
        )
      }
      catch (err) {
        console.error(err)
      }
    }

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsRunning(false)
            setCompleted(true)
            playCompletionSound()
            saveSession()
        }
        // cleanup 
        // 
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            }
        }, [isRunning, timeLeft])

        const handleStart = () => {
            setCompleted(false)
            setIsRunning(true)
        }
        const handlePause = () => setIsRunning(false)
        const handleReset = () => {
            setIsRunning(false)
            setCompleted(false)
            setTimeLeft(duration)
        }
        const formatTime = (seconds: number) => {
            const m = Math.floor(seconds / 60)
            const s = seconds % 60
            return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        }




    // SVG ring calculations
const radius = 80
const circumference = 2 * Math.PI * radius
const progress = timeLeft / duration
const strokeDashoffset = circumference * (1 - progress)

return (
  <div className="bg-forest rounded-2xl p-6 mb-6">
    <h3 className="text-sage text-xl font-bold mb-6">Meditation Timer</h3>

    {/* Preset buttons */}
    <div className="flex gap-3 mb-8">
      {PRESETS.map(mins => (
        <button
          key={mins}
          onClick={() => {
            setDuration(mins * 60)
            setTimeLeft(mins * 60)
            setIsRunning(false)
            setCompleted(false)
          }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            duration === mins * 60
              ? 'bg-sage text-forest'
              : 'bg-forest text-sage border border-sage/40'
          }`}>
          {mins} min
        </button>
      ))}
    </div>

    {/* SVG circular progress ring */}
    <div className="flex justify-center mb-8">
      <svg width="200" height="200" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#25533f"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#AACC96"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      {/* Timer text in center */}
      <div className="absolute flex items-center justify-center" style={{ width: 200, height: 200 }}>
        <div className="text-center">
          <p className="text-white text-4xl font-bold">{formatTime(timeLeft)}</p>
          {completed && <p className="text-blush text-sm mt-1">Complete! 🎉</p>}
        </div>
      </div>
    </div>

    {/* Controls */}
    <div className="flex gap-3 justify-center">
      {!isRunning && !completed && (
        <button
          onClick={handleStart}
          className="bg-sage text-forest font-semibold px-8 py-3 rounded-lg transition-colors hover:opacity-90">
          {timeLeft === duration ? 'Start' : 'Resume'}
        </button>
      )}
      {isRunning && (
        <button
          onClick={handlePause}
          className="bg-sage text-forest font-semibold px-8 py-3 rounded-lg transition-colors hover:opacity-90">
          Pause
        </button>
      )}
      <button
        onClick={handleReset}
        className="border border-sage text-sage font-semibold px-8 py-3 rounded-lg transition-colors hover:opacity-90">
        Reset
      </button>
    </div>
  </div>
)
}