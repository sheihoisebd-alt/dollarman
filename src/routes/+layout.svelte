<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { captureAttribution } from '#lib/attribution.svelte.js';
	import { loadConsent } from '#lib/consent.svelte.js';
	import { langFromPath, t } from '#lib/i18n.js';
	import { progress } from '#lib/progress.svelte.js';
	import { trackPageView } from '#lib/tracking.js';
	import ConsentBanner from '#lib/components/ConsentBanner.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import StickyCta from '#lib/components/StickyCta.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const lang = $derived(langFromPath(page.url.pathname));
	const dict = $derived(t(lang));

	onMount(() => {
		captureAttribution(new URL(location.href));
		loadConsent();
		progress.load();
	});

	// Fires after hydration and after every client-side navigation.
	afterNavigate(() => trackPageView());
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-lg bg-surface px-4 py-3 font-semibold text-silver-200 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to content
</a>

<div class="flex min-h-dvh flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))]">
	<SiteHeader {lang} {dict} />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<SiteFooter {dict} />
</div>

<ConsentBanner {dict} />
<StickyCta {dict} />
