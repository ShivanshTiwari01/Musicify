# Musicify 🎵

A minimal, Spotify-inspired music streaming web app with a clean black + red UI.

## Tech Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React + TypeScript, Vite, Tailwind CSS v4, Zustand, React Router |
| Backend   | Go (Gin), GORM, PostgreSQL, JWT (bcrypt)      |
| DevOps    | Docker, Docker Compose                        |

## Folder Structure

```
Musicify/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── music/               ← Drop .mp3 / .flac / .wav files here
├── frontend/
│   ├── src/
│   │   ├── components/  ← Sidebar, TopBar, Player, SongRow, ProtectedRoute
│   │   ├── layouts/     ← AppLayout
│   │   ├── lib/         ← axios instance, constants
│   │   ├── pages/       ← LoginPage, SignupPage, HomePage, LibraryPage
│   │   ├── store/       ← authStore, playerStore (Zustand)
│   │   └── types/       ← TypeScript interfaces
│   ├── Dockerfile
│   └── nginx.conf
└── backend/
    ├── cmd/main.go
    ├── internal/
    │   ├── db/          ← PostgreSQL init + GORM migrations
    │   ├── handlers/    ← auth.go, song.go
    │   ├── middleware/  ← JWT auth middleware
    │   ├── models/      ← User, Song
    │   └── services/    ← music folder scanner
    └── Dockerfile
```

## Setup (Local)

### Prerequisites
- Go 1.22+
- Node.js 20+
- PostgreSQL running locally

### Backend

```bash
cd backend
cp .env.example .env        # configure DB creds
go mod download
go run ./cmd/main.go
```

Backend runs on **http://localhost:8080**

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

## Setup (Docker)

```bash
cp .env.example .env        # adjust secrets if needed
docker compose up --build
```

- Frontend → http://localhost
- Backend API → http://localhost:8080
- PostgreSQL → localhost:5432

## Adding Music

Drop audio files (`.mp3`, `.flac`, `.wav`, `.ogg`, `.m4a`, `.aac`) into the `/music` folder.  
The backend auto-scans the folder on startup and stores metadata in PostgreSQL.

## API Endpoints

| Method | Endpoint               | Auth     | Description             |
|--------|------------------------|----------|-------------------------|
| POST   | `/api/auth/signup`     | Public   | Register a new user     |
| POST   | `/api/auth/login`      | Public   | Login, returns JWT      |
| GET    | `/api/songs`           | Required | List all songs          |
| GET    | `/api/songs/:id/stream`| Required | Stream audio file       |

## Future Improvements

- [ ] Playlists & favorites
- [ ] Shuffle & repeat modes
- [ ] Album art extraction from audio metadata
- [ ] Search & filter songs
- [ ] User profile management
- [ ] Waveform visualization
