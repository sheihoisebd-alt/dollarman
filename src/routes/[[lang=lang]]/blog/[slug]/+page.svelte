<script lang="ts">
	import { locale, localizePath, num, t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { absoluteUrl, site } from '#lib/site.js';
	import PostList from '#lib/components/PostList.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import TelegramButton from '#lib/components/TelegramButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const lang = $derived(data.lang);
	const common = $derived(t(lang).common);

	const copy = {
		en: {
			ctaTitle: 'Learn trading from zero, free',
			ctaText: 'A structured beginner course with daily lessons and Q&A in our Telegram community.',
			related: 'Keep reading'
		},
		bn: {
			ctaTitle: 'একদম শূন্য থেকে ট্রেডিং শিখুন, ফ্রিতে',
			ctaText:
				'নতুনদের জন্য সাজানো একটা কোর্স। আমাদের টেলিগ্রাম কমিউনিটিতে প্রতিদিন লেসন আর প্রশ্নোত্তর হয়।',
			related: 'আরও পড়ুন'
		}
	};
	const c = $derived(copy[lang]);

	const post = $derived(data.post);
	const url = $derived(absoluteUrl(localizePath(lang, `/blog/${post.slug}`)));
	const date = $derived(
		new Date(post.published).toLocaleDateString(locale(lang), {
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
			inLanguage: lang,
			datePublished: post.published,
			dateModified: post.updated ?? post.published,
			mainEntityOfPage: url,
			keywords: post.tags.map((tag) => tag.name).join(', '),
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
				{
					'@type': 'ListItem',
					position: 1,
					name: common.blog,
					item: absoluteUrl(localizePath(lang, '/blog'))
				},
				{ '@type': 'ListItem', position: 2, name: post.title, item: url }
			]
		}
	]}
/>

<article class="container-page max-w-3xl py-10 sm:py-14">
	<nav aria-label="Breadcrumb" class="text-sm">
		<a href={href(lang, '/blog')} class="font-medium text-gold-300 hover:underline">{common.blog}</a
		>
	</nav>
	<h1 class="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
		{post.title}
	</h1>
	<p class="mt-3 text-sm text-muted">
		<time datetime={post.published}>{date}</time> · {num(lang, post.readingMin)}
		{common.minRead}
		{#each post.tags as tag (tag.slug)}
			· <a href={href(lang, `/blog/tag/${tag.slug}`)} class="text-gold-300 hover:underline"
				>{tag.name}</a
			>
		{/each}
	</p>

	<div class="prose mt-8"><data.Content /></div>

	<p class="mt-10 rounded-xl bg-surface-2 p-4 text-sm text-body">
		{common.disclaimerNote}
		<a href={href(lang, '/disclaimer')} class="text-gold-300 underline">{common.readDisclaimer}</a>.
	</p>

	<section class="panel-cta mt-10 rounded-2xl p-6 text-ink sm:p-8">
		<h2 class="text-2xl font-bold">{c.ctaTitle}</h2>
		<p class="mt-2 text-body">{c.ctaText}</p>
		<div class="mt-6">
			<TelegramButton placement="blog-{post.slug}" label={t(lang).cta.join} variant="inverse" />
		</div>
	</section>
</article>

{#if data.related.length}
	<section class="container-page max-w-3xl pb-14" aria-labelledby="related">
		<h2 id="related" class="text-xl font-bold text-ink">{c.related}</h2>
		<div class="mt-4"><PostList {lang} posts={data.related} /></div>
	</section>
{/if}
