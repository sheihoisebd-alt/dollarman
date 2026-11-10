import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

const lessons = import.meta.glob<{ default: Component }>('/src/content/course/*.md');

export const load: PageLoad = async ({ data }) => {
	const loader = lessons[`/src/content/course/${data.module.slug}.md`];
	if (!loader) error(404, 'Lesson content not found');
	return { ...data, Content: (await loader()).default };
};
