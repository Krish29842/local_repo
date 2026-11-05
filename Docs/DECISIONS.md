# DECISIONS.md

> **Rule:** Once a decision is recorded here, it is LOCKED. Agents must not re-litigate it. To change a decision, create a new entry with a new date that supersedes the old one.

---

## D001 — Database: Supabase (PostgreSQL)
- **Date:** 2026-11-05
- **Decision:** Use Supabase as the backend-as-a-service (PostgreSQL, Auth, Storage).
- **Rationale:** Relational data (products → requests → users) fits SQL. RLS provides role-based security. Avoids building and hosting a custom Node.js backend.
- **Alternatives Considered:** Firebase (rejected: NoSQL awkward for relational filters like semester + subject); custom Express/MongoDB (rejected: too much overhead for v1).

---

## D002 — Product Model: Separate Sale and Rent Pricing
- **Date:** 2026-11-05
- **Decision:** The `products` table has nullable `sale_price` and `rent_price` columns. A product can offer sale, rent, or both.
- **Rationale:** One listing serves both use cases. Frontend conditionally renders Buy/Rent buttons based on which price is present.
- **Constraint:** Do NOT create separate tables for "for sale" and "for rent" items.

---

## D003 — User Roles: Enforced via `profiles.role`
- **Date:** 2026-11-05
- **Decision:** The `profiles` table has a `role` column constrained to `'senior'` or `'junior'`. RLS policies use this role to restrict actions.
- **Rationale:** A single, clear source of truth for permissions. Prevents juniors from listing products and seniors from spamming buy requests on their own items.
- **Constraint:** Role is set at signup and cannot be changed by the user without admin intervention.

---

## D004 — Image Storage: Supabase Storage Bucket
- **Date:** 2026-11-05
- **Decision:** Product images are uploaded to a Supabase Storage bucket named `product-images`. Public URLs are stored in `products.image_url`.
- **Rationale:** Keeps images out of the database. Supabase Storage integrates natively with RLS and the frontend client.
- **Alternatives Considered:** External CDN (rejected: unnecessary complexity for v1); base64 encoding (rejected: bloats database).