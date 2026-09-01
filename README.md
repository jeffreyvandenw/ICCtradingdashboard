# ICC Trading Journal

Persoonlijk trading journal, backtest-omgeving en leeromgeving voor de ICC-strategie
(Indication-Correction-Continuation). Module 1 (dashboard + live journal) is
gebouwd; modules 2 (leren) en 3 (backtesten) volgen later op hetzelfde datamodel.

## Stack

- Next.js (App Router) + TypeScript
- Postgres via [Neon](https://neon.tech) (or any Postgres — see local dev below)
- Drizzle ORM + drizzle-kit for schema/migrations
- NextAuth (Credentials provider) for a single-user login
- Tailwind CSS, Recharts

## Local development

1. **Database.** Point `DATABASE_URL` at any Postgres instance. For local dev
   without Neon, a local Postgres works fine:

   ```bash
   sudo -u postgres psql -c "CREATE USER app WITH PASSWORD 'app' CREATEDB;"
   sudo -u postgres psql -c "CREATE DATABASE icc_trading OWNER app;"
   ```

2. **Env vars.** Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Postgres connection string
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `AUTH_USER_EMAIL` / `AUTH_USER_PASSWORD_HASH` — your login. Generate the
     hash with `npx tsx scripts/hash-password.ts <your-password>`.

   Note: bcrypt hashes contain `$` characters, which Next.js's `.env` loader
   treats as variable references. Escape every `$` as `\$` in the file (the
   example already shows the format).

3. **Migrate + seed:**

   ```bash
   npm install
   npm run db:migrate
   npm run db:seed   # optional: fills ~3 months of dummy live trades
   ```

4. **Run:**

   ```bash
   npm run dev
   ```

## Data model

One `trades` table backs both live and backtest trades (`type: "live" | "backtest"`).
The dashboard only ever reads `type = "live"`. Backtest trades link to a
`backtest_sessions` row (added in module 3). A `lessons` table exists in the
schema already for module 2.

RR is auto-calculated from entry/stop-loss/take-profit (direction-aware) but is
a plain editable field, so you can override it. For stats (equity curve,
profit factor, expectancy), a **win contributes +RR**, a **loss contributes
exactly -1R** (you lost the risk you planned, regardless of the target), and
breakeven contributes 0 — the standard trading-journal convention.

## Scripts

- `npm run db:generate` — generate a new migration from schema changes
- `npm run db:migrate` — apply migrations
- `npm run db:push` — push schema directly without a migration file (quick local iteration)
- `npm run db:studio` — Drizzle Studio (browse the DB)
- `npm run db:seed` — seed dummy live trades

## Deploying

Deploy to Vercel and set the same env vars there, pointing `DATABASE_URL` at
your Neon database. The auth layer (NextAuth Credentials, single user) is
already in place, so putting this behind a login in production requires no
extra work — just make sure `AUTH_SECRET` is a strong, unique value in
production and differs from your local one.

## Roadmap (not built yet)

- **Module 2 — Leren**: linear ICC lesson program + searchable glossary, using the
  existing `lessons` table.
- **Module 3 — Backtesten**: session-based backtest entry, using the existing
  `backtest_sessions` table and the shared `TradeForm` component
  (`type="backtest"`).
- **Phase 2**: TradingView Pine Script webhook endpoint that creates `live`
  trades automatically — this is why the app already runs on Postgres instead
  of a local-only SQLite file.
