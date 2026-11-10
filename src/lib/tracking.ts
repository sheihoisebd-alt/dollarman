/**
 * Meta Pixel (browser) + Conversions API (server, via /api/meta-event).
 *
 * Each event is sent twice with the same `eventID`, so Meta deduplicates them.
 * Every function is a no-op until the visitor grants consent and a Pixel ID is configured.
 * Browser-only: call from event handlers, onMount or afterNavigate.
 */
import { PUBLIC_META_PIXEL_ID } from '$app/env/public';
import { attribution } from '#lib/attribution.svelte.js';
import { consent } from '#lib/consent.svelte.js';

export type MetaEventName = 'PageView' | 'Lead';

type Fbq = ((...args: unknown[]) => void) & {
	callMethod?: (...args: unknown[]) => void;
	queue: unknown[];
	push: Fbq;
	loaded: boolean;
	version: string;
};

declare global {
	interface Window {
		fbq?: Fbq;
		_fbq?: Fbq;
	}
}

const EXTERNAL_ID_KEY = 'dml-visitor';
let pixelLoaded = false;

const enabled = () => Boolean(PUBLIC_META_PIXEL_ID) && consent.value === 'granted';

/** Standard Meta Pixel base code, written out so it only runs after consent. */
function loadPixel() {
	if (pixelLoaded || !PUBLIC_META_PIXEL_ID) return;
	pixelLoaded = true;

	if (!window.fbq) {
		const fbq = function (...args: unknown[]) {
			if (fbq.callMethod) fbq.callMethod(...args);
			else fbq.queue.push(args);
		} as Fbq;
		fbq.push = fbq;
		fbq.loaded = true;
		fbq.version = '2.0';
		fbq.queue = [];
		window.fbq = fbq;
		window._fbq ??= fbq;

		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://connect.facebook.net/en_US/fbevents.js';
		document.head.append(script);
	}

	setFbcCookie();
	window.fbq('consent', 'grant');
	window.fbq('init', PUBLIC_META_PIXEL_ID);
}

function readCookie(name: string): string | undefined {
	const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * The Pixel only sets `_fbc` if fbclid is in the URL when it loads. Visitors often consent after
 * navigating, so we set it from the stored fbclid (format documented by Meta: fb.1.<ms>.<fbclid>).
 */
function setFbcCookie() {
	const fbclid = attribution.current.fbclid;
	if (!fbclid || readCookie('_fbc')?.endsWith(fbclid)) return;
	const maxAge = 60 * 60 * 24 * 90;
	document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
}

/** Random, anonymous visitor id; hashed on the server before it is sent to Meta. */
function externalId(): string | undefined {
	try {
		let id = localStorage.getItem(EXTERNAL_ID_KEY);
		if (!id) {
			id = crypto.randomUUID();
			localStorage.setItem(EXTERNAL_ID_KEY, id);
		}
		return id;
	} catch {
		return undefined;
	}
}

function track(event: MetaEventName, customData: Record<string, string> = {}) {
	if (!enabled()) return;
	if (pixelLoaded) window.fbq?.('consent', 'grant');
	loadPixel();

	const eventId = crypto.randomUUID();
	window.fbq?.('track', event, customData, { eventID: eventId });

	const body = JSON.stringify({
		event_name: event,
		event_id: eventId,
		event_source_url: location.href,
		custom_data: customData,
		fbp: readCookie('_fbp'),
		fbc: readCookie('_fbc'),
		external_id: externalId(),
		consent: true
	});

	// sendBeacon survives the page being replaced by Telegram; fetch+keepalive is the fallback.
	const sent = navigator.sendBeacon?.(
		'/api/meta-event',
		new Blob([body], { type: 'application/json' })
	);
	if (!sent) {
		fetch('/api/meta-event', {
			method: 'POST',
			body,
			headers: { 'content-type': 'application/json' },
			keepalive: true
		}).catch(() => {});
	}
}

/** Tell an already-loaded Pixel to stop sending (e.g. consent withdrawn via "Cookie settings"). */
export function revokeTracking() {
	window.fbq?.('consent', 'revoke');
}

export const trackPageView = () => track('PageView');

export const trackLead = (placement: string) =>
	track('Lead', { content_name: 'free_trading_course', placement });
