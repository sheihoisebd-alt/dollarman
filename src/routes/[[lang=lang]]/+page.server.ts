import { listFaqs, listModules } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	return { modules: await listModules(lang), faqs: await listFaqs(lang) };
};
