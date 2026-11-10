import { listPosts, listTags } from '#lib/server/db.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	posts: await listPosts(),
	tags: await listTags()
});
