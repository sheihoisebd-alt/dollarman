<!-- Four glowing stat cards under the home showcase. The figures live in site.ts (site.stats). -->
<script lang="ts">
	import type { Lang } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { countUp } from '#lib/count-up.js';
	import { popChildren, revealChildren } from '#lib/motion.js';
	import { site } from '#lib/site.js';
	import BrandIcon from './BrandIcon.svelte';

	let { lang }: { lang: Lang } = $props();
	const labels = $derived(t(lang).home.stats);
</script>

<section class="relative py-10 sm:py-14" aria-label={labels.title}>
	<div class="dot-band absolute inset-0" aria-hidden="true"></div>
	<ul
		{@attach revealChildren({ y: 30 })}
		{@attach popChildren('.stat-icon', 0.12)}
		class="container-page relative grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
	>
		{#each site.stats as stat (stat.key)}
			<li
				class="group flex flex-col items-center rounded-2xl border border-line bg-surface/90 px-3 py-6 text-center shadow-xl shadow-black/40 transition hover:-translate-y-0.5 hover:border-gold-400/50 sm:py-9"
			>
				<span
					class="stat-icon flex size-14 items-center justify-center rounded-2xl bg-gold-400/20 shadow-[0_0_32px_rgb(255_191_26/0.35)] ring-1 ring-gold-400/30 transition group-hover:shadow-[0_0_44px_rgb(255_191_26/0.5)] sm:size-16"
				>
					<BrandIcon name={stat.icon} class="size-8 sm:size-9" />
				</span>
				<p
					{@attach countUp}
					class="mt-4 text-3xl font-extrabold tracking-tight text-ink tabular-nums sm:text-4xl"
				>
					{stat.value}
				</p>
				<p class="mt-1.5 text-sm text-muted">{labels[stat.key]}</p>
			</li>
		{/each}
	</ul>
</section>
