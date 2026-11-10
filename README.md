# Dollar Man Learning

Website for **dollarmanlearning.com**, a free beginner trading course. Visitors (mostly from Facebook ads,
on mobile, inside the Facebook in-app browser) are guided to the Telegram channel where the course is delivered.

**Stack:** SvelteKit 3 · Svelte 5 (runes) · TypeScript · Tailwind CSS 4 · mdsvex · SQLite via Node's built-in `node:sqlite` · `@sveltejs/adapter-vercel`.
No external database or hosted data service, and no runtime dependencies beyond the SvelteKit toolchain.

> SvelteKit 3 differs from v2. This project follows the v3 docs: config lives in `vite.config.ts`
> (no `svelte.config.js`), `#lib/...` replaces `$lib`, env vars are declared in `src/env.ts` and imported
> from `$app/env/public` / `$app/env/private`, and internal links use `resolve()` from `$app/paths`.

## Local setup

Requirements: Node **≥ 22.18** (for built-in TypeScript type stripping in `scripts/` and `node:sqlite`).

```sh
npm install
cp .env.example .env      # fill in PUBLIC_TELEGRAM_CHANNEL, PUBLIC_META_PIXEL_ID, META_CAPI_ACCESS_TOKEN
npm run dev               # rebuilds data/content.db, then starts Vite on http://localhost:5173
```

| Script               | What it does                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| `npm run db:build`   | Rebuilds `data/content.db` from `src/content/**` (runs before dev/build/check) |
| `npm run db:migrate` | Applies pending migrations to an existing DB (VPS use)                         |
| `npm run build`      | `db:build` + production build (Vercel output in `.vercel/output`)              |
| `npm run check`      | `db:build` + `svelte-check` (TypeScript)                                       |
| `npm run lint`       | Prettier + ESLint                                                              |

## Project structure

```
db/migrations/0001_init.sql   Schema (source of truth); db/schema.sql is a generated snapshot
scripts/build-db.ts           Seed script: Markdown + JSON → data/content.db (read-only content store)
scripts/migrate.ts            Migration runner
src/content/course/           modules.json, quizzes.json, one .md per module (lesson body)
src/content/blog/             Articles (.md + frontmatter), tags.json
src/content/{faq,tools}.json  FAQ (en + bn), tool/download listings
src/lib/server/db.ts          The ONLY module that touches SQLite (read/write split)
src/lib/server/meta.ts        Meta Conversions API client
src/lib/attribution.svelte.ts UTM/fbclid capture + Telegram channel link
src/lib/tracking.ts           Meta Pixel (after consent) + server event relay
src/lib/progress.svelte.ts    Course progress in localStorage
src/lib/i18n.ts               English + Bangla UI and home-page copy
src/routes/api/meta-event     POST endpoint → Conversions API (not prerendered)
src/routes/api/health         GET endpoint proving SQLite opens at runtime (not prerendered)
```

Every page is prerendered (`export const prerender = true` in the root `+layout.ts`). Only `/api/*` runs as a serverless function.

## Content editing

- **Course:** edit `src/content/course/modules.json` (title, summary, outcomes, lesson list, checklist) and the matching `<slug>.md` body. Quizzes are in `quizzes.json`. The first module is always marked as the free preview.
- **Blog:** add `src/content/blog/<slug>.md` with frontmatter `title`, `description`, `published` (YYYY-MM-DD), optional `updated`, `tags: [a, b]` (each tag must exist in `tags.json`), and `draft: true` to hide a post.
- **Markdown caveat (mdsvex):** `{`, `}` and `<` are Svelte syntax inside `.md` files. Avoid them in prose or escape them.
- **Home page / UI copy** (English + Bangla): `src/lib/i18n.ts`. **Keep the hero headline and CTA identical to the Facebook ad copy.**

## Deploying to Vercel (free tier)

1. Push the repo to GitHub yourself, then import it in Vercel (framework preset: SvelteKit). The defaults are correct: build command `npm run build`, no output directory override.
2. In **Settings → Environment Variables**, add the variables from `.env.example`. `PUBLIC_*` values are inlined at build time, so **redeploy after changing them**.
3. Deploy. The function runtime is pinned to `nodejs24.x` in `vite.config.ts`. The build Node version comes from the project settings (`engines` allows ≥ 22.18).
4. Visit `/api/health` on the deployment. It should return `{"ok":true,...,"database":{"modules":10,...}}`.

`vercel.json` only adds security headers for the static pages and forces the CSV journal to download.

### The read-only SQLite limitation on Vercel (important)

Vercel's serverless filesystem is **read-only** (only `/tmp` is writable, and it does not persist). So:

- The database is a **build artefact**. `npm run build` regenerates `data/content.db` from `src/content/**` on every deploy. The `.db` file is git-ignored; edit the Markdown/JSON instead.
- Nearly all reads happen **at build time** during prerendering.
- For runtime reads (`/api/health`, or any future non-prerendered route), `db.ts` imports the file as an asset so SvelteKit bundles it into the function. It then loads it with `read()` from `$app/server` (the docs-recommended way to access files on Vercel), copies it once to `/tmp`, and opens it with `readOnly: true`.
- `writeDb()` throws unless `DATABASE_READONLY=false`. **Never set that on Vercel.** Nothing is ever written at runtime: progress lives in localStorage, conversion events go straight to Meta, and leads live in Telegram.
- Side effect: SvelteKit also publishes server-imported assets to `/_app/immutable/assets/`, so the content DB is publicly downloadable. It contains only public course and blog content. Never put private data in it.

**Verified locally (Node 25.6 and the built Vercel function):** `node:sqlite` read-only mode rejects writes ("attempt to write a readonly database"). The build places `content.*.db` inside `.vercel/output/functions/.../catchall.func/`. Invoking the built function handler from its own directory, with no `data/` folder and no env vars, served `/api/health` correctly via the `read()` → `/tmp` path.
Still to verify on a real deployment: `/api/health` on Vercel's `nodejs24.x` runtime (see the checklist).

> `node:sqlite` is marked experimental in Node 22–24 (release candidate from 25.7). It prints an ExperimentalWarning,
> which the npm scripts suppress. If you ever prefer `better-sqlite3`, only `db.ts` and `scripts/sqlite.ts` change.

## Moving to a VPS later (adapter-node + Docker)

1. `npm i -D @sveltejs/adapter-node`, then in `vite.config.ts` replace the adapter import and call:
   ```ts
   import adapter from '@sveltejs/adapter-node';
   // ...
   adapter: adapter(),
   ```
2. Build and run with Docker (`Dockerfile` included):
   ```sh
   docker build -t dollarman --build-arg PUBLIC_TELEGRAM_CHANNEL=... --build-arg PUBLIC_META_PIXEL_ID=... .
   docker run -p 3000:3000 --env-file .env -e ORIGIN=https://dollarmanlearning.com dollarman
   ```
   Or without Docker: `npm run build && ORIGIN=https://dollarmanlearning.com node --env-file=.env build`.
3. To enable writes (e.g. storing something server-side later): mount a persistent volume at `/app/data`, set `DATABASE_PATH` to the file on it, add a new migration in `db/migrations/`, run `npm run db:migrate`, and set `DATABASE_READONLY=false`. Then use `writeDb()` from `db.ts`; no refactor needed.
   Note that `db:build` recreates the content DB from scratch, so keep any write data in a **separate** DB file or tables you do not rebuild.

## Funnel and tracking

- **Telegram link:** every CTA links to the channel where the live classes are held, `https://t.me/<PUBLIC_TELEGRAM_CHANNEL>`. Channels ignore `?start=` payloads, so the link carries no campaign code; ad attribution comes from the Meta `Lead` event (with `placement`) fired on tap.

- **Attribution:** UTMs and `fbclid` are captured in the browser and kept in `sessionStorage`, so they survive navigation (the `fbclid` feeds the `_fbc` cookie). Pages are prerendered, so this cannot happen on the server.
- **Consent:** nothing is sent to Meta until the visitor taps "Allow" on the non-blocking banner. That applies to everyone. "Cookie settings" in the footer reopens it.
- **Pixel + CAPI:** `PageView` (every navigation) and `Lead` (Telegram tap) fire in the browser with an `eventID`. The same `event_id` goes to `/api/meta-event`, which forwards to the Conversions API with IP, user agent, `_fbp`/`_fbc` (unhashed, as Meta requires) and a SHA-256-hashed anonymous `external_id`. No email or phone is collected, so there is nothing else to hash. Events are never stored.
- `META_API_VERSION` defaults to `v24.0`. **Check Meta's docs for the current Graph API version.**

## Placeholders to fill before launch

- `PUBLIC_TELEGRAM_CHANNEL`: until it is set, links point to `t.me/YOUR_CHANNEL`.
- Instructor section on the home page and the "Who is behind it" block on `/about` (dashed amber boxes).
- `[LEGAL BUSINESS NAME, ADDRESS]`, `[CONTACT EMAIL]` (`src/lib/site.ts`), `[JURISDICTION]`, hosting provider and Telegram channel data handling in `/privacy` and `/terms`. Have the legal pages reviewed by a professional.
- Social share image: add `static/og-image.png` (1200×630) and set `ogImage` in `src/lib/site.ts`.
- Bangla copy in `src/lib/i18n.ts` and `src/content/faq.json`: have a native speaker review it.

See also: [`docs/COURSE_OUTLINE.md`](docs/COURSE_OUTLINE.md) and [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md).
