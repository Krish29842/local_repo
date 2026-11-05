# AGENTS.md

## Project Overview
Student-to-student marketplace for college essentials. Seniors list books (filtered by semester/subject) and accessories (lab coats, calculators) to sell or rent to juniors.

## Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Language:** JavaScript (ES Modules)
- **Deployment:** Vercel (frontend)

## Setup Commands
- Navigate to frontend: `cd frontend`
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`

## Key Directories
- `frontend/src/components/` — Reusable UI components
- `frontend/src/pages/` — Page-level components (Home, ProductDetail, Dashboard)
- `frontend/src/lib/` — Supabase client, utility functions
- `Docs/` — Project documentation (README.md, DECISIONS.md, AGENTS.md, etc.)

## Core Database Tables
- `profiles` — Extends auth.users; stores `role` ('senior' or 'junior')
- `products` — Listings with `category`, `semester`, `subject`, `sale_price`, `rent_price`, `status`
- `requests` — Tracks buy/rent requests linking a junior to a product

## Conventions
- **Components:** PascalCase filenames (e.g., `ProductCard.jsx`)
- **Functions/Variables:** camelCase
- **Styling:** Tailwind utility classes; no separate CSS files unless unavoidable
- **State:** React hooks; lift state only when necessary
- **Supabase Queries:** Always select only required columns; never use `*` in production

## Critical Rules (Never Violate)
1. **RLS is mandatory.** Every table must have Row Level Security enabled. Never bypass RLS in frontend code.
2. **Never expose the `service_role` key.** Only the `anon` key belongs in the frontend `.env`.
3. **Role enforcement:** A senior can only modify their own products. A junior can only create requests for themselves.
4. **Run `npm run build` before marking any task complete.** Fix all errors and warnings.

## Task Completion Checklist
Before declaring a task done:
- [ ] Code compiles (`npm run build` passes)
- [ ] No console errors in browser
- [ ] Relevant RLS policies tested with both senior and junior accounts
- [ ] UI matches the expected flow (buy button only if `sale_price` exists; rent button only if `rent_price` exists)