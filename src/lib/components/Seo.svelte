<script lang="ts">
	import { page } from '$app/state';
	import { langFromPath, localizePath } from '#lib/i18n.js';
	import { absoluteUrl, site } from '#lib/site.js';

	type Props = {
		title: string;
		description: string;
		/** Language-neutral path of this page ("/course"); English gets the /en prefix. */
		path: string;
		type?: 'website' | 'article';
		jsonLd?: Record<string, unknown>[];
		noindex?: boolean;
		/** ISO dates for articles. */
		published?: string;
		modified?: string;
	};

	let {
		title,
		description,
		path,
		type = 'website',
		jsonLd = [],
		noindex = false,
		published,
		modified
	}: Props = $props();

	// Every page exists in Bangla (default, at the root) and English (under /en).
	const lang = $derived(langFromPath(page.url.pathname));
	const locale = $derived(lang === 'bn' ? 'bn_BD' : 'en_US');
	const alternates = $derived({ bn: localizePath('bn', path), en: localizePath('en', path) });

	const fullTitle = $derived(title === site.name ? title : `${title} | ${site.name}`);
	const canonical = $derived(absoluteUrl(localizePath(lang, path)));
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
	<meta
		name="robots"
		content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
	/>
	<link rel="alternate" hreflang="bn" href={absoluteUrl(alternates.bn)} />
	<link rel="alternate" hreflang="en" href={absoluteUrl(alternates.en)} />
	<link rel="alternate" hreflang="x-default" href={absoluteUrl(alternates.bn)} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={locale} />
	<meta property="og:locale:alternate" content={lang === 'bn' ? 'en_US' : 'bn_BD'} />
	{#if type === 'article' && published}
		<meta property="article:published_time" content={published} />
		<meta property="article:modified_time" content={modified ?? published} />
	{/if}
	{#if site.facebookUrl}<meta property="article:publisher" content={site.facebookUrl} />{/if}
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if site.ogImage}
		<meta property="og:image" content={absoluteUrl(site.ogImage)} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={site.name} />
		<meta name="twitter:image" content={absoluteUrl(site.ogImage)} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD built from our own data, "<" escaped -->
	{@html scripts.join('')}
</svelte:head>
