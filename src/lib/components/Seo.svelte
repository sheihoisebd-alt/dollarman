<script lang="ts">
	import { absoluteUrl, site } from '#lib/site.js';

	type Props = {
		title: string;
		description: string;
		/** Path of this page, used for the canonical URL. */
		path: string;
		type?: 'website' | 'article';
		jsonLd?: Record<string, unknown>[];
		noindex?: boolean;
		/** hreflang alternates, e.g. { en: '/', bn: '/bn' } */
		alternates?: Record<string, string>;
	};

	let {
		title,
		description,
		path,
		type = 'website',
		jsonLd = [],
		noindex = false,
		alternates
	}: Props = $props();

	const fullTitle = $derived(title === site.name ? title : `${title} | ${site.name}`);
	const canonical = $derived(absoluteUrl(path));
	// Escape "<" so content can never close the script tag early.
	const scripts = $derived(
		jsonLd.map(
			(data) =>
				`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</` +
				'script>'
		)
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex" />{/if}
	{#if alternates}
		{#each Object.entries(alternates) as [hreflang, href] (hreflang)}
			<link rel="alternate" {hreflang} href={absoluteUrl(href)} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={absoluteUrl(alternates.en ?? path)} />
	{/if}
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	{#if site.ogImage}
		<meta property="og:image" content={absoluteUrl(site.ogImage)} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD built from our own data, "<" escaped -->
	{@html scripts.join('')}
</svelte:head>
