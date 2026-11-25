<!--
	"Latest on YouTube": a big player plus the newest uploads from the official channel only.
	Videos come prerendered from the build and are refreshed from /api/youtube in the browser.
	The player is YouTube's own embed, so play, pause, seek, volume and fullscreen all work as usual.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang, YoutubeVideo } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { site } from '#lib/site.js';
	import { reveal, revealChildren } from '#lib/motion.js';
	import BrandIcon from './BrandIcon.svelte';
	import Icon from './Icon.svelte';

	let { lang, videos: initial }: { lang: Lang; videos: YoutubeVideo[] } = $props();
	const y = $derived(t(lang).home.youtube);

	let fresh = $state<YoutubeVideo[] | null>(null);
	const videos = $derived(fresh ?? initial);
	let currentId = $state<string | null>(null);
	let playing = $state(false);
	let playerEl = $state<HTMLElement>();

	const current = $derived(videos.find((v) => v.id === currentId) ?? videos[0]);

	onMount(async () => {
		try {
			const res = await fetch('/api/youtube');
			if (!res.ok) return;
			const list: YoutubeVideo[] = await res.json();
			if (list.length) fresh = list;
		} catch {
			// Keep the build-time list
		}
	});

	function play(video: YoutubeVideo) {
		currentId = video.id;
		playing = true;
		// On phones the list sits below the player: bring the player back into view
		if (playerEl && playerEl.getBoundingClientRect().top < 0) {
			playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	const thumb = (id: string, size: 'hq' | 'max' = 'hq') =>
		`https://i.ytimg.com/vi/${id}/${size === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;

	const locale = $derived(lang === 'bn' ? 'bn-BD' : 'en');
	const date = (iso: string) =>
		iso
			? new Date(iso).toLocaleDateString(locale, {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			: '';
	const views = (n: number) =>
		n ? `${new Intl.NumberFormat(locale, { notation: 'compact' }).format(n)} ${y.views}` : '';
</script>

{#if current}
	<section class="relative overflow-hidden py-14 sm:py-20" aria-labelledby="youtube">
		<div class="dot-band absolute inset-0" aria-hidden="true"></div>
		<div class="container-page relative">
			<div
				{@attach reveal()}
				class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
			>
				<div class="max-w-2xl">
					<p
						class="flex items-center gap-2 text-sm font-semibold tracking-wide text-gold-300 uppercase"
					>
						<BrandIcon name="youtube" class="size-5" />{y.eyebrow}
					</p>
					<h2 id="youtube" class="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
						{y.title}
					</h2>
					<p class="mt-3 text-lg text-body">{y.intro}</p>
				</div>
				<a
					href={site.socials.youtube}
					target="_blank"
					rel="noopener"
					class="btn-youtube inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl px-5 text-sm font-bold uppercase sm:self-auto"
				>
					{y.subscribe}<Icon name="arrow-right" class="size-4" />
				</a>
			</div>

			<div class="mt-8 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
				<!-- Player -->
				<div bind:this={playerEl} class="scroll-mt-24">
					<div
						{@attach reveal({ y: 40, scale: 0.96 })}
						class="relative aspect-video overflow-hidden rounded-3xl border border-line-strong bg-black shadow-2xl ring-1 shadow-black/60 ring-gold-400/20"
					>
						{#if playing}
							{#key current.id}
								<iframe
									class="absolute inset-0 size-full"
									src="https://www.youtube-nocookie.com/embed/{current.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
									title={current.title}
									allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
									allowfullscreen
								></iframe>
							{/key}
						{:else}
							<button
								type="button"
								onclick={() => play(current)}
								class="group absolute inset-0 size-full cursor-pointer"
								aria-label="{y.play}: {current.title}"
							>
								<img
									src={thumb(current.id, 'max')}
									onerror={(e) => ((e.currentTarget as HTMLImageElement).src = thumb(current.id))}
									alt=""
									width="1280"
									height="720"
									loading="lazy"
									decoding="async"
									class="size-full object-cover transition duration-500 group-hover:scale-105"
								/>
								<span
									class="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/20"
									aria-hidden="true"
								></span>
								<span
									class="cta-pulse absolute top-1/2 left-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#ff0033] text-white shadow-xl shadow-black/50 transition group-hover:scale-110 sm:size-22"
									style="--ring: rgb(255 0 51 / 0.45)"
									aria-hidden="true"
								>
									<Icon name="play" class="size-8 translate-x-0.5 sm:size-10" />
								</span>
								<span class="absolute inset-x-0 bottom-0 p-4 text-left sm:p-6">
									<span class="line-clamp-2 text-base font-bold text-white drop-shadow sm:text-xl">
										{current.title}
									</span>
									<span class="mt-1 block text-xs font-medium text-white/75 sm:text-sm">
										{[views(current.views), date(current.published)].filter(Boolean).join(' · ')}
									</span>
								</span>
							</button>
						{/if}
					</div>
					{#if playing}
						<p class="mt-3 line-clamp-2 font-bold text-ink sm:text-lg">{current.title}</p>
					{/if}
				</div>

				<!-- Playlist: a column as tall as the player on desktop, a swipeable row on phones -->
				<div class="relative">
					<ul
						{@attach revealChildren({ gap: 0.06 })}
						class="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:absolute lg:inset-0 lg:mx-0 lg:snap-none lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-0 lg:pr-1 lg:pb-0"
						aria-label={y.listLabel}
					>
						{#each videos as video (video.id)}
							{@const active = video.id === current.id}
							<li class="w-64 shrink-0 snap-start sm:w-72 lg:w-auto">
								<button
									type="button"
									onclick={() => play(video)}
									aria-current={active ? 'true' : undefined}
									class="group flex w-full flex-col gap-2 rounded-2xl border p-2 text-left transition lg:flex-row lg:items-start lg:gap-3 {active
										? 'border-gold-400/60 bg-raised'
										: 'border-line bg-surface/90 hover:border-gold-400/40 hover:bg-raised'}"
								>
									<span
										class="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-black lg:w-40"
									>
										<img
											src={thumb(video.id)}
											alt=""
											width="480"
											height="360"
											loading="lazy"
											decoding="async"
											class="size-full object-cover transition duration-300 group-hover:scale-105"
										/>
										<span
											class="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100 {active
												? 'opacity-100'
												: ''}"
											aria-hidden="true"
										>
											<span
												class="flex size-9 items-center justify-center rounded-lg bg-[#ff0033] text-white"
											>
												<Icon name="play" class="size-4 translate-x-px" />
											</span>
										</span>
										{#if active && playing}
											<span
												class="absolute top-1.5 left-1.5 rounded-md bg-[#ff0033] px-1.5 py-0.5 text-[0.65rem] font-bold text-white uppercase"
											>
												{y.nowPlaying}
											</span>
										{/if}
									</span>
									<span class="min-w-0 px-1 pb-1 lg:px-0 lg:py-0.5">
										<span
											class="line-clamp-2 text-sm leading-snug font-semibold {active
												? 'text-gold-300'
												: 'text-ink'}"
										>
											{video.title}
										</span>
										<span class="mt-1 block text-xs text-muted">
											{[views(video.views), date(video.published)].filter(Boolean).join(' · ')}
										</span>
									</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}
