<!--
	The cinematic band under the home hero: a big featured card (photo, or the intro video once
	site.showcase.introVideoId is set), a lesson card and a tools card on the left, and the course
	outline on the right. On phones only the featured card and the course card show.
-->
<script lang="ts">
	import type { Lang, Module } from '#lib/types.js';
	import { t } from '#lib/i18n.js';
	import { href } from '#lib/paths.svelte.js';
	import { site } from '#lib/site.js';
	import Icon from './Icon.svelte';
	import LessonArt from './LessonArt.svelte';
	import TelegramButton from './TelegramButton.svelte';

	let { lang, modules }: { lang: Lang; modules: Module[] } = $props();

	const s = $derived(t(lang).home.showcase);
	const cta = $derived(t(lang).cta);
	const num = (n: number) => n.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

	const totalHours = $derived(
		Math.round((modules.reduce((sum, m) => sum + m.durationMin, 0) / 60) * 10) / 10
	);
	const first = $derived(modules[0]);

	const videoId = site.showcase.introVideoId;
	let playing = $state(false);
</script>

<div
	class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.7fr)_minmax(0,1.25fr)] lg:items-start"
>
	<!-- Left: first lesson and the free tools (a two-up row under the featured card on phones) -->
	<div class="order-2 grid grid-cols-2 gap-3 lg:order-none lg:mt-10 lg:flex lg:flex-col lg:gap-4">
		<a
			href={href(lang, `/course/${first.slug}`)}
			class="group overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-black/40 transition hover:border-gold-400/60"
		>
			<div class="relative aspect-16/10 overflow-hidden lg:aspect-video">
				<LessonArt
					slug={first.slug}
					class="size-full transition duration-500 group-hover:scale-105"
				/>
				<span
					class="absolute right-2 bottom-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.7rem] font-semibold text-ink"
				>
					{num(first.durationMin)}
					{t(lang).common.min}
				</span>
			</div>
			<div class="p-2.5 lg:p-3">
				<p class="line-clamp-2 text-xs font-extrabold text-ink uppercase lg:text-sm">
					{num(first.position)}. {first.title}
				</p>
				<p class="mt-1 line-clamp-3 hidden text-xs leading-relaxed text-body lg:block">
					{first.summary}
				</p>
			</div>
		</a>
		<a
			href={href(lang, '/tools')}
			class="group flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-3 text-center shadow-xl shadow-black/40 transition hover:border-gold-400/60 lg:p-5"
		>
			<span
				class="flex size-11 items-center justify-center rounded-2xl bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25 transition group-hover:scale-105 lg:size-14"
			>
				<Icon name="calculator" class="size-6 lg:size-7" />
			</span>
			<p class="mt-2 text-sm font-bold text-ink lg:mt-3 lg:text-base">{s.toolsTitle}</p>
			<p class="mt-1 text-xs text-body">{s.toolsText}</p>
		</a>
	</div>

	<!-- Centre: the featured card -->
	<div
		class="relative order-1 overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl ring-1 shadow-black/60 ring-gold-400/15 lg:order-none"
	>
		{#if playing && videoId}
			<div class="aspect-video">
				<iframe
					class="size-full"
					src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
					title={s.featuredTitle}
					allow="autoplay; encrypted-media; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		{:else}
			<div class="relative aspect-16/11 sm:aspect-video">
				<!-- Photo fills the right side; a dark wash on the left (or the bottom on phones) holds the text -->
				<img
					src={site.showcase.featuredImage}
					alt={s.photoAlt}
					width="800"
					height="1000"
					class="absolute inset-y-0 right-0 h-full w-[68%] object-cover object-[50%_15%] sm:w-[62%]"
				/>
				<div
					class="absolute inset-0 bg-linear-to-r from-surface from-30% via-surface/80 via-45% to-transparent to-75% sm:from-40% sm:via-50%"
					aria-hidden="true"
				></div>
				<div
					class="absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_100%,rgb(255_191_26/0.16),transparent_70%)]"
					aria-hidden="true"
				></div>

				{#if videoId}
					<button
						type="button"
						onclick={() => (playing = true)}
						class="absolute top-1/2 right-[18%] hidden size-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition hover:scale-110 hover:bg-white/25 sm:flex"
						aria-label={s.watch}
					>
						<Icon name="play" class="size-7 translate-x-0.5" />
					</button>
				{/if}

				<div
					class="absolute inset-y-0 left-0 flex w-[60%] flex-col justify-center p-4 text-left sm:w-[58%] sm:p-8"
				>
					<span
						class="w-fit rounded-md bg-gold-400 px-2 py-0.5 text-xs font-bold tracking-wide text-page uppercase"
					>
						{s.featured}
					</span>
					<p
						class="mt-2 text-lg leading-tight font-extrabold tracking-tight text-ink sm:mt-3 sm:text-xl sm:whitespace-nowrap lg:text-2xl"
					>
						{s.featuredTitle}
					</p>
					<p
						class="mt-1.5 line-clamp-3 max-w-sm text-xs leading-relaxed text-body sm:mt-2 sm:text-sm"
					>
						{s.featuredText}
					</p>
					<div class="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
						<TelegramButton placement="showcase" label={cta.short} variant="compact" />
						{#if videoId}
							<button
								type="button"
								onclick={() => (playing = true)}
								class="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-ink ring-1 ring-line-strong hover:bg-raised"
							>
								<Icon name="play" class="size-4" />{s.watch}
							</button>
						{:else}
							<a
								href={href(lang, '/course')}
								class="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-ink ring-1 ring-line-strong hover:bg-raised"
							>
								{s.courseLink}
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Right: the course outline -->
	<div
		class="order-3 rounded-2xl border border-line bg-surface p-4 shadow-xl shadow-black/40 lg:order-none lg:mt-14"
	>
		<p class="text-lg font-extrabold tracking-tight text-ink">{s.courseTitle}</p>
		<p class="mt-1 text-sm leading-relaxed text-body">{s.courseText}</p>
		<div class="mt-3 flex flex-wrap gap-2 text-xs font-medium text-body">
			<span class="rounded-md bg-raised px-2 py-1 ring-1 ring-line">
				{s.lessons(num(modules.length))}
			</span>
			<span class="rounded-md bg-raised px-2 py-1 ring-1 ring-line">
				{s.hours(num(totalHours))}
			</span>
		</div>
		<ol class="mt-3 space-y-2">
			{#each modules.slice(0, 3) as m (m.slug)}
				<li>
					<a
						href={href(lang, `/course/${m.slug}`)}
						class="flex items-center gap-3 rounded-xl bg-surface-2 p-2 ring-1 ring-line transition hover:ring-gold-400/60"
					>
						<LessonArt slug={m.slug} class="h-12 w-20 shrink-0 rounded-lg" />
						<span class="min-w-0 flex-1 text-sm leading-snug font-bold text-ink">{m.title}</span>
						<span
							class="flex size-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-gold-300 ring-1 ring-gold-400"
							>{num(m.position)}</span
						>
					</a>
				</li>
			{/each}
		</ol>
	</div>
</div>
