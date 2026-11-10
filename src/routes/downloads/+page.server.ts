import { listTools } from '#lib/server/db.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ downloads: await listTools('download') });
