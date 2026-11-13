import { listTools } from '#lib/server/db.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => ({
	downloads: await listTools(langFromParam(params.lang), 'download')
});
