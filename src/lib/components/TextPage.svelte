<script lang="ts">
	import type { Snippet } from 'svelte';
	import { t } from '#lib/i18n.js';
	import { currentLang } from '#lib/paths.svelte.js';
	import Seo from './Seo.svelte';

	type Props = {
		title: string;
		description: string;
		/** Language-neutral path, e.g. "/privacy" */
		path: string;
		updated?: string;
		children: Snippet;
	};
	let { title, description, path, updated, children }: Props = $props();
	const lang = $derived(currentLang());
</script>

<Seo {title} {description} {path} />

<article class="container-page max-w-3xl py-10 sm:py-14">
	<h1 class="text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
	{#if updated}<p class="mt-2 text-sm text-muted">{t(lang).common.lastUpdated}: {updated}</p>{/if}
	<div class="prose mt-8">{@render children()}</div>
</article>
