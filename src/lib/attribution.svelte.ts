/**
 * Ad attribution (UTM parameters + fbclid).
 *
 * Pages are prerendered, so the query string is only read in the browser. The values are kept in
 * sessionStorage so they survive navigation inside the site (the Facebook in-app browser keeps one
 * tab per ad click) and the fbclid is still there for the Meta Pixel on later pages.
 */
import { PUBLIC_TELEGRAM_CHANNEL } from '$app/env/public';

const KEYS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
	'fbclid'
] as const;
type Key = (typeof KEYS)[number];
export type Attribution = Partial<Record<Key, string>> & { landing?: string };

const STORAGE_KEY = 'dml-attribution';

// PUBLIC_TELEGRAM_CHANNEL (channel username without @) overrides the default channel.
export const TELEGRAM_CHANNEL = PUBLIC_TELEGRAM_CHANNEL ?? 'trading_with_dollar_man';

/**
 * Public channel link. Channels ignore `?start=` payloads (only bots read them), so ad attribution
 * comes from the Meta `Lead` event fired on tap, not from the link.
 */
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_CHANNEL}`;

export const attribution = $state<{ current: Attribution }>({ current: {} });

/** Call once in the browser. New ad parameters replace older ones (last click wins). */
export function captureAttribution(url: URL) {
	let stored: Attribution = {};
	try {
		stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
	} catch {
		// Storage can be blocked; attribution then only lasts for this page view.
	}

	const fresh: Attribution = {};
	for (const key of KEYS) {
		const value = url.searchParams.get(key);
		if (value) fresh[key] = value.slice(0, 200);
	}

	if (Object.keys(fresh).length > 0) {
		stored = { ...fresh, landing: url.pathname };
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
		} catch {
			// ignore
		}
	}
	attribution.current = stored;
}
