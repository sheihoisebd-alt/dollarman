<script lang="ts">
	import { progress } from '#lib/progress.svelte.js';

	let { slug, items }: { slug: string; items: string[] } = $props();

	const done = $derived(items.filter((_, i) => progress.isChecked(slug, i)).length);
</script>

<section
	aria-labelledby="checklist-{slug}"
	class="rounded-2xl border border-line bg-surface p-5 sm:p-6"
>
	<div class="flex items-baseline justify-between gap-3">
		<h2 id="checklist-{slug}" class="text-xl font-bold text-ink">Module checklist</h2>
		<p class="text-sm text-muted" aria-live="polite">{done} of {items.length} done</p>
	</div>
	<p class="mt-1 text-sm text-muted">
		Tick every item to mark this module complete. Saved on this device only.
	</p>
	<ul class="mt-4 space-y-2">
		{#each items as item, i (i)}
			<li>
				<label
					class="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line p-3 has-checked:border-silver-400 has-checked:bg-raised"
				>
					<input
						type="checkbox"
						class="mt-0.5 size-5 shrink-0 accent-silver-300"
						checked={progress.isChecked(slug, i)}
						disabled={!progress.loaded}
						onchange={() => progress.toggle(slug, i)}
					/>
					<span class="text-ink">{item}</span>
				</label>
			</li>
		{/each}
	</ul>
</section>
