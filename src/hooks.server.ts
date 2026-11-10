import type { Handle } from '@sveltejs/kit/hooks';
import { langFromPath } from '#lib/i18n.js';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = langFromPath(event.url.pathname);

	const response = await resolve(event, {
		// Runs during prerendering too, so static pages get the right <html lang>.
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});

	// Applies to server-rendered responses (API routes). Static pages get theirs from vercel.json.
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	return response;
};
