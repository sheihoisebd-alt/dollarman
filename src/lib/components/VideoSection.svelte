<!--
	"Inside Dollar Man Learning": a big video card with check-marked points floating around it.
	The video is the YouTube id in site.showcase.introVideoId; until it is set, the card shows the
	photo with a "coming soon" note instead of a play button that does nothing.
-->
<script lang="ts">
	import type { Lang } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { site } from '#lib/site.js';
	import { popChildren, reveal, tilt } from '#lib/motion.js';
	import Icon from './Icon.svelte';

	let { lang }: { lang: Lang } = $props();
	const v = $derived(t(lang).home.video);

	const videoId = site.showcase.introVideoId;
	// The video's own YouTube thumbnail makes the best poster; the photo is the fallback
	const poster = videoId
		? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
		: site.showcase.featuredImage;
	let playing = $state(false);

	// Where each point floats on wide screens: left-top, right-middle, left-bottom
	const spots = [
		'lg:top-[14%] lg:-left-24',
		'lg:top-[46%] lg:-right-28',
		'lg:bottom-[14%] lg:-left-28'
	];
</script>

<section class="relative overflow-hidden py-14 sm:py-20" aria-labelledby="inside">
	<div class="dot-band absolute inset-0" aria-hidden="true"></div>
	<div class="container-page relative">
		<div {@attach reveal()} class="mx-auto max-w-2xl text-center">
			<p class="text-sm font-semibold tracking-wide text-gold-300 uppercase">{v.eyebrow}</p>
			<h2 id="inside" class="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
				{v.title}
			</h2>
			<p class="mt-3 text-lg text-body">{v.intro}</p>
		</div>

		<div class="relative mx-auto mt-10 max-w-4xl" {@attach popChildren('.inside-point', 0.18)}>
			<!-- The video card -->
			<div
				{@attach reveal({ y: 50, scale: 0.94 })}
				{@attach tilt(3)}
				class="relative aspect-video overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl ring-1 shadow-black/60 ring-gold-400/20"
			>
				{#if playing && videoId}
					<iframe
						class="size-full"
						src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
						title={v.title}
						allow="autoplay; encrypted-media; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<img
						src={poster}
						alt={v.photoAlt}
						width="1280"
						height="720"
						loading="lazy"
						decoding="async"
						class="size-full object-cover"
					/>
					<!-- Warm studio light on the left, darker edges like a film frame -->
					<div
						class="absolute inset-0 bg-[radial-gradient(70%_90%_at_20%_40%,rgb(255_191_26/0.18),transparent_60%),linear-gradient(to_top,rgb(0_0_0/0.65),transparent_45%)]"
						aria-hidden="true"
					></div>
					<div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
						{#if videoId}
							<button
								type="button"
								onclick={() => (playing = true)}
								class="cta-pulse relative flex size-20 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/50 backdrop-blur-md transition hover:scale-110 hover:bg-white/25 sm:size-24"
								style="--ring: rgb(255 255 255 / 0.5)"
								aria-label={v.play}
							>
								<Icon name="play" class="size-9 translate-x-0.5 sm:size-10" />
							</button>
						{:else}
							<span
								class="flex size-20 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/30 backdrop-blur-md sm:size-24"
								aria-hidden="true"
							>
								<Icon name="play" class="size-9 translate-x-0.5 sm:size-10" />
							</span>
							<span
								class="rounded-full bg-black/55 px-3 py-1 text-sm font-semibold text-white backdrop-blur"
							>
								{v.soon}
							</span>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Points: floating around the card on desktop, a neat row under it on phones -->
			<ul
				class="mt-5 flex flex-wrap justify-center gap-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block"
			>
				{#each v.points as point, i (point)}
					<li
						class="inside-point lg:pointer-events-auto lg:absolute {spots[i]}"
						style="--float-delay: {i * 0.8}s"
					>
						<span
							class="float-soft inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/95 px-3.5 py-2 text-sm font-semibold text-ink shadow-xl shadow-black/50 backdrop-blur sm:px-4 sm:py-2.5"
						>
							{point}
							<span
								class="flex size-5 items-center justify-center rounded-full bg-white text-page"
								aria-hidden="true"
							>
								<Icon name="check" class="size-3.5" />
							</span>
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
