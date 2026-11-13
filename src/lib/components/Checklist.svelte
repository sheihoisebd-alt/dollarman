<script lang="ts">
	import type { Lang } from '#lib/types.js';
	import { num } from '#lib/i18n.js';
	import { progress } from '#lib/progress.svelte.js';

	let { lang, slug, items }: { lang: Lang; slug: string; items: string[] } = $props();

	const copy = {
		en: {
			title: 'Module checklist',
			done: (d: string, total: string) => `${d} of ${total} done`,
			intro: 'Tick every item to mark this module complete. Saved on this device only.'
		},
		bn: {
			title: 'মডিউল চেকলিস্ট',
			done: (d: string, total: string) => `${total}টার মধ্যে ${d}টা হয়েছে`,
			intro: 'সবগুলোতে টিক দিলে মডিউলটা শেষ হিসেবে ধরা হবে। এটা শুধু এই ডিভাইসেই সেভ থাকে।'
		}
	};
	const c = $derived(copy[lang]);

	const done = $derived(items.filter((_, i) => progress.isChecked(slug, i)).length);
</script>

<section
	aria-labelledby="checklist-{slug}"
	class="rounded-2xl border border-line bg-surface p-5 sm:p-6"
>
	<div class="flex items-baseline justify-between gap-3">
		<h2 id="checklist-{slug}" class="text-xl font-bold text-ink">{c.title}</h2>
		<p class="text-sm text-muted" aria-live="polite">
			{c.done(num(lang, done), num(lang, items.length))}
		</p>
	</div>
	<p class="mt-1 text-sm text-muted">
		{c.intro}
	</p>
	<ul class="mt-4 space-y-2">
		{#each items as item, i (i)}
			<li>
				<label
					class="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line p-3 has-checked:border-gold-400/60 has-checked:bg-raised"
				>
					<input
						type="checkbox"
						class="mt-0.5 size-5 shrink-0 accent-gold-400"
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
