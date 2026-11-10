import { error } from '@sveltejs/kit';
import { getModule, listModules, listQuiz } from '#lib/server/db.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await listModules()).map((m) => ({ slug: m.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const module = await getModule(params.slug);
	if (!module) error(404, 'Module not found');

	const modules = await listModules();
	const index = modules.findIndex((m) => m.slug === module.slug);

	return {
		module,
		quiz: await listQuiz(module.slug),
		total: modules.length,
		prev: modules[index - 1] ?? null,
		next: modules[index + 1] ?? null
	};
};
