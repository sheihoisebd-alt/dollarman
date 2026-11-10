import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

const articles = import.meta.glob<{ default: Component }>('/src/content/blog/*.md');

export const load: PageLoad = async ({ data }) => {
	const loader = articles[`/src/content/blog/${data.post.slug}.md`];
	if (!loader) error(404, 'Article not found');
	return { ...data, Content: (await loader()).default };
};
