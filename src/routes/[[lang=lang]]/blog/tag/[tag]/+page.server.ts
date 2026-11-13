import { error } from '@sveltejs/kit';
import { listPosts, listTags } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await listTags('en')).flatMap((t) => [{ tag: t.slug }, { lang: 'en' as const, tag: t.slug }]);

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	const tag = (await listTags(lang)).find((t) => t.slug === params.tag);
	if (!tag) error(404, 'Topic not found');
	return { tag, posts: await listPosts(lang, tag.slug) };
};
