import { render, screen } from '@testing-library/react'
import Login from './Login'

test('renders login form', () => {
  render(
    <Login 
      onSwitch={() => {}} 
      onLogin={() => {}} 
      error="" 
    />
  )

  // check these exist on the page
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  expect(screen.getByText('Login')).toBeInTheDocument()
})

test('shows error message when error prop is passed', () => {
  render(
    <Login 
      onSwitch={() => {}} 
      onLogin={() => {}} 
      error="Invalid username or password" 
    />
  )
  // check the error message shows up
  // hint: use screen.getByText(...)
  expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
})