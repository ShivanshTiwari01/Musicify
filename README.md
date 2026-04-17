<div align="center">
  <div style="background-color: #e5173f; width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
  </div>
  <h1>Musicify 🎵</h1>
  <p>A minimal, highly responsive music streaming platform inspired by Spotify.</p>

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)](https://golang.org/)
[![React Version](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

<br />

Welcome to **Musicify**, an elegant, open-source music streaming application characterized by a sleek black & red UI and a high-performance backend. Whether you want to spin up a local streaming server for your offline audio collection or contribute to an open-source audio streaming platform, Musicify provides a robust architecture to build upon.

---

## ✨ Features

- **Seamless Audio Streaming**: Stream your audio files (`.mp3`, `.flac`, `.wav`, etc.) instantly through a fluid UI.
- **Secure Authentication**: Built-in email & password authentication using JWT and bcrypt password hashing.
- **Auto-Discovery**: Simply drop your audio files into the designated `/music` folder, and the Go backend will automatically catalog them on startup.
- **Modern Player UI**: Custom persistent audio player with play/pause, seek, volume control, and dynamic visual indicators.
- **Containerized DevOps**: Entire stack is fully containerized using Docker & Docker Compose for zero-headache deployments.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React with TypeScript via Vite
- **Styling**: Tailwind CSS v4 (with custom CSS tokens)
- **State Management**: Zustand
- **Routing**: React Router DOM (Protected Routes)
- **Icons**: Lucide React

### Backend

- **Language**: Go (Golang) 1.22+
- **Framework**: Gin Web Framework
- **Database**: PostgreSQL (managed via GORM)
- **Auth**: JWT-based stateless authentication

### Infrastructure

- **Containerization**: Docker Multi-stage builds
- **Orchestration**: Docker Compose

---

## 📁 Repository Structure

```text
Musicify/
├── backend/                 # Go API Server
│   ├── cmd/main.go          # Application Entrypoint
│   ├── internal/
│   │   ├── db/              # Database Configuration & Auto-migrations
│   │   ├── handlers/        # API Request Handlers (Auth, Songs)
│   │   ├── middleware/      # JWT Authentication Middleware
│   │   ├── models/          # GORM Data Models
│   │   └── services/        # Business Logic & Music Discovery
│   └── Dockerfile           # Backend Container Definition
├── frontend/                # React Vite SPA
│   ├── src/
│   │   ├── components/      # Reusable UI Elements (Sidebar, Player, etc.)
│   │   ├── layouts/         # Page Architectures
│   │   ├── lib/             # API Interceptors & Constants
│   │   ├── pages/           # Application Views
│   │   ├── store/           # Zustand Global State
│   │   └── types/           # Global TypeScript Definitions
│   └── Dockerfile           # Frontend Container Definition
├── music/                   # Local Audio File Directory (Auto-scanned)
├── docker-compose.yml       # Stack Orchestration
└── README.md                # Project Documentation
```

---

## 🚀 Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the application is via Docker Compose. This ensures you do not need PostgreSQL or Go installed natively.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShivanshTiwari01/Musicify.git
   cd Musicify
   ```

2. **Add Music:**
   Drop any supported audio files (`.mp3`, `.flac`, `.wav`, `.ogg`, `.m4a`, `.aac`) into the `music/` directory at the project root.

3. **Configure Environment:**

   ```bash
   cp .env.example .env
   # Open .env and customize secrets if desired (defaults are fine for local testing)
   ```

4. **Spin up the stack:**

   ```bash
   docker compose up --build
   ```

5. **Access the application:**
   - Client: [http://localhost:5173](http://localhost:5173)
   - API Server: [http://localhost:8080](http://localhost:8080)
   - Database: `localhost:5432`

---

### Option 2: Local Development

If you wish to make changes and run the services locally without Docker:

#### Prerequisites

- Go 1.22+
- Node.js 20+
- PostgreSQL server running natively

#### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env to match your local PostgreSQL credentials

go mod tidy
go run ./cmd/main.go
```

_API runs on port 8080._

#### Frontend Setup

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

_Client runs on port 5173._

---

## 📡 API Reference

Provides RESTful endpoints. Include `Authorization: Bearer <your_jwt_token>` for protected routes.

| Method | Endpoint                | Scope     | Description                                                |
| ------ | ----------------------- | --------- | ---------------------------------------------------------- |
| POST   | `/api/auth/signup`      | Public    | Registers a new user. Expects `name`, `email`, `password`. |
| POST   | `/api/auth/login`       | Public    | Authenticates a user. Returns JWT and user context.        |
| GET    | `/api/songs`            | Protected | Returns an array of all discovered audio files in DB.      |
| GET    | `/api/songs/:id/stream` | Protected | Streams the requested audio file via HTTP Range Requests.  |

---

## 🤝 Contribution Guidelines

We welcome contributions from the community to make Musicify even better! Whether you are fixing bugs, improving the UI, or adding new backend features, your help is appreciated.

### How to Contribute

1. **Fork the Repository**
   Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Clone your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Musicify.git
   cd Musicify
   ```

3. **Create a Branch**
   Use a clear and descriptive branch name:

   ```bash
   git checkout -b feature/awesome-new-feature
   # OR
   git checkout -b bugfix/fix-audio-glitch
   ```

4. **Make your Changes**
   - Ensure you follow the project's coding structure.
   - For Go code, ensure you run `go fmt ./...`.
   - For React code, adhere to existing ESLint/TypeScript configurations.

5. **Commit your Changes**
   Follow conventional commits:

   ```bash
   git add .
   git commit -m "feat: add user playlist creation support"
   # OR
   git commit -m "fix: resolve memory leak in audio stream handler"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/awesome-new-feature
   ```
   Navigate to the original repository and click "Compare & pull request". Provide a clear description of the problem you solved or the feature you added.

### What to Contribute?

Check out our **Future Improvements** list below for ideas! Look for open issues tagged with `good first issue` if you are new to the codebase.

---

## 🔮 Future Improvements

- [ ] **Playlists & Favorites**: Allow users to like songs and create custom playlists.
- [ ] **Audio Metadata Extraction**: Automatically extract ID3 tags (Album Art, Artist, Album, Year) using a Go audio processing library.
- [ ] **Search & Filter Algorithms**: Robust fuzzy searching through track libraries.
- [ ] **Playback Modes**: Add Shuffle and Repeat (Track/All) functionalities.
- [ ] **User Profiles**: Profile picture uploads and user management dashboard.
- [ ] **Live Audio Visualization**: Waveform mapping using the Web Audio API.

---

## 📄 License

This project is open-sourced software licensed under the [MIT License](LICENSE).
