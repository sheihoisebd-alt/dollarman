<script lang="ts">
	import { t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: (name: string) => `${name}: beginner trading articles`,
			seoDescription: (name: string) =>
				`Beginner-friendly articles about ${name.toLowerCase()} from Dollar Man Learning.`
		},
		bn: {
			seoTitle: (name: string) => `${name}: নতুনদের জন্য ট্রেডিং বিষয়ক লেখা`,
			seoDescription: (name: string) =>
				`${name} নিয়ে Dollar Man Learning-এর সহজ লেখাগুলো, নতুনদের কথা মাথায় রেখে।`
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo
	title={c.seoTitle(data.tag.name)}
	description={c.seoDescription(data.tag.name)}
	path="/blog/tag/{data.tag.slug}"
/>

<div class="container-page py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={href(lang, '/blog')} class="font-medium text-gold-300 hover:underline"
			>{t(lang).common.blog}</a
		>
	</nav>
	<h1 class="mt-2 text-4xl font-extrabold tracking-tight text-ink">{data.tag.name}</h1>
	<div class="mt-8"><PostList {lang} posts={data.posts} /></div>
</div>
