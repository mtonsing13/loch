# Loch 🌊

A full-stack mental wellness app for tracking moods, building mindfulness habits, and meditating — built with React, TypeScript, Python, and Django.

**Live Demo:** [loch-frontend.vercel.app](https://loch-frontend.vercel.app)

---

## Overview

Loch helps users build daily wellness habits through mood check-ins, streak tracking, and guided meditation sessions. The project was built to demonstrate full-stack engineering skills using the same technology stack used in production at companies like Headspace.

---

## Tech Stack

**Frontend**
- React 18 with TypeScript
- Tailwind CSS with a custom colour system
- Axios for API communication
- React Testing Library for component tests

**Backend**
- Python 3.11 with Django 5 and Django REST Framework
- JWT authentication via djangorestframework-simplejwt
- PostgreSQL database
- pytest for backend tests

**Infrastructure**
- Frontend deployed on Vercel
- Backend deployed on Railway
- GitHub for version control

---

## Features

**Authentication**
- User registration and login with JWT access and refresh tokens
- Protected routes — unauthenticated users are redirected to login
- Automatic token handling via a custom `useAuth` hook

**Mood Check-In**
- Daily mood logging with a 5-point emoji scale
- Optional notes per entry
- Displays the last 7 mood entries with timestamps

**Streak Tracker**
- Tracks current and longest check-in streaks
- Streak logic handles consecutive days, same-day duplicates, and streak resets
- 7-day calendar strip showing which days had check-ins

**Meditation Timer**
- Preset durations of 5, 10, 15, and 20 minutes
- Circular SVG progress ring that animates as the timer counts down
- Play, pause, resume, and reset controls
- Gentle 528hz completion tone generated via the Web Audio API
- Completed sessions saved to the database with timestamps

---

## Architecture

```
React Frontend (Vercel)
        ↕ HTTPS / JWT
Django REST API (Railway)
        ↕ SQL
PostgreSQL Database
```

The frontend and backend are fully decoupled. The Django backend serves only JSON — no templates. The React frontend handles all rendering and communicates with the backend exclusively through REST API endpoints.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register/ | Create a new user account | No |
| POST | /api/auth/login/ | Login and receive JWT tokens | No |
| POST | /api/auth/token/refresh/ | Refresh an expired access token | No |
| GET | /api/auth/profile/ | Get current user streak data | Yes |
| GET | /api/moods/ | Get last 7 mood entries | Yes |
| POST | /api/moods/ | Create a new mood entry | Yes |
| GET | /api/sessions/ | Get all meditation sessions | Yes |
| POST | /api/sessions/ | Save a completed meditation session | Yes |

---

## Running Locally

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/mtonsing13/loch.git
cd loch

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file in backend/ with:
# SECRET_KEY=your-secret-key
# DEBUG=True
# DB_NAME=loch
# DB_USER=your-db-user
# DB_PASSWORD=your-db-password
# DB_HOST=localhost
# DB_PORT=5432

# Run migrations
cd backend
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with:
# REACT_APP_API_URL=http://127.0.0.1:8000

# Start development server
npm start
```

The app will be available at `http://localhost:3000`.

---

## Tests

### Backend
```bash
cd backend
pytest tests/ -v
```

Tests cover streak calculation logic and authentication protection on API endpoints.

### Frontend
```bash
cd frontend
npm test
```

Tests cover component rendering, form validation, and UI state management.

---

## Project Structure

```
loch/
├── backend/
│   ├── config/          # Django project settings and URLs
│   ├── moods/           # MoodEntry and MeditationSession models, views, serializers
│   ├── users/           # User registration, JWT auth, UserProfile, streak logic
│   └── tests/           # pytest test suite
├── frontend/
│   ├── src/
│   │   ├── components/  # Login, Register, Dashboard, MoodCheckIn, StreakCard, MeditationTimer
│   │   ├── hooks/       # useAuth, useProfile custom hooks
│   │   └── types.ts     # TypeScript interfaces
│   └── public/
└── requirements.txt
```

---

## What I Learned

This project deepened my understanding of full-stack architecture, particularly around decoupled frontend and backend design. Key areas of growth included implementing JWT authentication from scratch, managing React state across components using custom hooks, writing streak calculation logic with edge case handling, building SVG animations in React, and deploying a production application with environment-specific configuration.

---

## Author

Maria Tonsing — BS Mathematics and Computer Science  
[GitHub](https://github.com/mtonsing13)
