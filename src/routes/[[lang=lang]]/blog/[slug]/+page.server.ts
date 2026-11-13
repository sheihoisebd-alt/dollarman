import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await listPosts('en')).flatMap((p) => [{ slug: p.slug }, { lang: 'en' as const, slug: p.slug }]);

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	const post = await getPost(lang, params.slug);
	if (!post) error(404, 'Article not found');
	const related = (await listPosts(lang)).filter((p) => p.slug !== post.slug).slice(0, 2);
	return { post, related };
};
