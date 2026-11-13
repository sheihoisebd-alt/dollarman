import { error } from '@sveltejs/kit';
import { articleLoader } from '#lib/content.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
	const { lang } = await parent();
	const loader = articleLoader(lang, data.post.slug);
	if (!loader) error(404, 'Article not found');
	return { ...data, Content: (await loader()).default };
};
