<script lang="ts">
	import { resolve } from '$app/paths';
	import { absoluteUrl, site } from '#lib/site.js';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
	const date = $derived(
		new Date(post.published).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		})
	);
</script>

<Seo
	title={post.title}
	description={post.description}
	path="/blog/{post.slug}"
	type="article"
	published={post.published}
	modified={post.updated ?? undefined}
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.description,
			datePublished: post.published,
			dateModified: post.updated ?? post.published,
			mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
			keywords: post.tags.map((t) => t.name).join(', '),
			author: { '@type': 'Organization', name: site.name, url: site.url },
			publisher: {
				'@type': 'Organization',
				name: site.name,
				logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.jpg') }
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Blog', item: absoluteUrl('/blog') },
				{
					'@type': 'ListItem',
					position: 2,
					name: post.title,
					item: absoluteUrl(`/blog/${post.slug}`)
				}
			]
		}
	]}
/>

<article class="container-page max-w-3xl py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={resolve('/blog')} class="font-medium text-silver-200 hover:underline">Blog</a>
	</nav>
	<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
		{post.title}
	</h1>
	<p class="mt-3 text-sm text-muted">
		<time datetime={post.published}>{date}</time> · {post.readingMin} min read
		{#each post.tags as tag (tag.slug)}
			· <a
				href={resolve('/blog/tag/[tag]', { tag: tag.slug })}
				class="text-silver-200 hover:underline">{tag.name}</a
			>
		{/each}
	</p>

	<div class="prose mt-8"><data.Content /></div>

	<p class="mt-10 rounded-xl bg-surface-2 p-4 text-sm text-body">
		This article is for education only and is not financial advice. Trading involves risk. <a
			href={resolve('/disclaimer')}
			class="text-silver-200 underline">Read our disclaimer</a
		>.
	</p>

	<section class="panel-cta mt-10 rounded-2xl p-6 text-ink sm:p-8">
		<h2 class="text-2xl font-bold">Learn trading from zero, free</h2>
		<p class="mt-2 text-body">
			A structured beginner course with daily lessons and Q&A in our Telegram community.
		</p>
		<div class="mt-6">
			<TelegramButton
				placement="blog-{post.slug}"
				label="Join the free course on Telegram"
				variant="inverse"
			/>
		</div>
	</section>
</article>

{#if data.related.length}
	<section class="container-page max-w-3xl pb-14" aria-labelledby="related">
		<h2 id="related" class="text-xl font-bold text-ink">Keep reading</h2>
		<div class="mt-4"><PostList posts={data.related} /></div>
	</section>
{/if}
