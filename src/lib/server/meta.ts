/** Meta Conversions API client. Events are forwarded, never stored. */
import { createHash } from 'node:crypto';
import { PUBLIC_META_PIXEL_ID } from '$app/env/public';
import { META_API_VERSION, META_CAPI_ACCESS_TOKEN, META_TEST_EVENT_CODE } from '$app/env/private';

export const capiEnabled = () => Boolean(PUBLIC_META_PIXEL_ID && META_CAPI_ACCESS_TOKEN);

/** Meta requires identifiers such as external_id to be SHA-256 hashed (lowercase hex). */
export const sha256 = (value: string) =>
	createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

export type ServerEvent = {
	event_name: 'PageView' | 'Lead';
	event_id: string;
	event_source_url: string;
	custom_data?: Record<string, string>;
	user_data: {
		client_ip_address?: string;
		client_user_agent?: string;
		fbp?: string;
		fbc?: string;
		external_id?: string;
	};
};

export async function sendServerEvent(
	event: ServerEvent
): Promise<{ ok: boolean; status: number; body: string }> {
	const { external_id, ...userData } = event.user_data;

	const payload = {
		data: [
			{
				event_name: event.event_name,
				event_time: Math.floor(Date.now() / 1000),
				event_id: event.event_id, // same id as the browser Pixel event → deduplicated
				event_source_url: event.event_source_url,
				action_source: 'website',
				user_data: {
					// IP, user agent and the _fbp/_fbc cookies must NOT be hashed; personal identifiers must be.
					...userData,
					...(external_id ? { external_id: [sha256(external_id)] } : {})
				},
				custom_data: event.custom_data
			}
		],
		...(META_TEST_EVENT_CODE ? { test_event_code: META_TEST_EVENT_CODE } : {})
	};

	const url = `https://graph.facebook.com/${META_API_VERSION}/${PUBLIC_META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_ACCESS_TOKEN ?? '')}`;
	const response = await fetch(url, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(payload),
		signal: AbortSignal.timeout(4000)
	});
	return { ok: response.ok, status: response.status, body: await response.text() };
}
