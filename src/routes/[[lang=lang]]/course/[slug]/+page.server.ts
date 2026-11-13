import { error } from '@sveltejs/kit';
import { getModule, listModules, listQuiz } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { EntryGenerator, PageServerLoad } from './$types';

// Every module in both languages: /course/x (Bangla) and /en/course/x (English)
export const entries: EntryGenerator = async () =>
	(await listModules('en')).flatMap((m) => [
		{ slug: m.slug },
		{ lang: 'en' as const, slug: m.slug }
	]);

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	const module = await getModule(lang, params.slug);
	if (!module) error(404, 'Module not found');

	const modules = await listModules(lang);
	const index = modules.findIndex((m) => m.slug === module.slug);

	return {
		module,
		quiz: await listQuiz(lang, module.slug),
		total: modules.length,
		prev: modules[index - 1] ?? null,
		next: modules[index + 1] ?? null
	};
};
