import { listModules } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => ({
	modules: await listModules(langFromParam(params.lang))
});
