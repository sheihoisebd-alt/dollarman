# Launch testing checklist

## 1. Vercel + read-only SQLite

- [ ] Build log shows `Built data/content.db: 10 modules, …` before `vite build`.
- [ ] `https://<deployment>/api/health` returns `ok: true` with non-zero counts (modules 10, posts 3, faqs 16, tools 5) and a `node` of v24.x.
- [ ] Function logs (Vercel → Deployments → Functions) show no `EROFS`/`readonly` errors.
- [ ] Spot-check prerendered pages: `/`, `/bn`, `/course`, `/course/trading-basics`, `/tools/position-size-calculator`, `/blog/what-is-a-pip`, `/sitemap.xml`, `/robots.txt`.
- [ ] `/bn` has `<html lang="bn">`, and `/` has `lang="en"`.

## 2. Telegram channel link

- [ ] With `PUBLIC_TELEGRAM_CHANNEL` set, view source of `/`: links are `https://t.me/dollarman4178` (they work even without JavaScript).
- [ ] Tap the hero button and the sticky bar → Telegram opens the channel.
- [ ] Test inside the **Facebook app's in-app browser** on Android and iPhone (send the link to yourself in Messenger, or use the ad preview). Telegram app must open.

## 3. Meta Pixel (browser)

- [ ] Install Meta Pixel Helper (desktop Chrome). Before consent: **no** requests to `connect.facebook.net` or `facebook.com/tr`.
- [ ] Tap **Allow** → `PageView` fires. Navigate → another `PageView`. Tap a Telegram button → `Lead` with `content_name=free_trading_course` and `placement`.
- [ ] Tap **No thanks** (or Cookie settings → No thanks) → no further events.
- [ ] `_fbc` cookie is set when you arrived with `fbclid` (format `fb.1.<ms>.<fbclid>`).

## 4. Conversions API (server) + deduplication

- [ ] Set `META_TEST_EVENT_CODE` (Events Manager → Test events) and redeploy.
- [ ] With consent given, browse and tap a Telegram button. In Test events, `PageView` and `Lead` appear from **both** "Browser" and "Server" and are marked **Deduplicated**.
- [ ] Server events show IP, user agent, fbp, fbc and a hashed external_id in Event details. Check Event Match Quality.
- [ ] Vercel function logs show no `[capi] … failed` lines.
- [ ] `curl -X POST https://<site>/api/meta-event -H 'content-type: application/json' -d '{}'` returns 400 (with CAPI configured) or 204 with `x-capi: disabled` (without).
- [ ] Remove `META_TEST_EVENT_CODE` and redeploy before going live.

## 5. Mobile UX and performance

- [ ] Lighthouse (mobile) on `/`: LCP < 2.0 s, CLS ≈ 0, accessibility ≥ 95.
- [ ] No horizontal scroll at 320 px width; the sticky CTA never covers the footer or final CTA. The consent bar sits above it.
- [ ] Calculators work on a phone (numeric keyboard appears; results update while typing).
- [ ] Module checklist progress persists after reload and shows on `/course`.
- [ ] Cheat-sheet prints to one or two clean pages (no sticky bar in print). The journal CSV downloads and opens in Excel/Sheets.

## 6. Compliance

- [ ] Ad headline and CTA match the hero (`src/lib/i18n.ts`).
- [ ] No income claims, "risk-free" or "guaranteed" language anywhere, including the Telegram channel's posts.
- [ ] Placeholders replaced (instructor, legal name, contact email, jurisdiction); legal pages reviewed.
