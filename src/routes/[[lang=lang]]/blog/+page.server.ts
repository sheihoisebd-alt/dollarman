import { listPosts, listTags } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	return { posts: await listPosts(lang), tags: await listTags(lang) };
};
