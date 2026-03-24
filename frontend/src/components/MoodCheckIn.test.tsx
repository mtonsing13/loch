import { render, screen, fireEvent } from '@testing-library/react'
import MoodCheckIn from './MoodCheckIn'

const mockTokens = {
  access: 'fake-token',
  refresh: 'fake-refresh'
}

test('renders all 5 emoji buttons', () => {
  render(<MoodCheckIn tokens={mockTokens} />)
  
  // check all 5 emojis are on the page
  expect(screen.getByText('😞')).toBeInTheDocument()
  expect(screen.getByText('😐')).toBeInTheDocument()
  expect(screen.getByText('🙂')).toBeInTheDocument()
  expect(screen.getByText('😊')).toBeInTheDocument()
  expect(screen.getByText('🤩')).toBeInTheDocument()
})

test('Log Mood button is disabled when no emoji selected', () => {
  render(<MoodCheckIn tokens={mockTokens} />)
  // hint: use screen.getByText('Log Mood')
  //screen.getByText('Log Mood')
  // hint: use toBeDisabled()
  expect(screen.getByText('Log Mood')).toBeDisabled()
})