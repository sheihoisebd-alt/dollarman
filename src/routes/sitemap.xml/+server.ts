import { absoluteUrl } from '#lib/site.js';
import { listModules, listPosts, listTags, listTools } from '#lib/server/db.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const [modules, posts, tags, tools] = await Promise.all([
		listModules(),
		listPosts(),
		listTags(),
		listTools()
	]);

	// The English and Bangla home pages are translations of each other.
	const homeAlternates = { en: '/', bn: '/bn', 'x-default': '/' };

	const pages: { path: string; lastmod?: string; alternates?: Record<string, string> }[] = [
		{ path: '/', alternates: homeAlternates },
		{ path: '/bn', alternates: homeAlternates },
		{ path: '/course' },
		...modules.map((m) => ({ path: `/course/${m.slug}` })),
		{ path: '/tools' },
		...tools.filter((t) => t.kind === 'calculator').map((t) => ({ path: t.href })),
		{ path: '/downloads' },
		{ path: '/downloads/cheat-sheet' },
		{ path: '/blog' },
		...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updated ?? p.published })),
		...tags.map((t) => ({ path: `/blog/tag/${t.slug}` })),
		{ path: '/about' },
		{ path: '/disclaimer' },
		{ path: '/privacy' },
		{ path: '/terms' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
	.map(
		(p) =>
			`\t<url><loc>${absoluteUrl(p.path)}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}${Object.entries(
				p.alternates ?? {}
			)
				.map(
					([lang, href]) =>
						`<xhtml:link rel="alternate" hreflang="${lang}" href="${absoluteUrl(href)}"/>`
				)
				.join('')}</url>`
	)
	.join('\n')}
</urlset>
`;
	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};
