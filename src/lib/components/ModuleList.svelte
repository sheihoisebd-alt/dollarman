<script lang="ts">
	import type { Lang, Module } from '#lib/types.js';
	import { num, t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { progress } from '#lib/progress.svelte.js';
	import Icon from './Icon.svelte';
	import { revealChildren } from '#lib/motion.js';

	type Props = {
		lang: Lang;
		modules: Module[];
		/** Show per-module completion from this browser's saved progress. */
		showProgress?: boolean;
	};

	let { lang, modules, showProgress = false }: Props = $props();
	const c = $derived(t(lang).common);
</script>

<ol {@attach revealChildren({ y: 24, gap: 0.05 })} class="grid gap-3 sm:grid-cols-2">
	{#each modules as m (m.slug)}
		{@const complete = showProgress && progress.isComplete(m.slug, m.checklist.length)}
		<li>
			<a
				href={href(lang, `/course/${m.slug}`)}
				class="flex h-full gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-gold-400/60 hover:shadow-md sm:p-5"
			>
				<span
					class={[
						'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
						complete
							? 'bg-emerald-500 text-page'
							: 'bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25'
					]}
				>
					{#if complete}
						<Icon name="check" class="size-5" /><span class="sr-only">{c.completed}</span>
					{:else}
						{num(lang, m.position)}
					{/if}
				</span>
				<span class="min-w-0">
					<span class="block font-semibold text-ink">{m.title}</span>
					<span class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
						<span class="inline-flex items-center gap-1"
							><Icon name="clock" class="size-4" />{num(lang, m.durationMin)} {c.min}</span
						>
						{#if m.preview}
							<span
								class="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-300"
								>{c.freePreview}</span
							>
						{:else}
							<span class="inline-flex items-center gap-1"
								><Icon name="telegram" class="size-4" />Telegram</span
							>
						{/if}
					</span>
				</span>
			</a>
		</li>
	{/each}
</ol>
