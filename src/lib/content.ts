/**
 * Markdown bodies for lessons and blog posts, in both languages. The globs live here rather than in
 * the route files: Vite cannot build glob imports from inside the `[[lang=lang]]` route folder.
 */
import type { Component } from 'svelte';
import type { Lang } from '#lib/types.js';

type Loader = () => Promise<{ default: Component }>;

const lessons: Record<Lang, Record<string, Loader>> = {
	en: import.meta.glob<{ default: Component }>('/src/content/course/*.md'),
	bn: import.meta.glob<{ default: Component }>('/src/content/bn/course/*.md')
};

const articles: Record<Lang, Record<string, Loader>> = {
	en: import.meta.glob<{ default: Component }>('/src/content/blog/*.md'),
	bn: import.meta.glob<{ default: Component }>('/src/content/bn/blog/*.md')
};

const dir = (lang: Lang, kind: 'course' | 'blog') =>
	lang === 'en' ? `/src/content/${kind}` : `/src/content/bn/${kind}`;

/** The lesson body for a module, or undefined if there is no Markdown file. */
export const lessonLoader = (lang: Lang, slug: string): Loader | undefined =>
	lessons[lang][`${dir(lang, 'course')}/${slug}.md`];

/** The article body for a blog post, or undefined if there is no Markdown file. */
export const articleLoader = (lang: Lang, slug: string): Loader | undefined =>
	articles[lang][`${dir(lang, 'blog')}/${slug}.md`];
