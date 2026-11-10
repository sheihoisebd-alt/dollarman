<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Post } from '#lib/types.js';

	let { posts }: { posts: Post[] } = $props();

	const formatDate = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		});
</script>

<ul class="grid gap-4 md:grid-cols-2">
	{#each posts as post (post.slug)}
		<li>
			<article
				class="flex h-full flex-col rounded-2xl border border-line p-5 hover:border-silver-400 hover:shadow-md"
			>
				<h2 class="text-lg font-semibold text-ink">
					<a
						href={resolve('/blog/[slug]', { slug: post.slug })}
						class="after:absolute after:inset-0 hover:text-ink">{post.title}</a
					>
				</h2>
				<p class="mt-2 flex-1 text-body">{post.description}</p>
				<p class="mt-4 text-sm text-muted">
					<time datetime={post.published}>{formatDate(post.published)}</time> · {post.readingMin} min
					read
				</p>
			</article>
		</li>
	{/each}
</ul>

<style>
	article {
		position: relative;
	}
</style>
