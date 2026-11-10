import { absoluteUrl } from '#lib/site.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
	new Response(`User-agent: *\nDisallow: /api/\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`, {
		headers: { 'content-type': 'text/plain' }
	});
