import { listFaqs, listModules } from '#lib/server/db.js';
import { getLatestVideos } from '#lib/server/youtube.js';
import { langFromParam } from '#lib/i18n.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const lang = langFromParam(params.lang);
	// Videos fetched at build time go straight into the page; the browser refreshes them from /api/youtube.
	const [modules, faqs, videos] = await Promise.all([
		listModules(lang),
		listFaqs(lang),
		getLatestVideos(fetch)
	]);
	return { modules, faqs, videos };
};
