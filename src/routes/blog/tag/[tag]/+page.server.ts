import { error } from '@sveltejs/kit';
import { listPosts, listTags } from '#lib/server/db.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await listTags()).map((t) => ({ tag: t.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const tag = (await listTags()).find((t) => t.slug === params.tag);
	if (!tag) error(404, 'Topic not found');
	return { tag, posts: await listPosts(tag.slug) };
};
