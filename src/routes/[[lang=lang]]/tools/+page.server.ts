import { listTools } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lang = langFromParam(params.lang);
	return {
		calculators: await listTools(lang, 'calculator'),
		downloads: await listTools(lang, 'download')
	};
};
