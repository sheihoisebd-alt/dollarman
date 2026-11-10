<script lang="ts">
	import { resolve } from '$app/paths';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Trading blog for beginners"
	description="Simple, honest articles for beginner traders: pips, risk management, charts and how to avoid scams."
	path="/blog"
/>

<div class="container-page py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">Blog</h1>
	<p class="mt-3 max-w-2xl text-lg text-body">
		Short guides on beginner trading topics, written in plain English.
	</p>

	{#if data.tags.length}
		<nav aria-label="Topics" class="mt-6 flex flex-wrap gap-2">
			{#each data.tags as tag (tag.slug)}
				<a
					href={resolve('/blog/tag/[tag]', { tag: tag.slug })}
					class="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-body hover:border-silver-300 hover:text-ink"
				>
					{tag.name} ({tag.count})
				</a>
			{/each}
		</nav>
	{/if}

	<div class="mt-8"><PostList posts={data.posts} /></div>
</div>
