<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Module } from '#lib/types.js';
	import { progress } from '#lib/progress.svelte.js';
	import Icon from './Icon.svelte';

	type Props = {
		modules: Module[];
		minutesLabel?: string;
		previewLabel?: string;
		/** Show per-module completion from this browser's saved progress. */
		showProgress?: boolean;
	};

	let {
		modules,
		minutesLabel = 'min',
		previewLabel = 'Free preview',
		showProgress = false
	}: Props = $props();
</script>

<ol class="grid gap-3 sm:grid-cols-2">
	{#each modules as m (m.slug)}
		{@const complete = showProgress && progress.isComplete(m.slug, m.checklist.length)}
		<li>
			<a
				href={resolve('/course/[slug]', { slug: m.slug })}
				class="flex h-full gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-silver-400 hover:shadow-md sm:p-5"
			>
				<span
					class={[
						'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
						complete ? 'bg-emerald-500 text-page' : 'bg-raised text-silver-200'
					]}
				>
					{#if complete}
						<Icon name="check" class="size-5" /><span class="sr-only">Completed:</span>
					{:else}
						{m.position}
					{/if}
				</span>
				<span class="min-w-0">
					<span class="block font-semibold text-ink">{m.title}</span>
					<span class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
						<span class="inline-flex items-center gap-1"
							><Icon name="clock" class="size-4" />{m.durationMin} {minutesLabel}</span
						>
						{#if m.preview}
							<span
								class="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-300"
								>{previewLabel}</span
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
