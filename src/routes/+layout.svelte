<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { captureAttribution } from '#lib/attribution.svelte.js';
	import { loadConsent } from '#lib/consent.svelte.js';
	import { t } from '#lib/i18n.js';
	import { progress } from '#lib/progress.svelte.js';
	import { trackPageView } from '#lib/tracking.js';
	import ConsentBanner from '#lib/components/ConsentBanner.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const lang = $derived(data.lang);
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
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-lg bg-surface px-4 py-3 font-semibold text-gold-300 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	{dict.nav.skip}
</a>

<div class="relative flex min-h-dvh flex-col">
	<div
		class="top-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]"
		aria-hidden="true"
	></div>
	<SiteHeader {lang} {dict} />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<SiteFooter {lang} {dict} />
</div>

<ConsentBanner {lang} {dict} />
