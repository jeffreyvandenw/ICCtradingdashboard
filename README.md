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
   npm run db:seed   # optional: fills ~3 months of dummy data (live trades, backtest sessions, lessons, glossary)
   ```

4. **Run:**

   ```bash
   npm run dev
   ```

## Modules

### Hub (`/`)

Landing page after login, kept compact: the daily check-in (see Module 7)
and the open to-do's side by side, then three cards — Boodschappen (open
items per shop), Boeken (currently reading) and Leren. Leren shows the next
video: the one after the last completed lesson in the playlist you're
working through. Once that playlist is finished (and no other one is in
progress) it lists the playlists that are still open instead.

### Theme

Dark by default, with a light mode behind the sun/moon button in the top bar
(remembered in a `theme` cookie, so there's no flash on load). Components
use plain slate/neutral/accent Tailwind utilities; `app/globals.css`
redefines those palette variables under `html.dark`, so there are no
per-class `dark:` variants. The brand accent is `gold-*`.

### Module 7 — Dagelijkse check-in (`/checkin`)

Three questions on the hub, filled in at the end of the day: did you do
today what you said you would, do you trust yourself to do tomorrow what's
needed, and anything else on your mind. Answering "nee" to either of the
first two opens a required field to explain what and why. (The DB columns
are still named `did_yesterday`/`confident_today` from the old wording;
in code they're `didAsPromised`/`confidentTomorrow`.) One row per calendar day (`check_ins.day`, unique) —
submitting is a one-way action, there's no edit route.

`/checkin` shows a read-only monthly calendar; click a day to read what you
filled in that day:
- **Green** = filled in, both answers "ja". **Orange** = filled in, but at
  least one "nee". **Red** = not filled in (in the past, on/after
  the first-ever check-in). **Neutral/gray** = today (still open, doesn't
  turn red until the day is over), a future day, or a day before the habit
  started — nothing to hold you accountable for before the feature existed.
- The streak on the hub (`lib/checkins.ts#getCheckInStreak`) counts backward
  from today if today's filled in, otherwise from yesterday — so an
  unfilled "today" doesn't break the streak until the day actually passes.

### Module 1 — Trading journal (`/trading`, `/day/[date]`)

Monthly calendar (color-coded by daily net R, with the day's P&L), stats
scoped to `type = "live"` trades only (net R, P&L, avg RR, winrate,
trades/week, profit factor, expectancy, equity curve, winrate by
direction), CSV export. Each trade has an optional P&L amount (€) next to
its R result. The pair is prefilled with XAUUSD (`DEFAULT_PAIR` in
`lib/rr.ts`). Day view has a quick-add
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
dashboard, minus trades/week) and the session's trades. Sessions can be
deleted (with their trades) from the overview or the session page.

**P&L curve**: every session has its own starting balance (entered per
session; nothing carries over from the previous one). Each trade risks 10% of the *current* balance
(`BACKTEST_RISK_PCT` in `lib/backtest-pnl.ts`): a loss costs 10%, a win
earns 10% × RR, breakeven changes nothing. The curve of the resulting
balance replaces the R equity curve on the session page.

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

Recipes are entered by hand: an optional video link, title, ingredients
and steps (one per line) and comma-separated tags. The platform (YouTube /
TikTok) is derived from the link, and the detail page links to the video.
The overview has a search bar that matches every word against the title
and tags; clicking a tag searches for it.

### Module 8 — Boodschappen (`/boodschappen`)

Shopping list grouped per shop, built for use on a phone in the store. Each
item has a name, a quantity (default 1), an optional unit and note/link, and
a shop — or "Overal" when it can be picked up anywhere. Filter chips at the
top show one shop at a time ("Overal" items stay visible under every
filter). Tapping an item checks it off: it stays struck through for 30
minutes and then drops off the list ("Nu wissen" hides them right away).
Checked items are kept in the database as history, so typing a name you've
bought before suggests it and preselects the shop you last used for it.

The default shops (Albert Heijn, Jumbo, Action, Gamma, Praxis, Ikea,
Babydump, Prenatal, Mediamarkt, Bol, Coolblue) are inserted by migration
`0004_add_groceries`; more can be added from the shop dropdown
("+ Nieuwe winkel…").

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

If you can't run `db:migrate` against production, opening
`/api/admin/migrate` while logged in applies migration 0005 (idempotent).

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
