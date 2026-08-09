# FocusForge

FocusForge is a hackathon project built with React, Vite, Tailwind CSS, and AI integration. It provides a focused productivity dashboard with daily goal tracking, habit management, timer-based focus sessions, and analytics visualization.

## What this project does

- Tracks daily habits and goals
- Displays progress metrics through charts
- Includes a focus timer to support Pomodoro-style work sessions
- Provides a clean dashboard layout for quick productivity insights
- Uses AI integration as a central feature in project structure

## Built with

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Express (for future API or backend expansion)

## Hackathon highlights

- Simple, polished UI for rapid productivity use
- Component-based structure for fast iteration
- Production-ready build configuration with Vite
- Secure environment handling via `.env.example`

## Setup and run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example environment file and set your values:

```bash
cp .env.example .env.local
```

Then update `.env.local` with:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
APP_URL=http://localhost:3000
```

### 3. Start the app

```bash
npm run dev
```

Open `http://localhost:3000/` in your browser.

## Production build

To create a production build:

```bash
npm run build
```

Build output is generated in the `dist/` folder.

## Notes for judges

- The repository is ready to deploy as a static Vite app
- The `.env.example` file is included so secrets are not committed
- The project has been initialized with Git and pushed to GitHub

## Project structure

- `src/App.tsx` — main application entry
- `src/components/` — UI sections and dashboard widgets
- `vite.config.ts` — build and development server settings
- `.env.example` — environment variable template

## Contact

For any follow-up, see the GitHub repository or inspect the project files directly.
