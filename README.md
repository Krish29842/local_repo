# Campus Market

> A student-to-student marketplace for college essentials — books, lab coats, calculators, and more.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite) + Tailwind CSS |
| **Backend / Database** | Supabase (PostgreSQL, Auth, Storage) |
| **Language** | JavaScript (ES Modules) |
| **Hosting** | Vercel (frontend) |

## Getting Started

All app code lives in [`frontend/`](frontend/):

```bash
cd frontend
cp .env.example .env   # then fill in your Supabase URL + publishable key
npm install
npm run dev             # http://localhost:5173
npm run build           # production build
```

## Documentation

Project specs live in [`Docs/`](Docs/):
- [`Docs/AGENTS.md`](Docs/AGENTS.md) — conventions and critical rules
- [`Docs/DECISIONS.md`](Docs/DECISIONS.md) — locked architecture decisions
- [`Docs/system.md`](Docs/system.md) — agent operating instructions
