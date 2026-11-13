<!--
	Student reviews above the FAQ: a heading with the student count, an average-rating ring, and a
	masonry of review cards that fades out with a "show more" button. Data: src/lib/reviews.ts.
-->
<script lang="ts">
	import type { Lang } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { reviews as allReviews } from '#lib/reviews.js';
	import { site } from '#lib/site.js';

	let { lang }: { lang: Lang } = $props();
	const r = $derived(t(lang).home.reviews);
	const reviews = $derived(allReviews[lang]);

	const students = site.stats.find((s) => s.key === 'students')?.value ?? '';
	const avg = $derived(reviews.reduce((sum, x) => sum + x.rating, 0) / Math.max(reviews.length, 1));
	const fmt = (n: number, digits = 0) =>
		n.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', {
			minimumFractionDigits: digits,
			maximumFractionDigits: digits
		});

	// Ring: circumference of r=26 is about 163.4
	const C = 2 * Math.PI * 26;

	let expanded = $state(false);
</script>

<section class="relative py-14 sm:py-20" aria-labelledby="reviews">
	<div class="container-page">
		<h2
			id="reviews"
			class="text-center text-3xl font-extrabold tracking-tight text-ink uppercase sm:text-4xl"
		>
			{r.title.replace('{n}', students)}
		</h2>

		<div class="mt-6 flex items-center justify-center gap-4">
			<span class="relative flex size-16 shrink-0 items-center justify-center">
				<svg viewBox="0 0 60 60" class="absolute inset-0 size-full -rotate-90" aria-hidden="true">
					<circle cx="30" cy="30" r="26" fill="none" stroke="var(--color-line)" stroke-width="5" />
					<circle
						cx="30"
						cy="30"
						r="26"
						fill="none"
						stroke="var(--color-gold-400)"
						stroke-width="5"
						stroke-linecap="round"
						stroke-dasharray={C}
						stroke-dashoffset={C * (1 - avg / 5)}
					/>
				</svg>
				<span class="text-lg font-extrabold text-gold-300">{fmt(avg, 1)}</span>
			</span>
			<p class="text-left text-lg font-medium text-ink sm:text-xl">{r.ratingLabel}</p>
		</div>

		<div class="relative mt-10">
			<ul
				class={[
					'columns-1 gap-4 sm:columns-2 lg:columns-3',
					!expanded && 'max-h-[56rem] overflow-hidden sm:max-h-[44rem]'
				]}
			>
				{#each reviews as review (review.name)}
					<li
						class="mb-4 break-inside-avoid rounded-2xl border border-line bg-surface shadow-xl shadow-black/40"
					>
						<div class="flex items-center gap-3 border-b border-line p-4">
							<span
								class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25"
								aria-hidden="true"
							>
								<!-- Thumbs up with a speech bubble -->
								<svg
									viewBox="0 0 24 24"
									class="size-6"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M3 13.5V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H7l-3 2.5v-2.5"
									/>
									<path
										d="M15 11h1.5l1.8-4.2a1.3 1.3 0 0 1 2.4.9L20 11h1a1.5 1.5 0 0 1 1.4 1.9l-1.2 4.2a2 2 0 0 1-1.9 1.4H15Z"
									/>
									<path d="M6.5 11.3h.01M9.5 11.3h.01" stroke-width="2.2" />
								</svg>
							</span>
							<div class="min-w-0">
								<p class="font-bold text-ink">{review.name}</p>
								{#if review.sample}
									<span
										class="mt-1 inline-flex rounded-md bg-raised px-2 py-0.5 text-xs font-medium text-muted ring-1 ring-line"
									>
										{r.sample}
									</span>
								{:else if review.verified}
									<span
										class="mt-1 inline-flex items-center gap-1 rounded-md bg-raised px-2 py-0.5 text-xs font-medium text-body ring-1 ring-line"
									>
										<svg
											viewBox="0 0 24 24"
											class="size-3"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
											aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg
										>
										{r.verified}
									</span>
								{/if}
							</div>
						</div>
						<div class="border-b border-line px-4 py-3">
							<p class="text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
								{r.studentAt}
							</p>
							<p class="mt-1 truncate text-lg font-bold text-ink">{review.course}</p>
						</div>
						<blockquote class="px-4 pt-4 text-base leading-relaxed text-body">
							<span class="mr-1 align-top text-2xl leading-none text-gold-400" aria-hidden="true"
								>“</span
							>{review.text}
						</blockquote>
						<p class="flex items-center gap-2 px-4 pt-3 pb-4">
							<span class="font-bold text-ink">{fmt(review.rating)}</span>
							<span class="flex gap-0.5 text-gold-400" aria-label="{review.rating} / 5">
								{#each [1, 2, 3, 4, 5] as star (star)}
									<svg
										viewBox="0 0 24 24"
										class="size-4"
										fill={star <= review.rating ? 'currentColor' : 'none'}
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
									>
										<path
											d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9Z"
										/>
									</svg>
								{/each}
							</span>
						</p>
					</li>
				{/each}
			</ul>

			{#if !expanded}
				<!-- Fade the cut-off cards into the page, with the button on top -->
				<div
					class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-page via-page/80 to-transparent"
					aria-hidden="true"
				></div>
			{/if}
		</div>

		<div class="relative mt-2 flex justify-center">
			<button
				type="button"
				onclick={() => (expanded = !expanded)}
				aria-expanded={expanded}
				class="inline-flex min-h-11 items-center rounded-xl bg-ink px-6 text-sm font-bold text-page shadow-lg transition hover:bg-gold-200"
			>
				{expanded ? r.less : r.more}
			</button>
		</div>
	</div>
</section>
