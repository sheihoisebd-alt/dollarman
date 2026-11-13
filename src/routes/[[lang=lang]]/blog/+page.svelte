<script lang="ts">
	import { num } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);

	const copy = {
		en: {
			seoTitle: 'Trading blog for beginners',
			seoDescription:
				'Simple, honest articles for beginner traders: pips, risk management, charts and how to avoid scams.',
			title: 'Blog',
			intro: 'Short guides on beginner trading topics, written in plain English.',
			topics: 'Topics'
		},
		bn: {
			seoTitle: 'নতুন ট্রেডারদের জন্য ব্লগ',
			seoDescription:
				'নতুন ট্রেডারদের জন্য সহজ আর সৎ লেখা: পিপ, রিস্ক ম্যানেজমেন্ট, চার্ট, আর প্রতারণা থেকে কীভাবে বাঁচবেন।',
			title: 'ব্লগ',
			intro: 'নতুনদের ট্রেডিংয়ের নানা বিষয় নিয়ে ছোট ছোট গাইড, একদম সহজ বাংলায়।',
			topics: 'বিষয়'
		}
	};
	const c = $derived(copy[lang]);
</script>

<Seo title={c.seoTitle} description={c.seoDescription} path="/blog" />

<div class="container-page py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">{c.title}</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">{c.intro}</p>

	{#if data.tags.length}
		<nav aria-label={c.topics} class="mt-6 flex flex-wrap gap-2">
			{#each data.tags as tag (tag.slug)}
				<a
					href={href(lang, `/blog/tag/${tag.slug}`)}
					class="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-body hover:border-gold-400/60 hover:text-ink"
				>
					{tag.name} ({num(lang, tag.count)})
				</a>
			{/each}
		</nav>
	{/if}

	<div class="mt-8"><PostList {lang} posts={data.posts} /></div>
</div>
