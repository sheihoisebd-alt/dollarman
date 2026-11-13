import { error } from '@sveltejs/kit';
import { lessonLoader } from '#lib/content.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
	const { lang } = await parent();
	const loader = lessonLoader(lang, data.module.slug);
	if (!loader) error(404, 'Lesson content not found');
	return { ...data, Content: (await loader()).default };
};
