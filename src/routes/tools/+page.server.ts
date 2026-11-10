import { listTools } from '#lib/server/db.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	calculators: await listTools('calculator'),
	downloads: await listTools('download')
});
