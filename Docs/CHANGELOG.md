# CHANGELOG.md

## 2026-11-05 (final)
- Connected UI to Supabase: Home fetches live products; ProductDetail shows conditional Buy (sale_price) / Rent (rent_price) buttons per D002.
- Phase 2 Auth: signup with locked role (senior/junior per D003), login, logout, AuthProvider + ProtectedRoute.
- Phase 3 Listings: /sell create-listing form + image upload to `product-images` bucket (D004), senior-only via RLS.
- Phase 5 Requests: ChatModal inserts into `requests`; Dashboard lets juniors track requests and seniors accept/decline (owner-only via RLS).
- react-router-dom routing: /, /product/:id, /auth, /dashboard, /sell.
- `npm run build` passes (99 modules, no errors).

## 2026-11-05 (later)
- Restructured app into `frontend/` (own package.json, Vite config, Tailwind v4 via `@tailwindcss/vite`, `@theme` palette: sand/ink/sea/coral).
- Adapted pre-built UI to spec: renamed CampusSwap → **Campus Market**; replaced branch/year filters with **category + semester + subject**; mock data shaped like `public.products`.
- Consolidated duplicate Supabase clients; `.env` holds URL + publishable key (gitignored).

## 2026-11-05
- Initialized React project with Vite and Tailwind CSS.
- Created Supabase project and connected client via `src/lib/supabaseClient.js`.
- Defined `profiles`, `products`, and `requests` tables in SQL Editor.
- Applied initial RLS policies.
