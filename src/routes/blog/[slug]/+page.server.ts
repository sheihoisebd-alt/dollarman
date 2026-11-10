import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/server/db.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () =>
	(await listPosts()).map((p) => ({ slug: p.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Article not found');
	const related = (await listPosts()).filter((p) => p.slug !== post.slug).slice(0, 2);
	return { post, related };
};
