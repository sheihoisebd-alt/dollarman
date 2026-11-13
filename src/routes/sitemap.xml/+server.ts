import { absoluteUrl } from '#lib/site.js';
import { localizePath } from '#lib/i18n.js';
import { listModules, listPosts, listTags, listTools } from '#lib/server/db.js';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	// Slugs are the same in both languages, so the English lists give every page.
	const [modules, posts, tags, tools] = await Promise.all([
		listModules('en'),
		listPosts('en'),
		listTags('en'),
		listTools('en')
	]);

	const pages: { path: string; lastmod?: string }[] = [
		{ path: '/' },
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

	// Every page is listed in Bangla (default) and English, each pointing at both versions.
	const alternates = (path: string) =>
		[
			['bn', localizePath('bn', path)],
			['en', localizePath('en', path)],
			['x-default', localizePath('bn', path)]
		]
			.map(
				([lang, href]) =>
					`<xhtml:link rel="alternate" hreflang="${lang}" href="${absoluteUrl(href)}"/>`
			)
			.join('');

	const urls = pages.flatMap((p) =>
		(['bn', 'en'] as const).map(
			(lang) =>
				`\t<url><loc>${absoluteUrl(localizePath(lang, p.path))}</loc>${
					p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''
				}${alternates(p.path)}</url>`
		)
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};
