import { PUBLIC_SITE_URL } from '$app/env/public';
import { dev } from '$app/env';
import { capiEnabled, sendServerEvent, type ServerEvent } from '#lib/server/meta.js';
import type { RequestHandler } from './$types';

export const prerender = false;

const EVENTS = new Set(['PageView', 'Lead']);
const ID = /^[A-Za-z0-9-]{8,64}$/;
const COOKIE = /^fb\.\d\.\d+\.[\w-]{1,500}$/;

const str = (value: unknown, max = 500) =>
	typeof value === 'string' && value.length <= max ? value : undefined;

export const POST: RequestHandler = async (event) => {
	if (!capiEnabled()) return new Response(null, { status: 204, headers: { 'x-capi': 'disabled' } });

	let body: Record<string, unknown>;
	try {
		body = await event.request.json();
	} catch {
		return new Response('Invalid JSON', { status: 400 });
	}

	const eventName = str(body.event_name);
	const eventId = str(body.event_id);
	const sourceUrl = str(body.event_source_url, 2000);

	if (body.consent !== true) return new Response('Consent required', { status: 400 });
	if (!eventName || !EVENTS.has(eventName)) return new Response('Unknown event', { status: 400 });
	if (!eventId || !ID.test(eventId)) return new Response('Invalid event_id', { status: 400 });

	// Only accept events about our own pages.
	let source: URL;
	try {
		source = new URL(sourceUrl ?? '');
	} catch {
		return new Response('Invalid event_source_url', { status: 400 });
	}
	const allowed = [new URL(PUBLIC_SITE_URL).host, event.url.host];
	if (!allowed.includes(source.host))
		return new Response('Foreign event_source_url', { status: 400 });

	const customData: Record<string, string> = {};
	if (body.custom_data && typeof body.custom_data === 'object') {
		for (const [key, value] of Object.entries(body.custom_data).slice(0, 10)) {
			const v = str(value, 100);
			if (/^[a-z_]{1,40}$/.test(key) && v) customData[key] = v;
		}
	}

	const fbp = str(body.fbp);
	const fbc = str(body.fbc);
	const payload: ServerEvent = {
		event_name: eventName as ServerEvent['event_name'],
		event_id: eventId,
		event_source_url: source.href,
		custom_data: customData,
		user_data: {
			// x-forwarded-for can be a list ("client, proxy"); Meta wants the client.
			client_ip_address: event.getClientAddress()?.split(',')[0].trim() || undefined,
			client_user_agent: event.request.headers.get('user-agent') ?? undefined,
			fbp: fbp && COOKIE.test(fbp) ? fbp : undefined,
			fbc: fbc && COOKIE.test(fbc) ? fbc : undefined,
			external_id: str(body.external_id, 64)
		}
	};

	try {
		const result = await sendServerEvent(payload);
		if (!result.ok) console.error(`[capi] ${eventName} failed: ${result.status} ${result.body}`);
		else if (dev) console.log(`[capi] ${eventName} ${eventId}: ${result.body}`);
	} catch (error) {
		console.error('[capi] request error', error);
	}

	// The browser does not need the result (it was sent with sendBeacon).
	return new Response(null, { status: 204 });
};
