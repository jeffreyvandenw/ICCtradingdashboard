# ICC Hub

Persoonlijke alles-in-één hub: trading journal, backtest-omgeving en leeromgeving
voor de ICC-strategie (Indication-Correction-Continuation), plus een to-do-lijst,
boekenlijst en receptenlijst. De landingspagina (`/`) is een overzicht met een
kaart per module; elke module heeft daarnaast zijn eigen volledige pagina.

## Stack

- Next.js (App Router) + TypeScript
- Postgres via [Neon](https://neon.tech) (or any Postgres — see local dev below)
- Drizzle ORM + drizzle-kit for schema/migrations
- NextAuth (Credentials provider) for a single-user login
- Tailwind CSS, Recharts
- Anthropic SDK (`@anthropic-ai/sdk`) — used to turn a pasted video transcript
  into a structured recipe (module 6)

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
   - `ANTHROPIC_API_KEY` — optional, only needed for "Genereer recept met
     Claude" on `/recipes/new`. Get one at https://console.anthropic.com.
     Without it, recipes can still be added by filling in the fields by hand.

   Note: bcrypt hashes contain `$` characters, which Next.js's `.env` loader
   treats as variable references. Escape every `$` as `\$` in the file (the
   example already shows the format).

3. **Migrate + seed:**

   ```bash
   npm install
   npm run db:migrate
   npm run db:seed   # optional: fills ~3 months of dummy data (live trades, backtest sessions, lessons, glossary)
   ```

4. **Run:**

   ```bash
   npm run dev
   ```

## Modules

### Hub (`/`)

Landing page after login. One card per module (trading net R/winrate, open
to-do count, currently-reading book, latest recipe), each linking through to
its full page. This replaces the old behaviour where `/` was the trading
dashboard directly.

### Module 1 — Trading journal (`/trading`, `/day/[date]`)

Monthly calendar (color-coded by daily net R), stats scoped to `type = "live"`
trades only (avg RR, winrate, trades/week, profit factor, expectancy, equity
curve, winrate by direction/session), CSV export. Day view has a quick-add
trade form (expandable to the full field set) and a trade list.

### Module 2 — Leren (`/learn`, `/learn/glossary`)

Linear, ordered lesson list → lesson detail (video link, content, multiple-choice
quiz) → "Start backtest-sessie over dit onderwerp" CTA that opens a new backtest
session with the hypothesis pre-filled from the lesson's `suggestedHypothesis`.
Lessons are authored through a simple form (`/learn/new`, `/learn/[id]/edit`) —
no CMS. The glossary (`/learn/glossary`) is separate and non-linear: a
client-side searchable list you can add/edit/delete from inline.

**Assumption**: quizzes are multiple-choice with a single correct answer. If
you want open-text/self-graded questions instead, the schema (`lessons.quiz`
as jsonb, see `LessonQuiz` in `lib/db/schema.ts`) and `LessonEditor`/`LessonQuiz`
components would need to change shape.

### Module 3 — Backtesten (`/backtest`, `/backtest/[sessionId]`)

Overview page lists all sessions side by side (date, hypothesis, trade count,
winrate, avg RR, net R) for comparison, plus a form to start a new session
(hypothesis field). Session detail shows stats (same `StatsPanel` as the
dashboard) and the session's trades.

**Design choices worth knowing about:**
- **Only the most recently created session is editable.** Every older session
  renders read-only (no add-row grid, no delete buttons) — this is my reading
  of "start a clean session each day, old sessions stay read-only." If you'd
  rather have multiple sessions open at once, or explicitly close a session
  instead of it becoming read-only by virtue of a newer one existing, say so.
- **Quick entry is a multi-row grid**, not one dialog per trade: start with
  one row, "+ Nieuwe rij" adds more, each row saves independently and a fresh
  blank row appears automatically after a save.
- Backtest trades don't have a meaningful "time of day" the way live trades
  do, so `tradedAt` is just set to the save moment — there's no session/time
  field on backtest rows.
- Screenshot links (Google Drive) render as an embedded `/preview` iframe via
  `lib/drive.ts` + `ScreenshotPreview`, both here and in module 1's trade list.

### Module 4 — To-do's (`/todos`)

Flat personal to-do list: title, priority (low/medium/high), optional due
date, done/open split. No projects/tags — deliberately simple.

### Module 5 — Boeken (`/books`, `/books/new`, `/books/[id]/edit`)

Book tracker with status (te lezen / bezig / gelezen) and a 1-5 rating.
**ISBN lookup**: typing an ISBN and clicking "Opzoeken" calls the free
[Open Library API](https://openlibrary.org/dev/docs/api/books) (no API key,
no self-hosted book database) to prefill title, author, cover and page count
— you can still edit or override every field before saving.

### Module 6 — Recepten (`/recipes`, `/recipes/new`, `/recipes/[id]`)

Recipes built from a video link + its transcript, so saving a recipe you saw
on YouTube/TikTok takes seconds instead of retyping it by hand:

1. Paste the video URL and the transcript (YouTube: copy the transcript from
   the video's "..." menu; TikTok has no public transcript API, so paste its
   auto-captions or your own notes instead).
2. "Genereer recept met Claude" (`lib/recipe-ai.ts`) sends the transcript to
   the Anthropic API and gets back a structured title/ingredients/steps/tags
   via tool use — nothing is invented that isn't in the transcript.
3. Everything is editable before saving, so a bad or partial extraction is a
   quick fix, not a re-do.

The video itself is embedded on the recipe detail page (YouTube `/embed/` or
TikTok `/embed/v2/`, via `lib/video-embed.ts`); unrecognized links fall back
to a "Bekijk video →" link.

## Data model

One `trades` table backs both live and backtest trades (`type: "live" | "backtest"`).
The trading journal only ever reads `type = "live"`. Backtest trades link to a
`backtest_sessions` row. `lessons` and `glossary_terms` back module 2. `todos`,
`books` and `recipes` are independent flat tables — no relations to trades or
to each other.

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
- `npm run db:seed` — seed dummy data across all three modules

## Deploying

Deploy to Vercel and set the same env vars there, pointing `DATABASE_URL` at
your Neon database. The auth layer (NextAuth Credentials, single user) is
already in place, so putting this behind a login in production requires no
extra work — just make sure `AUTH_SECRET` is a strong, unique value in
production and differs from your local one.

## Roadmap (not built yet)

- **Phase 2**: TradingView Pine Script webhook endpoint that creates `live`
  trades automatically — this is why the app already runs on Postgres instead
  of a local-only SQLite file.
- **Instellingenpagina** (phase 2): account-risico per trade (%) to convert RR
  into an estimated account effect.
