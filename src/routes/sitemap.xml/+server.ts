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

	const pages: { path: string; lastmod?: string }[] = [
		{ path: '/' },
		{ path: '/bn' },
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) =>
			`\t<url><loc>${absoluteUrl(p.path)}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}</url>`
	)
	.join('\n')}
</urlset>
`;
	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};
